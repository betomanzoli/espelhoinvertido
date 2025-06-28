
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Brain, Users, Zap } from 'lucide-react';

interface BiasFilter {
  id: string;
  name: string;
  perspective: string;
  color: string;
  icon: React.ReactNode;
}

interface FilteredInterpretation {
  filterId: string;
  interpretation: string;
  focusPoints: string[];
  blindSpots: string[];
}

const biasFilters: BiasFilter[] = [
  {
    id: 'conservative',
    name: 'Filtro Conservador',
    perspective: 'Prioriza tradição, estabilidade e valores estabelecidos',
    color: 'from-blue-600 to-blue-800',
    icon: <Eye className="w-4 h-4" />
  },
  {
    id: 'progressive',
    name: 'Filtro Progressista',
    perspective: 'Enfatiza mudança social, igualdade e justiça distributiva',
    color: 'from-red-600 to-red-800',
    icon: <Zap className="w-4 h-4" />
  },
  {
    id: 'libertarian',
    name: 'Filtro Libertário',
    perspective: 'Foca em liberdade individual e mínima intervenção estatal',
    color: 'from-yellow-600 to-yellow-800',
    icon: <Users className="w-4 h-4" />
  },
  {
    id: 'technocratic',
    name: 'Filtro Tecnocrático',
    perspective: 'Prioriza dados, eficiência e soluções baseadas em evidência',
    color: 'from-green-600 to-green-800',
    icon: <Brain className="w-4 h-4" />
  }
];

const BiasSimulator = () => {
  const [inputText, setInputText] = useState('');
  const [interpretations, setInterpretations] = useState<FilteredInterpretation[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simular análise com diferentes filtros ideológicos
    setTimeout(() => {
      const mockInterpretations: FilteredInterpretation[] = [
        {
          filterId: 'conservative',
          interpretation: 'Este texto pode representar uma ameaça aos valores tradicionais e à ordem estabelecida. É importante manter a estabilidade social.',
          focusPoints: ['Preservação da ordem', 'Valores tradicionais', 'Estabilidade institucional'],
          blindSpots: ['Necessidade de mudança', 'Desigualdades sistêmicas', 'Vozes marginalizadas']
        },
        {
          filterId: 'progressive',
          interpretation: 'O texto revela estruturas de poder que perpetuam desigualdades. É necessária uma transformação para maior justiça social.',
          focusPoints: ['Justiça social', 'Igualdade de oportunidades', 'Transformação sistêmica'],
          blindSpots: ['Valor da tradição', 'Custos da mudança rápida', 'Complexidade institucional']
        },
        {
          filterId: 'libertarian',
          interpretation: 'Qualquer proposta deve respeitar a liberdade individual. O Estado não deve interferir nas escolhas pessoais dos cidadãos.',
          focusPoints: ['Liberdade individual', 'Mínima intervenção', 'Escolha pessoal'],
          blindSpots: ['Externalidades sociais', 'Desigualdades de acesso', 'Bem comum coletivo']
        },
        {
          filterId: 'technocratic',
          interpretation: 'É preciso analisar os dados e evidências disponíveis antes de tomar qualquer decisão. Soluções devem ser baseadas em eficiência.',
          focusPoints: ['Análise de dados', 'Eficiência operacional', 'Evidência empírica'],
          blindSpots: ['Aspectos emocionais', 'Contexto cultural', 'Valores não quantificáveis']
        }
      ];
      
      setInterpretations(mockInterpretations);
      setIsAnalyzing(false);
    }, 2000);
  };

  const resetSimulation = () => {
    setInputText('');
    setInterpretations([]);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5" />
            Simulador de Filtros Ideológicos
          </CardTitle>
          <CardDescription>
            Veja como diferentes perspectivas interpretam o mesmo texto através de seus filtros de confirmação
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Cole um texto, notícia ou declaração política:
            </label>
            <Textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ex: 'O governo anunciou um programa de redistribuição de renda que visa reduzir a desigualdade social através de transferências diretas para famílias de baixa renda.'"
              rows={4}
              className="resize-none"
            />
          </div>
          
          <div className="flex gap-3">
            <Button 
              onClick={analyzeText} 
              disabled={!inputText.trim() || isAnalyzing}
              className="flex-1"
            >
              {isAnalyzing ? 'Analisando...' : 'Simular Interpretações'}
            </Button>
            <Button 
              onClick={resetSimulation} 
              variant="outline"
              disabled={!inputText && interpretations.length === 0}
            >
              Limpar
            </Button>
          </div>
        </CardContent>
      </Card>

      {interpretations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Interpretações através de Diferentes Filtros</CardTitle>
            <CardDescription>
              Observe como o mesmo texto é processado por diferentes vieses ideológicos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={interpretations[0]?.filterId} className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                {interpretations.map((interp) => {
                  const filter = biasFilters.find(f => f.id === interp.filterId);
                  return (
                    <TabsTrigger key={interp.filterId} value={interp.filterId} className="text-xs">
                      {filter?.name.replace('Filtro ', '')}
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              
              {interpretations.map((interp) => {
                const filter = biasFilters.find(f => f.id === interp.filterId);
                return (
                  <TabsContent key={interp.filterId} value={interp.filterId} className="space-y-4">
                    <div className={`p-4 rounded-lg bg-gradient-to-r ${filter?.color} text-white`}>
                      <div className="flex items-center gap-2 mb-2">
                        {filter?.icon}
                        <h3 className="font-semibold">{filter?.name}</h3>
                      </div>
                      <p className="text-sm opacity-90">{filter?.perspective}</p>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Interpretação:</h4>
                        <p className="text-sm text-slate-600 dark:text-slate-400 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                          {interp.interpretation}
                        </p>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium mb-2 text-green-700 dark:text-green-400">Pontos Enfatizados:</h4>
                          <div className="space-y-1">
                            {interp.focusPoints.map((point, index) => (
                              <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs border-green-300 text-green-700">
                                {point}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-medium mb-2 text-orange-700 dark:text-orange-400">Pontos Cegos:</h4>
                          <div className="space-y-1">
                            {interp.blindSpots.map((blind, index) => (
                              <Badge key={index} variant="outline" className="mr-1 mb-1 text-xs border-orange-300 text-orange-700">
                                {blind}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                );
              })}
            </Tabs>
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                💡 Reflexão sobre Viés de Confirmação
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Note como cada filtro enfatiza aspectos diferentes do mesmo texto e ignora outros. 
                Esta é a essência do viés de confirmação: processamos informações de forma a 
                confirmar nossas crenças preexistentes, muitas vezes sem perceber.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BiasSimulator;
