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

// Topic configuration for navigation (all 19 patterns now available!)
export const topics = [
  { id: 'arrays-strings', label: 'Arrays & Strings', icon: '🔢', available: true },
  { id: 'two-pointers', label: 'Two Pointers', icon: '👉', available: true },
  { id: 'sliding-window', label: 'Sliding Window', icon: '🪟', available: true },
  { id: 'prefix-sum', label: 'Prefix Sum', icon: '➕', available: true },
  { id: 'intervals', label: 'Intervals', icon: '📊', available: true },
  { id: 'binary-search', label: 'Binary Search', icon: '🔍', available: true },
  { id: 'greedy', label: 'Greedy', icon: '🎯', available: true },
  { id: 'bfs-dfs', label: 'BFS / DFS', icon: '🌊', available: true },
  { id: 'trees', label: 'Trees', icon: '🌳', available: true },
  { id: 'graphs', label: 'Graphs', icon: '🕸️', available: true },
  { id: 'topological-sort', label: 'Topological Sort', icon: '📋', available: true },
  { id: 'union-find', label: 'Union-Find', icon: '🔗', available: true },
  { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '💎', available: true },
  { id: 'backtracking', label: 'Backtracking', icon: '↩️', available: true },
  { id: 'heaps', label: 'Heaps', icon: '⛰️', available: true },
  { id: 'monotonic-stack', label: 'Monotonic Stack/Queue', icon: '📚', available: true },
  { id: 'tries', label: 'Tries', icon: '🌲', available: true },
  { id: 'segment-trees', label: 'Segment Trees', icon: '🎄', available: true },
  { id: 'bit-manipulation', label: 'Bit Manipulation', icon: '⚡', available: true },
];

// Get pattern by ID
export function getPattern(id) {
  return patterns[id] || null;
}

// Get all available patterns
export function getAvailablePatterns() {
  return topics.filter(t => t.available).map(t => patterns[t.id]).filter(Boolean);
}

// Get topics grouped by category
export function getTopicsByCategory() {
  return {
    fundamentals: topics.slice(0, 6),      // Arrays through Binary Search
    techniques: topics.slice(6, 10),       // Greedy through Graphs
    advanced: topics.slice(10, 16),        // Topo Sort through Monotonic Stack
    specialized: topics.slice(16, 19),     // Tries through Bit Manipulation
  };
}
