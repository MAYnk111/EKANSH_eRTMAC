import React, { useState, useRef, useEffect } from 'react';
import { Bot, Send, User, Sparkles, BookOpen, Layers, CheckCircle2, ChevronRight, CornerDownLeft } from 'lucide-react';
import { ChatMessage } from '../../types';
import { AiDrillingAssistantService, DRILLING_SUGGESTED_PROMPTS } from '../../services/aiAssistantService';

export const AiDrillingAssistant: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      sender: 'assistant',
      timestamp: '10:00 AM',
      text: `### 🤖 Welcome to eRTMAC Drilling Intelligence Assistant

I am your engineering institutional memory partner grounded in **Oil India Limited offset well archives**.

I can cross-examine:
- Historical Mud Loss, Stuck Pipe, and Kick trouble intervals
- Contextual offset analog wells (AA-05, AA-09, AA-03, AA-17)
- Proven engineering mitigations, LCM pill recipes, and ECD thresholds

Select a suggested prompt below or enter an operational query:`,
      suggestedPrompts: DRILLING_SUGGESTED_PROMPTS
    }
  ]);

  const [inputPrompt, setInputPrompt] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (promptToSend?: string) => {
    const text = promptToSend || inputPrompt;
    if (!text.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      // Simulate real AI assistant streaming delay
      await new Promise(r => setTimeout(r, 600));
      const response = await AiDrillingAssistantService.queryAssistant(text);
      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error('Assistant error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-oil-navy-950 border border-oil-navy-700/80 rounded-2xl shadow-2xl flex flex-col h-[750px] overflow-hidden">
      {/* Assistant Header */}
      <div className="p-4 bg-oil-navy-900 border-b border-oil-navy-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-400">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Drilling Institutional Memory AI Assistant</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                Grounding Active
              </span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Assam Asset Drilling Knowledge Graph & DDR Document Vector Store
            </p>
          </div>
        </div>

        <span className="text-xs font-mono text-cyan-400 bg-oil-navy-950 px-3 py-1 rounded-lg border border-oil-navy-800">
          Grounded Mode: No Hallucinations
        </span>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-5">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3.5 max-w-3xl ${
              msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                msg.sender === 'user'
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gradient-to-tr from-cyan-600 to-blue-500 text-white shadow-md'
              }`}
            >
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`rounded-2xl p-4 text-xs space-y-3 leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-blue-600/30 border border-blue-500/40 text-slate-100 rounded-tr-none'
                  : 'bg-oil-navy-900 border border-oil-navy-700/80 text-slate-200 rounded-tl-none shadow-xl'
              }`}
            >
              <div className="whitespace-pre-line prose-invert text-slate-200 text-xs">
                {msg.text}
              </div>

              {/* Citations Box */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="pt-2 border-t border-oil-navy-800 space-y-2">
                  <span className="text-[11px] font-bold text-cyan-400 flex items-center gap-1.5 uppercase tracking-wide">
                    <BookOpen className="w-3.5 h-3.5" />
                    Verified Evidence Citations:
                  </span>
                  <div className="space-y-1.5">
                    {msg.citations.map((cite, i) => (
                      <div
                        key={i}
                        className="bg-oil-navy-950 p-2.5 rounded-lg border border-oil-navy-800 space-y-1 font-mono text-[11px]"
                      >
                        <div className="flex items-center justify-between text-slate-300">
                          <strong className="text-cyan-300">{cite.source}</strong>
                          <span className="text-amber-400">{cite.depth}</span>
                        </div>
                        <div className="text-slate-400">
                          {cite.event} • {cite.formation}
                        </div>
                        <p className="text-[10px] text-slate-500 italic border-l-2 border-cyan-500 pl-2 mt-1">
                          "{cite.evidence}"
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Quick Suggested Followup Prompts */}
              {msg.suggestedPrompts && (
                <div className="pt-2 flex flex-wrap gap-2">
                  {msg.suggestedPrompts.map((p, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(p)}
                      className="px-2.5 py-1 rounded-lg bg-oil-navy-950 hover:bg-cyan-500/20 text-cyan-300 border border-oil-navy-700 hover:border-cyan-500 text-[11px] font-medium transition-colors flex items-center gap-1"
                    >
                      <Sparkles className="w-3 h-3 text-cyan-400" />
                      <span>{p}</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="text-[10px] text-slate-500 text-right">
                {msg.timestamp}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex items-center gap-3 text-xs text-slate-400 bg-oil-navy-900/60 p-3 rounded-xl border border-oil-navy-800 w-fit">
            <Bot className="w-4 h-4 text-cyan-400 animate-spin" />
            <span>Cross-indexing offset DDRs and Upper Sandstone logs...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input bar */}
      <div className="p-4 bg-oil-navy-900 border-t border-oil-navy-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder="Ask anything about offset wells, mud loss mitigations, formations, or depth intervals..."
            className="flex-1 bg-oil-navy-950 border border-oil-navy-700 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-cyan-400 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputPrompt.trim() || loading}
            className={`p-3 rounded-xl font-bold transition-all ${
              !inputPrompt.trim() || loading
                ? 'bg-oil-navy-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-950'
            }`}
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
