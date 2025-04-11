
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapaExamples: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Estudo de Caso 1: O Conceito de Liberdade</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Explore como diferentes tradições ideológicas—do liberalismo ao marxismo, 
              do conservadorismo ao anarquismo—definem e interpretam o conceito de liberdade, 
              suas condições de realização e seus limites.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estudo de Caso 2: Interpretações da Democracia</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Análise comparativa de diferentes concepções de democracia, desde visões 
              procedimentais focadas em eleições até perspectivas substanciais centradas 
              na distribuição de poder econômico e social.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estudo de Caso 3: Crises Econômicas</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Visualização das divergentes interpretações sobre as origens e soluções 
              para crises econômicas, comparando teorias keynesianas, marxistas, 
              austríacas e outras tradições econômicas.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Estudo de Caso 4: Narrativas Revolucionárias</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              Comparação entre diferentes narrativas sobre eventos revolucionários históricos, 
              desde celebrações da emancipação popular até críticas sobre violência e autoritarismo.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MapaExamples;
