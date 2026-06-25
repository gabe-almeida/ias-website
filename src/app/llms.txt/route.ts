import { SITE } from "@/lib/site";
import { INDUSTRY_PAGES } from "@/data/industryPages";

// Serves /llms.txt — a curated, LLM-friendly index of the site so answer
// engines (ChatGPT, Claude, Perplexity, Gemini) can find and cite IAS
// accurately. Generated from site data so it never drifts out of sync.
export const dynamic = "force-static";

export function GET() {
  const base = SITE.baseUrl;
  const accreditation = SITE.accreditations.map((a) => a.label).join("; ");

  const corePages: [string, string, string][] = [
    ["About IAS", "/about", "Independent analytical laboratory founded in 2000; instrumentation, values and history."],
    ["Services", "/services", "Scheduled QA programs and custom one-time analytical testing."],
    ["Instrumentation", "/instrumentation", "ICP-MS, ICP-OES, GC-MS, NMR, FTIR, SEM/EDS analytical capabilities."],
    ["Industries", "/industries", "All industries served, with a dedicated page for each."],
    ["Pricing & Test Catalog", "/pricing", "1,000+ tests with flat catalog pricing across water, soil, materials and biological matrices."],
    ["QA Programs", "/qa-programs", "Scheduled quality-assurance testing programs (ASTM, endotoxin, microbiology, water monitoring)."],
    ["Custom Testing", "/custom-testing", "Unknown-substance ID, contaminant investigation, failure analysis and R&D support — no account required."],
    ["Get Started", "/get-started", "Submit a first sample in three steps; no account required, free bottles."],
    ["Contact", "/contact", "Phone, email and address; free consultations."],
  ];

  const lines: string[] = [];
  lines.push(`# ${SITE.name} (IAS)`);
  lines.push("");
  lines.push(
    `> ${accreditation} for industrial, commercial and biomedical testing, founded in 2000 and based in ${SITE.address.locality}, ${SITE.address.region}. IAS offers ICP-MS, ICP-OES, GC-MS, NMR, FTIR and SEM/EDS analysis with flat catalog pricing and no account required to submit a sample. Services are available to clients across the United States.`,
  );
  lines.push("");
  lines.push(
    `Contact: ${SITE.phone} · ${SITE.email} · ${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.region} ${SITE.address.postal}. Accreditation: ${accreditation}.`,
  );
  lines.push("");

  lines.push("## Core pages");
  for (const [name, path, desc] of corePages) {
    lines.push(`- [${name}](${base}${path}): ${desc}`);
  }
  lines.push("");

  lines.push("## Industries served");
  for (const p of INDUSTRY_PAGES) {
    lines.push(`- [${p.cardName}](${base}/industries/${p.slug}): ${p.metaDesc}`);
  }
  lines.push("");

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
