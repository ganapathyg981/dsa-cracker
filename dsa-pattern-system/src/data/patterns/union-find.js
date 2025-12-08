export const unionFind = {
  id: 'union-find',
  title: 'Union-Find',
  icon: '🔗',
  difficulty: 'Medium',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION
  introduction: {
    realWorldAnalogy: `Imagine social circles at a party 🎉:

Initially, everyone is their own "group leader." When two people become friends, their groups merge (one person becomes the leader of both groups).

**"Are Alice and Bob connected?"** → Find both their group leaders. Same leader = connected!
**"Alice meets Bob"** → Merge their groups (Union operation)

Union-Find efficiently tracks these **dynamic groupings**.`,

    simpleExplanation: `Union-Find (Disjoint Set Union) tracks elements divided into groups. Two key operations:

• **Find(x)**: Who is x's group leader? (Which component is x in?)
• **Union(x, y)**: Merge x's group and y's group

**Two optimizations make it nearly O(1):**
1. **Path Compression**: When finding leader, make all nodes point directly to root
2. **Union by Rank**: Attach smaller tree under larger tree

With both: nearly O(1) per operation!`,

    visualSteps: [
      { step: 1, title: 'Initialize', description: 'Everyone is their own parent', visual: 'parent[i] = i for all i' },
      { step: 2, title: 'Find with Compression', description: 'Find root, flatten tree along the way', visual: 'parent[x] = find(parent[x]) // path compression' },
      { step: 3, title: 'Union by Rank', description: 'Attach smaller tree under larger', visual: 'if rank[rootX] > rank[rootY]: attach Y under X' },
      { step: 4, title: 'Check Connected', description: 'Same root = same component', visual: 'find(x) == find(y) → connected!' },
      { step: 5, title: 'Count Components', description: 'Track count, decrease on union', visual: 'if find(x) != find(y): union, count--' },
    ],

    keyTakeaway: '💡 Union-Find answers "are X and Y connected?" in nearly O(1). Perfect for dynamic connectivity and cycle detection!',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'connected components',
      'are they connected',
      'number of islands',
      'group accounts',
      'merge accounts',
      'redundant connection',
      'cycle in undirected graph',
    ],
    problemCharacteristics: [
      'Need to track connected groups dynamically',
      'Merging groups based on relationships',
      'Checking if two elements are in same group',
      'Counting distinct groups/components',
    ],
    notSuitableWhen: [
      'Need path between nodes (use BFS/DFS)',
      'Directed graph (Union-Find is for undirected)',
      'Static connectivity (simple BFS/DFS is fine)',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'graphs', relationship: 'Alternative to BFS/DFS for connectivity queries' },
    { id: 'bfs-dfs', relationship: 'BFS/DFS find paths; Union-Find just checks connectivity' },
    { id: 'trees', relationship: 'Union-Find internally uses tree structure' },
  ],
  
  theory: {
    overview: `Union-Find (Disjoint Set Union / DSU) efficiently tracks elements partitioned into disjoint sets. It supports two operations: find (which set does element belong to?) and union (merge two sets).

With path compression and union by rank, both operations achieve nearly O(1) amortized time (technically O(α(n)) where α is inverse Ackermann).

Perfect for dynamic connectivity problems, detecting cycles in undirected graphs, and grouping related elements.`,
    
    keyInsight: 'Two optimizations make it nearly O(1): path compression (flatten tree during find) and union by rank (attach smaller tree under larger).',
    
    whenToUse: [
      'Dynamic connectivity queries',
      'Cycle detection in undirected graphs',
      'Connected components (dynamic)',
      'Kruskal\'s MST algorithm',
      'Grouping/merging accounts, components'
    ],
    
    complexity: {
      time: 'O(α(n)) ≈ O(1) amortized per operation',
      space: 'O(n)'
    }
  },

  decisionTree: {
    question: "What Union-Find variant do you need?",
    options: [
      { label: "Basic Union-Find with optimizations", result: "basic-uf" },
      { label: "Count connected components", result: "count-components" },
      { label: "Detect cycle in undirected graph", result: "detect-cycle" }
    ]
  },

  templates: [
    {
      id: 'basic-uf',
      name: 'Union-Find with Path Compression + Union by Rank',
      description: 'Standard optimized Union-Find implementation.',
      java: `class UnionFind {
    private int[] parent;
    private int[] rank;
    private int count;  // Number of components
    
    public UnionFind(int n) {
        parent = new int[n];
        rank = new int[n];
        count = n;
        for (int i = 0; i < n; i++) {
            parent[i] = i;
            rank[i] = 0;
        }
    }
    
    public int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]);  // Path compression
        }
        return parent[x];
    }
    
    public boolean union(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        
        if (rootX == rootY) return false;  // Already connected
        
        // Union by rank
        if (rank[rootX] < rank[rootY]) {
            parent[rootX] = rootY;
        } else if (rank[rootX] > rank[rootY]) {
            parent[rootY] = rootX;
        } else {
            parent[rootY] = rootX;
            rank[rootX]++;
        }
        
        count--;
        return true;
    }
    
    public boolean connected(int x, int y) {
        return find(x) == find(y);
    }
    
    public int getCount() {
        return count;
    }
}`,
      python: `class UnionFind:
    def __init__(self, n: int):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n  # Number of components
    
    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # Path compression
        return self.parent[x]
    
    def union(self, x: int, y: int) -> bool:
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False  # Already connected
        
        # Union by rank
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        self.count -= 1
        return True
    
    def connected(self, x: int, y: int) -> bool:
        return self.find(x) == self.find(y)`,
      timeComplexity: 'O(α(n)) per operation',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'n=5, union(0,1), union(2,3), union(1,2)',
        output: 'components: 2, connected(0,3): true',
        explanation: '{0,1,2,3} and {4} are the two components'
      }
    },
    {
      id: 'count-components',
      name: 'Count Connected Components',
      description: 'Use Union-Find to count components dynamically.',
      java: `public int countComponents(int n, int[][] edges) {
    UnionFind uf = new UnionFind(n);
    
    for (int[] edge : edges) {
        uf.union(edge[0], edge[1]);
    }
    
    return uf.getCount();
}`,
      python: `def count_components(n: int, edges: List[List[int]]) -> int:
    uf = UnionFind(n)
    
    for a, b in edges:
        uf.union(a, b)
    
    return uf.count`,
      timeComplexity: 'O(E × α(V))',
      spaceComplexity: 'O(V)',
      testCase: {
        input: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
        output: '2',
        explanation: 'Two components: {0,1,2} and {3,4}'
      }
    },
    {
      id: 'detect-cycle',
      name: 'Detect Cycle in Undirected Graph',
      description: 'If union returns false, edge connects already-connected nodes = cycle.',
      java: `public boolean hasCycle(int n, int[][] edges) {
    UnionFind uf = new UnionFind(n);
    
    for (int[] edge : edges) {
        if (!uf.union(edge[0], edge[1])) {
            return true;  // Edge connects already-connected nodes
        }
    }
    
    return false;
}`,
      python: `def has_cycle(n: int, edges: List[List[int]]) -> bool:
    uf = UnionFind(n)
    
    for a, b in edges:
        if not uf.union(a, b):
            return True  # Edge connects already-connected nodes
    
    return False`,
      timeComplexity: 'O(E × α(V))',
      spaceComplexity: 'O(V)',
      testCase: {
        input: 'n = 3, edges = [[0,1],[1,2],[2,0]]',
        output: 'true',
        explanation: 'Edge [2,0] creates a cycle'
      }
    }
  ],

  problems: [
    { name: 'Number of Connected Components', difficulty: 'Medium', tags: ['components'] },
    { name: 'Redundant Connection', difficulty: 'Medium', tags: ['cycle detection'] },
    { name: 'Accounts Merge', difficulty: 'Medium', tags: ['grouping', 'string'] },
    { name: 'Longest Consecutive Sequence', difficulty: 'Medium', tags: ['union-find', 'hash'] },
    { name: 'Graph Valid Tree', difficulty: 'Medium', tags: ['cycle', 'connected'] },
    { name: 'Number of Islands II', difficulty: 'Hard', tags: ['dynamic', 'grid'] },
    { name: 'Smallest String With Swaps', difficulty: 'Medium', tags: ['grouping', 'sort'] }
  ],

  mistakes: [
    {
      trap: 'Forgetting path compression in find()',
      fix: 'Always include: parent[x] = find(parent[x]). This flattens the tree.'
    },
    {
      trap: 'Not initializing parent[i] = i',
      fix: 'Each element starts as its own parent. Initialize in constructor.'
    },
    {
      trap: 'Using Union-Find for directed graphs',
      fix: 'Union-Find only works for undirected connectivity. Use DFS/BFS for directed.'
    }
  ],

  variations: [
    {
      name: 'Weighted Union-Find',
      description: 'Track relative values between elements. Used in Evaluate Division problem.'
    },
    {
      name: 'Union-Find with Size',
      description: 'Track component sizes instead of rank. Useful for some problems.'
    }
  ]
};

