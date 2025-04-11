
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Chronicle } from '@/lib/debateData';

interface RecommendationCardProps {
  chronicle: Chronicle;
}

const RecommendationCard = ({ chronicle }: RecommendationCardProps) => {
  const imageUrl = chronicle.image || `https://via.placeholder.com/100x100?text=${chronicle.title}`;
  
  return (
    <Card className="flex overflow-hidden hover:shadow-lg transition-shadow">
      <div className="w-24 h-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={chronicle.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://via.placeholder.com/100x100?text=EI';
          }}
        />
      </div>
      <div className="flex-1">
        <CardHeader className="p-3">
          <CardTitle className="text-sm">{chronicle.title}</CardTitle>
        </CardHeader>
        <CardFooter className="p-3 pt-0">
          <Button asChild variant="ghost" size="sm" className="h-7 px-2">
            <Link to={`/library/chronicle/${chronicle.id}`}>
              Ler <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default RecommendationCard;
