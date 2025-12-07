const STORAGE_KEYS = {
  USER_PROFILE: 'dsa_user_profile',
  PROGRESS: 'dsa_progress',
  IMPORTED_MEMBERS: 'dsa_imported_members',
  WEEKLY_GOALS: 'dsa_weekly_goals',
  LAST_BACKUP: 'dsa_last_backup',
};

const DB_NAME = 'DSAProgressDB';
const DB_VERSION = 1;
const STORE_NAME = 'backups';

// IndexedDB for reliable backup
let db = null;

async function initDB() {
  if (db) return db;
  
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => {
      db = request.result;
      resolve(db);
    };
    
    request.onupgradeneeded = (event) => {
      const database = event.target.result;
      if (!database.objectStoreNames.contains(STORE_NAME)) {
        database.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
  });
}

// Auto-backup to IndexedDB every time progress changes
async function autoBackupToIndexedDB() {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readwrite');
    const store = transaction.objectStore(STORE_NAME);
    
    const backup = {
      id: 'auto_backup',
      timestamp: new Date().toISOString(),
      profile: getUserProfile(),
      progress: getProgress(),
      goals: getWeeklyGoals(),
    };
    
    store.put(backup);
    
    // Also keep dated backups (last 7)
    const dateKey = new Date().toISOString().split('T')[0];
    store.put({ ...backup, id: `backup_${dateKey}` });
    
    localStorage.setItem(STORAGE_KEYS.LAST_BACKUP, backup.timestamp);
  } catch (error) {
    console.warn('Auto-backup failed:', error);
  }
}

// Restore from IndexedDB backup
export async function restoreFromIndexedDB() {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.get('auto_backup');
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result);
        } else {
          resolve(null);
        }
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Restore from IndexedDB failed:', error);
    return null;
  }
}

// Get all backups from IndexedDB
export async function getAllBackups() {
  try {
    const database = await initDB();
    const transaction = database.transaction([STORE_NAME], 'readonly');
    const store = transaction.objectStore(STORE_NAME);
    
    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => {
        const backups = request.result
          .filter(b => b.id.startsWith('backup_'))
          .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        resolve(backups);
      };
      request.onerror = () => reject(request.error);
    });
  } catch (error) {
    console.warn('Get backups failed:', error);
    return [];
  }
}

// Restore progress from a backup
export function restoreFromBackup(backup) {
  if (!backup) return false;
  
  try {
    if (backup.profile) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(backup.profile));
    }
    if (backup.progress) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(backup.progress));
    }
    if (backup.goals) {
      localStorage.setItem(STORAGE_KEYS.WEEKLY_GOALS, JSON.stringify(backup.goals));
    }
    return true;
  } catch (error) {
    console.error('Restore failed:', error);
    return false;
  }
}

// Check and recover from IndexedDB if localStorage is empty
export async function checkAndRecoverProgress() {
  const progress = localStorage.getItem(STORAGE_KEYS.PROGRESS);
  
  if (!progress) {
    const backup = await restoreFromIndexedDB();
    if (backup && backup.progress) {
      const restored = restoreFromBackup(backup);
      if (restored) {
        console.log('Progress recovered from IndexedDB backup');
        return { recovered: true, timestamp: backup.timestamp };
      }
    }
  }
  
  return { recovered: false };
}

export function getUserProfile() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function setUserProfile(profile) {
  const fullProfile = {
    ...profile,
    joinedDate: profile.joinedDate || new Date().toISOString(),
    lastActive: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(fullProfile));
  autoBackupToIndexedDB();
  return fullProfile;
}

export function getProgress() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    return data ? JSON.parse(data) : {
      completedProblems: {},
      streakData: {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        activityDates: [],
      },
    };
  } catch {
    return {
      completedProblems: {},
      streakData: {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        activityDates: [],
      },
    };
  }
}

export function saveProgress(progress) {
  localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(progress));
  autoBackupToIndexedDB();
}

export function toggleProblemComplete(patternId, problemName) {
  const progress = getProgress();
  
  if (!progress.completedProblems[patternId]) {
    progress.completedProblems[patternId] = {};
  }
  
  const isCurrentlyCompleted = progress.completedProblems[patternId][problemName];
  
  if (isCurrentlyCompleted) {
    delete progress.completedProblems[patternId][problemName];
  } else {
    progress.completedProblems[patternId][problemName] = {
      completedAt: new Date().toISOString(),
    };
    updateStreak(progress);
  }
  
  saveProgress(progress);
  return progress;
}

export function isProblemCompleted(patternId, problemName) {
  const progress = getProgress();
  return !!progress.completedProblems[patternId]?.[problemName];
}

export function getCompletedProblemsForPattern(patternId) {
  const progress = getProgress();
  return progress.completedProblems[patternId] || {};
}

function updateStreak(progress) {
  const today = new Date().toISOString().split('T')[0];
  const streakData = progress.streakData;
  
  if (streakData.lastActivityDate === today) {
    return;
  }
  
  if (!streakData.activityDates.includes(today)) {
    streakData.activityDates.push(today);
  }
  
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (streakData.lastActivityDate === yesterdayStr) {
    streakData.currentStreak += 1;
  } else if (streakData.lastActivityDate !== today) {
    streakData.currentStreak = 1;
  }
  
  streakData.longestStreak = Math.max(streakData.longestStreak, streakData.currentStreak);
  streakData.lastActivityDate = today;
}

export function getStreak() {
  const progress = getProgress();
  const streakData = progress.streakData;
  
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  if (streakData.lastActivityDate !== today && streakData.lastActivityDate !== yesterdayStr) {
    return { ...streakData, currentStreak: 0 };
  }
  
  return streakData;
}

export function getTotalStats(patterns) {
  const progress = getProgress();
  let totalCompleted = 0;
  let easyCompleted = 0;
  let mediumCompleted = 0;
  let hardCompleted = 0;
  let totalProblems = 0;
  
  const patternStats = {};
  
  patterns.forEach(pattern => {
    const patternProblems = pattern.problems || [];
    const completedInPattern = progress.completedProblems[pattern.id] || {};
    
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
    };
  });
  
  return {
    totalCompleted,
    totalProblems,
    easyCompleted,
    mediumCompleted,
    hardCompleted,
    percentage: totalProblems > 0 ? Math.round((totalCompleted / totalProblems) * 100) : 0,
    patternStats,
    streak: getStreak(),
  };
}

export function getMasteryLevel(problemsCompleted) {
  if (problemsCompleted >= 8) return { level: 'advanced', label: 'Advanced', color: 'text-yellow-500', bgColor: 'bg-yellow-100' };
  if (problemsCompleted >= 4) return { level: 'intermediate', label: 'Intermediate', color: 'text-gray-400', bgColor: 'bg-gray-100' };
  if (problemsCompleted >= 1) return { level: 'beginner', label: 'Beginner', color: 'text-amber-700', bgColor: 'bg-amber-100' };
  return { level: 'none', label: 'Not Started', color: 'text-gray-300', bgColor: 'bg-gray-50' };
}

export function getWeeklyGoals() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_GOALS);
    if (!data) {
      return { target: 10, weekStart: getWeekStart() };
    }
    const goals = JSON.parse(data);
    if (goals.weekStart !== getWeekStart()) {
      return { target: goals.target, weekStart: getWeekStart() };
    }
    return goals;
  } catch {
    return { target: 10, weekStart: getWeekStart() };
  }
}

export function setWeeklyGoal(target) {
  const goals = { target, weekStart: getWeekStart() };
  localStorage.setItem(STORAGE_KEYS.WEEKLY_GOALS, JSON.stringify(goals));
  return goals;
}

export function getWeeklyProgress() {
  const progress = getProgress();
  const weekStart = getWeekStart();
  let count = 0;
  
  Object.values(progress.completedProblems).forEach(patternProblems => {
    Object.values(patternProblems).forEach(problem => {
      if (problem.completedAt && problem.completedAt >= weekStart) {
        count++;
      }
    });
  });
  
  return count;
}

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString();
}

export function exportProgress() {
  const profile = getUserProfile();
  const progress = getProgress();
  const goals = getWeeklyGoals();
  
  return {
    version: 2,
    exportedAt: new Date().toISOString(),
    profile,
    progress,
    goals,
  };
}

// Export as downloadable file
export function downloadProgressBackup() {
  const data = exportProgress();
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const date = new Date().toISOString().split('T')[0];
  const profile = getUserProfile();
  a.href = url;
  a.download = `dsa-progress-${profile?.name?.replace(/\s+/g, '-') || 'backup'}-${date}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

// Copy progress to clipboard
export async function copyProgressToClipboard() {
  const data = exportProgress();
  const jsonString = JSON.stringify(data, null, 2);
  
  try {
    await navigator.clipboard.writeText(jsonString);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Import from clipboard
export async function importFromClipboard() {
  try {
    const text = await navigator.clipboard.readText();
    return importMemberProgress(text);
  } catch (error) {
    return { success: false, error: 'Unable to read clipboard' };
  }
}

// Import and restore own progress (not as team member)
export function importOwnProgress(jsonData) {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    if (!data.progress) {
      throw new Error('Invalid progress file format');
    }
    
    if (data.profile) {
      localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(data.profile));
    }
    if (data.progress) {
      localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(data.progress));
    }
    if (data.goals) {
      localStorage.setItem(STORAGE_KEYS.WEEKLY_GOALS, JSON.stringify(data.goals));
    }
    
    autoBackupToIndexedDB();
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function importMemberProgress(jsonData) {
  try {
    const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
    
    if (!data.profile || !data.progress) {
      throw new Error('Invalid progress file format');
    }
    
    const members = getImportedMembers();
    const memberId = data.profile.name?.toLowerCase().replace(/\s+/g, '-') || 'unknown';
    
    members[memberId] = {
      ...data,
      importedAt: new Date().toISOString(),
    };
    
    localStorage.setItem(STORAGE_KEYS.IMPORTED_MEMBERS, JSON.stringify(members));
    return { success: true, memberName: data.profile.name };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

export function getImportedMembers() {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.IMPORTED_MEMBERS);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

export function removeImportedMember(memberId) {
  const members = getImportedMembers();
  delete members[memberId];
  localStorage.setItem(STORAGE_KEYS.IMPORTED_MEMBERS, JSON.stringify(members));
}

export function getLeaderboardData(patterns) {
  const profile = getUserProfile();
  const myStats = getTotalStats(patterns);
  const members = getImportedMembers();
  
  const leaderboard = [];
  
  if (profile) {
    leaderboard.push({
      id: 'me',
      name: profile.name + ' (You)',
      isCurrentUser: true,
      totalCompleted: myStats.totalCompleted,
      easyCompleted: myStats.easyCompleted,
      mediumCompleted: myStats.mediumCompleted,
      hardCompleted: myStats.hardCompleted,
      streak: myStats.streak.currentStreak,
      patternStats: myStats.patternStats,
    });
  }
  
  Object.entries(members).forEach(([id, data]) => {
    const memberPatternStats = {};
    let totalCompleted = 0;
    let easyCompleted = 0;
    let mediumCompleted = 0;
    let hardCompleted = 0;
    
    patterns.forEach(pattern => {
      const completedInPattern = data.progress?.completedProblems?.[pattern.id] || {};
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
      
      memberPatternStats[pattern.id] = {
        completed: patternCompleted,
        total: patternProblems.length,
        percentage: patternProblems.length > 0 
          ? Math.round((patternCompleted / patternProblems.length) * 100) 
          : 0,
        masteryLevel: getMasteryLevel(patternCompleted),
      };
    });
    
    leaderboard.push({
      id,
      name: data.profile?.name || 'Unknown',
      isCurrentUser: false,
      totalCompleted,
      easyCompleted,
      mediumCompleted,
      hardCompleted,
      streak: data.progress?.streakData?.currentStreak || 0,
      patternStats: memberPatternStats,
      importedAt: data.importedAt,
    });
  });
  
  leaderboard.sort((a, b) => b.totalCompleted - a.totalCompleted);
  
  return leaderboard;
}

export function getRecentActivity(limit = 10) {
  const progress = getProgress();
  const activities = [];
  
  Object.entries(progress.completedProblems).forEach(([patternId, problems]) => {
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

export function getLastBackupTime() {
  return localStorage.getItem(STORAGE_KEYS.LAST_BACKUP);
}

// Initialize auto-backup on page load
if (typeof window !== 'undefined') {
  // Initial backup
  initDB().then(() => {
    autoBackupToIndexedDB();
  });
  
  // Backup on page unload
  window.addEventListener('beforeunload', () => {
    autoBackupToIndexedDB();
  });
  
  // Check for recovery on load
  checkAndRecoverProgress();
}
