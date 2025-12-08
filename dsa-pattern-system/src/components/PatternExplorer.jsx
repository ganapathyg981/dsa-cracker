import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, ChevronRight, X } from 'lucide-react';
import PatternDetail from './PatternDetail';
import { topics, getPattern } from '../data/patterns';

const PatternExplorer = ({ onMobilePatternSelectorToggle }) => {
  const { patternId: urlPatternId, section: urlSection, problemName: urlProblemName } = useParams();
  const navigate = useNavigate();
  
  // Use URL param or default to arrays-strings
  const [selectedPatternId, setSelectedPatternId] = useState(urlPatternId || 'arrays-strings');
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Sync with URL params
  useEffect(() => {
    if (urlPatternId && urlPatternId !== selectedPatternId) {
      setSelectedPatternId(urlPatternId);
    }
  }, [urlPatternId]);

  const filteredTopics = topics.filter(topic =>
    topic.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedPattern = getPattern(selectedPatternId);

  const handlePatternSelect = (patternId) => {
    setSelectedPatternId(patternId);
    setSidebarOpen(false);
    navigate(`/explorer/${patternId}`);
    if (onMobilePatternSelectorToggle) {
      onMobilePatternSelectorToggle(false);
    }
  };
  
  // Open sidebar when mobile pattern selector is clicked
  useEffect(() => {
    const handleMobileOpen = () => {
      setSidebarOpen(true);
    };
    window.addEventListener('openMobilePatternSelector', handleMobileOpen);
    return () => window.removeEventListener('openMobilePatternSelector', handleMobileOpen);
  }, []);

  return (
    <div className="flex h-[calc(100vh-57px)] relative">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:relative inset-y-0 left-0 z-40 w-72 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Mobile Close Button */}
        <div className="lg:hidden flex items-center justify-between p-3 border-b border-gray-200 dark:border-gray-700">
          <span className="font-semibold text-gray-800 dark:text-gray-200">Patterns</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600 dark:text-gray-400" />
          </button>
        </div>

        {/* Search */}
        <div className="p-3 sm:p-4 border-b border-gray-200 dark:border-gray-700">
          <input
            type="text"
            placeholder="Search patterns..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                    onClick={() => isAvailable && handlePatternSelect(topic.id)}
                    disabled={!isAvailable}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left text-sm transition-all
                      ${isSelected && isAvailable
                        ? 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 font-medium'
                        : isAvailable
                          ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          : 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                      }
                    `}
                  >
                    <span className="text-lg">{topic.icon}</span>
                    <span className="flex-1">{topic.label}</span>
                    {!isAvailable ? (
                      <Lock size={14} className="text-gray-300 dark:text-gray-600" />
                    ) : isSelected ? (
                      <ChevronRight size={16} className="text-blue-500 dark:text-blue-400" />
                    ) : null}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Stats */}
        <div className="p-3 sm:p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {topics.filter(t => t.available).length}
            </span>
            {' '}of {topics.length} patterns available
          </div>
          <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div 
              className="bg-blue-500 dark:bg-blue-400 h-1.5 rounded-full transition-all"
              style={{ width: `${(topics.filter(t => t.available).length / topics.length) * 100}%` }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white dark:bg-gray-900">
        {selectedPattern ? (
          <PatternDetail 
            pattern={selectedPattern} 
            initialSection={urlSection}
            initialProblem={urlProblemName ? decodeURIComponent(urlProblemName) : null}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">
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
