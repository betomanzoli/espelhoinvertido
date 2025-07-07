import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Lightbulb, Users, Zap, ArrowRight, Play, BookOpen, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEOHead } from '@/components/seo/SEOHead';

const ComoIAAjuda = () => {
  const aiProcessSteps = [
    {
      icon: Lightbulb,
      title: "Geração de Ideias",
      description: "A IA ajuda a explorar múltiplas perspectivas sobre um mesmo tema, sugerindo ângulos que talvez não considerássemos naturalmente.",
      example: "Para uma crônica sobre redes sociais, a IA sugere perspectivas: usuário viciado, ex-funcionário de tech, psicólogo comportamental, ativista de privacidade."
    },
    {
      icon: Brain,
      title: "Análise de Vieses",
      description: "Identifica padrões de pensamento e vieses cognitivos presentes em textos, ajudando a criar narrativas mais conscientes.",
      example: "A IA detecta viés de confirmação em um rascunho e sugere como o personagem poderia ter interpretações opostas do mesmo evento."
    },
    {
      icon: Users,
      title: "Múltiplas Vozes",
      description: "Simula diferentes personas e backgrounds culturais para enriquecer as narrativas com perspectivas autênticas.",
      example: "Para uma história sobre economia, a IA ajuda a criar vozes de um trabalhador rural, economista urbano e empreendedor imigrante."
    },
    {
      icon: Zap,
      title: "Otimização Criativa",
      description: "Refina a linguagem, estrutura narrativa e impacto emocional, mantendo a essência da mensagem original.",
      example: "A IA sugere reestruturar uma crônica para começar pelo conflito central, aumentando o engajamento do leitor."
    }
  ];

  const transparencyPrinciples = [
    "🤝 Colaboração, não substituição: A IA potencializa a criatividade humana",
    "🔍 Transparência total: Sempre revelamos quando e como a IA foi utilizada",
    "📝 Autoria humana: Ideias centrais e decisões editoriais são sempre humanas",
    "🎯 Propósito claro: IA como ferramenta para quebrar bolhas e vieses",
    "⚡ Eficiência criativa: Mais tempo para reflexão profunda, menos para tarefas repetitivas"
  ];

  return (
    <div className="page-container">
      <SEOHead 
        title="Como a IA Ajuda"
        description="Descubra como a inteligência artificial colabora na criação das crônicas do Espelho Invertido, potencializando perspectivas múltiplas."
        keywords="inteligência artificial, IA criativa, colaboração humano-máquina, criação de conteúdo, múltiplas perspectivas"
      />
      
      <div className="content-wrapper">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="w-24 h-24 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white mx-auto mb-6">
              <Brain className="w-12 h-12" />
            </div>
            <h1 className="heading-1 mb-4">Como a IA Potencializa Nossas Crônicas</h1>
            <p className="lead max-w-4xl mx-auto">
              A inteligência artificial é nossa parceira na criação de narrativas que exploram 
              múltiplas perspectivas e quebram bolhas ideológicas. Descubra nossa abordagem transparente 
              e colaborativa.
            </p>
          </div>

          {/* Process Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <div>
              <h2 className="heading-2 mb-6">O Processo Criativo</h2>
              <div className="space-y-6">
                {aiProcessSteps.map((step, index) => (
                  <Card key={index} className="card-espelho hover-lift">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white flex-shrink-0">
                          <step.icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-2">{step.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                            {step.description}
                          </p>
                          <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg">
                            <p className="text-xs italic text-slate-700 dark:text-slate-300">
                              <strong>Exemplo:</strong> {step.example}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Visual Demo */}
            <div className="space-y-6">
              <Card className="card-espelho">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5 text-green-600" />
                    Demonstração Interativa
                  </CardTitle>
                  <CardDescription>
                    Veja como funciona na prática
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">💭 Ideia Inicial (Humana)</p>
                      <p className="text-sm">"Quero escrever sobre como as pessoas reagem diferente às mesmas notícias"</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">🤖 Expansão da IA</p>
                      <p className="text-sm">"Que tal explorar 3 personagens: um progressista urbano, um conservador rural e um cético independente, todos lendo a mesma manchete?"</p>
                    </div>
                    
                    <div className="flex justify-center">
                      <ArrowRight className="w-5 h-5 text-slate-400" />
                    </div>
                    
                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 rounded-lg">
                      <p className="text-sm font-medium mb-2">✍️ Criação Colaborativa</p>
                      <p className="text-sm">Crônica finalizada com perspectivas autênticas e vieses identificados</p>
                    </div>
                  </div>
                  
                  <Button asChild className="w-full mt-6 btn-primary">
                    <Link to="/bias-lab">
                      Experimentar Ferramentas de IA
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="card-espelho">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cog className="w-5 h-5 text-blue-600" />
                    Ferramentas Utilizadas
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-3">
                    <Badge variant="secondary" className="justify-center p-2">GPT-4</Badge>
                    <Badge variant="secondary" className="justify-center p-2">Claude</Badge>
                    <Badge variant="secondary" className="justify-center p-2">Análise de Sentimento</Badge>
                    <Badge variant="secondary" className="justify-center p-2">Detecção de Viés</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Transparency Principles */}
          <Card className="card-espelho mb-12">
            <CardHeader>
              <CardTitle className="text-center">Nossos Princípios de Transparência</CardTitle>
              <CardDescription className="text-center">
                Como garantimos ética e autenticidade na colaboração humano-IA
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {transparencyPrinciples.map((principle, index) => (
                  <div key={index} className="text-center p-4 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <p className="text-sm font-medium">{principle}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="card-espelho text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Diversidade de Vozes</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Simulamos perspectivas autênticas de diferentes backgrounds
                </p>
              </CardContent>
            </Card>

            <Card className="card-espelho text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Zap className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Velocidade & Qualidade</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Produção mais rápida sem comprometer profundidade
                </p>
              </CardContent>
            </Card>

            <Card className="card-espelho text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Brain className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Quebra de Vieses</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Identificação automática de padrões e pontos cegos
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h2 className="heading-2 mb-4">Experimente Você Mesmo</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
              Explore nossas ferramentas interativas e veja como a IA pode ajudar você 
              a identificar seus próprios vieses e expandir suas perspectivas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-primary">
                <Link to="/bias-lab">
                  <Brain className="w-5 h-5 mr-2" />
                  Laboratório de Viés
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <Link to="/cronicas">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Escrever Crônica
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComoIAAjuda;