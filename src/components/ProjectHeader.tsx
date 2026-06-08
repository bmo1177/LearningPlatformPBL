import courseData from '@/data/course-ir.json';
import { Clock, Gauge, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function ProjectHeader() {
  return (
    <header className="max-w-4xl mx-auto px-8 pt-24 pb-16 relative">
      {/* Subtle Warm Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[500px] bg-gradient-to-b from-primary/[0.06] via-primary/[0.02] to-transparent -z-10 pointer-events-none rounded-b-[3rem]"></div>

      {/* Badge Row */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2.5">
            <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-sm font-poppins">IR</div>
            <div className="w-8 h-8 rounded-full border-2 border-background bg-foreground flex items-center justify-center text-[10px] font-bold text-background shadow-sm font-poppins">AI</div>
          </div>
          <div className="h-4 w-px bg-border"></div>
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.2em] bg-primary/10 px-3 py-1 rounded-full border border-primary/20 font-poppins">
            Professional Curriculum
          </span>
        </div>
        <ThemeToggle />
      </div>

      {/* Title */}
      <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1] mb-6 tracking-tighter font-poppins">
        {courseData.title.split(' - ')[0]}
        <span className="block text-muted-foreground mt-2 font-light text-3xl md:text-4xl tracking-tight">{courseData.title.split(' - ')[1] || "Python Edition"}</span>
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed mb-14 max-w-3xl">
        {courseData.description}
      </p>

      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center gap-x-10 gap-y-6 mb-14 p-7 bg-card rounded-3xl border border-border shadow-sm">
        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Gauge className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] font-poppins">Difficulty</span>
            <span className="text-foreground font-semibold leading-tight">{courseData.difficulty}</span>
          </div>
        </div>
        
        <div className="h-8 w-px bg-border hidden sm:block"></div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary/70">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] font-poppins">Duration</span>
            <span className="text-foreground font-semibold leading-tight">{courseData.time}</span>
          </div>
        </div>

        <div className="h-8 w-px bg-border hidden sm:block"></div>

        <div className="flex items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
            <User className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] font-poppins">Lead</span>
            <span className="text-foreground font-semibold leading-tight">{courseData.author}</span>
          </div>
        </div>
      </div>

      {/* Concept Tags */}
      <div className="flex items-center gap-6 py-5 border-y border-border">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] whitespace-nowrap font-poppins">Core Stack</span>
        <div className="flex flex-wrap gap-2">
          {courseData.key_concepts.map((concept, i) => (
            <span key={i} className="text-[11px] font-semibold text-foreground/70 px-4 py-1.5 bg-secondary rounded-full border border-border/60 hover:bg-card hover:border-primary/40 hover:text-primary transition-all duration-200 cursor-default">
              {concept}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
