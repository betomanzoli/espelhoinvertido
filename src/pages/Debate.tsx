
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { debateTopics } from '@/lib/debateData';
import ChatInterface from './DebateChat';
import SearchFilters from '@/components/debate/SearchFilters';
import TopicsGrid from '@/components/debate/TopicsGrid';

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
  
  const clearFilters = () => {
    setSearchTerm('');
    setCategoryFilter('');
    setDifficultyFilter('');
  };
  
  // Show topic selection
  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 animate-slide-up">
          Tópicos de Debate
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Escolha um tema para iniciar uma conversa com Rafael e Luísa
        </p>
        
        <SearchFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          categories={categories}
          difficulties={difficulties}
        />
        
        <TopicsGrid 
          topics={filteredTopics}
          onClearFilters={clearFilters}
        />
      </div>
    </div>
  );
};

export default Debate;
