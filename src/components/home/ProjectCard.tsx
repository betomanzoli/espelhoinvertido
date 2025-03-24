
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ReactNode } from 'react';

interface ProjectCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  link: string;
  launched?: boolean;
  delay: number;
}

const ProjectCard = ({ icon, title, description, link, launched = false, delay }: ProjectCardProps) => (
  <div 
    className="glass-card p-6 animate-slide-up" 
    style={{ animationDelay: `${delay}s` }}
  >
    <div className="flex items-center justify-center w-14 h-14 mb-4 rounded-full bg-primary/10 text-primary">
      {icon}
    </div>
    
    <h3 className="text-xl font-medium mb-3">{title}</h3>
    
    <p className="text-gray-600 dark:text-gray-300 mb-4">
      {description}
    </p>
    
    {launched ? (
      <Button asChild variant="link" className="p-0 h-auto font-medium">
        <Link to={link} className="flex items-center gap-1">
          Acessar <ArrowRight className="w-4 h-4" />
        </Link>
      </Button>
    ) : (
      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-700">
        Em breve
      </span>
    )}
  </div>
);

export default ProjectCard;
