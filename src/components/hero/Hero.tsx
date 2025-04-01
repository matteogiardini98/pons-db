
import { ArrowDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { useLanguage } from '@/hooks/use-language';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background to-secondary opacity-70"></div>
        <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-primary/5 blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-32 h-32 md:w-64 md:h-64 rounded-full bg-primary/5 blur-3xl"></div>
      </div>
      
      {/* Content container - for fade-in animation */}
      <div 
        className={`max-w-3xl text-center transition-all duration-1000 transform ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="space-y-2 mb-6">
          <div className="inline-block px-3 py-1 rounded-full bg-secondary text-xs font-medium tracking-wide text-muted-foreground">
            {t('hero.badge')}
          </div>
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-medium mb-6 tracking-tight">
          {t('hero.title')}
        </h1>
        
        <p className="text-lg md:text-xl mb-10 text-muted-foreground max-w-2xl mx-auto text-pretty">
          {t('hero.description')}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="rounded-md px-8 py-6 text-base font-medium transition-all duration-200 hover:shadow-lg"
            onClick={() => scrollToContent()}
          >
            {t('hero.exploreButton')}
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-md px-8 py-6 text-base font-medium border-2"
          >
            {t('hero.insightsButton')}
          </Button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div 
        className={`absolute bottom-10 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <button 
          onClick={() => scrollToContent()}
          className="flex flex-col items-center text-muted-foreground hover:text-primary transition-colors"
          aria-label="Scroll down"
        >
          <span className="text-sm mb-2">{t('hero.scrollText')}</span>
          <ArrowDown size={20} className="animate-bounce" />
        </button>
      </div>
    </div>
  );
};

export default Hero;
