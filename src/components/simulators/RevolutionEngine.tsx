
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, TrendingUp, Users, Zap, Crown, Hammer } from 'lucide-react';

interface SocialClass {
  name: string;
  population: number;
  wealth: number;
  power: number;
  satisfaction: number;
  revolutionary_potential: number;
}

interface RevolutionScenario {
  id: string;
  name: string;
  description: string;
  initial_conditions: {
    inequality: number;
    economic_crisis: number;
    political_repression: number;
    education_level: number;
    external_pressure: number;
  };
  classes: SocialClass[];
}

const SCENARIOS: RevolutionScenario[] = [
  {
    id: 'french_revolution',
    name: 'Revolução Francesa (1789)',
    description: 'Crise financeira, desigualdade extrema e ideias iluministas se combinam.',
    initial_conditions: {
      inequality: 85,
      economic_crisis: 90,
      political_repression: 75,
      education_level: 30,
      external_pressure: 40
    },
    classes: [
      { name: 'Nobreza', population: 2, wealth: 40, power: 60, satisfaction: 80, revolutionary_potential: 10 },
      { name: 'Clero', population: 3, wealth: 30, power: 30, satisfaction: 70, revolutionary_potential: 20 },
      { name: 'Burguesia', population: 15, wealth: 25, power: 8, satisfaction: 30, revolutionary_potential: 70 },
      { name: 'Camponeses', population: 80, wealth: 5, power: 2, satisfaction: 15, revolutionary_potential: 80 }
    ]
  },
  {
    id: 'russian_revolution',
    name: 'Revolução Russa (1917)',
    description: 'Guerra mundial, colapso econômico e radicalização política.',
    initial_conditions: {
      inequality: 90,
      economic_crisis: 95,
      political_repression: 80,
      education_level: 25,
      external_pressure: 95
    },
    classes: [
      { name: 'Czar e Nobreza', population: 1, wealth: 50, power: 70, satisfaction: 60, revolutionary_potential: 20 },
      { name: 'Burguesia', population: 10, wealth: 30, power: 15, satisfaction: 25, revolutionary_potential: 60 },
      { name: 'Operários', population: 20, wealth: 10, power: 5, satisfaction: 10, revolutionary_potential: 90 },
      { name: 'Camponeses', population: 69, wealth: 10, power: 10, satisfaction: 5, revolutionary_potential: 85 }
    ]
  }
];

const RevolutionEngine: React.FC = () => {
  const [currentScenario, setCurrentScenario] = useState<RevolutionScenario>(SCENARIOS[0]);
  const [classes, setClasses] = useState<SocialClass[]>(SCENARIOS[0].classes);
  const [conditions, setConditions] = useState(SCENARIOS[0].initial_conditions);
  const [revolutionProbability, setRevolutionProbability] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [events, setEvents] = useState<string[]>([]);
  const [turn, setTurn] = useState(0);

  useEffect(() => {
    calculateRevolutionProbability();
  }, [classes, conditions]);

  const calculateRevolutionProbability = () => {
    const totalPopulation = classes.reduce((sum, cls) => sum + cls.population, 0);
    const weightedRevPotential = classes.reduce((sum, cls) => 
      sum + (cls.revolutionary_potential * cls.population), 0) / totalPopulation;
    
    const conditionsFactor = (
      conditions.inequality * 0.3 +
      conditions.economic_crisis * 0.25 +
      conditions.political_repression * 0.2 +
      (100 - conditions.education_level) * 0.1 +
      conditions.external_pressure * 0.15
    ) / 100;

    const probability = Math.min(95, (weightedRevPotential * conditionsFactor * 1.2));
    setRevolutionProbability(Math.round(probability));
  };

  const simulateTurn = () => {
    if (isSimulating) return;
    
    setIsSimulating(true);
    const newEvents: string[] = [];
    
    // Simular eventos aleatórios
    const eventChance = Math.random();
    if (eventChance < 0.3) {
      const economicEvent = Math.random() < 0.5;
      if (economicEvent) {
        const crisis = Math.random() < 0.6;
        if (crisis) {
          setConditions(prev => ({ ...prev, economic_crisis: Math.min(100, prev.economic_crisis + 10) }));
          newEvents.push('📉 Crise econômica se aprofunda - Desemprego aumenta');
        } else {
          setConditions(prev => ({ ...prev, economic_crisis: Math.max(0, prev.economic_crisis - 5) }));
          newEvents.push('📈 Pequena melhora econômica - Tensões diminuem levemente');
        }
      } else {
        const repression = Math.random() < 0.7;
        if (repression) {
          setConditions(prev => ({ ...prev, political_repression: Math.min(100, prev.political_repression + 15) }));
          newEvents.push('👮 Aumento da repressão política - Manifestações são brutalmente reprimidas');
        }
      }
    }

    // Atualizar classes sociais
    setClasses(prev => prev.map(cls => {
      let newSatisfaction = cls.satisfaction;
      let newRevPotential = cls.revolutionary_potential;

      // Classes mais pobres são mais afetadas por crises
      if (cls.wealth < 20 && conditions.economic_crisis > 70) {
        newSatisfaction = Math.max(0, newSatisfaction - 8);
        newRevPotential = Math.min(100, newRevPotential + 10);
      }

      // Repressão aumenta potencial revolucionário
      if (conditions.political_repression > 60) {
        newRevPotential = Math.min(100, newRevPotential + 5);
      }

      return {
        ...cls,
        satisfaction: newSatisfaction,
        revolutionary_potential: newRevPotential
      };
    }));

    setEvents(prev => [...prev.slice(-4), ...newEvents].slice(-5));
    setTurn(prev => prev + 1);
    
    setTimeout(() => {
      setIsSimulating(false);
    }, 1000);
  };

  const resetSimulation = () => {
    setClasses(currentScenario.classes);
    setConditions(currentScenario.initial_conditions);
    setEvents([]);
    setTurn(0);
  };

  const changeScenario = (scenarioId: string) => {
    const scenario = SCENARIOS.find(s => s.id === scenarioId);
    if (scenario) {
      setCurrentScenario(scenario);
      setClasses(scenario.classes);
      setConditions(scenario.initial_conditions);
      setEvents([]);
      setTurn(0);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="mirror-card">
        <CardHeader>
          <CardTitle className="reflection-text flex items-center gap-2">
            <Crown className="h-6 w-6" />
            Simulador de Revoluções
          </CardTitle>
          <CardDescription>
            Explore as dinâmicas sociais que levam às transformações revolucionárias na história
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="simulation" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="simulation">Simulação</TabsTrigger>
              <TabsTrigger value="analysis">Análise</TabsTrigger>
              <TabsTrigger value="history">História</TabsTrigger>
            </TabsList>
            
            <TabsContent value="simulation" className="space-y-4 mt-4">
              <div className="flex flex-wrap gap-2 mb-4">
                {SCENARIOS.map(scenario => (
                  <Button
                    key={scenario.id}
                    variant={currentScenario.id === scenario.id ? "default" : "outline"}
                    onClick={() => changeScenario(scenario.id)}
                    className="text-sm"
                  >
                    {scenario.name}
                  </Button>
                ))}
              </div>

              <Card className="bg-gradient-to-r from-red-50 to-yellow-50 dark:from-red-950/20 dark:to-yellow-950/20">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Probabilidade de Revolução</span>
                    <Badge variant={revolutionProbability > 70 ? "destructive" : revolutionProbability > 40 ? "default" : "secondary"}>
                      {revolutionProbability}%
                    </Badge>
                  </div>
                  <Progress value={revolutionProbability} className="h-3" />
                  {revolutionProbability > 80 && (
                    <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                      <AlertTriangle className="h-4 w-4" />
                      Estado pré-revolucionário crítico!
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Classes Sociais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {classes.map((cls, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{cls.name}</span>
                          <Badge variant="outline">{cls.population}%</Badge>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Satisfação:</span>
                            <span className={cls.satisfaction < 30 ? "text-red-600" : cls.satisfaction < 60 ? "text-yellow-600" : "text-green-600"}>
                              {cls.satisfaction}%
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Potencial Revolucionário:</span>
                            <span className={cls.revolutionary_potential > 70 ? "text-red-600 font-medium" : "text-gray-600"}>
                              {cls.revolutionary_potential}%
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Condições Sociais</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {Object.entries(conditions).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="capitalize">{key.replace('_', ' ')}</span>
                          <span>{value}%</span>
                        </div>
                        <Progress 
                          value={value} 
                          className={`h-2 ${
                            value > 70 ? 'text-red-600' : value > 40 ? 'text-yellow-600' : 'text-green-600'
                          }`} 
                        />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={simulateTurn} 
                  disabled={isSimulating}
                  className="button-mirror"
                >
                  {isSimulating ? <Zap className="h-4 w-4 animate-spin mr-2" /> : <TrendingUp className="h-4 w-4 mr-2" />}
                  {isSimulating ? 'Simulando...' : 'Avançar Turno'}
                </Button>
                <Button variant="outline" onClick={resetSimulation}>
                  Reiniciar
                </Button>
              </div>

              {events.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Eventos Recentes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {events.map((event, index) => (
                        <div key={index} className="p-2 bg-gray-50 dark:bg-gray-800 rounded text-sm">
                          {event}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analysis" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Análise Dialética</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-burgundy">🎭 Perspectiva de Rafael (Histórico-Filosófica)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        "As revoluções não são eventos isolados, mas culminações de contradições estruturais 
                        que se acumulam ao longo do tempo. Observamos aqui as mesmas dinâmicas descritas por Marx: 
                        a luta de classes como motor da história."
                      </p>
                      <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded">
                        <p className="text-sm">
                          <strong>Análise Marxista:</strong> Quando a taxa de mais-valia se torna insustentável 
                          e as forças produtivas entram em contradição com as relações de produção, 
                          o potencial revolucionário se intensifica.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <h4 className="font-semibold text-navy">💻 Perspectiva de Luísa (Prático-Digital)</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        "Hoje, as redes sociais aceleram exponencialmente esses processos. 
                        O que levava décadas para se desenvolver, agora acontece em meses. 
                        Vemos isso em movimentos como a Primavera Árabe."
                      </p>
                      <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded">
                        <p className="text-sm">
                          <strong>Aplicação Moderna:</strong> Algoritmos podem tanto amplificar 
                          o descontentamento quanto criar câmaras de eco que radicalizam grupos. 
                          A revolução digital mudou as regras do jogo político.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Card className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20">
                    <CardContent className="pt-4">
                      <h4 className="font-semibold mb-2">🔄 Síntese Dialética</h4>
                      <p className="text-sm">
                        A simulação demonstra que revoluções emergem da interação complexa entre 
                        condições materiais objetivas (desigualdade, crise econômica) e fatores 
                        subjetivos (consciência de classe, organização política). 
                        
                        <br/><br/>
                        
                        <strong>Insight contemporâneo:</strong> A tecnologia moderna não elimina 
                        essas dinâmicas históricas, mas as acelera e amplifica, criando tanto 
                        novas oportunidades de mobilização quanto novos mecanismos de controle social.
                      </p>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history" className="mt-4">
              <div className="space-y-4">
                {SCENARIOS.map(scenario => (
                  <Card key={scenario.id} className="interactive-mirror">
                    <CardHeader>
                      <CardTitle className="text-lg">{scenario.name}</CardTitle>
                      <CardDescription>{scenario.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-sm">
                        {Object.entries(scenario.initial_conditions).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="font-medium capitalize">{key.replace('_', ' ')}</div>
                            <Badge variant={value > 70 ? "destructive" : value > 40 ? "default" : "secondary"}>
                              {value}%
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevolutionEngine;
