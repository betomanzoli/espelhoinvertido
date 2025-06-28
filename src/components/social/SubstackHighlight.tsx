
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, Globe, Bell, Verified } from 'lucide-react';

const SubstackHighlight = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-espelhoinvertido-primary/5 to-espelhoinvertido-accent/5 dark:from-espelhoinvertido-primary/10 dark:to-espelhoinvertido-accent/10">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="brand-card border-2 border-espelhoinvertido-accent/20 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">📝</span>
                <CardTitle className="heading-2 brand-text">
                  Espelho Invertido no Substack
                </CardTitle>
              </div>
              <CardDescription className="body-large max-w-2xl mx-auto">
                Nossa plataforma principal para análises profundas, crônicas dialéticas e 
                reflexões sobre o mundo contemporâneo através de perspectivas críticas
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-espelhoinvertido-accent/10">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-espelhoinvertido-accent" />
                  <div className="font-semibold text-lg text-espelhoinvertido-primary">Análises</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Profundas</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-espelhoinvertido-accent/10">
                  <Verified className="h-8 w-8 mx-auto mb-2 text-espelhoinvertido-gold" />
                  <div className="font-semibold text-lg text-espelhoinvertido-primary">Verificado</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Conteúdo Autêntico</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border border-espelhoinvertido-accent/10">
                  <Globe className="h-8 w-8 mx-auto mb-2 text-espelhoinvertido-accent" />
                  <div className="font-semibold text-lg text-espelhoinvertido-primary">Ativo</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Regularmente</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-espelhoinvertido-primary/5 to-espelhoinvertido-accent/5 p-6 rounded-lg border border-espelhoinvertido-accent/20">
                <h3 className="heading-4 mb-3 flex items-center gap-2">
                  <span className="text-espelhoinvertido-gold">🎯</span>
                  O que você encontra no nosso Substack:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-espelhoinvertido-accent/30">✍️ Análises</Badge>
                    <span className="body-small">Textos aprofundados sobre temas contemporâneos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-espelhoinvertido-accent/30">💭 Reflexões</Badge>
                    <span className="body-small">Perspectivas críticas e dialéticas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-espelhoinvertido-accent/30">📊 Contexto</Badge>
                    <span className="body-small">Dados e informações contextualizadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs border-espelhoinvertido-accent/30">🔍 Críticas</Badge>
                    <span className="body-small">Análises críticas da mídia e política</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="button-primary" asChild>
                  <a 
                    href="https://espelhoinvertido.substack.com/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Bell className="h-5 w-5" />
                    Assinar Newsletter Gratuita
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                
                <Button variant="outline" size="lg" className="border-espelhoinvertido-accent text-espelhoinvertido-primary hover:bg-espelhoinvertido-accent hover:text-white" asChild>
                  <a 
                    href="/substack" 
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-5 w-5" />
                    Ver Análises Completas
                  </a>
                </Button>
              </div>
              
              <div className="text-center">
                <p className="body-small text-gray-600 dark:text-gray-400">
                  📧 Newsletter • 🆓 Conteúdo gratuito • 🎯 Análises autênticas
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SubstackHighlight;
