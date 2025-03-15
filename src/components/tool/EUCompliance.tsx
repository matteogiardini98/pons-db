
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface EUComplianceProps {
  euCompliant: {
    gdpr: boolean;
    dataResidency: boolean;
    aiAct: boolean;
  };
}

const EUCompliance = ({ euCompliant }: EUComplianceProps) => {
  const { theme } = useTheme();

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-4">eu compliance</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className={cn(
          "p-4 rounded-lg",
          theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
        )}>
          <div className="flex items-center mb-2">
            {euCompliant.gdpr ? (
              <Check className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <X className="h-5 w-5 text-red-500 mr-2" />
            )}
            <h4 className="font-medium">gdpr compliant</h4>
          </div>
          <p className={cn(
            "text-sm",
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          )}>
            {euCompliant.gdpr 
              ? 'this tool is gdpr compliant and handles user data according to eu regulations.' 
              : 'this tool is not gdpr compliant or hasn\'t been verified.'}
          </p>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg",
          theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
        )}>
          <div className="flex items-center mb-2">
            {euCompliant.dataResidency ? (
              <Check className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <X className="h-5 w-5 text-red-500 mr-2" />
            )}
            <h4 className="font-medium">eu data residency</h4>
          </div>
          <p className={cn(
            "text-sm",
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          )}>
            {euCompliant.dataResidency 
              ? 'this tool stores data within the eu in compliance with data residency regulations.' 
              : 'this tool may store data outside the eu.'}
          </p>
        </div>
        
        <div className={cn(
          "p-4 rounded-lg",
          theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
        )}>
          <div className="flex items-center mb-2">
            {euCompliant.aiAct ? (
              <Check className="h-5 w-5 text-green-500 mr-2" />
            ) : (
              <X className="h-5 w-5 text-neutral-500 mr-2" />
            )}
            <h4 className="font-medium">ai act compliant</h4>
          </div>
          <p className={cn(
            "text-sm",
            theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
          )}>
            {euCompliant.aiAct
              ? 'this tool complies with the eu ai act regulations.'
              : 'compliance status for the eu ai act is not yet determined for this tool.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EUCompliance;
