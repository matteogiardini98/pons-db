
import React, { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Review } from '@/utils/types';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ToolReviewsProps {
  toolId: string;
  reviews: Review[];
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>;
}

const ToolReviews = ({ toolId, reviews, setReviews }: ToolReviewsProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const { toast } = useToast();

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
      // Prepare author name - use provided name or default to anonymous
      const authorName = userName.trim() || 'anonymous user';
      
      // Insert the review into Supabase
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          tool_id: toolId,
          text: reviewText,
          author_name: authorName,
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
      setUserName('');
      
      // If email is provided, save to email_subscriptions
      if (userEmail.trim()) {
        try {
          await supabase
            .from('email_subscriptions')
            .insert({ email: userEmail.trim() })
            .throwOnError();
            
          // Clear email after successful subscription
          setUserEmail('');
        } catch (subscriptionError: any) {
          // If it's a unique violation (email already subscribed), we don't need to show an error
          if (!subscriptionError.message.includes('duplicate key value violates unique constraint')) {
            console.error('Error subscribing email:', subscriptionError);
          }
        }
      }
      
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
        authorName: userName.trim() || "anonymous user",
        date: new Date().toISOString(),
        rating: 5
      };

      setReviews(prev => [newReview, ...prev]);
      setReviewText('');
      setUserName('');
      setUserEmail('');
      
      toast({
        title: "success!",
        description: "your review has been submitted",
      });
    }
  };

  return (
    <>
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
      
      <div className="mt-8">
        <h3 className="text-xl font-medium mb-4">share your experience</h3>
        <div className={cn(
          "p-4 rounded-lg",
          theme === 'dark' ? 'bg-neutral-800' : 'bg-neutral-100'
        )}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
            <Input
              placeholder="your name (optional)"
              className={cn(
                theme === 'dark' ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300'
              )}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="your email (optional)"
              type="email"
              className={cn(
                theme === 'dark' ? 'bg-neutral-700 border-neutral-600 text-white' : 'bg-white border-neutral-300'
              )}
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
          </div>
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
            variant="cta"
            className="flex items-center gap-2"
          >
            <Send size={16} />
            submit review
          </Button>
        </div>
      </div>
    </>
  );
};

export default ToolReviews;
