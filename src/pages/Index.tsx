
import { Link } from 'react-router-dom';
import { characters } from '@/lib/debateData';
import CharacterProfile from '@/components/CharacterProfile';
import { ArrowRight, BookOpen, Brain, MessageSquare, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 md:pt-32 pb-16 md:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-dot-pattern opacity-5 bg-[length:20px_20px]"></div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 animate-slide-up">
              <span className="title-gradient">Debate Crítico</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Uma plataforma de diálogo para explorar ideias complexas e desenvolver pensamento crítico sobre temas contemporâneos.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Button asChild size="lg" className="gap-2">
                <Link to="/debate">
                  <MessageSquare className="w-5 h-5" />
                  Iniciar um Debate
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="gap-2">
                <Link to="/library">
                  <BookOpen className="w-5 h-5" />
                  Explorar Biblioteca
                </Link>
              </Button>
            </div>
          </div>
          
          {/* Characters */}
          <div className="flex flex-col md:flex-row gap-6 justify-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {characters.map((character) => (
              <CharacterProfile 
                key={character.id} 
                character={character} 
                size="lg" 
                className="md:w-1/3 max-w-xs mx-auto"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-16 md:py-24 bg-light-gray dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Como funciona
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="w-8 h-8" />}
              title="Debates Guiados"
              description="Explore temas complexos em conversas com Rafael e Luísa, que trazem contexto histórico e perspectivas contemporâneas para enriquecer sua compreensão."
              delay={0}
            />
            
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8" />}
              title="Biblioteca Contextual"
              description="Acesse definições de conceitos importantes durante os debates. Ao mencionar termos específicos, receba explicações claras e fontes para aprofundamento."
              delay={0.2}
            />
            
            <FeatureCard 
              icon={<Brain className="w-8 h-8" />}
              title="Desafios Semanais"
              description="Participe de desafios que incentivam a análise de eventos e ideias sob diferentes perspectivas, desenvolvendo habilidades de argumentação e pensamento crítico."
              delay={0.4}
            />
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
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
            
            <Button asChild size="lg" className="gap-2">
              <Link to="/debate">
                Comece Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => (
  <div 
    className="glass-card p-6 animate-slide-up" 
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    
    <h3 className="text-xl font-medium mb-3">{title}</h3>
    
    <p className="text-gray-600 dark:text-gray-300">
      {description}
    </p>
  </div>
);

export default Index;
