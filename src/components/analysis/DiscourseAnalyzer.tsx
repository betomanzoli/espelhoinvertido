
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertCircle, Brain, TrendingUp, Eye, Target, MessageSquare } from 'lucide-react';

interface BiasAnalysis {
  confirmation_bias: number;
  emotional_language: number;
  logical_fallacies: string[];
  political_leaning: 'left' | 'center' | 'right' | 'neutral';
  credibility_score: number;
  sentiment: 'positive' | 'negative' | 'neutral';
  manipulation_techniques: string[];
}

interface DiscourseMetrics {
  word_count: number;
  complexity_score: number;
  readability: number;
  key_concepts: string[];
  ideological_markers: string[];
}

const DiscourseAnalyzer: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [analysis, setAnalysis] = useState<BiasAnalysis | null>(null);
  const [metrics, setMetrics] = useState<DiscourseMetrics | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const sampleTexts = [
    {
      title: "Discurso Político Populista",
      text: "O povo brasileiro está sendo traído pelas elites corruptas! Só nós podemos salvar nossa nação dos parasitas que sugam o sangue dos trabalhadores honestos. Eles querem nos enganar com suas mentiras da mídia golpista, mas nós sabemos a verdade!"
    },
    {
      title: "Texto Acadêmico Neutro",
      text: "A análise dos dados econômicos do último trimestre indica uma tendência de recuperação gradual do PIB, com crescimento de 1.2% em relação ao período anterior. Os indicadores sugerem que as políticas fiscais implementadas podem ter contribuído para essa melhoria, embora seja necessário considerar fatores externos."
    },
    {
      title: "Propaganda Ideológica",
      text: "A revolução socialista é inevitável! Os capitalistas exploradores não podem mais esconder suas contradições. O proletariado consciente deve se unir contra a burguesia parasitária que rouba o valor do nosso trabalho. A história está do nosso lado!"
    }
  ];

  const analyzeText = async (text: string) => {
    setIsAnalyzing(true);
    
    // Simular análise (em produção, usar NLP real)
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Análise básica de viés
    const biasKeywords = [
      'só nós', 'sempre', 'nunca', 'todos sabem', 'obviamente', 'sem dúvida',
      'traidores', 'parasitas', 'elites', 'corruptos', 'golpistas'
    ];
    
    const emotionalWords = [
      'traído', 'sangue', 'mentiras', 'salvar', 'verdade', 'inevitável',
      'explorador', 'parasitário', 'rouba'
    ];

    const logicalFallacies = [];
    const manipulationTechniques = [];

    // Detectar falácias lógicas
    if (text.includes('só') || text.includes('apenas')) {
      logicalFallacies.push('Falso Dilema');
    }
    if (text.toLowerCase().includes('todos') || text.toLowerCase().includes('ninguém')) {
      logicalFallacies.push('Generalização Precipitada');
    }
    if (biasKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
      logicalFallacies.push('Apelo à Popularidade');
    }

    // Detectar técnicas de manipulação
    if (emotionalWords.some(word => text.toLowerCase().includes(word))) {
      manipulationTechniques.push('Linguagem Emocional');
    }
    if (text.includes('!') && text.split('!').length > 2) {
      manipulationTechniques.push('Exagero Retórico');
    }
    if (['nós', 'nosso', 'nossa'].some(word => text.toLowerCase().includes(word))) {
      manipulationTechniques.push('Apelo Tribal');
    }

    const confirmationBias = Math.min(100, biasKeywords.filter(keyword => 
      text.toLowerCase().includes(keyword)).length * 20);
    
    const emotionalLanguage = Math.min(100, emotionalWords.filter(word => 
      text.toLowerCase().includes(word)).length * 15);

    // Determinar inclinação política
    const leftMarkers = ['socialista', 'proletariado', 'burguesia', 'capitalista', 'revolução'];
    const rightMarkers = ['tradição', 'família', 'ordem', 'segurança', 'propriedade'];
    
    const leftScore = leftMarkers.filter(marker => 
      text.toLowerCase().includes(marker)).length;
    const rightScore = rightMarkers.filter(marker => 
      text.toLowerCase().includes(marker)).length;

    let politicalLeaning: 'left' | 'center' | 'right' | 'neutral' = 'neutral';
    if (leftScore > rightScore && leftScore > 0) politicalLeaning = 'left';
    else if (rightScore > leftScore && rightScore > 0) politicalLeaning = 'right';
    else if (leftScore === 0 && rightScore === 0) politicalLeaning = 'center';

    const credibilityScore = Math.max(0, 100 - confirmationBias - (emotionalLanguage / 2) - (logicalFallacies.length * 10));

    const sentiment = emotionalLanguage > 50 ? 
      (text.includes('!') ? 'negative' : 'positive') : 'neutral';

    const newAnalysis: BiasAnalysis = {
      confirmation_bias: confirmationBias,
      emotional_language: emotionalLanguage,
      logical_fallacies: logicalFallacies,
      political_leaning: politicalLeaning,
      credibility_score: Math.round(credibilityScore),
      sentiment: sentiment as 'positive' | 'negative' | 'neutral',
      manipulation_techniques: manipulationTechniques
    };

    // Métricas do discurso
    const words = text.split(/\s+/).filter(word => word.length > 0);
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    const avgWordsPerSentence = words.length / sentences.length;
    
    const keyConcepts = [...new Set([
      ...leftMarkers.filter(marker => text.toLowerCase().includes(marker)),
      ...rightMarkers.filter(marker => text.toLowerCase().includes(marker)),
      ...biasKeywords.filter(keyword => text.toLowerCase().includes(keyword))
    ])];

    const newMetrics: DiscourseMetrics = {
      word_count: words.length,
      complexity_score: Math.min(100, avgWordsPerSentence * 5),
      readability: Math.max(0, 100 - (avgWordsPerSentence * 3)),
      key_concepts: keyConcepts.slice(0, 10),
      ideological_markers: [...leftMarkers, ...rightMarkers].filter(marker => 
        text.toLowerCase().includes(marker)).slice(0, 5)
    };

    setAnalysis(newAnalysis);
    setMetrics(newMetrics);
    setIsAnalyzing(false);
  };

  const getBiasLevel = (score: number): { label: string; color: string } => {
    if (score < 20) return { label: 'Baixo', color: 'text-green-600' };
    if (score < 50) return { label: 'Moderado', color: 'text-yellow-600' };
    if (score < 80) return { label: 'Alto', color: 'text-orange-600' };
    return { label: 'Extremo', color: 'text-red-600' };
  };

  const getPoliticalColor = (leaning: string): string => {
    switch (leaning) {
      case 'left': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'right': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'center': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <Card className="mirror-card">
        <CardHeader>
          <CardTitle className="reflection-text flex items-center gap-2">
            <Brain className="h-6 w-6" />
            Análise de Discurso e Viés de Confirmação
          </CardTitle>
          <CardDescription>
            Ferramenta para identificar vieses, falácias lógicas e técnicas de manipulação em textos
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Texto para Análise
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Cole aqui o texto que deseja analisar (discurso político, artigo, post em rede social, etc.)"
                className="min-h-32"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <span className="text-sm font-medium">Exemplos:</span>
              {sampleTexts.map((sample, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setInputText(sample.text)}
                  className="text-xs"
                >
                  {sample.title}
                </Button>
              ))}
            </div>

            <Button 
              onClick={() => analyzeText(inputText)}
              disabled={!inputText.trim() || isAnalyzing}
              className="button-mirror w-full"
            >
              {isAnalyzing ? (
                <>
                  <Brain className="h-4 w-4 mr-2 animate-pulse" />
                  Analisando...
                </>
              ) : (
                <>
                  <Target className="h-4 w-4 mr-2" />
                  Analisar Discurso
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && metrics && (
        <Tabs defaultValue="bias" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="bias">Análise de Viés</TabsTrigger>
            <TabsTrigger value="metrics">Métricas</TabsTrigger>
            <TabsTrigger value="fallacies">Falácias</TabsTrigger>
            <TabsTrigger value="interpretation">Interpretação</TabsTrigger>
          </TabsList>

          <TabsContent value="bias" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Viés de Confirmação
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Nível de Viés</span>
                        <span className={`text-sm font-medium ${getBiasLevel(analysis.confirmation_bias).color}`}>
                          {getBiasLevel(analysis.confirmation_bias).label}
                        </span>
                      </div>
                      <Progress value={analysis.confirmation_bias} className="h-2" />
                      <span className="text-xs text-gray-500">{analysis.confirmation_bias}%</span>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Linguagem Emocional</span>
                        <span className={`text-sm font-medium ${getBiasLevel(analysis.emotional_language).color}`}>
                          {getBiasLevel(analysis.emotional_language).label}
                        </span>
                      </div>
                      <Progress value={analysis.emotional_language} className="h-2" />
                      <span className="text-xs text-gray-500">{analysis.emotional_language}%</span>
                    </div>

                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Credibilidade</span>
                        <span className={`text-sm font-medium ${
                          analysis.credibility_score > 70 ? 'text-green-600' : 
                          analysis.credibility_score > 40 ? 'text-yellow-600' : 'text-red-600'
                        }`}>
                          {analysis.credibility_score > 70 ? 'Alta' : 
                           analysis.credibility_score > 40 ? 'Média' : 'Baixa'}
                        </span>
                      </div>
                      <Progress value={analysis.credibility_score} className="h-2" />
                      <span className="text-xs text-gray-500">{analysis.credibility_score}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Classificação</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium">Inclinação Política:</span>
                    <Badge className={`ml-2 ${getPoliticalColor(analysis.political_leaning)}`}>
                      {analysis.political_leaning === 'left' ? 'Esquerda' :
                       analysis.political_leaning === 'right' ? 'Direita' :
                       analysis.political_leaning === 'center' ? 'Centro' : 'Neutro'}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Sentimento:</span>
                    <Badge className={`ml-2 ${
                      analysis.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                      analysis.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {analysis.sentiment === 'positive' ? 'Positivo' :
                       analysis.sentiment === 'negative' ? 'Negativo' : 'Neutro'}
                    </Badge>
                  </div>

                  <div>
                    <span className="text-sm font-medium mb-2 block">Técnicas de Manipulação:</span>
                    <div className="flex flex-wrap gap-1">
                      {analysis.manipulation_techniques.length > 0 ? (
                        analysis.manipulation_techniques.map((technique, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {technique}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-gray-500">Nenhuma detectada</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Métricas do Texto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Contagem de Palavras:</span>
                    <Badge variant="outline">{metrics.word_count}</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Complexidade:</span>
                    <Badge variant="outline">{Math.round(metrics.complexity_score)}%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Legibilidade:</span>
                    <Badge variant="outline">{Math.round(metrics.readability)}%</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Conceitos Identificados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <span className="text-sm font-medium mb-2 block">Conceitos-chave:</span>
                      <div className="flex flex-wrap gap-1">
                        {metrics.key_concepts.length > 0 ? (
                          metrics.key_concepts.map((concept, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {concept}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">Nenhum identificado</span>
                        )}
                      </div>
                    </div>

                    <div>
                      <span className="text-sm font-medium mb-2 block">Marcadores Ideológicos:</span>
                      <div className="flex flex-wrap gap-1">
                        {metrics.ideological_markers.length > 0 ? (
                          metrics.ideological_markers.map((marker, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {marker}
                            </Badge>
                          ))
                        ) : (
                          <span className="text-xs text-gray-500">Nenhum identificado</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="fallacies" className="space-y-4 mt-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertCircle className="h-5 w-5" />
                  Falácias Lógicas Detectadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                {analysis.logical_fallacies.length > 0 ? (
                  <div className="space-y-3">
                    {analysis.logical_fallacies.map((fallacy, index) => (
                      <div key={index} className="p-3 border border-orange-200 bg-orange-50 dark:bg-orange-950/20 rounded-lg">
                        <h4 className="font-medium text-orange-800 dark:text-orange-200">{fallacy}</h4>
                        <p className="text-sm text-orange-600 dark:text-orange-300 mt-1">
                          {fallacy === 'Falso Dilema' && 'Apresenta apenas duas opções quando existem mais alternativas.'}
                          {fallacy === 'Generalização Precipitada' && 'Faz afirmações amplas baseadas em evidências limitadas.'}
                          {fallacy === 'Apelo à Popularidade' && 'Argumenta que algo é verdade porque muitas pessoas acreditam.'}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 mx-auto text-green-500 mb-2" />
                    <p className="text-green-600 font-medium">Nenhuma falácia lógica detectada!</p>
                    <p className="text-sm text-gray-500">O texto apresenta argumentação consistente.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="interpretation" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20">
                <CardHeader>
                  <CardTitle className="text-lg text-burgundy">🎭 Análise de Rafael</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "Este tipo de análise nos permite identificar como discursos políticos 
                    utilizam estratégias retóricas para influenciar a percepção pública. 
                    Observamos aqui as mesmas técnicas descritas por teóricos como Gramsci 
                    sobre hegemonia cultural."
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20">
                <CardHeader>
                  <CardTitle className="text-lg text-navy">💻 Análise de Luísa</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    "Na era digital, é crucial desenvolver essas habilidades de análise crítica. 
                    Algoritmos de redes sociais amplificam vieses cognitivos, tornando ainda mais 
                    importante nossa capacidade de identificar manipulação discursiva."
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card className="mirror-card">
              <CardHeader>
                <CardTitle className="reflection-text">🔄 Síntese: Espelho Invertido</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  <strong>Reflexão Crítica:</strong> Esta análise revela como nossos próprios vieses 
                  influenciam tanto a produção quanto a interpretação de discursos. O "espelho invertido" 
                  nos convida a questionar não apenas o texto analisado, mas também nossos próprios 
                  pressupostos e metodologias de análise.
                  
                  <br/><br/>
                  
                  <strong>Aplicação Prática:</strong> Use esta ferramenta para desenvolver consciência 
                  crítica ao consumir mídia, discursos políticos e conteúdo online. Lembre-se: 
                  a verdadeira neutralidade é impossível, mas a transparência sobre nossos vieses 
                  é essencial para um debate público saudável.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default DiscourseAnalyzer;
