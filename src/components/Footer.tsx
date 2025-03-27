
import { Link } from 'react-router-dom';
import { ExternalLink, Check } from 'lucide-react';

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
            
            {/* Certificados de confiança */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Pensamento Crítico Garantido</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>50+ crônicas publicadas</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Conteúdo baseado em fontes históricas verificadas</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Navegação</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/debate" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Debate Crítico
                </Link>
              </li>
              <li>
                <Link to="/library" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Biblioteca
                </Link>
              </li>
              <li>
                <Link to="/resources" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Recursos
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Aplicativos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/debate" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Chat Rafael e Luísa 💬
                </Link>
              </li>
              <li>
                <Link to="/simulador" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Simulador de Revoluções ⚔️
                </Link>
              </li>
              <li>
                <Link to="/mapa-conflitos" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Mapa de Conflitos Ideológicos 🌍
                </Link>
              </li>
              <li>
                <Link to="/museu" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Museu Virtual das Revoluções 🏛️
                </Link>
              </li>
              <li>
                <Link to="/cronicas" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Escreva Sua Crônica ✍️
                </Link>
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
                  className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors"
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
        </div>
      </div>
    </footer>
  );
};

export default Footer;
