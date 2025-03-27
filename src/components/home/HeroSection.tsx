
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-500 opacity-90"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 text-white animate-slide-up">
            Espelho Invertido
          </h1>
          
          <p className="text-lg md:text-xl text-white mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Explore ideias que desafiam suas certezas. Descubra como diferentes perspectivas ideológicas 
            moldam nossa visão do mundo.
          </p>
          
          <Button asChild size="lg" className="gap-2 bg-white text-blue-900 hover:bg-gray-100 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link to="/debate">
              Comece a explorar
              <ArrowRight className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
