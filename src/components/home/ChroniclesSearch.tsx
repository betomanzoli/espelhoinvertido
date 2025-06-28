
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface ChroniclesSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const ChroniclesSearch = ({ searchQuery, onSearchChange }: ChroniclesSearchProps) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-espelhoinvertido-accent/60" />
        <Input
          placeholder="Buscar análises e crônicas..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 border-espelhoinvertido-accent/20 focus:border-espelhoinvertido-accent focus:ring-espelhoinvertido-accent/20"
        />
      </div>
    </div>
  );
};

export default ChroniclesSearch;
