#!/usr/bin/env python3
"""Static multi-page generator for the IAS redesign preview.
Keeps nav/footer/head DRY; emits standalone files that work over file://."""
import os, json
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
__HEADEXTRA__
</head>
<body>
"""

NAV_ITEMS = [("about","About IAS","about.html"),
             ("services","Services","services.html"),
             ("instrumentation","Instrumentation","instrumentation.html"),
             ("industries","Industries","industries.html"),
             ("pricing","Pricing","pricing.html"),
             ("contact","Contact","contact.html")]

def industries_mega():
    items = "".join(
        '<a class="mega-link" href="%s"><span class="mi">%s</span><span class="mt">%s</span></a>'
        % (slug, svg(ic), nm) for nm, ic, desc, slug in INDUSTRIES)
    return ('<div class="mega"><div class="mega-grid">%s</div>'
            '<a class="mega-foot" href="industries.html">View all industries %s</a></div>') % (items, ARROW)

def nav(active):
    chev = svg('<path d="M6 9l6 6 6-6"/>')
    parts = []
    for key, label, href in NAV_ITEMS:
        if key == "industries":
            parts.append(
                '<div class="nav-item has-mega"><div class="nav-row">'
                '<a href="%s" class="nav-top%s">%s</a>'
                '<button class="mega-toggle" type="button" aria-label="Show industries" aria-expanded="false">%s</button>'
                '</div>%s</div>' % (href, " active" if key == active else "", label, chev, industries_mega()))
        else:
            parts.append('<a href="%s"%s>%s</a>' % (href, ' class="active"' if key == active else '', label))
    links = "".join(parts)
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

def write(name, title, desc, active, body, head_extra=""):
    canon = BASE_URL if name == "index.html" else BASE_URL + name
    html = (HEAD.replace("__TITLE__", title)
                .replace("__OGTITLE__", og_title_of(title))
                .replace("__DESC__", desc)
                .replace("__CANON__", canon)
                .replace("__HEADEXTRA__", head_extra)
            + nav(active) + body + FOOTER)
    with open(os.path.join(OUT, name), "w") as f:
        f.write(html)
    print("wrote", name, len(html), "bytes")

# ============================================================ shared content blocks
INDUSTRIES = [
 ("Pharmaceutical &amp; Biotech",'<path d="M10 2v6.5L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L14 8.5V2"/><path d="M8.5 2h7M7 15h10"/>',"Raw material &amp; in-process QC, endotoxin &amp; mycoplasma screening, release testing, process water.","pharmaceutical-testing.html"),
 ("Medical Devices",'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>',"Endotoxin testing, biocompatibility support, material characterization, trace metals.","medical-device-testing.html"),
 ("Dialysis &amp; Healthcare",'<path d="M3 12h4l2 6 4-12 2 6h6"/>',"Full-panel dialysis water quality to AAMI/ANSI standards, with easy scheduled submission.","dialysis-water-testing.html"),
 ("Hospitals &amp; Clinical Research",'<path d="M6 2h12v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2"/><path d="M6 22h12v-6a4 4 0 0 0-4-4 4 4 0 0 0-4 4z"/>',"Blood, serum &amp; tissue analysis for research — metals, toxicology, organics, chain-of-custody.","clinical-research-testing.html"),
 ("Veterinary &amp; Animal Health",'<path d="M11 2a3 3 0 0 0-3 3c0 1 .5 2 .5 2H6a4 4 0 0 0 0 8c1 3 4 5 6 5 3 0 5-2 5-5a4 4 0 0 0 1-7.9"/>',"Blood &amp; tissue toxicology — metals, pesticides &amp; contaminants in biological samples.","veterinary-toxicology-testing.html"),
 ("Industrial &amp; Process",'<path d="M3 21V8l6-3v3l6-3v3l6-3v16z"/><path d="M9 21v-5M15 21v-5"/>',"Process stream monitoring, cooling tower chemistry, raw material QC, failure analysis.","industrial-process-testing.html"),
 ("Chemical Production",'<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/><path d="M8 14h8"/>',"Purity verification, solvent residuals, molecular ID via NMR &amp; FTIR, custom method development.","chemical-testing.html"),
 ("Food &amp; Beverage",'<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/><path d="M9 18a3 3 0 0 0 6 0"/>',"Microbiology, pesticide residues, metals, mycotoxins &amp; process water quality.","food-beverage-testing.html"),
 ("Water &amp; Municipal Utilities",'<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M5 16c3 2 11 2 14 0M12 18v4"/>',"Full inorganic, organic &amp; microbiological panels for treated, process &amp; waste water.","water-testing.html"),
 ("Environmental &amp; Remediation",'<path d="M12 2C8 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2-7-6-12z"/>',"Soil &amp; water for metals, VOCs, SVOCs, pesticides, PCBs &amp; PFAS — litigation-quality docs.","environmental-testing.html"),
 ("Research &amp; Development",'<path d="M2 12a10 10 0 0 1 20 0"/><circle cx="12" cy="12" r="3"/><path d="M12 2v2M22 12h-2M12 22v-2M2 12h2"/>',"Flexible custom analytical support for any matrix — no standing account for pilot-phase work.","rd-analytical-testing.html"),
 ("Property &amp; Facilities",'<path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-6h6v6"/>',"Indoor air, water &amp; material testing — asbestos, lead in paint, mold &amp; VOCs, quick turnaround.","facilities-testing.html"),
]
def industries_grid(extra_class=""):
    cards = "".join(
      '<a class="ind-card reveal" href="%s"><div class="ico">%s</div><h4>%s</h4><p>%s</p>'
      '<span class="ind-more">Explore %s</span></a>' % (slug, svg(ic), nm, desc, ARROW)
      for nm,ic,desc,slug in INDUSTRIES)
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

# ============================================================ INDUSTRY DETAIL PAGES
# A block-palette engine: every industry composes its own ordered "layout" recipe
# from the blocks below, with its own accent + copy, so no two pages are clones.
CHEV = svg('<path d="M9 6l6 6-6 6"/>')
ICOS = ["ic-blue", "ic-orange", "ic-gold", "ic-navy"]
INSTR_BY = {a: (a, full, desc, apps) for a, full, desc, apps in INSTRUMENTS}
NAME_BY_SLUG = {slug: (nm, ic) for nm, ic, desc, slug in INDUSTRIES}

def _sec(inner, cls=""):
    return '<section class="section%s"><div class="wrap">%s</div></section>' % ((" " + cls) if cls else "", inner)

def ihead(eyebrow, h2, p=""):
    pp = '<p>%s</p>' % p if p else ""
    return ('<div class="section-head reveal"><span class="eyebrow"><span class="dot"></span>%s</span>'
            '<h2 style="margin-top:16px">%s</h2>%s</div>') % (eyebrow, h2, pp)

def ind_hero(d):
    cb = ('<div class="breadcrumb"><a href="index.html">Home</a> %s '
          '<a href="industries.html">Industries</a> %s <span>%s</span></div>') % (CHEV, CHEV, d["card_name"])
    ctas = ('<a href="get-started.html" class="btn btn-primary">Submit a sample %s</a>'
            '<a href="pricing.html" class="btn btn-outline-white">View pricing</a>') % ARROW
    return ('<section class="page-hero"><div class="wrap">%s'
            '<span class="eyebrow light"><span class="dot"></span>%s</span>'
            '<h1 style="margin-top:14px">%s</h1><p>%s</p>'
            '<div class="hero-cta">%s</div></div></section>') % (cb, d["eyebrow"], d["h1"], d["hero_p"], ctas)

def ib_overview(d):
    paras = "".join('<p>%s</p>' % p for p in d["paragraphs"])
    bullets = "".join('<li>%s%s</li>' % (CHECK, s) for s in d["solutions"])
    prose = ('<div class="prose reveal"><h2>%s</h2><p class="lead">%s</p>%s'
             '<ul class="check-list">%s</ul></div>') % (d["overview_h2"], d["lead"], paras, bullets)
    media = ('<div class="split-media reveal"><div class="badge-float">'
             '<div class="big">%s</div><div class="cap">%s</div></div></div>') % (d["media"][0], d["media"][1])
    inner = (media + prose) if d.get("media_left") else (prose + media)
    return '<section class="section"><div class="wrap split">%s</div></section>' % inner

def ib_challenges(d):
    cards = "".join('<div class="card reveal"><div class="ico %s">%s</div><h3>%s</h3><p>%s</p></div>'
                    % (ICOS[i % 4], svg(ic), t, x) for i, (ic, t, x) in enumerate(d["challenges"]))
    n = len(d["challenges"])
    grid = '<div class="cards%s">%s</div>' % (" two" if n == 2 else "", cards)
    return _sec(ihead(d.get("ch_eyebrow", "The challenge"), d["ch_h2"], d.get("ch_p", "")) + grid, "bg-soft")

def ib_tests(d):
    rows = "".join('<tr><td>%s</td><td>%s</td><td class="price%s">%s</td></tr>'
                   % (nm, cat, " call" if pr.lower().startswith("call") else "", pr)
                   for nm, cat, pr in d["tests"])
    table = ('<div class="catalog reveal"><div class="table-scroll"><table class="cat">'
             '<thead><tr><th>Test / Analysis</th><th>Typical method</th><th class="r">From</th></tr></thead>'
             '<tbody>%s</tbody></table></div>'
             '<div class="catalog-foot"><span>Representative pricing · bottles &amp; submission materials included · rush available</span>'
             '<span>Need a test not listed here? <a href="contact.html" style="color:var(--blue);font-weight:700">Ask the lab →</a></span>'
             '</div></div>') % rows
    return _sec(ihead(d.get("t_eyebrow", "Pricing &amp; tests"), d["t_h2"], d.get("t_p", "")) + table)

def ib_standards(d):
    chips = "".join('<span class="std-chip">%s</span>' % s for s in d["standards"])
    body = ('<div class="std-band reveal"><div class="std-copy"><span class="eyebrow"><span class="dot"></span>%s</span>'
            '<h3>%s</h3><p>%s</p></div><div class="std-chips">%s</div></div>') % (
        d.get("std_eyebrow", "Standards &amp; compliance"), d["std_h2"], d["std_p"], chips)
    return _sec(body)

def ib_instruments(d):
    cards = "".join('<div class="inst-card reveal"><div class="abbr"><span class="b"></span>%s</div>'
                    '<div class="full">%s</div><p>%s</p>'
                    '<div class="apps"><b>For %s:</b> %s</div></div>'
                    % (a, INSTR_BY[a][1], INSTR_BY[a][2], d["name_short"], use)
                    for a, use in d["instruments"])
    return _sec(ihead(d.get("i_eyebrow", "Instrumentation"), d["i_h2"], d.get("i_p", ""))
                + '<div class="inst">%s</div>' % cards, "bg-soft")

def ib_matrices(d):
    items = "".join('<div class="vitem reveal"><div class="ico">%s</div><h4>%s</h4><p>%s</p></div>'
                    % (svg(ic), t, x) for ic, t, x in d["matrices"])
    return _sec(ihead(d.get("m_eyebrow", "What we test"), d["m_h2"], d.get("m_p", ""))
                + '<div class="vrow">%s</div>' % items)

def ib_process(d):
    return _sec(ihead(d.get("p_eyebrow", "How it works"), d.get("p_h2", "From sample to answer in three steps"),
                      d.get("p_p", "")) + STEPS, "bg-soft")

def ib_faq(d):
    items = "".join('<details><summary>%s</summary><p>%s</p></details>' % (q, a) for q, a in d["faqs"])
    return _sec(ihead(d.get("f_eyebrow", "Questions"), d.get("f_h2", "Frequently asked questions"))
                + '<div class="faq reveal">%s</div>' % items)

def ib_custom(d):
    ico = svg('<circle cx="12" cy="12" r="10"/><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>')
    return ('<section class="section"><div class="wrap"><div class="custom-band reveal">'
            '<div class="cb-ico">%s</div><div class="cb-body">'
            '<span class="eyebrow"><span class="dot"></span>Custom &amp; flexible work</span>'
            '<h3>%s</h3><p>%s</p>'
            '<div class="hero-cta"><a href="contact.html" class="btn btn-primary">Talk to a chemist %s</a>'
            '<a href="custom-testing.html" class="btn btn-ghost">Custom &amp; one-time testing</a></div>'
            '</div></div></div></section>') % (
        ico, d.get("custom_h2", "Don't see exactly what you need?"), d["custom_line"], ARROW)

def ib_related(d):
    cards = "".join('<a class="rel-card reveal" href="%s"><div class="ico">%s</div><span>%s</span>%s</a>'
                    % (s, svg(NAME_BY_SLUG[s][1]), NAME_BY_SLUG[s][0], ARROW) for s in d["related"])
    return _sec(ihead("Related industries", d.get("r_h2", "Explore related testing programs"))
                + '<div class="rel-grid">%s</div>' % cards)

def ib_cta(d):
    return cta_band(d["cta_title"], d["cta_text"],
                    primary=("Request a consultation", "contact.html"),
                    secondary=("Submit a sample", "get-started.html"))

IBLOCKS = {"overview": ib_overview, "challenges": ib_challenges, "tests": ib_tests,
           "standards": ib_standards, "instruments": ib_instruments, "matrices": ib_matrices,
           "process": ib_process, "faq": ib_faq, "custom": ib_custom, "related": ib_related, "cta": ib_cta}

def _txt(s):
    return s.replace("&amp;", "&").replace("&nbsp;", " ")

def ind_jsonld(d):
    url = BASE_URL + d["slug"]
    service = {"@context": "https://schema.org", "@type": "Service",
               "serviceType": _txt(d["service_type"]), "name": _txt(d["h1"]),
               "provider": {"@type": "MedicalBusiness", "name": "Industrial Analytical Services", "url": BASE_URL},
               "areaServed": "US", "url": url, "description": _txt(d["meta_desc"])}
    crumbs = {"@context": "https://schema.org", "@type": "BreadcrumbList", "itemListElement": [
        {"@type": "ListItem", "position": 1, "name": "Home", "item": BASE_URL},
        {"@type": "ListItem", "position": 2, "name": "Industries", "item": BASE_URL + "industries.html"},
        {"@type": "ListItem", "position": 3, "name": _txt(d["card_name"]), "item": url}]}
    faq = {"@context": "https://schema.org", "@type": "FAQPage", "mainEntity": [
        {"@type": "Question", "name": _txt(q),
         "acceptedAnswer": {"@type": "Answer", "text": _txt(a)}} for q, a in d["faqs"]]}
    return "".join('<script type="application/ld+json">%s</script>\n' % json.dumps(b, ensure_ascii=False)
                   for b in (service, crumbs, faq))

def build_industry(d):
    body = '<div class="ipage acc-%s">' % d["accent"] + ind_hero(d)
    for key in d["layout"]:
        body += IBLOCKS[key](d)
    body += "</div>"
    write(d["slug"], d["title"], d["meta_desc"], "industries", body, head_extra=ind_jsonld(d))

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

# ============================================================ INDUSTRY PAGE DATA
# reusable icon paths for matrices / challenge cards
_I = {
 "drop":'<path d="M12 2C8 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2-7-6-12z"/>',
 "wave":'<path d="M12 2v4M5 8c3 2 11 2 14 0M4 12c4 2.5 12 2.5 16 0M5 16c3 2 11 2 14 0M12 18v4"/>',
 "flask":'<path d="M9 3h6v5l4 9a2 2 0 0 1-1.8 3H6.8A2 2 0 0 1 5 17l4-9z"/><path d="M8 14h8"/>',
 "vial":'<path d="M10 2v6.5L4.5 18A2 2 0 0 0 6.3 21h11.4a2 2 0 0 0 1.8-3L14 8.5V2"/><path d="M8.5 2h7"/>',
 "factory":'<path d="M3 21V8l6-3v3l6-3v3l6-3v16z"/><path d="M9 21v-5M15 21v-5"/>',
 "shield":'<path d="M12 2 3 7v6c0 5 4 8 9 9 5-1 9-4 9-9V7z"/><path d="M9 12l2 2 4-4"/>',
 "search":'<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
 "clip":'<path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>',
 "clock":'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 "blood":'<path d="M6 2h12v6a4 4 0 0 1-4 4 4 4 0 0 1-4-4V2"/><path d="M6 22h12v-6a4 4 0 0 0-4-4 4 4 0 0 0-4 4z"/>',
 "leaf":'<path d="M11 20A7 7 0 0 1 4 13c0-6 6-11 16-11 0 10-5 16-11 16z"/><path d="M4 21c4-6 8-8 12-9"/>',
 "build":'<path d="M3 21V7l9-4 9 4v14"/><path d="M9 21v-6h6v6"/>',
 "food":'<path d="M5 11a7 7 0 0 1 14 0v3l2 4H3l2-4z"/><path d="M9 18a3 3 0 0 0 6 0"/>',
 "atom":'<circle cx="12" cy="12" r="2"/><path d="M12 2a14 6 0 0 0 0 20M12 2a14 6 0 0 1 0 20" transform="rotate(60 12 12)"/><path d="M2 12a6 14 0 0 0 20 0" transform="rotate(60 12 12)"/>',
 "paw":'<path d="M11 2a3 3 0 0 0-3 3c0 1 .5 2 .5 2H6a4 4 0 0 0 0 8c1 3 4 5 6 5 3 0 5-2 5-5a4 4 0 0 0 1-7.9"/>',
 "doc":'<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/>',
 "bug":'<path d="M8 2l1.5 2M16 2l-1.5 2M5 11H2M22 11h-3M6 20l-2 2M18 20l2 2"/><rect x="7" y="6" width="10" height="12" rx="5"/>',
}

INDUSTRY_PAGES = [
 # ---------------------------------------------------------------- 1. Pharmaceutical
 {"slug":"pharmaceutical-testing.html","card_name":"Pharmaceutical &amp; Biotech","accent":"blue",
  "name_short":"pharma QC","eyebrow":"Pharmaceutical &amp; Biotech Testing",
  "h1":"Pharmaceutical &amp; biotech analytical testing",
  "hero_p":"Raw-material identity, in-process QC, endotoxin and mycoplasma screening, elemental impurities, and finished-product release testing — with documentation your auditors will accept.",
  "title":"Pharmaceutical Testing Lab — Raw Material QC, Endotoxin &amp; Release Testing | IAS",
  "meta_desc":"Pharmaceutical and biotech analytical testing from IAS: raw material identity and QC, bacterial endotoxin (LAL), mycoplasma screening, ICH Q3D elemental impurities, USP purified water and finished-product release testing.",
  "service_type":"Pharmaceutical Analytical Testing",
  "layout":["overview","standards","tests","instruments","process","faq","custom","related","cta"],
  "overview_h2":"A contract lab that keeps your batches moving",
  "lead":"From incoming raw materials to final release, IAS gives pharmaceutical and biotech manufacturers the analytical depth — and the turnaround — to keep production on schedule and inspectors satisfied.",
  "paragraphs":["Whether you are qualifying a new excipient supplier, investigating an out-of-spec result, or running routine release testing, our chemists work alongside your QC team rather than behind a portal.",
                "Standard analyses carry catalog pricing, repeat submissions are simple once an account is open, and one-off investigations are always welcome."],
  "solutions":["Raw-material identity &amp; purity verification by NMR and FTIR",
               "Bacterial endotoxin (LAL) and mycoplasma screening",
               "Elemental impurities to ICH Q3D / USP &lt;232&gt;&amp;&lt;233&gt; by ICP-MS",
               "USP purified water &amp; water-for-injection system monitoring",
               "In-process checks and finished-product release testing"],
  "media":("USP","Elemental impurities · endotoxin · release"),
  "std_h2":"Built for regulated release","std_eyebrow":"Standards we work to",
  "std_p":"We run to recognized compendial and ICH expectations, with reporting and chain-of-custody suited to audited environments.",
  "standards":["USP &lt;85&gt; Endotoxin","USP &lt;61&gt;/&lt;62&gt; Microbial","ICH Q3D","USP &lt;232&gt;/&lt;233&gt;","USP &lt;645&gt; Water Conductivity","USP &lt;467&gt; Residual Solvents"],
  "t_h2":"Common pharmaceutical tests &amp; pricing","t_p":"A representative slice of routine pharma work — anything compendial or custom can be quoted on a call.",
  "tests":[("Elemental impurities panel (ICH Q3D)","ICP-MS","$190"),
           ("Bacterial endotoxin (LAL)","Kinetic / gel-clot","$120"),
           ("Mycoplasma screening","Culture / PCR","Call to quote"),
           ("Residual solvents","GC-MS","$150"),
           ("Compound / API identity","NMR","$280"),
           ("USP purified water suite","Conductivity · TOC · microbial","$165")],
  "i_h2":"The instruments behind pharma release",
  "instruments":[("ICP-MS","elemental impurity panels to USP &lt;232&gt;/&lt;233&gt; on drug substance, excipients and process water"),
                 ("NMR","structural confirmation and identity of APIs, intermediates and reference standards"),
                 ("FTIR","incoming raw-material identity verified against your specification")],
  "p_h2":"From batch sample to release decision","p_p":"No formal account is required to send your first sample for evaluation.",
  "faqs":[("Do you perform USP &lt;232&gt;/&lt;233&gt; elemental impurities testing?","Yes. We run ICH Q3D elemental impurity panels by ICP-MS on drug substances, excipients, finished products and process water, with reporting against your established permitted daily exposures."),
          ("Can you support a release-testing program with recurring submissions?","Absolutely. Many pharmaceutical clients run scheduled release and stability-support testing with us. We open a simple account so repeat submissions and reporting stay consistent."),
          ("Do you handle bacterial endotoxin (LAL) and mycoplasma?","Yes — kinetic and gel-clot LAL endotoxin testing and mycoplasma screening to support biologics, sterile products and medical-device clients."),
          ("Can you develop a method for a non-compendial impurity?","We do. Custom method development and validation support is part of our routine work, including non-compendial impurities and difficult matrices."),
          ("Is an account required to send a single sample?","No. You can submit a one-time sample for investigation or qualification without opening an account.")],
  "custom_h2":"Beyond the compendium",
  "custom_line":"Method transfer, a non-compendial impurity, a stubborn excipient matrix, or a deviation investigation — we develop and run custom analytical methods for pharma and biotech, and you can send a single sample without ever opening an account.",
  "related":["medical-device-testing.html","chemical-testing.html","dialysis-water-testing.html"],
  "cta_title":"Keep your batches on schedule","cta_text":"Talk to a chemist about your release, raw-material or impurity testing — most consultations are included at no charge."},

 # ---------------------------------------------------------------- 2. Medical Devices
 {"slug":"medical-device-testing.html","card_name":"Medical Devices","accent":"cyan",
  "name_short":"device makers","eyebrow":"Medical Device Testing",
  "h1":"Medical device analytical &amp; biocompatibility-support testing",
  "hero_p":"Endotoxin testing, extractables and leachables, material characterization, and trace-metal analysis to support your biocompatibility and regulatory submissions.",
  "title":"Medical Device Testing Lab — Endotoxin, Extractables &amp; Material ID | IAS",
  "meta_desc":"Medical device analytical testing from IAS: bacterial endotoxin (LAL), extractables and leachables, ISO 10993 biocompatibility support, material characterization by FTIR/SEM-EDS and trace metals by ICP-MS.",
  "service_type":"Medical Device Analytical Testing",
  "layout":["challenges","overview","standards","tests","matrices","faq","custom","related","cta"],
  "ch_h2":"What device makers come to us for","ch_eyebrow":"Where we help",
  "challenges":[(_I["shield"],"Biocompatibility data","Chemical characterization and extractables/leachables data to feed your ISO 10993-18 risk assessment."),
                (_I["vial"],"Endotoxin &amp; sterility support","Bacterial endotoxin (LAL) testing on devices, components and rinse solutions."),
                (_I["search"],"Material confirmation","Polymer and metal ID, plus surface and particulate analysis when something looks wrong.")],
  "overview_h2":"Analytical support across the device lifecycle",
  "lead":"From material selection through design verification and ongoing lot release, IAS provides the chemistry that underpins device safety and regulatory submissions.",
  "paragraphs":["We characterize the materials your device is made of, quantify what could migrate out of them, and verify cleanliness and trace-metal content — then document it for your file.",
                "Single components, finished devices, or recurring lot-release work are all welcome, with or without a standing account."],
  "solutions":["Bacterial endotoxin (LAL) on devices &amp; rinse solutions",
               "Extractables &amp; leachables study support",
               "Polymer &amp; elastomer identification by FTIR",
               "Surface, coating &amp; particulate analysis by SEM/EDS",
               "Trace metals &amp; elemental content by ICP-MS"],
  "media":("ISO","10993 chemical characterization support"),
  "media_left":True,
  "std_h2":"Aligned to device expectations","std_eyebrow":"Frameworks we support",
  "std_p":"Our chemical characterization, endotoxin and material-ID work is structured to feed recognized biocompatibility and quality frameworks.",
  "standards":["ISO 10993-18","ISO 10993-1","USP &lt;85&gt; Endotoxin","ANSI/AAMI ST72","USP &lt;661&gt; Plastics","ICP-MS Trace Metals"],
  "t_h2":"Representative device tests","t_p":"",
  "tests":[("Bacterial endotoxin (LAL)","Kinetic / gel-clot","$120"),
           ("Extractables / leachables study","GC-MS · ICP-MS","Call to quote"),
           ("Polymer / material identification","FTIR","$135"),
           ("Surface &amp; particulate analysis","SEM/EDS","$250"),
           ("Trace metals on device material","ICP-MS","$190")],
  "m_h2":"Sample types we handle","m_eyebrow":"Matrices",
  "matrices":[(_I["build"],"Finished devices &amp; components","Implants, instruments, tubing, connectors and packaging."),
              (_I["drop"],"Extracts &amp; rinse solutions","Simulated-use extracts and final rinse waters."),
              (_I["flask"],"Raw materials","Polymers, elastomers, coatings and metals before they enter the build.")],
  "faqs":[("Can you support an ISO 10993-18 chemical characterization?","Yes. We generate extractables/leachables and elemental data structured to support your ISO 10993-18 chemical characterization and the toxicological risk assessment built on it."),
          ("Do you test bacterial endotoxin on finished devices?","We do — LAL endotoxin testing on devices, components and rinse solutions, including support for routine lot release."),
          ("Can you identify an unknown material or particulate on a device?","Yes. FTIR identifies polymers and organics while SEM/EDS images and analyzes surfaces, coatings and particulate contamination."),
          ("Do I need an account to send one component?","No. One-off submissions are welcome — useful for failure investigations or qualifying a new material.")],
  "custom_h2":"Unusual device, unusual question",
  "custom_line":"Novel material, an odd particulate, a cleaning-validation rinse, or a one-off failure investigation — we will scope a custom approach for any device chemistry challenge, no standing account required.",
  "related":["pharmaceutical-testing.html","clinical-research-testing.html","chemical-testing.html"],
  "cta_title":"Build your device file on solid data","cta_text":"Tell us where you are in the lifecycle and we will recommend the right characterization and release testing."},

 # ---------------------------------------------------------------- 3. Dialysis & Healthcare
 {"slug":"dialysis-water-testing.html","card_name":"Dialysis &amp; Healthcare","accent":"teal",
  "name_short":"dialysis clinics","eyebrow":"Dialysis Water Testing",
  "h1":"Dialysis water &amp; dialysate testing to AAMI standards",
  "hero_p":"Full-panel dialysis water quality — chemical contaminants, microbial counts and bacterial endotoxin — to ANSI/AAMI standards, with scheduled submission that keeps your program audit-ready.",
  "title":"Dialysis Water Testing — AAMI Chemical, Microbial &amp; Endotoxin Panels | IAS",
  "meta_desc":"Dialysis water testing from IAS to ANSI/AAMI standards: chemical contaminant panels, microbial counts and bacterial endotoxin for dialysis water and dialysate, with easy scheduled submission for clinics.",
  "service_type":"Dialysis Water Quality Testing",
  "layout":["overview","standards","tests","process","faq","custom","related","cta"],
  "overview_h2":"Compliance your surveyors will trust",
  "lead":"Dialysis water and dialysate carry strict limits because the consequences of contamination reach the patient directly. IAS runs the full AAMI panel and makes recurring submission painless.",
  "paragraphs":["We test for the AAMI list of chemical contaminants, perform heterotrophic plate counts, and quantify bacterial endotoxin — the three pillars surveyors look for in a dialysis water program.",
                "Set up a recurring schedule and we handle the logistics, supply the sampling materials, and return clearly formatted reports on time, every cycle."],
  "solutions":["Full AAMI chemical contaminant panel by ICP-MS",
               "Heterotrophic plate counts (microbial) on water &amp; dialysate",
               "Bacterial endotoxin (LAL) testing",
               "Scheduled, recurring submission with materials supplied",
               "Clear, audit-ready reporting each cycle"],
  "media":("AAMI","Chemical · microbial · endotoxin panel"),
  "std_h2":"Run to the dialysis water standards","std_eyebrow":"Standards",
  "std_p":"Our panels follow the recognized ANSI/AAMI framework for water and dialysate used in hemodialysis.",
  "standards":["ANSI/AAMI 13959","ANSI/AAMI 11663","ANSI/AAMI ST72 Endotoxin","AAMI Chemical Contaminants","Heterotrophic Plate Count","ICP-MS Trace Metals"],
  "t_h2":"Dialysis testing &amp; pricing","t_p":"Most clinics run these on a fixed schedule — ask about program pricing for recurring submissions.",
  "tests":[("AAMI chemical contaminant panel","ICP-MS","$210"),
           ("Heterotrophic plate count","Membrane filtration","$55"),
           ("Bacterial endotoxin (LAL)","Kinetic / gel-clot","$120"),
           ("Full dialysis water program (per cycle)","Chemical + microbial + endotoxin","Call to quote")],
  "p_h2":"How a dialysis program runs","p_p":"We supply the bottles and sampling instructions, and your results return on a predictable cycle.",
  "faqs":[("Which standards do your dialysis water panels follow?","Our chemical, microbial and endotoxin testing follows the recognized ANSI/AAMI framework for water and dialysate used in hemodialysis, including the AAMI chemical contaminant list."),
          ("Can you set up recurring monthly testing?","Yes. Most dialysis clients run on a fixed schedule. We open a simple account, supply sampling materials, and return reports each cycle so your program stays audit-ready."),
          ("Do you test dialysate as well as the product water?","We test both the treated water and dialysate for the relevant chemical, microbial and endotoxin parameters."),
          ("Do you supply the bottles and sampling materials?","Yes — sampling containers and instructions are provided at no extra charge with your program.")],
  "custom_h2":"Beyond the standard panel",
  "custom_line":"Investigating a water-system excursion, validating a new RO loop, or chasing an unexpected microbial result? We will design custom dialysis water and healthcare-facility testing around your situation — just call.",
  "related":["pharmaceutical-testing.html","clinical-research-testing.html","water-testing.html"],
  "cta_title":"Keep your water program audit-ready","cta_text":"Set up scheduled dialysis water testing and let us handle the logistics, materials and reporting."},

 # ---------------------------------------------------------------- 4. Hospitals & Clinical Research
 {"slug":"clinical-research-testing.html","card_name":"Hospitals &amp; Clinical Research","accent":"violet",
  "name_short":"researchers","eyebrow":"Clinical &amp; Research Testing",
  "h1":"Clinical research analytical testing — blood, serum &amp; tissue",
  "hero_p":"Metals, toxicology and organic analysis on blood, serum and tissue for research — with chain-of-custody documentation and direct access to the chemists doing the work.",
  "title":"Clinical Research Lab Testing — Blood, Serum &amp; Tissue Analysis | IAS",
  "meta_desc":"Clinical and research analytical testing from IAS: trace metals, toxicology and organic analysis on blood, serum and tissue for research, with chain-of-custody documentation and expert consultation.",
  "service_type":"Clinical Research Analytical Testing",
  "layout":["overview","matrices","tests","instruments","faq","custom","related","cta"],
  "overview_h2":"An analytical partner for research teams",
  "lead":"Hospital research groups, academic labs and clinical investigators rely on IAS for the quantitative chemistry behind their studies — trace metals, toxicology and organic analysis on demanding biological matrices.",
  "paragraphs":["We measure what is in a sample down to trace levels, document the chain of custody when your protocol requires it, and talk through results with the researchers who need to interpret them.",
                "Pilot-phase studies can start with a single sample and no account; ongoing studies get a streamlined submission workflow."],
  "solutions":["Trace metals in blood, serum &amp; tissue by ICP-MS",
               "Toxicology &amp; contaminant screening",
               "Organic compound analysis by GC-MS",
               "Chain-of-custody documentation on request",
               "Direct consultation on study design &amp; interpretation"],
  "media":("ppt","Trace-level metals in biological matrices"),
  "m_h2":"Biological matrices we analyze","m_eyebrow":"Sample types",
  "matrices":[(_I["blood"],"Blood &amp; serum","Trace metals, toxic elements and organic analytes at research-grade sensitivity."),
              (_I["vial"],"Tissue","Digestion and elemental or organic analysis of tissue specimens."),
              (_I["drop"],"Other fluids","Urine, dialysate and study-specific matrices by arrangement.")],
  "t_h2":"Representative research tests","t_p":"",
  "tests":[("Trace metals in blood / serum","ICP-MS","$190"),
           ("Heavy metal / toxic element panel","ICP-MS","$210"),
           ("Organic compound screen","GC-MS","$185"),
           ("Tissue elemental analysis","Digestion + ICP-MS","Call to quote")],
  "i_h2":"Instruments for research-grade answers",
  "instruments":[("ICP-MS","parts-per-trillion metals in blood, serum and digested tissue"),
                 ("GC-MS","identification and quantitation of organic analytes and contaminants"),
                 ("FTIR","compound and material identification in research samples")],
  "faqs":[("Do you provide chain-of-custody documentation?","Yes. When your protocol or eventual publication requires it, we maintain documented chain-of-custody from receipt through reporting."),
          ("Can you analyze trace metals in blood, serum or tissue?","Yes — ICP-MS gives parts-per-trillion sensitivity for metals and toxic elements across blood, serum, tissue and other biological matrices."),
          ("Can I start with a single pilot sample?","Absolutely. Pilot-phase work can begin with one sample and no account, which is ideal before committing to a full study."),
          ("Will a chemist help me interpret the data?","Yes. Most consultations are included — you can talk through method choice and results directly with the analyst.")],
  "custom_h2":"Every study is a little different",
  "custom_line":"Unusual matrix, a bespoke analyte list, or a method that has to be built around your protocol? Research is where flexible, custom analytical work is the norm for us — bring us the question.",
  "related":["veterinary-toxicology-testing.html","pharmaceutical-testing.html","rd-analytical-testing.html"],
  "cta_title":"Put real chemistry behind your study","cta_text":"Talk through your matrix and analyte list with a chemist before you submit your first sample."},

 # ---------------------------------------------------------------- 5. Veterinary & Animal Health
 {"slug":"veterinary-toxicology-testing.html","card_name":"Veterinary &amp; Animal Health","accent":"green",
  "name_short":"vets","eyebrow":"Veterinary Toxicology Testing",
  "h1":"Veterinary toxicology &amp; animal health testing",
  "hero_p":"Blood and tissue toxicology for animals — heavy metals, pesticides and contaminants — with practical turnaround and a chemist on the phone when results need context.",
  "title":"Veterinary Toxicology Lab — Animal Blood &amp; Tissue Metals, Pesticides | IAS",
  "meta_desc":"Veterinary toxicology testing from IAS: heavy metals, pesticides and contaminant analysis in animal blood and tissue, with fast turnaround and expert consultation for vets and animal-health researchers.",
  "service_type":"Veterinary Toxicology Testing",
  "layout":["challenges","overview","tests","matrices","faq","custom","related","cta"],
  "ch_h2":"When an animal case turns analytical","ch_eyebrow":"Common cases",
  "challenges":[(_I["shield"],"Suspected poisoning","Heavy-metal and pesticide screening when toxicity is on the differential."),
                (_I["search"],"Unexplained illness","Contaminant and trace-element analysis to support a diagnosis."),
                (_I["doc"],"Herd &amp; feed concerns","Testing across multiple animals or feed/water sources to find a common cause.")],
  "overview_h2":"Toxicology answers for animal health",
  "lead":"Veterinarians, diagnostic labs and animal-health researchers use IAS for the trace-element and contaminant chemistry that confirms — or rules out — a toxicological cause.",
  "paragraphs":["We quantify heavy metals and screen for pesticides and contaminants in blood and tissue, and we talk results through with the clinician or researcher who has to act on them.",
                "Single urgent cases and ongoing research programs are equally welcome, with no account required to send the first sample."],
  "solutions":["Heavy-metal panels in animal blood &amp; tissue by ICP-MS",
               "Pesticide &amp; contaminant screening by GC-MS",
               "Trace-element analysis for nutritional or toxic status",
               "Feed &amp; water source testing to find a common cause",
               "Direct consultation with an experienced chemist"],
  "media":("Tox","Metals · pesticides · contaminants"),
  "t_h2":"Veterinary tests &amp; pricing","t_p":"",
  "tests":[("Heavy-metal panel (blood / tissue)","ICP-MS","$190"),
           ("Single toxic element (e.g. lead)","ICP-MS","$85"),
           ("Pesticide / contaminant screen","GC-MS","$185"),
           ("Feed or water source analysis","ICP-MS · GC-MS","Call to quote")],
  "m_h2":"What we test for animal cases","m_eyebrow":"Matrices",
  "matrices":[(_I["blood"],"Blood &amp; serum","Heavy metals and toxic elements at diagnostic sensitivity."),
              (_I["paw"],"Tissue","Liver, kidney and other tissue for elemental and contaminant analysis."),
              (_I["food"],"Feed &amp; water","Source testing when several animals are affected.")],
  "faqs":[("Can you test animal blood and tissue for heavy metals?","Yes. ICP-MS quantifies lead, arsenic, mercury and a full heavy-metal panel in animal blood, serum and tissue at diagnostic sensitivity."),
          ("Do you screen for pesticides in a suspected poisoning?","We do — GC-MS screening for pesticides and other contaminants supports suspected-toxicity cases."),
          ("Can you help when a whole herd or kennel is affected?","Yes. We can test across multiple animals and the shared feed or water sources to help identify a common cause."),
          ("How fast can urgent cases be handled?","Rush turnaround is available at additional cost — tell us the urgency when you call and we will prioritize accordingly.")],
  "custom_h2":"Unusual species, unusual sample",
  "custom_line":"Exotic species, an uncommon matrix, or an analyte that is not on a standard panel? Veterinary work is rarely cookie-cutter, and neither are we — call and we will build the right approach.",
  "related":["clinical-research-testing.html","food-beverage-testing.html","environmental-testing.html"],
  "cta_title":"Get a toxicology answer you can act on","cta_text":"Call the lab to scope an urgent case or set up ongoing animal-health research testing."},

 # ---------------------------------------------------------------- 6. Industrial & Process
 {"slug":"industrial-process-testing.html","card_name":"Industrial &amp; Process","accent":"steel",
  "name_short":"process engineers","eyebrow":"Industrial &amp; Process Testing",
  "h1":"Industrial &amp; process analytical testing",
  "hero_p":"Process-stream monitoring, cooling-tower chemistry, raw-material QC and failure analysis — the chemistry that keeps a plant running and explains it when something goes wrong.",
  "title":"Industrial Process Testing Lab — Cooling Tower, Raw Material QC, Failure Analysis | IAS",
  "meta_desc":"Industrial and process analytical testing from IAS: process-stream monitoring, cooling-tower water chemistry, raw-material QC, and failure analysis by SEM/EDS, FTIR and ICP for manufacturers and plants.",
  "service_type":"Industrial Process Analytical Testing",
  "layout":["overview","challenges","instruments","tests","faq","custom","related","cta"],
  "overview_h2":"Chemistry that keeps production running",
  "lead":"Plants and manufacturers use IAS to monitor process streams, control utility water, qualify incoming materials, and run the failure analysis that turns an unplanned shutdown into a root cause.",
  "paragraphs":["We watch the chemistry of the fluids and materials your process depends on, flag drift before it becomes downtime, and dig into components when they fail prematurely.",
                "Whether it is a routine monitoring program or a single urgent failure, you reach a chemist directly — not a ticket queue."],
  "solutions":["Process-stream &amp; utility water monitoring",
               "Cooling-tower chemistry &amp; corrosion control",
               "Raw-material and incoming-lot QC",
               "Failure analysis by SEM/EDS, FTIR and ICP",
               "Unknown deposit, scale &amp; residue identification"],
  "media":("Root","cause from the chemistry up"),
  "media_left":True,
  "ch_h2":"Where process testing earns its keep","ch_eyebrow":"Typical work",
  "challenges":[(_I["factory"],"Process drift","Trend the chemistry of a stream so you catch a problem before it scraps product."),
                (_I["clock"],"Unplanned failure","SEM/EDS and material ID to find why a component or weld failed."),
                (_I["wave"],"Utility water","Cooling-tower and boiler chemistry to control scale, corrosion and microbial growth.")],
  "i_h2":"Instruments for plant problems",
  "instruments":[("SEM/EDS","imaging and elemental analysis of failed parts, deposits and surface contamination"),
                 ("ICP-OES","metals across process water, industrial fluids, alloys and wastewater"),
                 ("FTIR","identifying unknown deposits, residues, films and incoming materials")],
  "t_h2":"Representative industrial tests","t_p":"",
  "tests":[("Failure analysis (SEM/EDS)","SEM/EDS","$250"),
           ("Metals in process water / fluid","ICP-OES","$160"),
           ("Cooling-tower water panel","Multi-parameter","$140"),
           ("Unknown deposit / scale ID","FTIR · SEM/EDS","$175"),
           ("Raw-material conformance","Method-dependent","Call to quote")],
  "faqs":[("Can you do failure analysis on a broken component?","Yes. SEM/EDS imaging plus elemental and material analysis is a core service — we determine why parts, welds, coatings and deposits fail."),
          ("Do you run cooling-tower and boiler water chemistry?","We do, including the parameters needed to control scale, corrosion and microbiological growth in utility water systems."),
          ("Can you identify an unknown deposit or residue in our process?","Yes. FTIR and SEM/EDS together identify scales, films, particulates and residues so you can trace the source."),
          ("Do you support recurring process-monitoring programs?","Yes — scheduled monitoring with consistent reporting is common, and accounts are easy to open.")],
  "custom_h2":"Every plant is one of a kind",
  "custom_line":"A proprietary fluid, an unusual alloy, an intermittent defect no one can pin down — process problems are exactly where our custom, flexible analytical work shines. Send the sample and let us investigate.",
  "related":["chemical-testing.html","environmental-testing.html","water-testing.html"],
  "cta_title":"Turn a process problem into a root cause","cta_text":"Get a chemist on the phone to scope monitoring, raw-material QC, or an urgent failure analysis."},

 # ---------------------------------------------------------------- 7. Chemical Production
 {"slug":"chemical-testing.html","card_name":"Chemical Production","accent":"orange",
  "name_short":"chemical producers","eyebrow":"Chemical Analysis &amp; Method Development",
  "h1":"Chemical analysis, purity verification &amp; method development",
  "hero_p":"Purity verification, solvent residuals, and molecular identification by NMR and FTIR — plus custom method development when an off-the-shelf test does not exist.",
  "title":"Chemical Testing Lab — Purity, Molecular ID (NMR/FTIR) &amp; Method Development | IAS",
  "meta_desc":"Chemical analysis from IAS: purity verification, residual solvent analysis, molecular identification by NMR and FTIR, and custom analytical method development for chemical producers and formulators.",
  "service_type":"Chemical Analysis &amp; Method Development",
  "layout":["overview","instruments","tests","matrices","faq","custom","related","cta"],
  "overview_h2":"Know exactly what is in the bottle",
  "lead":"Chemical producers and formulators rely on IAS to confirm identity, quantify purity, hunt down residual solvents, and develop methods for compounds that no standard test was written for.",
  "paragraphs":["Our NMR and FTIR capability confirms molecular structure and fingerprints unknowns, while chromatography quantifies the impurities and residuals that matter to your spec.",
                "When the analysis you need does not exist yet, our chemists develop and document it — and you can start with a single sample."],
  "solutions":["Purity verification &amp; assay",
               "Residual solvent analysis by GC-MS",
               "Molecular structure &amp; identity by NMR",
               "Functional-group &amp; unknown ID by FTIR",
               "Custom method development &amp; documentation"],
  "media":("NMR","Structure · purity · identity"),
  "i_h2":"Instruments for molecular certainty",
  "instruments":[("NMR","definitive structure elucidation, identity confirmation and purity by integration"),
                 ("FTIR","functional-group fingerprinting and rapid identification of unknown chemicals"),
                 ("GC-MS","residual solvents, volatile impurities and contaminant identification")],
  "t_h2":"Representative chemical tests","t_p":"",
  "tests":[("Molecular identity / structure","NMR","$280"),
           ("Functional-group ID","FTIR","$135"),
           ("Residual solvents","GC-MS","$150"),
           ("Purity / assay","Method-dependent","Call to quote"),
           ("Custom method development","Scoped per project","Call to quote")],
  "m_h2":"What we characterize","m_eyebrow":"Sample types",
  "matrices":[(_I["flask"],"Raw &amp; intermediate chemicals","Identity, purity and impurity profiling of inputs and intermediates."),
              (_I["drop"],"Solvents &amp; formulations","Residual solvents, composition and contaminant screening."),
              (_I["search"],"Unknowns","Reverse-engineering and identification of unidentified substances.")],
  "faqs":[("Can you confirm the structure of a compound?","Yes. NMR provides definitive structure elucidation and identity confirmation, complemented by FTIR for functional-group fingerprinting."),
          ("Do you measure residual solvents?","Yes — GC-MS quantifies residual solvents and volatile impurities against your specification."),
          ("Can you develop a method for a compound with no standard test?","That is a core strength. We develop, document and run custom analytical methods for novel and difficult compounds."),
          ("Can you identify an unknown chemical?","Yes. Combining NMR, FTIR and GC-MS, we identify unknown substances and reverse-engineer composition.")],
  "custom_h2":"When no standard method exists",
  "custom_line":"A novel compound, a proprietary formulation, an impurity nobody has a method for — developing custom analytical methods is something we do every week. Send a sample and we will build the approach around it.",
  "related":["pharmaceutical-testing.html","industrial-process-testing.html","rd-analytical-testing.html"],
  "cta_title":"Confirm identity, purity and more","cta_text":"Talk to a chemist about your compound, your spec, or a method that needs to be built from scratch."},

 # ---------------------------------------------------------------- 8. Food & Beverage
 {"slug":"food-beverage-testing.html","card_name":"Food &amp; Beverage","accent":"amber",
  "name_short":"food &amp; beverage","eyebrow":"Food &amp; Beverage Testing",
  "h1":"Food &amp; beverage analytical testing",
  "hero_p":"Microbiology, pesticide residues, heavy metals, mycotoxins and process-water quality — the safety and quality testing that protects your product and your brand.",
  "title":"Food &amp; Beverage Testing Lab — Pesticides, Metals, Mycotoxins, Microbiology | IAS",
  "meta_desc":"Food and beverage testing from IAS: microbiology, pesticide residue analysis, heavy metals, mycotoxins and process-water quality for producers, processors and beverage manufacturers.",
  "service_type":"Food &amp; Beverage Analytical Testing",
  "layout":["challenges","overview","tests","standards","faq","custom","related","cta"],
  "ch_h2":"What food &amp; beverage makers test for","ch_eyebrow":"Core concerns",
  "challenges":[(_I["bug"],"Microbial safety","Coliform, E. coli and spoilage organisms across product and environment."),
                (_I["leaf"],"Residues &amp; toxins","Pesticide residues, mycotoxins and heavy metals that carry regulatory limits."),
                (_I["wave"],"Process water","Water quality for ingredient, cleaning and process use.")],
  "overview_h2":"Safety and quality your brand depends on",
  "lead":"Food and beverage producers come to IAS for the contaminant, microbiological and water testing that keeps product safe, compliant and consistent — without a complicated onboarding.",
  "paragraphs":["We screen for pesticide residues, mycotoxins and heavy metals, run the microbiology that flags contamination, and verify the water that touches your product.",
                "Single-batch questions and recurring quality programs are equally welcome, and we supply the sampling materials you need."],
  "solutions":["Microbiology — coliform, E. coli &amp; spoilage organisms",
               "Pesticide residue screening by GC-MS",
               "Heavy metals in product by ICP-MS",
               "Mycotoxin analysis",
               "Process- and ingredient-water quality"],
  "media":("QA","Microbiology · residues · metals"),
  "t_h2":"Food &amp; beverage tests &amp; pricing","t_p":"",
  "tests":[("Total coliform &amp; E. coli","Presence / absence","$65"),
           ("Heavy metals in product","ICP-MS","$190"),
           ("Pesticide residue screen","GC-MS","$185"),
           ("Mycotoxin analysis","LC / method-dependent","Call to quote"),
           ("Process-water quality panel","Multi-parameter","$140")],
  "std_h2":"Testing aligned to food safety","std_eyebrow":"Frameworks",
  "std_p":"Our contaminant, microbiological and water testing supports the safety and quality programs food and beverage operations run on.",
  "standards":["Heavy Metals (ICP-MS)","Pesticide Residues","Mycotoxins","Microbiology","Process Water","HACCP-supporting data"],
  "faqs":[("Do you test for pesticide residues in food?","Yes. GC-MS screening covers a broad range of pesticide residues in food and beverage products."),
          ("Can you check heavy metals like lead and arsenic in product?","Yes — ICP-MS quantifies lead, arsenic, cadmium, mercury and a full heavy-metal panel at trace levels."),
          ("Do you run microbiology for coliform and E. coli?","We do, along with spoilage organisms and environmental monitoring to support your sanitation program."),
          ("Can you test our process and ingredient water?","Yes. We run full water-quality panels on process, ingredient and cleaning water.")],
  "custom_h2":"New product, new question",
  "custom_line":"A novel ingredient, a shelf-life question, an unexpected off-flavor or contaminant — food and beverage problems are often one-of-a-kind, and we will scope custom testing to match. No account needed to start.",
  "related":["water-testing.html","veterinary-toxicology-testing.html","chemical-testing.html"],
  "cta_title":"Protect your product and your brand","cta_text":"Talk to a chemist about the safety, contaminant or water testing your product needs."},

 # ---------------------------------------------------------------- 9. Water & Municipal Utilities
 {"slug":"water-testing.html","card_name":"Water &amp; Municipal Utilities","accent":"ocean",
  "name_short":"water utilities","eyebrow":"Water &amp; Wastewater Testing",
  "h1":"Water testing — drinking, process &amp; wastewater",
  "hero_p":"Full inorganic, organic and microbiological panels for treated, process and waste water — the complete analytical picture utilities and facilities need to stay compliant.",
  "title":"Water Testing Lab — Drinking Water, Wastewater, Metals &amp; Coliform | IAS",
  "meta_desc":"Water testing from IAS: inorganic, organic and microbiological panels for drinking, process and waste water — heavy metals, coliform and E. coli, VOCs and full multi-analyte scans for utilities and facilities.",
  "service_type":"Water &amp; Wastewater Testing",
  "layout":["overview","tests","matrices","standards","faq","custom","related","cta"],
  "overview_h2":"One lab for the whole water picture",
  "lead":"Municipal utilities, facilities and property managers use IAS for the inorganic, organic and microbiological testing that keeps treated, process and waste water inside its limits.",
  "paragraphs":["We run heavy metals, the microbiology surveyors look for, volatile and semi-volatile organics, and the broad multi-analyte scans that catch the unexpected.",
                "Routine compliance programs and one-off investigations are both straightforward, with sampling materials supplied."],
  "solutions":["Heavy metals &amp; inorganics by ICP-MS / ICP-OES",
               "Coliform, E. coli &amp; microbiological panels",
               "Volatile &amp; semi-volatile organics by GC-MS",
               "Full multi-analyte drinking-water scans",
               "Process &amp; waste water characterization"],
  "media":("H2O","Inorganic · organic · microbial"),
  "t_h2":"Water tests &amp; pricing","t_p":"",
  "tests":[("Total coliform &amp; E. coli","Presence / absence","$65"),
           ("Heavy metals panel","ICP-MS","$190"),
           ("VOCs scan","GC-MS (59 compounds)","$150"),
           ("Drinking-water multi-analyte scan","Inorganic + organic + microbial","Call to quote"),
           ("Wastewater characterization","Method-dependent","Call to quote")],
  "m_h2":"Waters we test","m_eyebrow":"Sample types",
  "matrices":[(_I["wave"],"Drinking &amp; treated water","Compliance panels for potable and treated supplies."),
              (_I["factory"],"Process water","Cooling, boiler and process streams for industrial users."),
              (_I["drop"],"Waste water","Characterization for discharge, treatment and permitting.")],
  "std_h2":"Compliance-grade water data","std_eyebrow":"Methods",
  "std_p":"Our inorganic, organic and microbiological water testing follows recognized analytical methods suited to compliance reporting.",
  "standards":["EPA-style Metals","Coliform / E. coli","VOCs (GC-MS)","SVOCs","Inorganic Anions","Multi-analyte Scans"],
  "faqs":[("Do you test drinking water for coliform and E. coli?","Yes. We run presence/absence and quantitative microbiological panels for coliform, E. coli and related organisms."),
          ("Can you run a full heavy-metals panel on water?","Yes — ICP-MS and ICP-OES cover trace heavy metals and a broad inorganic panel in any water matrix."),
          ("Do you handle wastewater characterization?","We do, including the organic, inorganic and physical parameters needed for discharge and permitting questions."),
          ("Can you supply the sample bottles?","Yes — bottles and sampling instructions are provided at no extra charge.")],
  "custom_h2":"An unusual water question",
  "custom_line":"A contaminant nobody can identify, a one-off source investigation, a parameter outside the standard panels — we build custom water and wastewater testing around the question. Just call.",
  "related":["environmental-testing.html","dialysis-water-testing.html","facilities-testing.html"],
  "cta_title":"Keep your water inside its limits","cta_text":"Set up compliance water testing or send a one-off sample for investigation — materials included."},

 # ---------------------------------------------------------------- 10. Environmental & Remediation
 {"slug":"environmental-testing.html","card_name":"Environmental &amp; Remediation","accent":"forest",
  "name_short":"environmental work","eyebrow":"Environmental &amp; Remediation Testing",
  "h1":"Environmental testing — soil, water, PFAS &amp; remediation",
  "hero_p":"Soil and water for metals, VOCs, SVOCs, pesticides, PCBs and PFAS — with litigation-quality documentation and chain-of-custody when the result has to hold up.",
  "title":"Environmental Testing Lab — PFAS, VOCs, Metals, Soil &amp; Water | IAS",
  "meta_desc":"Environmental testing from IAS: soil and water analysis for metals, VOCs, SVOCs, pesticides, PCBs and PFAS, with chain-of-custody and litigation-quality documentation for remediation and site work.",
  "service_type":"Environmental Analytical Testing",
  "layout":["overview","tests","standards","instruments","faq","custom","related","cta"],
  "overview_h2":"Defensible data for site &amp; remediation work",
  "lead":"Consultants, remediation contractors and property owners use IAS for the soil and water analysis that drives site decisions — including PFAS — backed by documentation that stands up to scrutiny.",
  "paragraphs":["We quantify metals, volatile and semi-volatile organics, pesticides, PCBs and PFAS across soil and water, and document the chain of custody for litigation-quality results.",
                "Spot investigations and multi-round remediation monitoring are both routine, and a chemist is available to help you scope the program."],
  "solutions":["PFAS analysis in water &amp; soil",
               "Priority-pollutant metals by ICP-MS",
               "VOCs &amp; SVOCs by GC-MS",
               "Pesticides &amp; PCBs",
               "Chain-of-custody &amp; litigation-quality documentation"],
  "media":("PFAS","plus metals, VOCs, SVOCs &amp; PCBs"),
  "media_left":True,
  "t_h2":"Environmental tests &amp; pricing","t_p":"",
  "tests":[("PFAS — 18 compounds","LC-MS/MS","$415"),
           ("Priority-pollutant metals","ICP-MS","$190"),
           ("VOCs scan","GC-MS","$150"),
           ("SVOCs scan","GC-MS","$185"),
           ("Pesticides / PCBs","GC-MS","Call to quote")],
  "std_h2":"Built to stand up to scrutiny","std_eyebrow":"How we document",
  "std_p":"Chain-of-custody, recognized analytical methods and litigation-quality reporting come standard when the result may be challenged.",
  "standards":["PFAS (LC-MS/MS)","EPA-style Metals","VOCs / SVOCs","Pesticides &amp; PCBs","Chain-of-Custody","Litigation-Quality Reports"],
  "i_h2":"Instruments for environmental matrices",
  "instruments":[("ICP-MS","trace and priority-pollutant metals in soil, water and leachate"),
                 ("GC-MS","VOCs, SVOCs, pesticides and PCBs across environmental samples"),
                 ("ICP-OES","higher-concentration metals in wastewater and industrial discharge")],
  "faqs":[("Do you test for PFAS in soil and water?","Yes. We analyze PFAS compounds in water and soil matrices to support site investigation, remediation and compliance work."),
          ("Can you provide litigation-quality documentation?","Yes — chain-of-custody and documentation suited to litigation and regulatory challenge are standard for environmental work."),
          ("Do you run VOCs, SVOCs, pesticides and PCBs?","We do, by GC-MS, across soil and water for site characterization and remediation monitoring."),
          ("Can you support multi-round remediation monitoring?","Yes. Recurring sampling rounds with consistent methods and reporting are routine.")],
  "custom_h2":"Complex sites, complex matrices",
  "custom_line":"An unusual matrix, an emerging contaminant, a litigation question that needs a tailored analytical plan — environmental work is where flexible, custom testing matters most, and it is exactly what we do.",
  "related":["water-testing.html","industrial-process-testing.html","facilities-testing.html"],
  "cta_title":"Get data your site decisions can rest on","cta_text":"Talk to a chemist about PFAS, metals, organics or a full remediation monitoring program."},

 # ---------------------------------------------------------------- 11. Research & Development
 {"slug":"rd-analytical-testing.html","card_name":"Research &amp; Development","accent":"indigo",
  "name_short":"R&amp;D teams","eyebrow":"R&amp;D Analytical Support",
  "h1":"R&amp;D analytical testing &amp; custom method development",
  "hero_p":"Flexible analytical support for any matrix — custom methods, fast iteration, and no standing account for pilot-phase work. Bring us the question no catalog answers.",
  "title":"R&amp;D Analytical Testing — Custom Methods, Any Matrix, No Account | IAS",
  "meta_desc":"R&amp;D analytical testing from IAS: flexible custom method development across any matrix, fast iteration and expert consultation — no standing account required for pilot-phase and exploratory work.",
  "service_type":"R&amp;D Analytical Support",
  "layout":["overview","challenges","instruments","process","faq","custom","related","cta"],
  "overview_h2":"A lab built for the unscripted question",
  "lead":"Research and development rarely fits a catalog. IAS gives R&amp;D teams flexible analytical support across any matrix — with the instrumentation to answer hard questions and the freedom to start with a single sample.",
  "paragraphs":["We develop methods around your problem, run them fast enough to keep your iteration loop tight, and put an experienced chemist on the phone to help interpret what comes back.",
                "Pilot-phase work needs no standing account, and as a program matures we make recurring submission simple."],
  "solutions":["Custom method development for novel problems",
               "Analytical support across any matrix",
               "Trace metals, organics, structure &amp; surface analysis",
               "Competitive &amp; comparative product analysis",
               "No standing account required for pilot work"],
  "media":("R&amp;D","Any matrix · custom methods"),
  "ch_h2":"How R&amp;D teams use us","ch_eyebrow":"Typical engagements",
  "challenges":[(_I["search"],"Exploratory analysis","Figure out what is in a sample, or whether a hypothesis holds, before you scale."),
                (_I["flask"],"Method development","Build and document a method for something no standard test covers."),
                (_I["clip"],"Comparative work","Benchmark a formulation or component against a competitor or a target.")],
  "i_h2":"The full instrument base, at your disposal",
  "instruments":[("ICP-MS","parts-per-trillion elemental analysis across any developmental matrix"),
                 ("NMR","structure elucidation and identity for novel compounds and intermediates"),
                 ("SEM/EDS","surface, particle and elemental imaging for materials development")],
  "p_h2":"How an R&amp;D engagement works","p_p":"Start with one sample and a conversation — no account, no commitment.",
  "faqs":[("Can you develop a method for something with no standard test?","Yes — custom method development is central to our R&amp;D support. We build, document and run methods around novel problems and matrices."),
          ("Do I need an account for exploratory work?","No. Pilot-phase and exploratory work can start with a single sample and no standing account."),
          ("Can you analyze unusual or developmental matrices?","Yes. Our instrument base spans trace metals, organics, molecular structure and surface analysis, so most matrices are in scope."),
          ("Can you do competitive or comparative product analysis?","We do — reverse-engineering and benchmarking a product or formulation against a target or competitor.")],
  "custom_h2":"Custom is the whole point",
  "custom_line":"R&amp;D is where flexible, made-to-fit analytical work lives. Whatever the matrix and whatever the question, we will design the method, run it fast, and iterate with you — starting from a single sample.",
  "related":["chemical-testing.html","pharmaceutical-testing.html","clinical-research-testing.html"],
  "cta_title":"Bring us the question no catalog answers","cta_text":"Get a chemist on the phone to scope a custom method or an exploratory analysis — no account needed."},

 # ---------------------------------------------------------------- 12. Property & Facilities
 {"slug":"facilities-testing.html","card_name":"Property &amp; Facilities","accent":"crimson",
  "name_short":"facilities","eyebrow":"Property &amp; Facilities Testing",
  "h1":"Property &amp; facilities testing — air, water &amp; materials",
  "hero_p":"Indoor air, water and material testing — asbestos, lead in paint, mold and VOCs — with the quick turnaround property managers and facilities teams need to act.",
  "title":"Facilities Testing Lab — Asbestos, Lead Paint, Mold &amp; Indoor Air (VOCs) | IAS",
  "meta_desc":"Property and facilities testing from IAS: indoor air quality and VOCs, asbestos identification, lead in paint, mold and material testing with quick turnaround for property managers and facilities teams.",
  "service_type":"Property &amp; Facilities Testing",
  "layout":["challenges","overview","tests","matrices","faq","custom","related","cta"],
  "ch_h2":"What facilities teams need answered","ch_eyebrow":"Common requests",
  "challenges":[(_I["build"],"Building materials","Asbestos identification and lead-in-paint testing for renovation and due diligence."),
                (_I["bug"],"Air &amp; mold","Indoor air quality, VOCs and mold assessment when occupants raise concerns."),
                (_I["wave"],"Building water","Potable and system water testing for safety and compliance.")],
  "overview_h2":"Answers a building can act on, fast",
  "lead":"Property managers, facilities teams and building owners use IAS for the air, water and material testing that resolves a complaint, clears a renovation, or supports due diligence — with turnaround that respects a deadline.",
  "paragraphs":["We identify asbestos and lead in building materials, assess indoor air and VOCs, screen for mold, and test building water — then report it clearly enough to act on.",
                "One-off requests are welcome and materials are supplied, so a single concern does not require setting up an account."],
  "solutions":["Asbestos identification in building materials",
               "Lead in paint, dust &amp; water",
               "Indoor air quality &amp; VOC screening",
               "Mold assessment",
               "Potable &amp; building-water testing"],
  "media":("IAQ","Asbestos · lead · mold · VOCs"),
  "t_h2":"Facilities tests &amp; pricing","t_p":"",
  "tests":[("Asbestos identification","PLM / microscopy","$45"),
           ("Lead in paint","ICP / method-dependent","$55"),
           ("Indoor air VOCs","GC-MS","$150"),
           ("Mold assessment","Microscopy / culture","Call to quote"),
           ("Building water panel","Multi-parameter","$140")],
  "m_h2":"What we test in a building","m_eyebrow":"Sample types",
  "matrices":[(_I["build"],"Building materials","Suspect asbestos materials, paint chips and surface dust."),
              (_I["drop"],"Air &amp; water","Indoor air samples, VOC canisters and potable water."),
              (_I["bug"],"Mold &amp; surfaces","Tape lifts, swabs and air samples for mold assessment.")],
  "faqs":[("Do you identify asbestos in building materials?","Yes. We identify asbestos in suspect building materials by microscopy with quick turnaround for renovation and due-diligence needs."),
          ("Can you test for lead in paint and dust?","Yes — lead testing in paint, dust and water to support renovation, abatement and compliance."),
          ("Do you assess indoor air quality and VOCs?","We do. GC-MS-based VOC screening and indoor air quality assessment help resolve occupant complaints."),
          ("Can I send a single sample without an account?","Yes. One-off facilities samples are welcome and sampling materials are supplied at no extra charge.")],
  "custom_h2":"An unusual building problem",
  "custom_line":"An odor no one can place, an unexplained residue, a material that needs identifying before demolition — facilities problems are often unique, and we will build the right testing around yours. Just call.",
  "related":["environmental-testing.html","water-testing.html","industrial-process-testing.html"],
  "cta_title":"Resolve the concern and move on","cta_text":"Talk to a chemist about asbestos, lead, mold, air or water testing — quick turnaround, materials included."},
]

for _d in INDUSTRY_PAGES:
    build_industry(_d)

# ============================================================ SITEMAP
STATIC_PAGES = ["index.html","about.html","services.html","qa-programs.html","custom-testing.html",
                "instrumentation.html","industries.html","pricing.html","get-started.html","contact.html"]
def build_sitemap():
    urls = STATIC_PAGES + [d["slug"] for d in INDUSTRY_PAGES]
    items = []
    for u in urls:
        loc = BASE_URL if u == "index.html" else BASE_URL + u
        pri = "1.0" if u == "index.html" else ("0.8" if u in STATIC_PAGES else "0.7")
        items.append("  <url><loc>%s</loc><priority>%s</priority></url>" % (loc, pri))
    xml = ('<?xml version="1.0" encoding="UTF-8"?>\n'
           '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
           + "\n".join(items) + "\n</urlset>\n")
    with open(os.path.join(OUT, "sitemap.xml"), "w") as f:
        f.write(xml)
    print("wrote sitemap.xml", len(urls), "urls")
build_sitemap()

print("\\nAll pages generated.")

