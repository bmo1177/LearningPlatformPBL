import { CheckCircle, Circle, Zap, Target, GraduationCap, Download, Users, PanelLeftClose, PanelLeftOpen, BookOpen } from 'lucide-react';
import courseData from '@/data/course-ir.json';
import { useProgress } from '@/hooks/useProgress';

export default function Sidebar({ isOpen, onToggle, currentStep }: { isOpen: boolean, onToggle: () => void, currentStep: number | null }) {
  const { artifacts, reflections } = useProgress();

  const completedCount = courseData.steps.filter(step => artifacts[step.id] || reflections[step.id]).length;
  const totalCount = courseData.steps.length;

  const currentStepData = currentStep ? courseData.steps.find(s => s.id === currentStep) : null;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-10 md:hidden transition-opacity" 
          onClick={onToggle}
        />
      )}
      <aside className={`w-72 bg-background/95 border-r border-border flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-20 shadow-sm font-sans transition-transform duration-300 md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h1 className="text-base font-semibold text-foreground leading-tight font-poppins">{courseData.title}</h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mt-1.5 font-poppins">{courseData.difficulty} · {courseData.time}</p>
            </div>
            <button 
              onClick={onToggle}
              className="p-3 hover:bg-secondary rounded-lg text-muted-foreground hover:text-foreground transition-colors cursor-pointer md:hidden"
              title="Hide Sidebar"
              aria-label="Close sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
              <div 
                className="bg-primary h-full rounded-full transition-all duration-500"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <span 
              data-testid="progress-badge"
              className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full tabular-nums font-poppins"
            >
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-6 flex flex-col justify-between">
          <div>
            {/* Overview Links */}
            <div className="mb-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-3 mb-2.5 font-poppins">Overview</p>
              <ul className="space-y-0.5">
                <li>
                  <button onClick={() => scrollToSection('summary')} className="w-full text-left flex items-center gap-2.5 text-sm text-foreground/60 hover:text-primary hover:bg-primary/5 px-3 py-2.5 md:py-2 rounded-lg transition-all duration-200 cursor-pointer group" aria-label="Scroll to 30 Second Summary">
                    <Zap className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>30 Second Summary</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('objectives')} className="w-full text-left flex items-center gap-2.5 text-sm text-foreground/60 hover:text-primary hover:bg-primary/5 px-3 py-2.5 md:py-2 rounded-lg transition-all duration-200 cursor-pointer group" aria-label="Scroll to Objectives">
                    <Target className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>Objectives</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Steps */}
            <div className="mb-6">
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-3 mb-2.5 font-poppins">Curriculum</p>
              <ul className="space-y-0.5">
                {courseData.steps.map((step) => {
                  const hasArtifact = !!artifacts[step.id];
                  const hasReflection = !!reflections[step.id];
                  const isCompleted = hasArtifact || hasReflection;
                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => scrollToSection(`step-${step.id}`)}
                        className="w-full text-left flex items-start gap-2.5 px-3 py-2.5 md:py-2 rounded-lg transition-all duration-200 hover:bg-secondary cursor-pointer group"
                        aria-label={`Go to step ${step.id}: ${step.title}`}
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-primary fill-primary/10" />
                          ) : (
                            <Circle className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground" />
                          )}
                        </div>
                        <div>
                          <span className={`block text-sm transition-colors ${isCompleted ? 'font-medium text-foreground' : 'text-foreground/60 group-hover:text-foreground'}`}>
                            {step.id}. {step.title}
                          </span>
                        </div>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Footer Links */}
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] px-3 mb-2.5 font-poppins">Wrap Up</p>
              <ul className="space-y-0.5">
                <li>
                  <button onClick={() => scrollToSection('learned')} className="w-full text-left flex items-center gap-2.5 text-sm text-foreground/60 hover:text-primary hover:bg-primary/5 px-3 py-2.5 md:py-2 rounded-lg transition-all duration-200 cursor-pointer group" aria-label="Scroll to What You Learned">
                    <GraduationCap className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>What You Learned</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('export')} className="w-full text-left flex items-center gap-2.5 text-sm text-foreground/60 hover:text-primary hover:bg-primary/5 px-3 py-2.5 md:py-2 rounded-lg transition-all duration-200 cursor-pointer group" aria-label="Scroll to Export Report">
                    <Download className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    <span>Export Report</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Community Link */}
          <div className="mt-4 pt-5 border-t border-border">
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors border border-border/60 group">
              <div className="p-2 bg-background rounded-lg shadow-sm group-hover:shadow border border-border text-primary transition-all">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground font-poppins">Need help?</p>
                <p className="text-xs text-muted-foreground">Ask the community →</p>
              </div>
            </a>
          </div>
        </nav>
      </aside>
      
      {/* Collapsed Sidebar FAB */}
      {!isOpen && (
        <div className="fixed left-4 top-4 z-30 flex flex-col gap-2">
          <button
            onClick={onToggle}
            className="p-3 bg-background border border-border rounded-xl shadow-lg hover:shadow-xl transition-all text-muted-foreground cursor-pointer group animate-in fade-in slide-in-from-left-4"
            title="Show Sidebar"
            aria-label="Show sidebar"
          >
            <PanelLeftOpen className="w-5 h-5 group-hover:text-primary transition-colors" />
          </button>
          {currentStepData && (
            <button
              onClick={onToggle}
              className="flex items-center gap-2 px-3 py-2.5 md:py-2 bg-primary/10 border border-primary/20 rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer group animate-in fade-in slide-in-from-left-4"
              title={`Currently viewing: Step ${currentStep}`}
              aria-label={`Currently viewing step ${currentStep}: ${currentStepData.title}`}
            >
              <BookOpen className="w-4 h-4 text-primary shrink-0" />
              <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                Step {currentStep}: {currentStepData.title}
              </span>
            </button>
          )}
        </div>
      )}
    </>
  );
}
