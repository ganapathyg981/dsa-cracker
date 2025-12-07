import React, { useState } from 'react';
import { Clock, Cpu, BookOpen, Code2, AlertTriangle, Layers, ListChecks, Database } from 'lucide-react';
import TheorySection from './TheorySection';
import CodeTemplate from './CodeTemplate';
import ProblemList from './ProblemList';
import MistakesSection from './MistakesSection';
import VariationsSection from './VariationsSection';

const PatternDetail = ({ pattern }) => {
  const [activeSection, setActiveSection] = useState('theory');

  const sections = [
    { id: 'theory', label: 'Theory', icon: BookOpen },
    { id: 'templates', label: 'Code Templates', icon: Code2 },
    { id: 'problems', label: 'Problems', icon: ListChecks },
    { id: 'mistakes', label: 'Common Mistakes', icon: AlertTriangle },
    { id: 'variations', label: 'Variations', icon: Layers },
  ];

  const getDifficultyColor = (difficulty) => {
    if (difficulty.toLowerCase().includes('easy')) return 'bg-green-100 text-green-700';
    if (difficulty.toLowerCase().includes('hard')) return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <header className="flex-shrink-0 px-6 py-3 border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{pattern.icon}</span>
            <h1 className="text-xl font-bold text-gray-800">{pattern.title}</h1>
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getDifficultyColor(pattern.difficulty)}`}>
              {pattern.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <span className="flex items-center gap-1 px-2 py-1 bg-blue-50 rounded-md text-blue-700">
              <Clock size={12} />
              {pattern.theory.complexity.time}
            </span>
            <span className="flex items-center gap-1 px-2 py-1 bg-purple-50 rounded-md text-purple-700">
              <Database size={12} />
              {pattern.theory.complexity.space}
            </span>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <nav className="flex-shrink-0 px-6 py-2 border-b border-gray-200 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex space-x-1 overflow-x-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all
                    ${isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:bg-gray-100'
                    }
                  `}
                >
                  <Icon size={16} />
                  {section.label}
                  {section.id === 'problems' && (
                    <span className={`ml-1 px-1.5 py-0.5 text-xs rounded ${isActive ? 'bg-blue-200' : 'bg-gray-200'}`}>
                      {pattern.problems.length}
                    </span>
                  )}
                  {section.id === 'templates' && (
                    <span className={`ml-1 px-1.5 py-0.5 text-xs rounded ${isActive ? 'bg-blue-200' : 'bg-gray-200'}`}>
                      {pattern.templates.length}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto bg-gray-50">
        <div className="max-w-5xl mx-auto px-6 py-6">
          {activeSection === 'theory' && (
            <TheorySection theory={pattern.theory} decisionTree={pattern.decisionTree} />
          )}
          
          {activeSection === 'templates' && (
            <div className="space-y-6">
              {pattern.templates.map((template, index) => (
                <CodeTemplate key={template.id || index} template={template} index={index} />
              ))}
            </div>
          )}
          
          {activeSection === 'problems' && (
            <ProblemList problems={pattern.problems} patternId={pattern.id} />
          )}
          
          {activeSection === 'mistakes' && (
            <MistakesSection mistakes={pattern.mistakes} />
          )}
          
          {activeSection === 'variations' && (
            <VariationsSection variations={pattern.variations} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PatternDetail;
