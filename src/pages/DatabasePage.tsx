
import { useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import DatabaseTableView from '@/components/database/DatabaseTableView';

const DatabasePage = () => {
  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#111111]">
      <Navbar />
      <main className="flex-grow">
        <DatabaseTableView />
      </main>
      <Footer />
    </div>
  );
};

export default DatabasePage;
