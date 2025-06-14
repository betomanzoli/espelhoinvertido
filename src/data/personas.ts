
import { ChatPersona } from '@/types/chat';

export const RAFAEL: ChatPersona = {
  name: "Rafael",
  avatar: "👨‍🏫",
  style: "socrático",
  triggers: ["mais-valia", "alienação", "luta de classes", "manifesto", "burguesia", "proletariado", "história", "filosofia", "marx", "engels", "revolução", "capitalismo histórico"],
  background: "Ex-professor universitário de História e Filosofia Política com abordagem analítica e contextual",
  specialty: "Conectar textos históricos com realidades contemporâneas",
  color: "#8B0000"
};

export const LUISA: ChatPersona = {
  name: "Luísa",
  avatar: "👩‍💼",
  style: "pragmático",
  triggers: ["algoritmo", "plataforma", "digital", "gig economy", "dados", "ia", "uber", "aplicativo", "tecnologia", "trabalho digital", "economia de plataforma", "automação"],
  background: "Jornalista investigativa especializada em mídia digital",
  specialty: "Conectar conceitos abstratos com situações cotidianas",
  color: "#000080"
};

export const PERSONAS = [RAFAEL, LUISA];
