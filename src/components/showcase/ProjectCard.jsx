import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Code2, Github } from 'lucide-react';
import { CodePeek } from './CodePeek';
import { ProjectMock } from './ProjectMock';
import { Reveal } from '../ui/Reveal';

// One large showcase row. `reverse` flips the visual and text on desktop (alternating layout).
export function ProjectCard({ project, reverse = false }) {
  const [codeOpen, setCodeOpen] = useState(false);

  return (
    <Reveal as="article" className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={`glass group relative aspect-[16/11] overflow-hidden rounded-2xl ${reverse ? 'lg:order-2' : ''}`}>
        <div className="absolute inset-0 transition-transform duration-700 ease-soft group-hover:scale-[1.04]">
          <ProjectMock kind={project.visual} />
        </div>
      </div>

      <div className={reverse ? 'lg:order-1' : ''}>
        <div className="mb-4 flex flex-wrap items-center gap-3 text-[13px] font-semibold text-muted">
          <span className="text-accent-text">{project.number}</span>
          <span>{project.type}</span>
        </div>
        <h3 className="text-[clamp(26px,3vw,34px)] leading-[1.15] font-bold">{project.title}</h3>
        <p className="mt-4 text-[16px] leading-[1.75] text-muted">{project.description}</p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag} className="pill">{tag}</li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-3">
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="btn btn-outline btn-sm arrow-slide"
          >
            <Github size={16} /> View code on GitHub <ArrowUpRight size={16} />
          </a>
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noreferrer" className="btn btn-primary btn-sm">
              Live demo <ArrowUpRight size={16} />
            </a>
          )}
          <button
            type="button"
            aria-expanded={codeOpen}
            onClick={() => setCodeOpen((open) => !open)}
            className="btn btn-outline btn-sm"
          >
            <Code2 size={16} /> {codeOpen ? 'Hide' : 'Show'} PL/SQL
          </button>
        </div>

        <AnimatePresence initial={false}>
          {codeOpen && <CodePeek key="peek" caption={project.code.caption} snippet={project.code.snippet} />}
        </AnimatePresence>
      </div>
    </Reveal>
  );
}
