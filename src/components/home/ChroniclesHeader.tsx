
import { Button } from '@/components/ui/button';
import { RefreshCw, Wifi, WifiOff } from 'lucide-react';

interface ChroniclesHeaderProps {
  isOnline: boolean;
  loading: boolean;
  onRefresh: () => void;
}

const ChroniclesHeader = ({ isOnline, loading, onRefresh }: ChroniclesHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-2">
          Crônicas Ideológicas
        </h2>
        <div className="flex items-center gap-2">
          {isOnline ? (
            <div className="flex items-center gap-1 text-green-600 text-sm">
              <Wifi className="h-4 w-4" />
              <span>Conectado</span>
            </div>
          ) : (
            <div className="flex items-center gap-1 text-orange-600 text-sm">
              <WifiOff className="h-4 w-4" />
              <span>Modo offline</span>
            </div>
          )}
        </div>
      </div>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onRefresh} 
        className="gap-2"
        disabled={loading}
      >
        <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
        Atualizar
      </Button>
    </div>
  );
};

export default ChroniclesHeader;
