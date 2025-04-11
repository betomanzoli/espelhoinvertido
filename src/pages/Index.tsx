
import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import DebateCriticoHighlight from '@/components/home/DebateCriticoHighlight';
import SimuladorRevolucoesHighlight from '@/components/home/SimuladorRevolucoesHighlight';
import ChroniclesSection from '@/components/home/ChroniclesSection';
import CallToActionSection from '@/components/home/CallToActionSection';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      <ProjectsSection />
      <ChroniclesSection />
      <CallToActionSection />
    </div>
  );
};

export default Index;
