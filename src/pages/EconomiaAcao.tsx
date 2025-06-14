
import { useState } from 'react';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EconomiaOverview from '@/components/economia/EconomiaOverview';
import EconomiaModels from '@/components/economia/EconomiaModels';
import EconomiaScenarios from '@/components/economia/EconomiaScenarios';
import EconomicSimulator from '@/components/economia/EconomicSimulator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const EconomiaAcao = () => {
  const { projectInfo, isLoading } = useProjectInfo('Economia em Ação');
  const [showSimulator, setShowSimulator] = useState(false);
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

  if (showSimulator) {
    return (
      <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => setShowSimulator(false)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à Descrição
          </Button>
          <EconomicSimulator />
        </div>
      </div>
    );
  }

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
                  
                  <TabsContent value="overview">
                    <EconomiaOverview />
                  </TabsContent>
                  
                  <TabsContent value="models">
                    <EconomiaModels />
                  </TabsContent>
                  
                  <TabsContent value="scenarios">
                    <EconomiaScenarios />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={() => setShowSimulator(true)}
                  className="gap-2"
                >
                  Iniciar Simulação Econômica
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EconomiaAcao;
