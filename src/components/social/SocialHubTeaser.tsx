
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, TrendingUp, Verified, Bell, RefreshCw } from 'lucide-react';
import { SOCIAL_PLATFORMS } from './SocialMediaData';
import { useSocialMetrics } from '@/hooks/useSocialMetrics';
import { Skeleton } from '@/components/ui/skeleton';

const SocialHubTeaser = () => {
  const activePlatforms = SOCIAL_PLATFORMS.filter(platform => platform.isActive);
  const { metrics, totalFollowers, avgEngagement, isLoading, refreshMetrics } = useSocialMetrics();
  
  return (
    <section className="page-container py-16">
      <div className="content-wrapper">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Siga-nos em Todas as Plataformas
          </h2>
          <p className="lead max-w-3xl mx-auto">
            Conteúdo exclusivo e adaptado para cada rede social. Do aprofundamento no Substack 
            aos vídeos educativos no YouTube, análises no LinkedIn e reflexões visuais no Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activePlatforms.map((platform) => (
            <Card key={platform.id} className="card-espelho hover-lift group">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-4xl flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-300">
                  {platform.icon}
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  {platform.displayName}
                  {platform.verified && <Verified className="w-4 h-4 text-amber-500" />}
                </CardTitle>
                <CardDescription className="text-sm">
                  {platform.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-3">
                <div className="flex justify-center">
                  <Badge 
                    variant="secondary" 
                    className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 text-xs"
                  >
                    {platform.id === 'substack' && '📧 Newsletter Gratuita'}
                    {platform.id === 'youtube' && '🎥 Vídeos Educativos'}
                    {platform.id === 'linkedin' && '💼 Análises Profissionais'}
                    {platform.id === 'instagram' && '📸 Reflexões Visuais'}
                    {platform.id === 'tiktok' && '🎵 Análises Rápidas'}
                  </Badge>
                </div>
                
                <Button 
                  asChild 
                  className="w-full btn-primary"
                >
                  <a 
                    href={platform.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    {platform.id === 'substack' ? 'Inscrever-se' : 'Seguir'}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Métricas Dinâmicas e Social Proof */}
        <div className="card-espelho p-8">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <h3 className="heading-3">Uma Comunidade em Crescimento</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={refreshMetrics}
                className="h-8 w-8"
                disabled={isLoading}
              >
                <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                {isLoading ? (
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                ) : (
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {totalFollowers.toLocaleString('pt-BR')}+
                  </div>
                )}
                <div className="text-sm text-slate-600 dark:text-slate-400">Seguidores Totais</div>
              </div>
              <div className="text-center">
                {isLoading ? (
                  <Skeleton className="h-8 w-16 mx-auto mb-2" />
                ) : (
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {avgEngagement.toFixed(1)}%
                  </div>
                )}
                <div className="text-sm text-slate-600 dark:text-slate-400">Engajamento Médio</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-amber-500 mb-2">5+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Plataformas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">🆓</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Acesso Gratuito</div>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Junte-se à nossa comunidade para receber análises profundas sobre vieses, 
              contradições ideológicas e reflexões sobre o mundo contemporâneo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-accent">
                <a 
                  href="https://espelhoinvertido.substack.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  Começar pelo Substack
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              <Button variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <Users className="w-5 h-5 mr-2" />
                Ver Todas as Redes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialHubTeaser;
