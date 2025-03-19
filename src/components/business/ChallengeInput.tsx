
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ChallengeInputProps {
  onSubmit: (challenge: string) => void;
  isSubmitting?: boolean;
}

const ChallengeInput = ({ onSubmit, isSubmitting = false }: ChallengeInputProps) => {
  const { theme } = useTheme();
  const [challenge, setChallenge] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challenge.trim()) {
      toast({
        title: "Challenge required",
        description: "Please describe your business challenge",
        variant: "destructive"
      });
      return;
    }
    
    onSubmit(challenge);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto">
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
  );
};

export default ChallengeInput;
