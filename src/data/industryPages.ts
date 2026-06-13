// Per-industry landing-page data. Ported from build.py INDUSTRY_PAGES.
// Each page composes its own ordered `layout` of blocks with its own accent + copy.

export type BlockKey =
  | "overview"
  | "challenges"
  | "tests"
  | "standards"
  | "instruments"
  | "matrices"
  | "process"
  | "faq"
  | "custom"
  | "related"
  | "cta";

export type IconCard = { icon: string; title: string; text: string };
export type TestRow = { name: string; method: string; price: string };
export type InstrUse = { abbr: string; use: string };
export type FAQ = { q: string; a: string };

export type IndustryPage = {
  slug: string;
  cardName: string;
  accent: string;
  nameShort: string;
  eyebrow: string;
  h1: string;
  heroP: string;
  title: string;
  metaDesc: string;
  serviceType: string;
  layout: BlockKey[];
  overviewH2?: string;
  lead?: string;
  paragraphs?: string[];
  solutions?: string[];
  media?: [string, string];
  mediaLeft?: boolean;
  chEyebrow?: string;
  chH2?: string;
  chP?: string;
  challenges?: IconCard[];
  tEyebrow?: string;
  tH2?: string;
  tP?: string;
  tests?: TestRow[];
  stdEyebrow?: string;
  stdH2?: string;
  stdP?: string;
  standards?: string[];
  iEyebrow?: string;
  iH2?: string;
  iP?: string;
  instruments?: InstrUse[];
  mEyebrow?: string;
  mH2?: string;
  mP?: string;
  matrices?: IconCard[];
  pEyebrow?: string;
  pH2?: string;
  pP?: string;
  fEyebrow?: string;
  fH2?: string;
  faqs: FAQ[];
  customH2?: string;
  customLine: string;
  rH2?: string;
  related: string[];
  ctaTitle: string;
  ctaText: string;
};

// reusable icon path markup for matrices / challenge cards
export const ICN = {
  drop: '<path d="M12 2C8 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2-7-6-12z"/>',
  wave: '<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M5 16c3 2 11 2 14 0M12 18v4"/>',
  flask: '<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/><path d="M8 14h8"/>',
  vial: '<path d="M10 2v6.5L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L14 8.5V2"/><path d="M8.5 2h7"/>',
  factory: '<path d="M3 21V8l6-3v3l6-3v3l6-3v16z"/><path d="M9 21v-5M15 21v-5"/>',
  shield: '<path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/><path d="M9 12l2 2 4-4"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  clip: '<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  blood: '<path d="M6 2h12v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2"/><path d="M6 22h12v-6a4 4 0 0 0-4-4 4 4 0 0 0-4 4z"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 4 13c0-6 6-11 16-11 0 10-5 16-11 16z"/><path d="M4 21c4-6 8-8 12-9"/>',
  build: '<path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-6h6v6"/>',
  food: '<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/><path d="M9 18a3 3 0 0 0 6 0"/>',
  paw: '<path d="M11 2a3 3 0 0 0-3 3c0 1 .5 2 .5 2H6a4 4 0 0 0 0 8c1 3 4 5 6 5 3 0 5-2 5-5a4 4 0 0 0 1-7.9"/>',
  doc: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
  bug: '<path d="M8 2l1.5 2M16 2l-1.5 2M5 11H2M22 11h-3M6 20l-2 2M18 20l2 2"/><rect x="7" y="6" width="10" height="12" rx="5"/>',
};

export const INDUSTRY_PAGES: IndustryPage[] = [
  // 1. Pharmaceutical
  {
    slug: "pharmaceutical-testing",
    cardName: "Pharmaceutical & Biotech",
    accent: "blue",
    nameShort: "pharma QC",
    eyebrow: "Pharmaceutical & Biotech Testing",
    h1: "Pharmaceutical & biotech analytical testing",
    heroP:
      "Raw-material identity, in-process QC, endotoxin and mycoplasma screening, elemental impurities, and finished-product release testing — with documentation your auditors will accept.",
    title:
      "Pharmaceutical Testing Lab — Raw Material QC, Endotoxin & Release Testing | IAS",
    metaDesc:
      "Pharmaceutical and biotech analytical testing from IAS: raw material identity and QC, bacterial endotoxin (LAL), mycoplasma screening, ICH Q3D elemental impurities, USP purified water and finished-product release testing.",
    serviceType: "Pharmaceutical Analytical Testing",
    layout: ["overview", "standards", "tests", "instruments", "process", "faq", "custom", "related", "cta"],
    overviewH2: "A contract lab that keeps your batches moving",
    lead:
      "From incoming raw materials to final release, IAS gives pharmaceutical and biotech manufacturers the analytical depth — and the turnaround — to keep production on schedule and inspectors satisfied.",
    paragraphs: [
      "Whether you are qualifying a new excipient supplier, investigating an out-of-spec result, or running routine release testing, our chemists work alongside your QC team rather than behind a portal.",
      "Standard analyses carry catalog pricing, repeat submissions are simple once an account is open, and one-off investigations are always welcome.",
    ],
    solutions: [
      "Raw-material identity & purity verification by NMR and FTIR",
      "Bacterial endotoxin (LAL) and mycoplasma screening",
      "Elemental impurities to ICH Q3D / USP <232>&<233> by ICP-MS",
      "USP purified water & water-for-injection system monitoring",
      "In-process checks and finished-product release testing",
    ],
    media: ["USP", "Elemental impurities · endotoxin · release"],
    stdH2: "Built for regulated release",
    stdEyebrow: "Standards we work to",
    stdP:
      "We run to recognized compendial and ICH expectations, with reporting and chain-of-custody suited to audited environments.",
    standards: [
      "USP <85> Endotoxin",
      "USP <61>/<62> Microbial",
      "ICH Q3D",
      "USP <232>/<233>",
      "USP <645> Water Conductivity",
      "USP <467> Residual Solvents",
    ],
    tH2: "Common pharmaceutical tests & pricing",
    tP: "A representative slice of routine pharma work — anything compendial or custom can be quoted on a call.",
    tests: [
      { name: "Elemental impurities panel (ICH Q3D)", method: "ICP-MS", price: "$190" },
      { name: "Bacterial endotoxin (LAL)", method: "Kinetic / gel-clot", price: "$120" },
      { name: "Mycoplasma screening", method: "Culture / PCR", price: "Call to quote" },
      { name: "Residual solvents", method: "GC-MS", price: "$150" },
      { name: "Compound / API identity", method: "NMR", price: "$280" },
      { name: "USP purified water suite", method: "Conductivity · TOC · microbial", price: "$165" },
    ],
    iH2: "The instruments behind pharma release",
    instruments: [
      { abbr: "ICP-MS", use: "elemental impurity panels to USP <232>/<233> on drug substance, excipients and process water" },
      { abbr: "NMR", use: "structural confirmation and identity of APIs, intermediates and reference standards" },
      { abbr: "FTIR", use: "incoming raw-material identity verified against your specification" },
    ],
    pH2: "From batch sample to release decision",
    pP: "No formal account is required to send your first sample for evaluation.",
    faqs: [
      {
        q: "Do you perform USP <232>/<233> elemental impurities testing?",
        a: "Yes. We run ICH Q3D elemental impurity panels by ICP-MS on drug substances, excipients, finished products and process water, with reporting against your established permitted daily exposures.",
      },
      {
        q: "Can you support a release-testing program with recurring submissions?",
        a: "Absolutely. Many pharmaceutical clients run scheduled release and stability-support testing with us. We open a simple account so repeat submissions and reporting stay consistent.",
      },
      {
        q: "Do you handle bacterial endotoxin (LAL) and mycoplasma?",
        a: "Yes — kinetic and gel-clot LAL endotoxin testing and mycoplasma screening to support biologics, sterile products and medical-device clients.",
      },
      {
        q: "Can you develop a method for a non-compendial impurity?",
        a: "We do. Custom method development and validation support is part of our routine work, including non-compendial impurities and difficult matrices.",
      },
      {
        q: "Is an account required to send a single sample?",
        a: "No. You can submit a one-time sample for investigation or qualification without opening an account.",
      },
    ],
    customH2: "Beyond the compendium",
    customLine:
      "Method transfer, a non-compendial impurity, a stubborn excipient matrix, or a deviation investigation — we develop and run custom analytical methods for pharma and biotech, and you can send a single sample without ever opening an account.",
    related: ["medical-device-testing", "chemical-testing", "dialysis-water-testing"],
    ctaTitle: "Keep your batches on schedule",
    ctaText:
      "Talk to a chemist about your release, raw-material or impurity testing — most consultations are included at no charge.",
  },

  // 2. Medical Devices
  {
    slug: "medical-device-testing",
    cardName: "Medical Devices",
    accent: "cyan",
    nameShort: "device makers",
    eyebrow: "Medical Device Testing",
    h1: "Medical device analytical & biocompatibility-support testing",
    heroP:
      "Endotoxin testing, extractables and leachables, material characterization, and trace-metal analysis to support your biocompatibility and regulatory submissions.",
    title: "Medical Device Testing Lab — Endotoxin, Extractables & Material ID | IAS",
    metaDesc:
      "Medical device analytical testing from IAS: bacterial endotoxin (LAL), extractables and leachables, ISO 10993 biocompatibility support, material characterization by FTIR/SEM-EDS and trace metals by ICP-MS.",
    serviceType: "Medical Device Analytical Testing",
    layout: ["challenges", "overview", "standards", "tests", "matrices", "faq", "custom", "related", "cta"],
    chH2: "What device makers come to us for",
    chEyebrow: "Where we help",
    challenges: [
      { icon: ICN.shield, title: "Biocompatibility data", text: "Chemical characterization and extractables/leachables data to feed your ISO 10993-18 risk assessment." },
      { icon: ICN.vial, title: "Endotoxin & sterility support", text: "Bacterial endotoxin (LAL) testing on devices, components and rinse solutions." },
      { icon: ICN.search, title: "Material confirmation", text: "Polymer and metal ID, plus surface and particulate analysis when something looks wrong." },
    ],
    overviewH2: "Analytical support across the device lifecycle",
    lead:
      "From material selection through design verification and ongoing lot release, IAS provides the chemistry that underpins device safety and regulatory submissions.",
    paragraphs: [
      "We characterize the materials your device is made of, quantify what could migrate out of them, and verify cleanliness and trace-metal content — then document it for your file.",
      "Single components, finished devices, or recurring lot-release work are all welcome, with or without a standing account.",
    ],
    solutions: [
      "Bacterial endotoxin (LAL) on devices & rinse solutions",
      "Extractables & leachables study support",
      "Polymer & elastomer identification by FTIR",
      "Surface, coating & particulate analysis by SEM/EDS",
      "Trace metals & elemental content by ICP-MS",
    ],
    media: ["ISO", "10993 chemical characterization support"],
    mediaLeft: true,
    stdH2: "Aligned to device expectations",
    stdEyebrow: "Frameworks we support",
    stdP:
      "Our chemical characterization, endotoxin and material-ID work is structured to feed recognized biocompatibility and quality frameworks.",
    standards: ["ISO 10993-18", "ISO 10993-1", "USP <85> Endotoxin", "ANSI/AAMI ST72", "USP <661> Plastics", "ICP-MS Trace Metals"],
    tH2: "Representative device tests",
    tests: [
      { name: "Bacterial endotoxin (LAL)", method: "Kinetic / gel-clot", price: "$120" },
      { name: "Extractables / leachables study", method: "GC-MS · ICP-MS", price: "Call to quote" },
      { name: "Polymer / material identification", method: "FTIR", price: "$135" },
      { name: "Surface & particulate analysis", method: "SEM/EDS", price: "$250" },
      { name: "Trace metals on device material", method: "ICP-MS", price: "$190" },
    ],
    mH2: "Sample types we handle",
    mEyebrow: "Matrices",
    matrices: [
      { icon: ICN.build, title: "Finished devices & components", text: "Implants, instruments, tubing, connectors and packaging." },
      { icon: ICN.drop, title: "Extracts & rinse solutions", text: "Simulated-use extracts and final rinse waters." },
      { icon: ICN.flask, title: "Raw materials", text: "Polymers, elastomers, coatings and metals before they enter the build." },
    ],
    faqs: [
      { q: "Can you support an ISO 10993-18 chemical characterization?", a: "Yes. We generate extractables/leachables and elemental data structured to support your ISO 10993-18 chemical characterization and the toxicological risk assessment built on it." },
      { q: "Do you test bacterial endotoxin on finished devices?", a: "We do — LAL endotoxin testing on devices, components and rinse solutions, including support for routine lot release." },
      { q: "Can you identify an unknown material or particulate on a device?", a: "Yes. FTIR identifies polymers and organics while SEM/EDS images and analyzes surfaces, coatings and particulate contamination." },
      { q: "Do I need an account to send one component?", a: "No. One-off submissions are welcome — useful for failure investigations or qualifying a new material." },
    ],
    customH2: "Unusual device, unusual question",
    customLine:
      "Novel material, an odd particulate, a cleaning-validation rinse, or a one-off failure investigation — we will scope a custom approach for any device chemistry challenge, no standing account required.",
    related: ["pharmaceutical-testing", "clinical-research-testing", "chemical-testing"],
    ctaTitle: "Build your device file on solid data",
    ctaText: "Tell us where you are in the lifecycle and we will recommend the right characterization and release testing.",
  },

  // 3. Dialysis & Healthcare
  {
    slug: "dialysis-water-testing",
    cardName: "Dialysis & Healthcare",
    accent: "teal",
    nameShort: "dialysis clinics",
    eyebrow: "Dialysis Water Testing",
    h1: "Dialysis water & dialysate testing to AAMI standards",
    heroP:
      "Full-panel dialysis water quality — chemical contaminants, microbial counts and bacterial endotoxin — to ANSI/AAMI standards, with scheduled submission that keeps your program audit-ready.",
    title: "Dialysis Water Testing — AAMI Chemical, Microbial & Endotoxin Panels | IAS",
    metaDesc:
      "Dialysis water testing from IAS to ANSI/AAMI standards: chemical contaminant panels, microbial counts and bacterial endotoxin for dialysis water and dialysate, with easy scheduled submission for clinics.",
    serviceType: "Dialysis Water Quality Testing",
    layout: ["overview", "standards", "tests", "process", "faq", "custom", "related", "cta"],
    overviewH2: "Compliance your surveyors will trust",
    lead:
      "Dialysis water and dialysate carry strict limits because the consequences of contamination reach the patient directly. IAS runs the full AAMI panel and makes recurring submission painless.",
    paragraphs: [
      "We test for the AAMI list of chemical contaminants, perform heterotrophic plate counts, and quantify bacterial endotoxin — the three pillars surveyors look for in a dialysis water program.",
      "Set up a recurring schedule and we handle the logistics, supply the sampling materials, and return clearly formatted reports on time, every cycle.",
    ],
    solutions: [
      "Full AAMI chemical contaminant panel by ICP-MS",
      "Heterotrophic plate counts (microbial) on water & dialysate",
      "Bacterial endotoxin (LAL) testing",
      "Scheduled, recurring submission with materials supplied",
      "Clear, audit-ready reporting each cycle",
    ],
    media: ["AAMI", "Chemical · microbial · endotoxin panel"],
    stdH2: "Run to the dialysis water standards",
    stdEyebrow: "Standards",
    stdP: "Our panels follow the recognized ANSI/AAMI framework for water and dialysate used in hemodialysis.",
    standards: ["ANSI/AAMI 13959", "ANSI/AAMI 11663", "ANSI/AAMI ST72 Endotoxin", "AAMI Chemical Contaminants", "Heterotrophic Plate Count", "ICP-MS Trace Metals"],
    tH2: "Dialysis testing & pricing",
    tP: "Most clinics run these on a fixed schedule — ask about program pricing for recurring submissions.",
    tests: [
      { name: "AAMI chemical contaminant panel", method: "ICP-MS", price: "$210" },
      { name: "Heterotrophic plate count", method: "Membrane filtration", price: "$55" },
      { name: "Bacterial endotoxin (LAL)", method: "Kinetic / gel-clot", price: "$120" },
      { name: "Full dialysis water program (per cycle)", method: "Chemical + microbial + endotoxin", price: "Call to quote" },
    ],
    pH2: "How a dialysis program runs",
    pP: "We supply the bottles and sampling instructions, and your results return on a predictable cycle.",
    faqs: [
      { q: "Which standards do your dialysis water panels follow?", a: "Our chemical, microbial and endotoxin testing follows the recognized ANSI/AAMI framework for water and dialysate used in hemodialysis, including the AAMI chemical contaminant list." },
      { q: "Can you set up recurring monthly testing?", a: "Yes. Most dialysis clients run on a fixed schedule. We open a simple account, supply sampling materials, and return reports each cycle so your program stays audit-ready." },
      { q: "Do you test dialysate as well as the product water?", a: "We test both the treated water and dialysate for the relevant chemical, microbial and endotoxin parameters." },
      { q: "Do you supply the bottles and sampling materials?", a: "Yes — sampling containers and instructions are provided at no extra charge with your program." },
    ],
    customH2: "Beyond the standard panel",
    customLine:
      "Investigating a water-system excursion, validating a new RO loop, or chasing an unexpected microbial result? We will design custom dialysis water and healthcare-facility testing around your situation — just call.",
    related: ["pharmaceutical-testing", "clinical-research-testing", "water-testing"],
    ctaTitle: "Keep your water program audit-ready",
    ctaText: "Set up scheduled dialysis water testing and let us handle the logistics, materials and reporting.",
  },

  // 4. Hospitals & Clinical Research
  {
    slug: "clinical-research-testing",
    cardName: "Hospitals & Clinical Research",
    accent: "violet",
    nameShort: "researchers",
    eyebrow: "Clinical & Research Testing",
    h1: "Clinical research analytical testing — blood, serum & tissue",
    heroP:
      "Metals, toxicology and organic analysis on blood, serum and tissue for research — with chain-of-custody documentation and direct access to the chemists doing the work.",
    title: "Clinical Research Lab Testing — Blood, Serum & Tissue Analysis | IAS",
    metaDesc:
      "Clinical and research analytical testing from IAS: trace metals, toxicology and organic analysis on blood, serum and tissue for research, with chain-of-custody documentation and expert consultation.",
    serviceType: "Clinical Research Analytical Testing",
    layout: ["overview", "matrices", "tests", "instruments", "faq", "custom", "related", "cta"],
    overviewH2: "An analytical partner for research teams",
    lead:
      "Hospital research groups, academic labs and clinical investigators rely on IAS for the quantitative chemistry behind their studies — trace metals, toxicology and organic analysis on demanding biological matrices.",
    paragraphs: [
      "We measure what is in a sample down to trace levels, document the chain of custody when your protocol requires it, and talk through results with the researchers who need to interpret them.",
      "Pilot-phase studies can start with a single sample and no account; ongoing studies get a streamlined submission workflow.",
    ],
    solutions: [
      "Trace metals in blood, serum & tissue by ICP-MS",
      "Toxicology & contaminant screening",
      "Organic compound analysis by GC-MS",
      "Chain-of-custody documentation on request",
      "Direct consultation on study design & interpretation",
    ],
    media: ["ppt", "Trace-level metals in biological matrices"],
    mH2: "Biological matrices we analyze",
    mEyebrow: "Sample types",
    matrices: [
      { icon: ICN.blood, title: "Blood & serum", text: "Trace metals, toxic elements and organic analytes at research-grade sensitivity." },
      { icon: ICN.vial, title: "Tissue", text: "Digestion and elemental or organic analysis of tissue specimens." },
      { icon: ICN.drop, title: "Other fluids", text: "Urine, dialysate and study-specific matrices by arrangement." },
    ],
    tH2: "Representative research tests",
    tests: [
      { name: "Trace metals in blood / serum", method: "ICP-MS", price: "$190" },
      { name: "Heavy metal / toxic element panel", method: "ICP-MS", price: "$210" },
      { name: "Organic compound screen", method: "GC-MS", price: "$185" },
      { name: "Tissue elemental analysis", method: "Digestion + ICP-MS", price: "Call to quote" },
    ],
    iH2: "Instruments for research-grade answers",
    instruments: [
      { abbr: "ICP-MS", use: "parts-per-trillion metals in blood, serum and digested tissue" },
      { abbr: "GC-MS", use: "identification and quantitation of organic analytes and contaminants" },
      { abbr: "FTIR", use: "compound and material identification in research samples" },
    ],
    faqs: [
      { q: "Do you provide chain-of-custody documentation?", a: "Yes. When your protocol or eventual publication requires it, we maintain documented chain-of-custody from receipt through reporting." },
      { q: "Can you analyze trace metals in blood, serum or tissue?", a: "Yes — ICP-MS gives parts-per-trillion sensitivity for metals and toxic elements across blood, serum, tissue and other biological matrices." },
      { q: "Can I start with a single pilot sample?", a: "Absolutely. Pilot-phase work can begin with one sample and no account, which is ideal before committing to a full study." },
      { q: "Will a chemist help me interpret the data?", a: "Yes. Most consultations are included — you can talk through method choice and results directly with the analyst." },
    ],
    customH2: "Every study is a little different",
    customLine:
      "Unusual matrix, a bespoke analyte list, or a method that has to be built around your protocol? Research is where flexible, custom analytical work is the norm for us — bring us the question.",
    related: ["veterinary-toxicology-testing", "pharmaceutical-testing", "rd-analytical-testing"],
    ctaTitle: "Put real chemistry behind your study",
    ctaText: "Talk through your matrix and analyte list with a chemist before you submit your first sample.",
  },

  // 5. Veterinary & Animal Health
  {
    slug: "veterinary-toxicology-testing",
    cardName: "Veterinary & Animal Health",
    accent: "green",
    nameShort: "vets",
    eyebrow: "Veterinary Toxicology Testing",
    h1: "Veterinary toxicology & animal health testing",
    heroP:
      "Blood and tissue toxicology for animals — heavy metals, pesticides and contaminants — with practical turnaround and a chemist on the phone when results need context.",
    title: "Veterinary Toxicology Lab — Animal Blood & Tissue Metals, Pesticides | IAS",
    metaDesc:
      "Veterinary toxicology testing from IAS: heavy metals, pesticides and contaminant analysis in animal blood and tissue, with fast turnaround and expert consultation for vets and animal-health researchers.",
    serviceType: "Veterinary Toxicology Testing",
    layout: ["challenges", "overview", "tests", "matrices", "faq", "custom", "related", "cta"],
    chH2: "When an animal case turns analytical",
    chEyebrow: "Common cases",
    challenges: [
      { icon: ICN.shield, title: "Suspected poisoning", text: "Heavy-metal and pesticide screening when toxicity is on the differential." },
      { icon: ICN.search, title: "Unexplained illness", text: "Contaminant and trace-element analysis to support a diagnosis." },
      { icon: ICN.doc, title: "Herd & feed concerns", text: "Testing across multiple animals or feed/water sources to find a common cause." },
    ],
    overviewH2: "Toxicology answers for animal health",
    lead:
      "Veterinarians, diagnostic labs and animal-health researchers use IAS for the trace-element and contaminant chemistry that confirms — or rules out — a toxicological cause.",
    paragraphs: [
      "We quantify heavy metals and screen for pesticides and contaminants in blood and tissue, and we talk results through with the clinician or researcher who has to act on them.",
      "Single urgent cases and ongoing research programs are equally welcome, with no account required to send the first sample.",
    ],
    solutions: [
      "Heavy-metal panels in animal blood & tissue by ICP-MS",
      "Pesticide & contaminant screening by GC-MS",
      "Trace-element analysis for nutritional or toxic status",
      "Feed & water source testing to find a common cause",
      "Direct consultation with an experienced chemist",
    ],
    media: ["Tox", "Metals · pesticides · contaminants"],
    tH2: "Veterinary tests & pricing",
    tests: [
      { name: "Heavy-metal panel (blood / tissue)", method: "ICP-MS", price: "$190" },
      { name: "Single toxic element (e.g. lead)", method: "ICP-MS", price: "$85" },
      { name: "Pesticide / contaminant screen", method: "GC-MS", price: "$185" },
      { name: "Feed or water source analysis", method: "ICP-MS · GC-MS", price: "Call to quote" },
    ],
    mH2: "What we test for animal cases",
    mEyebrow: "Matrices",
    matrices: [
      { icon: ICN.blood, title: "Blood & serum", text: "Heavy metals and toxic elements at diagnostic sensitivity." },
      { icon: ICN.paw, title: "Tissue", text: "Liver, kidney and other tissue for elemental and contaminant analysis." },
      { icon: ICN.food, title: "Feed & water", text: "Source testing when several animals are affected." },
    ],
    faqs: [
      { q: "Can you test animal blood and tissue for heavy metals?", a: "Yes. ICP-MS quantifies lead, arsenic, mercury and a full heavy-metal panel in animal blood, serum and tissue at diagnostic sensitivity." },
      { q: "Do you screen for pesticides in a suspected poisoning?", a: "We do — GC-MS screening for pesticides and other contaminants supports suspected-toxicity cases." },
      { q: "Can you help when a whole herd or kennel is affected?", a: "Yes. We can test across multiple animals and the shared feed or water sources to help identify a common cause." },
      { q: "How fast can urgent cases be handled?", a: "Rush turnaround is available at additional cost — tell us the urgency when you call and we will prioritize accordingly." },
    ],
    customH2: "Unusual species, unusual sample",
    customLine:
      "Exotic species, an uncommon matrix, or an analyte that is not on a standard panel? Veterinary work is rarely cookie-cutter, and neither are we — call and we will build the right approach.",
    related: ["clinical-research-testing", "food-beverage-testing", "environmental-testing"],
    ctaTitle: "Get a toxicology answer you can act on",
    ctaText: "Call the lab to scope an urgent case or set up ongoing animal-health research testing.",
  },

  // 6. Industrial & Process
  {
    slug: "industrial-process-testing",
    cardName: "Industrial & Process",
    accent: "steel",
    nameShort: "process engineers",
    eyebrow: "Industrial & Process Testing",
    h1: "Industrial & process analytical testing",
    heroP:
      "Process-stream monitoring, cooling-tower chemistry, raw-material QC and failure analysis — the chemistry that keeps a plant running and explains it when something goes wrong.",
    title: "Industrial Process Testing Lab — Cooling Tower, Raw Material QC, Failure Analysis | IAS",
    metaDesc:
      "Industrial and process analytical testing from IAS: process-stream monitoring, cooling-tower water chemistry, raw-material QC, and failure analysis by SEM/EDS, FTIR and ICP for manufacturers and plants.",
    serviceType: "Industrial Process Analytical Testing",
    layout: ["overview", "challenges", "instruments", "tests", "faq", "custom", "related", "cta"],
    overviewH2: "Chemistry that keeps production running",
    lead:
      "Plants and manufacturers use IAS to monitor process streams, control utility water, qualify incoming materials, and run the failure analysis that turns an unplanned shutdown into a root cause.",
    paragraphs: [
      "We watch the chemistry of the fluids and materials your process depends on, flag drift before it becomes downtime, and dig into components when they fail prematurely.",
      "Whether it is a routine monitoring program or a single urgent failure, you reach a chemist directly — not a ticket queue.",
    ],
    solutions: [
      "Process-stream & utility water monitoring",
      "Cooling-tower chemistry & corrosion control",
      "Raw-material and incoming-lot QC",
      "Failure analysis by SEM/EDS, FTIR and ICP",
      "Unknown deposit, scale & residue identification",
    ],
    media: ["Root", "cause from the chemistry up"],
    mediaLeft: true,
    chH2: "Where process testing earns its keep",
    chEyebrow: "Typical work",
    challenges: [
      { icon: ICN.factory, title: "Process drift", text: "Trend the chemistry of a stream so you catch a problem before it scraps product." },
      { icon: ICN.clock, title: "Unplanned failure", text: "SEM/EDS and material ID to find why a component or weld failed." },
      { icon: ICN.wave, title: "Utility water", text: "Cooling-tower and boiler chemistry to control scale, corrosion and microbial growth." },
    ],
    iH2: "Instruments for plant problems",
    instruments: [
      { abbr: "SEM/EDS", use: "imaging and elemental analysis of failed parts, deposits and surface contamination" },
      { abbr: "ICP-OES", use: "metals across process water, industrial fluids, alloys and wastewater" },
      { abbr: "FTIR", use: "identifying unknown deposits, residues, films and incoming materials" },
    ],
    tH2: "Representative industrial tests",
    tests: [
      { name: "Failure analysis (SEM/EDS)", method: "SEM/EDS", price: "$250" },
      { name: "Metals in process water / fluid", method: "ICP-OES", price: "$160" },
      { name: "Cooling-tower water panel", method: "Multi-parameter", price: "$140" },
      { name: "Unknown deposit / scale ID", method: "FTIR · SEM/EDS", price: "$175" },
      { name: "Raw-material conformance", method: "Method-dependent", price: "Call to quote" },
    ],
    faqs: [
      { q: "Can you do failure analysis on a broken component?", a: "Yes. SEM/EDS imaging plus elemental and material analysis is a core service — we determine why parts, welds, coatings and deposits fail." },
      { q: "Do you run cooling-tower and boiler water chemistry?", a: "We do, including the parameters needed to control scale, corrosion and microbiological growth in utility water systems." },
      { q: "Can you identify an unknown deposit or residue in our process?", a: "Yes. FTIR and SEM/EDS together identify scales, films, particulates and residues so you can trace the source." },
      { q: "Do you support recurring process-monitoring programs?", a: "Yes — scheduled monitoring with consistent reporting is common, and accounts are easy to open." },
    ],
    customH2: "Every plant is one of a kind",
    customLine:
      "A proprietary fluid, an unusual alloy, an intermittent defect no one can pin down — process problems are exactly where our custom, flexible analytical work shines. Send the sample and let us investigate.",
    related: ["chemical-testing", "environmental-testing", "water-testing"],
    ctaTitle: "Turn a process problem into a root cause",
    ctaText: "Get a chemist on the phone to scope monitoring, raw-material QC, or an urgent failure analysis.",
  },

  // 7. Chemical Production
  {
    slug: "chemical-testing",
    cardName: "Chemical Production",
    accent: "orange",
    nameShort: "chemical producers",
    eyebrow: "Chemical Analysis & Method Development",
    h1: "Chemical analysis, purity verification & method development",
    heroP:
      "Purity verification, solvent residuals, and molecular identification by NMR and FTIR — plus custom method development when an off-the-shelf test does not exist.",
    title: "Chemical Testing Lab — Purity, Molecular ID (NMR/FTIR) & Method Development | IAS",
    metaDesc:
      "Chemical analysis from IAS: purity verification, residual solvent analysis, molecular identification by NMR and FTIR, and custom analytical method development for chemical producers and formulators.",
    serviceType: "Chemical Analysis & Method Development",
    layout: ["overview", "instruments", "tests", "matrices", "faq", "custom", "related", "cta"],
    overviewH2: "Know exactly what is in the bottle",
    lead:
      "Chemical producers and formulators rely on IAS to confirm identity, quantify purity, hunt down residual solvents, and develop methods for compounds that no standard test was written for.",
    paragraphs: [
      "Our NMR and FTIR capability confirms molecular structure and fingerprints unknowns, while chromatography quantifies the impurities and residuals that matter to your spec.",
      "When the analysis you need does not exist yet, our chemists develop and document it — and you can start with a single sample.",
    ],
    solutions: [
      "Purity verification & assay",
      "Residual solvent analysis by GC-MS",
      "Molecular structure & identity by NMR",
      "Functional-group & unknown ID by FTIR",
      "Custom method development & documentation",
    ],
    media: ["NMR", "Structure · purity · identity"],
    iH2: "Instruments for molecular certainty",
    instruments: [
      { abbr: "NMR", use: "definitive structure elucidation, identity confirmation and purity by integration" },
      { abbr: "FTIR", use: "functional-group fingerprinting and rapid identification of unknown chemicals" },
      { abbr: "GC-MS", use: "residual solvents, volatile impurities and contaminant identification" },
    ],
    tH2: "Representative chemical tests",
    tests: [
      { name: "Molecular identity / structure", method: "NMR", price: "$280" },
      { name: "Functional-group ID", method: "FTIR", price: "$135" },
      { name: "Residual solvents", method: "GC-MS", price: "$150" },
      { name: "Purity / assay", method: "Method-dependent", price: "Call to quote" },
      { name: "Custom method development", method: "Scoped per project", price: "Call to quote" },
    ],
    mH2: "What we characterize",
    mEyebrow: "Sample types",
    matrices: [
      { icon: ICN.flask, title: "Raw & intermediate chemicals", text: "Identity, purity and impurity profiling of inputs and intermediates." },
      { icon: ICN.drop, title: "Solvents & formulations", text: "Residual solvents, composition and contaminant screening." },
      { icon: ICN.search, title: "Unknowns", text: "Reverse-engineering and identification of unidentified substances." },
    ],
    faqs: [
      { q: "Can you confirm the structure of a compound?", a: "Yes. NMR provides definitive structure elucidation and identity confirmation, complemented by FTIR for functional-group fingerprinting." },
      { q: "Do you measure residual solvents?", a: "Yes — GC-MS quantifies residual solvents and volatile impurities against your specification." },
      { q: "Can you develop a method for a compound with no standard test?", a: "That is a core strength. We develop, document and run custom analytical methods for novel and difficult compounds." },
      { q: "Can you identify an unknown chemical?", a: "Yes. Combining NMR, FTIR and GC-MS, we identify unknown substances and reverse-engineer composition." },
    ],
    customH2: "When no standard method exists",
    customLine:
      "A novel compound, a proprietary formulation, an impurity nobody has a method for — developing custom analytical methods is something we do every week. Send a sample and we will build the approach around it.",
    related: ["pharmaceutical-testing", "industrial-process-testing", "rd-analytical-testing"],
    ctaTitle: "Confirm identity, purity and more",
    ctaText: "Talk to a chemist about your compound, your spec, or a method that needs to be built from scratch.",
  },

  // 8. Food & Beverage
  {
    slug: "food-beverage-testing",
    cardName: "Food & Beverage",
    accent: "amber",
    nameShort: "food & beverage",
    eyebrow: "Food & Beverage Testing",
    h1: "Food & beverage analytical testing",
    heroP:
      "Microbiology, pesticide residues, heavy metals, mycotoxins and process-water quality — the safety and quality testing that protects your product and your brand.",
    title: "Food & Beverage Testing Lab — Pesticides, Metals, Mycotoxins, Microbiology | IAS",
    metaDesc:
      "Food and beverage testing from IAS: microbiology, pesticide residue analysis, heavy metals, mycotoxins and process-water quality for producers, processors and beverage manufacturers.",
    serviceType: "Food & Beverage Analytical Testing",
    layout: ["challenges", "overview", "tests", "standards", "faq", "custom", "related", "cta"],
    chH2: "What food & beverage makers test for",
    chEyebrow: "Core concerns",
    challenges: [
      { icon: ICN.bug, title: "Microbial safety", text: "Coliform, E. coli and spoilage organisms across product and environment." },
      { icon: ICN.leaf, title: "Residues & toxins", text: "Pesticide residues, mycotoxins and heavy metals that carry regulatory limits." },
      { icon: ICN.wave, title: "Process water", text: "Water quality for ingredient, cleaning and process use." },
    ],
    overviewH2: "Safety and quality your brand depends on",
    lead:
      "Food and beverage producers come to IAS for the contaminant, microbiological and water testing that keeps product safe, compliant and consistent — without a complicated onboarding.",
    paragraphs: [
      "We screen for pesticide residues, mycotoxins and heavy metals, run the microbiology that flags contamination, and verify the water that touches your product.",
      "Single-batch questions and recurring quality programs are equally welcome, and we supply the sampling materials you need.",
    ],
    solutions: [
      "Microbiology — coliform, E. coli & spoilage organisms",
      "Pesticide residue screening by GC-MS",
      "Heavy metals in product by ICP-MS",
      "Mycotoxin analysis",
      "Process- and ingredient-water quality",
    ],
    media: ["QA", "Microbiology · residues · metals"],
    tH2: "Food & beverage tests & pricing",
    tests: [
      { name: "Total coliform & E. coli", method: "Presence / absence", price: "$65" },
      { name: "Heavy metals in product", method: "ICP-MS", price: "$190" },
      { name: "Pesticide residue screen", method: "GC-MS", price: "$185" },
      { name: "Mycotoxin analysis", method: "LC / method-dependent", price: "Call to quote" },
      { name: "Process-water quality panel", method: "Multi-parameter", price: "$140" },
    ],
    stdH2: "Testing aligned to food safety",
    stdEyebrow: "Frameworks",
    stdP:
      "Our contaminant, microbiological and water testing supports the safety and quality programs food and beverage operations run on.",
    standards: ["Heavy Metals (ICP-MS)", "Pesticide Residues", "Mycotoxins", "Microbiology", "Process Water", "HACCP-supporting data"],
    faqs: [
      { q: "Do you test for pesticide residues in food?", a: "Yes. GC-MS screening covers a broad range of pesticide residues in food and beverage products." },
      { q: "Can you check heavy metals like lead and arsenic in product?", a: "Yes — ICP-MS quantifies lead, arsenic, cadmium, mercury and a full heavy-metal panel at trace levels." },
      { q: "Do you run microbiology for coliform and E. coli?", a: "We do, along with spoilage organisms and environmental monitoring to support your sanitation program." },
      { q: "Can you test our process and ingredient water?", a: "Yes. We run full water-quality panels on process, ingredient and cleaning water." },
    ],
    customH2: "New product, new question",
    customLine:
      "A novel ingredient, a shelf-life question, an unexpected off-flavor or contaminant — food and beverage problems are often one-of-a-kind, and we will scope custom testing to match. No account needed to start.",
    related: ["water-testing", "veterinary-toxicology-testing", "chemical-testing"],
    ctaTitle: "Protect your product and your brand",
    ctaText: "Talk to a chemist about the safety, contaminant or water testing your product needs.",
  },

  // 9. Water & Municipal Utilities
  {
    slug: "water-testing",
    cardName: "Water & Municipal Utilities",
    accent: "ocean",
    nameShort: "water utilities",
    eyebrow: "Water & Wastewater Testing",
    h1: "Water testing — drinking, process & wastewater",
    heroP:
      "Full inorganic, organic and microbiological panels for treated, process and waste water — the complete analytical picture utilities and facilities need to stay compliant.",
    title: "Water Testing Lab — Drinking Water, Wastewater, Metals & Coliform | IAS",
    metaDesc:
      "Water testing from IAS: inorganic, organic and microbiological panels for drinking, process and waste water — heavy metals, coliform and E. coli, VOCs and full multi-analyte scans for utilities and facilities.",
    serviceType: "Water & Wastewater Testing",
    layout: ["overview", "tests", "matrices", "standards", "faq", "custom", "related", "cta"],
    overviewH2: "One lab for the whole water picture",
    lead:
      "Municipal utilities, facilities and property managers use IAS for the inorganic, organic and microbiological testing that keeps treated, process and waste water inside its limits.",
    paragraphs: [
      "We run heavy metals, the microbiology surveyors look for, volatile and semi-volatile organics, and the broad multi-analyte scans that catch the unexpected.",
      "Routine compliance programs and one-off investigations are both straightforward, with sampling materials supplied.",
    ],
    solutions: [
      "Heavy metals & inorganics by ICP-MS / ICP-OES",
      "Coliform, E. coli & microbiological panels",
      "Volatile & semi-volatile organics by GC-MS",
      "Full multi-analyte drinking-water scans",
      "Process & waste water characterization",
    ],
    media: ["H2O", "Inorganic · organic · microbial"],
    tH2: "Water tests & pricing",
    tests: [
      { name: "Total coliform & E. coli", method: "Presence / absence", price: "$65" },
      { name: "Heavy metals panel", method: "ICP-MS", price: "$190" },
      { name: "VOCs scan", method: "GC-MS (59 compounds)", price: "$150" },
      { name: "Drinking-water multi-analyte scan", method: "Inorganic + organic + microbial", price: "Call to quote" },
      { name: "Wastewater characterization", method: "Method-dependent", price: "Call to quote" },
    ],
    mH2: "Waters we test",
    mEyebrow: "Sample types",
    matrices: [
      { icon: ICN.wave, title: "Drinking & treated water", text: "Compliance panels for potable and treated supplies." },
      { icon: ICN.factory, title: "Process water", text: "Cooling, boiler and process streams for industrial users." },
      { icon: ICN.drop, title: "Waste water", text: "Characterization for discharge, treatment and permitting." },
    ],
    stdH2: "Compliance-grade water data",
    stdEyebrow: "Methods",
    stdP:
      "Our inorganic, organic and microbiological water testing follows recognized analytical methods suited to compliance reporting.",
    standards: ["EPA-style Metals", "Coliform / E. coli", "VOCs (GC-MS)", "SVOCs", "Inorganic Anions", "Multi-analyte Scans"],
    faqs: [
      { q: "Do you test drinking water for coliform and E. coli?", a: "Yes. We run presence/absence and quantitative microbiological panels for coliform, E. coli and related organisms." },
      { q: "Can you run a full heavy-metals panel on water?", a: "Yes — ICP-MS and ICP-OES cover trace heavy metals and a broad inorganic panel in any water matrix." },
      { q: "Do you handle wastewater characterization?", a: "We do, including the organic, inorganic and physical parameters needed for discharge and permitting questions." },
      { q: "Can you supply the sample bottles?", a: "Yes — bottles and sampling instructions are provided at no extra charge." },
    ],
    customH2: "An unusual water question",
    customLine:
      "A contaminant nobody can identify, a one-off source investigation, a parameter outside the standard panels — we build custom water and wastewater testing around the question. Just call.",
    related: ["environmental-testing", "dialysis-water-testing", "facilities-testing"],
    ctaTitle: "Keep your water inside its limits",
    ctaText: "Set up compliance water testing or send a one-off sample for investigation — materials included.",
  },

  // 10. Environmental & Remediation
  {
    slug: "environmental-testing",
    cardName: "Environmental & Remediation",
    accent: "forest",
    nameShort: "environmental work",
    eyebrow: "Environmental & Remediation Testing",
    h1: "Environmental testing — soil, water, PFAS & remediation",
    heroP:
      "Soil and water for metals, VOCs, SVOCs, pesticides, PCBs and PFAS — with litigation-quality documentation and chain-of-custody when the result has to hold up.",
    title: "Environmental Testing Lab — PFAS, VOCs, Metals, Soil & Water | IAS",
    metaDesc:
      "Environmental testing from IAS: soil and water analysis for metals, VOCs, SVOCs, pesticides, PCBs and PFAS, with chain-of-custody and litigation-quality documentation for remediation and site work.",
    serviceType: "Environmental Analytical Testing",
    layout: ["overview", "tests", "standards", "instruments", "faq", "custom", "related", "cta"],
    overviewH2: "Defensible data for site & remediation work",
    lead:
      "Consultants, remediation contractors and property owners use IAS for the soil and water analysis that drives site decisions — including PFAS — backed by documentation that stands up to scrutiny.",
    paragraphs: [
      "We quantify metals, volatile and semi-volatile organics, pesticides, PCBs and PFAS across soil and water, and document the chain of custody for litigation-quality results.",
      "Spot investigations and multi-round remediation monitoring are both routine, and a chemist is available to help you scope the program.",
    ],
    solutions: [
      "PFAS analysis in water & soil",
      "Priority-pollutant metals by ICP-MS",
      "VOCs & SVOCs by GC-MS",
      "Pesticides & PCBs",
      "Chain-of-custody & litigation-quality documentation",
    ],
    media: ["PFAS", "plus metals, VOCs, SVOCs & PCBs"],
    mediaLeft: true,
    tH2: "Environmental tests & pricing",
    tests: [
      { name: "PFAS — 18 compounds", method: "LC-MS/MS", price: "$415" },
      { name: "Priority-pollutant metals", method: "ICP-MS", price: "$190" },
      { name: "VOCs scan", method: "GC-MS", price: "$150" },
      { name: "SVOCs scan", method: "GC-MS", price: "$185" },
      { name: "Pesticides / PCBs", method: "GC-MS", price: "Call to quote" },
    ],
    stdH2: "Built to stand up to scrutiny",
    stdEyebrow: "How we document",
    stdP:
      "Chain-of-custody, recognized analytical methods and litigation-quality reporting come standard when the result may be challenged.",
    standards: ["PFAS (LC-MS/MS)", "EPA-style Metals", "VOCs / SVOCs", "Pesticides & PCBs", "Chain-of-Custody", "Litigation-Quality Reports"],
    iH2: "Instruments for environmental matrices",
    instruments: [
      { abbr: "ICP-MS", use: "trace and priority-pollutant metals in soil, water and leachate" },
      { abbr: "GC-MS", use: "VOCs, SVOCs, pesticides and PCBs across environmental samples" },
      { abbr: "ICP-OES", use: "higher-concentration metals in wastewater and industrial discharge" },
    ],
    faqs: [
      { q: "Do you test for PFAS in soil and water?", a: "Yes. We analyze PFAS compounds in water and soil matrices to support site investigation, remediation and compliance work." },
      { q: "Can you provide litigation-quality documentation?", a: "Yes — chain-of-custody and documentation suited to litigation and regulatory challenge are standard for environmental work." },
      { q: "Do you run VOCs, SVOCs, pesticides and PCBs?", a: "We do, by GC-MS, across soil and water for site characterization and remediation monitoring." },
      { q: "Can you support multi-round remediation monitoring?", a: "Yes. Recurring sampling rounds with consistent methods and reporting are routine." },
    ],
    customH2: "Complex sites, complex matrices",
    customLine:
      "An unusual matrix, an emerging contaminant, a litigation question that needs a tailored analytical plan — environmental work is where flexible, custom testing matters most, and it is exactly what we do.",
    related: ["water-testing", "industrial-process-testing", "facilities-testing"],
    ctaTitle: "Get data your site decisions can rest on",
    ctaText: "Talk to a chemist about PFAS, metals, organics or a full remediation monitoring program.",
  },

  // 11. Research & Development
  {
    slug: "rd-analytical-testing",
    cardName: "Research & Development",
    accent: "indigo",
    nameShort: "R&D teams",
    eyebrow: "R&D Analytical Support",
    h1: "R&D analytical testing & custom method development",
    heroP:
      "Flexible analytical support for any matrix — custom methods, fast iteration, and no standing account for pilot-phase work. Bring us the question no catalog answers.",
    title: "R&D Analytical Testing — Custom Methods, Any Matrix, No Account | IAS",
    metaDesc:
      "R&D analytical testing from IAS: flexible custom method development across any matrix, fast iteration and expert consultation — no standing account required for pilot-phase and exploratory work.",
    serviceType: "R&D Analytical Support",
    layout: ["overview", "challenges", "instruments", "process", "faq", "custom", "related", "cta"],
    overviewH2: "A lab built for the unscripted question",
    lead:
      "Research and development rarely fits a catalog. IAS gives R&D teams flexible analytical support across any matrix — with the instrumentation to answer hard questions and the freedom to start with a single sample.",
    paragraphs: [
      "We develop methods around your problem, run them fast enough to keep your iteration loop tight, and put an experienced chemist on the phone to help interpret what comes back.",
      "Pilot-phase work needs no standing account, and as a program matures we make recurring submission simple.",
    ],
    solutions: [
      "Custom method development for novel problems",
      "Analytical support across any matrix",
      "Trace metals, organics, structure & surface analysis",
      "Competitive & comparative product analysis",
      "No standing account required for pilot work",
    ],
    media: ["R&D", "Any matrix · custom methods"],
    chH2: "How R&D teams use us",
    chEyebrow: "Typical engagements",
    challenges: [
      { icon: ICN.search, title: "Exploratory analysis", text: "Figure out what is in a sample, or whether a hypothesis holds, before you scale." },
      { icon: ICN.flask, title: "Method development", text: "Build and document a method for something no standard test covers." },
      { icon: ICN.clip, title: "Comparative work", text: "Benchmark a formulation or component against a competitor or a target." },
    ],
    iH2: "The full instrument base, at your disposal",
    instruments: [
      { abbr: "ICP-MS", use: "parts-per-trillion elemental analysis across any developmental matrix" },
      { abbr: "NMR", use: "structure elucidation and identity for novel compounds and intermediates" },
      { abbr: "SEM/EDS", use: "surface, particle and elemental imaging for materials development" },
    ],
    pH2: "How an R&D engagement works",
    pP: "Start with one sample and a conversation — no account, no commitment.",
    faqs: [
      { q: "Can you develop a method for something with no standard test?", a: "Yes — custom method development is central to our R&D support. We build, document and run methods around novel problems and matrices." },
      { q: "Do I need an account for exploratory work?", a: "No. Pilot-phase and exploratory work can start with a single sample and no standing account." },
      { q: "Can you analyze unusual or developmental matrices?", a: "Yes. Our instrument base spans trace metals, organics, molecular structure and surface analysis, so most matrices are in scope." },
      { q: "Can you do competitive or comparative product analysis?", a: "We do — reverse-engineering and benchmarking a product or formulation against a target or competitor." },
    ],
    customH2: "Custom is the whole point",
    customLine:
      "R&D is where flexible, made-to-fit analytical work lives. Whatever the matrix and whatever the question, we will design the method, run it fast, and iterate with you — starting from a single sample.",
    related: ["chemical-testing", "pharmaceutical-testing", "clinical-research-testing"],
    ctaTitle: "Bring us the question no catalog answers",
    ctaText: "Get a chemist on the phone to scope a custom method or an exploratory analysis — no account needed.",
  },

  // 12. Property & Facilities
  {
    slug: "facilities-testing",
    cardName: "Property & Facilities",
    accent: "crimson",
    nameShort: "facilities",
    eyebrow: "Property & Facilities Testing",
    h1: "Property & facilities testing — air, water & materials",
    heroP:
      "Indoor air, water and material testing — asbestos, lead in paint, mold and VOCs — with the quick turnaround property managers and facilities teams need to act.",
    title: "Facilities Testing Lab — Asbestos, Lead Paint, Mold & Indoor Air (VOCs) | IAS",
    metaDesc:
      "Property and facilities testing from IAS: indoor air quality and VOCs, asbestos identification, lead in paint, mold and material testing with quick turnaround for property managers and facilities teams.",
    serviceType: "Property & Facilities Testing",
    layout: ["challenges", "overview", "tests", "matrices", "faq", "custom", "related", "cta"],
    chH2: "What facilities teams need answered",
    chEyebrow: "Common requests",
    challenges: [
      { icon: ICN.build, title: "Building materials", text: "Asbestos identification and lead-in-paint testing for renovation and due diligence." },
      { icon: ICN.bug, title: "Air & mold", text: "Indoor air quality, VOCs and mold assessment when occupants raise concerns." },
      { icon: ICN.wave, title: "Building water", text: "Potable and system water testing for safety and compliance." },
    ],
    overviewH2: "Answers a building can act on, fast",
    lead:
      "Property managers, facilities teams and building owners use IAS for the air, water and material testing that resolves a complaint, clears a renovation, or supports due diligence — with turnaround that respects a deadline.",
    paragraphs: [
      "We identify asbestos and lead in building materials, assess indoor air and VOCs, screen for mold, and test building water — then report it clearly enough to act on.",
      "One-off requests are welcome and materials are supplied, so a single concern does not require setting up an account.",
    ],
    solutions: [
      "Asbestos identification in building materials",
      "Lead in paint, dust & water",
      "Indoor air quality & VOC screening",
      "Mold assessment",
      "Potable & building-water testing",
    ],
    media: ["IAQ", "Asbestos · lead · mold · VOCs"],
    tH2: "Facilities tests & pricing",
    tests: [
      { name: "Asbestos identification", method: "PLM / microscopy", price: "$45" },
      { name: "Lead in paint", method: "ICP / method-dependent", price: "$55" },
      { name: "Indoor air VOCs", method: "GC-MS", price: "$150" },
      { name: "Mold assessment", method: "Microscopy / culture", price: "Call to quote" },
      { name: "Building water panel", method: "Multi-parameter", price: "$140" },
    ],
    mH2: "What we test in a building",
    mEyebrow: "Sample types",
    matrices: [
      { icon: ICN.build, title: "Building materials", text: "Suspect asbestos materials, paint chips and surface dust." },
      { icon: ICN.drop, title: "Air & water", text: "Indoor air samples, VOC canisters and potable water." },
      { icon: ICN.bug, title: "Mold & surfaces", text: "Tape lifts, swabs and air samples for mold assessment." },
    ],
    faqs: [
      { q: "Do you identify asbestos in building materials?", a: "Yes. We identify asbestos in suspect building materials by microscopy with quick turnaround for renovation and due-diligence needs." },
      { q: "Can you test for lead in paint and dust?", a: "Yes — lead testing in paint, dust and water to support renovation, abatement and compliance." },
      { q: "Do you assess indoor air quality and VOCs?", a: "We do. GC-MS-based VOC screening and indoor air quality assessment help resolve occupant complaints." },
      { q: "Can I send a single sample without an account?", a: "Yes. One-off facilities samples are welcome and sampling materials are supplied at no extra charge." },
    ],
    customH2: "An unusual building problem",
    customLine:
      "An odor no one can place, an unexplained residue, a material that needs identifying before demolition — facilities problems are often unique, and we will build the right testing around yours. Just call.",
    related: ["environmental-testing", "water-testing", "industrial-process-testing"],
    ctaTitle: "Resolve the concern and move on",
    ctaText: "Talk to a chemist about asbestos, lead, mold, air or water testing — quick turnaround, materials included.",
  },
];

export const industryPageBySlug = (slug: string) =>
  INDUSTRY_PAGES.find((p) => p.slug === slug);
