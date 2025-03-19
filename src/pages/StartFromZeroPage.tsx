
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Checkbox } from "@/components/ui/checkbox";

const StartFromZeroPage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

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

    // Basic email validation
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
    <div className="flex h-screen">
      <Sidebar />
      <div className={cn(
        "flex-1 overflow-auto pt-16 md:ml-16 md:ml-64 transition-all duration-300",
        theme === 'dark' ? 'bg-[#111111]' : 'bg-gray-50'
      )}>
        <div className="container-tight max-w-3xl mx-auto px-4 py-12">
          <div className="space-y-8 mt-12">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium leading-normal text-white text-center">
              For all <span className="text-emerald-500">entrepreneurs</span> and <span className="text-emerald-500">operators</span> out there, tell us your business <span className="text-emerald-500">challenges</span> and we'll help you find the right AI tools.
            </h1>
            
            <form onSubmit={handleChallengeSubmit} className="space-y-4 max-w-xl mx-auto">
              <div className="space-y-2">
                <Input
                  id="challenge"
                  placeholder="Describe your business challenge"
                  value={challenge}
                  onChange={(e) => setChallenge(e.target.value)}
                  className={cn(
                    "bg-opacity-10 border-opacity-20",
                    theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white/10 border-white/20'
                  )}
                />
                <div className="flex justify-center mt-4">
                  <Button 
                    type="submit" 
                    variant="cta"
                    disabled={isSubmitting}
                    size="sm"
                    className="rounded-full p-2 h-auto w-auto"
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className={cn(
          "sm:max-w-md",
          theme === 'dark' ? 'bg-[#191919] text-white' : 'bg-white'
        )}>
          <DialogHeader>
            <DialogTitle>One last step</DialogTitle>
            <DialogDescription>
              Please provide your email so we can send you personalized AI tool recommendations.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="email">Your email</Label>
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
