import courseData from '@/data/course-ir.json';
import { Clock, Gauge, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function ProjectHeader() {
  return (
    <header className="max-w-4xl mx-auto px-8 pt-24 pb-16">
      {/* Decorative Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-primary/10 to-transparent -z-10 pointer-events-none"></div>

      {/* Badge Overlay */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            <div className="w-8 h-8 rounded-full border-2 border-background bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground shadow-sm">IR</div>
            <div className="w-8 h-8 rounded-full border-2 border-background bg-foreground flex items-center justify-center text-[10px] font-bold text-background shadow-sm">AI</div>
          </div>
          <div className="h-4 w-px bg-border"></div>
          <span className="text-primary text-[10px] font-bold uppercase tracking-[0.3em] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            Professional Curriculum
          </span>
        </div>
        <ThemeToggle />
      </div>

      {/* Title & Description */}
      <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1] mb-8 tracking-tighter">
        {courseData.title.split(' - ')[0]}
        <span className="block text-muted-foreground mt-2 font-light">{courseData.title.split(' - ')[1] || "Python Edition"}</span>
      </h1>
      <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 max-w-3xl">
        {courseData.description}
      </p>

      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center gap-x-12 gap-y-6 mb-16 p-8 bg-card rounded-3xl border border-border shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
            <Gauge className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Difficulty</span>
            <span className="text-foreground font-semibold leading-tight">{courseData.difficulty}</span>
          </div>
        </div>
        
        <div className="h-10 w-px bg-border hidden sm:block"></div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center text-accent-foreground">
            <Clock className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Est. Duration</span>
            <span className="text-foreground font-semibold leading-tight">{courseData.time}</span>
          </div>
        </div>

        <div className="h-10 w-px bg-border hidden sm:block"></div>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center text-secondary-foreground">
            <User className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Curriculum Lead</span>
            <span className="text-foreground font-semibold leading-tight">{courseData.author}</span>
          </div>
        </div>
      </div>

      {/* Core Stack */}
      <div className="flex items-center gap-6 py-6 border-y border-border">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest whitespace-nowrap">Core Stack</span>
        <div className="flex flex-wrap gap-2">
          {courseData.key_concepts.map((concept, i) => (
            <span key={i} className="text-[11px] font-bold text-foreground/80 px-4 py-1.5 bg-secondary rounded-full border border-border hover:bg-card hover:border-primary/50 hover:text-primary transition-all cursor-default">
              {concept}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
