import { useState } from 'react';

interface AnimatedButtonProps {
  children: string;
  className?: string;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({ children, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span
      className="relative inline-block overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        display: 'inline-block',
        verticalAlign: 'middle'
      }}
    >
      <span
        className={className}
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
        className={className}
        style={{
          position: 'absolute',
          left: 0,
          top: '100%',
          display: 'inline-block',
          whiteSpace: 'nowrap',
          transform: isHovered ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.6s cubic-bezier(0.19, 1, 0.22, 1)',
          willChange: 'transform'
        }}
      >
        {children}
      </span>
    </span>
  );
};
