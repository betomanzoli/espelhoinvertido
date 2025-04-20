
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const EconomiaScenarios = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Revolução Industrial</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Simule políticas econômicas em uma sociedade em processo de industrialização, lidando com urbanização acelerada, formação da classe operária e transformações tecnológicas.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Estado de Bem-Estar Social</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Experimente o período pós-guerra com reconstrução econômica, expansão de direitos sociais e o estabelecimento do Estado de bem-estar social em suas diferentes vertentes.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Era Neoliberal</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Analise as transformações econômicas das décadas de 1980 e 1990, com desregulamentação financeira, privatizações e globalização econômica acelerada.</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Economia Digital</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Explore os desafios econômicos contemporâneos com plataformas digitais, automação do trabalho, concentração de dados e novas formas de valor e exploração.</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default EconomiaScenarios;
