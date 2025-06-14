
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Building, 
  Leaf,
  DollarSign,
  AlertTriangle,
  BarChart3,
  LineChart
} from 'lucide-react';
import { Line } from 'recharts';
import { LineChart as RechartsLineChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface EconomicMetrics {
  gdp: number;
  unemployment: number;
  inflation: number;
  inequality: number; // Gini coefficient (0-100)
  environmentalHealth: number;
  socialWelfare: number;
  publicDebt: number;
  happiness: number;
}

interface PolicySettings {
  taxRate: number; // 0-100
  publicSpending: number; // 0-100
  minimumWage: number; // 0-100
  environmentalRegulation: number; // 0-100
  socialPrograms: number; // 0-100
  monetaryPolicy: number; // 0-100 (0 = restrictive, 100 = expansive)
}

interface EconomicScenario {
  id: string;
  name: string;
  description: string;
  initialMetrics: EconomicMetrics;
  challenges: string[];
}

const scenarios: EconomicScenario[] = [
  {
    id: 'post-war',
    name: 'Reconstrução Pós-Guerra',
    description: 'Reconstrua uma economia devastada pela guerra implementando políticas de bem-estar social.',
    initialMetrics: {
      gdp: 30,
      unemployment: 80,
      inflation: 20,
      inequality: 70,
      environmentalHealth: 40,
      socialWelfare: 20,
      publicDebt: 90,
      happiness: 25
    },
    challenges: ['Alta taxa de desemprego', 'Infraestrutura destruída', 'Dívida pública elevada']
  },
  {
    id: 'neoliberal-crisis',
    name: 'Crise Neoliberal',
    description: 'Enfrente uma crise de desigualdade social em uma economia de mercado desregulada.',
    initialMetrics: {
      gdp: 70,
      unemployment: 15,
      inflation: 5,
      inequality: 85,
      environmentalHealth: 30,
      socialWelfare: 20,
      publicDebt: 40,
      happiness: 35
    },
    challenges: ['Desigualdade extrema', 'Degradação ambiental', 'Baixo bem-estar social']
  },
  {
    id: 'transition-economy',
    name: 'Economia em Transição',
    description: 'Transforme uma economia planificada em um sistema mais flexível e sustentável.',
    initialMetrics: {
      gdp: 45,
      unemployment: 25,
      inflation: 60,
      inequality: 30,
      environmentalHealth: 50,
      socialWelfare: 60,
      publicDebt: 60,
      happiness: 40
    },
    challenges: ['Inflação descontrolada', 'Reestruturação econômica', 'Pressões sociais']
  }
];

const EconomicSimulator = () => {
  const [selectedScenario, setSelectedScenario] = useState<EconomicScenario | null>(null);
  const [policies, setPolicies] = useState<PolicySettings>({
    taxRate: 50,
    publicSpending: 50,
    minimumWage: 50,
    environmentalRegulation: 50,
    socialPrograms: 50,
    monetaryPolicy: 50
  });
  const [metrics, setMetrics] = useState<EconomicMetrics>({
    gdp: 50,
    unemployment: 50,
    inflation: 50,
    inequality: 50,
    environmentalHealth: 50,
    socialWelfare: 50,
    publicDebt: 50,
    happiness: 50
  });
  const [turn, setTurn] = useState(0);
  const [history, setHistory] = useState<(EconomicMetrics & { turn: number })[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

  const calculateMetrics = (currentPolicies: PolicySettings, currentMetrics: EconomicMetrics): EconomicMetrics => {
    const newMetrics = { ...currentMetrics };

    // GDP calculation - influenced by public spending, taxes, and regulation
    newMetrics.gdp = Math.max(0, Math.min(100, 
      newMetrics.gdp + 
      (currentPolicies.publicSpending - 50) * 0.1 +
      (50 - currentPolicies.taxRate) * 0.05 +
      (50 - currentPolicies.environmentalRegulation) * 0.03
    ));

    // Unemployment - influenced by public spending, minimum wage, and GDP
    newMetrics.unemployment = Math.max(0, Math.min(100,
      newMetrics.unemployment +
      (50 - currentPolicies.publicSpending) * 0.2 +
      (currentPolicies.minimumWage - 50) * 0.1 +
      (50 - newMetrics.gdp) * 0.1
    ));

    // Inflation - influenced by monetary policy and public spending
    newMetrics.inflation = Math.max(0, Math.min(100,
      newMetrics.inflation +
      (currentPolicies.monetaryPolicy - 50) * 0.15 +
      (currentPolicies.publicSpending - 50) * 0.1
    ));

    // Inequality - influenced by taxes, social programs, minimum wage
    newMetrics.inequality = Math.max(0, Math.min(100,
      newMetrics.inequality +
      (50 - currentPolicies.taxRate) * 0.2 +
      (50 - currentPolicies.socialPrograms) * 0.2 +
      (50 - currentPolicies.minimumWage) * 0.1
    ));

    // Environmental Health - influenced by regulation and GDP growth
    newMetrics.environmentalHealth = Math.max(0, Math.min(100,
      newMetrics.environmentalHealth +
      (currentPolicies.environmentalRegulation - 50) * 0.2 +
      (50 - newMetrics.gdp) * 0.05
    ));

    // Social Welfare - influenced by social programs, unemployment, inequality
    newMetrics.socialWelfare = Math.max(0, Math.min(100,
      newMetrics.socialWelfare +
      (currentPolicies.socialPrograms - 50) * 0.2 +
      (50 - newMetrics.unemployment) * 0.1 +
      (50 - newMetrics.inequality) * 0.1
    ));

    // Public Debt - influenced by spending and taxes
    newMetrics.publicDebt = Math.max(0, Math.min(100,
      newMetrics.publicDebt +
      (currentPolicies.publicSpending - currentPolicies.taxRate) * 0.15
    ));

    // Happiness - composite of other metrics
    newMetrics.happiness = Math.max(0, Math.min(100,
      (newMetrics.gdp * 0.2 +
       (100 - newMetrics.unemployment) * 0.25 +
       (100 - newMetrics.inequality) * 0.2 +
       newMetrics.environmentalHealth * 0.15 +
       newMetrics.socialWelfare * 0.2)
    ));

    return newMetrics;
  };

  const applyPolicies = () => {
    const newMetrics = calculateMetrics(policies, metrics);
    setMetrics(newMetrics);
    setTurn(turn + 1);
    setHistory(prev => [...prev, { ...newMetrics, turn: turn + 1 }]);
  };

  const startScenario = (scenario: EconomicScenario) => {
    setSelectedScenario(scenario);
    setMetrics(scenario.initialMetrics);
    setTurn(0);
    setHistory([{ ...scenario.initialMetrics, turn: 0 }]);
    setGameStarted(true);
  };

  const resetSimulation = () => {
    setSelectedScenario(null);
    setGameStarted(false);
    setTurn(0);
    setHistory([]);
    setPolicies({
      taxRate: 50,
      publicSpending: 50,
      minimumWage: 50,
      environmentalRegulation: 50,
      socialPrograms: 50,
      monetaryPolicy: 50
    });
  };

  const getMetricColor = (value: number, inverted = false) => {
    if (inverted) {
      if (value > 70) return 'text-red-500';
      if (value > 40) return 'text-yellow-500';
      return 'text-green-500';
    } else {
      if (value > 70) return 'text-green-500';
      if (value > 40) return 'text-yellow-500';
      return 'text-red-500';
    }
  };

  const getMetricIcon = (value: number, inverted = false) => {
    const isGood = inverted ? value < 40 : value > 70;
    return isGood ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  if (!gameStarted) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Economia em Ação</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Experimente diferentes políticas econômicas e observe suas consequências na sociedade.
            Cada cenário apresenta desafios únicos baseados em situações históricas reais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {scenarios.map((scenario) => (
            <Card key={scenario.id} className="cursor-pointer transition-all hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">{scenario.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {scenario.description}
                </p>
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium text-sm">Principais Desafios:</h4>
                  {scenario.challenges.map((challenge, index) => (
                    <Badge key={index} variant="secondary" className="text-xs mr-1">
                      {challenge}
                    </Badge>
                  ))}
                </div>
                <Button 
                  onClick={() => startScenario(scenario)}
                  className="w-full"
                >
                  Iniciar Cenário
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{selectedScenario?.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">Turno {turn}</p>
        </div>
        <Button variant="outline" onClick={resetSimulation}>
          Resetar Simulação
        </Button>
      </div>

      <Tabs defaultValue="metrics" className="space-y-6">
        <TabsList>
          <TabsTrigger value="metrics">Métricas</TabsTrigger>
          <TabsTrigger value="policies">Políticas</TabsTrigger>
          <TabsTrigger value="history">Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-6">
          {/* Key Metrics Dashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">PIB</p>
                    <p className={`text-2xl font-bold ${getMetricColor(metrics.gdp)}`}>
                      {metrics.gdp.toFixed(0)}%
                    </p>
                  </div>
                  <BarChart3 className="h-8 w-8 text-blue-500" />
                </div>
                <Progress value={metrics.gdp} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Desemprego</p>
                    <p className={`text-2xl font-bold ${getMetricColor(metrics.unemployment, true)}`}>
                      {metrics.unemployment.toFixed(0)}%
                    </p>
                  </div>
                  <Users className="h-8 w-8 text-red-500" />
                </div>
                <Progress value={metrics.unemployment} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Desigualdade</p>
                    <p className={`text-2xl font-bold ${getMetricColor(metrics.inequality, true)}`}>
                      {metrics.inequality.toFixed(0)}%
                    </p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-yellow-500" />
                </div>
                <Progress value={metrics.inequality} className="mt-2" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Bem-estar</p>
                    <p className={`text-2xl font-bold ${getMetricColor(metrics.happiness)}`}>
                      {metrics.happiness.toFixed(0)}%
                    </p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500" />
                </div>
                <Progress value={metrics.happiness} className="mt-2" />
              </CardContent>
            </Card>
          </div>

          {/* Detailed Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Indicadores Econômicos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Inflação</span>
                  <span className={getMetricColor(metrics.inflation, true)}>
                    {metrics.inflation.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Dívida Pública</span>
                  <span className={getMetricColor(metrics.publicDebt, true)}>
                    {metrics.publicDebt.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Bem-estar Social</span>
                  <span className={getMetricColor(metrics.socialWelfare)}>
                    {metrics.socialWelfare.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Saúde Ambiental</span>
                  <span className={getMetricColor(metrics.environmentalHealth)}>
                    {metrics.environmentalHealth.toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Análise de Impacto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.unemployment > 20 && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                        Alto desemprego pode causar instabilidade social
                      </p>
                    </div>
                  )}
                  {metrics.inequality > 60 && (
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <AlertTriangle className="inline h-4 w-4 mr-1" />
                        Desigualdade elevada reduz coesão social
                      </p>
                    </div>
                  )}
                  {metrics.environmentalHealth < 30 && (
                    <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded">
                      <p className="text-sm text-red-800 dark:text-red-200">
                        <Leaf className="inline h-4 w-4 mr-1" />
                        Degradação ambiental severa
                      </p>
                    </div>
                  )}
                  {metrics.happiness > 70 && (
                    <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded">
                      <p className="text-sm text-green-800 dark:text-green-200">
                        <TrendingUp className="inline h-4 w-4 mr-1" />
                        População satisfeita com as políticas atuais
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="policies" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Política Fiscal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Taxa de Impostos</span>
                    <span>{policies.taxRate}%</span>
                  </div>
                  <Slider
                    value={[policies.taxRate]}
                    onValueChange={(value) => setPolicies(prev => ({ ...prev, taxRate: value[0] }))}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Impostos altos reduzem desigualdade mas podem prejudicar o crescimento
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Gastos Públicos</span>
                    <span>{policies.publicSpending}%</span>
                  </div>
                  <Slider
                    value={[policies.publicSpending]}
                    onValueChange={(value) => setPolicies(prev => ({ ...prev, publicSpending: value[0] }))}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Gastos altos estimulam a economia mas aumentam a dívida pública
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Política Monetária</span>
                    <span>{policies.monetaryPolicy > 50 ? 'Expansiva' : 'Restritiva'}</span>
                  </div>
                  <Slider
                    value={[policies.monetaryPolicy]}
                    onValueChange={(value) => setPolicies(prev => ({ ...prev, monetaryPolicy: value[0] }))}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Política expansiva estimula crescimento mas pode causar inflação
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Política Social</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Salário Mínimo</span>
                    <span>{policies.minimumWage}%</span>
                  </div>
                  <Slider
                    value={[policies.minimumWage]}
                    onValueChange={(value) => setPolicies(prev => ({ ...prev, minimumWage: value[0] }))}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Salário mínimo alto reduz desigualdade mas pode aumentar desemprego
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Programas Sociais</span>
                    <span>{policies.socialPrograms}%</span>
                  </div>
                  <Slider
                    value={[policies.socialPrograms]}
                    onValueChange={(value) => setPolicies(prev => ({ ...prev, socialPrograms: value[0] }))}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Programas sociais melhoram bem-estar mas requerem recursos públicos
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span>Regulação Ambiental</span>
                    <span>{policies.environmentalRegulation}%</span>
                  </div>
                  <Slider
                    value={[policies.environmentalRegulation]}
                    onValueChange={(value) => setPolicies(prev => ({ ...prev, environmentalRegulation: value[0] }))}
                    max={100}
                    step={1}
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Regulação ambiental protege o meio ambiente mas pode reduzir crescimento
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="text-center">
            <Button onClick={applyPolicies} size="lg" className="gap-2">
              <DollarSign className="h-5 w-5" />
              Aplicar Políticas (Próximo Turno)
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evolução Histórica</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={history}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="turn" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="gdp" stroke="#3b82f6" name="PIB" />
                    <Line type="monotone" dataKey="unemployment" stroke="#ef4444" name="Desemprego" />
                    <Line type="monotone" dataKey="happiness" stroke="#10b981" name="Bem-estar" />
                    <Line type="monotone" dataKey="inequality" stroke="#f59e0b" name="Desigualdade" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EconomicSimulator;
