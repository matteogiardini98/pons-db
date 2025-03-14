
import { MapPin, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface EUComplianceFilterProps {
  isOpen: boolean;
  onToggle: () => void;
  filters: {
    gdpr: boolean;
    dataResidency: boolean;
    aiAct?: boolean;
  };
  onFilterToggle: (type: 'gdpr' | 'dataResidency' | 'aiAct') => void;
  onClear: () => void;
}

const EUComplianceFilter = ({
  isOpen,
  onToggle,
  filters,
  onFilterToggle,
  onClear
}: EUComplianceFilterProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  
  const activeFilterCount = 
    Number(filters.gdpr) + 
    Number(filters.dataResidency) + 
    Number(filters.aiAct || false);

  return (
    <div className="relative">
      <Button 
        variant="outline" 
        size="sm" 
        className={cn("border-neutral-700 gap-2", 
          isDarkMode ? "bg-[#222222] hover:bg-neutral-800" : "bg-white hover:bg-neutral-100",
          isOpen && (isDarkMode ? "bg-neutral-800" : "bg-neutral-100")
        )}
        onClick={onToggle}
      >
        <MapPin size={16} />
        eu-ready
        {activeFilterCount > 0 && (
          <Badge variant={isDarkMode ? "secondary" : "outline"} className="ml-1">
            {activeFilterCount}
          </Badge>
        )}
        <ChevronDown size={14} className={cn(
          "transition-transform",
          isOpen && "transform rotate-180"
        )} />
      </Button>
      
      {isOpen && (
        <div className={cn(
          "absolute mt-1 p-2 rounded-md shadow-lg w-64 z-50",
          isDarkMode ? "bg-[#333333] border border-neutral-700" : "bg-white border border-neutral-200"
        )}>
          <div className="flex justify-between items-center mb-2">
            <h4 className={cn("text-sm font-medium", textColor)}>eu compliance</h4>
            {activeFilterCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm"
                className="h-6 text-xs px-2"
                onClick={onClear}
              >
                clear
              </Button>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="gdpr" 
                checked={filters.gdpr}
                onCheckedChange={() => onFilterToggle('gdpr')}
              />
              <label 
                htmlFor="gdpr"
                className={cn("text-sm cursor-pointer", textColor)}
              >
                gdpr compliant
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="dataResidency" 
                checked={filters.dataResidency}
                onCheckedChange={() => onFilterToggle('dataResidency')}
              />
              <label 
                htmlFor="dataResidency"
                className={cn("text-sm cursor-pointer", textColor)}
              >
                eu data residency
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="aiAct" 
                checked={filters.aiAct || false}
                onCheckedChange={() => onFilterToggle('aiAct')}
              />
              <label 
                htmlFor="aiAct"
                className={cn("text-sm cursor-pointer", textColor)}
              >
                ai act compliant
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EUComplianceFilter;
