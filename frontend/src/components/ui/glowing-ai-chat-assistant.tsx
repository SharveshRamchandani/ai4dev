import React, { useState, useRef, useEffect } from 'react';
import { Paperclip, Link, Code, Mic, Send, Info, Bot, X } from 'lucide-react';

const FloatingAiAssistant = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxChars = 2000;
  const chatRef = useRef<HTMLDivElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setMessage(value);
    setCharCount(value.length);
  };

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending message:', message);
      setMessage('');
      setCharCount(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        if (!(event.target as Element).closest('.floating-ai-button')) {
          setIsChatOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
      {/* Floating Button */}
      <button
        className="floating-ai-button relative w-14 h-14 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110"
        onClick={() => setIsChatOpen(!isChatOpen)}
        style={{
          background: 'hsl(var(--foreground))',
          color: 'hsl(var(--foreground))',
          boxShadow: '0 0 20px hsl(var(--foreground) / 0.3), 0 0 40px hsl(var(--foreground) / 0.15)',
        }}
      >
        {isChatOpen ? (
          <X className="w-6 h-6 text-background" />
        ) : (
          <Bot className="w-6 h-6 text-background" />
        )}
      </button>

      {/* Chat Interface */}
      {isChatOpen && (
        <div
          ref={chatRef}
          className="absolute bottom-20 right-0 w-[400px] max-h-[500px] animate-fade-in"
          style={{ animation: 'popIn 0.3s ease-out' }}
        >
          <div className="relative rounded-3xl border border-border bg-card shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-border">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-foreground" />
                <span className="font-semibold text-sm text-foreground">AI Assistant</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground font-medium">GPT-4</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-foreground text-background font-medium">Pro</span>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="p-1.5 rounded-full hover:bg-accent transition-colors"
                >
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>

            {/* Input Section */}
            <div className="relative px-5 py-4">
              <textarea
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Ask me anything about your tasks..."
                className="w-full min-h-[100px] max-h-[200px] resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
                maxLength={maxChars}
              />
            </div>

            {/* Controls */}
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 p-1 bg-secondary/60 rounded-xl border border-border">
                    <button className="group relative p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent">
                      <Paperclip className="w-4 h-4" />
                    </button>
                    <button className="group relative p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent">
                      <Link className="w-4 h-4" />
                    </button>
                    <button className="group relative p-2 rounded-lg transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent">
                      <Code className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="p-2 rounded-lg border border-border transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-accent">
                    <Mic className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-xs font-medium text-muted-foreground">
                    {charCount}/{maxChars}
                  </div>
                  <button
                    onClick={handleSend}
                    className="p-3 bg-foreground text-background rounded-xl transition-all duration-200 hover:opacity-90 active:scale-95"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Info className="w-3 h-3" />
                  <span>
                    Press <kbd className="px-1.5 py-0.5 bg-secondary border border-border rounded text-xs font-mono">Shift + Enter</kbd> for new line
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-success rounded-full" />
                  <span>Online</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes popIn {
          0% { opacity: 0; transform: scale(0.8) translateY(20px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
};

export { FloatingAiAssistant };
