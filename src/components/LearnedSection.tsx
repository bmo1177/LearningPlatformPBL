import courseData from '@/data/course-ir.json';
import { GraduationCap, CheckCircle2 } from 'lucide-react';

export default function LearnedSection() {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-8 py-16 md:py-24 border-t border-border">
      <div className="flex flex-col items-center text-center mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px w-8 bg-primary/30"></div>
          <h2 className="text-xs font-bold text-primary uppercase tracking-[0.4em]">Learning Outcomes</h2>
          <div className="h-px w-8 bg-primary/30"></div>
        </div>
        <p className="text-3xl font-semibold text-foreground tracking-tight">Technical Mastery & Workflow</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {courseData.learned.map((item, i) => (
          <div 
            key={i} 
            className="group relative flex items-start gap-5 p-6 md:p-8 bg-card rounded-2xl md:rounded-3xl border border-border hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute top-0 right-0 -mr-8 -mt-8 w-24 h-24 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-2xl"></div>
            
            <div className="relative p-3 bg-secondary rounded-2xl group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-300 text-muted-foreground">
              <GraduationCap className="w-6 h-6 group-hover:text-primary" />
            </div>
            
            <div className="relative flex-1">
              <h3 className="text-foreground font-semibold mb-2 group-hover:text-primary transition-colors">
                {item.text.split(' - ')[0]}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {item.text.split(' - ')[1] || "Master industrial-grade search engine development workflows."}
              </p>
              
              <div className="flex items-center gap-2 px-3 py-1 w-fit bg-primary/10 rounded-full border border-primary/20">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" />
                <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Mastery Verified</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
