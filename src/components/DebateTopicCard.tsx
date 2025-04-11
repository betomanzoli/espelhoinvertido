
import { DebateTopic } from '@/lib/debateData';
import { ArrowRight, Clock, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface DebateTopicCardProps {
  topic: DebateTopic;
  className?: string;
}

const DebateTopicCard = ({ topic, className }: DebateTopicCardProps) => {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'basic':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'advanced':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case 'economia':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      case 'mídia':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300';
      case 'filosofia':
        return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300';
      case 'tecnologia':
        return 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300';
      case 'política':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300';
    }
  };

  // Create Icon component dynamically
  const Icon = topic.icon;

  return (
    <div className={cn(
      'glass-card overflow-hidden transition-all duration-300 hover:shadow-medium group',
      className
    )}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-2">
            <span className={cn(
              'inline-block px-2.5 py-0.5 rounded-full text-xs font-medium',
              getCategoryColor(topic.category)
            )}>
              {topic.category}
            </span>
            <span className={cn(
              'inline-block ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium',
              getDifficultyColor(topic.difficulty)
            )}>
              {topic.difficulty === 'basic' ? 'Básico' : 
               topic.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="w-3 h-3 mr-1" />
            <span>~20 min</span>
          </div>
        </div>
        
        <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
          {topic.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {topic.description}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {topic.tags.map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
            >
              <Tag className="w-3 h-3 mr-1 opacity-70" />
              {tag}
            </span>
          ))}
        </div>
        
        <Link
          to={`/debate/${topic.id}`}
          className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
        >
          Iniciar debate
          <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
};

export default DebateTopicCard;
