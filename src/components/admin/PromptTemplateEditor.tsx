import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Edit3, 
  Save, 
  RefreshCw,
  TrendingUp,
  RotateCcw,
  CheckCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface PromptTemplate {
  id: string;
  template_name: string;
  template_type: string;
  prompt_content: string;
  parameters: any;
  version: number;
  is_active: boolean;
  performance_score: number;
  usage_count: number;
  created_at: string;
}

const PromptTemplateEditor = () => {
  const [templates, setTemplates] = useState<PromptTemplate[]>([]);
  const [selectedTemplate, setSelectedTemplate] = useState<PromptTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('prompt_templates')
        .select('*')
        .order('template_type', { ascending: true });

      if (error) throw error;
      setTemplates(data || []);
      
      if (data && data.length > 0 && !selectedTemplate) {
        setSelectedTemplate(data[0]);
        setEditedContent(data[0].prompt_content);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      toast.error('Erro ao carregar templates');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedTemplate) return;

    setSaving(true);
    try {
      // Create new version of the template
      const { data: newTemplate, error } = await supabase
        .from('prompt_templates')
        .insert({
          template_name: selectedTemplate.template_name,
          template_type: selectedTemplate.template_type,
          prompt_content: editedContent,
          parameters: selectedTemplate.parameters,
          version: selectedTemplate.version + 1,
          is_active: false, // New version starts inactive
        })
        .select()
        .single();

      if (error) throw error;

      toast.success('Nova versão do template criada com sucesso!');
      loadTemplates();
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving template:', error);
      toast.error('Erro ao salvar template');
    } finally {
      setSaving(false);
    }
  };

  const handleActivate = async (templateId: string) => {
    try {
      const template = templates.find(t => t.id === templateId);
      if (!template) return;

      // Deactivate all templates of the same type
      await supabase
        .from('prompt_templates')
        .update({ is_active: false })
        .eq('template_type', template.template_type);

      // Activate the selected template
      const { error } = await supabase
        .from('prompt_templates')
        .update({ is_active: true })
        .eq('id', templateId);

      if (error) throw error;

      toast.success('Template ativado com sucesso!');
      loadTemplates();
    } catch (error) {
      console.error('Error activating template:', error);
      toast.error('Erro ao ativar template');
    }
  };

  const handleRevert = () => {
    if (selectedTemplate) {
      setEditedContent(selectedTemplate.prompt_content);
      setIsEditing(false);
    }
  };

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case 'chronicle_generation': return 'bg-blue-100 text-blue-800';
      case 'image_generation': return 'bg-purple-100 text-purple-800';
      case 'content_adaptation': return 'bg-green-100 text-green-800';
      case 'theme_detection': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Editor de Prompts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Template List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Edit3 className="h-5 w-5" />
            Templates Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {templates.map(template => (
            <div
              key={template.id}
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedTemplate?.id === template.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => {
                setSelectedTemplate(template);
                setEditedContent(template.prompt_content);
                setIsEditing(false);
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <Badge className={getTemplateTypeColor(template.template_type)}>
                  {template.template_type.replace('_', ' ')}
                </Badge>
                {template.is_active && (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                )}
              </div>
              <p className="text-sm font-medium">{template.template_name}</p>
              <div className="text-xs text-gray-500 mt-1">
                v{template.version} • Score: {template.performance_score.toFixed(2)} • 
                Uso: {template.usage_count}x
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Template Editor */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Editor de Prompt</span>
            <div className="flex gap-2">
              {selectedTemplate && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleActivate(selectedTemplate.id)}
                  disabled={selectedTemplate.is_active}
                >
                  {selectedTemplate.is_active ? 'Ativo' : 'Ativar'}
                </Button>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedTemplate ? (
            <div className="space-y-4">
              {/* Template Info */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h3 className="font-medium">{selectedTemplate.template_name}</h3>
                  <p className="text-sm text-gray-600">
                    Versão {selectedTemplate.version} • 
                    {selectedTemplate.is_active ? ' Ativo' : ' Inativo'}
                  </p>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    {selectedTemplate.performance_score.toFixed(2)}
                  </div>
                  <div>Usos: {selectedTemplate.usage_count}</div>
                </div>
              </div>

              {/* Content Editor */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium">Conteúdo do Prompt</label>
                  <div className="flex gap-2">
                    {isEditing && (
                      <>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleRevert}
                        >
                          <RotateCcw className="h-4 w-4 mr-1" />
                          Reverter
                        </Button>
                        <Button
                          size="sm"
                          onClick={handleSave}
                          disabled={saving}
                        >
                          {saving ? (
                            <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
                          ) : (
                            <Save className="h-4 w-4 mr-1" />
                          )}
                          Salvar Nova Versão
                        </Button>
                      </>
                    )}
                    {!isEditing && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(true)}
                      >
                        <Edit3 className="h-4 w-4 mr-1" />
                        Editar
                      </Button>
                    )}
                  </div>
                </div>
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows={20}
                  className="font-mono text-xs"
                  readOnly={!isEditing}
                  placeholder="Conteúdo do prompt..."
                />
              </div>

              {/* Parameters */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium mb-2">Parâmetros</h4>
                <pre className="text-xs text-gray-600 overflow-x-auto">
                  {JSON.stringify(selectedTemplate.parameters, null, 2)}
                </pre>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <Edit3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Selecione um template para editar</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptTemplateEditor;