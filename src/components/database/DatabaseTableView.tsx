
import { useState, useEffect } from 'react';
import { FilterState } from '@/utils/types';
import { toast } from '@/components/ui/use-toast';
import ToolsTable from './ToolsTable';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import FilterDropdown from './FilterDropdown';
import EUComplianceFilter from './EUComplianceFilter';
import { FUNCTIONS, ROLES } from './filterConstants';
import useToolsData from '@/hooks/use-tools-data';
import { DatabaseIcon, Users } from 'lucide-react';

export default function DatabaseTableView() {
  const [searchQuery, setSearchQuery] = useState('');
  const { tools, isLoading, error } = useToolsData();
  const [functionsOpen, setFunctionsOpen] = useState(false);
  const [rolesOpen, setRolesOpen] = useState(false);
  const [euComplianceOpen, setEUComplianceOpen] = useState(false);
  
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

  const handleFunctionToggle = (func: string) => {
    const newFunctions = filterState.functions.includes(func)
      ? filterState.functions.filter(f => f !== func)
      : [...filterState.functions, func];
    
    setFilterState({
      ...filterState,
      functions: newFunctions,
    });
  };

  const handleRoleToggle = (role: string) => {
    const newRoles = filterState.roles.includes(role)
      ? filterState.roles.filter(r => r !== role)
      : [...filterState.roles, role];
    
    setFilterState({
      ...filterState,
      roles: newRoles,
    });
  };

  const handleEUComplianceToggle = (type: 'gdpr' | 'dataResidency' | 'aiAct') => {
    setFilterState({
      ...filterState,
      euCompliant: {
        ...filterState.euCompliant,
        [type]: !filterState.euCompliant[type],
      },
    });
  };

  const clearFunctionsFilter = () => {
    setFilterState({
      ...filterState,
      functions: [],
    });
  };

  const clearRolesFilter = () => {
    setFilterState({
      ...filterState,
      roles: [],
    });
  };

  const clearEUComplianceFilter = () => {
    setFilterState({
      ...filterState,
      euCompliant: {
        gdpr: false,
        dataResidency: false,
        aiAct: false,
      },
    });
  };

  const getFilteredTools = () => {
    if (!tools) return [];
    
    let filteredTools = [...tools];
  
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
        // Simplified check since we're now using a boolean
        return Boolean(tool.euCompliant?.gdpr_compliant);
      });
    }

    if (filterState.euCompliant.dataResidency) {
      filteredTools = filteredTools.filter(tool =>
        Boolean(tool.euCompliant?.data_residency)
      );
    }

    if (filterState.euCompliant.aiAct) {
      filteredTools = filteredTools.filter(tool =>
        Boolean(tool.euCompliant?.ai_act_compliant)
      );
    }
  
    return filteredTools;
  };
  
  return (
    <div className="mx-auto w-full max-w-8xl">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex flex-wrap gap-2 items-center">
          <SearchBar 
            searchTerm={searchQuery} 
            onSearchChange={(e) => setSearchQuery(e.target.value)} 
            placeholder="Search AI tools by name..." 
          />
          
          <div className="flex flex-wrap gap-2">
            <FilterDropdown
              title="Function"
              icon={<DatabaseIcon size={16} />}
              isOpen={functionsOpen}
              onToggle={() => {
                setFunctionsOpen(!functionsOpen);
                setRolesOpen(false);
                setEUComplianceOpen(false);
              }}
              options={FUNCTIONS}
              selectedOptions={filterState.functions}
              onOptionToggle={handleFunctionToggle}
              onClear={clearFunctionsFilter}
            />
            
            <FilterDropdown
              title="Role"
              icon={<Users size={16} />}
              isOpen={rolesOpen}
              onToggle={() => {
                setRolesOpen(!rolesOpen);
                setFunctionsOpen(false);
                setEUComplianceOpen(false);
              }}
              options={ROLES}
              selectedOptions={filterState.roles}
              onOptionToggle={handleRoleToggle}
              onClear={clearRolesFilter}
            />
            
            <EUComplianceFilter
              isOpen={euComplianceOpen}
              onToggle={() => {
                setEUComplianceOpen(!euComplianceOpen);
                setFunctionsOpen(false);
                setRolesOpen(false);
              }}
              filters={filterState.euCompliant}
              onFilterToggle={handleEUComplianceToggle}
              onClear={clearEUComplianceFilter}
            />
          </div>
        </div>
      </div>
      
      <ToolsTable 
        tools={getFilteredTools()} 
        isLoading={isLoading} 
      />
    </div>
  );
}
