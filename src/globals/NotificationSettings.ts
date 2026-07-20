import type { GlobalConfig } from "payload";
import { isAuthenticated, isAdmin } from "../access";

// WHY: The lead-alert recipient ("send inquiries to…") and the verified sender
// address are business config the client should be able to change themselves —
// NOT deploy-time secrets. Storing them here means they live in the SQLite DB
// (on Render's persistent disk) and are editable at /admin → Leads → "Email
// Notifications", with zero redeploy. Only RESEND_API_KEY stays a Render env
// secret, because it is a credential and does not belong in the database.
//
// WHERE it is read: src/hooks/submissionEmail.ts loads this global on every new
// submission to decide who gets the alert and what From address to send it as.
//
// Defaults below make notifications work the moment RESEND_API_KEY is present,
// with no admin setup: they deliver to the Resend account owner (nick@etrlabs.com)
// from Resend's shared onboarding sender — the only combo Resend delivers before
// the iasamerica.com domain is verified. Once the domain IS verified in Resend,
// an admin edits `notifyFrom` to an @iasamerica.com sender and `notifyTo` to the
// real inbox — all from the admin UI.
export const NotificationSettings: GlobalConfig = {
  slug: "notification-settings",
  label: "Email Notifications",
  admin: {
    group: "Leads",
    description:
      "Where new website lead inquiries are emailed, and the sender they come from. " +
      "No redeploy needed — changes take effect on the next submission.",
  },
  access: {
    // Config, not secrets — any logged-in staffer may see it; only admins edit.
    read: isAuthenticated,
    update: isAdmin,
  },
  fields: [
    {
      name: "notifyTo",
      type: "email",
      label: "Send lead alerts to",
      required: true,
      defaultValue: "nick@etrlabs.com",
      admin: {
        description:
          "The inbox that receives each new sample inquiry. Until the iasamerica.com " +
          "domain is verified in Resend, this must be the Resend account owner's email " +
          "(nick@etrlabs.com) — Resend only delivers the shared onboarding sender to the owner.",
      },
    },
    {
      name: "notifyFrom",
      type: "text",
      label: "From address",
      required: true,
      defaultValue: "IAS Website <onboarding@resend.dev>",
      admin: {
        description:
          "The verified sender the alert is sent as. Keep the default until iasamerica.com " +
          'is verified in Resend, then change to e.g. "IAS Website <noreply@iasamerica.com>".',
      },
    },
  ],
};
