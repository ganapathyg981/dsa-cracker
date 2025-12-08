export const bfsDfs = {
  id: 'bfs-dfs',
  title: 'BFS / DFS',
  icon: '🌊',
  difficulty: 'Medium',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION (inspired by Grokking the Coding Interview)
  introduction: {
    realWorldAnalogy: `Imagine you're searching for a friend in a large building 🏢:

**BFS (Breadth-First Search)** = Searching floor by floor
You check EVERYONE on floor 1, then EVERYONE on floor 2, etc. If your friend is on floor 3, you'll find them after checking all of floors 1-2.

**DFS (Depth-First Search)** = Searching room by room, going deep
You go into room 1, then into a closet in that room, then into a box in that closet... exploring as DEEP as possible before backtracking.

Use BFS when you want the SHORTEST path (fewest floors/steps).
Use DFS when you want to explore EVERYTHING or find ANY path.`,

    simpleExplanation: `Both BFS and DFS are ways to visit all nodes in a tree or graph:

**BFS (Breadth-First)**
• Uses a **Queue** (First-In-First-Out)
• Visits all neighbors before going deeper
• Perfect for: Shortest path, level-order traversal

**DFS (Depth-First)**
• Uses **Recursion** or a **Stack** (Last-In-First-Out)
• Goes as deep as possible before backtracking
• Perfect for: Finding all paths, detecting cycles, exploring all possibilities`,

    visualSteps: [
      { step: 1, title: 'BFS Level Order', description: 'Process level by level using Queue', visual: 'Level 1: [A] → Level 2: [B,C] → Level 3: [D,E,F]' },
      { step: 2, title: 'BFS Key Insight', description: 'Queue size = nodes at current level', visual: 'while(queue): size=len(queue) → process size nodes' },
      { step: 3, title: 'DFS Path', description: 'Go deep, then backtrack', visual: 'A → B → D → (backtrack) → E → (backtrack) → C → F' },
      { step: 4, title: 'DFS Key Insight', description: 'Recursion = implicit stack', visual: 'dfs(node): visit(node), for child: dfs(child)' },
      { step: 5, title: 'Choose Wisely', description: 'BFS = shortest path, DFS = all paths', visual: '🎯 Match algorithm to problem!' },
    ],

    keyTakeaway: '💡 BFS guarantees shortest path in unweighted graphs because it explores all nodes at distance K before any node at distance K+1. DFS is simpler for exploring all possibilities.',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'shortest path (unweighted)',
      'level order traversal',
      'minimum steps/moves',
      'nearest/closest',
      'find all connected components',
      'detect cycle',
      'number of islands',
      'all paths from A to B',
    ],
    useBFSWhen: [
      'Finding shortest path in unweighted graph/grid',
      'Level-by-level traversal of tree',
      'Minimum number of steps/operations',
      'Finding nearest node satisfying condition',
      'Spreading from multiple sources (multi-source BFS)',
    ],
    useDFSWhen: [
      'Need to explore all paths or possibilities',
      'Detecting cycles in a graph',
      'Topological sorting',
      'Finding connected components',
      'Backtracking problems',
      'Recursion feels natural for the problem',
    ],
    notSuitableWhen: [
      'Graph has weighted edges (use Dijkstra)',
      'Need exact path cost with different edge weights',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'trees', relationship: 'Trees are a special case of graphs - BFS/DFS work the same way' },
    { id: 'graphs', relationship: 'Graph problems often require BFS/DFS as the core traversal' },
    { id: 'topological-sort', relationship: 'Topological sort uses DFS with post-order processing' },
    { id: 'backtracking', relationship: 'Backtracking is DFS with pruning' },
  ],
  
  theory: {
    overview: `BFS (Breadth-First Search) and DFS (Depth-First Search) are fundamental graph/tree traversal algorithms. BFS explores level by level using a queue, while DFS explores as deep as possible using recursion or a stack.

BFS guarantees shortest path in unweighted graphs because it visits nodes in order of distance. DFS is simpler to implement recursively and is useful for exploring all paths, detecting cycles, and topological sorting.

Choose BFS for shortest path problems. Choose DFS for path enumeration, cycle detection, or when exploring all possibilities. On grids, both work but BFS is preferred for "minimum steps to reach" problems.`,
    
    keyInsight: 'BFS = shortest path (unweighted), level-order. DFS = explore all paths, recursive nature, backtracking.',
    
    whenToUse: [
      'BFS: Shortest path in unweighted graph/grid',
      'BFS: Level-order traversal, minimum steps',
      'DFS: Explore all paths, connected components',
      'DFS: Cycle detection, topological sort',
      'DFS: Backtracking problems'
    ],
    
    complexity: {
      time: 'O(V + E) for graphs, O(m*n) for grids',
      space: 'O(V) for visited set and queue/stack'
    }
  },

  decisionTree: {
    question: "What's the structure and goal?",
    options: [
      { label: "Shortest path in unweighted graph/grid", result: "bfs-shortest" },
      { label: "Level-order traversal (tree)", result: "bfs-level-order" },
      { label: "Find all connected components", result: "dfs-components" },
      { label: "Explore grid (islands, paths)", result: "grid-traversal" },
      { label: "Detect cycle", result: "cycle-detection" }
    ]
  },

  templates: [
    {
      id: 'bfs-shortest',
      name: 'BFS Shortest Path (Grid/Graph)',
      description: 'Use queue, track distance/steps as you traverse.',
      java: `public int shortestPath(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    if (grid[0][0] == 1 || grid[m-1][n-1] == 1) return -1;
    
    int[][] dirs = {{0,1}, {1,0}, {0,-1}, {-1,0}};
    Queue<int[]> queue = new LinkedList<>();
    boolean[][] visited = new boolean[m][n];
    
    queue.offer(new int[]{0, 0, 1});  // row, col, distance
    visited[0][0] = true;
    
    while (!queue.isEmpty()) {
        int[] curr = queue.poll();
        int row = curr[0], col = curr[1], dist = curr[2];
        
        if (row == m-1 && col == n-1) return dist;
        
        for (int[] dir : dirs) {
            int newRow = row + dir[0];
            int newCol = col + dir[1];
            
            if (newRow >= 0 && newRow < m && newCol >= 0 && newCol < n 
                && !visited[newRow][newCol] && grid[newRow][newCol] == 0) {
                visited[newRow][newCol] = true;
                queue.offer(new int[]{newRow, newCol, dist + 1});
            }
        }
    }
    
    return -1;  // No path found
}`,
      python: `def shortest_path(grid: List[List[int]]) -> int:
    from collections import deque
    
    m, n = len(grid), len(grid[0])
    if grid[0][0] == 1 or grid[m-1][n-1] == 1:
        return -1
    
    dirs = [(0,1), (1,0), (0,-1), (-1,0)]
    queue = deque([(0, 0, 1)])  # row, col, distance
    visited = {(0, 0)}
    
    while queue:
        row, col, dist = queue.popleft()
        
        if row == m-1 and col == n-1:
            return dist
        
        for dr, dc in dirs:
            new_row, new_col = row + dr, col + dc
            
            if (0 <= new_row < m and 0 <= new_col < n 
                and (new_row, new_col) not in visited 
                and grid[new_row][new_col] == 0):
                visited.add((new_row, new_col))
                queue.append((new_row, new_col, dist + 1))
    
    return -1  # No path found`,
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n)',
      testCase: {
        input: 'grid = [[0,0,0],[1,1,0],[1,1,0]]',
        output: '5',
        explanation: 'Path: (0,0)→(0,1)→(0,2)→(1,2)→(2,2), length 5'
      }
    },
    {
      id: 'bfs-level-order',
      name: 'BFS Level Order (Tree)',
      description: 'Process nodes level by level, tracking level size.',
      java: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    
    while (!queue.isEmpty()) {
        int levelSize = queue.size();
        List<Integer> level = new ArrayList<>();
        
        for (int i = 0; i < levelSize; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        
        result.add(level);
    }
    
    return result;
}`,
      python: `def level_order(root: TreeNode) -> List[List[int]]:
    from collections import deque
    
    if not root:
        return []
    
    result = []
    queue = deque([root])
    
    while queue:
        level_size = len(queue)
        level = []
        
        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)
            
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        
        result.append(level)
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'root = [3,9,20,null,null,15,7]',
        output: '[[3],[9,20],[15,7]]',
        explanation: 'Three levels: root, children, grandchildren'
      }
    },
    {
      id: 'dfs-components',
      name: 'DFS Connected Components',
      description: 'DFS from each unvisited node, count components.',
      java: `public int countComponents(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    
    for (int[] edge : edges) {
        graph.get(edge[0]).add(edge[1]);
        graph.get(edge[1]).add(edge[0]);
    }
    
    boolean[] visited = new boolean[n];
    int count = 0;
    
    for (int i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, graph, visited);
            count++;
        }
    }
    
    return count;
}

private void dfs(int node, List<List<Integer>> graph, boolean[] visited) {
    visited[node] = true;
    for (int neighbor : graph.get(node)) {
        if (!visited[neighbor]) {
            dfs(neighbor, graph, visited);
        }
    }
}`,
      python: `def count_components(n: int, edges: List[List[int]]) -> int:
    from collections import defaultdict
    
    graph = defaultdict(list)
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)
    
    visited = set()
    count = 0
    
    def dfs(node):
        visited.add(node)
        for neighbor in graph[node]:
            if neighbor not in visited:
                dfs(neighbor)
    
    for i in range(n):
        if i not in visited:
            dfs(i)
            count += 1
    
    return count`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      testCase: {
        input: 'n = 5, edges = [[0,1],[1,2],[3,4]]',
        output: '2',
        explanation: 'Two components: {0,1,2} and {3,4}'
      }
    },
    {
      id: 'grid-traversal',
      name: 'Grid DFS (Number of Islands)',
      description: 'DFS to mark all connected land cells as visited.',
      java: `public int numIslands(char[][] grid) {
    if (grid == null || grid.length == 0) return 0;
    
    int count = 0;
    int m = grid.length, n = grid[0].length;
    
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (grid[i][j] == '1') {
                dfs(grid, i, j);
                count++;
            }
        }
    }
    
    return count;
}

private void dfs(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length 
        || grid[i][j] != '1') {
        return;
    }
    
    grid[i][j] = '0';  // Mark as visited
    
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}`,
      python: `def num_islands(grid: List[List[str]]) -> int:
    if not grid:
        return 0
    
    def dfs(i, j):
        if i < 0 or i >= len(grid) or j < 0 or j >= len(grid[0]) or grid[i][j] != '1':
            return
        
        grid[i][j] = '0'  # Mark as visited
        
        dfs(i + 1, j)
        dfs(i - 1, j)
        dfs(i, j + 1)
        dfs(i, j - 1)
    
    count = 0
    for i in range(len(grid)):
        for j in range(len(grid[0])):
            if grid[i][j] == '1':
                dfs(i, j)
                count += 1
    
    return count`,
      timeComplexity: 'O(m * n)',
      spaceComplexity: 'O(m * n) worst case recursion',
      testCase: {
        input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]',
        output: '2',
        explanation: 'Two islands: top-left 2x2 and bottom-right 1x1'
      }
    },
    {
      id: 'cycle-detection',
      name: 'Cycle Detection (DFS with Colors)',
      description: 'Use three colors: white (unvisited), gray (in progress), black (done).',
      java: `public boolean hasCycle(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
    for (int[] edge : edges) {
        graph.get(edge[0]).add(edge[1]);
    }
    
    int[] color = new int[n];  // 0=white, 1=gray, 2=black
    
    for (int i = 0; i < n; i++) {
        if (color[i] == 0 && dfs(i, graph, color)) {
            return true;
        }
    }
    return false;
}

private boolean dfs(int node, List<List<Integer>> graph, int[] color) {
    color[node] = 1;  // Mark as in progress (gray)
    
    for (int neighbor : graph.get(node)) {
        if (color[neighbor] == 1) return true;  // Back edge - cycle!
        if (color[neighbor] == 0 && dfs(neighbor, graph, color)) {
            return true;
        }
    }
    
    color[node] = 2;  // Mark as done (black)
    return false;
}`,
      python: `def has_cycle(n: int, edges: List[List[int]]) -> bool:
    from collections import defaultdict
    
    graph = defaultdict(list)
    for a, b in edges:
        graph[a].append(b)
    
    color = [0] * n  # 0=white, 1=gray, 2=black
    
    def dfs(node):
        color[node] = 1  # Mark as in progress (gray)
        
        for neighbor in graph[node]:
            if color[neighbor] == 1:
                return True  # Back edge - cycle!
            if color[neighbor] == 0 and dfs(neighbor):
                return True
        
        color[node] = 2  # Mark as done (black)
        return False
    
    for i in range(n):
        if color[i] == 0 and dfs(i):
            return True
    return False`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      testCase: {
        input: 'n = 4, edges = [[0,1],[1,2],[2,0],[2,3]]',
        output: 'true',
        explanation: 'Cycle exists: 0 → 1 → 2 → 0'
      }
    }
  ],

  problems: [
    { name: 'Number of Islands', difficulty: 'Medium', tags: ['grid DFS'] },
    { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', tags: ['BFS', 'tree'] },
    { name: 'Shortest Path in Binary Matrix', difficulty: 'Medium', tags: ['BFS', 'grid'] },
    { name: 'Clone Graph', difficulty: 'Medium', tags: ['DFS/BFS', 'hash map'] },
    { name: 'Course Schedule', difficulty: 'Medium', tags: ['cycle detection', 'directed graph'] },
    { name: 'Pacific Atlantic Water Flow', difficulty: 'Medium', tags: ['multi-source DFS'] },
    { name: 'Word Ladder', difficulty: 'Hard', tags: ['BFS', 'word transformation'] },
    { name: 'Surrounded Regions', difficulty: 'Medium', tags: ['boundary DFS'] },
    { name: 'Rotting Oranges', difficulty: 'Medium', tags: ['multi-source BFS'] }
  ],

  mistakes: [
    {
      trap: 'Using DFS for shortest path in unweighted graph',
      fix: 'DFS doesn\'t guarantee shortest path. Use BFS for shortest path problems.'
    },
    {
      trap: 'Not marking nodes as visited before adding to queue (BFS)',
      fix: 'Mark visited when adding to queue, not when popping. Otherwise you\'ll add duplicates.'
    },
    {
      trap: 'Stack overflow with deep recursion (DFS)',
      fix: 'Convert to iterative with explicit stack, or increase stack size.'
    },
    {
      trap: 'Wrong direction array for 4-directional vs 8-directional',
      fix: '4-dir: [(0,1),(1,0),(0,-1),(-1,0)]. 8-dir: add diagonals [(1,1),(1,-1),(-1,1),(-1,-1)].'
    }
  ],

  variations: [
    {
      name: 'Multi-Source BFS',
      description: 'Start BFS from multiple sources simultaneously (e.g., Rotting Oranges, 01 Matrix).'
    },
    {
      name: 'Bidirectional BFS',
      description: 'Search from both start and end, meet in middle. Reduces time complexity.'
    },
    {
      name: 'Iterative DFS with Stack',
      description: 'Avoid recursion depth issues by using explicit stack. Same logic, more control.'
    }
  ]
};

