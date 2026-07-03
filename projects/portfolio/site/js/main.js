'use strict';

/* ================================================
   CARSTEN LYSDAL — Portfolio JS v3.1
   Scroll progress: CSS animation-timeline (no JS listener)
   Active nav · Reveal · Case accordion · Counter · Mobile nav
   ================================================ */

// Inject progress bar element (styled via CSS scroll-driven animation)
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

// ── Active nav link ──────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => {
        l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => navObserver.observe(s));

// ── Reveal on scroll ─────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      revealObserver.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -72px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// ── Mobile nav ───────────────────────────────────
const toggle     = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');

if (toggle && navLinksEl) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(l => {
    l.addEventListener('click', () => navLinksEl.classList.remove('open'));
  });
}
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) navLinksEl?.classList.remove('open');
});

// ── Counter animation ────────────────────────────
function animateCounter(el) {
  const target   = parseFloat(el.dataset.target);
  const suffix   = el.dataset.suffix || '';
  const duration = 1400;
  const start    = performance.now();
  const isFloat  = String(target).includes('.');

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);
    const value    = target * eased;
    el.textContent = (isFloat ? value.toFixed(1) : Math.round(value)) + suffix;
    if (progress < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.stat-number[data-target]').forEach(el => counterObserver.observe(el));

// ── Case accordion ───────────────────────────────
document.querySelectorAll('.case-trigger').forEach(trigger => {
  trigger.addEventListener('click', () => {
    const item   = trigger.closest('.case-item');
    const detail = item.querySelector('.case-detail');
    const inner  = item.querySelector('.case-detail-inner');
    const isOpen = item.classList.contains('active');

    // Close others
    document.querySelectorAll('.case-item.active').forEach(open => {
      if (open !== item) {
        open.classList.remove('active');
        open.querySelector('.case-detail').style.height = '0';
        open.querySelector('.case-trigger').setAttribute('aria-expanded', 'false');
      }
    });

    if (isOpen) {
      item.classList.remove('active');
      detail.style.height = '0';
      trigger.setAttribute('aria-expanded', 'false');
    } else {
      item.classList.add('active');
      detail.style.height = inner.scrollHeight + 'px';
      trigger.setAttribute('aria-expanded', 'true');
      setTimeout(() => item.scrollIntoView({ behavior: 'smooth', block: 'nearest' }), 420);
    }
  });
});
