import type { NextConfig } from "next";

// Old static-site URLs -> new Next.js routes (permanent 301s for SEO continuity)
const STATIC_MAP: Record<string, string> = {
  "/index.html": "/",
  "/about.html": "/about",
  "/services.html": "/services",
  "/qa-programs.html": "/qa-programs",
  "/custom-testing.html": "/custom-testing",
  "/instrumentation.html": "/instrumentation",
  "/industries.html": "/industries",
  "/pricing.html": "/pricing",
  "/get-started.html": "/get-started",
  "/contact.html": "/contact",
};

const INDUSTRY_SLUGS = [
  "pharmaceutical-testing",
  "medical-device-testing",
  "dialysis-water-testing",
  "clinical-research-testing",
  "veterinary-toxicology-testing",
  "industrial-process-testing",
  "chemical-testing",
  "food-beverage-testing",
  "water-testing",
  "environmental-testing",
  "rd-analytical-testing",
  "facilities-testing",
];

const nextConfig: NextConfig = {
  images: {
    // Prefer AVIF (≈20–30% smaller than WebP), fall back to WebP.
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    const staticRedirects = Object.entries(STATIC_MAP).map(([source, destination]) => ({
      source,
      destination,
      permanent: true,
    }));
    const industryRedirects = INDUSTRY_SLUGS.map((slug) => ({
      source: `/${slug}.html`,
      destination: `/industries/${slug}`,
      permanent: true,
    }));
    return [...staticRedirects, ...industryRedirects];
  },
};

export default nextConfig;
