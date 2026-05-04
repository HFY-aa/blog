import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Sparkles, Terminal, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { chatWithResume } from '../services/geminiService';
import { cn } from '../lib/utils';

export const AIResumeAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: 'INITIALIZING AI_RESUME_CORE... 系统就绪。有什么我可以帮您的吗？' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));
      
      const response = await chatWithResume(userMessage, history);
      setMessages(prev => [...prev, { role: 'model', text: response || 'EMPTY_RESPONSE_ERROR' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: 'CONNECTION_FAILED: 请检查后端连接。' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-80 sm:w-96 bg-[#0F0F0F] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 flex flex-col overflow-hidden"
            style={{ height: '500px' }}
          >
            {/* Header */}
            <div className="bg-[#151515] p-3 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-neon animate-pulse" />
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/50">RESUME_CORE_v1.0</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                className="text-white/30 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div 
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10"
            >
              <div className="fixed inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(circle_at_50%_50%,#00FFD1_0%,transparent_70%)]" />
              
              {messages.map((msg, i) => (
                <div key={i} className={cn("flex flex-col gap-2", msg.role === 'user' ? "items-end" : "items-start")}>
                  <div className="flex items-center gap-2 opacity-30 font-mono text-[9px] uppercase tracking-widest">
                    {msg.role === 'user' ? <><span className="text-white">USER</span><User size={10} /></> : <><Bot size={10} /><span className="text-brand-neon">AI_ASSISTANT</span></>}
                  </div>
                  <div className={cn(
                    "max-w-[90%] p-3 rounded-lg text-sm leading-relaxed font-mono",
                    msg.role === 'user' 
                      ? "bg-white/5 text-white border border-white/10" 
                      : "bg-brand-neon/5 text-brand-neon border border-brand-neon/20"
                  )}>
                    <div className="markdown-body prose prose-invert prose-sm">
                      <ReactMarkdown>{msg.text}</ReactMarkdown>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex flex-col gap-2 items-start">
                  <div className="flex items-center gap-2 opacity-30 font-mono text-[9px] uppercase tracking-widest">
                    <Bot size={10} /><span className="text-brand-neon">AI_ASSISTANT</span>
                  </div>
                  <div className="bg-brand-neon/5 border border-brand-neon/20 p-3 rounded-lg">
                    <div className="flex gap-1.5 Items-center">
                      <span className="text-brand-neon font-mono text-xs">THINKING</span>
                      <div className="w-1 h-1 bg-brand-neon rounded-full animate-bounce" />
                      <div className="w-1 h-1 bg-brand-neon rounded-full animate-bounce [animation-delay:0.2s]" />
                      <div className="w-1 h-1 bg-brand-neon rounded-full animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-4 bg-[#151515] border-t border-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex items-center gap-2 bg-black/40 border border-white/10 rounded-lg pr-2 focus-within:border-brand-neon/50 transition-colors"
              >
                <div className="pl-3 text-brand-neon/50">
                  <ChevronRight size={14} />
                </div>
                <input
                  id="ai-terminal-input"
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="EXECUTE_QUERY..."
                  className="flex-1 bg-transparent border-none py-2 text-xs font-mono text-white placeholder:text-white/20 outline-none"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="text-brand-neon/40 hover:text-brand-neon disabled:opacity-0 transition-all p-1"
                >
                  <Terminal size={14} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        id="ai-trigger"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-[#0F0F0F] text-brand-neon w-14 h-14 rounded-xl shadow-2xl flex items-center justify-center hover:bg-brand-neon hover:text-black transition-all group relative border border-white/10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-brand-neon opacity-0 group-hover:opacity-10 transition-opacity" />
        {isOpen ? <X size={20} /> : <div className="space-y-1"><div className="w-4 h-0.5 bg-current" /><div className="w-2 h-0.5 bg-current" /><div className="w-4 h-0.5 bg-current" /></div>}
        
        {/* Glow effect */}
        {!isOpen && (
           <div className="absolute inset-0 rounded-xl bg-brand-neon/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
        )}
      </motion.button>
    </div>
  );
};
