
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

// Cache melhorado com controle de estado
class SubstackCache {
  private posts: SubstackPost[] = [];
  private lastFetchTime = 0;
  private isLoading = false;
  private failureCount = 0;
  
  private readonly CACHE_DURATION = 10 * 60 * 1000; // 10 minutos
  private readonly MAX_RETRIES = 3;
  
  get cachedPosts() { return [...this.posts]; }
  get loading() { return this.isLoading; }
  get lastUpdate() { return this.lastFetchTime; }
  
  isExpired(): boolean {
    return Date.now() - this.lastFetchTime > this.CACHE_DURATION;
  }
  
  canRetry(): boolean {
    return this.failureCount < this.MAX_RETRIES;
  }
  
  setPosts(posts: SubstackPost[]) {
    this.posts = posts;
    this.lastFetchTime = Date.now();
    this.failureCount = 0;
  }
  
  setLoading(loading: boolean) {
    this.isLoading = loading;
  }
  
  incrementFailure() {
    this.failureCount++;
  }
  
  reset() {
    this.failureCount = 0;
  }
}

const cache = new SubstackCache();

// Parser melhorado para RSS do Substack
const parseSubstackRSS = (xmlText: string): SubstackPost[] => {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
    
    // Verificar se há erros de parsing
    const parserError = xmlDoc.querySelector('parsererror');
    if (parserError) {
      throw new Error('XML parsing failed');
    }
    
    const items = xmlDoc.querySelectorAll('item');
    
    if (items.length === 0) {
      console.warn('Nenhum item encontrado no RSS');
      return [];
    }
    
    const posts: SubstackPost[] = [];
    
    items.forEach((item, index) => {
      try {
        const title = item.querySelector('title')?.textContent?.trim() || `Post ${index + 1}`;
        const description = item.querySelector('description')?.textContent || '';
        const link = item.querySelector('link')?.textContent?.trim() || '';
        const pubDate = item.querySelector('pubDate')?.textContent || new Date().toISOString();
        const guid = item.querySelector('guid')?.textContent || `post-${Date.now()}-${index}`;
        
        // Extrair imagem da descrição HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        const imgElement = tempDiv.querySelector('img');
        const coverImage = imgElement?.src || 
          `https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80`;
        
        // Limpar descrição de HTML
        const cleanDescription = tempDiv.textContent || tempDiv.innerText || description;
        const truncatedDescription = cleanDescription.substring(0, 300) + 
          (cleanDescription.length > 300 ? '...' : '');
        
        // Criar slug seguro
        const slug = link.split('/').pop() || 
          title.toLowerCase().replace(/[^a-z0-9]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        
        posts.push({
          id: slug,
          title: title,
          subtitle: cleanDescription.substring(0, 100) + (cleanDescription.length > 100 ? '...' : ''),
          description: truncatedDescription,
          coverImage,
          publishedAt: new Date(pubDate).toISOString(),
          slug,
          url: link,
          content: cleanDescription
        });
      } catch (itemError) {
        console.warn(`Erro ao processar item ${index}:`, itemError);
      }
    });
    
    return posts.sort((a, b) => 
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  } catch (error) {
    console.error('Erro ao fazer parse do RSS:', error);
    throw error;
  }
};

// Dados de fallback atualizados e expandidos
const getFallbackPosts = (): SubstackPost[] => {
  return [
    {
      id: "dialogo-com-rafael-e-luisa",
      title: "Diálogo com Rafael e Luísa: Navegando pelo Território Ideológico",
      subtitle: "Uma abordagem dialógica inovadora para explorar conceitos políticos complexos",
      description: "Conheça nossos dois personagens centrais: Rafael Martins, historiador e filósofo político, e Luísa Campos, jornalista investigativa especializada em mídia digital. Juntos, eles transformam conceitos abstratos em discussões acessíveis e estimulantes sobre o mundo contemporâneo.",
      coverImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-01-15T10:00:00Z",
      slug: "dialogo-com-rafael-e-luisa",
      url: "https://espelhoinvertido.substack.com/p/dialogo-com-rafael-e-luisa",
      content: "Este projeto apresenta uma metodologia única para tornar conceitos marxistas e análises políticas acessíveis através do diálogo entre duas perspectivas complementares. Rafael oferece profundidade histórica e rigor teórico, enquanto Luísa conecta essas ideias com exemplos práticos do cotidiano digital."
    },
    {
      id: "manifesto-comunista-era-digital",
      title: "O Manifesto Comunista na Era Digital: Relevância Contemporânea",
      subtitle: "Como as análises de Marx e Engels se aplicam ao capitalismo de plataforma",
      description: "Uma análise detalhada de como os conceitos centrais do Manifesto Comunista - luta de classes, alienação, mais-valia - se manifestam nas plataformas digitais modernas como Uber, Amazon e redes sociais.",
      coverImage: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-02-01T14:30:00Z",
      slug: "manifesto-comunista-era-digital",
      url: "https://espelhoinvertido.substack.com/p/manifesto-comunista-era-digital",
      content: "O capitalismo digital não é uma ruptura com o capitalismo tradicional, mas sua intensificação. As plataformas concentram capital de forma sem precedentes, enquanto socializam riscos e custos para trabalhadores precarizados."
    },
    {
      id: "uberizacao-trabalho-algoritmo",
      title: "Uberização: Quando o Algoritmo Vira Chefe",
      subtitle: "A nova face da exploração trabalhista no século XXI",
      description: "Análise profunda de como aplicativos de delivery e transporte representam uma nova etapa da precarização do trabalho, onde algoritmos substituem supervisores humanos e trabalhadores assumem todos os riscos.",
      coverImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-02-15T16:45:00Z",
      slug: "uberizacao-trabalho-algoritmo",
      url: "https://espelhoinvertido.substack.com/p/uberizacao-trabalho-algoritmo",
      content: "A uberização representa a subsunção real do trabalho ao capital mediada por algoritmos. O trabalhador perde não apenas o controle sobre os meios de produção, mas também sobre o processo de trabalho, que passa a ser ditado por inteligência artificial."
    },
    {
      id: "alienacao-redes-sociais",
      title: "Alienação 2.0: Como as Redes Sociais Mercantilizam Nossas Relações",
      subtitle: "O conceito marxista de alienação aplicado à economia da atenção",
      description: "Exploramos como Facebook, Instagram e TikTok transformam nossa sociabilidade em mercadoria, extraindo valor de nossas interações pessoais e criando novas formas de estranhamento social.",
      coverImage: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-03-01T11:20:00Z",
      slug: "alienacao-redes-sociais",
      url: "https://espelhoinvertido.substack.com/p/alienacao-redes-sociais",
      content: "As redes sociais aprofundam a alienação ao transformar nossa vida íntima em dados comercializáveis. Perdemos o controle não apenas sobre nosso trabalho, mas sobre nossa própria subjetividade."
    },
    {
      id: "inteligencia-artificial-luta-classes",
      title: "IA e Luta de Classes: Automação a Serviço de Quem?",
      subtitle: "O impacto da inteligência artificial nas relações de trabalho",
      description: "Investigação sobre como a inteligência artificial está sendo desenvolvida e implementada para intensificar a exploração trabalhista, concentrar capital e manter estruturas de poder existentes.",
      coverImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-03-15T13:00:00Z",
      slug: "inteligencia-artificial-luta-classes",
      url: "https://espelhoinvertido.substack.com/p/inteligencia-artificial-luta-classes",
      content: "A IA não é neutra. Desenvolvida sob relações capitalistas, ela reproduz e amplifica desigualdades existentes, servindo principalmente para reduzir custos trabalhistas e aumentar controle sobre trabalhadores."
    },
    {
      id: "economia-compartilhada-mito",
      title: "O Mito da Economia Compartilhada",
      subtitle: "Por trás do discurso colaborativo, mais concentração de capital",
      description: "Desmistificamos o conceito de 'economia compartilhada', revelando como Airbnb, Uber e similares na verdade concentram capital e precarizam trabalho sob a retórica da colaboração.",
      coverImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-04-01T09:15:00Z",
      slug: "economia-compartilhada-mito",
      url: "https://espelhoinvertido.substack.com/p/economia-compartilhada-mito",
      content: "A chamada 'economia compartilhada' é uma operação ideológica que mascara a intensificação da extração de mais-valia através de plataformas digitais que intermediam e controlam mercados."
    },
    {
      id: "resistencia-digital-possibilidades",
      title: "Resistência Digital: Cooperativas, Hacktivismo e Alternativas",
      subtitle: "Explorando possibilidades emancipatórias da tecnologia",
      description: "Análise de iniciativas que buscam usar tecnologia para fins emancipatórios: cooperativas de plataforma, software livre, hacktivismo e outras formas de resistência digital.",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-04-15T15:30:00Z",
      slug: "resistencia-digital-possibilidades",
      url: "https://espelhoinvertido.substack.com/p/resistencia-digital-possibilidades",
      content: "A tecnologia contém potencialidades emancipatórias, mas elas só se realizam através de lutas sociais concretas que disputem tanto o controle técnico quanto a propriedade dos meios de produção digitais."
    },
    {
      id: "vigilancia-capitalismo-controle",
      title: "Capitalismo de Vigilância: O Panóptico Digital",
      subtitle: "Como empresas de tecnologia transformaram vigilância em modelo de negócios",
      description: "Análise do conceito de 'capitalismo de vigilância' de Shoshana Zuboff através de uma lente marxista, explorando como Google, Meta e outras gigantes extraem valor da vigilância massiva.",
      coverImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&q=80",
      publishedAt: "2024-05-01T12:00:00Z",
      slug: "vigilancia-capitalismo-controle",
      url: "https://espelhoinvertido.substack.com/p/vigilancia-capitalismo-controle",
      content: "O capitalismo de vigilância representa uma nova forma de acumulação primitiva, onde nossa experiência vivida é convertida em dados comportamentais que alimentam mercados de previsão."
    }
  ];
};

// Função principal melhorada com múltiplas estratégias
export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  // Verificar cache válido
  if (!cache.isExpired() && cache.cachedPosts.length > 0) {
    return cache.cachedPosts;
  }

  // Evitar múltiplas requisições simultâneas
  if (cache.loading) {
    return cache.cachedPosts.length > 0 ? cache.cachedPosts : getFallbackPosts();
  }

  cache.setLoading(true);

  // Lista de estratégias para buscar o RSS
  const strategies = [
    () => fetchWithProxy('https://api.allorigins.win/raw?url='),
    () => fetchWithProxy('https://api.codetabs.com/v1/proxy?quest='),
    () => fetchDirect(),
  ];

  for (const strategy of strategies) {
    try {
      const posts = await strategy();
      if (posts && posts.length > 0) {
        cache.setPosts(posts);
        cache.setLoading(false);
        console.log(`✅ ${posts.length} posts carregados do Substack`);
        return posts;
      }
    } catch (error) {
      console.warn('Estratégia falhou:', error);
      cache.incrementFailure();
    }
  }

  // Se todas as estratégias falharam, usar fallback
  cache.setLoading(false);
  const fallbackPosts = getFallbackPosts();
  
  // Só mostrar toast se não temos posts em cache
  if (cache.cachedPosts.length === 0) {
    toast.info("Usando conteúdo offline", {
      description: "Conecte-se à internet para ver as últimas publicações"
    });
  }
  
  return cache.cachedPosts.length > 0 ? cache.cachedPosts : fallbackPosts;
}

// Estratégias de fetch
async function fetchWithProxy(proxyUrl: string): Promise<SubstackPost[]> {
  const rssUrl = 'https://espelhoinvertido.substack.com/feed';
  const url = proxyUrl + encodeURIComponent(rssUrl);
  
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Accept': 'application/rss+xml, application/xml, text/xml',
      'User-Agent': 'Mozilla/5.0 (compatible; RSS Reader)'
    },
    signal: AbortSignal.timeout(10000) // 10 segundos timeout
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const xmlText = await response.text();
  return parseSubstackRSS(xmlText);
}

async function fetchDirect(): Promise<SubstackPost[]> {
  const response = await fetch('https://espelhoinvertido.substack.com/feed', {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Accept': 'application/rss+xml, application/xml, text/xml'
    },
    signal: AbortSignal.timeout(8000)
  });
  
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
  }
  
  const xmlText = await response.text();
  return parseSubstackRSS(xmlText);
}

// Funções auxiliares
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
  if (!cache.isExpired()) {
    return false;
  }
  
  try {
    const oldCount = cache.cachedPosts.length;
    await fetchSubstackPosts();
    return cache.cachedPosts.length > oldCount;
  } catch (error) {
    console.error("Erro ao verificar atualizações:", error);
    return false;
  }
}

export function setupAutoRefresh(intervalMinutes = 15): number {
  const intervalId = setInterval(async () => {
    try {
      const hasUpdates = await checkForUpdates();
      if (hasUpdates) {
        toast.success("Novas publicações encontradas!", {
          description: "O conteúdo foi atualizado automaticamente"
        });
      }
    } catch (error) {
      console.error("Erro na atualização automática:", error);
    }
  }, intervalMinutes * 60 * 1000);
  
  // Buscar posts inicialmente
  fetchSubstackPosts().catch(console.error);
  
  return intervalId;
}

// Função para limpar cache (útil para debug)
export function clearCache(): void {
  cache.reset();
  console.log("Cache do Substack limpo");
}
