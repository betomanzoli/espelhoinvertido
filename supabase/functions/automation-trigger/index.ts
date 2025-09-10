import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.57.4';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Automation trigger activated');

    // Check if automation is enabled
    const { data: frequencySettings } = await supabase
      .from('automation_settings')
      .select('setting_value')
      .eq('setting_key', 'chronicle_frequency')
      .single();

    if (!frequencySettings?.setting_value?.enabled) {
      console.log('Automation is disabled');
      return new Response(JSON.stringify({
        success: true,
        message: 'Automation is disabled'
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Check when was the last chronicle published
    const { data: lastChronicle } = await supabase
      .from('chronicles')
      .select('created_at')
      .eq('status', 'published')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    const hoursThreshold = frequencySettings.setting_value.hours || 24;
    const now = new Date();
    const lastPublished = lastChronicle ? new Date(lastChronicle.created_at) : new Date(0);
    const hoursSinceLastPublished = (now.getTime() - lastPublished.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastPublished < hoursThreshold) {
      console.log(`Too soon to publish. Last published ${hoursSinceLastPublished.toFixed(1)} hours ago`);
      return new Response(JSON.stringify({
        success: true,
        message: `Too soon to publish. Last published ${hoursSinceLastPublished.toFixed(1)} hours ago`
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Generating new chronicle automatically...');

    // Step 1: Generate chronicle
    const generateResponse = await supabase.functions.invoke('generate-chronicle', {
      body: { auto: true }
    });

    if (generateResponse.error) {
      throw new Error(`Failed to generate chronicle: ${generateResponse.error}`);
    }

    const { chronicle } = generateResponse.data;
    console.log(`Chronicle generated: ${chronicle.id}`);

    // Step 2: Generate image
    const imageResponse = await supabase.functions.invoke('generate-chronicle-image', {
      body: {
        chronicleId: chronicle.id,
        title: chronicle.title,
        content: chronicle.content,
        theme: chronicle.theme
      }
    });

    if (imageResponse.error) {
      console.warn(`Failed to generate image: ${imageResponse.error}`);
    } else {
      console.log('Image generated successfully');
    }

    // Step 3: Distribute content
    const distributeResponse = await supabase.functions.invoke('distribute-content', {
      body: {
        chronicleId: chronicle.id
      }
    });

    if (distributeResponse.error) {
      console.warn(`Failed to distribute content: ${distributeResponse.error}`);
    } else {
      console.log('Content distributed successfully');
    }

    // Log automation run
    await supabase.from('automation_logs').insert({
      action_type: 'automation_trigger',
      chronicle_id: chronicle.id,
      platform: 'system',
      status: 'success',
      response_data: {
        chronicle_generated: true,
        image_generated: !imageResponse.error,
        content_distributed: !distributeResponse.error
      }
    });

    return new Response(JSON.stringify({
      success: true,
      chronicle: {
        id: chronicle.id,
        title: chronicle.title,
        theme: chronicle.theme
      },
      actions: {
        chronicle_generated: true,
        image_generated: !imageResponse.error,
        content_distributed: !distributeResponse.error
      }
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in automation-trigger function:', error);

    // Log automation error
    await supabase.from('automation_logs').insert({
      action_type: 'automation_trigger',
      platform: 'system',
      status: 'error',
      error_message: error.message
    });

    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});