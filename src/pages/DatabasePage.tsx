
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import DatabaseTableView from '@/components/database/DatabaseTableView';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Button } from '@/components/ui/button';
import { Plus, PanelLeftClose } from 'lucide-react';
import BetaBanner from '@/components/ui/beta-banner';
import { Switch } from '@/components/ui/switch';
import { useState } from 'react';

const DatabasePage = () => {
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddNewTool = () => {
    navigate('/add-tool');
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <div className={cn("min-h-screen flex", theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black')}>
      <Sidebar collapsed={sidebarCollapsed} />
      <main className={cn("flex-grow transition-all duration-300 ease-in-out", sidebarCollapsed ? "pl-16" : "pl-16 md:pl-64")}>
        <div className="p-4 md:p-6 pt-10">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl md:text-3xl font-medium"></h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">{theme === 'dark' ? 'dark' : 'light'}</span>
                <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} />
              </div>
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleSidebar} 
                className="h-8 w-8"
              >
                <PanelLeftClose className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
        <DatabaseTableView />
        <div className="flex justify-center mt-8 mb-16">
          <Button onClick={handleAddNewTool} className="flex items-center gap-2">
            <Plus size={16} />
            add new tool
          </Button>
        </div>
        <BetaBanner />
        <Footer />
      </main>
    </div>
  );
};

export default DatabasePage;
