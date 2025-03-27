
import ProjectCard from './ProjectCard';

const ProjectsSection = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
          Nossos Aplicativos
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ProjectCard 
            icon="💬"
            title="Chat Rafael e Luísa"
            description="Descubra como diferentes perspectivas interpretam os mesmos eventos históricos através de um diálogo enriquecedor."
            link="/debate"
            delay={0}
          />
          
          <ProjectCard 
            icon="⚔️"
            title="Simulador de Revoluções"
            description="Experimente as dinâmicas sociais antes e depois de transformações revolucionárias em um jogo de estratégia educativo."
            link="/simulador"
            delay={0.1}
          />
          
          <ProjectCard 
            icon="🌍"
            title="Mapa de Conflitos Ideológicos"
            description="Explore como narrativas históricas são construídas ao longo do tempo e como diferentes grupos interpretam os mesmos eventos."
            link="/mapa-conflitos"
            delay={0.2}
          />
          
          <ProjectCard 
            icon="🏛️"
            title="Museu Virtual das Revoluções"
            description="Viaje no tempo através da realidade aumentada e visite locais históricos revolucionários em diferentes épocas."
            link="/museu"
            delay={0.3}
          />
          
          <ProjectCard 
            icon="✍️"
            title="Escreva Sua Crônica"
            description="Crie narrativas que exploram diferentes perspectivas ideológicas sobre o mesmo evento e compartilhe com outros pensadores críticos."
            link="/cronicas"
            delay={0.4}
          />
          
          <ProjectCard 
            icon="📊"
            title="Economia em Ação"
            description="Simule diferentes políticas econômicas e observe suas consequências em uma sociedade virtual baseada em dados reais."
            link="/economia"
            delay={0.5}
          />
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
