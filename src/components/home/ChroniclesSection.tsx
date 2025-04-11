
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChronicleCard from './ChronicleCard';
import RecommendationsSection from './RecommendationsSection';
import { getFilteredChronicles, getRecommendations } from './ChroniclesData';
import { Chronicle } from '@/lib/debateData';
import { Skeleton } from '@/components/ui/skeleton';

const ChroniclesSection = () => {
  const [activeTab, setActiveTab] = useState('todas');
  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [recommendations, setRecommendations] = useState<Record<string, Chronicle[]>>({});
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadChronicles = async () => {
      setLoading(true);
      try {
        const allChronicles = await getFilteredChronicles('todas');
        setChronicles(allChronicles);
        
        // Carregar recomendações para cada categoria
        const historiaRecs = await getRecommendations('História');
        const economiaRecs = await getRecommendations('Economia');
        const ideologiaRecs = await getRecommendations('Ideologia');
        
        setRecommendations({
          'História': historiaRecs,
          'Economia': economiaRecs,
          'Ideologia': ideologiaRecs
        });
      } catch (error) {
        console.error('Erro ao carregar crônicas:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadChronicles();
  }, []);
  
  const handleTabChange = async (value: string) => {
    setActiveTab(value);
    setLoading(true);
    
    try {
      const filtered = await getFilteredChronicles(value === 'todas' ? 'todas' : value);
      setChronicles(filtered);
    } catch (error) {
      console.error('Erro ao filtrar crônicas:', error);
    } finally {
      setLoading(false);
    }
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
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Crônicas Ideológicas
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
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
