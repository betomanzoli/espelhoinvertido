
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface ProjectActionsProps {
  substackUrl?: string;
}

const ProjectActions = ({ substackUrl }: ProjectActionsProps) => {
  return (
    <div className="text-center">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        {substackUrl && (
          <Button asChild size="lg">
            <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Acompanhe no Substack
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        )}
        
        <Button asChild variant="outline" size="lg">
          <a href="/resources" className="flex items-center gap-2">
            Explorar Recursos Relacionados
          </a>
        </Button>
      </div>
    </div>
  );
};

export default ProjectActions;
