
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Beaker, Network, Search } from 'lucide-react';
import ConceptMap from '@/components/concept/ConceptMap';
import BiasAnalyzer from '@/components/bias/BiasAnalyzer';

const Laboratorio = () => {
  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <Beaker className="h-8 w-8" />
                Laboratório Dialético
              </CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                Ferramentas interativas para explorar conceitos marxistas e suas manifestações contemporâneas. 
                Experimente diferentes lentes ideológicas e descubra conexões ocultas.
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Tabs defaultValue="map" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="map" className="gap-2">
                <Network className="h-4 w-4" />
                Mapa Conceitual
              </TabsTrigger>
              <TabsTrigger value="analyzer" className="gap-2">
                <Search className="h-4 w-4" />
                Detector de Viés
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="map">
              <ConceptMap />
            </TabsContent>
            
            <TabsContent value="analyzer">
              <BiasAnalyzer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Laboratorio;
