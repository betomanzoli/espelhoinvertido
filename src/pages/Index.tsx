
import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import ChroniclesSection from '@/components/home/ChroniclesSection'; 
import CallToActionSection from '@/components/home/CallToActionSection';
import SimuladorRevolucoesHighlight from '@/components/home/SimuladorRevolucoesHighlight';
import DialecticChatbot from '@/components/dialectic/DialecticChatbot';
import SocialContentHub from '@/components/social/SocialContentHub';
import SubstackHighlight from '@/components/social/SubstackHighlight';
import SocialMediaButton from '@/components/social/SocialMediaButton';
import ChroniclesShowcase from '@/components/chronicles/ChroniclesShowcase';
import { setupAutoRefresh } from '@/services/substackService';
import { toast } from 'sonner';

const Index = () => {
  useEffect(() => {
    // Iniciar a busca de posts do Substack e configurar atualizações automáticas
    setupAutoRefresh();
    
    toast.success("Bem-vindo ao Espelho Invertido", {
      description: "Explore como o viés de confirmação molda nossa interpretação da realidade"
    });
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <ChroniclesShowcase />
      <ProjectsSection />
      <SimuladorRevolucoesHighlight />
      <ChroniclesSection />
      <SubstackHighlight />
      <SocialContentHub />
      <CallToActionSection />
      <DialecticChatbot />
      <SocialMediaButton />
    </div>
  );
};

export default Index;
