
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = ({ searchTerm, onSearchChange }: SearchBarProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const mutedTextColor = isDarkMode ? 'text-neutral-400' : 'text-neutral-500';

  return (
    <div className="relative flex-grow max-w-lg">
      <Search className={cn("absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4", mutedTextColor)} />
      <Input
        type="search"
        placeholder="Search for AI tools..."
        className={cn("pl-10", 
          isDarkMode 
            ? "bg-[#333333] border-neutral-700 text-white" 
            : "bg-white border-neutral-200 text-black"
        )}
        value={searchTerm}
        onChange={onSearchChange}
      />
    </div>
  );
};

export default SearchBar;
