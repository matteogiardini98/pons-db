
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { FUNCTIONS, ROLES, TECHNICAL_LEVELS } from '../database/filterConstants';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  name: z.string().min(2, { message: 'name must be at least 2 characters' }),
  problem_solved_description: z.string().min(10, { message: 'description must be at least 10 characters' }),
  website: z.string().url({ message: 'must be a valid url' }),
  linkedin: z.string().url({ message: 'must be a valid url' }).optional().or(z.literal('')),
  function: z.array(z.string()).min(1, { message: 'select at least one function' }),
  role: z.array(z.string()).min(1, { message: 'select at least one role' }),
  use_case_tag: z.string().min(1, { message: 'enter a use case' }),
  technical_level: z.string().min(1, { message: 'select a technical level' }),
  gdpr_compliant: z.boolean().optional(),
  data_residency: z.boolean().optional(),
  ai_act_compliant: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddToolForm = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      problem_solved_description: '',
      website: '',
      linkedin: '',
      function: [],
      role: [],
      use_case_tag: '',
      technical_level: '',
      gdpr_compliant: false,
      data_residency: false,
      ai_act_compliant: false,
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      // Insert the tool data into Supabase
      const { error } = await supabase.from('ai_tools').insert({
        name: data.name,
        problem_solved_description: data.problem_solved_description,
        website: data.website,
        linkedin: [data.linkedin || ''],
        function: data.function,
        role: data.role,
        use_case_tag: data.use_case_tag,
        technical_level: data.technical_level,
        gdpr_compliant: data.gdpr_compliant ? ['true'] : [],
        data_residency: data.data_residency,
        ai_act_compliant: data.ai_act_compliant,
      });

      if (error) throw error;
      
      toast({
        title: "tool submitted",
        description: `${data.name} has been added to the database.`,
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
    <div className={cn(
      "p-6 rounded-lg border",
      theme === 'dark' 
        ? 'bg-[#222222] border-neutral-700' 
        : 'bg-white border-neutral-200 shadow-sm'
    )}>
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
                <FormLabel>description</FormLabel>
                <FormControl>
                  <Input placeholder="brief description of what the tool does" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="linkedin"
            render={({ field }) => (
              <FormItem>
                <FormLabel>linkedin page (optional)</FormLabel>
                <FormControl>
                  <Input placeholder="https://linkedin.com/company/example" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="use_case_tag"
            render={({ field }) => (
              <FormItem>
                <FormLabel>use case</FormLabel>
                <FormControl>
                  <Input placeholder="e.g. technical product demonstration" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="technical_level"
            render={({ field }) => (
              <FormItem>
                <FormLabel>technical level</FormLabel>
                <Select 
                  value={field.value} 
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select technical level" />
                  </SelectTrigger>
                  <SelectContent>
                    {TECHNICAL_LEVELS.map((level) => (
                      <SelectItem key={level} value={level.toLowerCase()}>
                        {level.toLowerCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>{form.formState.errors.technical_level?.message}</FormMessage>
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="function"
            render={() => (
              <FormItem>
                <FormLabel>functions</FormLabel>
                <div className="space-y-4">
                  <Select
                    value={""}
                    onValueChange={(value) => {
                      const currentValues = form.getValues().function || [];
                      if (!currentValues.includes(value)) {
                        form.setValue('function', [...currentValues, value]);
                      }
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a function to add" />
                    </SelectTrigger>
                    <SelectContent>
                      {FUNCTIONS.map((func) => (
                        <SelectItem key={func} value={func.toLowerCase()}>
                          {func.toLowerCase()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <div className="space-y-2">
                    {form.watch('function').map((func) => (
                      <div key={func} className="flex items-center justify-between p-2 bg-muted rounded-md">
                        <span>{func.toLowerCase()}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm"
                          onClick={() => {
                            const currentValues = form.getValues().function;
                            form.setValue(
                              'function',
                              currentValues.filter((value) => value !== func)
                            );
                          }}
                        >
                          remove
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
                <FormMessage>{form.formState.errors.function?.message}</FormMessage>
              </FormItem>
            )}
          />
          
          <div className="space-y-4">
            <FormLabel className="block mb-2">roles</FormLabel>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {ROLES.map((role) => (
                <FormField
                  key={role}
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-2">
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(role.toLowerCase())}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, role.toLowerCase()])
                              : field.onChange(field.value?.filter((value) => value !== role.toLowerCase()))
                          }}
                        />
                      </FormControl>
                      <FormLabel className="font-normal cursor-pointer">
                        {role.toLowerCase()}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <FormMessage>{form.formState.errors.role?.message}</FormMessage>
          </div>
          
          <div className="space-y-4">
            <FormLabel className="block mb-2">eu compliance</FormLabel>
            <div className="space-y-2">
              <FormField
                control={form.control}
                name="gdpr_compliant"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      gdpr compliant
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="data_residency"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      eu data residency
                    </FormLabel>
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ai_act_compliant"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">
                      eu ai act compliant
                    </FormLabel>
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          <Button type="submit" className="w-full md:w-auto">
            submit tool
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default AddToolForm;
