import { useState, ReactNode } from 'react';

interface AnimatedIconProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export const AnimatedIcon: React.FC<AnimatedIconProps> = ({ children, href, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      className={`relative inline-block overflow-hidden ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    >
      <span
        style={{
          display: 'inline-block',
          transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
          willChange: 'transform'
        }}
      >
        {children}
      </span>
      <span
        style={{
          position: 'absolute',
          left: '50%',
          top: '100%',
          transform: `translateX(-50%) ${isHovered ? 'translateY(-100%)' : 'translateY(0)'}`,
          transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
          willChange: 'transform',
          display: 'inline-block'
        }}
      >
        {children}
      </span>
    </a>
  );
};
