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

// Function to get the image generation prompt from database
async function getImagePrompt() {
  try {
    const { data: template } = await supabase
      .from('prompt_templates')
      .select('prompt_content')
      .eq('template_name', 'image_director_agent_v2')
      .eq('is_active', true)
      .single();

    if (template) {
      return template.prompt_content;
    }
  } catch (error) {
    console.log('Using fallback prompt due to database error:', error);
  }

  // Fallback prompt
  return `Create a sophisticated editorial illustration representing the philosophical theme. The image should be conceptual and abstract, using warm contrasting colors, symbolizing dialectical thinking and multiple perspectives. Style: modern editorial illustration, philosophical symbolism.`;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chronicleId, title, content, theme } = await req.json();

    console.log(`Generating image for chronicle: ${chronicleId}`);

    // Get the image generation prompt from database
    const imagePrompt = await getImagePrompt();

    // Generate image description using refined prompt
    const imageResponse = await fetch('https://api.perplexity.ai/chat/completions', {
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
            content: imagePrompt
          },
          {
            role: 'user',
            content: `Analise esta crônica e gere uma descrição visual que capture sua dualidade central:

TEMA: ${theme}
TÍTULO: ${title}
CONTEÚDO: ${content.substring(0, 500)}...

Gere uma descrição detalhada para ilustração editorial que represente visualmente a contradição filosófica exposta na crônica.`
          }
        ],
        temperature: 0.8,
        top_p: 0.9,
        max_tokens: 500,
      }),
    });

    if (!imageResponse.ok) {
      throw new Error(`Perplexity API error: ${imageResponse.status}`);
    }

    const imageData = await imageResponse.json();
    const imageDescription = imageData.choices[0].message.content;

    // For now, we'll create a placeholder URL since Perplexity doesn't actually generate images
    // In a real implementation, you'd use an image generation service here
    const imageUrl = `https://via.placeholder.com/1024x1024/2563eb/ffffff?text=${encodeURIComponent(theme)}`;

    // Update chronicle with image URL
    const { error } = await supabase
      .from('chronicles')
      .update({ image_url: imageUrl })
      .eq('id', chronicleId);

    if (error) {
      console.error('Database error:', error);
      throw new Error('Failed to update chronicle with image');
    }

    console.log(`Image generated successfully for chronicle: ${chronicleId}`);

    return new Response(JSON.stringify({
      success: true,
      imageUrl,
      imageDescription
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in generate-chronicle-image function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});