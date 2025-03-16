
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface ToolDetailErrorProps {
  onBack: () => void;
}

const ToolDetailError = ({ onBack }: ToolDetailErrorProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className={cn(
      "min-h-screen flex",
      isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-black'
    )}>
      <Sidebar />
      <main className="flex-grow pl-16 md:pl-64 pt-16 container-tight p-6">
        <div className="text-center py-12">
          <h2 className="text-2xl font-medium mb-4">tool not found</h2>
          <p className={cn(
            "mb-6",
            isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
          )}>
            the tool you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            back to database
          </Button>
        </div>
      </main>
    </div>
  );
};

export default ToolDetailError;
