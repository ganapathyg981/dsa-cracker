import React, { useState } from 'react';
import { Clock, Database, Copy, Check, Play } from 'lucide-react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CodeTemplate = ({ template, index }) => {
  const [activeLanguage, setActiveLanguage] = useState('java');
  const [copiedCode, setCopiedCode] = useState(null);

  const copyToClipboard = async (code, type) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(type);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const getCode = () => activeLanguage === 'java' ? template.java : template.python;
  const getLanguage = () => activeLanguage === 'java' ? 'java' : 'python';

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm bg-white dark:bg-gray-800">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 px-3 sm:px-5 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm sm:text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-500 rounded-lg flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0">
                {index + 1}
              </span>
              <span className="truncate">{template.name}</span>
            </h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 line-clamp-2">{template.description}</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 text-[10px] sm:text-xs flex-shrink-0">
            <span className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-emerald-500/20 text-emerald-400 rounded-lg">
              <Clock size={10} className="sm:w-3 sm:h-3" />
              {template.timeComplexity}
            </span>
            <span className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-1 sm:py-1.5 bg-purple-500/20 text-purple-400 rounded-lg">
              <Database size={10} className="sm:w-3 sm:h-3" />
              {template.spaceComplexity}
            </span>
          </div>
        </div>
      </div>

      {/* Language Toggle */}
      <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-slate-800 border-b border-slate-700">
        <div className="flex gap-1">
          <button
            onClick={() => setActiveLanguage('java')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeLanguage === 'java'
                ? 'bg-orange-500 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Java
          </button>
          <button
            onClick={() => setActiveLanguage('python')}
            className={`px-2 sm:px-3 py-1 sm:py-1.5 text-xs sm:text-sm font-medium rounded-lg transition-all ${
              activeLanguage === 'python'
                ? 'bg-blue-500 text-white'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            Python
          </button>
        </div>
        <button
          onClick={() => copyToClipboard(getCode(), activeLanguage)}
          className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 text-slate-400 hover:text-white hover:bg-slate-700 rounded-lg transition-all text-xs sm:text-sm"
          title={`Copy ${activeLanguage === 'java' ? 'Java' : 'Python'} code`}
        >
          {copiedCode === activeLanguage ? (
            <>
              <Check size={12} className="sm:w-3.5 sm:h-3.5 text-green-400" />
              <span className="text-green-400 hidden xs:inline">Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} className="sm:w-3.5 sm:h-3.5" />
              <span className="hidden xs:inline">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code Block with Syntax Highlighting */}
      <div className="relative">
        <SyntaxHighlighter
          language={getLanguage()}
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
          {getCode().trim()}
        </SyntaxHighlighter>
      </div>

      {/* Test Case */}
      {template.testCase && (
        <div className="border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-slate-50 to-gray-50 dark:from-gray-800 dark:to-gray-800 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center flex-shrink-0">
              <Play size={16} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="space-y-2 text-sm flex-1">
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-16">Input:</span>
                <code className="bg-slate-200 dark:bg-slate-700 px-2.5 py-1 rounded-lg text-slate-800 dark:text-slate-200 font-mono text-xs">
                  {template.testCase.input}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-16">Output:</span>
                <code className="bg-green-100 dark:bg-green-900/40 px-2.5 py-1 rounded-lg text-green-800 dark:text-green-300 font-mono text-xs font-bold">
                  {template.testCase.output}
                </code>
              </div>
              {template.testCase.explanation && (
                <div className="flex items-start gap-2 mt-2 p-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg border border-amber-100 dark:border-amber-700">
                  <span className="text-amber-500 dark:text-amber-400">💡</span>
                  <span className="text-gray-600 dark:text-gray-400 text-xs">{template.testCase.explanation}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CodeTemplate;
