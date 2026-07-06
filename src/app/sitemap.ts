import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { INDUSTRY_PAGES } from "@/data/industryPages";
import { getAllPosts, getCategories } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = SITE.baseUrl;
  const staticPaths = [
    "/",
    "/about",
    "/services",
    "/qa-programs",
    "/custom-testing",
    "/instrumentation",
    "/industries",
    "/pricing",
    "/get-started",
    "/contact",
    "/science-hub",
  ];
  const staticEntries = staticPaths.map((p) => ({
    url: base + p,
    priority: p === "/" ? 1.0 : 0.8,
  }));
  const industryEntries = INDUSTRY_PAGES.map((d) => ({
    url: `${base}/industries/${d.slug}`,
    priority: 0.7,
  }));
  const postEntries = (await getAllPosts()).map((p) => ({
    url: `${base}/science-hub/${p.slug}`,
    lastModified: p.updated,
    priority: 0.6,
  }));
  const categoryEntries = (await getCategories()).map((c) => ({
    url: `${base}/science-hub/category/${c.slug}`,
    priority: 0.5,
  }));
  return [
    ...staticEntries,
    ...industryEntries,
    ...postEntries,
    ...categoryEntries,
  ];
}
