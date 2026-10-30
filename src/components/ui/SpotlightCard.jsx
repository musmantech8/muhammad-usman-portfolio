import { useRef } from 'react';
import { m, useSpring } from 'framer-motion';
import { useFancyMotion } from '../../lib/useEnvironment';

// Glass card with a spotlight that follows the cursor (CSS, see .spotlight in index.css)
// and a gentle 3D tilt (desktop only).
export function SpotlightCard({ className = '', children }) {
  const ref = useRef(null);
  const enabled = useFancyMotion();
  const rotateX = useSpring(0, { stiffness: 160, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 160, damping: 20 });

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    el.style.setProperty('--mx', `${px}px`);
    el.style.setProperty('--my', `${py}px`);
    if (enabled) {
      rotateY.set((px / rect.width - 0.5) * 10);
      rotateX.set((0.5 - py / rect.height) * 10);
    }
  };

  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.div
      ref={ref}
      className={`glass spotlight ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
