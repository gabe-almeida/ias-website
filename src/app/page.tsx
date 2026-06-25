import type { Metadata } from "next";
import Link from "next/link";
import {
  Arrow,
  Check,
  Svg,
  SectionHead,
  WhyCards,
  Steps,
  ServicesSplit,
  InstrumentsGrid,
  IndustriesGrid,
  PricePop,
  CtaBand,
} from "@/components/blocks";

export const metadata: Metadata = {
  title:
    "Industrial Analytical Services — Independent Analytical Laboratory | iasamerica.com",
  description:
    "IAS is an independent analytical laboratory for industrial, commercial & biomedical testing. ICP-MS, GC-MS, NMR, FTIR, SEM/EDS. Flat catalog pricing. No account required to submit a sample.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy reveal">
            <span className="eyebrow">
              <span className="dot"></span>Independent Analytical Laboratory · Est. 2000
            </span>
            <h1 style={{ marginTop: 20 }}>
              Industrial-Grade Testing,
              <br />
              <span className="hl">Without the Runaround.</span>
            </h1>
            <p className="lead">
              From trace metals to failure analysis, IAS combines advanced lab capabilities
              with straightforward catalog pricing and real chemists to consult with. No
              portals, no mystery quotes, no account required — just send your first sample
              and get started.
            </p>
            <div className="hero-cta">
              <Link href="/contact" className="btn btn-primary">
                Request a Free Consultation <Arrow />
              </Link>
              <Link href="/pricing" className="btn btn-ghost">
                See Our Pricing
              </Link>
            </div>
            <div className="hero-trust">
              <span>
                <Check />
                ICP-MS · GC-MS · NMR · FTIR · SEM/EDS
              </span>
              <span>
                <Check />
                Bottles &amp; materials supplied free
              </span>
              <span>
                <Check />
                Consultations included
              </span>
            </div>
          </div>
          <div className="hero-visual reveal">
            <div className="blob" style={{ width: 230, height: 230, background: "#BFD4FF", top: -30, right: 10 }}></div>
            <div className="blob" style={{ width: 180, height: 180, background: "#FFD0B0", bottom: -20, left: 0 }}></div>
            <div className="float f1">
              <div className="ico" style={{ background: "linear-gradient(135deg,#0A4BAE,#05409B)" }}>
                <Svg paths='<path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3"/><path d="M8 3h8M7.5 14h9"/>' />
              </div>
              <div>
                <div className="t">No account</div>
                <div className="s">to get started</div>
              </div>
            </div>
            <div className="float f2">
              <div className="ico" style={{ background: "linear-gradient(135deg,#1AA563,#0E8C50)" }}>
                <Check />
              </div>
              <div>
                <div className="t">Flat-rate</div>
                <div className="s">catalog pricing</div>
              </div>
            </div>
            <div className="hero-card">
              <div className="hc-top">
                <div>
                  <div style={{ fontWeight: 800, color: "var(--navy)", fontSize: "1.05rem" }}>
                    Sample #IAS-4821
                  </div>
                  <div style={{ fontSize: ".8rem", color: "var(--slate)", fontFamily: "var(--font-inter)", marginTop: 2 }}>
                    Potable water · standard turnaround
                  </div>
                </div>
                <span className="tag">Reported</span>
              </div>
              <div className="hc-row">
                <div>
                  <div className="nm">Heavy Metals Panel</div>
                  <div className="sub">ICP-MS · multi-element</div>
                </div>
                <div className="pr">$190</div>
              </div>
              <div className="hc-row">
                <div>
                  <div className="nm">SEM / EDS Analysis</div>
                  <div className="sub">Surface &amp; elemental</div>
                </div>
                <div className="pr">$250</div>
              </div>
              <div className="hc-row">
                <div>
                  <div className="nm">VOCs Scan</div>
                  <div className="sub">GC-MS · 59 compounds</div>
                </div>
                <div className="pr">$150</div>
              </div>
              <div className="hc-row">
                <div>
                  <div className="nm">Total Coliform &amp; E. coli</div>
                  <div className="sub">Presence / absence</div>
                </div>
                <div className="pr">$65</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="wrap stats-grid">
          <div className="stat"><div className="n"><span>24</span>+</div><div className="l">Years in Operation</div></div>
          <div className="stat"><div className="n">15+</div><div className="l">Instrument Platforms</div></div>
          <div className="stat"><div className="n">20+</div><div className="l">Industries Served</div></div>
          <div className="stat"><div className="n">1,000+</div><div className="l">Standard Tests, Priced</div></div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="What Sets Us Apart"
            title={<>A Lab That Works <span className="text-grad">The Way You Do</span></>}
            text="Big-lab capability with small-lab access. Here's what you get when you work with IAS."
          />
          <WhyCards />
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead
            eyebrow="How It Works"
            title="From Sample to Answer in Three Steps"
            text="No forms, no portals required — just a conversation with someone who knows the lab."
          />
          <Steps />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Testing Services"
            title="Ongoing Programs or a Single Sample"
            text="However you need to work with a lab, we've built for it."
          />
          <ServicesSplit />
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead
            eyebrow="Instrumentation"
            title="The Instruments Behind the Answers"
            text="Plain-language on what each platform does — and the questions it can answer for you."
          />
          <InstrumentsGrid />
          <div className="center" style={{ marginTop: 34 }}>
            <Link href="/instrumentation" className="btn btn-ghost">
              See full capabilities <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead
            eyebrow="Industries We Serve"
            title="Trusted Across Regulated & Demanding Fields"
            text="From pharmaceutical release testing to environmental remediation — the breadth to be your single lab partner."
          />
          <IndustriesGrid />
        </div>
      </section>

      <section className="section bg-pricing">
        <div className="wrap">
          <SectionHead
            eyebrow="Pricing & Test Catalog"
            title="Lab Pricing, About as Simple as It Gets"
            text="Heavy metals on a liquid sample? $190. SEM analysis? $250. Standard tests have standard prices."
          />
          <PricePop />
          <div className="center">
            <Link href="/pricing" className="btn btn-blue">
              Browse the full catalog <Arrow />
            </Link>
          </div>
        </div>
      </section>

      <CtaBand
        title="Not Sure Which Test You Need?"
        text="Get on the phone with an experienced chemist who can scope it with you — most consultations are included at no charge."
      />
    </>
  );
}
