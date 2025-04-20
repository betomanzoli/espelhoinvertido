
import { LineChart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface EconomiaActionsProps {
  substackUrl?: string;
}

const EconomiaActions = ({ substackUrl }: EconomiaActionsProps) => {
  const handleSimulateClick = () => {
    toast.info('Simulação econômica', {
      description: 'O simulador econômico está em desenvolvimento. Acesso preliminar disponível em breve.'
    });
  };

  return (
    <div className="text-center">
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" onClick={handleSimulateClick} className="gap-2">
          <LineChart className="h-5 w-5" />
          Iniciar Simulação Econômica
        </Button>
        
        <Button asChild variant="outline" size="lg">
          <a href={substackUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
            Leia mais no Substack
            <BookOpen className="h-5 w-5" />
          </a>
        </Button>
      </div>
    </div>
  );
};

export default EconomiaActions;
