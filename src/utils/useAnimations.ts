/**
 * Custom React Hooks for Animations
 * Reusable animation logic with GSAP ScrollTrigger
 */

import { useEffect, useRef, RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * useScrollReveal
 * Reveals element on scroll with GSAP ScrollTrigger
 * 
 * @param options - Animation configuration
 * @returns ref - Attach to element you want to animate
 * 
 * @example
 * const ref = useScrollReveal({ y: 60, duration: 1 });
 * <div ref={ref}>Animated content</div>
 */
export const useScrollReveal = <T extends HTMLElement>(
  options: gsap.TweenVars = {}
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.from(element, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
        ...options,
      });
    });

    return () => ctx.revert();
  }, [options]);

  return ref;
};

/**
 * useStaggerReveal
 * Reveals multiple children with stagger effect
 * 
 * @param stagger - Delay between each child (default: 0.1)
 * @param childSelector - CSS selector for children (default: "> *")
 * @returns ref - Attach to parent container
 * 
 * @example
 * const ref = useStaggerReveal(0.15, ".card");
 * <div ref={ref}><div class="card">...</div></div>
 */
export const useStaggerReveal = <T extends HTMLElement>(
  stagger: number = 0.1,
  childSelector: string = "> *"
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const children = element.querySelectorAll(childSelector);

    const ctx = gsap.context(() => {
      gsap.from(children, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: stagger,
        ease: "power4.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [stagger, childSelector]);

  return ref;
};

/**
 * useParallax
 * Creates parallax scroll effect on element
 * 
 * @param speed - Parallax speed (default: 0.5, range: 0-1)
 * @returns ref - Attach to element for parallax effect
 * 
 * @example
 * const ref = useParallax(0.3);
 * <img ref={ref} src="..." alt="Parallax background" />
 */
export const useParallax = <T extends HTMLElement>(
  speed: number = 0.5
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(element, {
        yPercent: -50 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [speed]);

  return ref;
};

/**
 * useCountUp
 * Animates number from 0 to target value on scroll
 * 
 * @param target - Target number to count to
 * @param duration - Animation duration in seconds (default: 2)
 * @returns [ref, count] - ref for trigger element, count for display
 * 
 * @example
 * const [ref, count] = useCountUp(100, 2);
 * <div ref={ref}>{Math.round(count)}</div>
 */
export const useCountUp = (
  target: number,
  duration: number = 2
): [RefObject<HTMLElement>, number] => {
  const ref = useRef<HTMLElement>(null);
  const countRef = useRef({ value: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      gsap.to(countRef.current, {
        value: target,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [target, duration]);

  return [ref, countRef.current.value];
};

/**
 * useScrollProgress
 * Tracks scroll progress of an element (0-1)
 * Useful for progress bars, scroll indicators
 * 
 * @returns [ref, progress] - ref for tracked element, progress value
 * 
 * @example
 * const [ref, progress] = useScrollProgress();
 * <section ref={ref}>
 *   <div style={{ width: `${progress * 100}%` }} />
 * </section>
 */
export const useScrollProgress = (): [
  RefObject<HTMLElement>,
  { value: number }
] => {
  const ref = useRef<HTMLElement>(null);
  const progressRef = useRef({ value: 0 });

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: element,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          progressRef.current.value = self.progress;
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return [ref, progressRef.current];
};

/**
 * useSplitText
 * Splits text into individual words/chars for animation
 * (Client-side only - returns original text on server)
 * 
 * @param text - Text to split
 * @param type - Split by "words" or "chars"
 * @returns Array of split text elements
 * 
 * @example
 * const words = useSplitText("Hello World", "words");
 * {words.map((word, i) => <span key={i}>{word}</span>)}
 */
export const useSplitText = (
  text: string,
  type: "words" | "chars" = "words"
): string[] => {
  if (type === "words") {
    return text.split(" ").filter((word) => word.length > 0);
  } else {
    return text.split("");
  }
};

/**
 * useGSAPContext
 * Creates a GSAP context for automatic cleanup
 * Use for complex multi-element animations
 * 
 * @returns [ref, ctx] - Container ref and GSAP context function
 * 
 * @example
 * const [ref, animate] = useGSAPContext();
 * 
 * useEffect(() => {
 *   animate(() => {
 *     gsap.from(".element", { ... });
 *   });
 * }, [animate]);
 * 
 * <div ref={ref}>...</div>
 */
export const useGSAPContext = <T extends HTMLElement>(): [
  RefObject<T>,
  (fn: () => void) => void
] => {
  const ref = useRef<T>(null);
  const ctxRef = useRef<gsap.Context | null>(null);

  const animate = (fn: () => void) => {
    if (!ref.current) return;

    if (ctxRef.current) {
      ctxRef.current.revert();
    }

    ctxRef.current = gsap.context(() => {
      fn();
    }, ref);
  };

  useEffect(() => {
    return () => {
      if (ctxRef.current) {
        ctxRef.current.revert();
      }
    };
  }, []);

  return [ref, animate];
};

/**
 * useImageReveal
 * Creates a mask reveal effect for images
 * Image slides in from behind a mask
 * 
 * @param direction - Reveal direction: "up", "down", "left", "right"
 * @returns ref - Attach to image container
 * 
 * @example
 * const ref = useImageReveal("up");
 * <div ref={ref} style={{ overflow: "hidden" }}>
 *   <img src="..." />
 * </div>
 */
export const useImageReveal = <T extends HTMLElement>(
  direction: "up" | "down" | "left" | "right" = "up"
): RefObject<T> => {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    const image = element.querySelector("img");

    if (!image) return;

    const getInitialPosition = () => {
      switch (direction) {
        case "up":
          return { y: 100, clipPath: "inset(100% 0% 0% 0%)" };
        case "down":
          return { y: -100, clipPath: "inset(0% 0% 100% 0%)" };
        case "left":
          return { x: 100, clipPath: "inset(0% 0% 0% 100%)" };
        case "right":
          return { x: -100, clipPath: "inset(0% 100% 0% 0%)" };
      }
    };

    const ctx = gsap.context(() => {
      gsap.from(image, {
        ...getInitialPosition(),
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(image, {
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });
    });

    return () => ctx.revert();
  }, [direction]);

  return ref;
};

/**
 * useHoverScale
 * Adds smooth scale effect on hover
 * GPU-accelerated for performance
 * 
 * @param scale - Scale amount (default: 1.05)
 * @returns [ref, isHovered] - Element ref and hover state
 * 
 * @example
 * const [ref, isHovered] = useHoverScale(1.1);
 * <div ref={ref}>Hover me</div>
 */
export const useHoverScale = <T extends HTMLElement>(
  scale: number = 1.05
): [RefObject<T>, boolean] => {
  const ref = useRef<T>(null);
  const isHoveredRef = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      gsap.to(element, {
        scale: scale,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    element.addEventListener("mouseenter", handleMouseEnter);
    element.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      element.removeEventListener("mouseenter", handleMouseEnter);
      element.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [scale]);

  return [ref, isHoveredRef.current];
};
