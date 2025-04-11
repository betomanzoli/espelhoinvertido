
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon, BookOpen, MessageSquare, Book } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/components/ThemeProvider';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import AnimatedLogo from '@/components/AnimatedLogo';

const Header = () => {
  const { setTheme, theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Controle de rolagem para aplicar efeitos no cabeçalho
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Navegação
  const navigation = [
    { name: 'Início', href: '/' },
    { name: 'Debate', href: '/debate', icon: <MessageSquare className="h-4 w-4" /> },
    { name: 'Biblioteca', href: '/library', icon: <BookOpen className="h-4 w-4" /> },
    { name: 'Recursos', href: '/resources', icon: <Book className="h-4 w-4" /> }
  ];
  
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled 
          ? "bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md py-2" 
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <AnimatedLogo size="sm" />
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                size="sm"
                asChild
                className={cn(
                  "flex items-center gap-1.5",
                  isActive(item.href) && "bg-accent text-accent-foreground"
                )}
              >
                <Link to={item.href}>
                  {item.icon}
                  {item.name}
                </Link>
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="icon"
              className="ml-2"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </nav>
          
          {/* Mobile Menu */}
          <div className="flex md:hidden gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="h-9 w-9">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <AnimatedLogo size="sm" />
                    <SheetTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </SheetTrigger>
                  </div>
                  
                  <nav className="flex flex-col space-y-4">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={cn(
                          "px-4 py-2 rounded-md flex items-center gap-3 transition-colors",
                          isActive(item.href) 
                            ? "bg-accent text-accent-foreground font-medium" 
                            : "hover:bg-accent/50"
                        )}
                      >
                        {item.icon}
                        {item.name}
                      </Link>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
