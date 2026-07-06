import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRY_PAGES, industryPageBySlug } from "@/data/industryPages";
import { SITE } from "@/lib/site";
import IndustryDetail from "@/components/IndustryDetail";
import { JsonLd } from "@/components/JsonLd";

export function generateStaticParams() {
  return INDUSTRY_PAGES.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const d = industryPageBySlug(slug);
  if (!d) return {};
  return {
    title: d.title,
    description: d.metaDesc,
    alternates: { canonical: `/industries/${d.slug}` },
    openGraph: {
      title: d.title,
      description: d.metaDesc,
      url: `/industries/${d.slug}`,
    },
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const d = industryPageBySlug(slug);
  if (!d) notFound();

  const url = `${SITE.baseUrl}/industries/${d.slug}`;
  const jsonld = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: d.serviceType,
      name: d.h1,
      provider: { "@type": "MedicalBusiness", name: SITE.name, url: SITE.baseUrl + "/" },
      areaServed: "US",
      url,
      description: d.metaDesc,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE.baseUrl + "/" },
        { "@type": "ListItem", position: 2, name: "Industries", item: SITE.baseUrl + "/industries" },
        { "@type": "ListItem", position: 3, name: d.cardName, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: d.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      <JsonLd data={jsonld} />
      <IndustryDetail d={d} />
    </>
  );
}
