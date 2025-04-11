
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode, useState } from 'react';
import { HoverCard, HoverCardTrigger, HoverCardContent } from '@/components/ui/hover-card';

interface ProjectCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
  comingSoon?: boolean;
}

const ProjectCard = ({ icon, title, description, link, delay, comingSoon = false }: ProjectCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md transition-all duration-500 transform ${
        isHovered ? 'shadow-xl scale-105 -translate-y-2' : 'hover:shadow-lg hover:-translate-y-1'
      } animate-slide-up`}
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`flex items-center justify-center w-16 h-16 mb-4 text-3xl rounded-full ${
        isHovered ? 'bg-gradient-to-r from-blue-500 to-teal-400 text-white' : 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-teal-400'
      } transition-all duration-300`}>
        {icon}
      </div>
      
      <h3 className="text-xl font-medium mb-3 flex items-center gap-2">
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
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {description}
      </p>
      
      <Button asChild variant="default" className={`w-full justify-center gap-2 ${
        isHovered ? 'bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500' : 'bg-teal-500 hover:bg-teal-600'
      } transition-all duration-300`}>
        <Link to={link}>
          {comingSoon ? 'Saiba mais' : 'Acessar'}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    </div>
  );
};

export default ProjectCard;
