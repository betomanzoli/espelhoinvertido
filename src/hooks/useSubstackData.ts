
import { useState, useEffect } from 'react';
import { fetchSubstackPosts, checkForUpdates, SubstackPost } from '@/services/substackService';
import { toast } from "sonner";

// Cache global para evitar múltiplas chamadas
let globalCache: {
  posts: SubstackPost[];
  timestamp: number;
  isLoading: boolean;
} = {
  posts: [],
  timestamp: 0,
  isLoading: false
};

const CACHE_DURATION = 5 * 60 * 1000; // 5 minutos

export function useSubstackData() {
  const [posts, setPosts] = useState<SubstackPost[]>(globalCache.posts);
  const [loading, setLoading] = useState(globalCache.isLoading);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(
    globalCache.timestamp > 0 ? new Date(globalCache.timestamp) : null
  );

  // Função para carregar posts
  const loadPosts = async (forceRefresh = false) => {
    const now = Date.now();
    
    // Se temos cache válido e não é refresh forçado, usar cache
    if (!forceRefresh && globalCache.posts.length > 0 && (now - globalCache.timestamp) < CACHE_DURATION) {
      setPosts(globalCache.posts);
      setLastUpdated(new Date(globalCache.timestamp));
      setLoading(false);
      return;
    }

    // Evitar múltiplas chamadas simultâneas
    if (globalCache.isLoading && !forceRefresh) {
      return;
    }

    globalCache.isLoading = true;
    setLoading(true);
    
    try {
      const fetchedPosts = await fetchSubstackPosts();
      
      // Atualizar cache global
      globalCache.posts = fetchedPosts;
      globalCache.timestamp = now;
      globalCache.isLoading = false;
      
      setPosts(fetchedPosts);
      setLastUpdated(new Date(now));
      setError(null);
    } catch (err) {
      globalCache.isLoading = false;
      setError(err instanceof Error ? err : new Error('Erro desconhecido ao buscar dados'));
      toast.error("Não foi possível atualizar as crônicas");
    } finally {
      setLoading(false);
    }
  };

  // Carrega os posts na inicialização
  useEffect(() => {
    loadPosts();
    
    // Configura verificação periódica de atualizações
    const checkInterval = setInterval(async () => {
      const hasUpdates = await checkForUpdates();
      if (hasUpdates) {
        console.log("Atualizações encontradas, recarregando posts...");
        loadPosts(true);
        toast.info("Novas crônicas disponíveis", {
          description: "O conteúdo foi atualizado com as publicações mais recentes"
        });
      }
    }, 10 * 60 * 1000); // Verificar a cada 10 minutos
    
    return () => clearInterval(checkInterval);
  }, []);

  // Função para forçar atualização manual
  const refreshData = () => {
    loadPosts(true);
  };

  return { posts, loading, error, lastUpdated, refreshData };
}
