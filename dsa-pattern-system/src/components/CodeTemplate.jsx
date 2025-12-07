import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Clock, Database, Copy, Check, Play } from 'lucide-react';

const CodeTemplate = ({ template, index }) => {
  const [showPython, setShowPython] = useState(false);
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

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-blue-400">#{index + 1}</span>
              {template.name}
            </h3>
            <p className="text-gray-400 text-sm mt-1">{template.description}</p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-green-400">
              <Clock size={12} />
              {template.timeComplexity}
            </span>
            <span className="flex items-center gap-1 text-purple-400">
              <Database size={12} />
              {template.spaceComplexity}
            </span>
          </div>
        </div>
      </div>

      {/* Java Code (Primary) */}
      <div className="relative">
        <div className="absolute top-3 left-4 flex items-center gap-2">
          <span className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded">Java</span>
          <span className="text-gray-500 text-xs">Primary</span>
        </div>
        <button
          onClick={() => copyToClipboard(template.java, 'java')}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
          title="Copy Java code"
        >
          {copiedCode === 'java' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
        </button>
        <pre className="bg-gray-900 p-4 pt-12 overflow-x-auto">
          <code className="text-sm text-gray-300 font-mono leading-relaxed">{template.java}</code>
        </pre>
      </div>

      {/* Python Code (Collapsible) */}
      <div className="border-t border-gray-700">
        <button
          onClick={() => setShowPython(!showPython)}
          className="w-full px-5 py-3 bg-gray-800 flex items-center justify-between text-gray-300 hover:bg-gray-750 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm">
            {showPython ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            <span className="px-2 py-0.5 bg-blue-600 text-white text-xs font-medium rounded">Python</span>
            <span className="text-gray-500">Alternative implementation</span>
          </span>
          <span className="text-xs text-gray-500">
            {showPython ? 'Click to collapse' : 'Click to expand'}
          </span>
        </button>
        
        {showPython && (
          <div className="relative">
            <button
              onClick={() => copyToClipboard(template.python, 'python')}
              className="absolute top-3 right-3 p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
              title="Copy Python code"
            >
              {copiedCode === 'python' ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
            <pre className="bg-gray-900 p-4 overflow-x-auto">
              <code className="text-sm text-gray-300 font-mono leading-relaxed">{template.python}</code>
            </pre>
          </div>
        )}
      </div>

      {/* Test Case */}
      {template.testCase && (
        <div className="border-t border-gray-200 bg-gray-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <Play size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
            <div className="space-y-2 text-sm">
              <div>
                <span className="font-medium text-gray-700">Input: </span>
                <code className="bg-gray-200 px-2 py-0.5 rounded text-gray-800">{template.testCase.input}</code>
              </div>
              <div>
                <span className="font-medium text-gray-700">Output: </span>
                <code className="bg-green-100 px-2 py-0.5 rounded text-green-800">{template.testCase.output}</code>
              </div>
              {template.testCase.explanation && (
                <div className="text-gray-600 italic">
                  💡 {template.testCase.explanation}
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

