
import React from "react";
import { MapPin, Network, Compass, Layers } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapaOverview: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="text-primary h-5 w-5" />
              Cartografia Ideológica
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Representação visual das principais correntes ideológicas e seus conceitos-chave, 
              contextualizando debates contemporâneos em suas raízes históricas.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Network className="text-primary h-5 w-5" />
              Conexões Conceituais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Explore as interconexões entre diferentes tradições de pensamento e 
              veja como conceitos evolueam ao longo do tempo.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Compass className="text-primary h-5 w-5" />
              Navegação Contextual
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Navegue pelos territórios ideológicos com ferramentas que permitem 
              comparar diferentes interpretações dos mesmos eventos históricos.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers className="text-primary h-5 w-5" />
              Camadas de Análise
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Alterne entre diferentes camadas analíticas como economia, política, 
              cultura e filosofia para compreender as múltiplas dimensões dos debates ideológicos.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapaOverview;
