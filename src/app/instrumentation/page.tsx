import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Svg, PageHero, CtaBand, SectionHead, InstrumentsGrid } from "@/components/blocks";

export const metadata: Metadata = {
  title:
    "Instrumentation & Analytical Capabilities — ICP-MS, GC-MS, NMR, FTIR, SEM/EDS | IAS",
  description:
    "IAS instrumentation: ICP-MS, ICP-OES, GC-MS, NMR, FTIR and SEM/EDS — what each platform does and the questions it answers, plus wet chemistry and ASTM physical methods.",
  alternates: { canonical: "/instrumentation" },
};

export default function Instrumentation() {
  return (
    <>
      <PageHero
        crumb="Instrumentation & Capabilities"
        title="The instruments behind the answers."
        text="A broad, sophisticated instrument base — from parts-per-trillion trace metals to molecular structure to surface and elemental imaging. Here's what each platform does, in plain language."
      >
        <Link href="/contact" className="btn btn-primary">
          Ask about a specific test <Arrow />
        </Link>
      </PageHero>

      <section className="section">
        <div className="wrap">
          <InstrumentsGrid />
          <div className="inst-more reveal">
            Additional capabilities include wet chemistry, titrations, pH/conductivity, Karl
            Fischer moisture, dissolved gases, microbiological plate counts, and select ASTM
            physical methods.{" "}
            <Link href="/contact" style={{ color: "var(--blue)", fontWeight: 700 }}>
              Ask about a specific test →
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead
            eyebrow="Why it matters"
            title="Depth that answers harder questions"
            text="The breadth of our instrumentation means more of your testing can happen under one roof — with the cross-checks that give you confidence in the result."
          />
          <div className="vrow">
            <div className="vitem reveal"><div className="ico"><Svg paths='<path d="M3 12h4l2 6 4-12 2 6h6"/>' /></div><h4>Trace sensitivity</h4><p>Parts-per-trillion detection for metals in demanding matrices.</p></div>
            <div className="vitem reveal"><div className="ico" style={{ background: "linear-gradient(135deg,#FC6007,#E55706)" }}><Svg paths='<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>' /></div><h4>Molecular ID</h4><p>NMR and FTIR confirm structure and fingerprint unknowns.</p></div>
            <div className="vitem reveal"><div className="ico" style={{ background: "linear-gradient(135deg,#F1B021,#E9A50A)" }}><Svg paths='<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>' /></div><h4>Surface &amp; particle</h4><p>SEM/EDS images and analyzes surfaces, particles and defects.</p></div>
            <div className="vitem reveal"><div className="ico" style={{ background: "linear-gradient(135deg,#11315F,#071D3D)" }}><Svg paths='<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/>' /></div><h4>One lab, many methods</h4><p>Fewer vendors, faster correlation across techniques.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not sure which instrument fits?"
        text="Tell us the question you're trying to answer and we'll recommend the right method."
        primary={{ label: "Ask a chemist", href: "/contact" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />
    </>
  );
}
