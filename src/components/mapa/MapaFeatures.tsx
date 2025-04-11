
import React from "react";
import { BookOpen, Network, BookMarked, Workflow } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface MapaFeaturesProps {
  features: string[];
}

const MapaFeatures: React.FC<MapaFeaturesProps> = ({ features }) => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20">
              <CardTitle className="flex items-center gap-2 text-base">
                {index % 3 === 0 ? <Network className="h-4 w-4 text-primary" /> : 
                 index % 3 === 1 ? <BookMarked className="h-4 w-4 text-primary" /> : 
                 <Workflow className="h-4 w-4 text-primary" />}
                Funcionalidade
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <p>{feature}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
          Biblioteca de Conceitos
        </h3>
        <p>
          Acesso a uma extensa biblioteca de conceitos-chave e suas interpretações 
          ao longo de diferentes tradições de pensamento político e filosófico, 
          com explicações contextualizadas e referências bibliográficas.
        </p>
      </div>
    </div>
  );
};

export default MapaFeatures;
