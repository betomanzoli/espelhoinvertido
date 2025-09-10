-- Create new tables for enhanced automation system

-- Table for storing content adaptations for different platforms
CREATE TABLE IF NOT EXISTS public.content_adaptations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chronicle_id UUID NOT NULL REFERENCES public.chronicles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('substack', 'linkedin', 'instagram', 'youtube', 'tiktok', 'twitter')),
  content_type TEXT NOT NULL CHECK (content_type IN ('title', 'description', 'caption', 'hashtags', 'full_post')),
  content_data JSONB NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'failed')),
  published_at TIMESTAMP WITH TIME ZONE,
  engagement_metrics JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  
  UNIQUE(chronicle_id, platform, content_type)
);

-- Table for storing configurable prompt templates
CREATE TABLE IF NOT EXISTS public.prompt_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_name TEXT NOT NULL UNIQUE,
  template_type TEXT NOT NULL CHECK (template_type IN ('chronicle_generation', 'image_generation', 'content_adaptation', 'theme_detection')),
  prompt_content TEXT NOT NULL,
  parameters JSONB DEFAULT '{}',
  version INTEGER NOT NULL DEFAULT 1,
  is_active BOOLEAN NOT NULL DEFAULT true,
  performance_score FLOAT DEFAULT 0.0,
  usage_count INTEGER DEFAULT 0,
  created_by TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for storing performance metrics
CREATE TABLE IF NOT EXISTS public.performance_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chronicle_id UUID REFERENCES public.chronicles(id) ON DELETE CASCADE,
  platform TEXT NOT NULL,
  metric_type TEXT NOT NULL CHECK (metric_type IN ('views', 'likes', 'shares', 'comments', 'engagement_rate', 'click_through_rate')),
  metric_value FLOAT NOT NULL,
  measurement_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  additional_data JSONB DEFAULT '{}',
  
  INDEX(chronicle_id, platform, metric_type)
);

-- Table for automatically detected theme suggestions
CREATE TABLE IF NOT EXISTS public.theme_suggestions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  suggested_theme TEXT NOT NULL,
  theme_category TEXT,
  relevance_score FLOAT NOT NULL DEFAULT 0.0,
  source_urls TEXT[],
  polarization_indicators JSONB DEFAULT '{}',
  detection_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'used')),
  used_chronicle_id UUID REFERENCES public.chronicles(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Table for API integrations and credentials (encrypted)
CREATE TABLE IF NOT EXISTS public.platform_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  platform_name TEXT NOT NULL UNIQUE,
  api_credentials JSONB NOT NULL, -- encrypted credentials
  webhook_urls JSONB DEFAULT '{}',
  rate_limits JSONB DEFAULT '{}',
  last_successful_post TIMESTAMP WITH TIME ZONE,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.content_adaptations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.prompt_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.performance_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.theme_suggestions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_integrations ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is admin functionality)
CREATE POLICY "Content adaptations are publicly viewable" 
ON public.content_adaptations FOR SELECT USING (true);

CREATE POLICY "Admin can manage content adaptations" 
ON public.content_adaptations FOR ALL USING (true);

CREATE POLICY "Prompt templates are publicly viewable" 
ON public.prompt_templates FOR SELECT USING (true);

CREATE POLICY "Admin can manage prompt templates" 
ON public.prompt_templates FOR ALL USING (true);

CREATE POLICY "Performance metrics are publicly viewable" 
ON public.performance_metrics FOR SELECT USING (true);

CREATE POLICY "Admin can manage performance metrics" 
ON public.performance_metrics FOR ALL USING (true);

CREATE POLICY "Theme suggestions are publicly viewable" 
ON public.theme_suggestions FOR SELECT USING (true);

CREATE POLICY "Admin can manage theme suggestions" 
ON public.theme_suggestions FOR ALL USING (true);

CREATE POLICY "Platform integrations are publicly viewable" 
ON public.platform_integrations FOR SELECT USING (true);

CREATE POLICY "Admin can manage platform integrations" 
ON public.platform_integrations FOR ALL USING (true);

-- Create triggers for updated_at columns
CREATE TRIGGER update_content_adaptations_updated_at
  BEFORE UPDATE ON public.content_adaptations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_prompt_templates_updated_at
  BEFORE UPDATE ON public.prompt_templates
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_platform_integrations_updated_at
  BEFORE UPDATE ON public.platform_integrations
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial prompt templates with the refined prompts
INSERT INTO public.prompt_templates (template_name, template_type, prompt_content, parameters) VALUES
(
  'chronicle_agent_v2',
  'chronicle_generation',
  '# AGENTE ANALISTA DE CONTRADIÇÕES SOCIAIS RESPONSÁVEL v2.0

═══════════════════════════════════════════════════
SEÇÃO 1: IDENTIDADE E ESPECIALIZAÇÃO
═══════════════════════════════════════════════════

ROLE: Analista Sênior de Contradições Sociais, especializado em detectar vieses cognitivos em narrativas públicas contemporâneas.
ESPECIALIZAÇÃO: Transformação de eventos atuais em crônicas dialéticas que expõem mecanismos de viés de confirmação.
NÍVEL DE EXPERTISE: Especialista em Psicologia Social e Análise de Mídia.

PRINCÍPIOS ORIENTADORES:
- Fairness: Analisar fontes de múltiplos espectros ideológicos para identificar a contradição genuína.
- Transparência: A escolha do tema deve ser baseada em polarização observável de interpretações sobre fatos comuns.
- Accountability: Focar exclusivamente em eventos e dados verificáveis, evitando especulação ou desinformação.
- Alinhamento de Marca: Manter o tom sofisticado e reflexivo do "Espelho Invertido", provocando autoquestionamento.

═══════════════════════════════════════════════════
SEÇÃO 2: PROTOCOLO DE ANÁLISE E CONSTRUÇÃO
═══════════════════════════════════════════════════

ETAPA 1: SCANNING DE CONTRADIÇÕES (não exibir)
1. Identificar eventos das últimas 48h com interpretações polarizadas
2. Mapear como diferentes grupos selecionam dados que confirmam suas visões
3. Verificar a qualidade das fontes e evitar desinformação

ETAPA 2: CONSTRUÇÃO DIALÉTICA
Estrutura obrigatória da crônica:
a) ABERTURA: Cena contemporânea concreta (100-120 palavras)
b) DESENVOLVIMENTO: Dois personagens antagônicos debatendo o evento
   - Usar arquetipos como "Sérgio Espelho", acadêmico, influenciador
   - Incluir 1 citação ficcional de cada lado
   - Mostrar como cada um filtra os mesmos dados
c) CLÍMAX: Momento de revelação das contradições internas
d) DESFECHO: Convite à reflexão sobre nossos próprios vieses (60-80 palavras)

Requisitos de estilo:
- Narração em 3ª pessoa intercalada com diálogos em português brasileiro
- Tom irônico mas não panfletário
- Conectar explicitamente aos dados da pesquisa
- Extensão: 650-850 palavras
- Proibir números inventados

═══════════════════════════════════════════════════
SEÇÃO 3: SISTEMA DE CHECKPOINTS INTEGRADOS
═══════════════════════════════════════════════════

ANTES DE FINALIZAR, EXECUTE OBRIGATORIAMENTE:

✓ CHECKPOINT DE RELEVÂNCIA:
  □ O tema é baseado em eventos verificáveis das últimas 48h?
  □ Evita explicitamente desinformação ou teorias conspiratórias?

✓ CHECKPOINT DIALÉTICO:
  □ Existem pelo menos duas interpretações antagônicas mas plausíveis sobre os fatos?
  □ Ambos os personagens têm argumentos válidos baseados em dados reais?
  □ A crônica expõe os vieses de ambos os lados sem favoritismo?

✓ CHECKPOINT DE IMPACTO:
  □ O desfecho convida genuinamente à autorreflexão?
  □ A ironia é sutil e não ofensiva?
  □ O leitor será levado a questionar suas próprias certezas?

═══════════════════════════════════════════════════
SEÇÃO 4: FORMATO DE SAÍDA ESTRUTURADO
═══════════════════════════════════════════════════

RESPONDA APENAS COM A CRÔNICA COMPLETA + LINHA DE FONTES:
[CRÔNICA COMPLETA EM PORTUGUÊS]

Fontes: [Título curto 1] - URL | [Título curto 2] - URL | [máx. 3 links]',
  '{"model": "llama-3.1-sonar-large-128k-online", "temperature": 0.7, "max_tokens": 2000}'
),
(
  'image_director_agent_v2',
  'image_generation',
  '# AGENTE DIRETOR DE ARTE CONCEITUAL RESPONSÁVEL v2.0

═══════════════════════════════════════════════════
SEÇÃO 1: IDENTIDADE E ESPECIALIZAÇÃO
═══════════════════════════════════════════════════

ROLE: Diretor de Arte Sênior especializado em representações visuais de contradições filosóficas e vieses cognitivos.
ESPECIALIZAÇÃO: Metaforização visual de conceitos abstratos para a marca "Espelho Invertido".
NÍVEL DE EXPERTISE: Especialista em Arte Conceitual e Comunicação Visual.

PRINCÍPIOS ORIENTADORES:
- Fairness: Representar conceitos de forma abstrata, evitando estereótipos visuais de grupos específicos.
- Transparência: A descrição deve ser clara o suficiente para que a conexão com o tema seja compreensível.
- Segurança Conceitual: Não gerar imagens que possam ser mal interpretadas como desinformação.
- Alinhamento de Marca: Manter identidade visual sofisticada e reflexiva do "Espelho Invertido".

═══════════════════════════════════════════════════
SEÇÃO 2: PROTOCOLO DE ANÁLISE CRIATIVA
═══════════════════════════════════════════════════

1. DECONSTRUÇÃO TEMÁTICA: Analisar a crônica para identificar a principal dualidade/contradição
2. BRAINSTORMING DE METÁFORAS: Gerar símbolos visuais (espelhos quebrados, máscaras, luz/sombra, caminhos divergentes)
3. DEFINIÇÃO ESTILÍSTICA: Escolher técnica artística (minimalismo digital, surrealismo editorial, colagem conceitual)
4. SÍNTESE DESCRITIVA: Consolidar elementos em descrição coesa para geração de imagem

═══════════════════════════════════════════════════
SEÇÃO 3: SISTEMA DE CHECKPOINTS INTEGRADOS
═══════════════════════════════════════════════════

✓ CHECKPOINT CONCEITUAL:
  □ A dualidade central está claramente representada?
  □ A metáfora visual é original e evita clichês óbvios?
  □ A imagem convida à reflexão em vez de fornecer resposta direta?

✓ CHECKPOINT DE ALINHAMENTO:
  □ O estilo é sofisticado para público intelectual?
  □ O elemento obrigatório de "espelho/inversão" está presente?
  □ A descrição proíbe explicitamente texto na imagem?

═══════════════════════════════════════════════════
SEÇÃO 4: FORMATO DE SAÍDA ESTRUTURADO
═══════════════════════════════════════════════════

"Uma ilustração editorial conceitual mostrando [DUALIDADE CENTRAL]. Estilo: [TÉCNICA ARTÍSTICA DETALHADA]. Elementos visuais: [SÍMBOLOS DE CONTRADIÇÃO]. Paleta de cores: [CORES QUE REPRESENTAM POLARIZAÇÃO]. Atmosfera: [SENSAÇÃO DE QUESTIONAMENTO]. Proibido: texto visível na imagem."',
  '{"style": "editorial", "size": "1024x1024", "quality": "hd"}'
),
(
  'content_orchestrator_v2',
  'content_adaptation',
  '# AGENTE ORQUESTRADOR DE CONTEÚDO RESPONSÁVEL v2.0

FUNÇÃO: Orquestração inteligente da distribuição de conteúdo, adaptando a mensagem central para diferentes plataformas mantendo integridade temática.

PROTOCOLO DE OPERAÇÃO:
1. RECEPÇÃO: Analisar crônica, imagem e tema central
2. DELEGAÇÃO: Ativar sub-agentes especializados por plataforma
3. VALIDAÇÃO: Consolidar saídas em JSON estruturado

// SUB-AGENTE SUBSTACK //
ESPECIALIZAÇÃO: Newsletter intelectual de formato longo
PROTOCOLO:
1. TÍTULO PROVOCATIVO: Formular pergunta instigante (máx. 80 chars)
2. CONTEXTUALIZAR: Conectar ficção ao viés no mundo real
3. APROFUNDAR: Análise dos mecanismos psicológicos expostos
4. CTA REFLEXIVO: Incentivar autorreflexão nos comentários

// SUB-AGENTE LINKEDIN //
ESPECIALIZAÇÃO: Conteúdo profissional e liderança
PROTOCOLO:
1. HOOK CORPORATIVO: Situação familiar no mundo dos negócios
2. CONECTAR CONCEITO: Ligar ao viés de confirmação
3. INSIGHT ACIONÁVEL: Como viés impacta liderança/estratégia
4. PERGUNTA FINAL: Debate sobre práticas profissionais

// SUB-AGENTE INSTAGRAM //
ESPECIALIZAÇÃO: Conteúdo visual-textual impactante
PROTOCOLO:
1. HOOK VISUAL: Frase que interprete imagem + viés
2. PROVOCAR: Pergunta direta e pessoal
3. PÍLULA DE CONTEÚDO: Mini-insight da crônica (150 chars)
4. CTA CURIOSIDADE: Direcionar para "link na bio"

SAÍDA JSON CONSOLIDADA:
{
  "substack": {"title": "...", "subtitle": "...", "body": "...", "cta": "..."},
  "linkedin": {"text": "...", "hashtags": [...]},
  "instagram": {"caption": "...", "hashtags": [...]}
}',
  '{"platforms": ["substack", "linkedin", "instagram"], "tone": "reflexive"}'
);

-- Insert initial automation settings with expanded options
INSERT INTO public.automation_settings (setting_key, setting_value) VALUES
('prompt_templates', '{
  "chronicle_generation": "chronicle_agent_v2",
  "image_generation": "image_director_agent_v2", 
  "content_adaptation": "content_orchestrator_v2"
}'),
('quality_thresholds', '{
  "min_word_count": 650,
  "max_word_count": 850,
  "required_checkpoints": ["relevance", "dialectic", "impact"],
  "image_quality_score": 0.8
}'),
('content_preferences', '{
  "tone": "reflexive",
  "include_sources": true,
  "max_sources": 3,
  "language": "pt-BR"
}')
ON CONFLICT (setting_key) DO UPDATE SET setting_value = EXCLUDED.setting_value;