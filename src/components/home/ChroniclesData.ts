
import { Chronicle } from './ChronicleCard';

// Exemplo de crônicas (em um projeto real, viria de uma API)
export const chronicles: Chronicle[] = [
  {
    id: 1,
    title: "Duas Bibliotecas, Uma História",
    excerpt: "Como diferentes narrativas históricas são construídas a partir das mesmas fontes primárias.",
    category: "História",
    image: "https://via.placeholder.com/300x180?text=História",
    link: "/library/chronicle/1",
  },
  {
    id: 2,
    title: "O Espectro Que Recusamos Ver",
    excerpt: "Uma análise contemporânea do primeiro parágrafo do Manifesto Comunista.",
    category: "Ideologia",
    image: "https://via.placeholder.com/300x180?text=Ideologia",
    link: "/library/chronicle/2",
  },
  {
    id: 3,
    title: "Capitalismo de Plataforma",
    excerpt: "Como as novas relações de trabalho digital mascaram formas tradicionais de exploração.",
    category: "Economia",
    image: "https://via.placeholder.com/300x180?text=Economia",
    link: "/library/chronicle/3",
  },
];

// Sistema de recomendação simulado
export const getRecommendations = (category: string): Chronicle[] => {
  const recommendations: Record<string, number[]> = {
    "História": [1, 3],
    "Economia": [2, 3],
    "Ideologia": [1, 2],
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
    chronicle.category.toLowerCase() === category.toLowerCase()
  );
};
