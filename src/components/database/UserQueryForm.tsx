
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

export default function UserQueryForm() {
  const [query, setQuery] = useState('');
  const [email, setEmail] = useState('');
  const [isConsented, setIsConsented] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuerySubmit = () => {
    if (!query.trim()) {
      toast({
        title: "Please describe your problem",
        description: "We need to know what you're looking for to help you.",
        variant: "destructive"
      });
      return;
    }
    setIsDialogOpen(true);
  };

  const handleEmailSubmit = async () => {
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please provide your email address so we can reach you.",
        variant: "destructive"
      });
      return;
    }

    if (!isConsented) {
      toast({
        title: "Consent required",
        description: "Please check the consent box to receive email from us.",
        variant: "destructive"
      });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please provide a valid email address.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('user_queries')
        .insert([{ query, email }]);

      if (error) throw error;

      toast({
        title: "Thank you for your query!",
        description: "We'll find the right tools for you and send you an email soon.",
      });
      
      // Reset form
      setQuery('');
      setEmail('');
      setIsConsented(false);
      setIsDialogOpen(false);
    } catch (error: any) {
      console.error('Error submitting query:', error);
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your query. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-muted/40 rounded-lg p-6 mb-8 border border-muted">
      <h3 className="text-xl font-medium mb-3">Looking for the right AI tool?</h3>
      <p className="text-muted-foreground mb-4">
        What problem are you trying to solve? Which tasks do you think AI can help you with? Let us know, we will find the right tool for your use case and send you an email with everything you need to know.
      </p>
      
      <div className="space-y-4">
        <Textarea 
          placeholder="Describe your problem or the task you need help with..." 
          className="min-h-24"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <Button 
          onClick={handleQuerySubmit} 
          className="w-full md:w-auto"
          variant="cta"
        >
          Find the right AI tools for me
        </Button>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>One more step</DialogTitle>
            <DialogDescription>
              Please provide your email address so we can send you our recommendations.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="consent" 
                checked={isConsented}
                onCheckedChange={(checked) => setIsConsented(checked === true)}
              />
              <label 
                htmlFor="consent" 
                className="text-sm text-muted-foreground cursor-pointer"
              >
                I agree to receive emails from AI Solutions Database with recommended tools and resources.
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              variant="cta"
              onClick={handleEmailSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Send me recommendations"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
