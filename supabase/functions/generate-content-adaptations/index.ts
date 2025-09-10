import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const perplexityApiKey = Deno.env.get('PERPLEXITY_API_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Function to get the content orchestrator prompt from database
async function getContentOrchestatorPrompt() {
  try {
    const { data: template } = await supabase
      .from('prompt_templates')
      .select('prompt_content')
      .eq('template_name', 'content_orchestrator_v2')
      .eq('is_active', true)
      .single();

    if (template) {
      return template.prompt_content;
    }
  } catch (error) {
    console.log('Using fallback prompt due to database error:', error);
  }

  // Fallback prompt
  return `# AGENTE ORQUESTRADOR DE CONTEÚDO RESPONSÁVEL v2.0

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

RESPONDA APENAS COM JSON CONSOLIDADO:
{
  "substack": {"title": "...", "subtitle": "...", "body": "...", "cta": "..."},
  "linkedin": {"text": "...", "hashtags": [...]},
  "instagram": {"caption": "...", "hashtags": [...]}
}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chronicleId, platforms = ['substack', 'linkedin', 'instagram'] } = await req.json();

    console.log(`Generating content adaptations for chronicle: ${chronicleId}`);

    // Get chronicle data
    const { data: chronicle, error: chronicleError } = await supabase
      .from('chronicles')
      .select('*')
      .eq('id', chronicleId)
      .single();

    if (chronicleError || !chronicle) {
      throw new Error('Chronicle not found');
    }

    // Get the content orchestrator prompt
    const orchestratorPrompt = await getContentOrchestatorPrompt();

    // Prepare the analysis message
    const analysisMessage = `Analise esta crônica e gere adaptações para as plataformas solicitadas:

TÍTULO: ${chronicle.title}
TEMA: ${chronicle.theme}
CONTEÚDO:
${chronicle.content}

PLATAFORMAS: ${platforms.join(', ')}

Gere adaptações que mantenham a essência dialética da crônica, focando na exposição de vieses de confirmação.`;

    // Call Perplexity API to generate content adaptations
    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${perplexityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.1-sonar-large-128k-online',
        messages: [
          {
            role: 'system',
            content: orchestratorPrompt
          },
          {
            role: 'user',
            content: analysisMessage
          }
        ],
        temperature: 0.8,
        top_p: 0.9,
        max_tokens: 1500,
        return_images: false,
        return_related_questions: false,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    let adaptationsContent = data.choices[0].message.content;

    // Try to parse JSON from the response
    let adaptations;
    try {
      // Extract JSON from response if it's wrapped in text
      const jsonMatch = adaptationsContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        adaptations = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse adaptations JSON:', parseError);
      // Create fallback adaptations
      adaptations = {
        substack: {
          title: chronicle.title,
          subtitle: `Uma análise sobre viés de confirmação`,
          body: chronicle.content,
          cta: "Compartilhe suas reflexões sobre vieses nos comentários"
        },
        linkedin: {
          text: `Reflexão sobre ${chronicle.theme}: como nossos vieses moldam nossa percepção da realidade? #ViésDeConfirmação`,
          hashtags: ["#ViésDeConfirmação", "#PensamentoCrítico", "#Liderança"]
        },
        instagram: {
          caption: `🪞 ${chronicle.theme} - Qual espelho você evita olhar? #ViésDeConfirmação`,
          hashtags: ["#ViésDeConfirmação", "#PensamentoCrítico", "#EspelhoInvertido"]
        }
      };
    }

    // Save adaptations to database
    const contentAdaptations = [];
    for (const platform of platforms) {
      if (adaptations[platform]) {
        const adaptationData = {
          chronicle_id: chronicleId,
          platform,
          content_type: 'full_post',
          content_data: adaptations[platform],
          status: 'draft'
        };
        contentAdaptations.push(adaptationData);
      }
    }

    // Insert adaptations into database
    if (contentAdaptations.length > 0) {
      const { error: insertError } = await supabase
        .from('content_adaptations')
        .upsert(contentAdaptations, {
          onConflict: 'chronicle_id,platform,content_type'
        });

      if (insertError) {
        console.error('Database error:', insertError);
        // Continue execution even if database save fails
      }
    }

    console.log(`Content adaptations generated successfully for chronicle: ${chronicleId}`);

    return new Response(JSON.stringify({
      success: true,
      adaptations,
      chronicleId,
      platforms: platforms
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-content-adaptations function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});