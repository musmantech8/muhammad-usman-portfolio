import { useMemo } from 'react';
import { m } from 'framer-motion';
import { highlightPlsql } from '../../lib/highlight';
import { EASE } from '../ui/Reveal';

// Expandable PL/SQL excerpt with syntax highlighting. It is a short illustrative
// snippet, not the full source. The full code is on GitHub.
export function CodePeek({ caption, snippet }) {
  const tokens = useMemo(() => highlightPlsql(snippet), [snippet]);

  return (
    <m.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="overflow-hidden"
    >
      <div className="mt-6 overflow-hidden rounded-2xl border border-line bg-bg">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3 text-[13px] text-muted">
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="size-2.5 rounded-full bg-line-strong" />
          <span className="ml-2 truncate">{caption}</span>
        </div>
        <pre className="overflow-x-auto p-5 font-mono text-[13px] leading-[1.7] text-text">
          <code>
            {tokens.map((token, i) => (
              <span key={i} className={token.type === 'kw' || token.type === 'str' || token.type === 'num' || token.type === 'com' ? `tok-${token.type}` : undefined}>
                {token.text}
              </span>
            ))}
          </code>
        </pre>
      </div>
    </m.div>
  );
}
