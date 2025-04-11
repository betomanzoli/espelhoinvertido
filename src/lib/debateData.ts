
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
  icon: React.ReactNode;
  coverImage?: string;
}

export interface Chronicle {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  tags: string[];
  url: string;
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
    icon: <Briefcase />,
    coverImage: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'fetichismo-mercadoria',
    title: 'Fetichismo da Mercadoria Hoje',
    description: 'Explorando como produtos digitais, mídias sociais e o consumo virtual transformam as relações sociais em relações entre coisas.',
    category: 'Consumo',
    difficulty: 'advanced',
    tags: ['Fetichismo', 'Mercadoria', 'Redes Sociais', 'Consumo Digital'],
    icon: <Scale />,
    coverImage: 'https://images.unsplash.com/photo-1614036634955-ae5e90f9b9eb?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'contranarrativas',
    title: 'Construindo Contranarrativas',
    description: 'Como criar e difundir narrativas alternativas frente ao discurso hegemônico dos grandes meios de comunicação.',
    category: 'Mídia',
    difficulty: 'intermediate',
    tags: ['Contranarrativa', 'Hegemonia', 'Mídia Alternativa', 'Comunicação'],
    icon: <MessageCircle />,
    coverImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'classes-digitais',
    title: 'Classes Sociais na Era Digital',
    description: 'Como as novas tecnologias redefinem ou reproduzem as estruturas de classe existentes na sociedade contemporânea.',
    category: 'Estrutura Social',
    difficulty: 'advanced',
    tags: ['Classes', 'Digital', 'Desigualdade', 'Estrutura Social'],
    icon: <Users />,
    coverImage: 'https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'introducao-manifesto',
    title: 'Introdução ao Manifesto Comunista',
    description: 'Uma explicação acessível dos principais conceitos e do contexto histórico do Manifesto Comunista.',
    category: 'Teoria',
    difficulty: 'basic',
    tags: ['Manifesto', 'Introdução', 'História', 'Marxismo'],
    icon: <History />,
    coverImage: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'contradições-capitalismo',
    title: 'Contradições do Capitalismo',
    description: 'Examinando as tensões internas do sistema capitalista e como elas se manifestam nas crises econômicas e sociais.',
    category: 'Economia',
    difficulty: 'intermediate',
    tags: ['Contradições', 'Crises', 'Capitalismo', 'Economia'],
    icon: <Puzzle />,
    coverImage: 'https://images.unsplash.com/photo-1579532536935-619928decd08?w=800&auto=format&fit=crop&q=60'
  },
  {
    id: 'propriedade-intelectual',
    title: 'Propriedade Intelectual e Comuns',
    description: 'O debate entre propriedade intelectual e conhecimento como bem comum na era da internet e compartilhamento digital.',
    category: 'Digital',
    difficulty: 'intermediate',
    tags: ['Propriedade Intelectual', 'Bens Comuns', 'Copyright', 'Compartilhamento'],
    icon: <ExternalLink />,
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
