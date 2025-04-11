
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = 'md', showText = true, className }: AnimatedLogoProps) => {
  const sizeClasses = {
    sm: 'w-8',
    md: 'w-12',
    lg: 'w-20'
  };
  
  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <img 
          src="/lovable-uploads/8db0aa36-7a12-4278-b21e-31ed151fbeba.png" 
          alt="Espelho Invertido" 
          className="w-full h-auto"
        />
      </div>
      
      {showText && (
        <span className={cn(
          textSizeClasses[size],
          "font-display font-bold"
        )}>
          Espelho Invertido
        </span>
      )}
    </Link>
  );
};

export default AnimatedLogo;
