import type { Field } from "payload";

// Matches the slugify() used by the legacy markdown blog (src/lib/posts.ts)
// so migrated URLs stay identical.
export const slugify = (v: string): string =>
  v
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

// Reusable slug field: auto-derives from `from` (default "title") when left
// blank, always normalised, unique + indexed for fast lookups by URL.
export const slugField = (from = "title"): Field[] => [
  {
    name: "slug",
    type: "text",
    required: true,
    unique: true,
    index: true,
    admin: {
      position: "sidebar",
      description: "URL path segment. Auto-generated from the title — edit only if needed.",
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === "string" && value.length > 0) return slugify(value);
          const src = (data as Record<string, unknown> | undefined)?.[from];
          return typeof src === "string" ? slugify(src) : value;
        },
      ],
    },
  },
];
