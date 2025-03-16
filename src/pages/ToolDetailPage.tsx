import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { AiTool, Review } from '@/utils/types';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { supabaseClient } from '@/integrations/supabase/client';
import BetaBanner from '@/components/ui/beta-banner';
import ToolHeader from '@/components/tool/ToolHeader';
import EUCompliance from '@/components/tool/EUCompliance';
import ToolReviews from '@/components/tool/ToolReviews';

const ToolDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [tool, setTool] = useState<AiTool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchToolDetails = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabaseClient
          .from('ai_tools')
          .select('*')
          .eq('id', id)
          .single();
          
        if (data) {
          console.log("Raw tool data:", data);
          
          // Map Supabase data to AiTool type
          const toolData: AiTool = {
            id: data.id,
            name: data.name,
            website: data.website,
            function: data.function || [],
            role: data.role || [],
            problem_solved_description: data.problem_solved_description || '',
            use_case_tag: data.use_case_tag || '',
            technical_level: data.technical_level || '',
            euCompliant: {
              // Handle gdpr_compliant which could be missing in older records
              gdpr_compliant: data.gdpr_compliant !== undefined ? data.gdpr_compliant : [],
              data_residency: data.data_residency || false,
              ai_act_compliant: data.ai_act_compliant || false
            },
            // Handle company which could be missing
            company: data.company || undefined
          };
          
          setTool(toolData);
        } else if (error) {
          console.error('Error fetching tool details:', error);
          setError('Could not fetch tool details');
        }
      } catch (error) {
        console.error('Error in data fetching:', error);
        setError('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchToolDetails();
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className={cn(
        "min-h-screen flex",
        theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
      )}>
        <Sidebar />
        <main className="flex-grow pl-16 md:pl-64 pt-16 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn(
        "min-h-screen flex",
        theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
      )}>
        <Sidebar />
        <main className="flex-grow pl-16 md:pl-64 pt-16 container-tight p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">tool not found</h2>
            <p className={cn(
              "mb-6",
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            )}>
              the tool you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              back to database
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className={cn(
        "min-h-screen flex",
        theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
      )}>
        <Sidebar />
        <main className="flex-grow pl-16 md:pl-64 pt-16 container-tight p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">tool not found</h2>
            <p className={cn(
              "mb-6",
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            )}>
              the tool you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              back to database
            </Button>
          </div>
        </main>
      </div>
    );
  }

  // Determine gdpr compliance for EUCompliance component
  const isGdprCompliant = Array.isArray(tool?.euCompliant?.gdpr_compliant) 
    ? tool.euCompliant.gdpr_compliant.length > 0 
    : Boolean(tool?.euCompliant?.gdpr_compliant);

  return (
    <div className={cn(
      "min-h-screen flex",
      theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
    )}>
      <Sidebar />
      <BetaBanner />
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <motion.div className="container-tight p-4 md:p-6 pt-10" {...pageTransition}>
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-6" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            back to database
          </Button>
          
          <div className={cn(
            "rounded-lg border p-6 mb-8",
            theme === 'dark' 
              ? 'bg-[#222222] border-neutral-700' 
              : 'bg-white border-neutral-200 shadow-sm'
          )}>
            <ToolHeader 
              name={tool.name}
              description={tool.problem_solved_description}
              url={tool.website || ''}
              company={tool.company}
            />
            
            <Separator className={theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-200'} />
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-medium mb-4">function</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.function.map((func) => (
                    <Badge key={func} variant="outline" className={cn(
                      "bg-transparent border-neutral-600",
                      theme === 'dark' ? "text-white" : "text-black"
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
                      theme === 'dark' ? "text-white" : "text-black"
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
                    theme === 'dark' ? "text-white" : "text-black"
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
                theme === 'dark' ? "text-white" : "text-black"
              )}>
                {tool.technical_level}
              </Badge>
            </div>
            
            <EUCompliance euCompliant={{
              gdpr: isGdprCompliant,
              dataResidency: tool.euCompliant.data_residency,
              aiAct: tool.euCompliant.ai_act_compliant
            }} />
            
            {tool.company && (
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">company information</h3>
                <div className={cn(
                  "p-4 rounded-lg",
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                )}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      )}>
                        company name
                      </h4>
                      <p>{tool.company.name}</p>
                    </div>
                    
                    <div>
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      )}>
                        founded
                      </h4>
                      <p>{tool.company.founded}</p>
                    </div>
                    
                    <div>
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      )}>
                        location
                      </h4>
                      <p>{tool.company.location}</p>
                    </div>
                    
                    {tool.company.employees && (
                      <div>
                        <h4 className={cn(
                          "text-sm font-medium mb-1",
                          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
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
            
            <ToolReviews toolId={tool.id} reviews={reviews} setReviews={setReviews} />
          </div>
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default ToolDetailPage;
