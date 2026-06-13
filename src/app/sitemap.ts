import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { INDUSTRY_PAGES } from "@/data/industryPages";

export default function sitemap(): MetadataRoute.Sitemap {
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
  ];
  const staticEntries = staticPaths.map((p) => ({
    url: base + p,
    priority: p === "/" ? 1.0 : 0.8,
  }));
  const industryEntries = INDUSTRY_PAGES.map((d) => ({
    url: `${base}/industries/${d.slug}`,
    priority: 0.7,
  }));
  return [...staticEntries, ...industryEntries];
}
