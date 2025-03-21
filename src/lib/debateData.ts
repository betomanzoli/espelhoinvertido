
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

export interface Chronicle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  url: string;
  tags: string[];
  relatedTopics?: string[]; // IDs of related debate topics
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

// Chronicles from Espelho Invertido
export const chronicles: Chronicle[] = [
  {
    id: 'alienacao-digital',
    title: 'Alienação na Era Digital: O Paradoxo da Hiperconexão',
    excerpt: 'Como as plataformas digitais transformam nossa relação com o trabalho e o lazer, criando novas formas de alienação enquanto prometem liberdade.',
    content: `A alienação, conceito central no pensamento marxista, ganha novas dimensões na era digital. 
    
    Enquanto as redes sociais e plataformas digitais prometem conexão e liberdade, frequentemente nos transformam em mercadorias. Nossos dados, atenções e interações se tornam produtos a serem vendidos, em um processo que Marx reconheceria como uma evolução da exploração capitalista.
    
    A "economia do compartilhamento" e o trabalho em plataformas digitais representam uma nova fronteira da precarização, onde trabalhadores são reduzidos a perfis algorítmicos, privados de direitos básicos e sujeitos à vigilância constante. O paradoxo é que esta forma avançada de alienação vem embalada como liberdade e empreendedorismo.
    
    A hiperconexão digital, longe de nos emancipar, criou novas dependências e fragilidades. Estamos conectados o tempo todo, mas cada vez mais distantes de compreender as forças econômicas e políticas que moldam nossas vidas digitais.`,
    author: 'Carlos Mendes',
    date: '2023-10-15',
    url: 'https://espelhoinvertido.substack.com/alienacao-digital',
    tags: ['alienação', 'digital', 'trabalho', 'plataformas'],
    relatedTopics: ['automacao-trabalho', 'fetichismo-mercadoria']
  },
  {
    id: 'dataismo-religiao',
    title: 'Dataísmo: A Nova Religião do Século XXI',
    excerpt: 'Como o culto aos dados e algoritmos está se tornando uma nova forma de fé, substituindo narrativas tradicionais com promessas de otimização e eficiência.',
    content: `O dataísmo emerge como uma nova cosmovisão que adora o fluxo de dados como valor supremo. Se no passado religiões veneravam deuses e ideologias políticas como o liberalismo exaltavam o indivíduo, o dataísmo venera os algoritmos.
    
    Esta nova fé promete salvação através da otimização. Ao entregar nossos dados aos algoritmos, recebemos em troca recomendações personalizadas, rotas eficientes e decisões "objetivas". A autoridade transferiu-se dos sacerdotes e especialistas humanos para os sistemas de IA, presumidamente livres de vieses.
    
    O problema fundamental é que, assim como nas religiões tradicionais, os fiéis raramente compreendem os mecanismos profundos de seus objetos de fé. Os algoritmos que determinam o que vemos, consumimos e como nos movemos permanecem opacos, controlados por corporações que se tornaram os novos intermediários do conhecimento.
    
    A promessa dataísta de objetividade esconde uma realidade incômoda: algoritmos reproduzem e amplificam desigualdades existentes, agora com o verniz de neutralidade científica.`,
    author: 'Luiza Campos',
    date: '2023-08-22',
    url: 'https://espelhoinvertido.substack.com/dataismo-religiao',
    tags: ['algoritmos', 'dataísmo', 'tecnologia', 'ideologia'],
    relatedTopics: ['desinformacao-polarizacao']
  },
  {
    id: 'commons-digitais',
    title: 'Comuns Digitais: Alternativas ao Capitalismo de Plataforma',
    excerpt: 'Explorando modelos cooperativos e de propriedade comunitária que desafiam o domínio das big techs sobre nossa infraestrutura digital.',
    content: `Os comuns (commons) representaram historicamente uma alternativa tanto ao controle estatal quanto ao mercado privado. Na era digital, iniciativas como software livre, Wikipedia e plataformas cooperativas ressuscitam este conceito para criar espaços não-mercantilizados na internet.
    
    Estas alternativas enfrentam o mesmo desafio histórico dos comuns físicos: a tendência do capital de cercar e privatizar recursos compartilhados. O processo que Marx chamou de "acumulação primitiva" se repete no ambiente digital através de patentes de software, propriedade intelectual restritiva e captura corporativa de inovações originalmente abertas.
    
    Plataformas cooperativas como alternativas ao Uber e Airbnb demonstram que é possível criar tecnologia que serve aos usuários e trabalhadores, não apenas aos investidores. Estas experiências, ainda marginais, apontam caminhos para uma economia digital que não reproduza as desigualdades do capitalismo industrial.
    
    A batalha pelos comuns digitais representa, em última análise, uma disputa pelo futuro da própria internet: será ela dominada por monopólios digitais ou poderá florescer como um espaço genuinamente democratizado?`,
    author: 'Rafael Martins',
    date: '2023-11-05',
    url: 'https://espelhoinvertido.substack.com/commons-digitais',
    tags: ['comuns', 'cooperativas', 'plataformas', 'alternativas'],
    relatedTopics: ['propriedade-intelectual']
  },
  {
    id: 'financeirizacao-cultura',
    title: 'Financeirização da Cultura: NFTs, Streaming e a Mercantilização da Criatividade',
    excerpt: 'Como o capitalismo financeiro transformou expressões culturais em ativos especulativos, alterando fundamentalmente a produção artística contemporânea.',
    content: `A cultura, antes vista como esfera relativamente autônoma, tornou-se um frontier de expansão do capital financeiro. NFTs transformam obras digitais em ativos especulativos, plataformas de streaming quantificam o valor cultural através de algoritmos, e a atenção do público se torna mercadoria primária.
    
    Marx já antevia como o capitalismo tenderia a subordinar todas as esferas da vida humana à lógica da mercadoria. O que testemunhamos hoje é um aprofundamento deste processo, com expressões culturais não apenas comercializadas, mas transformadas em veículos para especulação financeira.
    
    Plataformas como Spotify não apenas distribuem música, mas fundamentalmente alteram como ela é produzida. O "formato streaming" privilegia canções curtas, com refrões imediatos e sem experimentação - a expressão algorítmica do valor de troca superando o valor de uso da expressão artística.
    
    Resistências emergem através de plataformas alternativas, financiamento direto por fãs e movimentos de código aberto na arte digital. Estas iniciativas representam tentativas de resgatar o valor cultural da lógica puramente financeira.`,
    author: 'Ana Ribeiro',
    date: '2023-09-30',
    url: 'https://espelhoinvertido.substack.com/financeirizacao-cultura',
    tags: ['cultura', 'arte', 'financeirização', 'nfts'],
    relatedTopics: ['propriedade-intelectual', 'fetichismo-mercadoria']
  },
  {
    id: 'tecno-colonialismo',
    title: 'Tecno-colonialismo: Como o Sul Global Alimenta a IA do Norte',
    excerpt: 'A extração de dados e trabalho digital precário revela as novas dinâmicas coloniais na economia digital global.',
    content: `O desenvolvimento da inteligência artificial e tecnologias digitais avançadas depende de vastas quantidades de dados e trabalho humano invisível, frequentemente extraídos do Sul Global. Trabalhadores em países como Filipinas, Quênia e Brasil realizam a "faxina digital" - moderando conteúdo traumático, etiquetando dados e realizando micro-tarefas que treinam os mesmos algoritmos de IA que ameaçam seus empregos.
    
    Esta dinâmica espelha as relações coloniais clássicas: extração de recursos (agora dados e trabalho cognitivo) das periferias para alimentar o desenvolvimento tecnológico dos centros globais. A mais-valia gerada por este trabalho digital precário é apropriada por corporações de tecnologia do Norte Global.
    
    As grandes plataformas de tecnologia extraem dados de populações globais, mas concentram o desenvolvimento de tecnologia, patentes e lucros em poucos centros. Enquanto o Vale do Silício se beneficia do processamento e monetização destes dados, as populações que os fornecem raramente participam dos ganhos ou decisões sobre como seus dados são utilizados.
    
    Alternativas emergentes incluem soberania de dados, tecnologias de código aberto desenvolvidas no Sul Global e movimentos por justiça de dados que buscam reequilibrar estas relações de poder tecnológico.`,
    author: 'Paulo Oliveira',
    date: '2023-12-10',
    url: 'https://espelhoinvertido.substack.com/tecno-colonialismo',
    tags: ['colonialismo', 'tecnologia', 'sul global', 'trabalho digital'],
    relatedTopics: ['automacao-trabalho', 'nacionalismo-globalizacao']
  }
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
  }
];
