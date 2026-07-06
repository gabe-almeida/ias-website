import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { PageHero, Arrow } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import {
  getCategories,
  getPostsByCategory,
  formatDate,
} from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  return (await getCategories()).map((c) => ({ cat: c.slug }));
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ cat: string }>;
}): Promise<Metadata> {
  const { cat } = await params;
  const category = (await getCategories()).find((c) => c.slug === cat);
  if (!category) return {};
  const url = `/science-hub/category/${category.slug}`;
  return {
    title: `${category.name} | IAS Science Hub`,
    description: `${category.name} articles from the IAS Science Hub.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${category.name} | IAS Science Hub`,
      description: `${category.name} articles from the IAS Science Hub.`,
      url,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ cat: string }>;
}) {
  const { cat } = await params;
  const category = (await getCategories()).find((c) => c.slug === cat);
  if (!category) notFound();
  const posts = await getPostsByCategory(category.slug);

  const url = `${SITE.baseUrl}/science-hub/category/${category.slug}`;
  const jsonld = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} | IAS Science Hub`,
    url,
    isPartOf: { "@type": "Blog", name: "IAS Science Hub", url: `${SITE.baseUrl}/science-hub` },
  };

  return (
    <>
      <JsonLd data={jsonld} />
      <PageHero
        crumb="Science Hub"
        title={category.name}
        text={`${category.name} articles from the IAS Science Hub.`}
      />

      <section className="section" style={{ paddingTop: 48 }}>
        <div className="wrap">
          <div className="cat-back">
            <Link href="/science-hub" className="btn btn-ghost btn-sm">
              <Arrow /> All posts
            </Link>
          </div>

          {posts.length === 0 ? (
            <p className="center" style={{ color: "var(--slate)" }}>
              No posts in this category yet.
            </p>
          ) : (
            <div className="hub-grid">
              {posts.map((p) => (
                <Link
                  key={p.slug}
                  href={`/science-hub/${p.slug}`}
                  className="post-card reveal"
                >
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
