'use client';

import { useProgress } from '@/hooks/useProgress';
import { Compass, Zap } from 'lucide-react';

export function GuidanceToggle() {
  const { guidanceMode, setGuidanceMode } = useProgress();

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between bg-card rounded-2xl p-6 mb-12 shadow-sm border border-border font-sans gap-4">
      <div>
        <h3 className="text-lg font-bold text-foreground font-poppins">Learning Mode</h3>
        <p className="text-sm text-muted-foreground max-w-sm">
          Choose how much assistance you want. You can change this at any time.
        </p>
      </div>
      
      <div className="flex flex-wrap bg-secondary p-1 rounded-xl w-full md:w-auto">
        <button
          onClick={() => setGuidanceMode('guided')}
          className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-3 md:py-2 rounded-lg font-medium text-sm transition-all cursor-pointer min-h-[44px] ${
            guidanceMode === 'guided' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Compass className="w-4 h-4 shrink-0" />
          <span>Step-by-Step</span>
        </button>
        <button
          onClick={() => setGuidanceMode('some')}
          className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-3 md:py-2 rounded-lg font-medium text-sm transition-all cursor-pointer min-h-[44px] ${
            guidanceMode === 'some' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Compass className="w-4 h-4 shrink-0" />
          <span>Some Guidance</span>
        </button>
        <button
          onClick={() => setGuidanceMode('independent')}
          className={`flex items-center justify-center gap-2 flex-1 md:flex-none px-4 py-3 md:py-2 rounded-lg font-medium text-sm transition-all cursor-pointer min-h-[44px] ${
            guidanceMode === 'independent' 
              ? 'bg-background text-primary shadow-sm' 
              : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
          }`}
        >
          <Zap className="w-4 h-4 shrink-0" />
          <span>On Your Own</span>
        </button>
      </div>
    </div>
  );
}
