
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';
import MuseuLoading from '@/components/museu/MuseuLoading';
import MuseuOverview from '@/components/museu/MuseuOverview';
import MuseuExhibits from '@/components/museu/MuseuExhibits';
import MuseuExperience from '@/components/museu/MuseuExperience';
import VirtualMuseum from '@/components/museu/VirtualMuseum';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

const MuseuVirtual = () => {
  const { projectInfo, isLoading } = useProjectInfo('Museu Virtual das Revoluções');
  const [showMuseum, setShowMuseum] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return <MuseuLoading />;
  }

  if (showMuseum) {
    return (
      <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Button 
            variant="outline" 
            onClick={() => setShowMuseum(false)}
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar à Descrição
          </Button>
          <VirtualMuseum />
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
                  
                  <TabsContent value="overview">
                    <MuseuOverview />
                  </TabsContent>
                  
                  <TabsContent value="exhibits">
                    <MuseuExhibits />
                  </TabsContent>
                  
                  <TabsContent value="experience">
                    <MuseuExperience />
                  </TabsContent>
                </Tabs>
              </div>
              
              <div className="text-center">
                <Button 
                  size="lg" 
                  onClick={() => setShowMuseum(true)}
                  className="gap-2"
                >
                  Visitar Museu Virtual
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseuVirtual;
