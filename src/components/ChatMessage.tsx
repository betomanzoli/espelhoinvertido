
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

    // This approach properly maintains spaces and formatting
    let segments: React.ReactNode[] = [];
    let lastIndex = 0;
    const contentLower = content.toLowerCase();
    
    // Process each term to highlight
    highlightTerms.forEach(term => {
      const termLower = term.toLowerCase();
      let startPos = 0;
      
      // Find all occurrences of the term
      while ((startPos = contentLower.indexOf(termLower, lastIndex)) !== -1) {
        // Add text before the term
        if (startPos > lastIndex) {
          segments.push(content.substring(lastIndex, startPos));
        }
        
        // Add the term with tooltip
        const endPos = startPos + term.length;
        const actualTerm = content.substring(startPos, endPos); // Preserve original case
        
        segments.push(
          <ConceptTooltip 
            key={`${id}-${term}-${startPos}`} 
            term={term}
            variant={char.accent === 'burgundy' ? 'burgundy' : 'navy'}
          >
            {actualTerm}
          </ConceptTooltip>
        );
        
        lastIndex = endPos;
      }
    });
    
    // Add remaining text
    if (lastIndex < content.length) {
      segments.push(content.substring(lastIndex));
    }
    
    return segments.length ? <p>{segments}</p> : <p>{content}</p>;
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
