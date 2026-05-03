'use client';

import { useState } from 'react';
import { X, Maximize2, Minimize2, FileText, Search, Target, CheckCircle2, GraduationCap } from 'lucide-react';
import courseData from '@/data/course-ir.json';
import { useProgress } from '@/hooks/useProgress';

export default function DocPanel() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { artifacts, reflections } = useProgress();

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-card border border-border rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
      >
        <FileText className="w-5 h-5 text-primary" />
        <span className="font-semibold text-foreground text-sm">Documentation</span>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity" onClick={() => setOpen(false)} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-screen z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        } ${expanded ? 'w-full' : 'w-full md:w-[560px]'}`}
      >
        <div className={`h-full flex flex-col bg-background`}>
          {/* Panel Header */}
          <div className={`flex items-center justify-between px-4 md:px-6 py-4 border-b border-border`}>
            <div className="flex items-center gap-2">
              <FileText className={`w-4 h-4 text-primary`} />
              <span className={`font-bold text-sm uppercase tracking-widest text-foreground`}>Project Dossier</span>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setExpanded(!expanded)} className={`hidden md:block p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer text-foreground`}>
                {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setOpen(false)} className={`p-2 rounded-lg hover:bg-secondary transition-colors cursor-pointer text-foreground`}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel Body — Scrollable Document */}
          <div className="flex-1 overflow-y-auto scroll-smooth">
            {/* Cover Page */}
            <div className={`bg-secondary/30 px-6 md:px-12 py-16 md:py-24 text-center relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
              <div className={`w-16 h-16 md:w-20 md:h-20 mx-auto mb-6 md:mb-8 rounded-2xl flex items-center justify-center shadow-xl bg-card border border-border`}>
                <Search className={`w-8 h-8 md:w-10 md:h-10 text-primary`} />
              </div>
              <h1 className={`text-3xl md:text-4xl font-black text-foreground uppercase tracking-tighter leading-none mb-6`}>
                {courseData.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className={`h-px w-6 bg-border`}></span>
                <p className={`text-[10px] md:text-xs text-primary font-bold uppercase tracking-[0.2em]`}>
                  {courseData.author}
                </p>
                <span className={`h-px w-6 bg-border`}></span>
              </div>
              <p className={`text-[10px] md:text-xs text-muted-foreground uppercase tracking-widest font-medium`}>
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Document Content */}
            <div className="px-6 md:px-12 py-8 md:py-12 max-w-2xl mx-auto">


              {/* Steps */}
              <div className="space-y-16">
                {courseData.steps.map((step) => (
                  <section key={step.id} className="relative">
                    <div className={`absolute -left-6 top-0 bottom-0 w-px bg-border`}></div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`h-2 w-2 rounded-full text-primary bg-current -ml-[27px] ring-4 ring-background`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-primary`}>Phase {step.id}</span>
                    </div>
                    <h3 className={`text-xl font-black text-foreground mb-6 tracking-tight`}>{step.title}</h3>

                    {/* Task */}
                    <div className="mb-6">
                      <p className={`text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2`}>Requirement</p>
                      <p className={`text-xs font-medium text-foreground leading-relaxed`} dangerouslySetInnerHTML={{
                        __html: step.task.replace(/`(.+?)`/g, `<code class="bg-secondary px-1.5 py-0.5 rounded font-mono text-[10px]">$1</code>`)
                      }} />
                    </div>

                    {/* Artifact Status */}
                    {artifacts[step.id] && (
                      <div className="mt-6">
                        <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg bg-primary/10 border border-primary/20 text-[10px] text-primary`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span className="font-bold uppercase tracking-wider">Verification Complete</span>
                        </div>
                        {step.artifact_type === 'image' ? (
                          <div className="rounded-xl overflow-hidden border border-border shadow-sm">
                            <img src={artifacts[step.id]} alt={`Step ${step.id} artifact`} className="w-full h-auto" />
                          </div>
                        ) : (
                          <div className="p-4 bg-secondary text-foreground border border-border rounded-xl font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre-wrap">
                            {artifacts[step.id]}
                          </div>
                        )}
                      </div>
                    )}
                    {/* User Reflection */}
                    {reflections[step.id] && (
                      <div className="mt-6">
                        <p className={`text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3`}>Learner Reflection</p>
                        <div className="p-5 bg-card/50 text-foreground border border-border rounded-xl text-sm leading-relaxed whitespace-pre-wrap italic shadow-inner">
                          "{reflections[step.id]}"
                        </div>
                      </div>
                    )}
                  </section>
                ))}
              </div>


            </div>
          </div>
        </div>
      </div>
    </>
  );
}
