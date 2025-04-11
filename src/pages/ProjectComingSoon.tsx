
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ProjectComingSoonProps {
  title: string;
}

const ProjectComingSoon = ({ title }: ProjectComingSoonProps) => {
  const navigate = useNavigate();
  
  const getProjectDescription = () => {
    switch (title) {
      case "Simulador de Revoluções":
        return {
          description: "Um jogo de estratégia baseado em eventos históricos reais onde os jogadores experimentam as complexas dinâmicas sociais, econômicas e políticas que precedem e acompanham transformações revolucionárias.",
          features: [
            "Sistema de Classes Sociais com métricas específicas para cada classe",
            "Modelagem de consciência de classe e mobilidade social",
            "Mecânicas de Crise baseadas nas análises de Marx",
            "Eventos Históricos Documentados como a Primavera de Praga e a Comuna de Paris",
            "Modo Educacional com linha do tempo interativa e glossário contextual"
          ],
          tabs: {
            gameplay: [
              "Jogue como diferentes classes sociais com recursos e motivações únicas",
              "Tome decisões que afetam a economia e sociedade",
              "Construa alianças e gerencie conflitos sociais",
              "Experimente cenários históricos recreados com precisão"
            ],
            educational: [
              "Aprenda sobre modos de produção através de linha do tempo interativa",
              "Analise contradições sociais em tempo real",
              "Compare suas decisões com eventos históricos reais",
              "Acesse material complementar sobre cada período histórico"
            ],
            technical: [
              "Jogo baseado em navegador com interface responsiva",
              "Sistema econômico modelado com dados históricos",
              "Suporte para múltiplos idiomas",
              "Salvamento automático de progresso"
            ]
          },
          icon: "⚔️",
          substackUrl: "https://espelhoinvertido.substack.com/p/simulador-de-revolucoes"
        };
      case "Mapa de Conflitos Ideológicos":
        return {
          description: "Uma plataforma cartográfica que mapeia 'territórios ideológicos' ao longo do tempo, mostrando como diferentes perspectivas interpretam os mesmos eventos históricos.",
          features: [
            "Camadas de Narrativa que mostram contranarrativas de eventos históricos",
            "Visualização de Dados Ideológicos em mapas geográficos",
            "Ferramentas de Análise Textual para identificar termos carregados ideologicamente",
            "Estudos de Caso Interativos como a Revolução Russa com múltiplas perspectivas"
          ],
          tabs: {
            gameplay: [
              "Explore diferentes camadas de interpretação para o mesmo evento histórico",
              "Navegue por mapas de influência ideológica em diferentes épocas",
              "Descubra como narrativas hegemônicas se desenvolveram ao longo do tempo",
              "Compare fontes contraditórias sobre eventos históricos importantes"
            ],
            educational: [
              "Aprenda como eventos são moldados por perspectivas ideológicas",
              "Visualize a expansão global de correntes de pensamento político",
              "Entenda como interesses econômicos influenciam narrativas históricas",
              "Descontrua análises simplistas de eventos históricos complexos"
            ],
            technical: [
              "Mapas interativos com múltiplas camadas de informação",
              "Linha do tempo sincronizada com visualizações geográficas",
              "Integração com fontes históricas digitalizadas",
              "Interface responsiva para desktop e dispositivos móveis"
            ]
          },
          icon: "🗺️",
          substackUrl: "https://espelhoinvertido.substack.com/p/mapa-de-conflitos-ideologicos"
        };
      case "Escreva Sua Crônica":
        return {
          description: "Uma rede social literária focada na criação e compartilhamento de narrativas que exploram contradições ideológicas através de múltiplas perspectivas.",
          features: [
            "Editor de Perspectivas Múltiplas para escrever a mesma cena de diferentes pontos de vista",
            "Biblioteca de Arquétipos Sociais inspirados em figuras históricas",
            "Sistema de Desafios Narrativos semanais",
            "Comunidade e Feedback com revisão por pares e círculos de leitura virtuais"
          ],
          tabs: {
            gameplay: [
              "Escreva narrativas de ficção que exploram contradições sociais",
              "Desenvolva personagens baseados em arquétipos históricos",
              "Participe de desafios narrativos com temas políticos e sociais",
              "Receba e ofereça feedback dentro da comunidade literária"
            ],
            educational: [
              "Exercite sua capacidade de compreender perspectivas ideológicas diversas",
              "Aprenda técnicas narrativas para representar contradições sociais",
              "Explore como diferentes classes sociais percebem o mesmo evento",
              "Desenvolva empatia através de exercícios de escrita dialética"
            ],
            technical: [
              "Editor colaborativo com suporte para múltiplas perspectivas",
              "Sistema de comentários ancorados em trechos específicos do texto",
              "Análise de consistência ideológica entre diferentes perspectivas",
              "Ferramentas de publicação e compartilhamento social"
            ]
          },
          icon: "✍️",
          substackUrl: "https://espelhoinvertido.substack.com/p/escreva-sua-cronica"
        };
      case "Análise de Discurso":
        return {
          description: "Um aplicativo que utiliza processamento de linguagem natural para analisar textos políticos, econômicos e sociais, revelando suas premissas ideológicas subjacentes.",
          features: [
            "Motor de Detecção Ideológica para identificar pressupostos implícitos",
            "Ferramentas de Análise Histórica que rastreiam a evolução de conceitos políticos",
            "Sistema Educativo Progressivo para ensinar análise crítica de discurso",
            "Comparador de Fontes que mostra como diferentes veículos cobrem o mesmo evento"
          ],
          tabs: {
            gameplay: [
              "Analise textos políticos e identifique pressupostos ideológicos ocultos",
              "Compare como diferentes fontes representam o mesmo evento",
              "Rastreie a evolução histórica de conceitos políticos ao longo do tempo",
              "Desafie-se com exercícios progressivos de análise de discurso"
            ],
            educational: [
              "Aprenda técnicas de análise crítica de discurso",
              "Compreenda como a linguagem reflete e constrói relações de poder",
              "Identifique como interesses de classe moldam narrativas midiáticas",
              "Desenvolva imunidade cognitiva contra manipulação discursiva"
            ],
            technical: [
              "Motor de análise baseado em processamento de linguagem natural",
              "Banco de dados com histórico terminológico e conceitual",
              "Ferramentas de comparação textual e visual de narrativas",
              "APIs para integração com outras plataformas educacionais"
            ]
          },
          icon: "🔍",
          substackUrl: "https://espelhoinvertido.substack.com/p/analise-de-discurso"
        };
      case "Economia em Ação":
        return {
          description: "Um simulador econômico-político que permite implementar diferentes políticas e observar suas consequências em uma sociedade virtual modelada com base em dados econômicos reais.",
          features: [
            "Modelo Econômico Dialético incorporando conceitos marxistas",
            "Políticas Implementáveis inspiradas em diversas teorias econômicas",
            "Sistema de Reações Sociais que simula resistência de classe",
            "Componente Educacional com casos históricos comparativos"
          ],
          tabs: {
            gameplay: [
              "Implemente diferentes políticas econômicas e observe seus efeitos",
              "Gerencie contradições entre classes sociais e interesses econômicos",
              "Navegue por crises econômicas e sociais emergentes da simulação",
              "Compare seus resultados com casos históricos reais"
            ],
            educational: [
              "Compreenda como diferentes teorias econômicas funcionam na prática",
              "Visualize contradições internas de sistemas econômicos",
              "Aprenda sobre ciclos econômicos, crises e suas consequências sociais",
              "Explore a relação entre economia, política e lutas de classe"
            ],
            technical: [
              "Modelo econômico com equações derivadas de teorias marxistas e keynesianas",
              "Visualização dinâmica de dados e tendências econômicas",
              "Sistema de feedback que mostra consequências de curto e longo prazo",
              "Interface intuitiva com controles de política econômica e social"
            ]
          },
          icon: "📊",
          substackUrl: "https://espelhoinvertido.substack.com/p/economia-em-acao"
        };
      case "Museu Virtual das Revoluções":
        return {
          description: "Um museu virtual em formato de realidade aumentada que permite aos visitantes explorar momentos-chave de transformações revolucionárias históricas.",
          features: [
            "Reconstruções 3D de locais históricos revolucionários",
            "Acervo de documentos primários digitalizados em alta resolução",
            "Narrativas multilaterais de cada evento histórico",
            "Integração com atividades educacionais e discussões guiadas"
          ],
          tabs: {
            gameplay: [
              "Explore ambientes 3D de eventos históricos importantes",
              "Interaja com artefatos históricos digitalizados",
              "Acesse depoimentos e perspectivas de diferentes atores históricos",
              "Participe de visitas guiadas virtuais com especialistas"
            ],
            educational: [
              "Compare diferentes narrativas sobre o mesmo evento revolucionário",
              "Descubra conexões entre revoluções separadas pelo tempo e espaço",
              "Desenvolva compreensão contextual sobre transformações históricas",
              "Investigue o legado material e imaterial de processos revolucionários"
            ],
            technical: [
              "Tecnologia de visualização 3D baseada em navegador",
              "Integração com acervos digitalizados de museus reais",
              "Sistema de realidade aumentada para dispositivos móveis",
              "Plataforma colaborativa para adição de conteúdo comunitário"
            ]
          },
          icon: "🏛️",
          substackUrl: "https://espelhoinvertido.substack.com/p/museu-virtual-das-revolucoes"
        };
      case "Diálogo com Rafael e Luísa":
      case "Chat Rafael e Luísa":
        return {
          description: "Um chat interativo que simula conversas com dois personagens fictícios que discutem perspectivas ideológicas diversas, com foco especial no Manifesto Comunista e sua aplicação contemporânea.",
          features: [
            "Sistema de Personalidades Duplas que alternam conforme o tipo de pergunta",
            "Contextualização Automática de conceitos do Manifesto Comunista",
            "Modos de Interação com conversação livre ou diálogos guiados",
            "Biblioteca Referencial com acesso a trechos originais do Manifesto"
          ],
          tabs: {
            gameplay: [
              "Converse com Rafael sobre questões teóricas e históricas",
              "Dialogue com Luísa sobre aplicações práticas e exemplos contemporâneos",
              "Explore temas específicos ou faça perguntas livremente",
              "Desafie os personagens com perguntas provocativas e críticas"
            ],
            educational: [
              "Aprenda conceitos do Manifesto Comunista de forma acessível",
              "Contextualize teorias marxistas com exemplos contemporâneos",
              "Descubra conexões entre conceitos históricos e realidades atuais",
              "Desenvolva pensamento crítico sobre narrativas econômicas e políticas"
            ],
            technical: [
              "Sistema de IA treinado com abordagens pedagógicas distintas",
              "Banco de dados de referências históricas e contemporâneas",
              "Interface conversacional intuitiva e responsiva",
              "Integração com outras plataformas educacionais do projeto"
            ]
          },
          icon: "💬",
          substackUrl: "https://espelhoinvertido.substack.com/p/dialogo-com-rafael-e-luisa"
        };
      default:
        return {
          description: "Detalhes deste projeto serão divulgados em breve.",
          features: [],
          tabs: {
            gameplay: [],
            educational: [],
            technical: []
          },
          icon: "🚀",
          substackUrl: "https://espelhoinvertido.substack.com/"
        };
    }
  };
  
  const projectInfo = getProjectDescription();

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="mb-8 flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <div className="glass-card p-8 md:p-12">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4">{projectInfo.icon}</div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h1>
              
              {projectInfo.substackUrl && (
                <div className="inline-block text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-full">
                  Artigo disponível no Substack
                </div>
              )}
            </div>
            
            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-8 text-lg">
                {projectInfo.description}
              </p>
              
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="features">Funcionalidades</TabsTrigger>
                  <TabsTrigger value="technical">Tecnologia</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Principais Características:</h3>
                  <ul className="space-y-2 pl-6 list-disc text-gray-700 dark:text-gray-300">
                    {projectInfo.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="features" className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Funcionalidades Detalhadas:</h3>
                  <ul className="space-y-2 pl-6 list-disc text-gray-700 dark:text-gray-300">
                    {projectInfo.tabs.gameplay && projectInfo.tabs.gameplay.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="technical" className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Aspectos Técnicos:</h3>
                  <ul className="space-y-2 pl-6 list-disc text-gray-700 dark:text-gray-300">
                    {projectInfo.tabs.technical && projectInfo.tabs.technical.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href={projectInfo.substackUrl || "https://espelhoinvertido.substack.com/"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    Acompanhe no Substack
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
                
                <Button asChild variant="outline" size="lg">
                  <a href="/resources" className="flex items-center gap-2">
                    Explorar Recursos Relacionados
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectComingSoon;
