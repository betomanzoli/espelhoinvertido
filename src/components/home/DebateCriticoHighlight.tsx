
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { characters } from '@/lib/debateData';
import CharacterProfile from '@/components/CharacterProfile';

const DebateCriticoHighlight = () => {
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
