import { m } from 'framer-motion';
import { UserRound } from 'lucide-react';
import { EASE } from '../ui/Reveal';

// Stylised UI previews built from HTML/CSS (no screenshots). They use the same
// tokens as the rest of the site, so they follow the light/dark theme.

function MockFrame({ title, children }) {
  return (
    <div className="absolute inset-4 flex flex-col overflow-hidden rounded-xl border border-line bg-bg text-[11px] text-muted shadow-[var(--shadow)]">
      <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="ml-2 font-semibold text-ink">{title}</span>
      </div>
      {children}
    </div>
  );
}

function EmployeesMock() {
  const rows = ['Engineering', 'Finance', 'HR', 'Operations'];
  return (
    <MockFrame title="Employees">
      <div className="flex items-center gap-2 border-b border-line p-3">
        <div className="h-7 flex-1 rounded-md border border-line px-2 text-[11px] leading-7 text-muted">
          Search employees…
        </div>
        <div className="rounded-md bg-accent px-2.5 py-1.5 text-[11px] font-semibold text-on-accent">Export CSV</div>
      </div>
      <div className="flex gap-1.5 px-3 pt-3">
        {['All', 'Engineering', 'Finance', 'HR'].map((chip, i) => (
          <span
            key={chip}
            className={`rounded-full border px-2.5 py-0.5 text-[10px] ${i === 0 ? 'border-accent text-accent-text' : 'border-line text-muted'}`}
          >
            {chip}
          </span>
        ))}
      </div>
      <div className="mt-3 divide-y divide-line px-3">
        {rows.map((dept) => (
          <div key={dept} className="flex items-center gap-3 py-2.5">
            <span className="grid size-7 flex-none place-items-center rounded-full bg-surface-hover text-muted">
              <UserRound size={13} />
            </span>
            <div className="flex-1 space-y-1.5">
              <div className="h-2 w-2/3 rounded bg-line-strong" />
              <div className="h-1.5 w-1/3 rounded bg-line" />
            </div>
            <span className="rounded bg-surface-hover px-2 py-0.5 text-[10px]">{dept}</span>
          </div>
        ))}
      </div>
    </MockFrame>
  );
}

function DashboardMock() {
  const bars = [72, 48, 88];
  return (
    <MockFrame title="Project dashboard">
      <div className="grid grid-cols-3 gap-2 p-3">
        {['Projects', 'On track', 'Overdue'].map((label) => (
          <div key={label} className="rounded-lg border border-line p-2.5">
            <small className="block text-[10px]">{label}</small>
            <div className="mt-2.5 h-3 w-3/4 rounded bg-line-strong" />
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-center gap-5 px-4">
        <svg viewBox="0 0 36 36" className="size-24 flex-none -rotate-90" aria-hidden="true">
          <circle cx="18" cy="18" r="15.9" fill="none" strokeWidth="3.5" className="stroke-line" />
          <m.circle
            cx="18"
            cy="18"
            r="15.9"
            fill="none"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="stroke-accent"
            pathLength="100"
            strokeDasharray="100"
            initial={{ strokeDashoffset: 100 }}
            whileInView={{ strokeDashoffset: 28 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1.2, ease: EASE, delay: 0.2 }}
          />
        </svg>
        <div className="flex-1 space-y-3">
          {bars.map((w, i) => (
            <div key={i} className="h-1.5 overflow-hidden rounded bg-line">
              <m.div
                className="h-full origin-left rounded bg-accent"
                style={{ width: `${w}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1, ease: EASE, delay: 0.3 + i * 0.12 }}
              />
            </div>
          ))}
        </div>
      </div>
    </MockFrame>
  );
}

function InventoryMock() {
  const items = [
    ['Wireless keyboard', 34],
    ['USB-C hub', 8],
    ['Monitor stand', 52],
  ];
  return (
    <MockFrame title="Inventory">
      <div className="grid grid-cols-2 gap-2 p-3">
        <div className="rounded-lg border border-line p-2.5">
          <small className="block text-[10px]">Products</small>
          <strong className="text-[17px] text-ink">1,248</strong>
        </div>
        <div className="rounded-lg border border-line p-2.5">
          <small className="block text-[10px]">Low stock</small>
          <strong className="text-[17px] text-warn">08</strong>
        </div>
      </div>
      <div className="space-y-1 px-3">
        {items.map(([name, qty]) => {
          const low = qty < 10;
          return (
            <div
              key={name}
              className={`flex items-center justify-between rounded-md px-2.5 py-2 text-[12px] ${low ? 'row-warn' : ''}`}
            >
              <span className="text-ink">{name}</span>
              <b className={low ? 'text-warn' : 'text-ink'}>{qty}</b>
            </div>
          );
        })}
      </div>
    </MockFrame>
  );
}

export function ProjectMock({ kind }) {
  const Visual = { employees: EmployeesMock, dashboard: DashboardMock, inventory: InventoryMock }[kind];
  return (
    <div className="relative size-full grid-bg">
      {Visual && <Visual />}
    </div>
  );
}
