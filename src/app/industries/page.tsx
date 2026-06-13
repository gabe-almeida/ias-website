import type { Metadata } from "next";
import { PageHero, CtaBand, IndustriesGrid } from "@/components/blocks";

export const metadata: Metadata = {
  title: "Industries We Serve — Pharma, Environmental, Industrial, Healthcare | IAS",
  description:
    "IAS serves pharmaceutical, medical device, dialysis, clinical, veterinary, industrial, chemical, food & beverage, water, environmental, R&D and facilities clients.",
  alternates: { canonical: "/industries" },
};

export default function IndustriesHub() {
  return (
    <>
      <PageHero
        crumb="Industries We Serve"
        title="Built for regulated, demanding industries."
        text="From pharmaceutical release testing to environmental remediation, IAS has the instrumentation and the documentation standards to be your single analytical partner."
      />
      <section className="section">
        <div className="wrap">
          <IndustriesGrid extraClass="three" />
        </div>
      </section>
      <CtaBand
        title="Don't see your industry?"
        text="If you have a sample and a question, we can almost certainly help — let's talk."
        primary={{ label: "Request a consultation", href: "/contact" }}
        secondary={{ label: "View pricing", href: "/pricing" }}
      />
    </>
  );
}
