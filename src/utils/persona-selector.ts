
import { RAFAEL, LUISA, PERSONAS } from '@/data/personas';
import { ChatPersona } from '@/types/chat';

export class PersonaSelector {
  private static instance: PersonaSelector;
  private currentPersona: ChatPersona = RAFAEL;
  private conversationContext: string[] = [];

  static getInstance(): PersonaSelector {
    if (!PersonaSelector.instance) {
      PersonaSelector.instance = new PersonaSelector();
    }
    return PersonaSelector.instance;
  }

  selectPersona(userInput: string): ChatPersona {
    const lowerInput = userInput.toLowerCase();
    
    // Contar triggers para cada persona
    const rafaelScore = RAFAEL.triggers.reduce((score, trigger) => 
      lowerInput.includes(trigger.toLowerCase()) ? score + 1 : score, 0
    );
    
    const luisaScore = LUISA.triggers.reduce((score, trigger) => 
      lowerInput.includes(trigger.toLowerCase()) ? score + 1 : score, 0
    );

    // Se há empate ou nenhum trigger, considerar contexto da conversa
    if (rafaelScore === luisaScore) {
      return this.selectByContext(lowerInput);
    }

    // Selecionar persona com maior score
    const selectedPersona = rafaelScore > luisaScore ? RAFAEL : LUISA;
    this.currentPersona = selectedPersona;
    this.updateContext(userInput);
    
    return selectedPersona;
  }

  private selectByContext(input: string): ChatPersona {
    // Análise contextual simples
    const theoreticalKeywords = ['porque', 'como', 'por que', 'explicar', 'teoria', 'conceito'];
    const practicalKeywords = ['exemplo', 'hoje', 'atual', 'agora', 'prática', 'real'];
    
    const hasTheoretical = theoreticalKeywords.some(keyword => input.includes(keyword));
    const hasPractical = practicalKeywords.some(keyword => input.includes(keyword));
    
    if (hasTheoretical && !hasPractical) {
      this.currentPersona = RAFAEL;
    } else if (hasPractical && !hasTheoretical) {
      this.currentPersona = LUISA;
    }
    // Caso contrário, mantém persona atual
    
    this.updateContext(input);
    return this.currentPersona;
  }

  private updateContext(input: string) {
    this.conversationContext.push(input);
    // Manter apenas os últimos 5 inputs para contexto
    if (this.conversationContext.length > 5) {
      this.conversationContext.shift();
    }
  }

  getCurrentPersona(): ChatPersona {
    return this.currentPersona;
  }

  switchPersona(): ChatPersona {
    this.currentPersona = this.currentPersona.name === 'Rafael' ? LUISA : RAFAEL;
    return this.currentPersona;
  }
}
