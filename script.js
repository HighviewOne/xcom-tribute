  // ── Mobile nav toggle ──
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');

  function setNavOpen(isOpen) {
    navLinks.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  }

  navToggle.addEventListener('click', () => {
    setNavOpen(!navLinks.classList.contains('open'));
  });

  // Close mobile nav on link click or Escape
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => setNavOpen(false));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      setNavOpen(false);
      navToggle.focus();
    }
  });

  // ── Active nav highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navLinkItems = navLinks.querySelectorAll('a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinkItems.forEach(a => {
          const isActive = a.getAttribute('href') === '#' + entry.target.id;
          a.classList.toggle('active', isActive);
          if (isActive) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));

  // ── Scroll fade-in ──
  const fadeObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.fade-in').forEach(el => fadeObserver.observe(el));

  // ── Back to top ──
  const backBtn = document.getElementById('back-to-top');
  const updateBackBtn = () => backBtn.classList.toggle('visible', window.scrollY > 400);
  window.addEventListener('scroll', updateBackBtn, { passive: true });
  updateBackBtn();
  backBtn.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    document.querySelector('.nav-logo').focus({ preventScroll: true });
  });
