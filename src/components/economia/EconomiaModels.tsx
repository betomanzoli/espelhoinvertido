
import { BarChart3, PieChart, Building2, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EconomiaModels = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center">
            <BarChart3 className="h-10 w-10 text-white" />
          </div>
          <CardHeader>
            <CardTitle>Modelo Liberal</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Baixa intervenção estatal, mercados desregulados, impostos reduzidos e foco em crescimento econômico como motor do bem-estar social.</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-purple-500 to-purple-700 flex items-center justify-center">
            <PieChart className="h-10 w-10 text-white" />
          </div>
          <CardHeader>
            <CardTitle>Modelo Social-Democrata</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Economia mista com forte proteção social, impostos progressivos, serviços públicos universais e regulação do mercado.</p>
          </CardContent>
        </Card>
        
        <Card className="overflow-hidden">
          <div className="h-24 bg-gradient-to-r from-red-500 to-red-700 flex items-center justify-center">
            <Building2 className="h-10 w-10 text-white" />
          </div>
          <CardHeader>
            <CardTitle>Modelo Planejado</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Planejamento econômico centralizado, propriedade pública dos meios de produção e distribuição equitativa dos recursos.</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
        <h3 className="font-medium mb-2 flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Modelos Personalizáveis
        </h3>
        <p>Além dos modelos pré-configurados, você pode criar suas próprias abordagens econômicas combinando diferentes políticas e analisando os resultados em simulações de longo prazo.</p>
      </div>
    </div>
  );
};

export default EconomiaModels;
