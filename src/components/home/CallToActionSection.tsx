
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Sparkles, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

const CallToActionSection = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background gradient com efeitos */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-teal-500">
        <div className="absolute inset-0 bg-dot-pattern bg-[length:20px_20px] opacity-20"></div>
        
        {/* Círculos de luz animados */}
        <div className="absolute top-1/3 left-1/3 w-64 h-64 rounded-full bg-white/10 blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 rounded-full bg-white/5 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        {/* Estrelas flutuantes */}
        <div className="hidden md:block absolute top-10 left-1/4 animate-float">
          <Star className="text-yellow-200 w-6 h-6 opacity-60" />
        </div>
        <div className="hidden md:block absolute top-20 right-1/3 animate-float" style={{ animationDelay: '1s' }}>
          <Star className="text-yellow-200 w-4 h-4 opacity-40" />
        </div>
        <div className="hidden md:block absolute bottom-20 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <Star className="text-yellow-200 w-5 h-5 opacity-50" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block mb-6 transform transition-transform duration-300" 
               onMouseEnter={() => setIsHovering(true)}
               onMouseLeave={() => setIsHovering(false)}>
            <div className={`flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-white/20 text-white ${isHovering ? 'scale-110' : ''} transition-transform duration-300`}>
              <Sparkles className={`w-10 h-10 ${isHovering ? 'text-yellow-200' : 'text-white'} transition-colors duration-300`} />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-white">
            Pronto para expandir suas perspectivas?
          </h2>
          
          <p className="text-lg text-white/90 mb-8">
            Junte-se a uma comunidade de pessoas interessadas em explorar ideias, questionar pressupostos e 
            desenvolver uma compreensão mais profunda do mundo contemporâneo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="gap-2 bg-white text-blue-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300">
              <Link to="/debate">
                Debate Crítico
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2 border-white text-white hover:bg-white/10 hover:scale-105 transition-all duration-300">
              <a href="https://espelhoinvertido.substack.com/" target="_blank" rel="noopener noreferrer">
                Acessar Substack
                <ArrowRight className="w-5 h-5" />
              </a>
            </Button>
          </div>
          
          {/* Estatísticas */}
          <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-2xl font-bold text-white">50+</h4>
              <p className="text-white/80">Crônicas publicadas</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-2xl font-bold text-white">2</h4>
              <p className="text-white/80">Especialistas interativos</p>
            </div>
            
            <div className="bg-white/10 backdrop-blur rounded-lg p-4 hover:bg-white/20 transition-colors duration-300">
              <h4 className="text-2xl font-bold text-white">6</h4>
              <p className="text-white/80">Ferramentas de análise</p>
            </div>
          </div>
          
          {/* Badge de confiança */}
          <div className="mt-10 inline-block">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur rounded-full px-4 py-2 text-white/90 text-sm">
              <BookOpen className="w-4 h-4 text-yellow-200" />
              Conteúdo baseado em fontes históricas verificadas
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
