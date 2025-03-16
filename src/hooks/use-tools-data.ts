
import { useState, useEffect } from 'react';
import { AiTool } from '@/utils/types';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

export default function useToolsData() {
  const [tools, setTools] = useState<AiTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchTools = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*');
          
        if (error) {
          throw error;
        }
        
        if (data) {
          // Map the Supabase data to the AiTool type
          const mappedTools: AiTool[] = data.map(tool => ({
            id: tool.id,
            name: tool.name,
            website: tool.website,
            function: tool.function || [],
            role: tool.role || [],
            problem_solved_description: tool.problem_solved_description || '',
            use_case_tag: tool.use_case_tag || '',
            technical_level: tool.technical_level || '',
            euCompliant: {
              // Safely handle potentially missing properties
              gdpr_compliant: false, // Set default value instead of accessing potentially missing field
              data_residency: tool.data_residency || false,
              ai_act_compliant: tool.ai_act_compliant || false
            },
            // Handle potentially missing fields
            company: undefined
          }));

          setTools(mappedTools);
        }
      } catch (error: any) {
        console.error('Error fetching tools:', error);
        setError(error);
        toast({
          variant: "destructive",
          title: "Error fetching tools",
          description: "Please try again later.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchTools();
  }, []);

  return { tools, isLoading, error };
}
