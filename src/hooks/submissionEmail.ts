import type { CollectionAfterChangeHook } from "payload";

// WHY: When a visitor submits the "Submit a Sample" / contact form, the lead is
// persisted to the `submissions` collection (survives on Render's disk, visible
// in /admin). This hook ALSO emails the IAS inbox so staff are notified in real
// time instead of having to poll /admin.
//
// WHEN: Fires on every `create` in the submissions collection (i.e. each new
// public form submission). Skips updates/edits made in /admin.
//
// HOW: Best-effort POST to Resend's HTTPS API (Render blocks outbound SMTP, so
// an HTTP email API is the only option). It is intentionally FAIL-OPEN: the lead
// is already safely captured before this runs, so a missing key or a transient
// Resend error must never turn a successful capture into a user-facing failure —
// we log and move on. Notifications automatically light up the moment
// RESEND_API_KEY is set in the environment (e.g. once the customer provisions
// Resend), with zero code changes.
//
// Env:
//   RESEND_API_KEY   — Resend secret. Absent → capture still works, email skipped.
//   SUBMISSIONS_TO   — recipient inbox (default: info@iasamerica.com).
//   SUBMISSIONS_FROM — verified sender. Until the customer verifies their domain
//                      in Resend, Resend only delivers from onboarding@resend.dev
//                      to the account owner, so that is the safe default.
export const notifyOnSubmission: CollectionAfterChangeHook = async ({
  doc,
  operation,
  req,
}) => {
  if (operation !== "create") return doc;

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    req.payload.logger.info(
      `New submission #${doc.id} from ${doc.email} (${doc.company}) captured — ` +
        `RESEND_API_KEY not set, so the email notification was skipped.`,
    );
    return doc;
  }

  const to = process.env.SUBMISSIONS_TO || "info@iasamerica.com";
  const from = process.env.SUBMISSIONS_FROM || "IAS Website <onboarding@resend.dev>";

  const lines = [
    `Name:     ${doc.firstName} ${doc.lastName}`,
    `Company:  ${doc.company}`,
    doc.industry ? `Industry: ${doc.industry}` : null,
    `Phone:    ${doc.phone}`,
    `Email:    ${doc.email}`,
    "",
    "Testing need:",
    doc.message || "(none provided)",
  ]
    .filter((l): l is string => l !== null)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        // A browser-like UA avoids Cloudflare 1010 blocks on the Resend edge.
        "User-Agent": "ias-website/1.0 (+https://iasamerica.com)",
      },
      body: JSON.stringify({
        from,
        to,
        reply_to: doc.email,
        subject: `New sample inquiry — ${doc.company}`,
        text: lines,
      }),
    });
    if (!res.ok) {
      req.payload.logger.error(
        `Resend notification for submission #${doc.id} returned ${res.status}: ${await res
          .text()
          .catch(() => "")}`,
      );
    }
  } catch (err) {
    req.payload.logger.error(
      `Resend notification for submission #${doc.id} failed: ${String(err)}`,
    );
  }

  return doc;
};
