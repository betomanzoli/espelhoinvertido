
import { toast } from "sonner";
import { cache } from './substack/cache';
import { fetchWithProxy, fetchDirect } from './substack/strategies';

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

// Dados mínimos apenas quando não há conexão com internet
const getOfflineMessage = (): SubstackPost[] => {
  return [
    {
      id: "offline-message",
      title: "Conecte-se à Internet",
      subtitle: "Carregando conteúdo do Substack",
      description: "Para ver as análises mais recentes do Espelho Invertido, é necessário uma conexão com a internet. Todas as publicações são carregadas diretamente do Substack para garantir autenticidade.",
      coverImage: "",
      publishedAt: new Date().toISOString(),
      slug: "offline-message",
      url: "https://espelhoinvertido.substack.com/",
      content: "Este é apenas um placeholder exibido quando não há conexão com internet. O conteúdo real é sempre carregado diretamente do Substack."
    }
  ];
};

export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  if (!cache.isExpired() && cache.cachedPosts.length > 0) {
    return cache.cachedPosts;
  }

  if (cache.loading) {
    return cache.cachedPosts.length > 0 ? cache.cachedPosts : [];
  }

  cache.setLoading(true);

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
        console.log(`✅ ${posts.length} posts reais carregados do Substack`);
        return posts;
      }
    } catch (error) {
      console.warn('Estratégia de carregamento falhou:', error);
      cache.incrementFailure();
    }
  }

  cache.setLoading(false);
  
  // Só mostrar mensagem offline se realmente não conseguirmos conectar
  if (cache.cachedPosts.length === 0) {
    toast.info("Sem conexão com Substack", {
      description: "Conecte-se à internet para ver as publicações reais"
    });
    return getOfflineMessage();
  }
  
  return cache.cachedPosts;
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

export function setupAutoRefresh(intervalMinutes = 15): ReturnType<typeof setInterval> {
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
  
  // Tentar carregar posts reais na inicialização
  fetchSubstackPosts().catch(console.error);
  
  return intervalId;
}

export function clearCache(): void {
  cache.reset();
  console.log("Cache do Substack limpo");
}
