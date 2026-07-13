import type { CollectionConfig } from "payload";
import { anyoneRead, isAuthenticated } from "../access";
import { notifyOnSubmission } from "../hooks/submissionEmail";

// Public lead-capture for the site's "Submit a Sample" / contact forms.
// The public <ContactForm> posts here via Payload's built-in REST endpoint
// (POST /api/submissions) — no bespoke API route needed, which also avoids
// colliding with Payload's own /api/[...slug] catch-all.
//
// Access: anyone may CREATE (public submission); only logged-in staff may
// read/update/delete, so leads are private to the /admin panel. Records persist
// on Render's mounted disk (the SQLite DB), so they survive redeploys.
export const Submissions: CollectionConfig = {
  slug: "submissions",
  labels: { singular: "Submission", plural: "Submissions" },
  admin: {
    useAsTitle: "company",
    defaultColumns: ["company", "email", "phone", "createdAt"],
    group: "Leads",
    description: "Sample-testing inquiries submitted from the public website.",
  },
  access: {
    create: anyoneRead, // public form submissions
    read: isAuthenticated,
    update: isAuthenticated,
    delete: isAuthenticated,
  },
  hooks: {
    // Spam honeypot: `website` is a hidden field no real user ever fills. If a
    // bot populates it, reject the create before it is stored or emailed.
    beforeValidate: [
      ({ data, operation }) => {
        if (operation === "create" && data?.website) {
          throw new Error("Submission rejected.");
        }
        return data;
      },
    ],
    afterChange: [notifyOnSubmission],
  },
  fields: [
    {
      type: "row",
      fields: [
        { name: "firstName", type: "text", required: true },
        { name: "lastName", type: "text", required: true },
      ],
    },
    { name: "company", type: "text", required: true },
    { name: "industry", type: "text" },
    {
      type: "row",
      fields: [
        { name: "phone", type: "text", required: true },
        { name: "email", type: "email", required: true },
      ],
    },
    { name: "message", type: "textarea", label: "Testing need" },
    // Honeypot — kept out of the admin UI; see beforeValidate above.
    { name: "website", type: "text", admin: { hidden: true } },
  ],
  timestamps: true,
};
