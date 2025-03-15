
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import DatabaseTableView from '@/components/database/DatabaseTableView';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import BetaBanner from '@/components/ui/beta-banner';

const DatabasePage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const handleAddNewTool = () => {
    navigate('/add-tool');
  };

  return (
    <div className={cn(
      "min-h-screen flex",
      theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
    )}>
      <Sidebar />
      <BetaBanner />
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <div className="p-4 md:p-6 pt-16">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl md:text-3xl font-medium">ai tools database</h1>
            <Button 
              onClick={handleAddNewTool}
              className="flex items-center gap-2"
            >
              <Plus size={16} />
              add new tool
            </Button>
          </div>
        </div>
        <DatabaseTableView />
        <Footer />
      </main>
    </div>
  );
};

export default DatabasePage;
