import { ExternalLink, MessageCircle, History, Users, Scale, Briefcase, Puzzle } from 'lucide-react';

export interface Character {
  id: string;
  name: string;
  role: string;
  avatar: string;
  accent: 'burgundy' | 'navy';
  description: string;
}

export interface MessageType {
  id: string;
  character: string;
  content: string;
  timestamp: Date;
  highlightTerms?: string[];
  mentionedPost?: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
  icon: React.ComponentType;
  coverImage?: string;
}

export interface Chronicle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
  url: string;
  relatedTopics?: string[];
}

export interface Concept {
  term: string;
  definition: string;
  source: string;
}

export const characters: Character[] = [
  {
    id: 'rafael',
    name: 'Rafael Martins',
    role: 'Ex-professor universitário',
    avatar: 'https://images.unsplash.com/photo-1564564321837-a57b7070ac4f?w=300&auto=format&fit=crop&q=60',
    accent: 'navy',
    description: 'Historiador e filósofo político, Rafael contextualiza questões dentro de um amplo panorama histórico e teórico. Usa perguntas socráticas para estimular reflexão crítica.'
  },
  {
    id: 'luisa',
    name: 'Luísa Campos',
    role: 'Jornalista investigativa',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&auto=format&fit=crop&q=60',
    accent: 'burgundy',
    description: 'Especialista em mídia digital, Luísa conecta conceitos abstratos com exemplos concretos do cotidiano. Apresenta dados e casos práticos da atualidade.'
  }
];

export const debateTopics: DebateTopic[] = [
  {
    id: 'alienacao-digital',
    title: 'Alienação na Era Digital',
    description: 'Como os conceitos de alienação do trabalho se aplicam às plataformas digitais e à economia de aplicativos moderna.',
    category: 'Trabalho Digital',
    difficulty: 'intermediate',
    tags: ['Alienação', 'Plataformas', 'Gig Economy', 'Trabalho Digital'],
    icon: Briefcase,
    coverImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'fetichismo-mercadoria',
    title: 'Fetichismo da Mercadoria Hoje',
    description: 'Explorando como produtos digitais, mídias sociais e o consumo virtual transformam as relações sociais em relações entre coisas.',
    category: 'Consumo',
    difficulty: 'advanced',
    tags: ['Fetichismo', 'Mercadoria', 'Redes Sociais', 'Consumo Digital'],
    icon: Scale,
    coverImage: 'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'contranarrativas',
    title: 'Construindo Contranarrativas',
    description: 'Como criar e difundir narrativas alternativas frente ao discurso hegemônico dos grandes meios de comunicação.',
    category: 'Mídia',
    difficulty: 'intermediate',
    tags: ['Contranarrativa', 'Hegemonia', 'Mídia Alternativa', 'Comunicação'],
    icon: MessageCircle,
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'classes-digitais',
    title: 'Classes Sociais na Era Digital',
    description: 'Como as novas tecnologias redefinem ou reproduzem as estruturas de classe existentes na sociedade contemporânea.',
    category: 'Estrutura Social',
    difficulty: 'advanced',
    tags: ['Classes', 'Digital', 'Desigualdade', 'Estrutura Social'],
    icon: Users,
    coverImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'introducao-manifesto',
    title: 'Introdução ao Manifesto Comunista',
    description: 'Uma explicação acessível dos principais conceitos e do contexto histórico do Manifesto Comunista.',
    category: 'Teoria',
    difficulty: 'basic',
    tags: ['Manifesto', 'Introdução', 'História', 'Marxismo'],
    icon: History,
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'contradições-capitalismo',
    title: 'Contradições do Capitalismo',
    description: 'Examinando as tensões internas do sistema capitalista e como elas se manifestam nas crises econômicas e sociais.',
    category: 'Economia',
    difficulty: 'intermediate',
    tags: ['Contradições', 'Crises', 'Capitalismo', 'Economia'],
    icon: Puzzle,
    coverImage: 'https://images.unsplash.com/photo-1579532536935-619928decd08?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual e Comuns',
    description: 'O debate entre propriedade intelectual e conhecimento como bem comum na era da internet e compartilhamento digital.',
    category: 'Digital',
    difficulty: 'intermediate',
    tags: ['Propriedade Intelectual', 'Bens Comuns', 'Copyright', 'Compartilhamento'],
    icon: ExternalLink,
    coverImage: 'https://images.unsplash.com/photo-1605455587175-1d4b807a69b8?w=800&auto=format&fit=crop&q=60'
  }
];

export const sampleMessages: MessageType[] = [
  {
    id: 'welcome-rafael',
    character: 'rafael',
    content: 'Olá! Sou Rafael Martins, historiador e ex-professor universitário. Estou aqui para explorar conceitos políticos e econômicos através de uma perspectiva histórica e teórica.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5)
  },
  {
    id: 'welcome-luisa',
    character: 'luisa',
    content: 'E eu sou Luísa Campos, jornalista investigativa. Meu foco é conectar ideias abstratas com exemplos práticos do cotidiano, especialmente no contexto das mídias digitais e tecnologias atuais.',
    timestamp: new Date(Date.now() - 1000 * 60 * 4)
  },
  {
    id: 'welcome-together',
    character: 'rafael',
    content: 'Estamos aqui para dialogar sobre temas do Manifesto Comunista e outras teorias críticas, mas não como dogmas. Vamos explorar como essas ideias nos ajudam a entender o mundo contemporâneo.',
    timestamp: new Date(Date.now() - 1000 * 60 * 3),
    highlightTerms: ['Manifesto Comunista']
  },
  {
    id: 'welcome-question',
    character: 'luisa',
    content: 'Como podemos te ajudar hoje? Você pode fazer perguntas sobre conceitos específicos, pedir exemplos práticos ou explorar como diferentes perspectivas interpretam os mesmos eventos.',
    timestamp: new Date(Date.now() - 1000 * 60 * 2)
  }
];

export const conceptLibrary: Concept[] = [
  {
    term: "Mais-valia",
    definition: "Conceito central na teoria marxista que descreve o valor produzido pelo trabalhador que excede o valor de seu salário e é apropriado pelo capitalista como lucro.",
    source: "O Capital, Karl Marx (1867)"
  },
  {
    term: "Alienação",
    definition: "Processo no qual os trabalhadores se tornam estranhos ao produto de seu trabalho, à atividade produtiva, à sua natureza humana e a outros trabalhadores devido às condições do trabalho capitalista.",
    source: "Manuscritos Econômico-Filosóficos, Karl Marx (1844)"
  },
  {
    term: "Fetichismo da mercadoria",
    definition: "Fenômeno social e psicológico onde as mercadorias parecem ter vida própria e valores intrínsecos, ocultando as relações sociais envolvidas em sua produção.",
    source: "O Capital, Karl Marx (1867)"
  },
  {
    term: "Hegemonia cultural",
    definition: "Dominação ideológica de uma classe social sobre outras através do controle de instituições culturais, estabelecendo suas visões de mundo como naturais e inevitáveis.",
    source: "Cadernos do Cárcere, Antonio Gramsci (1929-1935)"
  },
  {
    term: "Neoliberalismo",
    definition: "Conjunto de políticas econômicas que enfatizam a desregulamentação dos mercados, privatização, austeridade fiscal e redução do papel do Estado na economia.",
    source: "Breve História do Neoliberalismo, David Harvey (2005)"
  }
];

export const chronicles: Chronicle[] = [
  {
    id: "1",
    title: "Duas Bibliotecas, Uma História",
    excerpt: "Como diferentes narrativas históricas são construídas a partir das mesmas fontes primárias.",
    date: "2024-02-15",
    author: "Rafael Martins",
    tags: ["História", "Ideologia", "Narrativas"],
    content: `Entrei em duas bibliotecas no mesmo dia. A primeira, organizada pela Fundação Liberal, e a segunda, mantida pelo Centro de Estudos Socialistas. Ambas eram dedicadas ao mesmo período histórico: as revoluções e contrarrevoluções do século XX.

Na primeira biblioteca, os livros estavam organizados para contar uma história sobre o perigo das utopias coletivistas e como os regimes socialistas inevitavelmente levaram à opressão e ao fracasso econômico. Na segunda, os volumes contavam a história de movimentos populares lutando por direitos e dignidade, frequentemente esmagados por intervenções imperialistas e sabotagem econômica.

O mais fascinante era que, em muitos casos, ambas as bibliotecas utilizavam as mesmas fontes primárias - os mesmos documentos, cartas, relatórios econômicos - mas construíam narrativas completamente distintas.

Nos dias seguintes, passei a examinar como cada biblioteca tratava eventos específicos. A Revolução Russa, por exemplo: na primeira biblioteca, era retratada exclusivamente como uma tomada violenta de poder que levou ao totalitarismo. Na segunda, como um levante popular contra condições desumanas que, apesar de suas contradições posteriores, demonstrou a possibilidade de uma reorganização social radical.

É tentador concluir que "a verdade está no meio", mas essa seria uma saída fácil. O que aprendi foi algo diferente: que a história nunca é apenas uma coleção de "fatos", mas sempre uma narrativa construída a partir deles. E nessa construção, quem escolhe quais fatos incluir, quais omitir, e como contextualizá-los, exerce um imenso poder ideológico.

O mais revelador foi perceber que esse fenômeno não estava limitado a temas obviamente políticos. Mesmo em assuntos aparentemente técnicos, como história econômica, as mesmas estatísticas eram interpretadas de maneiras radicalmente diferentes.

Voltei às duas bibliotecas várias vezes. Não para escolher uma delas como "a verdadeira", mas para aprender a ler criticamente, identificando as premissas não declaradas, as omissões estratégicas e as estruturas narrativas em cada uma. Foi um exercício intelectual que me ensinou mais sobre ideologia do que qualquer curso teórico poderia ter feito.

No final, entendi que o verdadeiro poder não está apenas em quem controla os meios de produção material, mas também em quem controla os meios de produção das narrativas históricas. Como dizia Marx no Manifesto Comunista, "as ideias da classe dominante são, em cada época, as ideias dominantes", e isso se reflete diretamente na forma como a história é escrita, organizada e disseminada.`,
    url: "/library/chronicle/1",
    relatedTopics: ["introducao-manifesto", "contranarrativas"]
  },
  {
    id: "2",
    title: "O Espectro Que Recusamos Ver",
    excerpt: "Uma análise contemporânea do primeiro parágrafo do Manifesto Comunista.",
    date: "2024-01-22",
    author: "Luísa Campos",
    tags: ["Ideologia", "Manifesto", "Teoria", "Mídia"],
    content: `"Um espectro ronda a Europa — o espectro do comunismo. Todas as potências da velha Europa uniram-se numa Santa Aliança para conjurá-lo: o papa e o czar, Metternich e Guizot, radicais franceses e policiais alemães."

Este é o célebre parágrafo de abertura do Manifesto Comunista, escrito por Marx e Engels em 1848. O que me fascina não é apenas seu valor histórico, mas como ele permanece surpreendentemente atual — ainda que de maneiras que seus autores jamais poderiam prever.

Hoje, mais de 175 anos depois, não é tanto um espectro que ronda a Europa ou o mundo, mas um nome que continua a provocar reações viscerais. Mencione "Marx" ou "comunismo" em uma conversa casual, e observe as reações. Mesmo entre pessoas que nunca leram uma linha sequer de teoria marxista, há frequentemente uma rejeição imediata, um fechamento ao diálogo.

Este fenômeno me interessa profundamente como jornalista. Por que certas ideias são rejeitadas antes mesmo de serem compreendidas? Como se formam essas barreiras cognitivas que impedem até mesmo a consideração de determinadas perspectivas?

Em minhas pesquisas sobre algoritmos de redes sociais, descobri algo revelador: conteúdos que mencionam positivamente termos como "socialismo" ou "Marx" frequentemente enfrentam shadowbans ou redução de alcance em diversas plataformas. Não por política explícita dessas empresas, mas por uma combinação de fatores mais sutis: os algoritmos aprendem que tais conteúdos geram polarização, o que pode reduzir o tempo que os usuários passam na plataforma (ou não — a polarização também pode aumentar o engajamento, dependendo de como é apresentada).

A "Santa Aliança" contemporânea não é composta por papas e czares, mas por algoritmos, vieses cognitivos e uma infraestrutura midiática que normaliza certos pressupostos econômicos como "realistas" e outros como "utópicos" ou "perigosos".

Meu ponto não é defender o comunismo como sistema — sistemas políticos devem ser debatidos criticamente em seus méritos e falhas. O que me preocupa é a impossibilidade de termos debates genuínos quando certas ideias são descartadas automaticamente, não por seus conteúdos, mas pelos rótulos a elas atribuídos.

Como dizia o próprio Marx, "a tradição de todas as gerações mortas oprime como um pesadelo o cérebro dos vivos". Talvez nosso desafio hoje seja reconhecer os pesadelos históricos e ideológicos que continuam a moldar nosso pensamento, muitas vezes sem que percebamos.`,
    url: "/library/chronicle/2",
    relatedTopics: ["introducao-manifesto", "contranarrativas"]
  },
  {
    id: "3",
    title: "Capitalismo de Plataforma",
    excerpt: "Como as novas relações de trabalho digital mascaram formas tradicionais de exploração.",
    date: "2024-03-05",
    author: "Rafael Martins",
    tags: ["Economia", "Tecnologia", "Trabalho", "Digital"],
    content: `O motorista do aplicativo trabalha 14 horas por dia para compensar as taxas crescentes da plataforma. A influenciadora digital produz conteúdo incessantemente para satisfazer o algoritmo que determina sua visibilidade. O entregador pedala sob chuva, sem direitos trabalhistas, recebendo por entrega. Bem-vindos ao capitalismo de plataforma — a mais recente metamorfose de um sistema em constante reinvenção.

O conceito marxista de mais-valia — o valor excedente extraído do trabalho e apropriado como lucro — nunca esteve tão presente, ainda que camuflado sob novas roupagens. A diferença é que agora os trabalhadores são chamados de "parceiros", "colaboradores" ou "empreendedores", enquanto as relações de exploração se intensificam sob a aparência de liberdade e flexibilidade.

O que torna o capitalismo de plataforma particularmente eficaz é sua capacidade de obscurecer as relações de classe. Quando o trabalhador entrega comida através de um aplicativo, ele não vê um patrão, mas uma interface digital. A exploração é mediada por algoritmos que, apresentados como neutros e objetivos, são na verdade expressões codificadas de relações de poder.

Analisemos o caso dos motoristas de aplicativo. Enquanto a narrativa dominante enfatiza a flexibilidade de horários e a "autonomia", a realidade econômica revela outra história: muitos precisam trabalhar jornadas exaustivas para garantir a sobrevivência, enquanto as empresas capturam uma parcela cada vez maior do valor gerado sem assumir responsabilidades trabalhistas.

O mais fascinante é como as tecnologias digitais permitem formas de controle e supervisão que seriam inimagináveis nas fábricas do século XIX que Marx observou. Os trabalhadores são constantemente monitorados, avaliados por sistemas de reputação que funcionam como disciplinadores invisíveis, e submetidos a um gerenciamento algorítmico que intensifica o ritmo de trabalho através de incentivos gamificados.

Historicamente, cada evolução do capitalismo foi acompanhada por narrativas que obscureciam sua natureza exploratória. No século XIX, era a ideia de que trabalhadores e industriais eram "parceiros" no progresso. Hoje, é o mito do empreendedorismo digital e da "economia compartilhada" — que de compartilhada tem muito pouco quando examinamos os fluxos de capital.

Como historiador, o que me impressiona é a continuidade sob a aparência de ruptura. Os conflitos fundamentais entre capital e trabalho permanecem, ainda que transformados. E as ferramentas conceituais desenvolvidas por Marx — adaptadas ao contexto contemporâneo — continuam surpreendentemente úteis para desvelar essas relações.

A questão que nos cabe é: que formas de organização e resistência são possíveis neste novo contexto? Como trabalhadores atomizados, sem um chão de fábrica comum, podem desenvolver consciência coletiva e poder de barganha? As respostas ainda estão sendo construídas, mas começam pela desmistificação das relações reais que se escondem sob o verniz tecnológico.`,
    url: "/library/chronicle/3",
    relatedTopics: ["alienacao-digital", "classes-digitais"]
  }
];
