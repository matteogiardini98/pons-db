
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter
} from '@/components/ui/dialog';

interface EmailDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  challenge: string;
}

const EmailDialog = ({ open, onOpenChange, challenge }: EmailDialogProps) => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [consentChecked, setConsentChecked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setConsentChecked(false);
      onOpenChange(false);
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
    <Dialog open={open} onOpenChange={onOpenChange}>
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
              onClick={() => onOpenChange(false)}
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
  );
};

export default EmailDialog;
