
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Eye, Brain, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Chronicle {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  themes: string[];
  icon: React.ReactNode;
  color: string;
}

const chroniclesData: Chronicle[] = [
  {
    id: 'espectro-que-recusamos-ver',
    title: 'O Espectro que Recusamos Ver',
    subtitle: 'Sobre rejeições automáticas e bolhas ideológicas',
    description: 'Uma narrativa que explora como conceitos associados ao comunismo enfrentam rejeição imediata, ilustrando o fenômeno onde o debate substantivo é substituído por reações emocionais.',
    themes: ['Viés de Confirmação', 'Rejeição Ideológica', 'Manifesto Comunista'],
    icon: <Eye className="w-6 h-6" />,
    color: 'from-red-500 to-pink-600'
  },
  {
    id: 'algoritmo-de-marx',
    title: 'O Algoritmo de Marx',
    subtitle: 'Tecnologia e interpretações ideológicas',
    description: 'Um programador cria um algoritmo baseado em conceitos marxistas e observa como diferentes grupos interpretam os mesmos resultados de maneiras radicalmente distintas.',
    themes: ['Tecnologia', 'Interpretação de Dados', 'Viés Algorítmico'],
    icon: <Brain className="w-6 h-6" />,
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'duas-bibliotecas-uma-historia',
    title: 'Duas Bibliotecas, Uma História',
    subtitle: 'Perspectivas opostas sobre os mesmos eventos',
    description: 'Personagens com visões ideológicas contrastantes descobrem que frequentam a mesma biblioteca, mas interpretam as mesmas obras históricas de maneiras completamente diferentes.',
    themes: ['História', 'Perspectivas Múltiplas', 'Interpretação'],
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600'
  }
];

const ChroniclesShowcase = () => {
  const [selectedChronicle, setSelectedChronicle] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-700 to-slate-900 dark:from-slate-200 dark:to-slate-400 bg-clip-text text-transparent">
            Crônicas Principais
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
            Narrativas ficcionais que exploram como o viés de confirmação influencia nossa 
            compreensão de eventos, textos e perspectivas ideológicas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {chroniclesData.map((chronicle) => (
            <Card 
              key={chronicle.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-xl border-2 ${
                selectedChronicle === chronicle.id 
                  ? 'border-blue-500 shadow-lg' 
                  : 'border-slate-200 dark:border-slate-700'
              }`}
              onClick={() => setSelectedChronicle(
                selectedChronicle === chronicle.id ? null : chronicle.id
              )}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${chronicle.color} flex items-center justify-center text-white mb-4`}>
                  {chronicle.icon}
                </div>
                <CardTitle className="text-xl font-semibold">{chronicle.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  {chronicle.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {chronicle.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {chronicle.themes.map((theme) => (
                    <Badge key={theme} variant="outline" className="text-xs">
                      {theme}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Informação sobre o projeto */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center text-white flex-shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-3">Sobre a Criação das Crônicas</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                Estas narrativas foram criadas utilizando inteligência artificial sob direção conceitual humana, 
                representando uma colaboração entre criatividade humana e tecnologia para estimular reflexões 
                sobre nossa forma de interpretar o mundo.
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
                <strong>Importante:</strong> Todos os personagens, diálogos e situações são inteiramente fictícios, 
                mesmo quando fazem referência a figuras históricas reais ou obras como o Manifesto Comunista.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button asChild className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700">
                  <Link to="/library">
                    Ler Crônicas Completas
                    <BookOpen className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/bias-lab">
                    Explorar Laboratório de Viés
                    <Brain className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChroniclesShowcase;
