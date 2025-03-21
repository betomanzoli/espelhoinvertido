
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DebateTopic, sampleMessages, characters } from '@/lib/debateData';
import { ArrowLeft, InfoIcon, SendIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import ChatMessage from '@/components/ChatMessage';
import CharacterProfile from '@/components/CharacterProfile';
import { cn } from '@/lib/utils';

interface ChatInterfaceProps {
  topic: DebateTopic;
}

const ChatInterface = ({ topic }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState([...sampleMessages]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
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
    
    setTimeout(() => {
      setIsTyping(false);
      
      // Sample responses - would be replaced with actual AI responses
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
      const randomResponse = responsePool[Math.floor(Math.random() * responsePool.length)];
      
      // Check if the response should highlight certain terms
      const shouldHighlightTerm = Math.random() > 0.7;
      const possibleTerms = ['mais-valia', 'fetichismo da mercadoria', 'hegemonia cultural'];
      
      const aiMessage = {
        id: `${respondingCharacter}-${Date.now()}`,
        character: respondingCharacter,
        content: randomResponse,
        timestamp: new Date(),
        highlightTerms: shouldHighlightTerm ? [possibleTerms[Math.floor(Math.random() * possibleTerms.length)]] : [],
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 1500 + Math.random() * 1000); // Random delay between 1.5-2.5s
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
          </div>
        </div>
        
        {/* Chat Messages */}
        <div className="flex-1 flex flex-col bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
          <div className="flex-1 overflow-y-auto p-4">
            <div className="max-w-3xl mx-auto space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  id={message.id}
                  character={message.character}
                  content={message.content}
                  timestamp={message.timestamp}
                  highlightTerms={message.highlightTerms}
                />
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
                  placeholder="Digite sua mensagem..."
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
