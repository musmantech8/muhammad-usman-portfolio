import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowRight, ArrowUpRight, Github, Linkedin, Mail, Menu, X,
  Code2, Database, Layers3, Workflow, Terminal,
  GraduationCap, MapPin, Copy, Check,
} from 'lucide-react';
import './styles.css';

/* ───────────── Content ───────────── */

const profile = {
  name: 'Muhammad Usman',
  role: 'Oracle APEX Developer',
  email: 'muhammadusman.tech8@gmail.com',
  github: 'https://github.com/musmantech8',
  linkedin: 'https://www.linkedin.com/in/muhmmad-usman-364108401/',
  location: 'Pakistan',
  photo: '/usman-cutout.webp',
};

const skills = [
  { name: 'Oracle APEX', detail: 'Pages, forms, interactive reports and dashboards.', icon: Layers3, level: 86 },
  { name: 'SQL', detail: 'Joins, aggregations and reporting queries.', icon: Database, level: 82 },
  { name: 'Oracle PL/SQL', detail: 'Procedures, functions, triggers and business logic.', icon: Terminal, level: 76 },
  { name: 'HTML & CSS', detail: 'Responsive, accessible interfaces.', icon: Code2, level: 72 },
  { name: 'JavaScript', detail: 'Dynamic actions and interactive behaviour.', icon: Workflow, level: 66 },
];

const projects = [
  {
    number: '01',
    title: 'Employee Management System',
    type: 'HR web application',
    description: 'Employee records, departments and salaries with a dashboard, search, filters and CSV export. Oracle schema with triggers, a salary audit trail and a PL/SQL package for raises, transfers and terminations.',
    tags: ['Oracle SQL', 'PL/SQL', 'JavaScript'],
    visual: 'employees',
    repo: 'https://github.com/musmantech8/employee-management-system',
  },
  {
    number: '02',
    title: 'Project Tracking Dashboard',
    type: 'Dashboard',
    description: 'Projects, owners, tasks and deadlines with KPI cards, status charts and overdue alerts. A PL/SQL package keeps each project status in sync with its tasks.',
    tags: ['Oracle SQL', 'PL/SQL', 'Charts'],
    visual: 'dashboard',
    repo: 'https://github.com/musmantech8/project-tracking-dashboard',
  },
  {
    number: '03',
    title: 'Inventory & Stock Manager',
    type: 'Business application',
    description: 'Products, stock in/out and low-stock alerts. A database trigger keeps quantities correct and blocks negative stock; reports include stock value and a running balance.',
    tags: ['Oracle SQL', 'PL/SQL', 'Database Design'],
    visual: 'inventory',
    repo: 'https://github.com/musmantech8/inventory-stock-manager',
  },
];

const process = [
  { step: '01', title: 'Understand', text: 'Learn the real workflow and the data behind it first.' },
  { step: '02', title: 'Model', text: 'Design tables and relationships that keep data reliable.' },
  { step: '03', title: 'Build', text: 'Create pages, reports and PL/SQL logic around user tasks.' },
  { step: '04', title: 'Refine', text: 'Test, polish and improve based on feedback.' },
];

const navIds = ['about', 'skills', 'projects', 'education', 'contact'];

/* ───────────── Hooks ───────────── */

// One shared observer: adds .in to elements as they enter the viewport.
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    if (!('IntersectionObserver' in window)) { els.forEach((el) => el.classList.add('in')); return; }
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

// Scroll state, throttled to one update per animation frame.
function useScrolled() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => { setScrolled(window.scrollY > 10); ticking = false; });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return scrolled;
}

function useActiveSection(ids) {
  const [active, setActive] = useState('');
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) setActive(e.target.id);
    }, { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);
  return active;
}

/* ───────────── Components ───────────── */

function Counter({ value, suffix = '' }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      if (reduce) { setN(value); return; }
      const start = performance.now();
      const tick = (now) => {
        const k = Math.min(1, (now - start) / 1100);
        setN(Math.round(value * (1 - Math.pow(1 - k, 3))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [value]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function ProjectVisual({ type }) {
  if (type === 'employees') return (
    <div className="mock">
      <div className="mock-bar"><span /><span /><span /><b>Employees</b></div>
      <div className="mock-split">
        <div className="mock-nav"><i className="on" /><i /><i /><i /></div>
        <div className="mock-main">
          <div className="mock-cards"><i /><i /><i /></div>
          <div className="mock-rows">{Array.from({ length: 5 }).map((_, k) => <div key={k}><i /><i /><i /></div>)}</div>
        </div>
      </div>
    </div>
  );
  if (type === 'dashboard') return (
    <div className="mock">
      <div className="mock-bar"><span /><span /><span /><b>Projects</b></div>
      <div className="mock-chart">{[45, 70, 55, 85, 62, 92, 74].map((h, k) => <i key={k} style={{ height: `${h}%` }} />)}</div>
      <div className="mock-cards pad"><i /><i /><i /></div>
    </div>
  );
  return (
    <div className="mock">
      <div className="mock-bar"><span /><span /><span /><b>Inventory</b></div>
      <div className="mock-kpis">
        <div><small>Products</small><strong>1,248</strong></div>
        <div><small>Low stock</small><strong className="warn">08</strong></div>
      </div>
      <div className="mock-list">
        {[['Wireless keyboard', 34], ['USB-C hub', 8], ['Monitor stand', 52]].map(([x, u]) => (
          <div key={x}><span>{x}</span><b className={u < 10 ? 'warn' : ''}>{u}</b></div>
        ))}
      </div>
    </div>
  );
}

/* ───────────── App ───────────── */

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const scrolled = useScrolled();
  const active = useActiveSection(navIds);
  useReveal();

  const close = () => setMenuOpen(false);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(profile.email); setCopied(true); setTimeout(() => setCopied(false), 1800); } catch { /* clipboard unavailable */ }
  };

  return (
    <>
      <header className={`nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="container nav-inner">
          <a className="brand" href="#top" onClick={close}>
            <span className="brand-mark">MU</span>
            <span>Muhammad Usman</span>
          </a>
          <button className="menu-btn" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
          <nav className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {navIds.slice(0, 4).map((id) => (
              <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} onClick={close}>
                {id[0].toUpperCase() + id.slice(1)}
              </a>
            ))}
            <a className="btn btn-dark btn-sm" href="#contact" onClick={close}>Contact</a>
          </nav>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section className="hero container">
          <div className="hero-text">
            <p className="badge fade" style={{ '--d': '0s' }}><span className="dot" /> Open to opportunities</p>
            <h1 className="fade" style={{ '--d': '.08s' }}>
              Muhammad Usman
              <span className="hero-role">Oracle APEX Developer</span>
            </h1>
            <p className="lead fade" style={{ '--d': '.16s' }}>
              I build practical, data-driven web applications with Oracle APEX, SQL and PL/SQL, turning everyday business workflows into clean and reliable tools.
            </p>
            <div className="actions fade" style={{ '--d': '.24s' }}>
              <a className="btn btn-dark" href="#projects">View my work <ArrowRight size={17} /></a>
              <a className="btn btn-light" href="#contact">Get in touch</a>
            </div>
            <div className="hero-meta fade" style={{ '--d': '.32s' }}>
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={19} /></a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={19} /></a>
              <a href={`mailto:${profile.email}`} aria-label="Email"><Mail size={19} /></a>
              <span className="divider" />
              <span className="loc"><MapPin size={15} /> {profile.location}</span>
            </div>
          </div>

          <div className="hero-photo fade" style={{ '--d': '.12s' }}>
            <div className="photo-panel">
              <img src={profile.photo} alt="Portrait of Muhammad Usman" width="560" height="618" fetchpriority="high"
                onError={(e) => { e.currentTarget.src = '/usman-photo.jpg'; }} />
            </div>
            <div className="photo-tag">
              <span className="tag-icon"><GraduationCap size={18} /></span>
              <div><small>Studying</small><strong>BSIT, Virtual University</strong></div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="container">
            <div className="split">
              <div className="reveal">
                <p className="eyebrow">About</p>
                <h2>Curious by nature.<br /><span className="soft">Developer by practice.</span></h2>
              </div>
              <div className="reveal prose" style={{ '--d': '.1s' }}>
                <p>I enjoy turning real-world needs into organised, easy-to-use applications. My focus is Oracle APEX, SQL and Oracle PL/SQL, building a strong foundation in database-driven development while completing my degree.</p>
                <p>I care about clean data models, clear workflows and interfaces that make everyday work simpler.</p>
                <a className="link" href={profile.github} target="_blank" rel="noreferrer">See my GitHub <ArrowRight size={16} /></a>
              </div>
            </div>

            <div className="stats">
              {[
                { v: 5, s: '+', l: 'Core technologies' },
                { v: 3, s: '', l: 'Applications' },
                { v: 1, s: '', l: 'Degree in progress' },
              ].map((x, k) => (
                <div className="stat reveal" key={x.l} style={{ '--d': `${k * 0.08}s` }}>
                  <strong><Counter value={x.v} suffix={x.s} /></strong>
                  <span>{x.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section className="section tinted" id="skills">
          <div className="container">
            <div className="head reveal">
              <div>
                <p className="eyebrow">Skills</p>
                <h2>Tools I work with</h2>
              </div>
              <p className="head-note">A focused toolkit for building database-driven web applications.</p>
            </div>

            <div className="skills">
              {skills.map(({ name, detail, icon: Icon, level }, k) => (
                <div className="card skill reveal" key={name} style={{ '--d': `${k * 0.06}s` }}>
                  <span className="icon"><Icon size={20} /></span>
                  <h3>{name}</h3>
                  <p>{detail}</p>
                  <div className="bar"><span style={{ '--w': `${level}%` }} /></div>
                </div>
              ))}
            </div>

            <div className="process">
              {process.map((s, k) => (
                <div className="step reveal" key={s.step} style={{ '--d': `${k * 0.08}s` }}>
                  <span className="step-num">{s.step}</span>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" id="projects">
          <div className="container">
            <div className="head reveal">
              <div>
                <p className="eyebrow">Projects</p>
                <h2>Selected work</h2>
              </div>
              <p className="head-note">Working apps with Oracle SQL and PL/SQL backends — each one has its own GitHub repository.</p>
            </div>

            <div className="projects">
              {projects.map((p, k) => (
                <article className="card project reveal" key={p.number} style={{ '--d': `${k * 0.08}s` }}>
                  <div className={`project-visual v-${p.visual}`}><ProjectVisual type={p.visual} /></div>
                  <div className="project-body">
                    <div className="project-meta"><span>{p.number}</span><span>{p.type}</span></div>
                    <h3>{p.title}</h3>
                    <p>{p.description}</p>
                    <div className="tags">{p.tags.map((t) => <span key={t}>{t}</span>)}</div>
                    <a className="link" href={p.repo} target="_blank" rel="noreferrer">View code on GitHub <ArrowUpRight size={15} /></a>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* EDUCATION */}
        <section className="section tinted" id="education">
          <div className="container split">
            <div className="reveal">
              <p className="eyebrow">Education</p>
              <h2>Learning is part<br />of the process.</h2>
            </div>
            <div className="timeline">
              <div className="card edu reveal" style={{ '--d': '.08s' }}>
                <span className="icon"><GraduationCap size={21} /></span>
                <div>
                  <span className="edu-label">Currently enrolled</span>
                  <h3>Bachelor of Science in Information Technology</h3>
                  <p>Virtual University of Pakistan</p>
                  <span className="pill">In progress</span>
                </div>
              </div>
              <div className="card edu reveal" style={{ '--d': '.16s' }}>
                <span className="icon"><Layers3 size={21} /></span>
                <div>
                  <span className="edu-label">Self-directed</span>
                  <h3>Oracle APEX, SQL &amp; PL/SQL</h3>
                  <p>Hands-on practice through real application builds</p>
                  <span className="pill">Ongoing</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="container">
            <div className="contact reveal">
              <p className="eyebrow light">Contact</p>
              <h2>Let’s build something useful.</h2>
              <p>I’m open to opportunities, collaborations and conversations about thoughtful applications.</p>
              <div className="actions center">
                <a className="btn btn-white" href={`mailto:${profile.email}`}>Send an email <ArrowUpRight size={17} /></a>
                <button className="btn btn-ghost" onClick={copyEmail}>
                  {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy email</>}
                </button>
              </div>
              <div className="contact-links">
                <a href={profile.github} target="_blank" rel="noreferrer"><Github size={17} /> GitHub</a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer"><Linkedin size={17} /> LinkedIn</a>
                <a href={`mailto:${profile.email}`}><Mail size={17} /> {profile.email}</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer container">
        <span>© {new Date().getFullYear()} Muhammad Usman</span>
        <span>Oracle APEX Developer · {profile.location}</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
