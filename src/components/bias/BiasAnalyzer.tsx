
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Search, Zap, AlertTriangle } from 'lucide-react';
import { RAFAEL, LUISA } from '@/data/personas';

interface BiasAnalysis {
  originalText: string;
  ideologicalBias: {
    capitalism: number;
    socialism: number;
    neutrality: number;
  };
  rafaelPerspective: string;
  luisaPerspective: string;
  contradictions: string[];
  keywords: string[];
}

const BiasAnalyzer = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<BiasAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeText = async () => {
    if (!inputText.trim()) return;
    
    setIsAnalyzing(true);
    
    // Simular análise (em produção seria via API)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const mockAnalysis: BiasAnalysis = {
      originalText: inputText,
      ideologicalBias: {
        capitalism: Math.floor(Math.random() * 40) + 30,
        socialism: Math.floor(Math.random() * 30) + 20,
        neutrality: Math.floor(Math.random() * 40) + 30
      },
      rafaelPerspective: "Este texto reflete as contradições inerentes ao modo de produção capitalista. A linguagem utilizada revela uma naturalização das relações de exploração, mascarando as verdadeiras relações de classe sob um verniz de neutralidade técnica.",
      luisaPerspective: "Na prática, esse discurso serve para legitimar estruturas de poder existentes. Observe como os termos utilizados ecoam narrativas corporativas que transferem responsabilidade individual para problemas sistêmicos - uma estratégia clássica da economia de plataforma.",
      contradictions: [
        "Contradição entre discurso meritocrático e realidade de desigualdade estrutural",
        "Naturalização de processos socialmente construídos",
        "Invisibilização das relações de poder"
      ],
      keywords: inputText.toLowerCase().split(' ').filter(word => 
        ['trabalho', 'empresa', 'mercado', 'economia', 'individual', 'sucesso'].includes(word)
      )
    };
    
    setAnalysis(mockAnalysis);
    setIsAnalyzing(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Detector de Contradições Ideológicas
          </CardTitle>
          <CardDescription>
            Analise textos através das lentes dialéticas de Rafael e Luísa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Cole aqui o texto que deseja analisar (notícia, discurso político, post de rede social...)"
            className="min-h-32"
          />
          <Button 
            onClick={analyzeText} 
            disabled={!inputText.trim() || isAnalyzing}
            className="w-full gap-2"
          >
            {isAnalyzing ? (
              <>
                <Zap className="h-4 w-4 animate-spin" />
                Analisando...
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                Detectar Vieses
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {analysis && (
        <Card>
          <CardHeader>
            <CardTitle>Análise Ideológica</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="bias" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="bias">Viés Detectado</TabsTrigger>
                <TabsTrigger value="rafael">Rafael</TabsTrigger>
                <TabsTrigger value="luisa">Luísa</TabsTrigger>
                <TabsTrigger value="contradictions">Contradições</TabsTrigger>
              </TabsList>
              
              <TabsContent value="bias" className="space-y-4">
                <div className="grid gap-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Capitalista</span>
                      <span className="text-sm text-gray-500">{analysis.ideologicalBias.capitalism}%</span>
                    </div>
                    <Progress value={analysis.ideologicalBias.capitalism} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Socialista</span>
                      <span className="text-sm text-gray-500">{analysis.ideologicalBias.socialism}%</span>
                    </div>
                    <Progress value={analysis.ideologicalBias.socialism} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Neutro</span>
                      <span className="text-sm text-gray-500">{analysis.ideologicalBias.neutrality}%</span>
                    </div>
                    <Progress value={analysis.ideologicalBias.neutrality} className="h-2" />
                  </div>
                </div>
                
                {analysis.keywords.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="font-medium">Palavras-chave Detectadas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {analysis.keywords.map((keyword, index) => (
                        <Badge key={index} variant="outline">{keyword}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="rafael" className="space-y-4">
                <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{RAFAEL.avatar}</span>
                    <h4 className="font-semibold" style={{ color: RAFAEL.color }}>
                      Perspectiva de {RAFAEL.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {analysis.rafaelPerspective}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="luisa" className="space-y-4">
                <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-2xl">{LUISA.avatar}</span>
                    <h4 className="font-semibold" style={{ color: LUISA.color }}>
                      Perspectiva de {LUISA.name}
                    </h4>
                  </div>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    {analysis.luisaPerspective}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="contradictions" className="space-y-4">
                <div className="space-y-3">
                  {analysis.contradictions.map((contradiction, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg">
                      <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-gray-700 dark:text-gray-300">{contradiction}</p>
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BiasAnalyzer;
