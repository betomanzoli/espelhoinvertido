
import { Link } from 'react-router-dom';
import { ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/lovable-uploads/08350827-f555-408e-a8ce-c5fa4b9ff4dc.png" 
                alt="Espelho Invertido Logo" 
                className="h-8 w-8"
              />
              <span className="font-medium">Espelho Invertido</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Uma plataforma multimídia para explorar ideias complexas e desenvolver pensamento crítico.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/debate" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Debate Crítico
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  Recursos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Projetos Futuros</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Mapa de Conflitos Ideológicos
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Simulador de Revoluções
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Escreva Sua Crônica
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Análise de Discurso
                </span>
              </li>
              <li>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Economia em Ação
                </span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Links Externos</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://espelhoinvertido.substack.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                >
                  <span>Substack</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Espelho Invertido. Todos os direitos reservados.
          </div>
          
          <div>
            <a
              href="https://espelhoinvertido.substack.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-primary hover:text-primary/80 transition-colors"
            >
              <span>Visite nosso Substack</span>
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
