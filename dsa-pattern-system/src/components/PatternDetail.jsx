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
                return <strong key={partIndex} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
              } else if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
                // Italic text
                return <em key={partIndex} className="italic text-gray-800">{part.slice(1, -1)}</em>;
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
    <div className="space-y-6">
      {/* Real World Analogy */}
      {introduction.realWorldAnalogy && (
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-amber-100 rounded-xl">
              <Sparkles className="text-amber-600" size={20} />
            </div>
            <h3 className="font-bold text-amber-900 text-base sm:text-lg">Real-World Analogy</h3>
          </div>
          <div className="text-gray-800 leading-relaxed text-sm sm:text-base">
            <FormattedText text={introduction.realWorldAnalogy} />
          </div>
        </div>
      )}

      {/* Simple Explanation */}
      {introduction.simpleExplanation && (
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-blue-100 rounded-xl">
              <BookOpen className="text-blue-600" size={20} />
            </div>
            <h3 className="font-bold text-blue-900 text-base sm:text-lg">Simple Explanation</h3>
          </div>
          <div className="text-gray-800 leading-relaxed text-sm sm:text-base">
            <FormattedText text={introduction.simpleExplanation} />
          </div>
        </div>
      )}

      {/* Visual Steps */}
      {introduction.visualSteps && introduction.visualSteps.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-5 sm:p-6 shadow-sm">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="p-2 bg-green-100 rounded-xl">
              <Target className="text-green-600" size={20} />
            </div>
            <h3 className="font-bold text-gray-900 text-base sm:text-lg">Step-by-Step Visualization</h3>
          </div>
          <div className="space-y-3 sm:space-y-4">
            {introduction.visualSteps.map((step, idx) => (
              <div key={idx} className="flex items-start gap-3 sm:gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100 hover:border-green-200 transition-all">
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center bg-gradient-to-br from-green-400 to-emerald-500 text-white font-bold rounded-xl text-base shadow-sm">
                  {step.step}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{step.title}</div>
                  <div className="text-sm text-gray-600 leading-relaxed">{step.description}</div>
                  {step.visual && (
                    <code className="mt-2 block text-xs sm:text-sm bg-slate-800 text-emerald-400 px-3 py-2 rounded-lg font-mono overflow-x-auto">
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
        <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 border-2 border-yellow-400 rounded-2xl p-5 sm:p-6 shadow-lg">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="p-2.5 bg-yellow-100 rounded-xl">
              <Lightbulb className="text-yellow-600 flex-shrink-0" size={24} />
            </div>
            <div>
              <h4 className="font-bold text-yellow-900 mb-2 text-sm sm:text-base">💡 Key Takeaway</h4>
              <p className="font-medium text-yellow-900 leading-relaxed text-sm sm:text-base">{introduction.keyTakeaway}</p>
            </div>
          </div>
        </div>
      )}

      {/* Pattern Recognition Signals */}
      {recognitionSignals && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <Target className="text-purple-600" size={20} />
            <h3 className="font-semibold text-purple-800">🎯 How to Recognize This Pattern</h3>
          </div>
          
          {/* Key Phrases */}
          {recognitionSignals.keyPhrases && (
            <div className="mb-4">
              <h4 className="text-sm font-medium text-purple-700 mb-2">Look for these keywords in problems:</h4>
              <div className="flex flex-wrap gap-2">
                {recognitionSignals.keyPhrases.map((phrase, idx) => (
                  <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                    "{phrase}"
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Problem Characteristics */}
          {recognitionSignals.problemCharacteristics && (
            <div className="mt-4">
              <h4 className="text-sm font-medium text-purple-700 mb-2">Problem characteristics:</h4>
              <ul className="space-y-1">
                {recognitionSignals.problemCharacteristics.map((char, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-purple-500 mt-1">✓</span>
                    {char}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Not Suitable When */}
          {recognitionSignals.notSuitableWhen && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <h4 className="text-sm font-medium text-red-700 mb-2">⚠️ NOT suitable when:</h4>
              <ul className="space-y-1">
                {recognitionSignals.notSuitableWhen.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-red-600">
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
        <div className="bg-gradient-to-r from-cyan-50 to-teal-50 border border-cyan-200 rounded-xl p-5">
          <div className="flex items-center gap-2 mb-3">
            <Link2 className="text-cyan-600" size={20} />
            <h3 className="font-semibold text-cyan-800">🔗 Related Patterns</h3>
          </div>
          <div className="space-y-2">
            {relatedPatterns.map((rel, idx) => (
              <div key={idx} className="flex items-start gap-3 p-2 bg-white rounded-lg">
                <span className="font-medium text-cyan-700 capitalize">{rel.id.replace(/-/g, ' ')}</span>
                <span className="text-gray-500">→</span>
                <span className="text-sm text-gray-600">{rel.relationship}</span>
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
      <header className="flex-shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 bg-gradient-to-r from-white to-gray-50">
        <div className="max-w-5xl mx-auto flex flex-col gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-2xl sm:text-3xl flex-shrink-0">{pattern.icon}</span>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">{pattern.title}</h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2.5 py-1 text-xs font-semibold rounded-lg ${getDifficultyColor(pattern.difficulty)}`}>
                  {pattern.difficulty}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-lg text-blue-700 text-xs font-medium">
                  <Clock size={12} />
                  {pattern.theory.complexity.time}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-purple-50 rounded-lg text-purple-700 text-xs font-medium">
                  <Database size={12} />
                  {pattern.theory.complexity.space}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Section Navigation */}
      <nav className="flex-shrink-0 px-3 sm:px-6 py-2.5 border-b border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="flex gap-2 overflow-x-auto scrollbar-thin pb-1 -mx-1 px-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`
                    flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all flex-shrink-0 shadow-sm
                    ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-blue-200'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }
                  `}
                >
                  <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  <span className="hidden sm:inline">{section.label}</span>
                  <span className="sm:hidden">{section.shortLabel}</span>
                  {section.id === 'problems' && (
                    <span className={`ml-1 px-1.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-md ${isActive ? 'bg-blue-600' : 'bg-gray-200 text-gray-700'}`}>
                      {pattern.problems.length}
                    </span>
                  )}
                  {section.id === 'templates' && (
                    <span className={`ml-1 px-1.5 py-0.5 text-[10px] sm:text-xs font-bold rounded-md ${isActive ? 'bg-blue-600' : 'bg-gray-200 text-gray-700'}`}>
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
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-5 sm:py-6">
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
