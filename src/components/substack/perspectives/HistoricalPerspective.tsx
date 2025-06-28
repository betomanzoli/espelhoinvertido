
import { RAFAEL } from '@/data/personas';

interface HistoricalPerspectiveProps {
  content: string;
}

const HistoricalPerspective = ({ content }: HistoricalPerspectiveProps) => {
  const generateHistoricalPerspective = (content: string) => {
    return `A partir de uma leitura materialista histórica, este texto evidencia as contradições inerentes ao modo de produção capitalista contemporâneo. 

As dinâmicas descritas ecoam as análises de Marx sobre a tendência decrescente da taxa de lucro e a necessidade constante do capital de encontrar novas fronteiras de acumulação.

**Contexto Histórico:**
O fenômeno analisado pode ser compreendido como uma manifestação específica das leis gerais do desenvolvimento capitalista, particularmente visível no atual estágio de financeirização e digitalização da economia.

**Implicações Teóricas:**
Observamos aqui uma confirmação empírica dos prognósticos marxistas sobre a socialização crescente da produção em contradição com a apropriação privada dos resultados.`;
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{RAFAEL.avatar}</span>
        <div>
          <h4 className="font-semibold" style={{ color: RAFAEL.color }}>
            Perspectiva Histórico-Filosófica
          </h4>
          <p className="text-sm text-gray-500">Análise contextual e teórica</p>
        </div>
      </div>
      
      <div className="p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border-l-4 border-red-500">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ 
            __html: generateHistoricalPerspective(content)
              .replace(/\n/g, '<br/>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/• /g, '<li>')
              .replace(/<li>/g, '<ul><li>')
              .replace(/<\/li>(?!.*<li>)/g, '</li></ul>')
          }} />
        </div>
      </div>
    </>
  );
};

export default HistoricalPerspective;
