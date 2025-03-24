
import { Link } from 'react-router-dom';
import { characters } from '@/lib/debateData';
import CharacterProfile from '@/components/CharacterProfile';
import { ArrowRight, BookOpen, Brain, MessageSquare, Sparkles, Code, BarChart, PenTool, MapPin, FileSearch, LineChart } from 'lucide-react';
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
      
      {/* Projetos */}
      <section className="py-16 md:py-24 bg-light-gray dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Nossos Projetos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <ProjectCard 
              icon={<MessageSquare className="w-8 h-8" />}
              title="Debate Crítico"
              description="Dialogue com Rafael e Luísa, personagens que analisam temas contemporâneos através de diferentes perspectivas ideológicas."
              link="/debate"
              delay={0}
            />
            
            <ProjectCard 
              icon={<MapPin className="w-8 h-8" />}
              title="Mapa de Conflitos Ideológicos"
              description="Explore camadas de informações sobre conflitos históricos e atuais, analisando como narrativas são construídas."
              link="#"
              soon={true}
              delay={0.1}
            />
            
            <ProjectCard 
              icon={<LineChart className="w-8 h-8" />}
              title="Simulador de Revoluções"
              description="Jogo de estratégia onde você gerencia uma sociedade em crise, equilibrando demandas de classes sociais."
              link="#"
              soon={true}
              delay={0.2}
            />
            
            <ProjectCard 
              icon={<PenTool className="w-8 h-8" />}
              title="Escreva Sua Crônica"
              description="Plataforma colaborativa para criação de histórias que exploram contradições ideológicas."
              link="#"
              soon={true}
              delay={0.3}
            />
            
            <ProjectCard 
              icon={<FileSearch className="w-8 h-8" />}
              title="Análise de Discurso"
              description="Ferramenta que identifica vieses ideológicos, falácias e conexões históricas em textos e discursos."
              link="#"
              soon={true}
              delay={0.4}
            />
            
            <ProjectCard 
              icon={<BarChart className="w-8 h-8" />}
              title="Economia em Ação"
              description="Simulador de políticas econômicas e sociais para testar teorias em um país virtual."
              link="#"
              soon={true}
              delay={0.5}
            />
          </div>
        </div>
      </section>
      
      {/* Debate Crítico Highlight */}
      <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-block mb-6 text-primary">
                <MessageSquare className="w-10 h-10" />
              </div>
              
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
                Debate Crítico
              </h2>
              
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
                Uma plataforma de diálogo para explorar ideias complexas com Rafael e Luísa,
                dois personagens que analisam questões contemporâneas através de diferentes
                perspectivas ideológicas.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild className="gap-2">
                  <Link to="/debate">
                    Iniciar um Debate
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </Button>
                
                <Button asChild variant="outline" className="gap-2">
                  <Link to="/library">
                    <BookOpen className="w-5 h-5" />
                    Acessar Biblioteca
                  </Link>
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              {characters.map((character) => (
                <CharacterProfile 
                  key={character.id} 
                  character={character} 
                  size="lg" 
                  className="md:max-w-[220px]"
                />
              ))}
            </div>
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
    </div>
  );
};

interface ProjectCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  soon?: boolean;
  delay: number;
}

const ProjectCard = ({ icon, title, description, link, soon = false, delay }: ProjectCardProps) => (
  <div 
    className="glass-card p-6 animate-slide-up" 
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    
    <h3 className="text-xl font-medium mb-3">{title}</h3>
    
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      {description}
    </p>
    
    {soon ? (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700">
        Em breve
      </span>
    ) : (
      <Button asChild variant="link" className="p-0 h-auto font-medium">
        <Link to={link} className="flex items-center gap-1">
          Acessar <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    )}
  </div>
);

export default Index;
