import courseData from '@/data/course-ir.json';
import { Zap, CheckCircle2 } from 'lucide-react';

export default function ProjectSummary() {
  return (
    <section className="max-w-4xl mx-auto px-8 py-24 border-t border-border font-sans">
      {/* Learner Advisory Note */}
      <div className="mb-16 bg-primary/[0.06] border border-primary/15 rounded-3xl p-6 flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-xl shrink-0 mt-0.5">
          <Zap className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-foreground mb-1 font-poppins">Before you begin</h4>
          <p className="text-sm text-foreground/70 leading-relaxed">
            This project focuses on the core principles of Information Retrieval. You&apos;ll be building algorithms from scratch to understand how they work under the hood. While production systems use optimized libraries, building them yourself is the best way to deeply understand search ranking.
          </p>
        </div>
      </div>

      {/* Executive Summary */}
      <div id="summary" className="mb-24 relative">
        <div className="absolute -left-12 top-0 bottom-0 w-px bg-gradient-to-b from-primary/20 via-transparent to-transparent hidden xl:block"></div>
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-accent-foreground border border-accent/50">
            <Zap className="w-6 h-6 fill-accent-foreground/10" />
          </div>
          <h2 className="text-3xl font-bold text-foreground tracking-tight font-poppins">Executive Summary</h2>
        </div>
        <div className="prose prose-slate max-w-none">
          {courseData.summary.split('\n\n').map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-xl mb-6 last:mb-0 font-light" dangerouslySetInnerHTML={{
              __html: para
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
            }} />
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div id="objectives" className="mb-24">
        <h2 className="text-3xl font-bold text-foreground mb-10 tracking-tight font-poppins">Program Objectives</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {courseData.objectives.map((obj, i) => (
            <div key={i} className="flex items-start gap-4 p-6 bg-card border border-border rounded-3xl hover:border-primary/30 hover:shadow-sm transition-all duration-300">
              <div className="mt-0.5 shrink-0 bg-primary/10 p-2 rounded-xl border border-primary/15">
                <CheckCircle2 className="w-4 h-4 text-primary" />
              </div>
              <span className="text-foreground/80 text-sm font-medium leading-relaxed">{obj.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="bg-foreground rounded-[2.5rem] p-10 md:p-12 overflow-hidden relative group shadow-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/15 blur-3xl -mr-40 -mt-40 rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent/15 blur-3xl -ml-40 -mb-40 rounded-full"></div>
        
        <div className="relative">
          <h3 className="text-[10px] font-bold text-background/60 uppercase tracking-[0.3em] mb-10 text-center font-poppins">System Logical Workflow</h3>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {courseData.architecture_description.split(' → ').map((part, i, arr) => (
              <div key={i} className="flex items-center gap-3">
                <div className="bg-background border border-border text-foreground px-5 py-3.5 rounded-2xl text-sm font-mono shadow-xl transition-all hover:border-primary/40 hover:bg-background/80 cursor-default">
                  <span className="text-primary/40 mr-2 font-bold">0{i+1}</span>
                  {part}
                </div>
                {i < arr.length - 1 && (
                  <span className="text-background/30 text-lg font-light">→</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
