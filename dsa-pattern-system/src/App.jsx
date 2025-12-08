import { useState, useEffect, useCallback, createContext, useContext } from 'react';
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
import { 
  getCurrentUserId, 
  getCurrentGistId,
  setCurrentUser,
  clearCurrentUser,
  isLoggedIn,
} from './utils/storage';
import { getUserProgress, saveUserProgress, isConfigured } from './services/gistService';
import './App.css';

// Create a context to share user data across the app
export const UserDataContext = createContext(null);

export function useUserData() {
  return useContext(UserDataContext);
}

function DecisionTreePage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const pathParts = location.pathname.split('/');
  const topicId = pathParts[2] || null;
  
  const [selectedPath, setSelectedPath] = useState([]);
  const [result, setResult] = useState(null);

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
  const [userData, setUserData] = useState(null); // { profile, progress, goals }
  const [showWelcome, setShowWelcome] = useState(false);
  const [mobilePatternSelectorOpen, setMobilePatternSelectorOpen] = useState(false);
  const [currentPattern, setCurrentPattern] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  // Load user data from Gist
  const loadUserData = useCallback(async () => {
    const userId = getCurrentUserId();
    if (!userId || !isConfigured()) {
      return null;
    }

    try {
      const data = await getUserProgress(userId);
      return data;
    } catch (error) {
      console.error('Error loading user data from Gist:', error);
      return null;
    }
  }, []);

  // Save user data to Gist
  const saveData = useCallback(async (newProgress, newGoals) => {
    const userId = getCurrentUserId();
    if (!userId || !isConfigured()) {
      return false;
    }

    try {
      await saveUserProgress(userId, {
        profile: userData?.profile,
        progress: newProgress,
        goals: newGoals || userData?.goals,
      });
      
      // Update local state
      setUserData(prev => ({
        ...prev,
        progress: newProgress,
        goals: newGoals || prev?.goals,
      }));
      
      return true;
    } catch (error) {
      console.error('Error saving to Gist:', error);
      return false;
    }
  }, [userData]);

  // Initialize user
  const initializeUser = useCallback(async () => {
    setIsLoading(true);

    try {
      if (isLoggedIn() && isConfigured()) {
        const data = await loadUserData();
        if (data) {
          setUserData(data);
        } else {
          // User was logged in but data not found - show welcome
          clearCurrentUser();
          setShowWelcome(true);
        }
      } else {
        setShowWelcome(true);
      }
    } catch (error) {
      console.error('Error initializing user:', error);
      setShowWelcome(true);
    } finally {
      setIsLoading(false);
    }
  }, [loadUserData]);

  useEffect(() => {
    initializeUser();
  }, [initializeUser, refreshKey]);

  const handleWelcomeComplete = (data) => {
    setCurrentUser(data.userId, data.gistId);
    
    setUserData({
      profile: data.profile,
      progress: data.progress,
      goals: data.goals,
    });
    
    setShowWelcome(false);
  };

  const handleLogout = () => {
    clearCurrentUser();
    setUserData(null);
    setShowWelcome(true);
    setRefreshKey(k => k + 1);
    navigate('/dashboard');
  };

  const handleSelectPattern = (patternId) => {
    navigate(`/explorer/${patternId}`);
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center transition-colors">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your progress...</p>
        </div>
      </div>
    );
  }

  const contextValue = {
    userData,
    setUserData,
    saveData,
    refreshData: () => setRefreshKey(k => k + 1),
  };

  return (
    <UserDataContext.Provider value={contextValue}>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
        <NavigationTabs 
          activeTab={getActiveTab()} 
          onTabChange={handleTabChange}
          onMobilePatternClick={() => setMobilePatternSelectorOpen(true)}
          currentPattern={currentPattern}
          onLogout={handleLogout}
        />
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard key={refreshKey} />} />
          <Route path="/learning-path" element={<LearningPath onSelectPattern={handleSelectPattern} />} />
          <Route path="/explorer" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
          <Route path="/explorer/:patternId" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
          <Route path="/explorer/:patternId/:section" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
          <Route path="/explorer/:patternId/:section/:problemName" element={<PatternExplorer onMobilePatternSelectorToggle={setMobilePatternSelectorOpen} />} />
          <Route path="/decision-tree/*" element={<DecisionTreePage />} />
        </Routes>
        {showWelcome && <WelcomeModal onComplete={handleWelcomeComplete} />}
      </div>
    </UserDataContext.Provider>
  );
}

export default App;
