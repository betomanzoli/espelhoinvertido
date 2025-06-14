
import { ChatPersona, ChatResponse } from '@/types/chat';
import { RAFAEL, LUISA } from '@/data/personas';

export class DialecticAPI {
  private static instance: DialecticAPI;

  static getInstance(): DialecticAPI {
    if (!DialecticAPI.instance) {
      DialecticAPI.instance = new DialecticAPI();
    }
    return DialecticAPI.instance;
  }

  async generateResponse(userInput: string, persona: ChatPersona): Promise<ChatResponse> {
    // Simular resposta baseada na persona (posteriormente integrar com API real)
    const response = await this.simulatePersonaResponse(userInput, persona);
    return response;
  }

  private async simulatePersonaResponse(input: string, persona: ChatPersona): Promise<ChatResponse> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

    if (persona.name === 'Rafael') {
      return this.generateRafaelResponse(input);
    } else {
      return this.generateLuisaResponse(input);
    }
  }

  private generateRafaelResponse(input: string): ChatResponse {
    const responses = {
      'mais-valia': {
        content: "A mais-valia é o conceito central para entender como o capitalismo extrai valor do trabalho. Marx demonstrou que o trabalhador produz mais valor do que recebe em salário - essa diferença é apropriada pelo capitalista. É importante compreender que isso não é um 'roubo' individual, mas a própria estrutura do sistema econômico.",
        suggestedQuestions: ["Como a mais-valia se manifesta hoje?", "Qual a diferença entre mais-valia absoluta e relativa?"],
        relatedConcepts: ["alienação", "luta de classes", "acumulação primitiva"]
      },
      'alienação': {
        content: "A alienação no pensamento marxista tem quatro dimensões: o trabalhador se aliena do produto do seu trabalho, do próprio ato de trabalhar, de sua essência humana e dos outros trabalhadores. É um processo onde o ser humano perde o controle sobre sua própria atividade criativa.",
        suggestedQuestions: ["Como a alienação se manifesta no trabalho digital?", "A alienação pode ser superada?"],
        relatedConcepts: ["mais-valia", "fetichismo da mercadoria", "reificação"]
      },
      default: {
        content: "Interessante questão. Permita-me contextualizá-la historicamente. Marx e Engels, no Manifesto Comunista de 1848, já identificavam tendências que vemos hoje de forma amplificada. O que você observa contemporaneamente tem raízes nas contradições fundamentais do modo de produção capitalista.",
        suggestedQuestions: ["Pode dar exemplos históricos?", "Como isso se relaciona com o Manifesto?"],
        relatedConcepts: ["dialética", "materialismo histórico", "contradições do capital"]
      }
    };

    // Buscar resposta específica ou usar default
    const lowerInput = input.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerInput.includes(key)) {
        return response;
      }
    }
    return responses.default;
  }

  private generateLuisaResponse(input: string): ChatResponse {
    const responses = {
      'algoritmo': {
        content: "Os algoritmos hoje funcionam como novos supervisores digitais. No Uber, por exemplo, o algoritmo define preços, distribui trabalho e monitora performance - criando uma forma sofisticada de controle laboral que Marx provavelmente reconheceria como uma evolução dos métodos disciplinares da fábrica.",
        suggestedQuestions: ["Como os algoritmos controlam o trabalho?", "Isso se relaciona com a mais-valia?"],
        relatedConcepts: ["uberização", "trabalho digital", "controle laboral"]
      },
      'plataforma': {
        content: "As plataformas digitais operam uma transferência de riscos fascinante: socializam a infraestrutura (todos usamos nossos carros, celulares, tempo) mas privatizam os lucros. É como se toda a sociedade financiasse uma fábrica, mas apenas o dono ficasse com o resultado.",
        suggestedQuestions: ["Como as plataformas geram valor?", "Quem realmente trabalha nas plataformas?"],
        relatedConcepts: ["economia compartilhada", "precarização", "financeirização"]
      },
      default: {
        content: "Vamos pensar praticamente sobre isso. No nosso dia a dia digital, essas dinâmicas se manifestam de formas muito concretas. Observe como aplicativos, redes sociais e plataformas estruturam nossas relações de trabalho e consumo - há padrões que Marx identificaria facilmente.",
        suggestedQuestions: ["Pode dar exemplos práticos?", "Como isso afeta os trabalhadores hoje?"],
        relatedConcepts: ["capitalismo digital", "dados pessoais", "automação"]
      }
    };

    // Buscar resposta específica ou usar default
    const lowerInput = input.toLowerCase();
    for (const [key, response] of Object.entries(responses)) {
      if (key !== 'default' && lowerInput.includes(key)) {
        return response;
      }
    }
    return responses.default;
  }
}
