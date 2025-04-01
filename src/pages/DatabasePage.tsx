
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import DatabaseTableView from '@/components/database/DatabaseTableView';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const DatabasePage = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAddNewTool = () => {
    navigate('/add-tool');
  };

  return (
    <div className={cn("min-h-screen flex", theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black')}>
      <Sidebar />
      {/* Add language switcher in a fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main className="flex-grow pl-16 md:pl-64">
        <div className="container-tight p-4 md:p-6 pt-10 max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-medium mb-6">{t('database.title')}</h1>
          
          <DatabaseTableView />
          <div className="flex justify-center mt-8 mb-16">
            <Button 
              onClick={handleAddNewTool} 
              className="flex items-center gap-2"
              variant="cta"
            >
              <Plus size={16} />
              {t('database.addNewTool')}
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
};

export default DatabasePage;
