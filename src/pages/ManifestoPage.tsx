
import { motion } from 'framer-motion';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const ManifestoPage = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const isDarkMode = theme === 'dark';
  
  return (
    <div className={cn("min-h-screen flex", isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-black')}>
      <Sidebar />
      {/* Add language switcher in a fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <motion.div className="container-tight p-4 md:p-6 pt-10 max-w-6xl mx-auto" {...pageTransition}>
          <h1 className="text-3xl md:text-4xl font-medium mb-6">{t('manifesto.title')}</h1>

          <div className={cn("rounded-lg border p-8 mb-8 prose max-w-none", isDarkMode ? 'bg-[#222222] border-neutral-700 prose-invert' : 'bg-white border-neutral-200 shadow-sm')}>
            <h2 className="font-medium text-xl md:text-2xl mb-6">{t('manifesto.subtitle')}</h2>
            
            <p className={cn("mb-6 leading-relaxed", isDarkMode ? 'text-neutral-300' : 'text-neutral-700')}>
              {t('manifesto.introduction')}
            </p>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">{t('manifesto.gapTitle')}</h3>
              <p className={cn("mb-4 leading-relaxed", isDarkMode ? 'text-neutral-300' : 'text-neutral-700')}>
                {t('manifesto.gapContent')}
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">{t('manifesto.noiseTitle')}</h3>
              <p className={cn("mb-4 leading-relaxed", isDarkMode ? 'text-neutral-300' : 'text-neutral-700')}>
                {t('manifesto.noiseContent')}
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">{t('manifesto.databaseTitle')}</h3>
              <p className={cn("mb-4 leading-relaxed", isDarkMode ? 'text-neutral-300' : 'text-neutral-700')}>
                {t('manifesto.databaseContent')}
              </p>
            </section>
          </div>
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default ManifestoPage;
