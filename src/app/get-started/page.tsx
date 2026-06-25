import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CtaBand, SectionHead, Steps } from "@/components/blocks";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Get Started — Submit a Sample to IAS (No Account Required)",
  description:
    "Submit your first sample to IAS in three simple steps — no account required. Free bottles and materials, included consultations, fast replies.",
  alternates: { canonical: "/get-started" },
};

export default function GetStarted() {
  return (
    <>
      <PageHero
        crumb="Get Started"
        title="Submit Your First Sample — No Account Needed."
        text="Three simple steps from question to answer. Submit a one-time sample with zero setup, or open an account for ongoing testing."
      />

      <section className="section">
        <div className="wrap">
          <Steps />
        </div>
      </section>

      <section className="section bg-soft">
        <div className="wrap">
          <SectionHead
            eyebrow="Start Now"
            title="Tell Us About Your Sample"
            text="Fill this out and we'll reply fast with exactly what to send and how to send it — including free bottles and materials if you need them."
          />
          <div style={{ maxWidth: 760, margin: "0 auto" }}>
            <ContactForm title="Submit a Sample" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="faq reveal">
            <div className="section-head reveal" style={{ marginBottom: 34 }}>
              <h2>Common Questions</h2>
            </div>
            <details><summary>Do I need to set up an account?</summary><p>No. You can submit a one-time sample without setting up a formal account. If you need ongoing testing, we'll set up an account that makes repeat submissions simple.</p></details>
            <details><summary>Do you supply sample bottles and containers?</summary><p>Yes — we supply bottles, sample containers and submission materials at no extra charge. Just tell us what you're testing and we'll send what you need.</p></details>
            <details><summary>Can I talk to someone before I submit?</summary><p>Absolutely. Most consultations are included at no charge. Our chemists and chemical engineers will help you design the right approach before you send anything.</p></details>
            <details><summary>How is pricing handled?</summary><p>Standard tests have published, flat-rate prices — see the <Link href="/pricing" style={{ color: "var(--blue)", fontWeight: 700 }}>test catalog</Link>. Custom or high-volume work is quoted directly, and rush turnaround is available at additional cost.</p></details>
            <details><summary>Can you handle biological or research samples?</summary><p>Yes — including blood, serum, tissue and dialysate for clinical, veterinary and research applications, with chain-of-custody documentation where required. Contact us for matrix-specific guidance.</p></details>
          </div>
        </div>
      </section>

      <CtaBand
        title="Prefer to Talk It Through?"
        text="Call the lab and a chemist will help you scope your testing in minutes."
        primary={{ label: "Call (978) 466-3422", href: "tel:9784663422" }}
        secondary={{ label: "See the catalog", href: "/pricing" }}
      />
    </>
  );
}
