import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
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
  AlertCircle
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface Chronicle {
  id: string;
  title: string;
  theme: string;
  status: string;
  created_at: string;
  image_url?: string;
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
  const [settings, setSettings] = useState<AutomationSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

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
          <p className="text-gray-600">Geração e distribuição automática de conteúdo</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => generateChronicle()} disabled={generating}>
            {generating ? <RefreshCw className="h-4 w-4 animate-spin mr-2" /> : <Play className="h-4 w-4 mr-2" />}
            Gerar Crônica
          </Button>
          <Button onClick={triggerAutomation} variant="outline">
            <Activity className="h-4 w-4 mr-2" />
            Executar Automação
          </Button>
        </div>
      </div>

      {/* Status Cards */}
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
            <CardTitle className="text-sm font-medium">Plataformas Ativas</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Object.values(settings?.platforms || {}).filter(Boolean).length}
            </div>
            <p className="text-xs text-muted-foreground">
              de {Object.keys(settings?.platforms || {}).length} disponíveis
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

      {/* Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Configurações de Automação
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Automação Ativa</Label>
              <Switch
                checked={settings?.chronicle_frequency?.enabled || false}
                onCheckedChange={(checked) => 
                  updateSettings('chronicle_frequency', { 
                    ...settings?.chronicle_frequency, 
                    enabled: checked 
                  })
                }
              />
            </div>
            
            <div>
              <Label>Frequência (horas)</Label>
              <Input
                type="number"
                value={settings?.chronicle_frequency?.hours || 24}
                onChange={(e) => 
                  updateSettings('chronicle_frequency', {
                    ...settings?.chronicle_frequency,
                    hours: parseInt(e.target.value)
                  })
                }
              />
            </div>

            <div>
              <Label>Geração de Imagens</Label>
              <Switch
                checked={settings?.image_generation?.enabled || false}
                onCheckedChange={(checked) => 
                  updateSettings('image_generation', {
                    ...settings?.image_generation,
                    enabled: checked
                  })
                }
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share2 className="h-5 w-5" />
              Plataformas de Distribuição
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(settings?.platforms || {}).map(([platform, enabled]) => (
              <div key={platform} className="flex items-center justify-between">
                <Label className="capitalize">{platform}</Label>
                <Switch
                  checked={enabled}
                  onCheckedChange={(checked) => 
                    updateSettings('platforms', {
                      ...settings?.platforms,
                      [platform]: checked
                    })
                  }
                />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Recent Chronicles */}
      <Card>
        <CardHeader>
          <CardTitle>Crônicas Recentes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {chronicles.slice(0, 5).map(chronicle => (
              <div key={chronicle.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h3 className="font-medium">{chronicle.title}</h3>
                  <p className="text-sm text-gray-600">Tema: {chronicle.theme}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(chronicle.created_at).toLocaleString('pt-BR')}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  {chronicle.image_url && <Image className="h-4 w-4 text-blue-500" />}
                  <Badge variant={chronicle.status === 'published' ? 'default' : 'secondary'}>
                    {chronicle.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Logs */}
      <Card>
        <CardHeader>
          <CardTitle>Log de Atividades</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {logs.slice(0, 10).map(log => (
              <div key={log.id} className="flex items-center justify-between p-3 border rounded">
                <div className="flex items-center gap-3">
                  {log.status === 'success' ? (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  ) : log.status === 'error' ? (
                    <XCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-yellow-500" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{log.action_type} - {log.platform}</p>
                    {log.error_message && (
                      <p className="text-xs text-red-600">{log.error_message}</p>
                    )}
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(log.created_at).toLocaleString('pt-BR')}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChronicleAutomationDashboard;