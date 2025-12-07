import React, { useState, useRef } from 'react';
import { 
  Trophy, Target, Flame, TrendingUp, Download, Upload, 
  CheckCircle2, Clock, Award, Users, ChevronRight, X, Trash2,
  Zap, Sparkles, Star, Coffee, Rocket, Copy, Shield, RotateCcw, Check
} from 'lucide-react';
import { topics, patterns } from '../data/patterns';
import { 
  getUserProfile, getTotalStats, getWeeklyGoals, setWeeklyGoal,
  getWeeklyProgress, exportProgress, importMemberProgress, 
  getLeaderboardData, getRecentActivity, getImportedMembers, removeImportedMember,
  downloadProgressBackup, copyProgressToClipboard, importOwnProgress,
  getAllBackups, restoreFromBackup, getLastBackupTime
} from '../utils/storage';

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
  const fileInputRef = useRef(null);
  const restoreInputRef = useRef(null);

  const profile = getUserProfile();
  const allPatterns = topics.filter(t => t.available).map(t => patterns[t.id]).filter(Boolean);
  const stats = getTotalStats(allPatterns);
  const weeklyGoals = getWeeklyGoals();
  const weeklyProgress = getWeeklyProgress();
  const recentActivity = getRecentActivity(5);
  const leaderboard = getLeaderboardData(allPatterns);
  const importedMembers = getImportedMembers();
  const quickWins = getQuickWins(allPatterns, stats);

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
    <div className="min-h-[calc(100vh-57px)] bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with motivation */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              Welcome back, {profile?.name || 'Student'}!
              {stats.streak.currentStreak > 0 && (
                <span className="text-2xl animate-bounce-slow">{streakMilestone?.icon || '✨'}</span>
              )}
            </h1>
            <p className="text-gray-500 mt-1 flex items-center gap-2">
              <Sparkles size={16} className="text-amber-500" />
              {getRandomMotivation()}
            </p>
          </div>
          
          <div className="flex gap-3">
            {/* Backup Status */}
            {lastBackup && (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-700 text-sm">
                <Shield size={16} />
                <span>Auto-saved</span>
              </div>
            )}
            <button
              onClick={() => {
                setShowBackupModal(true);
                loadBackups();
              }}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm hover:shadow-md"
            >
              <Shield size={18} />
              Backup
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200 hover:shadow-xl hover:-translate-y-0.5"
            >
              <Users size={18} />
              Study Group
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
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
        <div className="flex gap-2 mb-6">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-white text-violet-700 shadow-md'
                    : 'text-gray-600 hover:bg-white/50'
                }`}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-3 gap-6">
            {/* Quick Wins Section */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-5 shadow-sm border border-emerald-100 col-span-2">
              <h3 className="font-semibold text-emerald-800 mb-3 flex items-center gap-2">
                <Zap size={18} className="text-emerald-600" />
                Quick Wins - Easiest Unsolved
                <span className="text-xs bg-emerald-200 text-emerald-700 px-2 py-0.5 rounded-full ml-2">
                  ~5 min each
                </span>
              </h3>
              {quickWins.length > 0 ? (
                <div className="space-y-2">
                  {quickWins.map((problem, idx) => (
                    <div 
                      key={idx} 
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-emerald-100 hover:border-emerald-300 hover:shadow-sm transition-all cursor-pointer group"
                    >
                      <span className="text-xl">{problem.patternIcon}</span>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800 group-hover:text-emerald-700 transition-colors">
                          {problem.name}
                        </p>
                        <p className="text-xs text-gray-500">{problem.patternTitle}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-lg">
                        Easy
                      </span>
                      <ChevronRight size={16} className="text-gray-300 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star size={40} className="mx-auto mb-2 text-emerald-400" />
                  <p className="text-emerald-700 font-medium">All easy problems completed!</p>
                  <p className="text-sm text-emerald-600">Time to tackle medium difficulty 💪</p>
                </div>
              )}
            </div>

            {/* Difficulty Breakdown */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Difficulty Breakdown</h3>
              <div className="space-y-4">
                <DifficultyBar label="Easy" completed={stats.easyCompleted} color="green" emoji="🟢" />
                <DifficultyBar label="Medium" completed={stats.mediumCompleted} color="yellow" emoji="🟡" />
                <DifficultyBar label="Hard" completed={stats.hardCompleted} color="red" emoji="🔴" />
              </div>
              
              {/* Daily Tip */}
              <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-xs text-blue-600 font-medium flex items-center gap-1">
                  <Coffee size={12} />
                  Pro Tip
                </p>
                <p className="text-sm text-blue-800 mt-1">
                  Do 2 Easy + 1 Medium daily for steady progress!
                </p>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 col-span-3">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock size={18} className="text-gray-500" />
                Recent Activity
              </h3>
              {recentActivity.length > 0 ? (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {recentActivity.map((activity, idx) => (
                    <div 
                      key={idx} 
                      className="flex-shrink-0 flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl border border-gray-100 min-w-[280px] hover:shadow-md transition-all"
                    >
                      <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                        <CheckCircle2 size={20} className="text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{activity.problemName}</p>
                        <p className="text-xs text-gray-500">{patterns[activity.patternId]?.title}</p>
                      </div>
                      <span className="text-xs text-gray-400 whitespace-nowrap">
                        {formatTimeAgo(activity.completedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Rocket size={40} className="mx-auto mb-2 opacity-50" />
                  <p className="font-medium text-gray-600">Ready to start?</p>
                  <p className="text-sm">Solve your first problem to track progress!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Pattern Progress</h3>
            <div className="grid grid-cols-2 gap-4">
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
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-gray-800">Study Group Leaderboard</h3>
              {Object.keys(importedMembers).length > 0 && (
                <span className="text-sm text-gray-500">
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
              <div className="text-center py-12 text-gray-400">
                <Users size={48} className="mx-auto mb-3 opacity-50" />
                <p className="font-medium text-gray-600 mb-1">No study group members yet</p>
                <p className="text-sm">Import progress files from your study group to compare</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Import Modal (Study Group) */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Study Group</h3>
              <button
                onClick={() => {
                  setShowImportModal(false);
                  setImportError(null);
                  setImportSuccess(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Upload a JSON progress file from a study group member to view their progress on the leaderboard.
            </p>

            {importError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {importError}
              </div>
            )}

            {importSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
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
              className="w-full py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-violet-400 hover:text-violet-600 hover:bg-violet-50 transition-all"
            >
              <Upload size={20} className="inline mr-2" />
              Import Member's Progress
            </button>
          </div>
        </div>
      )}

      {/* Backup & Restore Modal */}
      {showBackupModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 animate-scale-in">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <Shield size={24} className="text-emerald-500" />
                Backup & Restore
              </h3>
              <button
                onClick={() => {
                  setShowBackupModal(false);
                  setImportError(null);
                  setImportSuccess(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Auto-backup status */}
            <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 rounded-xl">
              <div className="flex items-center gap-2 text-emerald-700 mb-1">
                <CheckCircle2 size={18} />
                <span className="font-semibold">Auto-Backup Active</span>
              </div>
              <p className="text-emerald-600 text-sm">
                Your progress is automatically saved to your browser's IndexedDB. 
                Even if localStorage is cleared, your data can be recovered.
              </p>
              {lastBackup && (
                <p className="text-emerald-500 text-xs mt-2">
                  Last backup: {new Date(lastBackup).toLocaleString()}
                </p>
              )}
            </div>

            {importError && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {importError}
              </div>
            )}

            {importSuccess && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm">
                {importSuccess}
              </div>
            )}

            <div className="space-y-3">
              {/* Export options */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleExport}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-violet-100 text-violet-700 rounded-xl font-medium hover:bg-violet-200 transition-all"
                >
                  <Download size={18} />
                  Download Backup
                </button>
                <button
                  onClick={handleCopyToClipboard}
                  className="flex items-center justify-center gap-2 py-3 px-4 bg-blue-100 text-blue-700 rounded-xl font-medium hover:bg-blue-200 transition-all"
                >
                  {copiedToClipboard ? <Check size={18} /> : <Copy size={18} />}
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
                className="w-full flex items-center justify-center gap-2 py-3 px-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-amber-400 hover:text-amber-600 hover:bg-amber-50 transition-all"
              >
                <RotateCcw size={18} />
                Restore from Backup File
              </button>

              {/* Previous backups */}
              {backups.length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold text-gray-600 mb-2">Previous Auto-Backups</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {backups.slice(0, 5).map((backup, idx) => (
                      <button
                        key={backup.id}
                        onClick={() => handleRestoreFromBackup(backup)}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors text-left"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            {new Date(backup.timestamp).toLocaleDateString()}
                          </p>
                          <p className="text-xs text-gray-500">
                            {backup.profile?.name || 'Unknown'} • {Object.keys(backup.progress?.completedProblems || {}).length} patterns
                          </p>
                        </div>
                        <RotateCcw size={16} className="text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Tip */}
            <div className="mt-6 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <p className="text-xs text-blue-700">
                💡 <strong>Tip:</strong> Download a backup file and save it to cloud storage (Google Drive, Dropbox) 
                for permanent safekeeping. You can restore from this file anytime, even on a different device.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, subtext, color, onEdit, progress, highlight }) => {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    violet: 'bg-violet-100 text-violet-600',
    orange: 'bg-orange-100 text-orange-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  const progressColors = {
    emerald: 'bg-emerald-500',
    violet: 'bg-violet-500',
    orange: 'bg-orange-500',
    amber: 'bg-amber-500',
  };

  return (
    <div className={`bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group hover:shadow-md transition-all ${highlight ? 'ring-2 ring-orange-200' : ''}`}>
      {onEdit && (
        <button
          onClick={onEdit}
          className="absolute top-3 right-3 p-1.5 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-gray-100 transition-all"
          title="Edit goal"
        >
          <ChevronRight size={16} className="text-gray-400" />
        </button>
      )}
      <div className={`w-12 h-12 ${colorClasses[color]} rounded-xl flex items-center justify-center mb-3`}>
        <Icon size={24} />
      </div>
      <p className="text-sm text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <p className="text-sm text-gray-400 mt-1">{subtext}</p>
      {progress !== undefined && (
        <div className="mt-3 h-1.5 bg-gray-100 rounded-full overflow-hidden">
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
        <span className="font-medium text-gray-700 flex items-center gap-1">
          {emoji} {label}
        </span>
        <span className="text-gray-500">{completed} solved</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
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
    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-slate-50 rounded-xl hover:from-gray-100 hover:to-slate-100 transition-all group cursor-pointer">
      <div className="relative">
        <span className="text-2xl">{icon}</span>
        <span className="absolute -top-1 -left-1 w-4 h-4 bg-violet-200 text-violet-700 text-[10px] font-bold rounded-full flex items-center justify-center">
          {index}
        </span>
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-gray-800">{name}</span>
          <span className="text-sm text-gray-500">{completed}/{total}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all duration-500"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
      {mastery && mastery.level !== 'none' && (
        <div className={`px-2 py-1 ${mastery.bgColor} ${mastery.color} text-xs font-medium rounded-lg`}>
          {mastery.level === 'advanced' && <Award size={12} className="inline mr-1" />}
          {mastery.label}
        </div>
      )}
    </div>
  );
};

const LeaderboardRow = ({ rank, member, onRemove }) => {
  const rankColors = {
    1: 'bg-gradient-to-br from-yellow-100 to-amber-100 text-yellow-700 border-yellow-300',
    2: 'bg-gradient-to-br from-gray-100 to-slate-100 text-gray-600 border-gray-300',
    3: 'bg-gradient-to-br from-amber-100 to-orange-100 text-amber-700 border-amber-300',
  };

  const rankIcons = {
    1: '🥇',
    2: '🥈',
    3: '🥉',
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border transition-all hover:shadow-md ${
      member.isCurrentUser ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 border-transparent hover:border-gray-200'
    }`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border-2 ${
        rankColors[rank] || 'bg-gray-50 text-gray-500 border-gray-200'
      }`}>
        {rankIcons[rank] || rank}
      </div>
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{member.name}</p>
        <p className="text-sm text-gray-500">
          {member.totalCompleted} problems solved
        </p>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <div className="text-center">
          <p className="font-semibold text-green-600">{member.easyCompleted}</p>
          <p className="text-gray-400 text-xs">Easy</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-yellow-600">{member.mediumCompleted}</p>
          <p className="text-gray-400 text-xs">Medium</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-red-600">{member.hardCompleted}</p>
          <p className="text-gray-400 text-xs">Hard</p>
        </div>
        <div className="text-center">
          <p className="font-semibold text-orange-500 flex items-center gap-1">
            {member.streak} <Flame size={12} />
          </p>
          <p className="text-gray-400 text-xs">Streak</p>
        </div>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors"
          title="Remove member"
        >
          <Trash2 size={16} />
        </button>
      )}
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
