import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  Clock, 
  Image, 
  Share2,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertCircle,
  Edit3,
  Search,
  BarChart3,
  Zap
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import PromptTemplateEditor from './PromptTemplateEditor';
import ThemeDetectionPanel from './ThemeDetectionPanel';

interface Chronicle {
  id: string;
  title: string;
  theme: string;
  status: string;
  created_at: string;
  image_url?: string;
}

interface ContentAdaptation {
  id: string;
  chronicle_id: string;
  platform: string;
  content_type: string;
  content_data: any;
  status: string;
  published_at?: string;
  engagement_metrics: any;
  created_at: string;
}

interface AutomationLog {
  id: string;
  action_type: string;
  platform: string;
  status: string;
  created_at: string;
  error_message?: string;
}

interface AutomationSettings {
  chronicle_frequency: { hours: number; enabled: boolean };
  platforms: Record<string, boolean>;
  image_generation: { enabled: boolean; style: string; size: string };
  content_preferences: { word_count: { min: number; max: number }; tone: string; include_sources: boolean };
}

const ChronicleAutomationDashboard = () => {
  const [chronicles, setChronicles] = useState<Chronicle[]>([]);
  const [logs, setLogs] = useState<AutomationLog[]>([]);
  const [adaptations, setAdaptations] = useState<ContentAdaptation[]>([]);
  const [settings, setSettings] = useState<AutomationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load chronicles
      const { data: chroniclesData } = await supabase
        .from('chronicles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      // Load logs
      const { data: logsData } = await supabase
        .from('automation_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      // Load content adaptations
      const { data: adaptationsData } = await supabase
        .from('content_adaptations')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

      // Load settings
      const { data: settingsData } = await supabase
        .from('automation_settings')
        .select('*');

      setChronicles(chroniclesData || []);
      setLogs(logsData || []);

      // Transform settings array to object
      const settingsObj: any = {};
      settingsData?.forEach(setting => {
        settingsObj[setting.setting_key] = setting.setting_value;
      });
      setSettings(settingsObj);

    } catch (error) {
      console.error('Error loading data:', error);
      toast.error('Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  };

  const generateChronicle = async (theme?: string) => {
    setGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-chronicle', {
        body: { theme, auto: false }
      });

      if (error) throw error;

      toast.success('Crônica gerada com sucesso!');
      loadData();
    } catch (error) {
      console.error('Error generating chronicle:', error);
      toast.error('Erro ao gerar crônica');
    } finally {
      setGenerating(false);
    }
  };

  const triggerAutomation = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('automation-trigger');

      if (error) throw error;

      toast.success('Automação executada com sucesso!');
      loadData();
    } catch (error) {
      console.error('Error triggering automation:', error);
      toast.error('Erro ao executar automação');
    }
  };

  const generateContentAdaptations = async (chronicleId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('generate-content-adaptations', {
        body: { 
          chronicleId,
          platforms: ['substack', 'linkedin', 'instagram'] 
        }
      });

      if (error) throw error;

      toast.success('Adaptações de conteúdo geradas com sucesso!');
      loadData();
    } catch (error) {
      console.error('Error generating content adaptations:', error);
      toast.error('Erro ao gerar adaptações de conteúdo');
    }
  };

  const detectThemes = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('detect-themes');

      if (error) throw error;

      toast.success('Detecção de temas executada com sucesso!');
      // Optionally refresh theme suggestions
    } catch (error) {
      console.error('Error detecting themes:', error);
      toast.error('Erro ao detectar temas');
    }
  };

  const updateSettings = async (key: string, value: any) => {
    try {
      const { error } = await supabase
        .from('automation_settings')
        .update({ setting_value: value })
        .eq('setting_key', key);

      if (error) throw error;

      setSettings(prev => prev ? { ...prev, [key]: value } : null);
      toast.success('Configurações atualizadas');
    } catch (error) {
      console.error('Error updating settings:', error);
      toast.error('Erro ao atualizar configurações');
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Automação de Crônicas</h1>
          <p className="text-gray-600">Sistema completo de geração e distribuição automática</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={detectThemes} variant="outline">
            <Search className="h-4 w-4 mr-2" />
            Detectar Temas
          </Button>
          <Button onClick={() => generateChronicle()} disabled={generating}>
            {generating ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            Gerar Crônica
          </Button>
          <Button onClick={triggerAutomation} variant="outline">
            <Zap className="h-4 w-4 mr-2" />
            Automação Completa
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Visão Geral
          </TabsTrigger>
          <TabsTrigger value="themes" className="flex items-center gap-2">
            <Search className="h-4 w-4" />
            Detecção de Temas
          </TabsTrigger>
          <TabsTrigger value="prompts" className="flex items-center gap-2">
            <Edit3 className="h-4 w-4" />
            Editor de Prompts
          </TabsTrigger>
          <TabsTrigger value="content" className="flex items-center gap-2">
            <Share2 className="h-4 w-4" />
            Adaptações de Conteúdo
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">

          {/* ... keep existing status cards ... */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Status da Automação</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {settings?.chronicle_frequency?.enabled ? 'Ativa' : 'Inativa'}
                </div>
                <p className="text-xs text-muted-foreground">
                  Frequência: {settings?.chronicle_frequency?.hours || 24}h
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Crônicas Publicadas</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {chronicles.filter(c => c.status === 'published').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total de {chronicles.length} crônicas
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Adaptações de Conteúdo</CardTitle>
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {adaptations.filter(a => a.status === 'published').length}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total de {adaptations.length} adaptações
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Última Execução</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {logs.length > 0 ? 'Recente' : 'Nunca'}
                </div>
                <p className="text-xs text-muted-foreground">
                  {logs.length > 0 && new Date(logs[0].created_at).toLocaleString('pt-BR')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Settings Section */}
          <Card>
            <CardHeader>
              <CardTitle>Configurações da Automação</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Automação Ativa</Label>
                  <p className="text-sm text-gray-600">Ativar geração automática de crônicas</p>
                </div>
                <Switch
                  checked={settings?.chronicle_frequency?.enabled || false}
                  onCheckedChange={(checked) => updateSettings('chronicle_frequency', { 
                    ...settings?.chronicle_frequency, 
                    enabled: checked 
                  })}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Frequência (horas)</Label>
                <Input
                  type="number"
                  value={settings?.chronicle_frequency?.hours || 24}
                  onChange={(e) => updateSettings('chronicle_frequency', { 
                    ...settings?.chronicle_frequency, 
                    hours: parseInt(e.target.value) 
                  })}
                  min="1"
                  max="168"
                />
              </div>

              <div className="space-y-3">
                <Label>Plataformas Ativas</Label>
                <div className="grid grid-cols-2 gap-4">
                  {['substack', 'linkedin', 'instagram', 'twitter'].map(platform => (
                    <div key={platform} className="flex items-center space-x-2">
                      <Switch
                        checked={settings?.platforms?.[platform] || false}
                        onCheckedChange={(checked) => updateSettings('platforms', { 
                          ...settings?.platforms, 
                          [platform]: checked 
                        })}
                      />
                      <Label className="capitalize">{platform}</Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Chronicles Section */}
          <Card>
            <CardHeader>
              <CardTitle>Crônicas Recentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {chronicles.length > 0 ? (
                  chronicles.slice(0, 5).map(chronicle => (
                    <div key={chronicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{chronicle.title}</h4>
                          <Badge className={
                            chronicle.status === 'published' ? 'bg-green-100 text-green-800' :
                            chronicle.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }>
                            {chronicle.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Tema: {chronicle.theme} • {new Date(chronicle.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        {chronicle.image_url && (
                          <Button size="sm" variant="outline">
                            <Image className="h-4 w-4" />
                          </Button>
                        )}
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => generateContentAdaptations(chronicle.id)}
                        >
                          <Share2 className="h-4 w-4 mr-1" />
                          Adaptar
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Activity className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma crônica encontrada</p>
                    <Button 
                      className="mt-4" 
                      onClick={() => generateChronicle()}
                      disabled={generating}
                    >
                      Gerar Primeira Crônica
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Activity Logs */}
          <Card>
            <CardHeader>
              <CardTitle>Logs de Atividade</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {logs.length > 0 ? (
                  logs.slice(0, 10).map(log => (
                    <div key={log.id} className="flex items-center justify-between p-2 text-sm border-b">
                      <div className="flex items-center gap-2">
                        {log.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        ) : log.status === 'error' ? (
                          <XCircle className="h-4 w-4 text-red-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-yellow-500" />
                        )}
                        <span>{log.action_type}</span>
                        {log.platform && <Badge variant="outline">{log.platform}</Badge>}
                      </div>
                      <span className="text-gray-500">
                        {new Date(log.created_at).toLocaleTimeString('pt-BR')}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>Nenhum log de atividade</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Theme Detection Tab */}
        <TabsContent value="themes">
          <ThemeDetectionPanel />
        </TabsContent>

        {/* Prompt Templates Tab */}
        <TabsContent value="prompts">
          <PromptTemplateEditor />
        </TabsContent>

        {/* Content Adaptations Tab */}
        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Adaptações de Conteúdo por Plataforma</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {adaptations.length > 0 ? (
                  adaptations.slice(0, 10).map(adaptation => (
                    <div key={adaptation.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline">{adaptation.platform}</Badge>
                          <Badge className={
                            adaptation.status === 'published' ? 'bg-green-100 text-green-800' :
                            adaptation.status === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }>
                            {adaptation.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          {adaptation.content_type} • {new Date(adaptation.created_at).toLocaleString('pt-BR')}
                        </p>
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => generateContentAdaptations(adaptation.chronicle_id)}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Regenerar
                      </Button>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Share2 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>Nenhuma adaptação de conteúdo encontrada</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Analytics em Desenvolvimento</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12 text-gray-500">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Métricas de performance e engajamento em breve</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChronicleAutomationDashboard;