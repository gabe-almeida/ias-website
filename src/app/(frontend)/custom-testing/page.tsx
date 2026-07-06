import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Arrow, Check, PageHero, CtaBand } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Custom & One-Time Analytical Testing — No Account Required | IAS",
  description:
    "Custom and one-time testing from IAS: unknown substance ID, contaminant investigation, failure analysis, R&D support and research biological testing. No account required.",
  alternates: { canonical: "/custom-testing" },
};

export default function CustomTesting() {
  return (
    <>
      <PageHero
        crumb="Custom & One-Time Testing"
        title="One Sample, One Question, No Commitment."
        text="Not every testing need fits a standard program. Whether you have a single sample to investigate or a specific analyte to confirm, IAS handles it — and you can submit without setting up an account."
      >
        <Link href="/get-started" className="btn btn-primary">
          Submit a sample <Arrow />
        </Link>
        <Link href="/contact" className="btn btn-outline-white">
          Talk to a chemist
        </Link>
      </PageHero>

      <section className="section">
        <div className="wrap split rev">
          <div className="split-media has-photo reveal">
            <Image
              src="/images/services/custom-testing.webp"
              alt="Custom one-time analytical investigation at IAS"
              fill
              sizes="(max-width: 980px) 100vw, 50vw"
              className="media-photo"
            />
            <div className="media-cap">Just call or email — we&apos;ll walk you through what to send.</div>
          </div>
          <div className="prose reveal">
            <h2>Investigations, Failures &amp; Unknowns</h2>
            <p className="lead">
              Whether you're chasing a contaminant, confirming a compound, or figuring out why a
              component failed, we'll tell you exactly what to send and how to send it.
            </p>
            <ul className="check-list">
              <li><Check />Unknown substance identification</li>
              <li><Check />Trace contaminant investigation in a product, raw material or process stream</li>
              <li><Check />Failure analysis on industrial components or materials</li>
              <li><Check />Regulatory or compliance-driven one-time analysis</li>
              <li><Check />Research &amp; development support testing</li>
              <li><Check />Veterinary blood toxicology — metals, contaminants</li>
              <li><Check />Human blood &amp; tissue analysis for research purposes</li>
              <li><Check />Environmental spot sampling &amp; competitive product analysis</li>
            </ul>
          </div>
        </div>
      </section>

      <CtaBand
        title="Have Something You Need Answered?"
        text="Send a one-time sample with zero setup, or call and we'll help you scope it."
        primary={{ label: "Submit a sample", href: "/get-started" }}
      />
    </>
  );
}
