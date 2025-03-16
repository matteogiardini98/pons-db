
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface ActiveFilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const ActiveFilterBadge = ({ label, onRemove }: ActiveFilterBadgeProps) => (
  <Badge variant="secondary" className="gap-1">
    {label}
    <button onClick={onRemove} className="ml-1 hover:text-destructive">
      <X size={12} />
    </button>
  </Badge>
);

export default ActiveFilterBadge;
