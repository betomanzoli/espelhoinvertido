import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { debateTopics } from '@/lib/debateData';
import DebateTopicCard from '@/components/DebateTopicCard';
import ChatInterface from './DebateChat';
import { ArrowLeft, FilterIcon, SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Debate = () => {
  const { topicId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('');
  
  // Get unique categories and difficulties for filters
  const categories = [...new Set(debateTopics.map(topic => topic.category))];
  const difficulties = [...new Set(debateTopics.map(topic => topic.difficulty))];
  
  // Filter topics based on search and filters
  const filteredTopics = debateTopics.filter(topic => {
    const matchesSearch = searchTerm === '' || 
      topic.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      topic.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesCategory = categoryFilter === '' || topic.category === categoryFilter;
    const matchesDifficulty = difficultyFilter === '' || topic.difficulty === difficultyFilter;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  });
  
  // If topicId is present, show debate chat interface
  if (topicId) {
    const topic = debateTopics.find(t => t.id === topicId);
    if (!topic) {
      return (
        <div className="container mx-auto px-4 pt-24 pb-16">
          <div className="text-center">
            <h2 className="text-2xl font-medium mb-4">Tópico não encontrado</h2>
            <Link to="/debate" className="text-primary hover:underline">
              Voltar para a lista de debates
            </Link>
          </div>
        </div>
      );
    }
    
    return <ChatInterface topic={topic} />;
  }
  
  // Otherwise show topic selection
  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 animate-slide-up">
          Tópicos de Debate
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Escolha um tema para iniciar uma conversa com Rafael e Luísa
        </p>
        
        {/* Search and Filters */}
        <div className="mb-8 glass-card p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar tópicos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-3">
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-44">
                  <div className="flex items-center gap-2">
                    <FilterIcon className="h-4 w-4 text-gray-400" />
                    <SelectValue placeholder="Categoria" />
                  </div>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas Categorias</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                <SelectTrigger className="w-44">
                  <SelectValue placeholder="Dificuldade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Todas Dificuldades</SelectItem>
                  <SelectItem value="basic">Básico</SelectItem>
                  <SelectItem value="intermediate">Intermediário</SelectItem>
                  <SelectItem value="advanced">Avançado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {(searchTerm || categoryFilter || difficultyFilter) && (
            <div className="flex items-center mt-3 text-sm">
              <span className="text-gray-500 mr-2">Filtros ativos:</span>
              
              {searchTerm && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 mr-2"
                  onClick={() => setSearchTerm('')}
                >
                  Busca: {searchTerm}
                  <ArrowLeft className="h-3 w-3 ml-1" />
                </Button>
              )}
              
              {categoryFilter && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7 mr-2"
                  onClick={() => setCategoryFilter('')}
                >
                  Categoria: {categoryFilter}
                  <ArrowLeft className="h-3 w-3 ml-1" />
                </Button>
              )}
              
              {difficultyFilter && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-7"
                  onClick={() => setDifficultyFilter('')}
                >
                  Dificuldade: {
                    difficultyFilter === 'basic' ? 'Básico' : 
                    difficultyFilter === 'intermediate' ? 'Intermediário' : 'Avançado'
                  }
                  <ArrowLeft className="h-3 w-3 ml-1" />
                </Button>
              )}
            </div>
          )}
        </div>
        
        {/* Topics Grid */}
        {filteredTopics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            {filteredTopics.map((topic) => (
              <DebateTopicCard key={topic.id} topic={topic} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <h3 className="text-xl font-medium mb-2">Nenhum tópico encontrado</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Tente ajustar seus filtros de busca para encontrar tópicos disponíveis.
            </p>
            <Button onClick={() => {
              setSearchTerm('');
              setCategoryFilter('');
              setDifficultyFilter('');
            }}>
              Limpar Filtros
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Debate;
