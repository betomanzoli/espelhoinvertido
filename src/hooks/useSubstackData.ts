
import { useState, useEffect } from 'react';
import { fetchSubstackPosts, checkForUpdates, SubstackPost } from '@/services/substackService';
import { toast } from "sonner";

export function useSubstackData() {
  const [posts, setPosts] = useState<SubstackPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // Função para carregar posts
  const loadPosts = async () => {
    setLoading(true);
    try {
      const fetchedPosts = await fetchSubstackPosts();
      setPosts(fetchedPosts);
      setLastUpdated(new Date());
      setError(null);
    } catch (err) {
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
        loadPosts();
        toast.info("Novas crônicas disponíveis", {
          description: "O conteúdo foi atualizado com as publicações mais recentes"
        });
      }
    }, 10 * 60 * 1000); // Verificar a cada 10 minutos
    
    return () => clearInterval(checkInterval);
  }, []);

  // Função para forçar atualização manual
  const refreshData = () => {
    loadPosts();
  };

  return { posts, loading, error, lastUpdated, refreshData };
}
