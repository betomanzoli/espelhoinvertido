
export interface ChatPersona {
  name: "Rafael" | "Luísa";
  avatar: string;
  style: "socrático" | "pragmático";
  triggers: string[];
  background: string;
  specialty: string;
  color: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  persona: ChatPersona;
  timestamp: Date;
  isUser?: boolean;
}

export interface ChatResponse {
  content: string;
  suggestedQuestions?: string[];
  relatedConcepts?: string[];
}
