import { useState } from 'react';
import { Sliders, X, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { FilterState } from '@/utils/types';
import { FUNCTIONS, ROLES, USE_CASES, TECHNICAL_LEVELS } from '@/components/database/filterConstants';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
}

const FilterBar = ({ filters, onFilterChange }: FilterBarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const handleFunctionToggle = (func: string) => {
    const newFunctions = filters.functions.includes(func)
      ? filters.functions.filter(f => f !== func)
      : [...filters.functions, func];
    
    onFilterChange({
      ...filters,
      functions: newFunctions,
    });
  };

  const handleRoleToggle = (role: string) => {
    const newRoles = filters.roles.includes(role)
      ? filters.roles.filter(r => r !== role)
      : [...filters.roles, role];
    
    onFilterChange({
      ...filters,
      roles: newRoles,
    });
  };

  const handleUseCaseToggle = (useCase: string) => {
    const newUseCases = filters.useCases.includes(useCase)
      ? filters.useCases.filter(u => u !== useCase)
      : [...filters.useCases, useCase];
    
    onFilterChange({
      ...filters,
      useCases: newUseCases,
    });
  };
  
  const handleTechnicalLevelToggle = (level: string) => {
    const newLevels = filters.technicalLevel.includes(level)
      ? filters.technicalLevel.filter(l => l !== level)
      : [...filters.technicalLevel, level];
    
    onFilterChange({
      ...filters,
      technicalLevel: newLevels,
    });
  };

  const handleGdprToggle = () => {
    onFilterChange({
      ...filters,
      euCompliant: {
        ...filters.euCompliant,
        gdpr: !filters.euCompliant.gdpr,
      },
    });
  };

  const handleDataResidencyToggle = () => {
    onFilterChange({
      ...filters,
      euCompliant: {
        ...filters.euCompliant,
        dataResidency: !filters.euCompliant.dataResidency,
      },
    });
  };

  const resetFilters = () => {
    onFilterChange({
      functions: [],
      roles: [],
      useCases: [],
      technicalLevel: [],
      euCompliant: {
        gdpr: false,
        dataResidency: false,
      },
    });
  };

  const activeFilterCount = 
    filters.functions.length + 
    filters.roles.length + 
    filters.useCases.length + 
    filters.technicalLevel.length + 
    (filters.euCompliant.gdpr ? 1 : 0) + 
    (filters.euCompliant.dataResidency ? 1 : 0);

  return (
    <div className="w-full bg-white shadow-sm border-b sticky top-16 z-30 py-3">
      <div className="container-tight">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                  <Sliders size={16} />
                  Filters
                  {activeFilterCount > 0 && (
                    <Badge variant="secondary" className="ml-1 h-5 min-w-5 px-1.5 flex items-center justify-center rounded-full">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[340px] sm:w-[500px] p-0">
                <div className="flex items-center justify-between border-b p-3">
                  <h4 className="font-medium">Filters</h4>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 px-2 text-muted-foreground" 
                    onClick={resetFilters}
                  >
                    Reset
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
                  <div className="space-y-4">
                    <FilterSection title="Function">
                      <div className="flex flex-wrap gap-2">
                        {FUNCTIONS.map((func) => (
                          <FilterChip
                            key={func}
                            label={func}
                            selected={filters.functions.includes(func)}
                            onClick={() => handleFunctionToggle(func)}
                          />
                        ))}
                      </div>
                    </FilterSection>
                    
                    <FilterSection title="Role">
                      <div className="flex flex-wrap gap-2">
                        {ROLES.map((role) => (
                          <FilterChip
                            key={role}
                            label={role}
                            selected={filters.roles.includes(role)}
                            onClick={() => handleRoleToggle(role)}
                          />
                        ))}
                      </div>
                    </FilterSection>
                  </div>
                  
                  <div className="space-y-4">
                    <FilterSection title="Use Case">
                      <div className="flex flex-wrap gap-2">
                        {USE_CASES.map((useCase) => (
                          <FilterChip
                            key={useCase}
                            label={useCase}
                            selected={filters.useCases.includes(useCase)}
                            onClick={() => handleUseCaseToggle(useCase)}
                          />
                        ))}
                      </div>
                    </FilterSection>
                    
                    <FilterSection title="Technical Level">
                      <div className="flex flex-wrap gap-2">
                        {TECHNICAL_LEVELS.map((level) => (
                          <FilterChip
                            key={level}
                            label={level}
                            selected={filters.technicalLevel.includes(level)}
                            onClick={() => handleTechnicalLevelToggle(level)}
                          />
                        ))}
                      </div>
                    </FilterSection>
                    
                    <FilterSection title="EU Specific">
                      <div className="flex flex-wrap gap-2">
                        <FilterChip
                          label="GDPR Compliant"
                          selected={filters.euCompliant.gdpr}
                          onClick={handleGdprToggle}
                        />
                        <FilterChip
                          label="EU Data Residency"
                          selected={filters.euCompliant.dataResidency}
                          onClick={handleDataResidencyToggle}
                        />
                      </div>
                    </FilterSection>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 border-t p-3">
                  <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                  <Button onClick={() => setIsOpen(false)}>Apply Filters</Button>
                </div>
              </PopoverContent>
            </Popover>
            
            {/* Active filter badges */}
            <div className="flex-wrap hidden md:flex gap-2">
              {filters.functions.map((func) => (
                <ActiveFilterBadge
                  key={`func-${func}`}
                  label={func}
                  onRemove={() => handleFunctionToggle(func)}
                />
              ))}
              
              {filters.roles.map((role) => (
                <ActiveFilterBadge
                  key={`role-${role}`}
                  label={role}
                  onRemove={() => handleRoleToggle(role)}
                />
              ))}
              
              {filters.useCases.map((useCase) => (
                <ActiveFilterBadge
                  key={`useCase-${useCase}`}
                  label={useCase}
                  onRemove={() => handleUseCaseToggle(useCase)}
                />
              ))}
              
              {filters.technicalLevel.map((level) => (
                <ActiveFilterBadge
                  key={`tech-${level}`}
                  label={level}
                  onRemove={() => handleTechnicalLevelToggle(level)}
                />
              ))}
              
              {filters.euCompliant.gdpr && (
                <ActiveFilterBadge
                  key="gdpr"
                  label="GDPR Compliant"
                  onRemove={handleGdprToggle}
                />
              )}
              
              {filters.euCompliant.dataResidency && (
                <ActiveFilterBadge
                  key="data-residency"
                  label="EU Data Residency"
                  onRemove={handleDataResidencyToggle}
                />
              )}
            </div>
            
            {activeFilterCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-8 px-2 text-muted-foreground" 
                onClick={resetFilters}
              >
                Clear all
              </Button>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  Sort by
                  <ChevronDown size={16} />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-1">
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start font-normal text-sm">Relevance</Button>
                  <Button variant="ghost" className="w-full justify-start font-normal text-sm">Name (A-Z)</Button>
                  <Button variant="ghost" className="w-full justify-start font-normal text-sm">Newest First</Button>
                  <Button variant="ghost" className="w-full justify-start font-normal text-sm">Rating (High to Low)</Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FilterSection = ({ title, children }: FilterSectionProps) => (
  <div className="space-y-2">
    <h5 className="text-sm font-medium">{title}</h5>
    {children}
  </div>
);

interface FilterChipProps {
  label: string;
  selected: boolean;
  onClick: () => void;
}

const FilterChip = ({ label, selected, onClick }: FilterChipProps) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-sm transition-colors",
      selected
        ? "bg-primary text-primary-foreground"
        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
    )}
  >
    {selected && <Check className="mr-1 h-3 w-3" />}
    {label}
  </button>
);

interface ActiveFilterBadgeProps {
  label: string;
  onRemove: () => void;
}

const ActiveFilterBadge = ({ label, onRemove }: ActiveFilterBadgeProps) => (
  <Badge variant="secondary" className="gap-1">
    {label}
    <button onClick={onRemove} className="ml-1 hover:text-destructive">
      <X size={12} />
    </button>
  </Badge>
);

export default FilterBar;
