export const greedy = {
  id: 'greedy',
  title: 'Greedy',
  icon: '🎯',
  difficulty: 'Medium-Hard',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION
  introduction: {
    realWorldAnalogy: `You're at a buffet 🍽️ trying to get the most food on your plate (with limited space):

**Greedy approach**: At each food station, take as much of the BEST food as you can fit, then move to the next.

This works great for buffets! But it doesn't always work for all problems. If the best appetizer is too big, you might miss out on better main courses.

**Greedy = Always make the locally optimal choice, hoping it leads to a globally optimal solution.**`,

    simpleExplanation: `Greedy algorithms make the **best choice at each step** without looking ahead. Unlike Dynamic Programming (which considers all options), greedy commits immediately and never reconsiders.

**When does greedy work?**
1. **Greedy choice property**: Local optimum leads to global optimum
2. **Optimal substructure**: Optimal solution contains optimal sub-solutions

**Classic examples:**
• Making change with US coins (25¢, 10¢, 5¢, 1¢) - greedy works!
• Interval scheduling - pick earliest-ending event first
• Fractional knapsack - take most valuable per weight first`,

    visualSteps: [
      { step: 1, title: 'Identify Greedy Choice', description: 'What local decision seems best?', visual: 'Sort by end time, value/weight, etc.' },
      { step: 2, title: 'Verify It Works', description: 'Does local optimal = global optimal?', visual: 'Can you prove it or find counterexample?' },
      { step: 3, title: 'Sort (Usually)', description: 'Greedy often needs sorted input', visual: 'Arrays.sort(intervals, by end time)' },
      { step: 4, title: 'Process Greedily', description: 'Make best choice at each step', visual: 'for item: if fits, take it' },
      { step: 5, title: 'No Backtracking', description: 'Once chosen, never reconsider', visual: 'Commit to choice, move forward' },
    ],

    keyTakeaway: '💡 Greedy is fast (O(n log n) typically) but only works when local optimal = global optimal. When unsure, verify with examples or use DP instead.',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'maximum activities',
      'minimum meeting rooms',
      'interval scheduling',
      'gas station',
      'jump game',
      'can reach',
      'assign tasks',
    ],
    problemCharacteristics: [
      'Making a series of choices',
      'Each choice has clear "best" option',
      'Problem has optimal substructure',
      'Sorting reveals the greedy strategy',
    ],
    greedyVsDp: [
      'Greedy: Make best choice now, never reconsider',
      'DP: Consider all choices, remember subproblem results',
      'Greedy: Faster but only works for specific problems',
      'DP: Slower but works when greedy fails',
    ],
    notSuitableWhen: [
      'Local optimal ≠ global optimal (use DP)',
      '0/1 Knapsack (can\'t take fractions)',
      'Need to consider future consequences',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'dynamic-programming', relationship: 'Use DP when greedy doesn\'t work (need to consider all options)' },
    { id: 'intervals', relationship: 'Many interval problems use greedy (sort by end time)' },
    { id: 'heaps', relationship: 'Heaps help implement greedy efficiently (always get best option)' },
  ],
  
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
    },
    {
      id: 'lemonade-change',
      name: 'Lemonade Change',
      description: 'Track bills, prioritize giving larger bills as change.',
      java: `public boolean lemonadeChange(int[] bills) {
    int five = 0, ten = 0;
    
    for (int bill : bills) {
        if (bill == 5) {
            five++;
        } else if (bill == 10) {
            if (five == 0) return false;
            five--;
            ten++;
        } else {  // bill == 20
            // Prefer giving 1 ten + 1 five (save smaller bills)
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    
    return true;
}`,
      python: `def lemonade_change(bills: List[int]) -> bool:
    five = 0
    ten = 0
    
    for bill in bills:
        if bill == 5:
            five += 1
        elif bill == 10:
            if five == 0:
                return False
            five -= 1
            ten += 1
        else:  # bill == 20
            # Prefer giving 1 ten + 1 five (save smaller bills)
            if ten > 0 and five > 0:
                ten -= 1
                five -= 1
            elif five >= 3:
                five -= 3
            else:
                return False
    
    return True`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'bills = [5,5,5,10,20]',
        output: 'true',
        explanation: 'Can make change for each customer'
      }
    },
    {
      id: 'candy',
      name: 'Candy Distribution',
      description: 'Two passes: left-to-right for ascending, right-to-left for descending ratings.',
      java: `public int candy(int[] ratings) {
    int n = ratings.length;
    int[] candies = new int[n];
    Arrays.fill(candies, 1);
    
    // Left to right: if rating[i] > rating[i-1]
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) {
            candies[i] = candies[i - 1] + 1;
        }
    }
    
    // Right to left: if rating[i] > rating[i+1]
    int total = candies[n - 1];
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) {
            candies[i] = Math.max(candies[i], candies[i + 1] + 1);
        }
        total += candies[i];
    }
    
    return total;
}`,
      python: `def candy(ratings: List[int]) -> int:
    n = len(ratings)
    candies = [1] * n
    
    # Left to right: if rating[i] > rating[i-1]
    for i in range(1, n):
        if ratings[i] > ratings[i - 1]:
            candies[i] = candies[i - 1] + 1
    
    # Right to left: if rating[i] > rating[i+1]
    for i in range(n - 2, -1, -1):
        if ratings[i] > ratings[i + 1]:
            candies[i] = max(candies[i], candies[i + 1] + 1)
    
    return sum(candies)`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'ratings = [1,0,2]',
        output: '5',
        explanation: 'Candies: [2,1,2] = 5 total'
      }
    }
  ],

  problems: [
    { name: 'Jump Game', difficulty: 'Medium', tags: ['reachability'] },
    { name: 'Jump Game II', difficulty: 'Medium', tags: ['minimum jumps'] },
    { name: 'Gas Station', difficulty: 'Medium', tags: ['circular', 'running sum'] },
    { name: 'Partition Labels', difficulty: 'Medium', tags: ['intervals', 'last occurrence'] },
    { name: 'Assign Cookies', difficulty: 'Easy', tags: ['sorting', 'matching'] },
    { name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', tags: ['track min', 'max profit'] },
    { name: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', tags: ['collect all profits'] },
    { name: 'Lemonade Change', difficulty: 'Easy', tags: ['simulation', 'greedy change'] },
    { name: 'Task Scheduler', difficulty: 'Medium', tags: ['scheduling', 'cooldown'] },
    { name: 'Candy', difficulty: 'Hard', tags: ['two pass', 'neighbors'] },
    { name: 'Remove K Digits', difficulty: 'Medium', tags: ['stack', 'monotonic'] },
    { name: 'Wiggle Subsequence', difficulty: 'Medium', tags: ['greedy peaks'] },
    { name: 'Boats to Save People', difficulty: 'Medium', tags: ['two pointers', 'pairing'] },
    { name: 'Queue Reconstruction by Height', difficulty: 'Medium', tags: ['sorting', 'insertion'] },
    { name: 'Reorganize String', difficulty: 'Medium', tags: ['heap', 'frequency'] },
    { name: 'Car Pooling', difficulty: 'Medium', tags: ['difference array', 'capacity'] },
    { name: 'Divide Array in Sets of K Consecutive Numbers', difficulty: 'Medium', tags: ['ordered map', 'consecutive'] },
    { name: 'Minimum Add to Make Parentheses Valid', difficulty: 'Medium', tags: ['balance', 'count'] },
    { name: 'Remove Duplicate Letters', difficulty: 'Medium', tags: ['stack', 'lexicographic'] },
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
    },
    {
      trap: 'In Candy problem, doing only one pass left-to-right or right-to-left',
      fix: 'Need TWO passes: left-to-right for increasing ratings, right-to-left for decreasing, then take max.'
    },
    {
      trap: 'In Lemonade Change, giving wrong bills (e.g., three $5 bills when you have $10+$5)',
      fix: 'For $20 customer, prefer giving $10+$5 to save smaller bills for future. Only give 3×$5 if no $10.'
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
    },
    {
      name: 'Graph Algorithms (MST)',
      description: 'Kruskal\'s and Prim\'s are greedy: always pick minimum weight edge that doesn\'t create cycle (Kruskal) or minimum edge from tree (Prim).'
    },
    {
      name: 'Dijkstra\'s Shortest Path',
      description: 'Greedy selection of unvisited node with minimum distance. Fails with negative weights (use Bellman-Ford).'
    }
  ]
};

