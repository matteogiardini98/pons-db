
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Database, PlusCircle, FileText } from 'lucide-react';
import EmailSubscription from './EmailSubscription';

interface SidebarProps {
  collapsed?: boolean;
}

const Sidebar = ({ collapsed = false }: SidebarProps) => {
  const location = useLocation();
  const { theme } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={cn(
      "fixed inset-y-0 left-0 z-50 h-screen transition-all duration-300 ease-in-out",
      collapsed ? "w-16" : "w-16 md:w-64",
      theme === 'dark' ? 'bg-[#111111] border-r border-[#222222]' : 'bg-white border-r border-neutral-200'
    )}>
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-center h-16 md:justify-start md:pl-6">
          <Link to="/" className="flex items-center">
            <span className={cn("font-medium text-lg", collapsed ? "hidden" : "hidden md:block")}>pons ai</span>
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
                <span className={cn(collapsed ? "hidden" : "hidden md:block")}>database</span>
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
                <span className={cn(collapsed ? "hidden" : "hidden md:block")}>add tool</span>
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
                <span className={cn(collapsed ? "hidden" : "hidden md:block")}>manifesto</span>
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className={cn(collapsed ? "hidden" : "hidden md:block", "border-t mt-auto")} style={{ borderColor: theme === 'dark' ? '#222222' : '#e5e5e5' }}>
          <EmailSubscription />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
