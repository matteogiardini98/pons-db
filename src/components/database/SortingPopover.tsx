
import { ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const SortingPopover = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="flex items-center gap-1">
          Sort by
          <ChevronDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1">
        <div className="space-y-1">
          <Button variant="ghost" className="w-full justify-start font-normal text-sm">Relevance</Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-sm">Name (A-Z)</Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-sm">Newest First</Button>
          <Button variant="ghost" className="w-full justify-start font-normal text-sm">Rating (High to Low)</Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default SortingPopover;
