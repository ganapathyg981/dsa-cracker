import React, { useState, useRef } from 'react';
import { 
  Trophy, Target, Flame, TrendingUp, Download, Upload, 
  CheckCircle2, Clock, Award, Users, ChevronRight, X, Trash2
} from 'lucide-react';
import { topics, patterns } from '../data/patterns';
import { 
  getUserProfile, getTotalStats, getWeeklyGoals, setWeeklyGoal,
  getWeeklyProgress, exportProgress, importMemberProgress, 
  getLeaderboardData, getRecentActivity, getImportedMembers, removeImportedMember
} from '../utils/storage';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importError, setImportError] = useState(null);
  const [importSuccess, setImportSuccess] = useState(null);
  const fileInputRef = useRef(null);

  const profile = getUserProfile();
  const allPatterns = topics.filter(t => t.available).map(t => patterns[t.id]).filter(Boolean);
  const stats = getTotalStats(allPatterns);
  const weeklyGoals = getWeeklyGoals();
  const weeklyProgress = getWeeklyProgress();
  const recentActivity = getRecentActivity(8);
  const leaderboard = getLeaderboardData(allPatterns);
  const importedMembers = getImportedMembers();

  const handleExport = () => {
    const data = exportProgress();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const date = new Date().toISOString().split('T')[0];
    a.href = url;
    a.download = `dsa-progress-${profile?.name?.replace(/\s+/g, '-') || 'unknown'}-${date}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

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

  return (
    <div className="min-h-[calc(100vh-57px)] bg-gradient-to-br from-slate-50 via-violet-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Welcome back, {profile?.name || 'Student'}!
            </h1>
            <p className="text-gray-500 mt-1">Track your progress and stay accountable</p>
          </div>
          
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm"
            >
              <Download size={18} />
              Export Progress
            </button>
            <button
              onClick={() => setShowImportModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-xl font-medium hover:from-violet-700 hover:to-indigo-700 transition-all shadow-lg shadow-violet-200"
            >
              <Upload size={18} />
              Import Progress
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <StatCard
            icon={CheckCircle2}
            label="Problems Solved"
            value={stats.totalCompleted}
            subtext={`of ${stats.totalProblems} total`}
            color="emerald"
          />
          <StatCard
            icon={Target}
            label="Weekly Goal"
            value={`${weeklyProgress}/${weeklyGoals.target}`}
            subtext={weeklyProgress >= weeklyGoals.target ? 'Goal reached!' : `${weeklyGoals.target - weeklyProgress} to go`}
            color="violet"
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
            subtext={`Best: ${stats.streak.longestStreak} days`}
            color="orange"
          />
          <StatCard
            icon={Trophy}
            label="Mastery Progress"
            value={`${stats.percentage}%`}
            subtext={`${Object.values(stats.patternStats).filter(p => p.masteryLevel.level === 'advanced').length} patterns mastered`}
            color="amber"
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
            {/* Difficulty Breakdown */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-semibold text-gray-800 mb-4">Difficulty Breakdown</h3>
              <div className="space-y-4">
                <DifficultyBar label="Easy" completed={stats.easyCompleted} color="green" />
                <DifficultyBar label="Medium" completed={stats.mediumCompleted} color="yellow" />
                <DifficultyBar label="Hard" completed={stats.hardCompleted} color="red" />
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 col-span-2">
              <h3 className="font-semibold text-gray-800 mb-4">Recent Activity</h3>
              {recentActivity.length > 0 ? (
                <div className="space-y-3">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <CheckCircle2 size={18} className="text-emerald-500" />
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{activity.problemName}</p>
                        <p className="text-sm text-gray-500">{patterns[activity.patternId]?.title}</p>
                      </div>
                      <span className="text-sm text-gray-400">
                        {formatTimeAgo(activity.completedAt)}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <Clock size={40} className="mx-auto mb-2 opacity-50" />
                  <p>No activity yet. Start solving problems!</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'patterns' && (
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-800 mb-4">Pattern Progress</h3>
            <div className="grid grid-cols-2 gap-4">
              {topics.filter(t => t.available).map(topic => {
                const patternStat = stats.patternStats[topic.id];
                return (
                  <PatternProgressCard
                    key={topic.id}
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

      {/* Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Import Progress</h3>
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
              Choose JSON File
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, subtext, color, onEdit }) => {
  const colorClasses = {
    emerald: 'bg-emerald-100 text-emerald-600',
    violet: 'bg-violet-100 text-violet-600',
    orange: 'bg-orange-100 text-orange-600',
    amber: 'bg-amber-100 text-amber-600',
  };

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 relative group">
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
    </div>
  );
};

const DifficultyBar = ({ label, completed, color }) => {
  const colorClasses = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="font-medium text-gray-700">{label}</span>
        <span className="text-gray-500">{completed} solved</span>
      </div>
      <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
        <div
          className={`h-full ${colorClasses[color]} rounded-full transition-all`}
          style={{ width: `${Math.min(completed * 10, 100)}%` }}
        />
      </div>
    </div>
  );
};

const PatternProgressCard = ({ icon, name, completed, total, mastery }) => {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="font-medium text-gray-800">{name}</span>
          <span className="text-sm text-gray-500">{completed}/{total}</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-violet-500 to-indigo-500 rounded-full transition-all"
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
    1: 'bg-yellow-100 text-yellow-700 border-yellow-300',
    2: 'bg-gray-100 text-gray-600 border-gray-300',
    3: 'bg-amber-100 text-amber-700 border-amber-300',
  };

  return (
    <div className={`flex items-center gap-4 p-4 rounded-xl border ${
      member.isCurrentUser ? 'bg-violet-50 border-violet-200' : 'bg-gray-50 border-transparent'
    }`}>
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-lg border-2 ${
        rankColors[rank] || 'bg-gray-50 text-gray-500 border-gray-200'
      }`}>
        {rank}
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
          <p className="font-semibold text-orange-500">{member.streak}</p>
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

