
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface ProjectCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  delay: number;
}

const ProjectCard = ({ icon, title, description, link, delay }: ProjectCardProps) => (
  <div 
    className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 animate-slide-up" 
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center justify-center w-14 h-14 mb-4 text-3xl">
      {icon}
    </div>
    
    <h3 className="text-xl font-medium mb-3">{title}</h3>
    
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      {description}
    </p>
    
    <Button asChild variant="default" className="w-full justify-center gap-2 bg-teal-500 hover:bg-teal-600">
      <Link to={link}>
        Acessar
        <ArrowRight className="w-4 h-4" />
      </Link>
    </Button>
  </div>
);

export default ProjectCard;
