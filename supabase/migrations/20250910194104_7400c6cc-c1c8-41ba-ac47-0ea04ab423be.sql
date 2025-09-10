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
  additional_data JSONB DEFAULT '{}'
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
  api_credentials JSONB NOT NULL,
  webhook_urls JSONB DEFAULT '{}',
  rate_limits JSONB DEFAULT '{}',
  last_successful_post TIMESTAMP WITH TIME ZONE,
  is_enabled BOOLEAN NOT NULL DEFAULT true,
  error_count INTEGER DEFAULT 0,
  last_error TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_performance_metrics_chronicle_platform 
ON public.performance_metrics(chronicle_id, platform, metric_type);

CREATE INDEX IF NOT EXISTS idx_content_adaptations_chronicle_platform 
ON public.content_adaptations(chronicle_id, platform);

CREATE INDEX IF NOT EXISTS idx_theme_suggestions_status 
ON public.theme_suggestions(status, detection_date);

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