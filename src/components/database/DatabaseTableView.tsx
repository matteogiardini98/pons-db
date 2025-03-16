
import { useState, useEffect } from 'react';
import { FilterState } from '@/utils/types';
import { toast } from '@/components/ui/use-toast';
import ToolsTable from './ToolsTable';
import FilterBar from './FilterBar';
import SearchBar from './SearchBar';
import useToolsData from '@/hooks/use-tools-data';

export default function DatabaseTableView() {
  const [searchQuery, setSearchQuery] = useState('');
  const { tools, isLoading, error } = useToolsData();
  
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
