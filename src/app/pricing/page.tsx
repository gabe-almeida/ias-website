import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Svg, PageHero, CtaBand, PricePop } from "@/components/blocks";
import PricingCatalog from "@/components/PricingCatalog";

export const metadata: Metadata = {
  title: "Pricing & Test Catalog — Flat-Rate Analytical Testing | IAS",
  description:
    "Browse 100+ IAS tests with flat catalog pricing — water, soil, materials and biological matrices. Search and filter the full test catalog. Bottles and consultations included.",
  alternates: { canonical: "/pricing" },
};

export default function Pricing() {
  return (
    <>
      <PageHero
        crumb="Pricing & Test Catalog"
        title="Lab pricing, about as simple as it gets."
        text="Standard tests have standard prices. Heavy metals on a liquid sample? $190. SEM analysis? $250. Search the full catalog below — and for anything custom, just call."
      >
        <Link href="/get-started" className="btn btn-primary">
          Submit a sample <Arrow />
        </Link>
        <a href="tel:9784663422" className="btn btn-outline-white">
          Call (978) 466-3422
        </a>
      </PageHero>

      <section className="section bg-pricing">
        <div className="wrap">
          <PricePop />
          <PricingCatalog />
          <div className="cards" style={{ marginTop: 40 }}>
            <div className="card reveal"><div className="ico ic-blue"><Svg paths='<path d="M3 6h18M3 12h18M3 18h12"/>' /></div><h3>Flat per-test pricing</h3><p>The majority of analyses are flat-rate with no hidden fees. Volume and scheduled-account pricing available on request.</p></div>
            <div className="card reveal"><div className="ico ic-orange"><Svg paths='<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' /></div><h3>Rush turnaround</h3><p>Need it fast? Rush processing is available at additional cost — just ask when you submit.</p></div>
            <div className="card reveal"><div className="ico ic-gold"><Svg paths='<path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3"/>' /></div><h3>Materials included</h3><p>Bottles and submission materials are supplied at no charge. No account required for first-time submissions.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Don't see your test listed?"
        text="Custom or non-listed work is no problem — call us for a quick, straightforward quote."
        primary={{ label: "Call (978) 466-3422", href: "tel:9784663422" }}
        secondary={{ label: "Submit a sample", href: "/get-started" }}
      />
    </>
  );
}
