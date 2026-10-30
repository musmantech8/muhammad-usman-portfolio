import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

// Types out each phrase, pauses, deletes it, then moves to the next one.
// With reduced motion it simply shows the first phrase.
export function useTypewriter(phrases, { typeSpeed = 70, deleteSpeed = 38, pause = 1700 } = {}) {
  const reduce = useReducedMotion();
  const [text, setText] = useState(() => (reduce ? phrases[0] : ''));

  useEffect(() => {
    if (reduce) {
      setText(phrases[0]);
      return undefined;
    }

    let timer;
    let phraseIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const phrase = phrases[phraseIndex];

      if (!deleting) {
        charIndex += 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === phrase.length) {
          deleting = true;
          timer = setTimeout(tick, pause);
        } else {
          timer = setTimeout(tick, typeSpeed);
        }
      } else {
        charIndex -= 1;
        setText(phrase.slice(0, charIndex));
        if (charIndex === 0) {
          deleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          timer = setTimeout(tick, 300);
        } else {
          timer = setTimeout(tick, deleteSpeed);
        }
      }
    };

    timer = setTimeout(tick, 500);
    return () => clearTimeout(timer);
  }, [reduce, phrases, typeSpeed, deleteSpeed, pause]);

  return text;
}
