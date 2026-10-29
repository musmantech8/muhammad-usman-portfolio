# Muhammad Usman — Oracle APEX Developer Portfolio

A responsive React + Vite portfolio with a clean, professional white design.

Repository: https://github.com/musmantech8/muhammad-usman-portfolio

## Requirements
- Node.js 18+ (LTS recommended)
- npm

## Run locally
1. Clone this repository and open a terminal inside the project folder.
2. Install packages:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open the local URL shown in the terminal (usually `http://localhost:5173`).

## Profile photo
Your portrait lives in the `public` folder:
- `usman-cutout.webp` — background-removed version used in the hero and contact sections
- `usman-photo.jpg` — original photo (fallback and social-share image)

To change it, replace these files and keep the same names.

## Design & performance
Clean white theme with generous spacing between sections. Motion is kept light for speed:
a short fade-in on load, sections that fade up as you scroll (one shared IntersectionObserver),
skill bars and counters that animate once, and subtle hover lifts. Only `opacity` and `transform`
are animated, there are no blur filters or infinite animations, and everything is switched off
for visitors who prefer reduced motion.

## Customize projects
Open `src/main.jsx` and edit the `projects` array. Project links point to the GitHub profile; replace them with individual repository links as each project is published.

## Build for production
```bash
npm run build
npm run preview
```

## Deploy to Vercel
1. Sign in to Vercel and choose **Add New → Project**.
2. Import this GitHub repository.
3. Framework preset: **Vite** (usually detected automatically).
4. Build command: `npm run build`
5. Output directory: `dist`
6. Click **Deploy**.

No environment variables are required.

## Personal details included
- Name: Muhammad Usman
- Role: Oracle APEX Developer
- Education: BSIT, Virtual University of Pakistan — In progress
- GitHub: https://github.com/musmantech8
- LinkedIn: https://www.linkedin.com/in/muhmmad-usman-364108401/
- Email: muhammadusman.tech8@gmail.com
