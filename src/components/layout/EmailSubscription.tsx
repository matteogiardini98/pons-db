
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const formSchema = z.object({
  email: z.string().email({
    message: 'please enter a valid email address'
  })
});

type FormValues = z.infer<typeof formSchema>;

const EmailSubscription = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: ''
    }
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);
    try {
      const {
        error
      } = await supabase.from('email_subscriptions').insert({
        email: data.email
      });

      if (error) {
        if (error.code === '23505') {
          // Unique violation
          toast({
            title: "already subscribed",
            description: "this email is already subscribed to our updates"
          });
        } else {
          throw error;
        }
      } else {
        toast({
          title: "subscribed!",
          description: "you've been successfully subscribed to updates"
        });
        form.reset();
      }
    } catch (error: any) {
      console.error('Error subscribing:', error);
      toast({
        title: "subscription failed",
        description: error.message || "there was an error subscribing. please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <div className="w-full p-4">
      <h3 className="text-sm font-medium mb-2">receive one new AI tool every week</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField control={form.control} name="email" render={({
          field
        }) => <FormItem>
                <FormControl>
                  <Input placeholder="your email" {...field} type="email" className="h-8" />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>} />
          
          <Button type="submit" disabled={isSubmitting} size="sm" variant="cta" className="w-full text-xs h-8">
            {isSubmitting ? "subscribing..." : "subscribe"}
          </Button>
        </form>
      </Form>
    </div>;
};

export default EmailSubscription;
