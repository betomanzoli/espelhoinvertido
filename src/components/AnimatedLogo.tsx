
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = 'md', showText = true, className }: AnimatedLogoProps) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Inicia a animação quando o componente é montado
    setIsAnimating(true);
    
    // Define um intervalo para animar periodicamente
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 10000);
    
    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <Link to="/" className={cn("flex items-center group", className)}>
      <div className="relative">
        <div className={cn(
          "transition-all duration-700",
          isAnimating ? "scale-110" : "scale-100",
        )}>
          <div className={cn(
            sizeClasses[size],
            "font-display font-bold gradient-text"
          )}>
            EI
          </div>
        </div>
        <div className={cn(
          "absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 transition-opacity duration-500",
          isAnimating ? "opacity-100" : "opacity-0"
        )}>
          <Sparkles 
            className={cn(
              "text-yellow-300 animate-pulse",
              size === 'sm' ? "w-3 h-3" : size === 'md' ? "w-5 h-5" : "w-8 h-8"
            )}
          />
        </div>
      </div>
      
      {showText && (
        <span className={cn(
          sizeClasses[size],
          "ml-2 font-display font-bold group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500"
        )}>
          Espelho Invertido
        </span>
      )}
    </Link>
  );
};

export default AnimatedLogo;
