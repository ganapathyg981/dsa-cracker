export const greedy = {
  id: 'greedy',
  title: 'Greedy',
  icon: '🎯',
  difficulty: 'Medium-Hard',
  
  theory: {
    overview: `Greedy algorithms make locally optimal choices at each step, hoping to find a global optimum. The key is proving that local optima lead to global optimum (greedy choice property) and that the problem has optimal substructure.

Unlike dynamic programming which considers all possibilities, greedy commits to one choice and never reconsiders. This makes greedy algorithms faster but they only work for specific problems.

Common greedy scenarios: interval scheduling, Huffman coding, MST algorithms (Prim's, Kruskal's), and many "maximum" problems where taking the largest available choice is provably optimal.`,
    
    keyInsight: 'If making the locally best choice at each step leads to a globally optimal solution, use greedy. Prove correctness by exchange argument.',
    
    whenToUse: [
      'Problem has greedy choice property (local optimal = global optimal)',
      'Interval scheduling (pick earliest ending)',
      'Fractional problems (can take partial items)',
      'Activity selection and resource allocation',
      'Making change with standard coin denominations'
    ],
    
    complexity: {
      time: 'O(n) to O(n log n) typically',
      space: 'O(1) to O(n)'
    }
  },

  decisionTree: {
    question: "What type of greedy problem?",
    options: [
      { label: "Interval/activity selection", result: "interval-scheduling" },
      { label: "Jump/reach problems", result: "jump-game" },
      { label: "Partition/allocation", result: "partition-greedy" },
      { label: "Gas station / circular path", result: "gas-station" },
      { label: "Assignment/matching", result: "assignment" }
    ]
  },

  templates: [
    {
      id: 'interval-scheduling',
      name: 'Activity Selection (Interval Scheduling)',
      description: 'Always pick the activity that ends earliest.',
      java: `public int maxActivities(int[][] intervals) {
    // Sort by end time
    Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
    
    int count = 1;
    int lastEnd = intervals[0][1];
    
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] >= lastEnd) {
            // No overlap - can take this activity
            count++;
            lastEnd = intervals[i][1];
        }
    }
    
    return count;
}`,
      python: `def max_activities(intervals: List[List[int]]) -> int:
    # Sort by end time
    intervals.sort(key=lambda x: x[1])
    
    count = 1
    last_end = intervals[0][1]
    
    for start, end in intervals[1:]:
        if start >= last_end:
            # No overlap - can take this activity
            count += 1
            last_end = end
    
    return count`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'intervals = [[1,4],[3,5],[0,6],[5,7],[3,9],[5,9],[6,10],[8,11]]',
        output: '4',
        explanation: 'Select [1,4], [5,7], [8,11] - maximum non-overlapping'
      }
    },
    {
      id: 'jump-game',
      name: 'Jump Game (Can Reach End)',
      description: 'Track farthest reachable position.',
      java: `public boolean canJump(int[] nums) {
    int maxReach = 0;
    
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) {
            return false;  // Can't reach this position
        }
        maxReach = Math.max(maxReach, i + nums[i]);
        
        if (maxReach >= nums.length - 1) {
            return true;
        }
    }
    
    return true;
}

// Jump Game II - minimum jumps
public int jump(int[] nums) {
    int jumps = 0, currentEnd = 0, farthest = 0;
    
    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        
        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    
    return jumps;
}`,
      python: `def can_jump(nums: List[int]) -> bool:
    max_reach = 0
    
    for i in range(len(nums)):
        if i > max_reach:
            return False  # Can't reach this position
        max_reach = max(max_reach, i + nums[i])
        
        if max_reach >= len(nums) - 1:
            return True
    
    return True

# Jump Game II - minimum jumps
def jump(nums: List[int]) -> int:
    jumps = 0
    current_end = 0
    farthest = 0
    
    for i in range(len(nums) - 1):
        farthest = max(farthest, i + nums[i])
        
        if i == current_end:
            jumps += 1
            current_end = farthest
    
    return jumps`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [2,3,1,1,4]',
        output: 'true (canJump), 2 (jump count)',
        explanation: 'Jump 1 step from 0 to 1, then 3 steps to end'
      }
    },
    {
      id: 'gas-station',
      name: 'Gas Station (Circular Tour)',
      description: 'If total gas >= total cost, solution exists. Find starting point where running sum never goes negative.',
      java: `public int canCompleteCircuit(int[] gas, int[] cost) {
    int totalSurplus = 0;
    int currentSurplus = 0;
    int startStation = 0;
    
    for (int i = 0; i < gas.length; i++) {
        int diff = gas[i] - cost[i];
        totalSurplus += diff;
        currentSurplus += diff;
        
        if (currentSurplus < 0) {
            // Can't reach i+1 from startStation
            // Try starting from i+1
            startStation = i + 1;
            currentSurplus = 0;
        }
    }
    
    return totalSurplus >= 0 ? startStation : -1;
}`,
      python: `def can_complete_circuit(gas: List[int], cost: List[int]) -> int:
    total_surplus = 0
    current_surplus = 0
    start_station = 0
    
    for i in range(len(gas)):
        diff = gas[i] - cost[i]
        total_surplus += diff
        current_surplus += diff
        
        if current_surplus < 0:
            # Can't reach i+1 from start_station
            # Try starting from i+1
            start_station = i + 1
            current_surplus = 0
    
    return start_station if total_surplus >= 0 else -1`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]',
        output: '3',
        explanation: 'Start at station 3, complete circular tour'
      }
    },
    {
      id: 'partition-greedy',
      name: 'Partition Labels',
      description: 'Track last occurrence of each character, extend partition to include all occurrences.',
      java: `public List<Integer> partitionLabels(String s) {
    // Find last occurrence of each character
    int[] lastIndex = new int[26];
    for (int i = 0; i < s.length(); i++) {
        lastIndex[s.charAt(i) - 'a'] = i;
    }
    
    List<Integer> result = new ArrayList<>();
    int start = 0, end = 0;
    
    for (int i = 0; i < s.length(); i++) {
        // Extend partition to include all occurrences
        end = Math.max(end, lastIndex[s.charAt(i) - 'a']);
        
        if (i == end) {
            // Current partition complete
            result.add(end - start + 1);
            start = i + 1;
        }
    }
    
    return result;
}`,
      python: `def partition_labels(s: str) -> List[int]:
    # Find last occurrence of each character
    last_index = {c: i for i, c in enumerate(s)}
    
    result = []
    start = 0
    end = 0
    
    for i, c in enumerate(s):
        # Extend partition to include all occurrences
        end = max(end, last_index[c])
        
        if i == end:
            # Current partition complete
            result.append(end - start + 1)
            start = i + 1
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) - fixed alphabet',
      testCase: {
        input: 's = "ababcbacadefegdehijhklij"',
        output: '[9, 7, 8]',
        explanation: 'Partitions: "ababcbaca", "defegde", "hijhklij"'
      }
    },
    {
      id: 'assignment',
      name: 'Assign Cookies',
      description: 'Sort both arrays, greedily match smallest cookie to smallest child it satisfies.',
      java: `public int findContentChildren(int[] children, int[] cookies) {
    Arrays.sort(children);
    Arrays.sort(cookies);
    
    int child = 0;
    int cookie = 0;
    
    while (child < children.length && cookie < cookies.length) {
        if (cookies[cookie] >= children[child]) {
            child++;  // This child is satisfied
        }
        cookie++;  // Move to next cookie either way
    }
    
    return child;  // Number of satisfied children
}`,
      python: `def find_content_children(children: List[int], cookies: List[int]) -> int:
    children.sort()
    cookies.sort()
    
    child = 0
    cookie = 0
    
    while child < len(children) and cookie < len(cookies):
        if cookies[cookie] >= children[child]:
            child += 1  # This child is satisfied
        cookie += 1  # Move to next cookie either way
    
    return child  # Number of satisfied children`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'children = [1,2,3], cookies = [1,1]',
        output: '1',
        explanation: 'Only child with greed 1 can be satisfied'
      }
    }
  ],

  problems: [
    { name: 'Jump Game', difficulty: 'Medium', tags: ['reachability'] },
    { name: 'Jump Game II', difficulty: 'Medium', tags: ['minimum jumps'] },
    { name: 'Gas Station', difficulty: 'Medium', tags: ['circular', 'running sum'] },
    { name: 'Partition Labels', difficulty: 'Medium', tags: ['intervals', 'last occurrence'] },
    { name: 'Assign Cookies', difficulty: 'Easy', tags: ['sorting', 'matching'] },
    { name: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', tags: ['collect all profits'] },
    { name: 'Task Scheduler', difficulty: 'Medium', tags: ['scheduling', 'cooldown'] },
    { name: 'Candy', difficulty: 'Hard', tags: ['two pass', 'neighbors'] },
    { name: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', tags: ['intervals'] }
  ],

  mistakes: [
    {
      trap: 'Assuming greedy works without proof',
      fix: 'Verify greedy choice property: local optimal must lead to global optimal. Use exchange argument.'
    },
    {
      trap: 'Wrong sorting order (by start vs end, ascending vs descending)',
      fix: 'Think about what makes the "best" local choice. For intervals: earliest END. For assignment: smallest first.'
    },
    {
      trap: 'Not handling edge cases (empty input, single element)',
      fix: 'Always check base cases before main loop.'
    },
    {
      trap: 'Using greedy when DP is needed (e.g., coin change with arbitrary denominations)',
      fix: 'Greedy fails for coin change with [1, 3, 4] target 6. Use DP when greedy proof fails.'
    }
  ],

  variations: [
    {
      name: 'Exchange Argument Proof',
      description: 'Prove greedy is optimal by showing any non-greedy solution can be transformed to greedy without worse cost.'
    },
    {
      name: 'Fractional Knapsack',
      description: 'Unlike 0/1 knapsack (DP), fractional allows partial items - greedy by value/weight ratio works.'
    },
    {
      name: 'Huffman Coding',
      description: 'Greedy algorithm for optimal prefix-free codes. Always merge two lowest frequency nodes.'
    }
  ]
};

