import type { CollectionConfig } from "payload";
import path from "path";
import { anyoneRead, isAuthorOrAbove, isEditor } from "../access";

// Uploaded images for post covers and inline content. Files live on disk:
// locally under ./media, on Render under the mounted persistent disk
// (MEDIA_DIR=/var/data/media) so they survive redeploys.
export const Media: CollectionConfig = {
  slug: "media",
  access: { read: anyoneRead, create: isAuthorOrAbove, update: isAuthorOrAbove, delete: isEditor },
  upload: {
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), "media"),
    mimeTypes: ["image/*"],
    // Responsive derivatives so next/image can serve right-sized files.
    imageSizes: [
      { name: "thumbnail", width: 400 },
      { name: "card", width: 768 },
      { name: "hero", width: 1600 },
      { name: "og", width: 1200, height: 630, position: "centre" },
    ],
    focalPoint: true,
    adminThumbnail: "thumbnail",
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: { description: "Describe the image for accessibility & SEO." },
    },
    { name: "caption", type: "text" },
  ],
};
