import { motion } from 'framer-motion';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { useState } from 'react';
import { Separator } from '@/components/ui/separator';
const ManifestoPage = () => {
  const {
    theme
  } = useTheme();
  const isDarkMode = theme === 'dark';
  return <div className={cn("min-h-screen flex", isDarkMode ? 'bg-[#111111] text-white' : 'bg-white text-black')}>
      <Sidebar />
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <motion.div className="container-tight p-4 md:p-6 pt-10 max-w-6xl mx-auto" {...pageTransition}>
          <h1 className="text-3xl md:text-4xl font-medium mb-6">manifesto</h1>

          <div className={cn("rounded-lg border p-8 mb-8 prose max-w-none", isDarkMode ? 'bg-[#222222] border-neutral-700 prose-invert' : 'bg-white border-neutral-200 shadow-sm')}>
            <h2 className="font-medium text-xl md:text-2xl mb-6">pons, connecting the dots to bridge the ai adoption gap in europe</h2>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">pons - latin for bridge - is an open-source project to bridge the gap between the overcrowded ai market and european small businesses, the ones that can truly benefit from the ai revolution.</h3>
              <p className={cn("mb-4 leading-relaxed", isDarkMode ? 'text-neutral-300' : 'text-neutral-700')}>
                the fast pace and directionless innovation coming from silicon valley creates an adoption gap between 
                the state of the art ai solutions that are being developed and what smbs are actually adopting in europe. 
                many general purpose ai tools are being developed without concrete consideration on the business problems 
                they could solve. they are too far from reality, at least in europe, with its regional nuances and specific 
                priorities.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">a lot of noise (what)</h3>
              <p className={cn("mb-4 leading-relaxed", isDarkMode ? 'text-neutral-300' : 'text-neutral-700')}>
                there is clearly an opportunity out there for smbs to leverage ai. they will be able to do more with the 
                same resources, multiply their capabilities and empower their employees to reach heights they never have. 
                but, where should they start? there are hundreds of tools out there, many overhyped that create a lot of 
                noise, overwhelming entrepreneurs and their organizations.
              </p>
            </section>
            
            <section className="mb-10">
              <h3 className="font-medium text-lg md:text-xl mb-4">an open-source database (how)</h3>
              <p className={cn("mb-4 leading-relaxed", isDarkMode ? 'text-neutral-300' : 'text-neutral-700')}>
                the first step to solve this adoption gap is to cut through the noise and bring to surface what is 
                valuable and who it has been valuable to while doing which task. the idea is to put together an online 
                open-source database which contains information about ai solutions relevant for european companies.
              </p>
            </section>
          </div>
        </motion.div>
        <Footer />
      </main>
    </div>;
};
export default ManifestoPage;