import ArtifactCapture from './ArtifactCapture';
import CodeBlock from './CodeBlock';
import { ReflectionBox } from './ReflectionBox';
import { Lightbulb, GraduationCap, Zap } from 'lucide-react';
import { useProgress } from '@/hooks/useProgress';

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
    <div id={`step-${step.id}`} className="max-w-4xl mx-auto px-8 pt-32 pb-24 border-t border-slate-200/60 first:border-t-0 font-sans">
      <div className="mb-16">
        <div className="flex items-center gap-4 mb-4">
          <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/20">
            {step.id}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-slate-200 to-transparent"></div>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight font-poppins">{step.title}</h2>
      </div>

      {/* Theory */}
      <div className="group relative bg-white rounded-[2rem] p-10 mb-6 border border-slate-200/60 shadow-xl shadow-slate-200/20 transition-all hover:border-primary/30">
        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
          <GraduationCap className="w-24 h-24" />
        </div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
          <h3 className="text-xs font-bold text-slate-900 uppercase tracking-[0.3em] font-poppins">Theoretical Foundation</h3>
        </div>
        <div className="prose prose-slate max-w-none">
          {step.theory.split('\n\n').map((para, i) => (
            <p key={i} className="text-slate-600 leading-relaxed text-lg mb-4 last:mb-0 font-light" dangerouslySetInnerHTML={{
              __html: para
                .replace(/\*\*(.+?)\*\*/g, '<strong class="text-slate-900 font-semibold">$1</strong>')
                .replace(/`(.+?)`/g, '<code class="bg-slate-100 px-1.5 py-0.5 rounded text-sm font-mono text-primary">$1</code>')
            }} />
          ))}
        </div>
      </div>

      {/* Reflection */}
      {step.reflection_prompt && (
        <ReflectionBox stepId={step.id} prompt={step.reflection_prompt} />
      )}

      {/* Task */}
      <div className="bg-slate-900 rounded-[2rem] p-10 mb-12 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"></div>
        <div className="flex items-center gap-3 mb-6">
          <div className="h-2 w-2 rounded-full bg-blue-400"></div>
          <h3 className="text-xs font-bold text-blue-400 uppercase tracking-[0.3em]">Implementation Task</h3>
        </div>
        <p className="text-slate-200 leading-relaxed text-xl font-medium tracking-tight" dangerouslySetInnerHTML={{
          __html: step.task
            .replace(/`(.+?)`/g, '<code class="bg-slate-800 text-blue-400 px-2 py-0.5 rounded text-sm font-mono">$1</code>')
        }} />
      </div>

      {guidanceMode === 'independent' && (
        <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 mb-12 flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-emerald-900 text-sm">Independent Mode Active</h4>
            <p className="text-emerald-700 text-sm mt-0.5">Code templates and hints are hidden. You&apos;re building this from scratch!</p>
          </div>
        </div>
      )}

      {/* Code Snippets */}
      {guidanceMode === 'guided' && step.code_snippets && step.code_snippets.length > 0 && (
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-2 w-2 rounded-full bg-slate-300"></div>
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-[0.3em]">Production Templates</h3>
          </div>
          <div className="space-y-8">
            {step.code_snippets.map((snippet, i) => (
              <div key={i} className="rounded-3xl overflow-hidden border border-slate-200/60 shadow-lg">
                <CodeBlock snippet={snippet} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hint */}
      {(guidanceMode === 'guided' || guidanceMode === 'some') && step.hint && (
        <div className="bg-amber-50/30 border border-amber-100/50 rounded-[2rem] p-8 mb-16 flex items-start gap-6 relative overflow-hidden group transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/10 blur-3xl -mr-16 -mt-16 rounded-full"></div>
          <div className="p-3 bg-white rounded-2xl shadow-sm border border-amber-100 group-hover:shadow-md group-hover:bg-amber-50 transition-all duration-300">
            <Lightbulb className="w-6 h-6 text-amber-500 fill-amber-500/10" />
          </div>
          <div>
            <span className="font-bold text-amber-600 text-[10px] uppercase tracking-[0.3em]">Engineering Insight</span>
            <p className="text-slate-600 text-base mt-2 leading-relaxed font-light italic" dangerouslySetInnerHTML={{
              __html: step.hint
                .replace(/`(.+?)`/g, '<code class="bg-amber-100/30 px-1.5 py-0.5 rounded text-xs font-mono text-amber-900">$1</code>')
            }} />
          </div>
        </div>
      )}

      {/* Artifact Capture */}
      <div className="pt-8 border-t border-slate-100">
        <ArtifactCapture stepId={step.id} type={step.artifact_type} prompt={step.artifact_prompt} />
      </div>
    </div>
  );
}
