import type { CollectionConfig } from "payload";
import { canDeletePost, canUpdatePost, isAuthorOrAbove, publishedOrAuthed } from "../access";
import { slugField } from "../fields/slug";
import { revalidatePost, revalidatePostDelete } from "../hooks/revalidatePost";

// The Science Hub blog. Field set mirrors the legacy markdown frontmatter
// (title, slug, category, author, excerpt, cover) plus a Lexical rich-text
// body and real draft/publish + timestamps. Public pages read this via
// src/lib/posts.ts.
export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "category", "_status", "publishedAt"],
    // "Preview" button in admin opens the live public page — but only once the
    // post is published: the public /science-hub/[slug] route reads published
    // docs only (getPostBySlug filters _status=published), so previewing a
    // draft would 404. Returning null here makes Payload omit the Preview
    // button entirely on unpublished docs (PreviewButton renders null when the
    // preview fn yields no URL). Published docs still get a working Preview.
    preview: (doc) =>
      doc?._status === "published" && doc?.slug ? `/science-hub/${doc.slug}` : null,
  },
  // Draft/publish workflow: drafts are never shown publicly.
  versions: { drafts: { autosave: false }, maxPerDoc: 25 },
  access: {
    read: publishedOrAuthed,
    create: isAuthorOrAbove,
    update: canUpdatePost,
    delete: canDeletePost,
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Stamp publishedAt the first time a post goes live.
        if (data?._status === "published" && !data.publishedAt) {
          data.publishedAt = new Date().toISOString();
        }
        return data;
      },
    ],
    afterChange: [revalidatePost],
    afterDelete: [revalidatePostDelete],
  },
  fields: [
    { name: "title", type: "text", required: true },
    ...slugField("title"),
    {
      name: "excerpt",
      type: "textarea",
      required: true,
      maxLength: 300,
      admin: {
        description: "One–two sentence summary. Used on cards and as the meta-description/OG fallback.",
      },
    },
    {
      name: "cover",
      type: "upload",
      relationTo: "media",
      admin: { description: "Hero/cover image. Also the default social-share (OG) image." },
    },
    {
      name: "content",
      type: "richText",
      required: true,
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      required: true,
      admin: { position: "sidebar" },
    },
    {
      name: "authors",
      type: "relationship",
      relationTo: "users",
      hasMany: true,
      required: true,
      defaultValue: ({ user }) => (user ? [user.id] : []),
      admin: { position: "sidebar" },
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
        date: { pickerAppearance: "dayAndTime" },
        description: "Set automatically on first publish; override to backdate.",
      },
    },
  ],
};
