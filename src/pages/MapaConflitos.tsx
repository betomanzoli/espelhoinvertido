
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';
import MapaLoading from '@/components/mapa/MapaLoading';
import MapaOverview from '@/components/mapa/MapaOverview';
import MapaFeatures from '@/components/mapa/MapaFeatures';
import MapaExamples from '@/components/mapa/MapaExamples';
import MapaActions from '@/components/mapa/MapaActions';

const MapaConflitos = () => {
  const { projectInfo, isLoading } = useProjectInfo('Mapa de Conflitos Ideológicos');
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return <MapaLoading />;
  }

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
                  
                  <TabsContent value="overview">
                    <MapaOverview />
                  </TabsContent>
                  
                  <TabsContent value="features">
                    <MapaFeatures features={projectInfo?.tabs.gameplay || []} />
                  </TabsContent>
                  
                  <TabsContent value="examples">
                    <MapaExamples />
                  </TabsContent>
                </Tabs>
              </div>
              
              <MapaActions substackUrl={projectInfo?.substackUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapaConflitos;
