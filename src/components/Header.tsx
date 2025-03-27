
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Sun, Menu, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from "@/components/ThemeProvider";
import { cn } from '@/lib/utils';
import useMobileDetect from '@/hooks/use-mobile';

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useMobileDetect();
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Handle scroll event to change header styles
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'Debate Crítico', path: '/debate' },
    { name: 'Biblioteca', path: '/library' },
    { name: 'Recursos', path: '/resources' },
  ];
  
  return (
    <header className={cn(
      "fixed w-full top-0 z-50 transition-all duration-300",
      isScrolled ? "backdrop-blur-md bg-white/90 dark:bg-gray-900/90 border-b border-gray-200 dark:border-gray-800" : ""
    )}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/08350827-f555-408e-a8ce-c5fa4b9ff4dc.png" 
              alt="Espelho Invertido Logo" 
              className="h-10 w-10"
            />
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              Espelho Invertido
            </span>
          </Link>
          
          {/* Desktop nav */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? "text-blue-700 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <a
              href="https://espelhoinvertido.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 rounded-md text-sm font-medium transition-colors flex items-center space-x-1 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span>Substack</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="ml-2"
              aria-label="Toggle dark mode"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </nav>
          
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Open menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
      </div>
      
      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 py-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "block px-3 py-2 rounded-md text-base font-medium",
                  location.pathname === item.path || 
                  (item.path !== '/' && location.pathname.startsWith(item.path))
                    ? "text-blue-700 dark:text-teal-400 bg-gray-100 dark:bg-gray-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                {item.name}
              </Link>
            ))}
            
            <a
              href="https://espelhoinvertido.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span>Substack</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            
            <div className="pt-4 pb-2 border-t border-gray-200 dark:border-gray-800">
              <Button 
                variant="ghost" 
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="w-full justify-start"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="h-5 w-5 mr-2" />
                    Modo claro
                  </>
                ) : (
                  <>
                    <Moon className="h-5 w-5 mr-2" />
                    Modo escuro
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
