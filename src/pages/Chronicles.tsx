
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Brain, Eye, Users, Download, Share2 } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ChronicleDetail {
  id: string;
  title: string;
  subtitle: string;
  fullText: string;
  themes: string[];
  analysisPoints: string[];
  discussionQuestions: string[];
  relatedConcepts: string[];
}

const chroniclesData: ChronicleDetail[] = [
  {
    id: 'espectro-que-recusamos-ver',
    title: 'O Espectro que Recusamos Ver',
    subtitle: 'Sobre rejeições automáticas e bolhas ideológicas',
    fullText: `Em uma universidade respeitada, o professor Martins iniciou sua aula de História Política mencionando que estudariam "O Manifesto Comunista" de Marx e Engels. Imediatamente, parte da turma reagiu com suspiros, olhares de desaprovação e comentários sussurrados.

"Professor", interrompeu Lucas, um estudante de economia, "por que perder tempo com ideias ultrapassadas e comprovadamente erradas? O comunismo fracassou em todos os lugares onde foi tentado."

O professor Martins sorriu pacientemente. "Interessante observação, Lucas. Mas me diga: você já leu o Manifesto?"

"Não preciso ler para saber que é ideologia perigosa", respondeu Lucas, provocando murmúrios de concordância entre alguns colegas.

"Então você está rejeitando algo que nunca examinou?", questionou o professor. "Como pode ter certeza sobre o conteúdo de um texto que não conhece?"

Uma estudante chamada Ana se manifestou: "Mas professor, todos sabem que o comunismo matou milhões de pessoas. Por que estudar algo tão destrutivo?"

"Ana, você está confundindo a análise de um texto histórico com a defesa de regimes políticos", explicou Martins. "Marx escreveu uma análise do capitalismo do século XIX. Muitas de suas observações sobre concentração de riqueza e condições de trabalho se mostraram precisas, independentemente do que pensemos sobre as soluções que ele propôs."

Lucas insistiu: "Mas por que dar legitimidade a essas ideias ensinando-as?"

"Porque", respondeu o professor, "vocês estão demonstrando exatamente o que Marx chamou de 'espectro que ronda a Europa' - a tendência de rejeitar ideias sem examiná-las. Vocês têm tanto medo do conteúdo que se recusam a conhecê-lo."

O silêncio tomou conta da sala.

"Deixem-me fazer um experimento", continuou Martins. "Vou ler alguns trechos sem identificar o autor. Vocês me dizem se concordam ou discordam."

Ele começou: "A burguesia não pode existir sem revolucionar constantemente os instrumentos de produção..."

"Faz sentido", comentou Lucas. "A inovação é essencial no capitalismo."

"Todos os países são arrastados para a civilização pela burguesia... Ela cria um mundo à sua própria imagem", continuou o professor.

"É verdade, a globalização realmente faz isso", concordou Ana.

"Interessante", sorriu Martins. "Vocês acabaram de concordar com Marx."

A sala ficou em silêncio constrangido.

"Vejam", disse o professor, "não estou pedindo que vocês se tornem comunistas. Estou sugerindo que examinem as ideias antes de rejeitá-las. O medo de certos conceitos pode nos cegar para análises valiosas sobre nosso próprio sistema."

Lucas, visivelmente desconfortável, murmurou: "Mas... isso não significa que ele estava certo sobre tudo."

"Claro que não", concordou Martins. "Nenhum pensador está certo sobre tudo. Mas como vocês saberão onde ele acertou ou errou se se recusam a estudá-lo?"

Ao final da aula, alguns estudantes se aproximaram do professor, curiosos. Outros saíram ainda incomodados, presos em suas certezas iniciais.

O professor Martins refletiu: o maior triunfo do viés de confirmação não é nos fazer interpretar mal as informações que recebemos, mas sim nos impedir de receber certas informações em primeiro lugar.`,
    themes: ['Viés de Confirmação', 'Rejeição Ideológica', 'Educação', 'Manifesto Comunista'],
    analysisPoints: [
      'Como o medo de certas ideias pode impedir o aprendizado',
      'A diferença entre estudar um texto e defendê-lo',
      'O papel do preconceito na formação de opiniões',
      'Como reagimos a informações que desafiam nossas crenças'
    ],
    discussionQuestions: [
      'Você já rejeitou uma ideia sem conhecê-la profundamente?',
      'Como distinguir entre análise crítica e rejeição preconceituosa?',
      'Que tipos de assuntos provocam reações emocionais imediatas em você?',
      'Como o contexto social influencia nossa disposição para examinar certas ideias?'
    ],
    relatedConcepts: ['Espectro de Marx', 'Análise vs Defesa', 'Preconceito Ideológico', 'Educação Crítica']
  },
  {
    id: 'algoritmo-de-marx',
    title: 'O Algoritmo de Marx',
    subtitle: 'Tecnologia e interpretações ideológicas',
    fullText: `Felipe era um programador experiente que trabalhava para uma startup de análise de dados. Certo dia, recebeu uma proposta inusitada: criar um algoritmo que identificasse padrões de concentração de riqueza e poder em diferentes setores da economia.

"É um projeto acadêmico", explicou sua supervisora, Clara. "Queremos mapear como a riqueza se move e se concentra na economia digital."

Felipe decidiu basear seu algoritmo em alguns conceitos que havia lido no Manifesto Comunista durante a faculdade - particularmente a ideia de que o capital tende a se concentrar e que a competição leva à eliminação dos competidores menores.

Meses depois, o algoritmo estava pronto e os resultados eram impressionantes. Ele mostrava com precisão matemática como, em setor após setor, algumas poucas empresas dominavam mercados inteiros, como pequenos negócios eram sistematicamente absorvidos ou eliminados, e como a riqueza se concentrava em um número cada vez menor de mãos.

Quando Felipe apresentou os resultados, as reações foram surpreendentes.

O CEO da empresa, Roberto, ficou empolgado: "Isso é fantástico! Mostra exatamente como o livre mercado funciona - os mais eficientes vencem e absorvem os ineficientes. É o capitalismo em sua forma mais pura!"

Mas Dr. Silva, um consultor de esquerda contratado pela empresa, interpretou os mesmos dados de forma completamente diferente: "Estes números comprovam que Marx estava certo! O capitalismo leva inevitavelmente à concentração monopolística e à exploração dos trabalhadores!"

Felipe ficou perplexo. Os dados eram os mesmos, mas as interpretações eram diametralmente opostas.

Ele decidiu apresentar os resultados para diferentes grupos para ver como reagiriam.

Em um encontro com empreendedores, os dados foram recebidos como "prova da eficiência do mercado em recompensar a inovação e punir a ineficiência."

Em um seminário de economia social, os mesmos números foram interpretados como "evidência clara da necessidade de políticas redistributivas e regulação antimonopólio."

Quando Felipe apresentou para um grupo de libertários, eles argumentaram que a concentração era resultado de "interferência governamental que favorece grandes corporações em detrimento dos pequenos."

E quando apresentou para progressistas, eles viram "confirmação de que o sistema precisa ser reformado para proteger os vulneráveis."

Felipe percebeu algo perturbador: seu algoritmo não estava revelando a "verdade" sobre a economia - estava fornecendo um espelho onde cada grupo via confirmação de suas crenças preexistentes.

"Mas os dados são objetivos!", ele protestou para Clara.

"Os dados sim", ela respondeu sorrindo. "Mas as pessoas não são. Cada grupo tem uma narrativa prévia sobre como o mundo funciona, e seus dados simplesmente se encaixam nessas narrativas."

Felipe começou a se questionar: teria Marx previsto esse fenômeno também? A tendência de interpretar os mesmos fatos através de lentes ideológicas diferentes?

Ele releu o Manifesto e encontrou uma passagem que o fez parar: "As ideias dominantes de uma época são sempre as ideias da classe dominante."

Será que isso se aplicava não apenas às ideias, mas também à interpretação de dados? Cada grupo via nos números aquilo que sua posição social e ideológica os predispunha a ver?

Felipe decidiu fazer um último experimento. Apresentou os mesmos dados, mas dessa vez revelou que o algoritmo havia sido baseado em conceitos marxistas.

As reações foram imediatas e previsíveis:

Os empresários suddenly questionaram a validade dos dados: "Se foi baseado em Marx, deve estar enviesado."

Os progressistas se sentiram validados: "Claro! Marx entendia o sistema melhor que ninguém."

Os libertários rejeitaram tudo: "Algoritmo comunista não pode produzir análise confiável."

Felipe percebeu que havia criado mais que um programa de computador - havia construído um experimento sobre viés de confirmação. Os dados eram os mesmos, mas o conhecimento de sua origem mudava completamente como eram interpretados.

Naquela noite, ele refletiu: se nem dados matemáticos escapam do filtro ideológico, como podemos ter certeza de qualquer coisa que acreditamos?

O algoritmo de Marx havia revelado algo sobre muito mais que concentração de riqueza - havia mostrado como nossa perspectiva determina nossa percepção da realidade.`,
    themes: ['Tecnologia', 'Interpretação de Dados', 'Viés Algorítmico', 'Perspectivas Múltiplas'],
    analysisPoints: [
      'Como os mesmos dados podem ser interpretados de formas opostas',
      'O papel da origem da informação na sua credibilidade',
      'A objetividade dos dados versus a subjetividade da interpretação',
      'Como nossas crenças filtram nossa percepção da realidade'
    ],
    discussionQuestions: [
      'Você já mudou de opinião sobre dados quando soube de sua origem?',
      'Como distinguir entre análise objetiva e interpretação enviesada?',
      'Que papel a tecnologia deveria ter na análise social?',
      'Como podemos minimizar nossos vieses ao interpretar informações?'
    ],
    relatedConcepts: ['Neutralidade Tecnológica', 'Viés de Dados', 'Interpretação Ideológica', 'Objetividade Científica']
  }
];

const Chronicles = () => {
  const [selectedChronicle, setSelectedChronicle] = useState(chroniclesData[0]);

  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-1 mb-4">Crônicas sobre Contradições Ideológicas</h1>
            <p className="lead max-w-3xl mx-auto">
              Narrativas que exploram como o viés de confirmação molda nossa compreensão 
              de eventos, textos e perspectivas ideológicas
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Lista de crônicas */}
            <div className="lg:col-span-1 space-y-3">
              <h3 className="font-semibold text-lg mb-4">Selecione uma Crônica</h3>
              {chroniclesData.map((chronicle) => (
                <Card 
                  key={chronicle.id}
                  className={`cursor-pointer transition-all duration-200 ${
                    selectedChronicle.id === chronicle.id 
                      ? 'border-blue-500 shadow-md' 
                      : 'hover:shadow-sm'
                  }`}
                  onClick={() => setSelectedChronicle(chronicle)}
                >
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">{chronicle.title}</CardTitle>
                    <CardDescription className="text-xs">
                      {chronicle.subtitle}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>

            {/* Conteúdo da crônica selecionada */}
            <div className="lg:col-span-3">
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{selectedChronicle.title}</CardTitle>
                      <CardDescription className="text-base">
                        {selectedChronicle.subtitle}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Share2 className="w-4 h-4 mr-1" />
                        Compartilhar
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {selectedChronicle.themes.map((theme) => (
                      <Badge key={theme} variant="outline">{theme}</Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                      <TabsTrigger value="text">Narrativa</TabsTrigger>
                      <TabsTrigger value="analysis">Análise</TabsTrigger>
                      <TabsTrigger value="discussion">Discussão</TabsTrigger>
                      <TabsTrigger value="concepts">Conceitos</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="text" className="mt-6">
                      <div className="prose prose-slate max-w-none dark:prose-invert">
                        {selectedChronicle.fullText.split('\n\n').map((paragraph, index) => (
                          <p key={index} className="mb-4 text-sm leading-relaxed">
                            {paragraph}
                          </p>
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="analysis" className="mt-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Brain className="w-4 h-4" />
                          Pontos de Análise
                        </h4>
                        <ul className="space-y-2">
                          {selectedChronicle.analysisPoints.map((point, index) => (
                            <li key={index} className="text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
                              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="discussion" className="mt-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Users className="w-4 h-4" />
                          Perguntas para Reflexão
                        </h4>
                        <div className="space-y-3">
                          {selectedChronicle.discussionQuestions.map((question, index) => (
                            <div key={index} className="p-3 bg-slate-50 dark:bg-slate-800 rounded">
                              <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                {question}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="concepts" className="mt-6">
                      <div className="space-y-4">
                        <h4 className="font-semibold flex items-center gap-2">
                          <Eye className="w-4 h-4" />
                          Conceitos Relacionados
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedChronicle.relatedConcepts.map((concept) => (
                            <Badge key={concept} variant="secondary">{concept}</Badge>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12 text-center">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Explore Suas Próprias Perspectivas</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                Use nossas ferramentas interativas para descobrir como seus próprios vieses 
                afetam sua interpretação de textos e eventos.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button asChild>
                  <Link to="/bias-lab">
                    Laboratório de Viés
                    <Brain className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/debate">
                    Participar do Debate
                    <Users className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chronicles;
