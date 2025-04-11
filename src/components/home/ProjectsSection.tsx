
import { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, Swords, Globe, Building, PenTool, BarChart3 } from 'lucide-react';

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const projects = [
    {
      icon: <MessageSquare size={32} />,
      title: "Chat Rafael e Luísa",
      description: "Descubra como diferentes perspectivas interpretam os mesmos eventos históricos através de um diálogo enriquecedor.",
      link: "/debate",
      delay: 0,
      category: "discussion",
      available: true
    },
    {
      icon: <Swords size={32} />,
      title: "Simulador de Revoluções",
      description: "Experimente as dinâmicas sociais antes e depois de transformações revolucionárias em um jogo de estratégia educativo.",
      link: "/simulador",
      delay: 0.1,
      category: "simulation",
      available: false
    },
    {
      icon: <Globe size={32} />,
      title: "Mapa de Conflitos Ideológicos",
      description: "Explore como narrativas históricas são construídas ao longo do tempo e como diferentes grupos interpretam os mesmos eventos.",
      link: "/mapa-conflitos",
      delay: 0.2,
      category: "exploration",
      available: false
    },
    {
      icon: <Building size={32} />,
      title: "Museu Virtual das Revoluções",
      description: "Viaje no tempo através da realidade aumentada e visite locais históricos revolucionários em diferentes épocas.",
      link: "/museu",
      delay: 0.3,
      category: "exploration",
      available: false
    },
    {
      icon: <PenTool size={32} />,
      title: "Escreva Sua Crônica",
      description: "Crie narrativas que exploram diferentes perspectivas ideológicas sobre o mesmo evento e compartilhe com outros pensadores críticos.",
      link: "/cronicas",
      delay: 0.4,
      category: "creation",
      available: false
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Economia em Ação",
      description: "Simule diferentes políticas econômicas e observe suas consequências em uma sociedade virtual baseada em dados reais.",
      link: "/economia",
      delay: 0.5,
      category: "simulation",
      available: false
    },
  ];
  
  const filteredProjects = selectedCategory === 'all' 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  return (
    <section className="py-16 md:py-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-6">
          Nossos Aplicativos
        </h2>
        
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10 max-w-2xl mx-auto">
          Explore nossa coleção de ferramentas interativas projetadas para expandir sua compreensão 
          sobre diferentes perspectivas ideológicas e contextos históricos.
        </p>
        
        <Tabs defaultValue="all" className="w-full max-w-4xl mx-auto mb-10">
          <TabsList className="grid grid-cols-5 mb-8">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>Todos</TabsTrigger>
            <TabsTrigger value="discussion" onClick={() => setSelectedCategory('discussion')}>Diálogo</TabsTrigger>
            <TabsTrigger value="simulation" onClick={() => setSelectedCategory('simulation')}>Simulação</TabsTrigger>
            <TabsTrigger value="exploration" onClick={() => setSelectedCategory('exploration')}>Exploração</TabsTrigger>
            <TabsTrigger value="creation" onClick={() => setSelectedCategory('creation')}>Criação</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <ProjectCard 
              key={project.title}
              icon={project.icon}
              title={project.title}
              description={project.description}
              link={project.link}
              delay={project.delay}
              comingSoon={!project.available}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
