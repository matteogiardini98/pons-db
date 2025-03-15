import { useState, useEffect } from 'react';
import { Tag, Users, ArrowUpDown, ImageOff } from 'lucide-react';
import { AiTool, FilterState } from '@/utils/types';
import { mockTools } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { pageTransition } from '@/utils/animations';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import EUComplianceFilter from './EUComplianceFilter';
import ToolsTable from './ToolsTable';
import { INDUSTRIES, FUNCTIONS } from './filterConstants';
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
    industries: [],
    functions: [],
    businessTypes: [],
    technicalLevel: [],
    euCompliant: {
      gdpr: false,
      dataResidency: false,
      aiAct: false
    }
  });
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showFunctionDropdown, setShowFunctionDropdown] = useState(false);
  const [showEUDropdown, setShowEUDropdown] = useState(false);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*');
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          const mappedTools: AiTool[] = data.map(tool => ({
            id: tool.id,
            name: tool.name,
            description: tool.description,
            url: tool.website,
            logo: '',
            industries: tool.industries,
            functions: tool.functions,
            businessTypes: tool.business_types,
            technicalLevel: tool.technical_level || 'medium',
            features: tool.features || [],
            euCompliant: {
              gdpr: tool.gdpr_compliant || false,
              dataResidency: tool.data_residency || false,
              aiAct: tool.ai_act_compliant || false
            },
            reviews: []
          }));
          
          setTools(mappedTools);
        } else {
          setTools(mockTools);
        }
      } catch (error) {
        console.error("Error fetching tools:", error);
        setTools(mockTools);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTools();
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleIndustryFilter = industry => {
    setFilters(prev => {
      const industries = prev.industries.includes(industry) ? prev.industries.filter(i => i !== industry) : [...prev.industries, industry];
      return {
        ...prev,
        industries
      };
    });
  };

  const toggleFunctionFilter = func => {
    setFilters(prev => {
      const functions = prev.functions.includes(func) ? prev.functions.filter(f => f !== func) : [...prev.functions, func];
      return {
        ...prev,
        functions
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
      industries: [],
      functions: [],
      businessTypes: [],
      technicalLevel: [],
      euCompliant: {
        gdpr: false,
        dataResidency: false,
        aiAct: false
      }
    });
  };

  const toggleIndustryDropdown = () => {
    setShowIndustryDropdown(!showIndustryDropdown);
    setShowFunctionDropdown(false);
    setShowEUDropdown(false);
  };

  const toggleFunctionDropdown = () => {
    setShowFunctionDropdown(!showFunctionDropdown);
    setShowIndustryDropdown(false);
    setShowEUDropdown(false);
  };

  const toggleEUDropdown = () => {
    setShowEUDropdown(!showEUDropdown);
    setShowIndustryDropdown(false);
    setShowFunctionDropdown(false);
  };

  const filteredTools = tools.filter(tool => {
    if (searchTerm && !tool.name.toLowerCase().includes(searchTerm.toLowerCase()) && !tool.description.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }

    if (filters.industries.length > 0 && !tool.industries.some(industry => filters.industries.includes(industry))) {
      return false;
    }

    if (filters.functions.length > 0 && !tool.functions.some(func => filters.functions.includes(func))) {
      return false;
    }

    if (filters.euCompliant.gdpr && !tool.euCompliant.gdpr) {
      return false;
    }
    if (filters.euCompliant.dataResidency && !tool.euCompliant.dataResidency) {
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

  const activeFilterCount = filters.industries.length + filters.functions.length + (filters.euCompliant.gdpr ? 1 : 0) + (filters.euCompliant.dataResidency ? 1 : 0) + (filters.euCompliant.aiAct ? 1 : 0);

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
              <FilterDropdown title="industry" icon={<Tag size={16} />} isOpen={showIndustryDropdown} onToggle={toggleIndustryDropdown} options={INDUSTRIES.map(industry => industry.toLowerCase())} selectedOptions={filters.industries} onOptionToggle={toggleIndustryFilter} onClear={() => setFilters(prev => ({
              ...prev,
              industries: []
            }))} />
              
              <FilterDropdown title="function" icon={<Users size={16} />} isOpen={showFunctionDropdown} onToggle={toggleFunctionDropdown} options={FUNCTIONS.map(func => func.toLowerCase())} selectedOptions={filters.functions} onOptionToggle={toggleFunctionFilter} onClear={() => setFilters(prev => ({
              ...prev,
              functions: []
            }))} />
              
              <EUComplianceFilter isOpen={showEUDropdown} onToggle={toggleEUDropdown} filters={filters.euCompliant} onFilterToggle={toggleEUFilter} onClear={() => setFilters(prev => ({
              ...prev,
              euCompliant: {
                gdpr: false,
                dataResidency: false,
                aiAct: false
              }
            }))} />
              
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
