
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FUNCTIONS, TECHNICAL_LEVELS } from '../database/filterConstants';

// Simplified form schema with only required fields
const formSchema = z.object({
  name: z.string().min(2, {
    message: 'name must be at least 2 characters'
  }),
  website: z.string().url({
    message: 'must be a valid url'
  }).optional().or(z.literal('')),
  problem_solved_description: z.string().min(10, {
    message: 'description must be at least 10 characters'
  }),
  technical_level: z.string().min(1, {
    message: 'select a technical level'
  }),
  function: z.array(z.string()).min(1, {
    message: 'select at least one function'
  }),
});

type FormValues = z.infer<typeof formSchema>;

const AddToolForm = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      website: '',
      problem_solved_description: '',
      technical_level: '',
      function: [],
    }
  });

  async function onSubmit(data: FormValues) {
    try {
      // Create a record with only the required fields for ai_tool_staging
      const toolData = {
        name: data.name,
        website: data.website || '',
        problem_solved_description: data.problem_solved_description,
        technical_level: data.technical_level,
        function: data.function,
      };

      // Using the new ai_tool_staging table
      const { error } = await supabase
        .from('ai_tool_staging')
        .insert([toolData]);

      if (error) throw error;

      toast({
        title: "tool submitted",
        description: `${data.name} has been added for review.`
      });

      // Reset form
      form.reset();

      // Redirect to database page
      setTimeout(() => navigate('/'), 1500);
    } catch (error: any) {
      console.error('Error submitting tool:', error);
      toast({
        title: "submission failed",
        description: error.message || 'there was an error submitting the tool. please try again.',
        variant: "destructive"
      });
    }
  }

  return (
    <div className={cn("p-6 rounded-lg border", theme === 'dark' ? 'bg-[#222222] border-neutral-700' : 'bg-white border-neutral-200 shadow-sm')}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>tool name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g. chatgpt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>website url</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          <FormField
            control={form.control}
            name="problem_solved_description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>describe how you use this ai tool</FormLabel>
                <FormControl>
                  <Textarea 
                    placeholder="please describe how you use this tool and what problem it solves for you"
                    className="min-h-32"
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <FormLabel className="block mb-2">technical level</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {TECHNICAL_LEVELS.map(level => (
                <FormField
                  key={level}
                  control={form.control}
                  name="technical_level"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value === level.toLowerCase()}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              field.onChange(level.toLowerCase());
                            }
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {level.toLowerCase()}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage>{form.formState.errors.technical_level?.message}</FormMessage>
          </div>
          
          <div className="space-y-4">
            <FormLabel className="block mb-2">function</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {FUNCTIONS.map(func => (
                <FormField
                  key={func}
                  control={form.control}
                  name="function"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(func.toLowerCase())}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, func.toLowerCase()])
                              : field.onChange(field.value?.filter(value => value !== func.toLowerCase()));
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {func.toLowerCase()}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage>{form.formState.errors.function?.message}</FormMessage>
          </div>
          
          <Button
            type="submit"
            className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-500 text-center rounded-sm"
          >
            submit tool
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddToolForm;
