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
          
          <div className="max-w-4xl mx-auto p-12 pt-16 pb-32 border-t border-slate-100 flex flex-col items-center text-center w-full">
            <div className="w-24 h-24 bg-blue-50 rounded-2xl flex items-center justify-center mb-8 rotate-3 shadow-sm border border-blue-100">
              <Award className="w-12 h-12 text-blue-600" />
            </div>
            
            <span className="text-blue-600 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Mission Accomplished</span>
          <h2 className="text-4xl font-black text-slate-900 mb-6 tracking-tight">Generate Final Dossier</h2>
          <p className="text-lg text-slate-600 mb-12 max-w-2xl leading-relaxed">
            You have successfully completed the **Information Retrieval Engine** curriculum. Download your consolidated technical report containing all verified artifacts and implementation steps.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 px-10 py-5 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 transition-all shadow-lg hover:shadow-blue-200/50 cursor-pointer uppercase tracking-widest text-xs"
            >
              <Download className="w-5 h-5" />
              Download Technical Report
            </button>
            
            <button
              onClick={resetProgress}
              className="flex items-center gap-2 px-8 py-5 bg-white border border-slate-200 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-all cursor-pointer uppercase tracking-widest text-xs"
            >
              <RefreshCw className="w-4 h-4" />
              Reset Workspace
            </button>
          </div>

          <div className="mt-16 w-full max-w-2xl bg-slate-50 p-8 rounded-3xl border border-slate-200 text-left">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Resource Cleanup</h3>
            <p className="text-slate-500 text-sm mb-6">Manage the resources provisioned during this project.</p>
            
            <div className="space-y-3">
              <label className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                <input type="radio" name="cleanup" className="mt-1 text-blue-600 focus:ring-blue-500 cursor-pointer" defaultChecked />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Keep All Resources</div>
                  <div className="text-slate-500 text-xs mt-1">Retain the vector database and application code for future reference.</div>
                </div>
              </label>
              
              <label className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 transition-colors">
                <input type="radio" name="cleanup" className="mt-1 text-blue-600 focus:ring-blue-500 cursor-pointer" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Delete Vectors Only</div>
                  <div className="text-slate-500 text-xs mt-1">Destroy the Qdrant collections to save cloud costs, but keep the local code.</div>
                </div>
              </label>
              
              <label className="flex items-start gap-4 p-4 bg-white border border-slate-200 rounded-xl cursor-pointer hover:border-red-400 transition-colors">
                <input type="radio" name="cleanup" className="mt-1 text-red-600 focus:ring-red-500 cursor-pointer" />
                <div>
                  <div className="font-bold text-slate-900 text-sm">Delete Everything</div>
                  <div className="text-slate-500 text-xs mt-1">Completely tear down the infrastructure and remove the project files.</div>
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
