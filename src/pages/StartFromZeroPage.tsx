
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter
} from '@/components/ui/dialog';
import { Checkbox } from "@/components/ui/checkbox";
import { Link } from 'react-router-dom';
import Footer from '@/components/layout/Footer';
import AnimatedCard from '@/components/ui/AnimatedCard';

const StartFromZeroPage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  const businessHeadaches = [
    {
      quote: "\"Our CRM is overloaded with leads, yet we spend too much time on prospects that don't convert. Can we find a better way to prioritize leads?\"",
      title: "Head of Sales in Tech SaaS"
    },
    {
      quote: "\"We are really bogged down with manual reconciliation and data entry that delay our reporting cycles.\"",
      title: "CFO in Manufacturing"
    },
    {
      quote: "\"Our forecasting skills are just bad. Inventory overstock in some areas and shortages in others, we keep losing sales and having higher costs\"",
      title: "Supply Chain Manager in Retail"
    },
    {
      quote: "\"Scheduling system!!! So poor...we have overworked staff during peak periods and coverage gaps during off-hours. We need to optimize shift allocation.\"",
      title: "VP of Operations in Retail Chain"
    },
    {
      quote: "\"We have some many insights and data to create marketing assets, but we do not have the team, time and skills. Helpppp!\"",
      title: "CMO in E-commerce"
    }
  ];

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challenge.trim()) {
      toast({
        title: "Challenge required",
        description: "Please describe your business challenge",
        variant: "destructive"
      });
      return;
    }
    
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!consentChecked) {
      toast({
        title: "Consent required",
        description: "Please confirm you agree to be contacted",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('ent_input')
        .insert([{ 
          email,
          challenge
        }]);

      if (error) throw error;

      toast({
        title: "Thanks for your submission!",
        description: "We'll find the right AI tools for your business challenges and get back to you soon.",
      });
      
      setEmail('');
      setChallenge('');
      setShowEmailDialog(false);
      setConsentChecked(false);
    } catch (error: any) {
      console.error('Error submitting data:', error);
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex-1 flex">
        <Sidebar />
        <div className={cn(
          "flex-1 overflow-auto md:ml-16 md:ml-64 transition-all duration-300",
          theme === 'dark' ? 'bg-[#111111]' : 'bg-gray-50'
        )}>
          <div className="container-tight max-w-6xl mx-auto px-4 py-8 flex flex-col h-full">
            <div className="space-y-6 mb-8 pt-10">
              <h1 className={cn(
                "text-2xl md:text-3xl lg:text-4xl font-medium leading-normal text-center",
                theme === 'dark' ? 'text-white' : 'text-black'
              )}>
                For all <span className="text-emerald-500">entrepreneurs</span> and <span className="text-emerald-500">operators</span> out there, tell us your business <span className="text-emerald-500">challenges</span> and we'll help you find the right AI tools.
              </h1>
              
              <form onSubmit={handleChallengeSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <Input
                    id="challenge"
                    placeholder="Describe your business challenge"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className={cn(
                      "bg-opacity-10 border-opacity-20 py-6",
                      theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white/10 border-white/20'
                    )}
                  />
                  <Button 
                    type="submit" 
                    variant="cta"
                    disabled={isSubmitting}
                    size="sm"
                    className="rounded-full p-2 h-10 w-10"
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-10 mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
                {businessHeadaches.slice(0, 3).map((headache, index) => (
                  <AnimatedCard 
                    key={index} 
                    hoverEffect={index % 2 === 0 ? "tilt" : "glow"}
                    className={cn(
                      "h-full",
                      theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-200'
                    )}
                  >
                    <div className="p-5">
                      <p className={cn(
                        "text-sm",
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      )}>
                        <span className="italic">{headache.quote}</span> <span className="block mt-2 font-bold not-italic">{headache.title}</span>
                      </p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 mt-5 md:px-12">
                {businessHeadaches.slice(3, 5).map((headache, index) => (
                  <AnimatedCard 
                    key={index + 3} 
                    hoverEffect={index % 2 === 0 ? "glow" : "tilt"}
                    glowColor={theme === 'dark' ? 'rgba(74, 210, 149, 0.15)' : 'rgba(74, 210, 149, 0.2)'}
                    className={cn(
                      "h-full",
                      theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-200'
                    )}
                  >
                    <div className="p-5">
                      <p className={cn(
                        "text-sm",
                        theme === 'dark' ? 'text-white' : 'text-gray-800'
                      )}>
                        <span className="italic">{headache.quote}</span> <span className="block mt-2 font-bold not-italic">{headache.title}</span>
                      </p>
                    </div>
                  </AnimatedCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className={cn(
          "sm:max-w-md",
          theme === 'dark' ? 'bg-[#191919] text-white' : 'bg-white'
        )}>
          <DialogHeader>
            <Label htmlFor="email">Your email</Label>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white'
                  )}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="consent" 
                  checked={consentChecked}
                  onCheckedChange={(checked) => {
                    setConsentChecked(checked as boolean);
                  }}
                />
                <Label htmlFor="consent" className="text-sm">
                  I agree to be contacted by email about AI tools for my business challenge
                </Label>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEmailDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="cta"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartFromZeroPage;
