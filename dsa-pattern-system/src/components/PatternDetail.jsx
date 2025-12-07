import React, { useState } from 'react';
import { Clock, Cpu, BookOpen, Code2, AlertTriangle, Layers, ListChecks } from 'lucide-react';
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

  return (
    <div className="flex flex-col h-full">
      {/* Header - Fixed at top */}
      <header className="flex-shrink-0 px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-4xl">{pattern.icon}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{pattern.title}</h1>
              <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <Clock size={14} />
                  {pattern.difficulty}
                </span>
                <span className="flex items-center gap-1">
                  <Cpu size={14} />
                  Time: {pattern.theory.complexity.time}
                </span>
                <span className="flex items-center gap-1">
                  Space: {pattern.theory.complexity.space}
                </span>
              </div>
            </div>
          </div>
          
          {/* Key Insight Box */}
          <div className="mt-4 p-4 bg-white rounded-lg border-l-4 border-blue-500 shadow-sm">
            <p className="text-sm font-medium text-blue-800">💡 Key Insight</p>
            <p className="mt-1 text-gray-700">{pattern.theory.keyInsight}</p>
          </div>
        </div>
      </header>

      {/* Section Navigation - Fixed below header */}
      <nav className="flex-shrink-0 px-8 py-3 border-b border-gray-200 bg-gray-50 z-10">
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
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-5xl mx-auto px-8 py-6">
          {activeSection === 'theory' && (
            <TheorySection theory={pattern.theory} decisionTree={pattern.decisionTree} />
          )}
          
          {activeSection === 'templates' && (
            <div className="space-y-8">
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

