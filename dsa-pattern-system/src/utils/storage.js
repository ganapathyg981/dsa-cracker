const STORAGE_KEYS = {
  USER_PROFILE: 'dsa_user_profile',
  PROGRESS: 'dsa_progress',
  IMPORTED_MEMBERS: 'dsa_imported_members',
  WEEKLY_GOALS: 'dsa_weekly_goals',
};

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
    version: 1,
    exportedAt: new Date().toISOString(),
    profile,
    progress,
    goals,
  };
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

