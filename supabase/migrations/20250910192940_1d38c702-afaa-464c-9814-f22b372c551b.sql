-- Create table for chronicles
CREATE TABLE public.chronicles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  theme TEXT NOT NULL,
  image_url TEXT,
  sources TEXT[],
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled')),
  publish_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for automation settings
CREATE TABLE public.automation_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT NOT NULL UNIQUE,
  setting_value JSONB NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create table for automation logs
CREATE TABLE public.automation_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  action_type TEXT NOT NULL,
  chronicle_id UUID REFERENCES public.chronicles(id),
  platform TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'error')),
  response_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for chronicle images
INSERT INTO storage.buckets (id, name, public) VALUES ('chronicle-images', 'chronicle-images', true);

-- Enable RLS on tables
ALTER TABLE public.chronicles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automation_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for public access (since this is content distribution)
CREATE POLICY "Chronicles are publicly viewable" 
ON public.chronicles 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage chronicles" 
ON public.chronicles 
FOR ALL 
USING (true);

CREATE POLICY "Settings are publicly viewable" 
ON public.automation_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage settings" 
ON public.automation_settings 
FOR ALL 
USING (true);

CREATE POLICY "Logs are publicly viewable" 
ON public.automation_logs 
FOR SELECT 
USING (true);

CREATE POLICY "Admin can manage logs" 
ON public.automation_logs 
FOR ALL 
USING (true);

-- Create storage policies for chronicle images
CREATE POLICY "Chronicle images are publicly accessible" 
ON storage.objects 
FOR SELECT 
USING (bucket_id = 'chronicle-images');

CREATE POLICY "System can upload chronicle images" 
ON storage.objects 
FOR INSERT 
WITH CHECK (bucket_id = 'chronicle-images');

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_chronicles_updated_at
BEFORE UPDATE ON public.chronicles
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_automation_settings_updated_at
BEFORE UPDATE ON public.automation_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert initial automation settings
INSERT INTO public.automation_settings (setting_key, setting_value) VALUES
('chronicle_frequency', '{"hours": 24, "enabled": true}'),
('platforms', '{"substack": true, "youtube": false, "linkedin": true, "instagram": true, "tiktok": false}'),
('image_generation', '{"enabled": true, "style": "artistic", "size": "1024x1024"}'),
('content_preferences', '{"word_count": {"min": 600, "max": 900}, "tone": "analytical", "include_sources": true}');