
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";

type Resource = {
  title: string;
  author?: string;
  year?: string;
  description?: string;
  url?: string;
};

const Resources = () => {
  // Categorias de recursos
  const primaryWorks: Resource[] = [
    { title: "O Capital (3 volumes)", author: "Karl Marx", year: "1867-1894", description: "Análise abrangente do sistema capitalista." },
    { title: "A Ideologia Alemã", author: "Karl Marx e Friedrich Engels", year: "1846", description: "Crítica da filosofia alemã pós-hegeliana." },
    { title: "Contribuição à Crítica da Economia Política", author: "Karl Marx", year: "1859", description: "Fundamentos da teoria econômica marxista." },
    { title: "Estado e Revolução", author: "Vladimir Lenin", year: "1917", description: "Análise do Estado e sua relação com a revolução." },
  ];

  const contemporaryAnalyses: Resource[] = [
    { title: "Realismo Capitalista: Não Há Alternativa?", author: "Mark Fisher", year: "2009", description: "Análise da percepção do capitalismo como único sistema viável." },
    { title: "Capitalismo de Plataforma", author: "Nick Srnicek", year: "2016", description: "Examina o surgimento das plataformas digitais como novo modelo de negócios." },
    { title: "O Novo Espírito do Capitalismo", author: "Luc Boltanski e Eve Chiapello", year: "1999", description: "Estudo sobre as transformações ideológicas do capitalismo." },
    { title: "Comunismo Ácido", author: "Mark Fisher e Jeremy Gilbert", year: "2013", description: "Propõe uma reimaginação progressista do futuro." },
  ];

  const digitalApplications: Resource[] = [
    { title: "Capitalismo de Vigilância", author: "Shoshana Zuboff", year: "2019", description: "Análise do modelo de negócios baseado em dados e vigilância." },
    { title: "Tecnologia do Oprimido", author: "Ramesh Srinivasan", year: "2019", description: "Examina o impacto da tecnologia em comunidades marginalizadas." },
    { title: "Comunismo: A Grande Substituição", author: "Slavoj Žižek", year: "2019", description: "Reflexões sobre comunismo na era das crises globais." },
  ];

  const onlineResources: Resource[] = [
    { title: "Marxists Internet Archive", description: "Biblioteca completa de textos marxistas", url: "https://www.marxists.org/" },
    { title: "Jacobin Magazine", description: "Análises contemporâneas de esquerda", url: "https://jacobin.com/" },
    { title: "Monthly Review", description: "Revista socialista independente", url: "https://monthlyreview.org/" },
  ];

  const podcasts: Resource[] = [
    { title: "Economic Update", author: "Richard Wolff", description: "Análise econômica semanal sob perspectiva marxista", url: "https://economicupdate.libsyn.com/" },
    { title: "Revolutionary Left Radio", description: "Discussões sobre teoria e história radical", url: "https://revolutionaryleftradio.libsyn.com/" },
    { title: "The Dig (Jacobin Radio)", description: "Entrevistas aprofundadas sobre política e economia", url: "https://thedigradio.com/" },
  ];

  const youtubeChannels: Resource[] = [
    { title: "Philosophy Tube", description: "Episódios sobre filosofia política, incluindo Marx", url: "https://www.youtube.com/c/thephilosophytube" },
    { title: "Contrapoints", description: "Análises culturais sob perspectiva de esquerda", url: "https://www.youtube.com/c/contrapoints" },
    { title: "Jacobin", description: "Documentários e entrevistas", url: "https://www.youtube.com/c/JacobinMag" },
  ];

  const documentaries: Resource[] = [
    { title: "Marx Reloaded", year: "2011", description: "Documentário sobre a relevância de Marx na era pós-2008" },
    { title: "O Jovem Karl Marx", year: "2017", description: "Filme biográfico sobre os primeiros anos de Marx" },
    { title: "O Capital no Século XXI", year: "2019", description: "Adaptação do livro de Thomas Piketty" },
    { title: "American Factory", year: "2019", description: "Documenta o choque cultural em uma fábrica chinesa nos EUA" },
  ];

  const fictionalFilms: Resource[] = [
    { title: "Bacurau", year: "2019", description: "Alegoria sobre resistência comunitária e neocolonialismo" },
    { title: "Coringa", year: "2019", description: "Crítica social sobre desigualdade e abandono institucional" },
    { title: "Parasita", year: "2019", description: "Sátira sobre desigualdade de classes" },
    { title: "Relatos Selvagens", year: "2014", description: "Antologia sobre injustiça social e revolta individual" },
  ];

  const series: Resource[] = [
    { title: "Mr. Robot", description: "Uma crítica ao capitalismo financeiro" },
    { title: "Years and Years", description: "Impactos do neoliberalismo na vida familiar" },
  ];

  const criticalApproaches: Resource[] = [
    { title: "A Sociedade Aberta e Seus Inimigos", author: "Karl Popper", year: "1945", description: "Crítica filosófica ao historicismo e totalitarismo" },
    { title: "O Caminho da Servidão", author: "Friedrich Hayek", year: "1944", description: "Crítica ao planejamento centralizado e socialismo" },
    { title: "O Fim da História e o Último Homem", author: "Francis Fukuyama", year: "1992", description: "Tese sobre o triunfo da democracia liberal" },
  ];

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
