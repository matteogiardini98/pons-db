
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Home, Database, BarChart4, PlusCircle, FileText } from 'lucide-react';
import EmailSubscription from './EmailSubscription';

const Sidebar = () => {
  const location = useLocation();
  const { theme } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 h-screen w-16 md:w-64 transition-all duration-300 ease-in-out",
      theme === 'dark' ? 'bg-[#111111] border-r border-[#222222]' : 'bg-white border-r border-neutral-200'
    )}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-center h-16 md:justify-start md:pl-6">
          <Link to="/" className="flex items-center">
            <span className="font-medium text-lg hidden md:block">pons ai</span>
          </Link>
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
                <span className="hidden md:block">database</span>
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className={cn(
                  "flex items-center rounded-md px-3 py-2",
                  theme === 'dark' ? 'hover:bg-[#222222]' : 'hover:bg-neutral-100',
                  isActive('/dashboard') ? (theme === 'dark' ? 'bg-[#222222]' : 'bg-neutral-100') : ''
                )}
              >
                <BarChart4 className="h-5 w-5 mr-2 flex-shrink-0" />
                <span className="hidden md:block">dashboard</span>
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
                <span className="hidden md:block">add tool</span>
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
                <span className="hidden md:block">manifesto</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:block border-t border-neutral-700 mt-auto">
          <EmailSubscription />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
