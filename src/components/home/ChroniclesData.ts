
import { Chronicle } from '@/lib/debateData';
import { chronicles as allChronicles } from '@/lib/debateData';

// Use imported chronicles from debateData.ts
export const chronicles = allChronicles;

// Sistema de recomendação simulado
export const getRecommendations = (category: string): Chronicle[] => {
  const recommendations: Record<string, string[]> = {
    "História": ["1", "3"],
    "Economia": ["2", "3"],
    "Ideologia": ["1", "2"],
  };
  
  return chronicles.filter(chronicle => 
    recommendations[category as keyof typeof recommendations]?.includes(chronicle.id)
  ).slice(0, 2);
};

export const getFilteredChronicles = (category: string): Chronicle[] => {
  if (category === 'todas') {
    return chronicles;
  }
  
  return chronicles.filter(chronicle => 
    chronicle.tags.some(tag => tag === category)
  );
};
