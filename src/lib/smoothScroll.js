import Lenis from 'lenis';

// One Lenis instance for the whole page. It is skipped for reduced-motion users,
// who get the browser's native scrolling instead.
let lenis = null;

export function startSmoothScroll() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};

  // lerp: each frame the page closes 12% of the remaining distance. This keeps the
  // smoothing but makes the wheel respond right away (the old long easing felt slow).
  lenis = new Lenis({
    lerp: 0.12,
    wheelMultiplier: 1.1,
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
