import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Database, LayoutDashboard, PlusCircle, Sun, Moon, ArrowRight, ImageOff, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [email, setEmail] = useState('');
  const [logoError, setLogoError] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const { toast } = useToast();

  const navLinks = [
    { name: 'database', path: '/', icon: Database },
    { name: 'dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'add tool', path: '/add-tool', icon: PlusCircle },
    { name: 'manifesto', path: '/manifesto', icon: BookOpen },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: "invalid email",
        description: "please enter a valid email address",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "success!",
      description: "you've been subscribed to our newsletter",
    });
    setEmail('');
  };

  // Updated logo paths with error handling
  const logoUrl = theme === 'dark' 
    ? '/lovable-uploads/0b439e01-d1aa-4e14-b75d-00cc947f78ef.png' 
    : '/lovable-uploads/649e008f-f511-4467-97e6-d658be7b73e6.png';

  const handleImageError = () => {
    setLogoError(true);
    console.error("Logo image failed to load:", logoUrl);
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 z-40 transition-all duration-300',
        theme === 'dark' ? 'bg-[#222222] border-neutral-700' : 'bg-white border-neutral-200',
        collapsed ? 'w-16' : 'w-64'
      )}
      style={{ borderRight: '1px solid' }}
    >
      <div className="flex flex-col h-full">
        <div className={cn(
          "p-4 flex items-center",
          theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'
        )} 
        style={{ borderBottom: '1px solid' }}>
          {!collapsed && (
            <div className="flex items-center gap-3">
              {logoError ? (
                <div className="h-8 w-8 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded">
                  <ImageOff size={16} className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'} />
                </div>
              ) : (
                <img
                  src={logoUrl}
                  alt="pons logo"
                  className="h-8 w-auto"
                  onError={handleImageError}
                />
              )}
              <span className={cn(
                "text-xl font-medium",
                theme === 'dark' ? 'text-white' : 'text-black'
              )}>pons</span>
            </div>
          )}
          {collapsed && (
            logoError ? (
              <div className="h-8 w-8 flex items-center justify-center bg-neutral-100 dark:bg-neutral-800 rounded mx-auto">
                <ImageOff size={16} className={theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'} />
              </div>
            ) : (
              <img
                src={logoUrl}
                alt="pons logo"
                className="h-8 w-auto mx-auto"
                onError={handleImageError}
              />
            )
          )}
        </div>
        
        <nav className="flex-1 pt-4">
          <ul className="space-y-1 px-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors',
                      isActive
                        ? theme === 'dark' 
                          ? 'bg-neutral-700 text-white' 
                          : 'bg-neutral-200 text-black'
                        : theme === 'dark'
                          ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                          : 'text-neutral-600 hover:bg-neutral-100 hover:text-black',
                      collapsed ? 'justify-center' : 'justify-start'
                    )
                  }
                >
                  <link.icon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
                  {!collapsed && <span>{link.name}</span>}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        
        {!collapsed && (
          <div className={cn(
            "p-4",
            theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'
          )}
          style={{ borderTop: '1px solid' }}>
            <div className="mb-3">
              <p className={cn(
                "text-xs mb-2",
                theme === 'dark' ? 'text-neutral-400' : 'text-neutral-500'
              )}>
                we will send you an email with a new tool per week
              </p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={cn(
                    "text-xs h-8",
                    theme === 'dark' 
                      ? 'bg-[#333333] border-neutral-700 text-white' 
                      : 'bg-white border-neutral-200 text-black'
                  )}
                />
                <Button 
                  type="submit" 
                  size="sm" 
                  className="h-8 px-2"
                  variant={theme === 'dark' ? 'default' : 'outline'}
                >
                  <ArrowRight className="h-3 w-3" />
                </Button>
              </form>
            </div>
          </div>
        )}
        
        <div className={cn(
          "p-4",
          theme === 'dark' ? 'border-neutral-700' : 'border-neutral-200'
        )}
        style={{ borderTop: collapsed ? '1px solid' : 'none' }}>
          <button
            onClick={toggleTheme}
            className={cn(
              'flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors',
              theme === 'dark'
                ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-black',
              collapsed ? 'justify-center' : 'justify-start'
            )}
          >
            {theme === 'dark' ? (
              <Sun className={cn('h-5 w-5', !collapsed && 'mr-3')} />
            ) : (
              <Moon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
            )}
            {!collapsed && <span>{theme === 'dark' ? 'light mode' : 'dark mode'}</span>}
          </button>
          
          <button
            onClick={toggleSidebar}
            className={cn(
              "mt-2 flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors",
              theme === 'dark'
                ? 'text-neutral-300 hover:bg-neutral-800 hover:text-white'
                : 'text-neutral-600 hover:bg-neutral-100 hover:text-black'
            )}
          >
            {collapsed ? (
              <span className="mx-auto">→</span>
            ) : (
              <span>← collapse</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
