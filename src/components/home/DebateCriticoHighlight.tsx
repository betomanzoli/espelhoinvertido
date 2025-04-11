
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { characters } from '@/lib/debateData';
import CharacterProfile from '@/components/CharacterProfile';
import { useState, useEffect } from 'react';
import { fetchSubstackPosts } from '@/services/substackService';

const DebateCriticoHighlight = () => {
  const [substackUrl, setSubstackUrl] = useState('');
  
  useEffect(() => {
    const loadSubstackUrl = async () => {
      try {
        const posts = await fetchSubstackPosts();
        const chatPost = posts.find(post => 
          post.title.toLowerCase().includes('diálogo') || 
          post.title.toLowerCase().includes('rafael') ||
          post.title.toLowerCase().includes('luísa')
        );
        
        if (chatPost) {
          setSubstackUrl(chatPost.url);
        }
      } catch (error) {
        console.error("Erro ao buscar URL do Substack:", error);
      }
    };
    
    loadSubstackUrl();
  }, []);
  
  return (
    <section className="py-16 md:py-24 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block mb-6 text-primary">
              <MessageSquare className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Debate Crítico
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Uma plataforma de diálogo para explorar ideias complexas com Rafael e Luísa,
              dois personagens que analisam questões contemporâneas através de diferentes
              perspectivas ideológicas.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="gap-2">
                <Link to="/debate">
                  Iniciar um Debate
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="gap-2">
                <Link to="/library">
                  <BookOpen className="w-5 h-5" />
                  Acessar Biblioteca
                </Link>
              </Button>
              
              {substackUrl && (
                <Button 
                  asChild 
                  variant="outline" 
                  className="gap-2 border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800"
                >
                  <a href={substackUrl} target="_blank" rel="noopener noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M2 3h20"></path>
                      <path d="M2 8h20"></path>
                      <path d="M12 12h10"></path>
                      <path d="M12 16h10"></path>
                      <path d="M2 20h20"></path>
                    </svg>
                    Ver no Substack
                  </a>
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 justify-center">
            {characters.map((character) => (
              <CharacterProfile 
                key={character.id} 
                character={character} 
                size="lg" 
                className="md:max-w-[220px]"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DebateCriticoHighlight;
