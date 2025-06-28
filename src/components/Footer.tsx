
import { Link } from 'react-router-dom';
import FooterSocialMetrics from './Footer/FooterSocialMetrics';
import FooterTrustIndicators from './Footer/FooterTrustIndicators';
import FooterSocialLinks from './Footer/FooterSocialLinks';

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
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Uma plataforma multimídia para explorar ideias complexas e desenvolver pensamento crítico.
            </p>
            
            <FooterSocialMetrics />
            <FooterTrustIndicators />
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
              <li>
                <Link to="/substack" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Análise Substack
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
                <Link to="/laboratorio" className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors">
                  Laboratório Dialético 🔬
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-4">Siga-nos em Todas as Plataformas</h3>
            <FooterSocialLinks />
            
            <div className="mt-4 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="text-xs font-medium text-gray-900 dark:text-gray-100 mb-1">
                🎯 Conteúdo Exclusivo
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Cada plataforma tem conteúdo único adaptado ao seu formato
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-gray-200 dark:border-gray-800">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-4 sm:mb-0">
            © {new Date().getFullYear()} Espelho Invertido. Todos os direitos reservados.
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-500">
            Conecte-se conosco em todas as plataformas para uma experiência completa
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
