
import { useState } from 'react';
import { useProjectInfo } from '@/hooks/useProjectInfo';
import ProjectHeader from '@/components/project/ProjectHeader';
import SimuladorTabs from '@/components/simulador/SimuladorTabs';
import SimuladorActions from '@/components/simulador/SimuladorActions';

const SimuladorRevolucoes = () => {
  const { projectInfo, isLoading } = useProjectInfo('Simulador de Revoluções');
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
                
                <SimuladorTabs 
                  tabs={projectInfo?.tabs || { gameplay: [], technical: [] }}
                  activeTab={activeTab}
                  onTabChange={setActiveTab}
                />
              </div>
              
              <SimuladorActions substackUrl={projectInfo?.substackUrl} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimuladorRevolucoes;
