
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BookOpen, MapPin, Network, Compass, Layers, BookMarked, Workflow } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';

const MapaConflitos = () => {
  const { projectInfo, isLoading } = useProjectInfo('Mapa de Conflitos Ideológicos');
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const handleExploreClick = () => {
    toast.info('Mapa interativo', {
      description: 'O mapa de conflitos ideológicos está em desenvolvimento. Versão preliminar disponível em breve.'
    });
  };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <ProjectHeader 
              title="Mapa de Conflitos Ideológicos"
              icon="🗺️"
              coverImage={projectInfo?.coverImage}
              substackUrl={projectInfo?.substackUrl}
            />
            
            <div className="p-8 md:p-12">
              <div className="mb-12">
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
                  {projectInfo?.description || 
                   "Uma ferramenta interativa que permite visualizar e navegar pelo complexo território das ideologias políticas, mapeando suas interconexões, divergências e evolução histórica."}
                </p>
                
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="features">Funcionalidades</TabsTrigger>
                    <TabsTrigger value="examples">Exemplos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <MapPin className="text-primary h-5 w-5" />
                            Cartografia Ideológica
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Representação visual das principais correntes ideológicas e seus conceitos-chave, contextualizando debates contemporâneos em suas raízes históricas.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Network className="text-primary h-5 w-5" />
                            Conexões Conceituais
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Explore as interconexões entre diferentes tradições de pensamento e veja como conceitos evolueam ao longo do tempo.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Compass className="text-primary h-5 w-5" />
                            Navegação Contextual
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Navegue pelos territórios ideológicos com ferramentas que permitem comparar diferentes interpretações dos mesmos eventos históricos.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Layers className="text-primary h-5 w-5" />
                            Camadas de Análise
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Alterne entre diferentes camadas analíticas como economia, política, cultura e filosofia para compreender as múltiplas dimensões dos debates ideológicos.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {projectInfo?.tabs.gameplay.map((feature, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
                            <CardTitle className="flex items-center gap-2 text-base">
                              {index % 3 === 0 ? <Network className="h-4 w-4 text-primary" /> : 
                               index % 3 === 1 ? <BookMarked className="h-4 w-4 text-primary" /> : 
                               <Workflow className="h-4 w-4 text-primary" />}
                              Funcionalidade
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p>{feature}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                        Biblioteca de Conceitos
                      </h3>
                      <p>Acesso a uma extensa biblioteca de conceitos-chave e suas interpretações ao longo de diferentes tradições de pensamento político e filosófico, com explicações contextualizadas e referências bibliográficas.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="examples" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Estudo de Caso 1: O Conceito de Liberdade</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Explore como diferentes tradições ideológicas—do liberalismo ao marxismo, do conservadorismo ao anarquismo—definem e interpretam o conceito de liberdade, suas condições de realização e seus limites.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Estudo de Caso 2: Interpretações da Democracia</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Análise comparativa de diferentes concepções de democracia, desde visões procedimentais focadas em eleições até perspectivas substanciais centradas na distribuição de poder econômico e social.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Estudo de Caso 3: Crises Econômicas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Visualização das divergentes interpretações sobre as origens e soluções para crises econômicas, comparando teorias keynesianas, marxistas, austríacas e outras tradições econômicas.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Estudo de Caso 4: Narrativas Revolucionárias</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Comparação entre diferentes narrativas sobre eventos revolucionários históricos, desde celebrações da emancipação popular até críticas sobre violência e autoritarismo.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={handleExploreClick} className="gap-2">
                    <MapPin className="h-5 w-5" />
                    Explorar Mapa Interativo
                  </Button>
                  
                  <Button asChild variant="outline" size="lg">
                    <a href={projectInfo?.substackUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                      Leia mais no Substack
                      <BookOpen className="h-5 w-5" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaConflitos;
