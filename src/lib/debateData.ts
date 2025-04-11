import { Briefcase, ExternalLink, History, MessageCircle, Puzzle, Scale, Users } from 'lucide-react';

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
  content: string;
  date: string;
  author: string;
  tags: string[];
  url: string;
  image?: string;
  relatedTopics?: string[];
}

export interface Concept {
  id: string;
  term: string;
  definition: string;
  source: string;
  relatedTerms: string[];
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

export const chronicles: Chronicle[] = [
  {
    id: '1',
    title: 'A Digitalização do Trabalho e suas Contradições',
    excerpt: 'Como as plataformas digitais estão transformando nossas relações de trabalho e revivendo formas de exploração que pareciam superadas.',
    content: 'As plataformas digitais de trabalho têm sido celebradas como exemplos de inovação e eficiência no capitalismo contemporâneo. Aplicativos de entrega, transporte e serviços domésticos prometem conectar consumidores e trabalhadores de forma direta, eliminando intermediários e criando novas oportunidades de renda. No entanto, por trás dessa narrativa de modernização e liberdade, esconde-se uma realidade bem mais complexa.\n\nO que testemunhamos hoje é, em muitos aspectos, um retorno a formas de trabalho do início da Revolução Industrial, revestidas com uma aparência tecnológica e contemporânea. Os trabalhadores de aplicativos vivenciam o que Marx chamaria de um processo intensificado de alienação.\n\nA alienação ocorre em múltiplos níveis. Primeiro, há a alienação do produto do trabalho. O entregador que percorre a cidade levando refeições raramente pode acessar esse mesmo serviço como consumidor. O motorista que transporta passageiros para aeroportos e restaurantes de luxo frequentemente não pode usufruir desses mesmos espaços.\n\nEm segundo lugar, existe a alienação do processo de produção. O algoritmo assume o papel do capataz industrial, monitorando cada segundo, cada movimento, cada interação. O trabalhador não controla seu ritmo, suas pausas ou mesmo a forma como realiza suas tarefas – tudo é determinado e avaliado por sistemas automatizados que priorizam a eficiência sobre o bem-estar humano.\n\nEm terceiro lugar, há a alienação da natureza humana social. Os trabalhadores de aplicativos são isolados uns dos outros, competem entre si por tarefas e clientes, e raramente desenvolvem laços de solidariedade que poderiam fortalecer sua posição coletiva. A filosofia do "empreendedor individual" substitui a consciência de classe.\n\nA contradição central desse modelo é evidente: enquanto as plataformas dependem inteiramente do trabalho humano para funcionar, elas simultaneamente tratam esse trabalho como um elemento descartável, uma mercadoria fungível a ser otimizada, pressionada e eventualmente substituída.\n\nAs mesmas empresas que vendem a narrativa de liberdade e flexibilidade implementam sistemas de vigilância e controle muito mais intensos e invasivos que qualquer fábrica do passado. O smartphone se torna tanto ferramenta de trabalho quanto instrumento de monitoramento constante.\n\nEnquanto isso, a relação de trabalho é deliberadamente obscurecida. Não são "funcionários", mas "parceiros", "colaboradores", "usuários". Essa nebulosidade jurídica permite que as plataformas se eximam de responsabilidades trabalhistas enquanto mantêm controle efetivo sobre o processo produtivo.\n\nTal como Marx observou no século XIX, o capitalismo continua mostrando sua capacidade de revolucionar constantemente os meios de produção sem alterar fundamentalmente as relações sociais subjacentes. A exploração ganha novas formas, mais sofisticadas e difíceis de detectar, mas permanece como princípio organizador.\n\nA saída para esse cenário não passa por rejeitar a tecnologia, mas por democratizá-la. Plataformas cooperativas, de propriedade dos próprios trabalhadores, representam uma alternativa nascente. Organizações sindicais adaptadas ao contexto digital começam a emergir. A regulação pública, embora frequentemente atrasada em relação às inovações do mercado, também tem papel fundamental.\n\nA história nos ensina que nenhuma configuração do capital permanece incontestada para sempre. As contradições geram resistência, e a resistência eventualmente obriga a ajustes. A questão é quanto tempo e quanto sofrimento humano serão necessários até que as relações de trabalho nas plataformas digitais se tornem mais justas e menos exploratórias.\n\nEnquanto celebramos a conveniência de ter produtos e serviços literalmente ao alcance de um clique, precisamos reconhecer que essa conveniência tem um custo humano. E que esse custo recai principalmente sobre aqueles que já estão em posição de maior vulnerabilidade social e econômica.',
    date: '2023-11-15',
    author: 'Rafael Martins',
    tags: ['Trabalho', 'Digital', 'Plataformas'],
    url: '/library/chronicle/1',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=60',
    relatedTopics: ['alienacao-digital', 'classes-digitais']
  },
  {
    id: '2',
    title: 'Redes Sociais como Novos Aparelhos Ideológicos',
    excerpt: 'Análise de como as plataformas de mídia social funcionam como aparelhos ideológicos contemporâneos, moldando nossa percepção da realidade.',
    content: 'Em 1970, o filósofo marxista Louis Althusser desenvolveu o conceito de "aparelhos ideológicos de Estado" para descrever as instituições que, sem recorrer primariamente à coerção, reproduzem a ideologia dominante: escolas, igrejas, família, mídia, entre outros. Hoje, meio século depois, as plataformas de redes sociais emergem como talvez os mais poderosos aparelhos ideológicos da contemporaneidade, com uma capacidade sem precedentes de moldar percepções, comportamentos e valores.\n\nA grande inovação das redes sociais como aparelhos ideológicos é sua aparência de neutralidade e horizontalidade. Diferentemente da televisão ou da imprensa tradicional, onde a distinção entre emissor e receptor é clara, as plataformas digitais se apresentam como espaços democráticos onde todos podem produzir e consumir conteúdo livremente. Essa aparência mascara relações de poder extremamente assimétricas.\n\nOs algoritmos que determinam o que vemos (e o que não vemos) em nossas timelines não são entidades neutras, mas construções sociotécnicas que incorporam valores, prioridades e vieses específicos. Quando uma plataforma prioriza conteúdo que gera "engajamento" – frequentemente medido por reações emocionais intensas como raiva, indignação ou surpresa – está implicitamente incentivando certos tipos de discurso e desencorajando outros.\n\nGramsci nos ensinou que a hegemonia cultural não se mantém apenas pela força, mas principalmente pelo consentimento dos governados. As redes sociais aperfeiçoaram a fabricação desse consentimento a níveis nunca antes vistos. O usuário tem a impressão de estar exercendo sua autonomia ao escolher quem seguir, que conteúdo consumir, com o que interagir, enquanto na realidade está navegando dentro de um ambiente cuidadosamente arquitetado para maximizar seu tempo de atenção e, consequentemente, a extração de valor através de seus dados.\n\nO modelo de negócios das plataformas, baseado na publicidade e na monetização da atenção, cria um incentivo estrutural para a fragmentação do discurso público em bolhas ideológicas herméticas. Quanto mais tempo passamos consumindo conteúdo que confirma nossas crenças preexistentes, mais expostos ficamos à publicidade, e mais lucrativas se tornam as plataformas. A polarização não é um efeito colateral indesejado, mas parte integrante da lógica de funcionamento desses espaços.\n\nAs consequências desse sistema são profundas. Conceitos e categorias que poderíamos associar a uma análise marxista – como "classe", "exploração" ou "alienação" – são sistematicamente diluídos, despolitizados ou ressignificados. O sofrimento causado por contradições estruturais do capitalismo é recodificado como falha individual, questão de "mindset" ou simplesmente azar. As soluções apresentadas raramente transcendem o âmbito individual ou ameaçam a ordem estabelecida.\n\nSimultaneamente, as redes sociais aceleram e intensificam a mercantilização de todas as esferas da vida. Relacionamentos, emoções, opiniões políticas e até traumas são transformados em conteúdo a ser monetizado. A autenticidade torna-se performance, e a crítica social frequentemente degenera em pose estética esvaziada de substância política real.\n\nIsso não significa que as plataformas sejam espaços homogêneos de reprodução ideológica. Contradições emergem constantemente. Movimentos sociais utilizam essas mesmas ferramentas para organização, conscientização e mobilização. Discursos contra-hegemônicos encontram públicos que, de outra forma, permaneceriam inacessíveis. A própria centralidade das redes sociais na vida contemporânea torna impossível que elas funcionem como sistemas perfeitamente fechados de controle ideológico.\n\nNo entanto, a assimetria de poder entre usuários e plataformas continua sendo a característica definidora dessa relação. Qualquer potencial emancipatório das redes sociais existe apesar de sua estrutura fundamental, não graças a ela. A arquitetura técnica, o modelo econômico e os incentivos comportamentais embutidos nessas plataformas favorecem consistentemente a reprodução de relações sociais existentes, não sua transformação.\n\nUma abordagem crítica das redes sociais não implica abandoná-las – isso seria tão ineficaz quanto tentar escapar individualmente das contradições do capitalismo. Em vez disso, sugere a necessidade de desenvolver uma consciência aguda sobre como esses espaços moldam nosso pensamento, regular publicamente seu funcionamento, e construir alternativas baseadas em princípios de propriedade social e democrática, não na lógica da acumulação privada.',
    date: '2023-10-22',
    author: 'Luísa Campos',
    tags: ['Mídia', 'Ideologia', 'Redes Sociais'],
    url: '/library/chronicle/2',
    image: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=800&auto=format&fit=crop&q=60',
    relatedTopics: ['contranarrativas', 'fetichismo-mercadoria']
  },
  {
    id: '3',
    title: 'Comuns Digitais e a Luta contra a Mercantilização do Conhecimento',
    excerpt: 'Explorando iniciativas de conhecimento aberto e software livre como formas de resistência à apropriação privada dos bens comuns intelectuais.',
    content: 'A noção de "cercamento dos comuns" (enclosure of the commons) descreve o processo histórico pelo qual terras anteriormente disponíveis para uso comunitário foram privatizadas na Inglaterra pré-industrial, forçando camponeses a venderem sua força de trabalho para sobreviver. Este conceito, central para a compreensão da acumulação primitiva descrita por Marx, encontra um paralelo impressionante no mundo digital contemporâneo.\n\nHoje assistimos ao cercamento dos comuns digitais: conhecimento, informação, cultura e ferramentas que poderiam ser amplamente compartilhados estão sendo progressivamente incorporados a regimes de propriedade privada e transformados em mercadorias. Patentes sobre medicamentos essenciais, copyright estendido sobre obras culturais, privatização de pesquisas financiadas com dinheiro público e a transformação do conhecimento acadêmico em produto comercial são apenas algumas manifestações desse fenômeno.\n\nEssa expansão da forma-mercadoria para o domínio do conhecimento representa uma intensificação das contradições internas do capitalismo. O conhecimento, diferentemente dos bens materiais, não obedece à lógica da escassez. Ele pode ser compartilhado indefinidamente sem perda de valor – na verdade, seu valor frequentemente aumenta com o compartilhamento. Para transformá-lo em mercadoria lucrativa, é necessário criar escassez artificial através de medidas legais, tecnológicas e coercitivas.\n\nEntretanto, assim como os cercamentos originais geraram resistência entre os camponeses despossuídos, o cercamento dos comuns digitais provocou o surgimento de movimentos contemporâneos de "commoning" – práticas coletivas que desafiam a mercantilização e afirmam a possibilidade de formas alternativas de produção e compartilhamento.\n\nO movimento de software livre, iniciado por Richard Stallman nos anos 1980, é um exemplo primordial dessa resistência. Ao garantir que usuários possam usar, estudar, modificar e compartilhar programas de computador, o software livre estabelece uma forma de propriedade radicalmente diferente da propriedade privada capitalista. O conhecimento encapsulado no código se torna um recurso comum, mantido e desenvolvido coletivamente, fora da lógica de acumulação.\n\nOutras iniciativas expandiram essa abordagem para diferentes domínios. O Creative Commons oferece estruturas legais para o compartilhamento de obras culturais. A Wikipedia representa um modelo de produção de conhecimento colaborativo que desafia o modelo proprietário das enciclopédias comerciais. O movimento pelo acesso aberto confronta o oligopólio das editoras acadêmicas que monetizam pesquisas frequentemente financiadas por recursos públicos.\n\nMais recentemente, iniciativas como Open Source Ecology e Farmhack aplicam princípios semelhantes ao design de ferramentas e máquinas físicas, criando interfaces entre os comuns digitais e a produção material. Projetos como o Public Library of Science demonstram a viabilidade de modelos alternativos para publicação científica que não dependem de paywall.\n\nEstas experiências não representam ilhas de comunismo em um oceano capitalista, nem são simplesmente hobbies marginais sem relevância econômica real. O sistema operacional Linux, produto do desenvolvimento colaborativo e aberto, sustenta grande parte da infraestrutura digital contemporânea. A Wikipedia superou completamente seus competidores comerciais em abrangência e uso. Projetos de ciência aberta têm sido cruciais para avanços em diversas áreas do conhecimento.\n\nMais do que exemplos isolados, essas iniciativas evidenciam contradições estruturais do capitalismo em sua fase atual. À medida que o capital busca expandir a forma-mercadoria para domínios onde ela é fundamentalmente disfuncional, surgem espaços para experimentação com modos alternativos de coordenar a produção social.\n\nEsses comuns digitais frequentemente existem em tensão com o mercado – não completamente dentro nem completamente fora dele. Muitos projetos de software livre são mantidos por empresas que encontraram modelos de negócio compatíveis com o compartilhamento. Trabalhadores do conhecimento circulam entre projetos comerciais e comunitários. Essa zona de fricção e hibridização é precisamente onde emergem possibilidades para transformações mais profundas nas relações de produção.\n\nO desafio para quem pensa criticamente sobre tecnologia não é simplesmente celebrar esses comuns digitais como utopias realizadas, nem descartá-los como irrelevantes ou cooptados. É compreender sua natureza contraditória, suas limitações atuais, e seu potencial para prefigurar modos de produção baseados em princípios radicalmente diferentes daqueles que organizam o sistema predominante.\n\nEssa compreensão dialética nos permite ver que, no próprio coração da economia digital contemporânea, maduram possibilidades técnicas e sociais para superar algumas das contradições fundamentais do capitalismo – sem que isso signifique, no entanto, que essa superação seja automática ou inevitável.',
    date: '2023-09-05',
    author: 'Rafael Martins',
    tags: ['Economia', 'Conhecimento', 'Digital'],
    url: '/library/chronicle/3',
    image: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800&auto=format&fit=crop&q=60',
    relatedTopics: ['propriedade-intelectual', 'contradições-capitalismo']
  }
];

export const conceptLibrary: Concept[] = [
  {
    id: 'alienacao',
    term: 'Alienação',
    definition: 'Processo pelo qual a atividade produtiva humana se converte em algo estranho e hostil ao trabalhador, fazendo com que o produto do trabalho e o próprio processo produtivo apareçam como forças independentes e dominadoras.',
    source: 'Marx, Manuscritos Econômico-Filosóficos',
    relatedTerms: ['trabalho', 'fetichismo', 'mercadoria']
  },
  {
    id: 'fetichismo-mercadoria',
    term: 'Fetichismo da Mercadoria',
    definition: 'Fenômeno social no qual as relações entre pessoas assumem a forma de relações entre coisas, ocultando as relações sociais subjacentes à produção de mercadorias.',
    source: 'Marx, O Capital, Vol. 1',
    relatedTerms: ['alienação', 'mercadoria', 'valor']
  },
  {
    id: 'hegemonia',
    term: 'Hegemonia',
    definition: 'Domínio ideológico e cultural exercido por grupos dominantes, não apenas através da coerção, mas principalmente pelo consentimento obtido pela disseminação de valores, crenças e práticas que normalizam a ordem social vigente.',
    source: 'Gramsci, Cadernos do Cárcere',
    relatedTerms: ['ideologia', 'consenso', 'sociedade civil']
  },
  {
    id: 'mais-valia',
    term: 'Mais-valia',
    definition: 'Parte do valor produzido pelo trabalho que é apropriada pelo capitalista, representando a diferença entre o valor total criado pelo trabalhador e o valor pago como salário.',
    source: 'Marx, O Capital',
    relatedTerms: ['exploração', 'força de trabalho', 'lucro']
  },
  {
    id: 'classes',
    term: 'Classes Sociais',
    definition: 'Grupos definidos pela sua relação com os meios de produção, criando interesses materiais fundamentalmente antagônicos que moldam a dinâmica da sociedade e da história.',
    source: 'Marx & Engels, Manifesto Comunista',
    relatedTerms: ['luta de classes', 'burguesia', 'proletariado']
  }
];
