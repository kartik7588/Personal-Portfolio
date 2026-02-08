# Stabilization Guide

## Goals
- Keep hero 3D stable during theme changes.
- Prevent layout shift and flashing.
- Ensure smooth animations without blocking content.

## Applied Improvements
- Lazy-loaded heavy sections.
- Reduced animation conflicts between GSAP and Framer Motion.
- Hero gradient text fallback for browser compatibility.
- Smooth scrolling with URL hash cleanup.

## Performance Tips
- Keep large images in public/ and use optimized sizes.
- Avoid nested heavy animations in a single view.
- Use will-change sparingly.

