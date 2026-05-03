import { useProgress } from '@/hooks/useProgress';
import courseData from '@/data/course-ir.json';
import { Download, RefreshCw, Award, CheckCircle2 } from 'lucide-react';
import { QuizPanel } from '@/components/QuizPanel';

export default function SuccessScreen() {
  const { artifacts, currentStep, resetProgress } = useProgress();
  const isFinished = currentStep >= courseData.steps.length;

  const handleDownloadReport = async () => {
    const element = document.getElementById('report-content');
    if (!element) return;
    
    // @ts-ignore
    const html2pdf = (await import('html2pdf.js')).default;
    
    // Make visible temporarily for generation
    element.style.display = 'block';
    
    const opt = {
      margin: 1,
      filename: 'IR_Project_Report.pdf',
      image: { type: 'jpeg' as const, quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    html2pdf().set(opt as any).from(element).save().then(() => {
      element.style.display = 'none';
    });
  };

  return (
    <div className="flex flex-col items-center">
      {isFinished && (
        <>
          <div className="w-full">
            <QuizPanel isPostQuiz={true} />
          </div>
          
          <div className="max-w-4xl mx-auto p-6 md:p-12 pt-10 md:pt-16 pb-20 md:pb-32 border-t border-border flex flex-col items-center text-center w-full">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 md:mb-8 rotate-3 shadow-sm border border-primary/20">
              <Award className="w-10 h-10 md:w-12 md:h-12 text-primary" />
            </div>
            
            <span className="text-primary font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Mission Accomplished</span>
          <h2 className="text-3xl md:text-4xl font-black text-foreground mb-6 tracking-tight">Generate Final Dossier</h2>
          <p className="text-base md:text-lg text-muted-foreground mb-10 md:mb-12 max-w-2xl leading-relaxed">
            You have successfully completed the **Information Retrieval Engine** curriculum. Download your consolidated technical report containing all verified artifacts and implementation steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button
              onClick={handleDownloadReport}
              className="flex items-center justify-center gap-2 px-6 sm:px-10 py-4 sm:py-5 bg-primary text-primary-foreground font-black rounded-2xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/20 cursor-pointer uppercase tracking-widest text-xs"
            >
              <Download className="w-5 h-5" />
              Download Technical Report
            </button>
            
            <button
              onClick={resetProgress}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-4 sm:py-5 bg-card border border-border text-muted-foreground font-bold rounded-2xl hover:bg-secondary hover:text-foreground transition-all cursor-pointer uppercase tracking-widest text-xs"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Workspace
            </button>
          </div>

          <div className="mt-12 md:mt-16 w-full max-w-2xl bg-secondary p-6 md:p-8 rounded-3xl border border-border text-left">
            <h3 className="text-sm font-bold text-foreground uppercase tracking-widest mb-2">Resource Cleanup</h3>
            <p className="text-muted-foreground text-sm mb-6">Manage the resources provisioned during this project.</p>
            
            <div className="space-y-3">
              <label className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl cursor-pointer hover:border-primary transition-colors group">
                <input type="radio" name="cleanup" className="mt-1 text-primary focus:ring-primary cursor-pointer" defaultChecked />
                <div>
                  <div className="font-bold text-foreground text-sm">Keep All Resources</div>
                  <div className="text-muted-foreground group-hover:text-foreground text-xs mt-1 transition-colors">Retain the vector database and application code for future reference.</div>
                </div>
              </label>
              
              <label className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl cursor-pointer hover:border-primary transition-colors group">
                <input type="radio" name="cleanup" className="mt-1 text-primary focus:ring-primary cursor-pointer" />
                <div>
                  <div className="font-bold text-foreground text-sm">Delete Vectors Only</div>
                  <div className="text-muted-foreground group-hover:text-foreground text-xs mt-1 transition-colors">Destroy the Qdrant collections to save cloud costs, but keep the local code.</div>
                </div>
              </label>
              
              <label className="flex items-start gap-4 p-4 bg-card border border-border rounded-xl cursor-pointer hover:border-destructive transition-colors group">
                <input type="radio" name="cleanup" className="mt-1 text-destructive focus:ring-destructive cursor-pointer" />
                <div>
                  <div className="font-bold text-foreground text-sm">Delete Everything</div>
                  <div className="text-muted-foreground group-hover:text-foreground text-xs mt-1 transition-colors">Completely tear down the infrastructure and remove the project files.</div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </>
    )}

      {/* Hidden structured HTML for PDF generation */}
      <div id="report-content" className="hidden p-12 bg-white text-left max-w-4xl font-sans">
        <div className="text-center mb-16 border-b-4 border-slate-900 pb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Award className="w-8 h-8 text-blue-600" />
            <h1 className="text-xs font-black text-slate-400 uppercase tracking-[0.5em]">Completion Dossier</h1>
          </div>
          <h2 className="text-5xl font-black text-slate-900 tracking-tighter uppercase">{courseData.title}</h2>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
            <span>Verified by Belalia Mohamed Oussama</span>
            <span className="h-4 w-px bg-slate-200"></span>
            <span>{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
          </div>
        </div>

        <div className="space-y-16">
          {courseData.steps.map((step) => (
            <div key={step.id} className="relative pl-8" style={{ pageBreakInside: 'avoid' }}>
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-100"></div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Phase 0{step.id}</span>
                <h3 className="text-2xl font-black text-slate-900 tracking-tight">{step.title}</h3>
              </div>
              
              <div className="bg-slate-50 p-6 rounded-2xl mb-6 border border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Requirement Summary</p>
                <p className="text-slate-800 leading-relaxed text-sm">{step.task}</p>
              </div>
              
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <p className="text-[10px] font-bold text-slate-900 uppercase tracking-widest">Verified Artifact</p>
                </div>
                
                {step.artifact_type === 'image' && artifacts[step.id] ? (
                  <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
                    <img src={artifacts[step.id]} alt={`Step ${step.id} artifact`} className="w-full h-auto" />
                  </div>
                ) : artifacts[step.id] ? (
                  <div className="p-6 bg-slate-900 text-slate-300 border border-slate-800 rounded-2xl font-mono text-xs leading-relaxed">
                    {artifacts[step.id]}
                  </div>
                ) : (
                  <p className="text-slate-400 italic text-sm p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200 text-center">Data capture was not required or omitted for this phase.</p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 pt-12 border-t border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em]">End of Dossier</p>
        </div>
      </div>
    </div>
  );
}
