import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const DecisionFlow = ({ 
  currentNode, 
  selectedPath, 
  topicTitle,
  onNavigate, 
  onReset,
  onBackToMenu 
}) => {
  const navigate = useNavigate();
  
  const handleBackToMenu = () => {
    if (onBackToMenu) {
      onBackToMenu();
    } else {
      navigate('/decision-tree');
    }
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8">
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <button 
          onClick={handleBackToMenu}
          className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 flex items-center gap-1.5 sm:gap-2 font-semibold text-sm sm:text-base"
        >
          <Home size={18} className="sm:w-5 sm:h-5" /> Menu
        </button>
        <ChevronRight size={16} className="sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500" />
        <span className="text-gray-700 dark:text-gray-200 font-semibold text-sm sm:text-base truncate">
          {topicTitle}
        </span>
      </div>

      {selectedPath.length > 0 && (
        <div className="mb-4 sm:mb-6 flex items-center flex-wrap gap-1.5 sm:gap-2 text-xs sm:text-sm bg-blue-50 dark:bg-blue-900/30 p-2.5 sm:p-3 rounded-lg">
          <button onClick={onReset} className="text-blue-600 dark:text-blue-400 hover:underline font-medium">
            Start Over
          </button>
          {selectedPath.map((path, idx) => (
            <React.Fragment key={idx}>
              <ChevronRight size={14} className="sm:w-4 sm:h-4 text-blue-400 dark:text-blue-500" />
              <span className="text-gray-700 dark:text-gray-300">{path}</span>
            </React.Fragment>
          ))}
        </div>
      )}

      <div>
        <h2 className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4 sm:mb-6">
          {currentNode.question}
        </h2>
        <div className="space-y-2 sm:space-y-3">
          {currentNode.options.map((option, idx) => (
            <button
              key={idx}
              onClick={() => onNavigate(option)}
              className="w-full text-left p-3 sm:p-5 border-2 border-gray-200 dark:border-gray-600 rounded-lg sm:rounded-xl hover:border-blue-500 dark:hover:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all group"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-lg group-hover:text-blue-700 dark:group-hover:text-blue-400">
                  {option.label}
                </span>
                <ChevronRight size={18} className="sm:w-5 sm:h-5 text-gray-400 dark:text-gray-500 group-hover:text-blue-500 dark:group-hover:text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DecisionFlow;
