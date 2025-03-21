
import { useState } from 'react';
import { conceptLibrary } from '@/lib/debateData';
import { Book, BookOpen, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from '@/lib/utils';

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConceptIndex, setActiveConceptIndex] = useState<number | null>(null);
  
  const filteredConcepts = conceptLibrary.filter(
    concept => 
      concept.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.definition.toLowerCase().includes(searchTerm.toLowerCase()) ||
      concept.source.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleConceptClick = (index: number) => {
    setActiveConceptIndex(index === activeConceptIndex ? null : index);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-gradient-to-b from-light-gray to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6 animate-slide-up">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold mb-1">
                Biblioteca de Conceitos
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Explore termos e definições para enriquecer seus debates
              </p>
            </div>
          </div>
          
          {/* Search */}
          <div className="mb-8 relative animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Buscar conceitos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 py-6 text-lg shadow-soft"
              />
            </div>
          </div>
          
          {/* Concepts List */}
          <div className="space-y-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            {filteredConcepts.length > 0 ? (
              filteredConcepts.map((concept, index) => (
                <Card 
                  key={concept.term}
                  className={cn(
                    "overflow-hidden transition-all duration-300",
                    activeConceptIndex === index ? "shadow-medium" : "hover:shadow-soft"
                  )}
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-burgundy">{concept.term}</CardTitle>
                        <CardDescription className="text-sm italic">
                          Fonte: {concept.source}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        onClick={() => handleConceptClick(index)}
                      >
                        <Book className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className={cn(
                    "grid transition-all duration-500 ease-in-out",
                    activeConceptIndex === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  )}>
                    <div className="overflow-hidden">
                      <p className="pb-2">
                        {concept.definition}
                      </p>
                      <p className="text-sm text-gray-500">
                        Este conceito aparece frequentemente em debates sobre {' '}
                        <span className="text-primary font-medium">
                          {concept.term === 'mais-valia' || concept.term === 'fetichismo da mercadoria' 
                            ? 'economia, capitalismo e teoria marxista' 
                            : concept.term === 'hegemonia cultural' 
                              ? 'cultura, poder e ideologia'
                              : concept.term === 'polarização política'
                                ? 'política, democracia e mídia'
                                : 'economia política e globalização'}
                        </span>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="text-center py-12 glass-card">
                <h3 className="text-xl font-medium mb-2">Nenhum conceito encontrado</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Tente uma busca diferente para encontrar conceitos na biblioteca.
                </p>
                <Button onClick={() => setSearchTerm('')}>
                  Limpar Busca
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Library;
