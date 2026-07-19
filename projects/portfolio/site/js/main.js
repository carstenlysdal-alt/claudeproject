'use strict';

/* ══════════════════════════════════════
   Carsten Lysdal Portfolio
   Nav · Mobile menu · Reveal · Cases · CV-expand · Bottom nav
══════════════════════════════════════ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehavior = prefersReduced ? 'auto' : 'smooth';

document.querySelectorAll([
  'section:not(#start) > .container > .section-head',
  '.career-item',
  '.case-card',
  '.comp-item',
  '.scene-card',
  '.value-card',
  '.menneske-closing > div'
].join(',')).forEach(el => {
  if (!el.hasAttribute('data-reveal')) el.setAttribute('data-reveal', '');
});

document.querySelectorAll('.comp-list, .scene-cards, .value-cards-grid, .menneske-closing').forEach(group => {
  group.setAttribute('data-reveal-group', '');
});

document.querySelectorAll('[data-reveal-group]').forEach(group => {
  group.querySelectorAll(':scope > [data-reveal]').forEach((item, index) => {
    item.style.setProperty('--reveal-delay', `${index * 110}ms`);
  });
});

// ── Active bottom nav on scroll ──────────────────────
const sections = Array.from(document.querySelectorAll('section[id]'));
const bnItems  = document.querySelectorAll('.bn-item');

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    const id = e.target.id;
    bnItems.forEach(a => {
      const href = a.getAttribute('href') || '';
      a.classList.toggle('bn-active', href === `#${id}`);
    });
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => navObs.observe(s));

// ── Reveal on scroll ─────────────────────────────────
if (!prefersReduced) {
  const revObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revObs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -48px 0px' });
  document.querySelectorAll('.reveal, [data-reveal]').forEach(el => revObs.observe(el));
} else {
  document.querySelectorAll('.reveal, [data-reveal]').forEach(el => el.classList.add('visible'));
}

// ── Mobile menu ───────────────────────────────────────
const navToggle  = document.querySelector('.nav-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

navToggle?.addEventListener('click', () => {
  const open = mobileMenu?.getAttribute('aria-hidden') === 'true';
  mobileMenu?.setAttribute('aria-hidden', open ? 'false' : 'true');
  navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelector('.mobile-close')?.addEventListener('click', closeMenu);

mobileMenu?.querySelectorAll('.mobile-link').forEach(a => {
  a.addEventListener('click', closeMenu);
});

mobileMenu?.addEventListener('click', e => {
  if (e.target === mobileMenu) closeMenu();
});

function closeMenu() {
  mobileMenu?.setAttribute('aria-hidden', 'true');
  navToggle?.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeMenu();
});

// ── Accessible profile tabs ──────────────────────────
document.querySelectorAll('[data-tabs]').forEach(tabsRoot => {
  const tabs = Array.from(tabsRoot.querySelectorAll('[role="tab"]'));
  const panels = Array.from(tabsRoot.querySelectorAll('[role="tabpanel"]'));

  function selectTab(tab, moveFocus = false) {
    tabs.forEach(item => {
      const selected = item === tab;
      item.setAttribute('aria-selected', selected ? 'true' : 'false');
      item.tabIndex = selected ? 0 : -1;
    });

    panels.forEach(panel => {
      panel.hidden = panel.id !== tab.getAttribute('aria-controls');
    });

    if (moveFocus) tab.focus();
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => selectTab(tab));
    tab.addEventListener('keydown', event => {
      let nextIndex;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex === undefined) return;
      event.preventDefault();
      selectTab(tabs[nextIndex], true);
    });
  });
});

// ── Case accordion ────────────────────────────────────
function openDetail(card) {
  const detail = card?.querySelector('.case-detail');
  if (!detail) return;
  detail.hidden = false;
  card.classList.add('is-open');
  animateCounts(detail);
}

function closeDetail(card) {
  const detail = card?.querySelector('.case-detail');
  if (detail) detail.hidden = true;
  card.classList.remove('is-open');
}

document.querySelectorAll('.case-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const card   = btn.closest('.case-card');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.case-trigger[aria-expanded="true"]').forEach(b => {
      if (b !== btn) {
        b.setAttribute('aria-expanded', 'false');
        closeDetail(b.closest('.case-card'));
      }
    });

    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      closeDetail(card);
    } else {
      btn.setAttribute('aria-expanded', 'true');
      openDetail(card);
      setTimeout(() => {
        card?.scrollIntoView({ behavior: scrollBehavior, block: 'nearest' });
      }, 80);
    }
  });
});

// ── Cases preview list — scroll to case and open it ──
document.querySelectorAll('.case-preview-item').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;

    const trigger = target.querySelector('.case-trigger');
    if (trigger && trigger.getAttribute('aria-expanded') !== 'true') {
      trigger.setAttribute('aria-expanded', 'true');
      openDetail(target);
    }

    target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  });
});

// ── Resultattal: count-up ved åbning ─────────────────
function formatNum(n) {
  return Math.round(n).toLocaleString('da-DK');
}

function animateCounts(scope) {
  scope.querySelectorAll('.result-num[data-count]').forEach(el => {
    if (el.dataset.done) return;
    el.dataset.done = '1';

    const target = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';

    if (prefersReduced || !target) {
      el.textContent = prefix + (target ? formatNum(target) : '') + suffix;
      return;
    }

    const dur = 1100;
    const start = performance.now();
    function step(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 4); // ease-out-quart
      el.textContent = prefix + formatNum(target * eased) + suffix;
      if (t < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  });
}

// ── Bølgeform: generér lydbarer med organisk kurve ──
function buildWaveform(el) {
  if (el.dataset.built) return;
  el.dataset.built = '1';

  const n = parseInt(el.dataset.bars || '24', 10);
  const frag = document.createDocumentFragment();

  for (let i = 0; i < n; i++) {
    const bar = document.createElement('span');
    bar.className = 'wave-bar';
    // Højere midt i (sinuskurve), lavere i kanterne
    const envelope = Math.sin((i / (n - 1)) * Math.PI);
    const peak = 0.28 + envelope * 0.72;
    bar.style.setProperty('--h', peak.toFixed(3));
    bar.style.animationDelay = (i * 0.055).toFixed(3) + 's';
    bar.style.animationDuration = (0.85 + (i % 3) * 0.18).toFixed(2) + 's';
    frag.appendChild(bar);
  }
  el.appendChild(frag);
}

document.querySelectorAll('.waveform').forEach(buildWaveform);

// ── CV expand/collapse in career timeline ─────────────
document.querySelectorAll('.ci-expand').forEach(btn => {
  btn.addEventListener('click', () => {
    const detail  = btn.nextElementSibling;
    const isOpen  = btn.getAttribute('aria-expanded') === 'true';
    const icon    = btn.querySelector('.expand-icon');

    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      btn.innerHTML = 'Vis detaljer <span class="expand-icon">+</span>';
      if (detail) detail.hidden = true;
    } else {
      btn.setAttribute('aria-expanded', 'true');
      btn.innerHTML = 'Skjul detaljer <span class="expand-icon">+</span>';
      if (detail) detail.hidden = false;
    }
  });
});

// ── Nav shadow on scroll ──────────────────────────────
const siteNav = document.getElementById('site-nav');
const heroSection = document.getElementById('start');

function updateNavState() {
  const pastHero = heroSection ? heroSection.getBoundingClientRect().bottom <= 72 : window.scrollY > 8;
  document.body.classList.toggle('past-hero', pastHero);
  siteNav?.classList.toggle('scrolled', window.scrollY > 8);
}

window.addEventListener('scroll', updateNavState, { passive: true });
window.addEventListener('resize', updateNavState, { passive: true });
updateNavState();
