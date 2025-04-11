
import { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { DebateTopic, sampleMessages, characters } from '@/lib/debateData';
import { ArrowLeft, InfoIcon, SendIcon, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ChatMessage from '@/components/ChatMessage';
import CharacterProfile from '@/components/CharacterProfile';
import { cn } from '@/lib/utils';
import { fetchSubstackPosts, SubstackPost } from '@/services/substackService';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { ScrollArea } from '@/components/ui/scroll-area';

interface ChatInterfaceProps {
  topic: DebateTopic;
}

const ChatInterface = ({ topic }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState([...sampleMessages]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [substackPosts, setSubstackPosts] = useState<SubstackPost[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Carregar crônicas do Substack
    const loadPosts = async () => {
      try {
        const posts = await fetchSubstackPosts();
        setSubstackPosts(posts);
      } catch (error) {
        console.error("Erro ao carregar posts:", error);
      }
    };
    
    loadPosts();
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add user message
    const userMessage = {
      id: `user-${Date.now()}`,
      character: 'user',
      content: newMessage,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    
    // Simulate AI character response
    setIsTyping(true);
    
    // Choose a random character to respond
    const respondingCharacter = Math.random() > 0.5 ? 'rafael' : 'luisa';
    
    // Check if the message mentions keywords related to any substack post
    const mentionedPost = substackPosts.find(post => {
      const keywords = post.title.toLowerCase().split(' ');
      return keywords.some(keyword => 
        keyword.length > 3 && newMessage.toLowerCase().includes(keyword.toLowerCase())
      );
    });
    
    setTimeout(() => {
      setIsTyping(false);
      
      let responseContent = '';
      let highlightTerms: string[] = [];
      
      // If the message mentions a post, generate a response related to it
      if (mentionedPost) {
        if (respondingCharacter === 'rafael') {
          responseContent = `Interessante você mencionar "${mentionedPost.title}". Essa crônica traz elementos históricos importantes que podemos analisar sob a perspectiva do materialismo dialético. O conflito entre forças produtivas e relações de produção fica evidente quando examinamos este tema em seu contexto histórico mais amplo.`;
          highlightTerms = ['materialismo dialético', 'forças produtivas', 'relações de produção'];
        } else {
          responseContent = `Sobre "${mentionedPost.title}", é fascinante observar como esse tema se manifesta no cotidiano atual. Se analisarmos exemplos práticos em nossa sociedade digital, vemos claramente a alienação e a fetichização ocorrendo em plataformas como redes sociais e aplicativos de entrega.`;
          highlightTerms = ['alienação', 'fetichização'];
        }
      } else {
        // Sample responses for general topics
        const responses = {
          'rafael': [
            "Interessante essa perspectiva. Historicamente, podemos observar padrões semelhantes em diferentes contextos econômicos. Você considerou como isso se relaciona com estruturas de poder ao longo do tempo?",
            "Uma análise pertinente. Na história do pensamento econômico, vemos debates semelhantes desde o século XIX. Como você avaliaria a evolução desse conceito até os dias atuais?",
          ],
          'luisa': [
            "Sua colocação levanta questões importantes sobre como a mídia contemporânea molda esse debate. Dados recentes mostram tendências contraditórias que complexificam ainda mais essa análise.",
            "Esse é um ponto crucial no debate atual. Considerando o papel das redes sociais e a concentração de poder nas plataformas digitais, como você vê a relação entre informação e mercantilização?",
          ]
        };
        
        // Get random response for the character
        const responsePool = responses[respondingCharacter as keyof typeof responses];
        responseContent = responsePool[Math.floor(Math.random() * responsePool.length)];
        
        // Check if the response should highlight certain terms
        const shouldHighlightTerm = Math.random() > 0.7;
        const possibleTerms = ['mais-valia', 'fetichismo da mercadoria', 'hegemonia cultural'];
        
        if (shouldHighlightTerm) {
          highlightTerms = [possibleTerms[Math.floor(Math.random() * possibleTerms.length)]];
        }
      }
      
      const aiMessage = {
        id: `${respondingCharacter}-${Date.now()}`,
        character: respondingCharacter,
        content: responseContent,
        timestamp: new Date(),
        highlightTerms,
        mentionedPost: mentionedPost ? mentionedPost.id : undefined
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s
  };
  
  const handleChoosePost = (post: SubstackPost) => {
    setSearchOpen(false);
    
    // Adicionar mensagem do usuário sobre a crônica
    const userMessage = {
      id: `user-${Date.now()}`,
      character: 'user',
      content: `Quero saber mais sobre a crônica "${post.title}".`,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Simular resposta dos personagens
    setIsTyping(true);
    
    // Alterna entre os dois personagens para esta interação específica
    const respondingCharacter = 'rafael';
    const secondRespondingCharacter = 'luisa';
    
    setTimeout(() => {
      const firstResponse = {
        id: `${respondingCharacter}-${Date.now()}`,
        character: respondingCharacter,
        content: `Sobre "${post.title}", essa crônica aborda questões fundamentais do pensamento crítico. Na perspectiva histórica, podemos ver como os conceitos do Manifesto Comunista ainda se aplicam às contradições contemporâneas discutidas no texto.`,
        timestamp: new Date(),
        highlightTerms: ['contradições'],
        mentionedPost: post.id
      };
      
      setMessages(prev => [...prev, firstResponse]);
      
      // Simular segunda resposta (do outro personagem)
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          setIsTyping(false);
          const secondResponse = {
            id: `${secondRespondingCharacter}-${Date.now()}`,
            character: secondRespondingCharacter,
            content: `Complementando o que Rafael disse, essa crônica é especialmente relevante quando observamos exemplos concretos em nosso cotidiano. A questão da ${Math.random() > 0.5 ? 'alienação' : 'mercantilização'} discutida no texto se manifesta claramente nas relações de trabalho digitais atuais.`,
            timestamp: new Date(),
            highlightTerms: ['alienação', 'mercantilização'],
            mentionedPost: post.id
          };
          
          setMessages(prev => [...prev, secondResponse]);
        }, 2000);
      }, 500);
      
      setIsTyping(false);
    }, 1500);
  };
  
  return (
    <div className="min-h-screen pt-20 flex flex-col">
      {/* Topic Header */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 z-10">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/debate" className="mr-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            
            <div>
              <h1 className="text-xl font-medium">{topic.title}</h1>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span>{topic.category}</span>
                <span className="mx-2">•</span>
                <span>{topic.difficulty === 'basic' ? 'Básico' : topic.difficulty === 'intermediate' ? 'Intermediário' : 'Avançado'}</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Popover open={searchOpen} onOpenChange={setSearchOpen}>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <BookOpen className="h-4 w-4" />
                  <span className="hidden sm:inline">Crônicas</span>
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0" align="end">
                <Command>
                  <CommandInput placeholder="Buscar crônicas..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma crônica encontrada.</CommandEmpty>
                    <CommandGroup heading="Crônicas do Espelho Invertido">
                      <ScrollArea className="h-[300px]">
                        {substackPosts.map((post) => (
                          <CommandItem 
                            key={post.id}
                            onSelect={() => handleChoosePost(post)}
                            className="flex flex-col items-start"
                          >
                            <div className="font-medium">{post.title}</div>
                            <div className="text-xs text-gray-500 truncate max-w-full">
                              {post.subtitle}
                            </div>
                          </CommandItem>
                        ))}
                      </ScrollArea>
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            
            <Button 
              variant="ghost" 
              size="icon"
              className={cn("rounded-full", showInfo ? "bg-primary/10 text-primary" : "")}
              onClick={() => setShowInfo(!showInfo)}
            >
              <InfoIcon className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Info Panel - visible on larger screens or when toggled */}
        <div 
          className={cn(
            "bg-light-gray dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 md:w-72 lg:w-80 overflow-y-auto transition-all",
            showInfo ? "block" : "hidden md:block"
          )}
        >
          <div className="p-4">
            <h2 className="text-lg font-medium mb-3">Sobre este tópico</h2>
            <p className="text-gray-700 dark:text-gray-300 text-sm mb-6">
              {topic.description}
            </p>
            
            <h3 className="font-medium mb-2">Participantes</h3>
            <div className="space-y-3 mb-6">
              {characters.map(character => (
                <CharacterProfile 
                  key={character.id}
                  character={character}
                />
              ))}
            </div>
            
            <h3 className="font-medium mb-2">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {topic.tags.map(tag => (
                <span 
                  key={tag}
                  className="px-2 py-1 bg-gray-200 dark:bg-gray-800 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {substackPosts.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-2">Crônicas Relacionadas</h3>
                <div className="space-y-2">
                  {substackPosts.slice(0, 3).map(post => (
                    <div 
                      key={post.id}
                      className="p-2 rounded-md bg-gray-100 dark:bg-gray-800 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
                      onClick={() => handleChoosePost(post)}
                    >
                      <div className="text-sm font-medium">{post.title}</div>
                      <div className="text-xs text-gray-500">{post.subtitle}</div>
                    </div>
                  ))}
                  <a 
                    href="https://espelhoinvertido.substack.com" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary hover:underline inline-block mt-1"
                  >
                    Ver mais no Substack →
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <div key={message.id}>
                  <ChatMessage
                    id={message.id}
                    character={message.character}
                    content={message.content}
                    timestamp={message.timestamp}
                    highlightTerms={message.highlightTerms}
                  />
                  
                  {message.mentionedPost && (
                    <div className="ml-12 mt-2 mb-4">
                      {substackPosts.filter(post => post.id === message.mentionedPost).map(post => (
                        <div 
                          key={post.id} 
                          className="flex items-center space-x-3 p-3 rounded-md bg-gray-100 dark:bg-gray-800"
                        >
                          <div className="flex-shrink-0 w-12 h-12">
                            <img 
                              src={post.coverImage} 
                              alt={post.title} 
                              className="rounded w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-medium truncate">{post.title}</h4>
                            <p className="text-xs text-gray-500 truncate">{post.subtitle}</p>
                          </div>
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="flex-shrink-0 text-xs"
                            onClick={() => window.open(post.url, '_blank', 'noopener,noreferrer')}
                          >
                            Ler
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <ChatMessage
                  id="typing"
                  character={Math.random() > 0.5 ? 'rafael' : 'luisa'}
                  content=""
                  timestamp={new Date()}
                  isTyping={true}
                />
              )}
              
              <div ref={messagesEndRef} />
            </div>
          </div>
          
          {/* Message Input */}
          <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
            <div className="max-w-3xl mx-auto">
              <div className="relative">
                <Textarea
                  placeholder="Digite sua mensagem ou faça uma pergunta sobre alguma crônica..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  className="pr-12 min-h-[60px] max-h-[200px] resize-none"
                  disabled={isTyping}
                />
                
                <Button 
                  className="absolute right-2 bottom-2"
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!newMessage.trim() || isTyping}
                >
                  <SendIcon className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
                Pressione Enter para enviar, Shift+Enter para quebrar linha
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
