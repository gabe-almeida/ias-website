import { getPayload } from "payload";
import config from "@payload-config";
import type { Category, Media, Post as CMSPost, User } from "../payload-types";

/**
 * Science Hub content layer — now backed by Payload CMS (SQLite).
 *
 * The public Science Hub routes and the sitemap consume ONLY the functions
 * below, keeping the same shapes as the old markdown layer (plus a few richer
 * fields — real modified dates, cover alt text, Lexical body) so the routes
 * needed only light edits. All queries are server-side via Payload's Local API
 * and return published posts only.
 */

export type PostMeta = {
  slug: string;
  title: string;
  date: string; // publishedAt, ISO
  updated: string; // updatedAt, ISO — powers dateModified for SEO freshness
  category: string;
  categorySlug: string;
  author: string; // display: authors joined
  authors: string[];
  excerpt: string;
  cover?: string; // hero-size display image URL (post page hero)
  coverCard?: string; // card-size image URL (listing/category thumbnails)
  coverAlt?: string;
  ogImage?: string; // 1200x630 social-share URL
};

export type Post = PostMeta & { content: CMSPost["content"] };

const cached = () => getPayload({ config });

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** "2026-06-19..." -> "June 19, 2026". Falls back gracefully on bad input. */
export function formatDate(iso: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso);
  if (!m) return iso;
  const [, y, mo, d] = m;
  const month = MONTHS[parseInt(mo, 10) - 1] ?? mo;
  return `${month} ${parseInt(d, 10)}, ${y}`;
}

export function slugify(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function toMeta(p: CMSPost): PostMeta {
  const cat = (typeof p.category === "object" ? p.category : null) as Category | null;
  const cover = (typeof p.cover === "object" ? p.cover : null) as Media | null;
  const authors = ((p.authors as (User | number)[] | undefined) ?? [])
    .map((a) => (typeof a === "object" ? a?.name : undefined))
    .filter((n): n is string => Boolean(n));
  const sizes = cover?.sizes;
  return {
    slug: p.slug,
    title: p.title,
    date: p.publishedAt || p.createdAt,
    updated: p.updatedAt,
    category: cat?.name ?? "Uncategorized",
    categorySlug: cat?.slug ?? "uncategorized",
    author: authors.join(", ") || "IAS Editorial Team",
    authors: authors.length ? authors : ["IAS Editorial Team"],
    excerpt: p.excerpt,
    cover: sizes?.hero?.url ?? cover?.url ?? undefined,
    coverCard: sizes?.card?.url ?? cover?.url ?? undefined,
    coverAlt: cover?.alt ?? undefined,
    ogImage: sizes?.og?.url ?? cover?.url ?? undefined,
  };
}

export async function getAllPosts(): Promise<PostMeta[]> {
  try {
    const payload = await cached();
    const { docs } = await payload.find({
      collection: "posts",
      where: { _status: { equals: "published" } },
      sort: "-publishedAt",
      depth: 1,
      limit: 500,
      overrideAccess: true,
    });
    return docs.map(toMeta);
  } catch (err) {
    // On Render the SQLite disk is mounted only at RUNTIME, not during
    // `next build`. DB reads at build time are therefore expected to fail —
    // return empty so the build succeeds; runtime ISR repopulates once the
    // disk is mounted. (Also covers a missing PAYLOAD_SECRET at build.)
    console.warn("[posts] getAllPosts: DB unavailable (expected at build) —", (err as Error)?.message);
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const payload = await cached();
    const { docs } = await payload.find({
      collection: "posts",
      where: { slug: { equals: slug }, _status: { equals: "published" } },
      depth: 2, // resolve cover + inline upload/relationship nodes in the body
      limit: 1,
      overrideAccess: true,
    });
    const p = docs[0];
    if (!p) return null;
    return { ...toMeta(p), content: p.content };
  } catch (err) {
    console.warn("[posts] getPostBySlug: DB unavailable (expected at build) —", (err as Error)?.message);
    return null;
  }
}

export async function getCategories(): Promise<{ name: string; slug: string; count: number }[]> {
  const posts = await getAllPosts();
  const map = new Map<string, { name: string; slug: string; count: number }>();
  for (const p of posts) {
    const entry = map.get(p.categorySlug) ?? { name: p.category, slug: p.categorySlug, count: 0 };
    entry.count++;
    map.set(p.categorySlug, entry);
  }
  return [...map.values()].sort((a, b) => b.count - a.count);
}

export async function getPostsByCategory(catSlug: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => p.categorySlug === catSlug);
}
