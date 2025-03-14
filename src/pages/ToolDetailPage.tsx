
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Globe, Linkedin, Check, X } from 'lucide-react';
import { pageTransition } from '@/utils/animations';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { AiTool } from '@/utils/types';
import { mockTools } from '@/utils/data';
import Sidebar from '@/components/layout/Sidebar';
import Footer from '@/components/layout/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const ToolDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [tool, setTool] = useState<AiTool | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Apply scroll restoration on page load
    window.scrollTo(0, 0);
    
    // Simulate API loading
    const timer = setTimeout(() => {
      const foundTool = mockTools.find(t => t.id === id);
      setTool(foundTool || null);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
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

  if (!tool) {
    return (
      <div className={cn(
        "min-h-screen flex",
        theme === 'dark' ? 'bg-[#111111] text-white' : 'bg-white text-black'
      )}>
        <Sidebar />
        <main className="flex-grow pl-16 md:pl-64 pt-16 container-tight p-6">
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">Tool Not Found</h2>
            <p className={cn(
              "mb-6",
              theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
            )}>
              The tool you're looking for doesn't exist or has been removed.
            </p>
            <Button onClick={() => navigate('/')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Database
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
      <main className="flex-grow pl-16 md:pl-64 pt-0">
        <motion.div className="container-tight p-4 md:p-6 pt-16" {...pageTransition}>
          <Button 
            variant="outline" 
            size="sm" 
            className="mb-6" 
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Database
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
                    Website
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
                      LinkedIn
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            
            <Separator className={theme === 'dark' ? 'bg-neutral-700' : 'bg-neutral-200'} />
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              <div>
                <h3 className="text-xl font-medium mb-4">Industries</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.industries.map((industry) => (
                    <Badge key={industry} variant="outline" className="bg-transparent border-neutral-600">
                      {industry}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Functions</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.functions.map((func) => (
                    <Badge key={func} variant="outline" className="bg-transparent border-neutral-600">
                      {func}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-medium mb-4">Business Types</h3>
                <div className="flex flex-wrap gap-2">
                  {tool.businessTypes.map((type) => (
                    <Badge key={type} variant="outline" className="bg-transparent border-neutral-600">
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Technical Level</h3>
              <Badge variant="outline" className="bg-transparent border-neutral-600">
                {tool.technicalLevel}
              </Badge>
            </div>
            
            <div className="mt-8">
              <h3 className="text-xl font-medium mb-4">Main Features</h3>
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
              <h3 className="text-xl font-medium mb-4">EU Compliance</h3>
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
                    <h4 className="font-medium">GDPR Compliant</h4>
                  </div>
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    {tool.euCompliant.gdpr 
                      ? 'This tool is GDPR compliant and handles user data according to EU regulations.' 
                      : 'This tool is not GDPR compliant or hasn\'t been verified.'}
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
                    <h4 className="font-medium">EU Data Residency</h4>
                  </div>
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    {tool.euCompliant.dataResidency 
                      ? 'This tool stores data within the EU in compliance with data residency regulations.' 
                      : 'This tool may store data outside the EU.'}
                  </p>
                </div>
                
                <div className={cn(
                  "p-4 rounded-lg",
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                )}>
                  <div className="flex items-center mb-2">
                    {/* Assuming AI Act compliance is not yet tracked, adding as a placeholder */}
                    <X className="h-5 w-5 text-neutral-500 mr-2" />
                    <h4 className="font-medium">EU AI Act Compliant</h4>
                  </div>
                  <p className={cn(
                    "text-sm",
                    theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                  )}>
                    Compliance status for the EU AI Act is not yet determined for this tool.
                  </p>
                </div>
              </div>
            </div>
            
            {tool.company && (
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Company Information</h3>
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
                        Company Name
                      </h4>
                      <p>{tool.company.name}</p>
                    </div>
                    
                    <div>
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      )}>
                        Founded
                      </h4>
                      <p>{tool.company.founded}</p>
                    </div>
                    
                    <div>
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      )}>
                        Location
                      </h4>
                      <p>{tool.company.location}</p>
                    </div>
                    
                    {tool.company.employees && (
                      <div>
                        <h4 className={cn(
                          "text-sm font-medium mb-1",
                          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                        )}>
                          Employees
                        </h4>
                        <p>{tool.company.employees}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {tool.pricing && (
              <div className="mt-8">
                <h3 className="text-xl font-medium mb-4">Pricing</h3>
                <div className={cn(
                  "p-4 rounded-lg",
                  theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
                )}>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      )}>
                        Pricing Model
                      </h4>
                      <p>{tool.pricing.model}</p>
                    </div>
                    
                    <div>
                      <h4 className={cn(
                        "text-sm font-medium mb-1",
                        theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                      )}>
                        Free Plan
                      </h4>
                      <p>{tool.pricing.hasFree ? 'Available' : 'Not available'}</p>
                    </div>
                    
                    {tool.pricing.startingPrice && (
                      <div>
                        <h4 className={cn(
                          "text-sm font-medium mb-1",
                          theme === 'dark' ? 'text-neutral-400' : 'text-neutral-600'
                        )}>
                          Starting Price
                        </h4>
                        <p>${tool.pricing.startingPrice}/month</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
        <Footer />
      </main>
    </div>
  );
};

export default ToolDetailPage;
