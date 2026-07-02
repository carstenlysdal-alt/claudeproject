/* ================================================
   CARSTEN LYSDAL — Portfolio JS
   ================================================ */

// Scroll progress bar
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.prepend(progressBar);

window.addEventListener('scroll', () => {
  const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = `${Math.min(scrolled, 100)}%`;
}, { passive: true });

// Active nav link
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -40% 0px' });

sections.forEach(s => observer.observe(s));

// Reveal on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { rootMargin: '0px 0px -80px 0px' });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const navLinksEl = document.querySelector('.nav-links');

if (toggle && navLinksEl) {
  toggle.addEventListener('click', () => {
    navLinksEl.classList.toggle('open');
  });

  navLinksEl.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinksEl.classList.remove('open'));
  });
}

// Close mobile nav on outside click
document.addEventListener('click', (e) => {
  if (!e.target.closest('nav')) {
    navLinksEl?.classList.remove('open');
  }
});
