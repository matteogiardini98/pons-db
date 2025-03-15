import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Globe, Linkedin, Check, X, Send } from 'lucide-react';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { AiTool, Review } from '@/utils/types';
import { mockTools } from '@/utils/data';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import BetaBanner from '@/components/ui/beta-banner';

const ToolDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [tool, setTool] = useState<AiTool | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [reviewText, setReviewText] = useState('');
  const [reviews, setReviews] = useState<Review[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Apply scroll restoration on page load
    window.scrollTo(0, 0);
    
    const fetchTool = async () => {
      try {
        // First try to fetch from Supabase
        const { data, error } = await supabase
          .from('ai_tools')
          .select('*')
          .eq('id', id)
          .single();
          
        if (data) {
          // Map Supabase data to AiTool type
          const toolFromDb: AiTool = {
            id: data.id,
            name: data.name,
            description: data.description,
            url: data.website,
            logo: '',
            industries: data.industries,
            functions: data.functions,
            businessTypes: data.business_types,
            technicalLevel: data.technical_level,
            features: data.features || [],
            euCompliant: {
              gdpr: data.gdpr_compliant,
              dataResidency: data.data_residency,
              aiAct: data.ai_act_compliant
            },
            reviews: []
          };
          setTool(toolFromDb);
          
          // Fetch reviews
          const { data: reviewsData, error: reviewsError } = await supabase
            .from('reviews')
            .select('*')
            .eq('tool_id', id);
            
          if (!reviewsError && reviewsData) {
            const mappedReviews: Review[] = reviewsData.map(review => ({
              id: review.id,
              text: review.text,
              authorName: review.author_name || 'anonymous user',
              date: review.created_at,
              rating: review.rating || 5
            }));
            setReviews(mappedReviews);
          }
          
          setIsLoading(false);
        } else {
          // Fallback to mock data
          const foundTool = mockTools.find(t => t.id === id);
          setTool(foundTool || null);
          setReviews(foundTool?.reviews || []);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Error fetching tool:', error);
        // Fallback to mock data
        const foundTool = mockTools.find(t => t.id === id);
        setTool(foundTool || null);
        setReviews(foundTool?.reviews || []);
        setIsLoading(false);
      }
    };
    
    fetchTool();
  }, [id]);

  const handleReviewSubmit = async () => {
    if (reviewText.trim() === '') {
      toast({
        title: "error",
        description: "please enter a review before submitting",
        variant: "destructive"
      });
      return;
    }

    try {
      // Insert the review into Supabase
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          tool_id: id,
          text: reviewText,
          author_name: 'anonymous user',
          rating: 5
        })
        .select()
        .single();
      
      if (error) throw error;
      
      const newReview: Review = {
        id: data.id,
        text: data.text,
        authorName: data.author_name,
        date: data.created_at,
        rating: data.rating
      };

      setReviews(prev => [newReview, ...prev]);
      setReviewText('');
      
      toast({
        title: "success!",
        description: "your review has been submitted",
      });
    } catch (error: any) {
      console.error('Error submitting review:', error);
      
      // Fallback for offline/demo mode
      const newReview: Review = {
        id: `review-${Date.now()}`,
        text: reviewText,
        authorName: "anonymous user",
        date: new Date().toISOString(),
        rating: 5
      };

      setReviews(prev => [newReview, ...prev]);
      setReviewText('');
      
      toast({
        title: "success!",
        description: "your review has been submitted",
      });
    }
  };

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
            <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-medium mb-2">{tool.name}</h1>
                <p className={cn(
                  "text-lg mb-4",
                  theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                )}>
                  {tool.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  <a 
                    href={tool.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={cn(
                      "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm",
                      theme === 'dark' 
                        ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
                        : 'bg-neutral-100 hover:bg-neutral-200 text-black'
                    )}
                  >
                    <Globe className="h-4 w-4" />
                    website
                    <ExternalLink className="h-3 w-3" />
                  </a>
                  
                  {tool.company && (
                    <a 
                      href={`https://linkedin.com/company/${tool.company.name}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={cn(
                        "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm",
                        theme === 'dark' 
                          ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
                          : 'bg-neutral-100 hover:bg-neutral-200 text-black'
                      )}
                    >
                      <Linkedin className="h-4 w-4" />
                      linkedin
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <Separator className={theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-200'} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-medium mb-4">industries</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.industries.map((industry) => (
                    <Badge key={industry} variant="outline" className={cn(
                      "bg-transparent border-neutral-600 text-white",
                      theme === 'dark' ? "text-white" : "text-black"
                    )}>
                      {industry.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">functions</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.functions.map((func) => (
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
                <h3 className="text-xl font-medium mb-4">business types</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.businessTypes.map((type) => (
                    <Badge key={type} variant="outline" className={cn(
                      "bg-transparent border-neutral-600",
                      theme === 'dark' ? "text-white" : "text-black"
                    )}>
                      {type.toLowerCase()}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">technical level</h3>
              <Badge variant="outline" className={cn(
                "bg-transparent border-neutral-600",
                theme === 'dark' ? "text-white" : "text-black"
              )}>
                {tool.technicalLevel}
              </Badge>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">main features</h3>
              <ul className={cn(
                "list-disc pl-5 space-y-1",
                theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
              )}>
                {tool.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">eu compliance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={cn(
                  "p-4 rounded-lg",
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                )}>
                  <div className="flex items-center mb-2">
                    {tool.euCompliant.gdpr ? (
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <h4 className="font-medium">gdpr compliant</h4>
                  </div>
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    {tool.euCompliant.gdpr 
                      ? 'this tool is gdpr compliant and handles user data according to eu regulations.' 
                      : 'this tool is not gdpr compliant or hasn\'t been verified.'}
                  </p>
                </div>
                
                <div className={cn(
                  "p-4 rounded-lg",
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                )}>
                  <div className="flex items-center mb-2">
                    {tool.euCompliant.dataResidency ? (
                      <Check className="h-5 w-5 text-green-500 mr-2" />
                    ) : (
                      <X className="h-5 w-5 text-red-500 mr-2" />
                    )}
                    <h4 className="font-medium">eu data residency</h4>
                  </div>
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    {tool.euCompliant.dataResidency 
                      ? 'this tool stores data within the eu in compliance with data residency regulations.' 
                      : 'this tool may store data outside the eu.'}
                  </p>
                </div>
                
                <div className={cn(
                  "p-4 rounded-lg",
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                )}>
                  <div className="flex items-center mb-2">
                    {/* Assuming AI Act compliance is not yet tracked, adding as a placeholder */}
                    <X className="h-5 w-5 text-neutral-500 mr-2" />
                    <h4 className="font-medium">ai act compliant</h4>
                  </div>
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    compliance status for the eu ai act is not yet determined for this tool.
                  </p>
                </div>
              </div>
            </div>
            
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
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">share your experience</h3>
              <div className={cn(
                "p-4 rounded-lg",
                theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
              )}>
                <Textarea
                  placeholder="write your review here..."
                  className={cn(
                    "mb-3 min-h-24",
                    theme === 'dark' ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300'
                  )}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                />
                <Button 
                  onClick={handleReviewSubmit}
                  className="flex items-center gap-2"
                >
                  <Send size={16} />
                  submit review
                </Button>
              </div>
            </div>
            
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
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default ToolDetailPage;
