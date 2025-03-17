
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Send } from 'lucide-react';

const formSchema = z.object({
  query: z.string().min(10, {
    message: 'please describe your problem in at least 10 characters',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const emailFormSchema = z.object({
  email: z.string().email({
    message: 'please enter a valid email address',
  }),
  consent: z.boolean().refine(val => val === true, {
    message: 'you must consent to receive emails from us',
  }),
});

type EmailFormValues = z.infer<typeof emailFormSchema>;

const ProblemQueryInput = () => {
  const { theme } = useTheme();
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [queryText, setQueryText] = useState('');
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      query: '',
    }
  });

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: '',
      consent: false,
    }
  });

  async function onSubmit(data: FormValues) {
    setQueryText(data.query);
    setShowEmailDialog(true);
  }

  async function submitEmailForm(data: EmailFormValues) {
    try {
      const { error } = await supabase
        .from('user_queries')
        .insert([{
          email: data.email,
          query: queryText,
        }]);

      if (error) throw error;

      toast({
        title: "thanks for your response!",
        description: "we'll find the right tool for your use case and email you with everything you need to know."
      });

      // Reset forms
      form.reset();
      emailForm.reset();
      setShowEmailDialog(false);
    } catch (error: any) {
      console.error('Error submitting query:', error);
      toast({
        title: "submission failed",
        description: error.message || 'there was an error submitting your response. please try again.',
        variant: "destructive"
      });
    }
  }

  return (
    <>
      <div className={cn("p-6 mb-8 rounded-lg border", 
        theme === 'dark' ? 'bg-[#222222] border-neutral-700' : 'bg-white border-neutral-200 shadow-sm')}>
        <h2 className="text-xl font-medium mb-4">what problem are you trying to solve?</h2>
        <p className={cn("mb-6", theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700')}>
          let us know how you think ai can help you. we will find the right tool for your use case and send is to you via email.
        </p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="flex gap-2 items-center">
              <FormField
                control={form.control}
                name="query"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Textarea 
                        placeholder="describe what problems or tasks you're looking to solve with ai tools..."
                        className={cn("min-h-12 h-12 resize-none py-3 bg-gray-50", 
                          theme === 'dark' ? 'bg-neutral-800' : 'bg-gray-50')}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 h-12 aspect-square p-0"
                aria-label="Submit query"
              >
                <Send size={18} />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>enter your email</DialogTitle>
            <DialogDescription>
              we'll send you relevant AI tool recommendations based on your query
            </DialogDescription>
          </DialogHeader>
          
          <Form {...emailForm}>
            <form onSubmit={emailForm.handleSubmit(submitEmailForm)} className="space-y-4">
              <FormField
                control={emailForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>your email</FormLabel>
                    <FormControl>
                      <Input placeholder="your@email.com" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={emailForm.control}
                name="consent"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        I consent to receive emails from Pons with AI tool recommendations
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              
              <div className="flex justify-end gap-2 pt-2">
                <Button type="button" variant="outline" onClick={() => setShowEmailDialog(false)}>
                  cancel
                </Button>
                <Button type="submit" variant="cta">
                  submit
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProblemQueryInput;
