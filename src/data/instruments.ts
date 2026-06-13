export type Instrument = {
  abbr: string;
  full: string;
  desc: string;
  apps: string;
};

export const INSTRUMENTS: Instrument[] = [
  {
    abbr: "ICP-MS",
    full: "Inductively Coupled Plasma Mass Spectrometry",
    desc: "Detects and quantifies trace and ultra-trace metals down to parts-per-trillion levels.",
    apps: "Heavy metals in water, blood, tissue, biologics & environmental samples.",
  },
  {
    abbr: "ICP-OES",
    full: "Optical Emission Spectrometry",
    desc: "Measures elemental concentrations across a wide dynamic range.",
    apps: "Metals in process water, industrial fluids, alloy composition & wastewater.",
  },
  {
    abbr: "GC-MS",
    full: "Gas Chromatography Mass Spectrometry",
    desc: "Identifies and quantifies volatile and semi-volatile organic compounds.",
    apps: "Solvent residuals, VOCs, contaminant ID, pesticides, flavor & fragrance.",
  },
  {
    abbr: "NMR",
    full: "Nuclear Magnetic Resonance",
    desc: "Determines molecular structure and confirms compound identity.",
    apps: "Purity verification, structure elucidation, pharma QC, polymer analysis.",
  },
  {
    abbr: "FTIR",
    full: "Fourier-Transform Infrared Spectroscopy",
    desc: "Identifies organic & inorganic compounds through molecular fingerprinting.",
    apps: "Unknown material ID, polymer/plastic analysis, raw material QC, tissue analysis.",
  },
  {
    abbr: "SEM/EDS",
    full: "Scanning Electron Microscopy + EDS",
    desc: "High-magnification imaging plus elemental composition of surfaces & particles.",
    apps: "Failure analysis, particle characterization, surface contamination, defects.",
  },
];

export const instrumentByAbbr = (abbr: string) =>
  INSTRUMENTS.find((i) => i.abbr === abbr);
