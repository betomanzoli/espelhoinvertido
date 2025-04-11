
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Chronicle } from '@/lib/debateData';

interface RecommendationCardProps {
  chronicle: Chronicle;
}

const RecommendationCard = ({ chronicle }: RecommendationCardProps) => {
  return (
    <Card className="flex overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={chronicle.image} 
        alt={chronicle.title}
        className="w-24 h-full object-cover"
      />
      <div className="flex-1">
        <CardHeader className="p-3">
          <CardTitle className="text-sm">{chronicle.title}</CardTitle>
        </CardHeader>
        <CardFooter className="p-3 pt-0">
          <Button asChild variant="ghost" size="sm" className="h-7 px-2">
            <Link to={chronicle.link || `/library/chronicle/${chronicle.id}`}>
              Ler <ArrowRight className="h-3 w-3 ml-1" />
            </Link>
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default RecommendationCard;
