import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Filter, CheckCircle2, Circle, ExternalLink, ChevronRight, 
  Layers, Zap, Target, BookOpen, ArrowUpDown
} from 'lucide-react';
import { getCompletedProblemsForPattern, toggleProblemComplete } from '../utils/storage';
import { getEnhancedProblems } from '../data/problemDetails';
import ProblemModal from './ProblemModal';

const ProblemList = ({ problems, patternId, initialProblem }) => {
  const navigate = useNavigate();
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState('category'); // 'category', 'difficulty', 'name'
  const [completedProblems, setCompletedProblems] = useState({});
  const [selectedProblem, setSelectedProblem] = useState(null);

  useEffect(() => {
    if (patternId) {
      setCompletedProblems(getCompletedProblemsForPattern(patternId));
    }
  }, [patternId]);
  
  // Open modal if initialProblem is provided via URL
  useEffect(() => {
    if (initialProblem && problems.length > 0) {
      const enhanced = getEnhancedProblems(problems);
      const problem = enhanced.find(p => p.name === initialProblem);
      if (problem) {
        setSelectedProblem(problem);
      }
    }
  }, [initialProblem, problems]);
  
  // Handle opening a problem with URL update
  const openProblem = (problem) => {
    setSelectedProblem(problem);
    navigate(`/explorer/${patternId}/problems/${encodeURIComponent(problem.name)}`, { replace: true });
  };
  
  // Handle closing modal with URL update
  const closeProblem = () => {
    setSelectedProblem(null);
    navigate(`/explorer/${patternId}/problems`, { replace: true });
  };

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  
  // Get unique categories from problems
  const categories = useMemo(() => {
    const cats = new Set(problems.map(p => p.category).filter(Boolean));
    return ['all', ...Array.from(cats)];
  }, [problems]);

  // Enhanced problems with details from problemDetails.js
  const enhancedProblems = useMemo(() => {
    const enhanced = getEnhancedProblems(problems);
    return enhanced.map((p, idx) => ({
      ...p,
      // Add default category based on difficulty if not provided
      category: p.category || getCategoryFromDifficulty(p.difficulty),
      // Add default priority based on index if not provided
      priority: p.priority || idx + 1,
    }));
  }, [problems]);

  // Filter and sort problems
  const filteredProblems = useMemo(() => {
    let filtered = enhancedProblems;
    
    if (filterDifficulty !== 'all') {
      filtered = filtered.filter(p => p.difficulty === filterDifficulty);
    }
    
    if (filterCategory !== 'all') {
      filtered = filtered.filter(p => p.category === filterCategory);
    }
    
    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'difficulty':
          const diffOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return (diffOrder[a.difficulty] || 0) - (diffOrder[b.difficulty] || 0);
        case 'name':
          return a.name.localeCompare(b.name);
        case 'category':
        default:
          // Sort by category order, then priority
          const catOrder = { 'Foundation': 1, 'Core': 2, 'Practice': 3, 'Challenge': 4, 'Advanced': 5 };
          const catDiff = (catOrder[a.category] || 99) - (catOrder[b.category] || 99);
          if (catDiff !== 0) return catDiff;
          return (a.priority || 99) - (b.priority || 99);
      }
    });
    
    return sorted;
  }, [enhancedProblems, filterDifficulty, filterCategory, sortBy]);

  // Group problems by category for display
  const groupedProblems = useMemo(() => {
    if (sortBy !== 'category') return null;
    
    const groups = {};
    filteredProblems.forEach(p => {
      const cat = p.category || 'Other';
      if (!groups[cat]) groups[cat] = [];
      groups[cat].push(p);
    });
    return groups;
  }, [filteredProblems, sortBy]);

  const toggleComplete = (problemName, e) => {
    if (e) e.stopPropagation();
    if (!patternId) return;
    toggleProblemComplete(patternId, problemName);
    setCompletedProblems(getCompletedProblemsForPattern(patternId));
  };

  const isCompleted = (problemName) => {
    return !!completedProblems[problemName];
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Hard': return 'bg-rose-100 text-rose-700 border-rose-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Foundation': return <BookOpen size={14} className="text-blue-500" />;
      case 'Core': return <Target size={14} className="text-purple-500" />;
      case 'Practice': return <Layers size={14} className="text-indigo-500" />;
      case 'Challenge': return <Zap size={14} className="text-orange-500" />;
      case 'Advanced': return <Zap size={14} className="text-rose-500" />;
      default: return <Circle size={14} className="text-gray-400" />;
    }
  };

  const completedCount = problems.filter(p => isCompleted(p.name)).length;

  const renderProblemCard = (problem, idx) => {
    const problemCompleted = isCompleted(problem.name);
    
    return (
      <div 
        key={`${problem.name}-${idx}`}
        className={`
          flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 rounded-lg transition-all cursor-pointer group
          ${problemCompleted ? 'bg-emerald-50/50 dark:bg-emerald-900/20' : 'hover:bg-violet-50/50 dark:hover:bg-violet-900/20'}
        `}
        onClick={() => openProblem(problem)}
      >
        <button
          onClick={(e) => toggleComplete(problem.name, e)}
          className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors flex-shrink-0"
        >
          {problemCompleted ? (
            <CheckCircle2 size={18} className="sm:w-5 sm:h-5 text-emerald-500 dark:text-emerald-400" />
          ) : (
            <Circle size={18} className="sm:w-5 sm:h-5 text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500" />
          )}
        </button>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
            <span className={`font-medium text-sm sm:text-base truncate ${problemCompleted ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-800 dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-400'}`}>
              {problem.name}
            </span>
            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-0.5 rounded hover:bg-orange-100 transition-colors flex-shrink-0"
                title="Open on LeetCode"
              >
                <ExternalLink size={12} className="sm:w-3.5 sm:h-3.5 text-orange-500" />
              </a>
            )}
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 mt-1">
            <span className={`inline-block px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs font-medium rounded border ${getDifficultyColor(problem.difficulty)}`}>
              {problem.difficulty}
            </span>
            <div className="hidden sm:flex flex-wrap gap-1">
              {problem.tags?.slice(0, 2).map((tag, tagIdx) => (
                <span 
                  key={tagIdx}
                  className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-[10px] rounded"
                >
                  {tag}
                </span>
              ))}
              {problem.tags?.length > 2 && (
                <span className="text-[10px] text-gray-400 dark:text-gray-500">+{problem.tags.length - 2}</span>
              )}
            </div>
          </div>
        </div>
        <ChevronRight size={16} className="sm:w-4 sm:h-4 text-gray-300 dark:text-gray-600 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all flex-shrink-0" />
      </div>
    );
  };

  const renderProblemRow = (problem, idx) => {
    const problemCompleted = isCompleted(problem.name);
    
    return (
      <tr 
        key={`${problem.name}-${idx}`}
        className={`
          transition-all cursor-pointer group hidden sm:table-row
          ${problemCompleted ? 'bg-emerald-50/50 dark:bg-emerald-900/20' : 'hover:bg-violet-50/50 dark:hover:bg-violet-900/20'}
        `}
        onClick={() => openProblem(problem)}
      >
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => toggleComplete(problem.name, e)}
            className="p-1 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {problemCompleted ? (
              <CheckCircle2 size={20} className="text-emerald-500 dark:text-emerald-400" />
            ) : (
              <Circle size={20} className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-500" />
            )}
          </button>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${problemCompleted ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-800 dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-400'}`}>
              {problem.name}
            </span>
            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                title="Open on LeetCode"
              >
                <ExternalLink size={14} className="text-orange-500" />
              </a>
            )}
          </div>
        </td>
        <td className="px-4 py-3">
          <span className={`inline-block px-2 py-1 text-xs font-medium rounded border ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
        </td>
        <td className="px-4 py-3">
          <div className="flex flex-wrap gap-1">
            {problem.tags?.slice(0, 3).map((tag, tagIdx) => (
              <span 
                key={tagIdx}
                className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {problem.tags?.length > 3 && (
              <span className="text-xs text-gray-400 dark:text-gray-500">+{problem.tags.length - 3}</span>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all mx-auto" />
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">Practice Problems</h2>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">
            {completedCount} of {problems.length} completed • Tap for details
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="w-24 sm:w-32 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${(completedCount / problems.length) * 100}%` }}
            />
          </div>
          <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
            {Math.round((completedCount / problems.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-2 sm:gap-4">
        {/* Difficulty Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <Filter size={14} className="sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">Difficulty:</span>
          <div className="flex gap-1">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`
                  px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap
                  ${filterDifficulty === diff
                    ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }
                `}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>
        </div>

        {/* Category Filter */}
        {categories.length > 2 && (
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            <Layers size={14} className="sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500 flex-shrink-0" />
            <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">Category:</span>
            <div className="flex gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`
                    px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap
                    ${filterCategory === cat
                      ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }
                  `}
                >
                  {cat === 'all' ? 'All' : cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sort */}
        <div className="flex items-center gap-2 sm:ml-auto">
          <ArrowUpDown size={14} className="sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-2 sm:px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-600 text-xs sm:text-sm text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-violet-200 dark:focus:ring-violet-700"
          >
            <option value="category">Sort by Category</option>
            <option value="difficulty">Sort by Difficulty</option>
            <option value="name">Sort by Name</option>
          </select>
        </div>
      </div>

      {/* Problem List */}
      {sortBy === 'category' && groupedProblems ? (
        // Grouped view
        <div className="space-y-4 sm:space-y-6">
          {Object.entries(groupedProblems).map(([category, categoryProblems]) => (
            <div key={category} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
              <div className="px-3 sm:px-4 py-2 sm:py-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-800 dark:to-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center gap-2">
                {getCategoryIcon(category)}
                <h3 className="font-semibold text-gray-700 dark:text-gray-200 text-sm sm:text-base">{category}</h3>
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  ({categoryProblems.filter(p => isCompleted(p.name)).length}/{categoryProblems.length})
                </span>
              </div>
              {/* Mobile Card View */}
              <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
                {categoryProblems.map((problem, idx) => renderProblemCard(problem, idx))}
              </div>
              {/* Desktop Table View */}
              <table className="w-full hidden sm:table">
                <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
                  {categoryProblems.map((problem, idx) => renderProblemRow(problem, idx))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        // Flat view
        <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden">
          {/* Mobile Card View */}
          <div className="sm:hidden divide-y divide-gray-100 dark:divide-gray-700">
            {filteredProblems.map((problem, idx) => renderProblemCard(problem, idx))}
          </div>
          {/* Desktop Table View */}
          <table className="w-full hidden sm:table">
            <thead className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="w-12 px-4 py-3"></th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Problem</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300 w-24">Difficulty</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">Tags</th>
                <th className="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
              {filteredProblems.map((problem, idx) => renderProblemRow(problem, idx))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tip */}
      <div className="p-3 sm:p-4 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/30 dark:to-indigo-900/30 rounded-xl border border-violet-200 dark:border-violet-700">
        <p className="text-xs sm:text-sm text-violet-800 dark:text-violet-200">
          💡 <strong>Recommended:</strong> Start with <span className="font-medium text-blue-600 dark:text-blue-400">Foundation</span>, 
          then <span className="font-medium text-purple-600 dark:text-purple-400">Core</span>, 
          then <span className="font-medium text-indigo-600 dark:text-indigo-400">Practice</span>.
          <span className="hidden sm:inline"> Save <span className="font-medium text-orange-600 dark:text-orange-400">Challenge</span> and <span className="font-medium text-rose-600 dark:text-rose-400">Advanced</span> for later.</span>
        </p>
      </div>

      {/* Problem Modal */}
      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          patternId={patternId}
          onClose={closeProblem}
          onToggleComplete={(name) => toggleComplete(name)}
          isCompleted={isCompleted(selectedProblem.name)}
        />
      )}
    </div>
  );
};

// Helper to auto-assign category based on difficulty
function getCategoryFromDifficulty(difficulty) {
  switch (difficulty) {
    case 'Easy': return 'Foundation';
    case 'Medium': return 'Core';
    case 'Hard': return 'Challenge';
    default: return 'Practice';
  }
}

export default ProblemList;
