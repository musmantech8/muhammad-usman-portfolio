# Muhammad Usman — Oracle APEX Developer Portfolio

A premium, animated personal site built with **Vite + React**, **Tailwind CSS**, **Framer Motion** and **Lenis** smooth scrolling.
Dark mode by default, with a light-mode toggle. Live at https://muhammad-usman-portfolio-one.vercel.app

Repository: https://github.com/musmantech8/muhammad-usman-portfolio

## Requirements
- Node.js 18+ (LTS recommended)
- npm

## Run locally
```bash
npm install
npm run dev
```
Open the URL shown in the terminal (usually `http://localhost:5173`).

## Build
```bash
npm run build
npm run preview
```

## Project structure
```
src/
  content/content.js        ← ALL text, links, projects, education (edit this)
  styles/tokens.css         ← colour tokens (dark default + light), accent colour
  styles/index.css          ← Tailwind theme, base styles, reusable classes
  App.jsx                   ← page order: Hero → About → Skills → Process → Projects → Education → Contact → Footer
  components/layout/        ← Navbar, Footer, IntroOverlay, ScrollProgress, CustomCursor
  components/sections/      ← Hero, About, Skills, Process, Projects, Education, Contact
  components/showcase/      ← project cards, HTML/CSS mock UIs, PL/SQL code peek
  components/ui/            ← reusable motion pieces (Reveal, Magnetic, SpotlightCard, Counter)
  hooks/                    ← useTheme, useTypewriter
  lib/                      ← Lenis smooth scroll, PL/SQL highlighter, device checks
public/
  usman-headshot.webp       ← profile photo (used in the hero)
  usman-headshot.jpg        ← same photo as JPG fallback and social-share image
  favicon.svg               ← "MU" monogram
  cv.pdf                    ← YOUR CV (add this file, see below)
```

## Edit content
Everything you read on the site is in **`src/content/content.js`**: your name, tagline, links,
about text, stats, skills, process steps, projects, education and contact copy.
Change the text there and save. No layout code needs to change.

## Add a project
1. In `src/content/content.js`, add an object to the `projects` array:
   ```js
   {
     number: '04',
     title: 'My New App',
     type: 'Business application',
     description: 'One or two sentences about what it does.',
     tags: ['Oracle SQL', 'PL/SQL'],
     visual: 'inventory',              // 'employees' | 'dashboard' | 'inventory'
     repo: 'https://github.com/musmantech8/my-new-app',
     demo: null,                       // or a URL to show a "Live demo" button
     code: {
       caption: 'package.procedure — what this snippet shows',
       snippet: `PROCEDURE do_something IS BEGIN NULL; END;`,
     },
   },
   ```
2. Use `visual` to choose one of the three mock previews, or add a new one in
   `src/components/showcase/ProjectMock.jsx`.
3. Keep the `snippet` short and illustrative (it is not the full source).

## Add certifications
In `content.js`, fill the `certifications` array:
```js
export const certifications = [
  { title: 'Oracle APEX Developer Associate', issuer: 'Oracle', year: '2026' },
];
```
While the array is empty, the Education section shows a "Coming soon" slot.

## Replace the photo
Replace `public/usman-headshot.webp` and `public/usman-headshot.jpg`, keeping the same names.
Keep the same aspect ratio (4:5). Update `profile.photo.width` and `height` in `content.js` if the size changes.

## Add your CV
Put your CV at `public/cv.pdf`. The navbar and mobile menu's **Download CV** button serves that file.
Until the file exists, that button will not download a PDF.

## Change the accent colour or theme
Colours live in **`src/styles/tokens.css`**. The accent (`--accent`) is `#F04E23`.
Dark is the default. The toggle is saved in the visitor's browser, and when nothing is saved the
site follows the device's light/dark setting (dark unless the device asks for light).

## Motion and accessibility
- One easing curve everywhere: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Respects `prefers-reduced-motion`: parallax, tilt, the custom cursor and counters are turned off,
  and content stays visible.
- The custom cursor and tilt are desktop-only (fine pointer). Touch devices don't get them.
- The intro (MU monogram) plays once per browser, and not at all for reduced motion.

## Deploy to Vercel
1. Push this folder to the GitHub repository (see below).
2. In Vercel, choose **Add New → Project** and import the repository.
3. Framework preset: **Vite** (detected automatically).
4. Build command: `npm run build`. Output directory: `dist`.
5. Click **Deploy**. Pushes to `main` redeploy automatically.

No environment variables are needed.

## Push changes to GitHub
```bash
git add .
git commit -m "Describe the change"
git push
```

## Personal details included
- Name: Muhammad Usman
- Role: Oracle APEX Developer (based in Pakistan), open to opportunities
- Education: BS Information Technology, Virtual University of Pakistan (in progress)
- Email: muhammadusman.tech8@gmail.com
- GitHub: https://github.com/musmantech8
- LinkedIn: https://www.linkedin.com/in/muhmmad-usman-364108401/
