'use client';

import { useState } from 'react';
import { Copy, Check, FileCode } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

type CodeSnippetType = {
  filename: string;
  language: string;
  code: string;
};

export default function CodeBlock({ snippet }: { snippet: CodeSnippetType }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-sm mb-6 group">
      {/* Header Bar */}
      <div className="flex items-center justify-between bg-slate-900 px-5 py-3">
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-slate-500" />
          <span className="text-xs font-medium text-slate-400 tracking-tight">{snippet.filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
      {/* Code Body */}
      <div className="bg-[#0f1117] overflow-x-auto text-[13px]">
        <SyntaxHighlighter
          language={snippet.language.toLowerCase()}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1.5rem',
            background: 'transparent',
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
  );
}
