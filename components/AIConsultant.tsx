
import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, Loader2, RefreshCw } from 'lucide-react';
import { ChatMessage } from '../types';
import { getGeminiResponse } from '../services/geminiService';

const AIConsultant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'assistant',
      content: "Welcome to the Aaayafuj Intelligence core. I'm your SMM Consultant. How can I help you dominate social media today?",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      role: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    const response = await getGeminiResponse(messages, input);
    
    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: response,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-250px)] animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex-1 overflow-y-auto space-y-6 mb-4 pr-2 scrollbar-thin">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex max-w-[85%] space-x-3 ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
              <div className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center shadow-lg ${
                msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-800 border border-slate-700'
              }`}>
                {msg.role === 'user' ? <User size={20} className="text-white" /> : <Bot size={20} className="text-blue-400" />}
              </div>
              <div className={`p-4 rounded-3xl text-sm leading-relaxed shadow-sm ${
                msg.role === 'user' 
                ? 'bg-blue-600 text-white rounded-tr-none' 
                : 'bg-slate-900 border border-slate-800 text-slate-300 rounded-tl-none'
              }`}>
                {msg.content}
                <div className={`text-[10px] mt-2 ${msg.role === 'user' ? 'text-blue-200' : 'text-slate-500'}`}>
                  {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex space-x-3 items-center">
              <div className="w-10 h-10 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
                <Loader2 size={20} className="text-blue-500 animate-spin" />
              </div>
              <p className="text-xs text-slate-500 italic">Aaayafuj Intelligence is thinking...</p>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="relative">
        <div className="absolute -top-10 left-0 right-0 flex justify-center pointer-events-none">
          <div className="bg-slate-800/80 backdrop-blur-sm border border-slate-700 px-3 py-1 rounded-full flex items-center space-x-2">
            <Sparkles size={12} className="text-amber-400" />
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Powered by Gemini 3 Flash</span>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-slate-900 border border-slate-800 p-2 rounded-[2rem] shadow-xl">
          <input 
            type="text" 
            placeholder="Ask about viral trends, SMM strategies, or platform SEO..."
            className="flex-1 bg-transparent border-none py-4 px-6 text-white text-sm outline-none placeholder:text-slate-600"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white p-4 rounded-full transition-all shadow-lg shadow-blue-600/20"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIConsultant;
