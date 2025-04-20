
import { LineChart, AreaChart, Settings2, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EconomiaOverview = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="text-primary h-5 w-5" />
            Simulação Econômica
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Experimente diferentes abordagens econômicas e observe seus efeitos na distribuição de riqueza, bem-estar social e desenvolvimento tecnológico.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AreaChart className="text-primary h-5 w-5" />
            Modelagem Multidimensional
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Os modelos consideram fatores sociais, ambientais e políticos além dos puramente econômicos, oferecendo uma visão mais completa.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="text-primary h-5 w-5" />
            Personalização de Políticas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Defina taxas de impostos, regulações trabalhistas, políticas monetárias e outros parâmetros para criar sua própria abordagem econômica.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="text-primary h-5 w-5" />
            Material Educativo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p>Conecte os resultados de suas simulações com teorias econômicas clássicas e contemporâneas através de materiais explicativos.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomiaOverview;
