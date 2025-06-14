
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Network, 
  BookOpen, 
  ArrowRight, 
  Users, 
  Globe,
  Zap,
  Clock
} from 'lucide-react';

interface IdeologyNode {
  id: string;
  name: string;
  description: string;
  position: { x: number; y: number };
  color: string;
  concepts: string[];
  connections: string[];
  historicalEvents: {
    year: string;
    event: string;
    description: string;
  }[];
}

const ideologyNodes: IdeologyNode[] = [
  {
    id: 'marxism',
    name: 'Marxismo',
    description: 'Análise materialista da história baseada na luta de classes e crítica ao capitalismo.',
    position: { x: 20, y: 40 },
    color: 'bg-red-500',
    concepts: ['Luta de classes', 'Mais-valia', 'Materialismo histórico', 'Alienação'],
    connections: ['socialism', 'anarchism', 'social-democracy'],
    historicalEvents: [
      { year: '1848', event: 'Manifesto Comunista', description: 'Marx e Engels publicam o manifesto que define os princípios do comunismo.' },
      { year: '1867', event: 'O Capital', description: 'Marx publica sua análise crítica do capitalismo.' },
      { year: '1917', event: 'Revolução Russa', description: 'Primeira tentativa de implementação de um estado socialista.' }
    ]
  },
  {
    id: 'liberalism',
    name: 'Liberalismo',
    description: 'Defesa da liberdade individual, direitos naturais e economia de mercado.',
    position: { x: 80, y: 30 },
    color: 'bg-blue-500',
    concepts: ['Liberdade individual', 'Direitos naturais', 'Estado mínimo', 'Mercado livre'],
    connections: ['neoliberalism', 'libertarianism'],
    historicalEvents: [
      { year: '1776', event: 'A Riqueza das Nações', description: 'Adam Smith estabelece os fundamentos da economia liberal.' },
      { year: '1789', event: 'Revolução Francesa', description: 'Ideais liberais influenciam a transformação política.' },
      { year: '1989', event: 'Consenso de Washington', description: 'Políticas neoliberais se tornam hegemônicas globalmente.' }
    ]
  },
  {
    id: 'conservadorism',
    name: 'Conservadorismo',
    description: 'Preservação de tradições, instituições e mudança gradual.',
    position: { x: 70, y: 70 },
    color: 'bg-purple-500',
    concepts: ['Tradição', 'Ordem social', 'Mudança gradual', 'Autoridade'],
    connections: ['liberalism', 'fascism'],
    historicalEvents: [
      { year: '1790', event: 'Reflexões sobre a Revolução Francesa', description: 'Burke critica os excessos revolucionários.' },
      { year: '1980', event: 'Era Reagan-Thatcher', description: 'Conservadorismo moderno ganha força política.' }
    ]
  },
  {
    id: 'anarchism',
    name: 'Anarquismo',
    description: 'Abolição do Estado e de todas as formas de dominação hierárquica.',
    position: { x: 30, y: 20 },
    color: 'bg-black',
    concepts: ['Autogestão', 'Ação direta', 'Abolição do Estado', 'Apoio mútuo'],
    connections: ['marxism', 'socialism'],
    historicalEvents: [
      { year: '1840', event: 'O que é a Propriedade?', description: 'Proudhon questiona a legitimidade da propriedade privada.' },
      { year: '1936', event: 'Guerra Civil Espanhola', description: 'Anarquistas implementam experiências de autogestão.' }
    ]
  },
  {
    id: 'socialism',
    name: 'Socialismo',
    description: 'Propriedade coletiva dos meios de produção e igualdade social.',
    position: { x: 25, y: 60 },
    color: 'bg-orange-500',
    concepts: ['Propriedade coletiva', 'Planejamento econômico', 'Igualdade social', 'Solidariedade'],
    connections: ['marxism', 'social-democracy', 'anarchism'],
    historicalEvents: [
      { year: '1871', event: 'Comuna de Paris', description: 'Primeira experiência de governo operário da história.' },
      { year: '1945', event: 'Pós-guerra', description: 'Expansão do Estado de bem-estar social na Europa.' }
    ]
  },
  {
    id: 'social-democracy',
    name: 'Social-democracia',
    description: 'Reforma gradual do capitalismo através da democracia.',
    position: { x: 50, y: 50 },
    color: 'bg-pink-500',
    concepts: ['Reforma gradual', 'Estado de bem-estar', 'Democracia', 'Economia mista'],
    connections: ['socialism', 'liberalism', 'marxism'],
    historicalEvents: [
      { year: '1889', event: 'Segunda Internacional', description: 'Partidos socialistas se organizam internacionalmente.' },
      { year: '1945', event: 'Modelo nórdico', description: 'Países escandinavos desenvolvem o welfare state.' }
    ]
  }
];

const InteractiveIdeologyMap = () => {
  const [selectedNode, setSelectedNode] = useState<IdeologyNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [showConnections, setShowConnections] = useState(true);

  const getConnectionPath = (from: IdeologyNode, to: IdeologyNode) => {
    const dx = to.position.x - from.position.x;
    const dy = to.position.y - from.position.y;
    const dr = Math.sqrt(dx * dx + dy * dy);
    return `M${from.position.x},${from.position.y}A${dr},${dr} 0 0,1 ${to.position.x},${to.position.y}`;
  };

  const isConnected = (nodeId: string, targetId: string) => {
    const node = ideologyNodes.find(n => n.id === nodeId);
    return node?.connections.includes(targetId) || false;
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Mapa de Conflitos Ideológicos</h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Explore as conexões entre diferentes ideologias políticas, seus conceitos fundamentais 
          e eventos históricos que moldaram o pensamento moderno.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Interactive Map */}
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Network className="h-5 w-5" />
                Mapa Interativo
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowConnections(!showConnections)}
                  className="ml-auto"
                >
                  {showConnections ? 'Ocultar' : 'Mostrar'} Conexões
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="relative w-full h-[500px] bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                <svg className="absolute inset-0 w-full h-full">
                  {/* Render connections */}
                  {showConnections && ideologyNodes.map(node => 
                    node.connections.map(connectionId => {
                      const targetNode = ideologyNodes.find(n => n.id === connectionId);
                      if (!targetNode) return null;
                      
                      const isHighlighted = selectedNode?.id === node.id || selectedNode?.id === connectionId;
                      
                      return (
                        <path
                          key={`${node.id}-${connectionId}`}
                          d={getConnectionPath(
                            { ...node, position: { x: node.position.x * 5, y: node.position.y * 4 } },
                            { ...targetNode, position: { x: targetNode.position.x * 5, y: targetNode.position.y * 4 } }
                          )}
                          stroke={isHighlighted ? '#3b82f6' : '#d1d5db'}
                          strokeWidth={isHighlighted ? 2 : 1}
                          fill="none"
                          opacity={isHighlighted ? 0.8 : 0.3}
                        />
                      );
                    })
                  )}
                </svg>

                {/* Render nodes */}
                {ideologyNodes.map(node => (
                  <div
                    key={node.id}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 ${
                      selectedNode?.id === node.id ? 'scale-110 z-10' : 'hover:scale-105'
                    }`}
                    style={{
                      left: `${node.position.x}%`,
                      top: `${node.position.y}%`
                    }}
                    onClick={() => setSelectedNode(node)}
                    onMouseEnter={() => setHoveredNode(node.id)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    <div className={`w-16 h-16 rounded-full ${node.color} flex items-center justify-center text-white font-bold shadow-lg border-4 ${
                      selectedNode?.id === node.id ? 'border-yellow-400' : 'border-white'
                    }`}>
                      {node.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div className="text-xs text-center mt-1 font-medium">
                      {node.name}
                    </div>
                    
                    {hoveredNode === node.id && (
                      <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white p-2 rounded text-xs w-48 z-20">
                        {node.description}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Panel */}
        <div className="space-y-4">
          {selectedNode ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full ${selectedNode.color}`}></div>
                    {selectedNode.name}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {selectedNode.description}
                  </p>
                  
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        Conceitos-chave
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedNode.concepts.map(concept => (
                          <Badge key={concept} variant="secondary" className="text-xs">
                            {concept}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-1">
                        <Network className="h-4 w-4" />
                        Conexões
                      </h4>
                      <div className="space-y-1">
                        {selectedNode.connections.map(connId => {
                          const connectedNode = ideologyNodes.find(n => n.id === connId);
                          return connectedNode ? (
                            <Button
                              key={connId}
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start h-auto p-2"
                              onClick={() => setSelectedNode(connectedNode)}
                            >
                              <div className={`w-3 h-3 rounded-full ${connectedNode.color} mr-2`}></div>
                              <span className="text-sm">{connectedNode.name}</span>
                              <ArrowRight className="h-3 w-3 ml-auto" />
                            </Button>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Eventos Históricos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-60">
                    <div className="space-y-3">
                      {selectedNode.historicalEvents.map((event, index) => (
                        <div key={index} className="border-l-2 border-primary pl-3">
                          <div className="font-medium text-sm">{event.year} - {event.event}</div>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                            {event.description}
                          </p>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Globe className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="font-medium mb-2">Selecione uma Ideologia</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Clique em qualquer nó do mapa para explorar seus conceitos e conexões históricas.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Comparação de Perspectivas
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Use este mapa para entender como diferentes tradições de pensamento abordam questões similares 
            e como eventos históricos são interpretados de maneiras distintas por cada perspectiva ideológica.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <Zap className="h-8 w-8 mx-auto text-blue-500 mb-2" />
              <div className="text-sm font-medium">Conectividade</div>
              <div className="text-xs text-gray-500">Explore relações</div>
            </div>
            <div>
              <Clock className="h-8 w-8 mx-auto text-green-500 mb-2" />
              <div className="text-sm font-medium">História</div>
              <div className="text-xs text-gray-500">Contexto temporal</div>
            </div>
            <div>
              <BookOpen className="h-8 w-8 mx-auto text-purple-500 mb-2" />
              <div className="text-sm font-medium">Conceitos</div>
              <div className="text-xs text-gray-500">Ideias fundamentais</div>
            </div>
            <div>
              <Network className="h-8 w-8 mx-auto text-orange-500 mb-2" />
              <div className="text-sm font-medium">Influências</div>
              <div className="text-xs text-gray-500">Impactos mútuos</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InteractiveIdeologyMap;
