
import { useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import SimuladorRevolucoesHighlight from '@/components/home/SimuladorRevolucoesHighlight';
import DialecticChatbot from '@/components/dialectic/DialecticChatbot';
import SocialMediaButton from '@/components/social/SocialMediaButton';
import ChroniclesTeaser from '@/components/chronicles/ChroniclesTeaser';
import SocialHubTeaser from '@/components/social/SocialHubTeaser';
import SubstackHighlight from '@/components/social/SubstackHighlight';
import SubscriptionPopup from '@/components/ui/subscription-popup';
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
      <ChroniclesTeaser />
      <ProjectsSection />
      <SimuladorRevolucoesHighlight />
      <SubstackHighlight />
      <SocialHubTeaser />
      <CallToActionSection />
      <DialecticChatbot />
      <SocialMediaButton />
      <SubscriptionPopup delay={45000} />
    </div>
  );
};

export default Index;
