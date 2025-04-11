
import React from 'react';
import { Calendar, Landmark, HistoryIcon, Eye } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MuseuExhibits = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card className="overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
          <Calendar className="h-16 w-16 text-white" />
        </div>
        <CardHeader>
          <CardTitle>Revolução Francesa (1789-1799)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Caminhe pelas ruas de Paris durante os momentos decisivos da queda da Bastilha até o Terror jacobino, com reconstruções detalhadas dos principais locais e eventos.</p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-amber-500 to-amber-700 flex items-center justify-center">
          <Landmark className="h-16 w-16 text-white" />
        </div>
        <CardHeader>
          <CardTitle>Comuna de Paris (1871)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Explore os 72 dias da primeira experiência de governo operário da história, com acesso a documentos originais, decretos e relatos dos communards.</p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-orange-500 to-orange-700 flex items-center justify-center">
          <HistoryIcon className="h-16 w-16 text-white" />
        </div>
        <CardHeader>
          <CardTitle>Revolução Russa (1917)</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Assista aos acontecimentos de Outubro em Petrogrado, dos debates nos sovietes à tomada do Palácio de Inverno, com acesso a discursos, manifestos e documentos do período.</p>
        </CardContent>
      </Card>
      
      <Card className="overflow-hidden">
        <div className="h-40 bg-gradient-to-r from-green-500 to-green-700 flex items-center justify-center">
          <Eye className="h-16 w-16 text-white" />
        </div>
        <CardHeader>
          <CardTitle>Revoluções Contemporâneas</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conheça movimentos revolucionários mais recentes da América Latina, África e Ásia, com depoimentos de participantes e análise de suas conquistas e limitações.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MuseuExhibits;
