
import { LUISA } from '@/data/personas';

interface PracticalPerspectiveProps {
  content: string;
}

const PracticalPerspective = ({ content }: PracticalPerspectiveProps) => {
  const generatePracticalPerspective = (content: string) => {
    return `Observando as manifestações concretas contemporâneas, identificamos padrões que se repetem em diversos setores da economia digital.

**Análise de Dados:**
- Concentração de mercado: 3-5 empresas controlam 80% do tráfego
- Precarização laboral: 67% dos trabalhadores de plataforma sem direitos trabalhistas
- Extração de valor: 30-40% de comissão média das plataformas

**Exemplos Práticos:**
• **Uber/99**: Transferência de custos operacionais para motoristas
• **iFood/Rappi**: Socialização de riscos, privatização de lucros
• **Amazon/Mercado Livre**: Monopolização de infraestrutura digital

**Impacto Social:**
A digitalização não eliminou as contradições de classe, apenas as reconfigurou através de algoritmos e interfaces aparentemente neutras.`;
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">{LUISA.avatar}</span>
        <div>
          <h4 className="font-semibold" style={{ color: LUISA.color }}>
            Análise Prático-Digital
          </h4>
          <p className="text-sm text-gray-500">Aplicações contemporâneas</p>
        </div>
      </div>
      
      <div className="p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border-l-4 border-blue-500">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ 
            __html: generatePracticalPerspective(content)
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

export default PracticalPerspective;
