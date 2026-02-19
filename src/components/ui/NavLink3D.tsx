import { useState, memo } from "react";

interface NavLink3DProps {
  href: string;
  children: React.ReactNode;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Premium Vertical Sliding Nav Link
 * - Clean vertical slide reveal animation
 * - No 3D effects, no rotation, no magnetic tracking
 * - Pure translateY transform
 */
export const NavLink3D = memo<NavLink3DProps>(({ href, children, onClick, className = "", style = {} }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      style={{
        display: "inline-block",
        position: "relative",
        overflow: "hidden",
        verticalAlign: "middle",
        ...style,
      }}
    >
      <span
        style={{
          display: "inline-block",
          transform: isHovered ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          willChange: "transform",
        }}
      >
        {children}
      </span>
      
      {/* Second text - positioned below, revealed on hover */}
      <span
        style={{
          display: "inline-block",
          position: "absolute",
          left: 0,
          top: "100%",
          transform: isHovered ? "translateY(-100%)" : "translateY(0)",
          transition: "transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)",
          willChange: "transform",
          whiteSpace: "nowrap",
        }}
      >
        {children}
      </span>
    </a>
  );
});

NavLink3D.displayName = 'NavLink3D';
