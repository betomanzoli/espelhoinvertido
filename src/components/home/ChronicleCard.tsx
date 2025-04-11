
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Chronicle } from '@/lib/debateData';

interface ChronicleCardProps {
  chronicle: Chronicle;
}

const ChronicleCard = ({ chronicle }: ChronicleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={chronicle.image || `https://via.placeholder.com/300x180?text=${chronicle.tags[0]}`} 
        alt={chronicle.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
          {chronicle.tags[0]}
        </div>
        <CardTitle>{chronicle.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{chronicle.excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="gap-1">
          <Link to={`/library/chronicle/${chronicle.id}`}>
            Ler mais <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChronicleCard;
