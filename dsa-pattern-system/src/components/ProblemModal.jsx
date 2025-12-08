import React, { useState } from 'react';
import { 
  X, ExternalLink, ChevronDown, ChevronRight, Lightbulb, 
  Code, Play, BookOpen, Target, Zap, Copy, Check
} from 'lucide-react';

const ProblemModal = ({ problem, patternId, onClose, onToggleComplete, isCompleted }) => {
  const [showHints, setShowHints] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  if (!problem) return null;

  const handleCopyCode = async () => {
    if (problem.solution?.java) {
      await navigator.clipboard.writeText(problem.solution.java);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      'Foundation': 'bg-blue-100 text-blue-700',
      'Core': 'bg-purple-100 text-purple-700',
      'Practice': 'bg-indigo-100 text-indigo-700',
      'Challenge': 'bg-orange-100 text-orange-700',
      'Advanced': 'bg-rose-100 text-rose-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[60] p-2 sm:p-4 animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-3xl w-full max-h-[92vh] sm:max-h-[88vh] overflow-hidden flex flex-col animate-scale-in">
        {/* Header */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-b border-gray-100 flex items-start justify-between bg-gradient-to-r from-slate-50 to-gray-50">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 sm:gap-3 mb-1.5 sm:mb-2 flex-wrap">
              <span className={`px-2 sm:px-3 py-0.5 sm:py-1 text-xs sm:text-sm font-medium rounded-lg border ${getDifficultyColor(problem.difficulty)}`}>
                {problem.difficulty}
              </span>
              {problem.category && (
                <span className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-medium rounded-lg ${getCategoryColor(problem.category)}`}>
                  {problem.category}
                </span>
              )}
              {problem.priority && (
                <span className="flex items-center gap-1 text-[10px] sm:text-xs text-gray-500">
                  <Zap size={10} className="sm:w-3 sm:h-3 text-amber-500" />
                  P{problem.priority}
                </span>
              )}
            </div>
            <h2 className="text-base sm:text-xl font-bold text-gray-800 pr-6 sm:pr-8 leading-tight">{problem.name}</h2>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-1.5 sm:mt-2">
              {problem.tags?.slice(0, 3).map((tag, idx) => (
                <span 
                  key={idx}
                  className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-md"
                >
                  {tag}
                </span>
              ))}
              {problem.tags?.length > 3 && (
                <span className="px-1.5 sm:px-2 py-0.5 bg-gray-100 text-gray-600 text-[10px] sm:text-xs rounded-md">
                  +{problem.tags.length - 3}
                </span>
              )}
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 hover:bg-gray-200 rounded-lg transition-colors flex-shrink-0"
          >
            <X size={18} className="sm:w-5 sm:h-5 text-gray-500" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-3 sm:py-4 space-y-4 sm:space-y-5">
          {/* Problem Link */}
          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl text-orange-700 hover:from-orange-100 hover:to-amber-100 transition-all group text-sm sm:text-base"
            >
              <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="font-medium">Open on LeetCode</span>
              <ChevronRight size={14} className="sm:w-4 sm:h-4 ml-auto group-hover:translate-x-1 transition-transform" />
            </a>
          )}

          {/* Description */}
          <div className="space-y-2 sm:space-y-3">
            <h3 className="flex items-center gap-2 font-semibold text-gray-800 text-sm sm:text-base">
              <BookOpen size={16} className="sm:w-[18px] sm:h-[18px] text-blue-500" />
              Problem Description
            </h3>
            <div className="p-3 sm:p-4 bg-gray-50 rounded-xl text-gray-700 leading-relaxed text-sm sm:text-base">
              {problem.description || (
                <span className="text-gray-400 italic">
                  Click the LeetCode link above to view the full problem description.
                </span>
              )}
            </div>
          </div>

          {/* Examples */}
          {(problem.examples || problem.testCase) && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-semibold text-gray-800">
                <Play size={18} className="text-green-500" />
                Examples
              </h3>
              <div className="space-y-3">
                {problem.examples ? (
                  problem.examples.map((example, idx) => (
                    <div key={idx} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <div className="space-y-2 font-mono text-sm">
                        <div>
                          <span className="text-gray-500">Input: </span>
                          <span className="text-gray-800">{example.input}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Output: </span>
                          <span className="text-emerald-600 font-semibold">{example.output}</span>
                        </div>
                        {example.explanation && (
                          <div className="pt-2 border-t border-slate-200 text-gray-600 font-sans text-sm">
                            <span className="font-medium">Explanation: </span>
                            {example.explanation}
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : problem.testCase && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="space-y-2 font-mono text-sm">
                      <div>
                        <span className="text-gray-500">Input: </span>
                        <span className="text-gray-800">{problem.testCase.input}</span>
                      </div>
                      <div>
                        <span className="text-gray-500">Output: </span>
                        <span className="text-emerald-600 font-semibold">{problem.testCase.output}</span>
                      </div>
                      {problem.testCase.explanation && (
                        <div className="pt-2 border-t border-slate-200 text-gray-600 font-sans text-sm">
                          <span className="font-medium">Explanation: </span>
                          {problem.testCase.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Hints - Collapsible */}
          {problem.hints && problem.hints.length > 0 && (
            <div className="border border-amber-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowHints(!showHints)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-amber-50 hover:bg-amber-100 transition-colors"
              >
                <Lightbulb size={18} className="text-amber-500" />
                <span className="font-semibold text-amber-800">Hints</span>
                <span className="text-sm text-amber-600">({problem.hints.length} hints)</span>
                <ChevronDown 
                  size={18} 
                  className={`ml-auto text-amber-500 transition-transform ${showHints ? 'rotate-180' : ''}`}
                />
              </button>
              {showHints && (
                <div className="p-4 bg-white border-t border-amber-200 space-y-3">
                  {problem.hints.map((hint, idx) => (
                    <div key={idx} className="flex gap-3 p-3 bg-amber-50 rounded-lg">
                      <span className="flex-shrink-0 w-6 h-6 bg-amber-200 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium">
                        {idx + 1}
                      </span>
                      <p className="text-amber-900">{hint}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Solution - Collapsible */}
          {problem.solution && (
            <div className="border border-violet-200 rounded-xl overflow-hidden">
              <button
                onClick={() => setShowSolution(!showSolution)}
                className="w-full flex items-center gap-3 px-4 py-3 bg-violet-50 hover:bg-violet-100 transition-colors"
              >
                <Code size={18} className="text-violet-500" />
                <span className="font-semibold text-violet-800">Solution (Java)</span>
                <ChevronDown 
                  size={18} 
                  className={`ml-auto text-violet-500 transition-transform ${showSolution ? 'rotate-180' : ''}`}
                />
              </button>
              {showSolution && (
                <div className="border-t border-violet-200">
                  {/* Approach */}
                  {problem.solution.approach && (
                    <div className="p-4 bg-violet-50 border-b border-violet-200">
                      <h4 className="font-medium text-violet-800 mb-2">Approach</h4>
                      <p className="text-violet-900">{problem.solution.approach}</p>
                    </div>
                  )}
                  {/* Code */}
                  <div className="relative">
                    <button
                      onClick={handleCopyCode}
                      className="absolute top-3 right-3 p-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors z-10"
                      title="Copy code"
                    >
                      {copiedCode ? (
                        <Check size={16} className="text-green-400" />
                      ) : (
                        <Copy size={16} className="text-gray-300" />
                      )}
                    </button>
                    <pre className="p-4 bg-gray-900 text-gray-100 overflow-x-auto text-sm">
                      <code>{problem.solution.java}</code>
                    </pre>
                  </div>
                  {/* Complexity */}
                  {(problem.solution.timeComplexity || problem.solution.spaceComplexity) && (
                    <div className="p-4 bg-gray-50 flex gap-6 text-sm">
                      {problem.solution.timeComplexity && (
                        <div>
                          <span className="text-gray-500">Time: </span>
                          <span className="font-mono text-gray-800">{problem.solution.timeComplexity}</span>
                        </div>
                      )}
                      {problem.solution.spaceComplexity && (
                        <div>
                          <span className="text-gray-500">Space: </span>
                          <span className="font-mono text-gray-800">{problem.solution.spaceComplexity}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-4 bg-gray-50">
          <button
            onClick={() => onToggleComplete(problem.name)}
            className={`flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all text-sm sm:text-base ${
              isCompleted
                ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            <Target size={16} className="sm:w-[18px] sm:h-[18px]" />
            {isCompleted ? 'Completed ✓' : 'Mark Complete'}
          </button>
          
          {problem.leetcodeUrl && (
            <a
              href={problem.leetcodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 text-sm sm:text-base"
            >
              <ExternalLink size={16} className="sm:w-[18px] sm:h-[18px]" />
              Solve on LeetCode
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemModal;

