
import { useEffect } from 'react';
import Hero from '@/components/hero/Hero';
import DatabaseView from '@/components/database/DatabaseView';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import UserQueryForm from '@/components/database/UserQueryForm';

const Index = () => {
  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <div className="container-tight py-8">
          <UserQueryForm />
        </div>
        <DatabaseView />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
