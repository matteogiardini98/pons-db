
import React from 'react';
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

const formSchema = z.object({
  email: z.string().email({
    message: 'please enter a valid email address',
  }),
  query: z.string().min(10, {
    message: 'please describe your problem in at least 10 characters',
  }),
});

type FormValues = z.infer<typeof formSchema>;

const ProblemQueryInput = () => {
  const { theme } = useTheme();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      query: '',
    }
  });

  async function onSubmit(data: FormValues) {
    try {
      const { error } = await supabase
        .from('user_queries')
        .insert([{
          email: data.email,
          query: data.query,
        }]);

      if (error) throw error;

      toast({
        title: "thanks for your response!",
        description: "we'll use your feedback to improve our tool recommendations."
      });

      // Reset form
      form.reset();
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
    <div className={cn("p-6 mb-8 rounded-lg border", 
      theme === 'dark' ? 'bg-[#222222] border-neutral-700' : 'bg-white border-neutral-200 shadow-sm')}>
      <h2 className="text-xl font-medium mb-4">help us improve our recommendations</h2>
      <p className={cn("mb-6", theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700')}>
        what problem are you trying to solve? which tasks do you think ai can help you with?
      </p>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="query"
            render={({ field }) => (
              <FormItem>
                <FormLabel>your problem or task</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="describe what problems or tasks you're looking to solve with ai tools..."
                    className="min-h-24"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>your email</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="your@email.com" 
                    type="email"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <Button
            type="submit"
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-center rounded-sm"
          >
            submit
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default ProblemQueryInput;
