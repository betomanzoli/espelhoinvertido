
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CallToActionSection = () => {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden bg-gradient-to-r from-blue-900 to-teal-500">
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center w-16 h-16 mx-auto rounded-full bg-white/20 text-white">
              <Sparkles className="w-8 h-8" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
            Pronto para expandir suas perspectivas?
          </h2>
          
          <p className="text-lg text-white mb-8">
            Junte-se a uma comunidade de pessoas interessadas em explorar ideias, questionar pressupostos e 
            desenvolver uma compreensão mais profunda do mundo contemporâneo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 bg-white text-blue-900 hover:bg-gray-100">
              <Link to="/debate">
                Debate Crítico
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2 border-white text-white hover:bg-white/10">
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
