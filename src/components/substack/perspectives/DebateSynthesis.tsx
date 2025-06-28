
interface DebateSynthesisProps {
  content: string;
}

const DebateSynthesis = ({ content }: DebateSynthesisProps) => {
  const generateDebateSynthesis = (content: string) => {
    return `**Rafael** inicia observando que "as plataformas digitais representam uma nova fase da subsunção real do trabalho ao capital, onde a própria sociabilidade se torna produtiva."

**Luísa** complementa: "Exato, mas é importante ver como isso acontece na prática. O algoritmo do Uber, por exemplo, funciona como um supervisor digital que nunca dorme - monitora, avalia e disciplina sem precisar de um chefe humano."

**Rafael** aprofunda: "Isso confirma a previsão de Marx sobre a tendência do capital de substituir trabalho vivo por trabalho morto. Só que agora o 'trabalho morto' são algoritmos que controlam trabalho vivo."

**Luísa** questiona: "Mas há também resistências. Vemos greves de entregadores, hackeamento de algoritmos, criação de cooperativas digitais. A questão é: essas táticas podem se transformar em estratégia?"

**Síntese Propositiva:**
Ambos concordam que a tecnologia em si não é neutra, mas suas potencialidades emancipatórias só se realizam através de lutas sociais concretas que disputem tanto o controle técnico quanto a propriedade dos meios de produção digitais.`;
  };

  return (
    <>
      <div className="flex items-center gap-2 mb-4">
        <span className="text-2xl">⚔️</span>
        <div>
          <h4 className="font-semibold" style={{ color: '#800080' }}>
            Síntese Dialética
          </h4>
          <p className="text-sm text-gray-500">Debate entre perspectivas</p>
        </div>
      </div>
      
      <div className="p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border-l-4 border-purple-500">
        <div className="prose prose-sm max-w-none dark:prose-invert">
          <div dangerouslySetInnerHTML={{ 
            __html: generateDebateSynthesis(content)
              .replace(/\n/g, '<br/>')
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          }} />
        </div>
      </div>
    </>
  );
};

export default DebateSynthesis;
