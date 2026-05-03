'use client';

import { useState } from 'react';
import { X, Maximize2, Minimize2, FileText, Search, Target, CheckCircle2, GraduationCap } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import courseData from '@/data/course-ir.json';
import { useProgress } from '@/hooks/useProgress';

const themes = {
  light: {
    name: 'Light',
    bg: 'bg-white',
    text: 'text-slate-900',
    muted: 'text-slate-500',
    accent: 'text-blue-600',
    border: 'border-slate-200',
    card: 'bg-slate-50',
    coverBg: 'bg-gradient-to-br from-slate-100 to-white',
    coverText: 'text-slate-900',
    coverAccent: 'text-blue-600',
    codeBg: 'bg-slate-100',
    codeText: 'text-slate-800',
    chip: 'bg-slate-100 text-slate-800',
  },
  dark: {
    name: 'Dark',
    bg: 'bg-[#0f1117]',
    text: 'text-slate-200',
    muted: 'text-slate-500',
    accent: 'text-blue-400',
    border: 'border-slate-800',
    card: 'bg-[#1a1f2e]',
    coverBg: 'bg-gradient-to-br from-[#050608] to-[#0f1117]',
    coverText: 'text-white',
    coverAccent: 'text-blue-400',
    codeBg: 'bg-[#050608]',
    codeText: 'text-emerald-400',
    chip: 'bg-slate-800 text-slate-300',
  },
  warm: {
    name: 'Warm',
    bg: 'bg-[#faf9f6]',
    text: 'text-[#2a2622]',
    muted: 'text-[#7a746e]',
    accent: 'text-[#966d4a]',
    border: 'border-[#e6e2de]',
    card: 'bg-[#f0ede9]',
    coverBg: 'bg-gradient-to-br from-[#e6e2de] to-[#faf9f6]',
    coverText: 'text-[#2a2622]',
    coverAccent: 'text-[#966d4a]',
    codeBg: 'bg-[#e6e2de]',
    codeText: 'text-[#4a3a2e]',
    chip: 'bg-[#e6e2de] text-[#4a3a2e]',
  },
  ocean: {
    name: 'Ocean',
    bg: 'bg-[#f4faff]',
    text: 'text-[#1e2d3d]',
    muted: 'text-[#64748b]',
    accent: 'text-[#0ea5e9]',
    border: 'border-[#e0f2fe]',
    card: 'bg-[#f0f9ff]',
    coverBg: 'bg-gradient-to-br from-[#e0f2fe] to-[#f4faff]',
    coverText: 'text-[#1e2d3d]',
    coverAccent: 'text-[#0ea5e9]',
    codeBg: 'bg-[#e0f2fe]',
    codeText: 'text-[#0369a1]',
    chip: 'bg-[#e0f2fe] text-[#0369a1]',
  },
};

type ThemeKey = keyof typeof themes;

export default function DocPanel() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [theme, setTheme] = useState<ThemeKey>('light');
  const { artifacts } = useProgress();
  const t = themes[theme];

  return (
    <>
      {/* Floating Trigger Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-5 py-3 bg-white border border-slate-200 rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer group"
      >
        <FileText className="w-5 h-5 text-blue-600" />
        <span className="font-semibold text-slate-800 text-sm">Documentation</span>
      </button>

      {/* Overlay */}
      {open && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 transition-opacity" onClick={() => setOpen(false)} />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 h-screen z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) shadow-2xl ${
          open ? 'translate-x-0' : 'translate-x-full'
        } ${expanded ? 'w-full' : 'w-[560px]'}`}
      >
        <div className={`h-full flex flex-col ${t.bg}`}>
          {/* Panel Header */}
          <div className={`flex items-center justify-between px-6 py-4 border-b ${t.border}`}>
            <div className="flex items-center gap-2">
              <FileText className={`w-4 h-4 ${t.accent}`} />
              <span className={`font-bold text-sm uppercase tracking-widest ${t.text}`}>Project Dossier</span>
            </div>
            <div className="flex items-center gap-1">
              {/* Theme Selector */}
              <div className="flex items-center gap-1 mr-4 bg-slate-100/50 p-1 rounded-lg">
                {(Object.keys(themes) as ThemeKey[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setTheme(key)}
                    className={`px-2 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md transition-all cursor-pointer ${
                      theme === key
                        ? 'bg-white shadow-sm text-blue-600'
                        : `text-slate-400 hover:text-slate-600`
                    }`}
                  >
                    {themes[key].name}
                  </button>
                ))}
              </div>
              <button onClick={() => setExpanded(!expanded)} className={`p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${t.text}`}>
                {expanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
              <button onClick={() => setOpen(false)} className={`p-2 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer ${t.text}`}>
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Panel Body — Scrollable Document */}
          <div className="flex-1 overflow-y-auto scroll-smooth">
            {/* Cover Page */}
            <div className={`${t.coverBg} px-12 py-24 text-center relative overflow-hidden`}>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50"></div>
              <div className={`w-20 h-20 mx-auto mb-8 rounded-2xl flex items-center justify-center shadow-xl ${theme === 'dark' ? 'bg-slate-800' : 'bg-white'}`}>
                <Search className={`w-10 h-10 ${t.coverAccent}`} />
              </div>
              <h1 className={`text-4xl font-black ${t.coverText} uppercase tracking-tighter leading-none mb-6`}>
                {courseData.title.split(' ').map((word, i) => (
                  <span key={i} className="block">{word}</span>
                ))}
              </h1>
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className={`h-px w-6 ${t.border}`}></span>
                <p className={`text-xs ${t.coverAccent} font-bold uppercase tracking-[0.2em]`}>
                  {courseData.author}
                </p>
                <span className={`h-px w-6 ${t.border}`}></span>
              </div>
              <p className={`text-xs ${t.muted} uppercase tracking-widest font-medium`}>
                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </p>
            </div>

            {/* Document Content */}
            <div className="px-12 py-12 max-w-2xl mx-auto">
              {/* Summary */}
              <section className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-1.5 w-1.5 rounded-full ${t.accent} bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${t.text}`}>Abstract</h2>
                </div>
                <div className="space-y-4">
                  {courseData.summary.split('\n\n').map((para, i) => (
                    <p key={i} className={`${t.text} leading-relaxed text-sm opacity-80`} dangerouslySetInnerHTML={{
                      __html: para.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold opacity-100">$1</strong>')
                    }} />
                  ))}
                </div>
              </section>

              {/* Objectives */}
              <section className="mb-16">
                <div className="flex items-center gap-2 mb-6">
                  <div className={`h-1.5 w-1.5 rounded-full ${t.accent} bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${t.text}`}>Key Objectives</h2>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {courseData.objectives.map((obj, i) => (
                    <div key={i} className={`flex items-start gap-3 p-3 rounded-xl border ${t.border} ${t.card}`}>
                      <Target className={`w-4 h-4 mt-0.5 ${t.accent}`} />
                      <span className={`text-xs font-medium ${t.text}`}>{obj.text}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Steps */}
              <div className="space-y-16">
                {courseData.steps.map((step) => (
                  <section key={step.id} className="relative">
                    <div className="absolute -left-6 top-0 bottom-0 w-px bg-slate-200/50"></div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className={`h-2 w-2 rounded-full ${t.accent} bg-current -ml-[27px] ring-4 ${t.bg}`}></div>
                      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${t.accent}`}>Phase {step.id}</span>
                    </div>
                    <h3 className={`text-xl font-black ${t.text} mb-6 tracking-tight`}>{step.title}</h3>

                    {/* Theory */}
                    <div className={`${t.card} rounded-xl p-6 mb-6 border ${t.border}`}>
                      <p className={`text-[10px] font-bold ${t.muted} uppercase tracking-widest mb-3`}>Theoretical Context</p>
                      <div className="space-y-3">
                        {step.theory.split('\n\n').map((para, i) => (
                          <p key={i} className={`text-xs ${t.text} leading-relaxed opacity-90`} dangerouslySetInnerHTML={{
                            __html: para
                              .replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold opacity-100">$1</strong>')
                              .replace(/`(.+?)`/g, `<code class="${t.codeBg} px-1.5 py-0.5 rounded font-mono text-[10px]">$1</code>`)
                          }} />
                        ))}
                      </div>
                    </div>

                    {/* Task */}
                    <div className="mb-6">
                      <p className={`text-[10px] font-bold ${t.muted} uppercase tracking-widest mb-2`}>Requirement</p>
                      <p className={`text-xs font-medium ${t.text} leading-relaxed`} dangerouslySetInnerHTML={{
                        __html: step.task.replace(/`(.+?)`/g, `<code class="${t.codeBg} px-1.5 py-0.5 rounded font-mono text-[10px]">$1</code>`)
                      }} />
                    </div>

                    {/* Code */}
                    <div className="space-y-4">
                      {step.code_snippets.map((snippet, i) => (
                        <div key={i} className={`rounded-xl overflow-hidden border ${t.border} shadow-sm`}>
                          <div className={`px-4 py-2 text-[10px] font-bold tracking-tight ${t.muted} ${t.card} border-b ${t.border}`}>
                            {snippet.filename}
                          </div>
                          <div className="text-[11px]">
                            <SyntaxHighlighter
                              language={snippet.language.toLowerCase()}
                              style={vscDarkPlus}
                              customStyle={{
                                margin: 0,
                                padding: '1.25rem',
                                background: theme === 'dark' ? 'transparent' : '#1e1e1e',
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
                      <div className={`flex items-center gap-2 mt-6 p-3 rounded-lg bg-emerald-50/50 border border-emerald-100 text-[10px] text-emerald-700`}>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="font-bold uppercase tracking-wider">Verification Complete</span>
                      </div>
                    )}
                  </section>
                ))}
              </div>

              {/* Technical Playbook - New Section for deep learning */}
              <section className="mt-24 pt-16 border-t border-slate-200">
                <div className="flex items-center gap-2 mb-8">
                  <div className={`h-1.5 w-1.5 rounded-full ${t.accent} bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${t.text}`}>Technical Playbook</h2>
                </div>
                
                <div className="space-y-8">
                  <div className={`${t.card} rounded-2xl p-6 border ${t.border}`}>
                    <h4 className={`text-sm font-black uppercase tracking-widest ${t.text} mb-4`}>Testing Strategies</h4>
                    <div className="space-y-4 text-xs leading-relaxed opacity-80">
                      <p><strong className={t.accent}>Unit Testing:</strong> Focus on verifying the mathematical correctness of your `BM25` and `TF-IDF` formulas. Isolated tests ensure your ranking logic is flawless before integration.</p>
                      <p><strong className={t.accent}>Integration Testing:</strong> Verify that the `SearchEngine` correctly interfaces with the `FileParser`. Test with various file formats (CSV, Excel) to ensure data flow consistency.</p>
                      <p><strong className={t.accent}>E2E Testing:</strong> Simulate a complete search flow. From the frontend input to the API response, ensure the user receives the expected results within a reasonable time (e.g., &lt; 200ms).</p>
                    </div>
                  </div>

                  <div className={`${t.card} rounded-2xl p-6 border ${t.border}`}>
                    <h4 className={`text-sm font-black uppercase tracking-widest ${t.text} mb-4`}>Optimization Tips</h4>
                    <ul className="space-y-2 text-xs list-disc pl-4 opacity-80">
                      <li>Use **Stemming/Lemmatization** to reduce words to their root form (e.g., "running" → "run").</li>
                      <li>Implement **Stopword Filtering** to remove common words (e.g., "the", "a") that don't add semantic value.</li>
                      <li>Cache the **Inverted Index** in memory to avoid repeated file I/O operations during search.</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* What You Learned */}
              <section className="mt-20 pt-16 border-t border-dashed border-slate-200">
                <div className="flex items-center gap-2 mb-8">
                  <div className={`h-1.5 w-1.5 rounded-full ${t.accent} bg-current`}></div>
                  <h2 className={`text-xs font-black uppercase tracking-[0.3em] ${t.text}`}>Project Outcomes</h2>
                </div>
                <div className="space-y-3">
                  {courseData.learned.map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-xl border ${t.border}`}>
                      <GraduationCap className={`w-5 h-5 ${t.accent}`} />
                      <span className={`text-sm font-semibold ${t.text}`}>{item.text}</span>
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
