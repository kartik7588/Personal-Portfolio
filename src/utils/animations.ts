/**
 * Animation Utilities
 * Professional-grade animation configurations for GSAP and Framer Motion
 */

import { Variants } from "framer-motion";

// ============================================
// EASING FUNCTIONS
// ============================================

export const easings = {
  // Expo easings for dramatic reveals
  expoOut: [0.19, 1, 0.22, 1],
  expoInOut: [0.87, 0, 0.13, 1],
  
  // Power easings for smooth motion
  power4Out: [0.76, 0, 0.24, 1],
  power3Out: [0.64, 0, 0.35, 1],
  
  // Custom cinematic easings
  cinematic: [0.83, 0, 0.17, 1],
  smoothEntry: [0.25, 0.46, 0.45, 0.94],
  
  // Bounce for playful interactions
  bounce: [0.68, -0.55, 0.265, 1.55],
} as const;

// ============================================
// FRAMER MOTION VARIANTS
// ============================================

/**
 * Fade up animation - Element slides up while fading in
 * Usage: Headings, cards, content blocks
 */
export const fadeUp: Variants = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: easings.expoOut,
    }
  }
};

/**
 * Fade in from left - Horizontal slide with fade
 * Usage: Text content, sidebar elements
 */
export const fadeInLeft: Variants = {
  hidden: { 
    opacity: 0, 
    x: -60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.power4Out,
    }
  }
};

/**
 * Fade in from right - Horizontal slide with fade
 * Usage: Images, cards, feature blocks
 */
export const fadeInRight: Variants = {
  hidden: { 
    opacity: 0, 
    x: 60 
  },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.7,
      ease: easings.power4Out,
    }
  }
};

/**
 * Scale up animation - Element scales from smaller size
 * Usage: Images, icons, focal points
 */
export const scaleUp: Variants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8 
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.power3Out,
    }
  }
};

/**
 * Stagger container - Parent container for staggered children
 * Usage: Wrap around lists, grids, multiple elements
 */
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    }
  }
};

/**
 * Stagger item - Child element in stagger container
 * Usage: Individual items in lists, cards in grid
 */
export const staggerItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: easings.power4Out,
    }
  }
};

/**
 * Reveal from bottom - Content hidden behind mask, reveals upward
 * Usage: Large headings, hero text, section titles
 */
export const revealFromBottom: Variants = {
  hidden: { 
    opacity: 0,
    y: 100,
    clipPath: "inset(100% 0% 0% 0%)"
  },
  visible: { 
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0% 0% 0%)",
    transition: {
      duration: 1.2,
      ease: easings.expoOut,
    }
  }
};

/**
 * Word reveal - Individual word animation for split text
 * Usage: Large display text, animated headlines
 */
export const wordReveal: Variants = {
  hidden: { 
    opacity: 0,
    y: 80,
    rotateX: -90,
  },
  visible: { 
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.8,
      ease: easings.expoOut,
    }
  }
};

/**
 * Blur fade - Element fades in with blur effect
 * Usage: Background elements, overlays, subtle reveals
 */
export const blurFade: Variants = {
  hidden: { 
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: { 
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: easings.smoothEntry,
    }
  }
};

// ============================================
// HOVER ANIMATIONS
// ============================================

/**
 * Lift on hover - Card lifts up with shadow
 * Usage: Project cards, interactive elements
 */
export const hoverLift = {
  rest: { 
    y: 0, 
    scale: 1,
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: { 
    y: -8, 
    scale: 1.02,
    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)",
    transition: {
      duration: 0.3,
      ease: easings.power3Out,
    }
  }
};

/**
 * Scale on hover - Subtle scale increase
 * Usage: Buttons, links, icons
 */
export const hoverScale = {
  rest: { scale: 1 },
  hover: { 
    scale: 1.05,
    transition: {
      duration: 0.2,
      ease: easings.bounce,
    }
  }
};

/**
 * Glow on hover - Adds glow effect
 * Usage: CTA buttons, primary actions
 */
export const hoverGlow = {
  rest: { 
    boxShadow: "0 0 0 0 rgba(99, 102, 241, 0)",
  },
  hover: { 
    boxShadow: "0 0 30px 5px rgba(99, 102, 241, 0.4)",
    transition: {
      duration: 0.3,
    }
  }
};

// ============================================
// GSAP ANIMATION CONFIGS
// ============================================

/**
 * GSAP ScrollTrigger default config
 * Usage: Scroll-based animations
 */
export const scrollTriggerDefaults = {
  start: "top 80%",
  end: "bottom 20%",
  toggleActions: "play none none reverse",
  markers: false, // Set to true for debugging
};

/**
 * GSAP fade up config for ScrollTrigger
 * Usage: gsap.from(element, gsapFadeUp)
 */
export const gsapFadeUp = {
  opacity: 0,
  y: 60,
  duration: 1,
  ease: "expo.out",
  scrollTrigger: {
    ...scrollTriggerDefaults,
  }
};

/**
 * GSAP stagger config
 * Usage: gsap.from(elements, gsapStagger)
 */
export const gsapStagger = {
  opacity: 0,
  y: 40,
  duration: 0.8,
  stagger: 0.15,
  ease: "power4.out",
  scrollTrigger: {
    ...scrollTriggerDefaults,
  }
};

/**
 * GSAP parallax config
 * Usage: Background images, depth layers
 */
export const gsapParallax = {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    scrub: 1,
    start: "top bottom",
    end: "bottom top",
  }
};

/**
 * GSAP scale in config
 * Usage: Image reveals, focal elements
 */
export const gsapScaleIn = {
  scale: 0.8,
  opacity: 0,
  duration: 1.2,
  ease: "power3.out",
  scrollTrigger: {
    ...scrollTriggerDefaults,
  }
};

// ============================================
// TRANSITION PRESETS
// ============================================

/**
 * Page transition variants
 * Usage: Route/page level animations
 */
export const pageTransition: Variants = {
  initial: { 
    opacity: 0,
    y: 20,
  },
  animate: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: easings.power4Out,
      when: "beforeChildren",
      staggerChildren: 0.1,
    }
  },
  exit: { 
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: easings.power3Out,
    }
  }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Split text into words for word-by-word animation
 * Usage: const words = splitTextToWords("Hello World")
 */
export const splitTextToWords = (text: string): string[] => {
  return text.split(" ").filter(word => word.length > 0);
};

/**
 * Calculate stagger delay based on index
 * Usage: const delay = getStaggerDelay(index, 0.1)
 */
export const getStaggerDelay = (index: number, baseDelay: number = 0.1): number => {
  return index * baseDelay;
};

/**
 * Get viewport-based animation config
 * Usage: viewport: getViewportConfig()
 */
export const getViewportConfig = (once: boolean = true, amount: number = 0.3) => ({
  once,
  amount,
  margin: "0px 0px -100px 0px"
});

/**
 * Performance-optimized will-change helper
 * Usage: style={{ willChange: getWillChange(["transform", "opacity"]) }}
 */
export const getWillChange = (properties: string[]): string => {
  return properties.join(", ");
};
