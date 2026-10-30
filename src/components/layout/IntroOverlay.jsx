import { useEffect, useState } from 'react';
import { AnimatePresence, m, useReducedMotion } from 'framer-motion';
import { profile } from '../../content/content';
import { EASE } from '../ui/Reveal';

const SEEN_KEY = 'mu-intro-seen';

function hasSeenIntro() {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* ignore: the intro may show again next visit */
  }
}

// Under one second: the MU frame draws in, the letters fade in, then the overlay fades out.
// Shown once per browser, skipped for reduced motion.
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [show, setShow] = useState(() => !reduce && !hasSeenIntro());

  useEffect(() => {
    if (!show) return undefined;
    const timer = setTimeout(() => {
      markIntroSeen();
      setShow(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <m.div
          aria-hidden="true"
          className="fixed inset-0 z-[80] grid place-items-center bg-bg"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          <svg viewBox="0 0 120 120" className="size-28" role="presentation">
            <m.rect
              x="6" y="6" width="108" height="108" rx="28"
              fill="none" strokeWidth="2" className="stroke-accent"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            />
            <m.text
              x="60" y="60" textAnchor="middle" dominantBaseline="central"
              className="fill-ink font-display"
              style={{ fontSize: 34, fontWeight: 700 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {profile.monogram}
            </m.text>
          </svg>
        </m.div>
      )}
    </AnimatePresence>
  );
}
