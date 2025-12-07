import React, { useState } from 'react';
import { Lock, ChevronRight } from 'lucide-react';
import PatternDetail from './PatternDetail';
import { topics, getPattern } from '../data/patterns';

const PatternExplorer = () => {
  const [selectedPatternId, setSelectedPatternId] = useState('two-pointers');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTopics = topics.filter(topic =>
    topic.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPattern = getPattern(selectedPatternId);

  return (
    <div className="flex h-[calc(100vh-57px)]">
      {/* Sidebar */}
      <aside className="w-72 bg-gray-50 border-r border-gray-200 flex flex-col">
        {/* Search */}
        <div className="p-4 border-b border-gray-200">
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Pattern List */}
        <nav className="flex-1 overflow-y-auto p-2">
          <ul className="space-y-1">
            {filteredTopics.map((topic) => {
              const isSelected = selectedPatternId === topic.id;
              const isAvailable = topic.available;

              return (
                <li key={topic.id}>
                  <button
                    onClick={() => isAvailable && setSelectedPatternId(topic.id)}
                    disabled={!isAvailable}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all
                      ${isSelected && isAvailable
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : isAvailable
                          ? 'text-gray-700 hover:bg-gray-100'
                          : 'text-gray-400 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className="text-lg">{topic.icon}</span>
                    <span className="flex-1">{topic.label}</span>
                    {!isAvailable ? (
                      <Lock size={14} className="text-gray-300" />
                    ) : isSelected ? (
                      <ChevronRight size={16} className="text-blue-500" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Stats */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="text-xs text-gray-500">
            <span className="font-medium text-gray-700">
              {topics.filter(t => t.available).length}
            </span>
            {' '}of {topics.length} patterns available
          </div>
          <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
            <div 
              className="bg-blue-500 h-1.5 rounded-full transition-all"
              style={{ width: `${(topics.filter(t => t.available).length / topics.length) * 100}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        {selectedPattern ? (
          <PatternDetail pattern={selectedPattern} />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-lg">Select a pattern to view details</p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PatternExplorer;

