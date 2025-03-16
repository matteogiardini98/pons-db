
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { AiTool } from '@/utils/types';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import ToolHeader from '@/components/tool/ToolHeader';
import EUCompliance from '@/components/tool/EUCompliance';
import ToolReviews from '@/components/tool/ToolReviews';

interface ToolDetailContentProps {
  tool: AiTool;
}

const ToolDetailContent = ({ tool }: ToolDetailContentProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [reviews, setReviews] = useState([]);

  // Determine gdpr compliance
  const isGdprCompliant = Array.isArray(tool?.euCompliant?.gdpr_compliant) 
    ? tool.euCompliant.gdpr_compliant.length > 0 
    : Boolean(tool?.euCompliant?.gdpr_compliant);

  return (
    <div className={cn(
      "rounded-lg border p-6 mb-8",
      isDarkMode 
        ? 'bg-[#222222] border-neutral-700' 
        : 'bg-white border-neutral-200 shadow-sm'
    )}>
      <ToolHeader 
        name={tool.name}
        description={tool.problem_solved_description}
        url={tool.website || ''}
        linkedin={tool.linkedin}
      />
      
      <Separator className={isDarkMode ? 'bg-neutral-700' : 'bg-neutral-200'} />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div>
          <h3 className="text-xl font-medium mb-4">function</h3>
          <div className="flex flex-wrap gap-2">
            {tool.function.map((func) => (
              <Badge key={func} variant="outline" className={cn(
                "bg-transparent border-neutral-600",
                isDarkMode ? "text-white" : "text-black"
              )}>
                {func.toLowerCase()}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">role</h3>
          <div className="flex flex-wrap gap-2">
            {tool.role.map((role) => (
              <Badge key={role} variant="outline" className={cn(
                "bg-transparent border-neutral-600",
                isDarkMode ? "text-white" : "text-black"
              )}>
                {role.toLowerCase()}
              </Badge>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">use case</h3>
          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className={cn(
              "bg-transparent border-neutral-600",
              isDarkMode ? "text-white" : "text-black"
            )}>
              {tool.use_case_tag.toLowerCase()}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">technical level</h3>
        <Badge variant="outline" className={cn(
          "bg-transparent border-neutral-600",
          isDarkMode ? "text-white" : "text-black"
        )}>
          {tool.technical_level}
        </Badge>
      </div>
      
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">eu compliance</h3>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className={cn(
            "bg-transparent border-neutral-600",
            isDarkMode ? "text-white" : "text-black"
          )}>
            {isGdprCompliant ? 'gdpr compliant' : 'not gdpr compliant'}
          </Badge>
          
          <Badge variant="outline" className={cn(
            "bg-transparent border-neutral-600",
            isDarkMode ? "text-white" : "text-black"
          )}>
            {tool.euCompliant.data_residency ? 'eu data residency' : 'no eu data residency'}
          </Badge>
          
          <Badge variant="outline" className={cn(
            "bg-transparent border-neutral-600",
            isDarkMode ? "text-white" : "text-black"
          )}>
            {tool.euCompliant.ai_act_compliant ? 'ai act compliant' : 'not ai act compliant'}
          </Badge>
        </div>
      </div>
      
      {tool.company && (
        <div className="mt-8">
          <h3 className="text-xl font-medium mb-4">company information</h3>
          <div className={cn(
            "p-4 rounded-lg",
            isDarkMode ? 'bg-neutral-800' : 'bg-neutral-100'
          )}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <h4 className={cn(
                  "text-sm font-medium mb-1",
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                )}>
                  company name
                </h4>
                <p>{tool.company.name}</p>
              </div>
              
              <div>
                <h4 className={cn(
                  "text-sm font-medium mb-1",
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                )}>
                  founded
                </h4>
                <p>{tool.company.founded}</p>
              </div>
              
              <div>
                <h4 className={cn(
                  "text-sm font-medium mb-1",
                  isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                )}>
                  location
                </h4>
                <p>{tool.company.location}</p>
              </div>
              
              {tool.company.employees && (
                <div>
                  <h4 className={cn(
                    "text-sm font-medium mb-1",
                    isDarkMode ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    employees
                  </h4>
                  <p>{tool.company.employees}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      {/* Share your experience section - now first */}
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">share your experience</h3>
        <ToolReviews toolId={tool.id} reviews={reviews} setReviews={setReviews} />
      </div>
      
      {/* What users have to say section - now second */}
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">what users have to say about this tool</h3>
        {reviews.length === 0 ? (
          <div className={cn(
            "p-6 rounded-lg text-center",
            theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
          )}>
            <p className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'}>
              no reviews yet. be the first to share your experience!
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div 
                key={review.id}
                className={cn(
                  "p-4 rounded-lg",
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                )}
              >
                <div className="flex justify-between mb-2">
                  <span className="font-medium">{review.authorName}</span>
                  <span className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    {new Date(review.date).toLocaleDateString()}
                  </span>
                </div>
                <p className={theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'}>
                  {review.text}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolDetailContent;
