'use client';

import { useProgress } from '@/hooks/useProgress';
import { Compass, Zap } from 'lucide-react';

export function GuidanceToggle() {
  const { guidanceMode, setGuidanceMode } = useProgress();

  return (
    <div className="flex items-center justify-between bg-white rounded-2xl p-6 mb-12 shadow-sm border border-slate-200 font-sans">
      <div>
        <h3 className="text-lg font-bold text-slate-900 font-poppins">Learning Mode</h3>
        <p className="text-sm text-slate-500 max-w-sm">
          Choose how much assistance you want. You can change this at any time.
        </p>
      </div>
      
      <div className="flex bg-slate-100 p-1 rounded-xl">
        <button
          onClick={() => setGuidanceMode('guided')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            guidanceMode === 'guided' 
              ? 'bg-white text-indigo-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <Compass className="w-4 h-4" />
          Step-by-Step
        </button>
        <button
          onClick={() => setGuidanceMode('some')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            guidanceMode === 'some' 
              ? 'bg-white text-blue-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <Compass className="w-4 h-4" />
          Some Guidance
        </button>
        <button
          onClick={() => setGuidanceMode('independent')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all cursor-pointer ${
            guidanceMode === 'independent' 
              ? 'bg-white text-emerald-600 shadow-sm' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
          }`}
        >
          <Zap className="w-4 h-4" />
          On Your Own
        </button>
      </div>
    </div>
  );
}
