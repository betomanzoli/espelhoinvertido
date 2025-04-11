
import React from 'react';
import { Landmark, PanelsTopLeft, History, Video } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MuseuOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Landmark className="text-primary h-5 w-5" />
            Arquitetura Virtual
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Explore ambientes reconstruídos com precisão histórica, desde as ruas de Paris durante a Comuna até Petrogrado em 1917.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PanelsTopLeft className="text-primary h-5 w-5" />
            Acervo Digital
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Acesse documentos históricos, objetos e gravações da época, digitalizados em alta resolução e contextualizados.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="text-primary h-5 w-5" />
            Linha do Tempo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Navegue por uma linha do tempo interativa que conecta diferentes momentos revolucionários e seus desdobramentos globais.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Video className="text-primary h-5 w-5" />
            Reconstruções Imersivas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Vivencie momentos históricos através de reconstruções visuais e sonoras que recriam a atmosfera dos eventos revolucionários.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default MuseuOverview;
