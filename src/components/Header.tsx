
import { Link, useLocation } from 'react-router-dom';
import { Book, Menu, MessageCircle, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed w-full top-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link 
          to="/" 
          className="text-2xl font-display font-medium flex items-center gap-2 transition-all duration-300 hover:opacity-80"
        >
          <span className="title-gradient">Debate Crítico</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavLink to="/" active={isActive('/')}>
            Início
          </NavLink>
          <NavLink to="/debate" active={isActive('/debate')}>
            <MessageCircle className="w-4 h-4 mr-1" />
            Debates
          </NavLink>
          <NavLink to="/library" active={isActive('/library')}>
            <Book className="w-4 h-4 mr-1" />
            Biblioteca
          </NavLink>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMenu}
          className="md:hidden flex items-center text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden animate-fade-in absolute top-full left-0 w-full glass-effect py-4 shadow-medium">
          <nav className="flex flex-col space-y-3 px-6">
            <MobileNavLink to="/" onClick={toggleMenu} active={isActive('/')}>
              Início
            </MobileNavLink>
            <MobileNavLink to="/debate" onClick={toggleMenu} active={isActive('/debate')}>
              <MessageCircle className="w-5 h-5 mr-2" />
              Debates
            </MobileNavLink>
            <MobileNavLink to="/library" onClick={toggleMenu} active={isActive('/library')}>
              <Book className="w-5 h-5 mr-2" />
              Biblioteca
            </MobileNavLink>
          </nav>
        </div>
      )}
    </header>
  );
};

interface NavLinkProps {
  to: string;
  active: boolean;
  children: React.ReactNode;
}

const NavLink = ({ to, active, children }: NavLinkProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center px-3 py-2 rounded-full text-sm font-medium transition-all duration-300",
      active 
        ? "bg-primary/10 text-primary" 
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
  >
    {children}
  </Link>
);

interface MobileNavLinkProps extends NavLinkProps {
  onClick: () => void;
}

const MobileNavLink = ({ to, active, onClick, children }: MobileNavLinkProps) => (
  <Link
    to={to}
    onClick={onClick}
    className={cn(
      "flex items-center py-3 px-4 rounded-lg text-base font-medium transition-all duration-300",
      active 
        ? "bg-primary/10 text-primary" 
        : "hover:bg-gray-100 dark:hover:bg-gray-800"
    )}
  >
    {children}
  </Link>
);

export default Header;
