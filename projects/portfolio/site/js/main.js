'use strict';

/* ════════════════════════════════════════════════════
   CARSTEN LYSDAL — Portfolio v6
   Nav · Reveal · Mobile nav · Bottom tab bar · Section
   paging (spacebar) · Case accordion · Competence
   accordion · Tools drawer · Sticky CTA.
════════════════════════════════════════════════════ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehavior = prefersReduced ? 'auto' : 'smooth';

// ── Active nav via IntersectionObserver ─────────────
const sectionList = document.querySelectorAll('section[id]');
const sections    = Array.from(sectionList);
const navAs       = document.querySelectorAll('.nav-links a[href^="#"], .bottom-nav a[href^="#"]');

let currentIndex = 0;
const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    navAs.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${e.target.id}`));
    const idx = sections.indexOf(e.target);
    if (idx !== -1) currentIndex = idx;
  });
}, { rootMargin: '-35% 0px -35% 0px' });
sections.forEach(s => navObs.observe(s));

// ── Spacebar: jump one full section at a time ───────
document.addEventListener('keydown', e => {
  if (e.code !== 'Space') return;
  const target = e.target;
  if (target.closest?.('input, textarea, select, [contenteditable="true"]')) return;
  e.preventDefault();
  const dir = e.shiftKey ? -1 : 1;
  const next = sections[currentIndex + dir];
  if (next) next.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
});

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

/* ════════════════════════════════════════════════════
   BOTTOM TAB BAR — "Mere"-overflow (mobil)
════════════════════════════════════════════════════ */
const bnMore  = document.querySelector('.bn-more');
const bnSheet = document.querySelector('.bn-sheet');

bnMore?.addEventListener('click', e => {
  e.stopPropagation();
  const open = bnSheet?.classList.toggle('open');
  bnMore.setAttribute('aria-expanded', open ? 'true' : 'false');
  bnSheet?.setAttribute('aria-hidden', open ? 'false' : 'true');
});
bnSheet?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  bnSheet.classList.remove('open');
  bnMore?.setAttribute('aria-expanded', 'false');
  bnSheet.setAttribute('aria-hidden', 'true');
}));
document.addEventListener('click', e => {
  if (!e.target.closest('.bottom-nav') && bnSheet?.classList.contains('open')) {
    bnSheet.classList.remove('open');
    bnMore?.setAttribute('aria-expanded', 'false');
    bnSheet.setAttribute('aria-hidden', 'true');
  }
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
      setTimeout(() => card.scrollIntoView({ behavior: scrollBehavior, block: 'nearest' }), 420);
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

/* ════════════════════════════════════════════════════
   READING PROGRESS BAR — fylde efter samlet scroll,
   med tick-mærker ved hver sektionsgrænse.
════════════════════════════════════════════════════ */
const progressBar   = document.querySelector('.progress-bar');
const progressFill  = document.querySelector('.progress-fill');
const progressTicks = document.querySelector('.progress-ticks');

if (progressBar && progressFill) {
  const maxScroll = () => document.documentElement.scrollHeight - window.innerHeight;

  function layoutTicks() {
    if (!progressTicks) return;
    progressTicks.innerHTML = '';
    const total = maxScroll();
    if (total <= 0) return;
    sections.slice(1).forEach(s => {
      const pct = (s.offsetTop / total) * 100;
      const tick = document.createElement('i');
      tick.style.left = `${Math.min(Math.max(pct, 0), 100)}%`;
      progressTicks.appendChild(tick);
    });
  }

  let ticking = false;
  function updateProgress() {
    const total = maxScroll();
    const pct = total > 0 ? Math.min(100, Math.max(0, (window.scrollY / total) * 100)) : 0;
    progressFill.style.width = `${pct}%`;
    progressBar.setAttribute('aria-valuenow', Math.round(pct));
    ticking = false;
  }
  window.addEventListener('scroll', () => {
    if (!ticking) { requestAnimationFrame(updateProgress); ticking = true; }
  }, { passive: true });
  window.addEventListener('resize', () => { layoutTicks(); updateProgress(); });

  layoutTicks();
  updateProgress();
}
