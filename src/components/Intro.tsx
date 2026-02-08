import { useEffect } from "react";

// Only HTML structure — NO body, NO script
const BODY_HTML = `
  <div id="main">
    <div class="loader">
      <h2 class="zoom">PORTFOLIO</h2>
      <h1 id="scramble" class="scramble">KARTIK</h1>
      <div class="loading"></div>
    </div>
  </div>
`;

export default function Intro() {
  useEffect(() => {
    let mounted = true;

    // Load CSS
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/intro/style.css";
    document.head.appendChild(css);

    // Helper to load scripts in order
    const loadScript = (src: string) =>
      new Promise<void>((resolve) => {
        const s = document.createElement("script");
        s.src = src;
        s.async = false;
        s.onload = () => resolve();
        document.body.appendChild(s);
      });

    const boot = async () => {
      // Wait for fonts
      await document.fonts.ready;
      if (!mounted) return;

      // Load jQuery
      await loadScript("https://code.jquery.com/jquery-3.7.1.min.js");
      if (!mounted) return;

      // Load GSAP
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/gsap.min.js");
      await loadScript("https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.7/ScrollTrigger.min.js");
      if (!mounted) return;

      // Load intro scripts
      await loadScript("/intro/descrambler.js");
      await loadScript("/intro/script.js");
    };

    boot();

    // Lock scroll
    document.body.style.overflow = "hidden";

    return () => {
      mounted = false;
      document.body.style.overflow = "auto";

      // Remove CSS
      if (document.head.contains(css)) {
        document.head.removeChild(css);
      }
    };
  }, []);

  return (
    <div
      id="intro"
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      dangerouslySetInnerHTML={{ __html: BODY_HTML }}
    />
  );
}
