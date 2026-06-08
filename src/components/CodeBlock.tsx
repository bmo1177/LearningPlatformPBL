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
    <div className="rounded-2xl overflow-hidden border border-[#2a2b36] shadow-lg mb-6 group">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2b36]" style={{ background: '#1e1f29' }}>
        <div className="flex items-center gap-2">
          <FileCode className="w-4 h-4 text-[#636d83]" />
          <span className="text-xs font-medium text-[#9aa5b4] tracking-tight font-mono">{snippet.filename}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-[#636d83] hover:text-[#e4e8f0] transition-colors cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-[#7ec699]" />
              <span className="text-[#7ec699]">Copied</span>
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
      <div className="overflow-x-auto text-[13px]" style={{ background: '#1e1f29' }}>
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
              fontFamily: "'Consolas', 'Monaco', 'Andale Mono', 'Ubuntu Mono', monospace",
            }
          }}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}
