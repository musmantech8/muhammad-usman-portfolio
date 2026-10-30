import { m } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { about, profile, stats } from '../../content/content';
import { Counter } from '../ui/Counter';
import { EASE, Reveal } from '../ui/Reveal';

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-24">
          {/* Heading: each line rises out of a mask */}
          <div>
            <p className="eyebrow mb-4">About</p>
            <h2 className="text-[clamp(38px,5vw,60px)] leading-[1.06] font-bold">
              {about.heading.map((line, i) => (
                <span key={line} className="block overflow-hidden pb-[0.06em]">
                  <m.span
                    className={`block ${i === 1 ? 'text-muted' : ''}`}
                    initial={{ y: '105%' }}
                    whileInView={{ y: '0%' }}
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
                  >
                    {line}
                  </m.span>
                </span>
              ))}
            </h2>
          </div>

          <Reveal delay={0.1} className="flex flex-col gap-6 lg:pt-14">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-[18px] leading-[1.75] text-text">
                {p}
              </p>
            ))}
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="arrow-slide mt-2 inline-flex items-center gap-2 font-semibold text-accent-text"
            >
              See my GitHub <ArrowRight size={16} />
            </a>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 sm:grid-cols-3 md:mt-28">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08} className="glass rounded-2xl p-8">
              <span className="mb-6 block h-0.5 w-10 bg-accent" />
              <strong className="block font-display text-[52px] leading-none font-bold tracking-[-0.04em] text-ink">
                <Counter value={s.value} suffix={s.suffix} />
              </strong>
              <span className="mt-3 block text-[15.5px] text-muted">{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
