
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = 'md', showText = true, className }: AnimatedLogoProps) => {
  const sizeClasses = {
    sm: 'h-8',
    md: 'h-12',
    lg: 'h-20'
  };
  
  const textSizeClasses = {
    sm: 'text-xl',
    md: 'text-3xl',
    lg: 'text-5xl'
  };

  return (
    <Link to="/" className={cn("flex items-center gap-2", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        <div className="w-auto h-full flex items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-teal-500 border-2 border-white dark:border-gray-800">
          <span className={cn(
            "text-white font-bold",
            size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-xl", 
            "font-display tracking-tighter"
          )}>
            EI
          </span>
        </div>
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
