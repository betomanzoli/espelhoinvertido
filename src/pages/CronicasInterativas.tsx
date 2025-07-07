import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PenTool, Share2, BookOpen, Users, Lightbulb, Send } from 'lucide-react';
import { SEOHead } from '@/components/seo/SEOHead';
import { useReaderJourney } from '@/hooks/useReaderJourney';
import { toast } from 'sonner';

const CronicasInterativas = () => {
  const [activeForm, setActiveForm] = useState<'write' | 'share' | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    theme: '',
    perspective: '',
    name: '',
    email: ''
  });
  const { completeStep } = useReaderJourney();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Crônica enviada!", {
      description: "Sua contribuição será analisada e pode aparecer em futuras publicações."
    });
    completeStep('share-content');
    setFormData({ title: '', content: '', theme: '', perspective: '', name: '', email: '' });
    setActiveForm(null);
  };

  const chroniclePrompts = [
    {
      title: "O Algoritmo da Realidade",
      prompt: "Imagine que você descobriu que sua realidade é moldada por um algoritmo que filtra informações com base em seus vieses. Como seria um dia típico?",
      themes: ["Tecnologia", "Viés", "Realidade"]
    },
    {
      title: "Duas Versões da Mesma Notícia",
      prompt: "Conte a mesma história de duas perspectivas ideológicas completamente opostas, revelando como o mesmo evento pode ser interpretado de formas contraditórias.",
      themes: ["Mídia", "Perspectivas", "Política"]
    },
    {
      title: "O Espelho que Mostra o Oposto",
      prompt: "Um personagem encontra um espelho que reflete não sua aparência, mas suas contradições ideológicas e pontos cegos. O que ele vê?",
      themes: ["Autoconhecimento", "Contradições", "Reflexão"]
    }
  ];

  return (
    <div className="page-container">
      <SEOHead 
        title="Crônicas Interativas"
        description="Escreva e compartilhe suas próprias crônicas sobre vieses, perspectivas e contradições ideológicas."
        keywords="crônicas interativas, escrita criativa, viés de confirmação, perspectivas múltiplas"
      />
      
      <div className="content-wrapper">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="heading-1 mb-4">Crônicas Interativas</h1>
            <p className="lead max-w-3xl mx-auto">
              Contribua com suas próprias narrativas sobre vieses, perspectivas e 
              contradições ideológicas. Sua voz pode ser parte do Espelho Invertido.
            </p>
          </div>

          {/* Stats & Community */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="card-espelho text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <PenTool className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Escreva</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Use nossos prompts ou crie suas próprias crônicas
                </p>
              </CardContent>
            </Card>

            <Card className="card-espelho text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Share2 className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Compartilhe</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Sua história pode inspirar outros leitores
                </p>
              </CardContent>
            </Card>

            <Card className="card-espelho text-center">
              <CardContent className="pt-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-violet-600 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-semibold mb-2">Conecte</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Faça parte da comunidade do Espelho Invertido
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="btn-primary"
              onClick={() => setActiveForm('write')}
            >
              <PenTool className="w-5 h-5 mr-2" />
              Escrever Crônica
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-blue-500 text-blue-600 hover:bg-blue-50"
              onClick={() => setActiveForm('share')}
            >
              <Share2 className="w-5 h-5 mr-2" />
              Compartilhar História
            </Button>
          </div>

          {/* Writing Form */}
          {activeForm === 'write' && (
            <Card className="card-espelho mb-12">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PenTool className="w-5 h-5" />
                  Escrever Nova Crônica
                </CardTitle>
                <CardDescription>
                  Use um dos prompts abaixo ou crie sua própria narrativa
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Título da crônica"
                      value={formData.title}
                      onChange={(e) => setFormData({...formData, title: e.target.value})}
                      required
                    />
                    <Input
                      placeholder="Tema principal"
                      value={formData.theme}
                      onChange={(e) => setFormData({...formData, theme: e.target.value})}
                    />
                  </div>
                  
                  <Textarea
                    placeholder="Conte sua história... Explore diferentes perspectivas, vieses ou contradições ideológicas."
                    value={formData.content}
                    onChange={(e) => setFormData({...formData, content: e.target.value})}
                    className="min-h-[200px]"
                    required
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Seu nome (opcional)"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                    <Input
                      type="email"
                      placeholder="Seu email (para contato)"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="flex gap-3">
                    <Button type="submit" className="btn-primary">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar Crônica
                    </Button>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setActiveForm(null)}
                    >
                      Cancelar
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Prompts de Inspiração */}
          <div className="mb-12">
            <div className="text-center mb-8">
              <h2 className="heading-2 mb-4 flex items-center justify-center gap-2">
                <Lightbulb className="w-6 h-6 text-amber-500" />
                Prompts de Inspiração
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                Use estas ideias como ponto de partida para suas crônicas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {chroniclePrompts.map((prompt, index) => (
                <Card key={index} className="card-espelho hover-lift group cursor-pointer"
                      onClick={() => {
                        setFormData({...formData, title: prompt.title});
                        setActiveForm('write');
                      }}>
                  <CardHeader>
                    <CardTitle className="text-lg group-hover:text-blue-600 transition-colors">
                      {prompt.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                      {prompt.prompt}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {prompt.themes.map((theme) => (
                        <Badge key={theme} variant="outline" className="text-xs">
                          {theme}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Como Funciona */}
          <Card className="card-espelho">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Como Funciona
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold mb-3">Para Escritores</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>• Escolha um prompt ou crie sua própria ideia</li>
                    <li>• Explore diferentes perspectivas ideológicas</li>
                    <li>• Revele vieses e contradições através da narrativa</li>
                    <li>• Submeta sua crônica para análise editorial</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold mb-3">Para a Comunidade</h4>
                  <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                    <li>• Crônicas selecionadas podem ser publicadas</li>
                    <li>• Diversidade de vozes enriquece o projeto</li>
                    <li>• Discussões e feedback construtivo</li>
                    <li>• Expansão colaborativa do universo narrativo</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CronicasInterativas;