'use strict';

/* ================================================
   CARSTEN LYSDAL — Portfolio JS v4
   Scroll progress (CSS) · Active nav · Reveal ·
   Case accordion · Counter · Chatty typewriter ·
   Mobile nav
   ================================================ */

// Scroll progress (CSS animation-timeline handles it — just inject the element)
const bar = document.createElement('div');
bar.className = 'scroll-progress';
document.body.prepend(bar);

// ── Active nav ───────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navAs     = document.querySelectorAll('.nav-links a[href^="#"]');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObs.observe(s));

// ── Reveal ───────────────────────────────────────
const revObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); revObs.unobserve(e.target); }
  });
}, { rootMargin: '0px 0px -72px 0px' });
document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));

// ── Mobile nav ───────────────────────────────────
const toggle  = document.querySelector('.nav-toggle');
const navList = document.querySelector('.nav-links');

toggle?.addEventListener('click', e => { e.stopPropagation(); navList?.classList.toggle('open'); });
navList?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navList.classList.remove('open')));
document.addEventListener('click', e => { if (!e.target.closest('nav')) navList?.classList.remove('open'); });

// ── Case accordion ───────────────────────────────
document.querySelectorAll('.case-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.case-item');
    const open = item.classList.contains('active');

    document.querySelectorAll('.case-item.active').forEach(other => {
      if (other === item) return;
      other.classList.remove('active');
      other.querySelector('.case-trigger').setAttribute('aria-expanded', 'false');
    });

    if (open) {
      item.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 420);
    }
  });
});

// ── Chatty typewriter ────────────────────────────
const TABS = {
  research: `> Chatty — Researchassistent\n\nAnalyserer primærkilder ...\nFinder mønstre i offentlige data ...\nForeslår vinkler på baggrund af tendenser ...\n\nKlar til OSINT, åbne registre og kildekortlægning.\nTransskriberer og koder interviews.\nKildekritik som fast led i hvert output.`,
  produktion: `> Chatty — Redaktionel produktion\n\nGenererer første udkast på under 3 minutter.\nTilpasser tone, format og genre.\nForeslår overskrifter og strukturvarianter.\n\n500-600 korte enheder om ugen. Samme team.\nFrigjorte ressourcer til prioriteret journalistik.`,
  kvalitet: `> Chatty — Kvalitetssikring\n\nTjekker fakta mod primærkilder ...\nMarkerer juridiske og etiske risici ...\nVerificerer citaternes korrekthed ...\n\nRedaktionel godkendelse som fast led.\nAI assisterer — journalisten beslutter.`
};

const consoleBody   = document.querySelector('.console-body');
const consoleCursor = document.querySelector('.console-cursor');

let typeTimer = null;
let currentTab = 'research';

function typeText(text) {
  if (!consoleBody) return;
  clearTimeout(typeTimer);
  consoleBody.textContent = '';
  let i = 0;
  const tick = () => {
    if (i < text.length) {
      consoleBody.textContent += text[i++];
      typeTimer = setTimeout(tick, i < 30 ? 18 : text[i-1] === '\n' ? 80 : 22);
    }
  };
  tick();
}

document.querySelectorAll('.console-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    const key = tab.dataset.tab;
    if (key === currentTab) return;
    currentTab = key;
    document.querySelectorAll('.console-tab').forEach(t => {
      const isActive = t === tab;
      t.classList.toggle('active', isActive);
      t.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
    typeText(TABS[key] || '');
  });
});

// Start typewriter when console enters viewport
const consoleEl = document.querySelector('.console');
if (consoleEl) {
  const consObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      typeText(TABS[currentTab]);
      consObs.unobserve(consoleEl);
    }
  }, { rootMargin: '0px 0px -100px 0px' });
  consObs.observe(consoleEl);
}
