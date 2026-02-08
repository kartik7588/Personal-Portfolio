# Intro Integration Guide

## Purpose
This guide helps you integrate and customize the portfolio sections quickly without breaking animations, layout, or theme behavior.

## Project Structure
- src/components/sections/: Page sections (Hero, About, Skills, Projects, Experience, Contact).
- src/components/ui/: Layout, Navbar, Footer, shared UI.
- src/components/3d/: 3D hero scene components.
- src/utils/: Animation and performance utilities.
- src/data/portfolio.ts: Content data (projects, skills, experience).

## Key Integration Points
1. **Edit content**
   - Update projects, skills, and experience in src/data/portfolio.ts.

2. **Hero section**
   - Adjust text and CTA in src/components/sections/Hero.tsx.
   - Resume link is a direct download (download attribute).

3. **Navbar behavior**
   - Smooth scrolling logic is in src/components/ui/Layout.tsx.
   - Hash is removed after navigation to avoid persistent URL fragments.

4. **3D scene**
   - The scene is lazy-loaded in Hero.tsx.
   - Optimized render logic is in src/components/3d/HeroScene.optimized.tsx.

5. **Theming**
   - Theme is applied via the ThemeContext and HTML class.
   - Theme flash is prevented in index.html.

## Deployment Notes
- Vite build output lives in dist/.
- Use 
pm run build and 
pm run preview before deployment.

