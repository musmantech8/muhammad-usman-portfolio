import { m, useSpring } from 'framer-motion';
import { useFancyMotion } from '../../lib/useEnvironment';

// Pulls its child slightly toward the cursor. Desktop only; no effect for touch or reduced motion.
export function Magnetic({ strength = 0.35, className = '', children }) {
  const enabled = useFancyMotion();
  const x = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });
  const y = useSpring(0, { stiffness: 220, damping: 18, mass: 0.5 });

  const handleMove = (e) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <m.div
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}
