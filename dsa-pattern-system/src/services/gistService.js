import { hashPassword, verifyPassword } from '../utils/auth';

const GITHUB_API_BASE = 'https://api.github.com';
const REGISTRY_FILENAME = 'dsa-cracker-registry.json';
const USER_PROGRESS_PREFIX = 'dsa-progress-';

const getToken = () => import.meta.env.VITE_GITHUB_TOKEN;

const headers = () => ({
  'Authorization': `Bearer ${getToken()}`,
  'Accept': 'application/vnd.github+json',
  'X-GitHub-Api-Version': '2022-11-28',
});

let registryGistId = localStorage.getItem('dsa_registry_gist_id');

async function findGistByDescription(description) {
  try {
    let page = 1;
    const perPage = 100;
    
    while (true) {
      const response = await fetch(
        `${GITHUB_API_BASE}/gists?per_page=${perPage}&page=${page}`,
        { headers: headers() }
      );
      
      if (!response.ok) {
        throw new Error(`Failed to fetch gists: ${response.status}`);
      }
      
      const gists = await response.json();
      
      if (gists.length === 0) {
        break;
      }
      
      const found = gists.find(g => g.description === description);
      if (found) {
        return found;
      }
      
      if (gists.length < perPage) {
        break;
      }
      
      page++;
      
      if (page > 10) {
        console.warn('Searched 1000 gists, stopping search');
        break;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error finding gist:', error);
    return null;
  }
}

async function getOrCreateRegistryGist() {
  if (registryGistId) {
    try {
      const response = await fetch(`${GITHUB_API_BASE}/gists/${registryGistId}`, {
        headers: headers(),
      });
      
      if (response.ok) {
        const gist = await response.json();
        if (gist.description === 'DSA Cracker User Registry') {
          return gist;
        }
      }
    } catch (error) {
      console.warn('Cached registry gist not found, searching...');
    }
    registryGistId = null;
    localStorage.removeItem('dsa_registry_gist_id');
  }
  
  console.log('Searching for existing registry gist...');
  const existingGist = await findGistByDescription('DSA Cracker User Registry');
  
  if (existingGist) {
    console.log('Found existing registry gist:', existingGist.id);
    registryGistId = existingGist.id;
    localStorage.setItem('dsa_registry_gist_id', registryGistId);
    
    const response = await fetch(`${GITHUB_API_BASE}/gists/${existingGist.id}`, {
      headers: headers(),
    });
    if (response.ok) {
      return await response.json();
    }
    return existingGist;
  }
  
  console.log('Creating new registry gist...');
  const response = await fetch(`${GITHUB_API_BASE}/gists`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      description: 'DSA Cracker User Registry',
      public: false,
      files: {
        [REGISTRY_FILENAME]: {
          content: JSON.stringify({ users: {}, lastUpdated: new Date().toISOString() }, null, 2),
        },
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create registry gist: ${response.status}`);
  }
  
  const gist = await response.json();
  console.log('Created new registry gist:', gist.id);
  registryGistId = gist.id;
  localStorage.setItem('dsa_registry_gist_id', registryGistId);
  return gist;
}

export async function getAllUsers() {
  try {
    const gist = await getOrCreateRegistryGist();
    const content = gist.files[REGISTRY_FILENAME]?.content;
    
    if (!content) {
      return {};
    }
    
    const registry = JSON.parse(content);
    return registry.users || {};
  } catch (error) {
    console.error('Error fetching users:', error);
    return {};
  }
}

async function updateRegistry(users) {
  const response = await fetch(`${GITHUB_API_BASE}/gists/${registryGistId}`, {
    method: 'PATCH',
    headers: headers(),
    body: JSON.stringify({
      files: {
        [REGISTRY_FILENAME]: {
          content: JSON.stringify({ 
            users, 
            lastUpdated: new Date().toISOString() 
          }, null, 2),
        },
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to update registry: ${response.status}`);
  }
  
  return await response.json();
}

export async function createUserGist(username, password) {
  const users = await getAllUsers();
  
  const normalizedUsername = username.toLowerCase().replace(/\s+/g, '-');
  
  if (users[normalizedUsername]) {
    throw new Error(`Username "${username}" is already taken`);
  }
  
  const passwordHash = await hashPassword(password);
  
  const initialProgress = {
    version: 3,
    profile: {
      name: username,
      passwordHash: passwordHash,
      joinedDate: new Date().toISOString(),
      lastActive: new Date().toISOString(),
    },
    progress: {
      completedProblems: {},
      streakData: {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        activityDates: [],
      },
    },
    goals: {
      target: 10,
      weekStart: getWeekStart(),
    },
  };
  
  const response = await fetch(`${GITHUB_API_BASE}/gists`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      description: `DSA Cracker Progress - ${username}`,
      public: false,
      files: {
        [`${USER_PROGRESS_PREFIX}${normalizedUsername}.json`]: {
          content: JSON.stringify(initialProgress, null, 2),
        },
      },
    }),
  });
  
  if (!response.ok) {
    throw new Error(`Failed to create user gist: ${response.status}`);
  }
  
  const gist = await response.json();
  
  users[normalizedUsername] = {
    displayName: username,
    gistId: gist.id,
    hasPassword: true,
    createdAt: new Date().toISOString(),
  };
  
  await updateRegistry(users);
  
  return {
    userId: normalizedUsername,
    gistId: gist.id,
    profile: { ...initialProgress.profile, passwordHash: undefined },
    progress: initialProgress.progress,
    goals: initialProgress.goals,
  };
}

export async function verifyUserPassword(userId, password) {
  try {
    const users = await getAllUsers();
    const user = users[userId];
    
    if (!user) {
      throw new Error(`User "${userId}" not found`);
    }
    
    const response = await fetch(`${GITHUB_API_BASE}/gists/${user.gistId}`, {
      headers: headers(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user data: ${response.status}`);
    }
    
    const gist = await response.json();
    const filename = `${USER_PROGRESS_PREFIX}${userId}.json`;
    const content = gist.files[filename]?.content;
    
    if (!content) {
      throw new Error('User data not found');
    }
    
    const userData = JSON.parse(content);
    const storedHash = userData.profile?.passwordHash;
    
    if (!storedHash) {
      return true;
    }
    
    return await verifyPassword(password, storedHash);
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
}

export async function getUserProgress(userId) {
  try {
    const users = await getAllUsers();
    const user = users[userId];
    
    if (!user) {
      throw new Error(`User "${userId}" not found`);
    }
    
    const response = await fetch(`${GITHUB_API_BASE}/gists/${user.gistId}`, {
      headers: headers(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user progress: ${response.status}`);
    }
    
    const gist = await response.json();
    const filename = `${USER_PROGRESS_PREFIX}${userId}.json`;
    const content = gist.files[filename]?.content;
    
    if (!content) {
      throw new Error('Progress file not found in gist');
    }
    
    const data = JSON.parse(content);
    
    return {
      ...data,
      profile: { ...data.profile, passwordHash: undefined },
    };
  } catch (error) {
    console.error('Error fetching user progress:', error);
    throw error;
  }
}

export async function saveUserProgress(userId, data) {
  try {
    const users = await getAllUsers();
    const user = users[userId];
    
    if (!user) {
      throw new Error(`User "${userId}" not found`);
    }
    
    const response = await fetch(`${GITHUB_API_BASE}/gists/${user.gistId}`, {
      headers: headers(),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch current data: ${response.status}`);
    }
    
    const gist = await response.json();
    const filename = `${USER_PROGRESS_PREFIX}${userId}.json`;
    const currentContent = gist.files[filename]?.content;
    let passwordHash = null;
    
    if (currentContent) {
      const currentData = JSON.parse(currentContent);
      passwordHash = currentData.profile?.passwordHash;
    }
    
    const progressData = {
      version: 3,
      lastSaved: new Date().toISOString(),
      profile: {
        ...data.profile,
        passwordHash: passwordHash,
      },
      progress: data.progress,
      goals: data.goals,
    };
    
    const saveResponse = await fetch(`${GITHUB_API_BASE}/gists/${user.gistId}`, {
      method: 'PATCH',
      headers: headers(),
      body: JSON.stringify({
        files: {
          [filename]: {
            content: JSON.stringify(progressData, null, 2),
          },
        },
      }),
    });
    
    if (!saveResponse.ok) {
      throw new Error(`Failed to save progress: ${saveResponse.status}`);
    }
    
    return await saveResponse.json();
  } catch (error) {
    console.error('Error saving user progress:', error);
    throw error;
  }
}

export async function checkUsernameAvailable(username) {
  const users = await getAllUsers();
  const normalizedUsername = username.toLowerCase().replace(/\s+/g, '-');
  return !users[normalizedUsername];
}

export async function getMultipleUsersProgress(userIds) {
  const results = {};
  
  await Promise.all(
    userIds.map(async (userId) => {
      try {
        const progress = await getUserProgress(userId);
        results[userId] = progress;
      } catch (error) {
        console.warn(`Failed to fetch progress for ${userId}:`, error);
        results[userId] = null;
      }
    })
  );
  
  return results;
}

function getWeekStart() {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const weekStart = new Date(now.setDate(diff));
  weekStart.setHours(0, 0, 0, 0);
  return weekStart.toISOString();
}

export function isConfigured() {
  return !!getToken();
}

export function clearRegistryCache() {
  registryGistId = null;
  localStorage.removeItem('dsa_registry_gist_id');
}
