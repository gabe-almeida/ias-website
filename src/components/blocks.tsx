import Link from "next/link";
import React from "react";
import { INDUSTRIES } from "@/data/industries";
import { INSTRUMENTS } from "@/data/instruments";
import { Svg, P, Arrow, Check, Phone } from "./icons";

/** internal route -> Link, tel/mailto/external -> <a> */
export function Btn({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: React.ReactNode;
}) {
  const external = /^(tel:|mailto:|https?:)/.test(href);
  if (external)
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function SectionHead({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  text?: React.ReactNode;
}) {
  return (
    <div className="section-head reveal">
      {eyebrow && (
        <span className="eyebrow">
          {eyebrow}
        </span>
      )}
      <h2 style={{ marginTop: 12 }}>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

export function PageHero({
  crumb,
  title,
  text,
  children,
}: {
  crumb: string;
  title: React.ReactNode;
  text: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <Svg paths={P.chevronR} /> <span>{crumb}</span>
        </div>
        <h1>{title}</h1>
        <p>{text}</p>
        {children && <div className="hero-cta">{children}</div>}
      </div>
    </section>
  );
}

export function CtaBand({
  title,
  text,
  primary = { label: "Call (978) 466-3422", href: "tel:9784663422" },
  secondary = { label: "Send us a message", href: "/contact" },
}: {
  title: React.ReactNode;
  text: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="cta-band reveal">
          <h2>{title}</h2>
          <p>{text}</p>
          <div className="hero-cta">
            <Btn href={primary.href} className="btn btn-primary">
              {primary.label}
            </Btn>
            <Btn href={secondary.href} className="btn btn-outline-white">
              {secondary.label}
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IndustriesGrid({ extraClass = "" }: { extraClass?: string }) {
  return (
    <div className={`ind${extraClass ? " " + extraClass : ""}`}>
      {INDUSTRIES.map((ind) => (
        <Link key={ind.slug} className="ind-card reveal" href={`/industries/${ind.slug}`}>
          <div className="ico">
            <Svg paths={ind.icon} />
          </div>
          <h4>{ind.name}</h4>
          <p>{ind.desc}</p>
          <span className="ind-more">
            Explore <Arrow />
          </span>
        </Link>
      ))}
    </div>
  );
}

export function InstrumentsGrid() {
  return (
    <div className="inst">
      {INSTRUMENTS.map((it) => (
        <div key={it.abbr} className="inst-card reveal">
          <div className="abbr">
            <span className="b"></span>
            {it.abbr}
          </div>
          <div className="full">{it.full}</div>
          <p>{it.desc}</p>
          <div className="apps">
            <b>Common uses:</b> {it.apps}
          </div>
        </div>
      ))}
    </div>
  );
}

export function WhyCards() {
  const cards: [string, string, string, string][] = [
    ["ic-blue", '<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2.4"/><circle cx="19" cy="6" r="2.4"/><circle cx="12" cy="20" r="2.4"/><path d="M7 7l3 3M17 7l-3 3M12 15v3"/>', "Sophisticated Instrumentation", "ICP-MS, ICP-OES, GC-MS, NMR, FTIR and SEM/EDS under one roof — trace metals to molecular structure to surface analysis."],
    ["ic-orange", '<path d="M3 6h18M3 12h18M3 18h12"/><circle cx="20" cy="18" r="2"/>', "Catalog-Style Pricing", "Standard tests have standard prices. Heavy metals on a liquid? $190. SEM analysis? $325. No mystery quotes for routine work."],
    ["ic-gold", '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>', "No Bureaucracy", "Submit samples without setting up a formal account. One-off requests are welcome alongside long-term programs."],
    ["ic-navy", '<path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21V12h6v9"/>', "Materials Supplied Free", "We can send the bottles, sample containers, and submission materials you need at no extra charge. Just tell us what you're testing."],
    ["ic-blue", P.phone, "Talk to a Real Chemist", "Most consultations are included. Get on the phone with experienced chemists and chemical engineers — not a ticket queue."],
    ["ic-orange", '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', "Decades of Experience", "Founded in 2000, with combined expertise across chemistry, materials, industrial process, and biomedical testing."],
  ];
  return (
    <div className="cards">
      {cards.map(([ic, icon, h, p], i) => (
        <div key={i} className="card reveal">
          <div className={`ico ${ic}`}>
            <Svg paths={icon} />
          </div>
          <h3>{h}</h3>
          <p>{p}</p>
        </div>
      ))}
    </div>
  );
}

export function Steps() {
  return (
    <>
      <div className="steps">
        <div className="step reveal">
          <div className="num">1</div>
          <h3>Tell Us What You Need</h3>
          <p>Call or email with a description of what you&apos;re testing and what you&apos;re looking for. Not sure which test? We&apos;ll help you figure it out.</p>
        </div>
        <div className="step reveal">
          <div className="num">2</div>
          <h3>We Handle the Logistics</h3>
          <p>We tell you exactly what to collect, how to collect it, and how to ship it — and we&apos;ll supply the bottles and collection materials if you need them.</p>
        </div>
        <div className="step reveal">
          <div className="num">3</div>
          <h3>We Analyze &amp; Report</h3>
          <p>Your sample is logged, analyzed by our experienced team, and results are delivered clearly — with context whenever you need it.</p>
        </div>
      </div>
      <div className="how-note reveal">
        <div className="note">
          <div className="ico">
            <Svg paths='<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>' />
          </div>
          <div>
            <h4>No Account Required to Start</h4>
            <p>Submit a one-time sample with zero setup. Need ongoing testing? We&apos;ll open an account that makes repeat submissions simple.</p>
          </div>
        </div>
        <div className="note">
          <div className="ico">
            <Svg paths='<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>' />
          </div>
          <div>
            <h4>Free Consultation Included</h4>
            <p>Our chemists and chemical engineers will walk through your situation and help you design the right approach — at no charge.</p>
          </div>
        </div>
      </div>
    </>
  );
}

export function ServicesSplit() {
  return (
    <div className="svc">
      <div className="svc-card svc-qa reveal">
        <h3>Quality Assurance &amp; Scheduled Testing</h3>
        <p className="desc">Many clients rely on IAS for ongoing, scheduled QA testing — routine programs that keep operations in compliance and processes under control. Accounts are easy to open and we handle the logistics.</p>
        <ul className="svc-list">
          <li><Check />ASTM Standardized Testing (D1193, Type I, Type II, Type III, and more)</li>
          <li><Check />Endotoxin (LAL) &amp; mycoplasma detection</li>
          <li><Check />Dialysis water &amp; cooling tower monitoring</li>
          <li><Check />Raw material, in-process &amp; finished product QC</li>
          <li><Check />Food and dairy testing</li>
          <li><Check />Filtration efficacy testing programs</li>
          <li><Check />Product quality</li>
        </ul>
        <Link href="/qa-programs" className="btn btn-primary btn-sm">Explore QA programs</Link>
      </div>
      <div className="svc-card svc-custom reveal">
        <h3>Custom and One-Time Testing</h3>
        <p className="desc">Not every testing need fits a standard program. Whether you have a single sample to investigate or a specific analyte to confirm, IAS handles it — no long-term commitment, and no account required.</p>
        <ul className="svc-list">
          <li><Check />Unknown substance &amp; contaminant identification</li>
          <li><Check />Failure analysis on components &amp; materials</li>
          <li><Check />R&amp;D support &amp; competitive product analysis</li>
          <li><Check />Veterinary &amp; research biological matrix testing</li>
        </ul>
        <Link href="/custom-testing" className="btn btn-blue btn-sm">Custom and One-Time Testing</Link>
      </div>
    </div>
  );
}

export function PricePop() {
  const pops: [string, string, boolean][] = [
    ["Heavy Metals Panel (Multi-Element)", "$190", true],
    ["SEM / EDS Analysis", "$325", false],
    ["PFAS — 18 Compounds", "$415", false],
    ["Total Coliform & E. coli", "$65", false],
  ];
  return (
    <div className="price-pop reveal">
      {pops.map(([nm, pr, feat], i) => (
        <div key={i} className={`pop${feat ? " feat" : ""}`}>
          {feat && <span className="badge">Most popular</span>}
          <div className="nm">{nm}</div>
          <div className="pr">{pr}</div>
        </div>
      ))}
    </div>
  );
}

export { Arrow, Check, Phone, Svg };
