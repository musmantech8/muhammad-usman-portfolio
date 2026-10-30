import { useRef } from 'react';
import { m, useScroll, useSpring } from 'framer-motion';
import { certifications, education } from '../../content/content';
import { Reveal } from '../ui/Reveal';

// Each card has a dot on the timeline line. The accent part of the line grows as you scroll.
export function Education() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 60%'] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <section id="education" className="border-y border-line bg-bg-elev py-28 md:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <Reveal className="lg:sticky lg:top-32 lg:self-start">
          <p className="eyebrow mb-4">Education</p>
          <h2 className="text-[clamp(34px,4.2vw,52px)] leading-[1.08] font-bold">
            Learning is part
            <br />
            of the process.
          </h2>
        </Reveal>

        <div ref={ref} className="relative flex flex-col gap-6 pl-10">
          <div aria-hidden="true" className="absolute top-2 bottom-2 left-[9px] w-px bg-line" />
          <m.div
            aria-hidden="true"
            className="absolute top-2 bottom-2 left-[9px] w-px origin-top bg-accent"
            style={{ scaleY }}
          />

          {education.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} className="relative">
              <span aria-hidden="true" className="absolute top-8 -left-10 size-5 rounded-full border-2 border-accent bg-bg" />
              <div className="glass rounded-2xl p-7 md:p-8">
                <span className="eyebrow text-[12.5px]">{item.label}</span>
                <h3 className="mt-3 text-[20px] leading-snug font-semibold text-ink">{item.title}</h3>
                <p className="mt-2 mb-5 text-muted">{item.place}</p>
                <span className="pill">{item.status}</span>
              </div>
            </Reveal>
          ))}

          {/* Certifications slot: add entries in content.js, this card shows until then */}
          <Reveal delay={education.length * 0.08} className="relative">
            <span aria-hidden="true" className="absolute top-8 -left-10 size-5 rounded-full border-2 border-dashed border-line-strong bg-bg" />
            {certifications.length > 0 ? (
              certifications.map((cert) => (
                <div key={cert.title} className="glass mb-4 rounded-2xl p-7">
                  <h3 className="text-[18px] font-semibold text-ink">{cert.title}</h3>
                  <p className="mt-1 text-muted">
                    {cert.issuer} · {cert.year}
                  </p>
                </div>
              ))
            ) : (
              <div className="rounded-2xl border border-dashed border-line-strong p-7 md:p-8">
                <p className="eyebrow text-[12.5px]">Certifications</p>
                <p className="mt-2 text-muted">Coming soon.</p>
              </div>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
