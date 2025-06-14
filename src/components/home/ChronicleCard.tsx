
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Tag, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Chronicle } from '@/lib/debateData';

interface ChronicleCardProps {
  chronicle: Chronicle;
  showCategory?: boolean;
  compact?: boolean;
}

const ChronicleCard = ({ chronicle, showCategory = true, compact = false }: ChronicleCardProps) => {
  // Garantir que temos uma imagem válida com fallback otimizado
  const imageUrl = chronicle.image && chronicle.image.includes('http') 
    ? chronicle.image 
    : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&auto=format';
  
  // Categorização inteligente baseada no conteúdo
  const getSmartCategory = () => {
    const title = chronicle.title.toLowerCase();
    const content = (chronicle.excerpt + chronicle.content).toLowerCase();
    
    if (title.includes('história') || content.includes('revolução') || content.includes('histórico')) {
      return 'História';
    }
    if (title.includes('economia') || content.includes('econômic') || content.includes('trabalho')) {
      return 'Economia';
    }
    if (title.includes('ideologia') || content.includes('política') || content.includes('marxist')) {
      return 'Ideologia';
    }
    return 'Geral';
  };
  
  const smartCategory = getSmartCategory();
  const displayTags = chronicle.tags && chronicle.tags.length > 0 
    ? chronicle.tags 
    : [smartCategory];
  
  if (compact) {
    return (
      <Card className="flex overflow-hidden hover:shadow-lg transition-all duration-300 h-24">
        <div className="w-24 h-full overflow-hidden flex-shrink-0">
          <img 
            src={imageUrl}
            alt={chronicle.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=200&h=200&fit=crop&auto=format';
            }}
          />
        </div>
        
        <div className="flex-1 flex flex-col justify-between p-3">
          <div>
            <h4 className="font-medium text-sm line-clamp-2 mb-1">{chronicle.title}</h4>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Calendar className="h-3 w-3" />
              {new Date(chronicle.date).toLocaleDateString('pt-BR')}
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button asChild variant="ghost" size="sm" className="h-6 px-2 text-xs">
              <Link to={`/library/chronicle/${chronicle.id}`}>
                Ler <ArrowRight className="h-3 w-3 ml-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    );
  }
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={imageUrl}
          alt={chronicle.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop&auto=format';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        
        {showCategory && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-white/90 text-gray-800">
              <Tag className="w-3 h-3 mr-1" />
              {smartCategory}
            </span>
          </div>
        )}
      </div>
      
      <CardHeader className="flex-grow">
        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
          {chronicle.title}
        </CardTitle>
        <CardDescription className="line-clamp-3 text-sm">
          {chronicle.excerpt}
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-3">
          {displayTags.slice(0, 3).map((tag, index) => (
            <span 
              key={index} 
              className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      
      <CardFooter className="justify-between items-center border-t border-gray-100 dark:border-gray-800 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4" />
          {new Date(chronicle.date).toLocaleDateString('pt-BR')}
        </div>
        
        <div className="flex gap-2">
          <Button asChild variant="outline" size="sm" className="gap-1">
            <a href={chronicle.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
          
          <Button asChild variant="default" size="sm" className="gap-1">
            <Link to={`/library/chronicle/${chronicle.id}`}>
              Ler <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ChronicleCard;
