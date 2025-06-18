
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

  const categories = ['todos', 'economia', 'tecnologia', 'história', 'política', 'manifesto', 'trabalho'];

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'todos' || 
      post.title.toLowerCase().includes(selectedCategory) ||
      post.description.toLowerCase().includes(selectedCategory) ||
      post.content?.toLowerCase().includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="page-container bg-light-gray">
        <div className="content-wrapper">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center text-red-600">Erro ao Carregar Conteúdo</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-gray-600 dark:text-gray-400">
                Não foi possível carregar o conteúdo do Substack. 
                Verifique sua conexão com a internet e tente novamente.
              </p>
              <Button onClick={refreshData} variant="outline" className="gap-2">
                <RefreshCw className="h-4 w-4" />
                Tentar Novamente
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container bg-light-gray">
      <div className="content-wrapper">
        <div className="max-w-5xl mx-auto">
          <Card className="mb-8">
            <CardHeader className="text-center">
              <CardTitle className="flex items-center justify-center gap-2 text-3xl">
                <BookOpen className="h-8 w-8" />
                Análise Dialética - Substack
              </CardTitle>
              <CardDescription className="text-lg max-w-3xl mx-auto">
                Cada publicação analisada através de três perspectivas: histórico-filosófica (Rafael), 
                prático-digital (Luísa) e síntese dialética (debate entre ambos).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Buscar por título, conteúdo ou palavras-chave..."
                    className="pl-10"
                  />
                </div>
                <Button onClick={refreshData} variant="outline" disabled={loading} className="gap-2">
                  <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
                  Atualizar
                </Button>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map(category => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className="cursor-pointer hover:bg-primary/80 transition-colors"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Badge>
                ))}
              </div>
              
              {!loading && posts.length > 0 && (
                <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
                  {filteredPosts.length} de {posts.length} publicações
                  {selectedCategory !== 'todos' && ` • Categoria: ${selectedCategory}`}
                  {searchQuery && ` • Busca: "${searchQuery}"`}
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-8">
            {loading ? (
              // Loading skeletons melhorados
              Array.from({ length: 3 }).map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                          <Skeleton key={i} className="h-8 w-20" />
                        ))}
                      </div>
                      <Skeleton className="h-32 w-full" />
                    </div>
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
                  <div className="space-y-4">
                    <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                        {searchQuery || selectedCategory !== 'todos' 
                          ? 'Nenhum post encontrado' 
                          : 'Nenhum post disponível'}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        {searchQuery 
                          ? 'Tente ajustar sua busca ou limpar os filtros.'
                          : selectedCategory !== 'todos'
                          ? 'Tente outra categoria ou limpe os filtros.'
                          : 'Aguarde enquanto carregamos o conteúdo do Substack.'}
                      </p>
                    </div>
                    {(searchQuery || selectedCategory !== 'todos') && (
                      <div className="flex gap-2 justify-center">
                        {searchQuery && (
                          <Button variant="outline" onClick={() => setSearchQuery('')}>
                            Limpar busca
                          </Button>
                        )}
                        {selectedCategory !== 'todos' && (
                          <Button variant="outline" onClick={() => setSelectedCategory('todos')}>
                            Todas as categorias
                          </Button>
                        )}
                      </div>
                    )}
                  </div>
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
