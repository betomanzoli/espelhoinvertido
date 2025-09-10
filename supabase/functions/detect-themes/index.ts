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

// Function to get the theme detector prompt from database
async function getThemeDetectorPrompt() {
  try {
    const { data: template } = await supabase
      .from('prompt_templates')
      .select('prompt_content')
      .eq('template_name', 'theme_detector_agent_v2')
      .eq('is_active', true)
      .single();

    if (template) {
      return template.prompt_content;
    }
  } catch (error) {
    console.log('Using fallback prompt due to database error:', error);
  }

  // Fallback prompt
  return `# AGENTE DETECTOR DE TEMAS AUTOMÁTICO RESPONSÁVEL v2.0

FUNÇÃO: Identificar eventos das últimas 48h que revelem contradições ideológicas e viés de confirmação.

PROTOCOLO:
1. BUSCAR eventos recentes com interpretações polarizadas
2. VERIFICAR se há dados verificáveis e fontes confiáveis
3. AVALIAR potencial para crônica dialética
4. FORMULAR tema neutro que exponha o viés

RESPONDA APENAS COM JSON:
{
  "theme": "TEMA: [Descrição neutra do evento que revela viés]",
  "category": "[economia/tecnologia/sociedade/política/cultura]",
  "relevance_score": [0.0 a 1.0],
  "polarization_indicators": {
    "left_interpretation": "[Como a esquerda interpreta]",
    "right_interpretation": "[Como a direita interpreta]",
    "data_selectivity": "[Quais dados cada lado privilegia]"
  },
  "sources": ["url1", "url2", "url3"],
  "justification": "[Por que este tema é ideal para exposição de viés]"
}`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Detecting themes for chronicle generation');

    // Get the theme detector prompt
    const detectorPrompt = await getThemeDetectorPrompt();

    // Prepare the detection message
    const detectionMessage = `Analise os eventos das últimas 48 horas e identifique o tema mais promissor para uma crônica dialética que exponha viés de confirmação. Procure por situações onde diferentes grupos interpretam os mesmos dados de formas opostas, revelando seus filtros cognitivos.

Critérios:
- Evento baseado em fatos verificáveis
- Interpretações genuinamente polarizadas (não apenas discordância)
- Rico em potencial para análise dialética
- Relevante para audiência brasileira

Foque em detectar o MECANISMO do viés, não tomar partido no conteúdo.`;

    // Call Perplexity API to detect themes
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
            content: detectorPrompt
          },
          {
            role: 'user',
            content: detectionMessage
          }
        ],
        temperature: 0.6,
        top_p: 0.9,
        max_tokens: 1000,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'day',
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    let themeContent = data.choices[0].message.content;

    // Try to parse JSON from the response
    let themeData;
    try {
      // Extract JSON from response if it's wrapped in text
      const jsonMatch = themeContent.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        themeData = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('No JSON found in response');
      }
    } catch (parseError) {
      console.error('Failed to parse theme JSON:', parseError);
      // Create fallback theme
      themeData = {
        theme: "TEMA: A interpretação divergente de dados econômicos recentes, vistos como recuperação por uns e crise por outros",
        category: "economia",
        relevance_score: 0.8,
        polarization_indicators: {
          left_interpretation: "Dados mostram desigualdade crescente",
          right_interpretation: "Dados mostram crescimento econômico",
          data_selectivity: "Cada lado foca em métricas diferentes"
        },
        sources: ["https://example.com/source1", "https://example.com/source2"],
        justification: "Tema ideal porque expõe como vieses fazem grupos interpretarem os mesmos dados de formas opostas"
      };
    }

    // Validate and clean the theme data
    if (!themeData.theme) {
      throw new Error('Invalid theme data structure');
    }

    // Save theme suggestion to database
    const { data: savedTheme, error: saveError } = await supabase
      .from('theme_suggestions')
      .insert({
        suggested_theme: themeData.theme,
        theme_category: themeData.category || 'general',
        relevance_score: themeData.relevance_score || 0.5,
        source_urls: themeData.sources || [],
        polarization_indicators: themeData.polarization_indicators || {},
        status: 'pending'
      })
      .select()
      .single();

    if (saveError) {
      console.error('Database error saving theme:', saveError);
      // Continue execution even if database save fails
    }

    console.log('Theme detected successfully:', themeData.theme);

    return new Response(JSON.stringify({
      success: true,
      theme_data: themeData,
      theme_id: savedTheme?.id || null
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in detect-themes function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});