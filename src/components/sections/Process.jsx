import { useRef, useState } from 'react';
import { useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { processSteps } from '../../content/content';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

// Four steps on a line. The line is drawn with SVG stroke-dashoffset as you scroll,
// and each step lights up when the drawing reaches it.
export function Process() {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const count = processSteps.length;
  const [litCount, setLitCount] = useState(reduce ? count : 1);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 55%'] });
  const dashOffset = useTransform(scrollYProgress, [0, 1], [1, 0]);

  // Step i sits at i / count of the line's length, so it lights once the drawing reaches it.
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setLitCount(Math.min(count, Math.floor(v * count) + 1));
  });

  return (
    <section id="process" className="py-28 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Process"
          title="From everyday workflow to reliable tool."
          note="The four steps I follow on every application."
        />

        <div ref={ref} className="relative">
          {/* Desktop: horizontal line */}
          <svg
            aria-hidden="true"
            className="absolute inset-x-0 top-[25px] hidden h-[2px] w-full md:block"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
          >
            <path d="M0 1 H100" fill="none" strokeWidth="2" className="stroke-line" />
            <path
              d="M0 1 H100"
              fill="none"
              strokeWidth="2"
              className="stroke-accent"
              pathLength="1"
              strokeDasharray="1"
              style={{ strokeDashoffset: reduce ? 0 : dashOffset }}
            />
          </svg>

          {/* Mobile: vertical line */}
          <svg
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[7px] w-[2px] md:hidden"
            viewBox="0 0 2 100"
            preserveAspectRatio="none"
          >
            <path d="M1 0 V100" fill="none" strokeWidth="2" className="stroke-line" />
            <path
              d="M1 0 V100"
              fill="none"
              strokeWidth="2"
              className="stroke-accent"
              pathLength="1"
              strokeDasharray="1"
              style={{ strokeDashoffset: reduce ? 0 : dashOffset }}
            />
          </svg>

          <ol className="relative grid gap-12 md:grid-cols-4 md:gap-8">
            {processSteps.map((step, i) => {
              const lit = i < litCount;
              return (
                <Reveal as="li" key={step.step} delay={i * 0.08} className="relative pl-12 md:pt-14 md:pl-0">
                  <span
                    aria-hidden="true"
                    className={`absolute top-[4px] left-0 grid size-4 rounded-full border-2 transition-[background-color,border-color,box-shadow] duration-500 md:top-[18px] ${
                      lit
                        ? 'border-accent bg-accent shadow-[0_0_0_6px_var(--glow)]'
                        : 'border-line-strong bg-bg'
                    }`}
                  />
                  <span
                    className={`font-mono text-[13px] font-medium tracking-[0.08em] transition-colors duration-500 ${
                      lit ? 'text-accent-text' : 'text-muted'
                    }`}
                  >
                    {step.step}
                  </span>
                  <h3 className={`mt-2 text-[22px] font-semibold transition-colors duration-500 ${lit ? 'text-ink' : 'text-muted'}`}>
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-[260px] text-[15px] leading-relaxed text-muted">{step.text}</p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
