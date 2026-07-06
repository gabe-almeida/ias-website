import type { Access, FieldAccess } from "payload";

// Role-based access helpers for the Science Hub CMS.
// Roles live on the Users collection: 'admin' | 'editor' | 'author'.
// Note: the public site reads posts through Payload's Local API (server-side),
// which bypasses these rules — so these primarily guard the REST/GraphQL API
// and the /admin panel. posts.ts still filters to published explicitly.

type Role = "admin" | "editor" | "author";

const hasRole = (user: unknown, ...roles: Role[]): boolean => {
  const r = (user as { roles?: Role[] } | null)?.roles;
  return Array.isArray(r) && r.some((role) => roles.includes(role));
};

export const isAuthenticated: Access = ({ req: { user } }) => Boolean(user);
export const isAdmin: Access = ({ req: { user } }) => hasRole(user, "admin");
export const isEditor: Access = ({ req: { user } }) => hasRole(user, "admin", "editor");
export const isAuthorOrAbove: Access = ({ req: { user } }) =>
  hasRole(user, "admin", "editor", "author");

export const anyoneRead: Access = () => true;

// Only admins may edit the `roles` field (privilege escalation guard).
export const isAdminField: FieldAccess = ({ req: { user } }) => hasRole(user, "admin");

// Public users may read only published posts; any logged-in user reads all.
export const publishedOrAuthed: Access = ({ req: { user } }) => {
  if (user) return true;
  return { _status: { equals: "published" } };
};

// Admins/editors may update any post; authors only their own.
export const canUpdatePost: Access = ({ req: { user } }) => {
  if (!user) return false;
  if (hasRole(user, "admin", "editor")) return true;
  if (hasRole(user, "author")) return { authors: { contains: (user as { id: string | number }).id } };
  return false;
};

// A user may read/update their own record; admins may act on anyone.
export const adminOrSelf: Access = ({ req: { user }, id }) => {
  if (!user) return false;
  if (hasRole(user, "admin")) return true;
  const uid = (user as { id: string | number }).id;
  if (id) return uid === id;
  return { id: { equals: uid } };
};
