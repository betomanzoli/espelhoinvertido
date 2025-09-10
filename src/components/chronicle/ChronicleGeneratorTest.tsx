import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Loader2, Sparkles, Share2, Image as ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const ChronicleGeneratorTest = () => {
  const [theme, setTheme] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedChronicle, setGeneratedChronicle] = useState<any>(null);
  const [generatingImage, setGeneratingImage] = useState(false);

  const generateChronicle = async () => {
    if (!theme.trim()) {
      toast.error('Por favor, insira um tema para a crônica');
      return;
    }

    setGenerating(true);
    setGeneratedChronicle(null);

    try {
      const { data, error } = await supabase.functions.invoke('generate-chronicle', {
        body: { theme: theme.trim(), auto: false }
      });

      if (error) {
        console.error('Error generating chronicle:', error);
        throw new Error(error.message || 'Erro ao gerar crônica');
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Erro desconhecido ao gerar crônica');
      }

      setGeneratedChronicle(data.chronicle);
      toast.success('Crônica gerada com sucesso!');

    } catch (error: any) {
      console.error('Error generating chronicle:', error);
      toast.error(error.message || 'Erro ao gerar crônica');
    } finally {
      setGenerating(false);
    }
  };

  const generateImage = async () => {
    if (!generatedChronicle) return;

    setGeneratingImage(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-chronicle-image', {
        body: {
          chronicleId: generatedChronicle.id,
          title: generatedChronicle.title,
          content: generatedChronicle.content,
          theme: generatedChronicle.theme
        }
      });

      if (error) throw error;

      toast.success('Imagem gerada com sucesso!');
      
      // Update the chronicle with the image URL
      setGeneratedChronicle(prev => ({
        ...prev,
        image_url: data.imageUrl
      }));

    } catch (error: any) {
      console.error('Error generating image:', error);
      toast.error('Erro ao gerar imagem');
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleSurpriseMe = () => {
    const surpriseThemes = [
      'Inteligência artificial na educação',
      'O futuro do trabalho remoto',
      'Sustentabilidade urbana',
      'Redes sociais e democracia',
      'Tecnologia e privacidade',
      'Economia circular',
      'Mudanças climáticas',
      'Desigualdade digital'
    ];
    const randomTheme = surpriseThemes[Math.floor(Math.random() * surpriseThemes.length)];
    setTheme(randomTheme);
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-espelhoinvertido-accent/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-espelhoinvertido-primary">
            <Sparkles className="h-5 w-5" />
            Gerador de Crônicas - Teste
          </CardTitle>
          <p className="text-sm text-gray-600">
            Teste o sistema de geração automática de crônicas dialéticas usando IA
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="theme">Tema da Crônica</Label>
            <div className="flex gap-2 mt-1">
              <Input
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                placeholder="Ex: Inteligência artificial na educação"
                className="flex-1"
              />
              <Button
                variant="outline"
                onClick={handleSurpriseMe}
                disabled={generating}
              >
                Surpreenda-me
              </Button>
            </div>
          </div>

          <Button
            onClick={generateChronicle}
            disabled={generating || !theme.trim()}
            className="w-full"
          >
            {generating ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Gerando crônica...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Gerar Crônica
              </>
            )}
          </Button>

          {generatedChronicle && (
            <div className="space-y-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Gerada com sucesso
                  </Badge>
                  <Badge variant="secondary">ID: {generatedChronicle.id.slice(0, 8)}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={generateImage}
                    disabled={generatingImage}
                  >
                    {generatingImage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <ImageIcon className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => window.open('/admin/automacao', '_blank')}
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-lg mb-2">{generatedChronicle.title}</h3>
                <div className="text-sm text-gray-600 mb-3">
                  <strong>Tema:</strong> {generatedChronicle.theme}
                </div>
                
                <Textarea
                  value={generatedChronicle.content}
                  readOnly
                  className="min-h-[200px] text-sm"
                />

                {generatedChronicle.sources && generatedChronicle.sources.length > 0 && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded">
                    <p className="text-sm"><strong>Fontes:</strong></p>
                    <p className="text-xs text-gray-600 mt-1">
                      {generatedChronicle.sources.join(' | ')}
                    </p>
                  </div>
                )}

                {generatedChronicle.image_url && (
                  <div className="mt-3">
                    <img
                      src={generatedChronicle.image_url}
                      alt="Imagem da crônica"
                      className="w-full max-w-md mx-auto rounded-lg shadow-md"
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-espelhoinvertido-accent/5 border-espelhoinvertido-gold/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h3 className="font-semibold text-espelhoinvertido-primary">
              Sistema de Automação Completo
            </h3>
            <p className="text-sm text-gray-600">
              Acesse o dashboard administrativo para configurar a automação completa, 
              incluindo geração automática de imagens e distribuição em múltiplas plataformas.
            </p>
            <Button
              variant="outline"
              className="mt-3"
              onClick={() => window.open('/admin/automacao', '_blank')}
            >
              Acessar Dashboard Admin
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronicleGeneratorTest;