
import { Chronicle } from '@/lib/debateData';
import { SubstackPost } from '@/services/substackService';

// Converter posts do Substack para o formato Chronicle com categorização inteligente
export const convertSubstackPostsToChronicles = (posts: SubstackPost[]): Chronicle[] => {
  return posts.map(post => {
    // Categorização inteligente baseada no conteúdo
    const getCategories = (title: string, content: string): string[] => {
      const lowerTitle = title.toLowerCase();
      const lowerContent = content.toLowerCase();
      const categories: string[] = ['Substack']; // Sempre incluir Substack
      
      if (lowerTitle.includes('história') || lowerContent.includes('revolução') || 
          lowerContent.includes('histórico') || lowerTitle.includes('manifesto')) {
        categories.push('História');
      }
      
      if (lowerTitle.includes('economia') || lowerContent.includes('econômic') || 
          lowerContent.includes('trabalho') || lowerContent.includes('capital')) {
        categories.push('Economia');
      }
      
      if (lowerTitle.includes('ideologia') || lowerContent.includes('política') || 
          lowerContent.includes('marxist') || lowerContent.includes('class')) {
        categories.push('Ideologia');
      }
      
      // Se não tem categoria específica, adicionar "Geral"
      if (categories.length === 1) {
        categories.push('Geral');
      }
      
      return categories;
    };
    
    const categories = getCategories(post.title, post.content || post.description);
    
    return {
      id: post.id,
      title: post.title,
      excerpt: post.subtitle || post.description.substring(0, 150) + '...',
      content: post.content || post.description,
      date: post.publishedAt,
      author: 'Espelho Invertido',
      tags: categories,
      url: post.url,
      image: post.coverImage,
      relatedTopics: []
    };
  });
};

// Recomendações baseadas em categoria com lógica melhorada
export const getRecommendations = (posts: Chronicle[], category: string): Chronicle[] => {
  if (!category || category === 'todas' || category === 'all') {
    return posts.slice(0, 3);
  }
  
  // Primeiro, buscar posts que têm a categoria exata
  const exactMatches = posts.filter(chronicle => 
    chronicle.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
  );
  
  if (exactMatches.length >= 2) {
    return exactMatches.slice(0, 2);
  }
  
  // Se não houver matches suficientes, buscar por conteúdo relacionado
  const relatedMatches = posts.filter(chronicle => 
    chronicle.title.toLowerCase().includes(category.toLowerCase()) ||
    chronicle.excerpt.toLowerCase().includes(category.toLowerCase())
  );
  
  // Combinar resultados exatos e relacionados
  const combined = [...exactMatches, ...relatedMatches];
  const unique = combined.filter((item, index, self) => 
    index === self.findIndex(t => t.id === item.id)
  );
  
  return unique.slice(0, 2);
};

export const getFilteredChronicles = (posts: Chronicle[], category: string): Chronicle[] => {
  if (!category || category === 'todas' || category === 'all') {
    return posts;
  }
  
  return posts.filter(chronicle => 
    chronicle.tags.some(tag => tag.toLowerCase() === category.toLowerCase()) ||
    chronicle.title.toLowerCase().includes(category.toLowerCase()) ||
    chronicle.excerpt.toLowerCase().includes(category.toLowerCase())
  );
};

// Função para busca inteligente
export const searchChronicles = (posts: Chronicle[], query: string): Chronicle[] => {
  if (!query.trim()) {
    return posts;
  }
  
  const lowerQuery = query.toLowerCase();
  
  return posts.filter(chronicle => 
    chronicle.title.toLowerCase().includes(lowerQuery) ||
    chronicle.excerpt.toLowerCase().includes(lowerQuery) ||
    chronicle.content.toLowerCase().includes(lowerQuery) ||
    chronicle.tags.some(tag => tag.toLowerCase().includes(lowerQuery)) ||
    chronicle.author.toLowerCase().includes(lowerQuery)
  ).sort((a, b) => {
    // Priorizar matches no título
    const aTitle = a.title.toLowerCase().includes(lowerQuery);
    const bTitle = b.title.toLowerCase().includes(lowerQuery);
    
    if (aTitle && !bTitle) return -1;
    if (!aTitle && bTitle) return 1;
    
    // Depois por data (mais recente primeiro)
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};
