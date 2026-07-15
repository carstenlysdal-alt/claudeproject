'use strict';

/* ══════════════════════════════════════
   Carsten Lysdal Portfolio
   Nav · Mobile menu · Reveal · Cases · CV-expand · Bottom nav
══════════════════════════════════════ */

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const scrollBehavior = prefersReduced ? 'auto' : 'smooth';

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
  document.querySelectorAll('.reveal').forEach(el => revObs.observe(el));
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

// ── Case accordion ────────────────────────────────────
document.querySelectorAll('.case-trigger').forEach(btn => {
  btn.addEventListener('click', () => {
    const card   = btn.closest('.case-card');
    const detail = card?.querySelector('.case-detail');
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // Close all others
    document.querySelectorAll('.case-trigger[aria-expanded="true"]').forEach(b => {
      if (b !== btn) {
        b.setAttribute('aria-expanded', 'false');
        const d = b.closest('.case-card')?.querySelector('.case-detail');
        if (d) d.hidden = true;
      }
    });

    if (isOpen) {
      btn.setAttribute('aria-expanded', 'false');
      if (detail) detail.hidden = true;
    } else {
      btn.setAttribute('aria-expanded', 'true');
      if (detail) detail.hidden = false;
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
    const detail  = target.querySelector('.case-detail');
    if (trigger && detail && trigger.getAttribute('aria-expanded') !== 'true') {
      trigger.setAttribute('aria-expanded', 'true');
      detail.hidden = false;
    }

    target.scrollIntoView({ behavior: scrollBehavior, block: 'start' });
  });
});

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
window.addEventListener('scroll', () => {
  siteNav?.classList.toggle('scrolled', window.scrollY > 8);
}, { passive: true });
