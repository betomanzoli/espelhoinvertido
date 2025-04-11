
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface ProjectHeaderProps {
  title: string;
  icon?: string;
  coverImage?: string;
  substackUrl?: string;
}

const ProjectHeader = ({ title, icon, coverImage, substackUrl }: ProjectHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)} 
        className="mb-8 flex items-center gap-2"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar
      </Button>
      
      {coverImage ? (
        <div className="w-full h-48 md:h-64 overflow-hidden relative">
          <img 
            src={coverImage} 
            alt={title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full p-6">
            <div className="text-6xl mb-2">{icon}</div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-white mb-2">{title}</h1>
          </div>
        </div>
      ) : (
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">{icon}</div>
          <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">{title}</h1>
          
          {substackUrl && (
            <div className="inline-block text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200 px-3 py-1 rounded-full">
              Artigo disponível no Substack
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default ProjectHeader;
