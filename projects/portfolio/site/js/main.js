'use strict';

/* ════════════════════════════════════════════════════
   CARSTEN LYSDAL — Portfolio JS v3
   Active nav · Reveal · Mobile nav · Transform console ·
   Chain engine · Case cards · Competence fields · Tools drawer
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

// ── Transform console (AI section) ───────────────────
const transformTabs   = document.querySelectorAll('.transform-tab');
const transformPanels = document.querySelectorAll('.transform-panel');

transformTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const state = tab.dataset.state;

    transformTabs.forEach(t => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    transformPanels.forEach(p => p.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');

    const target = document.querySelector(`.transform-panel[data-panel="${state}"]`);
    if (target) target.classList.add('active');
  });
});

// ── Chain engine (editorial motor) ───────────────────
const chainNodes  = document.querySelectorAll('.chain-node');
const chainPanels = document.querySelectorAll('.chain-panel');

chainNodes.forEach(node => {
  node.addEventListener('click', () => {
    const idx = node.dataset.chain;

    chainNodes.forEach(n => {
      n.classList.remove('active');
      n.setAttribute('aria-selected', 'false');
    });
    chainPanels.forEach(p => p.classList.remove('active'));

    node.classList.add('active');
    node.setAttribute('aria-selected', 'true');

    const target = document.querySelector(`.chain-panel[data-panel="${idx}"]`);
    if (target) target.classList.add('active');
  });
});

// ── Case cards (expand/collapse) ─────────────────────
document.querySelectorAll('.case-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const card = btn.closest('.case-card');
    const isOpen = card.classList.contains('active');

    document.querySelectorAll('.case-card.active').forEach(c => {
      if (c !== card) c.classList.remove('active');
    });

    if (isOpen) {
      card.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      card.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      setTimeout(() => card.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 420);
    }
  });
});

// ── Competence fields (expand/collapse) ──────────────
document.querySelectorAll('.comp-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const field = btn.closest('.competence-field');
    const isOpen = field.classList.contains('active');

    document.querySelectorAll('.competence-field.active').forEach(f => {
      if (f !== field) {
        f.classList.remove('active');
        f.querySelector('.comp-trigger')?.setAttribute('aria-expanded', 'false');
      }
    });

    if (isOpen) {
      field.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
    } else {
      field.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// ── Tools drawer ─────────────────────────────────────
const toolsToggle = document.querySelector('.tools-toggle');
const toolsDrawer = document.querySelector('.tools-drawer');

toolsToggle?.addEventListener('click', () => {
  const open = toolsDrawer?.classList.toggle('open');
  toolsToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  if (toolsDrawer) toolsDrawer.setAttribute('aria-hidden', open ? 'false' : 'true');
});
