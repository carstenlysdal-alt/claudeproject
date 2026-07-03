/* ================================================
   CARSTEN LYSDAL — Portfolio JS v3
   Scroll progress · Active nav · Reveal · Case accordion ·
   Counter animation · Competency bars · Mobile nav
   ================================================ */

'use strict';

// ── Scroll progress bar ──────────────────────────
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  progressBar.style.width = `${Math.min(pct * 100, 100)}%`;
}, { passive: true });

// ── Active nav link ──────────────────────────────
const sections   = document.querySelectorAll('section[id]');
const navLinks   = document.querySelectorAll('.nav-links a[href^="#"]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${e.target.id}`));
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
const toggle      = document.querySelector('.nav-toggle');
const navLinksEl  = document.querySelector('.nav-links');

if (toggle && navLinksEl) {
  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinksEl.classList.toggle('open');
  });
  navLinksEl.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinksEl.classList.remove('open')));
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) navLinksEl?.classList.remove('open');
});

// ── Counter animation ────────────────────────────
function animateCounter(el) {
  const target    = parseFloat(el.dataset.target);
  const suffix    = el.dataset.suffix || '';
  const prefix    = el.dataset.prefix || '';
  const duration  = 1400;
  const start     = performance.now();
  const isDecimal = String(target).includes('.');

  const tick = (now) => {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = target * eased;
    el.textContent = prefix + (isDecimal ? value.toFixed(1) : Math.round(value)) + suffix;
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

    // Close all others
    document.querySelectorAll('.case-item.active').forEach(openItem => {
      if (openItem !== item) {
        openItem.classList.remove('active');
        openItem.querySelector('.case-detail').style.height = '0';
      }
    });

    if (isOpen) {
      item.classList.remove('active');
      detail.style.height = '0';
    } else {
      item.classList.add('active');
      detail.style.height = inner.scrollHeight + 'px';
      // Scroll into view slightly
      setTimeout(() => {
        item.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 420);
    }
  });
});

// ── Competency bars ──────────────────────────────
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const pct  = e.target.dataset.pct;
      e.target.style.width = pct + '%';
      barObserver.unobserve(e.target);
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.kompetence-fill[data-pct]').forEach(el => barObserver.observe(el));

// ── Timeline line animation ──────────────────────
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.timeline-item').forEach(el => timelineObserver.observe(el));
