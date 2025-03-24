
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { 
  Resource,
  primaryWorks,
  contemporaryAnalyses,
  digitalApplications,
  onlineResources,
  podcasts,
  youtubeChannels,
  documentaries,
  fictionalFilms,
  series,
  criticalApproaches
} from "@/data/resourcesData";

const Resources = () => {
  const renderResourceTable = (resources: Resource[]) => (
    <div className="rounded-md overflow-hidden border dark:border-gray-700">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/3">Título</TableHead>
            <TableHead className="w-1/4">Autor</TableHead>
            <TableHead className="w-1/6">Ano</TableHead>
            <TableHead>Descrição</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {resources.map((resource, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">
                {resource.url ? (
                  <a 
                    href={resource.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center hover:text-primary"
                  >
                    {resource.title} <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                ) : (
                  resource.title
                )}
              </TableCell>
              <TableCell>{resource.author || "-"}</TableCell>
              <TableCell>{resource.year || "-"}</TableCell>
              <TableCell>{resource.description || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="min-h-screen pt-24 pb-16 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-2 animate-slide-up">
              Recursos
            </h1>
            <p className="text-gray-600 dark:text-gray-400 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Biblioteca de referências para aprofundar o diálogo crítico
            </p>
          </div>
          <div className="flex space-x-4">
            <Button asChild variant="outline">
              <a
                href="https://espelhoinvertido.substack.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center"
              >
                Visite o Substack <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild>
              <Link to="/library">
                Ir para Biblioteca
              </Link>
            </Button>
          </div>
        </div>

        <Tabs defaultValue="books" className="mb-8">
          <TabsList className="w-full md:w-auto justify-start overflow-x-auto flex-nowrap mb-6">
            <TabsTrigger value="books">Livros</TabsTrigger>
            <TabsTrigger value="digital">Recursos Online</TabsTrigger>
            <TabsTrigger value="media">Filmes e Séries</TabsTrigger>
            <TabsTrigger value="critical">Perspectivas Críticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="books" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Obras Primárias</h2>
              {renderResourceTable(primaryWorks)}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Análises Contemporâneas</h2>
              {renderResourceTable(contemporaryAnalyses)}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Aplicações Digitais/Tecnológicas</h2>
              {renderResourceTable(digitalApplications)}
            </div>
          </TabsContent>
          
          <TabsContent value="digital" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Arquivos e Textos</h2>
              {renderResourceTable(onlineResources)}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Podcasts</h2>
              {renderResourceTable(podcasts)}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Canais de YouTube</h2>
              {renderResourceTable(youtubeChannels)}
            </div>
          </TabsContent>
          
          <TabsContent value="media" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Documentários</h2>
              {renderResourceTable(documentaries)}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Filmes Ficcionais</h2>
              {renderResourceTable(fictionalFilms)}
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-4">Séries</h2>
              {renderResourceTable(series)}
            </div>
          </TabsContent>
          
          <TabsContent value="critical" className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Abordagens Críticas ao Marxismo</h2>
              {renderResourceTable(criticalApproaches)}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Resources;
