
import { useRef, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: 'tilt' | 'lift' | 'glow' | 'none';
  glowColor?: string;
  isInteractive?: boolean;
}

const AnimatedCard = ({
  children,
  className,
  hoverEffect = 'tilt',
  glowColor = 'rgba(255, 255, 255, 0.1)',
  isInteractive = true
}: AnimatedCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || !isInteractive || hoverEffect === 'none') return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to card center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    if (hoverEffect === 'tilt') {
      // Tilt effect (max 5 degrees)
      const tiltX = -(y / rect.height) * 5;
      const tiltY = (x / rect.width) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    }
    
    if (hoverEffect === 'glow') {
      // Update glow position
      setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      setOpacity(1);
    }
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !isInteractive) return;
    
    const card = cardRef.current;
    
    if (hoverEffect === 'tilt') {
      // Reset tilt
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    }
    
    if (hoverEffect === 'glow') {
      // Fade out glow
      setOpacity(0);
    }
  };

  const getHoverClass = () => {
    if (!isInteractive) return '';
    
    switch(hoverEffect) {
      case 'lift': return 'transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg';
      case 'tilt': return 'transition-transform duration-200';
      case 'glow': return 'transition-shadow duration-200';
      default: return '';
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        'relative overflow-hidden',
        getHoverClass(),
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transition: 'transform 0.2s ease-out',
        willChange: 'transform',
      }}
    >
      {hoverEffect === 'glow' && isInteractive && (
        <div 
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 100px at ${position.x}px ${position.y}px, ${glowColor}, transparent)`,
            width: '100%',
            height: '100%',
            opacity,
            top: 0,
            left: 0,
            zIndex: 1,
          }}
        />
      )}
      
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default AnimatedCard;
