
import { useState, useEffect } from 'react';
import { AiTool, FilterState } from '@/utils/types';
import { mockTools } from '@/utils/data';
import ToolCard from './ToolCard';
import FilterBar from './FilterBar';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

const DatabaseView = () => {
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

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
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
    if (
      filters.industries.length > 0 &&
      !tool.industries.some((industry) => filters.industries.includes(industry))
    ) {
      return false;
    }

    // Function filter
    if (
      filters.functions.length > 0 &&
      !tool.functions.some((func) => filters.functions.includes(func))
    ) {
      return false;
    }

    // Business type filter
    if (
      filters.businessTypes.length > 0 &&
      !tool.businessTypes.some((type) => filters.businessTypes.includes(type))
    ) {
      return false;
    }

    // Technical level filter
    if (
      filters.technicalLevel.length > 0 &&
      !filters.technicalLevel.includes(tool.technicalLevel)
    ) {
      return false;
    }

    // EU compliance filters
    if (filters.euCompliant.gdpr && !tool.euCompliant.gdpr) {
      return false;
    }

    if (filters.euCompliant.dataResidency && !tool.euCompliant.dataResidency) {
      return false;
    }

    return true;
  });

  return (
    <div className="min-h-screen pt-20">
      <div className="container-tight py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-display font-medium mb-4">AI Solutions Database</h2>
          <p className="text-muted-foreground max-w-2xl">
            Discover AI tools that solve real business challenges for European companies. 
            Filter by industry, function, and technical requirements.
          </p>
        </div>

        <div className="mb-6">
          <Input
            type="search"
            placeholder="Search for AI tools..."
            className="max-w-lg"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        
        <Separator className="my-6" />

        <FilterBar filters={filters} onFilterChange={handleFilterChange} />

        <div className="py-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 size={40} className="animate-spin text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading AI tools...</p>
            </div>
          ) : filteredTools.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="bg-muted rounded-full p-6 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted-foreground h-10 w-10"
                >
                  <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" x2="12" y1="9" y2="13" />
                  <line x1="12" x2="12.01" y1="17" y2="17" />
                </svg>
              </div>
              <h3 className="text-xl font-medium mb-2">No AI tools found</h3>
              <p className="text-muted-foreground max-w-md mb-6">
                We couldn't find any AI tools matching your search criteria. Try adjusting your filters or search term.
              </p>
              <Button variant="outline" onClick={() => {
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
                setSearchTerm('');
              }}>
                Reset filters
              </Button>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-sm text-muted-foreground">
                  Showing <span className="font-medium">{filteredTools.length}</span> AI tools
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.id} tool={tool} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatabaseView;
