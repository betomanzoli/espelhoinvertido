
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChronicleCard from './ChronicleCard';
import RecommendationsSection from './RecommendationsSection';
import { chronicles, getRecommendations, getFilteredChronicles } from './ChroniclesData';

const ChroniclesSection = () => {
  const [activeTab, setActiveTab] = useState('todas');
  
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
          Crônicas Ideológicas
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
          Explore diferentes perspectivas sobre temas contemporâneos através de nossas crônicas
        </p>
        
        <Tabs defaultValue="todas" className="w-full max-w-4xl mx-auto" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="todas">Todas</TabsTrigger>
            <TabsTrigger value="historia">História</TabsTrigger>
            <TabsTrigger value="economia">Economia</TabsTrigger>
            <TabsTrigger value="ideologia">Ideologia</TabsTrigger>
          </TabsList>
          
          <TabsContent value="todas" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chronicles.map((chronicle) => (
              <ChronicleCard key={chronicle.id} chronicle={chronicle} />
            ))}
          </TabsContent>
          
          <TabsContent value="historia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getFilteredChronicles('História').map((chronicle) => (
              <ChronicleCard key={chronicle.id} chronicle={chronicle} />
            ))}
            
            <RecommendationsSection 
              category="História"
              recommendations={getRecommendations('História')}
            />
          </TabsContent>
          
          <TabsContent value="economia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getFilteredChronicles('Economia').map((chronicle) => (
              <ChronicleCard key={chronicle.id} chronicle={chronicle} />
            ))}
            
            <RecommendationsSection 
              category="Economia"
              recommendations={getRecommendations('Economia')}
            />
          </TabsContent>
          
          <TabsContent value="ideologia" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getFilteredChronicles('Ideologia').map((chronicle) => (
              <ChronicleCard key={chronicle.id} chronicle={chronicle} />
            ))}
            
            <RecommendationsSection 
              category="Ideologia"
              recommendations={getRecommendations('Ideologia')}
            />
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
