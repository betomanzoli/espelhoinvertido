
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, TrendingUp, X } from 'lucide-react';
import { SOCIAL_PLATFORMS } from './SocialMediaData';

interface SocialMediaWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

const SocialMediaWidget = ({ isOpen, onClose }: SocialMediaWidgetProps) => {
  if (!isOpen) return null;

  const totalFollowers = SOCIAL_PLATFORMS.reduce((sum, platform) => 
    sum + (platform.followerCount || 0), 0
  );

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-w-[calc(100vw-2rem)]">
      <Card className="shadow-2xl border-2 border-primary/20 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="h-5 w-5" />
              Redes Sociais
            </CardTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Users className="h-4 w-4" />
            <span>{totalFollowers.toLocaleString()} seguidores totais</span>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          {SOCIAL_PLATFORMS.map((platform) => (
            <div key={platform.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-xl">{platform.icon}</span>
                <div>
                  <div className="font-medium text-sm">{platform.displayName}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {platform.followerCount?.toLocaleString()} seguidores
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-8 px-2"
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
              <Badge variant="secondary" className="text-xs">
                📈 Crescimento constante
              </Badge>
              <Badge variant="secondary" className="text-xs">
                🎯 Conteúdo de qualidade
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SocialMediaWidget;
