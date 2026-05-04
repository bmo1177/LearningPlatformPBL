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
    <div className="mt-8 mb-6 p-6 bg-card/80 backdrop-blur-md rounded-2xl border border-border shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center gap-2 mb-3">
        <PenLine className="w-5 h-5 text-muted-foreground" />
        <h3 className="text-lg font-semibold text-foreground font-poppins">Reflection</h3>
      </div>
      
      <p className="text-muted-foreground mb-4 text-sm">{prompt}</p>
      
      <div className="relative">
        <textarea
          value={text}
          onChange={handleChange}
          placeholder="Type your reflection here..."
          className="w-full min-h-[120px] p-4 rounded-xl bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-y"
          maxLength={1000}
        />
        <div className="absolute bottom-3 right-3 text-xs text-muted-foreground">
          {text.length} / 1000
        </div>
      </div>
      
      <div className="mt-4 flex justify-end">
        <button
          onClick={handleSave}
          disabled={text.length === 0}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all duration-200 cursor-pointer ${
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
