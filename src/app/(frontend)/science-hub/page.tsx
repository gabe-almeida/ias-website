import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Arrow } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getCategories, formatDate } from "@/lib/posts";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "IAS Science Hub — Analytical Science & Industry News | IAS",
  description:
    "Science and industry news from the IAS laboratory: methods, instrumentation, compliance, and practical testing guidance across water, materials, and biological matrices.",
  alternates: { canonical: "/science-hub" },
  openGraph: {
    title: "IAS Science Hub — Analytical Science & Industry News",
    description:
      "Science and industry news from the IAS laboratory — methods, compliance, and practical testing guidance.",
    url: "/science-hub",
  },
};

// Refresh the listing periodically; new/edited posts also revalidate this path
// instantly via the Posts afterChange hook.
export const revalidate = 300;

export default async function ScienceHubIndex() {
  const posts = await getAllPosts();
  const categories = await getCategories();

  const jsonld = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "IAS Science Hub",
    description:
      "Science and industry news from the IAS laboratory.",
    url: `${SITE.baseUrl}/science-hub`,
    publisher: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl + "/" },
  };

  return (
    <>
      <JsonLd data={jsonld} />
      <PageHero
        crumb="Science Hub"
        title="The IAS Science Hub"
        text="Analytical-science insight and practical guidance from the IAS lab — covering methods, instrumentation, compliance, and the real questions we hear from the industries we serve."
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          {categories.length > 0 && (
            <div className="cat-row reveal">
              <Link
                href="/science-hub"
                className="cat-chip cat-chip--all"
              >
                All
              </Link>
              {categories.map((c) => (
                <Link
                  key={c.slug}
                  href={`/science-hub/category/${c.slug}`}
                  className="cat-chip"
                >
                  {c.name} <span className="cat-count">{c.count}</span>
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 ? (
            <p className="center" style={{ color: "var(--slate)" }}>
              No posts yet — check back soon.
            </p>
          ) : (
            <div className="hub-grid">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/science-hub/${p.slug}`}
                  className="post-card reveal"
                >
                  {p.coverCard && (
                    <span className="post-card__thumb">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.coverCard}
                        alt={p.coverAlt ?? ""}
                        loading="lazy"
                        decoding="async"
                      />
                    </span>
                  )}
                  <span className="cat-chip">{p.category}</span>
                  <h3>{p.title}</h3>
                  <p className="excerpt">{p.excerpt}</p>
                  <div className="post-card-foot">
                    <span className="date">{formatDate(p.date)}</span>
                    <span className="more">
                      Read <Arrow />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
