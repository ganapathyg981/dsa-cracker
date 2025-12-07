export const dynamicProgramming = {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  icon: '💎',
  difficulty: 'Medium-Hard',
  
  theory: {
    overview: `Dynamic Programming solves problems by breaking them into overlapping subproblems, solving each once, and storing results. Two key properties: optimal substructure (optimal solution built from optimal sub-solutions) and overlapping subproblems (same subproblems recur).

Approaches: Top-down (memoization) - natural recursive thinking with cache. Bottom-up (tabulation) - iterative, often more efficient.

The hardest part is identifying the state (what changes between subproblems) and the recurrence relation (how to combine subproblem solutions).`,
    
    keyInsight: 'Identify state variables, write recurrence relation, then implement with memoization or tabulation. State = what info is needed to solve subproblem.',
    
    whenToUse: [
      'Problem has optimal substructure',
      'Same subproblems solved multiple times',
      'Counting paths/ways problems',
      'Optimization (min/max) problems',
      'Decision problems with constraints'
    ],
    
    complexity: {
      time: 'O(states × transition cost)',
      space: 'O(states), can often optimize to O(previous states)'
    }
  },

  decisionTree: {
    question: "What's the DP pattern?",
    options: [
      { label: "1D state (linear sequence)", result: "dp-1d" },
      { label: "2D state (two sequences/grid)", result: "dp-2d" },
      { label: "Knapsack (weight constraint)", result: "knapsack" },
      { label: "Interval DP (subarray/substring)", result: "interval-dp" },
      { label: "State machine DP", result: "state-machine" }
    ]
  },

  templates: [
    {
      id: 'dp-1d',
      name: '1D DP (Climbing Stairs / House Robber)',
      description: 'State depends on previous 1-2 states.',
      java: `// Climbing Stairs - count ways
public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// House Robber - max sum, can't take adjacent
public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      python: `# Climbing Stairs - count ways
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1

# House Robber - max sum, can't take adjacent
def rob(nums: List[int]) -> int:
    prev2, prev1 = 0, 0
    for num in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + num)
    return prev1`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) with optimization',
      testCase: {
        input: 'nums = [2,7,9,3,1] (House Robber)',
        output: '12',
        explanation: 'Rob houses 1, 3, 5: 2 + 9 + 1 = 12'
      }
    },
    {
      id: 'dp-2d',
      name: '2D DP (LCS / Edit Distance)',
      description: 'Compare two sequences, dp[i][j] = result for first i of s1 and first j of s2.',
      java: `// Longest Common Subsequence
public int longestCommonSubsequence(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1] + 1;
            } else {
                dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
            }
        }
    }
    return dp[m][n];
}

// Edit Distance
public int minDistance(String s1, String s2) {
    int m = s1.length(), n = s2.length();
    int[][] dp = new int[m + 1][n + 1];
    
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (s1.charAt(i-1) == s2.charAt(j-1)) {
                dp[i][j] = dp[i-1][j-1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i-1][j-1],  // replace
                               Math.min(dp[i-1][j],    // delete
                                        dp[i][j-1]));   // insert
            }
        }
    }
    return dp[m][n];
}`,
      python: `# Longest Common Subsequence
def longest_common_subsequence(s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# Edit Distance
def min_distance(s1: str, s2: str) -> int:
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j-1], dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n), can optimize to O(n)',
      testCase: {
        input: 's1 = "horse", s2 = "ros" (Edit Distance)',
        output: '3',
        explanation: 'horse → rorse → rose → ros'
      }
    },
    {
      id: 'knapsack',
      name: '0/1 Knapsack / Subset Sum',
      description: 'dp[i][w] = best value using first i items with capacity w.',
      java: `// 0/1 Knapsack
public int knapsack(int[] weights, int[] values, int W) {
    int n = weights.length;
    int[][] dp = new int[n + 1][W + 1];
    
    for (int i = 1; i <= n; i++) {
        for (int w = 1; w <= W; w++) {
            if (weights[i-1] <= w) {
                dp[i][w] = Math.max(
                    dp[i-1][w],                              // don't take
                    values[i-1] + dp[i-1][w - weights[i-1]]  // take
                );
            } else {
                dp[i][w] = dp[i-1][w];
            }
        }
    }
    return dp[n][W];
}

// Coin Change (Unbounded Knapsack variant)
public int coinChange(int[] coins, int amount) {
    int[] dp = new int[amount + 1];
    Arrays.fill(dp, amount + 1);
    dp[0] = 0;
    
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i) {
                dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`,
      python: `# 0/1 Knapsack
def knapsack(weights: List[int], values: List[int], W: int) -> int:
    n = len(weights)
    dp = [[0] * (W + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(1, W + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],                              # don't take
                    values[i-1] + dp[i-1][w - weights[i-1]]  # take
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][W]

# Coin Change (Unbounded Knapsack variant)
def coin_change(coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
      timeComplexity: 'O(n × W) or O(amount × coins)',
      spaceComplexity: 'O(n × W), can optimize to O(W)',
      testCase: {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1'
      }
    },
    {
      id: 'state-machine',
      name: 'State Machine DP (Stock Problems)',
      description: 'Track different states (holding, not holding, cooldown).',
      java: `// Best Time to Buy and Sell Stock with Cooldown
public int maxProfit(int[] prices) {
    int n = prices.length;
    if (n <= 1) return 0;
    
    int hold = -prices[0];  // Holding stock
    int sold = 0;           // Just sold
    int rest = 0;           // Not holding (cooldown or just resting)
    
    for (int i = 1; i < n; i++) {
        int prevHold = hold;
        hold = Math.max(hold, rest - prices[i]);  // Keep holding or buy
        rest = Math.max(rest, sold);              // Keep resting or was cooldown
        sold = prevHold + prices[i];              // Sell today
    }
    
    return Math.max(sold, rest);
}`,
      python: `# Best Time to Buy and Sell Stock with Cooldown
def max_profit(prices: List[int]) -> int:
    if len(prices) <= 1:
        return 0
    
    hold = -prices[0]  # Holding stock
    sold = 0           # Just sold
    rest = 0           # Not holding (cooldown or just resting)
    
    for price in prices[1:]:
        prev_hold = hold
        hold = max(hold, rest - price)  # Keep holding or buy
        rest = max(rest, sold)          # Keep resting or was cooldown
        sold = prev_hold + price        # Sell today
    
    return max(sold, rest)`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'prices = [1,2,3,0,2]',
        output: '3',
        explanation: 'Buy 1, sell 2, cooldown, buy 0, sell 2. Profit = 3'
      }
    }
  ],

  problems: [
    { name: 'Climbing Stairs', difficulty: 'Easy', tags: ['1D DP'] },
    { name: 'House Robber', difficulty: 'Medium', tags: ['1D DP'] },
    { name: 'Coin Change', difficulty: 'Medium', tags: ['unbounded knapsack'] },
    { name: 'Longest Common Subsequence', difficulty: 'Medium', tags: ['2D DP'] },
    { name: 'Edit Distance', difficulty: 'Medium', tags: ['2D DP'] },
    { name: 'Partition Equal Subset Sum', difficulty: 'Medium', tags: ['0/1 knapsack'] },
    { name: 'Target Sum', difficulty: 'Medium', tags: ['0/1 knapsack'] },
    { name: 'Longest Increasing Subsequence', difficulty: 'Medium', tags: ['1D DP', 'binary search'] },
    { name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy-Hard', tags: ['state machine'] },
    { name: 'Word Break', difficulty: 'Medium', tags: ['1D DP', 'string'] }
  ],

  mistakes: [
    {
      trap: 'Wrong base case initialization',
      fix: 'Think about what dp[0] or dp[0][0] means. Often it\'s 0 or 1 or first element.'
    },
    {
      trap: 'Off-by-one in loop bounds or indexing',
      fix: 'Draw out small example. Does dp[i] represent first i elements or element at index i?'
    },
    {
      trap: 'Wrong recurrence relation',
      fix: 'Think: "What choices do I have at state i? How do they relate to previous states?"'
    },
    {
      trap: 'Space optimization breaks when current depends on current row',
      fix: 'Can only optimize to 1D if dp[i][j] only depends on dp[i-1][...] row.'
    }
  ],

  variations: [
    {
      name: 'Memoization (Top-Down)',
      description: 'Recursive with cache. More intuitive, same complexity as bottom-up.'
    },
    {
      name: 'Space Optimization',
      description: 'If only previous row/state needed, reduce O(n²) space to O(n).'
    },
    {
      name: 'DP on Trees',
      description: 'DFS post-order, combine children solutions at parent.'
    }
  ]
};

