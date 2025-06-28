
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Users, TrendingUp, Verified, Bell } from 'lucide-react';
import { SOCIAL_PLATFORMS } from './SocialMediaData';

const SocialHubTeaser = () => {
  const activePlatforms = SOCIAL_PLATFORMS.filter(platform => platform.isActive);
  
  return (
    <section className="py-16 bg-gradient-to-br from-espelhoinvertido-primary/5 to-espelhoinvertido-accent/5 dark:from-espelhoinvertido-primary/10 dark:to-espelhoinvertido-accent/10">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-espelhoinvertido-primary to-espelhoinvertido-accent bg-clip-text text-transparent">
            Siga-nos em Todas as Plataformas
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Conteúdo exclusivo e adaptado para cada rede social. Do aprofundamento no Substack 
            aos vídeos educativos no YouTube, análises no LinkedIn e reflexões visuais no Instagram.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {activePlatforms.map((platform) => (
            <Card key={platform.id} className="hover:shadow-lg transition-all duration-300 group border-2 border-transparent hover:border-espelhoinvertido-accent/20">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 text-4xl flex items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 group-hover:scale-110 transition-transform duration-300">
                  {platform.icon}
                </div>
                <CardTitle className="flex items-center justify-center gap-2">
                  {platform.displayName}
                  {platform.verified && <Verified className="w-4 h-4 text-espelhoinvertido-gold" />}
                </CardTitle>
                <CardDescription className="text-sm">
                  {platform.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="text-center space-y-3">
                <div className="flex justify-center">
                  <Badge 
                    variant="secondary" 
                    className="bg-espelhoinvertido-accent/10 text-espelhoinvertido-primary text-xs"
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
                  className="w-full bg-gradient-to-r from-espelhoinvertido-primary to-espelhoinvertido-accent hover:from-espelhoinvertido-primary/90 hover:to-espelhoinvertido-accent/90"
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

        {/* Metrics e Social Proof */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-semibold mb-4">Uma Comunidade em Crescimento</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-espelhoinvertido-primary mb-2">5+</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Plataformas Ativas</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-espelhoinvertido-accent mb-2">📝</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Conteúdo Verificado</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-espelhoinvertido-gold mb-2">✨</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">Análises Autênticas</div>
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
              <Button asChild size="lg" className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
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
              <Button variant="outline" size="lg" className="border-espelhoinvertido-accent text-espelhoinvertido-primary hover:bg-espelhoinvertido-accent/10">
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
