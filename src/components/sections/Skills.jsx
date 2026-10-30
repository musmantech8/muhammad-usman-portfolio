import { skills, techStrip } from '../../content/content';
import { SpotlightCard } from '../ui/SpotlightCard';
import { Reveal } from '../ui/Reveal';
import { SectionHead } from '../ui/SectionHead';

// The strip is written out twice so the scroll loops seamlessly.
// The second copy is hidden from screen readers and from reduced-motion users.
function TechStrip() {
  return (
    <div className="marquee mt-16 overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_10%,#000_90%,transparent)]">
      <div className="marquee-track flex w-max gap-4">
        {[...techStrip, ...techStrip].map((tech, i) => {
          const isCopy = i >= techStrip.length;
          return (
            <span
              key={`${tech}-${i}`}
              aria-hidden={isCopy || undefined}
              className={`pill whitespace-nowrap px-5 py-2.5 text-[15px] ${isCopy ? 'marquee-dup' : ''}`}
            >
              {tech}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  return (
    <section id="skills" className="relative border-y border-line bg-bg-elev py-28 md:py-36">
      <div className="container-x">
        <SectionHead
          eyebrow="Skills"
          title="Tools I work with"
          note="A focused toolkit for building database-driven web applications."
        />

        {/* Bento grid: Oracle APEX spans two columns on desktop */}
        <div className="grid gap-5 md:grid-cols-3">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <Reveal key={skill.name} delay={i * 0.07} className={skill.wide ? 'md:col-span-2' : ''}>
                <SpotlightCard className="h-full rounded-2xl p-7 md:p-8">
                  <span className="icon-tile">
                    <Icon size={20} />
                  </span>
                  <h3 className="mt-6 text-[20px] font-semibold text-ink">{skill.name}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{skill.detail}</p>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>

        <TechStrip />
      </div>
    </section>
  );
}
