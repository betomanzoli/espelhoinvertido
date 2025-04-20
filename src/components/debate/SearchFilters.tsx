
import { FilterIcon, SearchIcon, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SearchFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  categoryFilter: string;
  setCategoryFilter: (category: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (difficulty: string) => void;
  categories: string[];
  difficulties: string[];
}

const SearchFilters = ({
  searchTerm,
  setSearchTerm,
  categoryFilter,
  setCategoryFilter,
  difficultyFilter,
  setDifficultyFilter,
  categories,
  difficulties
}: SearchFiltersProps) => {
  return (
    <div className="mb-8 glass-card p-4 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Buscar tópicos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-44">
              <div className="flex items-center gap-2">
                <FilterIcon className="h-4 w-4 text-gray-400" />
                <SelectValue placeholder="Categoria" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas Categorias</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
            <SelectTrigger className="w-44">
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas Dificuldades</SelectItem>
              {difficulties.map(difficulty => (
                <SelectItem key={difficulty} value={difficulty}>
                  {difficulty === 'basic' ? 'Básico' : 
                   difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {(searchTerm || categoryFilter || difficultyFilter) && (
        <div className="flex items-center mt-3 text-sm">
          <span className="text-gray-500 mr-2">Filtros ativos:</span>
          
          {searchTerm && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 mr-2"
              onClick={() => setSearchTerm('')}
            >
              Busca: {searchTerm}
              <ArrowLeft className="h-3 w-3 ml-1" />
            </Button>
          )}
          
          {categoryFilter && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7 mr-2"
              onClick={() => setCategoryFilter('')}
            >
              Categoria: {categoryFilter}
              <ArrowLeft className="h-3 w-3 ml-1" />
            </Button>
          )}
          
          {difficultyFilter && (
            <Button 
              variant="outline" 
              size="sm" 
              className="h-7"
              onClick={() => setDifficultyFilter('')}
            >
              Dificuldade: {
                difficultyFilter === 'basic' ? 'Básico' : 
                difficultyFilter === 'intermediate' ? 'Intermediário' : 'Avançado'
              }
              <ArrowLeft className="h-3 w-3 ml-1" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchFilters;
