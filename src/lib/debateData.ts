
// Types
export interface Character {
  id: string;
  name: string;
  role: string;
  description: string;
  imageUrl: string;
  accent: string;
}

export interface DebateTopic {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'basic' | 'intermediate' | 'advanced';
  tags: string[];
  imageUrl?: string;
}

export interface Concept {
  term: string;
  definition: string;
  source: string;
}

// Characters data
export const characters: Character[] = [
  {
    id: 'rafael',
    name: 'Rafael',
    role: 'Historiador',
    description: 'Especialista em história econômica e social, Rafael traz perspectivas históricas para contextualizar debates contemporâneos, relacionando eventos passados com tendências atuais.',
    imageUrl: '/rafael.png', // We'll need to create this asset
    accent: 'burgundy',
  },
  {
    id: 'luisa',
    name: 'Luísa',
    role: 'Jornalista',
    description: 'Com experiência em jornalismo investigativo, Luísa analisa criticamente a mídia e questiona narrativas estabelecidas, trazendo dados e evidências atuais para o debate.',
    imageUrl: '/luisa.png', // We'll need to create this asset
    accent: 'navy',
  },
];

// Debate topics
export const debateTopics: DebateTopic[] = [
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual no Capitalismo Digital',
    description: 'Explore as contradições entre o livre fluxo de informações e a mercantilização do conhecimento na era digital.',
    category: 'Economia',
    difficulty: 'intermediate',
    tags: ['capitalismo', 'digital', 'propriedade', 'conhecimento'],
  },
  {
    id: 'desinformacao-polarizacao',
    title: 'Desinformação e Polarização Política',
    description: 'Analise como as estruturas de mídia e redes sociais podem amplificar divisões sociais e influenciar o debate democrático.',
    category: 'Mídia',
    difficulty: 'basic',
    tags: ['mídia', 'democracia', 'polarização', 'redes sociais'],
  },
  {
    id: 'fetichismo-mercadoria',
    title: 'Fetichismo da Mercadoria na Era do Consumo',
    description: 'Discuta como produtos adquirem valores simbólicos além de seu valor de uso e como isso molda comportamentos sociais.',
    category: 'Filosofia',
    difficulty: 'advanced',
    tags: ['consumo', 'marxismo', 'mercadoria', 'simbolismo'],
  },
  {
    id: 'automacao-trabalho',
    title: 'Automação e o Futuro do Trabalho',
    description: 'Considere as implicações sociais e econômicas da automação crescente e suas consequências para o emprego e a estrutura social.',
    category: 'Tecnologia',
    difficulty: 'intermediate',
    tags: ['automação', 'trabalho', 'tecnologia', 'sociedade'],
  },
  {
    id: 'nacionalismo-globalizacao',
    title: 'Nacionalismo vs. Globalização',
    description: 'Compare perspectivas sobre soberania nacional no contexto de uma economia e cultura cada vez mais globalizadas.',
    category: 'Política',
    difficulty: 'intermediate',
    tags: ['nacionalismo', 'globalização', 'soberania', 'cultura'],
  },
];

// Library of concepts
export const conceptLibrary: Concept[] = [
  {
    term: 'mais-valia',
    definition: 'Conceito marxista que representa a diferença entre o valor produzido pelo trabalho e o salário pago ao trabalhador, apropriado pelo capitalista como lucro.',
    source: 'O Capital, Karl Marx',
  },
  {
    term: 'fetichismo da mercadoria',
    definition: 'Fenômeno social em que as relações entre as pessoas assumem a forma de relações entre coisas, atribuindo às mercadorias propriedades sociais como se fossem naturais a elas.',
    source: 'O Capital, Karl Marx',
  },
  {
    term: 'hegemonia cultural',
    definition: 'Dominação ideológica de uma classe social sobre outras através do controle da cultura, educação e meios de comunicação, estabelecendo seus valores como universais.',
    source: 'Cadernos do Cárcere, Antonio Gramsci',
  },
  {
    term: 'polarização política',
    definition: 'Processo em que as opiniões políticas se dividem em extremos opostos, com pouco espaço para posições intermediárias, intensificando o conflito social.',
    source: 'A Era dos Extremos, Eric Hobsbawm',
  },
  {
    term: 'neoliberalismo',
    definition: 'Teoria política e econômica que defende a redução da intervenção estatal na economia, a privatização, a desregulamentação e o livre mercado.',
    source: 'A Brief History of Neoliberalism, David Harvey',
  },
];

// Sample debate messages for UI demonstration
export const sampleMessages = [
  {
    id: '1',
    character: 'rafael',
    content: 'Considerando a questão da propriedade intelectual, é interessante notar como o conceito evoluiu historicamente. No século XVIII, as primeiras leis de copyright visavam proteger principalmente os editores, não os autores.',
    timestamp: new Date(Date.now() - 1000 * 60 * 25),
  },
  {
    id: '2',
    character: 'luisa',
    content: 'É verdade, Rafael. E hoje vemos uma contradição interessante: enquanto o capitalismo digital depende da ideia de propriedade intelectual para gerar lucro, também vemos movimentos como o software livre e o acesso aberto desafiando esse modelo. Como você avalia essa tensão?',
    timestamp: new Date(Date.now() - 1000 * 60 * 24),
  },
  {
    id: '3',
    character: 'user',
    content: 'Acho que as empresas de tecnologia exploram essa contradição conforme lhes convém. Usam código aberto quando beneficia sua infraestrutura, mas protegem agressivamente suas inovações lucrativas.',
    timestamp: new Date(Date.now() - 1000 * 60 * 22),
  },
  {
    id: '4',
    character: 'rafael',
    content: 'Uma observação perspicaz. Historicamente, podemos traçar um paralelo com o modo como os primeiros capitalistas industriais aproveitaram os bens comuns enquanto defendiam o cercamento de terras. O conceito de "cercamento digital" nos ajuda a entender como plataformas transformam interações sociais em propriedade privada.',
    timestamp: new Date(Date.now() - 1000 * 60 * 20),
  },
  {
    id: '5',
    character: 'luisa',
    content: 'Isso me lembra o conceito de "mais-valia" no contexto digital. Quando usamos plataformas "gratuitas", nós somos o produto - nossos dados e atenção geram valor que é capturado pelas empresas sem compensação direta.',
    timestamp: new Date(Date.now() - 1000 * 60 * 18),
    highlightTerms: ['mais-valia'],
  },
];
