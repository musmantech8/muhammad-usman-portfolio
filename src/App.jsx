import { useEffect } from 'react';
import { LazyMotion, MotionConfig, domMax } from 'framer-motion';
import { startSmoothScroll } from './lib/smoothScroll';
import { IntroOverlay } from './components/layout/IntroOverlay';
import { ScrollProgress } from './components/layout/ScrollProgress';
import { CustomCursor } from './components/layout/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Process } from './components/sections/Process';
import { Projects } from './components/sections/Projects';
import { Education } from './components/sections/Education';
import { Contact } from './components/sections/Contact';

export default function App() {
  // Lenis smooth scrolling (skipped for reduced motion).
  useEffect(() => startSmoothScroll(), []);

  return (
    // LazyMotion loads only the features we use (keeps the JS small; domMax adds layout animations for the nav pill).
    // MotionConfig "user" turns off transform animations for reduced-motion users.
    <LazyMotion features={domMax}>
      <MotionConfig reducedMotion="user">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[90] focus:rounded-lg focus:bg-accent focus:px-4 focus:py-2 focus:font-semibold focus:text-on-accent"
        >
          Skip to content
        </a>

        <IntroOverlay />
        <ScrollProgress />
        <CustomCursor />
        <Navbar />

        <main id="main">
          <Hero />
          <About />
          <Skills />
          <Process />
          <Projects />
          <Education />
          <Contact />
        </main>

        <Footer />
      </MotionConfig>
    </LazyMotion>
  );
}
