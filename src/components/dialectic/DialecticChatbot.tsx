
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { ChatMessage, ChatPersona } from '@/types/chat';
import { PersonaSelector } from '@/utils/persona-selector';
import { DialecticAPI } from '@/services/dialectic-api';
import { RAFAEL, LUISA } from '@/data/personas';
import { cn } from '@/lib/utils';

const DialecticChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentPersona, setCurrentPersona] = useState<ChatPersona>(RAFAEL);
  
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const personaSelector = PersonaSelector.getInstance();
  const dialecticAPI = DialecticAPI.getInstance();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Mensagem de boas-vindas
      const welcomeMessage: ChatMessage = {
        id: 'welcome',
        content: "Olá! Sou Rafael, professor de História e Filosofia Política. Junto com minha colega Luísa, estamos aqui para explorar diferentes perspectivas sobre questões contemporâneas através da lente do pensamento crítico. O que gostaria de discutir?",
        persona: RAFAEL,
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      persona: currentPersona, // Placeholder
      timestamp: new Date(),
      isUser: true
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Selecionar persona baseada no input
      const selectedPersona = personaSelector.selectPersona(inputValue);
      setCurrentPersona(selectedPersona);

      // Gerar resposta
      const response = await dialecticAPI.generateResponse(inputValue, selectedPersona);
      
      const botMessage: ChatMessage = {
        id: Date.now().toString() + '_bot',
        content: response.content,
        persona: selectedPersona,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Erro ao gerar resposta:', error);
      const errorMessage: ChatMessage = {
        id: Date.now().toString() + '_error',
        content: "Desculpe, houve um erro. Tente novamente.",
        persona: currentPersona,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setInputValue('');
    }
  };

  const handleSwitchPersona = () => {
    const newPersona = personaSelector.switchPersona();
    setCurrentPersona(newPersona);
    
    const switchMessage: ChatMessage = {
      id: Date.now().toString() + '_switch',
      content: newPersona.name === 'Rafael' 
        ? "Agora quem fala é o Rafael. Posso abordar essa questão com uma perspectiva mais histórico-filosófica."
        : "Agora é a Luísa falando. Vou trazer uma abordagem mais prática e contemporânea para nossa conversa.",
      persona: newPersona,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, switchMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full w-16 h-16 bg-gradient-to-r from-red-800 to-blue-800 hover:from-red-700 hover:to-blue-700 shadow-lg animate-pulse"
        >
          <MessageSquare className="w-6 h-6" />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-96 h-[500px] bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Header */}
      <div className={cn(
        "flex items-center justify-between p-4 rounded-t-lg",
        currentPersona.name === 'Rafael' 
          ? "bg-gradient-to-r from-red-800 to-red-600" 
          : "bg-gradient-to-r from-blue-800 to-blue-600"
      )}>
        <div className="flex items-center gap-3">
          <div className="text-2xl">{currentPersona.avatar}</div>
          <div>
            <h3 className="font-semibold text-white">{currentPersona.name}</h3>
            <p className="text-xs text-white/80">{currentPersona.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSwitchPersona}
            className="text-white hover:bg-white/20"
            title="Alternar persona"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(false)}
            className="text-white hover:bg-white/20"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3",
                message.isUser ? "flex-row-reverse" : "flex-row"
              )}
            >
              {!message.isUser && (
                <div className="flex-shrink-0">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                    message.persona.name === 'Rafael' 
                      ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" 
                      : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                  )}>
                    {message.persona.avatar}
                  </div>
                </div>
              )}
              
              <div className={cn(
                "max-w-[80%] rounded-lg p-3 text-sm",
                message.isUser
                  ? "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  : message.persona.name === 'Rafael'
                    ? "bg-red-50 dark:bg-red-950 text-red-900 dark:text-red-100 border border-red-200 dark:border-red-800"
                    : "bg-blue-50 dark:bg-blue-950 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800"
              )}>
                {!message.isUser && (
                  <Badge 
                    variant="outline" 
                    className={cn(
                      "mb-2 text-xs",
                      message.persona.name === 'Rafael' 
                        ? "border-red-300 text-red-700 dark:border-red-700 dark:text-red-300" 
                        : "border-blue-300 text-blue-700 dark:border-blue-700 dark:text-blue-300"
                    )}
                  >
                    {message.persona.name}
                  </Badge>
                )}
                <p className="whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <div className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-sm",
                currentPersona.name === 'Rafael' 
                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" 
                  : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
              )}>
                {currentPersona.avatar}
              </div>
              <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder={`Converse com ${currentPersona.name}...`}
            disabled={isLoading}
            className="flex-1"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className={cn(
              currentPersona.name === 'Rafael' 
                ? "bg-red-600 hover:bg-red-700" 
                : "bg-blue-600 hover:bg-blue-700"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DialecticChatbot;
