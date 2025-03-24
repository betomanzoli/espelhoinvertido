
import { Link } from 'react-router-dom';
import { MessageSquare, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  return (
    <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern opacity-5 bg-[length:20px_20px]"></div>
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-slide-up">
            <span className="title-gradient">Espelho Invertido</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Uma plataforma multimídia para explorar ideias complexas, desenvolver pensamento crítico e 
            analisar contradições ideológicas do mundo contemporâneo.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button asChild size="lg" className="gap-2">
              <Link to="/debate">
                <MessageSquare className="w-5 h-5" />
                Debate Crítico
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="gap-2">
              <a href="https://espelhoinvertido.substack.com/" target="_blank" rel="noopener noreferrer">
                <BookOpen className="w-5 h-5" />
                Substack
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
