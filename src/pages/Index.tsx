
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
import { SEOHead } from '@/components/seo/SEOHead';
import { setupAutoRefresh } from '@/services/substackService';
import { useReaderJourney } from '@/hooks/useReaderJourney';
import { toast } from 'sonner';

const Index = () => {
  const { completeStep } = useReaderJourney();

  useEffect(() => {
    setupAutoRefresh();
    
    // Completar step de visita à home
    completeStep('visit-home');
    
    toast.success("Bem-vindo ao Espelho Invertido", {
      description: "Explore como o viés de confirmação molda nossa interpretação da realidade"
    });
  }, [completeStep]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <SEOHead 
        title="Início"
        description="Explore como o viés de confirmação molda nossa interpretação da realidade através de crônicas provocativas sobre contradições ideológicas."
        keywords="viés de confirmação, narrativas contrastantes, reflexão crítica, crônicas, Marx, análise política"
      />
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
