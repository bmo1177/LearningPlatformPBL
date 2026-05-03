import courseData from '@/data/course-ir.json';
import { Clock, Gauge, User } from 'lucide-react';

export default function ProjectHeader() {
  return (
    <header className="max-w-4xl mx-auto px-8 pt-24 pb-16">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-blue-50/50 to-transparent -z-10 pointer-events-none"></div>

      {/* Badge Overlay */}
      <div className="flex items-center gap-3 mb-8">
        <div className="flex -space-x-2">
          <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">IR</div>
          <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white shadow-sm">AI</div>
        </div>
        <div className="h-4 w-px bg-slate-200"></div>
        <span className="text-blue-600 text-[10px] font-bold uppercase tracking-[0.3em] bg-blue-50 px-3 py-1 rounded-full border border-blue-100/50">
          Professional Curriculum
        </span>
      </div>

      {/* Title & Description */}
      <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1] mb-8 tracking-tighter">
        {courseData.title.split(' - ')[0]}
        <span className="block text-slate-400 mt-2 font-light">{courseData.title.split(' - ')[1] || "Python Edition"}</span>
      </h1>
      <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-12 max-w-3xl">
        {courseData.description}
      </p>

      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mb-16 p-8 bg-white rounded-3xl border border-slate-200/60 shadow-xl shadow-slate-200/20">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <Gauge className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Difficulty</span>
            <span className="text-slate-900 font-semibold leading-tight">{courseData.difficulty}</span>
          </div>
        </div>
        
        <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Est. Duration</span>
            <span className="text-slate-900 font-semibold leading-tight">{courseData.time}</span>
          </div>
        </div>

        <div className="h-10 w-px bg-slate-100 hidden sm:block"></div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600">
            <User className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Curriculum Lead</span>
            <span className="text-slate-900 font-semibold leading-tight">{courseData.author}</span>
          </div>
        </div>
      </div>

      {/* Core Stack */}
      <div className="flex items-center gap-6 py-6 border-y border-slate-100/80">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">Core Stack</span>
        <div className="flex flex-wrap gap-2">
          {courseData.key_concepts.map((concept, i) => (
            <span key={i} className="text-[11px] font-bold text-slate-700 px-4 py-1.5 bg-slate-100 rounded-full border border-slate-200 hover:bg-white hover:border-blue-200 hover:text-blue-700 transition-all cursor-default">
              {concept}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
