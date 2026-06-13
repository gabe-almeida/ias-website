import type { Metadata } from "next";
import { Svg, PageHero, CtaBand, SectionHead, ServicesSplit, Steps } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Testing Services — QA, Custom & One-Time Analytical Testing | IAS",
  description:
    "Explore IAS testing services: scheduled quality-assurance programs and custom one-time testing across water, solids and biological matrices.",
  alternates: { canonical: "/services" },
};

export default function Services() {
  return (
    <>
      <PageHero
        crumb="Testing Services"
        title="Testing services for every kind of question."
        text="From scheduled quality-assurance programs to one-off investigations, explore the full scope of what IAS can analyze — and how we make it easy to get started."
      />

      <section className="section">
        <div className="wrap">
          <ServicesSplit />
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead
            eyebrow="By sample type"
            title="What we test"
            text="A broad range of matrices across water, solids, and biological samples."
          />
          <div className="cards">
            <div className="card reveal">
              <div className="ico ic-blue"><Svg paths='<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M5 16c3 2 11 2 14 0M12 18v4"/>' /></div>
              <h3>Water &amp; liquids</h3>
              <p>Potable, process, cooling-tower, dialysis and waste water — metals, organics, microbiology, physical parameters and full multi-analyte scans.</p>
            </div>
            <div className="card reveal">
              <div className="ico ic-orange"><Svg paths='<path d="M3 21V8l6-3v3l6-3v3l6-3v16z"/>' /></div>
              <h3>Solids &amp; materials</h3>
              <p>Soil, paint, powders and industrial materials — priority-pollutant metals, VOCs, pesticides, PCBs, plus FTIR and SEM/EDS material ID.</p>
            </div>
            <div className="card reveal">
              <div className="ico ic-gold"><Svg paths='<path d="M6 2h12v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2"/><path d="M6 22h12v-6a4 4 0 0 0-4-4 4 4 0 0 0-4 4z"/>' /></div>
              <h3>Biological matrices</h3>
              <p>Blood, serum, tissue, dialysate and biologics — endotoxin, mycoplasma, trace metals and toxicology for clinical, veterinary and research work.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="How it works" title="Getting started is a conversation" />
          <Steps />
        </div>
      </section>

      <CtaBand
        title="Have a sample in hand?"
        text="Tell us what you're testing and we'll point you to the right method — or just send it in."
        primary={{ label: "Submit a sample", href: "/get-started" }}
        secondary={{ label: "Talk to a chemist", href: "/contact" }}
      />
    </>
  );
}
