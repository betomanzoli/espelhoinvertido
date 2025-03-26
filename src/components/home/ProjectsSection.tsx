
import { 
  MessageSquare, 
  MapPin, 
  LineChart, 
  PenTool, 
  FileSearch, 
  BarChart 
} from 'lucide-react';
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  return (
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
            description="Uma plataforma cartográfica que mapeia territórios ideológicos ao longo do tempo, mostrando como diferentes perspectivas interpretam os mesmos eventos históricos."
            link="/mapa-conflitos"
            delay={0.1}
          />
          
          <ProjectCard 
            icon={<LineChart className="w-8 h-8" />}
            title="Simulador de Revoluções"
            description="Um jogo de estratégia que simula as complexas dinâmicas sociais, econômicas e políticas que precedem e acompanham transformações revolucionárias."
            link="/simulador"
            delay={0.2}
          />
          
          <ProjectCard 
            icon={<PenTool className="w-8 h-8" />}
            title="Escreva Sua Crônica"
            description="Plataforma colaborativa para criação de histórias que exploram contradições ideológicas através de múltiplas perspectivas narrativas."
            link="/cronicas"
            delay={0.3}
          />
          
          <ProjectCard 
            icon={<FileSearch className="w-8 h-8" />}
            title="Análise de Discurso"
            description="Ferramenta que identifica vieses ideológicos, falácias e conexões históricas em textos e discursos, revelando pressupostos implícitos."
            link="/analise-discurso"
            delay={0.4}
          />
          
          <ProjectCard 
            icon={<BarChart className="w-8 h-8" />}
            title="Economia em Ação"
            description="Simulador de políticas econômicas que permite testar diferentes abordagens e visualizar suas consequências em uma sociedade virtual baseada em dados reais."
            link="/economia"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
