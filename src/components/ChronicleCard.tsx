
import { Chronicle } from '@/lib/debateData';
import { Calendar, ExternalLink, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface ChronicleCardProps {
  chronicle: Chronicle;
  className?: string;
}

const ChronicleCard = ({ chronicle, className }: ChronicleCardProps) => {
  return (
    <div className={cn(
      'glass-card overflow-hidden transition-all duration-300 hover:shadow-medium',
      className
    )}>
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <div className="space-y-2">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
              Crônica
            </span>
          </div>
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{new Date(chronicle.date).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-medium mb-2 group-hover:text-primary transition-colors">
          {chronicle.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
          {chronicle.excerpt}
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
          {chronicle.tags.map((tag) => (
            <span 
              key={tag}
              className="inline-flex items-center text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full"
            >
              <Tag className="w-3 h-3 mr-1 opacity-70" />
              {tag}
            </span>
          ))}
        </div>
        
        <div className="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-800">
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Por {chronicle.author}
          </span>
          
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="outline" 
              asChild
              className="text-xs"
            >
              <a href={chronicle.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                Original <ExternalLink className="ml-1 h-3 w-3" />
              </a>
            </Button>
            
            <Button 
              size="sm" 
              variant="default" 
              asChild
              className="text-xs"
            >
              <Link to={`/library/chronicle/${chronicle.id}`}>
                Ler mais
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChronicleCard;
