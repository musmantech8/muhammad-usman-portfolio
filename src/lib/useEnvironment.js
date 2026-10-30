import { useEffect, useState } from 'react';

// Reads a media query once on mount and keeps it up to date.
function useMediaQuery(query) {
  const [matches, setMatches] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

// True for mouse/trackpad users. Touch devices get no tilt, cursor or magnetic effects.
export function useFinePointer() {
  return useMediaQuery('(hover: hover) and (pointer: fine)');
}

// Custom cursor and 3D tilt are desktop-only and off for reduced motion.
export function useFancyMotion() {
  const fine = useFinePointer();
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)');
  return fine && !reduce;
}
