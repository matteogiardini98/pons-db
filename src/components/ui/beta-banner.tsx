
import React from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

export const BetaBanner = () => {
  const { theme } = useTheme();
  
  return (
    <div className={cn(
      "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-3 py-1 text-xs rounded-full font-medium shadow-sm",
      theme === 'dark' 
        ? 'bg-neutral-800 text-white border border-neutral-700' 
        : 'bg-neutral-100 text-black border border-neutral-200'
    )}>
      beta
    </div>
  );
};

export default BetaBanner;
