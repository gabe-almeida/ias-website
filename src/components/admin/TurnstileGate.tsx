"use client";
import { useEffect, useRef } from "react";

/**
 * Cloudflare Turnstile widget shown above the Payload /admin login form
 * (bot protection on login). On success it stores the token in a short-lived
 * cookie; the Next middleware verifies that token server-side before the login
 * request reaches Payload (see src/middleware.ts).
 *
 * No-op when NEXT_PUBLIC_TURNSTILE_SITE_KEY is unset (e.g. local dev), so the
 * login stays frictionless until keys are configured.
 */
const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: { render: (el: HTMLElement, opts: Record<string, unknown>) => void };
    __cfTurnstileOnload?: () => void;
  }
}

const setToken = (token: string) => {
  document.cookie = `cf-turnstile-response=${token}; path=/; max-age=280; samesite=lax`;
};

export const TurnstileGate = () => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!SITE_KEY || !ref.current) return;
    const el = ref.current;

    const render = () => {
      if (!window.turnstile || el.dataset.rendered) return;
      el.dataset.rendered = "1";
      window.turnstile.render(el, {
        sitekey: SITE_KEY,
        callback: setToken,
        "expired-callback": () => setToken(""),
        "error-callback": () => setToken(""),
      });
    };

    const scriptId = "cf-turnstile-script";
    if (window.turnstile) {
      render();
    } else if (!document.getElementById(scriptId)) {
      window.__cfTurnstileOnload = render;
      const s = document.createElement("script");
      s.id = scriptId;
      s.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=__cfTurnstileOnload";
      s.async = true;
      s.defer = true;
      document.head.appendChild(s);
    }
  }, []);

  if (!SITE_KEY) return null;
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
      <div ref={ref} />
    </div>
  );
};

export default TurnstileGate;
