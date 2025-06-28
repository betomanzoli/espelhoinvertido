
import { Input } from '@/components/ui/input';

interface ChroniclesSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const ChroniclesSearch = ({ searchQuery, onSearchChange }: ChroniclesSearchProps) => {
  return (
    <div className="max-w-md mx-auto mb-8">
      <Input
        placeholder="Buscar crônicas..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full"
      />
    </div>
  );
};

export default ChroniclesSearch;
