import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BookOpen, Calendar, Eye, HistoryIcon, Landmark, PanelsTopLeft, History, Video } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';

const MuseuVirtual = () => {
  const { projectInfo, isLoading } = useProjectInfo('Museu Virtual das Revoluções');
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

  const handleVisitClick = () => {
    toast.info('Museu Virtual', {
      description: 'O Museu Virtual das Revoluções está em desenvolvimento. Acesso preliminar disponível em breve.'
    });
  };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="glass-card overflow-hidden">
            <ProjectHeader 
              title="Museu Virtual das Revoluções"
              icon="🏛️"
              coverImage={projectInfo?.coverImage}
              substackUrl={projectInfo?.substackUrl}
            />
            
            <div className="p-8 md:p-12">
              <div className="mb-12">
                <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
                  {projectInfo?.description || 
                   "Uma experiência imersiva que transporta os visitantes para momentos históricos revolucionários através de tecnologias de realidade aumentada e virtual."}
                </p>
                
                <Tabs defaultValue="overview" className="w-full" onValueChange={setActiveTab}>
                  <TabsList className="grid grid-cols-3 mb-8">
                    <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                    <TabsTrigger value="exhibits">Exposições</TabsTrigger>
                    <TabsTrigger value="experience">Experiência</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Landmark className="text-primary h-5 w-5" />
                            Arquitetura Virtual
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Explore ambientes reconstruídos com precisão histórica, desde as ruas de Paris durante a Comuna até Petrogrado em 1917.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <PanelsTopLeft className="text-primary h-5 w-5" />
                            Acervo Digital
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Acesse documentos históricos, objetos e gravações da época, digitalizados em alta resolução e contextualizados.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <History className="text-primary h-5 w-5" />
                            Linha do Tempo
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Navegue por uma linha do tempo interativa que conecta diferentes momentos revolucionários e seus desdobramentos globais.</p>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="flex items-center gap-2">
                            <Video className="text-primary h-5 w-5" />
                            Reconstruções Imersivas
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Vivencie momentos históricos através de reconstruções visuais e sonoras que recriam a atmosfera dos eventos revolucionários.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="exhibits" className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Card className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
                          <Calendar className="h-16 w-16 text-white" />
                        </div>
                        <CardHeader>
                          <CardTitle>Revolução Francesa (1789-1799)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Caminhe pelas ruas de Paris durante os momentos decisivos da queda da Bastilha até o Terror jacobino, com reconstruções detalhadas dos principais locais e eventos.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
                          <Landmark className="h-16 w-16 text-white" />
                        </div>
                        <CardHeader>
                          <CardTitle>Comuna de Paris (1871)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Explore os 72 dias da primeira experiência de governo operário da história, com acesso a documentos originais, decretos e relatos dos communards.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-orange-500 to-orange-700 flex items-center justify-center">
                          <HistoryIcon className="h-16 w-16 text-white" />
                        </div>
                        <CardHeader>
                          <CardTitle>Revolução Russa (1917)</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Assista aos acontecimentos de Outubro em Petrogrado, dos debates nos sovietes à tomada do Palácio de Inverno, com acesso a discursos, manifestos e documentos do período.</p>
                        </CardContent>
                      </Card>
                      
                      <Card className="overflow-hidden">
                        <div className="h-40 bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
                          <Eye className="h-16 w-16 text-white" />
                        </div>
                        <CardHeader>
                          <CardTitle>Revoluções Contemporâneas</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p>Conheça movimentos revolucionários mais recentes da América Latina, África e Ásia, com depoimentos de participantes e análise de suas conquistas e limitações.</p>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="experience" className="space-y-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-lg">
                      <h3 className="text-xl font-medium mb-4">Uma jornada imersiva pela história</h3>
                      <p className="mb-4">O Museu Virtual das Revoluções oferece uma experiência totalmente nova de aprendizado histórico:</p>
                      
                      <ul className="space-y-3">
                        <li className="flex items-start gap-2">
                          <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Eye className="h-4 w-4 text-primary" />
                          </div>
                          <span>Navegação em primeira pessoa pelos cenários históricos</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <Video className="h-4 w-4 text-primary" />
                          </div>
                          <span>Interação com personagens históricos através de diálogos baseados em seus escritos reais</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <BookOpen className="h-4 w-4 text-primary" />
                          </div>
                          <span>Acesso a textos, manifestos e documentos da época em seu contexto original</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="bg-primary/10 p-1 rounded-full mt-1">
                            <History className="h-4 w-4 text-primary" />
                          </div>
                          <span>Possibilidade de acompanhar o desenvolvimento das revoluções dia a dia</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {projectInfo?.tabs.educational.map((feature, index) => (
                        <div key={index} className="bg-primary/5 p-4 rounded-lg">
                          <h3 className="font-medium mb-2 text-primary">Perspectiva Educacional</h3>
                          <p className="text-sm">{feature}</p>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="text-center">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" onClick={handleVisitClick} className="gap-2">
                    <Eye className="h-5 w-5" />
                    Visitar Museu Virtual
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

export default MuseuVirtual;
