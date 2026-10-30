import { ArrowUp, Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../../content/content';
import { scrollToSection } from '../../lib/smoothScroll';

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-x flex flex-col gap-8 py-12 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-2">
          <p className="font-display text-lg font-semibold text-ink">{profile.name}</p>
          <p className="text-[15px] text-muted">
            Oracle APEX Developer · practical, data-driven web applications
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <Github size={18} />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <Linkedin size={18} />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid size-11 place-items-center rounded-xl border border-line text-muted transition-colors hover:border-line-strong hover:text-ink"
          >
            <Mail size={18} />
          </a>
          <button
            type="button"
            aria-label="Back to top"
            onClick={() => scrollToSection('#top', 0)}
            className="ml-2 grid size-11 place-items-center rounded-xl bg-accent text-on-accent transition-transform duration-300 hover:-translate-y-0.5"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      <div className="container-x flex flex-col gap-2 border-t border-line py-6 text-[14px] text-muted sm:flex-row sm:justify-between">
        <span>© 2026 {profile.name}</span>
        <span>{profile.location}</span>
      </div>
    </footer>
  );
}
