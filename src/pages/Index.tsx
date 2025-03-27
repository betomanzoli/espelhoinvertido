
import HeroSection from '@/components/home/HeroSection';
import ProjectsSection from '@/components/home/ProjectsSection';
import CallToActionSection from '@/components/home/CallToActionSection';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Exemplo de crônicas (em um projeto real, viria de uma API)
const chronicles = [
  {
    id: 1,
    title: "Duas Bibliotecas, Uma História",
    excerpt: "Como diferentes narrativas históricas são construídas a partir das mesmas fontes primárias.",
    category: "História",
    image: "https://via.placeholder.com/300x180?text=História",
    link: "/library/chronicle/1",
  },
  {
    id: 2,
    title: "O Espectro Que Recusamos Ver",
    excerpt: "Uma análise contemporânea do primeiro parágrafo do Manifesto Comunista.",
    category: "Ideologia",
    image: "https://via.placeholder.com/300x180?text=Ideologia",
    link: "/library/chronicle/2",
  },
  {
    id: 3,
    title: "Capitalismo de Plataforma",
    excerpt: "Como as novas relações de trabalho digital mascaram formas tradicionais de exploração.",
    category: "Economia",
    image: "https://via.placeholder.com/300x180?text=Economia",
    link: "/library/chronicle/3",
  },
];

// Sistema de recomendação simulado
const getRecommendations = (category) => {
  const recommendations = {
    "História": [1, 3],
    "Economia": [2, 3],
    "Ideologia": [1, 2],
  };
  
  return chronicles.filter(chronicle => 
    recommendations[category]?.includes(chronicle.id)
  ).slice(0, 2);
};

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <HeroSection />
      
      <ProjectsSection />
      
      {/* Seção de Crônicas */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Crônicas Ideológicas
          </h2>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Explore diferentes perspectivas sobre temas contemporâneos através de nossas crônicas
          </p>
          
          <Tabs defaultValue="todas" className="w-full max-w-4xl mx-auto">
            <TabsList className="grid grid-cols-4 mb-8">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="historia">História</TabsTrigger>
              <TabsTrigger value="economia">Economia</TabsTrigger>
              <TabsTrigger value="ideologia">Ideologia</TabsTrigger>
            </TabsList>
            
            <TabsContent value="todas" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chronicles.map((chronicle) => (
                <Card key={chronicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={chronicle.image} 
                    alt={chronicle.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
                      {chronicle.category}
                    </div>
                    <CardTitle>{chronicle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{chronicle.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="gap-1">
                      <Link to={chronicle.link}>
                        Ler mais <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="historia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chronicles.filter(c => c.category === "História").map((chronicle) => (
                <Card key={chronicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={chronicle.image} 
                    alt={chronicle.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
                      {chronicle.category}
                    </div>
                    <CardTitle>{chronicle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{chronicle.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="gap-1">
                      <Link to={chronicle.link}>
                        Ler mais <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Recomendações */}
              <div className="md:col-span-3 mt-6">
                <h3 className="text-xl font-medium mb-4">Recomendações relacionadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getRecommendations("História").map((chronicle) => (
                    <Card key={chronicle.id} className="flex overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={chronicle.image} 
                        alt={chronicle.title}
                        className="w-24 h-full object-cover"
                      />
                      <div className="flex-1">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">{chronicle.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="p-3 pt-0">
                          <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                            <Link to={chronicle.link}>
                              Ler <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="economia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chronicles.filter(c => c.category === "Economia").map((chronicle) => (
                <Card key={chronicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={chronicle.image} 
                    alt={chronicle.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
                      {chronicle.category}
                    </div>
                    <CardTitle>{chronicle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{chronicle.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="gap-1">
                      <Link to={chronicle.link}>
                        Ler mais <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Recomendações */}
              <div className="md:col-span-3 mt-6">
                <h3 className="text-xl font-medium mb-4">Recomendações relacionadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getRecommendations("Economia").map((chronicle) => (
                    <Card key={chronicle.id} className="flex overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={chronicle.image} 
                        alt={chronicle.title}
                        className="w-24 h-full object-cover"
                      />
                      <div className="flex-1">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">{chronicle.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="p-3 pt-0">
                          <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                            <Link to={chronicle.link}>
                              Ler <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="ideologia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chronicles.filter(c => c.category === "Ideologia").map((chronicle) => (
                <Card key={chronicle.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <img 
                    src={chronicle.image} 
                    alt={chronicle.title}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
                      {chronicle.category}
                    </div>
                    <CardTitle>{chronicle.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{chronicle.excerpt}</CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="ghost" className="gap-1">
                      <Link to={chronicle.link}>
                        Ler mais <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
              
              {/* Recomendações */}
              <div className="md:col-span-3 mt-6">
                <h3 className="text-xl font-medium mb-4">Recomendações relacionadas</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {getRecommendations("Ideologia").map((chronicle) => (
                    <Card key={chronicle.id} className="flex overflow-hidden hover:shadow-lg transition-shadow">
                      <img 
                        src={chronicle.image} 
                        alt={chronicle.title}
                        className="w-24 h-full object-cover"
                      />
                      <div className="flex-1">
                        <CardHeader className="p-3">
                          <CardTitle className="text-sm">{chronicle.title}</CardTitle>
                        </CardHeader>
                        <CardFooter className="p-3 pt-0">
                          <Button asChild variant="ghost" size="sm" className="h-7 px-2">
                            <Link to={chronicle.link}>
                              Ler <ArrowRight className="h-3 w-3 ml-1" />
                            </Link>
                          </Button>
                        </CardFooter>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="text-center mt-10">
            <Button asChild>
              <Link to="/library" className="gap-2">
                Ver todas as crônicas
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      <CallToActionSection />
    </div>
  );
};

export default Index;
