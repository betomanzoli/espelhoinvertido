
import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SearchIcon, RefreshCw } from 'lucide-react';
import ChronicleCard from "@/components/home/ChronicleCard";
import { Chronicle } from '@/lib/debateData';
import { useSubstackData } from '@/hooks/useSubstackData';
import { convertSubstackPostsToChronicles } from '@/components/home/ChroniclesData';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const Library = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const initialQuery = searchParams.get('q') || '';
  
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredChronicles, setFilteredChronicles] = useState<Chronicle[]>([]);
  
  const { posts, loading, refreshData } = useSubstackData();
  
  const allChronicles = posts && posts.length > 0 ? convertSubstackPostsToChronicles(posts) : [];
  
  // Filtrar crônicas quando os dados mudam
  useEffect(() => {
    filterChronicles(searchQuery, activeCategory);
  }, [posts, searchQuery, activeCategory]);
  
  const filterChronicles = (query: string, category: string) => {
    let filtered = [...allChronicles];
    
    // Filtrar por categoria
    if (category && category !== 'all') {
      filtered = filtered.filter(chronicle => 
        chronicle.tags.some(tag => tag.toLowerCase() === category.toLowerCase())
      );
    }
    
    // Filtrar por termo de busca
    if (query) {
      const lowerQuery = query.toLowerCase();
      filtered = filtered.filter(chronicle => 
        chronicle.title.toLowerCase().includes(lowerQuery) || 
        chronicle.excerpt.toLowerCase().includes(lowerQuery) ||
        chronicle.content.toLowerCase().includes(lowerQuery)
      );
    }
    
    setFilteredChronicles(filtered);
  };
  
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSearchParams({ category, q: searchQuery });
  };
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchParams({ category: activeCategory, q: query });
  };
  
  const handleRefresh = () => {
    refreshData();
    toast.info("Atualizando biblioteca", {
      description: "Buscando as publicações mais recentes..."
    });
  };

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-0">Biblioteca</h1>
          <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Atualizar
          </Button>
        </div>

        <div className="mb-8">
          <div className="max-w-md mx-auto">
            <Label htmlFor="search" className="sr-only">Buscar</Label>
            <div className="relative">
              <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                id="search"
                placeholder="Buscar crônicas..."
                className="pl-9"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </div>
        
        <Tabs defaultValue={activeCategory} onValueChange={handleCategoryChange}>
          <div className="flex justify-center mb-6">
            <TabsList>
              <TabsTrigger value="all">Todas</TabsTrigger>
              <TabsTrigger value="História">História</TabsTrigger>
              <TabsTrigger value="Economia">Economia</TabsTrigger>
              <TabsTrigger value="Ideologia">Ideologia</TabsTrigger>
              <TabsTrigger value="Substack">Substack</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-60 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                ))
              ) : filteredChronicles.length > 0 ? (
                filteredChronicles.map(chronicle => (
                  <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhuma crônica encontrada</p>
                  <p className="text-sm">Tente alterar seus critérios de busca</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="História" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-60 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                ))
              ) : filteredChronicles.length > 0 ? (
                filteredChronicles.map(chronicle => (
                  <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhuma crônica encontrada nesta categoria</p>
                  <p className="text-sm">Tente alterar seus critérios de busca</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="Economia" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-60 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                ))
              ) : filteredChronicles.length > 0 ? (
                filteredChronicles.map(chronicle => (
                  <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhuma crônica encontrada nesta categoria</p>
                  <p className="text-sm">Tente alterar seus critérios de busca</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="Ideologia" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-60 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                ))
              ) : filteredChronicles.length > 0 ? (
                filteredChronicles.map(chronicle => (
                  <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhuma crônica encontrada nesta categoria</p>
                  <p className="text-sm">Tente alterar seus critérios de busca</p>
                </div>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="Substack" className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {loading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="h-60 rounded-lg bg-gray-200 dark:bg-gray-800 animate-pulse"></div>
                ))
              ) : filteredChronicles.length > 0 ? (
                filteredChronicles.map(chronicle => (
                  <ChronicleCard key={chronicle.id} chronicle={chronicle} />
                ))
              ) : (
                <div className="col-span-full text-center py-16">
                  <p className="text-gray-500 dark:text-gray-400 mb-2">Nenhuma crônica encontrada nesta categoria</p>
                  <p className="text-sm">Tente alterar seus critérios de busca</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Library;
