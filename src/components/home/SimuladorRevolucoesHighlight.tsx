
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SimuladorRevolucoesHighlight = () => {
  return (
    <section className="py-16 md:py-24 bg-light-gray dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="glass-card p-6 h-full flex items-center justify-center">
              <div className="text-center">
                <LineChart className="w-24 h-24 mx-auto text-primary mb-4" />
                <h3 className="text-2xl font-medium mb-2">Simulador de Revoluções</h3>
                <p className="text-gray-600 dark:text-gray-400">Experimente as complexas dinâmicas sociais e políticas</p>
              </div>
            </div>
          </div>
          
          <div className="order-1 md:order-2">
            <div className="inline-block mb-6 text-primary">
              <LineChart className="w-10 h-10" />
            </div>
            
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              Simulador de Revoluções
            </h2>
            
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
              Um jogo de estratégia baseado em eventos históricos reais onde você experimenta
              as complexas dinâmicas sociais, econômicas e políticas que precedem e acompanham transformações revolucionárias.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild className="gap-2">
                <Link to="/simulador">
                  Experimentar Simulador
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="gap-2">
                <Link to="/resources">
                  <BookOpen className="w-5 h-5" />
                  Recursos Relacionados
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SimuladorRevolucoesHighlight;
