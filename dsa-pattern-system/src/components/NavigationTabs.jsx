import React from 'react';
import { BookOpen, GitBranch, LayoutDashboard } from 'lucide-react';

const NavigationTabs = ({ activeTab, onTabChange }) => {
  const tabs = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard,
      description: 'Track your progress'
    },
    { 
      id: 'explorer', 
      label: 'Pattern Explorer', 
      icon: BookOpen,
      description: 'Browse all patterns'
    },
    { 
      id: 'decision-tree', 
      label: 'Decision Tree', 
      icon: GitBranch,
      description: 'Find the right pattern'
    }
  ];

  return (
    <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4">
        <nav className="flex space-x-1" aria-label="Tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                onClick={() => onTabChange(tab.id)}
                className={`
                  group flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all
                  ${isActive 
                    ? 'border-blue-500 text-blue-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                <Icon 
                  size={18} 
                  className={isActive ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'} 
                />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </div>
  );
};

export default NavigationTabs;

