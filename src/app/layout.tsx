import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import RevealInit from "@/components/RevealInit";
import { JsonLd } from "@/components/JsonLd";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#05409B",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.baseUrl),
  title: {
    default:
      "Industrial Analytical Services — Independent Analytical Laboratory | iasamerica.com",
    template: "%s",
  },
  description:
    "IAS is an independent analytical laboratory for industrial, commercial & biomedical testing. ICP-MS, GC-MS, NMR, FTIR, SEM/EDS. Flat catalog pricing. No account required to submit a sample.",
  icons: { icon: "/assets/favicon.png", apple: "/assets/favicon.png" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_US",
    images: [
      {
        url: "/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Industrial Analytical Services — independent analytical laboratory, est. 2000",
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

const ORG_JSONLD = {
  "@context": "https://schema.org",
  "@type": ["ProfessionalService", "MedicalBusiness", "Laboratory"],
  name: SITE.name,
  alternateName: "IAS",
  url: SITE.baseUrl + "/",
  description:
    "Independent analytical laboratory for industrial, commercial and biomedical testing. ICP-MS, ICP-OES, GC-MS, NMR, FTIR and SEM/EDS. Flat catalog pricing, no account required to submit a sample.",
  foundingDate: "2000",
  telephone: "+1-978-466-3422",
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: SITE.address.street,
    addressLocality: SITE.address.locality,
    addressRegion: SITE.address.region,
    postalCode: SITE.address.postal,
    addressCountry: SITE.address.country,
  },
  areaServed: "US",
  priceRange: "$$",
  knowsAbout: [
    "ICP-MS testing",
    "ASTM testing",
    "dialysis water testing",
    "endotoxin testing",
    "PFAS analysis",
    "trace metals analysis",
    "failure analysis",
    "environmental testing",
  ],
  sameAs: ["https://iasamerica.com/"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} ${inter.variable}`}>
      <body>
        <JsonLd data={ORG_JSONLD} />
        <Nav />
        {children}
        <Footer />
        <RevealInit />
      </body>
    </html>
  );
}
