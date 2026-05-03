'use client';

import { useProgress } from '@/hooks/useProgress';
import { Compass, Zap } from 'lucide-react';

export function GuidanceToggle() {
  const { guidanceMode, setGuidanceMode } = useProgress();

  return (
    <div className="flex items-center justify-between bg-card rounded-2xl p-6 mb-12 shadow-sm border border-border font-sans">
      <div>
        <h3 className="text-lg font-bold text-foreground font-poppins">Learning Mode</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Choose how much assistance you want. You can change this at any time.
        </p>
      </div>
      
      <div className="flex bg-secondary p-1 rounded-xl">
        <button
          onClick={() => setGuidanceMode('guided')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            guidanceMode === 'guided' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Compass className="w-4 h-4" />
          Step-by-Step
        </button>
        <button
          onClick={() => setGuidanceMode('some')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            guidanceMode === 'some' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Compass className="w-4 h-4" />
          Some Guidance
        </button>
        <button
          onClick={() => setGuidanceMode('independent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            guidanceMode === 'independent' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          On Your Own
        </button>
      </div>
    </div>
  );
}
