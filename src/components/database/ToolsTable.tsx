
import { ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { AiTool } from '@/utils/types';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

interface ToolsTableProps {
  tools: AiTool[];
  isLoading: boolean;
}

const ToolsTable = ({ tools, isLoading }: ToolsTableProps) => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  
  const isDarkMode = theme === 'dark';
  const textColor = isDarkMode ? 'text-white' : 'text-black';
  const mutedTextColor = isDarkMode ? 'text-neutral-400' : 'text-neutral-500';
  const borderColor = isDarkMode ? 'border-neutral-700' : 'border-neutral-200';
  const headerBgColor = isDarkMode ? 'bg-[#1a1a1a]' : 'bg-neutral-50';
  const hoverBgColor = isDarkMode ? 'hover:bg-neutral-800' : 'hover:bg-neutral-100';
  const bgColor = isDarkMode ? 'bg-[#222222]' : 'bg-white';
  const buttonBgColor = isDarkMode ? 'bg-[#222222]' : 'bg-white';

  if (isLoading) {
    return (
      <div className="w-full h-96 flex items-center justify-center">
        <div className={cn("animate-spin rounded-full h-12 w-12 border-t-2 border-b-2", isDarkMode ? "border-white" : "border-black")}></div>
      </div>
    );
  }

  return (
    <div className={cn("rounded-lg overflow-hidden border", bgColor, borderColor)}>
      <Table className={textColor}>
        <TableHeader className={headerBgColor}>
          <TableRow className={borderColor}>
            <TableHead className={textColor}>name</TableHead>
            <TableHead className={cn("max-w-xs hidden md:table-cell", textColor)}>description</TableHead>
            <TableHead className={cn("hidden md:table-cell", textColor)}>function</TableHead>
            <TableHead className={cn("hidden md:table-cell", textColor)}>role</TableHead>
            <TableHead className={cn("hidden md:table-cell", textColor)}>use case</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tools.map((tool) => (
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
                  {tool.function.slice(0, 2).map((func) => (
                    <Badge key={func} variant="outline" className={cn(
                      "bg-transparent border-neutral-600",
                      isDarkMode ? "text-neutral-300" : "text-neutral-600"
                    )}>
                      {func.toLowerCase()}
                    </Badge>
                  ))}
                  {tool.function.length > 2 && (
                    <Badge variant="outline" className={cn(
                      "bg-transparent border-neutral-600",
                      isDarkMode ? "text-neutral-300" : "text-neutral-600"
                    )}>
                      +{tool.function.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <div className="flex flex-wrap gap-1.5">
                  {tool.role.slice(0, 2).map((role) => (
                    <Badge key={role} variant="outline" className={cn(
                      "bg-transparent border-neutral-600",
                      isDarkMode ? "text-neutral-300" : "text-neutral-600"
                    )}>
                      {role.toLowerCase()}
                    </Badge>
                  ))}
                  {tool.role.length > 2 && (
                    <Badge variant="outline" className={cn(
                      "bg-transparent border-neutral-600",
                      isDarkMode ? "text-neutral-300" : "text-neutral-600"
                    )}>
                      +{tool.role.length - 2}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Badge variant="outline" className={cn(
                  "bg-transparent border-neutral-600",
                  isDarkMode ? "text-neutral-300" : "text-neutral-600"
                )}>
                  {tool.useCase?.toLowerCase() || ''}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <div className={cn("flex items-center justify-between p-4 border-t text-sm", borderColor, headerBgColor)}>
        <div className={mutedTextColor}>
          {tools.length} results • page 1/1
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn("border-neutral-700", buttonBgColor, hoverBgColor)} 
            disabled
          >
            previous
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn("border-neutral-700", buttonBgColor, hoverBgColor)} 
            disabled
          >
            next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ToolsTable;
