import { m, useReducedMotion, useSpring } from 'framer-motion';
import { ArrowRight, GraduationCap, Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { profile } from '../../content/content';
import { useFancyMotion } from '../../lib/useEnvironment';
import { anchorHandler } from '../../lib/smoothScroll';
import { useTypewriter } from '../../hooks/useTypewriter';
import { Magnetic } from '../ui/Magnetic';
import { EASE } from '../ui/Reveal';

const nameWords = profile.name.split(' ');

// The photo tilts slightly toward the pointer (desktop only).
function PhotoTilt({ children }) {
  const enabled = useFancyMotion();
  const rotateX = useSpring(0, { stiffness: 120, damping: 20 });
  const rotateY = useSpring(0, { stiffness: 120, damping: 20 });

  const handleMove = (e) => {
    if (!enabled) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    rotateX.set((0.5 - (e.clientY - rect.top) / rect.height) * 14);
  };
  const reset = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <m.div
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </m.div>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const role = useTypewriter(profile.roles);

  return (
    <section id="top" className="relative flex min-h-svh items-center overflow-hidden pt-28 pb-28">
      {/* Background: faint grid and a soft radial glow behind the photo */}
      <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[8%] left-[62%] size-[min(820px,120vw)] -translate-x-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, var(--glow), transparent)' }}
      />

      <div className="container-x relative grid w-full items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        {/* Text column: on mobile it sits above the photo */}
        <div>
          <m.p
            className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-line px-3.5 py-1.5 text-[14px] font-medium text-text"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <span className="relative flex size-2">
              <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </m.p>

          <h1 className="text-[clamp(48px,7vw,88px)] leading-[0.98] font-bold tracking-[-0.045em] text-ink">
            {nameWords.map((word, i) => (
              <span key={word} className="inline-block overflow-hidden pb-[0.08em] align-top last:mr-0 mr-[0.26em]">
                <m.span
                  className="inline-block"
                  initial={{ y: '105%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.15 + i * 0.1 }}
                >
                  {word}
                </m.span>
              </span>
            ))}
          </h1>

          {/* Rotating role: typewriter effect. Reduced motion shows the first role. */}
          <p className="mt-4 flex min-h-[1.5em] items-center font-display text-[clamp(22px,2.6vw,30px)] font-semibold text-accent-text">
            <span>{role}</span>
            {!reduce && (
              <m.span
                aria-hidden="true"
                className="ml-1 inline-block h-[0.95em] w-[2px] bg-accent"
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </p>

          <m.p
            className="mt-7 max-w-[540px] text-[18px] leading-[1.7] text-text"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.5 }}
          >
            {profile.tagline}
          </m.p>

          <m.div
            className="mt-10 flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.6 }}
          >
            <Magnetic>
              <a href="#projects" onClick={anchorHandler('projects')} className="btn btn-primary arrow-slide">
                View my work <ArrowRight size={17} />
              </a>
            </Magnetic>
            <a href="#contact" onClick={anchorHandler('contact')} className="btn btn-outline">
              Get in touch
            </a>
          </m.div>

          <m.div
            className="mt-12 flex items-center gap-2 text-muted"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.75 }}
          >
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="grid size-11 place-items-center rounded-xl border border-line transition-colors hover:border-line-strong hover:text-ink">
              <Github size={18} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="grid size-11 place-items-center rounded-xl border border-line transition-colors hover:border-line-strong hover:text-ink">
              <Linkedin size={18} />
            </a>
            <a href={`mailto:${profile.email}`} aria-label="Email" className="grid size-11 place-items-center rounded-xl border border-line transition-colors hover:border-line-strong hover:text-ink">
              <Mail size={18} />
            </a>
            <span className="mx-2 hidden h-6 w-px bg-line sm:block" />
            <span className="hidden items-center gap-1.5 text-[15px] sm:inline-flex">
              <MapPin size={15} /> {profile.location}
            </span>
          </m.div>
        </div>

        {/* Photo column. Smaller on mobile. */}
        <div className="relative mx-auto w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[440px] lg:justify-self-end">
          <m.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
          >
            <PhotoTilt>
              <m.div
                animate={reduce ? undefined : { y: [0, -12, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                {/* Accent-gradient ring around the photo */}
                <div
                  className="rounded-[28px] p-[2px] shadow-[var(--shadow-hover)]"
                  style={{
                    background:
                      'linear-gradient(140deg, var(--accent) 0%, transparent 42%, transparent 58%, color-mix(in srgb, var(--accent) 45%, transparent) 100%)',
                  }}
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-[26px] bg-bg-elev">
                    <picture>
                      <source srcSet={profile.photo.webp} type="image/webp" />
                      <img
                        src={profile.photo.jpg}
                        width={profile.photo.width}
                        height={profile.photo.height}
                        alt="Portrait of Muhammad Usman"
                        fetchpriority="high"
                        className="size-full object-cover"
                        style={{ objectPosition: '50% 15%' }}
                      />
                    </picture>
                  </div>
                </div>
              </m.div>
            </PhotoTilt>
          </m.div>

          {/* "Studying BSIT" badge floats in after the photo */}
          <m.div
            className="glass absolute bottom-6 left-3 flex items-center gap-3 rounded-2xl px-4 py-3 sm:-left-8 sm:bottom-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.1 }}
          >
            <span className="icon-tile">
              <GraduationCap size={20} />
            </span>
            <div>
              <small className="block text-[12.5px] leading-tight text-muted">Studying</small>
              <strong className="text-[14.5px] font-semibold text-ink">BSIT, Virtual University</strong>
            </div>
          </m.div>
        </div>
      </div>

      {/* Scroll-down indicator */}
      <a
        href="#about"
        onClick={anchorHandler('about')}
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-ink"
      >
        <span className="flex h-10 w-6 justify-center rounded-full border border-line-strong pt-2">
          <span className="motion-safe:animate-scroll-dot h-1.5 w-1 rounded-full bg-accent" />
        </span>
      </a>
    </section>
  );
}
