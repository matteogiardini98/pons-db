
import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Database, PlusCircle, FileText, PanelLeftClose, PanelLeft, Sun, Moon } from 'lucide-react';
import EmailSubscription from './EmailSubscription';
import BetaBanner from '@/components/ui/beta-banner';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const [logoError, setLogoError] = useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Updated logo URLs to use Supabase direct URLs
  const logoUrl = theme === 'dark' 
    ? 'https://zxfarummeappffvjfplm.supabase.co/storage/v1/object/public/logo//Group%202%20(1).png'
    : 'https://zxfarummeappffvjfplm.supabase.co/storage/v1/object/public/logo//Group%201%20(1).png';

  const handleLogoError = () => {
    setLogoError(true);
    console.error("Logo failed to load:", logoUrl);
  };

  // Debug logo loading
  useEffect(() => {
    console.log("Attempting to load logo:", logoUrl);
    // Reset logo error when URL changes
    setLogoError(false);
  }, [logoUrl]);

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-16 md:w-64",
      theme === 'dark' ? 'bg-[#111111] border-r border-[#222222]' : 'bg-white border-r border-neutral-200'
    )}>
      <div className="flex h-full flex-col">
        <div className="flex items-center h-16 md:justify-between px-2 md:px-4">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 flex-shrink-0"> {/* Fixed size container for logo */}
              {!logoError ? (
                <img 
                  src={logoUrl} 
                  alt="pons logo" 
                  className="h-8 w-auto object-contain"
                  onError={handleLogoError} 
                />
              ) : (
                <div className="h-8 w-8 bg-neutral-200 dark:bg-neutral-700 rounded flex items-center justify-center">
                  <span className="text-xs">logo</span>
                </div>
              )}
            </div>
            <span className={cn("font-medium text-lg", isCollapsed ? "hidden" : "hidden md:block")}>pons</span>
          </Link>
          
          <div className="flex items-center gap-1">
            <div className={cn(isCollapsed ? "hidden" : "hidden md:inline-block")}>
              <BetaBanner inSidebar={true} />
            </div>
            
            {/* Moved collapse/expand button to the top */}
            <button 
              onClick={toggleSidebar}
              className={cn(
                "flex items-center justify-center rounded-md p-1 text-sm",
                theme === 'dark' ? 'text-gray-300 hover:bg-[#222222]' : 'text-gray-700 hover:bg-neutral-100'
              )}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? <PanelLeft className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
            </button>
          </div>
        </div>
        
        <nav className="flex-1 overflow-auto py-4">
          <ul className="space-y-1 px-2">
            <li>
              <Link
                to="/"
                className={cn(
                  "flex items-center rounded-md px-3 py-2",
                  theme === 'dark' ? 'hover:bg-[#222222]' : 'hover:bg-neutral-100',
                  isActive('/') ? (theme === 'dark' ? 'bg-[#222222]' : 'bg-neutral-100') : ''
                )}
              >
                <Database className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className={cn(isCollapsed ? "hidden" : "hidden md:block")}>database</span>
              </Link>
            </li>
            <li>
              <Link
                to="/add-tool"
                className={cn(
                  "flex items-center rounded-md px-3 py-2",
                  theme === 'dark' ? 'hover:bg-[#222222]' : 'hover:bg-neutral-100',
                  isActive('/add-tool') ? (theme === 'dark' ? 'bg-[#222222]' : 'bg-neutral-100') : ''
                )}
              >
                <PlusCircle className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className={cn(isCollapsed ? "hidden" : "hidden md:block")}>add tool</span>
              </Link>
            </li>
            <li>
              <Link
                to="/manifesto"
                className={cn(
                  "flex items-center rounded-md px-3 py-2",
                  theme === 'dark' ? 'hover:bg-[#222222]' : 'hover:bg-neutral-100',
                  isActive('/manifesto') ? (theme === 'dark' ? 'bg-[#222222]' : 'bg-neutral-100') : ''
                )}
              >
                <FileText className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className={cn(isCollapsed ? "hidden" : "hidden md:block")}>manifesto</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className={cn("border-t mt-auto")} 
          style={{ borderColor: theme === 'dark' ? '#222222' : '#e5e5e5' }}>
          <div className={cn(isCollapsed ? "hidden" : "hidden md:block")}>
            <EmailSubscription />
          </div>
          
          <div className="p-4 flex flex-col gap-2">
            {/* Theme toggle button */}
            <button 
              onClick={toggleTheme}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 text-sm",
                theme === 'dark' ? 'hover:bg-[#222222] text-gray-300' : 'hover:bg-neutral-100 text-gray-700'
              )}
            >
              {theme === 'dark' 
                ? <Sun className="h-4 w-4" /> 
                : <Moon className="h-4 w-4" />
              }
              <span className={cn(isCollapsed ? "hidden" : "hidden md:block")}>
                {theme === 'dark' ? 'light mode' : 'dark mode'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
