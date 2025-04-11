
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { AreaChart, BookOpen, LineChart, BarChart3, Lightbulb, PieChart, Settings2, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';

const EconomiaAcao = () => {
  const { projectInfo, isLoading } = useProjectInfo('Economia em Ação');
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

  const handleSimulateClick = () => {
    toast.info('Simulação econômica', {
      description: 'O simulador econômico está em desenvolvimento. Acesso preliminar disponível em breve.'
    });
  };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <ProjectHeader 
              title="Economia em Ação"
              icon="📊"
              coverImage={projectInfo?.coverImage}
              substackUrl={projectInfo?.substackUrl}
            />
            
            <div className="p-8 md:p-12">
              <div className="mb-12">
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
                  {projectInfo?.description || 
                   "Uma plataforma interativa que permite explorar o impacto de diferentes políticas econômicas em sociedades virtuais modeladas com base em dados históricos reais."}
                </p>
                
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="models">Modelos</TabsTrigger>
                    <TabsTrigger value="scenarios">Cenários</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <LineChart className="text-primary h-5 w-5" />
                            Simulação Econômica
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Experimente diferentes abordagens econômicas e observe seus efeitos na distribuição de riqueza, bem-estar social e desenvolvimento tecnológico.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <AreaChart className="text-primary h-5 w-5" />
                            Modelagem Multidimensional
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Os modelos consideram fatores sociais, ambientais e políticos além dos puramente econômicos, oferecendo uma visão mais completa.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Settings2 className="text-primary h-5 w-5" />
                            Personalização de Políticas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Defina taxas de impostos, regulações trabalhistas, políticas monetárias e outros parâmetros para criar sua própria abordagem econômica.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Lightbulb className="text-primary h-5 w-5" />
                            Material Educativo
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Conecte os resultados de suas simulações com teorias econômicas clássicas e contemporâneas através de materiais explicativos.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="models" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <Card className="overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
                          <BarChart3 className="h-10 w-10 text-white" />
                        </div>
                        <CardHeader>
                          <CardTitle>Modelo Liberal</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Baixa intervenção estatal, mercados desregulados, impostos reduzidos e foco em crescimento econômico como motor do bem-estar social.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
                          <PieChart className="h-10 w-10 text-white" />
                        </div>
                        <CardHeader>
                          <CardTitle>Modelo Social-Democrata</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Economia mista com forte proteção social, impostos progressivos, serviços públicos universais e regulação do mercado.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-24 bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
                          <Building2 className="h-10 w-10 text-white" />
                        </div>
                        <CardHeader>
                          <CardTitle>Modelo Planejado</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Planejamento econômico centralizado, propriedade pública dos meios de produção e distribuição equitativa dos recursos.</p>
                        </CardContent>
                      </Card>
                    </div>
                    
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <h3 className="font-medium mb-2 flex items-center gap-2">
                        <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        Modelos Personalizáveis
                      </h3>
                      <p>Além dos modelos pré-configurados, você pode criar suas próprias abordagens econômicas combinando diferentes políticas e analisando os resultados em simulações de longo prazo.</p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="scenarios" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle>Revolução Industrial</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Simule políticas econômicas em uma sociedade em processo de industrialização, lidando com urbanização acelerada, formação da classe operária e transformações tecnológicas.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Estado de Bem-Estar Social</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Experimente o período pós-guerra com reconstrução econômica, expansão de direitos sociais e o estabelecimento do Estado de bem-estar social em suas diferentes vertentes.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Era Neoliberal</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Analise as transformações econômicas das décadas de 1980 e 1990, com desregulamentação financeira, privatizações e globalização econômica acelerada.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle>Economia Digital</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Explore os desafios econômicos contemporâneos com plataformas digitais, automação do trabalho, concentração de dados e novas formas de valor e exploração.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={handleSimulateClick} className="gap-2">
                    <LineChart className="h-5 w-5" />
                    Iniciar Simulação Econômica
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

export default EconomiaAcao;
