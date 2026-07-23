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
// Config split (deliberate):
//   RESEND_API_KEY — Render env SECRET. Absent → capture still works, email skipped.
//                    A credential, so it stays out of the DB.
//   recipient + sender — read from the `notification-settings` GLOBAL (SQLite,
//                    editable at /admin → Leads → Email Notifications) so the
//                    client changes them with no redeploy. See globals/NotificationSettings.ts
//                    for the defaults and why they are what they are.
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

  // Recipient + sender are admin-editable content, not env. Read them from the
  // global; fall back to the same defaults the global declares in case the row
  // has not been initialized yet (defensive — findGlobal returns defaults once
  // the table exists, so this fallback only matters if the read itself throws).
  const settings = await req.payload
    .findGlobal({ slug: "notification-settings" })
    .catch(() => null);
  const to = settings?.notifyTo || "info@iasamerica.com";
  const from = settings?.notifyFrom || "IAS Website <noreply@iasamerica.com>";

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
