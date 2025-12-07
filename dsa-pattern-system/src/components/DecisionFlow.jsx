import React from 'react';
import { ChevronRight, Home } from 'lucide-react';

const DecisionFlow = ({ 
  currentNode, 
  selectedPath, 
  topicTitle,
  onNavigate, 
  onReset,
  onBackToMenu 
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <button 
          onClick={onBackToMenu}
          className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-semibold"
        >
          <Home size={20} /> Menu
        </button>
        <ChevronRight size={20} className="text-gray-400" />
        <span className="text-gray-700 font-semibold">
          {topicTitle}
        </span>
      </div>

      {selectedPath.length > 0 && (
        <div className="mb-6 flex items-center flex-wrap gap-2 text-sm bg-blue-50 p-3 rounded-lg">
          <button onClick={onReset} className="text-blue-600 hover:underline font-medium">
            Start Over
          </button>
          {selectedPath.map((path, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={16} className="text-blue-400" />
              <span className="text-gray-700">{path}</span>
            </React.Fragment>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {currentNode.question}
        </h2>
        <div className="space-y-3">
          {currentNode.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(option)}
              className="w-full text-left p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-800 text-lg group-hover:text-blue-700">
                  {option.label}
                </span>
                <ChevronRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionFlow;

