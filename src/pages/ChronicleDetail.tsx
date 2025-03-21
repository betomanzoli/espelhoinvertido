
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { chronicles, debateTopics } from '@/lib/debateData';
import { ArrowLeft, Calendar, ExternalLink, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import DebateTopicCard from '@/components/DebateTopicCard';
import ConceptTooltip from '@/components/ConceptTooltip';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ChronicleDetail = () => {
  const { chronicleId } = useParams();
  const [relatedTopics, setRelatedTopics] = useState([]);
  
  const chronicle = chronicles.find(c => c.id === chronicleId);
  
  useEffect(() => {
    if (chronicle?.relatedTopics) {
      const topics = debateTopics.filter(topic => 
        chronicle.relatedTopics?.includes(topic.id)
      );
      setRelatedTopics(topics);
    }
  }, [chronicle]);
  
  if (!chronicle) {
    return (
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="text-center">
          <h2 className="text-2xl font-medium mb-4">Crônica não encontrada</h2>
          <Link to="/library" className="text-primary hover:underline">
            Voltar para a biblioteca
          </Link>
        </div>
      </div>
    );
  }
  
  // Function to format the content with ConceptTooltip for certain terms
  const formatContent = (content) => {
    const conceptTerms = ['mais-valia', 'alienação', 'fetichismo da mercadoria', 'hegemonia cultural', 'neoliberalismo'];
    
    let formattedContent = content;
    
    // Split content by paragraphs
    return content.split('\n\n').map((paragraph, index) => {
      // Check each concept term and wrap it with ConceptTooltip
      conceptTerms.forEach(term => {
        const regex = new RegExp(`\\b${term}\\b`, 'gi');
        if (regex.test(paragraph)) {
          paragraph = paragraph.replace(regex, match => 
            `<concept>${match}</concept>`
          );
        }
      });
      
      // Process the paragraph JSX with concept tooltips
      if (paragraph.includes('<concept>')) {
        const parts = [];
        let lastIndex = 0;
        
        // Regular expression to find <concept>term</concept> patterns
        const conceptRegex = /<concept>(.*?)<\/concept>/g;
        let match;
        
        while ((match = conceptRegex.exec(paragraph)) !== null) {
          // Add text before the match
          if (match.index > lastIndex) {
            parts.push(paragraph.substring(lastIndex, match.index));
          }
          
          // Add the wrapped concept
          const term = match[1];
          parts.push(
            <ConceptTooltip key={`${index}-${match.index}`} term={term.toLowerCase()}>
              {term}
            </ConceptTooltip>
          );
          
          lastIndex = match.index + match[0].length;
        }
        
        // Add any remaining text
        if (lastIndex < paragraph.length) {
          parts.push(paragraph.substring(lastIndex));
        }
        
        return <p key={index} className="mb-4">{parts}</p>;
      }
      
      return <p key={index} className="mb-4">{paragraph}</p>;
    });
  };
  
  const chronicleNote = `Esta obra que você tem em mãos (ou na sua tela) é um convite à reflexão crítica sobre como nossas visões de mundo moldam nossa interpretação da realidade. Nas páginas que se seguem, apresentamos uma coleção de crônicas ficcionais que exploram como diferentes perspectivas ideológicas influenciam nossa compreensão dos mesmos eventos e fenômenos sociais.

Os personagens, diálogos e situações descritos nestas narrativas são inteiramente fictícios, mesmo quando fazem referência a figuras históricas reais ou a obras conhecidas como o Manifesto Comunista de Marx e Engels, que aparece como referência recorrente. Essas menções servem apenas como pontos de ancoragem para tornar mais vívidas e acessíveis as questões filosóficas, políticas e sociais exploradas em cada texto.

O foco principal destas crônicas é ilustrar como o viés de confirmação — nossa tendência humana de valorizar informações que confirmam nossas crenças preexistentes — influencia profundamente nossa compreensão do mundo, da história e uns dos outros. Cada personagem representa um modo particular de filtrar a realidade, selecionando evidências que corroboram suas visões prévias e ignorando aquelas que as contradizem.

Reconhecemos que existem desequilíbrios históricos no tratamento de certas ideias. Desde sua concepção, conceitos associados ao comunismo ou socialismo frequentemente enfrentaram rejeição imediata — o próprio Marx aludiu a isso ao mencionar "um espectro que ronda a Europa" — muitas vezes sem a oportunidade de serem discutidos com a mesma seriedade concedida a outras perspectivas econômicas e sociais. Este fenômeno, onde o debate substantivo é substituído por reações emocionais ou desqualificações a priori, é em si mesmo uma manifestação do viés de confirmação que estas narrativas buscam explorar.

No entanto, o mesmo ocorre em sentido inverso. Defensores fervorosos de perspectivas à esquerda podem igualmente rejeitar críticas válidas ou ignorar evidências contraditórias, presos em suas próprias bolhas ideológicas.

Em tempos de polarização extrema e bolhas informacionais, estas crônicas nos convidam a um exercício de empatia e humildade intelectual. Ao acompanhar personagens que interpretam as mesmas realidades de maneiras radicalmente diferentes, somos desafiados a questionar nossas próprias certezas e a considerar perspectivas alternativas. Nestas narrativas, personagens fictícios confrontam suas convicções, descobrem contradições em seus próprios sistemas de crenças e, ocasionalmente, encontram pontos de contato com aqueles que consideram adversários ideológicos.

É importante observar que todos os textos desta coleção foram cuidadosamente revisados antes da publicação. Este processo de revisão não visa neutralizar posições ideológicas, mas garantir que o material atinja seu objetivo de estimular o pensamento crítico sem reforçar estereótipos prejudiciais ou desinformação.

Se durante a leitura você sentir desconforto, irritação ou revolta com alguma das narrativas apresentadas, reconheça que essa reação pode ser precisamente o que os textos buscam provocar. Qualquer resposta emocional intensa, independentemente do lado ideológico que você ocupe, é uma oportunidade valiosa para examinar seus próprios vieses. Estas reações não indicam uma falha, mas sim que você está diante da oportunidade de crescimento que a obra propõe. Talvez você ainda não esteja completamente aberto a certos questionamentos, mas o fato de estar lendo este material já é um passo significativo. Quem sabe na próxima reflexão seja possível uma abordagem mais contemplativa e menos reativa.

Este material foi concebido tanto para leitura individual quanto para discussões em grupo, em contextos educacionais ou informais. Cada crônica é uma porta de entrada para conversas profundas sobre ideologia, história, tecnologia e comunicação no mundo contemporâneo. Não se trata de relativizar todas as posições nem de sugerir que todas as interpretações sejam igualmente válidas, mas de convidar à reflexão sobre como construímos nossas convicções e como, muitas vezes, resistimos a informações que desafiam nossa visão estabelecida do mundo.

Esperamos que estas narrativas possam servir como pontes de entendimento entre diferentes visões de mundo, não para eliminar as diferenças de perspectiva – o que seria empobrecedor – mas para enriquecer nosso diálogo coletivo através do reconhecimento consciente de nossos próprios vieses.

Convidamos os leitores a abordarem estas narrativas com mente aberta, dispostos a examinar seus próprios preconceitos. Afinal, o primeiro passo para superar o viés de confirmação é reconhecer sua existência em nós mesmos.

Boa leitura, boas reflexões e, acima de tudo, bons diálogos.

Nota de Originalidade: Confirmo que todas as crônicas apresentadas nesta coleção são obras originais, criadas especificamente para este projeto. Qualquer semelhança com obras existentes é coincidência, embora os temas e conceitos explorados façam parte, naturalmente, de uma longa tradição de reflexão sobre ideologias políticas e narrativas sociais.

Nota sobre a Criação: É importante ressaltar que as narrativas apresentadas nesta obra foram geradas utilizando inteligência artificial, sob a direção conceitual, visão e propósito estabelecidos pelo autor. Embora a construção textual tenha sido realizada por IA, o conceito, a intenção de "furar bolhas" ideológicas e o direcionamento filosófico que fundamentam esta coleção são inteiramente elaborados pelo criador humano do conteúdo. Esta colaboração entre criatividade humana e tecnologia representa, em si mesma, um exemplo de como ferramentas contemporâneas podem ser utilizadas para estimular reflexões sobre nossa forma de interpretar o mundo.`;

  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="mb-6">
          <Link to="/library" className="inline-flex items-center text-primary hover:underline mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Voltar para a biblioteca
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4 animate-slide-up">
            {chronicle.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-600 dark:text-gray-400 mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              {new Date(chronicle.date).toLocaleDateString('pt-BR')}
            </div>
            
            <div>
              Por <span className="font-medium">{chronicle.author}</span>
            </div>
            
            <a 
              href={chronicle.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-primary hover:underline"
            >
              Ver original <ExternalLink className="h-4 w-4 ml-1" />
            </a>
          </div>
          
          <div className="flex flex-wrap gap-2 mb-8">
            {chronicle.tags.map(tag => (
              <span 
                key={tag}
                className="inline-flex items-center text-xs bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full"
              >
                <Tag className="w-3 h-3 mr-1 opacity-70" />
                {tag}
              </span>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-8">
          <div className="lg:col-span-5">
            <div className="glass-card p-6 mb-8 animate-slide-up prose prose-gray dark:prose-invert max-w-none" style={{ animationDelay: '0.2s' }}>
              <div className="text-lg">
                {formatContent(chronicle.content)}
              </div>
            </div>
            
            <Accordion type="single" collapsible className="glass-card mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <AccordionItem value="note" className="border-none">
                <AccordionTrigger className="px-6 py-4 text-primary hover:no-underline font-medium">
                  <div className="flex items-center">
                    <Info className="h-4 w-4 mr-2" />
                    Sobre as Crônicas do Espelho Invertido
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                  {chronicleNote}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          
          <div className="lg:col-span-2">
            {relatedTopics.length > 0 && (
              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h3 className="text-xl font-medium mb-4">Debates Relacionados</h3>
                <div className="space-y-4">
                  {relatedTopics.map(topic => (
                    <DebateTopicCard 
                      key={topic.id} 
                      topic={topic} 
                      className="text-sm"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChronicleDetail;
