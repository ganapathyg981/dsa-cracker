import React from 'react';
import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react';

const MistakesSection = ({ mistakes }) => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
          <AlertTriangle className="text-yellow-500 dark:text-yellow-400" />
          Common Mistakes & How to Avoid Them
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          These are the most frequent pitfalls when implementing this pattern. 
          Learn from others&apos; mistakes!
        </p>
      </div>

      {/* Mistakes List */}
      <div className="space-y-4">
        {mistakes.map((mistake, idx) => (
          <div 
            key={idx}
            className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden"
          >
            {/* The Trap */}
            <div className="p-4 bg-red-50 dark:bg-red-900/30 border-b border-red-100 dark:border-red-800">
              <div className="flex items-start gap-3">
                <XCircle size={20} className="text-red-500 dark:text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-1">❌ The Trap</p>
                  <p className="text-gray-700 dark:text-gray-300">{mistake.trap}</p>
                </div>
              </div>
            </div>
            
            {/* The Fix */}
            <div className="p-4 bg-green-50 dark:bg-green-900/30">
              <div className="flex items-start gap-3">
                <CheckCircle size={20} className="text-green-500 dark:text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-green-800 dark:text-green-300 mb-1">✅ The Fix</p>
                  <p className="text-gray-700 dark:text-gray-300">{mistake.fix}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pro Tip */}
      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-xl border border-yellow-200 dark:border-yellow-700">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
          <strong>🎯 Interview Tip:</strong> When you catch yourself making one of these mistakes 
          during an interview, acknowledge it! Saying &quot;Wait, I need to be careful about X here&quot; 
          shows self-awareness and debugging skills.
        </p>
      </div>
    </div>
  );
};

export default MistakesSection;
