import Link from "next/link";
import Image from "next/image";
import React from "react";
import { IndustryPage, BlockKey } from "@/data/industryPages";
import { industryBySlug } from "@/data/industries";
import { instrumentByAbbr } from "@/data/instruments";
import { Svg, P, Arrow, Check } from "./icons";
import { SectionHead, CtaBand, Steps } from "./blocks";

function IndustryHero({ d }: { d: IndustryPage }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <div className="breadcrumb">
          <Link href="/">Home</Link> <Svg paths={P.chevronR} />{" "}
          <Link href="/industries">Industries</Link> <Svg paths={P.chevronR} />{" "}
          <span>{d.cardName}</span>
        </div>
        <span className="eyebrow light">
          {d.eyebrow}
        </span>
        <h1 style={{ marginTop: 14 }}>{d.h1}</h1>
        <p>{d.heroP}</p>
        <div className="hero-cta">
          <Link href="/get-started" className="btn btn-primary">
            Submit a sample <Arrow />
          </Link>
          <Link href="/pricing" className="btn btn-outline-white">
            View pricing
          </Link>
        </div>
      </div>
    </section>
  );
}

const ICOS = ["ic-blue", "ic-orange", "ic-gold", "ic-navy"];

function Overview({ d }: { d: IndustryPage }) {
  const prose = (
    <div className="prose reveal">
      <h2>{d.overviewH2}</h2>
      <p className="lead">{d.lead}</p>
      {d.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
      <ul className="check-list">
        {d.solutions?.map((s, i) => (
          <li key={i}>
            <Check />
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
  const media = d.image ? (
    <div className="split-media has-photo reveal">
      <Image
        src={d.image}
        alt={d.imageAlt ?? `${d.cardName} testing at IAS`}
        fill
        sizes="(max-width: 980px) 100vw, 50vw"
        className="media-photo"
      />
      {d.media?.[1] && <div className="media-cap">{d.media[1]}</div>}
    </div>
  ) : (
    <div className="split-media reveal">
      <div className="badge-float">
        <div className="big">{d.media?.[0]}</div>
        <div className="cap">{d.media?.[1]}</div>
      </div>
    </div>
  );
  return (
    <section className="section">
      <div className="wrap split">
        {d.mediaLeft ? (
          <>
            {media}
            {prose}
          </>
        ) : (
          <>
            {prose}
            {media}
          </>
        )}
      </div>
    </section>
  );
}

function Challenges({ d }: { d: IndustryPage }) {
  const n = d.challenges?.length ?? 0;
  return (
    <section className="section bg-soft">
      <div className="wrap">
        <SectionHead eyebrow={d.chEyebrow ?? "The challenge"} title={d.chH2} text={d.chP} />
        <div className={`cards${n === 2 ? " two" : ""}`}>
          {d.challenges?.map((c, i) => (
            <div key={i} className="card reveal">
              <div className={`ico ${ICOS[i % 4]}`}>
                <Svg paths={c.icon} />
              </div>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Tests({ d }: { d: IndustryPage }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={d.tEyebrow ?? "Pricing & tests"} title={d.tH2} text={d.tP} />
        <div className="catalog reveal">
          <div className="table-scroll">
            <table className="cat">
              <thead>
                <tr>
                  <th>Test / Analysis</th>
                  <th>Typical method</th>
                  <th className="r">From</th>
                </tr>
              </thead>
              <tbody>
                {d.tests?.map((t, i) => {
                  const call = t.price.toLowerCase().startsWith("call");
                  return (
                    <tr key={i}>
                      <td>{t.name}</td>
                      <td>{t.method}</td>
                      <td className={`price${call ? " call" : ""}`}>
                        {t.priceHref ? (
                          <a
                            href={t.priceHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "var(--blue)", fontWeight: 700 }}
                          >
                            {t.price} ↗
                          </a>
                        ) : (
                          t.price
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="catalog-foot">
            <span>
              Representative pricing · bottles &amp; submission materials included · rush
              available
            </span>
            <span>
              {d.priceListHref && (
                <>
                  <a
                    href={d.priceListHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--blue)", fontWeight: 700 }}
                  >
                    View Price List ↗
                  </a>{" "}
                  ·{" "}
                </>
              )}
              Need a test not listed here?{" "}
              <Link href="/contact" style={{ color: "var(--blue)", fontWeight: 700 }}>
                Ask the lab →
              </Link>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Standards({ d }: { d: IndustryPage }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="std-band reveal">
          <div className="std-copy">
            <span className="eyebrow">
              {d.stdEyebrow ?? "Standards & compliance"}
            </span>
            <h3>{d.stdH2}</h3>
            <p>{d.stdP}</p>
          </div>
          <div className="std-chips">
            {d.standards?.map((s, i) => (
              <span key={i} className="std-chip">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Instruments({ d }: { d: IndustryPage }) {
  return (
    <section className="section bg-soft">
      <div className="wrap">
        <SectionHead eyebrow={d.iEyebrow ?? "Instrumentation"} title={d.iH2} text={d.iP} />
        <div className="inst">
          {d.instruments?.map((iu, i) => {
            const inst = instrumentByAbbr(iu.abbr);
            return (
              <div key={i} className="inst-card reveal">
                <div className="abbr">
                  <span className="b"></span>
                  {iu.abbr}
                </div>
                <div className="full">{inst?.full}</div>
                <p>{inst?.desc}</p>
                <div className="apps">
                  <b>For {d.nameShort}:</b> {iu.use}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Matrices({ d }: { d: IndustryPage }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={d.mEyebrow ?? "What we test"} title={d.mH2} text={d.mP} />
        <div className={`vrow${d.centerMatrices ? " vrow-center" : ""}`}>
          {d.matrices?.map((m, i) => (
            <div key={i} className="vitem reveal">
              <div className="ico">
                <Svg paths={m.icon} />
              </div>
              <h4>{m.title}</h4>
              <p>{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Packages({ d }: { d: IndustryPage }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={d.pkgEyebrow ?? "Packages"} title={d.pkgH2 ?? "Analysis Packages"} text={d.pkgP} />
        <div className="pkg-grid">
          {d.packages?.map((p, i) => (
            <div key={i} className="pkg-card reveal">
              <div className="pkg-top">
                <div className="pkg-name">{p.name}</div>
                <div className="pkg-price">{p.price}</div>
              </div>
              <p>{p.desc}</p>
            </div>
          ))}
        </div>
        {d.priceListHref && (
          <div className="center" style={{ marginTop: 22 }}>
            <a
              href={d.priceListHref}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              View Full Price List (PDF) <Arrow />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function Process({ d }: { d: IndustryPage }) {
  return (
    <section className="section bg-soft">
      <div className="wrap">
        <SectionHead
          eyebrow={d.pEyebrow ?? "How it works"}
          title={d.pH2 ?? "From sample to answer in three steps"}
          text={d.pP}
        />
        <Steps />
      </div>
    </section>
  );
}

function Faq({ d }: { d: IndustryPage }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow={d.fEyebrow ?? "Questions"} title={d.fH2 ?? "Frequently asked questions"} />
        <div className="faq reveal">
          {d.faqs.map((f, i) => (
            <details key={i}>
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

function Custom({ d }: { d: IndustryPage }) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="custom-band reveal">
          <div className="cb-ico">
            <Svg paths='<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>' />
          </div>
          <div className="cb-body">
            <span className="eyebrow">
              Custom &amp; flexible work
            </span>
            <h3>{d.customH2 ?? "Don't see exactly what you need?"}</h3>
            <p>{d.customLine}</p>
            <div className="hero-cta">
              <Link href="/contact" className="btn btn-primary">
                Talk to a chemist <Arrow />
              </Link>
              <Link href="/custom-testing" className="btn btn-ghost">
                Custom and One-Time Testing
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Related({ d }: { d: IndustryPage }) {
  return (
    <section className="section">
      <div className="wrap">
        <SectionHead eyebrow="Related Industries" title={d.rH2 ?? "Explore related testing programs"} />
        <div className="rel-grid">
          {d.related.map((slug) => {
            const ind = industryBySlug(slug);
            if (!ind) return null;
            return (
              <Link key={slug} className="rel-card reveal" href={`/industries/${slug}`}>
                <div className="ico">
                  <Svg paths={ind.icon} />
                </div>
                <span>{ind.name}</span>
                <Svg paths={P.arrow} sw="2.4" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const BLOCKS: Record<BlockKey, (p: { d: IndustryPage }) => React.ReactElement> = {
  overview: Overview,
  challenges: Challenges,
  tests: Tests,
  standards: Standards,
  instruments: Instruments,
  matrices: Matrices,
  packages: Packages,
  process: Process,
  faq: Faq,
  custom: Custom,
  related: Related,
  cta: ({ d }) => <CtaBand title={d.ctaTitle} text={d.ctaText} primary={{ label: "Request a consultation", href: "/contact" }} secondary={{ label: "Submit a sample", href: "/get-started" }} />,
};

export default function IndustryDetail({ d }: { d: IndustryPage }) {
  return (
    <div className={`ipage acc-${d.accent}`}>
      <IndustryHero d={d} />
      {d.layout.map((key) => {
        const Block = BLOCKS[key];
        return <Block key={key} d={d} />;
      })}
    </div>
  );
}
