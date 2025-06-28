
import { Link } from 'react-router-dom';
import { ExternalLink, Check, Users, TrendingUp } from 'lucide-react';
import { SOCIAL_PLATFORMS } from './social/SocialMediaData';

const Footer = () => {
  const totalFollowers = SOCIAL_PLATFORMS.reduce((sum, platform) => 
    sum + (platform.followerCount || 0), 0
  );

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
            
            {/* Métricas das redes sociais */}
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  Comunidade Ativa
                </span>
              </div>
              <div className="flex items-center gap-1 text-sm text-blue-700 dark:text-blue-300">
                <Users className="h-3 w-3" />
                <span>{totalFollowers.toLocaleString()} seguidores</span>
              </div>
            </div>
            
            {/* Certificados de confiança */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Pensamento Crítico Garantido</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>50+ publicações verificadas</span>
              </div>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Check className="h-4 w-4 text-green-500 mr-2" />
                <span>Conteúdo multi-plataforma</span>
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
            <div className="space-y-3">
              {SOCIAL_PLATFORMS.map((platform) => (
                <a
                  key={platform.id}
                  href={platform.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-sm text-gray-600 dark:text-gray-400 hover:text-blue-700 dark:hover:text-teal-400 transition-colors group"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform">
                    {platform.icon}
                  </span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{platform.displayName}</span>
                      <ExternalLink className="h-3 w-3" />
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-500">
                      {platform.followerCount?.toLocaleString()} seguidores
                    </div>
                  </div>
                </a>
              ))}
            </div>
            
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
