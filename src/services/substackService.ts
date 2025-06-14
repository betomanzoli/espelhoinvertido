
import { toast } from "sonner";

export interface SubstackPost {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  coverImage: string;
  publishedAt: string;
  slug: string;
  url: string;
  content?: string;
}

// Cache para armazenar posts
let cachedPosts: SubstackPost[] = [];
let lastFetchTime = 0;
const CACHE_DURATION = 10 * 60 * 1000; // 10 minutos

// Parser para RSS do Substack
const parseSubstackRSS = (xmlText: string): SubstackPost[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');
    
    const posts: SubstackPost[] = [];
    
    items.forEach((item, index) => {
      const title = item.querySelector('title')?.textContent || `Post ${index + 1}`;
      const description = item.querySelector('description')?.textContent || '';
      const link = item.querySelector('link')?.textContent || '';
      const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
      const guid = item.querySelector('guid')?.textContent || `post-${index}`;
      
      // Extrair imagem da descrição HTML se disponível
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = description;
      const imgElement = tempDiv.querySelector('img');
      const coverImage = imgElement?.src || `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop`;
      
      // Limpar descrição de HTML
      const cleanDescription = tempDiv.textContent || tempDiv.innerText || description;
      
      // Criar slug a partir do link
      const slug = link.split('/').pop() || guid.replace(/[^a-z0-9]/gi, '-').toLowerCase();
      
      posts.push({
        id: slug,
        title: title.trim(),
        subtitle: cleanDescription.substring(0, 100) + '...',
        description: cleanDescription.substring(0, 300) + '...',
        coverImage,
        publishedAt: new Date(pubDate).toISOString(),
        slug,
        url: link,
        content: cleanDescription
      });
    });
    
    return posts;
  } catch (error) {
    console.error('Erro ao fazer parse do RSS:', error);
    return [];
  }
};

// Fallback com dados reais atualizados
const getFallbackPosts = (): SubstackPost[] => {
  return [
    {
      id: "dialogo-com-rafael-e-luisa",
      title: "Diálogo com Rafael e Luísa",
      subtitle: "Uma abordagem dialógica para explorar conceitos políticos e econômicos",
      description: "Um chat interativo que simula conversas com dois personagens fictícios que discutem perspectivas ideológicas diversas, com foco especial no Manifesto Comunista e sua aplicação contemporânea.",
      coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop",
      publishedAt: "2024-01-15",
      slug: "dialogo-com-rafael-e-luisa",
      url: "https://espelhoinvertido.substack.com/p/dialogo-com-rafael-e-luisa",
      content: "Um chat interativo que permite aos usuários interagir com dois especialistas fictícios que analisam questões políticas, econômicas e sociais a partir de diferentes abordagens, tornando conceitos complexos acessíveis e incentivando pensamento crítico.\n\nRafael Martins é um ex-professor universitário de História e Filosofia Política com abordagem analítica e contextual. Luísa Campos é uma jornalista investigativa especializada em mídia digital com foco em aplicações práticas."
    },
    {
      id: "simulador-de-revolucoes",
      title: "Simulador de Revoluções",
      subtitle: "Um jogo de estratégia histórica para entender processos revolucionários",
      description: "Experimente as dinâmicas sociais antes e depois de transformações revolucionárias em um jogo de estratégia educativo que recria condições históricas reais.",
      coverImage: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      publishedAt: "2024-02-02",
      slug: "simulador-de-revolucoes",
      url: "https://espelhoinvertido.substack.com/p/simulador-de-revolucoes",
      content: "Um jogo de estratégia baseado em eventos históricos reais onde você experimenta as complexas dinâmicas sociais, econômicas e políticas que precedem e acompanham transformações revolucionárias."
    },
    {
      id: "mapa-de-conflitos-ideologicos",
      title: "Mapa de Conflitos Ideológicos",
      subtitle: "Cartografando o território das ideias políticas",
      description: "Explore como narrativas históricas são construídas ao longo do tempo e como diferentes grupos interpretam os mesmos eventos através de mapas interativos.",
      coverImage: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop",
      publishedAt: "2024-02-20",
      slug: "mapa-de-conflitos-ideologicos",
      url: "https://espelhoinvertido.substack.com/p/mapa-de-conflitos-ideologicos",
      content: "Uma ferramenta interativa que permite visualizar e navegar pelo complexo território das ideologias políticas, mapeando suas interconexões, divergências e evolução histórica."
    },
    {
      id: "economia-em-acao",
      title: "Economia em Ação",
      subtitle: "Simulação de políticas econômicas e seus efeitos sociais",
      description: "Simule diferentes políticas econômicas e observe suas consequências em uma sociedade virtual baseada em dados reais de diversos períodos históricos.",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      publishedAt: "2024-03-05",
      slug: "economia-em-acao",
      url: "https://espelhoinvertido.substack.com/p/economia-em-acao",
      content: "Uma plataforma interativa que permite explorar o impacto de diferentes políticas econômicas em sociedades virtuais modeladas com base em dados históricos reais."
    },
    {
      id: "museu-virtual-das-revolucoes",
      title: "Museu Virtual das Revoluções",
      subtitle: "Uma viagem histórica por momentos revolucionários",
      description: "Viaje no tempo através da realidade aumentada e visite locais históricos revolucionários em diferentes épocas, explorando artefatos e relatos da época.",
      coverImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      publishedAt: "2024-03-20",
      slug: "museu-virtual-das-revolucoes",
      url: "https://espelhoinvertido.substack.com/p/museu-virtual-das-revolucoes",
      content: "Uma experiência imersiva que transporta os visitantes para momentos históricos revolucionários através de tecnologias de realidade aumentada e virtual."
    },
    {
      id: "alienacao-digital",
      title: "Alienação na Era Digital",
      subtitle: "Como a tecnologia transforma o trabalho e as relações sociais",
      description: "Análise marxista dos novos modos de produção digital e suas implicações para a classe trabalhadora contemporânea.",
      coverImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&h=600&fit=crop",
      publishedAt: "2024-04-02",
      slug: "alienacao-digital",
      url: "https://espelhoinvertido.substack.com/p/alienacao-digital",
      content: "Este ensaio analisa como as plataformas digitais e a automação estão reconfigurando as relações laborais contemporâneas, criando novas formas de precarização."
    },
    {
      id: "capitalismo-de-plataforma",
      title: "Capitalismo de Plataforma",
      subtitle: "A nova face da exploração no século XXI",
      description: "Como aplicativos como Uber e iFood representam uma nova etapa da acumulação capitalista baseada na extração de dados e precarização.",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop",
      publishedAt: "2024-04-15",
      slug: "capitalismo-de-plataforma",
      url: "https://espelhoinvertido.substack.com/p/capitalismo-de-plataforma",
      content: "O capitalismo de plataforma representa uma nova forma de organização econômica que combina extração de dados, trabalho precarizado e controle algorítmico."
    },
    {
      id: "historia-dos-manifestos",
      title: "História dos Manifestos Políticos",
      subtitle: "Do Manifesto Comunista aos movimentos contemporâneos",
      description: "Uma análise histórica comparativa dos grandes manifestos políticos e seu impacto nas transformações sociais.",
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop",
      publishedAt: "2024-05-01",
      slug: "historia-dos-manifestos",
      url: "https://espelhoinvertido.substack.com/p/historia-dos-manifestos",
      content: "Os manifestos políticos funcionam como condensações ideológicas de momentos históricos específicos, articulando diagnósticos e propostas de transformação social."
    }
  ];
};

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  const now = Date.now();
  
  // Verificar cache
  if (cachedPosts.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedPosts;
  }

  try {
    // Tentar buscar RSS do Substack
    const rssUrl = 'https://espelhoinvertido.substack.com/feed';
    const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(rssUrl)}`;
    
    const response = await fetch(proxyUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/rss+xml, application/xml, text/xml'
      }
    });
    
    if (response.ok) {
      const xmlText = await response.text();
      const posts = parseSubstackRSS(xmlText);
      
      if (posts.length > 0) {
        cachedPosts = posts;
        lastFetchTime = now;
        console.log(`✅ ${posts.length} posts carregados do Substack RSS`);
        return posts;
      }
    }
  } catch (error) {
    console.warn('Falha ao buscar RSS do Substack, usando fallback:', error);
  }

  // Usar fallback se a busca falhar
  const fallbackPosts = getFallbackPosts();
  cachedPosts = fallbackPosts;
  lastFetchTime = now;
  
  toast.info("Usando conteúdo offline", {
    description: "Conecte-se à internet para ver as últimas publicações"
  });
  
  return fallbackPosts;
}

export async function fetchPostBySlug(slug: string): Promise<SubstackPost | null> {
  try {
    const posts = await fetchSubstackPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Erro ao buscar post ${slug}:`, error);
    return null;
  }
}

export async function checkForUpdates(): Promise<boolean> {
  const now = Date.now();
  
  if (now - lastFetchTime < 5 * 60 * 1000) {
    return false;
  }
  
  lastFetchTime = 0;
  const posts = await fetchSubstackPosts();
  return posts.length > 0;
}

export function setupAutoRefresh(interval = 30) {
  const intervalId = setInterval(async () => {
    try {
      await fetchSubstackPosts();
    } catch (error) {
      console.error("Erro na atualização automática:", error);
    }
  }, interval * 60 * 1000);
  
  fetchSubstackPosts();
  return intervalId;
}
