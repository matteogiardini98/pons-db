
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import Navbar from '@/components/layout/Navbar';

const StartFromZeroPage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "email required",
        description: "please enter your email address",
        variant: "destructive"
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "invalid email",
        description: "please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('ent_input')
        .insert([{ email }]);

      if (error) throw error;

      toast({
        title: "thanks for your submission!",
        description: "we'll find the right AI tools for your business challenges and get back to you soon.",
      });
      
      setEmail('');
    } catch (error: any) {
      console.error('Error submitting email:', error);
      toast({
        title: "submission failed",
        description: error.message || "there was an error submitting your email. please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex min-h-screen items-center justify-center">
        <div className="container-tight max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-medium mb-6">
            For all entrepreneurs and operators out there, tell us your business challenges and we get back to you with the best AI tool that solves your problem
          </h1>
          
          <form onSubmit={handleSubmit} className="mt-8 flex gap-2 max-w-md mx-auto">
            <Input 
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={cn(
                "flex-grow",
                theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-50'
              )}
              disabled={isSubmitting}
            />
            <Button 
              type="submit" 
              className="bg-emerald-600 hover:bg-emerald-500 aspect-square p-0 h-10 w-10"
              disabled={isSubmitting}
              aria-label="Submit email"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default StartFromZeroPage;
