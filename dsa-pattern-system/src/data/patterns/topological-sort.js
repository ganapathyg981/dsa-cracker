export const topologicalSort = {
  id: 'topological-sort',
  title: 'Topological Sort',
  icon: '📋',
  difficulty: 'Medium',
  
  theory: {
    overview: `Topological sort orders vertices in a DAG (Directed Acyclic Graph) such that for every edge u→v, u comes before v. It's used for dependency resolution, task scheduling, and build systems.

Two main approaches: Kahn's algorithm (BFS with indegree) and DFS with post-order. Kahn's is more intuitive and naturally detects cycles (if result length < n, cycle exists).

Key insight: Start with nodes that have no dependencies (indegree = 0), process them, reduce indegrees of neighbors, repeat.`,
    
    keyInsight: 'Process nodes with indegree 0 first. If final result has fewer nodes than graph, a cycle exists.',
    
    whenToUse: [
      'Course prerequisites / dependency resolution',
      'Build order for compilation',
      'Task scheduling with dependencies',
      'Detecting cycles in directed graphs',
      'Finding valid orderings'
    ],
    
    complexity: {
      time: 'O(V + E)',
      space: 'O(V)'
    }
  },

  decisionTree: {
    question: "What do you need from topological sort?",
    options: [
      { label: "Find valid ordering (or detect cycle)", result: "kahn-algorithm" },
      { label: "DFS-based topological order", result: "dfs-topo" },
      { label: "All possible topological orderings", result: "all-orderings" }
    ]
  },

  templates: [
    {
      id: 'kahn-algorithm',
      name: "Kahn's Algorithm (BFS)",
      description: 'BFS starting from indegree-0 nodes. Most common approach.',
      java: `public int[] findOrder(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    int[] indegree = new int[numCourses];
    
    for (int i = 0; i < numCourses; i++) {
        graph.add(new ArrayList<>());
    }
    
    for (int[] pre : prerequisites) {
        int course = pre[0], prereq = pre[1];
        graph.get(prereq).add(course);
        indegree[course]++;
    }
    
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) {
        if (indegree[i] == 0) queue.offer(i);
    }
    
    int[] result = new int[numCourses];
    int index = 0;
    
    while (!queue.isEmpty()) {
        int course = queue.poll();
        result[index++] = course;
        
        for (int next : graph.get(course)) {
            if (--indegree[next] == 0) {
                queue.offer(next);
            }
        }
    }
    
    return index == numCourses ? result : new int[0];  // Empty if cycle
}`,
      python: `def find_order(num_courses: int, prerequisites: List[List[int]]) -> List[int]:
    from collections import defaultdict, deque
    
    graph = defaultdict(list)
    indegree = [0] * num_courses
    
    for course, prereq in prerequisites:
        graph[prereq].append(course)
        indegree[course] += 1
    
    queue = deque([i for i in range(num_courses) if indegree[i] == 0])
    result = []
    
    while queue:
        course = queue.popleft()
        result.append(course)
        
        for next_course in graph[course]:
            indegree[next_course] -= 1
            if indegree[next_course] == 0:
                queue.append(next_course)
    
    return result if len(result) == num_courses else []  # Empty if cycle`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      testCase: {
        input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]',
        output: '[0,1,2,3] or [0,2,1,3]',
        explanation: 'Course 0 has no prereqs, then 1 and 2, finally 3'
      }
    },
    {
      id: 'dfs-topo',
      name: 'DFS-based Topological Sort',
      description: 'Add to result in post-order, then reverse.',
      java: `public int[] findOrderDFS(int numCourses, int[][] prerequisites) {
    List<List<Integer>> graph = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) graph.add(new ArrayList<>());
    
    for (int[] pre : prerequisites) {
        graph.get(pre[1]).add(pre[0]);
    }
    
    int[] color = new int[numCourses];  // 0=white, 1=gray, 2=black
    List<Integer> result = new ArrayList<>();
    
    for (int i = 0; i < numCourses; i++) {
        if (color[i] == 0 && !dfs(i, graph, color, result)) {
            return new int[0];  // Cycle detected
        }
    }
    
    Collections.reverse(result);
    return result.stream().mapToInt(i -> i).toArray();
}

private boolean dfs(int node, List<List<Integer>> graph, int[] color, List<Integer> result) {
    color[node] = 1;  // Gray - in progress
    
    for (int neighbor : graph.get(node)) {
        if (color[neighbor] == 1) return false;  // Cycle!
        if (color[neighbor] == 0 && !dfs(neighbor, graph, color, result)) {
            return false;
        }
    }
    
    color[node] = 2;  // Black - done
    result.add(node);  // Post-order
    return true;
}`,
      python: `def find_order_dfs(num_courses: int, prerequisites: List[List[int]]) -> List[int]:
    from collections import defaultdict
    
    graph = defaultdict(list)
    for course, prereq in prerequisites:
        graph[prereq].append(course)
    
    color = [0] * num_courses  # 0=white, 1=gray, 2=black
    result = []
    
    def dfs(node):
        color[node] = 1  # Gray - in progress
        
        for neighbor in graph[node]:
            if color[neighbor] == 1:
                return False  # Cycle!
            if color[neighbor] == 0 and not dfs(neighbor):
                return False
        
        color[node] = 2  # Black - done
        result.append(node)  # Post-order
        return True
    
    for i in range(num_courses):
        if color[i] == 0 and not dfs(i):
            return []  # Cycle detected
    
    return result[::-1]  # Reverse post-order`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      testCase: {
        input: 'numCourses = 2, prerequisites = [[1,0]]',
        output: '[0, 1]',
        explanation: 'Must take course 0 before course 1'
      }
    }
  ],

  problems: [
    { name: 'Course Schedule', difficulty: 'Medium', tags: ['cycle detection'] },
    { name: 'Course Schedule II', difficulty: 'Medium', tags: ['find order'] },
    { name: 'Alien Dictionary', difficulty: 'Hard', tags: ['build graph', 'topo sort'] },
    { name: 'Parallel Courses', difficulty: 'Medium', tags: ['topo sort', 'levels'] },
    { name: 'Sequence Reconstruction', difficulty: 'Medium', tags: ['unique topo order'] },
    { name: 'Minimum Height Trees', difficulty: 'Medium', tags: ['topo-like', 'leaves'] }
  ],

  mistakes: [
    {
      trap: 'Not detecting cycles (returning incomplete result)',
      fix: 'Check if result.size() == numNodes. If not, cycle exists.'
    },
    {
      trap: 'Wrong edge direction (prereq → course vs course → prereq)',
      fix: 'For prerequisites [a,b] meaning "b before a": add edge b→a, indegree[a]++.'
    },
    {
      trap: 'Forgetting isolated nodes (no edges)',
      fix: 'Initialize all nodes in graph even if they have no edges.'
    }
  ],

  variations: [
    {
      name: 'Lexicographically Smallest Order',
      description: 'Use PriorityQueue instead of regular Queue in Kahn\'s algorithm.'
    },
    {
      name: 'Parallel Execution Levels',
      description: 'Process level by level in BFS. Level count = minimum parallel time.'
    }
  ]
};

