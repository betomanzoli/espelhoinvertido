
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, BookOpen, TrendingUp, Users, Bell } from 'lucide-react';

const SubstackHighlight = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-orange-200 dark:border-orange-800 shadow-2xl">
            <CardHeader className="text-center pb-6">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="text-4xl">📝</span>
                <CardTitle className="text-3xl font-display">
                  Espelho Invertido no Substack
                </CardTitle>
              </div>
              <CardDescription className="text-lg max-w-2xl mx-auto">
                Nossa plataforma principal para análises profundas, crônicas dialéticas e 
                reflexões sobre o mundo contemporâneo através de lentes marxistas
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <BookOpen className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="font-semibold text-lg">50+</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Publicações</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <Users className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="font-semibold text-lg">2.5K</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Assinantes</div>
                </div>
                <div className="text-center p-4 bg-white dark:bg-gray-800 rounded-lg border">
                  <TrendingUp className="h-8 w-8 mx-auto mb-2 text-orange-600" />
                  <div className="font-semibold text-lg">95%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Taxa de Abertura</div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 p-6 rounded-lg border border-orange-200 dark:border-orange-700">
                <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                  <span className="text-orange-600">🎯</span>
                  O que você encontra no nosso Substack:
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">✍️ Análises</Badge>
                    <span className="text-sm">Textos aprofundados sobre temas contemporâneos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">💭 Debates</Badge>
                    <span className="text-sm">Diálogos entre Rafael e Luísa</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">📊 Dados</Badge>
                    <span className="text-sm">Pesquisas e estatísticas comentadas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">🔍 Críticas</Badge>
                    <span className="text-sm">Análises críticas da mídia e política</span>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700" asChild>
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
                
                <Button variant="outline" size="lg" asChild>
                  <a 
                    href="/substack" 
                    className="flex items-center gap-2"
                  >
                    <BookOpen className="h-5 w-5" />
                    Ver Análises Dialéticas
                  </a>
                </Button>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  📧 Newsletter semanal • 🆓 Conteúdo gratuito • 🎯 Análises exclusivas
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
