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
    const { chronicleId, platforms } = await req.json();

    console.log(`Distributing content for chronicle: ${chronicleId}`);

    // Get chronicle data
    const { data: chronicle, error: chronicleError } = await supabase
      .from('chronicles')
      .select('*')
      .eq('id', chronicleId)
      .single();

    if (chronicleError || !chronicle) {
      throw new Error('Chronicle not found');
    }

    // Get platform settings
    const { data: platformSettings } = await supabase
      .from('automation_settings')
      .select('setting_value')
      .eq('setting_key', 'platforms')
      .single();

    const enabledPlatforms = platformSettings?.setting_value || {};
    const targetPlatforms = platforms || Object.keys(enabledPlatforms).filter(p => enabledPlatforms[p]);

    const results = [];

    for (const platform of targetPlatforms) {
      try {
        console.log(`Publishing to ${platform}...`);

        let publishResult = null;

        switch (platform) {
          case 'substack':
            publishResult = await publishToSubstack(chronicle);
            break;
          case 'linkedin':
            publishResult = await publishToLinkedIn(chronicle);
            break;
          case 'instagram':
            publishResult = await publishToInstagram(chronicle);
            break;
          case 'youtube':
            publishResult = await publishToYouTube(chronicle);
            break;
          case 'tiktok':
            publishResult = await publishToTikTok(chronicle);
            break;
          default:
            throw new Error(`Unsupported platform: ${platform}`);
        }

        // Log successful publication
        await supabase.from('automation_logs').insert({
          action_type: 'content_distribution',
          chronicle_id: chronicleId,
          platform,
          status: 'success',
          response_data: publishResult
        });

        results.push({
          platform,
          status: 'success',
          data: publishResult
        });

        console.log(`Successfully published to ${platform}`);

      } catch (error) {
        console.error(`Error publishing to ${platform}:`, error);

        // Log failed publication
        await supabase.from('automation_logs').insert({
          action_type: 'content_distribution',
          chronicle_id: chronicleId,
          platform,
          status: 'error',
          error_message: error.message
        });

        results.push({
          platform,
          status: 'error',
          error: error.message
        });
      }
    }

    return new Response(JSON.stringify({
      success: true,
      results
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in distribute-content function:', error);
    return new Response(JSON.stringify({ 
      success: false, 
      error: error.message 
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

// Placeholder functions for platform publishing
// These would be implemented with actual API calls to each platform

async function publishToSubstack(chronicle: any) {
  // Implement Substack API integration
  console.log('Publishing to Substack:', chronicle.title);
  return { url: 'https://espelhoinvertido.substack.com/p/placeholder', published: true };
}

async function publishToLinkedIn(chronicle: any) {
  // Implement LinkedIn API integration
  console.log('Publishing to LinkedIn:', chronicle.title);
  return { url: 'https://linkedin.com/posts/placeholder', published: true };
}

async function publishToInstagram(chronicle: any) {
  // Implement Instagram API integration
  console.log('Publishing to Instagram:', chronicle.title);
  return { url: 'https://instagram.com/p/placeholder', published: true };
}

async function publishToYouTube(chronicle: any) {
  // Implement YouTube API integration
  console.log('Publishing to YouTube:', chronicle.title);
  return { url: 'https://youtube.com/watch?v=placeholder', published: true };
}

async function publishToTikTok(chronicle: any) {
  // Implement TikTok API integration
  console.log('Publishing to TikTok:', chronicle.title);
  return { url: 'https://tiktok.com/@placeholder', published: true };
}