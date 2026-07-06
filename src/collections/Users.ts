import type { CollectionConfig } from "payload";
import { adminOrSelf, isAdmin, isAdminField, isAuthenticated } from "../access";

// Authenticated editors of the Science Hub. Payload provides secure auth out of
// the box: hashed+salted passwords, httpOnly cookies, sessions, lockout.
export const Users: CollectionConfig = {
  slug: "users",
  auth: {
    // Bot/brute-force protection: lock an account for 15 min after 5 bad tries.
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 2, // 2h sessions
    cookies: {
      secure: process.env.NODE_ENV === "production", // HTTPS-only in prod
      sameSite: "Lax",
    },
  },
  admin: { useAsTitle: "name", defaultColumns: ["name", "email", "roles"] },
  access: {
    read: isAuthenticated,
    create: isAdmin,
    update: adminOrSelf,
    delete: isAdmin,
    // Any authenticated user may reach the admin panel; per-collection access
    // rules then constrain what each role can actually do.
    admin: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "roles",
      type: "select",
      hasMany: true,
      required: true,
      defaultValue: ["author"],
      options: [
        { label: "Admin", value: "admin" },
        { label: "Editor", value: "editor" },
        { label: "Author", value: "author" },
      ],
      // Only admins can change roles (privilege-escalation guard).
      access: { update: isAdminField, create: isAdminField },
      admin: {
        description:
          "Admin: full control · Editor: publish & manage all posts · Author: write & edit own drafts",
      },
    },
  ],
};
