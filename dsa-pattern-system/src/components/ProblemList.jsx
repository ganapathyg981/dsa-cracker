import React, { useState, useEffect } from 'react';
import { Filter, CheckCircle2, Circle } from 'lucide-react';
import { getCompletedProblemsForPattern, toggleProblemComplete, isProblemCompleted } from '../utils/storage';

const ProblemList = ({ problems, patternId }) => {
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [completedProblems, setCompletedProblems] = useState({});

  useEffect(() => {
    if (patternId) {
      setCompletedProblems(getCompletedProblemsForPattern(patternId));
    }
  }, [patternId]);

  const difficulties = ['all', 'Easy', 'Medium', 'Hard'];
  
  const filteredProblems = filterDifficulty === 'all' 
    ? problems 
    : problems.filter(p => p.difficulty === filterDifficulty);

  const toggleComplete = (problemName) => {
    if (!patternId) return;
    toggleProblemComplete(patternId, problemName);
    setCompletedProblems(getCompletedProblemsForPattern(patternId));
  };

  const isCompleted = (problemName) => {
    return !!completedProblems[problemName];
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700 border-green-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'Hard': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const completedCount = problems.filter(p => isCompleted(p.name)).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Practice Problems</h2>
          <p className="text-sm text-gray-500 mt-1">
            {completedCount} of {problems.length} completed
          </p>
        </div>
        
        {/* Progress Bar */}
        <div className="flex items-center gap-3">
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${(completedCount / problems.length) * 100}%` }}
            />
          </div>
          <span className="text-sm font-medium text-gray-600">
            {Math.round((completedCount / problems.length) * 100)}%
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2">
        <Filter size={16} className="text-gray-400" />
        <span className="text-sm text-gray-500">Filter:</span>
        <div className="flex gap-1">
          {difficulties.map(diff => (
            <button
              key={diff}
              onClick={() => setFilterDifficulty(diff)}
              className={`
                px-3 py-1 rounded-full text-sm font-medium transition-all
                ${filterDifficulty === diff
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }
              `}
            >
              {diff === 'all' ? 'All' : diff}
            </button>
          ))}
        </div>
      </div>

      {/* Problem List */}
      <div className="border border-gray-200 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="w-12 px-4 py-3"></th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Problem</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600 w-24">Difficulty</th>
              <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Tags</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProblems.map((problem, idx) => {
              const problemCompleted = isCompleted(problem.name);
              
              return (
                <tr 
                  key={idx} 
                  className={`
                    transition-colors cursor-pointer
                    ${problemCompleted ? 'bg-green-50' : 'hover:bg-gray-50'}
                  `}
                  onClick={() => toggleComplete(problem.name)}
                >
                  <td className="px-4 py-3 text-center">
                    {problemCompleted ? (
                      <CheckCircle2 size={20} className="text-green-500 mx-auto" />
                    ) : (
                      <Circle size={20} className="text-gray-300 mx-auto" />
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-medium ${problemCompleted ? 'text-gray-500 line-through' : 'text-gray-800'}`}>
                      {problem.name}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-block px-2 py-1 text-xs font-medium rounded border ${getDifficultyColor(problem.difficulty)}`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {problem.tags.map((tag, tagIdx) => (
                        <span 
                          key={tagIdx}
                          className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Tip */}
      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-blue-800">
          💡 <strong>Tip:</strong> Click on a problem to mark it as completed. Start with Easy problems, 
          then progress to Medium and Hard. Aim for 5-10 problems per pattern.
        </p>
      </div>
    </div>
  );
};

export default ProblemList;

