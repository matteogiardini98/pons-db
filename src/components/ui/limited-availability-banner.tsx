
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface LimitedAvailabilityBannerProps {
  text?: string;
  className?: string;
}

export const LimitedAvailabilityBanner = ({ 
  text = "Limited to the first 100 responses.",
  className
}: LimitedAvailabilityBannerProps) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={cn(
        "px-6 py-1.5 text-xs rounded-full font-medium shadow-sm text-center w-max mx-auto mb-4",
        theme === 'dark' 
          ? 'bg-emerald-900/60 text-emerald-100 border border-emerald-800/70 backdrop-blur-sm' 
          : 'bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 backdrop-blur-sm',
        className
      )}
    >
      {text}
    </div>
  );
};

export default LimitedAvailabilityBanner;
