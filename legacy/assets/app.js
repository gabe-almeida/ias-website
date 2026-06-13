/* ============================== IAS shared interactions ============================== */
(function(){
  // sticky nav shadow
  var nav=document.getElementById('nav');
  if(nav){addEventListener('scroll',function(){nav.classList.toggle('scrolled',scrollY>10)});}
  // mobile menu
  var burger=document.getElementById('burger'),links=document.getElementById('navLinks');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open')});
    links.addEventListener('click',function(e){if(e.target.closest('a')){links.classList.remove('open');
      var it=links.querySelector('.nav-item.open');if(it)it.classList.remove('open');}});
  }
  // industries mega dropdown: accordion on mobile, fallback toggle on touch
  document.querySelectorAll('.mega-toggle').forEach(function(btn){
    btn.addEventListener('click',function(e){
      e.preventDefault();
      var item=btn.closest('.nav-item');if(!item)return;
      var open=item.classList.toggle('open');
      btn.setAttribute('aria-expanded',open?'true':'false');
    });
  });
  // reveal on scroll
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target)}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
  // demo form submit
  document.querySelectorAll('form[data-demo]').forEach(function(f){
    f.addEventListener('submit',function(e){e.preventDefault();var s=f.querySelector('.sent');if(s)s.style.display='flex';});
  });
})();

/* ============================== Pricing catalog (pages that include #priceBody) ============================== */
window.IAS_TESTS=[
 ['Heavy Metals Panel (Multi-Element)','$190.00','water','Water · Metals'],
 ['Alkalinity','$30.00','water','Water · Metals'],['Aluminum','$45.00','water','Water · Metals'],
 ['Ammonia','$35.00','water','Water · Metals'],['Antimony','$45.00','water','Water · Metals'],
 ['Arsenic','$45.00','water','Water · Metals'],['Arsenic Speciation','$75.00','water','Water · Metals'],
 ['Beryllium','$45.00','water','Water · Metals'],['Cadmium','$45.00','water','Water · Metals'],
 ['Cesium','$100.00','water','Water · Metals'],['Chloride','$35.00','water','Water · Metals'],
 ['Chlorine (Free/Total)','$35.00','water','Water · Metals'],['Chromium (Total)','$50.00','water','Water · Metals'],
 ['Chromium-6 (Hexavalent)','$50.00','water','Water · Metals'],['Conductivity','$35.00','water','Water · Metals'],
 ['Copper','$45.00','water','Water · Metals'],['Cyanide','$100.00','water','Water · Metals'],
 ['Fluoride','$50.00','water','Water · Metals'],['Hydrogen Sulfide','$45.00','water','Water · Metals'],
 ['Iron','$45.00','water','Water · Metals'],['Langelier (Corrosion) Index','$100.00','water','Water · Metals'],
 ['Lead','$45.00','water','Water · Metals'],['Lead & Copper — First Draw and Flush','$100.00','water','Water · Metals'],
 ['Magnesium','$45.00','water','Water · Metals'],['Manganese','$45.00','water','Water · Metals'],
 ['Molybdenum','$45.00','water','Water · Metals'],['Nickel','$45.00','water','Water · Metals'],
 ['O-Phosphate','$50.00','water','Water · Metals'],['Potassium','$35.00','water','Water · Metals'],
 ['Selenium','$50.00','water','Water · Metals'],['Silica','$45.00','water','Water · Metals'],
 ['Silver','$45.00','water','Water · Metals'],['Sodium','$45.00','water','Water · Metals'],
 ['T-Phosphorus','$50.00','water','Water · Metals'],['Thallium','$45.00','water','Water · Metals'],
 ['Tin','$45.00','water','Water · Metals'],['Uranium','$45.00','water','Water · Metals'],
 ['Water Hardness','$65.00','water','Water · Metals'],['Zinc','$35.00','water','Water · Metals'],
 ['Biological Oxygen Demand (BOD)','$150.00','water','Water · Organics'],['Herbicides','$200.00','water','Water · Organics'],
 ['Microplastics and Nanoplastics','$250.00','water','Water · Organics'],['Oil & Grease','$80.00','water','Water · Organics'],
 ['PCBs','$175.00','water','Water · Organics'],['Perchlorate','$150.00','water','Water · Organics'],
 ['Pesticides','$200.00','water','Water · Organics'],['PFAS — 18 Compounds','$415.00','water','Water · Organics'],
 ['Phenols','$70.00','water','Water · Organics'],['Semi-Volatile Organic Compounds (SVOCs)','$500.00','water','Water · Organics'],
 ['Total Petroleum Hydrocarbons (TPH)','$95.00','water','Water · Organics'],['Vinyl Chloride Scan (59 VOCs Included)','$150.00','water','Water · Organics'],
 ['Volatile Organic Compounds (VOCs)','$150.00','water','Water · Organics'],
 ['Nitrate','$35.00','water','Water · Physical'],['Nitrite','$35.00','water','Water · Physical'],
 ['Odor','$30.00','water','Water · Physical'],['pH','$30.00','water','Water · Physical'],
 ['Tannin','$35.00','water','Water · Physical'],['Turbidity','$25.00','water','Water · Physical'],
 ['Total Coliform & E. coli (Presence/Absence)','$65.00','water','Water · Microbiology'],['E. coli Enumeration','$45.00','water','Water · Microbiology'],
 ['Fecal E. coli Count','$45.00','water','Water · Microbiology'],['Total Coliform Count','$45.00','water','Water · Microbiology'],
 ['Standard Plate Count (Total Bacteria)','$50.00','water','Water · Microbiology'],['Mold & Fungi','$95.00','water','Water · Microbiology'],
 ['Fungi Count','$50.00','water','Water · Microbiology'],['Endotoxin Scan','$150.00','water','Water · Microbiology'],
 ['Asbestos','$125.00','water','Water · Instrumental'],['FTIR Analysis','$265.00','water','Water · Instrumental'],
 ['SEM / EDS Analysis','$250.00','water','Water · Instrumental'],['Water Microanalysis','$250.00','water','Water · Instrumental'],
 ['Radon in Water','$40.00','water','Water · Instrumental'],
 ['FHA Water Test','$80.00','package','Package · Scan'],['Legacy Standard Scan','$165.00','package','Package · Scan'],
 ['Legacy Comprehensive Scan','$210.00','package','Package · Scan'],['Legacy Health Scan','$315.00','package','Package · Scan'],
 ['Health Scan Plus','$344.95','package','Package · Scan'],['Environmental Scan','$695.00','package','Package · Scan'],
 ['Advanced Environmental Health Scan','$1,200.00','package','Package · Scan'],['Massachusetts Title V Scan (without VOCs)','$55.00','package','Package · Scan'],
 ['Massachusetts Title V Scan (with VOCs)','$175.00','package','Package · Scan'],['Swimming Pool Scan — Initial','$150.00','package','Package · Scan'],
 ['Swimming Pool Scan — Follow-Up','$100.00','package','Package · Scan'],['Pond Scan','$90.00','package','Package · Scan'],
 ['Heavy Metals — 13 Priority Pollutants in Soil','$300.00','solid','Solid · Soil'],['Herbicides in Soil','$200.00','solid','Solid · Soil'],
 ['Lead in Paint / Solids','$109.00–$149.00','solid','Solid · Materials'],['PCBs in Soil','$200.00','solid','Solid · Soil'],
 ['Pesticides in Soil','$200.00','solid','Solid · Soil'],['pH of Soil','$70.00','solid','Solid · Soil'],
 ['Volatile Organic Compounds (VOCs) in Soil','$200.00','solid','Solid · Soil'],['FTIR Analysis (solids / materials ID)','$265.00','solid','Solid · Materials'],
 ['SEM / EDS Analysis (surface & elemental)','$250.00','solid','Solid · Materials'],
 ['Endotoxin Scan (dialysate, process water, biologics)','$150.00','bio','Biological'],['Heavy Metals Panel — blood, serum, tissue (research)','Call','bio','Biological'],
 ['PFAS — 18 Compounds — biological matrices','Call','bio','Biological'],['Mycoplasma Detection','Call','bio','Biological'],
 ['Dialysis Water Quality Testing — full panel','Call','bio','Biological'],['Veterinary Blood Analysis (metals, toxicology)','Call','bio','Biological'],
 ['Human Blood / Tissue — research & forensic','Call','bio','Biological'],['Custom biological matrix analysis','Call','bio','Biological']
];
(function(){
  var body=document.getElementById('priceBody');
  if(!body)return;
  var TESTS=window.IAS_TESTS,noRes=document.getElementById('noRes'),
      search=document.getElementById('priceSearch'),filters=document.getElementById('filters'),
      scroller=document.querySelector('.table-scroll');
  var curCat='all',curQ='';
  function render(resetScroll){
    var q=curQ.trim().toLowerCase();
    var rows=TESTS.filter(function(t){return (curCat==='all'||t[2]===curCat)&&(!q||t[0].toLowerCase().indexOf(q)>-1||t[3].toLowerCase().indexOf(q)>-1)});
    body.innerHTML=rows.map(function(t){
      var call=t[1]==='Call';
      return '<tr><td style="font-weight:600;color:var(--navy)">'+t[0]+'</td><td style="color:var(--slate);font-size:.85rem">'+t[3]+'</td><td class="price '+(call?'call':'')+'">'+(call?'Call for quote':t[1])+'</td></tr>';
    }).join('');
    if(noRes)noRes.style.display=rows.length?'none':'block';
    // Jump the filtered list back to the top so you always start at the first result
    if(resetScroll&&scroller)scroller.scrollTop=0;
  }
  if(search)search.addEventListener('input',function(e){curQ=e.target.value;render(true)});
  if(filters)filters.addEventListener('click',function(e){
    var b=e.target.closest('.chip');if(!b)return;
    filters.querySelectorAll('.chip').forEach(function(c){c.classList.remove('active')});
    b.classList.add('active');curCat=b.getAttribute('data-cat');render(true);
  });
  render();
})();
