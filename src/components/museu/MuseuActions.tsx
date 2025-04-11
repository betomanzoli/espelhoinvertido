
import React from 'react';
import { Eye, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface MuseuActionsProps {
  substackUrl?: string;
}

const MuseuActions: React.FC<MuseuActionsProps> = ({ substackUrl }) => {
  const handleVisitClick = () => {
    toast.info('Museu Virtual', {
      description: 'O Museu Virtual das Revoluções está em desenvolvimento. Acesso preliminar disponível em breve.'
    });
  };

  return (
    <div className="text-center">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={handleVisitClick} className="gap-2">
          <Eye className="h-5 w-5" />
          Visitar Museu Virtual
        </Button>
        
        {substackUrl && (
          <Button asChild variant="outline" size="lg">
            <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
              Leia mais no Substack
              <BookOpen className="h-5 w-5" />
            </a>
          </Button>
        )}
      </div>
    </div>
  );
};

export default MuseuActions;
