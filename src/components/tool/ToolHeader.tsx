
import React from 'react';
import { useTheme } from '@/hooks/use-theme';
import { cn } from '@/lib/utils';
import { Globe, ExternalLink, Linkedin } from 'lucide-react';

interface ToolHeaderProps {
  name: string;
  description: string;
  url: string;
  linkedin?: string[];
}

const ToolHeader = ({ name, description, url, linkedin }: ToolHeaderProps) => {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 mb-6">
      <div className="flex-1">
        <h1 className="text-3xl md:text-4xl font-medium mb-2">{name}</h1>
        <p className={cn(
          "text-lg mb-4",
          theme === 'dark' ? 'text-neutral-300' : 'text-neutral-700'
        )}>
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2">
          {url && (
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm",
                isDarkMode 
                  ? 'bg-neutral-800 hover:bg-neutral-700 text-white' 
                  : 'bg-neutral-100 hover:bg-neutral-200 text-black'
              )}
            >
              <Globe className="h-4 w-4" />
              website
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          
          {linkedin && linkedin.length > 0 && linkedin[0] && (
            <a 
              href={linkedin[0]} 
              target="_blank" 
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-3 py-1 rounded-md text-sm",
                isDarkMode 
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
  );
};

export default ToolHeader;
