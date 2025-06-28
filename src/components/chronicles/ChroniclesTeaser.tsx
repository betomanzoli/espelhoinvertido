
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, ExternalLink, Quote, Users, ArrowRight, Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChronicleTeaser {
  id: string;
  title: string;
  subtitle: string;
  teaser: string;
  quote: string;
  themes: string[];
  readTime: string;
  substackUrl: string;
  color: string;
}

const chroniclesData: ChronicleTeaser[] = [
  {
    id: 'espectro-que-recusamos-ver',
    title: 'O Espectro que Recusamos Ver',
    subtitle: 'Sobre rejeições automáticas e bolhas ideológicas',
    teaser: 'Um professor de história confronta um aluno que rejeita categoricamente qualquer aspecto das teorias marxistas. A narrativa explora como o viés de confirmação nos leva a selecionar apenas evidências que confirmam nossas crenças, ignorando contribuições analíticas válidas...',
    quote: '"Você está fazendo exatamente o que acusa a mim de fazer: sendo seletivo."',
    themes: ['Viés de Confirmação', 'Educação', 'Diálogo Político'],
    readTime: '8 min',
    substackUrl: 'https://espelhoinvertido.substack.com/',
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'duas-bibliotecas-uma-historia',
    title: 'Duas Bibliotecas, Uma História',
    subtitle: 'Perspectivas opostas sobre os mesmos eventos',
    teaser: 'Victor em Praga e Elena no Brasil construíram bibliotecas sobre os mesmos eventos históricos, mas com interpretações completamente opostas. Quando se encontram, descobrem como selecionaram apenas os livros que confirmavam suas visões...',
    quote: '"Duas bibliotecas podem contar a mesma história, desde que estejamos dispostos a reconhecer os espaços vazios em nossas próprias estantes."',
    themes: ['Guerra Fria', 'Perspectivas Múltiplas', 'História'],
    readTime: '12 min',
    substackUrl: 'https://espelhoinvertido.substack.com/',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'algoritmo-de-marx',
    title: 'O Algoritmo de Marx',
    subtitle: 'Tecnologia e interpretações ideológicas',
    teaser: 'Felipe cria um algoritmo baseado em textos marxistas que faz previsões econômicas surpreendentemente precisas. Mas diferentes grupos interpretam os mesmos resultados de maneiras radicalmente opostas, revelando como o viés opera até com dados "objetivos"...',
    quote: '"O verdadeiro bug não está no sistema econômico ou no meu código. Está no modo como processamos informação."',
    themes: ['Tecnologia', 'Economia', 'Interpretação de Dados'],
    readTime: '15 min',
    substackUrl: 'https://espelhoinvertido.substack.com/',
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 'notas-tradutor-invisivel',
    title: 'Notas de um Tradutor Invisível',
    subtitle: 'Como diferentes edições moldam interpretações',
    teaser: 'Álvaro traduz o Manifesto Comunista para diferentes editoras, cada uma com orientações políticas específicas. Pequenas mudanças vocabulares direcionam leitores para interpretações completamente distintas do mesmo texto...',
    quote: '"A maior traição não está nas escolhas conscientes que fazemos, e sim na ilusão que criamos de que existe uma neutralidade possível."',
    themes: ['Tradução', 'Mídia', 'Manipulação Textual'],
    readTime: '10 min',
    substackUrl: 'https://espelhoinvertido.substack.com/',
    color: 'from-purple-500 to-violet-600'
  },
  {
    id: 'ruinas-disputadas',
    title: 'As Ruínas Disputadas',
    subtitle: 'Turistas interpretam monumentos soviéticos',
    teaser: 'Um grupo de turistas visita monumentos do antigo bloco soviético. Cada personagem interpreta as mesmas ruínas de forma radicalmente diferente: opressão, sonhos frustrados, incompetência econômica. As mesmas evidências, múltiplas narrativas...',
    quote: '"As ruínas são apenas o cenário; a história verdadeira está nos olhos de quem as contempla."',
    themes: ['História', 'Turismo', 'Memória Coletiva'],
    readTime: '14 min',
    substackUrl: 'https://espelhoinvertido.substack.com/',
    color: 'from-amber-500 to-orange-600'
  }
];

const ChroniclesTeaser = () => {
  const [selectedChronicle, setSelectedChronicle] = useState<string | null>(null);

  return (
    <section className="page-container py-16 md:py-24">
      <div className="content-wrapper">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4">
            Crônicas do Espelho Invertido
          </h2>
          <p className="lead max-w-3xl mx-auto mb-6">
            Narrativas provocativas que exploram como o viés de confirmação molda nossa interpretação da realidade.
            Leia os resumos aqui, mergulhe nas histórias completas no nosso Substack.
          </p>
          
          {/* CTA Principal para Substack */}
          <div className="inline-flex items-center gap-3 btn-accent rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 mb-8">
            <Bell className="w-5 h-5" />
            <span>Inscreva-se no Substack para ler as crônicas completas</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {chroniclesData.map((chronicle) => (
            <Card 
              key={chronicle.id}
              className={`cursor-pointer card-espelho hover-lift group ${
                selectedChronicle === chronicle.id 
                  ? 'border-blue-500 shadow-lg' 
                  : ''
              }`}
              onClick={() => setSelectedChronicle(
                selectedChronicle === chronicle.id ? null : chronicle.id
              )}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${chronicle.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <BookOpen className="w-6 h-6" />
                </div>
                <CardTitle className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {chronicle.title}
                </CardTitle>
                <CardDescription className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {chronicle.subtitle}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {chronicle.teaser}
                </p>
                
                <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border-l-4 border-blue-500">
                  <Quote className="w-4 h-4 text-blue-500 mb-2" />
                  <p className="text-sm italic text-slate-700 dark:text-slate-300">
                    {chronicle.quote}
                  </p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {chronicle.themes.map((theme) => (
                    <Badge key={theme} variant="outline" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-xs text-slate-500">{chronicle.readTime} leitura</span>
                  <Button 
                    asChild 
                    size="sm" 
                    className="btn-accent text-white"
                  >
                    <a 
                      href={chronicle.substackUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Ler no Substack
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Seção de Call-to-Action */}
        <div className="card-espelho p-8">
          <div className="text-center max-w-4xl mx-auto">
            <h3 className="heading-3 mb-4">Por que ler no Substack?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mb-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">Textos Completos</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Crônicas completas com análises profundas e desenvolvimento narrativo
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mb-4">
                  <Bell className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">Conteúdo Exclusivo</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Análises inéditas, reflexões e conteúdo que não aparece em outras plataformas
                </p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h4 className="font-semibold mb-2">Comunidade</h4>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Participe dos comentários e discussões com outros leitores
                </p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="btn-accent">
                <a 
                  href="https://espelhoinvertido.substack.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Bell className="w-5 h-5" />
                  Inscrever-se Gratuitamente
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="border-blue-500 text-blue-600 hover:bg-blue-50">
                <Link to="/bias-lab" className="flex items-center gap-2">
                  Explorar Ferramentas Interativas
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChroniclesTeaser;
