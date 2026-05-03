'use client';
import { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles } from 'lucide-react';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { useProgress } from '@/hooks/useProgress';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function AIAssistant() {
  const { currentStep, isAssistantOpen, setAssistantOpen } = useProgress();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your Socratic AI Tutor. I won't just give you the answers—I'll help you think through the problem. What are you working on right now?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isAssistantOpen) scrollToBottom();
  }, [messages, isAssistantOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userText }]);
    setIsLoading(true);

    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY?.trim();
      
      if (!apiKey) {
        setTimeout(() => {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: "Oops! My API key is missing. Please add `NEXT_PUBLIC_GEMINI_API_KEY` to your environment variables to wake me up!" 
          }]);
          setIsLoading(false);
        }, 1000);
        return;
      }

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        safetySettings: [
          { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
          { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        ],
      });

      const prompt = `You are a Socratic tutor assisting a student with an Information Retrieval project. 
The student is currently on step index ${currentStep}.
Do not give direct answers to coding problems. Instead, ask guiding questions to help the student arrive at the answer themselves.
Keep responses concise, friendly, and pedagogical. 
Student says: ${userText}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'assistant', content: text }]);
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `I'm having trouble connecting to my brain right now: ${error.message || 'Unknown error'}. Please try again later.` 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 font-sans">
      {isAssistantOpen ? (
        <div className="bg-white rounded-3xl w-96 h-[500px] flex flex-col shadow-2xl border border-slate-200/60 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          <div className="bg-slate-900 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-400/30">
                <Sparkles className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-sm font-poppins">Socratic Tutor</h3>
                <p className="text-[10px] text-blue-300 uppercase tracking-wider">Gemini Powered</p>
              </div>
            </div>
            <button 
              onClick={() => setAssistantOpen(false)}
              className="text-slate-400 hover:text-white transition-colors p-1"
              title="Close Socratic Tutor"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-2xl p-3 text-sm leading-relaxed ${
                  msg.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-sm' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm'
                }`}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {messages.length === 1 && (
              <div className="flex flex-col gap-2 mt-4 px-2">
                <button onClick={() => setInput("Tell me about this project")} className="text-left text-xs bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                  "Tell me about this project"
                </button>
                <button onClick={() => setInput("Quiz me on my current step")} className="text-left text-xs bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                  "Quiz me"
                </button>
                <button onClick={() => setInput("My goal is...")} className="text-left text-xs bg-white border border-slate-200 p-2.5 rounded-xl text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-colors shadow-sm">
                  "My goal is..."
                </button>
              </div>
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm p-4 shadow-sm flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for guidance..."
              className="flex-1 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="w-10 h-10 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white rounded-xl flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              title="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setAssistantOpen(true)}
          title="Ask Socratic Tutor"
          className="group flex items-center justify-center w-14 h-14 bg-slate-900 text-white rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:ring-offset-2"
        >
          <Sparkles className="w-6 h-6 group-hover:scale-110 transition-transform" />
        </button>
      )}
    </div>
  );
}
