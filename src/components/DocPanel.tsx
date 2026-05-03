'use client';

import { useState } from 'react';
import { X, Maximize2, Minimize2, FileText, Search, Target, CheckCircle2, GraduationCap } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import courseData from '@/data/course-ir.json';
import { useProgress } from '@/hooks/useProgress';

export default function DocPanel() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const { artifacts } = useProgress();

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
              {/* Summary */}
              <section className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-1.5 w-1.5 rounded-full text-primary bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] text-foreground`}>Abstract</h2>
                </div>
                <div className="space-y-4">
                  {courseData.summary.split('\n\n').map((para, i) => (
                    <p key={i} className={`text-foreground leading-relaxed text-sm opacity-80`} dangerouslySetInnerHTML={{
                      __html: para.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold opacity-100">$1</strong>')
                    }} />
                  ))}
                </div>
              </section>

              {/* Objectives */}
              <section className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-1.5 w-1.5 rounded-full text-primary bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] text-foreground`}>Key Objectives</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {courseData.objectives.map((obj, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border border-border bg-card`}>
                      <Target className={`w-4 h-4 mt-0.5 text-primary`} />
                      <span className={`text-xs font-medium text-foreground`}>{obj.text}</span>
                    </div>
                  ))}
                </div>
              </section>

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

                    {/* Theory */}
                    <div className={`bg-card rounded-xl p-6 mb-6 border border-border`}>
                      <p className={`text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-3`}>Theoretical Context</p>
                      <div className="space-y-3">
                        {step.theory.split('\n\n').map((para, i) => (
                          <p key={i} className={`text-xs text-foreground leading-relaxed opacity-90`} dangerouslySetInnerHTML={{
                            __html: para
                              .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold opacity-100">$1</strong>')
                              .replace(/`(.+?)`/g, `<code class="bg-secondary px-1.5 py-0.5 rounded font-mono text-[10px]">$1</code>`)
                          }} />
                        ))}
                      </div>
                    </div>

                    {/* Task */}
                    <div className="mb-6">
                      <p className={`text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-2`}>Requirement</p>
                      <p className={`text-xs font-medium text-foreground leading-relaxed`} dangerouslySetInnerHTML={{
                        __html: step.task.replace(/`(.+?)`/g, `<code class="bg-secondary px-1.5 py-0.5 rounded font-mono text-[10px]">$1</code>`)
                      }} />
                    </div>

                    {/* Code */}
                    <div className="space-y-4">
                      {step.code_snippets.map((snippet, i) => (
                        <div key={i} className={`rounded-xl overflow-hidden border border-border shadow-sm`}>
                          <div className={`px-4 py-2 text-[10px] font-bold tracking-tight text-muted-foreground bg-card border-b border-border`}>
                            {snippet.filename}
                          </div>
                          <div className="text-[11px]">
                            <SyntaxHighlighter
                              language={snippet.language.toLowerCase()}
                              style={vscDarkPlus}
                              customStyle={{
                                margin: 0,
                                padding: '1.25rem',
                                background: '#1e1e1e',
                                fontSize: 'inherit',
                                lineHeight: '1.6',
                              }}
                              codeTagProps={{
                                style: {
                                  fontFamily: 'var(--font-mono)',
                                }
                              }}
                            >
                              {snippet.code}
                            </SyntaxHighlighter>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Artifact Status */}
                    {artifacts[step.id] && (
                      <div className={`flex items-center gap-2 mt-6 p-3 rounded-lg bg-primary/10 border border-primary/20 text-[10px] text-primary`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="font-bold uppercase tracking-wider">Verification Complete</span>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Technical Playbook - New Section for deep learning */}
              <section className={`mt-24 pt-16 border-t border-border`}>
                <div className="flex items-center gap-2 mb-8">
                  <div className={`h-1.5 w-1.5 rounded-full text-primary bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] text-foreground`}>Technical Playbook</h2>
                </div>
                
                <div className="space-y-8">
                  <div className={`bg-card rounded-2xl p-6 border border-border`}>
                    <h4 className={`text-sm font-black uppercase tracking-widest text-foreground mb-4`}>Testing Strategies</h4>
                    <div className="space-y-4 text-xs leading-relaxed opacity-80">
                      <p><strong className="text-primary">Unit Testing:</strong> Focus on verifying the mathematical correctness of your `BM25` and `TF-IDF` formulas. Isolated tests ensure your ranking logic is flawless before integration.</p>
                      <p><strong className="text-primary">Integration Testing:</strong> Verify that the `SearchEngine` correctly interfaces with the `FileParser`. Test with various file formats (CSV, Excel) to ensure data flow consistency.</p>
                      <p><strong className="text-primary">E2E Testing:</strong> Simulate a complete search flow. From the frontend input to the API response, ensure the user receives the expected results within a reasonable time (e.g., &lt; 200ms).</p>
                    </div>
                  </div>

                  <div className={`bg-card rounded-2xl p-6 border border-border`}>
                    <h4 className={`text-sm font-black uppercase tracking-widest text-foreground mb-4`}>Optimization Tips</h4>
                    <ul className="space-y-2 text-xs list-disc pl-4 opacity-80 text-foreground">
                      <li>Use **Stemming/Lemmatization** to reduce words to their root form (e.g., "running" → "run").</li>
                      <li>Implement **Stopword Filtering** to remove common words (e.g., "the", "a") that don't add semantic value.</li>
                      <li>Cache the **Inverted Index** in memory to avoid repeated file I/O operations during search.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* What You Learned */}
              <section className={`mt-20 pt-16 border-t border-dashed border-border`}>
                <div className="flex items-center gap-2 mb-8">
                  <div className={`h-1.5 w-1.5 rounded-full text-primary bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] text-foreground`}>Project Outcomes</h2>
                </div>
                <div className="space-y-3">
                  {courseData.learned.map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border border-border bg-card`}>
                      <GraduationCap className={`w-5 h-5 text-primary`} />
                      <span className={`text-sm font-semibold text-foreground`}>{item.text}</span>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
