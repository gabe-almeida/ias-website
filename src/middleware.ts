import { NextResponse, type NextRequest } from "next/server";

/**
 * Origin-level rate limiting (defense-in-depth backstop).
 *
 * Cloudflare in front is the primary edge defense (Bot Fight, WAF, rate rules,
 * managed-challenge on /admin), and Payload enforces per-account lockout
 * (maxLoginAttempts/lockTime). This middleware protects the Render origin
 * itself — so brute-force / floods are throttled even if someone reaches the
 * origin directly. In-memory + single instance (the disk pins us to one), which
 * is exactly the right fit.
 */

type Bucket = { count: number; resetAt: number };
const store = new Map<string, Bucket>();

// Sweep expired buckets occasionally to bound memory.
let lastSweep = 0;
function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [k, b] of store) if (b.resetAt <= now) store.delete(k);
}

function hit(key: string, limit: number, windowMs: number, now: number) {
  const b = store.get(key);
  if (!b || b.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfter: 0 };
  }
  b.count++;
  if (b.count > limit) {
    return { ok: false, remaining: 0, retryAfter: Math.ceil((b.resetAt - now) / 1000) };
  }
  return { ok: true, remaining: limit - b.count, retryAfter: 0 };
}

function clientIp(req: NextRequest): string {
  // Behind Cloudflare -> Render, CF-Connecting-IP is the true client.
  return (
    req.headers.get("cf-connecting-ip") ||
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    "unknown"
  );
}

// Verify a Cloudflare Turnstile token server-side. Only enforced when
// TURNSTILE_SECRET_KEY is set (prod) — otherwise login is ungated (dev).
async function turnstileOk(req: NextRequest, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured -> don't block
  const token = req.cookies.get("cf-turnstile-response")?.value;
  if (!token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip && ip !== "unknown") body.set("remoteip", ip);
    const r = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
    });
    const data = (await r.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch {
    return false;
  }
}

// Sensitive auth endpoints — tight limit to stop credential-stuffing.
const AUTH_PATHS = [
  "/api/users/login",
  "/api/users/first-register",
  "/api/users/forgot-password",
  "/api/users/refresh-token",
];

const jsonError = (status: number, message: string, headers: Record<string, string> = {}) =>
  new NextResponse(JSON.stringify({ errors: [{ message }] }), {
    status,
    headers: { "Content-Type": "application/json", ...headers },
  });

export async function middleware(req: NextRequest) {
  const now = Date.now();
  sweep(now);
  const ip = clientIp(req);
  const path = req.nextUrl.pathname;
  const isAuth = req.method === "POST" && AUTH_PATHS.some((p) => path.startsWith(p));

  // Tight bucket for auth (10 / 5 min), generous bucket for the rest of the API
  // (admin panel is chatty) so normal editing never trips it.
  const res = isAuth
    ? hit(`auth:${ip}`, 10, 5 * 60_000, now)
    : hit(`api:${ip}`, 600, 60_000, now);

  if (!res.ok) {
    return jsonError(429, "Too many requests. Please slow down and try again shortly.", {
      "Retry-After": String(res.retryAfter),
    });
  }

  // Bot gate on login: require a valid Turnstile token (when configured).
  if (req.method === "POST" && path.startsWith("/api/users/login")) {
    if (!(await turnstileOk(req, ip))) {
      return jsonError(403, "Bot verification failed. Please complete the challenge and try again.");
    }
  }

  return NextResponse.next();
}

// Only guard the API surface (login + data). Public pages are untouched.
export const config = {
  matcher: ["/api/:path*"],
};
