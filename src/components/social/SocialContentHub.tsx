
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, Play, FileText, Camera, Video, Briefcase, Globe } from 'lucide-react';
import { SOCIAL_PLATFORMS } from './SocialMediaData';

const SocialContentHub = () => {
  const [activeTab, setActiveTab] = useState('all');

  // Informações reais sobre os tipos de conteúdo (sem métricas inventadas)
  const contentTypes = {
    substack: [
      {
        title: "Análises Dialéticas Regulares",
        description: "Textos aprofundados sobre temas contemporâneos através de perspectivas críticas",
        type: "article",
        category: "Análise"
      },
      {
        title: "Reflexões sobre Mundo Digital", 
        description: "Como a tecnologia e redes sociais impactam nossa sociedade",
        type: "article",
        category: "Reflexão"
      }
    ],
    youtube: [
      {
        title: "Vídeos Educativos",
        description: "Conteúdo em vídeo explorando temas complexos de forma acessível",
        type: "video",
        category: "Educação"
      }
    ],
    instagram: [
      {
        title: "Conteúdo Visual Reflexivo",
        description: "Posts e stories com reflexões visuais sobre temas atuais",
        type: "story",
        category: "Visual"
      }
    ],
    tiktok: [
      {
        title: "Análises Rápidas",
        description: "Vídeos curtos explicando conceitos complexos de forma didática",
        type: "video",
        category: "Educação"
      }
    ],
    linkedin: [
      {
        title: "Artigos Profissionais", 
        description: "Análises profissionais sobre economia, trabalho e sociedade",
        type: "article",
        category: "Profissional"
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
    <section className="py-16 bg-light-gray">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="heading-2 mb-4 brand-text">
            Conteúdo em Todas as Plataformas
          </h2>
          <p className="lead max-w-2xl mx-auto">
            Acompanhe nossas análises em diferentes formatos e plataformas sociais
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="substack">📝 Substack</TabsTrigger>
            <TabsTrigger value="youtube">🎥 YouTube</TabsTrigger>
            <TabsTrigger value="instagram">📸 Instagram</TabsTrigger>
            <TabsTrigger value="tiktok">🎵 TikTok</TabsTrigger>
            <TabsTrigger value="linkedin">💼 LinkedIn</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(contentTypes).map(([platform, content]) =>
                content.map((item, index) => (
                  <Card key={`${platform}-${index}`} className="brand-card hover:shadow-medium transition-shadow interactive-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="gap-1 border-espelhoinvertido-accent/30">
                          <span>{getPlatformIcon(platform)}</span>
                          {SOCIAL_PLATFORMS.find(p => p.id === platform)?.displayName}
                        </Badge>
                        <Button variant="ghost" size="icon" asChild>
                          <a href={SOCIAL_PLATFORMS.find(p => p.id === platform)?.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        </Button>
                      </div>
                      <CardTitle className="heading-4 line-clamp-2">{item.title}</CardTitle>
                      <CardDescription className="line-clamp-2">{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1 text-espelhoinvertido-accent">
                          {getIcon(item.type)}
                          <span className="capitalize">{item.category}</span>
                        </div>
                        <Badge variant="secondary" className="text-xs bg-espelhoinvertido-gold/10 text-espelhoinvertido-text">
                          Ativo
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {Object.entries(contentTypes).map(([platform, content]) => (
            <TabsContent key={platform} value={platform}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {content.map((item, index) => (
                  <Card key={index} className="brand-card hover:shadow-medium transition-shadow">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 heading-4">
                        {getIcon(item.type)}
                        {item.title}
                      </CardTitle>
                      <CardDescription>{item.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between mb-3">
                        <Badge variant="outline" className="border-espelhoinvertido-accent/30">
                          {item.category}
                        </Badge>
                        <Badge variant="secondary" className="bg-espelhoinvertido-gold/10 text-espelhoinvertido-text">
                          Verificado
                        </Badge>
                      </div>
                      <Button className="w-full button-primary" asChild>
                        <a href={SOCIAL_PLATFORMS.find(p => p.id === platform)?.url} target="_blank" rel="noopener noreferrer">
                          <Globe className="h-4 w-4 mr-2" />
                          Visitar {SOCIAL_PLATFORMS.find(p => p.id === platform)?.displayName}
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
