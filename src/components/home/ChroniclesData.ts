
import { Chronicle } from '@/lib/debateData';
import { fetchSubstackPosts, SubstackPost } from '@/services/substackService';

// Cache temporário para as crônicas
let cachedChronicles: Chronicle[] = [];

// Converter posts do Substack para o formato Chronicle
const convertSubstackPostsToChronicles = (posts: SubstackPost[]): Chronicle[] => {
  return posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.subtitle || post.description.substring(0, 120) + '...',
    content: post.content || post.description,
    date: post.publishedAt,
    author: 'Espelho Invertido',
    tags: ['Substack'],
    url: post.url,
    image: post.coverImage,
    relatedTopics: []
  }));
};

// Função para obter todas as crônicas
export const getChronicles = async (): Promise<Chronicle[]> => {
  if (cachedChronicles.length > 0) {
    return cachedChronicles;
  }
  
  try {
    const posts = await fetchSubstackPosts();
    cachedChronicles = convertSubstackPostsToChronicles(posts);
    return cachedChronicles;
  } catch (error) {
    console.error('Erro ao carregar crônicas:', error);
    return [];
  }
};

// Sistema de recomendação simulado
export const getRecommendations = async (category: string): Promise<Chronicle[]> => {
  const chronicles = await getChronicles();
  
  // Recomendações baseadas na categoria
  const filteredChronicles = chronicles.filter(chronicle => 
    chronicle.tags.some(tag => 
      tag.toLowerCase().includes(category.toLowerCase())
    )
  );
  
  // Se não encontrar nada específico, retorna os mais recentes
  if (filteredChronicles.length === 0) {
    return chronicles.slice(0, 2);
  }
  
  return filteredChronicles.slice(0, 2);
};

export const getFilteredChronicles = async (category: string): Promise<Chronicle[]> => {
  const chronicles = await getChronicles();
  
  if (category === 'todas') {
    return chronicles;
  }
  
  return chronicles.filter(chronicle => 
    chronicle.tags.some(tag => 
      tag.toLowerCase().includes(category.toLowerCase())
    )
  );
};
