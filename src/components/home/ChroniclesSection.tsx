import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChronicleCard from './ChronicleCard';
import RecommendationsSection from './RecommendationsSection';
import ChroniclesHeader from './ChroniclesHeader';
import ChroniclesSearch from './ChroniclesSearch';
import { convertSubstackPostsToChronicles, getFilteredChronicles, getRecommendations, searchChronicles } from './ChroniclesData';
import { Chronicle } from '@/lib/debateData';
import { Skeleton } from '@/components/ui/skeleton';
import { useSubstackData } from '@/hooks/useSubstackData';
import { toast } from 'sonner';

const ChroniclesSection = () => {
  const [activeTab, setActiveTab] = useState('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, Chronicle[]>>({});
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  const { posts, loading, error, refreshData } = useSubstackData();
  
  // Monitorar status de conexão
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  // Converter posts para crônicas quando os dados chegarem
  useEffect(() => {
    if (posts.length > 0) {
      const allChronicles = convertSubstackPostsToChronicles(posts);
      
      // Aplicar filtros
      let filtered = allChronicles;
      
      if (searchQuery) {
        filtered = searchChronicles(filtered, searchQuery);
      }
      
      if (activeTab !== 'todas') {
        filtered = getFilteredChronicles(filtered, activeTab);
      }
      
      setChronicles(filtered);
      
      // Carregar recomendações para cada categoria
      setRecommendations({
        'História': getRecommendations(allChronicles, 'História'),
        'Economia': getRecommendations(allChronicles, 'Economia'),
        'Ideologia': getRecommendations(allChronicles, 'Ideologia')
      });
    }
  }, [posts, searchQuery, activeTab]);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  const handleRefresh = () => {
    refreshData();
    toast.info("Atualizando crônicas", {
      description: "Buscando as publicações mais recentes do Substack..."
    });
  };
  
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, index) => (
      <div key={index} className="flex flex-col space-y-3">
        <Skeleton className="h-48 w-full rounded-lg" />
        <Skeleton className="h-6 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-8 w-16" />
        </div>
      </div>
    ));
  };
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <ChroniclesHeader 
          isOnline={isOnline}
          loading={loading}
          onRefresh={handleRefresh}
        />
        
        <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl">
          Explore diferentes perspectivas sobre temas contemporâneos através das nossas crônicas do Substack
        </p>
        
        <ChroniclesSearch 
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        
        <Tabs defaultValue="todas" className="w-full max-w-6xl mx-auto" onValueChange={handleTabChange}>
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-5">
              <TabsTrigger value="todas">Todas</TabsTrigger>
              <TabsTrigger value="História">História</TabsTrigger>
              <TabsTrigger value="Economia">Economia</TabsTrigger>
              <TabsTrigger value="Ideologia">Ideologia</TabsTrigger>
              <TabsTrigger value="Substack">Recentes</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="todas" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? renderSkeletons() : (
                chronicles.length > 0 ? 
                  chronicles.map((chronicle) => (
                    <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                  ))
                :
                  <div className="col-span-full text-center py-16">
                    <p className="text-gray-500 dark:text-gray-400 mb-2">
                      {searchQuery ? 'Nenhuma crônica encontrada para esta busca' : 'Nenhuma crônica encontrada'}
                    </p>
                    {searchQuery && (
                      <Button variant="outline" onClick={() => setSearchQuery('')}>
                        Limpar busca
                      </Button>
                    )}
                  </div>
              )}
            </div>
          </TabsContent>
          
          {['História', 'Economia', 'Ideologia', 'Substack'].map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? renderSkeletons() : (
                  chronicles.length > 0 ? 
                    <>
                      {chronicles.map((chronicle) => (
                        <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                      ))}
                      
                      {category !== 'Substack' && recommendations[category] && (
                        <div className="col-span-full mt-8">
                          <RecommendationsSection 
                            category={category}
                            recommendations={recommendations[category]}
                          />
                        </div>
                      )}
                    </>
                  :
                    <div className="col-span-full text-center py-16">
                      <p className="text-gray-500 dark:text-gray-400 mb-2">
                        Nenhuma crônica encontrada nesta categoria
                      </p>
                      {searchQuery && (
                        <Button variant="outline" onClick={() => setSearchQuery('')}>
                          Limpar busca
                        </Button>
                      )}
                    </div>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
        
        <div className="text-center mt-12">
          <Button asChild size="lg">
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
