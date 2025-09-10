
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
import ChronicleGeneratorTest from '@/components/chronicle/ChronicleGeneratorTest';

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
      
      {/* Chronicle Generator Test Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-white via-espelhoinvertido-accent/5 to-espelhoinvertido-background/20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-espelhoinvertido-primary mb-4">
              🪞 Gerador de Crônicas IA
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experimente nosso sistema de geração automática de crônicas dialéticas. 
              Insira um tema e veja como a IA cria análises críticas sobre vieses ideológicos.
            </p>
          </div>
          <ChronicleGeneratorTest />
        </div>
      </section>
      
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
