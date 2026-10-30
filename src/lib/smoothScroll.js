import Lenis from 'lenis';

// One Lenis instance for the whole page. It is skipped for reduced-motion users,
// who get the browser's native scrolling instead.
let lenis = null;

export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  lenis = new Lenis({
    duration: 1.15,
    // Ease-out curve close to the site's motion curve.
    easing: (t) => 1 - Math.pow(1 - t, 4),
    smoothWheel: true,
  });

  let frame;
  const raf = (time) => {
    lenis.raf(time);
    frame = requestAnimationFrame(raf);
  };
  frame = requestAnimationFrame(raf);

  return () => {
    cancelAnimationFrame(frame);
    lenis.destroy();
    lenis = null;
  };
}

// Scrolls to a section. The offset keeps the heading clear of the sticky navbar.
export function scrollToSection(target, offset = -80) {
  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.2 });
    return;
  }
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
}

// onClick handler for in-page links, e.g. <a href="#projects" onClick={anchorHandler('projects')}>.
export function anchorHandler(id) {
  return (e) => {
    e.preventDefault();
    scrollToSection(`#${id}`);
  };
}

export function lockScroll(locked) {
  document.documentElement.style.overflow = locked ? 'hidden' : '';
}
