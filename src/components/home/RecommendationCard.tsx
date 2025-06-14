
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Chronicle } from '@/lib/debateData';

interface RecommendationCardProps {
  chronicle: Chronicle;
}

const RecommendationCard = ({ chronicle }: RecommendationCardProps) => {
  const imageUrl = chronicle.image && chronicle.image.includes('http') 
    ? chronicle.image 
    : 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format';
  
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 h-full">
      <div className="relative h-32 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={chronicle.title}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          loading="lazy"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=300&fit=crop&auto=format';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-sm line-clamp-2">{chronicle.title}</CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="h-3 w-3" />
            {new Date(chronicle.date).toLocaleDateString('pt-BR')}
          </div>
          
          <Button asChild variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Link to={`/library/chronicle/${chronicle.id}`}>
              Ler <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
