import React, { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle, Save, PenLine } from 'lucide-react';

interface ReflectionBoxProps {
  stepId: number;
  prompt: string;
}

export function ReflectionBox({ stepId, prompt }: ReflectionBoxProps) {
  const { reflections, saveReflection } = useProgress();
  const [text, setText] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (reflections[stepId]) {
      setText(reflections[stepId]);
      setIsSaved(true);
    } else {
      setText('');
      setIsSaved(false);
    }
  }, [stepId, reflections]);

  const handleSave = () => {
    saveReflection(stepId, text);
    setIsSaved(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
    if (isSaved) setIsSaved(false);
  };

  return (
    <div className="mt-8 mb-6 p-6 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/50 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <PenLine className="w-5 h-5 text-slate-500" />
        <h3 className="text-lg font-semibold text-slate-800 font-poppins">Reflection</h3>
      </div>
      
      <p className="text-slate-600 mb-4 text-sm">{prompt}</p>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Type your reflection here..."
          className="w-full min-h-[120px] p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-y"
          maxLength={1000}
        />
        <div className="absolute bottom-3 right-3 text-xs text-slate-500">
          {text.length} / 1000
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={text.length === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
            isSaved
              ? 'bg-emerald-50 text-emerald-600 border border-emerald-200'
              : text.length > 0
              ? 'bg-primary text-white shadow-md hover:bg-primary/90 hover:shadow-lg'
              : 'bg-slate-100 text-slate-500 cursor-not-allowed'
          }`}
        >
          {isSaved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save Reflection
            </>
          )}
        </button>
      </div>
    </div>
  );
}
