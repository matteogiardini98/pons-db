
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface FilterDropdownProps {
  title: string;
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
  options: string[];
  selectedOptions: string[];
  onOptionToggle: (option: string) => void;
  onClear: () => void;
}

const FilterDropdown = ({
  title,
  icon,
  isOpen,
  onToggle,
  options,
  selectedOptions,
  onOptionToggle,
  onClear
}: FilterDropdownProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';

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
        {icon}
        {title}
        {selectedOptions.length > 0 && (
          <Badge variant={isDarkMode ? "secondary" : "outline"} className="ml-1">
            {selectedOptions.length}
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
            <h4 className={cn("text-sm font-medium", textColor)}>{title}s</h4>
            {selectedOptions.length > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 text-xs px-2"
                onClick={onClear}
              >
                Clear
              </Button>
            )}
          </div>
          <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox 
                  id={`${title.toLowerCase()}-${option}`} 
                  checked={selectedOptions.includes(option)}
                  onCheckedChange={() => onOptionToggle(option)}
                />
                <label 
                  htmlFor={`${title.toLowerCase()}-${option}`}
                  className={cn("text-sm cursor-pointer", textColor)}
                >
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
