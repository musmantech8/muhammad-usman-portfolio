import { m, useReducedMotion } from 'framer-motion';

export const EASE = [0.22, 1, 0.36, 1];

// Fade + 24px rise, triggered once when ~15% of the element is visible.
// Only opacity and transform are animated: filter animations (blur) are repainted every
// frame and made scrolling jank, so they were removed.
export function Reveal({ as = 'div', delay = 0, className = '', children, ...rest }) {
  const reduce = useReducedMotion();
  const Tag = m[as];

  const variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1 } }
    : {
      hidden: { opacity: 0, y: 24 },
      visible: { opacity: 1, y: 0 },
    };

  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.75, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
