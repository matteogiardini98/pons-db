
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Database, LayoutDashboard, PlusCircle, Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from '@/hooks/use-theme';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Database', path: '/', icon: Database },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Add Tool', path: '/add-tool', icon: PlusCircle },
  ];

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 bottom-0 z-40 transition-all duration-300 bg-[#222222] border-r border-neutral-700',
        collapsed ? 'w-16' : 'w-64'
      )}
    >
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-neutral-700 flex items-center">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <img
                src="/lovable-uploads/0b3a778e-cad6-428d-b345-9c0dc1f2c1b3.png"
                alt="pons41 logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-medium text-white">pons41</span>
            </div>
          )}
          {collapsed && (
            <img
              src="/lovable-uploads/0b3a778e-cad6-428d-b345-9c0dc1f2c1b3.png"
              alt="pons41 logo"
              className="h-8 w-auto mx-auto"
            />
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
                        ? 'bg-neutral-700 text-white'
                        : 'text-neutral-300 hover:bg-neutral-800 hover:text-white',
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
        
        <div className="p-4 border-t border-neutral-700">
          <button
            onClick={toggleTheme}
            className={cn(
              'flex items-center w-full px-3 py-2 rounded-md text-sm font-medium transition-colors',
              'text-neutral-300 hover:bg-neutral-800 hover:text-white',
              collapsed ? 'justify-center' : 'justify-start'
            )}
          >
            {theme === 'dark' ? (
              <Sun className={cn('h-5 w-5', !collapsed && 'mr-3')} />
            ) : (
              <Moon className={cn('h-5 w-5', !collapsed && 'mr-3')} />
            )}
            {!collapsed && <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>}
          </button>
          
          <button
            onClick={toggleSidebar}
            className="mt-2 flex items-center w-full px-3 py-2 rounded-md text-sm font-medium text-neutral-300 hover:bg-neutral-800 hover:text-white transition-colors"
          >
            {collapsed ? (
              <span className="mx-auto">→</span>
            ) : (
              <span>← Collapse</span>
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
