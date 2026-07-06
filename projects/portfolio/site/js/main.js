'use strict';

/* ════════════════════════════════════════════════════
   CARSTEN LYSDAL — Portfolio v5
   CV + Editorial Operating System.
   Nav · Reveal · Mobile · Chain · Systemkort · Problem
   scanner · Decision engine + IDE · Competence filter ·
   Case cards · Competence accordion · Tools drawer ·
   Count-up stats · Sticky CTA.
════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ── Active nav via IntersectionObserver ─────────────
const sections = document.querySelectorAll('section[id]');
const navAs    = document.querySelectorAll('.nav-links a[href^="#"]');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
  });
}, { rootMargin: '-35% 0px -35% 0px' });
sections.forEach(s => navObs.observe(s));

// ── Reveal ───────────────────────────────────────────
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── Mobile nav ────────────────────────────────────────
const navToggle = document.querySelector('.nav-toggle');
const navList   = document.querySelector('.nav-links');

navToggle?.addEventListener('click', e => {
  e.stopPropagation();
  const open = navList?.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navList?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  navList.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('click', e => {
  if (!e.target.closest('nav') && navList?.classList.contains('open')) {
    navList.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  }
});

// ── Chain engine (redaktionel motor) ───────────────────
const chainNodes  = document.querySelectorAll('.chain-node');
const chainPanels = document.querySelectorAll('.chain-panel');
chainNodes.forEach(node => {
  node.addEventListener('click', () => {
    const idx = node.dataset.chain;
    chainNodes.forEach(n => { n.classList.remove('active'); n.setAttribute('aria-selected', 'false'); });
    chainPanels.forEach(p => p.classList.remove('active'));
    node.classList.add('active');
    node.setAttribute('aria-selected', 'true');
    const target = document.querySelector(`.chain-panel[data-panel="${idx}"]`);
    if (target) target.classList.add('active');
  });
});

/* ════════════════════════════════════════════════════
   SYSTEMKORT — node hover/focus → proof panel
════════════════════════════════════════════════════ */
const nodeProof = {
  nyhedstaeft:  { tag: 'Nyhedstæft',        text: 'Den journalistiske muskel: at mærke, hvad der er vigtigt, overraskende eller underbelyst — før andre.' },
  samfundsblik: { tag: 'Samfundsblik',      text: 'Hvad er på spil i samfundet, lokalt og nationalt? Hvilke spørgsmål presser sig på, før de bliver nyheder?' },
  brugerbehov:  { tag: 'Brugerbehov',       text: 'Operationaliseret læserbehov og relevanskriterier som fælles sprog for redaktører og journalister.' },
  relevans:     { tag: 'Relevanskriterier', text: 'Fælles filter mellem mavefornemmelse, data og publicistisk ansvar. Gør prioritering konkret.' },
  data:         { tag: 'Data',              text: 'Ikke rapportering. Beslutningssprog. Data omsat til redaktionelle valg, ikke dashboards ved siden af.' },
  ai:           { tag: 'AI',                text: 'Ikke adgang. Adfærd. AI som infrastruktur, fælles metode og daglig praksis.' },
  organisation: { tag: 'Organisation',      text: 'Ledelse af ca. 150 medarbejdere. OKR/KPI, mellemledere, feedbackkultur og nye arbejdsmønstre.' },
  platforme:    { tag: 'Platforme',         text: 'Rating, recommender, performance tracking, SEO og research — med Chatty som ét bevis på metoden.' }
};

const sysNodes   = document.querySelectorAll('.sys-node');
const proofTag   = document.querySelector('.sys-proof-tag');
const proofText  = document.querySelector('.sys-proof-text');

function showNodeProof(key) {
  const data = nodeProof[key];
  if (!data || !proofTag) return;
  proofTag.textContent = data.tag;
  proofTag.removeAttribute('data-default');
  if (proofText) proofText.textContent = data.text;
  sysNodes.forEach(n => n.classList.toggle('is-active', n.dataset.node === key));
}
function clearNodeProof() {
  if (!proofTag) return;
  proofTag.textContent = 'System online';
  proofTag.setAttribute('data-default', 'true');
  if (proofText) proofText.textContent = 'Hold over eller tab til en node for at se, hvad det enkelte element bliver til i drift.';
  sysNodes.forEach(n => n.classList.remove('is-active'));
}
sysNodes.forEach(node => {
  const key = node.dataset.node;
  node.addEventListener('mouseenter', () => showNodeProof(key));
  node.addEventListener('focus', () => showNodeProof(key));
  node.addEventListener('click', () => showNodeProof(key));
  node.addEventListener('mouseleave', () => { if (!document.querySelector('.sys-node.is-active')) clearNodeProof(); });
  node.addEventListener('blur', () => {
    setTimeout(() => {
      if (!document.activeElement?.closest('.system-card')) clearNodeProof();
    }, 0);
  });
  node.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showNodeProof(key); }
  });
});

/* ════════════════════════════════════════════════════
   PROBLEM SCANNER
════════════════════════════════════════════════════ */
const problemData = {
  brugere:   { levers: ['strategi','system'],  action: 'Operationaliser brugerbehov og relevanskriterier som fælles sprog — og kob dem til format, distribution og performance.', proof: '2× digital trafik' },
  ai:        { levers: ['adfaerd','drift'],    action: 'Flyt AI fra individuelle eksperimenter til fælles metode: workflows, standarder, træning og feedbacksløjfer.', proof: 'Chatty MVP → drift' },
  data:      { levers: ['strategi','system'],  action: 'Oversæt data til redaktionelt sprog, fælles kriterier og konkrete prioriteringer — ikke rapporter.', proof: 'Data som beslutningssprog' },
  siloer:    { levers: ['adfaerd','strategi'], action: 'Retning, roller, OKR/KPI og mellemlederforankring, der bryder siloer op omkring fælles prioriteringer.', proof: '150 medarbejdere' },
  produkter: { levers: ['system','drift'],     action: 'Fra behov til roadmap: use cases, funktionsspecifikation og kobling til daglig drift.', proof: 'Fra behov til roadmap' },
  workflows: { levers: ['drift','system'],     action: 'Designede processer, CMS-flow, AI-assist og faste kvalitetspunkter, der skalerer uden at miste redaktionel kontrol.', proof: '500–600 enheder/uge' }
};

const scannerProbs = document.querySelectorAll('.scanner-prob');
const soLevers     = document.querySelectorAll('.so-lever');
const soAction     = document.querySelector('[data-problem-text]');
const soProof      = document.querySelector('[data-problem-proof]');

scannerProbs.forEach(btn => {
  btn.addEventListener('click', () => {
    const data = problemData[btn.dataset.problem];
    if (!data) return;
    scannerProbs.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
    btn.classList.add('active');
    btn.setAttribute('aria-selected', 'true');
    soLevers.forEach(l => l.classList.toggle('is-on', data.levers.includes(l.dataset.lever)));
    if (soAction) soAction.textContent = data.action;
    if (soProof) soProof.textContent = data.proof;
  });
});

/* ════════════════════════════════════════════════════
   DECISION ENGINE + EDITORIAL IDE
════════════════════════════════════════════════════ */
const branchData = {
  format:       { q: 'Er det formatet, der ikke rammer?',          i: 'Brugerbehov + stofområde + platform',  metode: 'relevanskriterier + formatvalg',     method: 'Formatvalg · performance-feedback',         handling: 'nyt formatvalg',         effekt: 'mere relevant publicering' },
  distribution: { q: 'Er det distributionen, der fejler?',         i: 'Brugerbehov + indhold + kanal',        metode: 'kanalvalg + timing',                  method: 'Kanalvalg · platformtilpasning · timing',   handling: 'ny distributionslogik', effekt: 'indhold når brugeren' },
  timing:       { q: 'Er det timingen, der mangler?',              i: 'Aktualitet + brugeradfærd + dagsflow', metode: 'publiceringsrytme + opfølgning',     method: 'Publiceringsrytme · live · opfølgning',     handling: 'skarpere rytme',        effekt: 'større gennemslag' },
  emnevalg:     { q: 'Er det emnevalget, der ikke bærer?',         i: 'Samfundsblik + brugerbehov + data',    metode: 'relevansfiltrering + prioritering', method: 'Relevansfiltrering · prioriteringsmodel',   handling: 'ny prioriteringsmodel', effekt: 'det rigtige stof frem' },
  vinkling:     { q: 'Er det vinklingen, der rammer forbi?',       i: 'Nyhedstæft + kildearbejde + brugersituation', metode: 'vinkling + kildearbejde',       method: 'Vinkling · forklaring · nyance',            handling: 'skarpere vinkling',     effekt: 'journalistik der rammer' },
  prioritering: { q: 'Er det prioriteringen, der svigter?',        i: 'Strategi + OKR/KPI + performance',     metode: 'fælles kriterier + ratings',         method: 'Fælles kriterier · ratings · beslutningsmøde', handling: 'fælles prioriteringsmodel', effekt: 'færre, skarpere valg' }
};

const treeBranches = document.querySelectorAll('.tree-branch');
const ideInput     = document.querySelector('[data-ide="input"]');
const ideCaption   = document.querySelector('[data-ide="caption"]');
const ideOutput    = document.querySelector('[data-ide="output"]');

function renderBranch(key) {
  const d = branchData[key];
  if (!d) return;
  treeBranches.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-selected', 'false'); });
  const active = document.querySelector(`.tree-branch[data-branch="${key}"]`);
  if (active) { active.classList.add('active'); active.setAttribute('aria-selected', 'true'); }
  if (ideInput) ideInput.innerHTML =
    `<span class="c-k">Problem</span>\nVi når ikke brugeren.\n\n` +
    `<span class="c-k">Spørgsmål</span>\n${d.q}\n\n` +
    `<span class="c-k">Input</span>\n${d.i}`;
  if (ideCaption) ideCaption.textContent = d.method;
  if (ideOutput) ideOutput.innerHTML =
    `{\n` +
    `  <span class="c-p">"metode"</span>: <span class="c-s">"${d.metode}"</span>,\n` +
    `  <span class="c-p">"handling"</span>: <span class="c-s">"${d.handling}"</span>,\n` +
    `  <span class="c-p">"effekt"</span>: <span class="c-s">"${d.effekt}"</span>\n` +
    `}`;
}
treeBranches.forEach(btn => {
  btn.addEventListener('click', () => renderBranch(btn.dataset.branch));
  btn.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); renderBranch(btn.dataset.branch); }
  });
});

/* ════════════════════════════════════════════════════
   COMPETENCE FILTER
════════════════════════════════════════════════════ */
const cfChips = document.querySelectorAll('.cf-chip');
const cfTargets = document.querySelectorAll('[data-comp]');
const cfContainers = [
  document.querySelector('.career-stack'),
  document.querySelector('.stage-grid'),
  document.querySelector('.product-lab'),
  document.querySelector('.cases-bento')
].filter(Boolean);

cfChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const filter = chip.dataset.filter;
    cfChips.forEach(c => { c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); });
    chip.classList.add('active');
    chip.setAttribute('aria-pressed', 'true');

    if (filter === 'alle') {
      cfTargets.forEach(el => el.classList.remove('is-match'));
      cfContainers.forEach(c => c.classList.remove('is-filtering'));
      return;
    }
    cfContainers.forEach(c => c.classList.add('is-filtering'));
    cfTargets.forEach(el => {
      const tokens = (el.dataset.comp || '').split(/\s+/);
      el.classList.toggle('is-match', tokens.includes(filter));
    });
  });
});

/* ════════════════════════════════════════════════════
   CASE CARDS (expand/collapse)
════════════════════════════════════════════════════ */
document.querySelectorAll('.case-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.case-card');
    const isOpen = card.classList.contains('active');
    document.querySelectorAll('.case-card.active').forEach(c => {
      if (c !== card) { c.classList.remove('active'); c.querySelector('.case-trigger')?.setAttribute('aria-expanded', 'false'); }
    });
    if (isOpen) { card.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
    else { card.classList.add('active'); btn.setAttribute('aria-expanded', 'true');
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 420);
    }
  });
});

/* ════════════════════════════════════════════════════
   COMPETENCE ACCORDION
════════════════════════════════════════════════════ */
document.querySelectorAll('.comp-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const field = btn.closest('.competence-field');
    const isOpen = field.classList.contains('active');
    document.querySelectorAll('.competence-field.active').forEach(f => {
      if (f !== field) { f.classList.remove('active'); f.querySelector('.comp-trigger')?.setAttribute('aria-expanded', 'false'); }
    });
    if (isOpen) { field.classList.remove('active'); btn.setAttribute('aria-expanded', 'false'); }
    else { field.classList.add('active'); btn.setAttribute('aria-expanded', 'true'); }
  });
});

/* ════════════════════════════════════════════════════
   TOOLS DRAWER
════════════════════════════════════════════════════ */
const toolsToggle = document.querySelector('.tools-toggle');
const toolsDrawer = document.querySelector('.tools-drawer');
toolsToggle?.addEventListener('click', () => {
  const open = toolsDrawer?.classList.toggle('open');
  toolsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (toolsDrawer) toolsDrawer.setAttribute('aria-hidden', open ? 'false' : 'true');
});

/* ════════════════════════════════════════════════════
   COUNT-UP STATS
════════════════════════════════════════════════════ */
function animateCount(el) {
  const target = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || '';
  if (prefersReduced) { el.textContent = target + suffix; return; }
  const dur = 1100;
  const start = performance.now();
  function step(now) {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(step);
    else el.textContent = target + suffix;
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num[data-count]');
const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCount(e.target); statObs.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -10% 0px' });
statNums.forEach(el => statObs.observe(el));

/* ════════════════════════════════════════════════════
   STICKY CONTACT FAB
════════════════════════════════════════════════════ */
const fab = document.querySelector('.contact-fab');
const hero = document.querySelector('#start');
const kontakt = document.querySelector('#kontakt');

if (fab && hero && kontakt) {
  fab.removeAttribute('hidden');
  let pastHero = false, atContact = false;
  const render = () => { fab.classList.toggle('is-visible', pastHero && !atContact); };
  new IntersectionObserver(entries => {
    entries.forEach(e => { pastHero = !e.isIntersecting; render(); });
  }, { rootMargin: '0px 0px -80% 0px' }).observe(hero);
  new IntersectionObserver(entries => {
    entries.forEach(e => { atContact = e.isIntersecting; render(); });
  }, { rootMargin: '-40% 0px -40% 0px' }).observe(kontakt);
}
