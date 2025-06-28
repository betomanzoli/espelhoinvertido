
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Globe, X, Verified } from 'lucide-react';
import { SOCIAL_PLATFORMS, getVerifiedPlatforms } from './SocialMediaData';

interface SocialMediaWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialMediaWidget = ({ isOpen, onClose }: SocialMediaWidgetProps) => {
  if (!isOpen) return null;

  const verifiedPlatforms = getVerifiedPlatforms();

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-2 border-espelhoinvertido-accent/20 glass-card">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg font-display">
              <Globe className="h-5 w-5 text-espelhoinvertido-accent" />
              Redes Sociais
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Verified className="h-4 w-4 text-espelhoinvertido-gold" />
            <span>{verifiedPlatforms.length} plataformas verificadas</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {SOCIAL_PLATFORMS.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">{platform.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{platform.displayName}</span>
                    {platform.verified && (
                      <Verified className="h-3 w-3 text-espelhoinvertido-gold" />
                    )}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 max-w-48 truncate">
                    {platform.description}
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-8 px-2 hover:bg-espelhoinvertido-primary hover:text-white hover:border-espelhoinvertido-primary"
              >
                <a 
                  href={platform.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <ExternalLink className="h-3 w-3" />
                  Seguir
                </a>
              </Button>
            </div>
          ))}
          
          <div className="pt-2 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2 flex-wrap">
              <Badge variant="secondary" className="text-xs bg-espelhoinvertido-accent/10 text-espelhoinvertido-primary">
                🎯 Análises Autênticas
              </Badge>
              <Badge variant="secondary" className="text-xs bg-espelhoinvertido-gold/10 text-espelhoinvertido-text">
                ✨ Conteúdo Verificado
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaWidget;
