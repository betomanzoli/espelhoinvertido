
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode, useState } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
  comingSoon?: boolean;
  imageUrl?: string;
  substackUrl?: string;
  iconBackground?: string;
  iconTextColor?: string;
}

const ProjectCard = ({ 
  icon, 
  title, 
  description, 
  link, 
  delay, 
  comingSoon = false,
  imageUrl,
  substackUrl,
  iconBackground = "bg-gradient-to-r from-blue-500 to-teal-400",
  iconTextColor = "text-white"
}: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-500 transform ${
        isHovered ? 'shadow-xl scale-105 -translate-y-2' : 'hover:shadow-lg hover:-translate-y-1'
      } animate-slide-up`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {imageUrl && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className={`w-full h-full object-cover transition-transform duration-500 ${
              isHovered ? 'scale-110' : 'scale-100'
            }`}
          />
          <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-${
            isHovered ? '70' : '50'
          } transition-opacity duration-500`}></div>
        </div>
      )}
      
      <div className="p-6">
        <div className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 text-3xl rounded-full ${
          isHovered 
            ? iconBackground + ' ' + iconTextColor + ' transform scale-110' 
            : 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-teal-400'
          } transition-all duration-300`}>
          {icon}
        </div>
        
        <h3 className="text-xl font-medium mb-3 text-center flex items-center justify-center gap-2">
          {title}
          {comingSoon && (
            <HoverCard>
              <HoverCardTrigger asChild>
                <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                  Em breve
                </span>
              </HoverCardTrigger>
              <HoverCardContent className="w-64">
                <p className="text-sm">Este projeto está em desenvolvimento e será lançado em breve. Fique atento!</p>
              </HoverCardContent>
            </HoverCard>
          )}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
          {description}
        </p>
        
        <div className="flex flex-col gap-2">
          <Button 
            asChild 
            variant="default" 
            className={`w-full justify-center gap-2 ${
              isHovered 
                ? 'bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500' 
                : 'bg-teal-500 hover:bg-teal-600'
              } transition-all duration-300`}
          >
            <Link to={link}>
              {comingSoon ? 'Saiba mais' : 'Acessar'}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>

          {substackUrl && (
            <Button 
              asChild 
              variant="outline" 
              className="w-full justify-center gap-2"
            >
              <a href={substackUrl} target="_blank" rel="noopener noreferrer">
                Ver no Substack
                <ExternalLink className="w-4 h-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
