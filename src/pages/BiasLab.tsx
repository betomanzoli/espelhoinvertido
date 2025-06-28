
import BiasSimulator from '@/components/bias/BiasSimulator';
import BiasAnalyzer from '@/components/bias/BiasAnalyzer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Brain, Search, Eye, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const BiasLab = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-1 mb-4">Laboratório de Viés</h1>
            <p className="lead max-w-3xl mx-auto">
              Ferramentas interativas para explorar como o viés de confirmação molda 
              nossa interpretação da realidade
            </p>
          </div>
          
          <Tabs defaultValue="simulator" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="simulator" className="flex items-center gap-2">
                <Brain className="w-4 h-4" />
                Simulador de Filtros
              </TabsTrigger>
              <TabsTrigger value="analyzer" className="flex items-center gap-2">
                <Search className="w-4 h-4" />
                Detector de Viés
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="simulator">
              <BiasSimulator />
            </TabsContent>
            
            <TabsContent value="analyzer">
              <BiasAnalyzer />
            </TabsContent>
          </Tabs>

          {/* Recursos relacionados */}
          <div className="mt-12 p-6 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-xl">
            <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Eye className="w-5 h-5" />
              Explore Mais Sobre Viés de Confirmação
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Aprofunde seu entendimento através das nossas crônicas que exploram 
              como diferentes perspectivas ideológicas interpretam a mesma realidade.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button asChild>
                <Link to="/library" className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  Ler Crônicas
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/debate" className="flex items-center gap-2">
                  <Brain className="w-4 h-4" />
                  Participar do Debate
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasLab;
