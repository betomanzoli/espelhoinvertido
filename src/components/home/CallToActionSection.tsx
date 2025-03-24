
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-radial from-primary/5 to-transparent"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-primary/10 text-primary">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            Pronto para expandir suas perspectivas?
          </h2>
          
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
            Junte-se a uma comunidade de pessoas interessadas em explorar ideias, questionar pressupostos e desenvolver uma compreensão mais profunda do mundo contemporâneo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2">
              <Link to="/debate">
                Debate Crítico
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="https://espelhoinvertido.substack.com/" target="_blank" rel="noopener noreferrer">
                Acessar Substack
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
