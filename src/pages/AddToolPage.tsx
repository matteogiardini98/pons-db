
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import AddToolForm from '@/components/tool/AddToolForm';

const AddToolPage = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  
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
        <motion.div className="container-tight p-4 md:p-6 pt-10 max-w-6xl mx-auto" {...pageTransition}>
          <h1 className="text-3xl md:text-4xl font-medium mb-6">{t('addTool.title')}</h1>
          <p className={cn(
            "mb-8 text-lg",
            theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
          )}>
            {t('addTool.description')}
          </p>
          
          <AddToolForm />
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default AddToolPage;
