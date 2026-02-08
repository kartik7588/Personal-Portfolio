# Animated Portfolio

---

##  Live Preview


🔗 <a href="https://kartik-portfolio.vercel.app" target="_blank">Visit Live Website</a>


---

A modern developer portfolio built with React, Vite, and Tailwind CSS. It features a 3D hero scene, smooth motion effects, a dark/light theme, and polished sections for projects, skills, and experience.

**Features**
- 3D hero scene using `@react-three/fiber` and `three`.
- Motion-driven UI with `framer-motion` and `gsap`.
- Dark/light theme with persistence and no flash on load.
- Optimized sections for projects, skills, and experience.
- Smooth scrolling navigation with hash cleanup.

**Tech Stack**
- React 19, Vite 7, TypeScript
- Tailwind CSS 4
- Framer Motion, GSAP
- Three.js + React Three Fiber/Drei

**Getting Started**
1. Install dependencies:
   - `npm install`
2. Run the dev server:
   - `npm run dev`
3. Build for production:
   - `npm run build`
4. Preview the production build:
   - `npm run preview`

**Project Structure**
- `src/components/sections/`: Hero, About, Skills, Projects, Experience, Contact.
- `src/components/3d/`: 3D hero scene components.
- `src/components/ui/`: Layout, Navbar, Footer.
- `src/data/portfolio.ts`: Content data for projects, skills, and experience.
- `public/`: Static assets and favicons.

**Customization**
- Update project data in `src/data/portfolio.ts`.
- Adjust hero text and buttons in `src/components/sections/Hero.tsx`.
- Modify nav links and behavior in `src/components/ui/Layout.tsx`.

**Notes**
- Resume download is wired in the Hero CTA.
- Favicons are multi-size PNGs for sharper tabs.

