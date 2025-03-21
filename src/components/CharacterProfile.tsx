
import { Character } from '@/lib/debateData';
import { cn } from '@/lib/utils';

interface CharacterProfileProps {
  character: Character;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const CharacterProfile = ({ 
  character, 
  size = 'md', 
  className 
}: CharacterProfileProps) => {
  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return {
          container: 'flex-col items-center p-3',
          image: 'w-16 h-16',
          name: 'text-sm mt-2',
          role: 'text-xs',
          description: 'hidden',
        };
      case 'lg':
        return {
          container: 'flex-col items-center p-6',
          image: 'w-32 h-32',
          name: 'text-xl mt-3',
          role: 'text-sm',
          description: 'text-sm mt-3 text-center',
        };
      default: // md
        return {
          container: 'p-4 gap-4',
          image: 'w-20 h-20',
          name: 'text-lg',
          role: 'text-xs',
          description: 'text-sm mt-1',
        };
    }
  };

  const sizeClasses = getSizeClasses();
  const accentColor = character.accent === 'burgundy' ? 'burgundy' : 'navy';

  return (
    <div className={cn(
      'flex glass-card overflow-hidden transition-all duration-300 hover:shadow-medium',
      sizeClasses.container,
      className
    )}>
      <div className={cn(
        'relative rounded-full overflow-hidden flex-shrink-0',
        sizeClasses.image,
        `border-2 border-${accentColor}`
      )}>
        <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
          {/* Placeholder until we have actual character images */}
          <span className={cn(
            'font-bold text-2xl',
            character.accent === 'burgundy' ? 'text-burgundy' : 'text-navy'
          )}>
            {character.name[0]}
          </span>
        </div>
      </div>
      
      <div className={size === 'sm' ? 'text-center' : 'flex-1'}>
        <h3 className={cn(
          'font-medium',
          sizeClasses.name,
          character.accent === 'burgundy' ? 'text-burgundy' : 'text-navy'
        )}>
          {character.name}
        </h3>
        
        <p className={cn(
          'text-gray-500 dark:text-gray-400',
          sizeClasses.role
        )}>
          {character.role}
        </p>
        
        <p className={cn(
          'text-gray-700 dark:text-gray-300',
          sizeClasses.description
        )}>
          {character.description}
        </p>
      </div>
    </div>
  );
};

export default CharacterProfile;
