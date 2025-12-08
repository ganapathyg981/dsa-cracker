import { useState, useEffect } from 'react';
import NavigationTabs from './components/NavigationTabs';
import PatternExplorer from './components/PatternExplorer';
import Dashboard from './components/Dashboard';
import WelcomeModal from './components/WelcomeModal';
import Menu from './components/Menu';
import DecisionFlow from './components/DecisionFlow';
import ResultDisplay from './components/ResultDisplay';
import ProTips from './components/ProTips';
import LearningPath from './components/LearningPath';
import { decisionTrees } from './data/decisionTrees';
import { topics as legacyTopics } from './data/topics';
import { topics } from './data/patterns';
import { getUserProfile, setUserProfile } from './utils/storage';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [userProfile, setProfile] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [mobilePatternSelectorOpen, setMobilePatternSelectorOpen] = useState(false);

  useEffect(() => {
    const profile = getUserProfile();
    if (profile) {
      setProfile(profile);
    } else {
      setShowWelcome(true);
    }
  }, []);

  const handleWelcomeComplete = (profileData) => {
    const profile = setUserProfile(profileData);
    setProfile(profile);
    setShowWelcome(false);
  };
  
  // Decision Tree state
  const [activeSection, setActiveSection] = useState('menu');
  const [selectedPath, setSelectedPath] = useState([]);
  const [result, setResult] = useState(null);

  const navigate = (option) => {
    const newPath = [...selectedPath, option.label];
    setSelectedPath(newPath);
    
    if (option.result) {
      setResult(option.result);
    } else if (option.next) {
      setResult(null);
    }
  };

  const reset = () => {
    setSelectedPath([]);
    setResult(null);
  };

  const handleTopicSelect = (topicId) => {
    setActiveSection(topicId);
    reset();
  };

  const handleBackToMenu = () => {
    setActiveSection('menu');
    reset();
  };

  const getCurrentNode = () => {
    if (!activeSection || activeSection === 'menu') return null;
    let current = decisionTrees[activeSection];
    for (let path of selectedPath) {
      const option = current.options?.find(opt => opt.label === path);
      if (option?.next) {
        current = option.next;
      }
    }
    return current;
  };

  const currentNode = result ? null : getCurrentNode();

  // Handler to navigate to pattern explorer with a specific pattern
  const handleSelectPattern = (patternId) => {
    setActiveTab('explorer');
    // The PatternExplorer will handle the pattern selection via its own state
    // We store the selected pattern ID in sessionStorage for PatternExplorer to pick up
    sessionStorage.setItem('selectedPatternId', patternId);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'learning-path':
        return <LearningPath onSelectPattern={handleSelectPattern} />;
      case 'explorer':
        return <PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />;
      case 'decision-tree':
        return activeSection === 'menu' ? (
          <Menu topics={legacyTopics} onTopicSelect={handleTopicSelect} />
        ) : (
          <div className="min-h-[calc(100vh-49px)] sm:min-h-[calc(100vh-57px)] bg-gradient-to-br from-blue-50 to-purple-50 p-4 sm:p-8">
            <div className="max-w-4xl mx-auto">
              {!result ? (
                currentNode && (
                  <DecisionFlow
                    currentNode={currentNode}
                    selectedPath={selectedPath}
                    topicTitle={decisionTrees[activeSection]?.title}
                    onNavigate={navigate}
                    onReset={reset}
                    onBackToMenu={handleBackToMenu}
                  />
                )
              ) : (
                <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8">
                  <ResultDisplay
                    result={result}
                    onReset={reset}
                    onBackToMenu={handleBackToMenu}
                  />
                </div>
              )}
              <ProTips />
            </div>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  // Get current pattern info for mobile nav
  const [currentPattern, setCurrentPattern] = useState(null);

  useEffect(() => {
    const updateCurrentPattern = () => {
      const patternId = sessionStorage.getItem('currentPatternId');
      if (patternId) {
        const pattern = topics.find(t => t.id === patternId);
        setCurrentPattern(pattern || null);
      } else {
        setCurrentPattern(null);
      }
    };

    updateCurrentPattern();
    // Listen for pattern changes
    const interval = setInterval(updateCurrentPattern, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <NavigationTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab}
        onMobilePatternClick={() => setMobilePatternSelectorOpen(true)}
        currentPattern={currentPattern}
      />
      {renderContent()}
      {showWelcome && <WelcomeModal onComplete={handleWelcomeComplete} />}
    </div>
  );
}

export default App;
