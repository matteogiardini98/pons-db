
import { useState, useEffect } from 'react';
import { Tag, Users, ArrowUpDown } from 'lucide-react';
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

const DatabaseTableView = () => {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [tools, setTools] = useState<AiTool[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    industries: [],
    functions: [],
    businessTypes: [],
    technicalLevel: [],
    euCompliant: {
      gdpr: false,
      dataResidency: false,
    },
  });
  const [showIndustryDropdown, setShowIndustryDropdown] = useState(false);
  const [showFunctionDropdown, setShowFunctionDropdown] = useState(false);
  const [showEUDropdown, setShowEUDropdown] = useState(false);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      setTools(mockTools);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const toggleIndustryFilter = (industry) => {
    setFilters(prev => {
      const industries = prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry];
      
      return { ...prev, industries };
    });
  };

  const toggleFunctionFilter = (func) => {
    setFilters(prev => {
      const functions = prev.functions.includes(func)
        ? prev.functions.filter(f => f !== func)
        : [...prev.functions, func];
      
      return { ...prev, functions };
    });
  };

  const toggleEUFilter = (type: 'gdpr' | 'dataResidency') => {
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
      },
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

  const filteredTools = tools.filter((tool) => {
    // Search filter
    if (
      searchTerm &&
      !tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Industry filter
    if (filters.industries.length > 0 && !tool.industries.some(industry => 
      filters.industries.includes(industry)
    )) {
      return false;
    }

    // Function filter
    if (filters.functions.length > 0 && !tool.functions.some(func => 
      filters.functions.includes(func)
    )) {
      return false;
    }

    // EU Compliance filter
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

  const activeFilterCount = 
    filters.industries.length + 
    filters.functions.length + 
    (filters.euCompliant.gdpr ? 1 : 0) + 
    (filters.euCompliant.dataResidency ? 1 : 0);

  return (
    <motion.div 
      className={cn("min-h-screen pt-16", textColor)}
      {...pageTransition}
    >
      <div className="container-tight p-4 md:p-6">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src={isDarkMode 
                ? '/lovable-uploads/46fb78ce-090f-4f3e-a4cc-ef63c7432ed9.png'
                : '/lovable-uploads/6441194c-6a93-4e33-b3bd-51bef2eaae84.png'
              } 
              alt="pons41 logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-3xl md:text-4xl font-medium">pons41</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} />
            
            <div className="flex flex-wrap gap-2">
              <FilterDropdown
                title="Industry"
                icon={<Tag size={16} />}
                isOpen={showIndustryDropdown}
                onToggle={toggleIndustryDropdown}
                options={INDUSTRIES}
                selectedOptions={filters.industries}
                onOptionToggle={toggleIndustryFilter}
                onClear={() => setFilters(prev => ({ ...prev, industries: [] }))}
              />
              
              <FilterDropdown
                title="Function"
                icon={<Users size={16} />}
                isOpen={showFunctionDropdown}
                onToggle={toggleFunctionDropdown}
                options={FUNCTIONS}
                selectedOptions={filters.functions}
                onOptionToggle={toggleFunctionFilter}
                onClear={() => setFilters(prev => ({ ...prev, functions: [] }))}
              />
              
              <EUComplianceFilter
                isOpen={showEUDropdown}
                onToggle={toggleEUDropdown}
                filters={filters.euCompliant}
                onFilterToggle={toggleEUFilter}
                onClear={() => setFilters(prev => ({ 
                  ...prev, 
                  euCompliant: { gdpr: false, dataResidency: false } 
                }))}
              />
              
              <Button variant="outline" size="sm" className={cn("border-neutral-700 gap-2", 
                isDarkMode ? "bg-[#222222] hover:bg-neutral-800" : "bg-white hover:bg-neutral-100"
              )}>
                <ArrowUpDown size={16} />
                Sort
              </Button>
              
              {activeFilterCount > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearFilters}
                  className={cn(mutedTextColor)}
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
          
          <ToolsTable tools={filteredTools} isLoading={isLoading} />
        </div>
      </div>
    </motion.div>
  );
};

export default DatabaseTableView;
