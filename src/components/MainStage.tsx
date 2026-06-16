import dynamic from 'next/dynamic';
import ArtifactCapture from './ArtifactCapture';
import { ReflectionBox } from './ReflectionBox';
import { Lightbulb, GraduationCap, Zap } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

const CodeBlock = dynamic(() => import('./CodeBlock'), {
  ssr: false,
  loading: () => (
    <div className="rounded-2xl border border-[#2a2b36] mb-6 h-48 animate-pulse" style={{ background: '#1e1f29' }} />
  ),
});

type CodeSnippetType = {
  filename: string;
  language: string;
  code: string;
};

type StepType = {
  id: number;
  title: string;
  theory: string;
  task: string;
  code_snippets: CodeSnippetType[];
  hint: string;
  artifact_type: string;
  artifact_prompt: string;
  reflection_prompt?: string;
};

export default function MainStage({ step }: { step: StepType }) {
  const { guidanceMode } = useProgress();

  return (
    <div id={`step-${step.id}`} className="max-w-4xl mx-auto px-4 sm:px-8 pt-20 md:pt-32 pb-20 md:pb-24 border-t border-border first:border-t-0 font-sans">
      {/* Step Header */}
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-6">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground font-bold text-sm shadow-lg shadow-primary/20 font-poppins">
            {step.id}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-border to-transparent"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground tracking-tight leading-tight font-poppins break-words">{step.title}</h2>
      </div>

      {/* Theory Card */}
      <div className="group relative bg-card rounded-2xl md:rounded-3xl p-6 md:p-10 mb-8 border border-border shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-300 text-card-foreground">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
          <GraduationCap className="w-28 h-28" />
        </div>
        <div className="flex items-center gap-3 mb-8">
          <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]"></div>
          <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] font-poppins">Theoretical Foundation</h3>
        </div>
        <div className="prose prose-slate max-w-none">
          {step.theory.split('\n\n').map((para, i) => (
            <p key={i} className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-5 last:mb-0 font-light break-words" dangerouslySetInnerHTML={{
              __html: para
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-foreground font-semibold">$1</strong>')
                .replace(/`(.+?)`/g, '<code class="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-primary">$1</code>')
            }} />
          ))}
        </div>
      </div>

      {/* Reflection */}
      {step.reflection_prompt && (
        <ReflectionBox key={step.id} stepId={step.id} prompt={step.reflection_prompt} />
      )}

      {/* Task Card */}
      <div className="bg-secondary text-secondary-foreground rounded-2xl md:rounded-3xl p-6 md:p-10 mb-12 border border-border relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-primary"></div>
          <h3 className="text-[10px] font-bold text-primary uppercase tracking-[0.2em] font-poppins">Implementation Task</h3>
        </div>
        <p className="text-foreground leading-relaxed text-lg sm:text-xl font-medium tracking-tight break-words" dangerouslySetInnerHTML={{
          __html: step.task
            .replace(/`(.+?)`/g, '<code class="bg-background text-primary px-2 py-0.5 rounded text-sm font-mono border border-border">$1</code>')
        }} />
      </div>

      {/* Independent Mode Notice */}
      {guidanceMode === 'independent' && (
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-5 md:p-6 mb-12 flex items-start md:items-center gap-3 md:gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm font-poppins">Independent Mode Active</h4>
            <p className="text-muted-foreground text-sm mt-0.5">Code templates and hints are hidden. You&apos;re building this from scratch.</p>
          </div>
        </div>
      )}

      {/* Code Snippets */}
      {guidanceMode === 'guided' && step.code_snippets && step.code_snippets.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-2 w-2 rounded-full bg-muted"></div>
            <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] font-poppins">Production Templates</h3>
          </div>
          <div className="space-y-8">
            {step.code_snippets.map((snippet, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <CodeBlock snippet={snippet} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      {(guidanceMode === 'guided' || guidanceMode === 'some') && step.hint && (
        <div className="bg-accent/10 border border-accent/20 rounded-2xl md:rounded-3xl p-6 md:p-8 mb-16 flex items-start gap-4 md:gap-6 relative overflow-hidden group transition-all duration-300">
          <div className="absolute top-0 right-0 w-40 h-40 bg-accent/10 blur-3xl -mr-20 -mt-20 rounded-full"></div>
          <div className="p-3 bg-card rounded-2xl shadow-sm border border-border group-hover:shadow-md group-hover:bg-accent/5 transition-all duration-300 shrink-0">
            <Lightbulb className="w-6 h-6 text-accent-foreground" />
          </div>
          <div>
            <span className="font-bold text-accent-foreground text-[10px] uppercase tracking-[0.2em] font-poppins">Engineering Insight</span>
            <p className="text-muted-foreground text-base mt-2 leading-relaxed font-light italic" dangerouslySetInnerHTML={{
              __html: step.hint
                .replace(/`(.+?)`/g, '<code class="bg-card px-1.5 py-0.5 rounded text-xs font-mono text-foreground border border-border">$1</code>')
            }} />
          </div>
        </div>
      )}

      {/* Artifact Capture */}
      <div className="pt-8 border-t border-border">
        <div className="px-0 sm:px-2">
          <ArtifactCapture stepId={step.id} type={step.artifact_type} prompt={step.artifact_prompt} />
        </div>
      </div>
    </div>
  );
}
