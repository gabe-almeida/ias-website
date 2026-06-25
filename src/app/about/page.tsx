import type { Metadata } from "next";
import { Check, Svg, PageHero, CtaBand, SectionHead } from "@/components/blocks";

export const metadata: Metadata = {
  title: "About IAS — Independent Analytical Laboratory Since 2000",
  description:
    "Founded in 2000, IAS is an ISO/IEC 17025 accredited independent analytical laboratory for industrial, commercial and biomedical testing — sophisticated instrumentation, catalog pricing, and direct access to expert chemists.",
  alternates: { canonical: "/about" },
};

export default function About() {
  return (
    <>
      <PageHero
        crumb="About IAS"
        title="An Independent Lab Built for Industry — Since 2000."
        text="IAS pairs sophisticated instrumentation with a refreshingly direct way of working: clear pricing, real expertise on the phone, and no bureaucracy between you and your answer."
      />

      <section className="section">
        <div className="wrap split">
          <div className="prose reveal">
            <h2>Sophisticated Capability, Without the Friction</h2>
            <p className="lead">
              Industrial Analytical Services is an independent analytical laboratory
              specializing in industrial, commercial, and biomedical testing. Founded in 2000,
              we serve clients across pharmaceutical, environmental, industrial, healthcare and
              research fields.
            </p>
            <p>
              We built IAS around a simple idea: a contract lab should be easy to work with.
              That means published, catalog-style pricing for standard tests, the freedom to
              submit a single sample without opening an account, and direct access to the
              chemists and chemical engineers actually doing the work.
            </p>
            <ul className="check-list">
              <li><Check />ISO/IEC 17025 accredited testing laboratory</li>
              <li><Check />Broad, sophisticated instrumentation — ICP-MS, ICP-OES, GC-MS, NMR, FTIR, SEM/EDS &amp; more</li>
              <li><Check />Decades of combined experience across chemistry, materials, industrial process &amp; biomedical testing</li>
              <li><Check />Flexible engagement — one-off requests alongside long-term scheduled programs</li>
              <li><Check />Bottles, containers &amp; submission materials supplied at no extra charge</li>
            </ul>
          </div>
          <div className="split-media reveal">
            <div className="stat-tiles">
              <div className="stat-tile"><div className="n"><span>24</span>+</div><div className="l">Years in Operation</div></div>
              <div className="stat-tile"><div className="n">15+</div><div className="l">Instrument Platforms</div></div>
              <div className="stat-tile"><div className="n">20+</div><div className="l">Industries Served</div></div>
              <div className="stat-tile"><div className="n">1,000+</div><div className="l">Standard Tests, Priced</div></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead eyebrow="What We Value" title="How We Approach Every Sample" />
          <div className="vrow">
            <div className="vitem reveal">
              <div className="ico"><Svg paths='<path d="M3 6h18M3 12h18M3 18h12"/>' /></div>
              <h4>Transparency</h4>
              <p>Published prices and clear reporting — a catalog, not a negotiation.</p>
            </div>
            <div className="vitem reveal">
              <div className="ico" style={{ background: "linear-gradient(135deg,#FC6007,#E55706)" }}>
                <Svg paths='<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>' />
              </div>
              <h4>Responsiveness</h4>
              <p>Real people, fast answers, and consultations included with most work.</p>
            </div>
            <div className="vitem reveal">
              <div className="ico" style={{ background: "linear-gradient(135deg,#F1B021,#E9A50A)" }}>
                <Svg paths='<path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/><path d="M9 12l2 2 4-4"/>' />
              </div>
              <h4>Rigor</h4>
              <p>Chain-of-custody and litigation-quality documentation when it matters.</p>
            </div>
            <div className="vitem reveal">
              <div className="ico" style={{ background: "linear-gradient(135deg,#11315F,#071D3D)" }}>
                <Svg paths='<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>' />
              </div>
              <h4>Expertise</h4>
              <p>Experienced chemists and chemical engineers behind every result.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Our Story" title="A Quarter-Century of Analytical Work" />
          <div className="timeline reveal">
            <div className="tl"><div className="yr">2000</div><h4>IAS Is Founded</h4><p>Industrial Analytical Services opens as an independent lab focused on industrial and commercial testing.</p></div>
            <div className="tl"><div className="yr">Growth</div><h4>Instrumentation Deepens</h4><p>Investment in ICP-MS, GC-MS, NMR, FTIR and SEM/EDS broadens the range of matrices and questions we can take on.</p></div>
            <div className="tl"><div className="yr">Today</div><h4>Partnership with ETR Laboratories</h4><p>IAS operates in partnership with sister company <a href="https://etrlabs.com" target="_blank" rel="noopener" style={{ color: "var(--blue)", fontWeight: 700 }}>ETR Laboratories</a>, extending capability and capacity across both labs.</p></div>
          </div>
        </div>
      </section>

      <CtaBand
        title="Let's Talk About Your Testing"
        text="Whether it's one sample or an ongoing program, we'll help you scope the right approach."
        primary={{ label: "Request a consultation", href: "/contact" }}
        secondary={{ label: "Submit a sample", href: "/get-started" }}
      />
    </>
  );
}
