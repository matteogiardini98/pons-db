
import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import DashboardView from '@/components/dashboard/DashboardView';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const Dashboard = () => {
  const { theme } = useTheme();

  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={cn(
      "min-h-screen flex",
      theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
    )}>
      <Sidebar />
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <DashboardView />
        <Footer />
      </main>
    </div>
  );
};

export default Dashboard;
