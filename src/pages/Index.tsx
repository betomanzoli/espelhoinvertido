
import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ChroniclesSection from '@/components/home/ChroniclesSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import { setupAutoRefresh } from '@/services/substackService';
import { toast } from 'sonner';
import SimuladorRevolucoesHighlight from '@/components/home/SimuladorRevolucoesHighlight';

const Index = () => {
  useEffect(() => {
    // Iniciar a busca de posts do Substack e configurar atualizações automáticas
    setupAutoRefresh();
    
    // Exibir mensagem de boas-vindas
    toast.success("Bem-vindo ao Espelho Invertido", {
      description: "Explore diferentes perspectivas sobre temas contemporâneos"
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <ProjectsSection />
      <SimuladorRevolucoesHighlight />
      <ChroniclesSection />
      <CallToActionSection />
    </div>
  );
};

export default Index;
