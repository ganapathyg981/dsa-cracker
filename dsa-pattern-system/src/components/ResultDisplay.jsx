import React, { useState } from 'react';
import { CheckCircle, Copy, Check } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const ResultDisplay = ({ result, onReset, onBackToMenu }) => {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(result.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
          <CheckCircle className="text-green-600" size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{result.pattern}</h2>
          <p className="text-gray-500 text-sm">Perfect match found!</p>
        </div>
      </div>

      {result.whenToUse && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-4 mb-6 rounded-xl">
          <h3 className="font-bold text-green-800 mb-2 flex items-center gap-2">
            ✅ Use this pattern when:
          </h3>
          <pre className="text-sm text-green-700 whitespace-pre-wrap font-medium leading-relaxed">
            {result.whenToUse}
          </pre>
        </div>
      )}

      <div className="bg-[#1e1e1e] rounded-xl overflow-hidden mb-6">
        <div className="flex items-center justify-between px-4 py-3 bg-[#252526] border-b border-[#3c3c3c]">
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">Java</span>
            <span className="text-gray-400 text-sm">Code Template</span>
          </div>
          <button
            onClick={copyCode}
            className="flex items-center gap-1.5 px-3 py-1.5 text-gray-400 hover:text-white hover:bg-[#3c3c3c] rounded-lg transition-all text-sm"
          >
            {copied ? (
              <>
                <Check size={14} className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <SyntaxHighlighter
          language="java"
          style={vscDarkPlus}
          showLineNumbers={true}
          wrapLines={true}
          customStyle={{
            margin: 0,
            padding: '1rem',
            fontSize: '14px',
            lineHeight: '1.6',
            background: '#1e1e1e',
          }}
          lineNumberStyle={{
            minWidth: '2.5em',
            paddingRight: '1em',
            color: '#6e7681',
            textAlign: 'right',
            userSelect: 'none',
          }}
        >
          {result.code}
        </SyntaxHighlighter>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3 text-lg flex items-center gap-2">
          📝 Practice with these problems:
        </h3>
        <div className="grid md:grid-cols-2 gap-2">
          {result.problems.map((problem, idx) => (
            <div key={idx} className="bg-gradient-to-r from-purple-50 to-violet-50 border border-purple-200 px-4 py-3 rounded-xl hover:shadow-md transition-all">
              <span className="text-purple-800 font-medium">{problem}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5"
        >
          Try Another Problem
        </button>
        <button
          onClick={onBackToMenu}
          className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all font-semibold"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;
