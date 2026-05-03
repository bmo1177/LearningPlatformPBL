import { CheckCircle, Circle, Zap, Target, GraduationCap, Download, Users, PanelLeftClose, PanelLeftOpen } from 'lucide-react';
import courseData from '@/data/course-ir.json';
import { useProgress } from '@/hooks/useProgress';

export default function Sidebar({ isOpen, onToggle }: { isOpen: boolean, onToggle: () => void }) {
  const { artifacts, reflections } = useProgress();

  const completedCount = courseData.steps.filter(step => artifacts[step.id] || reflections[step.id]).length;
  const totalCount = courseData.steps.length;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <aside className={`w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200 flex flex-col h-screen fixed left-0 top-0 overflow-y-auto z-20 shadow-sm font-sans transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-lg font-semibold text-slate-900 leading-tight font-poppins">{courseData.title}</h1>
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">{courseData.difficulty} · {courseData.time}</p>
            </div>
            <button 
              onClick={onToggle}
              className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
              title="Hide Sidebar"
            >
              <PanelLeftClose className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="flex-1 bg-slate-200 rounded-full h-2.5 overflow-hidden shadow-inner">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 shadow-sm"
                style={{ width: `${(completedCount / totalCount) * 100}%` }}
              ></div>
            </div>
            <span 
              data-testid="progress-badge"
              className="text-xs font-bold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full shadow-sm"
            >
              {completedCount}/{totalCount}
            </span>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-8 flex flex-col justify-between">
          <div>
            {/* Overview Links */}
            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3 font-poppins">Overview</p>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => scrollToSection('summary')} className="w-full text-left flex items-center gap-2 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md transition-all cursor-pointer group">
                    <Zap className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                    <span>30 Second Summary</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('objectives')} className="w-full text-left flex items-center gap-2 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md transition-all cursor-pointer group">
                    <Target className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                    <span>Objectives</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Steps */}
            <div className="mb-8">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3 font-poppins">Curriculum</p>
              <ul className="space-y-1">
                {courseData.steps.map((step) => {
                  const hasArtifact = !!artifacts[step.id];
                  const hasReflection = !!reflections[step.id];
                  const isCompleted = hasArtifact || hasReflection;
                  return (
                    <li key={step.id}>
                      <button
                        onClick={() => scrollToSection(`step-${step.id}`)}
                        className="w-full text-left flex items-start gap-3 px-3 py-2.5 rounded-md transition-all hover:bg-slate-50 cursor-pointer group"
                      >
                        <div className="mt-0.5 shrink-0">
                          {isCompleted ? (
                            <CheckCircle className="w-4 h-4 text-emerald-500 fill-emerald-50" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-200 group-hover:text-slate-300" />
                          )}
                        </div>
                        <div>
                          <span className={`block text-sm transition-colors ${isCompleted ? 'font-medium text-slate-800' : 'text-slate-600 group-hover:text-slate-900'}`}>
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
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest px-3 mb-3 font-poppins">Wrap Up</p>
              <ul className="space-y-1">
                <li>
                  <button onClick={() => scrollToSection('learned')} className="w-full text-left flex items-center gap-2 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md transition-all cursor-pointer group">
                    <GraduationCap className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                    <span>What You Learned</span>
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('export')} className="w-full text-left flex items-center gap-2 text-sm text-slate-600 hover:text-primary hover:bg-primary/5 px-3 py-2 rounded-md transition-all cursor-pointer group">
                    <Download className="w-4 h-4 text-slate-500 group-hover:text-primary transition-colors" />
                    <span>Export Report</span>
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-100">
            <a href="#" className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-200/50 group shadow-sm">
              <div className="p-2 bg-white rounded-lg shadow-sm group-hover:shadow border border-slate-100 text-primary transition-all">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 font-poppins">Need help?</p>
                <p className="text-xs text-slate-500">Ask the community &rarr;</p>
              </div>
            </a>
          </div>
        </nav>
      </aside>
      
      {!isOpen && (
        <button 
          onClick={onToggle}
          className="fixed left-4 top-4 z-30 p-3 bg-white border border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all text-slate-600 cursor-pointer group animate-in fade-in slide-in-from-left-4"
          title="Show Sidebar"
        >
          <PanelLeftOpen className="w-5 h-5 group-hover:text-primary transition-colors" />
        </button>
      )}
    </>
  );
}
