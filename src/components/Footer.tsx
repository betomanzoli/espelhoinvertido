
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <img 
              src="/lovable-uploads/08350827-f555-408e-a8ce-c5fa4b9ff4dc.png" 
              alt="Espelho Invertido Logo" 
              className="h-8 w-8"
            />
            <span className="text-sm font-medium">Espelho Invertido © {new Date().getFullYear()}</span>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6">
            <a
              href="https://espelhoinvertido.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
            >
              <span>Visite nosso Substack</span>
              <ExternalLink className="h-4 w-4" />
            </a>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/debate" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Debates
              </Link>
              <Link to="/library" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Biblioteca
              </Link>
              <Link to="/resources" className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                Recursos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
