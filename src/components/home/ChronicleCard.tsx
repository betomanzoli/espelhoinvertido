
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Chronicle } from '@/lib/debateData';

interface ChronicleCardProps {
  chronicle: Chronicle;
}

const ChronicleCard = ({ chronicle }: ChronicleCardProps) => {
  // Garantir que temos uma imagem válida
  const imageUrl = chronicle.image || `https://via.placeholder.com/300x180?text=${chronicle.title}`;
  
  // Garantir que temos tags válidas
  const tags = chronicle.tags && chronicle.tags.length > 0 ? chronicle.tags : ['Geral'];
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={chronicle.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/300x180?text=Espelho+Invertido';
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent h-24 pointer-events-none" />
      </div>
      
      <CardHeader className="flex-grow">
        <div className="flex gap-2 flex-wrap mb-2">
          {tags.map((tag, index) => (
            <div 
              key={index} 
              className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </div>
          ))}
        </div>
        <CardTitle className="line-clamp-2">{chronicle.title}</CardTitle>
      </CardHeader>
      
      <CardContent>
        <CardDescription className="line-clamp-3">{chronicle.excerpt}</CardDescription>
      </CardContent>
      
      <CardFooter className="justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {new Date(chronicle.date).toLocaleDateString('pt-BR')}
        </span>
        <Button asChild variant="ghost" size="sm" className="gap-1">
          <Link to={`/library/chronicle/${chronicle.id}`}>
            Ler mais <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChronicleCard;
