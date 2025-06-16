
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, History, Newspaper, Swords } from 'lucide-react';
import { RAFAEL, LUISA } from '@/data/personas';
import { SubstackPost } from '@/services/substackService';

interface TripleContentViewProps {
  post: SubstackPost;
}

interface PostMode {
  persona?: string;
  icon: string;
  color: string;
  title: string;
  description: string;
}

const PostModes: Record<string, PostMode> = {
  historical: { 
    persona: "Rafael", 
    icon: "🏛️", 
    color: "#8B0000",
    title: "Perspectiva Histórico-Filosófica",
    description: "Análise contextual e teórica"
  },
  practical: { 
    persona: "Luísa", 
    icon: "📊", 
    color: "#000080",
    title: "Análise Prático-Digital",
    description: "Aplicações contemporâneas"
  },
  debate: { 
    icon: "⚔️", 
    color: "#800080",
    title: "Síntese Dialética",
    description: "Debate entre perspectivas"
  }
};

const TripleContentView = ({ post }: TripleContentViewProps) => {
  const [activeMode, setActiveMode] = useState('original');

  const generateHistoricalPerspective = (content: string) => {
    return `A partir de uma leitura materialista histórica, este texto evidencia as contradições inerentes ao modo de produção capitalista contemporâneo. 

As dinâmicas descritas ecoam as análises de Marx sobre a tendência decrescente da taxa de lucro e a necessidade constante do capital de encontrar novas fronteiras de acumulação.

**Contexto Histórico:**
O fenômeno analisado pode ser compreendido como uma manifestação específica das leis gerais do desenvolvimento capitalista, particularmente visível no atual estágio de financeirização e digitalização da economia.

**Implicações Teóricas:**
Observamos aqui uma confirmação empírica dos prognósticos marxistas sobre a socialização crescente da produção em contradição com a apropriação privada dos resultados.`;
  };

  const generatePracticalPerspective = (content: string) => {
    return `Observando as manifestações concretas contemporâneas, identificamos padrões que se repetem em diversos setores da economia digital.

**Análise de Dados:**
- Concentração de mercado: 3-5 empresas controlam 80% do tráfego
- Precarização laboral: 67% dos trabalhadores de plataforma sem direitos trabalhistas
- Extração de valor: 30-40% de comissão média das plataformas

**Exemplos Práticos:**
• **Uber/99**: Transferência de custos operacionais para motoristas
• **iFood/Rappi**: Socialização de riscos, privatização de lucros
• **Amazon/Mercado Livre**: Monopolização de infraestrutura digital

**Impacto Social:**
A digitalização não eliminou as contradições de classe, apenas as reconfigurou através de algoritmos e interfaces aparentemente neutras.`;
  };

  const generateDebateSynthesis = (content: string) => {
    return `**Rafael** inicia observando que "as plataformas digitais representam uma nova fase da subsunção real do trabalho ao capital, onde a própria sociabilidade se torna produtiva."

**Luísa** complementa: "Exato, mas é importante ver como isso acontece na prática. O algoritmo do Uber, por exemplo, funciona como um supervisor digital que nunca dorme - monitora, avalia e disciplina sem precisar de um chefe humano."

**Rafael** aprofunda: "Isso confirma a previsão de Marx sobre a tendência do capital de substituir trabalho vivo por trabalho morto. Só que agora o 'trabalho morto' são algoritmos que controlam trabalho vivo."

**Luísa** questiona: "Mas há também resistências. Vemos greves de entregadores, hackeamento de algoritmos, criação de cooperativas digitais. A questão é: essas táticas podem se transformar em estratégia?"

**Síntese Propositiva:**
Ambos concordam que a tecnologia em si não é neutra, mas suas potencialidades emancipatórias só se realizam através de lutas sociais concretas que disputem tanto o controle técnico quanto a propriedade dos meios de produção digitais.`;
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            <CardDescription className="line-clamp-2">{post.subtitle}</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="original" className="gap-1">
              <Newspaper className="h-4 w-4" />
              Original
            </TabsTrigger>
            <TabsTrigger value="historical" className="gap-1">
              <History className="h-4 w-4" />
              {PostModes.historical.icon} Rafael
            </TabsTrigger>
            <TabsTrigger value="practical" className="gap-1">
              📊 Luísa
            </TabsTrigger>
            <TabsTrigger value="debate" className="gap-1">
              <Swords className="h-4 w-4" />
              Debate
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="original" className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: post.content || post.description 
                }} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="historical" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{RAFAEL.avatar}</span>
              <div>
                <h4 className="font-semibold" style={{ color: RAFAEL.color }}>
                  {PostModes.historical.title}
                </h4>
                <p className="text-sm text-gray-500">{PostModes.historical.description}</p>
              </div>
            </div>
            
            <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ 
                  __html: generateHistoricalPerspective(post.content || post.description).replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/• /g, '<li>').replace(/<li>/g, '<ul><li>').replace(/<\/li>(?!.*<li>)/g, '</li></ul>')
                }} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="practical" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{LUISA.avatar}</span>
              <div>
                <h4 className="font-semibold" style={{ color: LUISA.color }}>
                  {PostModes.practical.title}
                </h4>
                <p className="text-sm text-gray-500">{PostModes.practical.description}</p>
              </div>
            </div>
            
            <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ 
                  __html: generatePracticalPerspective(post.content || post.description).replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/• /g, '<li>').replace(/<li>/g, '<ul><li>').replace(/<\/li>(?!.*<li>)/g, '</li></ul>')
                }} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="debate" className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">⚔️</span>
              <div>
                <h4 className="font-semibold" style={{ color: PostModes.debate.color }}>
                  {PostModes.debate.title}
                </h4>
                <p className="text-sm text-gray-500">{PostModes.debate.description}</p>
              </div>
            </div>
            
            <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
              <div className="prose prose-sm max-w-none dark:prose-invert">
                <div dangerouslySetInnerHTML={{ 
                  __html: generateDebateSynthesis(post.content || post.description).replace(/\n/g, '<br/>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t">
          <Badge variant="outline" className="text-xs">
            Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Análise Dialética
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripleContentView;
