
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, History, Newspaper, Swords } from 'lucide-react';
import { SubstackPost } from '@/services/substackService';
import HistoricalPerspective from './perspectives/HistoricalPerspective';
import PracticalPerspective from './perspectives/PracticalPerspective';
import DebateSynthesis from './perspectives/DebateSynthesis';

interface TripleContentViewProps {
  post: SubstackPost;
}

const TripleContentView = ({ post }: TripleContentViewProps) => {
  const [activeMode, setActiveMode] = useState('original');

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <CardTitle className="line-clamp-2">{post.title}</CardTitle>
            <CardDescription className="line-clamp-2">{post.subtitle}</CardDescription>
          </div>
          <Button variant="outline" size="sm" asChild>
            <a href={post.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs value={activeMode} onValueChange={setActiveMode} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="original" className="gap-1">
              <Newspaper className="h-4 w-4" />
              Original
            </TabsTrigger>
            <TabsTrigger value="historical" className="gap-1">
              <History className="h-4 w-4" />
              🏛️ Rafael
            </TabsTrigger>
            <TabsTrigger value="practical" className="gap-1">
              📊 Luísa
            </TabsTrigger>
            <TabsTrigger value="debate" className="gap-1">
              <Swords className="h-4 w-4" />
              Debate
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="original" className="space-y-4">
            <div className="prose prose-sm max-w-none dark:prose-invert">
              <div 
                dangerouslySetInnerHTML={{ 
                  __html: post.content || post.description 
                }} 
              />
            </div>
          </TabsContent>
          
          <TabsContent value="historical" className="space-y-4">
            <HistoricalPerspective content={post.content || post.description} />
          </TabsContent>
          
          <TabsContent value="practical" className="space-y-4">
            <PracticalPerspective content={post.content || post.description} />
          </TabsContent>
          
          <TabsContent value="debate" className="space-y-4">
            <DebateSynthesis content={post.content || post.description} />
          </TabsContent>
        </Tabs>
        
        <div className="flex flex-wrap gap-2 mt-6 pt-4 border-t">
          <Badge variant="outline" className="text-xs">
            Publicado em {new Date(post.publishedAt).toLocaleDateString('pt-BR')}
          </Badge>
          <Badge variant="outline" className="text-xs">
            Análise Dialética
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default TripleContentView;
