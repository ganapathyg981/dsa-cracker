export const graphs = {
  id: 'graphs',
  title: 'Graphs',
  icon: '🕸️',
  difficulty: 'Medium-Hard',
  
  theory: {
    overview: `Graphs consist of vertices (nodes) connected by edges. They can be directed/undirected, weighted/unweighted, cyclic/acyclic. Representation matters: adjacency list for sparse graphs, matrix for dense.

Most graph algorithms are variations of BFS/DFS. The key is understanding when to use which and how to track state (visited, distances, parent pointers).

Common patterns: shortest path (BFS for unweighted, Dijkstra for weighted), connected components, cycle detection, topological sort for DAGs.`,
    
    keyInsight: 'Choose representation wisely (list vs matrix), pick BFS for shortest path, DFS for exploration, and always track visited nodes.',
    
    whenToUse: [
      'Networks, relationships, dependencies',
      'Shortest path problems',
      'Connected components analysis',
      'Cycle detection in dependencies',
      'Path finding in mazes/grids'
    ],
    
    complexity: {
      time: 'O(V + E) for most traversals',
      space: 'O(V + E) for adjacency list'
    }
  },

  decisionTree: {
    question: "What graph operation do you need?",
    options: [
      { label: "Build graph from edges", result: "build-graph" },
      { label: "Shortest path (weighted)", result: "dijkstra" },
      { label: "Clone/copy graph", result: "clone-graph" },
      { label: "Check if graph is bipartite", result: "bipartite" }
    ]
  },

  templates: [
    {
      id: 'build-graph',
      name: 'Build Adjacency List',
      description: 'Standard way to represent graphs for traversal.',
      java: `// Undirected graph
List<List<Integer>> buildGraph(int n, int[][] edges) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
    }
    
    for (int[] edge : edges) {
        graph.get(edge[0]).add(edge[1]);
        graph.get(edge[1]).add(edge[0]);  // Remove for directed
    }
    
    return graph;
}

// Weighted graph
List<List<int[]>> buildWeightedGraph(int n, int[][] edges) {
    List<List<int[]>> graph = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        graph.add(new ArrayList<>());
    }
    
    for (int[] edge : edges) {
        int from = edge[0], to = edge[1], weight = edge[2];
        graph.get(from).add(new int[]{to, weight});
        graph.get(to).add(new int[]{from, weight});  // Remove for directed
    }
    
    return graph;
}`,
      python: `# Undirected graph
def build_graph(n: int, edges: List[List[int]]) -> List[List[int]]:
    from collections import defaultdict
    
    graph = defaultdict(list)
    for a, b in edges:
        graph[a].append(b)
        graph[b].append(a)  # Remove for directed
    
    return graph

# Weighted graph
def build_weighted_graph(n: int, edges: List[List[int]]) -> dict:
    from collections import defaultdict
    
    graph = defaultdict(list)
    for src, dst, weight in edges:
        graph[src].append((dst, weight))
        graph[dst].append((src, weight))  # Remove for directed
    
    return graph`,
      timeComplexity: 'O(E)',
      spaceComplexity: 'O(V + E)',
      testCase: {
        input: 'n = 4, edges = [[0,1],[1,2],[2,3]]',
        output: '{0:[1], 1:[0,2], 2:[1,3], 3:[2]}',
        explanation: 'Adjacency list representation'
      }
    },
    {
      id: 'dijkstra',
      name: "Dijkstra's Shortest Path (Weighted)",
      description: 'Priority queue always processes closest unvisited node.',
      java: `public int[] dijkstra(List<List<int[]>> graph, int start) {
    int n = graph.size();
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[start] = 0;
    
    // Min heap: [distance, node]
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[0] - b[0]);
    pq.offer(new int[]{0, start});
    
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        int d = curr[0], u = curr[1];
        
        if (d > dist[u]) continue;  // Skip outdated entries
        
        for (int[] edge : graph.get(u)) {
            int v = edge[0], weight = edge[1];
            if (dist[u] + weight < dist[v]) {
                dist[v] = dist[u] + weight;
                pq.offer(new int[]{dist[v], v});
            }
        }
    }
    
    return dist;
}`,
      python: `def dijkstra(graph: dict, start: int, n: int) -> List[int]:
    import heapq
    
    dist = [float('inf')] * n
    dist[start] = 0
    
    # Min heap: (distance, node)
    pq = [(0, start)]
    
    while pq:
        d, u = heapq.heappop(pq)
        
        if d > dist[u]:
            continue  # Skip outdated entries
        
        for v, weight in graph[u]:
            if dist[u] + weight < dist[v]:
                dist[v] = dist[u] + weight
                heapq.heappush(pq, (dist[v], v))
    
    return dist`,
      timeComplexity: 'O((V + E) log V)',
      spaceComplexity: 'O(V)',
      testCase: {
        input: 'graph with edges [[0,1,4],[0,2,1],[2,1,2],[1,3,1]], start = 0',
        output: '[0, 3, 1, 4]',
        explanation: 'Shortest distances from node 0'
      }
    },
    {
      id: 'clone-graph',
      name: 'Clone Graph (DFS with HashMap)',
      description: 'Map old nodes to new nodes, DFS to build connections.',
      java: `public Node cloneGraph(Node node) {
    if (node == null) return null;
    
    Map<Node, Node> visited = new HashMap<>();
    return dfs(node, visited);
}

private Node dfs(Node node, Map<Node, Node> visited) {
    if (visited.containsKey(node)) {
        return visited.get(node);
    }
    
    Node clone = new Node(node.val);
    visited.put(node, clone);
    
    for (Node neighbor : node.neighbors) {
        clone.neighbors.add(dfs(neighbor, visited));
    }
    
    return clone;
}`,
      python: `def clone_graph(node: 'Node') -> 'Node':
    if not node:
        return None
    
    visited = {}
    
    def dfs(node):
        if node in visited:
            return visited[node]
        
        clone = Node(node.val)
        visited[node] = clone
        
        for neighbor in node.neighbors:
            clone.neighbors.append(dfs(neighbor))
        
        return clone
    
    return dfs(node)`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      testCase: {
        input: 'node = [[2,4],[1,3],[2,4],[1,3]]',
        output: 'Deep copy of graph',
        explanation: 'Each node cloned with new references'
      }
    },
    {
      id: 'bipartite',
      name: 'Check Bipartite (2-Coloring)',
      description: 'Try to color graph with 2 colors such that no adjacent nodes share color.',
      java: `public boolean isBipartite(int[][] graph) {
    int n = graph.length;
    int[] color = new int[n];  // 0 = uncolored, 1 or -1 = colors
    
    for (int i = 0; i < n; i++) {
        if (color[i] == 0 && !bfs(graph, i, color)) {
            return false;
        }
    }
    return true;
}

private boolean bfs(int[][] graph, int start, int[] color) {
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(start);
    color[start] = 1;
    
    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int neighbor : graph[node]) {
            if (color[neighbor] == 0) {
                color[neighbor] = -color[node];  // Opposite color
                queue.offer(neighbor);
            } else if (color[neighbor] == color[node]) {
                return false;  // Same color = not bipartite
            }
        }
    }
    return true;
}`,
      python: `def is_bipartite(graph: List[List[int]]) -> bool:
    from collections import deque
    
    n = len(graph)
    color = [0] * n  # 0 = uncolored, 1 or -1 = colors
    
    def bfs(start):
        queue = deque([start])
        color[start] = 1
        
        while queue:
            node = queue.popleft()
            for neighbor in graph[node]:
                if color[neighbor] == 0:
                    color[neighbor] = -color[node]  # Opposite color
                    queue.append(neighbor)
                elif color[neighbor] == color[node]:
                    return False  # Same color = not bipartite
        return True
    
    for i in range(n):
        if color[i] == 0 and not bfs(i):
            return False
    return True`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      testCase: {
        input: 'graph = [[1,3],[0,2],[1,3],[0,2]]',
        output: 'true',
        explanation: 'Can be colored: {0,2} = color1, {1,3} = color2'
      }
    }
  ],

  problems: [
    { name: 'Clone Graph', difficulty: 'Medium', tags: ['DFS', 'HashMap'] },
    { name: 'Course Schedule', difficulty: 'Medium', tags: ['topological sort'] },
    { name: 'Number of Connected Components', difficulty: 'Medium', tags: ['Union-Find', 'DFS'] },
    { name: 'Graph Valid Tree', difficulty: 'Medium', tags: ['cycle detection'] },
    { name: 'Network Delay Time', difficulty: 'Medium', tags: ['Dijkstra'] },
    { name: 'Cheapest Flights Within K Stops', difficulty: 'Medium', tags: ['BFS', 'Bellman-Ford'] },
    { name: 'Is Graph Bipartite', difficulty: 'Medium', tags: ['2-coloring'] },
    { name: 'Reconstruct Itinerary', difficulty: 'Hard', tags: ['Eulerian path'] }
  ],

  mistakes: [
    {
      trap: 'Using adjacency matrix for sparse graphs (wastes space)',
      fix: 'Use adjacency list for sparse graphs (E << V²). Matrix only when E ≈ V².'
    },
    {
      trap: 'Not handling disconnected components',
      fix: 'Always loop through all nodes: for (int i = 0; i < n; i++) if (!visited[i]) ...'
    },
    {
      trap: 'Dijkstra with negative weights',
      fix: 'Dijkstra fails with negative edges. Use Bellman-Ford instead.'
    },
    {
      trap: 'Integer overflow in distance calculations',
      fix: 'Check dist[u] != INF before adding weight to avoid overflow.'
    }
  ],

  variations: [
    {
      name: 'Bellman-Ford',
      description: 'Handles negative weights. O(VE) time. Can detect negative cycles.'
    },
    {
      name: 'Floyd-Warshall',
      description: 'All-pairs shortest path. O(V³). Good for dense graphs.'
    },
    {
      name: 'A* Search',
      description: 'Dijkstra with heuristic. Faster for single-target shortest path.'
    }
  ]
};

