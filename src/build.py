#!/usr/bin/env python3
"""Static multi-page generator for the IAS redesign preview.
Keeps nav/footer/head DRY; emits standalone files that work over file://."""
import os
OUT = os.path.dirname(os.path.abspath(__file__))

# ---------- reusable SVG icons ----------
def svg(p, sw="2"):
    return ('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="%s" '
            'stroke-linecap="round" stroke-linejoin="round">%s</svg>') % (sw, p)
ARROW   = svg('<path d="M5 12h14M13 6l6 6-6 6"/>', "2.4")
CHECK   = svg('<path d="M20 6 9 17l-5-5"/>', "2.5")
PHONE_P = '<path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.07 4.18 2 2 0 0 1 5.06 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L9.1 9.9a16 16 0 0 0 6 6l1.26-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>'
PHONE   = svg(PHONE_P)
MAIL    = svg('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/>')
PIN     = svg('<path d="M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>')
SEND    = svg('<path d="M22 2 11 13M22 2l-7 20-4-9-9-4z"/>', "2.4")

# ---------- HEAD ----------
HEAD = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>__TITLE__</title>
<meta name="description" content="__DESC__" />
<link rel="canonical" href="__CANON__" />
<meta name="theme-color" content="#05409B" />
<link rel="icon" type="image/png" href="assets/favicon.png" />
<link rel="apple-touch-icon" href="assets/favicon.png" />
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Industrial Analytical Services" />
<meta property="og:title" content="__OGTITLE__" />
<meta property="og:description" content="__DESC__" />
<meta property="og:url" content="__CANON__" />
<meta property="og:image" content="https://ias.zokago.com/assets/og-image.png" />
<meta property="og:image:secure_url" content="https://ias.zokago.com/assets/og-image.png" />
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:image:alt" content="Industrial Analytical Services — independent analytical laboratory, est. 2000" />
<meta property="og:locale" content="en_US" />
<!-- Twitter / X -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="__OGTITLE__" />
<meta name="twitter:description" content="__DESC__" />
<meta name="twitter:image" content="https://ias.zokago.com/assets/og-image.png" />
<meta name="twitter:image:alt" content="Industrial Analytical Services — independent analytical laboratory" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="assets/styles.css">
<script type="application/ld+json">
{"@context":"https://schema.org","@type":["ProfessionalService","MedicalBusiness","Laboratory"],
"name":"Industrial Analytical Services","alternateName":"IAS","url":"https://ias.zokago.com/",
"description":"Independent analytical laboratory for industrial, commercial and biomedical testing. ICP-MS, ICP-OES, GC-MS, NMR, FTIR and SEM/EDS. Flat catalog pricing, no account required to submit a sample.",
"foundingDate":"2000","telephone":"+1-978-466-3422","email":"info@iasamerica.com",
"address":{"@type":"PostalAddress","streetAddress":"60 Elm Hill Ave.","addressLocality":"Leominster","addressRegion":"MA","postalCode":"01453","addressCountry":"US"},
"areaServed":"US","priceRange":"$$",
"knowsAbout":["ICP-MS testing","ASTM testing","dialysis water testing","endotoxin testing","PFAS analysis","trace metals analysis","failure analysis","environmental testing"],
"sameAs":["https://iasamerica.com/"]}
</script>
</head>
<body>
"""

NAV_ITEMS = [("about","About IAS","about.html"),
             ("services","Services","services.html"),
             ("instrumentation","Instrumentation","instrumentation.html"),
             ("industries","Industries","industries.html"),
             ("pricing","Pricing","pricing.html"),
             ("contact","Contact","contact.html")]

def nav(active):
    links = "".join('<a href="%s"%s>%s</a>' % (href, ' class="active"' if key==active else '', label)
                    for key,label,href in NAV_ITEMS)
    return """<header class="nav" id="nav">
  <div class="wrap nav-inner">
    <a href="index.html" class="brand"><img src="assets/ias-logo.png" alt="Industrial Analytical Services" /></a>
    <nav class="nav-links" id="navLinks">%s</nav>
    <div class="nav-cta">
      <a href="tel:9784663422" class="nav-phone">%s (978) 466-3422</a>
      <a href="get-started.html" class="btn btn-primary btn-sm">Submit a Sample</a>
      <button class="burger" id="burger" aria-label="Menu"><span></span><span></span><span></span></button>
    </div>
  </div>
</header>
""" % (links, PHONE)

MOLECULE = """<svg class="molecule" width="208" height="52" viewBox="0 0 208 52" fill="none">
  <line x1="22" y1="18" x2="34" y2="34" stroke="#fff" stroke-width="2.5"/>
  <line x1="50" y1="18" x2="38" y2="34" stroke="#fff" stroke-width="2.5"/>
  <circle cx="18" cy="15" r="11" fill="#05409B" stroke="#fff" stroke-width="1.5"/>
  <circle cx="54" cy="15" r="11" fill="#FC6007" stroke="#fff" stroke-width="1.5"/>
  <circle cx="36" cy="37" r="11" fill="#E9A50A" stroke="#fff" stroke-width="1.5"/>
  <text x="18" y="20" font-family="Plus Jakarta Sans" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">I</text>
  <text x="54" y="20" font-family="Plus Jakarta Sans" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">S</text>
  <text x="36" y="42" font-family="Plus Jakarta Sans" font-size="13" font-weight="800" fill="#fff" text-anchor="middle">A</text>
  <text x="74" y="21" font-family="Plus Jakarta Sans" font-size="15" letter-spacing="0.5" font-weight="800" fill="#fff">INDUSTRIAL</text>
  <text x="74" y="40" font-family="Plus Jakarta Sans" font-size="15" letter-spacing="0.5" font-weight="800" fill="#fff">ANALYTICAL</text>
  <text x="75" y="50" font-family="Plus Jakarta Sans" font-size="8" letter-spacing="3" font-weight="700" fill="#E9A50A">SERVICES</text>
</svg>"""

FOOTER = """<footer>
  <div class="wrap">
    <div class="foot-grid">
      <div class="foot-brand">
        %s
        <p>An independent analytical laboratory for industrial, commercial &amp; biomedical testing. Founded 2000.</p>
        <p class="etr">In operating partnership with <a href="https://etrlabs.com" target="_blank" rel="noopener">ETR Laboratories</a> — our sister company.</p>
      </div>
      <div class="foot-col"><h5>Services</h5>
        <a href="qa-programs.html">QA &amp; Scheduled Testing</a><a href="custom-testing.html">Custom &amp; One-Time</a>
        <a href="instrumentation.html">Instrumentation</a><a href="pricing.html">Pricing &amp; Catalog</a></div>
      <div class="foot-col"><h5>Company</h5>
        <a href="about.html">About IAS</a><a href="industries.html">Industries We Serve</a>
        <a href="get-started.html">Get Started</a><a href="contact.html">Contact &amp; Consultation</a></div>
      <div class="foot-col"><h5>Get in touch</h5>
        <a href="tel:9784663422">(978) 466-3422</a><a href="mailto:info@iasamerica.com">info@iasamerica.com</a>
        <a href="get-started.html">Submit a Sample</a><a href="contact.html">Request a Consultation</a></div>
    </div>
    <div class="foot-bottom">
      <p>© 2026 Industrial Analytical Services · iasamerica.com · 60 Elm Hill Ave., Leominster, MA 01453</p>
      <div class="foot-social">
        <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM8.34 18.34V10.5H5.67v7.84zM7 9.3a1.55 1.55 0 1 0 0-3.1 1.55 1.55 0 0 0 0 3.1zm11.34 9.04v-4.3c0-2.3-1.23-3.37-2.87-3.37a2.48 2.48 0 0 0-2.25 1.24v-1.06h-2.67v7.49h2.67v-4.15c0-1.1.2-2.16 1.56-2.16 1.34 0 1.36 1.25 1.36 2.23v4.08z"/></svg></a>
        <a href="mailto:info@iasamerica.com" aria-label="Email"><svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m2 7 10 6 10-6"/></svg></a>
      </div>
    </div>
  </div>
</footer>
<script src="assets/app.js"></script>
</body></html>""" % MOLECULE

def cta_band(title, text, primary=('Call (978) 466-3422','tel:9784663422'), secondary=('Send us a message','contact.html')):
    return """<section class="section"><div class="wrap">
      <div class="cta-band reveal">
        <h2>%s</h2><p>%s</p>
        <div class="hero-cta">
          <a href="%s" class="btn btn-primary">%s</a>
          <a href="%s" class="btn btn-outline-white">%s</a>
        </div>
      </div></div></section>""" % (title, text, primary[1], primary[0], secondary[1], secondary[0])

def page_hero(crumb, title, text, ctas=""):
    cb = '<div class="breadcrumb"><a href="index.html">Home</a> %s <span>%s</span></div>' % (
        svg('<path d="M9 6l6 6-6 6"/>'), crumb)
    return """<section class="page-hero"><div class="wrap">
      %s
      <h1>%s</h1>
      <p>%s</p>
      %s
    </div></section>""" % (cb, title, text, ('<div class="hero-cta">%s</div>'%ctas) if ctas else "")

def contact_form(title="Send us a message"):
    return """<form class="lead-form reveal" data-demo>
      <div class="row">
        <div class="fg"><label>First name <span class="req">*</span></label><input required placeholder="Jane" /></div>
        <div class="fg"><label>Last name <span class="req">*</span></label><input required placeholder="Doe" /></div>
      </div>
      <div class="row">
        <div class="fg"><label>Company <span class="req">*</span></label><input required placeholder="Acme Manufacturing" /></div>
        <div class="fg"><label>Industry</label>
          <select>
            <option value="" selected disabled>Select your industry…</option>
            <option>Pharmaceutical &amp; Biotech</option>
            <option>Medical Devices</option>
            <option>Dialysis &amp; Healthcare</option>
            <option>Hospitals &amp; Clinical Research</option>
            <option>Veterinary &amp; Animal Health</option>
            <option>Industrial &amp; Process</option>
            <option>Chemical Production</option>
            <option>Food &amp; Beverage</option>
            <option>Water &amp; Municipal Utilities</option>
            <option>Environmental &amp; Remediation</option>
            <option>Research &amp; Development</option>
            <option>Property &amp; Facilities</option>
            <option>Other</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="fg"><label>Phone <span class="req">*</span></label><input required type="tel" placeholder="(555) 123-4567" /></div>
        <div class="fg"><label>Email <span class="req">*</span></label><input required type="email" placeholder="jane@acme.com" /></div>
      </div>
      <div class="fg"><label>Describe your testing need</label><textarea placeholder="What are you testing, what are you trying to find out, and any turnaround needs…"></textarea></div>
      <div class="fg"><label>Attach a file (optional)</label>
        <label class="file-drop">%s Drop an SDS, spec sheet, or sample description — or click to browse
          <input type="file" hidden /></label>
      </div>
      <div class="form-foot">
        <button class="btn btn-primary" type="submit">%s %s</button>
        <span class="sent" style="display:none;align-items:center;gap:8px;color:#1AA563;font-weight:700;font-family:Inter;font-size:.9rem;width:100%%;margin-top:6px">%s Thanks — this is a design preview. A live form would route to the IAS inbox.</span>
      </div>
    </form>""" % (svg('<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12"/>'),
                 title, SEND, CHECK)

BASE_URL = "https://ias.zokago.com/"

def og_title_of(title):
    # Clean share-card title: drop trailing " | site" suffix, keep the meaningful headline
    t = title.rsplit(" | ", 1)[0] if " | " in title else title
    return t

def write(name, title, desc, active, body):
    canon = BASE_URL if name == "index.html" else BASE_URL + name
    html = (HEAD.replace("__TITLE__", title)
                .replace("__OGTITLE__", og_title_of(title))
                .replace("__DESC__", desc)
                .replace("__CANON__", canon)
            + nav(active) + body + FOOTER)
    with open(os.path.join(OUT, name), "w") as f:
        f.write(html)
    print("wrote", name, len(html), "bytes")

# ============================================================ shared content blocks
INDUSTRIES = [
 ("Pharmaceutical &amp; Biotech",'<path d="M10 2v6.5L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L14 8.5V2"/><path d="M8.5 2h7M7 15h10"/>',"Raw material &amp; in-process QC, endotoxin &amp; mycoplasma screening, release testing, process water."),
 ("Medical Devices",'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>',"Endotoxin testing, biocompatibility support, material characterization, trace metals."),
 ("Dialysis &amp; Healthcare",'<path d="M3 12h4l2 6 4-12 2 6h6"/>',"Full-panel dialysis water quality to AAMI/ANSI standards, with easy scheduled submission."),
 ("Hospitals &amp; Clinical Research",'<path d="M6 2h12v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2"/><path d="M6 22h12v-6a4 4 0 0 0-4-4 4 4 0 0 0-4 4z"/>',"Blood, serum &amp; tissue analysis for research — metals, toxicology, organics, chain-of-custody."),
 ("Veterinary &amp; Animal Health",'<path d="M11 2a3 3 0 0 0-3 3c0 1 .5 2 .5 2H6a4 4 0 0 0 0 8c1 3 4 5 6 5 3 0 5-2 5-5a4 4 0 0 0 1-7.9"/>',"Blood &amp; tissue toxicology — metals, pesticides &amp; contaminants in biological samples."),
 ("Industrial &amp; Process",'<path d="M3 21V8l6-3v3l6-3v3l6-3v16z"/><path d="M9 21v-5M15 21v-5"/>',"Process stream monitoring, cooling tower chemistry, raw material QC, failure analysis."),
 ("Chemical Production",'<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/><path d="M8 14h8"/>',"Purity verification, solvent residuals, molecular ID via NMR &amp; FTIR, custom method development."),
 ("Food &amp; Beverage",'<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/><path d="M9 18a3 3 0 0 0 6 0"/>',"Microbiology, pesticide residues, metals, mycotoxins &amp; process water quality."),
 ("Water &amp; Municipal Utilities",'<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M5 16c3 2 11 2 14 0M12 18v4"/>',"Full inorganic, organic &amp; microbiological panels for treated, process &amp; waste water."),
 ("Environmental &amp; Remediation",'<path d="M12 2C8 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2-7-6-12z"/>',"Soil &amp; water for metals, VOCs, SVOCs, pesticides, PCBs &amp; PFAS — litigation-quality docs."),
 ("Research &amp; Development",'<path d="M2 12a10 10 0 0 1 20 0"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/>',"Flexible custom analytical support for any matrix — no standing account for pilot-phase work."),
 ("Property &amp; Facilities",'<path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-6h6v6"/>',"Indoor air, water &amp; material testing — asbestos, lead in paint, mold &amp; VOCs, quick turnaround."),
]
def industries_grid(extra_class=""):
    cards = "".join(
      '<div class="ind-card reveal"><div class="ico">%s</div><h4>%s</h4><p>%s</p></div>' % (svg(ic), nm, desc)
      for nm,ic,desc in INDUSTRIES)
    return '<div class="ind%s">%s</div>' % ((" "+extra_class) if extra_class else "", cards)

INSTRUMENTS = [
 ("ICP-MS","Inductively Coupled Plasma Mass Spectrometry","Detects and quantifies trace and ultra-trace metals down to parts-per-trillion levels.","Heavy metals in water, blood, tissue, biologics &amp; environmental samples."),
 ("ICP-OES","Optical Emission Spectrometry","Measures elemental concentrations across a wide dynamic range.","Metals in process water, industrial fluids, alloy composition &amp; wastewater."),
 ("GC-MS","Gas Chromatography Mass Spectrometry","Identifies and quantifies volatile and semi-volatile organic compounds.","Solvent residuals, VOCs, contaminant ID, pesticides, flavor &amp; fragrance."),
 ("NMR","Nuclear Magnetic Resonance","Determines molecular structure and confirms compound identity.","Purity verification, structure elucidation, pharma QC, polymer analysis."),
 ("FTIR","Fourier-Transform Infrared Spectroscopy","Identifies organic &amp; inorganic compounds through molecular fingerprinting.","Unknown material ID, polymer/plastic analysis, raw material QC, tissue analysis."),
 ("SEM/EDS","Scanning Electron Microscopy + EDS","High-magnification imaging plus elemental composition of surfaces &amp; particles.","Failure analysis, particle characterization, surface contamination, defects."),
]
def instruments_grid():
    cards = "".join(
      '<div class="inst-card reveal"><div class="abbr"><span class="b"></span>%s</div><div class="full">%s</div>'
      '<p>%s</p><div class="apps"><b>Common uses:</b> %s</div></div>' % (a,full,desc,apps)
      for a,full,desc,apps in INSTRUMENTS)
    return '<div class="inst">%s</div>' % cards

WHY_CARDS = """<div class="cards">
  <div class="card reveal"><div class="ico ic-blue">""" + svg('<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2.4"/><circle cx="19" cy="6" r="2.4"/><circle cx="12" cy="20" r="2.4"/><path d="M7 7l3 3M17 7l-3 3M12 15v3"/>') + """</div>
    <h3>Sophisticated instrumentation</h3><p>ICP-MS, ICP-OES, GC-MS, NMR, FTIR and SEM/EDS under one roof — trace metals to molecular structure to surface analysis.</p></div>
  <div class="card reveal"><div class="ico ic-orange">""" + svg('<path d="M3 6h18M3 12h18M3 18h12"/><circle cx="20" cy="18" r="2"/>') + """</div>
    <h3>Catalog-style pricing</h3><p>Standard tests have standard prices. Heavy metals on a liquid? $190. SEM analysis? $250. No mystery quotes for routine work.</p></div>
  <div class="card reveal"><div class="ico ic-gold">""" + svg('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>') + """</div>
    <h3>No bureaucracy</h3><p>Submit samples without setting up a formal account. One-off requests are welcome alongside long-term programs.</p></div>
  <div class="card reveal"><div class="ico ic-navy">""" + svg('<path d="M3 9l9-6 9 6v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 21V12h6v9"/>') + """</div>
    <h3>Materials supplied free</h3><p>We send the bottles, sample containers, and submission materials you need at no extra charge. Just tell us what you're testing.</p></div>
  <div class="card reveal"><div class="ico ic-blue">""" + PHONE + """</div>
    <h3>Talk to a real chemist</h3><p>Most consultations are included. Get on the phone with experienced chemists and chemical engineers — not a ticket queue.</p></div>
  <div class="card reveal"><div class="ico ic-orange">""" + svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>') + """</div>
    <h3>Decades of experience</h3><p>Founded in 2000, with combined expertise across chemistry, materials, industrial process, and biomedical testing.</p></div>
</div>"""

STEPS = """<div class="steps">
  <div class="step reveal"><div class="num">1</div><h3>Tell us what you need</h3><p>Call or email with a description of what you're testing and what you're looking for. Not sure which test? We'll help you figure it out.</p></div>
  <div class="step reveal"><div class="num">2</div><h3>We handle the logistics</h3><p>We tell you exactly what to collect, how to collect it, and how to ship it — and we'll supply the bottles and collection materials if you need them.</p></div>
  <div class="step reveal"><div class="num">3</div><h3>We analyze &amp; report</h3><p>Your sample is logged, analyzed by our experienced team, and results are delivered clearly — with context whenever you need it.</p></div>
</div>
<div class="how-note reveal">
  <div class="note"><div class="ico">""" + svg('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>') + """</div>
    <div><h4>No account required to start</h4><p>Submit a one-time sample with zero setup. Need ongoing testing? We'll open an account that makes repeat submissions simple.</p></div></div>
  <div class="note"><div class="ico">""" + svg('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>') + """</div>
    <div><h4>Free consultation included</h4><p>Our chemists and chemical engineers will walk through your situation and help you design the right approach — at no charge.</p></div></div>
</div>"""

SERVICES_SPLIT = """<div class="svc">
  <div class="svc-card svc-qa reveal">
    <h3>Quality Assurance &amp; Scheduled Testing</h3>
    <p class="desc">Many clients rely on IAS for ongoing, scheduled QA testing — routine programs that keep operations in compliance and processes under control. Accounts are easy to open and we handle the logistics.</p>
    <ul class="svc-list">
      <li>""" + CHECK + """ASTM standardized testing (Type I, II, III &amp; more)</li>
      <li>""" + CHECK + """Endotoxin (LAL) &amp; mycoplasma detection</li>
      <li>""" + CHECK + """Dialysis water &amp; cooling tower monitoring</li>
      <li>""" + CHECK + """Raw material, in-process &amp; finished product QC</li>
    </ul>
    <a href="qa-programs.html" class="btn btn-primary btn-sm">Explore QA programs</a>
  </div>
  <div class="svc-card svc-custom reveal">
    <h3>Custom &amp; One-Time Testing</h3>
    <p class="desc">Not every testing need fits a standard program. Whether you have a single sample to investigate or a specific analyte to confirm, IAS handles it — no long-term commitment, and no account required.</p>
    <ul class="svc-list">
      <li>""" + CHECK + """Unknown substance &amp; contaminant identification</li>
      <li>""" + CHECK + """Failure analysis on components &amp; materials</li>
      <li>""" + CHECK + """R&amp;D support &amp; competitive product analysis</li>
      <li>""" + CHECK + """Veterinary &amp; research biological matrix testing</li>
    </ul>
    <a href="custom-testing.html" class="btn btn-blue btn-sm">Custom &amp; one-time</a>
  </div>
</div>"""

PRICE_POP = """<div class="price-pop reveal">
  <div class="pop feat"><span class="badge">Most popular</span><div class="nm">Heavy Metals Panel (Multi-Element)</div><div class="pr">$190</div></div>
  <div class="pop"><div class="nm">SEM / EDS Analysis</div><div class="pr">$250</div></div>
  <div class="pop"><div class="nm">PFAS — 18 Compounds</div><div class="pr">$415</div></div>
  <div class="pop"><div class="nm">Total Coliform &amp; E. coli</div><div class="pr">$65</div></div>
</div>"""

CATALOG = """<div class="catalog reveal">
  <div class="catalog-tools">
    <div class="search">""" + svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>') + """
      <input type="text" id="priceSearch" placeholder="Search 100+ tests — e.g. lead, PFAS, endotoxin, SEM…" />
    </div>
    <div class="filters" id="filters">
      <button class="chip active" data-cat="all">All</button>
      <button class="chip" data-cat="water">Water &amp; Liquids</button>
      <button class="chip" data-cat="solid">Solids &amp; Materials</button>
      <button class="chip" data-cat="bio">Biological</button>
      <button class="chip" data-cat="package">Packages &amp; Scans</button>
    </div>
  </div>
  <div class="table-scroll">
    <table class="cat"><thead><tr><th>Test / Analysis</th><th>Category</th><th class="r">Price</th></tr></thead>
      <tbody id="priceBody"></tbody></table>
    <div class="no-res" id="noRes" style="display:none">No tests match your search. <a href="contact.html" style="color:var(--blue);font-weight:700">Contact the lab</a> for custom or non-listed work.</div>
  </div>
  <div class="catalog-foot">
    <span>Standard turnaround shown · Bottles &amp; submission materials included · Rush available at additional cost</span>
    <span>Need volume or account pricing? <a href="contact.html" style="color:var(--blue);font-weight:700">Request a quote →</a></span>
  </div>
</div>"""

# ============================================================ HOME
home = """<section class="hero"><div class="wrap hero-grid">
  <div class="hero-copy reveal">
    <span class="eyebrow"><span class="dot"></span>Independent Analytical Laboratory · Est. 2000</span>
    <h1 style="margin-top:20px">Industrial-grade testing,<br><span class="hl">without the runaround.</span></h1>
    <p class="lead">From trace metals to failure analysis, IAS gives you sophisticated instrumentation, flat catalog pricing, and a real chemist on the phone. No portals, no mystery quotes — and no account required to send your first sample.</p>
    <div class="hero-cta">
      <a href="contact.html" class="btn btn-primary">Request a Free Consultation """ + ARROW + """</a>
      <a href="pricing.html" class="btn btn-ghost">See Our Pricing</a>
    </div>
    <div class="hero-trust">
      <span>""" + CHECK + """ICP-MS · GC-MS · NMR · FTIR · SEM/EDS</span>
      <span>""" + CHECK + """Bottles &amp; materials supplied free</span>
      <span>""" + CHECK + """Consultations included</span>
    </div>
  </div>
  <div class="hero-visual reveal">
    <div class="blob" style="width:230px;height:230px;background:#BFD4FF;top:-30px;right:10px"></div>
    <div class="blob" style="width:180px;height:180px;background:#FFD0B0;bottom:-20px;left:0"></div>
    <div class="float f1"><div class="ico" style="background:linear-gradient(135deg,#0A4BAE,#05409B)">""" + svg('<path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3"/><path d="M8 3h8M7.5 14h9"/>') + """</div>
      <div><div class="t">No account</div><div class="s">to get started</div></div></div>
    <div class="float f2"><div class="ico" style="background:linear-gradient(135deg,#1AA563,#0E8C50)">""" + CHECK + """</div>
      <div><div class="t">Flat-rate</div><div class="s">catalog pricing</div></div></div>
    <div class="hero-card">
      <div class="hc-top"><div><div style="font-weight:800;color:var(--navy);font-size:1.05rem">Sample #IAS-4821</div>
        <div style="font-size:.8rem;color:var(--slate);font-family:Inter;margin-top:2px">Potable water · standard turnaround</div></div>
        <span class="tag">Reported</span></div>
      <div class="hc-row"><div><div class="nm">Heavy Metals Panel</div><div class="sub">ICP-MS · multi-element</div></div><div class="pr">$190</div></div>
      <div class="hc-row"><div><div class="nm">SEM / EDS Analysis</div><div class="sub">Surface &amp; elemental</div></div><div class="pr">$250</div></div>
      <div class="hc-row"><div><div class="nm">VOCs Scan</div><div class="sub">GC-MS · 59 compounds</div></div><div class="pr">$150</div></div>
      <div class="hc-row"><div><div class="nm">Total Coliform &amp; E. coli</div><div class="sub">Presence / absence</div></div><div class="pr">$65</div></div>
    </div>
  </div>
</div></section>

<section class="stats"><div class="wrap stats-grid">
  <div class="stat"><div class="n"><span>24</span>+</div><div class="l">Years in operation</div></div>
  <div class="stat"><div class="n">6+</div><div class="l">Instrument platforms</div></div>
  <div class="stat"><div class="n">12</div><div class="l">Industries served</div></div>
  <div class="stat"><div class="n">100+</div><div class="l">Standard tests, priced</div></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>What sets us apart</span>
    <h2 style="margin-top:16px">A lab that works <span class="text-grad">the way you do</span></h2>
    <p>Big-lab capability with small-lab access. Here's what you get when you work with IAS.</p></div>
  """ + WHY_CARDS + """
</div></section>

<section class="section bg-soft"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>How it works</span>
    <h2 style="margin-top:16px">From sample to answer in three steps</h2>
    <p>No forms, no portals required — just a conversation with someone who knows the lab.</p></div>
  """ + STEPS + """
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Testing services</span>
    <h2 style="margin-top:16px">Ongoing programs or a single sample</h2>
    <p>However you need to work with a lab, we've built for it.</p></div>
  """ + SERVICES_SPLIT + """
</div></section>

<section class="section bg-soft"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Instrumentation</span>
    <h2 style="margin-top:16px">The instruments behind the answers</h2>
    <p>Plain-language on what each platform does — and the questions it can answer for you.</p></div>
  """ + instruments_grid() + """
  <div class="center" style="margin-top:34px"><a href="instrumentation.html" class="btn btn-ghost">See full capabilities """ + ARROW + """</a></div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Industries we serve</span>
    <h2 style="margin-top:16px">Trusted across regulated &amp; demanding fields</h2>
    <p>From pharmaceutical release testing to environmental remediation — the breadth to be your single lab partner.</p></div>
  """ + industries_grid() + """
</div></section>

<section class="section bg-pricing"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Pricing &amp; test catalog</span>
    <h2 style="margin-top:16px">Lab pricing, about as simple as it gets</h2>
    <p>Heavy metals on a liquid sample? $190. SEM analysis? $250. Standard tests have standard prices.</p></div>
  """ + PRICE_POP + """
  <div class="center"><a href="pricing.html" class="btn btn-blue">Browse the full catalog """ + ARROW + """</a></div>
</div></section>

""" + cta_band("Not sure which test you need?",
   "Get on the phone with an experienced chemist who can scope it with you — most consultations are included at no charge.") + """
"""
write("index.html","Industrial Analytical Services — Independent Analytical Laboratory | iasamerica.com",
      "IAS is an independent analytical laboratory for industrial, commercial &amp; biomedical testing. ICP-MS, GC-MS, NMR, FTIR, SEM/EDS. Flat catalog pricing. No account required to submit a sample.",
      "home", home)

# ============================================================ ABOUT
about = page_hero("About IAS","An independent lab built for industry — since 2000.",
   "IAS pairs sophisticated instrumentation with a refreshingly direct way of working: clear pricing, real expertise on the phone, and no bureaucracy between you and your answer.") + """
<section class="section"><div class="wrap split">
  <div class="prose reveal">
    <h2>Sophisticated capability, without the friction</h2>
    <p class="lead">Industrial Analytical Services is an independent analytical laboratory specializing in industrial, commercial, and biomedical testing. Founded in 2000, we serve clients across pharmaceutical, environmental, industrial, healthcare and research fields.</p>
    <p>We built IAS around a simple idea: a contract lab should be easy to work with. That means published, catalog-style pricing for standard tests, the freedom to submit a single sample without opening an account, and direct access to the chemists and chemical engineers actually doing the work.</p>
    <ul class="check-list">
      <li>""" + CHECK + """Broad, sophisticated instrumentation — ICP-MS, ICP-OES, GC-MS, NMR, FTIR, SEM/EDS &amp; more</li>
      <li>""" + CHECK + """Decades of combined experience across chemistry, materials, industrial process &amp; biomedical testing</li>
      <li>""" + CHECK + """Flexible engagement — one-off requests alongside long-term scheduled programs</li>
      <li>""" + CHECK + """Bottles, containers &amp; submission materials supplied at no extra charge</li>
    </ul>
  </div>
  <div class="split-media reveal">
    <div class="stat-tiles">
      <div class="stat-tile"><div class="n"><span>24</span>+</div><div class="l">Years in operation</div></div>
      <div class="stat-tile"><div class="n">6+</div><div class="l">Instrument platforms</div></div>
      <div class="stat-tile"><div class="n">12</div><div class="l">Industries served</div></div>
      <div class="stat-tile"><div class="n">100+</div><div class="l">Standard tests, priced</div></div>
    </div>
  </div>
</div></section>

<section class="section bg-soft"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>What we value</span>
    <h2 style="margin-top:16px">How we approach every sample</h2></div>
  <div class="vrow">
    <div class="vitem reveal"><div class="ico">""" + svg('<path d="M3 6h18M3 12h18M3 18h12"/>') + """</div><h4>Transparency</h4><p>Published prices and clear reporting — a catalog, not a negotiation.</p></div>
    <div class="vitem reveal"><div class="ico" style="background:linear-gradient(135deg,#FC6007,#E55706)">""" + svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>') + """</div><h4>Responsiveness</h4><p>Real people, fast answers, and consultations included with most work.</p></div>
    <div class="vitem reveal"><div class="ico" style="background:linear-gradient(135deg,#F1B021,#E9A50A)">""" + svg('<path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/><path d="M9 12l2 2 4-4"/>') + """</div><h4>Rigor</h4><p>Chain-of-custody and litigation-quality documentation when it matters.</p></div>
    <div class="vitem reveal"><div class="ico" style="background:linear-gradient(135deg,#11315F,#071D3D)">""" + svg('<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>') + """</div><h4>Expertise</h4><p>Experienced chemists and chemical engineers behind every result.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Our story</span>
    <h2 style="margin-top:16px">A quarter-century of analytical work</h2></div>
  <div class="timeline reveal">
    <div class="tl"><div class="yr">2000</div><h4>IAS is founded</h4><p>Industrial Analytical Services opens as an independent lab focused on industrial and commercial testing.</p></div>
    <div class="tl"><div class="yr">Growth</div><h4>Instrumentation deepens</h4><p>Investment in ICP-MS, GC-MS, NMR, FTIR and SEM/EDS broadens the range of matrices and questions we can take on.</p></div>
    <div class="tl"><div class="yr">Today</div><h4>Partnership with ETR Laboratories</h4><p>IAS operates in partnership with sister company <a href="https://etrlabs.com" target="_blank" rel="noopener" style="color:var(--blue);font-weight:700">ETR Laboratories</a>, extending capability and capacity across both labs.</p></div>
  </div>
</div></section>

""" + cta_band("Let's talk about your testing",
   "Whether it's one sample or an ongoing program, we'll help you scope the right approach.",
   primary=("Request a consultation","contact.html"), secondary=("Submit a sample","get-started.html"))
write("about.html","About IAS — Independent Analytical Laboratory Since 2000",
      "Founded in 2000, IAS is an independent analytical laboratory for industrial, commercial and biomedical testing — sophisticated instrumentation, catalog pricing, and direct access to expert chemists.",
      "about", about)

# ============================================================ SERVICES (overview)
services = page_hero("Testing Services","Testing services for every kind of question.",
   "From scheduled quality-assurance programs to one-off investigations, explore the full scope of what IAS can analyze — and how we make it easy to get started.") + """
<section class="section"><div class="wrap">
  """ + SERVICES_SPLIT + """
</div></section>

<section class="section bg-soft"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>By sample type</span>
    <h2 style="margin-top:16px">What we test</h2>
    <p>A broad range of matrices across water, solids, and biological samples.</p></div>
  <div class="cards">
    <div class="card reveal"><div class="ico ic-blue">""" + svg('<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M5 16c3 2 11 2 14 0M12 18v4"/>') + """</div>
      <h3>Water &amp; liquids</h3><p>Potable, process, cooling-tower, dialysis and waste water — metals, organics, microbiology, physical parameters and full multi-analyte scans.</p></div>
    <div class="card reveal"><div class="ico ic-orange">""" + svg('<path d="M3 21V8l6-3v3l6-3v3l6-3v16z"/>') + """</div>
      <h3>Solids &amp; materials</h3><p>Soil, paint, powders and industrial materials — priority-pollutant metals, VOCs, pesticides, PCBs, plus FTIR and SEM/EDS material ID.</p></div>
    <div class="card reveal"><div class="ico ic-gold">""" + svg('<path d="M6 2h12v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2"/><path d="M6 22h12v-6a4 4 0 0 0-4-4 4 4 0 0 0-4 4z"/>') + """</div>
      <h3>Biological matrices</h3><p>Blood, serum, tissue, dialysate and biologics — endotoxin, mycoplasma, trace metals and toxicology for clinical, veterinary and research work.</p></div>
  </div>
</div></section>

<section class="section"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>How it works</span>
    <h2 style="margin-top:16px">Getting started is a conversation</h2></div>
  """ + STEPS + """
</div></section>

""" + cta_band("Have a sample in hand?","Tell us what you're testing and we'll point you to the right method — or just send it in.",
   primary=("Submit a sample","get-started.html"), secondary=("Talk to a chemist","contact.html"))
write("services.html","Testing Services — QA, Custom &amp; One-Time Analytical Testing | IAS",
      "Explore IAS testing services: scheduled quality-assurance programs and custom one-time testing across water, solids and biological matrices.",
      "services", services)

# ============================================================ QA PROGRAMS
qa = page_hero("Quality Assurance Programs","Scheduled QA testing that keeps you in compliance.",
   "Routine, scheduled programs that keep your operations in compliance and your processes under control — set up around your facility's requirements and production cycles.",
   ctas='<a href="get-started.html" class="btn btn-primary">Set up a program '+ARROW+'</a><a href="pricing.html" class="btn btn-outline-white">View pricing</a>') + """
<section class="section"><div class="wrap split">
  <div class="prose reveal">
    <h2>Ongoing testing, handled</h2>
    <p class="lead">Many of our clients rely on IAS for ongoing, scheduled quality-assurance testing. We set up a program tailored to your compliance requirements, production cycles, or internal quality standards — and we handle the logistics.</p>
    <p>Accounts are easy to open, repeat submissions are simple, and your results come back clearly and on schedule.</p>
    <a href="get-started.html" class="btn btn-blue" style="margin-top:8px">Open an account</a>
  </div>
  <div class="split-media media-soft reveal"><div class="badge-float"><div class="big"><span>ASTM</span></div><div class="cap">Type I · II · III &amp; additional method types</div></div></div>
</div></section>

<section class="section bg-soft"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Common QA services</span>
    <h2 style="margin-top:16px">Programs we run routinely</h2></div>
  <div class="cards">
    <div class="card reveal"><div class="ico ic-blue">""" + svg('<path d="M3 6h18M3 12h18M3 18h12"/>') + """</div><h3>ASTM standardized testing</h3><p>Type I, Type II, Type III and additional method types, run to specification.</p></div>
    <div class="card reveal"><div class="ico ic-orange">""" + svg('<circle cx="12" cy="12" r="9"/><path d="M8 12h8M12 8v8"/>') + """</div><h3>Endotoxin (LAL) testing</h3><p>Bacterial endotoxin testing for pharmaceutical and medical-device clients.</p></div>
    <div class="card reveal"><div class="ico ic-gold">""" + svg('<circle cx="12" cy="12" r="3"/><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/>') + """</div><h3>Mycoplasma detection</h3><p>Screening to support biologics and cell-culture quality control.</p></div>
    <div class="card reveal"><div class="ico ic-navy">""" + svg('<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/>') + """</div><h3>Microbiology</h3><p>Environmental monitoring, water, process streams and surfaces.</p></div>
    <div class="card reveal"><div class="ico ic-blue">""" + svg('<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M12 18v4"/>') + """</div><h3>Cooling tower &amp; dialysis water</h3><p>Cooling-tower chemistry and biology, plus full-panel dialysis water monitoring.</p></div>
    <div class="card reveal"><div class="ico ic-orange">""" + svg('<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>') + """</div><h3>Raw material &amp; release QC</h3><p>Raw-material and in-process QC plus finished-product release testing.</p></div>
  </div>
</div></section>

""" + cta_band("Ready to set up a program?","We'll tailor scheduled testing to your facility and handle the logistics end-to-end.",
   primary=("Get started","get-started.html"), secondary=("Talk to a chemist","contact.html"))
write("qa-programs.html","Quality Assurance &amp; Scheduled Testing Programs | IAS",
      "Scheduled QA testing programs from IAS: ASTM methods, endotoxin (LAL), mycoplasma, microbiology, cooling-tower and dialysis water monitoring, raw-material and release QC.",
      "services", qa)

# ============================================================ CUSTOM TESTING
custom = page_hero("Custom &amp; One-Time Testing","One sample, one question, no commitment.",
   "Not every testing need fits a standard program. Whether you have a single sample to investigate or a specific analyte to confirm, IAS handles it — and you can submit without setting up an account.",
   ctas='<a href="get-started.html" class="btn btn-primary">Submit a sample '+ARROW+'</a><a href="contact.html" class="btn btn-outline-white">Talk to a chemist</a>') + """
<section class="section"><div class="wrap split rev">
  <div class="split-media reveal"><div class="badge-float"><div class="big">No account<br><span>required</span></div><div class="cap">Just call or email — we'll walk you through what to send.</div></div></div>
  <div class="prose reveal">
    <h2>Investigations, failures &amp; unknowns</h2>
    <p class="lead">Whether you're chasing a contaminant, confirming a compound, or figuring out why a component failed, we'll tell you exactly what to send and how to send it.</p>
    <ul class="check-list">
      <li>""" + CHECK + """Unknown substance identification</li>
      <li>""" + CHECK + """Trace contaminant investigation in a product, raw material or process stream</li>
      <li>""" + CHECK + """Failure analysis on industrial components or materials</li>
      <li>""" + CHECK + """Regulatory or compliance-driven one-time analysis</li>
      <li>""" + CHECK + """Research &amp; development support testing</li>
      <li>""" + CHECK + """Veterinary blood toxicology — metals, contaminants</li>
      <li>""" + CHECK + """Human blood &amp; tissue analysis for research purposes</li>
      <li>""" + CHECK + """Environmental spot sampling &amp; competitive product analysis</li>
    </ul>
  </div>
</div></section>

""" + cta_band("Have something you need answered?","Send a one-time sample with zero setup, or call and we'll help you scope it.",
   primary=("Submit a sample","get-started.html"))
write("custom-testing.html","Custom &amp; One-Time Analytical Testing — No Account Required | IAS",
      "Custom and one-time testing from IAS: unknown substance ID, contaminant investigation, failure analysis, R&amp;D support and research biological testing. No account required.",
      "services", custom)

# ============================================================ INSTRUMENTATION
instr = page_hero("Instrumentation &amp; Capabilities","The instruments behind the answers.",
   "A broad, sophisticated instrument base — from parts-per-trillion trace metals to molecular structure to surface and elemental imaging. Here's what each platform does, in plain language.",
   ctas='<a href="contact.html" class="btn btn-primary">Ask about a specific test '+ARROW+'</a>') + """
<section class="section"><div class="wrap">
  """ + instruments_grid() + """
  <div class="inst-more reveal">Additional capabilities include wet chemistry, titrations, pH/conductivity, Karl Fischer moisture, dissolved gases, microbiological plate counts, and select ASTM physical methods. <a href="contact.html" style="color:var(--blue);font-weight:700">Ask about a specific test →</a></div>
</div></section>

<section class="section bg-soft"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Why it matters</span>
    <h2 style="margin-top:16px">Depth that answers harder questions</h2>
    <p>The breadth of our instrumentation means more of your testing can happen under one roof — with the cross-checks that give you confidence in the result.</p></div>
  <div class="vrow">
    <div class="vitem reveal"><div class="ico">""" + svg('<path d="M3 12h4l2 6 4-12 2 6h6"/>') + """</div><h4>Trace sensitivity</h4><p>Parts-per-trillion detection for metals in demanding matrices.</p></div>
    <div class="vitem reveal"><div class="ico" style="background:linear-gradient(135deg,#FC6007,#E55706)">""" + svg('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>') + """</div><h4>Molecular ID</h4><p>NMR and FTIR confirm structure and fingerprint unknowns.</p></div>
    <div class="vitem reveal"><div class="ico" style="background:linear-gradient(135deg,#F1B021,#E9A50A)">""" + svg('<circle cx="12" cy="12" r="3"/><circle cx="12" cy="12" r="9"/>') + """</div><h4>Surface &amp; particle</h4><p>SEM/EDS images and analyzes surfaces, particles and defects.</p></div>
    <div class="vitem reveal"><div class="ico" style="background:linear-gradient(135deg,#11315F,#071D3D)">""" + svg('<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/>') + """</div><h4>One lab, many methods</h4><p>Fewer vendors, faster correlation across techniques.</p></div>
  </div>
</div></section>

""" + cta_band("Not sure which instrument fits?","Tell us the question you're trying to answer and we'll recommend the right method.",
   primary=("Ask a chemist","contact.html"), secondary=("See pricing","pricing.html"))
write("instrumentation.html","Instrumentation &amp; Analytical Capabilities — ICP-MS, GC-MS, NMR, FTIR, SEM/EDS | IAS",
      "IAS instrumentation: ICP-MS, ICP-OES, GC-MS, NMR, FTIR and SEM/EDS — what each platform does and the questions it answers, plus wet chemistry and ASTM physical methods.",
      "instrumentation", instr)

# ============================================================ INDUSTRIES
ind = page_hero("Industries We Serve","Built for regulated, demanding industries.",
   "From pharmaceutical release testing to environmental remediation, IAS has the instrumentation and the documentation standards to be your single analytical partner.") + """
<section class="section"><div class="wrap">
  """ + industries_grid("three") + """
</div></section>

""" + cta_band("Don't see your industry?","If you have a sample and a question, we can almost certainly help — let's talk.",
   primary=("Request a consultation","contact.html"), secondary=("View pricing","pricing.html"))
write("industries.html","Industries We Serve — Pharma, Environmental, Industrial, Healthcare | IAS",
      "IAS serves pharmaceutical, medical device, dialysis, clinical, veterinary, industrial, chemical, food &amp; beverage, water, environmental, R&amp;D and facilities clients.",
      "industries", ind)

# ============================================================ PRICING
pricing = page_hero("Pricing &amp; Test Catalog","Lab pricing, about as simple as it gets.",
   "Standard tests have standard prices. Heavy metals on a liquid sample? $190. SEM analysis? $250. Search the full catalog below — and for anything custom, just call.",
   ctas='<a href="get-started.html" class="btn btn-primary">Submit a sample '+ARROW+'</a><a href="tel:9784663422" class="btn btn-outline-white">Call (978) 466-3422</a>') + """
<section class="section bg-pricing"><div class="wrap">
  """ + PRICE_POP + CATALOG + """
  <div class="cards" style="margin-top:40px">
    <div class="card reveal"><div class="ico ic-blue">""" + svg('<path d="M3 6h18M3 12h18M3 18h12"/>') + """</div><h3>Flat per-test pricing</h3><p>The majority of analyses are flat-rate with no hidden fees. Volume and scheduled-account pricing available on request.</p></div>
    <div class="card reveal"><div class="ico ic-orange">""" + svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>') + """</div><h3>Rush turnaround</h3><p>Need it fast? Rush processing is available at additional cost — just ask when you submit.</p></div>
    <div class="card reveal"><div class="ico ic-gold">""" + svg('<path d="M9 3v6l-5 9a2 2 0 0 0 1.8 3h12.4A2 2 0 0 0 20 18l-5-9V3"/>') + """</div><h3>Materials included</h3><p>Bottles and submission materials are supplied at no charge. No account required for first-time submissions.</p></div>
  </div>
</div></section>

""" + cta_band("Don't see your test listed?","Custom or non-listed work is no problem — call us for a quick, straightforward quote.",
   primary=("Call (978) 466-3422","tel:9784663422"), secondary=("Submit a sample","get-started.html"))
write("pricing.html","Pricing &amp; Test Catalog — Flat-Rate Analytical Testing | IAS",
      "Browse 100+ IAS tests with flat catalog pricing — water, soil, materials and biological matrices. Search and filter the full test catalog. Bottles and consultations included.",
      "pricing", pricing)

# ============================================================ GET STARTED
get = page_hero("Get Started","Submit your first sample — no account needed.",
   "Three simple steps from question to answer. Submit a one-time sample with zero setup, or open an account for ongoing testing.") + """
<section class="section"><div class="wrap">
  """ + STEPS + """
</div></section>

<section class="section bg-soft"><div class="wrap">
  <div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>Start now</span>
    <h2 style="margin-top:16px">Tell us about your sample</h2>
    <p>Fill this out and we'll reply fast with exactly what to send and how to send it — including free bottles and materials if you need them.</p></div>
  <div style="max-width:760px;margin:0 auto">""" + contact_form("Submit a Sample") + """</div>
</div></section>

<section class="section"><div class="wrap">
  <div class="faq reveal">
    <div class="section-head reveal" style="margin-bottom:34px"><h2>Common questions</h2></div>
    <details><summary>Do I need to set up an account?</summary><p>No. You can submit a one-time sample without setting up a formal account. If you need ongoing testing, we'll set up an account that makes repeat submissions simple.</p></details>
    <details><summary>Do you supply sample bottles and containers?</summary><p>Yes — we supply bottles, sample containers and submission materials at no extra charge. Just tell us what you're testing and we'll send what you need.</p></details>
    <details><summary>Can I talk to someone before I submit?</summary><p>Absolutely. Most consultations are included at no charge. Our chemists and chemical engineers will help you design the right approach before you send anything.</p></details>
    <details><summary>How is pricing handled?</summary><p>Standard tests have published, flat-rate prices — see the <a href="pricing.html" style="color:var(--blue);font-weight:700">test catalog</a>. Custom or high-volume work is quoted directly, and rush turnaround is available at additional cost.</p></details>
    <details><summary>Can you handle biological or research samples?</summary><p>Yes — including blood, serum, tissue and dialysate for clinical, veterinary and research applications, with chain-of-custody documentation where required. Contact us for matrix-specific guidance.</p></details>
  </div>
</div></section>

""" + cta_band("Prefer to talk it through?","Call the lab and a chemist will help you scope your testing in minutes.",
   primary=("Call (978) 466-3422","tel:9784663422"), secondary=("See the catalog","pricing.html"))
write("get-started.html","Get Started — Submit a Sample to IAS (No Account Required)",
      "Submit your first sample to IAS in three simple steps — no account required. Free bottles and materials, included consultations, fast replies.",
      "services", get)

# ============================================================ CONTACT
contact = page_hero("Contact &amp; Consultation","Talk to a chemist — most consults are free.",
   "Tell us what you're testing and what you're looking for. No portal, no account, no obligation — just a straightforward conversation with someone who knows the lab.") + """
<section class="section"><div class="wrap contact-grid">
  <div class="contact-info reveal">
    <span class="eyebrow"><span class="dot"></span>Get in touch</span>
    <h2 style="margin-top:16px">We're easy to reach</h2>
    <p class="lead">Call, email, or send the form — we reply fast and we'll tell you exactly how to get your sample to us.</p>
    <div class="info-item"><div class="ico">""" + PHONE + """</div><div><div class="k">Call the lab</div><div class="v"><a href="tel:9784663422">(978) 466-3422</a><small>Mon–Fri, business hours</small></div></div></div>
    <div class="info-item"><div class="ico">""" + MAIL + """</div><div><div class="k">Email</div><div class="v"><a href="mailto:info@iasamerica.com">info@iasamerica.com</a><small>SDS &amp; spec sheets welcome</small></div></div></div>
    <div class="info-item"><div class="ico">""" + PIN + """</div><div><div class="k">Visit / ship samples</div><div class="v">60 Elm Hill Ave.<small>Leominster, MA 01453</small></div></div></div>
  </div>
  """ + contact_form("Send Us a Message") + """
</div></section>"""
write("contact.html","Contact &amp; Consultation — Industrial Analytical Services",
      "Contact IAS: call (978) 466-3422, email info@iasamerica.com, or visit 60 Elm Hill Ave., Leominster, MA. Free consultations, fast replies, no account required.",
      "contact", contact)

print("\\nAll pages generated.")

