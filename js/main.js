/**
 * PORTFOLIO 2.0 — INTERACTION & NAVIGATION LOGIC
 * High-performance, lightweight script
 */

document.addEventListener('DOMContentLoaded', () => {
  const navItems = document.querySelectorAll('.side-nav-item');
  const chapterSections = document.querySelectorAll('[data-nav-chapter]');

  if (navItems.length === 0 || chapterSections.length === 0) return;

  // Options for Intersection Observer
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -50% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const chapter = entry.target.getAttribute('data-nav-chapter');
        updateActiveNav(chapter);
      }
    });
  }, observerOptions);

  chapterSections.forEach((sec) => observer.observe(sec));

  function updateActiveNav(activeChapter) {
    navItems.forEach((item) => {
      const chapter = item.getAttribute('data-chapter');
      if (chapter === activeChapter) {
        item.classList.add('is-active');
      } else {
        item.classList.remove('is-active');
      }
    });
  }

  // Handle hero section to reset active state
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          navItems.forEach((item) => item.classList.remove('is-active'));
        }
      });
    }, { threshold: 0.5 });
    heroObserver.observe(heroSection);
  }

  // Smooth scroll click handler
  navItems.forEach((item) => {
    item.addEventListener('click', (e) => {
      const targetId = item.getAttribute('href');
      if (targetId && targetId.startsWith('#')) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });
});
