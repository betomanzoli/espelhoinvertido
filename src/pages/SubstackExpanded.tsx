
import { useState } from 'react';
import { useSubstackData } from '@/hooks/useSubstackData';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, RefreshCw, BookOpen } from 'lucide-react';
import TripleContentView from '@/components/substack/TripleContentView';
import { Skeleton } from '@/components/ui/skeleton';

const SubstackExpanded = () => {
  const { posts, loading, error, refreshData } = useSubstackData();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');

  const categories = ['todos', 'economia', 'tecnologia', 'história', 'política'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'todos' || 
      post.title.toLowerCase().includes(selectedCategory) ||
      post.description.toLowerCase().includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-red-600">Erro ao Carregar</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="mb-4">Não foi possível carregar o conteúdo do Substack.</p>
              <Button onClick={refreshData} variant="outline">
                <RefreshCw className="h-4 w-4 mr-2" />
                Tentar Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <BookOpen className="h-8 w-8" />
                Análise Dialética - Substack
              </CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                Cada publicação analisada através de três perspectivas: histórico-filosófica (Rafael), 
                prático-digital (Luísa) e síntese dialética (debate).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por título ou conteúdo..."
                    className="pl-10"
                  />
                </div>
                <Button onClick={refreshData} variant="outline" disabled={loading}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            {loading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index}>
                  <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-32 w-full" />
                  </CardContent>
                </Card>
              ))
            ) : filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <TripleContentView key={post.id} post={post} />
              ))
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <p className="text-gray-500">
                    {searchQuery || selectedCategory !== 'todos' 
                      ? 'Nenhum post encontrado com os filtros aplicados.' 
                      : 'Nenhum post disponível no momento.'}
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubstackExpanded;
