// Simplified storage module - localStorage only for session management
// All data is stored in GitHub Gists

const STORAGE_KEYS = {
  CURRENT_USER_ID: 'dsa_current_user_id',
  CURRENT_GIST_ID: 'dsa_current_gist_id',
  REGISTRY_GIST_ID: 'dsa_registry_gist_id',
  MONITORED_USERS: 'dsa_monitored_users',
};

// ============================================
// Session Management (localStorage)
// ============================================

export function getCurrentUserId() {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_USER_ID);
}

export function getCurrentGistId() {
  return localStorage.getItem(STORAGE_KEYS.CURRENT_GIST_ID);
}

export function setCurrentUser(userId, gistId) {
  localStorage.setItem(STORAGE_KEYS.CURRENT_USER_ID, userId);
  localStorage.setItem(STORAGE_KEYS.CURRENT_GIST_ID, gistId);
}

export function clearCurrentUser() {
  localStorage.removeItem(STORAGE_KEYS.CURRENT_USER_ID);
  localStorage.removeItem(STORAGE_KEYS.CURRENT_GIST_ID);
  localStorage.removeItem(STORAGE_KEYS.MONITORED_USERS);
}

export function isLoggedIn() {
  return !!getCurrentUserId() && !!getCurrentGistId();
}

// ============================================
// Monitored Users (localStorage for quick access)
// ============================================

export function getMonitoredUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.MONITORED_USERS);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function setMonitoredUsers(userIds) {
  localStorage.setItem(STORAGE_KEYS.MONITORED_USERS, JSON.stringify(userIds));
}

export function addMonitoredUser(userId) {
  const users = getMonitoredUsers();
  if (!users.includes(userId)) {
    users.push(userId);
    setMonitoredUsers(users);
  }
}

export function removeMonitoredUser(userId) {
  const users = getMonitoredUsers();
  const filtered = users.filter(id => id !== userId);
  setMonitoredUsers(filtered);
}

// ============================================
// Helper functions (compute from data, don't store)
// ============================================

export function getMasteryLevel(problemsCompleted) {
  if (problemsCompleted >= 8) return { level: 'advanced', label: 'Advanced', color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
  if (problemsCompleted >= 4) return { level: 'intermediate', label: 'Intermediate', color: 'text-gray-400', bgColor: 'bg-gray-100' };
  if (problemsCompleted >= 1) return { level: 'beginner', label: 'Beginner', color: 'text-amber-700', bgColor: 'bg-amber-100' };
  return { level: 'none', label: 'Not Started', color: 'text-gray-300', bgColor: 'bg-gray-50' };
}

export function getTotalStats(patterns, progress) {
  let totalCompleted = 0;
  let easyCompleted = 0;
  let mediumCompleted = 0;
  let hardCompleted = 0;
  let totalProblems = 0;
  
  const completedProblems = progress?.completedProblems || {};
  const patternStats = {};
  
  patterns.forEach(pattern => {
    const patternProblems = pattern.problems || [];
    const completedInPattern = completedProblems[pattern.id] || {};
    
    let patternCompleted = 0;
    patternProblems.forEach(problem => {
      totalProblems++;
      if (completedInPattern[problem.name]) {
        totalCompleted++;
        patternCompleted++;
        switch (problem.difficulty) {
          case 'Easy': easyCompleted++; break;
          case 'Medium': mediumCompleted++; break;
          case 'Hard': hardCompleted++; break;
        }
      }
    });
    
    patternStats[pattern.id] = {
      completed: patternCompleted,
      total: patternProblems.length,
      percentage: patternProblems.length > 0 
        ? Math.round((patternCompleted / patternProblems.length) * 100) 
        : 0,
      masteryLevel: getMasteryLevel(patternCompleted),
      completedProblems: Object.keys(completedInPattern),
    };
  });
  
  const streakData = progress?.streakData || {
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: null,
    activityDates: [],
  };
  
  // Recalculate streak validity
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  let currentStreak = streakData.currentStreak;
  if (streakData.lastActivityDate !== today && streakData.lastActivityDate !== yesterdayStr) {
    currentStreak = 0;
  }
  
  return {
    totalCompleted,
    totalProblems,
    easyCompleted,
    mediumCompleted,
    hardCompleted,
    percentage: totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0,
    patternStats,
    streak: { ...streakData, currentStreak },
  };
}

export function getWeeklyProgress(progress) {
  const weekStart = getWeekStart();
  let count = 0;
  
  const completedProblems = progress?.completedProblems || {};
  
  Object.values(completedProblems).forEach(patternProblems => {
    Object.values(patternProblems).forEach(problem => {
      if (problem.completedAt && problem.completedAt >= weekStart) {
        count++;
      }
    });
  });
  
  return count;
}

export function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString();
}

export function getRecentActivity(progress, limit = 10) {
  const activities = [];
  const completedProblems = progress?.completedProblems || {};
  
  Object.entries(completedProblems).forEach(([patternId, problems]) => {
    Object.entries(problems).forEach(([problemName, data]) => {
      activities.push({
        patternId,
        problemName,
        completedAt: data.completedAt,
      });
    });
  });
  
  activities.sort((a, b) => new Date(b.completedAt) - new Date(a.completedAt));
  return activities.slice(0, limit);
}

export function isProblemCompleted(progress, patternId, problemName) {
  return !!progress?.completedProblems?.[patternId]?.[problemName];
}

export function getCompletedProblemsForPattern(progress, patternId) {
  return progress?.completedProblems?.[patternId] || {};
}

// ============================================
// Progress modification helpers (return new state)
// ============================================

export function toggleProblemInProgress(progress, patternId, problemName) {
  const newProgress = JSON.parse(JSON.stringify(progress || {
    completedProblems: {},
    streakData: {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      activityDates: [],
    },
  }));
  
  if (!newProgress.completedProblems) {
    newProgress.completedProblems = {};
  }
  
  if (!newProgress.completedProblems[patternId]) {
    newProgress.completedProblems[patternId] = {};
  }
  
  const isCurrentlyCompleted = newProgress.completedProblems[patternId][problemName];
  
  if (isCurrentlyCompleted) {
    delete newProgress.completedProblems[patternId][problemName];
  } else {
    newProgress.completedProblems[patternId][problemName] = {
      completedAt: new Date().toISOString(),
    };
    updateStreakInProgress(newProgress);
  }
  
  return newProgress;
}

function updateStreakInProgress(progress) {
  const today = new Date().toISOString().split('T')[0];
  
  if (!progress.streakData) {
    progress.streakData = {
      currentStreak: 0,
      longestStreak: 0,
      lastActivityDate: null,
      activityDates: [],
    };
  }
  
  const streakData = progress.streakData;
  
  if (streakData.lastActivityDate === today) {
    return;
  }
  
  if (!streakData.activityDates) {
    streakData.activityDates = [];
  }
  
  if (!streakData.activityDates.includes(today)) {
    streakData.activityDates.push(today);
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (streakData.lastActivityDate === yesterdayStr) {
    streakData.currentStreak = (streakData.currentStreak || 0) + 1;
  } else if (streakData.lastActivityDate !== today) {
    streakData.currentStreak = 1;
  }
  
  streakData.longestStreak = Math.max(streakData.longestStreak || 0, streakData.currentStreak);
  streakData.lastActivityDate = today;
}

// ============================================
// Leaderboard helpers
// ============================================

export function buildLeaderboardEntry(userId, displayName, progress, patterns, isCurrentUser = false, isRemote = false) {
  let totalCompleted = 0;
  let easyCompleted = 0;
  let mediumCompleted = 0;
  let hardCompleted = 0;
  
  const completedProblems = progress?.completedProblems || {};
  const patternStats = {};
  
  patterns.forEach(pattern => {
    const completedInPattern = completedProblems[pattern.id] || {};
    const patternProblems = pattern.problems || [];
    let patternCompleted = 0;
    
    patternProblems.forEach(problem => {
      if (completedInPattern[problem.name]) {
        totalCompleted++;
        patternCompleted++;
        switch (problem.difficulty) {
          case 'Easy': easyCompleted++; break;
          case 'Medium': mediumCompleted++; break;
          case 'Hard': hardCompleted++; break;
        }
      }
    });
    
    patternStats[pattern.id] = {
      completed: patternCompleted,
      total: patternProblems.length,
      percentage: patternProblems.length > 0 
        ? Math.round((patternCompleted / patternProblems.length) * 100) 
        : 0,
      masteryLevel: getMasteryLevel(patternCompleted),
    };
  });
  
  return {
    id: userId,
    name: isCurrentUser ? `${displayName} (You)` : displayName,
    isCurrentUser,
    isRemote,
    totalCompleted,
    easyCompleted,
    mediumCompleted,
    hardCompleted,
    streak: progress?.streakData?.currentStreak || 0,
    patternStats,
  };
}

// ============================================
// Export/Import helpers (for manual backup)
// ============================================

export function exportProgressData(profile, progress, goals) {
  return {
    version: 3,
    exportedAt: new Date().toISOString(),
    profile,
    progress,
    goals,
  };
}

export function downloadProgressBackup(profile, progress, goals) {
  const data = exportProgressData(profile, progress, goals);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  a.href = url;
  a.download = `dsa-progress-${profile?.name?.replace(/\s+/g, '-') || 'backup'}-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

export async function copyProgressToClipboard(profile, progress, goals) {
  const data = exportProgressData(profile, progress, goals);
  const jsonString = JSON.stringify(data, null, 2);
  
  try {
    await navigator.clipboard.writeText(jsonString);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function parseImportedProgress(jsonData) {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    if (!data.progress) {
      throw new Error('Invalid progress file format');
    }
    
    return {
      success: true,
      profile: data.profile,
      progress: data.progress,
      goals: data.goals,
    };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
