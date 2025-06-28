
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, FileText, Camera, Video, Briefcase } from 'lucide-react';
import { SOCIAL_PLATFORMS } from './SocialMediaData';

const SocialContentHub = () => {
  const [activeTab, setActiveTab] = useState('all');

  const mockContent = {
    substack: [
      {
        title: "O Capitalismo Digital e suas Contradições",
        description: "Análise profunda sobre como as plataformas digitais intensificam a exploração capitalista",
        date: "2024-01-15",
        type: "article",
        engagement: "245 likes, 67 comments"
      },
      {
        title: "Alienação 2.0: Redes Sociais e Mercantilização",
        description: "Como o Facebook e Instagram transformam nossa sociabilidade em mercadoria",
        date: "2024-01-10",
        type: "article",
        engagement: "312 likes, 89 comments"
      }
    ],
    youtube: [
      {
        title: "Debate: Rafael vs Luísa sobre IA e Trabalho",
        description: "Discussão sobre o impacto da inteligência artificial nas relações trabalhistas",
        date: "2024-01-12",
        type: "video",
        engagement: "1.2K views, 89 likes"
      }
    ],
    instagram: [
      {
        title: "Story: Conceitos Marxistas Explicados",
        description: "Série de stories educativos sobre mais-valia e luta de classes",
        date: "2024-01-14",
        type: "story",
        engagement: "456 visualizações"
      }
    ],
    tiktok: [
      {
        title: "#DesafioDialético: Capitalismo vs Socialismo",
        description: "Vídeo viral explicando diferenças ideológicas em 60 segundos",
        date: "2024-01-13",
        type: "video",
        engagement: "2.3K views, 187 likes"
      }
    ],
    linkedin: [
      {
        title: "Artigo: Uberização e Precarização do Trabalho",
        description: "Análise profissional sobre a economia de aplicativos",
        date: "2024-01-11",
        type: "article",
        engagement: "89 reactions, 23 comments"
      }
    ]
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'article': return <FileText className="h-4 w-4" />;
      case 'story': return <Camera className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getPlatformIcon = (platform: string) => {
    const platformData = SOCIAL_PLATFORMS.find(p => p.id === platform);
    return platformData?.icon || '📝';
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            Conteúdo em Todas as Plataformas
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Acompanhe nossas análises dialéticas em diferentes formatos e plataformas
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="all">Todos</TabsTrigger>
            <TabsTrigger value="substack">📝 Substack</TabsTrigger>
            <TabsTrigger value="youtube">🎥 YouTube</TabsTrigger>
            <TabsTrigger value="instagram">📸 Instagram</TabsTrigger>
            <TabsTrigger value="tiktok">🎵 TikTok</TabsTrigger>
            <TabsTrigger value="linkedin">💼 LinkedIn</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(mockContent).map(([platform, content]) =>
                content.map((item, index) => (
                  <Card key={`${platform}-${index}`} className="hover:shadow-md transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="gap-1">
                          <span>{getPlatformIcon(platform)}</span>
                          {SOCIAL_PLATFORMS.find(p => p.id === platform)?.displayName}
                        </Badge>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={SOCIAL_PLATFORMS.find(p => p.id === platform)?.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          {getIcon(item.type)}
                          <span>{item.type}</span>
                        </div>
                        <span>{item.date}</span>
                      </div>
                      <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        {item.engagement}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {Object.entries(mockContent).map(([platform, content]) => (
            <TabsContent key={platform} value={platform}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.map((item, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        {getIcon(item.type)}
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                        <span>{item.date}</span>
                        <span>{item.engagement}</span>
                      </div>
                      <Button className="w-full" asChild>
                        <a href={SOCIAL_PLATFORMS.find(p => p.id === platform)?.url} target="_blank" rel="noopener noreferrer">
                          Ver no {SOCIAL_PLATFORMS.find(p => p.id === platform)?.displayName}
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default SocialContentHub;
