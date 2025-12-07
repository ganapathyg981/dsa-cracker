import React, { useState } from 'react';
import { CheckCircle, ChevronRight, ChevronDown } from 'lucide-react';

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
                <div className="flex items-start gap-2 py-1.5 px-3 bg-gray-50 rounded-lg">
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
    <div className="space-y-8">
      {/* Overview */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          📖 Overview
        </h2>
        <div className="prose prose-gray max-w-none">
          {theory.overview.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="text-gray-700 leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* When to Use */}
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          ✅ When to Use This Pattern
        </h2>
        <ul className="space-y-2">
          {theory.whenToUse.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <CheckCircle size={18} className="text-green-600 mt-0.5 flex-shrink-0" />
              <span className="text-gray-700">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Decision Tree */}
      {decisionTree && (
        <section className="border border-gray-200 rounded-xl overflow-hidden">
          <button
            onClick={() => setExpandedDecision(!expandedDecision)}
            className="w-full px-5 py-4 bg-gray-50 flex items-center justify-between hover:bg-gray-100 transition-colors"
          >
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              🌳 Decision Tree: When to Apply Which Variant
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
      <section>
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          ⚡ Complexity Analysis
        </h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-sm text-blue-600 font-medium">Time Complexity</p>
            <p className="text-2xl font-bold text-blue-800 mt-1">{theory.complexity.time}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-xl border border-purple-200">
            <p className="text-sm text-purple-600 font-medium">Space Complexity</p>
            <p className="text-2xl font-bold text-purple-800 mt-1">{theory.complexity.space}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TheorySection;

