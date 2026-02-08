import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { lazy, Suspense } from "react";
import resume from "../../uploads/resume.pdf";
import { useSplitText } from "../../utils/useAnimations";
import { wordReveal, easings, hoverGlow, hoverScale } from "../../utils/animations";

// Lazy load 3D scene with proper error boundary handling
const HeroScene = lazy(() => 
  import("../3d/HeroScene.optimized").then(m => ({ default: m.HeroScene }))
);

// Fallback for 3D scene loading
const SceneLoader = () => (
  <div className="absolute inset-0 z-0 bg-linear-to-b from-indigo-500/10 to-purple-500/10" />
);

/**
 * Hero Section with Cinematic Animations
 * - Word-by-word title reveal with 3D rotation
 * - Smooth fade-in for description
 * - Staggered button appearance with hover effects
 * - Floating scroll indicator
 * - GPU-accelerated transforms
 */
export const Hero = () => {
  const titleWords = useSplitText("Building The");
  const gradientWords = useSplitText("Future Web");

  return (
    <section id="hero" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* 3D Canvas Background - Lower z-index and positioned below */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Suspense fallback={<SceneLoader />}>
          <HeroScene />
        </Suspense>
      </div>
      
      {/* Animated gradient orbs in background */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, ease: easings.expoOut }}
        className="absolute top-20 right-20 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none z-5"
        style={{ willChange: "transform, opacity" }}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 2, delay: 0.3, ease: easings.expoOut }}
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl pointer-events-none z-5"
        style={{ willChange: "transform, opacity" }}
      />
      
      {/* Content container - Higher z-index to sit above canvas */}
      <div className="relative z-20 text-center px-4 w-full max-w-5xl mx-auto pointer-events-auto">
        {/* Animated title with word-by-word reveal */}
        <div className="mb-6 overflow-hidden pr-4 pb-2">
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter">
            <div className="mb-2 text-zinc-900 dark:text-white">
              {titleWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.3 + index * 0.1,
                    duration: 0.8,
                    ease: easings.expoOut,
                  }}
                  className="inline-block mr-4"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <div className="block">
              {gradientWords.map((word, index) => (
                <motion.span
                  key={index}
                  variants={wordReveal}
                  initial="hidden"
                  animate="visible"
                  transition={{
                    delay: 0.5 + titleWords.length * 0.1 + index * 0.1,
                    duration: 0.8,
                    ease: easings.expoOut,
                  }}
                  className="inline-block mr-4 hero-gradient-text"
                  style={{ willChange: "transform, opacity" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </h1>
        </div>

        {/* Description with blur fade */}
        <motion.p
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ 
            delay: 1.2, 
            duration: 1, 
            ease: easings.smoothEntry 
          }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed"
          style={{ willChange: "transform, opacity, filter" }}
        >
          Full-stack Developer and CS Engineering student building clean, 
          scalable web applications with a focus on performance and system design.
        </motion.p>

        {/* CTA buttons with stagger and hover effects */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <motion.a
            href="#projects"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 1.6, 
              duration: 0.6, 
              ease: easings.bounce 
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 30px 5px rgba(99, 102, 241, 0.4)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center gap-2 group"
            style={{ willChange: "transform" }}
          >
            View Projects
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: easings.smoothEntry 
              }}
            >
              →
            </motion.span>
          </motion.a>

          <motion.a
            href={resume}
            download
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: 1.75, 
              duration: 0.6, 
              ease: easings.bounce 
            }}
            whileHover={{ 
              scale: 1.05,
              borderColor: "rgba(99, 102, 241, 1)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border-2 border-zinc-300 dark:border-zinc-700 text-zinc-700 dark:text-zinc-300 rounded-full font-bold transition-all flex items-center gap-2"
            style={{ willChange: "transform" }}
          >
            Resume
          </motion.a>
        </motion.div>
      </div>

      {/* Animated scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1, ease: easings.expoOut }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ 
            y: [0, 12, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 2,
            ease: easings.smoothEntry,
          }}
          className="cursor-pointer"
        >
          <ArrowDown className="text-zinc-400 dark:text-zinc-600" size={28} />
        </motion.div>
      </motion.div>
    </section>
  );
};
