import { lazy, Suspense, useEffect, useState, memo } from "react";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "./contexts/ThemeContext";
import { ErrorBoundary } from "./components/ui/ErrorBoundary";

// Intro
import Intro from "./components/Intro";

// Eager load critical components
import { Navbar, Footer } from "./components/ui/Layout";
import { Hero } from "./components/sections/Hero";
import { Loader } from "./components/ui/Loader";

// Lazy load below-the-fold
const About = lazy(() =>
  import("./components/sections/About").then((m) => ({ default: m.About }))
);
const Skills = lazy(() =>
  import("./components/sections/Skills").then((m) => ({ default: m.Skills }))
);
const Projects = lazy(() =>
  import("./components/sections/Projects").then((m) => ({ default: m.Projects }))
);
const Experience = lazy(() =>
  import("./components/sections/Experience").then((m) => ({ default: m.Experience }))
);
const Contact = lazy(() =>
  import("./components/sections/Contact").then((m) => ({ default: m.Contact }))
);
const CustomCursor = lazy(() =>
  import("./components/ui/CustomCursor").then((m) => ({ default: m.CustomCursor }))
);

// Section loader
const SectionLoader = memo(() => (
  <div className="flex items-center justify-center min-h-[200px]">
    <div className="w-6 h-6 border-3 border-indigo-500 border-t-transparent rounded-full animate-spin" />
  </div>
));

SectionLoader.displayName = "SectionLoader";

export function App() {
  // Controls intro + loader
  const [siteReady, setSiteReady] = useState(false);
  const [showLoader, setShowLoader] = useState(false);

  const { isDark, toggleTheme } = useTheme();

  useEffect(() => {
    window.scrollTo(0, 0);

    let triggered = false;

    const handleReady = () => {
      if (triggered) return;
      triggered = true;

      setShowLoader(true);

      setTimeout(() => {
        setSiteReady(true);
        setShowLoader(false);
      }, 600);
    };

    // Listen for descrambler
    window.addEventListener("scrambleDone", handleReady);

    // ⛑️ Fallback after 6s (never get stuck)
    const backup = setTimeout(() => {
      handleReady();
    }, 6000);

    return () => {
      window.removeEventListener("scrambleDone", handleReady);
      clearTimeout(backup);
    };
  }, []);


  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 selection:bg-indigo-500 selection:text-white md:cursor-none transition-colors duration-300">

        {/* Intro Screen */}
        {!siteReady && <Intro />}

        {/* Loader after intro */}
        <AnimatePresence mode="wait">
          {showLoader && <Loader key="loader" />}
        </AnimatePresence>

        {/* Main App */}
        <div
          className={`transition-opacity duration-700 ${
            siteReady ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          {siteReady && (
            <>
              <Suspense fallback={null}>
                <CustomCursor />
              </Suspense>

              <Navbar isDark={isDark} toggleTheme={toggleTheme} />

              <main>
                <Hero />

                <Suspense fallback={<SectionLoader />}>
                  <About />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                  <Skills />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                  <Projects />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                  <Experience />
                </Suspense>

                <Suspense fallback={<SectionLoader />}>
                  <Contact />
                </Suspense>
              </main>

              <Footer />
            </>
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}