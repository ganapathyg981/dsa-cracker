import React, { useState } from 'react';
import { Clock, Cpu, BookOpen, Code2, AlertTriangle, Layers, ListChecks, Database, Lightbulb, Target, Link2, Sparkles } from 'lucide-react';
import TheorySection from './TheorySection';
import CodeTemplate from './CodeTemplate';
import ProblemList from './ProblemList';
import MistakesSection from './MistakesSection';
import VariationsSection from './VariationsSection';

// Helper function to render text with markdown-style formatting
const FormattedText = ({ text }) => {
  if (!text) return null;
  
  // Split by lines first to preserve line breaks
  const lines = text.split('\n');
  
  return (
    <>
      {lines.map((line, lineIndex) => {
        // Split by both **bold** and *italic* markers
        // This regex captures both ** and * patterns
        const parts = line.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
        
        return (
          <React.Fragment key={lineIndex}>
            {parts.map((part, partIndex) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                // Bold text
                return <strong key={partIndex} className="font-bold text-gray-900 dark:text-gray-100">{part.slice(2, -2)}</strong>;
              } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
                // Italic text
                return <em key={partIndex} className="italic text-gray-800 dark:text-gray-200">{part.slice(1, -1)}</em>;
              }
              return <span key={partIndex}>{part}</span>;
            })}
            {lineIndex < lines.length - 1 && <br />}
          </React.Fragment>
        );
      })}
    </>
  );
};

// Beginner-Friendly Introduction Section Component
const IntroductionSection = ({ introduction, recognitionSignals, relatedPatterns }) => {
  if (!introduction) return null;

  return (
    <div className="space-y-3 sm:space-y-4">
      {/* Real World Analogy */}
      {introduction.realWorldAnalogy && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-2 border-amber-200 dark:border-amber-700 rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1.5 bg-amber-100 dark:bg-amber-800 rounded-lg">
              <Sparkles className="text-amber-600 dark:text-amber-400" size={18} />
            </div>
            <h3 className="font-bold text-amber-900 dark:text-amber-200 text-sm sm:text-base">Real-World Analogy</h3>
          </div>
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm">
            <FormattedText text={introduction.realWorldAnalogy} />
          </div>
        </div>
      )}

      {/* Simple Explanation */}
      {introduction.simpleExplanation && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-2 border-blue-200 dark:border-blue-700 rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1.5 bg-blue-100 dark:bg-blue-800 rounded-lg">
              <BookOpen className="text-blue-600 dark:text-blue-400" size={18} />
            </div>
            <h3 className="font-bold text-blue-900 dark:text-blue-200 text-sm sm:text-base">Simple Explanation</h3>
          </div>
          <div className="text-gray-800 dark:text-gray-200 leading-relaxed text-sm">
            <FormattedText text={introduction.simpleExplanation} />
          </div>
        </div>
      )}

      {/* Visual Steps */}
      {introduction.visualSteps && introduction.visualSteps.length > 0 && (
        <div className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <div className="p-1.5 bg-green-100 dark:bg-green-800 rounded-lg">
              <Target className="text-green-600 dark:text-green-400" size={18} />
            </div>
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-sm sm:text-base">Step-by-Step Visualization</h3>
          </div>
          <div className="space-y-2 sm:space-y-2.5">
            {introduction.visualSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-2.5 p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 hover:border-green-200 dark:hover:border-green-600 transition-all">
                <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold rounded-lg text-sm shadow-sm">
                  {step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 dark:text-gray-100 mb-0.5 text-sm">{step.title}</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</div>
                  {step.visual && (
                    <code className="mt-1.5 block text-xs bg-slate-800 text-emerald-400 px-2.5 py-1.5 rounded-lg font-mono overflow-x-auto">
                      {step.visual}
                    </code>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Key Takeaway */}
      {introduction.keyTakeaway && (
        <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 dark:from-yellow-900/30 dark:via-amber-900/30 dark:to-orange-900/30 border-2 border-yellow-400 dark:border-yellow-600 rounded-xl p-3 sm:p-4 shadow-lg">
          <div className="flex items-start gap-2.5">
            <div className="p-1.5 bg-yellow-100 dark:bg-yellow-800 rounded-lg">
              <Lightbulb className="text-yellow-600 dark:text-yellow-400 flex-shrink-0" size={20} />
            </div>
            <div>
              <h4 className="font-bold text-yellow-900 dark:text-yellow-200 mb-1.5 text-sm">💡 Key Takeaway</h4>
              <p className="font-medium text-yellow-900 dark:text-yellow-200 leading-relaxed text-sm">{introduction.keyTakeaway}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pattern Recognition Signals */}
      {recognitionSignals && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-700 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2.5">
            <Target className="text-purple-600 dark:text-purple-400" size={18} />
            <h3 className="font-semibold text-purple-800 dark:text-purple-200 text-sm">🎯 How to Recognize This Pattern</h3>
          </div>
          
          {/* Key Phrases */}
          {recognitionSignals.keyPhrases && (
            <div className="mb-3">
              <h4 className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300 mb-1.5">Look for these keywords in problems:</h4>
              <div className="flex flex-wrap gap-1.5">
                {recognitionSignals.keyPhrases.map((phrase, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 rounded-full text-xs">
                    "{phrase}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Problem Characteristics */}
          {recognitionSignals.problemCharacteristics && (
            <div className="mt-3">
              <h4 className="text-xs sm:text-sm font-medium text-purple-700 dark:text-purple-300 mb-1.5">Problem characteristics:</h4>
              <ul className="space-y-0.5">
                {recognitionSignals.problemCharacteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                    <span className="text-purple-500 dark:text-purple-400 mt-0.5">✓</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Not Suitable When */}
          {recognitionSignals.notSuitableWhen && (
            <div className="mt-3 p-2.5 bg-red-50 dark:bg-red-900/30 rounded-lg border border-red-200 dark:border-red-800">
              <h4 className="text-xs sm:text-sm font-medium text-red-700 dark:text-red-300 mb-1.5">⚠️ NOT suitable when:</h4>
              <ul className="space-y-0.5">
                {recognitionSignals.notSuitableWhen.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-1.5 text-xs sm:text-sm text-red-600 dark:text-red-400">
                    <span>✗</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Related Patterns */}
      {relatedPatterns && relatedPatterns.length > 0 && (
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 dark:from-cyan-900/30 dark:to-teal-900/30 border border-cyan-200 dark:border-cyan-700 rounded-xl p-3 sm:p-4">
          <div className="flex items-center gap-2 mb-2">
            <Link2 className="text-cyan-600 dark:text-cyan-400" size={18} />
            <h3 className="font-semibold text-cyan-800 dark:text-cyan-200 text-sm">🔗 Related Patterns</h3>
          </div>
          <div className="space-y-1.5">
            {relatedPatterns.map((rel, idx) => (
              <div key={idx} className="flex items-start gap-2 p-2 bg-white dark:bg-gray-800 rounded-lg">
                <span className="font-medium text-cyan-700 dark:text-cyan-300 capitalize text-xs sm:text-sm">{rel.id.replace(/-/g, ' ')}</span>
                <span className="text-gray-500 dark:text-gray-500 text-xs">→</span>
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{rel.relationship}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const PatternDetail = ({ pattern }) => {
  // Default to 'intro' if introduction exists, otherwise 'theory'
  const [activeSection, setActiveSection] = useState(pattern.introduction ? 'intro' : 'theory');

  // Build sections dynamically based on available content
  const sections = [
    ...(pattern.introduction ? [{ id: 'intro', label: '🌟 Start Here', shortLabel: '🌟 Start', icon: Sparkles }] : []),
    { id: 'theory', label: 'Theory', shortLabel: 'Theory', icon: BookOpen },
    { id: 'templates', label: 'Code Templates', shortLabel: 'Code', icon: Code2 },
    { id: 'problems', label: 'Problems', shortLabel: 'Problems', icon: ListChecks },
    { id: 'mistakes', label: 'Common Mistakes', shortLabel: 'Mistakes', icon: AlertTriangle },
    { id: 'variations', label: 'Variations', shortLabel: 'Variants', icon: Layers },
  ];

  const getDifficultyColor = (difficulty) => {
    if (difficulty.toLowerCase().includes('easy')) return 'bg-green-100 text-green-700';
    if (difficulty.toLowerCase().includes('hard')) return 'bg-red-100 text-red-700';
    return 'bg-yellow-100 text-yellow-700';
  };

  return (
    <div className="flex flex-col h-full">
      {/* Compact Header */}
      <header className="flex-shrink-0 px-3 sm:px-4 py-1.5 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-5xl mx-auto flex items-center gap-2 min-w-0">
          <span className="text-lg sm:text-xl flex-shrink-0">{pattern.icon}</span>
          <div className="flex-1 min-w-0">
            <h1 className="text-sm sm:text-base font-bold text-gray-900 dark:text-gray-100 leading-tight">{pattern.title}</h1>
          </div>
          <div className="flex items-center gap-1 flex-shrink-0">
            <span className={`px-1.5 py-0.5 text-[10px] sm:text-xs font-semibold rounded ${getDifficultyColor(pattern.difficulty)}`}>
              {pattern.difficulty}
            </span>
            <span className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 rounded text-blue-700 dark:text-blue-300 text-[10px] font-medium">
              <Clock size={10} />
              {pattern.theory.complexity.time}
            </span>
            <span className="hidden sm:flex items-center gap-1 px-1.5 py-0.5 bg-purple-50 dark:bg-purple-900/30 rounded text-purple-700 dark:text-purple-300 text-[10px] font-medium">
              <Database size={10} />
              {pattern.theory.complexity.space}
            </span>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <nav className="flex-shrink-0 px-2 sm:px-3 py-1 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-1 overflow-x-auto scrollbar-thin -mx-1 px-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex items-center gap-1 px-2 sm:px-2.5 py-1 rounded text-[11px] sm:text-xs font-semibold whitespace-nowrap transition-all flex-shrink-0
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm'
                      : 'bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 border border-gray-200 dark:border-gray-600'
                    }
                  `}
                >
                  <Icon size={13} className="sm:w-3.5 sm:h-3.5" />
                  <span className="hidden sm:inline">{section.label}</span>
                  <span className="sm:hidden">{section.shortLabel}</span>
                  {section.id === 'problems' && (
                    <span className={`ml-0.5 px-1 py-0.5 text-[9px] sm:text-[10px] font-bold rounded ${isActive ? 'bg-blue-600' : 'bg-gray-200 text-gray-700'}`}>
                      {pattern.problems.length}
                    </span>
                  )}
                  {section.id === 'templates' && (
                    <span className={`ml-0.5 px-1 py-0.5 text-[9px] sm:text-[10px] font-bold rounded ${isActive ? 'bg-blue-600' : 'bg-gray-200 text-gray-700'}`}>
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
      <div className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
        <div className="max-w-5xl mx-auto px-3 sm:px-4 py-3 sm:py-4">
          {activeSection === 'intro' && pattern.introduction && (
            <IntroductionSection 
              introduction={pattern.introduction} 
              recognitionSignals={pattern.recognitionSignals}
              relatedPatterns={pattern.relatedPatterns}
            />
          )}

          {activeSection === 'theory' && (
            <TheorySection theory={pattern.theory} decisionTree={pattern.decisionTree} />
          )}
          
          {activeSection === 'templates' && (
            <div className="space-y-3 sm:space-y-4">
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
