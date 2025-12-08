import React, { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronDown, Lightbulb, XCircle } from 'lucide-react';

const TheorySection = ({ theory, decisionTree }) => {
  const [expandedDecision, setExpandedDecision] = useState(true);

  const renderDecisionNode = (node, depth = 0) => {
    if (!node) return null;

    return (
      <div className={`${depth > 0 ? 'ml-6 border-l-2 border-blue-200 dark:border-blue-700 pl-4' : ''}`}>
        <div className="py-2">
          <p className="font-medium text-gray-800 dark:text-gray-200 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
              ?
            </span>
            {node.question}
          </p>
        </div>
        
        {node.options && (
          <div className="space-y-2 mt-2">
            {node.options.map((option, idx) => (
              <div key={idx} className="ml-2">
                <div className="flex items-start gap-2 py-1.5 px-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                  <ChevronRight size={16} className="text-gray-400 dark:text-gray-500 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-gray-700 dark:text-gray-300">{option.label}</span>
                    {option.result && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 rounded-full">
                        → {typeof option.result === 'string' ? option.result : option.result.pattern}
                      </span>
                    )}
                  </div>
                </div>
                {option.next && renderDecisionNode(option.next, depth + 1)}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Key Insight - Prominent at top */}
      {theory.keyInsight && (
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-200 dark:border-amber-700 rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-start gap-2.5">
            <div className="w-8 h-8 bg-amber-100 dark:bg-amber-800 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="text-amber-600 dark:text-amber-400" size={18} />
            </div>
            <div>
              <h3 className="font-bold text-amber-800 dark:text-amber-200 text-sm sm:text-base mb-1">💡 Key Insight</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm">{theory.keyInsight}</p>
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          📖 Overview
        </h2>
        <div className="prose prose-gray max-w-none">
          {theory.overview.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-gray-600 dark:text-gray-300 leading-relaxed mb-2 last:mb-0 text-sm">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* When to Use */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          ✅ When to Use This Pattern
        </h2>
        <ul className="space-y-1.5">
          {theory.whenToUse.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors">
              <CheckCircle size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700 dark:text-gray-300 text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* When NOT to Use */}
      {theory.whenNotToUse && theory.whenNotToUse.length > 0 && (
        <section className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
          <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
            ❌ When NOT to Use This Pattern
          </h2>
          <div className="space-y-1.5 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            {theory.whenNotToUse.map((item, idx) => (
              <div key={idx} className={`flex items-start gap-2 ${item === '' ? 'mb-1' : ''}`}>
                {item && <XCircle size={14} className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />}
                <p className="text-gray-700 dark:text-gray-300 text-sm">{item}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Decision Tree */}
      {decisionTree && (
        <section className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
          <button
            onClick={() => setExpandedDecision(!expandedDecision)}
            className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 dark:bg-gray-700 flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
          >
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 flex items-center gap-2">
              🌳 Decision Tree: Which Variant to Apply
            </h2>
            {expandedDecision ? <ChevronDown size={18} className="text-gray-600 dark:text-gray-400" /> : <ChevronRight size={18} className="text-gray-600 dark:text-gray-400" />}
          </button>
          
          {expandedDecision && (
            <div className="p-3 sm:p-4 bg-white dark:bg-gray-800">
              {renderDecisionNode(decisionTree)}
            </div>
          )}
        </section>
      )}

      {/* Complexity */}
      <section className="bg-white dark:bg-gray-800 rounded-xl p-3 sm:p-4 shadow-sm border border-gray-100 dark:border-gray-700">
        <h2 className="text-base font-bold text-gray-800 dark:text-gray-200 mb-2 flex items-center gap-2">
          ⚡ Complexity Analysis
        </h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-900/30 rounded-lg border border-blue-200 dark:border-blue-700">
            <p className="text-xs text-blue-600 dark:text-blue-400 font-medium mb-1">Time Complexity</p>
            <p className="text-lg font-bold text-blue-800 dark:text-blue-300">{theory.complexity.time}</p>
          </div>
          <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/40 dark:to-purple-900/30 rounded-lg border border-purple-200 dark:border-purple-700">
            <p className="text-xs text-purple-600 dark:text-purple-400 font-medium mb-1">Space Complexity</p>
            <p className="text-lg font-bold text-purple-800 dark:text-purple-300">{theory.complexity.space}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheorySection;
