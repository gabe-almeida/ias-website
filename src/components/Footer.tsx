import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/site";

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <Image
              className="foot-logo"
              src="/assets/ias-logo.png"
              alt="Industrial Analytical Services"
              width={154}
              height={56}
            />
            <p>
              An independent analytical laboratory for industrial, commercial &amp;
              biomedical testing. Founded 2000.
            </p>
          </div>
          <div className="foot-col">
            <h5>Services</h5>
            <Link href="/qa-programs">QA &amp; Scheduled Testing</Link>
            <Link href="/custom-testing">Custom &amp; One-Time</Link>
            <Link href="/instrumentation">Instrumentation</Link>
            <Link href="/pricing">Pricing &amp; Catalog</Link>
          </div>
          <div className="foot-col">
            <h5>Company</h5>
            <Link href="/about">About IAS</Link>
            <Link href="/industries">Industries We Serve</Link>
            <Link href="/get-started">Get Started</Link>
            <Link href="/contact">Contact &amp; Consultation</Link>
          </div>
          <div className="foot-col">
            <h5>Get in Touch</h5>
            <a href={SITE.phoneHref}>{SITE.phone}</a>
            <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            <Link href="/get-started">Submit a Sample</Link>
            <Link href="/contact">Request a Consultation</Link>
          </div>
        </div>
        <div className="foot-bottom">
          <p>
            © 2026 Industrial Analytical Services · iasamerica.com · 60 Elm Hill Ave.,
            Leominster, MA 01453 · Designed by{" "}
            <a href="https://zokago.com" target="_blank" rel="noopener" className="foot-credit">
              Zokago.com
            </a>
          </p>
          <div className="foot-social">
            <a href="#" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V10.5H5.67v7.84zM7 9.3a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.04v-4.3c0-2.3-1.23-3.37-2.87-3.37a2.48 2.48 0 0 0-2.25 1.24v-1.06h-2.67v7.49h2.67v-4.15c0-1.1.2-2.16 1.56-2.16 1.34 0 1.36 1.25 1.36 2.23v4.08z" />
              </svg>
            </a>
            <a href={`mailto:${SITE.email}`} aria-label="Email">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
