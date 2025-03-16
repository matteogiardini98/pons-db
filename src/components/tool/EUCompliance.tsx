
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface EUComplianceProps {
  euCompliant: {
    gdpr: boolean;
    dataResidency: boolean;
    aiAct?: boolean;
  };
}

const EUCompliance = ({ euCompliant }: EUComplianceProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  // Create compliance badges
  const complianceBadges = [
    { key: 'gdpr', label: euCompliant.gdpr ? 'gdpr compliant' : 'not gdpr compliant', isActive: euCompliant.gdpr },
    { key: 'data-res', label: euCompliant.dataResidency ? 'eu data residency' : 'no eu data residency', isActive: euCompliant.dataResidency },
    { key: 'ai-act', label: euCompliant.aiAct ? 'ai act compliant' : 'ai act status unknown', isActive: euCompliant.aiAct }
  ];

  return (
    <div className="mt-8">
      <h3 className="text-xl font-medium mb-4">eu compliance</h3>
      <div className="flex flex-wrap gap-2">
        {complianceBadges.map((badge) => (
          <Badge 
            key={badge.key} 
            variant="outline" 
            className={cn(
              "bg-transparent border-neutral-600",
              badge.isActive 
                ? "border-green-500 text-green-500" // Highlight active badges in green
                : isDarkMode ? "text-white" : "text-black"
            )}
          >
            {badge.label.toLowerCase()}
          </Badge>
        ))}
      </div>
    </div>
  );
};

export default EUCompliance;
