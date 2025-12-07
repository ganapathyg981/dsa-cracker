import React from 'react';
import { CheckCircle } from 'lucide-react';

const ResultDisplay = ({ result, onReset, onBackToMenu }) => {
  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <CheckCircle className="text-green-500" size={40} />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{result.pattern}</h2>
          <p className="text-gray-600">Perfect match found!</p>
        </div>
      </div>

      {result.whenToUse && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
          <h3 className="font-bold text-green-800 mb-2">✅ Use this pattern when:</h3>
          <pre className="text-sm text-green-700 whitespace-pre-wrap font-medium">
            {result.whenToUse}
          </pre>
        </div>
      )}

      <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-green-400">Code Template:</h3>
          <span className="text-xs text-gray-400">Java</span>
        </div>
        <pre className="text-green-400 text-sm leading-relaxed">
          <code>{result.code}</code>
        </pre>
      </div>

      <div className="mb-6">
        <h3 className="font-bold text-gray-700 mb-3 text-lg">📝 Practice with these problems:</h3>
        <div className="grid md:grid-cols-2 gap-2">
          {result.problems.map((problem, idx) => (
            <div key={idx} className="bg-purple-50 border border-purple-200 px-4 py-3 rounded-lg">
              <span className="text-purple-800 font-medium">{problem}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={onReset}
          className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          Try Another Problem
        </button>
        <button
          onClick={onBackToMenu}
          className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
};

export default ResultDisplay;

