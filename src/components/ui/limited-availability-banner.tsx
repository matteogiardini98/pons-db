
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface LimitedAvailabilityBannerProps {
  text?: string;
}

export const LimitedAvailabilityBanner = ({ 
  text = "Limited to the first 100 responses."
}: LimitedAvailabilityBannerProps) => {
  const { theme } = useTheme();
  
  return (
    <div 
      className={cn(
        "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-4 py-1.5 text-xs rounded-full font-medium shadow-sm",
        theme === 'dark' 
          ? 'bg-emerald-900/60 text-emerald-100 border border-emerald-800/70 backdrop-blur-sm' 
          : 'bg-emerald-100/90 text-emerald-800 border border-emerald-200/80 backdrop-blur-sm'
      )}
    >
      {text}
    </div>
  );
};

export default LimitedAvailabilityBanner;
