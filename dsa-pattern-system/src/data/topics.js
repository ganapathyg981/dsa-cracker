// Decision Tree topics - ordered by recommended learning progression
// This order matches the Pattern Explorer categories

export const topics = [
  // Beginner (Foundation) - Start here!
  { id: 'arrays-strings', label: 'Arrays & Strings', icon: '🔢', category: 'beginner' },
  { id: 'two-pointers', label: 'Two Pointers', icon: '👉', category: 'beginner' },
  { id: 'sliding-window', label: 'Sliding Window', icon: '🪟', category: 'beginner' },
  { id: 'prefix-sum', label: 'Prefix Sum', icon: '➕', category: 'beginner' },
  { id: 'binary-search', label: 'Binary Search', icon: '🔍', category: 'beginner' },
  
  // Intermediate (Building Blocks)
  { id: 'intervals', label: 'Intervals', icon: '📊', category: 'intermediate' },
  { id: 'trees', label: 'Trees & BST', icon: '🌳', category: 'intermediate' },
  { id: 'bfs-dfs', label: 'BFS / DFS', icon: '🌊', category: 'intermediate' },
  { id: 'graphs', label: 'Graphs', icon: '🕸️', category: 'intermediate' },
  { id: 'greedy', label: 'Greedy', icon: '🎯', category: 'intermediate' },
  
  // Advanced (Complex Patterns)
  { id: 'dynamic-programming', label: 'Dynamic Programming', icon: '💎', category: 'advanced' },
  { id: 'backtracking', label: 'Backtracking', icon: '↩️', category: 'advanced' },
  { id: 'heaps', label: 'Heaps & PQ', icon: '⛰️', category: 'advanced' },
  { id: 'monotonic-stack', label: 'Monotonic Stack', icon: '📚', category: 'advanced' },
  { id: 'union-find', label: 'Union-Find', icon: '🔗', category: 'advanced' },
  { id: 'topological-sort', label: 'Topological Sort', icon: '📋', category: 'advanced' },
  
  // Expert (Specialized)
  { id: 'tries', label: 'Tries', icon: '🌲', category: 'expert' },
  { id: 'segment-trees', label: 'Segment Trees', icon: '🎄', category: 'expert' },
  { id: 'bit-manipulation', label: 'Bit Manipulation', icon: '⚡', category: 'expert' }
];

// Category metadata for UI display
export const categories = {
  beginner: {
    label: '🌱 Foundation',
    description: 'Start here! Master these first.',
    color: 'emerald'
  },
  intermediate: {
    label: '🌿 Building Blocks',
    description: 'Core patterns for most interviews.',
    color: 'blue'
  },
  advanced: {
    label: '🌳 Complex Patterns',
    description: 'Level up your problem-solving.',
    color: 'purple'
  },
  expert: {
    label: '🏆 Specialized',
    description: 'For FAANG-level interviews.',
    color: 'amber'
  }
};
