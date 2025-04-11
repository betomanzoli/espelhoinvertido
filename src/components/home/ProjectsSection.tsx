
import { useState, useEffect } from 'react';
import ProjectCard from './ProjectCard';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { MessageSquare, Swords, Globe, Building, PenTool, BarChart3, Search } from 'lucide-react';
import { fetchSubstackPosts, SubstackPost } from '@/services/substackService';
import { Skeleton } from '@/components/ui/skeleton';

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [substackPosts, setSubstackPosts] = useState<SubstackPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      try {
        const posts = await fetchSubstackPosts();
        setSubstackPosts(posts);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPosts();
  }, []);

  // Função para encontrar a URL do Substack para um projeto específico
  const findSubstackUrl = (projectTitle: string) => {
    const post = substackPosts.find(post => 
      post.title.toLowerCase().includes(projectTitle.toLowerCase()) ||
      projectTitle.toLowerCase().includes(post.title.toLowerCase())
    );
    return post?.url;
  };
  
  const projects = [
    {
      icon: <MessageSquare size={32} />,
      title: "Chat Rafael e Luísa",
      description: "Descubra como diferentes perspectivas interpretam os mesmos eventos históricos através de um diálogo enriquecedor.",
      link: "/debate",
      delay: 0,
      category: "discussion",
      available: true,
      imageUrl: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=80",
      iconBackground: "bg-gradient-to-r from-indigo-500 to-purple-500"
    },
    {
      icon: <Swords size={32} />,
      title: "Simulador de Revoluções",
      description: "Experimente as dinâmicas sociais antes e depois de transformações revolucionárias em um jogo de estratégia educativo.",
      link: "/simulador",
      delay: 0.1,
      category: "simulation",
      available: false,
      imageUrl: "https://images.unsplash.com/photo-1569335529517-d3c129a088a2?w=800&auto=format&fit=crop&q=80",
      iconBackground: "bg-gradient-to-r from-red-500 to-orange-500"
    },
    {
      icon: <Globe size={32} />,
      title: "Mapa de Conflitos Ideológicos",
      description: "Explore como narrativas históricas são construídas ao longo do tempo e como diferentes grupos interpretam os mesmos eventos.",
      link: "/mapa-conflitos",
      delay: 0.2,
      category: "exploration",
      available: false,
      imageUrl: "https://images.unsplash.com/photo-1589519160732-57fc498494f8?w=800&auto=format&fit=crop&q=80",
      iconBackground: "bg-gradient-to-r from-blue-500 to-cyan-400"
    },
    {
      icon: <Building size={32} />,
      title: "Museu Virtual das Revoluções",
      description: "Viaje no tempo através da realidade aumentada e visite locais históricos revolucionários em diferentes épocas.",
      link: "/museu",
      delay: 0.3,
      category: "exploration",
      available: false,
      imageUrl: "https://images.unsplash.com/photo-1626131760295-c9d242438edb?w=800&auto=format&fit=crop&q=80",
      iconBackground: "bg-gradient-to-r from-yellow-500 to-amber-500"
    },
    {
      icon: <PenTool size={32} />,
      title: "Escreva Sua Crônica",
      description: "Crie narrativas que exploram diferentes perspectivas ideológicas sobre o mesmo evento e compartilhe com outros pensadores críticos.",
      link: "/cronicas",
      delay: 0.4,
      category: "creation",
      available: false,
      imageUrl: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80",
      iconBackground: "bg-gradient-to-r from-green-500 to-emerald-500"
    },
    {
      icon: <Search size={32} />,
      title: "Análise de Discurso",
      description: "Ferramenta que utiliza processamento de linguagem natural para analisar textos políticos, econômicos e sociais.",
      link: "/analise-discurso",
      delay: 0.5,
      category: "analysis",
      available: false,
      imageUrl: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80",
      iconBackground: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
      icon: <BarChart3 size={32} />,
      title: "Economia em Ação",
      description: "Simule diferentes políticas econômicas e observe suas consequências em uma sociedade virtual baseada em dados reais.",
      link: "/economia",
      delay: 0.6,
      category: "simulation",
      available: false,
      imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&auto=format&fit=crop&q=80",
      iconBackground: "bg-gradient-to-r from-blue-600 to-green-500"
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
          <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8">
            <TabsTrigger value="all" onClick={() => setSelectedCategory('all')}>Todos</TabsTrigger>
            <TabsTrigger value="discussion" onClick={() => setSelectedCategory('discussion')}>Diálogo</TabsTrigger>
            <TabsTrigger value="simulation" onClick={() => setSelectedCategory('simulation')}>Simulação</TabsTrigger>
            <TabsTrigger value="exploration" onClick={() => setSelectedCategory('exploration')}>Exploração</TabsTrigger>
            <TabsTrigger value="creation" onClick={() => setSelectedCategory('creation')}>Criação</TabsTrigger>
            <TabsTrigger value="analysis" onClick={() => setSelectedCategory('analysis')}>Análise</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            // Esqueletos de carregamento
            Array.from({ length: 6 }).map((_, idx) => (
              <div key={idx} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md p-6">
                <Skeleton className="h-40 w-full mb-4" />
                <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                <Skeleton className="h-20 w-full mb-4" />
                <Skeleton className="h-10 w-full" />
              </div>
            ))
          ) : (
            filteredProjects.map((project) => (
              <ProjectCard 
                key={project.title}
                icon={project.icon}
                title={project.title}
                description={project.description}
                link={project.link}
                delay={project.delay}
                comingSoon={!project.available}
                imageUrl={project.imageUrl}
                substackUrl={findSubstackUrl(project.title)}
                iconBackground={project.iconBackground}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
