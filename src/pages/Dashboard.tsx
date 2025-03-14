
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DashboardView from '@/components/dashboard/DashboardView';

const Dashboard = () => {
  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <DashboardView />
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
