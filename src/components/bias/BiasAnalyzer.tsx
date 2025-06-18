
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Search, AlertTriangle, CheckCircle, Info } from 'lucide-react';

interface BiasResult {
  type: string;
  score: number;
  description: string;
  examples: string[];
  color: string;
}

const BiasAnalyzer = () => {
  const [text, setText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<BiasResult[]>([]);

  const analyzeBias = () => {
    if (!text.trim()) return;
    
    setAnalyzing(true);
    
    // Simular análise - em implementação real seria uma API
    setTimeout(() => {
      const mockResults: BiasResult[] = [
        {
          type: 'Viés de Confirmação',
          score: 65,
          description: 'Tendência a interpretar informações de forma que confirme crenças preexistentes',
          examples: ['Seleção apenas de fontes que apoiam o argumento', 'Ignorar dados contraditórios'],
          color: 'orange'
        },
        {
          type: 'Viés Ideológico',
          score: 45,
          description: 'Presença de elementos que revelam posicionamento político específico',
          examples: ['Uso de termos carregados ideologicamente', 'Pressupostos não explicitados'],
          color: 'blue'
        },
        {
          type: 'Viés de Fonte',
          score: 30,
          description: 'Dependência excessiva de fontes limitadas ou tendenciosas',
          examples: ['Citação apenas de autores alinhados', 'Falta de diversidade de perspectivas'],
          color: 'green'
        }
      ];
      
      setResults(mockResults);
      setAnalyzing(false);
    }, 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-green-600';
  };

  const getScoreIcon = (score: number) => {
    if (score >= 70) return <AlertTriangle className="h-4 w-4 text-red-600" />;
    if (score >= 40) return <Info className="h-4 w-4 text-orange-600" />;
    return <CheckCircle className="h-4 w-4 text-green-600" />;
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Detector de Viés Ideológico
          </CardTitle>
          <CardDescription>
            Analise textos para identificar possíveis vieses ideológicos, de confirmação e de fonte
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">
              Cole o texto para análise:
            </label>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole aqui o texto que deseja analisar - artigo, discurso, post de redes sociais, etc."
              rows={6}
              className="resize-none"
            />
          </div>
          
          <Button 
            onClick={analyzeBias} 
            disabled={!text.trim() || analyzing}
            className="w-full gap-2"
          >
            {analyzing ? 'Analisando...' : 'Analisar Viés'}
            <Search className="h-4 w-4" />
          </Button>
        </CardContent>
      </Card>

      {results.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Resultados da Análise</CardTitle>
            <CardDescription>
              Níveis de viés detectados no texto analisado
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {results.map((result, index) => (
              <div key={index} className="border-l-4 border-gray-200 pl-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {getScoreIcon(result.score)}
                    <h3 className="font-semibold">{result.type}</h3>
                  </div>
                  <Badge variant={result.score >= 70 ? 'destructive' : result.score >= 40 ? 'default' : 'secondary'}>
                    {result.score}%
                  </Badge>
                </div>
                
                <Progress value={result.score} className="h-2" />
                
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {result.description}
                </p>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Exemplos identificados:</h4>
                  <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                    {result.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
            
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
                💡 Interpretação Dialética
              </h4>
              <p className="text-sm text-blue-800 dark:text-blue-200">
                Lembre-se: todo texto carrega perspectivas. O objetivo não é eliminar completamente 
                o viés, mas reconhecê-lo e considerá-lo na interpretação. A neutralidade absoluta 
                é uma ilusão - o importante é a transparência sobre nossos pontos de partida.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
      
      {text && !results.length && !analyzing && (
        <Card>
          <CardContent className="text-center py-8">
            <Search className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500">
              Clique em "Analisar Viés" para começar a análise do texto
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BiasAnalyzer;
