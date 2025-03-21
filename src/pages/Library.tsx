
import { useState } from 'react';
import { conceptLibrary, chronicles } from '@/lib/debateData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SearchIcon } from 'lucide-react';
import ConceptTooltip from '@/components/ConceptTooltip';
import ChronicleCard from '@/components/ChronicleCard';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Library = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('concepts');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Filter concepts based on search term
  const filteredConcepts = conceptLibrary.filter(concept =>
    concept.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    concept.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Filter chronicles based on search term
  const filteredChronicles = chronicles.filter(chronicle =>
    chronicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chronicle.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chronicle.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chronicle.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    chronicle.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Pagination logic
  const getPageItems = (items) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return items.slice(startIndex, startIndex + itemsPerPage);
  };
  
  const pageCount = Math.ceil(
    (activeTab === 'concepts' ? filteredConcepts.length : filteredChronicles.length) / itemsPerPage
  );
  
  const currentItems = activeTab === 'concepts' 
    ? getPageItems(filteredConcepts)
    : getPageItems(filteredChronicles);
  
  // Reset to page 1 when changing tabs or search term
  const handleTabChange = (value) => {
    setActiveTab(value);
    setCurrentPage(1);
  };
  
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  
  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 animate-slide-up">
          Biblioteca
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Explore conceitos e crônicas para aprofundar seu conhecimento
        </p>
        
        {/* Search */}
        <div className="mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="relative max-w-md mx-auto">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Buscar na biblioteca..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10"
            />
          </div>
        </div>
        
        {/* Tabs */}
        <Tabs 
          defaultValue="concepts" 
          value={activeTab} 
          onValueChange={handleTabChange}
          className="animate-slide-up" 
          style={{ animationDelay: '0.3s' }}
        >
          <TabsList className="mx-auto mb-8">
            <TabsTrigger value="concepts">Conceitos</TabsTrigger>
            <TabsTrigger value="chronicles">Crônicas</TabsTrigger>
          </TabsList>
          
          {/* Concepts Tab */}
          <TabsContent value="concepts" className="space-y-8">
            {currentItems.length > 0 ? (
              <div className="glass-card p-6">
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {currentItems.map((concept, index) => (
                    <div key={index} className="py-4">
                      <h3 className="text-lg font-medium mb-2">
                        <ConceptTooltip term={concept.term}>
                          {concept.term}
                        </ConceptTooltip>
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {concept.definition}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                        Fonte: {concept.source}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 glass-card">
                <h3 className="text-xl font-medium mb-2">Nenhum conceito encontrado</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Tente ajustar sua busca para encontrar conceitos disponíveis.
                </p>
                {searchTerm && (
                  <Button onClick={() => setSearchTerm('')}>
                    Limpar Busca
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Chronicles Tab */}
          <TabsContent value="chronicles" className="space-y-8">
            {currentItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentItems.map((chronicle) => (
                  <ChronicleCard 
                    key={chronicle.id} 
                    chronicle={chronicle} 
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 glass-card">
                <h3 className="text-xl font-medium mb-2">Nenhuma crônica encontrada</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Tente ajustar sua busca para encontrar crônicas disponíveis.
                </p>
                {searchTerm && (
                  <Button onClick={() => setSearchTerm('')}>
                    Limpar Busca
                  </Button>
                )}
              </div>
            )}
          </TabsContent>
          
          {/* Pagination */}
          {pageCount > 1 && (
            <Pagination className="mt-8">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
                
                {Array.from({ length: pageCount }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={currentPage === i + 1}
                      onClick={() => setCurrentPage(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(pageCount, prev + 1))}
                    className={currentPage === pageCount ? "pointer-events-none opacity-50" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </Tabs>
      </div>
    </div>
  );
};

export default Library;
