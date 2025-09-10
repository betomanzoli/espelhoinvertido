import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  TrendingUp,
  Eye,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface ThemeSuggestion {
  id: string;
  suggested_theme: string;
  theme_category: string;
  relevance_score: number;
  source_urls: string[];
  polarization_indicators: any;
  detection_date: string;
  status: string;
  used_chronicle_id?: string;
}

const ThemeDetectionPanel = () => {
  const [suggestions, setSuggestions] = useState<ThemeSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [detecting, setDetecting] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeSuggestion | null>(null);

  useEffect(() => {
    loadSuggestions();
  }, []);

  const loadSuggestions = async () => {
    try {
      const { data, error } = await supabase
        .from('theme_suggestions')
        .select('*')
        .order('detection_date', { ascending: false })
        .limit(20);

      if (error) throw error;
      setSuggestions(data || []);
    } catch (error) {
      console.error('Error loading suggestions:', error);
      toast.error('Erro ao carregar sugestões de temas');
    } finally {
      setLoading(false);
    }
  };

  const detectNewThemes = async () => {
    setDetecting(true);
    try {
      const { data, error } = await supabase.functions.invoke('detect-themes');

      if (error) throw error;

      toast.success('Novos temas detectados com sucesso!');
      loadSuggestions();
    } catch (error) {
      console.error('Error detecting themes:', error);
      toast.error('Erro ao detectar temas');
    } finally {
      setDetecting(false);
    }
  };

  const updateThemeStatus = async (themeId: string, status: 'approved' | 'rejected') => {
    try {
      const { error } = await supabase
        .from('theme_suggestions')
        .update({ status })
        .eq('id', themeId);

      if (error) throw error;

      toast.success(status === 'approved' ? 'Tema aprovado!' : 'Tema rejeitado!');
      loadSuggestions();
    } catch (error) {
      console.error('Error updating theme status:', error);
      toast.error('Erro ao atualizar status do tema');
    }
  };

  const generateChronicleFromTheme = async (theme: ThemeSuggestion) => {
    try {
      // Extract theme without "TEMA: " prefix
      const cleanTheme = theme.suggested_theme.replace(/^TEMA:\s*/, '');
      
      const { data, error } = await supabase.functions.invoke('generate-chronicle', {
        body: { theme: cleanTheme, auto: false }
      });

      if (error) throw error;

      // Update theme status to used
      await supabase
        .from('theme_suggestions')
        .update({ 
          status: 'used', 
          used_chronicle_id: data.chronicle.id 
        })
        .eq('id', theme.id);

      toast.success('Crônica gerada com sucesso a partir do tema!');
      loadSuggestions();
    } catch (error) {
      console.error('Error generating chronicle from theme:', error);
      toast.error('Erro ao gerar crônica a partir do tema');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'used': return 'bg-blue-100 text-blue-800';
      default: return 'bg-yellow-100 text-yellow-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'economia': return 'bg-purple-100 text-purple-800';
      case 'tecnologia': return 'bg-blue-100 text-blue-800';
      case 'sociedade': return 'bg-green-100 text-green-800';
      case 'política': return 'bg-red-100 text-red-800';
      case 'cultura': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Search className="h-5 w-5" />
              Detecção Automática de Temas
            </div>
            <Button onClick={detectNewThemes} disabled={detecting}>
              {detecting ? (
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              ) : (
                <Search className="h-4 w-4 mr-2" />
              )}
              Detectar Temas
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            Sistema de detecção automática que analisa eventos das últimas 48h para identificar 
            temas com potencial para crônicas dialéticas que exponham viés de confirmação.
          </p>
        </CardContent>
      </Card>

      {/* Theme Suggestions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sugestões Recentes</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {suggestions.map(suggestion => (
                  <div
                    key={suggestion.id}
                    className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                      selectedTheme?.id === suggestion.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedTheme(suggestion)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex gap-2">
                        <Badge className={getCategoryColor(suggestion.theme_category)}>
                          {suggestion.theme_category}
                        </Badge>
                        <Badge className={getStatusColor(suggestion.status)}>
                          {suggestion.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <TrendingUp className="h-3 w-3" />
                        {(suggestion.relevance_score * 100).toFixed(0)}%
                      </div>
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {suggestion.suggested_theme}
                    </p>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {new Date(suggestion.detection_date).toLocaleString('pt-BR')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Theme Details */}
        <Card>
          <CardHeader>
            <CardTitle>Detalhes do Tema</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedTheme ? (
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">{selectedTheme.suggested_theme}</h3>
                  <div className="flex gap-2 mb-3">
                    <Badge className={getCategoryColor(selectedTheme.theme_category)}>
                      {selectedTheme.theme_category}
                    </Badge>
                    <Badge className={getStatusColor(selectedTheme.status)}>
                      {selectedTheme.status}
                    </Badge>
                    <Badge variant="outline">
                      Score: {(selectedTheme.relevance_score * 100).toFixed(0)}%
                    </Badge>
                  </div>
                </div>

                {/* Polarization Indicators */}
                {selectedTheme.polarization_indicators && (
                  <div className="space-y-3">
                    <h4 className="text-sm font-medium">Indicadores de Polarização</h4>
                    <div className="grid grid-cols-1 gap-3 text-xs">
                      {selectedTheme.polarization_indicators.left_interpretation && (
                        <div className="p-2 bg-blue-50 rounded">
                          <div className="font-medium text-blue-800 mb-1">Interpretação Esquerda:</div>
                          <div className="text-blue-700">{selectedTheme.polarization_indicators.left_interpretation}</div>
                        </div>
                      )}
                      {selectedTheme.polarization_indicators.right_interpretation && (
                        <div className="p-2 bg-red-50 rounded">
                          <div className="font-medium text-red-800 mb-1">Interpretação Direita:</div>
                          <div className="text-red-700">{selectedTheme.polarization_indicators.right_interpretation}</div>
                        </div>
                      )}
                      {selectedTheme.polarization_indicators.data_selectivity && (
                        <div className="p-2 bg-gray-50 rounded">
                          <div className="font-medium text-gray-800 mb-1">Seletividade de Dados:</div>
                          <div className="text-gray-700">{selectedTheme.polarization_indicators.data_selectivity}</div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Sources */}
                {selectedTheme.source_urls && selectedTheme.source_urls.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium mb-2">Fontes ({selectedTheme.source_urls.length})</h4>
                    <div className="space-y-1">
                      {selectedTheme.source_urls.slice(0, 3).map((url, index) => (
                        <a
                          key={index}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-blue-600 hover:underline block truncate"
                        >
                          {url}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t">
                  {selectedTheme.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        onClick={() => updateThemeStatus(selectedTheme.id, 'approved')}
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        Aprovar
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateThemeStatus(selectedTheme.id, 'rejected')}
                      >
                        <ThumbsDown className="h-4 w-4 mr-1" />
                        Rejeitar
                      </Button>
                    </>
                  )}
                  {selectedTheme.status === 'approved' && (
                    <Button
                      size="sm"
                      onClick={() => generateChronicleFromTheme(selectedTheme)}
                    >
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Gerar Crônica
                    </Button>
                  )}
                  {selectedTheme.used_chronicle_id && (
                    <Badge variant="outline">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Usado em crônica
                    </Badge>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Eye className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Selecione um tema para ver os detalhes</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemeDetectionPanel;