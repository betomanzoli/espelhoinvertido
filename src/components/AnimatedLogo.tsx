
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface AnimatedLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const AnimatedLogo = ({ size = 'md', showText = true, className }: AnimatedLogoProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  useEffect(() => {
    setIsAnimating(true);
    
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 10000);
    
    const handleMouseEnter = () => {
      setIsAnimating(true);
    };
    
    const handleMouseLeave = () => {
      setTimeout(() => {
        if (!isHovering) setIsAnimating(false);
      }, 1000);
    };
    
    let isHovering = false;
    const logoElement = document.querySelector('.animated-logo');
    
    if (logoElement) {
      logoElement.addEventListener('mouseenter', () => {
        isHovering = true;
        handleMouseEnter();
      });
      logoElement.addEventListener('mouseleave', () => {
        isHovering = false;
        handleMouseLeave();
      });
    }
    
    return () => {
      clearInterval(interval);
      if (logoElement) {
        logoElement.removeEventListener('mouseenter', handleMouseEnter);
        logoElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

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
    <Link to="/" className={cn("flex items-center gap-2 animated-logo", className)}>
      <div className="relative">
        <div className={cn(
          "transition-all duration-500",
          sizeClasses[size],
          isAnimating ? "scale-110" : "scale-100",
        )}>
          {/* Logo com bordas animadas */}
          <div className={cn(
            "relative h-full w-auto",
            "transition-all duration-500",
          )}>
            <div className={cn(
              "absolute inset-0",
              "rounded-full",
              "opacity-60 blur-md",
              "transition-opacity duration-500",
              isAnimating ? "animate-pulse bg-gradient-to-r from-blue-600 to-teal-600" : "bg-transparent"
            )} />
            
            {/* Imagem do logo EI */}
            <div className={cn(
              "relative w-auto h-full flex items-center justify-center rounded-full overflow-hidden",
              "transform transition-all duration-500",
              "bg-gradient-to-br from-blue-500 to-teal-500",
              "border-2 border-white dark:border-gray-800",
              isAnimating ? "shadow-lg shadow-blue-600/20" : ""
            )}>
              <span className={cn(
                "text-white font-bold",
                size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-xl", 
                "font-display tracking-tighter"
              )}>
                EI
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Texto "Espelho Invertido" com efeitos */}
      {showText && (
        <div className="relative overflow-hidden">
          <span className={cn(
            textSizeClasses[size],
            "font-display font-bold transition-all duration-500 relative z-10",
            "bg-clip-text",
            isAnimating ? "bg-gradient-to-r from-blue-600 to-teal-500 text-transparent" : ""
          )}>
            Espelho Invertido
          </span>
          
          <span className={cn(
            "absolute bottom-0 left-0 w-full h-0.5 transform origin-left",
            "transition-all duration-500 ease-out",
            isAnimating ? "bg-gradient-to-r from-blue-500 to-teal-400 scale-x-100" : "bg-transparent scale-x-0",
            "group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400 group-hover:scale-x-100"
          )} />
          
          <span className={cn(
            "absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30",
            "transform -translate-x-full",
            isAnimating ? "animate-shimmer" : ""
          )} />
        </div>
      )}
    </Link>
  );
};

export default AnimatedLogo;
