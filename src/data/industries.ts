export type Industry = {
  name: string;
  icon: string; // raw svg path markup
  desc: string;
  slug: string; // bare slug, route = /industries/<slug>
};

export const INDUSTRIES: Industry[] = [
  {
    name: "Pharmaceutical & Biotech",
    icon: '<path d="M10 2v6.5L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L14 8.5V2"/><path d="M8.5 2h7M7 15h10"/>',
    desc: "Raw material & in-process QC, endotoxin & mycoplasma screening, release testing, process water.",
    slug: "pharmaceutical-testing",
  },
  {
    name: "Medical Devices",
    icon: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>',
    desc: "Endotoxin testing, biocompatibility support, material characterization, trace metals.",
    slug: "medical-device-testing",
  },
  {
    name: "Dialysis & Healthcare",
    icon: '<path d="M3 12h4l2 6 4-12 2 6h6"/>',
    desc: "Full-panel dialysis water quality to AAMI/ANSI standards, with easy scheduled submission.",
    slug: "dialysis-water-testing",
  },
  {
    name: "Hospitals & Clinical Research",
    icon: '<path d="M6 2h12v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2"/><path d="M6 22h12v-6a4 4 0 0 0-4-4 4 4 0 0 0-4 4z"/>',
    desc: "Blood, serum & tissue analysis for research — metals, toxicology, organics, chain-of-custody.",
    slug: "clinical-research-testing",
  },
  {
    name: "Veterinary & Animal Health",
    icon: '<path d="M11 2a3 3 0 0 0-3 3c0 1 .5 2 .5 2H6a4 4 0 0 0 0 8c1 3 4 5 6 5 3 0 5-2 5-5a4 4 0 0 0 1-7.9"/>',
    desc: "Blood & tissue toxicology — metals, pesticides & contaminants in biological samples.",
    slug: "veterinary-toxicology-testing",
  },
  {
    name: "Industrial & Process",
    icon: '<path d="M3 21V8l6-3v3l6-3v3l6-3v16z"/><path d="M9 21v-5M15 21v-5"/>',
    desc: "Process stream monitoring, cooling tower chemistry, raw material QC, failure analysis.",
    slug: "industrial-process-testing",
  },
  {
    name: "Chemical Production",
    icon: '<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/><path d="M8 14h8"/>',
    desc: "Purity verification, solvent residuals, molecular ID via NMR & FTIR, custom method development.",
    slug: "chemical-testing",
  },
  {
    name: "Food & Beverage",
    icon: '<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/><path d="M9 18a3 3 0 0 0 6 0"/>',
    desc: "Microbiology, pesticide residues, metals, mycotoxins & process water quality.",
    slug: "food-beverage-testing",
  },
  {
    name: "Water & Municipal Utilities",
    icon: '<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M5 16c3 2 11 2 14 0M12 18v4"/>',
    desc: "Full inorganic, organic & microbiological panels for treated, process & waste water.",
    slug: "water-testing",
  },
  {
    name: "Environmental & Remediation",
    icon: '<path d="M12 2C8 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2-7-6-12z"/>',
    desc: "Soil & water for metals, VOCs, SVOCs, pesticides, PCBs & PFAS — litigation-quality docs.",
    slug: "environmental-testing",
  },
  {
    name: "Research & Development",
    icon: '<path d="M2 12a10 10 0 0 1 20 0"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/>',
    desc: "Flexible custom analytical support for any matrix — no standing account for pilot-phase work.",
    slug: "rd-analytical-testing",
  },
  {
    name: "Property & Facilities",
    icon: '<path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-6h6v6"/>',
    desc: "Indoor air, water & material testing — asbestos, lead in paint, mold & VOCs, quick turnaround.",
    slug: "facilities-testing",
  },
];

export const industryBySlug = (slug: string) =>
  INDUSTRIES.find((i) => i.slug === slug);
