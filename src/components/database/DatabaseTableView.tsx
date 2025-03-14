
import { useState, useEffect } from 'react';
import { Search, Tag, Users, MapPin, ArrowUpDown, ChevronDown } from 'lucide-react';
import { AiTool, FilterState, Industry, BusinessFunction } from '@/utils/types';
import { mockTools } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { pageTransition } from '@/utils/animations';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const INDUSTRIES = [
  'Retail',
  'Automotive',
  'Tech SaaS',
  'Agriculture',
  'Pharma',
  'Food & Beverage',
  'Construction & Real Estate',
  'Financial Services',
  'Education',
  'Hospitality',
  'Transportation & Logistics',
  'Professional Services',
  'Entertainment',
];

const FUNCTIONS = [
  'Marketing',
  'Business Development',
  'Field Sales',
  'Sales Engineering',
  'Product Development',
  'Research & Development',
  'Customer Support',
  'Production / Manufacturing',
  'Finance & Accounting',
];

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
  const navigate = useNavigate();
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

  const toggleIndustryFilter = (industry: Industry) => {
    setFilters(prev => {
      const industries = prev.industries.includes(industry)
        ? prev.industries.filter(i => i !== industry)
        : [...prev.industries, industry];
      
      return { ...prev, industries };
    });
  };

  const toggleFunctionFilter = (func: BusinessFunction) => {
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
  const bgColor = isDarkMode ? 'bg-[#222222]' : 'bg-white';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-neutral-400' : 'text-neutral-500';
  const borderColor = isDarkMode ? 'border-neutral-700' : 'border-neutral-200';
  const headerBgColor = isDarkMode ? 'bg-[#1a1a1a]' : 'bg-neutral-50';
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
            <div className="relative flex-grow max-w-lg">
              <Search className={cn("absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4", mutedTextColor)} />
              <Input
                type="search"
                placeholder="Search for AI tools..."
                className={cn("pl-10", 
                  isDarkMode 
                    ? "bg-[#333333] border-neutral-700 text-white" 
                    : "bg-white border-neutral-200 text-black"
                )}
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn("border-neutral-700 gap-2", 
                    isDarkMode ? "bg-[#222222] hover:bg-neutral-800" : "bg-white hover:bg-neutral-100",
                    showIndustryDropdown && (isDarkMode ? "bg-neutral-800" : "bg-neutral-100")
                  )}
                  onClick={() => {
                    setShowIndustryDropdown(!showIndustryDropdown);
                    setShowFunctionDropdown(false);
                    setShowEUDropdown(false);
                  }}
                >
                  <Tag size={16} />
                  Industry
                  {filters.industries.length > 0 && (
                    <Badge variant={isDarkMode ? "secondary" : "outline"} className="ml-1">
                      {filters.industries.length}
                    </Badge>
                  )}
                  <ChevronDown size={14} className={cn(
                    "transition-transform",
                    showIndustryDropdown && "transform rotate-180"
                  )} />
                </Button>
                
                {showIndustryDropdown && (
                  <div className={cn(
                    "absolute mt-1 p-2 rounded-md shadow-lg w-64 z-50",
                    isDarkMode ? "bg-[#333333] border border-neutral-700" : "bg-white border border-neutral-200"
                  )}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={cn("text-sm font-medium", textColor)}>Industries</h4>
                      {filters.industries.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 text-xs px-2"
                          onClick={() => setFilters(prev => ({ ...prev, industries: [] }))}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                      {INDUSTRIES.map((industry) => (
                        <div key={industry} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`industry-${industry}`} 
                            checked={filters.industries.includes(industry as Industry)}
                            onCheckedChange={() => toggleIndustryFilter(industry as Industry)}
                          />
                          <label 
                            htmlFor={`industry-${industry}`}
                            className={cn("text-sm cursor-pointer", textColor)}
                          >
                            {industry}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn("border-neutral-700 gap-2", 
                    isDarkMode ? "bg-[#222222] hover:bg-neutral-800" : "bg-white hover:bg-neutral-100",
                    showFunctionDropdown && (isDarkMode ? "bg-neutral-800" : "bg-neutral-100")
                  )}
                  onClick={() => {
                    setShowFunctionDropdown(!showFunctionDropdown);
                    setShowIndustryDropdown(false);
                    setShowEUDropdown(false);
                  }}
                >
                  <Users size={16} />
                  Function
                  {filters.functions.length > 0 && (
                    <Badge variant={isDarkMode ? "secondary" : "outline"} className="ml-1">
                      {filters.functions.length}
                    </Badge>
                  )}
                  <ChevronDown size={14} className={cn(
                    "transition-transform",
                    showFunctionDropdown && "transform rotate-180"
                  )} />
                </Button>
                
                {showFunctionDropdown && (
                  <div className={cn(
                    "absolute mt-1 p-2 rounded-md shadow-lg w-64 z-50",
                    isDarkMode ? "bg-[#333333] border border-neutral-700" : "bg-white border border-neutral-200"
                  )}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={cn("text-sm font-medium", textColor)}>Functions</h4>
                      {filters.functions.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={() => setFilters(prev => ({ ...prev, functions: [] }))}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="max-h-60 overflow-y-auto space-y-1 pr-1">
                      {FUNCTIONS.map((func) => (
                        <div key={func} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`function-${func}`} 
                            checked={filters.functions.includes(func as BusinessFunction)}
                            onCheckedChange={() => toggleFunctionFilter(func as BusinessFunction)}
                          />
                          <label 
                            htmlFor={`function-${func}`}
                            className={cn("text-sm cursor-pointer", textColor)}
                          >
                            {func}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="relative">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn("border-neutral-700 gap-2", 
                    isDarkMode ? "bg-[#222222] hover:bg-neutral-800" : "bg-white hover:bg-neutral-100",
                    showEUDropdown && (isDarkMode ? "bg-neutral-800" : "bg-neutral-100")
                  )}
                  onClick={() => {
                    setShowEUDropdown(!showEUDropdown);
                    setShowIndustryDropdown(false);
                    setShowFunctionDropdown(false);
                  }}
                >
                  <MapPin size={16} />
                  EU-ready
                  {(filters.euCompliant.gdpr || filters.euCompliant.dataResidency) && (
                    <Badge variant={isDarkMode ? "secondary" : "outline"} className="ml-1">
                      {Number(filters.euCompliant.gdpr) + Number(filters.euCompliant.dataResidency)}
                    </Badge>
                  )}
                  <ChevronDown size={14} className={cn(
                    "transition-transform",
                    showEUDropdown && "transform rotate-180"
                  )} />
                </Button>
                
                {showEUDropdown && (
                  <div className={cn(
                    "absolute mt-1 p-2 rounded-md shadow-lg w-64 z-50",
                    isDarkMode ? "bg-[#333333] border border-neutral-700" : "bg-white border border-neutral-200"
                  )}>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className={cn("text-sm font-medium", textColor)}>EU Compliance</h4>
                      {(filters.euCompliant.gdpr || filters.euCompliant.dataResidency) && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="h-6 text-xs px-2"
                          onClick={() => setFilters(prev => ({ 
                            ...prev, 
                            euCompliant: { gdpr: false, dataResidency: false } 
                          }))}
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="gdpr" 
                          checked={filters.euCompliant.gdpr}
                          onCheckedChange={() => toggleEUFilter('gdpr')}
                        />
                        <label 
                          htmlFor="gdpr"
                          className={cn("text-sm cursor-pointer", textColor)}
                        >
                          GDPR Compliant
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox 
                          id="dataResidency" 
                          checked={filters.euCompliant.dataResidency}
                          onCheckedChange={() => toggleEUFilter('dataResidency')}
                        />
                        <label 
                          htmlFor="dataResidency"
                          className={cn("text-sm cursor-pointer", textColor)}
                        >
                          EU Data Residency
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
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
          
          {isLoading ? (
            <div className="w-full h-96 flex items-center justify-center">
              <div className={cn("animate-spin rounded-full h-12 w-12 border-t-2 border-b-2", isDarkMode ? "border-white" : "border-black")}></div>
            </div>
          ) : (
            <div className={cn("rounded-lg overflow-hidden border", bgColor, borderColor)}>
              <Table className={textColor}>
                <TableHeader className={headerBgColor}>
                  <TableRow className={borderColor}>
                    <TableHead className={textColor}>Name</TableHead>
                    <TableHead className={cn("max-w-xs hidden md:table-cell", textColor)}>Description</TableHead>
                    <TableHead className={cn("hidden md:table-cell", textColor)}>Industry Tags</TableHead>
                    <TableHead className={cn("hidden md:table-cell", textColor)}>Function Tags</TableHead>
                    <TableHead className={cn("hidden xl:table-cell", textColor)}>Stage</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTools.map((tool) => (
                    <TableRow 
                      key={tool.id} 
                      className={cn(borderColor, hoverBgColor, "cursor-pointer")}
                      onClick={() => navigate(`/tool/${tool.id}`)}
                    >
                      <TableCell className="py-4">
                        <div className="font-medium">{tool.name}</div>
                      </TableCell>
                      <TableCell className="max-w-xs hidden md:table-cell">
                        <div className={cn("line-clamp-2", isDarkMode ? "text-neutral-300" : "text-neutral-600")}>{tool.description}</div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.industries.slice(0, 2).map((industry) => (
                            <Badge key={industry} variant="outline" className={cn(
                              "bg-transparent border-neutral-600",
                              isDarkMode ? "text-neutral-300" : "text-neutral-600"
                            )}>
                              {industry}
                            </Badge>
                          ))}
                          {tool.industries.length > 2 && (
                            <Badge variant="outline" className={cn(
                              "bg-transparent border-neutral-600",
                              isDarkMode ? "text-neutral-300" : "text-neutral-600"
                            )}>
                              +{tool.industries.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.functions.slice(0, 2).map((func) => (
                            <Badge key={func} variant="outline" className={cn(
                              "bg-transparent border-neutral-600",
                              isDarkMode ? "text-neutral-300" : "text-neutral-600"
                            )}>
                              {func}
                            </Badge>
                          ))}
                          {tool.functions.length > 2 && (
                            <Badge variant="outline" className={cn(
                              "bg-transparent border-neutral-600",
                              isDarkMode ? "text-neutral-300" : "text-neutral-600"
                            )}>
                              +{tool.functions.length - 2}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <Badge 
                          className={`${
                            tool.reviews.length > 5 ? 'bg-green-900 text-green-100' : 
                            tool.reviews.length > 0 ? 'bg-amber-900 text-amber-100' : 
                            isDarkMode ? 'bg-neutral-800 text-neutral-300' : 'bg-neutral-200 text-neutral-600'
                          }`}
                        >
                          {tool.reviews.length > 5 ? 'Seed' : 
                           tool.reviews.length > 0 ? '1-10' : 'Unknown'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className={cn("flex items-center justify-between p-4 border-t text-sm", borderColor, headerBgColor)}>
                <div className={mutedTextColor}>
                  {filteredTools.length} results • Page 1/1
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn("border-neutral-700", buttonBgColor, hoverBgColor)} 
                    disabled
                  >
                    Previous
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn("border-neutral-700", buttonBgColor, hoverBgColor)} 
                    disabled
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DatabaseTableView;
