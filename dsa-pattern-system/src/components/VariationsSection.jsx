import React from 'react';
import { Layers, ArrowRight } from 'lucide-react';

const VariationsSection = ({ variations }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <Layers className="text-purple-500" />
          Pattern Variations & Related Techniques
        </h2>
        <p className="text-gray-600 mt-2">
          These variations build upon the core pattern. Understanding them helps you 
          recognize when to adapt your approach.
        </p>
      </div>

      {/* Variations Grid */}
      <div className="grid gap-4">
        {variations.map((variation, idx) => (
          <div 
            key={idx}
            className="p-5 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-200 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                <span className="text-purple-600 font-bold">{idx + 1}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                  {variation.name}
                  <ArrowRight size={16} className="text-purple-400" />
                </h3>
                <p className="text-gray-600 mt-2">{variation.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Learning Path */}
      <div className="p-5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-200">
        <h3 className="font-semibold text-blue-800 mb-3">📚 Suggested Learning Path</h3>
        <ol className="space-y-2 text-sm text-gray-700">
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold">1</span>
            Master the core pattern with 5-10 problems
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold">2</span>
            Identify which variation applies to new problems
          </li>
          <li className="flex items-center gap-2">
            <span className="w-5 h-5 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-xs font-bold">3</span>
            Practice combining patterns for complex problems
          </li>
        </ol>
      </div>
    </div>
  );
};

export default VariationsSection;

