
import { useState, useEffect } from 'react';
import { Tag, Users, ArrowUpDown, ImageOff, Briefcase, TagIcon } from 'lucide-react';
import { AiTool, FilterState } from '@/utils/types';
import { Button } from '@/components/ui/button';
import { pageTransition } from '@/utils/animations';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import EUComplianceFilter from './EUComplianceFilter';
import ToolsTable from './ToolsTable';
import { FUNCTIONS, ROLES, USE_CASES, TECHNICAL_LEVELS } from './filterConstants';
import { supabase } from '@/integrations/supabase/client';

const DatabaseTableView = () => {
  const {
    theme
  } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tools, setTools] = useState<AiTool[]>([]);
  const [logoError, setLogoError] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
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
  const [showFunctionDropdown, setShowFunctionDropdown] = useState(false);
  const [showRoleDropdown, setShowRoleDropdown] = useState(false);
  const [showUseCaseDropdown, setShowUseCaseDropdown] = useState(false);
  const [showEUDropdown, setShowEUDropdown] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          // Map the database data directly to AiTool interface
          const mappedTools: AiTool[] = data.map(tool => ({
            id: tool.id,
            name: tool.name,
            problem_solved_description: tool.problem_solved_description,
            website: tool.website,
            linkedin: tool.linkedin,
            function: tool.function,
            role: tool.role,
            use_case_tag: tool.use_case_tag,
            technical_level: tool.technical_level || '',
            euCompliant: {
              gdpr_compliant: tool.gdpr_compliant || [],
              data_residency: tool.data_residency || false,
              ai_act_compliant: tool.ai_act_compliant || false
            }
          }));
          
          setTools(mappedTools);
        } else {
          setTools([]);
        }
      } catch (error) {
        console.error("Error fetching tools:", error);
        setTools([]);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTools();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleFunctionFilter = (func: string) => {
    setFilters(prev => {
      const functions = prev.functions.includes(func) ? prev.functions.filter(f => f !== func) : [...prev.functions, func];
      return {
        ...prev,
        functions
      };
    });
  };

  const toggleRoleFilter = (role: string) => {
    setFilters(prev => {
      const roles = prev.roles.includes(role) ? prev.roles.filter(r => r !== role) : [...prev.roles, role];
      return {
        ...prev,
        roles
      };
    });
  };

  const toggleUseCaseFilter = (useCase: string) => {
    setFilters(prev => {
      const useCases = prev.useCases.includes(useCase) ? prev.useCases.filter(uc => uc !== useCase) : [...prev.useCases, useCase];
      return {
        ...prev,
        useCases
      };
    });
  };

  const toggleEUFilter = (type: 'gdpr' | 'dataResidency' | 'aiAct') => {
    setFilters(prev => ({
      ...prev,
      euCompliant: {
        ...prev.euCompliant,
        [type]: !prev.euCompliant[type]
      }
    }));
  };

  const clearFilters = () => {
    setFilters({
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
  };

  const toggleFunctionDropdown = () => {
    setShowFunctionDropdown(!showFunctionDropdown);
    setShowRoleDropdown(false);
    setShowUseCaseDropdown(false);
    setShowEUDropdown(false);
  };

  const toggleRoleDropdown = () => {
    setShowRoleDropdown(!showRoleDropdown);
    setShowFunctionDropdown(false);
    setShowUseCaseDropdown(false);
    setShowEUDropdown(false);
  };

  const toggleUseCaseDropdown = () => {
    setShowUseCaseDropdown(!showUseCaseDropdown);
    setShowFunctionDropdown(false);
    setShowRoleDropdown(false);
    setShowEUDropdown(false);
  };

  const toggleEUDropdown = () => {
    setShowEUDropdown(!showEUDropdown);
    setShowFunctionDropdown(false);
    setShowRoleDropdown(false);
    setShowUseCaseDropdown(false);
  };

  const filteredTools = tools.filter(tool => {
    if (searchTerm && !tool.name.toLowerCase().includes(searchTerm.toLowerCase()) && !tool.problem_solved_description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filters.functions.length > 0 && !tool.function.some(func => filters.functions.includes(func.toLowerCase()))) {
      return false;
    }

    if (filters.roles.length > 0 && !tool.role.some(role => filters.roles.includes(role.toLowerCase()))) {
      return false;
    }

    if (filters.useCases.length > 0 && !filters.useCases.includes(tool.use_case_tag.toLowerCase())) {
      return false;
    }

    // Handle different types for gdpr_compliant
    let isGdprCompliant = false;
    if (typeof tool.euCompliant.gdpr_compliant === 'boolean') {
      isGdprCompliant = tool.euCompliant.gdpr_compliant;
    } else if (Array.isArray(tool.euCompliant.gdpr_compliant) && tool.euCompliant.gdpr_compliant.length > 0) {
      isGdprCompliant = true;
    }

    if (filters.euCompliant.gdpr && !isGdprCompliant) {
      return false;
    }
    
    if (filters.euCompliant.dataResidency && !tool.euCompliant.data_residency) {
      return false;
    }
    
    if (filters.euCompliant.aiAct && !tool.euCompliant.ai_act_compliant) {
      return false;
    }
    
    return true;
  });

  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-neutral-400' : 'text-neutral-500';
  const hoverBgColor = isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100';
  const buttonBgColor = isDarkMode ? 'bg-[#222222]' : 'bg-white';
  const logoUrl = isDarkMode ? '/lovable-uploads/0b439e01-d1aa-4e14-b75d-00cc947f78ef.png' : '/lovable-uploads/649e008f-f511-4467-97e6-d658be7b73e6.png';

  const handleImageError = () => {
    setLogoError(true);
    console.error("Logo image failed to load:", logoUrl);
  };

  const activeFilterCount = filters.functions.length + filters.roles.length + filters.useCases.length + (filters.euCompliant.gdpr ? 1 : 0) + (filters.euCompliant.dataResidency ? 1 : 0) + (filters.euCompliant.aiAct ? 1 : 0);

  return <motion.div className={cn("min-h-screen", textColor)} {...pageTransition}>
      <div className="container-tight p-4 md:p-6">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            {logoError ? <div className="h-10 w-10 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded">
                <ImageOff className={isDarkMode ? 'text-neutral-400' : 'text-neutral-500'} />
              </div> : <img src={logoUrl} alt="pons logo" className="h-10 w-auto" onError={handleImageError} />}
            <h1 className="text-3xl md:text-4xl font-medium">pons database</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            
            <div className="flex flex-wrap gap-2">
              <FilterDropdown 
                title="function" 
                icon={<Briefcase size={16} />} 
                isOpen={showFunctionDropdown} 
                onToggle={toggleFunctionDropdown} 
                options={FUNCTIONS.map(func => func.toLowerCase())} 
                selectedOptions={filters.functions} 
                onOptionToggle={toggleFunctionFilter} 
                onClear={() => setFilters(prev => ({
                  ...prev,
                  functions: []
                }))} 
              />
              
              <FilterDropdown 
                title="role" 
                icon={<Users size={16} />} 
                isOpen={showRoleDropdown} 
                onToggle={toggleRoleDropdown} 
                options={ROLES.map(role => role.toLowerCase())} 
                selectedOptions={filters.roles} 
                onOptionToggle={toggleRoleFilter} 
                onClear={() => setFilters(prev => ({
                  ...prev,
                  roles: []
                }))} 
              />
              
              <FilterDropdown 
                title="use case" 
                icon={<TagIcon size={16} />} 
                isOpen={showUseCaseDropdown} 
                onToggle={toggleUseCaseDropdown} 
                options={USE_CASES.map(useCase => useCase.toLowerCase())} 
                selectedOptions={filters.useCases} 
                onOptionToggle={toggleUseCaseFilter} 
                onClear={() => setFilters(prev => ({
                  ...prev,
                  useCases: []
                }))} 
              />
              
              <EUComplianceFilter 
                isOpen={showEUDropdown} 
                onToggle={toggleEUDropdown} 
                filters={filters.euCompliant} 
                onFilterToggle={toggleEUFilter} 
                onClear={() => setFilters(prev => ({
                  ...prev,
                  euCompliant: {
                    gdpr: false,
                    dataResidency: false,
                    aiAct: false
                  }
                }))} 
              />
              
              <Button variant="outline" size="sm" className={cn("border-neutral-700 gap-2", isDarkMode ? "bg-[#222222] hover:bg-neutral-800" : "bg-white hover:bg-neutral-100")}>
                <ArrowUpDown size={16} />
                sort
              </Button>
              
              {activeFilterCount > 0 && <Button variant="ghost" size="sm" onClick={clearFilters} className={cn(mutedTextColor)}>
                  clear all
                </Button>}
            </div>
          </div>
          
          <ToolsTable tools={filteredTools} isLoading={isLoading} />
        </div>
      </div>
    </motion.div>;
};

export default DatabaseTableView;
