import type { Metadata } from "next";
import Link from "next/link";
import { Arrow, Svg, PageHero, CtaBand, SectionHead } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Quality Assurance & Scheduled Testing Programs | IAS",
  description:
    "Scheduled QA testing programs from IAS: ASTM methods, endotoxin (LAL), mycoplasma, microbiology, cooling-tower and dialysis water monitoring, raw-material and release QC.",
  alternates: { canonical: "/qa-programs" },
};

export default function QaPrograms() {
  return (
    <>
      <PageHero
        crumb="Quality Assurance Programs"
        title="Scheduled QA Testing That Keeps You in Compliance."
        text="Routine, scheduled programs that keep your operations in compliance and your processes under control — set up around your facility's requirements and production cycles."
      >
        <Link href="/get-started" className="btn btn-primary">
          Set up a program <Arrow />
        </Link>
        <Link href="/pricing" className="btn btn-outline-white">
          View pricing
        </Link>
      </PageHero>

      <section className="section">
        <div className="wrap split">
          <div className="prose reveal">
            <h2>Ongoing Testing, Handled</h2>
            <p className="lead">
              Many of our clients rely on IAS for ongoing, scheduled quality-assurance testing.
              We set up a program tailored to your compliance requirements, production cycles, or
              internal quality standards — and we handle the logistics.
            </p>
            <p>Accounts are easy to open, repeat submissions are simple, and your results come back clearly and on schedule.</p>
            <Link href="/get-started" className="btn btn-blue" style={{ marginTop: 8 }}>
              Open an account
            </Link>
          </div>
          <div className="split-media media-soft reveal">
            <div className="badge-float">
              <div className="big"><span>ASTM</span></div>
              <div className="cap">ASTM D1193 — Type I · II · III · IV &amp; more</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead eyebrow="Common QA Services" title="Programs We Run Routinely" />
          <div className="cards">
            <div className="card reveal"><div className="ico ic-blue"><Svg paths='<path d="M3 6h18M3 12h18M3 18h12"/>' /></div><h3>ASTM Standardized Testing</h3><p>Type I, Type II, Type III and additional method types, run to specification.</p></div>
            <div className="card reveal"><div className="ico ic-orange"><Svg paths='<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>' /></div><h3>Endotoxin (LAL) Testing</h3><p>Bacterial endotoxin testing for pharmaceutical and medical-device clients.</p></div>
            <div className="card reveal"><div className="ico ic-gold"><Svg paths='<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/>' /></div><h3>Mycoplasma Detection</h3><p>Screening to support biologics and cell-culture quality control.</p></div>
            <div className="card reveal"><div className="ico ic-navy"><Svg paths='<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/>' /></div><h3>Microbiology</h3><p>Environmental monitoring, water, process streams and surfaces.</p></div>
            <div className="card reveal"><div className="ico ic-blue"><Svg paths='<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M12 18v4"/>' /></div><h3>Cooling Tower &amp; Dialysis Water</h3><p>Cooling-tower chemistry and biology, plus full-panel dialysis water monitoring.</p></div>
            <div className="card reveal"><div className="ico ic-orange"><Svg paths='<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' /></div><h3>Raw Material &amp; Release QC</h3><p>Raw-material and in-process QC plus finished-product release testing.</p></div>
            <div className="card reveal"><div className="ico ic-gold"><Svg paths='<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/><path d="M9 18a3 3 0 0 0 6 0"/>' /></div><h3>Food &amp; Dairy Testing</h3><p>Microbiology, contaminants and quality testing for dairy and food producers.</p></div>
            <div className="card reveal"><div className="ico ic-navy"><Svg paths='<path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/><path d="M9 12l2 2 4-4"/>' /></div><h3>Filtration Efficacy Testing</h3><p>Programs that validate filter and membrane performance against your specifications.</p></div>
            <div className="card reveal"><div className="ico ic-blue"><Svg paths='<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>' /></div><h3>Product Quality</h3><p>Finished-product quality testing to support release and shelf-life programs.</p></div>
            <div className="card reveal"><div className="ico ic-orange"><Svg paths='<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/><path d="M8 14h8"/>' /></div><h3>Custom Method Development</h3><p>Customized testing — methods built around your analyte, matrix or specification.</p></div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Reagent Water Standard"
            title="ASTM D1193 — Reagent-Grade Water Specification"
            text="ASTM D1193 is the standard specification that defines the requirements for reagent-grade water used in laboratory and analytical testing. It establishes quality parameters across four purity levels (Type I through Type IV) to ensure water does not interfere with chemical analyses. Testing protocols and allowable contaminant limits vary significantly depending on the assigned Type."
          />
          <div className="cards">
            <div className="card reveal">
              <h3>Type I</h3>
              <p>The highest purity, used for sensitive procedures such as trace metal analysis, HPLC, and gas chromatography. Requires a minimum electrical resistivity of 18 MΩ·cm at 25°C and a maximum Total Organic Carbon (TOC) of 50 ppb.</p>
            </div>
            <div className="card reveal">
              <h3>Type II</h3>
              <p>Used for general laboratory practices, reagent preparation, and qualitative analyses. Requires a resistivity of 1.0 MΩ·cm at 25°C and TOC up to 50 ppb.</p>
            </div>
            <div className="card reveal">
              <h3>Type III</h3>
              <p>Intended for routine analyses, glassware washing, and rinsing. Requires a resistivity of 4.0 MΩ·cm at 25°C and TOC up to 200 ppb.</p>
            </div>
            <div className="card reveal">
              <h3>Type IV</h3>
              <p>For general laboratory use where lower purity is acceptable. Requires a resistivity of 0.2 MΩ·cm at 25°C.</p>
            </div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to Set up a Program?"
        text="We'll tailor scheduled testing to your facility and handle the logistics end-to-end."
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: "Talk to a chemist", href: "/contact" }}
      />
    </>
  );
}
