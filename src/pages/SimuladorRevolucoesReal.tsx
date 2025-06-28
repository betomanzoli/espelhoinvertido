
import RevolutionEngine from '@/components/simulators/RevolutionEngine';

const SimuladorRevolucoesReal = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-1 mb-4">Simulador de Revoluções</h1>
            <p className="lead max-w-3xl mx-auto">
              Explore as dinâmicas sociais, econômicas e políticas que levam às 
              grandes transformações revolucionárias da história.
            </p>
          </div>
          
          <RevolutionEngine />
        </div>
      </div>
    </div>
  );
};

export default SimuladorRevolucoesReal;
