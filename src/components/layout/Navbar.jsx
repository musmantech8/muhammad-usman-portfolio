import { useEffect, useState } from 'react';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { Download, Menu, Moon, Sun, X } from 'lucide-react';
import { navItems, profile } from '../../content/content';
import { useTheme } from '../../hooks/useTheme';
import { lockScroll, scrollToSection } from '../../lib/smoothScroll';
import { EASE } from '../ui/Reveal';

const sectionIds = navItems.map((item) => item.id);

// Which section is in the middle of the screen? Drives the sliding pill.
function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="grid size-10 place-items-center rounded-xl border border-line text-muted transition-colors duration-300 hover:border-line-strong hover:text-ink"
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={theme}
          className="grid place-items-center"
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }}
          transition={{ duration: 0.3, ease: EASE }}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}

function NavLink({ item, active, onNavigate }) {
  const isActive = active === item.id;
  return (
    <a
      href={`#${item.id}`}
      onClick={(e) => {
        e.preventDefault();
        onNavigate(item.id);
      }}
      aria-current={isActive ? 'true' : undefined}
      className={`relative isolate rounded-full px-4 py-2 text-[15px] font-medium transition-colors duration-300 ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`}
    >
      {isActive && (
        <m.span
          layoutId="nav-pill"
          className="absolute inset-0 -z-10 rounded-full bg-surface-hover"
          transition={{ duration: 0.5, ease: EASE }}
        />
      )}
      {item.label}
    </a>
  );
}

const menuVariants = {
  open: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
  closed: {},
};
const menuItemVariants = {
  open: { opacity: 1, y: 0 },
  closed: { opacity: 0, y: 20 },
};

export function Navbar() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  useMotionValueEvent(scrollY, 'change', (y) => setScrolled(y > 24));

  const active = useActiveSection(sectionIds);
  const { theme, toggleTheme } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    lockScroll(menuOpen);
    if (!menuOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      lockScroll(false);
      window.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const navigate = (id) => {
    setMenuOpen(false);
    scrollToSection(`#${id}`);
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[height,background-color,border-color] duration-500 ${
        scrolled
          ? 'h-16 border-line bg-[color-mix(in_srgb,var(--bg)_94%,transparent)] shadow-[0_6px_24px_-12px_rgba(0,0,0,0.35)]'
          : 'h-20 border-transparent bg-transparent'
      }`}
    >
      <div className="container-x flex h-full items-center justify-between gap-4">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            navigate('top');
          }}
          className="flex items-center gap-3 font-display font-semibold text-ink"
        >
          <span className="grid size-9 place-items-center rounded-xl bg-accent text-[13px] font-bold text-on-accent">
            {profile.monogram}
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-1 min-[1080px]:flex">
          {navItems.map((item) => (
            <NavLink key={item.id} item={item} active={active} onNavigate={navigate} />
          ))}
          <a href={profile.cv} download className="btn btn-outline btn-sm ml-3 arrow-slide">
            <Download size={16} /> Download CV
          </a>
          <div className="ml-2">
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 min-[1080px]:hidden">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            className="grid size-10 place-items-center rounded-xl border border-line text-ink"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Full-screen mobile menu with staggered link reveal */}
      <AnimatePresence>
        {menuOpen && (
          <m.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="fixed inset-x-0 bottom-0 top-16 flex flex-col gap-2 overflow-y-auto bg-bg px-6 pt-8 pb-10 min-[1080px]:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <m.ul variants={menuVariants} initial="closed" animate="open" className="flex flex-col gap-1">
              {navItems.map((item) => (
                <m.li key={item.id} variants={menuItemVariants}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.id);
                    }}
                    className="block py-4 font-display text-[28px] font-semibold text-ink"
                  >
                    {item.label}
                  </a>
                </m.li>
              ))}
              <m.li variants={menuItemVariants} className="mt-6">
                <a href={profile.cv} download className="btn btn-primary w-full">
                  <Download size={17} /> Download CV
                </a>
              </m.li>
            </m.ul>
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
