import { useRef, useEffect } from "react";
import gsap from "gsap";

interface FontWeightConfig {
  min: number;
  max: number;
  default: number;
}

interface AnimatedTextProps {
  text: string;
  className?: string;
  weightConfig?: FontWeightConfig;
}

const DEFAULT_WEIGHT_CONFIG: FontWeightConfig = {
  min: 400,
  max: 900,
  default: 400,
};

/**
 * Renders text as individual spans for animation
 */
const renderText = (text: string, className: string, baseWeight: number) => {
  return [...text].map((char, i) => (
    <span
      key={i}
      className={className}
      style={{ fontWeight: baseWeight, display: 'inline-block' }}
    >
      {char === " " ? "\u00A0" : char}
    </span>
  ));
};

/**
 * Sets up hover effect that changes font weight based on mouse proximity
 */
const setupTextHover = (
  container: HTMLElement | null,
  weightConfig: FontWeightConfig
) => {
  if (!container) return;

  const letters = container.querySelectorAll("span");
  const { min, max, default: base } = weightConfig;

  const animateLetters = (
    letter: Element,
    weight: number,
    duration: number = 0.25
  ) => {
    // Round to nearest 100 for standard fonts
    const roundedWeight = Math.round(weight / 100) * 100;
    return gsap.to(letter, {
      duration,
      ease: "power2.out",
      fontWeight: roundedWeight,
      overwrite: "auto",
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    const { left } = container.getBoundingClientRect();
    const mouseX = e.clientX - left;

    letters.forEach((letter) => {
      const { left: l, width: w } = letter.getBoundingClientRect();
      const distance = Math.abs(mouseX - (l - left + w / 2));
      const intensity = Math.exp(-(distance ** 2) / 2000);

      animateLetters(letter, min + (max - min) * intensity);
    });
  };

  const handleMouseLeave = () => {
    letters.forEach((letter) => {
      gsap.killTweensOf(letter);
      animateLetters(letter, base, 0.3);
    });
  };

  container.addEventListener("mousemove", handleMouseMove);
  container.addEventListener("mouseleave", handleMouseLeave);

  return () => {
    container.removeEventListener("mousemove", handleMouseMove);
    container.removeEventListener("mouseleave", handleMouseLeave);
  };
};

/**
 * AnimatedText Component
 * Displays text with interactive font weight animation on hover
 * Letters change weight based on mouse proximity using exponential falloff
 */
export const AnimatedText = ({
  text,
  className = "",
  weightConfig = DEFAULT_WEIGHT_CONFIG,
}: AnimatedTextProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cleanup = setupTextHover(textRef.current, weightConfig);

    return () => {
      if (typeof cleanup === "function") cleanup();
    };
  }, [weightConfig]);

  return (
    <div ref={textRef} className={`inline-block ${className}`}>
      {renderText(text, "inline-block", weightConfig.default)}
    </div>
  );
};
