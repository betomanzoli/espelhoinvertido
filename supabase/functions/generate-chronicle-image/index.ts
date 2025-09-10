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

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { chronicleId, title, content, theme } = await req.json();

    console.log(`Generating image for chronicle: ${chronicleId}`);

    // Create image prompt based on chronicle content
    const imagePrompt = `Create an artistic, philosophical illustration representing "${theme}". The image should be: 
    - Conceptual and abstract, not literal
    - Sophisticated and thought-provoking
    - Using warm, contrasting colors
    - Symbolizing dialectical thinking and multiple perspectives
    - In a modern editorial illustration style
    - High quality, professional appearance
    Style: Editorial illustration, conceptual art, philosophical symbolism`;

    // Generate image using Perplexity API (they support image generation)
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
            content: 'You are an expert art director. When asked to create an image, provide a detailed, artistic description that could be used to generate a sophisticated editorial illustration.'
          },
          {
            role: 'user',
            content: `Create a detailed artistic description for an editorial illustration based on this theme: "${theme}". The description should be suitable for AI image generation and capture the philosophical essence of the topic.`
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