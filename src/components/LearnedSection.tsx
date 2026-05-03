import courseData from '@/data/course-ir.json';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

export default function LearnedSection() {
  return (
    <section className="max-w-4xl mx-auto px-8 py-24 border-t border-slate-200/60">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-blue-500/30"></div>
          <h2 className="text-xs font-bold text-blue-600 uppercase tracking-[0.4em]">Learning Outcomes</h2>
          <div className="h-px w-8 bg-blue-500/30"></div>
        </div>
        <p className="text-3xl font-semibold text-slate-900 tracking-tight">Technical Mastery & Workflow</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courseData.learned.map((item, i) => (
          <div 
            key={i} 
            className="group relative flex items-start gap-5 p-8 bg-white rounded-3xl border border-slate-200/60 hover:border-blue-300/50 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-blue-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
            
            <div className="relative p-3 bg-slate-50 rounded-2xl group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors duration-300">
              <GraduationCap className="w-6 h-6 text-slate-500 group-hover:text-blue-600" />
            </div>
            
            <div className="relative flex-1">
              <h3 className="text-slate-900 font-semibold mb-2 group-hover:text-blue-900 transition-colors">
                {item.text.split(' - ')[0]}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-4">
                {item.text.split(' - ')[1] || "Master industrial-grade search engine development workflows."}
              </p>
              
              <div className="flex items-center gap-2 px-3 py-1 w-fit bg-emerald-50 rounded-full border border-emerald-100">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Mastery Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
