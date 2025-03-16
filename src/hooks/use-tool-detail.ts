
import { useState, useEffect } from 'react';
import { AiTool } from '@/utils/types';
import { supabase } from '@/integrations/supabase/client';

export default function useToolDetail(id: string | undefined) {
  const [tool, setTool] = useState<AiTool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToolDetails = async () => {
      if (!id) {
        setError('No tool ID provided');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .eq('id', id)
          .single();
          
        if (data) {
          console.log("Raw tool data:", data);
          
          // Map Supabase data to AiTool type
          const toolData: AiTool = {
            id: data.id,
            name: data.name,
            website: data.website,
            function: data.function || [],
            role: data.role || [],
            problem_solved_description: data.problem_solved_description || '',
            use_case_tag: data.use_case_tag || '',
            technical_level: data.technical_level || '',
            euCompliant: {
              // Handle gdpr_compliant which could be missing in older records
              gdpr_compliant: data.gdpr_compliant !== undefined ? data.gdpr_compliant : [],
              data_residency: data.data_residency || false,
              ai_act_compliant: data.ai_act_compliant || false
            },
            // Handle company which could be missing
            company: data.company || undefined
          };
          
          setTool(toolData);
          setError(null);
        } else if (error) {
          console.error('Error fetching tool details:', error);
          setError('Could not fetch tool details');
        }
      } catch (error) {
        console.error('Error in data fetching:', error);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchToolDetails();
  }, [id]);

  return { tool, isLoading, error };
}
