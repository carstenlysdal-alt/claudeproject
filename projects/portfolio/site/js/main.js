'use strict';

/* ════════════════════════════════════════════════════
   CARSTEN LYSDAL — Portfolio v6
   Nav · Reveal · Mobile nav · Case accordion ·
   Competence accordion · Tools drawer · Sticky CTA.
════════════════════════════════════════════════════ */

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
