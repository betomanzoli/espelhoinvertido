
import DiscourseAnalyzer from '@/components/analysis/DiscourseAnalyzer';

const AnaliseDiscurso = () => {
  return (
    <div className="page-container">
      <div className="content-wrapper">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="heading-1 mb-4">Análise de Discurso</h1>
            <p className="lead max-w-3xl mx-auto">
              Ferramenta avançada para identificar vieses, falácias lógicas e técnicas de 
              manipulação em textos políticos, jornalísticos e midiáticos.
            </p>
          </div>
          
          <DiscourseAnalyzer />
        </div>
      </div>
    </div>
  );
};

export default AnaliseDiscurso;
