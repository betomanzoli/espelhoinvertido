
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  TrendingUp, 
  AlertTriangle, 
  Coins, 
  Clock,
  BookOpen
} from 'lucide-react';
import { toast } from 'sonner';

interface GameState {
  socialTension: number;
  economicResources: number;
  popularSupport: number;
  militaryLoyalty: number;
  internationalSupport: number;
  turn: number;
  events: string[];
  isGameOver: boolean;
  outcome: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  choices: {
    text: string;
    effects: Partial<GameState>;
    consequence: string;
  }[];
}

const historicalEvents: Event[] = [
  {
    id: 'bread_shortage',
    title: 'Escassez de Pão',
    description: 'As padarias estão vazias e o povo está com fome. As manifestações começam nas ruas.',
    choices: [
      {
        text: 'Distribuir reservas de grãos do estado',
        effects: { economicResources: -15, popularSupport: 20, socialTension: -10 },
        consequence: 'O povo agradece, mas os recursos do estado diminuem.'
      },
      {
        text: 'Reprimir as manifestações',
        effects: { socialTension: 25, popularSupport: -20, militaryLoyalty: 10 },
        consequence: 'A ordem é mantida pela força, mas o descontentamento cresce.'
      },
      {
        text: 'Negociar com comerciantes',
        effects: { economicResources: -5, popularSupport: 10, socialTension: -5 },
        consequence: 'Uma solução moderada que ameniza a situação temporariamente.'
      }
    ]
  },
  {
    id: 'military_revolt',
    title: 'Revolta Militar',
    description: 'Parte do exército questiona suas ordens. Alguns regimentos se recusam a obedecer.',
    choices: [
      {
        text: 'Purgar oficiais desleais',
        effects: { militaryLoyalty: 15, socialTension: 10, popularSupport: -10 },
        consequence: 'O controle militar é restaurado, mas com medo e ressentimento.'
      },
      {
        text: 'Negociar com os revoltosos',
        effects: { militaryLoyalty: -5, popularSupport: 15, socialTension: -5 },
        consequence: 'Concessões são feitas, mas a disciplina militar enfraquece.'
      },
      {
        text: 'Apelar para a lealdade patriótica',
        effects: { militaryLoyalty: 10, internationalSupport: 5 },
        consequence: 'O apelo funciona parcialmente, mas divisões permanecem.'
      }
    ]
  },
  {
    id: 'international_pressure',
    title: 'Pressão Internacional',
    description: 'Potências estrangeiras ameaçam intervir se a situação não se estabilizar.',
    choices: [
      {
        text: 'Aceitar mediação internacional',
        effects: { internationalSupport: 20, popularSupport: -15, socialTension: 5 },
        consequence: 'A ajuda externa chega, mas há questionamentos sobre soberania.'
      },
      {
        text: 'Rejeitar interferência externa',
        effects: { internationalSupport: -20, popularSupport: 10, socialTension: 10 },
        consequence: 'O nacionalismo se fortalece, mas o isolamento aumenta.'
      },
      {
        text: 'Buscar alianças estratégicas',
        effects: { internationalSupport: 10, economicResources: 5 },
        consequence: 'Novos parceiros surgem, mas com condições específicas.'
      }
    ]
  }
];

const RevolutionSimulator = () => {
  const [gameState, setGameState] = useState<GameState>({
    socialTension: 30,
    economicResources: 50,
    popularSupport: 40,
    militaryLoyalty: 60,
    internationalSupport: 50,
    turn: 1,
    events: [],
    isGameOver: false,
    outcome: ''
  });

  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const checkGameEnd = (state: GameState) => {
    if (state.socialTension >= 100) {
      return { isOver: true, outcome: 'Revolução completa! O antigo regime foi derrubado pela pressão popular.' };
    }
    if (state.popularSupport <= 0) {
      return { isOver: true, outcome: 'O regime caiu por falta de apoio popular. Uma nova ordem emerge.' };
    }
    if (state.militaryLoyalty <= 0) {
      return { isOver: true, outcome: 'Golpe militar! As forças armadas tomaram o controle.' };
    }
    if (state.economicResources <= 0) {
      return { isOver: true, outcome: 'Colapso econômico! O estado não consegue mais funcionar.' };
    }
    if (state.turn >= 10) {
      return { isOver: true, outcome: 'O regime conseguiu se estabilizar e as tensões diminuíram.' };
    }
    return { isOver: false, outcome: '' };
  };

  const generateRandomEvent = () => {
    const randomEvent = historicalEvents[Math.floor(Math.random() * historicalEvents.length)];
    setCurrentEvent(randomEvent);
  };

  const handleChoice = (choice: Event['choices'][0]) => {
    const newState = { ...gameState };
    
    // Aplicar efeitos da escolha
    Object.keys(choice.effects).forEach(key => {
      if (key in newState) {
        (newState as any)[key] = Math.max(0, Math.min(100, (newState as any)[key] + (choice.effects as any)[key]));
      }
    });

    newState.turn += 1;
    newState.events.push(`Turno ${gameState.turn}: ${choice.consequence}`);

    // Verificar fim de jogo
    const endCheck = checkGameEnd(newState);
    if (endCheck.isOver) {
      newState.isGameOver = true;
      newState.outcome = endCheck.outcome;
      toast.success('Jogo finalizado!', {
        description: endCheck.outcome
      });
    }

    setGameState(newState);
    setCurrentEvent(null);

    // Gerar próximo evento se o jogo continuar
    if (!endCheck.isOver) {
      setTimeout(() => {
        generateRandomEvent();
      }, 2000);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameState({
      socialTension: 30,
      economicResources: 50,
      popularSupport: 40,
      militaryLoyalty: 60,
      internationalSupport: 50,
      turn: 1,
      events: ['Jogo iniciado: França, 1789. As tensões sociais estão crescendo...'],
      isGameOver: false,
      outcome: ''
    });
    
    setTimeout(() => {
      generateRandomEvent();
    }, 1000);
  };

  const resetGame = () => {
    setGameStarted(false);
    setCurrentEvent(null);
    setGameState({
      socialTension: 30,
      economicResources: 50,
      popularSupport: 40,
      militaryLoyalty: 60,
      internationalSupport: 50,
      turn: 1,
      events: [],
      isGameOver: false,
      outcome: ''
    });
  };

  if (!gameStarted) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="text-center">
          <CardHeader>
            <CardTitle className="text-2xl mb-4">Simulador de Revoluções</CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie as tensões sociais, econômicas e políticas de uma sociedade em crise.
              Suas decisões determinarão o destino da revolução.
            </p>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Como Jogar:</h3>
              <ul className="text-sm text-left space-y-1">
                <li>• Monitore as métricas de tensão social, recursos econômicos, apoio popular e lealdade militar</li>
                <li>• Responda aos eventos históricos fazendo escolhas estratégicas</li>
                <li>• Cada decisão afeta múltiplas variáveis do sistema</li>
                <li>• O jogo termina quando uma métrica atinge valores extremos ou após 10 turnos</li>
              </ul>
            </div>
            <Button onClick={startGame} size="lg" className="gap-2">
              <Users className="h-5 w-5" />
              Iniciar Simulação
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Status Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              Tensão Social
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{gameState.socialTension}%</div>
              <Progress value={gameState.socialTension} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Coins className="h-4 w-4 text-yellow-500" />
              Recursos
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{gameState.economicResources}%</div>
              <Progress value={gameState.economicResources} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Users className="h-4 w-4 text-blue-500" />
              Apoio Popular
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{gameState.popularSupport}%</div>
              <Progress value={gameState.popularSupport} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Militar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="text-2xl font-bold">{gameState.militaryLoyalty}%</div>
              <Progress value={gameState.militaryLoyalty} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-1">
              <Clock className="h-4 w-4 text-purple-500" />
              Turno {gameState.turn}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              <Badge variant="outline">Internacional: {gameState.internationalSupport}%</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Event */}
      {currentEvent && !gameState.isGameOver && (
        <Card className="border-2 border-primary">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              {currentEvent.title}
            </CardTitle>
            <p className="text-gray-600 dark:text-gray-400">
              {currentEvent.description}
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentEvent.choices.map((choice, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4"
                  onClick={() => handleChoice(choice)}
                >
                  <div>
                    <div className="font-medium">{choice.text}</div>
                    <div className="text-sm text-gray-500 mt-1">{choice.consequence}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Game Over Screen */}
      {gameState.isGameOver && (
        <Card className="border-2 border-green-500">
          <CardHeader>
            <CardTitle className="text-center text-xl">Simulação Finalizada</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg">{gameState.outcome}</p>
            <div className="flex justify-center gap-4">
              <Button onClick={resetGame}>
                Jogar Novamente
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Event History */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Cronologia dos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {gameState.events.map((event, index) => (
              <div key={index} className="text-sm p-2 bg-gray-50 dark:bg-gray-800 rounded">
                {event}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RevolutionSimulator;
