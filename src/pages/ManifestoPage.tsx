
import { motion } from 'framer-motion';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { ImageOff, X, ArrowDown } from 'lucide-react';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';

const ManifestoPage = () => {
  const { theme } = useTheme();
  const [logoError, setLogoError] = useState(false);
  const isDarkMode = theme === 'dark';
  
  const logoUrl = isDarkMode 
    ? '/lovable-uploads/0b439e01-d1aa-4e14-b75d-00cc947f78ef.png'
    : '/lovable-uploads/649e008f-f511-4467-97e6-d658be7b73e6.png';

  const handleImageError = () => {
    setLogoError(true);
    console.error("Logo image failed to load:", logoUrl);
  };

  return (
    <div className={cn(
      "min-h-screen flex",
      isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-black'
    )}>
      <Sidebar />
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <motion.div 
          className="container-tight p-4 md:p-6 pt-16 max-w-4xl mx-auto"
          {...pageTransition}
        >
          <div className="flex flex-col items-center mb-12">
            {logoError ? (
              <div className="h-16 w-16 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded-full mb-4">
                <ImageOff className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} />
              </div>
            ) : (
              <img 
                src={logoUrl} 
                alt="pons logo" 
                className="h-16 w-auto mb-4"
                onError={handleImageError}
              />
            )}
            <h1 className="text-3xl md:text-4xl font-medium text-center">
              manifesto
            </h1>
          </div>

          <div className={cn(
            "rounded-lg border p-8 mb-8 prose max-w-none",
            isDarkMode 
              ? 'bg-[#222222] border-neutral-700 prose-invert' 
              : 'bg-white border-neutral-200 shadow-sm'
          )}>
            <h2 className="font-medium text-xl md:text-2xl mb-6">pons,</h2>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">the ai adoption gap (why)</h3>
              <p className={cn(
                "mb-4 leading-relaxed",
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              )}>
                the fast pace and directionless innovation coming from silicon valley creates an adoption gap between 
                the state of the art ai solutions that are being developed and what smbs are actually adopting in europe. 
                many general purpose ai tools are being developed without concrete consideration on the business problems 
                they could solve. they are too far from reality, at least in europe, with its regional nuances and specific 
                priorities.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">a lot of noise (what)</h3>
              <p className={cn(
                "mb-4 leading-relaxed",
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              )}>
                there is clearly an opportunity out there for smbs to leverage ai. they will be able to do more with the 
                same resources, multiply their capabilities and empower their employees to reach heights they never have. 
                but, where should they start? there are hundreds of tools out there, many overhyped that create a lot of 
                noise, overwhelming entrepreneurs and their organizations.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">an open-source database (how)</h3>
              <p className={cn(
                "mb-4 leading-relaxed",
                isDarkMode ? 'text-neutral-300' : 'text-neutral-700'
              )}>
                the first step to solve this adoption gap is to cut through the noise and bring to surface what is 
                valuable and who it has been valuable to while doing which task. the idea is to put together an online 
                open-source database which contains information about ai solutions relevant for european companies.
              </p>
            </section>

            {/* AI Adoption Gap Diagram */}
            <section className="mb-10 pt-8">
              <h3 className="font-medium text-lg md:text-xl mb-10 text-center italic">
                connecting the dots to bridge the AI adoption gap in Europe
              </h3>
              
              <div className="relative w-full h-[420px] my-8">
                {/* Left side - Development */}
                <div className="absolute left-0 top-0 text-center w-1/3">
                  <p className="text-xl mb-6 italic">development of AI</p>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">10</span>
                    <div className="h-[300px] border-l border-white relative">
                      <div className="absolute -left-[10px] top-[50px]">
                        <X className="w-6 h-6" />
                      </div>
                      <span className="absolute -left-[10px] bottom-0 text-4xl font-bold">0</span>
                    </div>
                  </div>
                </div>
                
                {/* Right side - Adoption */}
                <div className="absolute right-0 top-0 text-center w-1/3">
                  <p className="text-xl mb-6 italic">adoption of AI</p>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-bold">10</span>
                    <div className="h-[300px] border-l border-white relative">
                      <div className="absolute -left-[10px] bottom-[50px]">
                        <X className="w-6 h-6" />
                      </div>
                      <span className="absolute -left-[10px] bottom-0 text-4xl font-bold">0</span>
                    </div>
                  </div>
                </div>
                
                {/* Connecting lines */}
                <div className="absolute top-[115px] left-1/3 right-1/3 border-t border-dashed border-white"></div>
                <div className="absolute bottom-[50px] left-1/3 right-1/3 border-t border-dashed border-white"></div>
                
                {/* Middle vertical line */}
                <div className="absolute left-1/2 top-[115px] h-[235px] -ml-[1px] border-l border-white"></div>
                
                {/* Curved arrow */}
                <div className="absolute bottom-[100px] left-1/2 -ml-6 transform -rotate-45">
                  <ArrowDown className="w-12 h-12 text-white" />
                </div>
                
                {/* Gap label */}
                <div className="absolute bottom-0 left-0 right-0 text-center">
                  <p className="text-2xl italic">the AI adoption gap</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default ManifestoPage;
