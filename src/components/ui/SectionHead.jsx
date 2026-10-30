import { Reveal } from './Reveal';

// Shared heading block: eyebrow label, big title, optional side note.
export function SectionHead({ eyebrow, title, note }) {
  return (
    <div className="mb-16 flex flex-col gap-6 md:mb-20 md:flex-row md:items-end md:justify-between md:gap-12">
      <Reveal>
        <p className="eyebrow mb-4">{eyebrow}</p>
        <h2 className="text-[clamp(34px,4.2vw,52px)] leading-[1.08] font-bold">{title}</h2>
      </Reveal>
      {note && (
        <Reveal delay={0.1}>
          <p className="max-w-sm text-[17px] text-muted">{note}</p>
        </Reveal>
      )}
    </div>
  );
}
