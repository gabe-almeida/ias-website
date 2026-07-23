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
// Defaults below target the real business inbox (info@iasamerica.com), sent from
// an @iasamerica.com sender. IMPORTANT: for Resend to actually DELIVER to an
// external address like info@iasamerica.com, the iasamerica.com domain must be
// verified in Resend (Resend refuses to send to non-owner addresses until a
// domain is verified). So the delivery prerequisites are: (1) RESEND_API_KEY set
// in Render, and (2) iasamerica.com verified in Resend. Until both are true the
// lead is still captured to /admin — only the email alert is skipped/errored
// (fail-open). An admin can override either address at /admin with no redeploy.
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
      defaultValue: "info@iasamerica.com",
      admin: {
        description:
          "The inbox that receives each new sample inquiry. Delivery to this address " +
          "requires the iasamerica.com domain to be verified in Resend (Resend won't " +
          "send to a non-owner address until then).",
      },
    },
    {
      name: "notifyFrom",
      type: "text",
      label: "From address",
      required: true,
      defaultValue: "IAS Website <noreply@iasamerica.com>",
      admin: {
        description:
          "The verified sender the alert is sent as. This must be an address on a domain " +
          "verified in Resend. If iasamerica.com is NOT yet verified, sends will fail until " +
          'it is — as a stopgap you can set this to "IAS Website <onboarding@resend.dev>" ' +
          "(Resend's shared sender), which only delivers to the Resend account owner's inbox.",
      },
    },
  ],
};
