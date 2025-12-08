import React, { useState, useRef, useEffect } from 'react';
import { 
  Trophy, Target, Flame, TrendingUp, Download, Upload, 
  CheckCircle2, Clock, Award, Users, ChevronRight, X, Trash2,
  Zap, Sparkles, Star, Coffee, Rocket, Copy, Shield, RotateCcw, Check
} from 'lucide-react';
import { topics, patterns, getPattern } from '../data/patterns';
import { 
  getUserProfile, getTotalStats, getWeeklyGoals, setWeeklyGoal,
  getWeeklyProgress, exportProgress, importMemberProgress, 
  getLeaderboardData, getRecentActivity, getImportedMembers, removeImportedMember,
  downloadProgressBackup, copyProgressToClipboard, importOwnProgress,
  getAllBackups, restoreFromBackup, getLastBackupTime, toggleProblemComplete,
  getCompletedProblemsForPattern
} from '../utils/storage';
import ProblemModal from './ProblemModal';

// Fun motivational messages
const motivationalMessages = [
  "You're crushing it! 💪",
  "Keep the momentum going! 🚀",
  "Every problem solved = interview confidence ++",
  "You're building your coding superpower! ⚡",
  "Small steps lead to big wins! 🏆",
  "Your future self will thank you! 🙌",
];

const getRandomMotivation = () => {
  return motivationalMessages[Math.floor(Math.random() * motivationalMessages.length)];
};

// Quick win problems (easiest unsolved)
const getQuickWins = (allPatterns, stats) => {
  const quickWins = [];
  for (const pattern of allPatterns) {
    if (!pattern?.problems) continue;
    for (const problem of pattern.problems) {
      if (problem.difficulty === 'Easy') {
        const patternStats = stats.patternStats[pattern.id];
        const isCompleted = patternStats?.completedProblems?.includes(problem.name);
        if (!isCompleted) {
          // Problems are already enhanced by getPattern()
          quickWins.push({
            ...problem,
            patternId: pattern.id,
            patternTitle: pattern.title,
            patternIcon: pattern.icon
          });
        }
        if (quickWins.length >= 5) break;
      }
    }
    if (quickWins.length >= 5) break;
  }
  return quickWins;
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showImportModal, setShowImportModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);
  const [copiedToClipboard, setCopiedToClipboard] = useState(false);
  const [backups, setBackups] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const fileInputRef = useRef(null);
  const restoreInputRef = useRef(null);

  // Calculate all dashboard data
  useEffect(() => {
    const profile = getUserProfile();
    // Use getPattern to get enhanced problems with details from problemDetails.js
    const allPatterns = topics.filter(t => t.available).map(t => getPattern(t.id)).filter(Boolean);
    const stats = getTotalStats(allPatterns);
    const weeklyGoals = getWeeklyGoals();
    const weeklyProgress = getWeeklyProgress();
    const recentActivity = getRecentActivity(5);
    const leaderboard = getLeaderboardData(allPatterns);
    const importedMembers = getImportedMembers();
    const quickWins = getQuickWins(allPatterns, stats);

    setDashboardData({
      profile,
      allPatterns,
      stats,
      weeklyGoals,
      weeklyProgress,
      recentActivity,
      leaderboard,
      importedMembers,
      quickWins
    });
  }, [refreshKey]);

  if (!dashboardData) {
    return <div className="min-h-[calc(100vh-57px)] bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
      <div className="text-gray-500 dark:text-gray-400">Loading...</div>
    </div>;
  }

  const { profile, allPatterns, stats, weeklyGoals, weeklyProgress, recentActivity, leaderboard, importedMembers, quickWins } = dashboardData;

  const handleExport = () => {
    downloadProgressBackup();
  };

  const handleCopyToClipboard = async () => {
    const result = await copyProgressToClipboard();
    if (result.success) {
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    }
  };

  const handleRestoreFromFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importOwnProgress(event.target?.result);
      if (result.success) {
        setImportSuccess('Progress restored successfully! Refreshing...');
        setImportError(null);
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setImportError(result.error);
        setImportSuccess(null);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const loadBackups = async () => {
    const savedBackups = await getAllBackups();
    setBackups(savedBackups);
  };

  const handleRestoreFromBackup = (backup) => {
    if (confirm(`Restore from backup dated ${new Date(backup.timestamp).toLocaleString()}? This will overwrite your current progress.`)) {
      const success = restoreFromBackup(backup);
      if (success) {
        setImportSuccess('Progress restored from backup! Refreshing...');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      }
    }
  };

  const lastBackup = getLastBackupTime();

  const handleImport = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = importMemberProgress(event.target?.result);
      if (result.success) {
        setImportSuccess(`Successfully imported ${result.memberName}'s progress!`);
        setImportError(null);
        setTimeout(() => {
          setImportSuccess(null);
          setShowImportModal(false);
        }, 2000);
      } else {
        setImportError(result.error);
        setImportSuccess(null);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const handleRemoveMember = (memberId, memberName) => {
    if (confirm(`Remove ${memberName} from the leaderboard?`)) {
      removeImportedMember(memberId);
      window.location.reload();
    }
  };

  const handleSetGoal = (target) => {
    setWeeklyGoal(target);
    window.location.reload();
  };

  const handleToggleProblemComplete = (problemName) => {
    if (selectedProblem?.patternId) {
      toggleProblemComplete(selectedProblem.patternId, problemName);
      // Force a re-render by updating state - this will recalculate stats and quickWins
      setRefreshKey(prev => prev + 1);
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'patterns', label: 'Patterns', icon: Target },
    { id: 'leaderboard', label: 'Study Group', icon: Users },
  ];

  // Calculate streak milestone
  const getStreakMilestone = (streak) => {
    if (streak >= 30) return { label: 'Legend', icon: '👑', color: 'text-yellow-500' };
    if (streak >= 14) return { label: 'On Fire', icon: '🔥', color: 'text-orange-500' };
    if (streak >= 7) return { label: 'Consistent', icon: '⭐', color: 'text-blue-500' };
    if (streak >= 3) return { label: 'Building', icon: '🌱', color: 'text-green-500' };
    return null;
  };

  const streakMilestone = getStreakMilestone(stats.streak.currentStreak);

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        {/* Header with motivation */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-xl sm:text-3xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
              Welcome back, {profile?.name || 'Student'}!
              {stats.streak.currentStreak > 0 && (
                <span className="text-xl sm:text-2xl animate-bounce-slow">{streakMilestone?.icon || '✨'}</span>
              )}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2 text-sm sm:text-base">
              <Sparkles size={16} className="text-amber-500 flex-shrink-0" />
              <span className="truncate">{getRandomMotivation()}</span>
            </p>
          </div>
          
          <div className="flex gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {/* Backup Status */}
            {lastBackup && (
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-700 rounded-xl text-emerald-700 dark:text-emerald-300 text-sm">
                <Shield size={16} />
                <span>Auto-saved</span>
              </div>
            )}
            <button
              onClick={() => {
                setShowBackupModal(true);
                loadBackups();
              }}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-all shadow-sm hover:shadow-md text-sm sm:text-base"
            >
              <Shield size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden sm:inline">Backup</span>
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 dark:shadow-violet-900/50 hover:shadow-xl hover:-translate-y-0.5 text-sm sm:text-base"
            >
              <Users size={16} className="sm:w-[18px] sm:h-[18px]" />
              <span className="hidden xs:inline">Study Group</span>
              <span className="xs:hidden">Group</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
          <StatCard
            icon={CheckCircle2}
            label="Problems Solved"
            value={stats.totalCompleted}
            subtext={`of ${stats.totalProblems} total`}
            color="emerald"
            progress={(stats.totalCompleted / stats.totalProblems) * 100}
          />
          <StatCard
            icon={Target}
            label="Weekly Goal"
            value={`${weeklyProgress}/${weeklyGoals.target}`}
            subtext={weeklyProgress >= weeklyGoals.target ? '🎉 Goal reached!' : `${weeklyGoals.target - weeklyProgress} to go`}
            color="violet"
            progress={(weeklyProgress / weeklyGoals.target) * 100}
            onEdit={() => {
              const newGoal = prompt('Set your weekly goal:', weeklyGoals.target);
              if (newGoal && !isNaN(parseInt(newGoal))) {
                handleSetGoal(parseInt(newGoal));
              }
            }}
          />
          <StatCard
            icon={Flame}
            label="Current Streak"
            value={`${stats.streak.currentStreak} days`}
            subtext={streakMilestone ? `${streakMilestone.label} Status!` : `Best: ${stats.streak.longestStreak} days`}
            color="orange"
            highlight={stats.streak.currentStreak >= 7}
          />
          <StatCard
            icon={Trophy}
            label="Mastery"
            value={`${stats.percentage}%`}
            subtext={`${Object.values(stats.patternStats).filter(p => p.masteryLevel?.level === 'advanced').length} patterns mastered`}
            color="amber"
            progress={stats.percentage}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl font-medium transition-all whitespace-nowrap text-sm sm:text-base ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-gray-800 text-violet-700 dark:text-violet-400 shadow-md'
                    : 'text-gray-600 dark:text-gray-400 hover:bg-white/50 dark:hover:bg-gray-800/50'
                }`}
              >
                <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Quick Wins Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-900/20 rounded-2xl p-4 sm:p-5 shadow-sm border border-emerald-100 dark:border-emerald-800 lg:col-span-2">
              <h3 className="font-semibold text-emerald-800 dark:text-emerald-300 mb-3 flex flex-wrap items-center gap-2 text-sm sm:text-base">
                <Zap size={16} className="sm:w-[18px] sm:h-[18px] text-emerald-600 dark:text-emerald-400" />
                Quick Wins - Easiest Unsolved
                <span className="text-xs bg-emerald-200 dark:bg-emerald-800 text-emerald-700 dark:text-emerald-200 px-2 py-0.5 rounded-full">
                  ~5 min each
                </span>
              </h3>
              {quickWins.length > 0 ? (
                <div className="space-y-2">
                  {quickWins.map((problem, idx) => (
                    <div 
                      key={idx} 
                      onClick={() => setSelectedProblem({ ...problem, patternId: problem.patternId })}
                      className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-emerald-100 dark:border-gray-700 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <span className="text-xl">{problem.patternIcon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 dark:text-gray-200 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                          {problem.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{problem.patternTitle}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-xs font-medium rounded-lg">
                        Easy
                      </span>
                      <ChevronRight size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star size={40} className="mx-auto mb-2 text-emerald-400" />
                  <p className="text-emerald-700 dark:text-emerald-300 font-medium">All easy problems completed!</p>
                  <p className="text-sm text-emerald-600 dark:text-emerald-400">Time to tackle medium difficulty 💪</p>
                </div>
              )}
            </div>

            {/* Difficulty Breakdown */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm sm:text-base">Difficulty Breakdown</h3>
              <div className="space-y-4">
                <DifficultyBar label="Easy" completed={stats.easyCompleted} color="green" emoji="🟢" />
                <DifficultyBar label="Medium" completed={stats.mediumCompleted} color="yellow" emoji="🟡" />
                <DifficultyBar label="Hard" completed={stats.hardCompleted} color="red" emoji="🔴" />
              </div>
              
              {/* Daily Tip */}
              <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium flex items-center gap-1">
                  <Coffee size={12} />
                  Pro Tip
                </p>
                <p className="text-sm text-blue-800 dark:text-blue-300 mt-1">
                  Do 2 Easy + 1 Medium daily for steady progress!
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700 lg:col-span-3">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 flex items-center gap-2 text-sm sm:text-base">
                <Clock size={16} className="sm:w-[18px] sm:h-[18px] text-gray-500 dark:text-gray-400" />
                Recent Activity
              </h3>
              {recentActivity.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
                  {recentActivity.map((activity, idx) => (
                    <div 
                      key={idx} 
                      className="flex-shrink-0 flex items-center gap-2 sm:gap-3 p-2.5 sm:p-3 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-gray-700 rounded-xl border border-gray-100 dark:border-gray-600 min-w-[240px] sm:min-w-[280px] hover:shadow-md transition-all"
                    >
                      <div className="w-8 h-8 sm:w-10 sm:h-10 bg-emerald-100 dark:bg-emerald-900/40 rounded-lg flex items-center justify-center">
                        <CheckCircle2 size={16} className="sm:w-5 sm:h-5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 dark:text-gray-200 truncate text-sm sm:text-base">{activity.problemName}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{patterns[activity.patternId]?.title}</p>
                      </div>
                      <span className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap">
                        {formatTimeAgo(activity.completedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                  <Rocket size={40} className="mx-auto mb-2 opacity-50" />
                  <p className="font-medium text-gray-600 dark:text-gray-400">Ready to start?</p>
                  <p className="text-sm">Solve your first problem to track progress!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4 text-sm sm:text-base">Pattern Progress</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {topics.filter(t => t.available).map((topic, idx) => {
                const patternStat = stats.patternStats[topic.id];
                return (
                  <PatternProgressCard
                    key={topic.id}
                    index={idx + 1}
                    icon={topic.icon}
                    name={topic.label}
                    completed={patternStat?.completed || 0}
                    total={patternStat?.total || 0}
                    mastery={patternStat?.masteryLevel}
                  />
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'leaderboard' && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 sm:p-6 shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4 sm:mb-6">
              <h3 className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base">Study Group Leaderboard</h3>
              {Object.keys(importedMembers).length > 0 && (
                <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  {Object.keys(importedMembers).length} member{Object.keys(importedMembers).length !== 1 ? 's' : ''} imported
                </span>
              )}
            </div>
            
            {leaderboard.length > 1 ? (
              <div className="space-y-3">
                {leaderboard.map((member, idx) => (
                  <LeaderboardRow
                    key={member.id}
                    rank={idx + 1}
                    member={member}
                    onRemove={!member.isCurrentUser ? () => handleRemoveMember(member.id, member.name) : null}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400 dark:text-gray-500">
                <Users size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium text-gray-600 dark:text-gray-400 mb-1">No study group members yet</p>
                <p className="text-sm text-gray-500 dark:text-gray-500">Import progress files from your study group to compare</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Import Modal (Study Group) */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Study Group</h3>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError(null);
                  setImportSuccess(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Upload a JSON progress file from a study group member to view their progress on the leaderboard.
            </p>

            {importError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                {importError}
              </div>
            )}

            {importSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 text-sm">
                {importSuccess}
              </div>
            )}

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImport}
              accept=".json"
              className="hidden"
            />

            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 font-medium hover:border-violet-400 dark:hover:border-violet-500 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 transition-all"
            >
              <Upload size={20} className="inline mr-2" />
              Import Member's Progress
            </button>
          </div>
        </div>
      )}

      {/* Backup & Restore Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60] p-3 sm:p-4 animate-fade-in">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-lg w-full p-4 sm:p-6 animate-scale-in max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Shield size={24} className="text-emerald-500" />
                Backup & Restore
              </h3>
              <button
                onClick={() => {
                  setShowBackupModal(false);
                  setImportError(null);
                  setImportSuccess(null);
                }}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            {/* Auto-backup status */}
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-300 mb-1">
                <CheckCircle2 size={18} />
                <span className="font-semibold">Auto-Backup Active</span>
              </div>
              <p className="text-emerald-600 dark:text-emerald-400 text-sm">
                Your progress is automatically saved to your browser's IndexedDB. 
                Even if localStorage is cleared, your data can be recovered.
              </p>
              {lastBackup && (
                <p className="text-emerald-500 dark:text-emerald-500 text-xs mt-2">
                  Last backup: {new Date(lastBackup).toLocaleString()}
                </p>
              )}
            </div>

            {importError && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-300 text-sm">
                {importError}
              </div>
            )}

            {importSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 text-sm">
                {importSuccess}
              </div>
            )}

            <div className="space-y-3">
              {/* Export options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 rounded-xl font-medium hover:bg-violet-200 dark:hover:bg-violet-900/60 transition-all text-sm sm:text-base"
                >
                  <Download size={16} className="sm:w-[18px] sm:h-[18px]" />
                  Download Backup
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center justify-center gap-2 py-2.5 sm:py-3 px-3 sm:px-4 bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 rounded-xl font-medium hover:bg-blue-200 dark:hover:bg-blue-900/60 transition-all text-sm sm:text-base"
                >
                  {copiedToClipboard ? <Check size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Copy size={16} className="sm:w-[18px] sm:h-[18px]" />}
                  {copiedToClipboard ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>

              {/* Restore from file */}
              <input
                type="file"
                ref={restoreInputRef}
                onChange={handleRestoreFromFile}
                accept=".json"
                className="hidden"
              />
              <button
                onClick={() => restoreInputRef.current?.click()}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-xl text-gray-600 dark:text-gray-400 font-medium hover:border-amber-400 dark:hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-all"
              >
                <RotateCcw size={18} />
                Restore from Backup File
              </button>

              {/* Previous backups */}
              {backups.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Previous Auto-Backups</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {backups.slice(0, 5).map((backup, idx) => (
                      <button
                        key={backup.id}
                        onClick={() => handleRestoreFromBackup(backup)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {new Date(backup.timestamp).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {backup.profile?.name || 'Unknown'} • {Object.keys(backup.progress?.completedProblems || {}).length} patterns
                          </p>
                        </div>
                        <RotateCcw size={16} className="text-gray-400 dark:text-gray-500" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tip */}
            <div className="mt-6 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl border border-blue-100 dark:border-blue-800">
              <p className="text-xs text-blue-700 dark:text-blue-300">
                💡 <strong>Tip:</strong> Download a backup file and save it to cloud storage (Google Drive, Dropbox) 
                for permanent safekeeping. You can restore from this file anytime, even on a different device.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Problem Modal */}
      {selectedProblem && (
        <ProblemModal
          problem={selectedProblem}
          patternId={selectedProblem.patternId}
          onClose={() => setSelectedProblem(null)}
          onToggleComplete={handleToggleProblemComplete}
          isCompleted={getCompletedProblemsForPattern(selectedProblem.patternId)[selectedProblem.name] || false}
        />
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, subtext, color, onEdit, progress, highlight }) => {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400',
    violet: 'bg-violet-100 text-violet-600 dark:bg-violet-900/30 dark:text-violet-400',
    orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400',
    amber: 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400',
  };

  const progressColors = {
    emerald: 'bg-emerald-500 dark:bg-emerald-400',
    violet: 'bg-violet-500 dark:bg-violet-400',
    orange: 'bg-orange-500 dark:bg-orange-400',
    amber: 'bg-amber-500 dark:bg-amber-400',
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-sm border border-gray-100 dark:border-gray-700 relative group hover:shadow-md transition-all ${highlight ? 'ring-2 ring-orange-200 dark:ring-orange-500' : ''}`}>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-2 right-2 sm:top-3 sm:right-3 p-1 sm:p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all"
          title="Edit goal"
        >
          <ChevronRight size={14} className="sm:w-4 sm:h-4 text-gray-400 dark:text-gray-500" />
        </button>
      )}
      <div className={`w-10 h-10 sm:w-12 sm:h-12 ${colorClasses[color]} rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-3`}>
        <Icon size={20} className="sm:w-6 sm:h-6" />
      </div>
      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mb-0.5 sm:mb-1">{label}</p>
      <p className="text-lg sm:text-2xl font-bold text-gray-800 dark:text-gray-100">{value}</p>
      <p className="text-xs sm:text-sm text-gray-400 dark:text-gray-500 mt-0.5 sm:mt-1 truncate">{subtext}</p>
      {progress !== undefined && (
        <div className="mt-2 sm:mt-3 h-1 sm:h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className={`h-full ${progressColors[color]} rounded-full transition-all duration-500`}
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

const DifficultyBar = ({ label, completed, color, emoji }) => {
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700 dark:text-gray-300 flex items-center gap-1">
          {emoji} {label}
        </span>
        <span className="text-gray-500 dark:text-gray-400">{completed} solved</span>
      </div>
      <div className="h-3 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(completed * 10, 100)}%` }}
        />
      </div>
    </div>
  );
};

const PatternProgressCard = ({ index, icon, name, completed, total, mastery }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-slate-50 dark:from-gray-700 dark:to-gray-700 rounded-xl hover:from-gray-100 hover:to-slate-100 dark:hover:from-gray-600 dark:hover:to-gray-600 transition-all group cursor-pointer">
      <div className="relative flex-shrink-0">
        <span className="text-xl sm:text-2xl">{icon}</span>
        <span className="absolute -top-1 -left-1 w-4 h-4 bg-violet-200 dark:bg-violet-800 text-violet-700 dark:text-violet-300 text-[10px] font-bold rounded-full flex items-center justify-center">
          {index}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1 gap-2">
          <span className="font-medium text-gray-800 dark:text-gray-200 text-sm sm:text-base truncate">{name}</span>
          <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 flex-shrink-0">{completed}/{total}</span>
        </div>
        <div className="h-1.5 sm:h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {mastery && mastery.level !== 'none' && (
        <div className={`hidden sm:block px-2 py-1 ${mastery.bgColor} ${mastery.color} text-xs font-medium rounded-lg flex-shrink-0`}>
          {mastery.level === 'advanced' && <Award size={12} className="inline mr-1" />}
          {mastery.label}
        </div>
      )}
    </div>
  );
};

const LeaderboardRow = ({ rank, member, onRemove }) => {
  const rankColors = {
    1: 'bg-gradient-to-br from-yellow-100 to-amber-100 dark:from-yellow-900/40 dark:to-amber-900/40 text-yellow-700 dark:text-yellow-400 border-yellow-300 dark:border-yellow-700',
    2: 'bg-gradient-to-br from-gray-100 to-slate-100 dark:from-gray-700 dark:to-slate-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600',
    3: 'bg-gradient-to-br from-amber-100 to-orange-100 dark:from-amber-900/40 dark:to-orange-900/40 text-amber-700 dark:text-amber-400 border-amber-300 dark:border-amber-700',
  };

  const rankIcons = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  };

  return (
    <div className={`flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl border transition-all hover:shadow-md ${
      member.isCurrentUser ? 'bg-violet-50 dark:bg-violet-900/30 border-violet-200 dark:border-violet-700' : 'bg-gray-50 dark:bg-gray-700 border-transparent hover:border-gray-200 dark:hover:border-gray-600'
    }`}>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl flex items-center justify-center font-bold text-base sm:text-lg border-2 flex-shrink-0 ${
          rankColors[rank] || 'bg-gray-50 dark:bg-gray-600 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-500'
        }`}>
          {rankIcons[rank] || rank}
        </div>
        <div className="flex-1 min-w-0 sm:flex-initial">
          <p className="font-semibold text-gray-800 dark:text-gray-200 text-sm sm:text-base truncate">{member.name}</p>
          <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            {member.totalCompleted} problems solved
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between sm:justify-end sm:flex-1 gap-3 sm:gap-6 text-xs sm:text-sm pl-11 sm:pl-0">
        <div className="text-center">
          <p className="font-semibold text-green-600 dark:text-green-400">{member.easyCompleted}</p>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs">Easy</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-yellow-600 dark:text-yellow-400">{member.mediumCompleted}</p>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs">Medium</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-red-600 dark:text-red-400">{member.hardCompleted}</p>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs">Hard</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-orange-500 dark:text-orange-400 flex items-center justify-center gap-1">
            {member.streak} <Flame size={10} className="sm:w-3 sm:h-3" />
          </p>
          <p className="text-gray-400 dark:text-gray-500 text-[10px] sm:text-xs">Streak</p>
        </div>
        {onRemove && (
          <button
            onClick={onRemove}
            className="p-1.5 sm:p-2 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            title="Remove member"
          >
            <Trash2 size={14} className="sm:w-4 sm:h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

function formatTimeAgo(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now - date;
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  if (diffDays < 7) return `${diffDays}d ago`;
  return date.toLocaleDateString();
}

export default Dashboard;
