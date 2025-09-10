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

// Function to get the current chronicle generation prompt from database
async function getChroniclePrompt() {
  try {
    const { data: template } = await supabase
      .from('prompt_templates')
      .select('prompt_content')
      .eq('template_name', 'chronicle_agent_v2')
      .eq('is_active', true)
      .single();

    if (template) {
      return template.prompt_content;
    }
  } catch (error) {
    console.log('Using fallback prompt due to database error:', error);
  }

  // Fallback prompt if database is not available
  return `# 🪞 ESPELHO INVERTIDO – GERADOR AUTOMÁTICO DE CRÔNICAS

Função-alvo  
• Ao receber uma única mensagem do usuário (ex.: "TEMA: Inteligência artificial na educação"), responda **somente** com uma crônica dialética em português (600 – 900 palavras).  
• Se o usuário não definir tema, escolha um fato marcante das últimas 48 h.

Pipeline interno (não exibir)  
1. Pesquisa relâmpago  
   – Coletar títulos + links de 3 – 5 fontes de espectros ideológicos distintos, publicadas nos últimos 7 dias.  
   – Registrar divergências, dados conflitantes, omissões.

2. Construção da crônica  
   Estrutura fixa:  
   a) Cena de abertura atual (máx. 120 palavras).  
   b) Dois personagens antagônicos (vozes ideológicas opostas) debatendo o fato; inserir **1 citação ficcional** de cada lado.  
   c) Clímax: colisão das narrativas + revelação de terceira voz ou símbolo.  
   d) Parágrafo final reflexivo que convide o leitor a questionar seus vieses.  

   Requisitos de estilo:  
   – Narração em 3ª pessoa intercalada a diálogos curtos.  
   – Tom literário, ritmo ágil, ironia sutil.  
   – Conectar explicitamente o debate aos dados colhidos na etapa 1 (sem copiar texto-fonte).  
   – Proibir números inventados: se não houver dado confiável, declarar incerteza.  
   – Extensão total: 600 – 900 palavras.

3. Referências  
   – Ao fim da crônica, listar em 1 linha: "Fontes: [Título curto 1] – URL | [Título curto 2] – URL …".  
   – Máx. 5 links, sem formatação adicional.

Restrições  
– Nunca peça esclarecimentos adicionais.  
– Nunca explique o processo; devolva apenas a crônica + fontes.  
– Caso faltem dados confiáveis, produza crônica parcial e declare a limitação no parágrafo final.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { theme, auto = false } = await req.json();

    console.log(`Generating chronicle with theme: ${theme || 'auto-selected'}`);

    // Get the current prompt from database
    const chroniclePrompt = await getChroniclePrompt();

    // Prepare the user message
    const userMessage = theme ? `TEMA: ${theme}` : 'Surpreenda-me';

    // Call Perplexity API to generate chronicle
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
            content: chroniclePrompt
          },
          {
            role: 'user',
            content: userMessage
          }
        ],
        temperature: 0.7,
        top_p: 0.9,
        max_tokens: 2000,
        return_images: false,
        return_related_questions: false,
        search_recency_filter: 'week',
        frequency_penalty: 1,
        presence_penalty: 0
      }),
    });

    if (!response.ok) {
      throw new Error(`Perplexity API error: ${response.status}`);
    }

    const data = await response.json();
    const chronicleContent = data.choices[0].message.content;

    // Extract title, content, and sources from the generated chronicle
    const lines = chronicleContent.split('\n');
    const sourcesLine = lines.find(line => line.toLowerCase().includes('fontes:'));
    const sources = sourcesLine ? [sourcesLine.replace(/^.*fontes:\s*/i, '')] : [];
    
    // Remove sources line from content
    const content = lines.filter(line => !line.toLowerCase().includes('fontes:')).join('\n').trim();
    
    // Extract or generate title from first paragraph
    const title = theme || content.split('\n')[0].substring(0, 100) + '...';

    // Save chronicle to database
    const { data: chronicle, error } = await supabase
      .from('chronicles')
      .insert({
        title,
        content,
        theme: theme || 'Auto-selected',
        sources,
        status: auto ? 'published' : 'draft'
      })
      .select()
      .single();

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to save chronicle');
    }

    console.log(`Chronicle generated successfully: ${chronicle.id}`);

    return new Response(JSON.stringify({
      success: true,
      chronicle: {
        id: chronicle.id,
        title: chronicle.title,
        content: chronicle.content,
        theme: chronicle.theme,
        sources: chronicle.sources,
        status: chronicle.status
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-chronicle function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});