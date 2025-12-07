import React, { useState, useEffect, useMemo } from 'react';
import { 
  Filter, CheckCircle2, Circle, ExternalLink, ChevronRight, 
  Layers, Zap, Target, BookOpen, ArrowUpDown
} from 'lucide-react';
import { getCompletedProblemsForPattern, toggleProblemComplete } from '../utils/storage';
import { getEnhancedProblems } from '../data/problemDetails';
import ProblemModal from './ProblemModal';

const ProblemList = ({ problems, patternId }) => {
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

  const renderProblemRow = (problem, idx) => {
    const problemCompleted = isCompleted(problem.name);
    
    return (
      <tr 
        key={`${problem.name}-${idx}`}
        className={`
          transition-all cursor-pointer group
          ${problemCompleted ? 'bg-emerald-50/50' : 'hover:bg-violet-50/50'}
        `}
        onClick={() => setSelectedProblem(problem)}
      >
        <td className="px-4 py-3 text-center">
          <button
            onClick={(e) => toggleComplete(problem.name, e)}
            className="p-1 rounded-lg hover:bg-gray-200 transition-colors"
          >
            {problemCompleted ? (
              <CheckCircle2 size={20} className="text-emerald-500" />
            ) : (
              <Circle size={20} className="text-gray-300 group-hover:text-gray-400" />
            )}
          </button>
        </td>
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            <span className={`font-medium ${problemCompleted ? 'text-gray-400 line-through' : 'text-gray-800 group-hover:text-violet-700'}`}>
              {problem.name}
            </span>
            {problem.leetcodeUrl && (
              <a
                href={problem.leetcodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-1 rounded hover:bg-orange-100 transition-colors"
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
                className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
              >
                {tag}
              </span>
            ))}
            {problem.tags?.length > 3 && (
              <span className="text-xs text-gray-400">+{problem.tags.length - 3}</span>
            )}
          </div>
        </td>
        <td className="px-4 py-3 text-center">
          <ChevronRight size={16} className="text-gray-300 group-hover:text-violet-500 group-hover:translate-x-1 transition-all mx-auto" />
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Practice Problems</h2>
          <p className="text-sm text-gray-500 mt-1">
            {completedCount} of {problems.length} completed • Click any problem for details
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-300"
              style={{ width: `${(completedCount / problems.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {Math.round((completedCount / problems.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Filters & Sort */}
      <div className="flex flex-wrap items-center gap-4">
        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <Filter size={16} className="text-gray-400" />
          <span className="text-sm text-gray-500">Difficulty:</span>
          <div className="flex gap-1">
            {difficulties.map(diff => (
              <button
                key={diff}
                onClick={() => setFilterDifficulty(diff)}
                className={`
                  px-3 py-1 rounded-full text-sm font-medium transition-all
                  ${filterDifficulty === diff
                    ? 'bg-violet-100 text-violet-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
          <div className="flex items-center gap-2">
            <Layers size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500">Category:</span>
            <div className="flex gap-1">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilterCategory(cat)}
                  className={`
                    px-3 py-1 rounded-full text-sm font-medium transition-all
                    ${filterCategory === cat
                      ? 'bg-violet-100 text-violet-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
        <div className="flex items-center gap-2 ml-auto">
          <ArrowUpDown size={16} className="text-gray-400" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-1 rounded-lg border border-gray-200 text-sm text-gray-600 bg-white focus:outline-none focus:ring-2 focus:ring-violet-200"
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
        <div className="space-y-6">
          {Object.entries(groupedProblems).map(([category, categoryProblems]) => (
            <div key={category} className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="px-4 py-3 bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200 flex items-center gap-2">
                {getCategoryIcon(category)}
                <h3 className="font-semibold text-gray-700">{category}</h3>
                <span className="text-sm text-gray-500">
                  ({categoryProblems.filter(p => isCompleted(p.name)).length}/{categoryProblems.length} done)
                </span>
              </div>
              <table className="w-full">
                <tbody className="divide-y divide-gray-100">
                  {categoryProblems.map((problem, idx) => renderProblemRow(problem, idx))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      ) : (
        // Flat view
        <div className="border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="w-12 px-4 py-3"></th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Problem</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 w-24">Difficulty</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Tags</th>
                <th className="w-12 px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProblems.map((problem, idx) => renderProblemRow(problem, idx))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tip */}
      <div className="p-4 bg-gradient-to-r from-violet-50 to-indigo-50 rounded-xl border border-violet-200">
        <p className="text-sm text-violet-800">
          💡 <strong>Recommended Order:</strong> Start with <span className="font-medium text-blue-600">Foundation</span> problems, 
          then <span className="font-medium text-purple-600">Core</span> concepts, 
          followed by <span className="font-medium text-indigo-600">Practice</span> problems.
          Save <span className="font-medium text-orange-600">Challenge</span> and <span className="font-medium text-rose-600">Advanced</span> for later.
        </p>
      </div>

      {/* Problem Modal */}
      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          patternId={patternId}
          onClose={() => setSelectedProblem(null)}
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
