
import { Button } from '@/components/ui/button';
import DebateTopicCard from '@/components/DebateTopicCard';
import { DebateTopic } from '@/lib/debateData';

interface TopicsGridProps {
  topics: DebateTopic[];
  onClearFilters: () => void;
}

const TopicsGrid = ({ topics, onClearFilters }: TopicsGridProps) => {
  if (topics.length === 0) {
    return (
      <div className="text-center py-12 glass-card animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <h3 className="text-xl font-medium mb-2">Nenhum tópico encontrado</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Tente ajustar seus filtros de busca para encontrar tópicos disponíveis.
        </p>
        <Button onClick={onClearFilters}>
          Limpar Filtros
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
      {topics.map((topic) => (
        <DebateTopicCard key={topic.id} topic={topic} />
      ))}
    </div>
  );
};

export default TopicsGrid;
