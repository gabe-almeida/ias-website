import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { sqliteAdapter } from "@payloadcms/db-sqlite";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { seoPlugin } from "@payloadcms/plugin-seo";
import sharp from "sharp";

import { Posts } from "./collections/Posts";
import { Categories } from "./collections/Categories";
import { Media } from "./collections/Media";
import { Users } from "./collections/Users";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
// Allow admin/API auth from both the canonical domain and Render's own URL
// (RENDER_EXTERNAL_URL is auto-set), so /admin works on ias-website.onrender.com
// before the domain is cut over, and on iasamerica.com after.
const allowedOrigins = [siteUrl, process.env.RENDER_EXTERNAL_URL].filter(
  (v): v is string => Boolean(v),
);

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: " · IAS Science Hub",
      description: "Content management for the IAS Science Hub.",
    },
    components: {
      // On-brand admin login/nav graphics (IAS logo). Registered via importMap.
      graphics: {
        Logo: "/components/admin/Logo#Logo",
        Icon: "/components/admin/Icon#Icon",
      },
      // Cloudflare Turnstile bot-gate above the login form (no-op until keys set).
      beforeLogin: ["/components/admin/TurnstileGate#TurnstileGate"],
    },
    // Resolve component string paths (above) relative to /src.
    importMap: { baseDir: dirname },
  },
  collections: [Posts, Categories, Media, Users],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  db: sqliteAdapter({
    client: { url: process.env.DATABASE_URI || "file:./blog.db" },
    // Auto-sync schema on boot (additive). Keeps first deploy on a fresh disk
    // zero-config. For destructive schema changes later, generate a migration
    // (`npm run payload -- migrate:create`) and review before deploying.
    push: true,
  }),
  sharp,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  typescript: { outputFile: path.resolve(dirname, "payload-types.ts") },
  plugins: [
    seoPlugin({
      collections: ["posts"],
      uploadsCollection: "media",
      tabbedUI: true,
      generateTitle: ({ doc }: { doc?: { title?: string } }) =>
        doc?.title ? `${doc.title} | IAS Science Hub` : "IAS Science Hub",
      generateDescription: ({ doc }: { doc?: { excerpt?: string } }) => doc?.excerpt ?? "",
    }),
  ],
});
