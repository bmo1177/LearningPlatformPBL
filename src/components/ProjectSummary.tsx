import courseData from '@/data/course-ir.json';
import { Zap, CheckCircle2 } from 'lucide-react';

export default function ProjectSummary() {
  return (
    <section className="max-w-4xl mx-auto px-8 py-24 border-t border-slate-200/60 font-sans">
      {/* Learner Advisory Note */}
      <div className="mb-16 bg-blue-50/50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
        <div className="p-2 bg-blue-100/50 rounded-lg shrink-0 mt-0.5">
          <Zap className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-blue-900 mb-1 font-poppins">Before you begin</h4>
          <p className="text-sm text-blue-800/80 leading-relaxed">
            This project focuses on the core principles of Information Retrieval. You'll be building algorithms from scratch to understand how they work under the hood. While production systems use optimized libraries, building them yourself is the best way to deeply understand search ranking.
          </p>
        </div>
      </div>

      {/* 30 Second Summary */}
      <div id="summary" className="mb-24 relative">
        <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/20 via-transparent to-transparent hidden xl:block"></div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 shadow-sm border border-amber-100/50">
            <Zap className="w-6 h-6 fill-amber-500/10" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Executive Summary</h2>
        </div>
        <div className="prose prose-slate max-w-none">
          {courseData.summary.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-500 leading-relaxed text-xl mb-6 last:mb-0 font-light" dangerouslySetInnerHTML={{
              __html: para
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
            }} />
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div id="objectives" className="mb-24">
        <h2 className="text-3xl font-bold text-slate-900 mb-10 tracking-tight">Program Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courseData.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-5 p-6 bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/20 hover:border-blue-200 transition-all duration-300">
              <div className="mt-1 shrink-0 bg-blue-50 p-2.5 rounded-xl border border-blue-100/50">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
              </div>
              <span className="text-slate-700 font-medium leading-relaxed">{obj.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-slate-950 rounded-[2.5rem] p-12 overflow-hidden relative group shadow-2xl shadow-blue-900/10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-3xl -mr-48 -mt-48 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-600/5 blur-3xl -ml-48 -mb-48 rounded-full"></div>
        
        <div className="relative">
          <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-[0.4em] mb-12 text-center opacity-80">System Logical Workflow</h3>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            {courseData.architecture_description.split(' → ').map((part, i, arr) => (
              <div key={i} className="flex items-center gap-4">
                <div className="bg-slate-900 border border-slate-800 text-slate-100 px-6 py-4 rounded-2xl text-sm font-mono shadow-2xl transition-all hover:border-blue-500/50 hover:bg-slate-800/80 group/node cursor-default">
                  <span className="text-blue-500/50 mr-2">0{i+1}</span>
                  {part}
                </div>
                {i < arr.length - 1 && (
                  <div className="flex flex-col items-center">
                    <span className="text-slate-700 text-xl font-light">→</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
