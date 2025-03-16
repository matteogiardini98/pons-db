
import { useState, useEffect } from 'react';
import { Tag, Users, ArrowUpDown, ImageOff, Briefcase, TagIcon } from 'lucide-react';
import { AiTool, FilterState } from '@/utils/types';
import { useTheme } from '@/hooks/use-theme';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import ToolsTable from './ToolsTable';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';

export default function DatabaseTableView() {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  const [tools, setTools] = useState<AiTool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterState, setFilterState] = useState<FilterState>({
    functions: [],
    roles: [],
    useCases: [],
    technicalLevel: [],
    euCompliant: {
      gdpr: false,
      dataResidency: false,
      aiAct: false
    }
  });
  const [searchQuery, setSearchQuery] = useState('');

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
              gdpr_compliant: tool.gdpr_compliant !== undefined ? tool.gdpr_compliant : [],
              data_residency: tool.data_residency || false,
              ai_act_compliant: tool.ai_act_compliant || false
            },
            company: tool.company || undefined
          }));

          setTools(mappedTools);
        }
      } catch (error) {
        console.error('Error fetching tools:', error);
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

  const getFilteredTools = () => {
    let filteredTools = tools;
  
    // Apply search query filter
    if (searchQuery) {
      filteredTools = filteredTools.filter(tool =>
        tool.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    // Apply function filters
    if (filterState.functions.length > 0) {
      filteredTools = filteredTools.filter(tool =>
        tool.function.some(func => filterState.functions.includes(func))
      );
    }
  
    // Apply role filters
    if (filterState.roles.length > 0) {
      filteredTools = filteredTools.filter(tool =>
        tool.role.some(role => filterState.roles.includes(role))
      );
    }
  
    // Apply use case filters
    if (filterState.useCases.length > 0) {
      filteredTools = filteredTools.filter(tool =>
        filterState.useCases.includes(tool.use_case_tag)
      );
    }
  
    // Apply technical level filters
    if (filterState.technicalLevel.length > 0) {
      filteredTools = filteredTools.filter(tool =>
        filterState.technicalLevel.includes(tool.technical_level)
      );
    }
  
    // Apply EU compliance filters
    if (filterState.euCompliant.gdpr) {
      filteredTools = filteredTools.filter(tool => {
        // Handle the case where gdpr_compliant could be an array or boolean
        const gdprValue = tool.euCompliant.gdpr_compliant;
        return Array.isArray(gdprValue) ? gdprValue.length > 0 : Boolean(gdprValue);
      });
    }
    if (filterState.euCompliant.dataResidency) {
      filteredTools = filteredTools.filter(tool =>
        tool.euCompliant.data_residency
      );
    }
    if (filterState.euCompliant.aiAct) {
      filteredTools = filteredTools.filter(tool =>
        tool.euCompliant.ai_act_compliant
      );
    }
  
    return filteredTools;
  };
  
  return (
    <div className="mx-auto w-full max-w-8xl">
      <div className="flex flex-col gap-4 mb-6">
        <SearchBar 
          searchTerm={searchQuery} 
          onSearchChange={(e) => setSearchQuery(e.target.value)} 
          placeholder="Search AI tools by name..." 
        />
        <FilterBar 
          filters={filterState} 
          onFilterChange={setFilterState} 
        />
      </div>
      
      <ToolsTable 
        tools={getFilteredTools()} 
        isLoading={isLoading} 
      />
    </div>
  );
}
