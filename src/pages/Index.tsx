
import { useEffect } from 'react';
import Hero from '@/components/hero/Hero';
import DatabaseView from '@/components/database/DatabaseView';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const Index = () => {
  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {/* Add language switcher in a fixed position for Index page */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main className="flex-grow">
        <Hero />
        <DatabaseView />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
