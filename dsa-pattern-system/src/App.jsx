import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
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

// Decision Tree Page Component
function DecisionTreePage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Extract topic from URL path
  const pathParts = location.pathname.split('/');
  const topicId = pathParts[2] || null;
  
  const [selectedPath, setSelectedPath] = useState([]);
  const [result, setResult] = useState(null);

  // Reset state when topic changes
  useEffect(() => {
    setSelectedPath([]);
    setResult(null);
  }, [topicId]);

  const handleNavigate = (option) => {
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

  const handleTopicSelect = (selectedTopicId) => {
    navigate(`/decision-tree/${selectedTopicId}`);
  };

  const handleBackToMenu = () => {
    navigate('/decision-tree');
  };

  const getCurrentNode = () => {
    if (!topicId) return null;
    let current = decisionTrees[topicId];
    for (let path of selectedPath) {
      const option = current?.options?.find(opt => opt.label === path);
      if (option?.next) {
        current = option.next;
      }
    }
    return current;
  };

  const currentNode = result ? null : getCurrentNode();

  if (!topicId) {
    return <Menu topics={legacyTopics} onTopicSelect={handleTopicSelect} />;
  }

  return (
    <div className="min-h-[calc(100vh-49px)] sm:min-h-[calc(100vh-57px)] bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 p-4 sm:p-8 transition-colors">
      <div className="max-w-4xl mx-auto">
        {!result ? (
          currentNode && (
            <DecisionFlow
              currentNode={currentNode}
              selectedPath={selectedPath}
              topicTitle={decisionTrees[topicId]?.title}
              onNavigate={handleNavigate}
              onReset={reset}
              onBackToMenu={handleBackToMenu}
            />
          )
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl shadow-xl p-4 sm:p-8 transition-colors">
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
}

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [userProfile, setProfile] = useState(null);
  const [showWelcome, setShowWelcome] = useState(false);
  const [mobilePatternSelectorOpen, setMobilePatternSelectorOpen] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(null);

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

  // Handler to navigate to pattern explorer with a specific pattern
  const handleSelectPattern = (patternId) => {
    navigate(`/explorer/${patternId}`);
  };

  // Determine active tab from current route
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.startsWith('/explorer')) return 'explorer';
    if (path.startsWith('/learning-path')) return 'learning-path';
    if (path.startsWith('/decision-tree')) return 'decision-tree';
    if (path === '/' || path.startsWith('/dashboard')) return 'dashboard';
    return 'dashboard';
  };

  const handleTabChange = (tab) => {
    switch (tab) {
      case 'dashboard':
        navigate('/dashboard');
        break;
      case 'learning-path':
        navigate('/learning-path');
        break;
      case 'explorer':
        navigate('/explorer');
        break;
      case 'decision-tree':
        navigate('/decision-tree');
        break;
      default:
        navigate('/dashboard');
    }
  };

  // Update current pattern from URL
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/explorer/')) {
      const patternId = path.split('/')[2];
      if (patternId) {
        const pattern = topics.find(t => t.id === patternId);
        setCurrentPattern(pattern || null);
      }
    } else {
      setCurrentPattern(null);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      <NavigationTabs 
        activeTab={getActiveTab()} 
        onTabChange={handleTabChange}
        onMobilePatternClick={() => setMobilePatternSelectorOpen(true)}
        currentPattern={currentPattern}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning-path" element={<LearningPath onSelectPattern={handleSelectPattern} />} />
        <Route path="/explorer" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
        <Route path="/explorer/:patternId" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
        <Route path="/explorer/:patternId/:section" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
        <Route path="/explorer/:patternId/:section/:problemName" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
        <Route path="/decision-tree/*" element={<DecisionTreePage />} />
      </Routes>
      {showWelcome && <WelcomeModal onComplete={handleWelcomeComplete} />}
    </div>
  );
}

export default App;
