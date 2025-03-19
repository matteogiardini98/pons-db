
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import AnimatedCard from '@/components/ui/AnimatedCard';

export interface BusinessHeadacheProps {
  quote: string;
  title: string;
  hoverEffect?: 'tilt' | 'glow';
  index: number;
}

const BusinessHeadacheCard = ({ quote, title, hoverEffect = 'tilt', index }: BusinessHeadacheProps) => {
  const { theme } = useTheme();
  
  // Alternate effects for a more dynamic grid
  const effect = hoverEffect || (index % 2 === 0 ? 'tilt' : 'glow');
  const glowColor = theme === 'dark' ? 'rgba(74, 210, 149, 0.15)' : 'rgba(74, 210, 149, 0.2)';
  
  return (
    <AnimatedCard 
      hoverEffect={effect}
      glowColor={glowColor}
      className={cn(
        "h-full",
        theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-200'
      )}
    >
      <div className="p-5">
        <p className={cn(
          "text-sm",
          theme === 'dark' ? 'text-white' : 'text-gray-800'
        )}>
          <span className="italic">"{quote}"</span> <span className="block mt-2 font-bold not-italic">{title}</span>
        </p>
      </div>
    </AnimatedCard>
  );
};

export default BusinessHeadacheCard;
