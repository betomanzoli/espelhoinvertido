
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
          icon: "⚔️"
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
          icon: "🗺️"
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
          icon: "✍️"
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
          icon: "🔍"
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
          icon: "📊"
        };
      default:
        return {
          description: "Detalhes deste projeto serão divulgados em breve.",
          features: [],
          tabs: {
            overview: [],
            features: [],
            technical: []
          },
          icon: "🚀"
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
                    {projectInfo.tabs.gameplay?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
                
                <TabsContent value="technical" className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Aspectos Técnicos:</h3>
                  <ul className="space-y-2 pl-6 list-disc text-gray-700 dark:text-gray-300">
                    {projectInfo.tabs.technical?.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </TabsContent>
              </Tabs>
            </div>
            
            <div className="text-center">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="https://espelhoinvertido.substack.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
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
