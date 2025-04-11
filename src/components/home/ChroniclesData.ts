
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
    content: post.description,
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

// Recomendações baseadas em categoria
export const getRecommendations = async (category: string): Promise<Chronicle[]> => {
  const chronicles = await getChronicles();
  
  // Filtrando por categoria, se houver
  if (category && category !== 'todas') {
    const filtered = chronicles.filter(chronicle => 
      chronicle.title.toLowerCase().includes(category.toLowerCase()) ||
      chronicle.excerpt.toLowerCase().includes(category.toLowerCase())
    );
    
    if (filtered.length > 0) {
      return filtered.slice(0, 2);
    }
  }
  
  // Se não encontrar específicas ou não houver categoria, retorna os mais recentes
  return chronicles.slice(0, 2);
};

export const getFilteredChronicles = async (category: string): Promise<Chronicle[]> => {
  const chronicles = await getChronicles();
  
  if (category === 'todas') {
    return chronicles;
  }
  
  return chronicles.filter(chronicle => 
    chronicle.title.toLowerCase().includes(category.toLowerCase()) ||
    chronicle.excerpt.toLowerCase().includes(category.toLowerCase()) ||
    chronicle.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
  );
};
