
import { useState } from 'react';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProjectHeader from '@/components/project/ProjectHeader';
import MuseuOverview from '@/components/museu/MuseuOverview';
import MuseuExhibits from '@/components/museu/MuseuExhibits';
import MuseuExperience from '@/components/museu/MuseuExperience';
import MuseuActions from '@/components/museu/MuseuActions';
import MuseuLoading from '@/components/museu/MuseuLoading';

const MuseuVirtual = () => {
  const { projectInfo, isLoading } = useProjectInfo('Museu Virtual das Revoluções');
  const [activeTab, setActiveTab] = useState('overview');

  if (isLoading) {
    return <MuseuLoading />;
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
                  
                  <TabsContent value="overview" className="space-y-6">
                    <MuseuOverview />
                  </TabsContent>
                  
                  <TabsContent value="exhibits" className="space-y-8">
                    <MuseuExhibits />
                  </TabsContent>
                  
                  <TabsContent value="experience" className="space-y-6">
                    <MuseuExperience educationalPerspectives={projectInfo?.tabs?.educational} />
                  </TabsContent>
                </Tabs>
              </div>
              
              <MuseuActions substackUrl={projectInfo?.substackUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MuseuVirtual;
