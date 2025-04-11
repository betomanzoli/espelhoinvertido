
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { 
  BarChart3, 
  BookOpen, 
  Clock, 
  GraduationCap, 
  HistoryIcon, 
  LineChart, 
  Network, 
  Trophy 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';

const SimuladorRevolucoes = () => {
  const { projectInfo, isLoading } = useProjectInfo('Simulador de Revoluções');
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

  const handleDemoClick = () => {
    toast.info('Simulação iniciada', {
      description: 'O simulador está em fase de desenvolvimento. Uma versão demo será lançada em breve.'
    });
  };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <ProjectHeader 
              title="Simulador de Revoluções"
              icon="📊"
              coverImage={projectInfo?.coverImage}
              substackUrl={projectInfo?.substackUrl}
            />
            
            <div className="p-8 md:p-12">
              <div className="mb-12">
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
                  {projectInfo?.description || 
                   "Um jogo de estratégia baseado em eventos históricos reais onde você experimenta as complexas dinâmicas sociais, econômicas e políticas que precedem e acompanham transformações revolucionárias."}
                </p>
                
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="features">Funcionalidades</TabsTrigger>
                    <TabsTrigger value="technical">Aspectos Técnicos</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <HistoryIcon className="text-primary h-5 w-5" />
                            Contexto Histórico
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Explore cenários históricos detalhados baseados em pesquisas acadêmicas, desde a Revolução Francesa até movimentos contemporâneos.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Network className="text-primary h-5 w-5" />
                            Simulação Social
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Sistema de simulação que modela tensões de classe, distribuição de recursos e fatores ideológicos em sociedades históricas.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Clock className="text-primary h-5 w-5" />
                            Eventos Dinâmicos
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Os eventos respondem às suas ações e às condições sociais em constante mudança, criando narrativas únicas a cada jogo.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <GraduationCap className="text-primary h-5 w-5" />
                            Ferramentas Educativas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Conecte eventos do jogo com textos históricos relevantes e aprenda sobre as teorias que moldaram movimentos revolucionários.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="features" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {projectInfo?.tabs.gameplay.map((feature, index) => (
                        <Card key={index} className="overflow-hidden">
                          <CardHeader className="bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/20 dark:to-teal-900/20">
                            <CardTitle className="flex items-center gap-2 text-base">
                              {index % 3 === 0 ? <LineChart className="h-4 w-4 text-primary" /> : 
                               index % 3 === 1 ? <BarChart3 className="h-4 w-4 text-primary" /> : 
                               <Trophy className="h-4 w-4 text-primary" />}
                              Funcionalidade
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <p>{feature}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Educação e Análise Histórica
                      </h3>
                      <p>O simulador não apenas oferece uma experiência de jogo envolvente, mas também serve como ferramenta educativa para compreender os fatores materiais, políticos e ideológicos que contribuem para transformações sociais significativas.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="technical" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {projectInfo?.tabs.technical.map((feature, index) => (
                        <div key={index} className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 text-primary">{`Especificação Técnica ${index + 1}`}</h3>
                          <p className="text-sm">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={handleDemoClick} className="gap-2">
                    <LineChart className="h-5 w-5" />
                    Iniciar Simulação
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

export default SimuladorRevolucoes;
