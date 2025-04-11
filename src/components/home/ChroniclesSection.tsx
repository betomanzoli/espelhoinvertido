
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChronicleCard from './ChronicleCard';
import RecommendationsSection from './RecommendationsSection';
import { convertSubstackPostsToChronicles, getFilteredChronicles, getRecommendations } from './ChroniclesData';
import { Chronicle } from '@/lib/debateData';
import { Skeleton } from '@/components/ui/skeleton';
import { useSubstackData } from '@/hooks/useSubstackData';
import { toast } from 'sonner';

const ChroniclesSection = () => {
  const [activeTab, setActiveTab] = useState('todas');
  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, Chronicle[]>>({});
  const { posts, loading, error, refreshData } = useSubstackData();
  
  // Converter posts para crônicas quando os dados do Substack chegarem
  useEffect(() => {
    if (posts.length > 0) {
      const allChronicles = convertSubstackPostsToChronicles(posts);
      setChronicles(allChronicles);
      
      // Carregar recomendações para cada categoria
      setRecommendations({
        'História': getRecommendations(allChronicles, 'História'),
        'Economia': getRecommendations(allChronicles, 'Economia'),
        'Ideologia': getRecommendations(allChronicles, 'Ideologia')
      });
    }
  }, [posts]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    if (posts.length > 0) {
      const allChronicles = convertSubstackPostsToChronicles(posts);
      const filtered = getFilteredChronicles(allChronicles, value);
      setChronicles(filtered);
    }
  };
  
  const handleRefresh = () => {
    refreshData();
    toast.info("Atualizando crônicas", {
      description: "Buscando as publicações mais recentes..."
    });
  };
  
  const renderSkeletons = () => {
    return Array(3).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex justify-end">
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    ));
  };
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-0">
            Crônicas Ideológicas
          </h2>
          
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
          Explore diferentes perspectivas sobre temas contemporâneos através de nossas crônicas
        </p>
        
        <Tabs defaultValue="todas" className="w-full max-w-4xl mx-auto" onValueChange={handleTabChange}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="história">História</TabsTrigger>
            <TabsTrigger value="economia">Economia</TabsTrigger>
            <TabsTrigger value="ideologia">Ideologia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todas" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? renderSkeletons() : (
              chronicles.length > 0 ? 
                chronicles.map((chronicle) => (
                  <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                ))
              :
                <div className="col-span-full text-center py-10">
                  <p>Nenhuma crônica encontrada.</p>
                </div>
            )}
          </TabsContent>
          
          <TabsContent value="história" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? renderSkeletons() : (
              chronicles.length > 0 ? 
                <>
                  {chronicles.map((chronicle) => (
                    <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                  ))}
                  
                  <RecommendationsSection 
                    category="História"
                    recommendations={recommendations['História'] || []}
                  />
                </>
              :
                <div className="col-span-full text-center py-10">
                  <p>Nenhuma crônica encontrada nesta categoria.</p>
                </div>
            )}
          </TabsContent>
          
          <TabsContent value="economia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? renderSkeletons() : (
              chronicles.length > 0 ? 
                <>
                  {chronicles.map((chronicle) => (
                    <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                  ))}
                  
                  <RecommendationsSection 
                    category="Economia"
                    recommendations={recommendations['Economia'] || []}
                  />
                </>
              :
                <div className="col-span-full text-center py-10">
                  <p>Nenhuma crônica encontrada nesta categoria.</p>
                </div>
            )}
          </TabsContent>
          
          <TabsContent value="ideologia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {loading ? renderSkeletons() : (
              chronicles.length > 0 ? 
                <>
                  {chronicles.map((chronicle) => (
                    <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                  ))}
                  
                  <RecommendationsSection 
                    category="Ideologia"
                    recommendations={recommendations['Ideologia'] || []}
                  />
                </>
              :
                <div className="col-span-full text-center py-10">
                  <p>Nenhuma crônica encontrada nesta categoria.</p>
                </div>
            )}
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
  );
};

export default ChroniclesSection;
