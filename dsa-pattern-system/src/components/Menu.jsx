import React from 'react';
import { Sparkles, ChevronRight, Zap, Target, Trophy, Rocket } from 'lucide-react';
import { categories } from '../data/topics';

const categoryIcons = {
  beginner: Zap,
  intermediate: Target,
  advanced: Trophy,
  expert: Rocket
};

const categoryColors = {
  beginner: 'from-emerald-500 to-green-600',
  intermediate: 'from-blue-500 to-indigo-600',
  advanced: 'from-purple-500 to-violet-600',
  expert: 'from-amber-500 to-orange-600'
};

const categoryBgColors = {
  beginner: 'bg-emerald-50 dark:bg-emerald-900/30 border-emerald-200 dark:border-emerald-700 hover:border-emerald-400 dark:hover:border-emerald-500',
  intermediate: 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700 hover:border-blue-400 dark:hover:border-blue-500',
  advanced: 'bg-purple-50 dark:bg-purple-900/30 border-purple-200 dark:border-purple-700 hover:border-purple-400 dark:hover:border-purple-500',
  expert: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700 hover:border-amber-400 dark:hover:border-amber-500'
};

const Menu = ({ topics, onTopicSelect }) => {
  // Group topics by category
  const groupedTopics = topics.reduce((acc, topic) => {
    const cat = topic.category || 'beginner';
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(topic);
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-violet-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-10">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg">
              <Sparkles className="text-white" size={24} />
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 dark:from-gray-100 dark:to-gray-300 bg-clip-text text-transparent">
              Pattern Decision Tree
            </h1>
          </div>
          <p className="text-sm sm:text-lg text-gray-600 dark:text-gray-400">
            Answer questions to find the exact algorithm pattern you need
          </p>
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-1">
            19 patterns • Ordered by learning progression • Interview-ready
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-6 sm:space-y-8">
          {Object.entries(categories).map(([categoryId, categoryMeta]) => {
            const CategoryIcon = categoryIcons[categoryId];
            const topicsInCategory = groupedTopics[categoryId] || [];
            
            return (
              <div key={categoryId} className="space-y-2 sm:space-y-3">
                {/* Category Header */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-gradient-to-br ${categoryColors[categoryId]} flex items-center justify-center shadow-md flex-shrink-0`}>
                    <CategoryIcon size={18} className="sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="text-base sm:text-lg font-bold text-gray-800 dark:text-gray-100">{categoryMeta.label}</h2>
                    <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{categoryMeta.description}</p>
                  </div>
                </div>

                {/* Topic Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 ml-0 sm:ml-11">
                  {topicsInCategory.map((topic, index) => (
                    <button
                      key={topic.id}
                      onClick={() => onTopicSelect(topic.id)}
                      className={`
                        group relative p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200
                        hover:shadow-lg hover:-translate-y-0.5
                        ${categoryBgColors[categoryId]}
                      `}
                    >
                      <div className="absolute -top-1.5 -left-1.5 sm:-top-2 sm:-left-2 w-5 h-5 sm:w-6 sm:h-6 bg-white dark:bg-gray-800 rounded-full border-2 border-gray-200 dark:border-gray-600 flex items-center justify-center text-[10px] sm:text-xs font-bold text-gray-500 dark:text-gray-400 shadow-sm">
                        {Object.values(groupedTopics).flat().indexOf(topic) + 1}
                      </div>
                      <div className="text-2xl sm:text-3xl mb-1.5 sm:mb-2">{topic.icon}</div>
                      <h3 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white leading-tight pr-4">
                        {topic.label}
                      </h3>
                      <ChevronRight 
                        size={14} 
                        className="sm:w-4 sm:h-4 absolute bottom-2 right-2 sm:bottom-3 sm:right-3 text-gray-300 dark:text-gray-600 group-hover:text-gray-500 dark:group-hover:text-gray-400 group-hover:translate-x-0.5 transition-all" 
                      />
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* How to Use Section */}
        <div className="mt-8 sm:mt-12 bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100 dark:border-gray-700">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-100 mb-3 sm:mb-4 flex items-center gap-2">
            <span className="text-xl sm:text-2xl">🚀</span>
            Quick Start Guide
          </h2>
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">Pick a Pattern</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Start with green (Foundation) if you&apos;re new to DSA</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-xl font-bold text-purple-600 dark:text-purple-400">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">Answer Questions</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Follow the decision tree based on your problem</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center flex-shrink-0">
                <span className="text-base sm:text-xl font-bold text-emerald-600 dark:text-emerald-400">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-100 text-sm sm:text-base">Get the Solution</h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-0.5 sm:mt-1">Copy the template code and practice problems</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fun tip */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500">
            💡 <strong>Pro tip:</strong> Master patterns 1-10 to ace 80% of interviews!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Menu;
