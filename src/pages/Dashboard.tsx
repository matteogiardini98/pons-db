
import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import DashboardView from '@/components/dashboard/DashboardView';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import BetaBanner from '@/components/ui/beta-banner';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';
import { useLanguage } from '@/hooks/use-language';

const Dashboard = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();

  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className={cn("min-h-screen flex", theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black')}>
      <Sidebar />
      <BetaBanner />
      {/* Add language switcher in a fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <div className="p-4 md:p-6 pt-16">
          <h1 className="text-2xl md:text-3xl font-medium mb-6">
            {t('dashboard.title')}
          </h1>
        </div>
        <DashboardView />
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
