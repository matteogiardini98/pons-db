
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';
import { AiTool } from '@/utils/types';
import { cn } from '@/lib/utils';
import AnimatedCard from '@/components/ui/AnimatedCard';
import { Badge } from '@/components/ui/badge';

interface ToolCardProps {
  tool: AiTool;
}

const ToolCard = ({ tool }: ToolCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const getAverageRating = (tool: AiTool) => {
    if (!tool.reviews || tool.reviews.length === 0) return null;
    
    const total = tool.reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / tool.reviews.length).toFixed(1);
  };
  
  const averageRating = getAverageRating(tool);
  
  return (
    <AnimatedCard
      hoverEffect="lift"
      className="h-full relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/tool/${tool.id}`}
        className="block h-full bg-white rounded-lg border border-border overflow-hidden transition-shadow hover:shadow-lg"
      >
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-lg leading-tight">{tool.name}</h3>
              
              <div className="flex items-center mt-1 text-sm text-muted-foreground">
                {averageRating && (
                  <div className="flex items-center mr-3">
                    <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span>{averageRating}</span>
                  </div>
                )}
                <span>{tool.reviews ? tool.reviews.length : 0} reviews</span>
              </div>
            </div>
            
            <div className={cn(
              "absolute top-3 right-3 p-1.5 rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-border",
              "transition-opacity duration-300",
              isHovered ? "opacity-100" : "opacity-0"
            )}>
              <ExternalLink size={14} className="text-muted-foreground" />
            </div>
          </div>
          
          <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-grow">
            {tool.problem_solved_description}
          </p>
          
          <div className="space-y-4 mt-auto">
            <div className="flex flex-wrap gap-1.5">
              {tool.function.slice(0, 3).map((func) => (
                <Badge key={func} variant="outline" className="text-xs font-normal rounded-full">
                  {func}
                </Badge>
              ))}
              {tool.function.length > 3 && (
                <Badge variant="outline" className="text-xs font-normal rounded-full">
                  +{tool.function.length - 3}
                </Badge>
              )}
            </div>
            
            <div className="flex flex-wrap gap-2">
              {tool.technical_level && (
                <div className="text-xs px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                  {tool.technical_level}
                </div>
              )}
              
              {tool.euCompliant.gdpr_compliant && (
                <div className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                  GDPR Compliant
                </div>
              )}
              
              {tool.euCompliant.data_residency && (
                <div className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                  EU Data Residency
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </AnimatedCard>
  );
};

export default ToolCard;
