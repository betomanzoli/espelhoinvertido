
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
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora em milissegundos

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  // Verificar se temos cache válido
  const now = Date.now();
  if (cachedPosts.length > 0 && now - lastFetchTime < CACHE_DURATION) {
    return cachedPosts;
  }

  try {
    // Em uma implementação ideal, faríamos uma chamada para a API do Substack
    // Aqui vamos implementar posts baseados no site espelhoinvertido.substack.com
    const posts: SubstackPost[] = [
      {
        id: "dialogo-com-rafael-e-luisa",
        title: "Diálogo com Rafael e Luísa",
        subtitle: "Uma abordagem dialógica para explorar conceitos políticos e econômicos",
        description: "Um chat interativo que simula conversas com dois personagens fictícios que discutem perspectivas ideológicas diversas, com foco especial no Manifesto Comunista e sua aplicação contemporânea.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F47317de8-b3be-4af2-ab5a-e8ed59b2cc05_1024x1024.png",
        publishedAt: "2023-09-15",
        slug: "dialogo-com-rafael-e-luisa",
        url: "https://espelhoinvertido.substack.com/p/dialogo-com-rafael-e-luisa"
      },
      {
        id: "simulador-de-revolucoes",
        title: "Simulador de Revoluções",
        subtitle: "Um jogo de estratégia histórica para entender processos revolucionários",
        description: "Experimente as dinâmicas sociais antes e depois de transformações revolucionárias em um jogo de estratégia educativo que recria condições históricas reais.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7794b7cb-f189-4892-ba18-74133a00793c_1024x1024.png",
        publishedAt: "2023-10-02",
        slug: "simulador-de-revolucoes",
        url: "https://espelhoinvertido.substack.com/p/simulador-de-revolucoes"
      },
      {
        id: "mapa-de-conflitos-ideologicos",
        title: "Mapa de Conflitos Ideológicos",
        subtitle: "Cartografando o território das ideias políticas",
        description: "Explore como narrativas históricas são construídas ao longo do tempo e como diferentes grupos interpretam os mesmos eventos através de mapas interativos.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3eb227e4-cbf1-41e9-a005-e02877d796e6_1024x1024.png",
        publishedAt: "2023-11-10",
        slug: "mapa-de-conflitos-ideologicos",
        url: "https://espelhoinvertido.substack.com/p/mapa-de-conflitos-ideologicos"
      },
      {
        id: "economia-em-acao",
        title: "Economia em Ação",
        subtitle: "Simulação de políticas econômicas e seus efeitos sociais",
        description: "Simule diferentes políticas econômicas e observe suas consequências em uma sociedade virtual baseada em dados reais de diversos períodos históricos.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F84f243b8-6f1b-4e7a-b8a3-054f21b9f4ac_1024x1024.png",
        publishedAt: "2023-12-05",
        slug: "economia-em-acao",
        url: "https://espelhoinvertido.substack.com/p/economia-em-acao"
      },
      {
        id: "museu-virtual-das-revolucoes",
        title: "Museu Virtual das Revoluções",
        subtitle: "Uma viagem histórica por momentos revolucionários",
        description: "Viaje no tempo através da realidade aumentada e visite locais históricos revolucionários em diferentes épocas, explorando artefatos e relatos da época.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fb6c2c3a4-d5e5-4f8a-9b7d-8e10a8b9c2d3_1024x1024.png",
        publishedAt: "2024-01-20",
        slug: "museu-virtual-das-revolucoes",
        url: "https://espelhoinvertido.substack.com/p/museu-virtual-das-revolucoes"
      },
      {
        id: "analise-de-discurso",
        title: "Análise de Discurso",
        subtitle: "Ferramentas para desvendar premissas ideológicas em textos",
        description: "Ferramenta que utiliza processamento de linguagem natural para analisar textos políticos, econômicos e sociais, revelando suas premissas ideológicas subjacentes.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F5c8d9e7f-2a3b-4f9c-b1e5-f67d2c8a9d4e_1024x1024.png",
        publishedAt: "2024-02-15",
        slug: "analise-de-discurso",
        url: "https://espelhoinvertido.substack.com/p/analise-de-discurso"
      },
      {
        id: "escreva-sua-cronica",
        title: "Escreva Sua Crônica",
        subtitle: "Plataforma colaborativa para narrativas ideológicas múltiplas",
        description: "Crie narrativas que exploram diferentes perspectivas ideológicas sobre o mesmo evento e compartilhe com outros pensadores críticos.",
        coverImage: "https://substackcdn.com/image/fetch/w_1200,h_600,c_fill,f_jpg,q_auto:good,fl_progressive:steep,g_auto/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F2d1e8b7a-6c9f-4a30-b0f3-1e9c4d8b7f5e_1024x1024.png",
        publishedAt: "2024-03-08",
        slug: "escreva-sua-cronica",
        url: "https://espelhoinvertido.substack.com/p/escreva-sua-cronica"
      }
    ];

    // Atualizar cache
    cachedPosts = posts;
    lastFetchTime = now;
    
    return posts;
  } catch (error) {
    console.error("Erro ao buscar posts do Substack:", error);
    toast.error("Não foi possível carregar as crônicas do Espelho Invertido");
    return [];
  }
}

// Função para buscar um post específico pelo slug
export async function fetchPostBySlug(slug: string): Promise<SubstackPost | null> {
  try {
    const posts = await fetchSubstackPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error(`Erro ao buscar post com slug ${slug}:`, error);
    return null;
  }
}

// Função para atualizar posts automaticamente a cada X minutos
export function setupAutoRefresh(interval = 30) {
  // Configurar atualização automática a cada X minutos (30 por padrão)
  setInterval(async () => {
    try {
      console.log("Atualizando posts do Substack automaticamente...");
      await fetchSubstackPosts();
    } catch (error) {
      console.error("Erro na atualização automática:", error);
    }
  }, interval * 60 * 1000);
  
  // Iniciar a primeira busca
  fetchSubstackPosts();
}
