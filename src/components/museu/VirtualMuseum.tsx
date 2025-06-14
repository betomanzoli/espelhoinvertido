
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Camera, 
  Headphones, 
  FileText, 
  Users, 
  Calendar,
  MapPin,
  PlayCircle,
  BookOpen,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface MuseumExhibit {
  id: string;
  title: string;
  period: string;
  location: string;
  description: string;
  artifacts: {
    id: string;
    name: string;
    type: 'document' | 'object' | 'audio' | 'image';
    description: string;
    historicalContext: string;
  }[];
  timeline: {
    date: string;
    event: string;
    significance: string;
  }[];
  characters: {
    name: string;
    role: string;
    quote: string;
    biography: string;
  }[];
}

const exhibits: MuseumExhibit[] = [
  {
    id: 'french-revolution',
    title: 'Revolução Francesa',
    period: '1789-1799',
    location: 'Paris, França',
    description: 'Explore os eventos que transformaram a França e influenciaram revoluções em todo o mundo.',
    artifacts: [
      {
        id: 'declaration-rights',
        name: 'Declaração dos Direitos do Homem e do Cidadão',
        type: 'document',
        description: 'Documento fundamental que estabeleceu os princípios de liberdade, igualdade e fraternidade.',
        historicalContext: 'Adotada em 26 de agosto de 1789, influenciou constituições ao redor do mundo.'
      },
      {
        id: 'bastille-key',
        name: 'Chave da Bastilha',
        type: 'object',
        description: 'Chave simbólica da fortaleza-prisão tomada pelo povo em 14 de julho de 1789.',
        historicalContext: 'A tomada da Bastilha marcou o início da revolução popular.'
      },
      {
        id: 'marseillaise',
        name: 'A Marselhesa',
        type: 'audio',
        description: 'Hino revolucionário que se tornou o hino nacional francês.',
        historicalContext: 'Composta em 1792, galvanizou o fervor revolucionário.'
      }
    ],
    timeline: [
      {
        date: '14 de julho de 1789',
        event: 'Tomada da Bastilha',
        significance: 'Marco inicial da revolução popular'
      },
      {
        date: '26 de agosto de 1789',
        event: 'Declaração dos Direitos',
        significance: 'Estabelecimento dos princípios fundamentais'
      },
      {
        date: '21 de janeiro de 1793',
        event: 'Execução de Luís XVI',
        significance: 'Fim definitivo do Antigo Regime'
      }
    ],
    characters: [
      {
        name: 'Maximilien Robespierre',
        role: 'Líder Jacobino',
        quote: 'A revolução é a guerra da liberdade contra seus inimigos.',
        biography: 'Advogado que se tornou uma das figuras mais influentes da revolução.'
      },
      {
        name: 'Olympe de Gouges',
        role: 'Ativista dos Direitos das Mulheres',
        quote: 'A mulher nasce livre e permanece igual ao homem em direitos.',
        biography: 'Pioneira na luta pelos direitos das mulheres durante a revolução.'
      }
    ]
  },
  {
    id: 'paris-commune',
    title: 'Comuna de Paris',
    period: '18 de março - 28 de maio de 1871',
    location: 'Paris, França',
    description: 'A primeira experiência de governo operário da história, que durou 72 dias.',
    artifacts: [
      {
        id: 'commune-decree',
        name: 'Decretos da Comuna',
        type: 'document',
        description: 'Conjunto de leis progressistas aprovadas durante os 72 dias da Comuna.',
        historicalContext: 'Incluíam separação Igreja-Estado, educação gratuita e direitos trabalhistas.'
      },
      {
        id: 'red-flag',
        name: 'Bandeira Vermelha',
        type: 'object',
        description: 'Símbolo adotado pela Comuna, posteriormente usado por movimentos socialistas.',
        historicalContext: 'Primeira vez que a bandeira vermelha foi usada como símbolo oficial.'
      },
      {
        id: 'communard-songs',
        name: 'Canções dos Communards',
        type: 'audio',
        description: 'Músicas que expressavam os ideais e a resistência da Comuna.',
        historicalContext: 'Preservaram a memória e os valores do movimento operário.'
      }
    ],
    timeline: [
      {
        date: '18 de março de 1871',
        event: 'Início da Comuna',
        significance: 'Governo operário assume o controle de Paris'
      },
      {
        date: '26 de março de 1871',
        event: 'Eleições da Comuna',
        significance: 'Primeiras eleições verdadeiramente democráticas'
      },
      {
        date: '28 de maio de 1871',
        event: 'Semana Sangrenta',
        significance: 'Repressão violenta e fim da Comuna'
      }
    ],
    characters: [
      {
        name: 'Louise Michel',
        role: 'Revolucionária e Educadora',
        quote: 'É preciso que a revolução social se complete pela revolução política.',
        biography: 'Professora que se tornou símbolo da resistência durante a Comuna.'
      },
      {
        name: 'Eugène Varlin',
        role: 'Líder Operário',
        quote: 'O trabalho deve ser a base de toda organização social.',
        biography: 'Organizador sindical e um dos principais líderes da Comuna.'
      }
    ]
  },
  {
    id: 'russian-revolution',
    title: 'Revolução Russa',
    period: '1917',
    location: 'Petrogrado (São Petersburgo), Rússia',
    description: 'A revolução que derrubou o czarismo e estabeleceu o primeiro estado socialista.',
    artifacts: [
      {
        id: 'april-theses',
        name: 'Teses de Abril',
        type: 'document',
        description: 'Documento de Lenin que definiu a estratégia bolchevique.',
        historicalContext: 'Orientou a segunda fase da revolução russa.'
      },
      {
        id: 'winter-palace',
        name: 'Palácio de Inverno',
        type: 'image',
        description: 'Sede do governo provisório tomada pelos bolcheviques.',
        historicalContext: 'Símbolo da tomada do poder pelos revolucionários.'
      },
      {
        id: 'internationale',
        name: 'A Internacional',
        type: 'audio',
        description: 'Hino do movimento operário internacional.',
        historicalContext: 'Cantado durante as manifestações revolucionárias.'
      }
    ],
    timeline: [
      {
        date: 'Fevereiro de 1917',
        event: 'Queda do Czar',
        significance: 'Fim de séculos de autocracia russa'
      },
      {
        date: 'Abril de 1917',
        event: 'Retorno de Lenin',
        significance: 'Radicalização do processo revolucionário'
      },
      {
        date: 'Outubro de 1917',
        event: 'Revolução Bolchevique',
        significance: 'Estabelecimento do poder soviético'
      }
    ],
    characters: [
      {
        name: 'Vladimir Lenin',
        role: 'Líder Bolchevique',
        quote: 'A revolução é impossível sem uma situação revolucionária nacional.',
        biography: 'Teórico e estrategista da revolução socialista.'
      },
      {
        name: 'Alexandra Kollontai',
        role: 'Revolucionária e Feminista',
        quote: 'A liberação da mulher só é possível com a liberação do proletariado.',
        biography: 'Primeira mulher a integrar um governo revolucionário.'
      }
    ]
  }
];

const VirtualMuseum = () => {
  const [currentExhibit, setCurrentExhibit] = useState<MuseumExhibit | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'artifacts' | 'timeline' | 'characters'>('artifacts');

  const renderArtifactIcon = (type: string) => {
    switch (type) {
      case 'document': return <FileText className="h-5 w-5" />;
      case 'audio': return <Headphones className="h-5 w-5" />;
      case 'image': return <Camera className="h-5 w-5" />;
      default: return <BookOpen className="h-5 w-5" />;
    }
  };

  if (!currentExhibit) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Museu Virtual das Revoluções</h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore experiências imersivas que transportam você para momentos históricos revolucionários.
            Cada exposição oferece artefatos digitais, cronologias interativas e encontros com personagens históricos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exhibits.map((exhibit) => (
            <Card key={exhibit.id} className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">{exhibit.period}</span>
                </div>
                <CardTitle className="text-xl">{exhibit.title}</CardTitle>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {exhibit.location}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {exhibit.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{exhibit.artifacts.length} artefatos</Badge>
                  <Badge variant="secondary">{exhibit.characters.length} personagens</Badge>
                  <Badge variant="secondary">{exhibit.timeline.length} eventos</Badge>
                </div>
                <Button 
                  onClick={() => setCurrentExhibit(exhibit)}
                  className="w-full gap-2"
                >
                  <PlayCircle className="h-4 w-4" />
                  Explorar Exposição
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const selectedArtifactData = selectedArtifact 
    ? currentExhibit.artifacts.find(a => a.id === selectedArtifact)
    : null;

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button 
          variant="outline" 
          onClick={() => setCurrentExhibit(null)}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Museu
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{currentExhibit.title}</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {currentExhibit.period} • {currentExhibit.location}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Navigation Tabs */}
          <Card>
            <CardHeader>
              <div className="flex gap-2">
                <Button
                  variant={activeSection === 'artifacts' ? 'default' : 'outline'}
                  onClick={() => setActiveSection('artifacts')}
                  size="sm"
                >
                  Artefatos
                </Button>
                <Button
                  variant={activeSection === 'timeline' ? 'default' : 'outline'}
                  onClick={() => setActiveSection('timeline')}
                  size="sm"
                >
                  Cronologia
                </Button>
                <Button
                  variant={activeSection === 'characters' ? 'default' : 'outline'}
                  onClick={() => setActiveSection('characters')}
                  size="sm"
                >
                  Personagens
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeSection === 'artifacts' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentExhibit.artifacts.map((artifact) => (
                    <Card 
                      key={artifact.id}
                      className={`cursor-pointer transition-all ${
                        selectedArtifact === artifact.id ? 'ring-2 ring-primary' : 'hover:shadow-md'
                      }`}
                      onClick={() => setSelectedArtifact(
                        selectedArtifact === artifact.id ? null : artifact.id
                      )}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle className="flex items-center gap-2 text-base">
                          {renderArtifactIcon(artifact.type)}
                          {artifact.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {artifact.description}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {activeSection === 'timeline' && (
                <div className="space-y-4">
                  {currentExhibit.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className="w-3 h-3 bg-primary rounded-full"></div>
                        {index < currentExhibit.timeline.length - 1 && (
                          <div className="w-0.5 h-16 bg-gray-300 dark:bg-gray-600 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <div className="font-medium">{event.date}</div>
                        <div className="text-lg font-semibold">{event.event}</div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                          {event.significance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeSection === 'characters' && (
                <div className="space-y-4">
                  {currentExhibit.characters.map((character, index) => (
                    <Card key={index}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          {character.name}
                        </CardTitle>
                        <Badge variant="outline" className="w-fit">
                          {character.role}
                        </Badge>
                      </CardHeader>
                      <CardContent>
                        <blockquote className="border-l-4 border-primary pl-4 italic mb-3">
                          "{character.quote}"
                        </blockquote>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {character.biography}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sobre a Exposição</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {currentExhibit.description}
              </p>
            </CardContent>
          </Card>

          {selectedArtifactData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {renderArtifactIcon(selectedArtifactData.type)}
                  Artefato Selecionado
                </CardTitle>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">{selectedArtifactData.name}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                  {selectedArtifactData.description}
                </p>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                  <h4 className="font-medium text-sm mb-1">Contexto Histórico</h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {selectedArtifactData.historicalContext}
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recursos Adicionais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <BookOpen className="h-4 w-4" />
                Bibliografia
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <FileText className="h-4 w-4" />
                Documentos Originais
              </Button>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2">
                <Camera className="h-4 w-4" />
                Galeria de Imagens
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VirtualMuseum;
