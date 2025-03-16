
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const FilterChip = ({ label, selected, onClick }: FilterChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors",
      selected
        ? "bg-pons-green text-white" // Keep the selected state green
        : "bg-secondary text-muted-foreground hover:bg-pons-green hover:text-white" // Add hover effect to turn green
    )}
  >
    {selected && <Check className="mr-1 h-3 w-3" />}
    {label}
  </button>
);

export default FilterChip;
