// Pattern data imports
import { arraysStrings } from './arrays-strings';
import { twoPointers } from './two-pointers';
import { slidingWindow } from './sliding-window';
import { prefixSum } from './prefix-sum';
import { intervals } from './intervals';
import { binarySearch } from './binary-search';
import { greedy } from './greedy';
import { bfsDfs } from './bfs-dfs';
import { trees } from './trees';
import { graphs } from './graphs';
import { topologicalSort } from './topological-sort';
import { unionFind } from './union-find';
import { dynamicProgramming } from './dynamic-programming';
import { backtracking } from './backtracking';
import { heaps } from './heaps';
import { monotonicStack } from './monotonic-stack';
import { tries } from './tries';
import { segmentTrees } from './segment-trees';
import { bitManipulation } from './bit-manipulation';
import { getEnhancedProblems } from '../problemDetails';

// All patterns organized by ID
export const patterns = {
  'arrays-strings': arraysStrings,
  'two-pointers': twoPointers,
  'sliding-window': slidingWindow,
  'prefix-sum': prefixSum,
  'intervals': intervals,
  'binary-search': binarySearch,
  'greedy': greedy,
  'bfs-dfs': bfsDfs,
  'trees': trees,
  'graphs': graphs,
  'topological-sort': topologicalSort,
  'union-find': unionFind,
  'dynamic-programming': dynamicProgramming,
  'backtracking': backtracking,
  'heaps': heaps,
  'monotonic-stack': monotonicStack,
  'tries': tries,
  'segment-trees': segmentTrees,
  'bit-manipulation': bitManipulation,
};

// Difficulty levels for learning path (inspired by Grokking the Coding Interview)
export const DIFFICULTY_LEVELS = {
  BEGINNER: { label: 'Beginner', color: 'bg-emerald-100 text-emerald-700', order: 1 },
  INTERMEDIATE: { label: 'Intermediate', color: 'bg-amber-100 text-amber-700', order: 2 },
  ADVANCED: { label: 'Advanced', color: 'bg-rose-100 text-rose-700', order: 3 },
};

// Learning path categories (like Grokking's progressive approach)
export const LEARNING_CATEGORIES = {
  FOUNDATION: {
    label: '🌱 Foundation',
    description: 'Start here! Master these fundamental patterns first.',
    color: 'emerald',
  },
  CORE: {
    label: '🎯 Core Patterns',
    description: 'Essential patterns that appear in most interviews.',
    color: 'blue',
  },
  INTERMEDIATE: {
    label: '⚡ Intermediate',
    description: 'Level up with these commonly asked patterns.',
    color: 'amber',
  },
  ADVANCED: {
    label: '🚀 Advanced',
    description: 'Challenge yourself with complex patterns.',
    color: 'rose',
  },
};

// Topic configuration with learning path order (all 19 patterns now available!)
// Order is inspired by Grokking the Coding Interview's progressive approach
export const topics = [
  // 🌱 FOUNDATION - Start here (Patterns 1-4)
  { 
    id: 'two-pointers', 
    label: 'Two Pointers', 
    icon: '👉', 
    available: true,
    learningOrder: 1,
    category: 'FOUNDATION',
    level: 'BEGINNER',
    prerequisites: [],
    estimatedHours: 4,
    description: 'The gateway pattern - simple yet powerful technique for sorted arrays'
  },
  { 
    id: 'sliding-window', 
    label: 'Sliding Window', 
    icon: '🪟', 
    available: true,
    learningOrder: 2,
    category: 'FOUNDATION',
    level: 'BEGINNER',
    prerequisites: ['two-pointers'],
    estimatedHours: 5,
    description: 'Master contiguous subarray/substring problems efficiently'
  },
  { 
    id: 'arrays-strings', 
    label: 'Arrays & Strings', 
    icon: '🔢', 
    available: true,
    learningOrder: 3,
    category: 'FOUNDATION',
    level: 'BEGINNER',
    prerequisites: [],
    estimatedHours: 6,
    description: 'Fundamental operations and manipulation techniques'
  },
  { 
    id: 'prefix-sum', 
    label: 'Prefix Sum', 
    icon: '➕', 
    available: true,
    learningOrder: 4,
    category: 'FOUNDATION',
    level: 'BEGINNER',
    prerequisites: ['arrays-strings'],
    estimatedHours: 3,
    description: 'Pre-compute cumulative sums for range query problems'
  },

  // 🎯 CORE PATTERNS - Essential for interviews (Patterns 5-9)
  { 
    id: 'binary-search', 
    label: 'Binary Search', 
    icon: '🔍', 
    available: true,
    learningOrder: 5,
    category: 'CORE',
    level: 'BEGINNER',
    prerequisites: ['arrays-strings'],
    estimatedHours: 5,
    description: 'Divide and conquer to find elements in O(log n)'
  },
  { 
    id: 'intervals', 
    label: 'Merge Intervals', 
    icon: '📊', 
    available: true,
    learningOrder: 6,
    category: 'CORE',
    level: 'INTERMEDIATE',
    prerequisites: ['arrays-strings'],
    estimatedHours: 4,
    description: 'Handle overlapping ranges and scheduling problems'
  },
  { 
    id: 'bfs-dfs', 
    label: 'BFS / DFS', 
    icon: '🌊', 
    available: true,
    learningOrder: 7,
    category: 'CORE',
    level: 'INTERMEDIATE',
    prerequisites: ['arrays-strings'],
    estimatedHours: 6,
    description: 'Explore graphs and trees level-by-level or depth-first'
  },
  { 
    id: 'trees', 
    label: 'Trees', 
    icon: '🌳', 
    available: true,
    learningOrder: 8,
    category: 'CORE',
    level: 'INTERMEDIATE',
    prerequisites: ['bfs-dfs'],
    estimatedHours: 8,
    description: 'Binary trees, BST operations, and tree traversals'
  },
  { 
    id: 'heaps', 
    label: 'Heaps / Priority Queue', 
    icon: '⛰️', 
    available: true,
    learningOrder: 9,
    category: 'CORE',
    level: 'INTERMEDIATE',
    prerequisites: ['arrays-strings'],
    estimatedHours: 5,
    description: 'Efficiently find min/max elements and top K problems'
  },

  // ⚡ INTERMEDIATE - Level up (Patterns 10-14)
  { 
    id: 'graphs', 
    label: 'Graphs', 
    icon: '🕸️', 
    available: true,
    learningOrder: 10,
    category: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    prerequisites: ['bfs-dfs'],
    estimatedHours: 8,
    description: 'Graph representations, traversals, and classic algorithms'
  },
  { 
    id: 'greedy', 
    label: 'Greedy', 
    icon: '🎯', 
    available: true,
    learningOrder: 11,
    category: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    prerequisites: ['arrays-strings'],
    estimatedHours: 5,
    description: 'Make locally optimal choices for global solutions'
  },
  { 
    id: 'backtracking', 
    label: 'Backtracking', 
    icon: '↩️', 
    available: true,
    learningOrder: 12,
    category: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    prerequisites: ['bfs-dfs'],
    estimatedHours: 6,
    description: 'Explore all possibilities with smart pruning'
  },
  { 
    id: 'topological-sort', 
    label: 'Topological Sort', 
    icon: '📋', 
    available: true,
    learningOrder: 13,
    category: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    prerequisites: ['graphs', 'bfs-dfs'],
    estimatedHours: 4,
    description: 'Order tasks with dependencies (DAG problems)'
  },
  { 
    id: 'union-find', 
    label: 'Union-Find', 
    icon: '🔗', 
    available: true,
    learningOrder: 14,
    category: 'INTERMEDIATE',
    level: 'INTERMEDIATE',
    prerequisites: ['graphs'],
    estimatedHours: 4,
    description: 'Track connected components efficiently'
  },

  // 🚀 ADVANCED - Challenge yourself (Patterns 15-19)
  { 
    id: 'dynamic-programming', 
    label: 'Dynamic Programming', 
    icon: '💎', 
    available: true,
    learningOrder: 15,
    category: 'ADVANCED',
    level: 'ADVANCED',
    prerequisites: ['arrays-strings', 'backtracking'],
    estimatedHours: 15,
    description: 'Break problems into overlapping subproblems'
  },
  { 
    id: 'monotonic-stack', 
    label: 'Monotonic Stack/Queue', 
    icon: '📚', 
    available: true,
    learningOrder: 16,
    category: 'ADVANCED',
    level: 'ADVANCED',
    prerequisites: ['arrays-strings', 'sliding-window'],
    estimatedHours: 4,
    description: 'Find next greater/smaller elements efficiently'
  },
  { 
    id: 'tries', 
    label: 'Tries', 
    icon: '🌲', 
    available: true,
    learningOrder: 17,
    category: 'ADVANCED',
    level: 'ADVANCED',
    prerequisites: ['trees'],
    estimatedHours: 4,
    description: 'Prefix trees for string search and autocomplete'
  },
  { 
    id: 'bit-manipulation', 
    label: 'Bit Manipulation', 
    icon: '⚡', 
    available: true,
    learningOrder: 18,
    category: 'ADVANCED',
    level: 'ADVANCED',
    prerequisites: [],
    estimatedHours: 4,
    description: 'Solve problems using binary operations'
  },
  { 
    id: 'segment-trees', 
    label: 'Segment Trees', 
    icon: '🎄', 
    available: true,
    learningOrder: 19,
    category: 'ADVANCED',
    level: 'ADVANCED',
    prerequisites: ['trees', 'prefix-sum'],
    estimatedHours: 5,
    description: 'Range queries with updates in O(log n)'
  },
];

// Get pattern by ID with enhanced problems
export function getPattern(id) {
  const pattern = patterns[id];
  if (!pattern) return null;
  
  // Enhance problems with details from problemDetails.js
  return {
    ...pattern,
    problems: getEnhancedProblems(pattern.problems || [])
  };
}

// Get all available patterns with enhanced problems
export function getAvailablePatterns() {
  return topics.filter(t => t.available).map(t => getPattern(t.id)).filter(Boolean);
}

// Get topics sorted by learning order (for guided learning path)
export function getTopicsByLearningOrder() {
  return [...topics].sort((a, b) => a.learningOrder - b.learningOrder);
}

// Get topics grouped by learning category (like Grokking's structure)
export function getTopicsByLearningCategory() {
  const sorted = getTopicsByLearningOrder();
  return {
    FOUNDATION: sorted.filter(t => t.category === 'FOUNDATION'),
    CORE: sorted.filter(t => t.category === 'CORE'),
    INTERMEDIATE: sorted.filter(t => t.category === 'INTERMEDIATE'),
    ADVANCED: sorted.filter(t => t.category === 'ADVANCED'),
  };
}

// Get topics grouped by difficulty level
export function getTopicsByDifficulty() {
  return {
    BEGINNER: topics.filter(t => t.level === 'BEGINNER'),
    INTERMEDIATE: topics.filter(t => t.level === 'INTERMEDIATE'),
    ADVANCED: topics.filter(t => t.level === 'ADVANCED'),
  };
}

// Get recommended next pattern based on completed patterns
export function getNextRecommendedPattern(completedPatternIds = []) {
  const sorted = getTopicsByLearningOrder();
  
  for (const topic of sorted) {
    if (completedPatternIds.includes(topic.id)) continue;
    
    // Check if prerequisites are met
    const prereqsMet = topic.prerequisites.every(prereq => 
      completedPatternIds.includes(prereq)
    );
    
    if (prereqsMet) {
      return topic;
    }
  }
  
  // All patterns complete or no prereqs met, return first incomplete
  return sorted.find(t => !completedPatternIds.includes(t.id)) || null;
}

// Get topic with full details including level info
export function getTopicWithDetails(id) {
  const topic = topics.find(t => t.id === id);
  if (!topic) return null;
  
  return {
    ...topic,
    levelInfo: DIFFICULTY_LEVELS[topic.level],
    categoryInfo: LEARNING_CATEGORIES[topic.category],
    pattern: patterns[id],
  };
}

// Legacy function - Get topics grouped by category (keeping for backward compatibility)
export function getTopicsByCategory() {
  return {
    fundamentals: topics.filter(t => ['FOUNDATION'].includes(t.category)),
    techniques: topics.filter(t => ['CORE'].includes(t.category)),
    advanced: topics.filter(t => ['INTERMEDIATE'].includes(t.category)),
    specialized: topics.filter(t => ['ADVANCED'].includes(t.category)),
  };
}
