
import { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Network, History, Zap } from 'lucide-react';

interface ConceptNode extends Node {
  data: {
    label: string;
    category: 'marxista' | 'contemporaneo' | 'digital';
    description: string;
    year?: number;
  };
}

const initialNodes: ConceptNode[] = [
  {
    id: 'mais-valia',
    type: 'default',
    position: { x: 250, y: 0 },
    data: {
      label: 'Mais-Valia',
      category: 'marxista',
      description: 'Valor excedente apropriado pelo capitalista do trabalho do operário',
      year: 1848
    },
    style: { backgroundColor: '#fee2e2', borderColor: '#dc2626' }
  },
  {
    id: 'uberizacao',
    type: 'default',
    position: { x: 100, y: 150 },
    data: {
      label: 'Uberização',
      category: 'contemporaneo',
      description: 'Precarização do trabalho através de plataformas digitais',
      year: 2010
    },
    style: { backgroundColor: '#e0f2fe', borderColor: '#0277bd' }
  },
  {
    id: 'algoritmos',
    type: 'default',
    position: { x: 400, y: 150 },
    data: {
      label: 'Algoritmos de Preço',
      category: 'digital',
      description: 'Sistemas automatizados que determinam valor e distribuição',
      year: 2020
    },
    style: { backgroundColor: '#f3e5f5', borderColor: '#7b1fa2' }
  },
  {
    id: 'alienacao',
    type: 'default',
    position: { x: 0, y: 300 },
    data: {
      label: 'Alienação',
      category: 'marxista',
      description: 'Perda de controle do trabalhador sobre sua atividade produtiva',
      year: 1844
    },
    style: { backgroundColor: '#fee2e2', borderColor: '#dc2626' }
  },
  {
    id: 'dados-pessoais',
    type: 'default',
    position: { x: 200, y: 300 },
    data: {
      label: 'Commodificação de Dados',
      category: 'digital',
      description: 'Transformação de informações pessoais em mercadoria',
      year: 2015
    },
    style: { backgroundColor: '#f3e5f5', borderColor: '#7b1fa2' }
  },
  {
    id: 'gig-economy',
    type: 'default',
    position: { x: 400, y: 300 },
    data: {
      label: 'Gig Economy',
      category: 'contemporaneo',
      description: 'Economia baseada em trabalhos temporários e freelancing',
      year: 2008
    },
    style: { backgroundColor: '#e0f2fe', borderColor: '#0277bd' }
  }
];

const initialEdges: Edge[] = [
  {
    id: 'mais-valia-uberizacao',
    source: 'mais-valia',
    target: 'uberizacao',
    label: 'manifesta-se como',
    type: 'smoothstep',
    style: { stroke: '#dc2626' }
  },
  {
    id: 'mais-valia-algoritmos',
    source: 'mais-valia',
    target: 'algoritmos',
    label: 'automatizada por',
    type: 'smoothstep',
    style: { stroke: '#7b1fa2' }
  },
  {
    id: 'alienacao-dados',
    source: 'alienacao',
    target: 'dados-pessoais',
    label: 'digitalizada como',
    type: 'smoothstep',
    style: { stroke: '#0277bd' }
  },
  {
    id: 'uberizacao-gig',
    source: 'uberizacao',
    target: 'gig-economy',
    label: 'parte de',
    type: 'smoothstep',
    style: { stroke: '#0277bd' }
  }
];

const ConceptMap = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<ConceptNode | null>(null);
  const [timelineYear, setTimelineYear] = useState(2025);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onNodeClick = useCallback((event: React.MouseEvent, node: Node) => {
    setSelectedNode(node as ConceptNode);
  }, []);

  const filteredNodesByYear = nodes.filter(node => 
    !node.data.year || node.data.year <= timelineYear
  );

  const resetView = () => {
    setNodes(initialNodes);
    setEdges(initialEdges);
    setSelectedNode(null);
    setTimelineYear(2025);
  };

  return (
    <div className="w-full space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Network className="h-5 w-5" />
            Laboratório Dialético - Mapa Conceitual
          </CardTitle>
          <CardDescription>
            Explore as conexões entre conceitos marxistas e manifestações contemporâneas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4" />
              <span className="text-sm">Timeline:</span>
              <input
                type="range"
                min="1840"
                max="2025"
                value={timelineYear}
                onChange={(e) => setTimelineYear(parseInt(e.target.value))}
                className="w-32"
              />
              <span className="text-sm font-mono">{timelineYear}</span>
            </div>
            <Button variant="outline" size="sm" onClick={resetView}>
              <Zap className="h-4 w-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-96">
            <CardContent className="p-0 h-full">
              <ReactFlow
                nodes={filteredNodesByYear}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                fitView
                style={{ backgroundColor: '#f8fafc' }}
              >
                <Controls />
                <MiniMap />
                <Background gap={12} size={1} />
              </ReactFlow>
            </CardContent>
          </Card>
        </div>

        <div>
          {selectedNode ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant={
                    selectedNode.data.category === 'marxista' ? 'destructive' :
                    selectedNode.data.category === 'digital' ? 'secondary' : 'default'
                  }>
                    {selectedNode.data.category}
                  </Badge>
                  {selectedNode.data.label}
                </CardTitle>
                {selectedNode.data.year && (
                  <CardDescription>Origem: {selectedNode.data.year}</CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {selectedNode.data.description}
                </p>
                
                <Tabs defaultValue="rafael" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="rafael">Rafael</TabsTrigger>
                    <TabsTrigger value="luisa">Luísa</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="rafael" className="space-y-2">
                    <div className="p-3 bg-red-50 dark:bg-red-950/20 rounded-lg">
                      <p className="text-sm">
                        "Este conceito ilustra as contradições fundamentais do modo de produção capitalista, 
                        evidenciando como as relações de exploração se perpetuam através de novas formas..."
                      </p>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="luisa" className="space-y-2">
                    <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                      <p className="text-sm">
                        "Na prática, isso se manifesta através de plataformas digitais que socializam custos 
                        e riscos enquanto privatizam lucros, criando novas formas de precarização..."
                      </p>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Legenda</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <Badge variant="destructive">Marxista</Badge>
                  <span className="text-sm">Conceitos originais do século XIX</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="default">Contemporâneo</Badge>
                  <span className="text-sm">Manifestações atuais</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary">Digital</Badge>
                  <span className="text-sm">Fenômenos da era digital</span>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Clique em um conceito para ver as perspectivas de Rafael e Luísa
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConceptMap;
