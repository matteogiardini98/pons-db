
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Sidebar from '@/components/layout/Sidebar';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogFooter
} from '@/components/ui/dialog';
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const StartFromZeroPage = () => {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [challenge, setChallenge] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [consentChecked, setConsentChecked] = useState(false);

  // Updated business headaches with shorter descriptions
  const businessHeadaches = [
    {
      title: "Sales – Head of Sales in Tech Startup",
      description: "Too much time spent on non-converting leads. Need smarter lead prioritization to focus on revenue-driving opportunities."
    },
    {
      title: "Finance – CFO in Manufacturing Firm",
      description: "Manual reconciliation delays reports. Need streamlined processes for timely, accurate financial reporting."
    },
    {
      title: "Supply Chain – Supply Chain Manager in Retail",
      description: "Constant inventory imbalance creates lost sales and higher costs. Need better demand forecasting system."
    },
    {
      title: "Operations – Head of Operations in Retail Chain",
      description: "Inefficient scheduling creates staff overwork and coverage gaps. Need optimal resource planning for shifts."
    },
    {
      title: "Marketing – CMO in E-commerce Company",
      description: "Campaigns underperform due to poor customer insights. Need better analysis tools to adjust strategy quickly."
    }
  ];

  const handleChallengeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!challenge.trim()) {
      toast({
        title: "Challenge required",
        description: "Please describe your business challenge",
        variant: "destructive"
      });
      return;
    }
    
    setShowEmailDialog(true);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    if (!consentChecked) {
      toast({
        title: "Consent required",
        description: "Please confirm you agree to be contacted",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('ent_input')
        .insert([{ 
          email,
          challenge
        }]);

      if (error) throw error;

      toast({
        title: "Thanks for your submission!",
        description: "We'll find the right AI tools for your business challenges and get back to you soon.",
      });
      
      setEmail('');
      setChallenge('');
      setShowEmailDialog(false);
      setConsentChecked(false);
    } catch (error: any) {
      console.error('Error submitting data:', error);
      toast({
        title: "Submission failed",
        description: error.message || "There was an error submitting your information. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCardTitle = (title) => {
    const parts = title.split('–');
    if (parts.length === 2) {
      return (
        <>
          <span className="text-emerald-500">{parts[0].trim()}</span>
          <span> – {parts[1].trim()}</span>
        </>
      );
    }
    return title;
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-grow">
        <Sidebar />
        <div className={cn(
          "flex-1 overflow-auto pt-16 md:ml-16 md:ml-64 transition-all duration-300",
          theme === 'dark' ? 'bg-[#111111]' : 'bg-gray-50'
        )}>
          <div className="container-tight max-w-5xl mx-auto px-4 py-8 flex flex-col h-full">
            <div className="space-y-6 mb-12">
              <h1 className={cn(
                "text-2xl md:text-3xl lg:text-4xl font-medium leading-normal text-center",
                theme === 'dark' ? 'text-white' : 'text-black'
              )}>
                For all <span className="text-emerald-500">entrepreneurs</span> and <span className="text-emerald-500">operators</span> out there, tell us your business <span className="text-emerald-500">challenges</span> and we'll help you find the right AI tools.
              </h1>
              
              <form onSubmit={handleChallengeSubmit} className="space-y-4 max-w-2xl mx-auto">
                <div className="flex items-center gap-2">
                  <Input
                    id="challenge"
                    placeholder="Describe your business challenge"
                    value={challenge}
                    onChange={(e) => setChallenge(e.target.value)}
                    className={cn(
                      "bg-opacity-10 border-opacity-20 py-6",
                      theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white/10 border-white/20'
                    )}
                  />
                  <Button 
                    type="submit" 
                    variant="cta"
                    disabled={isSubmitting}
                    size="sm"
                    className="rounded-full p-2 h-10 w-10"
                  >
                    <ArrowRight size={16} />
                  </Button>
                </div>
              </form>
            </div>
            
            <div className="mt-8 mb-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                {businessHeadaches.slice(0, 3).map((headache, index) => (
                  <Card key={index} className={cn(
                    "border shadow-sm h-full",
                    theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-200'
                  )}>
                    <CardHeader className="pb-2">
                      <CardTitle className={cn(
                        "text-lg font-bold",
                        theme === 'dark' ? 'text-white' : 'text-white'
                      )}>
                        {formatCardTitle(headache.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={cn(
                        "text-sm",
                        theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                      )}>
                        {headache.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-8 md:mt-12 md:px-24">
                {businessHeadaches.slice(3, 5).map((headache, index) => (
                  <Card key={index + 3} className={cn(
                    "border shadow-sm h-full",
                    theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white border-gray-200'
                  )}>
                    <CardHeader className="pb-2">
                      <CardTitle className={cn(
                        "text-lg font-bold",
                        theme === 'dark' ? 'text-white' : 'text-white'
                      )}>
                        {formatCardTitle(headache.title)}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className={cn(
                        "text-sm",
                        theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
                      )}>
                        {headache.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <footer className={cn(
        "py-12 border-t",
        theme === 'dark' ? 'bg-black border-[#222222] text-white' : 'bg-black border-gray-800 text-white'
      )}>
        <div className="container-tight mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="space-y-4">
              <h4 className="text-base font-semibold">pons database</h4>
              <p className="text-sm text-gray-400">pons is an open-source database of ai solutions to help companies find the right tools for their business problems.</p>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-base font-semibold">navigation</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/database" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    database
                  </Link>
                </li>
                <li>
                  <Link to="/add-tool" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    add a tool
                  </Link>
                </li>
                <li>
                  <Link to="/manifesto" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    manifesto
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-base font-semibold">about</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/manifesto" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    manifesto
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    changelog
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    roadmap
                  </Link>
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-base font-semibold">contact</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://github.com" target="_blank" rel="noreferrer" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    github
                  </a>
                </li>
                <li>
                  <a href="mailto:info@aisolutionsdatabase.com" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    contact us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors link-underline">
                    newsletter
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>© {new Date().getFullYear()} ai solutions database. open-source project.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-white transition-colors">privacy</Link>
              <Link to="#" className="hover:text-white transition-colors">terms</Link>
              <Link to="#" className="hover:text-white transition-colors">cookie policy</Link>
            </div>
          </div>
        </div>
      </footer>

      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className={cn(
          "sm:max-w-md",
          theme === 'dark' ? 'bg-[#191919] text-white' : 'bg-white'
        )}>
          <DialogHeader>
            <Label htmlFor="email">Your email</Label>
          </DialogHeader>
          <form onSubmit={handleEmailSubmit}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Input 
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    theme === 'dark' ? 'bg-[#222222] border-[#333333]' : 'bg-white'
                  )}
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="consent" 
                  checked={consentChecked}
                  onCheckedChange={(checked) => {
                    setConsentChecked(checked as boolean);
                  }}
                />
                <Label htmlFor="consent" className="text-sm">
                  I agree to be contacted by email about AI tools for my business challenge
                </Label>
              </div>
            </div>
            
            <DialogFooter className="sm:justify-between">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setShowEmailDialog(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                variant="cta"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default StartFromZeroPage;
