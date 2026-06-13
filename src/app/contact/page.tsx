import type { Metadata } from "next";
import { PageHero } from "@/components/blocks";
import { Phone, Mail, Pin } from "@/components/icons";
import ContactForm from "@/components/ContactForm";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Consultation — Industrial Analytical Services",
  description:
    "Contact IAS: call (978) 466-3422, email info@iasamerica.com, or visit 60 Elm Hill Ave., Leominster, MA. Free consultations, fast replies, no account required.",
  alternates: { canonical: "/contact" },
};

export default function Contact() {
  return (
    <>
      <PageHero
        crumb="Contact & Consultation"
        title="Talk to a chemist — most consults are free."
        text="Tell us what you're testing and what you're looking for. No portal, no account, no obligation — just a straightforward conversation with someone who knows the lab."
      />

      <section className="section">
        <div className="wrap contact-grid">
          <div className="contact-info reveal">
            <span className="eyebrow"><span className="dot"></span>Get in touch</span>
            <h2 style={{ marginTop: 16 }}>We're easy to reach</h2>
            <p className="lead">Call, email, or send the form — we reply fast and we'll tell you exactly how to get your sample to us.</p>
            <div className="info-item">
              <div className="ico"><Phone /></div>
              <div>
                <div className="k">Call the lab</div>
                <div className="v"><a href={SITE.phoneHref}>{SITE.phone}</a><small>Mon–Fri, business hours</small></div>
              </div>
            </div>
            <div className="info-item">
              <div className="ico"><Mail /></div>
              <div>
                <div className="k">Email</div>
                <div className="v"><a href={`mailto:${SITE.email}`}>{SITE.email}</a><small>SDS &amp; spec sheets welcome</small></div>
              </div>
            </div>
            <div className="info-item">
              <div className="ico"><Pin /></div>
              <div>
                <div className="k">Visit / ship samples</div>
                <div className="v">60 Elm Hill Ave.<small>Leominster, MA 01453</small></div>
              </div>
            </div>
          </div>
          <ContactForm title="Send Us a Message" />
        </div>
      </section>
    </>
  );
}
