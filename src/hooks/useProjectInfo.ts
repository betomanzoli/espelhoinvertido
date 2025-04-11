
import { useState, useEffect } from 'react';
import { fetchSubstackPosts } from '@/services/substackService';
import { 
  parseFeatures, 
  generateGameplayFeatures,
  generateEducationalFeatures,
  generateTechnicalFeatures,
  getProjectIcon,
  getDefaultProjectDescription
} from '@/utils/projectUtils';

export interface ProjectInfo {
  description: string;
  features: string[];
  tabs: {
    gameplay: string[];
    educational: string[];
    technical: string[];
  };
  icon: string;
  substackUrl?: string;
  coverImage?: string;
}

export const useProjectInfo = (title: string) => {
  const [projectInfo, setProjectInfo] = useState<ProjectInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchProjectInfo = async () => {
      setIsLoading(true);
      try {
        // Buscar posts do Substack
        const posts = await fetchSubstackPosts();
        
        // Encontrar o post correspondente ao projeto atual
        const projectPost = posts.find(post => {
          return post.title.toLowerCase().includes(title.toLowerCase()) ||
                 title.toLowerCase().includes(post.title.toLowerCase());
        });
        
        if (projectPost) {
          // Converter o formato para o que o componente espera
          setProjectInfo({
            description: projectPost.description || projectPost.subtitle || "Detalhes deste projeto serão divulgados em breve.",
            features: parseFeatures(projectPost.description || ""),
            tabs: {
              gameplay: generateGameplayFeatures(projectPost.title),
              educational: generateEducationalFeatures(projectPost.title),
              technical: generateTechnicalFeatures(projectPost.title)
            },
            icon: getProjectIcon(title),
            substackUrl: projectPost.url,
            coverImage: projectPost.coverImage
          });
        } else {
          // Fallback para informações predefinidas
          setProjectInfo(getDefaultProjectDescription(title));
        }
      } catch (error) {
        console.error("Erro ao buscar informações do projeto:", error);
        setProjectInfo(getDefaultProjectDescription(title));
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProjectInfo();
  }, [title]);
  
  return { projectInfo, isLoading };
};
