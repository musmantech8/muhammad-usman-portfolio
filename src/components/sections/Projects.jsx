import { projects } from '../../content/content';
import { ProjectCard } from '../showcase/ProjectCard';
import { SectionHead } from '../ui/SectionHead';

export function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Projects"
          title="Selected work"
          note="Working apps with Oracle SQL and PL/SQL backends. Each one has its own GitHub repository."
        />

        <div className="flex flex-col gap-24 md:gap-32">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
