import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { startSpeechRecognition, stopSpeechRecognition, speakText } from '@/utils/speechUtils';
import { Badge } from '@/components/ui/badge';
import { getAIResponse } from '@/lib/openai';
import { Skeleton } from '@/components/ui/skeleton';

type MessageType = 'text' | 'suggestion' | 'resource' | 'error';

type Message = {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type?: MessageType;
  suggestions?: string[];
  resources?: { title: string; url: string }[];
};

export function Chatbot() {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      text: t('chatbot.welcome'),
      sender: 'bot',
      timestamp: new Date(),
      type: 'text',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    
    // Don't send empty messages
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };
    
    setMessages(prev => [...prev, userMessage]);
    setNewMessage('');
    setIsProcessing(true);

    // Focus the input after sending
    if (inputRef.current) {
      inputRef.current.focus();
    }

    try {
      // Prepare chat history for AI
      const chatHistory = messages.slice(-5).map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));

      // Call OpenAI API for a response
      const aiResponse = await getAIResponse(
        newMessage, 
        chatHistory,
        user?.gradeLevel || undefined, // Convert null to undefined
        undefined // subject context
      );
      
      const botMessage: Message = {
        id: Date.now().toString(),
        text: aiResponse.text,
        sender: 'bot',
        timestamp: new Date(),
        type: aiResponse.type,
        suggestions: aiResponse.suggestions,
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      
      // Fallback response for errors
      const fallbackMessage: Message = {
        id: Date.now().toString(),
        text: t('chatbot.errorResponse'),
        sender: 'bot',
        timestamp: new Date(),
        type: 'error',
      };
      
      setMessages(prev => [...prev, fallbackMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (isListening) {
      stopSpeechRecognition();
      setIsListening(false);
    } else {
      startSpeechRecognition((text) => {
        setNewMessage(text);
        setIsListening(false);
      });
      setIsListening(true);
    }
  };

  const handleTextToSpeech = () => {
    // Read the last bot message
    const lastBotMessage = [...messages]
      .reverse()
      .find(message => message.sender === 'bot');
    
    if (lastBotMessage) {
      speakText(lastBotMessage.text);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isOpen ? (
        <Card className="w-80 h-96 shadow-xl flex flex-col overflow-hidden">
          <CardHeader className="p-4 bg-primary-600 text-white flex items-center justify-between">
            <div className="flex items-center">
              <span className="material-icons-round text-white text-xl animate-pulse">support_agent</span>
              <h3 className="ml-2 font-medium text-sm">{t('chatbot.title')}</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-white hover:text-gray-200 h-8 w-8"
              onClick={toggleChatbot}
            >
              <span className="material-icons-round">remove</span>
            </Button>
          </CardHeader>
          
          <CardContent className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
            <ScrollArea className="h-full pr-2">
              <div className="space-y-4">
                {messages.map(message => (
                  <div 
                    key={message.id} 
                    className={`flex items-start ${message.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {message.sender === 'bot' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center mr-3">
                        <span className="material-icons-round text-primary-600 dark:text-primary-400 text-sm">support_agent</span>
                      </div>
                    )}
                    <div 
                      className={`py-2 px-3 rounded-lg max-w-[200px] ${
                        message.sender === 'user' 
                          ? 'bg-primary-100 dark:bg-primary-900 mr-3' 
                          : 'bg-gray-100 dark:bg-gray-700'
                      }`}
                    >
                      <p className="text-sm text-gray-800 dark:text-gray-200">
                        {message.text}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-primary-500 flex items-center justify-center">
                        <span className="material-icons-round text-white text-sm">person</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
          
          <CardFooter className="p-4 border-t border-gray-200 dark:border-gray-700">
            <form onSubmit={handleSendMessage} className="w-full">
              <div className="relative">
                <Input
                  ref={inputRef}
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder={t('chatbot.inputPlaceholder')}
                  className="pr-10"
                />
                <Button 
                  type="submit" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute inset-y-0 right-0 pr-3 text-primary-600"
                >
                  <span className="material-icons-round">send</span>
                </Button>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={toggleListening}
                  className={`text-xs ${isListening ? 'text-red-500' : 'text-gray-500'} hover:text-primary-600 px-2 py-1 h-auto`}
                >
                  <span className="material-icons-round text-xs mr-1">mic</span>
                  {isListening ? t('chatbot.stopListening') : t('chatbot.voice')}
                </Button>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleTextToSpeech}
                  className="text-xs text-gray-500 hover:text-primary-600 px-2 py-1 h-auto"
                >
                  <span className="material-icons-round text-xs mr-1">volume_up</span>
                  {t('chatbot.textToSpeech')}
                </Button>
              </div>
            </form>
          </CardFooter>
        </Card>
      ) : (
        <Button 
          onClick={toggleChatbot} 
          className="w-14 h-14 rounded-full bg-primary-600 hover:bg-primary-700 shadow-lg hover:shadow-xl transition-all"
        >
          <span className="material-icons-round">chat</span>
        </Button>
      )}
    </div>
  );
}
