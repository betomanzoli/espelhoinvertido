
import { Chronicle } from '@/lib/debateData';
import { SubstackPost } from '@/services/substackService';

// Converter posts do Substack para o formato Chronicle
export const convertSubstackPostsToChronicles = (posts: SubstackPost[]): Chronicle[] => {
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

// Recomendações baseadas em categoria
export const getRecommendations = (posts: Chronicle[], category: string): Chronicle[] => {
  // Filtrando por categoria, se houver
  if (category && category !== 'todas') {
    const filtered = posts.filter(chronicle => 
      chronicle.title.toLowerCase().includes(category.toLowerCase()) ||
      chronicle.excerpt.toLowerCase().includes(category.toLowerCase())
    );
    
    if (filtered.length > 0) {
      return filtered.slice(0, 2);
    }
  }
  
  // Se não encontrar específicas ou não houver categoria, retorna os mais recentes
  return posts.slice(0, 2);
};

export const getFilteredChronicles = (posts: Chronicle[], category: string): Chronicle[] => {
  if (category === 'todas') {
    return posts;
  }
  
  return posts.filter(chronicle => 
    chronicle.title.toLowerCase().includes(category.toLowerCase()) ||
    chronicle.excerpt.toLowerCase().includes(category.toLowerCase()) ||
    chronicle.tags.some(tag => tag.toLowerCase().includes(category.toLowerCase()))
  );
};
