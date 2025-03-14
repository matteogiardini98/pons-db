
import { useState, useEffect } from 'react';
import { Search, Tag, Users, MapPin, ArrowUpDown, PlusCircle } from 'lucide-react';
import { AiTool, FilterState } from '@/utils/types';
import { mockTools } from '@/utils/data';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { pageTransition } from '@/utils/animations';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const DatabaseTableView = () => {
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

  const filteredTools = tools.filter((tool) => {
    // Search filter
    if (
      searchTerm &&
      !tool.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !tool.description.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }

    // Additional filters would go here

    return true;
  });

  return (
    <motion.div 
      className="min-h-screen pt-16"
      {...pageTransition}
    >
      <div className="container-tight p-4 md:p-6 text-white">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <img 
              src="/lovable-uploads/0b3a778e-cad6-428d-b345-9c0dc1f2c1b3.png" 
              alt="pons41 logo" 
              className="h-10 w-auto"
            />
            <h1 className="text-3xl md:text-4xl font-medium">pons41</h1>
          </div>
          
          <div className="flex flex-col md:flex-row gap-3 md:items-center mb-6">
            <div className="relative flex-grow max-w-lg">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="search"
                placeholder="Search for AI tools..."
                className="pl-10 bg-[#222222] border-neutral-700 focus-visible:ring-neutral-500"
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" className="border-neutral-700 bg-[#222222] hover:bg-neutral-800 gap-2">
                <Tag size={16} />
                Industry
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-700 bg-[#222222] hover:bg-neutral-800 gap-2">
                <Users size={16} />
                Function
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-700 bg-[#222222] hover:bg-neutral-800 gap-2">
                <MapPin size={16} />
                EU-ready
              </Button>
              <Button variant="outline" size="sm" className="border-neutral-700 bg-[#222222] hover:bg-neutral-800 gap-2">
                <ArrowUpDown size={16} />
                Sort
              </Button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="w-full h-96 flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
            </div>
          ) : (
            <div className="bg-[#222222] rounded-lg border border-neutral-700 overflow-hidden">
              <Table className="text-white">
                <TableHeader className="bg-[#1a1a1a]">
                  <TableRow className="border-neutral-700">
                    <TableHead className="text-white">Name</TableHead>
                    <TableHead className="text-white max-w-xs hidden md:table-cell">Description</TableHead>
                    <TableHead className="text-white hidden lg:table-cell">Tags</TableHead>
                    <TableHead className="text-white hidden xl:table-cell">Stage</TableHead>
                    <TableHead className="text-white hidden md:table-cell">Technical Level</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTools.map((tool) => (
                    <TableRow 
                      key={tool.id} 
                      className="border-neutral-700 hover:bg-neutral-800 cursor-pointer"
                      onClick={() => navigate(`/tool/${tool.id}`)}
                    >
                      <TableCell className="py-4">
                        <div className="font-medium">{tool.name}</div>
                      </TableCell>
                      <TableCell className="max-w-xs hidden md:table-cell">
                        <div className="line-clamp-2 text-neutral-300">{tool.description}</div>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell">
                        <div className="flex flex-wrap gap-1.5">
                          {tool.industries.slice(0, 2).map((industry) => (
                            <Badge key={industry} variant="outline" className="bg-transparent text-neutral-300 border-neutral-600">
                              {industry}
                            </Badge>
                          ))}
                          {tool.functions.slice(0, 1).map((func) => (
                            <Badge key={func} variant="outline" className="bg-transparent text-neutral-300 border-neutral-600">
                              {func}
                            </Badge>
                          ))}
                          {(tool.industries.length + tool.functions.length) > 3 && (
                            <Badge variant="outline" className="bg-transparent text-neutral-300 border-neutral-600">
                              +{(tool.industries.length + tool.functions.length) - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="hidden xl:table-cell">
                        <Badge 
                          className={`${
                            tool.reviews.length > 5 ? 'bg-green-900 text-green-100' : 
                            tool.reviews.length > 0 ? 'bg-amber-900 text-amber-100' : 
                            'bg-neutral-800 text-neutral-300'
                          }`}
                        >
                          {tool.reviews.length > 5 ? 'Seed' : 
                           tool.reviews.length > 0 ? '1-10' : 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        <Badge variant="outline" className="bg-transparent text-neutral-300 border-neutral-600">
                          {tool.technicalLevel}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              <div className="flex items-center justify-between p-4 border-t border-neutral-700 bg-[#1a1a1a] text-sm">
                <div className="text-neutral-400">
                  {filteredTools.length} results • Page 1/1
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-neutral-700 bg-[#222222] hover:bg-neutral-800" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="border-neutral-700 bg-[#222222] hover:bg-neutral-800" disabled>
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
