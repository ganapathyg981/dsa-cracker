import React, { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronDown, Lightbulb, XCircle } from 'lucide-react';

const TheorySection = ({ theory, decisionTree }) => {
  const [expandedDecision, setExpandedDecision] = useState(true);

  const renderDecisionNode = (node, depth = 0) => {
    if (!node) return null;

    return (
      <div className={`${depth > 0 ? 'ml-6 border-l-2 border-blue-200 pl-4' : ''}`}>
        <div className="py-2">
          <p className="font-medium text-gray-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
              ?
            </span>
            {node.question}
          </p>
        </div>
        
        {node.options && (
          <div className="space-y-2 mt-2">
            {node.options.map((option, idx) => (
              <div key={idx} className="ml-2">
                <div className="flex items-start gap-2 py-1.5 px-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <ChevronRight size={16} className="text-gray-400 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-gray-700">{option.label}</span>
                    {option.result && (
                      <span className="ml-2 text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
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
    <div className="space-y-6">
      {/* Key Insight - Prominent at top */}
      {theory.keyInsight && (
        <section className="bg-gradient-to-r from-amber-50 to-yellow-50 border border-amber-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Lightbulb className="text-amber-600" size={22} />
            </div>
            <div>
              <h3 className="font-bold text-amber-800 text-lg mb-1">💡 Key Insight</h3>
              <p className="text-gray-700 leading-relaxed">{theory.keyInsight}</p>
            </div>
          </div>
        </section>
      )}

      {/* Overview */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          📖 Overview
        </h2>
        <div className="prose prose-gray max-w-none">
          {theory.overview.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-gray-600 leading-relaxed mb-3 last:mb-0">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* When to Use */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          ✅ When to Use This Pattern
        </h2>
        <ul className="space-y-2">
          {theory.whenToUse.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
              <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* When NOT to Use */}
      {theory.whenNotToUse && theory.whenNotToUse.length > 0 && (
        <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            ❌ When NOT to Use This Pattern
          </h2>
          <div className="space-y-2 p-4 bg-red-50 rounded-lg border border-red-200">
            {theory.whenNotToUse.map((item, idx) => (
              <div key={idx} className={`flex items-start gap-2 ${item === '' ? 'mb-2' : ''}`}>
                {item && <XCircle size={16} className="text-red-500 mt-0.5 flex-shrink-0" />}
                <p className="text-gray-700">{item}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Decision Tree */}
      {decisionTree && (
        <section className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <button
            onClick={() => setExpandedDecision(!expandedDecision)}
            className="w-full px-5 py-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              🌳 Decision Tree: Which Variant to Apply
            </h2>
            {expandedDecision ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
          </button>
          
          {expandedDecision && (
            <div className="p-5 bg-white">
              {renderDecisionNode(decisionTree)}
            </div>
          )}
        </section>
      )}

      {/* Complexity */}
      <section className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
          ⚡ Complexity Analysis
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 font-medium mb-1">Time Complexity</p>
            <p className="text-xl font-bold text-blue-800">{theory.complexity.time}</p>
          </div>
          <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200">
            <p className="text-sm text-purple-600 font-medium mb-1">Space Complexity</p>
            <p className="text-xl font-bold text-purple-800">{theory.complexity.space}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheorySection;
