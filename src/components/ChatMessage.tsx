
import { characters } from '@/lib/debateData';
import CharacterProfile from './CharacterProfile';
import ConceptTooltip from './ConceptTooltip';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ChatMessageProps {
  id: string;
  character: string;
  content: string;
  timestamp: Date;
  highlightTerms?: string[];
  className?: string;
  isTyping?: boolean;
}

const ChatMessage = ({ 
  id, 
  character, 
  content, 
  timestamp, 
  highlightTerms = [],
  className,
  isTyping = false,
}: ChatMessageProps) => {
  // For user messages
  if (character === 'user') {
    return (
      <div className={cn(
        'flex justify-end mb-4',
        className
      )}>
        <div className="max-w-[75%] glass-card bg-primary/10 p-4 rounded-2xl rounded-tr-none">
          <div className="text-base">
            {content}
          </div>
          <div className="mt-1 text-right">
            <time className="text-xs text-gray-500 dark:text-gray-400">
              {format(timestamp, 'HH:mm', { locale: ptBR })}
            </time>
          </div>
        </div>
      </div>
    );
  }

  // For character messages
  const char = characters.find(c => c.id === character);
  if (!char) return null;

  // Process content to highlight terms
  const processContent = () => {
    if (highlightTerms.length === 0 || isTyping) {
      return <p>{content}</p>;
    }

    let processedContent = content;
    let segments: React.ReactNode[] = [];
    
    // Simple approach for demonstration - could be enhanced with regex for better matching
    highlightTerms.forEach((term) => {
      const parts = processedContent.split(new RegExp(`(${term})`, 'gi'));
      processedContent = parts.join(''); // This is just to avoid double-processing
      
      segments = parts.map((part, index) => {
        if (part.toLowerCase() === term.toLowerCase()) {
          return (
            <ConceptTooltip key={`${id}-${term}-${index}`} term={term}>
              <span className="bg-yellow-100 dark:bg-yellow-900/30 px-1 rounded cursor-help">
                {part}
              </span>
            </ConceptTooltip>
          );
        }
        return part;
      });
    });

    return <div>{segments.length ? segments : content}</div>;
  };

  return (
    <div className={cn(
      'flex gap-3 mb-4',
      className
    )}>
      <div className="flex-shrink-0">
        <CharacterProfile character={char} size="sm" />
      </div>
      
      <div className="max-w-[75%]">
        <div className={cn(
          'glass-card p-4 rounded-2xl rounded-tl-none', 
          char.accent === 'burgundy' ? 'border-burgundy/20' : 'border-navy/20'
        )}>
          <div className="flex items-center mb-1">
            <span className={cn(
              'font-medium mr-2',
              char.accent === 'burgundy' ? 'text-burgundy' : 'text-navy'
            )}>
              {char.name}
            </span>
            <span className="text-xs text-gray-500">
              {char.role}
            </span>
          </div>
          
          <div className={cn(
            'text-base',
            isTyping ? 'animate-pulse' : ''
          )}>
            {isTyping ? (
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
              </div>
            ) : (
              processContent()
            )}
          </div>
          
          <div className="mt-1">
            <time className="text-xs text-gray-500 dark:text-gray-400">
              {format(timestamp, 'HH:mm', { locale: ptBR })}
            </time>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
