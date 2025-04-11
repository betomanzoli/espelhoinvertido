
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

export interface Chronicle {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  link: string;
}

interface ChronicleCardProps {
  chronicle: Chronicle;
}

const ChronicleCard = ({ chronicle }: ChronicleCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <img 
        src={chronicle.image} 
        alt={chronicle.title}
        className="w-full h-48 object-cover"
      />
      <CardHeader>
        <div className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 mb-2">
          {chronicle.category}
        </div>
        <CardTitle>{chronicle.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{chronicle.excerpt}</CardDescription>
      </CardContent>
      <CardFooter>
        <Button asChild variant="ghost" className="gap-1">
          <Link to={chronicle.link}>
            Ler mais <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChronicleCard;
