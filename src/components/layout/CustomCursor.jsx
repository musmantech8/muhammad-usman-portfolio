import { useEffect, useState } from 'react';
import { m, useMotionValue, useSpring } from 'framer-motion';
import { useFancyMotion } from '../../lib/useEnvironment';
import { EASE } from '../ui/Reveal';

// A dot that follows the cursor exactly, and a ring that follows with a slight lag
// and grows over links and buttons. Desktop only; hidden for touch and reduced motion.
export function CustomCursor() {
  const enabled = useFancyMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 600, damping: 45, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 600, damping: 45, mass: 0.4 });
  const [visible, setVisible] = useState(false);
  const [hovering, setHovering] = useState(false);

  useEffect(() => {
    if (!enabled) return undefined;
    const root = document.documentElement;
    root.classList.add('has-cursor');

    const onMove = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      setHovering(Boolean(e.target.closest?.('a, button, [data-cursor]')));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener('pointermove', onMove, { passive: true });
    root.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerleave', onLeave);
      root.classList.remove('has-cursor');
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none">
      <m.div
        className="fixed left-0 top-0 z-[70] -ml-1 -mt-1 size-2 rounded-full bg-accent"
        style={{ x, y }}
        animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      />
      <m.div
        className="fixed left-0 top-0 z-[70] -ml-[18px] -mt-[18px] size-9 rounded-full border border-accent"
        style={{ x: ringX, y: ringY }}
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 1.8 : 1 }}
        transition={{ duration: 0.4, ease: EASE }}
      />
    </div>
  );
}
