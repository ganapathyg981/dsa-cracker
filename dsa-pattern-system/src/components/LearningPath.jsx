import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Rocket, BookOpen, Target, Layers, Zap, Trophy, 
  ChevronRight, CheckCircle2, Circle, Star,
  ArrowRight, Clock, TrendingUp
} from 'lucide-react';
import { getAvailablePatterns } from '../data/patterns';
import { getAllCompletedProblems } from '../utils/storage';

const LearningPath = ({ onSelectPattern }) => {
  const navigate = useNavigate();
  const [completedProblems, setCompletedProblems] = useState({});
  const [expandedPhase, setExpandedPhase] = useState('beginner');
  
  useEffect(() => {
    setCompletedProblems(getAllCompletedProblems());
  }, []);

  // Learning phases with recommended order
  const learningPhases = [
    {
      id: 'beginner',
      title: 'Phase 1: Foundation',
      description: 'Master the fundamentals before tackling complex patterns',
      icon: BookOpen,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-500',
      patterns: [
        { id: 'arrays-strings', name: 'Arrays & Strings', reason: 'The building blocks of DSA', required: true },
        { id: 'two-pointers', name: 'Two Pointers', reason: 'Essential technique for sorted arrays', required: true },
        { id: 'sliding-window', name: 'Sliding Window', reason: 'Core pattern for subarray problems', required: true },
      ],
      estimatedTime: '2-3 weeks',
    },
    {
      id: 'intermediate',
      title: 'Phase 2: Core Techniques',
      description: 'Build on fundamentals with key algorithmic patterns',
      icon: Target,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-500',
      patterns: [
        { id: 'binary-search', name: 'Binary Search', reason: 'Divide & conquer foundation', required: true },
        { id: 'prefix-sum', name: 'Prefix Sum', reason: 'Efficient range queries', required: false },
        { id: 'intervals', name: 'Intervals', reason: 'Time range & scheduling problems', required: false },
        { id: 'bfs-dfs', name: 'BFS / DFS', reason: 'Graph/tree traversal basics', required: true },
        { id: 'trees', name: 'Trees', reason: 'Hierarchical data mastery', required: true },
      ],
      estimatedTime: '3-4 weeks',
    },
    {
      id: 'advanced',
      title: 'Phase 3: Advanced Patterns',
      description: 'Tackle harder patterns used in top-tier interviews',
      icon: Layers,
      color: 'purple',
      gradient: 'from-purple-500 to-pink-500',
      patterns: [
        { id: 'backtracking', name: 'Backtracking', reason: 'Generate all combinations/permutations', required: true },
        { id: 'dynamic-programming', name: 'Dynamic Programming', reason: 'Optimization problems', required: true },
        { id: 'greedy', name: 'Greedy', reason: 'Local optimal → global optimal', required: true },
        { id: 'heaps', name: 'Heaps', reason: 'Priority-based problems', required: true },
        { id: 'graphs', name: 'Graphs', reason: 'Complex relationship problems', required: true },
      ],
      estimatedTime: '4-6 weeks',
    },
    {
      id: 'expert',
      title: 'Phase 4: Expert Level',
      description: 'Master specialized patterns for competitive programming',
      icon: Zap,
      color: 'orange',
      gradient: 'from-orange-500 to-red-500',
      patterns: [
        { id: 'topological-sort', name: 'Topological Sort', reason: 'Dependency ordering', required: false },
        { id: 'union-find', name: 'Union Find', reason: 'Connected components', required: false },
        { id: 'monotonic-stack', name: 'Monotonic Stack', reason: 'Next greater element patterns', required: false },
        { id: 'tries', name: 'Tries', reason: 'String prefix problems', required: false },
        { id: 'bit-manipulation', name: 'Bit Manipulation', reason: 'XOR tricks & bit operations', required: false },
        { id: 'segment-trees', name: 'Segment Trees', reason: 'Range query optimization', required: false },
      ],
      estimatedTime: '4-8 weeks',
    },
  ];

  // Calculate progress for each phase
  const getPhaseProgress = (phase) => {
    const patterns = getAvailablePatterns();
    let totalProblems = 0;
    let completedCount = 0;

    phase.patterns.forEach(p => {
      const pattern = patterns.find(pat => pat.id === p.id);
      if (pattern && pattern.problems) {
        totalProblems += pattern.problems.length;
        const patternCompleted = completedProblems[p.id] || {};
        completedCount += Object.keys(patternCompleted).length;
      }
    });

    return totalProblems > 0 ? Math.round((completedCount / totalProblems) * 100) : 0;
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Header */}
      <div className="text-center mb-6 sm:mb-10">
        <div className="inline-flex items-center gap-2 sm:gap-3 bg-gradient-to-r from-violet-100 to-indigo-100 dark:from-violet-900/30 dark:to-indigo-900/30 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-3 sm:mb-4">
          <Rocket className="text-violet-600 dark:text-violet-400" size={20} />
          <span className="text-sm sm:text-lg font-semibold text-violet-700 dark:text-violet-300">Structured Learning Path</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 mb-2 sm:mb-3">
          Master DSA Patterns Step by Step
        </h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Follow this curated learning path designed for beginners to advanced learners.
          Each phase builds upon the previous one, ensuring solid foundations.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-10">
        {[
          { label: 'Patterns', value: '15+', icon: Layers, color: 'blue', darkBg: 'dark:bg-blue-900/30', darkBorder: 'dark:border-blue-800', darkText: 'dark:text-blue-400' },
          { label: 'Problems', value: '200+', icon: Target, color: 'green', darkBg: 'dark:bg-green-900/30', darkBorder: 'dark:border-green-800', darkText: 'dark:text-green-400' },
          { label: 'Learning Time', value: '10-20 wks', icon: Clock, color: 'purple', darkBg: 'dark:bg-purple-900/30', darkBorder: 'dark:border-purple-800', darkText: 'dark:text-purple-400' },
          { label: 'Your Progress', value: `${Math.round(Object.keys(completedProblems).length / 15 * 100)}%`, icon: TrendingUp, color: 'orange', darkBg: 'dark:bg-orange-900/30', darkBorder: 'dark:border-orange-800', darkText: 'dark:text-orange-400' },
        ].map((stat, idx) => (
          <div key={idx} className={`p-3 sm:p-4 rounded-xl bg-${stat.color}-50 ${stat.darkBg} border border-${stat.color}-200 ${stat.darkBorder} text-center`}>
            <stat.icon className={`mx-auto mb-1.5 sm:mb-2 text-${stat.color}-500 ${stat.darkText}`} size={18} />
            <div className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100">{stat.value}</div>
            <div className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Learning Phases */}
      <div className="space-y-4 sm:space-y-6">
        {learningPhases.map((phase, phaseIndex) => {
          const progress = getPhaseProgress(phase);
          const isExpanded = expandedPhase === phase.id;
          const Icon = phase.icon;

          return (
            <div 
              key={phase.id}
              className="border rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
            >
              {/* Phase Header */}
              <button
                onClick={() => setExpandedPhase(isExpanded ? null : phase.id)}
                className="w-full px-3 sm:px-6 py-3 sm:py-5 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer gap-2 sm:gap-4"
              >
                <div className="flex items-center gap-3 sm:gap-4 min-w-0 flex-1">
                  <div className={`
                    w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0
                    bg-gradient-to-br ${phase.gradient}
                  `}>
                    <Icon className="text-white" size={20} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-sm sm:text-lg font-semibold text-gray-800 dark:text-gray-100 truncate">{phase.title}</h3>
                      {progress === 100 && (
                        <Trophy className="text-yellow-500 dark:text-yellow-400 flex-shrink-0" size={16} />
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-1">{phase.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                  {/* Estimated Time */}
                  <div className="text-right hidden sm:block">
                    <div className="text-sm font-medium text-gray-500">{phase.estimatedTime}</div>
                    <div className="text-xs text-gray-400">estimated</div>
                  </div>

                  {/* Progress Circle */}
                  <div className="relative w-11 h-11 sm:w-14 sm:h-14">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle
                        cx="50%" cy="50%" r="40%"
                        fill="none"
                        className="stroke-gray-200 dark:stroke-gray-600"
                        strokeWidth="4"
                      />
                      <circle
                        cx="50%" cy="50%" r="40%"
                        fill="none"
                        stroke={`url(#gradient-${phase.id})`}
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeDasharray={`${progress * 1.51} 151`}
                      />
                      <defs>
                        <linearGradient id={`gradient-${phase.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" className={`stop-${phase.color}-500`} stopColor={phase.color === 'emerald' ? '#10b981' : phase.color === 'blue' ? '#3b82f6' : phase.color === 'purple' ? '#8b5cf6' : '#f97316'} />
                          <stop offset="100%" className={`stop-${phase.color}-400`} stopColor={phase.color === 'emerald' ? '#34d399' : phase.color === 'blue' ? '#60a5fa' : phase.color === 'purple' ? '#a78bfa' : '#fb923c'} />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-xs sm:text-sm font-bold text-gray-700 dark:text-gray-200">
                      {progress}%
                    </span>
                  </div>

                  <ChevronRight 
                    className={`
                      text-gray-400 transition-transform duration-300 hidden sm:block
                      ${isExpanded ? 'rotate-90' : ''}
                    `}
                    size={20}
                  />
                </div>
              </button>

              {/* Phase Content (Expanded) */}
              {isExpanded && (
                <div className="px-3 sm:px-6 pb-4 sm:pb-6">
                  <div className="border-t border-gray-100 dark:border-gray-700 pt-3 sm:pt-4">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2 sm:mb-3">
                      Patterns to Master
                    </h4>
                    <div className="grid gap-2 sm:gap-3">
                      {phase.patterns.map((pattern, idx) => {
                        const patterns = getAvailablePatterns();
                        const fullPattern = patterns.find(p => p.id === pattern.id);
                        const patternCompleted = completedProblems[pattern.id] || {};
                        const problemCount = fullPattern?.problems?.length || 0;
                        const completedCount = Object.keys(patternCompleted).length;
                        const patternProgress = problemCount > 0 ? Math.round((completedCount / problemCount) * 100) : 0;

                        return (
                          <button
                            key={pattern.id}
                            onClick={() => navigate(`/explorer/${pattern.id}`)}
                            className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-all group text-left"
                          >
                            <div className="flex items-center gap-3 sm:gap-4">
                              {/* Order Number */}
                              <div className={`
                                w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold flex-shrink-0
                                ${patternProgress === 100 
                                  ? 'bg-green-100 dark:bg-green-900/50 text-green-600 dark:text-green-400' 
                                  : `bg-${phase.color}-100 dark:bg-${phase.color}-900/50 text-${phase.color}-600 dark:text-${phase.color}-400`
                                }
                              `}>
                                {patternProgress === 100 ? (
                                  <CheckCircle2 size={16} />
                                ) : (
                                  idx + 1
                                )}
                              </div>

                              {/* Pattern Info */}
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-violet-700 dark:group-hover:text-violet-400 text-sm sm:text-base">
                                    {pattern.name}
                                  </span>
                                  {pattern.required && (
                                    <span className="px-1.5 sm:px-2 py-0.5 bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 text-[10px] sm:text-xs font-medium rounded-full">
                                      Required
                                    </span>
                                  )}
                                </div>
                                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{pattern.reason}</p>
                              </div>
                            </div>

                            {/* Progress */}
                            <div className="flex items-center gap-3 ml-10 sm:ml-0">
                              <div className="text-left sm:text-right">
                                <div className="text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300">
                                  {completedCount}/{problemCount}
                                </div>
                                <div className="text-[10px] sm:text-xs text-gray-400 dark:text-gray-500">problems</div>
                              </div>
                              
                              <div className="w-16 sm:w-20 h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full bg-gradient-to-r ${phase.gradient} transition-all duration-300`}
                                  style={{ width: `${patternProgress}%` }}
                                />
                              </div>

                              <ArrowRight className="text-gray-300 dark:text-gray-600 group-hover:text-violet-500 dark:group-hover:text-violet-400 group-hover:translate-x-1 transition-all hidden sm:block" size={18} />
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Phase Tips */}
                  <div className={`mt-3 sm:mt-4 p-3 sm:p-4 rounded-xl ${
                    phase.color === 'emerald' ? 'bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/20 border border-emerald-200 dark:border-emerald-700' :
                    phase.color === 'blue' ? 'bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-700' :
                    phase.color === 'purple' ? 'bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/20 border border-purple-200 dark:border-purple-700' :
                    'bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/30 dark:to-red-900/20 border border-orange-200 dark:border-orange-700'
                  }`}>
                    <div className="flex items-start gap-2 sm:gap-3">
                      <Star className={`flex-shrink-0 ${
                        phase.color === 'emerald' ? 'text-emerald-500 dark:text-emerald-400' :
                        phase.color === 'blue' ? 'text-blue-500 dark:text-blue-400' :
                        phase.color === 'purple' ? 'text-purple-500 dark:text-purple-400' :
                        'text-orange-500 dark:text-orange-400'
                      }`} size={16} />
                      <p className={`text-xs sm:text-sm ${
                        phase.color === 'emerald' ? 'text-emerald-700 dark:text-emerald-300' :
                        phase.color === 'blue' ? 'text-blue-700 dark:text-blue-300' :
                        phase.color === 'purple' ? 'text-purple-700 dark:text-purple-300' :
                        'text-orange-700 dark:text-orange-300'
                      }`}>
                        {phaseIndex === 0 && "💡 Tip: Focus on understanding the pattern, not memorizing code. Do at least 3-5 problems per pattern before moving on."}
                        {phaseIndex === 1 && "💡 Tip: Binary Search and BFS/DFS are foundational for many advanced patterns. Take your time here!"}
                        {phaseIndex === 2 && "💡 Tip: DP problems need practice. Start with memoization (top-down), then try tabulation (bottom-up)."}
                        {phaseIndex === 3 && "💡 Tip: These patterns are less common but important for competitive programming and FAANG interviews."}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-6 sm:mt-10 text-center p-4 sm:p-6 bg-gradient-to-r from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 rounded-xl sm:rounded-2xl border border-violet-200 dark:border-violet-800">
        <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">
          Ready to Start Your Journey? 🚀
        </h3>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-3 sm:mb-4">
          Begin with Arrays & Strings - the foundation of all DSA patterns.
        </p>
        <button
          onClick={() => navigate('/explorer/arrays-strings')}
          className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-violet-500 to-indigo-500 text-white font-medium rounded-xl hover:shadow-lg transition-all text-sm sm:text-base"
        >
          Start Learning Now
        </button>
      </div>
    </div>
  );
};

export default LearningPath;

