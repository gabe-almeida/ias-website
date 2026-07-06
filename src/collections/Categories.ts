import type { CollectionConfig } from "payload";
import { anyoneRead, isEditor } from "../access";
import { slugField } from "../fields/slug";

// Post categories (e.g. "Industry News", "Scientific News"). Replaces the
// legacy free-text frontmatter category with a real relationship so
// /science-hub/category/[slug] pages are stable.
export const Categories: CollectionConfig = {
  slug: "categories",
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug"] },
  access: { read: anyoneRead, create: isEditor, update: isEditor, delete: isEditor },
  fields: [
    { name: "name", type: "text", required: true, unique: true },
    ...slugField("name"),
    { name: "description", type: "textarea" },
  ],
};
