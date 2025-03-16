
import { useState } from 'react';
import { Sliders, X, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { FilterState } from '@/utils/types';
import { FUNCTIONS, ROLES, USE_CASES, TECHNICAL_LEVELS } from '@/components/database/filterConstants';
import { cn } from '@/lib/utils';
import FilterSection from './FilterSection';
import FilterChip from './FilterChip';
import ActiveFilterBadge from './ActiveFilterBadge';
import SortingPopover from './SortingPopover';

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

  const handleAiActToggle = () => {
    onFilterChange({
      ...filters,
      euCompliant: {
        ...filters.euCompliant,
        aiAct: !filters.euCompliant.aiAct,
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
        aiAct: false
      },
    });
  };

  const activeFilterCount = 
    filters.functions.length + 
    filters.roles.length + 
    filters.useCases.length + 
    filters.technicalLevel.length + 
    (filters.euCompliant.gdpr ? 1 : 0) + 
    (filters.euCompliant.dataResidency ? 1 : 0) +
    (filters.euCompliant.aiAct ? 1 : 0);

  return (
    <div className="w-full bg-white shadow-sm border-b sticky top-16 z-30 py-3">
      <div className="container-tight">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <FilterControls 
            isOpen={isOpen} 
            setIsOpen={setIsOpen} 
            activeFilterCount={activeFilterCount} 
            filters={filters}
            handleFunctionToggle={handleFunctionToggle}
            handleRoleToggle={handleRoleToggle}
            handleUseCaseToggle={handleUseCaseToggle}
            handleTechnicalLevelToggle={handleTechnicalLevelToggle}
            handleGdprToggle={handleGdprToggle}
            handleDataResidencyToggle={handleDataResidencyToggle}
            handleAiActToggle={handleAiActToggle}
            resetFilters={resetFilters}
          />
          
          <div className="flex items-center gap-2">
            <SortingPopover />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FilterControlsProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  activeFilterCount: number;
  filters: FilterState;
  handleFunctionToggle: (func: string) => void;
  handleRoleToggle: (role: string) => void;
  handleUseCaseToggle: (useCase: string) => void;
  handleTechnicalLevelToggle: (level: string) => void;
  handleGdprToggle: () => void;
  handleDataResidencyToggle: () => void;
  handleAiActToggle: () => void;
  resetFilters: () => void;
}

const FilterControls = ({
  isOpen,
  setIsOpen,
  activeFilterCount,
  filters,
  handleFunctionToggle,
  handleRoleToggle,
  handleUseCaseToggle,
  handleTechnicalLevelToggle,
  handleGdprToggle,
  handleDataResidencyToggle,
  handleAiActToggle,
  resetFilters
}: FilterControlsProps) => {
  return (
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
                  <FilterChip
                    label="AI Act Compliant"
                    selected={filters.euCompliant.aiAct}
                    onClick={handleAiActToggle}
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
      <ActiveFilterBadges 
        filters={filters}
        handleFunctionToggle={handleFunctionToggle}
        handleRoleToggle={handleRoleToggle}
        handleUseCaseToggle={handleUseCaseToggle}
        handleTechnicalLevelToggle={handleTechnicalLevelToggle}
        handleGdprToggle={handleGdprToggle}
        handleDataResidencyToggle={handleDataResidencyToggle}
        handleAiActToggle={handleAiActToggle}
      />
      
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
  );
};

interface ActiveFilterBadgesProps {
  filters: FilterState;
  handleFunctionToggle: (func: string) => void;
  handleRoleToggle: (role: string) => void;
  handleUseCaseToggle: (useCase: string) => void;
  handleTechnicalLevelToggle: (level: string) => void;
  handleGdprToggle: () => void;
  handleDataResidencyToggle: () => void;
  handleAiActToggle: () => void;
}

const ActiveFilterBadges = ({
  filters,
  handleFunctionToggle,
  handleRoleToggle,
  handleUseCaseToggle,
  handleTechnicalLevelToggle,
  handleGdprToggle,
  handleDataResidencyToggle,
  handleAiActToggle
}: ActiveFilterBadgesProps) => {
  return (
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
      
      {filters.euCompliant.aiAct && (
        <ActiveFilterBadge
          key="ai-act"
          label="AI Act Compliant"
          onRemove={handleAiActToggle}
        />
      )}
    </div>
  );
};

export default FilterBar;
