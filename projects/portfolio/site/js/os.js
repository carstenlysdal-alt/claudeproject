'use strict';

/* ================================================
   CARSTEN LYSDAL — OS v2
   Scene tracking · counters · impact · AI chain ·
   case flow · radar · career unlock · reveal
   ================================================ */

/* ─── DATA ──────────────────────────────────────── */

const IMPACT = [
  {
    title: 'Transformation af 150 medarbejdere',
    desc: 'Fra fragmenteret, manuel drift til agilt, datadrevet og AI-understøttet setup. OKR/KPI-struktur, nye prioriteringsmodeller og mellemlederudvikling med tydeligt ejerskab per funktion.',
    tag: 'Forandringsledelse'
  },
  {
    title: 'Skalering af korte formater',
    desc: 'Centraliseret, AI-assisteret produktion med standardiserede workflows og redaktionel godkendelse som quality gate. Same team — fra manuel produktion til 500–600 enheder om ugen.',
    tag: 'Workflow'
  },
  {
    title: 'Data til redaktionelle beslutninger',
    desc: 'Frameworks for relevanskriterier og content performance. Brugeradfærdsdata oversat til redaktionelt sprog og koblet til daglige prioriteringer. Bidrog til fordobling af trafik.',
    tag: 'Data'
  },
  {
    title: 'Chatty: fra input til udkast',
    desc: 'Internt AI-værktøj integreret i CMS og mailflows. Fra individuel brug til fælles praksis med promptdisciplin, feedbacksløjfer og kvalitetssikring. Tid til første udkast: få minutter.',
    tag: 'AI'
  }
];

const CASES = [
  {
    num: '01',
    title: 'Chatty: AI fra prototype til drift',
    steps: [
      { label: 'Problem', text: 'Redaktionen eksperimenterede med AI, men uden fælles metode. Individuel og ustruktureret brug gav svingende kvalitet og begrænset skalerbarhed.' },
      { label: 'Indsigt', text: 'Barrieren var ikke teknologien. Den var ejerskab, tydelige brugsscenarier og organisatorisk tillid.' },
      { label: 'Løsning', text: 'Chatty: internt AI-værktøj til hele den redaktionelle værdikæde — idé, research, produktion, transskribering og kvalitetssikring.' },
      { label: 'Implementering', text: 'Systematisk introduktion, målrettet træning, fælles standarder, feedbacksløjfer og integration i CMS og mailflows.' },
      { label: 'Effekt', text: 'Tid fra input til udkast: få minutter. Varig ændring i arbejdsmønstre. AI fra sideprojekt til operationelt lag.' }
    ]
  },
  {
    num: '02',
    title: 'Redaktionel transformation',
    steps: [
      { label: 'Problem', text: '150 medarbejdere i fragmenteret drift. Manuelle processer, siloer, ingen systematisk brug af data i beslutninger.' },
      { label: 'Indsigt', text: 'Forandring kræver tydelig retning og ejerskab på alle niveauer. OKR virker kun, når strategi er oversat til daglige prioriteringer.' },
      { label: 'Løsning', text: 'Transformation til agilt, datadrevet og AI-understøttet setup. Ny OKR/KPI-struktur og prioriteringsmodeller.' },
      { label: 'Implementering', text: 'Gradvis implementering med fokus på at lede ledere. Mellemlederudvikling og feedbackkultur.' },
      { label: 'Effekt', text: 'Øget output med færre medarbejdere. Forbedret produktivitet. Tydeligere organisatorisk retning.' }
    ]
  },
  {
    num: '03',
    title: 'Data til redaktionelle beslutninger',
    steps: [
      { label: 'Problem', text: 'Brugerdata eksisterede, men blev ikke brugt operationelt. Beslutninger baseret på tradition og mavefornemmelse.' },
      { label: 'Indsigt', text: 'Data skal oversættes til redaktionelt sprog og kobles til konkrete prioriteringer for at ændre adfærd.' },
      { label: 'Løsning', text: 'Frameworks for relevanskriterier og content performance. Systematisk brug af brugeradfærdsdata.' },
      { label: 'Implementering', text: 'Nøglepersoner involveret i designet. Gradvis implementering med coaching i dataforståelse.' },
      { label: 'Effekt', text: 'Bidrag til fordobling af trafik. Bedre match mellem indhold og brugerbehov. Data som arbejdsredskab.' }
    ]
  },
  {
    num: '04',
    title: 'Skalering af korte formater',
    steps: [
      { label: 'Problem', text: 'Ressourcekrævende produktion af korte nyhedsformater. Inkonsistent kvalitet og begrænset kapacitet.' },
      { label: 'Indsigt', text: 'AI-workflows kan skalere produktion markant, men kræver designede processer og klare kvalitetsstandarder.' },
      { label: 'Løsning', text: 'Centraliseret, automatiseret produktionsmodel med AI-integration og standardiserede templates.' },
      { label: 'Implementering', text: 'Iterativ opbygning af kapacitet. Redaktionel dømmekraft som quality gate i det automatiserede flow.' },
      { label: 'Effekt', text: '500–600 enheder om ugen. Ensartet kvalitet. Frigjorte ressourcer til prioriteret journalistik.' }
    ]
  },
  {
    num: '05',
    title: 'Y Business: AI-medieprodukt',
    steps: [
      { label: 'Problem', text: 'Nyt AI-drevet erhvervsmedie skulle konceptualiseres fra bunden. Redaktion, tech, kommerciel model og brugerbehov skulle tænkes sammen.' },
      { label: 'Indsigt', text: 'Et medieprodukt i 2026 kræver AI i hele værdikæden fra dag ét — ikke som feature, men som produktionsparadigme.' },
      { label: 'Løsning', text: 'Discovery-proces: positionering, redaktionelt koncept, AI-orkestrering, ratingmodeller og kommerciel model.' },
      { label: 'Implementering', text: 'Tværfunktionel PRD-proces med CEO, Tech Lead og Commercial Lead. Iterativ konceptudvikling og stakeholderafstemning.' },
      { label: 'Effekt', text: 'Komplet produktspecifikation klar til implementering. Klar markedspositionering. Roadmap med prioritering.' }
    ]
  }
];

const RADAR_AXES = [
  {
    name: 'AI-adoption',
    score: 9.2,
    title: 'Fra MVP til daglig drift',
    proofs: [
      { label: 'Værktøj', text: 'Chatty — internt AI-værktøj integreret i CMS og mailflows.' },
      { label: 'Praksis', text: 'Promptdisciplin, use case-design, onboarding og kvalitetssikring som fælles standard.' },
      { label: 'Skala', text: 'AI brugt af hele organisationen — ikke enkelte entusiaster.' }
    ]
  },
  {
    name: 'Produktstrategi',
    score: 8.4,
    title: 'Fra idé til specifikation',
    proofs: [
      { label: 'Produkt', text: 'Y Business: AI-drevet erhvervsmedie fra koncept til PRD.' },
      { label: 'Metode', text: 'Discovery, roadmap, PRD, prototyping og tværfunktionel eksekvering.' },
      { label: 'Hands-on', text: 'VS Code, Claude, kodebaserede prototyper og rapid discovery.' }
    ]
  },
  {
    name: 'Redaktionel\nledelse',
    score: 9.5,
    title: '13 år i regional medievirksomhed',
    proofs: [
      { label: 'Rolle', text: 'Journalistisk chefredaktør med ansvar for retning, kvalitet og udvikling.' },
      { label: 'Drift', text: 'Nyhedsdrift, prioritering og publicistisk accountability på tværs af brands.' },
      { label: 'Effekt', text: 'Fordobling af trafik. Stærkere feedbackkultur og metodebevidsthed.' }
    ]
  },
  {
    name: 'Data &\nperformance',
    score: 8.7,
    title: 'Data som beslutningsgrundlag',
    proofs: [
      { label: 'Framework', text: 'Relevanskriterier og content performance som fast redaktionelt filter.' },
      { label: 'Praksis', text: 'Dashboards designet til morgenmøder — ikke til ledelsesrapporter.' },
      { label: 'Effekt', text: 'Bidrag til fordobling af trafik. Bedre match mellem indhold og behov.' }
    ]
  },
  {
    name: 'Workflow-\ndesign',
    score: 9.0,
    title: '500–600 enheder om ugen',
    proofs: [
      { label: 'Skala', text: 'Centraliseret, AI-assisteret produktion med redaktionel godkendelse som gate.' },
      { label: 'Integration', text: 'Koblet direkte til CMS-automatisering.' },
      { label: 'Effekt', text: 'Same team. Markant øget volumen. Frigjorte ressourcer til prioriteret journalistik.' }
    ]
  },
  {
    name: 'Forandrings-\nledelse',
    score: 8.9,
    title: '150 medarbejdere i transformation',
    proofs: [
      { label: 'Struktur', text: 'OKR/KPI med systematisk opfølgning og tydeligt ejerskab.' },
      { label: 'Metode', text: 'Lede ledere — ikke kun medarbejdere. Mellemlederudvikling og feedbackkultur.' },
      { label: 'Effekt', text: 'Øget output trods reduceret medarbejderstab. Forankret, ikke pilot.' }
    ]
  }
];

/* ─── SCENE TRACKING ────────────────────────────── */

const scenes = document.querySelectorAll('section[id]');
const railLinks = document.querySelectorAll('.rail-link');
const bottomLinks = document.querySelectorAll('.bottom-nav-link');
const railProgress = document.getElementById('railProgress');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    setActiveScene(id);
  });
}, { rootMargin: '-45% 0px -45% 0px' });

scenes.forEach(s => navObs.observe(s));

function setActiveScene(id) {
  railLinks.forEach(a => a.classList.toggle('active', a.dataset.scene === id));
  bottomLinks.forEach(a => a.classList.toggle('active', a.dataset.scene === id));
}

/* rail progress */
let rafPending = false;
function updateProgress() {
  if (rafPending) return;
  rafPending = true;
  requestAnimationFrame(() => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    if (railProgress) railProgress.style.transform = `scaleY(${pct})`;
    rafPending = false;
  });
}
window.addEventListener('scroll', updateProgress, { passive: true });

/* ─── REVEAL ────────────────────────────────────── */

const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

/* ─── COUNTERS ──────────────────────────────────── */

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  if (isNaN(target)) return;
  const dur = 1400;
  const start = performance.now();
  const cls = el.getAttribute('class') || '';
  const isPlus = cls.includes('plus');
  const isUnit = cls.includes('unit');
  function tick(now) {
    const t = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(target * eased);
    let txt = String(val);
    if (isPlus) txt += '+';
    if (isUnit) txt += '×';
    el.textContent = txt;
    if (t < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCount(e.target); countObs.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -80px 0px' });
document.querySelectorAll('[data-count]').forEach(el => countObs.observe(el));

/* ─── IMPACT EXPAND ─────────────────────────────── */

const impactCells = document.querySelectorAll('.impact-cell');
const impactExpand = document.getElementById('impactExpand');
const impactTitle = document.getElementById('impactTitle');
const impactDesc = document.getElementById('impactDesc');
const impactTag = document.getElementById('impactTag');

impactCells.forEach(cell => {
  cell.addEventListener('click', () => {
    const idx = parseInt(cell.dataset.impact, 10);
    const data = IMPACT[idx];
    const isOpen = cell.classList.contains('active');

    impactCells.forEach(c => c.classList.remove('active'));
    impactExpand.classList.remove('open');

    if (!isOpen) {
      cell.classList.add('active');
      impactTitle.textContent = data.title;
      impactDesc.textContent = data.desc;
      impactTag.textContent = data.tag;
      requestAnimationFrame(() => impactExpand.classList.add('open'));
    }
  });
});

/* ─── CASE FLOW ─────────────────────────────────── */

const caseCards = document.querySelectorAll('.case-card');
const caseFlow = document.getElementById('caseFlow');
const flowNum = document.getElementById('flowNum');
const flowTitle = document.getElementById('flowTitle');
const flowSteps = document.getElementById('flowSteps');
const flowClose = document.getElementById('flowClose');

function renderCaseFlow(idx) {
  const data = CASES[idx];
  flowNum.textContent = `Case ${data.num}`;
  flowTitle.textContent = data.title;
  flowSteps.innerHTML = data.steps.map(s => `
    <div class="flow-step">
      <div class="flow-step-label">${s.label}</div>
      <p>${s.text}</p>
    </div>`).join('');
}

caseCards.forEach(card => {
  card.addEventListener('click', () => {
    const idx = parseInt(card.dataset.case, 10);
    renderCaseFlow(idx);
    caseFlow.classList.add('open');
    requestAnimationFrame(() => {
      caseFlow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  });
});

flowClose.addEventListener('click', () => {
  caseFlow.classList.remove('open');
});

/* ─── RADAR ─────────────────────────────────────── */

const radarSvg = document.getElementById('radarSvg');
const radarAxisLabel = document.getElementById('radarAxisLabel');
const radarTitle = document.getElementById('radarTitle');
const radarProofs = document.getElementById('radarProofs');

const RADAR_CFG = {
  cx: 200, cy: 200, maxR: 145,
  axes: RADAR_AXES.length,
  rings: [0.2, 0.4, 0.6, 0.8, 1.0]
};

function polar(cx, cy, r, angleDeg) {
  const a = angleDeg * Math.PI / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function axisAngle(i) {
  return -90 + (360 / RADAR_CFG.axes) * i;
}

function buildRadar() {
  const { cx, cy, maxR } = RADAR_CFG;
  let svg = '';

  // grid rings
  RADAR_CFG.rings.forEach((ring, ri) => {
    const pts = [];
    for (let i = 0; i < RADAR_CFG.axes; i++) {
      const p = polar(cx, cy, maxR * ring, axisAngle(i));
      pts.push(`${p.x},${p.y}`);
    }
    const cls = ri === RADAR_CFG.rings.length - 1 ? 'radar-grid radar-grid-outer' : 'radar-grid';
    svg += `<polygon class="${cls}" points="${pts.join(' ')}" />`;
  });

  // axis lines
  for (let i = 0; i < RADAR_CFG.axes; i++) {
    const p = polar(cx, cy, maxR, axisAngle(i));
    svg += `<line class="radar-axis-line" x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" />`;
  }

  // data shape
  const shapePts = [];
  for (let i = 0; i < RADAR_CFG.axes; i++) {
    const score = RADAR_AXES[i].score / 10;
    const p = polar(cx, cy, maxR * score, axisAngle(i));
    shapePts.push(`${p.x},${p.y}`);
  }
  svg += `<polygon class="radar-shape" points="${shapePts.join(' ')}" />`;

  // data points
  for (let i = 0; i < RADAR_CFG.axes; i++) {
    const score = RADAR_AXES[i].score / 10;
    const p = polar(cx, cy, maxR * score, axisAngle(i));
    svg += `<circle class="radar-point" data-axis="${i}" cx="${p.x}" cy="${p.y}" r="4" />`;
  }

  // labels
  for (let i = 0; i < RADAR_CFG.axes; i++) {
    const p = polar(cx, cy, maxR + 28, axisAngle(i));
    const lines = RADAR_AXES[i].name.split('\n');
    const anchor = Math.abs(p.x - cx) < 10 ? 'middle' : (p.x < cx ? 'end' : 'start');
    const tss = lines.map((ln, li) => {
      const dy = (li - (lines.length - 1) / 2) * 13;
      return `<tspan x="${p.x}" dy="${li === 0 ? dy : 13}">${ln}</tspan>`;
    }).join('');
    svg += `<text class="radar-axis-label" data-axis="${i}" text-anchor="${anchor}" x="${p.x}" y="${p.y}">${tss}</text>`;
  }

  // center dot
  svg += `<circle cx="${cx}" cy="${cy}" r="3" fill="#3DD5F3" opacity="0.5" />`;

  radarSvg.innerHTML = svg;

  // click handlers
  radarSvg.querySelectorAll('[data-axis]').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => {
      const idx = parseInt(el.dataset.axis, 10);
      selectAxis(idx);
    });
  });
}

function selectAxis(idx) {
  const data = RADAR_AXES[idx];
  radarAxisLabel.textContent = data.name.replace('\n', ' ');
  radarTitle.textContent = data.title;
  radarProofs.innerHTML = data.proofs.map(p => `
    <div class="radar-proof">
      <span class="radar-proof-label">${p.label}</span>
      ${p.text}
    </div>`).join('');

  radarSvg.querySelectorAll('.radar-axis-label').forEach(el => {
    el.classList.toggle('active', parseInt(el.dataset.axis, 10) === idx);
  });
}

buildRadar();
selectAxis(0);

/* ─── CAREER UNLOCK ─────────────────────────────── */

const careerSteps = document.querySelectorAll('.career-step');
const careerObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('unlocked');
    }
  });
}, { rootMargin: '0px 0px -30% 0px', threshold: 0.1 });
careerSteps.forEach(s => careerObs.observe(s));

/* ─── KEYBOARD: rail number shortcuts (1-9) ─────── */

document.addEventListener('keydown', e => {
  if (e.target.matches('input, textarea')) return;
  const n = parseInt(e.key, 10);
  if (n >= 1 && n <= 9) {
    const link = document.querySelectorAll('.rail-link')[n - 1];
    if (link) link.click();
  }
});
