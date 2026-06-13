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
        title="Scheduled QA testing that keeps you in compliance."
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
            <h2>Ongoing testing, handled</h2>
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
              <div className="cap">Type I · II · III &amp; additional method types</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead eyebrow="Common QA services" title="Programs we run routinely" />
          <div className="cards">
            <div className="card reveal"><div className="ico ic-blue"><Svg paths='<path d="M3 6h18M3 12h18M3 18h12"/>' /></div><h3>ASTM standardized testing</h3><p>Type I, Type II, Type III and additional method types, run to specification.</p></div>
            <div className="card reveal"><div className="ico ic-orange"><Svg paths='<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>' /></div><h3>Endotoxin (LAL) testing</h3><p>Bacterial endotoxin testing for pharmaceutical and medical-device clients.</p></div>
            <div className="card reveal"><div className="ico ic-gold"><Svg paths='<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/>' /></div><h3>Mycoplasma detection</h3><p>Screening to support biologics and cell-culture quality control.</p></div>
            <div className="card reveal"><div className="ico ic-navy"><Svg paths='<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/>' /></div><h3>Microbiology</h3><p>Environmental monitoring, water, process streams and surfaces.</p></div>
            <div className="card reveal"><div className="ico ic-blue"><Svg paths='<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M12 18v4"/>' /></div><h3>Cooling tower &amp; dialysis water</h3><p>Cooling-tower chemistry and biology, plus full-panel dialysis water monitoring.</p></div>
            <div className="card reveal"><div className="ico ic-orange"><Svg paths='<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' /></div><h3>Raw material &amp; release QC</h3><p>Raw-material and in-process QC plus finished-product release testing.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to set up a program?"
        text="We'll tailor scheduled testing to your facility and handle the logistics end-to-end."
        primary={{ label: "Get started", href: "/get-started" }}
        secondary={{ label: "Talk to a chemist", href: "/contact" }}
      />
    </>
  );
}
