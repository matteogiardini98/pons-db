
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { useLanguage } from '@/hooks/use-language';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import ChallengeInput from '@/components/business/ChallengeInput';
import BusinessHeadacheGrid from '@/components/business/BusinessHeadacheGrid';
import EmailDialog from '@/components/business/EmailDialog';
import LimitedAvailabilityBanner from '@/components/ui/limited-availability-banner';
import LanguageSwitcher from '@/components/layout/LanguageSwitcher';

const StartFromZeroPage = () => {
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [challenge, setChallenge] = useState('');
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessHeadaches = [
    {
      quote: "Our CRM is overloaded with leads, yet we spend too much time on prospects that don't convert. Can we find a better way to prioritize leads?",
      title: "Head of Sales in Tech SaaS"
    },
    {
      quote: "We are really bogged down with manual reconciliation and data entry that delay our reporting cycles.",
      title: "CFO in Manufacturing"
    },
    {
      quote: "Our forecasting skills are just bad. Inventory overstock in some areas and shortages in others, we keep losing sales and having higher costs",
      title: "Supply Chain Manager in Retail"
    },
    {
      quote: "Scheduling system!!! So poor...we have overworked staff during peak periods and coverage gaps during off-hours. We need to optimize shift allocation.",
      title: "VP of Operations in Retail Chain"
    },
    {
      quote: "We have some many insights and data to create marketing assets, but we do not have the team, time and skills. Helpppp!",
      title: "CMO in E-commerce"
    }
  ];

  const handleChallengeSubmit = (submittedChallenge: string) => {
    setChallenge(submittedChallenge);
    setShowEmailDialog(true);
  };

  // Helper function to render title with highlighted words
  const renderTitle = () => {
    const title = t('startZero.title');
    const entrepreneurs = t('startZero.entrepreneurs');
    const operators = t('startZero.operators');
    const challenges = t('startZero.challenges');
    
    // Replace entrepreneurs with highlighted version
    let result = title.split(entrepreneurs).join(`<span class="text-emerald-500">${entrepreneurs}</span>`);
    
    // Replace operators with highlighted version
    result = result.split(operators).join(`<span class="text-emerald-500">${operators}</span>`);
    
    // Replace challenges with highlighted version
    result = result.split(challenges).join(`<span class="text-emerald-500">${challenges}</span>`);
    
    return { __html: result };
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Add language switcher in a fixed position */}
      <div className="fixed top-4 right-4 z-50">
        <LanguageSwitcher />
      </div>
      
      <div className="flex-1 flex">
        <Sidebar />
        <div className={cn(
          "flex-1 overflow-auto md:ml-16 md:ml-64 transition-all duration-300",
          theme === 'dark' ? 'bg-[#111111]' : 'bg-gray-50'
        )}>
          <div className="container-tight max-w-5xl mx-auto px-4 py-16 flex flex-col min-h-screen">
            <div className="space-y-10 mb-20 mt-8 max-w-3xl mx-auto">
              <LimitedAvailabilityBanner />
              <h1 
                className={cn(
                  "text-2xl md:text-3xl lg:text-4xl font-medium leading-normal text-center",
                  theme === 'dark' ? 'text-white' : 'text-black'
                )}
                dangerouslySetInnerHTML={renderTitle()}
              />
              
              <div className="max-w-2xl mx-auto pt-6">
                <ChallengeInput 
                  onSubmit={handleChallengeSubmit} 
                  isSubmitting={isSubmitting}
                />
              </div>
            </div>
            
            <div className="mt-24 mb-auto">
              <BusinessHeadacheGrid headaches={businessHeadaches} />
            </div>
          </div>
          
          <Footer />
        </div>
      </div>

      <EmailDialog 
        open={showEmailDialog} 
        onOpenChange={setShowEmailDialog}
        challenge={challenge}
      />
    </div>
  );
};

export default StartFromZeroPage;
