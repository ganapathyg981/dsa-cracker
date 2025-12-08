import React, { useState } from 'react';
import { BookOpen, GitBranch, LayoutDashboard, Rocket, Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const NavigationTabs = ({ activeTab, onTabChange, onMobilePatternClick, currentPattern }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useTheme();
  
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      shortLabel: 'Home',
      icon: LayoutDashboard,
      description: 'Track your progress'
    },
    { 
      id: 'learning-path', 
      label: '🌟 Learning Path', 
      shortLabel: '🌟 Path',
      icon: Rocket,
      description: 'Structured learning for beginners',
      isNew: true
    },
    { 
      id: 'explorer', 
      label: 'Pattern Explorer', 
      shortLabel: 'Patterns',
      icon: BookOpen,
      description: 'Browse all patterns'
    },
    { 
      id: 'decision-tree', 
      label: 'Decision Tree', 
      shortLabel: 'Decide',
      icon: GitBranch,
      description: 'Find the right pattern'
    }
  ];

  return (
    <>
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 shadow-sm transition-colors">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center">
            {/* Mobile Hamburger Menu */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-3 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95 transition-all"
              aria-label="Menu"
            >
              <Menu size={24} className="text-gray-700 dark:text-gray-300" />
            </button>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex gap-1 overflow-x-auto scrollbar-thin py-1 px-4 flex-1" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                
                return (
                  <button
                    key={tab.id}
                    onClick={() => onTabChange(tab.id)}
                    className={`
                      group relative flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-all whitespace-nowrap flex-shrink-0
                      ${isActive 
                        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg shadow-blue-200 dark:shadow-blue-900/50' 
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-95'
                      }
                    `}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <Icon 
                      size={18} 
                      className={isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-600'} 
                    />
                    <span>{tab.label}</span>
                    {tab.isNew && (
                      <span className="absolute -top-1 -right-1 px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-bold rounded-full shadow-md animate-pulse ring-2 ring-white">
                        NEW
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Mobile: Current Tab Display */}
            <div className="lg:hidden flex-1 flex items-center justify-center py-3">
              {tabs.map((tab) => {
                if (tab.id !== activeTab) return null;
                const Icon = tab.icon;
                return (
                  <div key={tab.id} className="flex items-center gap-2">
                    <Icon size={18} className="text-blue-500 dark:text-blue-400" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">{tab.shortLabel}</span>
                    {tab.isNew && (
                      <span className="px-1.5 py-0.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[9px] font-bold rounded-full shadow-sm">
                        NEW
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Dark Mode Toggle - Desktop & Mobile */}
            <button
              onClick={toggleDarkMode}
              className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg active:scale-95 transition-all"
              aria-label="Toggle dark mode"
              title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDarkMode ? (
                <Sun size={20} className="text-yellow-500" />
              ) : (
                <Moon size={20} className="text-gray-600" />
              )}
            </button>

            {/* Pattern Selector - Only show on mobile when in explorer tab */}
            {activeTab === 'explorer' && onMobilePatternClick && currentPattern && (
              <button
                onClick={() => {
                  onMobilePatternClick();
                  window.dispatchEvent(new Event('openMobilePatternSelector'));
                }}
                className="lg:hidden p-3 hover:bg-gray-100 active:scale-95 transition-all"
                aria-label="Select Pattern"
              >
                <span className="text-2xl">{currentPattern.icon}</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Slide-out Menu */}
      {mobileMenuOpen && (
        <>
          {/* Overlay */}
          <div 
            className="lg:hidden fixed inset-0 bg-black/50 z-[45] animate-fade-in"
            onClick={() => setMobileMenuOpen(false)}
          />
          
          {/* Menu Panel */}
          <div className="lg:hidden fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-800 z-50 shadow-2xl transform transition-transform duration-300 ease-out">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-200">Navigation</h2>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} className="text-gray-600 dark:text-gray-400" />
                </button>
              </div>

              {/* Menu Items */}
              <nav className="flex-1 overflow-y-auto p-3">
                <div className="space-y-1">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    
                    return (
                      <button
                        key={tab.id}
                        onClick={() => {
                          onTabChange(tab.id);
                          setMobileMenuOpen(false);
                        }}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all text-left
                          ${isActive 
                            ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-lg' 
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 active:scale-98'
                          }
                        `}
                      >
                        <Icon 
                          size={20} 
                          className={isActive ? 'text-white' : 'text-gray-400 dark:text-gray-500'} 
                        />
                        <span className="font-medium">{tab.label}</span>
                        {tab.isNew && (
                          <span className="ml-auto px-2 py-0.5 bg-gradient-to-r from-orange-500 to-pink-500 text-white text-[10px] font-bold rounded-full shadow-sm">
                            NEW
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Dark Mode Toggle in Mobile Menu */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={toggleDarkMode}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all text-left"
                  >
                    {isDarkMode ? (
                      <>
                        <Sun size={20} className="text-yellow-500" />
                        <span className="font-medium">Light Mode</span>
                      </>
                    ) : (
                      <>
                        <Moon size={20} className="text-gray-400" />
                        <span className="font-medium">Dark Mode</span>
                      </>
                    )}
                  </button>
                </div>
              </nav>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  DSA Pattern System
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default NavigationTabs;

