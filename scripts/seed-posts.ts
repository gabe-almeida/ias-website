/**
 * One-off migration: import the legacy markdown Science Hub posts
 * (content/science-hub/*.md) into Payload. Idempotent — re-running updates
 * existing posts by slug rather than duplicating.
 *
 *   npm run seed:posts
 *
 * After a successful run the markdown files + remark deps can be removed.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPayload } from "payload";
import { convertMarkdownToLexical, editorConfigFactory } from "@payloadcms/richtext-lexical";
import config from "../src/payload.config.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const POSTS_DIR = path.resolve(dirname, "../content/science-hub");

const slugify = (v: string) =>
  v.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

function parseFrontmatter(raw: string) {
  const data: Record<string, string> = {};
  const m = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!m) return { data, body: raw };
  for (const line of m[1].split(/\r?\n/)) {
    const fm = /^([A-Za-z_][\w-]*)\s*:\s*(.*)$/.exec(line);
    if (!fm) continue;
    let val = fm[2].trim();
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[fm[1]] = val;
  }
  return { data, body: m[2] };
}

async function run() {
  const payload = await getPayload({ config });
  const editorConfig = await editorConfigFactory.default({ config: payload.config });

  const files = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"))
    : [];
  if (!files.length) {
    payload.logger.info("No markdown posts to migrate.");
    process.exit(0);
  }

  // A byline author account for the migrated editorial posts.
  const authorEmail = "editorial@iasamerica.com";
  let author = (
    await payload.find({ collection: "users", where: { email: { equals: authorEmail } }, limit: 1 })
  ).docs[0];
  if (!author) {
    author = await payload.create({
      collection: "users",
      data: {
        email: authorEmail,
        name: "IAS Editorial Team",
        roles: ["author"],
        password: Math.random().toString(36).slice(2) + "Aa1!",
      },
    });
    payload.logger.info(`Created author user ${authorEmail}`);
  }

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { data, body } = parseFrontmatter(raw);
    const slug = file.replace(/\.md$/, "");
    const categoryName = data.category || "Uncategorized";
    const categorySlug = slugify(categoryName);

    // Upsert category.
    let category = (
      await payload.find({ collection: "categories", where: { slug: { equals: categorySlug } }, limit: 1 })
    ).docs[0];
    if (!category) {
      category = await payload.create({
        collection: "categories",
        data: { name: categoryName, slug: categorySlug },
      });
    }

    const content = convertMarkdownToLexical({ editorConfig, markdown: body.trim() });
    const publishedAt = data.date ? new Date(data.date).toISOString() : new Date().toISOString();

    const fields = {
      title: data.title || slug,
      slug,
      excerpt: data.excerpt || "",
      content,
      category: category.id,
      authors: [author.id],
      publishedAt,
      _status: "published" as const,
    };

    const existing = (
      await payload.find({ collection: "posts", where: { slug: { equals: slug } }, limit: 1, draft: true })
    ).docs[0];

    if (existing) {
      await payload.update({ collection: "posts", id: existing.id, data: fields });
      payload.logger.info(`Updated post: ${slug}`);
    } else {
      await payload.create({ collection: "posts", data: fields });
      payload.logger.info(`Created post: ${slug}`);
    }
  }

  payload.logger.info("Migration complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
