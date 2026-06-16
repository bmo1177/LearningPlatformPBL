import { useState } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { CheckCircle, Save, PenLine } from 'lucide-react';

interface ReflectionBoxProps {
  stepId: number;
  prompt: string;
}

export function ReflectionBox({ stepId, prompt }: ReflectionBoxProps) {
  const { reflections, saveReflection } = useProgress();
  const [text, setText] = useState(reflections[stepId] || '');
  const isSaved = !!reflections[stepId];

  const handleSave = () => {
    saveReflection(stepId, text);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const hasUnsavedChanges = text !== (reflections[stepId] || '');

  return (
    <div className="mt-8 mb-8 p-5 md:p-7 bg-card rounded-2xl md:rounded-3xl border border-border shadow-sm transition-all duration-300 hover:shadow-md hover:border-border/80">
      <div className="flex items-center gap-2.5 mb-3">
        <PenLine className="w-4 h-4 text-muted-foreground" />
        <h3 className="text-base font-semibold text-foreground font-poppins">Reflection</h3>
      </div>
      
      <p className="text-muted-foreground mb-4 text-sm leading-relaxed">{prompt}</p>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Type your reflection here..."
          className="w-full min-h-[120px] p-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 transition-all duration-200 resize-y text-sm leading-relaxed"
          maxLength={1000}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground tabular-nums">
          {text.length} / 1000
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={text.length === 0}
          className={`flex items-center gap-2 px-5 py-3 rounded-xl font-medium text-sm transition-all duration-200 cursor-pointer min-h-[44px] ${
            isSaved && !hasUnsavedChanges
              ? 'bg-primary/10 text-primary border border-primary/20'
              : text.length > 0
              ? 'bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg'
              : 'bg-secondary text-muted-foreground cursor-not-allowed'
          }`}
        >
          {isSaved && !hasUnsavedChanges ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              {hasUnsavedChanges ? 'Update Reflection' : 'Save Reflection'}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
