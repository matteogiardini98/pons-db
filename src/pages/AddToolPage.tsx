
import { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { INDUSTRIES, FUNCTIONS, BUSINESS_TYPES } from '@/utils/data';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/hooks/use-toast';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
  website: z.string().url({ message: 'Must be a valid URL' }),
  linkedin: z.string().url({ message: 'Must be a valid URL' }).optional().or(z.literal('')),
  industries: z.array(z.string()).min(1, { message: 'Select at least one industry' }),
  functions: z.array(z.string()).min(1, { message: 'Select at least one function' }),
  businessTypes: z.array(z.string()).min(1, { message: 'Select at least one business type' }),
  gdprCompliant: z.boolean().optional(),
  dataResidency: z.boolean().optional(),
  aiActCompliant: z.boolean().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddToolPage = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      description: '',
      website: '',
      linkedin: '',
      industries: [],
      functions: [],
      businessTypes: [],
      gdprCompliant: false,
      dataResidency: false,
      aiActCompliant: false,
    },
  });

  // Apply scroll restoration on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  function onSubmit(data: FormValues) {
    console.log(data);
    
    // In a real application, you would send this data to your backend
    toast({
      title: "Tool submitted",
      description: `${data.name} has been submitted successfully.`,
    });
    
    // Reset form
    form.reset();
    
    // Redirect to database page
    setTimeout(() => navigate('/'), 1500);
  }

  return (
    <div className={cn(
      "min-h-screen flex",
      theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
    )}>
      <Sidebar />
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <motion.div className="container-tight p-4 md:p-6 pt-16" {...pageTransition}>
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-medium mb-6">Add New AI Tool</h1>
            <p className={cn(
              "mb-8 text-lg",
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            )}>
              Submit a new AI tool to the pons41 database. Please provide as much information as possible.
            </p>
            
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
                          <FormLabel>Tool Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. ChatGPT" {...field} />
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
                          <FormLabel>Website URL</FormLabel>
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input placeholder="Brief description of what the tool does" {...field} />
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
                        <FormLabel>LinkedIn Page (optional)</FormLabel>
                        <FormControl>
                          <Input placeholder="https://linkedin.com/company/example" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="space-y-4">
                    <FormLabel className="block mb-2">Industries</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {INDUSTRIES.map((industry) => (
                        <FormField
                          key={industry}
                          control={form.control}
                          name="industries"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(industry)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, industry])
                                      : field.onChange(field.value?.filter((value) => value !== industry))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {industry}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage>{form.formState.errors.industries?.message}</FormMessage>
                  </div>
                  
                  <div className="space-y-4">
                    <FormLabel className="block mb-2">Functions</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {FUNCTIONS.map((func) => (
                        <FormField
                          key={func}
                          control={form.control}
                          name="functions"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(func)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, func])
                                      : field.onChange(field.value?.filter((value) => value !== func))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {func}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage>{form.formState.errors.functions?.message}</FormMessage>
                  </div>
                  
                  <div className="space-y-4">
                    <FormLabel className="block mb-2">Business Types</FormLabel>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {BUSINESS_TYPES.map((type) => (
                        <FormField
                          key={type}
                          control={form.control}
                          name="businessTypes"
                          render={({ field }) => (
                            <FormItem className="flex items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(type)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, type])
                                      : field.onChange(field.value?.filter((value) => value !== type))
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal cursor-pointer">
                                {type}
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                      ))}
                    </div>
                    <FormMessage>{form.formState.errors.businessTypes?.message}</FormMessage>
                  </div>
                  
                  <div className="space-y-4">
                    <FormLabel className="block mb-2">EU Compliance</FormLabel>
                    <div className="space-y-2">
                      <FormField
                        control={form.control}
                        name="gdprCompliant"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              GDPR Compliant
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dataResidency"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              EU Data Residency
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="aiActCompliant"
                        render={({ field }) => (
                          <FormItem className="flex items-center space-x-2">
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel className="font-normal cursor-pointer">
                              EU AI Act Compliant
                            </FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    Submit Tool
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default AddToolPage;
