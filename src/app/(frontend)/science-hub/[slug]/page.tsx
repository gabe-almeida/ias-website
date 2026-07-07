import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { RichText } from "@payloadcms/richtext-lexical/react";
import { Arrow } from "@/components/blocks";
import { JsonLd } from "@/components/JsonLd";
import { getAllPosts, getPostBySlug, formatDate } from "@/lib/posts";
import { SITE } from "@/lib/site";

export async function generateStaticParams() {
  return (await getAllPosts()).map((p) => ({ slug: p.slug }));
}

// Pre-render known posts at build; render newly-published ones on first request
// (then cache). Unknown slugs still 404 via notFound() below.
export const dynamicParams = true;
export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) return {};
  const url = `/science-hub/${p.slug}`;
  return {
    title: `${p.title} | IAS Science Hub`,
    description: p.excerpt,
    alternates: { canonical: url },
    openGraph: {
      title: p.title,
      description: p.excerpt,
      url,
      type: "article",
      publishedTime: p.date,
      modifiedTime: p.updated,
      authors: p.authors,
      ...(p.ogImage ? { images: [p.ogImage] } : {}),
    },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = await getPostBySlug(slug);
  if (!p) notFound();

  const url = `${SITE.baseUrl}/science-hub/${p.slug}`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: p.excerpt,
      datePublished: p.date,
      dateModified: p.updated,
      author: p.authors.map((name) => ({ "@type": "Person", name })),
      publisher: { "@type": "Organization", name: SITE.name, url: SITE.baseUrl + "/" },
      mainEntityOfPage: url,
      url,
      ...(p.ogImage ? { image: `${SITE.baseUrl}${p.ogImage}` } : {}),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl + "/" },
        { "@type": "ListItem", position: 2, name: "Science Hub", item: `${SITE.baseUrl}/science-hub` },
        { "@type": "ListItem", position: 3, name: p.title, item: url },
      ],
    },
  ];

  return (
    <>
      <JsonLd data={jsonld} />
      <article>
        <header className="post-head">
          <div className="wrap">
            <div className="breadcrumb">
              <Link href="/">Home</Link> <span className="sep">/</span>{" "}
              <Link href="/science-hub">Science Hub</Link> <span className="sep">/</span>{" "}
              <span>{p.title}</span>
            </div>
            <div className="post-meta">
              <Link href={`/science-hub/category/${p.categorySlug}`} className="cat-chip">
                {p.category}
              </Link>
              <time dateTime={p.date}>{formatDate(p.date)}</time>
              <span className="dot-sep">·</span>
              <span>{p.author}</span>
            </div>
            <h1>{p.title}</h1>
            <p className="lead">{p.excerpt}</p>
          </div>
        </header>

        {/* Cover hero. Rendered only when a cover was uploaded — the field is
            optional, so posts without one (e.g. the seeded posts) look exactly
            as before. Plain <img> (not next/image) because the src is a
            Payload-served upload URL (/api/media/...) of unknown intrinsic
            dimensions; this matches how Payload's own Lexical renderer emits
            inline upload images on this same route, and next/image has no
            remotePatterns configured for it. CSS crops to a 16:9 band. */}
        {p.cover && (
          <figure className="post-hero">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={p.cover} alt={p.coverAlt ?? ""} decoding="async" />
          </figure>
        )}

        <section className="section">
          <div className="wrap">
            <div className="prose">
              <RichText data={p.content} />
            </div>
            <div className="post-foot">
              <Link href="/science-hub" className="btn btn-ghost btn-sm">
                <Arrow /> Back to Science Hub
              </Link>
            </div>
          </div>
        </section>
      </article>
    </>
  );
}
