
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';

const StartFromZeroPage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
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

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('ent_input')
        .insert([{ 
          email,
          challenge: challenge.trim() ? challenge : undefined
        }]);

      if (error) throw error;

      toast({
        title: "Thanks for your submission!",
        description: "We'll find the right AI tools for your business challenges and get back to you soon.",
      });
      
      setEmail('');
      setChallenge('');
    } catch (error: any) {
      console.error('Error submitting email:', error);
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
          <Card className={cn(
            "border-0 shadow-lg",
            theme === 'dark' ? 'bg-[#191919] text-white' : 'bg-white'
          )}>
            <CardHeader className="space-y-1 pb-2">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-5 w-5 text-emerald-500" />
                <CardTitle className="text-xl font-medium">Start From Zero</CardTitle>
              </div>
              <CardDescription className="text-xl md:text-2xl font-medium leading-normal">
                For all entrepreneurs and operators out there, tell us your business challenges and we'll help you find the right AI tools.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="challenge">What business challenge are you facing?</Label>
                  <Input
                    id="challenge"
                    placeholder="Describe your business challenge (optional)"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className={cn(
                      theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white'
                    )}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Your email</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={cn(
                        "flex-grow",
                        theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white'
                      )}
                      disabled={isSubmitting}
                    />
                    <Button 
                      type="submit" 
                      variant="cta"
                      disabled={isSubmitting}
                      className="gap-1"
                    >
                      <Send size={16} />
                      <span className="hidden sm:inline">Submit</span>
                    </Button>
                  </div>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default StartFromZeroPage;
