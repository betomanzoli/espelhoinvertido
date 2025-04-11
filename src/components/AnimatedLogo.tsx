
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
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Inicia a animação quando o componente é montado
    setIsAnimating(true);
    
    // Define um intervalo para animar periodicamente
    const interval = setInterval(() => {
      setIsAnimating(true);
      // Rotação suave do logo em intervalo
      setRotation((prev) => (prev + 10) % 360);
      setTimeout(() => setIsAnimating(false), 2000);
    }, 10000);
    
    // Ativa a animação quando o mouse passa sobre o logo
    const handleMouseEnter = () => {
      setIsAnimating(true);
      // Rotação suave ao passar o mouse
      setRotation((prev) => (prev + 15) % 360);
    };
    
    const handleMouseLeave = () => {
      // Mantém a animação por um tempo após o mouse sair
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
    <Link to="/" className={cn("flex items-center group animated-logo", className)}>
      <div className="relative">
        {/* Logo container com efeitos de animação */}
        <div 
          className={cn(
            "transition-all duration-700",
            isAnimating ? "scale-110" : "scale-100",
          )}
          style={{ 
            transform: isAnimating ? `scale(1.1) rotate(${rotation}deg)` : `rotate(${rotation}deg)`,
            transition: 'transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          {/* Logo com espelho invertido */}
          <div className={cn(
            "relative",
            sizeClasses[size],
            "transition-all duration-500"
          )}>
            {/* Efeito de glow ao redor do logo */}
            <div className={cn(
              "absolute inset-0",
              "rounded-full",
              isAnimating ? "animate-pulse-glow shadow-glow" : "",
              "opacity-70 blur-md",
              "transition-opacity duration-500",
              isAnimating ? "bg-gradient-to-r from-blue-500 to-teal-400" : "bg-transparent"
            )} />

            {/* Logo real com gradiente */}
            <div className={cn(
              "relative w-auto h-full",
              "transform transition-all duration-500",
              isAnimating ? "scale-105" : "scale-100",
            )}>
              {/* Hexágono com efeito de espelho */}
              <svg 
                viewBox="0 0 100 112" 
                className={cn(
                  "h-full w-auto",
                  "transition-all duration-500",
                  isAnimating ? "filter drop-shadow(0 0 8px rgba(56, 178, 172, 0.7))" : ""
                )}
              >
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" className="transition-all duration-500" />
                    <stop offset="100%" stopColor="#14B8A6" className="transition-all duration-500" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feComposite in="blur" operator="over" in2="SourceGraphic" />
                  </filter>
                </defs>
                {/* Hexágono principal */}
                <path 
                  fill="url(#logoGradient)"
                  d="M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z" 
                  className={cn(
                    "transition-all duration-700",
                    isAnimating ? "opacity-100" : "opacity-90"
                  )}
                />
                
                {/* Letras "EI" dentro do hexágono */}
                <text
                  x="50"
                  y="60"
                  textAnchor="middle"
                  fontSize="48"
                  fontWeight="bold"
                  fill="white"
                  className={cn(
                    "transition-all duration-500",
                    isAnimating ? "filter drop-shadow(0 0 5px rgba(255, 255, 255, 0.8))" : ""
                  )}
                >
                  EI
                </text>
                
                {/* Linha divisória simulando efeito espelho */}
                <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.7)" strokeWidth="1" />
                
                {/* Reflexo na parte inferior com opacidade reduzida */}
                <path 
                  fill="url(#logoGradient)"
                  d="M50 100 L100 75 L100 100 L50 112 L0 100 L0 75 Z" 
                  opacity="0.3"
                  className="animate-pulse"
                />
                
                {/* Reflexo das letras "EI" */}
                <text
                  x="50"
                  y="110"
                  textAnchor="middle"
                  fontSize="32"
                  fontWeight="bold"
                  fill="white"
                  opacity="0.2"
                  transform="scale(1, -0.5) translate(0, -170)"
                >
                  EI
                </text>
              </svg>
            </div>
          </div>
        </div>

        {/* Efeito de partículas */}
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
      
      {/* Texto "Espelho Invertido" com efeitos */}
      {showText && (
        <div className="relative ml-2 overflow-hidden">
          <span className={cn(
            textSizeClasses[size],
            "font-display font-bold transition-all duration-500 relative z-10",
            "bg-clip-text",
            isAnimating || "group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400 group-hover:bg-clip-text group-hover:text-transparent",
            isAnimating ? "bg-gradient-to-r from-blue-500 to-teal-400 text-transparent" : "",
          )}>
            Espelho Invertido
          </span>
          
          {/* Efeito de destaque sob o texto */}
          <span className={cn(
            "absolute bottom-0 left-0 w-full h-0.5 transform origin-left",
            "transition-all duration-500 ease-out",
            isAnimating ? "bg-gradient-to-r from-blue-500 to-teal-400 scale-x-100" : "bg-transparent scale-x-0",
            "group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-teal-400 group-hover:scale-x-100"
          )} />
          
          {/* Efeito de reflexo de luz */}
          <span className={cn(
            "absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30",
            "transform -translate-x-full",
            isAnimating ? "animate-shimmer" : "",
            "group-hover:animate-shimmer"
          )} />
        </div>
      )}
    </Link>
  );
};

export default AnimatedLogo;
