export const dynamicProgramming = {
  id: 'dynamic-programming',
  title: 'Dynamic Programming',
  icon: '💎',
  difficulty: 'Medium-Hard',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION (inspired by Grokking the Coding Interview)
  introduction: {
    realWorldAnalogy: `Imagine you're climbing stairs 🪜 and want to count how many ways you can reach the top (taking 1 or 2 steps at a time):

**Naive approach**: Count every possible path from scratch - SLOW!

**Smart approach (DP)**: 
"How many ways to reach step 5? Well, I can only get there from step 4 or step 3. So ways(5) = ways(4) + ways(3)!"

Instead of recalculating from scratch, we BUILD on answers we already computed. That's the magic of Dynamic Programming - **remembering past work to avoid repeating it**.`,

    simpleExplanation: `Dynamic Programming (DP) solves complex problems by breaking them into simpler subproblems. Two key ideas:

1. **Overlapping Subproblems**: The same smaller problems appear repeatedly
2. **Optimal Substructure**: The best solution is built from best solutions to subproblems

**Two approaches to DP:**
• **Top-Down (Memoization)**: Solve recursively, but CACHE results
• **Bottom-Up (Tabulation)**: Build solution iteratively from smallest subproblems

Start with recursion → add memoization → (optionally) convert to iteration`,

    visualSteps: [
      { step: 1, title: 'Brute Force First', description: 'Write recursive solution that works but may be slow', visual: 'fib(5) → fib(4)+fib(3) → fib(3)+fib(2)+...' },
      { step: 2, title: 'Identify Repeats', description: 'Notice same subproblems solved multiple times', visual: 'fib(3) called 2x, fib(2) called 3x ❌' },
      { step: 3, title: 'Add Memoization', description: 'Cache results to avoid re-computation', visual: 'memo[n] = result → lookup before computing ✓' },
      { step: 4, title: 'Or Build Bottom-Up', description: 'Start from base cases, build up iteratively', visual: 'dp[0]=0, dp[1]=1, dp[2]=dp[0]+dp[1]...' },
      { step: 5, title: 'Optimize Space', description: 'Often only need previous 1-2 states', visual: 'dp[n] = prev1 + prev2 → O(1) space!' },
    ],

    keyTakeaway: '💡 DP = Recursion + Memoization. First write the recursive brute force, then cache results. The hardest part is identifying the STATE (what changes between subproblems).',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'minimum/maximum',
      'count number of ways',
      'is it possible to...',
      'longest/shortest subsequence',
      'optimal solution',
      'reach target sum',
      'partition into subsets',
      'distinct paths',
    ],
    problemCharacteristics: [
      'Problem has optimal substructure (optimal solution built from optimal sub-solutions)',
      'Same subproblems are solved multiple times (overlapping subproblems)',
      'Need to make a series of decisions',
      'Result is a single value (count, min, max, true/false) not the actual path/sequence',
    ],
    dpCategories: [
      { name: '0/1 Knapsack', hint: 'Take or skip items with capacity constraint (Subset Sum, Partition Equal)' },
      { name: 'Unbounded Knapsack', hint: 'Unlimited use of items (Coin Change, Rod Cutting)' },
      { name: 'Fibonacci Numbers', hint: 'Current depends on previous 1-2 states (Climbing Stairs, House Robber)' },
      { name: 'Longest Common Subsequence', hint: 'Compare two strings/sequences (LCS, Edit Distance)' },
      { name: 'Palindrome', hint: 'Check/count palindromic subsequences/substrings' },
      { name: 'Grid/Matrix', hint: 'Move through grid (Unique Paths, Min Path Sum)' },
    ],
    notSuitableWhen: [
      'Problem requires the actual path/solution (not just the optimal value)',
      'No overlapping subproblems (each subproblem solved once)',
      'Greedy approach works (doesn\'t need to consider all options)',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'backtracking', relationship: 'Backtracking explores all paths; DP is better when paths overlap' },
    { id: 'greedy', relationship: 'Greedy makes locally optimal choices; use DP when local optimal ≠ global optimal' },
    { id: 'bfs-dfs', relationship: 'BFS/DFS explores graph; DP can optimize by caching visited states' },
  ],

  // 📋 5-STEP DP FRAMEWORK (from Educative)
  framework: {
    title: '5-Step DP Framework',
    steps: [
      { step: 1, name: 'Brute Force', description: 'Write a recursive solution that solves the problem correctly (even if slow)' },
      { step: 2, name: 'Identify State', description: 'What variables uniquely define a subproblem? These become your DP state/dimensions' },
      { step: 3, name: 'Memoization', description: 'Add a cache (hashmap/array) to store and reuse subproblem results' },
      { step: 4, name: 'Bottom-Up', description: 'Convert to iterative by building from base cases up' },
      { step: 5, name: 'Optimize Space', description: 'If only last 1-2 rows/states needed, reduce from O(n) to O(1)' },
    ],
  },
  
  theory: {
    overview: `Dynamic Programming solves problems by breaking them into overlapping subproblems, solving each once, and storing results. Two key properties: optimal substructure (optimal solution built from optimal sub-solutions) and overlapping subproblems (same subproblems recur).

Approaches: Top-down (memoization) - natural recursive thinking with cache. Bottom-up (tabulation) - iterative, often more efficient.

The hardest part is identifying the state (what changes between subproblems) and the recurrence relation (how to combine subproblem solutions).

SYSTEMATIC APPROACH:
1. Write recursive brute force solution
2. Identify state variables (what makes subproblems unique)
3. Add memoization to cache results (top-down)
4. Convert to iterative bottom-up (optional)
5. Optimize space by keeping only needed states`,
    
    keyInsight: 'Identify state variables, write recurrence relation, then implement with memoization or tabulation. State = what info is needed to solve subproblem.',
    
    whenToUse: [
      'Problem has optimal substructure',
      'Same subproblems solved multiple times',
      'Counting paths/ways problems',
      'Optimization (min/max) problems',
      'Decision problems with constraints',
      'Keywords: "find minimum/maximum", "count number of ways", "is it possible to"'
    ],
    
    complexity: {
      time: 'O(states × transition cost)',
      space: 'O(states), can often optimize to O(previous states)'
    }
  },

  decisionTree: {
    question: "What's the DP pattern?",
    options: [
      { label: "Minimum/Maximum path to reach target", result: "min-max-path" },
      { label: "Distinct ways to reach target", result: "distinct-ways" },
      { label: "Decision making (take/skip current)", result: "decision-making" },
      { label: "String comparison (2 strings)", result: "dp-2d" },
      { label: "Merging intervals (range DP)", result: "interval-dp" },
      { label: "State machine (multiple states)", result: "state-machine" }
    ]
  },

  templates: [
    {
      id: 'min-max-path',
      name: 'Min/Max Path to Reach Target',
      description: 'Find optimal cost/path/sum. Formula: dp[i] = min/max(dp[i-ways[j]]) + cost[i]',
      java: `// Min Cost Climbing Stairs
public int minCostClimbingStairs(int[] cost) {
    int n = cost.length;
    int prev2 = cost[0], prev1 = cost[1];
    
    for (int i = 2; i < n; i++) {
        int curr = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = curr;
    }
    
    return Math.min(prev1, prev2);
}

// Coin Change - Minimum coins to make amount
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
      python: `# Min Cost Climbing Stairs
def min_cost_climbing_stairs(cost: List[int]) -> int:
    prev2, prev1 = cost[0], cost[1]
    
    for i in range(2, len(cost)):
        prev2, prev1 = prev1, cost[i] + min(prev1, prev2)
    
    return min(prev1, prev2)

# Coin Change - Minimum coins to make amount
def coin_change(coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1`,
      timeComplexity: 'O(n × ways) or O(amount × coins)',
      spaceComplexity: 'O(n), can optimize to O(1)',
      testCase: {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1'
      }
    },
    {
      id: 'distinct-ways',
      name: 'Distinct Ways to Reach Target',
      description: 'Count ways. Formula: dp[i] = sum(dp[i-ways[j]]) for all valid ways',
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

// Coin Change II - count combinations
public int change(int amount, int[] coins) {
    int[] dp = new int[amount + 1];
    dp[0] = 1;
    
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}`,
      python: `# Climbing Stairs - count ways
def climb_stairs(n: int) -> int:
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1

# Coin Change II - count combinations
def change(amount: int, coins: List[int]) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for i in range(coin, amount + 1):
            dp[i] += dp[i - coin]
    
    return dp[amount]`,
      timeComplexity: 'O(n) or O(amount × coins)',
      spaceComplexity: 'O(n) or O(amount)',
      testCase: {
        input: 'amount = 5, coins = [1,2,5]',
        output: '4',
        explanation: '5 ways: 5, 2+2+1, 2+1+1+1, 1+1+1+1+1'
      }
    },
    {
      id: 'decision-making',
      name: 'Decision Making (Take or Skip)',
      description: 'Choose or ignore current value. Use previous results accordingly.',
      java: `// House Robber - max sum, can't take adjacent
public int rob(int[] nums) {
    if (nums.length == 0) return 0;
    int prev2 = 0, prev1 = 0;
    
    for (int num : nums) {
        int curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}

// Best Time to Buy/Sell Stock
public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE;
    int maxProfit = 0;
    
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      python: `# House Robber - max sum, can't take adjacent
def rob(nums: List[int]) -> int:
    prev2, prev1 = 0, 0
    
    for num in nums:
        prev2, prev1 = prev1, max(prev1, prev2 + num)
    return prev1

# Best Time to Buy/Sell Stock
def max_profit(prices: List[int]) -> int:
    min_price = float('inf')
    max_profit = 0
    
    for price in prices:
        min_price = min(min_price, price)
        max_profit = max(max_profit, price - min_price)
    
    return max_profit`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [2,7,9,3,1] (House Robber)',
        output: '12',
        explanation: 'Rob houses 1, 3, 5: 2 + 9 + 1 = 12'
      }
    },
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
      name: '0/1 Knapsack',
      description: 'dp[i][w] = best value using first i items with capacity w. Each item used once.',
      java: `// 0/1 Knapsack - Take or skip each item once
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

// Partition Equal Subset Sum
public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int num : nums) sum += num;
    if (sum % 2 != 0) return false;
    
    int target = sum / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    
    for (int num : nums) {
        for (int j = target; j >= num; j--) {
            dp[j] = dp[j] || dp[j - num];
        }
    }
    return dp[target];
}`,
      python: `# 0/1 Knapsack - Take or skip each item once
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

# Partition Equal Subset Sum
def can_partition(nums: List[int]) -> bool:
    total = sum(nums)
    if total % 2 != 0:
        return False
    
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for j in range(target, num - 1, -1):
            dp[j] = dp[j] or dp[j - num]
    
    return dp[target]`,
      timeComplexity: 'O(n × W)',
      spaceComplexity: 'O(n × W), can optimize to O(W)',
      testCase: {
        input: 'nums = [1,5,11,5]',
        output: 'true',
        explanation: 'Can partition into [1,5,5] and [11]'
      }
    },
    {
      id: 'interval-dp',
      name: 'Merging Intervals (Range DP)',
      description: 'dp[i][j] combines best from left and right. For subarray/substring problems.',
      java: `// Burst Balloons - max coins from bursting balloons
public int maxCoins(int[] nums) {
    int n = nums.length;
    int[] arr = new int[n + 2];
    arr[0] = arr[n + 1] = 1;
    for (int i = 0; i < n; i++) arr[i + 1] = nums[i];
    
    int[][] dp = new int[n + 2][n + 2];
    
    for (int len = 1; len <= n; len++) {
        for (int i = 1; i <= n - len + 1; i++) {
            int j = i + len - 1;
            for (int k = i; k <= j; k++) {
                dp[i][j] = Math.max(dp[i][j],
                    dp[i][k-1] + arr[i-1] * arr[k] * arr[j+1] + dp[k+1][j]
                );
            }
        }
    }
    return dp[1][n];
}`,
      python: `# Burst Balloons - max coins from bursting balloons
def max_coins(nums: List[int]) -> int:
    n = len(nums)
    arr = [1] + nums + [1]
    
    dp = [[0] * (n + 2) for _ in range(n + 2)]
    
    for length in range(1, n + 1):
        for i in range(1, n - length + 2):
            j = i + length - 1
            for k in range(i, j + 1):
                dp[i][j] = max(dp[i][j],
                    dp[i][k-1] + arr[i-1] * arr[k] * arr[j+1] + dp[k+1][j]
                )
    
    return dp[1][n]`,
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
      testCase: {
        input: 'nums = [3,1,5,8]',
        output: '167',
        explanation: 'Burst in order: 1, 5, 3, 8'
      }
    },
    {
      id: 'state-machine',
      name: 'State Machine DP (Stock Problems)',
      description: 'UNIFIED FRAMEWORK: T[i][k][s] = max profit (day i, k transactions left, s=0/1 stocks held). All 6 stock problems use this pattern.',
      java: `// PATTERN: T[i][k][0] = max(T[i-1][k][0], T[i-1][k][1] + price)
//          T[i][k][1] = max(T[i-1][k][1], T[i-1][k-1][0] - price)

// Case 1: k=1 (one transaction)
public int maxProfit_k1(int[] prices) {
    int T_i10 = 0, T_i11 = Integer.MIN_VALUE;
    for (int price : prices) {
        T_i10 = Math.max(T_i10, T_i11 + price);
        T_i11 = Math.max(T_i11, -price);
    }
    return T_i10;
}

// Case 2: k=infinity (unlimited transactions)
public int maxProfit_kInf(int[] prices) {
    int T_ik0 = 0, T_ik1 = Integer.MIN_VALUE;
    for (int price : prices) {
        int T_ik0_old = T_ik0;
        T_ik0 = Math.max(T_ik0, T_ik1 + price);
        T_ik1 = Math.max(T_ik1, T_ik0_old - price);
    }
    return T_ik0;
}

// Case 3: k=2 (two transactions)
public int maxProfit_k2(int[] prices) {
    int T_i10 = 0, T_i11 = Integer.MIN_VALUE;
    int T_i20 = 0, T_i21 = Integer.MIN_VALUE;
    for (int price : prices) {
        T_i20 = Math.max(T_i20, T_i21 + price);
        T_i21 = Math.max(T_i21, T_i10 - price);
        T_i10 = Math.max(T_i10, T_i11 + price);
        T_i11 = Math.max(T_i11, -price);
    }
    return T_i20;
}

// Case 4: k=infinity with cooldown
public int maxProfit_cooldown(int[] prices) {
    int T_ik0_pre = 0, T_ik0 = 0, T_ik1 = Integer.MIN_VALUE;
    for (int price : prices) {
        int T_ik0_old = T_ik0;
        T_ik0 = Math.max(T_ik0, T_ik1 + price);
        T_ik1 = Math.max(T_ik1, T_ik0_pre - price); // use i-2 for cooldown
        T_ik0_pre = T_ik0_old;
    }
    return T_ik0;
}

// Case 5: k=infinity with fee
public int maxProfit_fee(int[] prices, int fee) {
    int T_ik0 = 0, T_ik1 = Integer.MIN_VALUE;
    for (int price : prices) {
        int T_ik0_old = T_ik0;
        T_ik0 = Math.max(T_ik0, T_ik1 + price);
        T_ik1 = Math.max(T_ik1, T_ik0_old - price - fee);
    }
    return T_ik0;
}`,
      python: `# PATTERN: T[i][k][0] = max(T[i-1][k][0], T[i-1][k][1] + price)
#          T[i][k][1] = max(T[i-1][k][1], T[i-1][k-1][0] - price)

# Case 1: k=1 (one transaction)
def max_profit_k1(prices: List[int]) -> int:
    T_i10, T_i11 = 0, float('-inf')
    for price in prices:
        T_i10 = max(T_i10, T_i11 + price)
        T_i11 = max(T_i11, -price)
    return T_i10

# Case 2: k=infinity (unlimited transactions)
def max_profit_k_inf(prices: List[int]) -> int:
    T_ik0, T_ik1 = 0, float('-inf')
    for price in prices:
        T_ik0_old = T_ik0
        T_ik0 = max(T_ik0, T_ik1 + price)
        T_ik1 = max(T_ik1, T_ik0_old - price)
    return T_ik0

# Case 3: k=2 (two transactions)
def max_profit_k2(prices: List[int]) -> int:
    T_i10, T_i11 = 0, float('-inf')
    T_i20, T_i21 = 0, float('-inf')
    for price in prices:
        T_i20 = max(T_i20, T_i21 + price)
        T_i21 = max(T_i21, T_i10 - price)
        T_i10 = max(T_i10, T_i11 + price)
        T_i11 = max(T_i11, -price)
    return T_i20

# Case 4: k=infinity with cooldown
def max_profit_cooldown(prices: List[int]) -> int:
    T_ik0_pre, T_ik0, T_ik1 = 0, 0, float('-inf')
    for price in prices:
        T_ik0_old = T_ik0
        T_ik0 = max(T_ik0, T_ik1 + price)
        T_ik1 = max(T_ik1, T_ik0_pre - price)  # use i-2 for cooldown
        T_ik0_pre = T_ik0_old
    return T_ik0

# Case 5: k=infinity with fee
def max_profit_fee(prices: List[int], fee: int) -> int:
    T_ik0, T_ik1 = 0, float('-inf')
    for price in prices:
        T_ik0_old = T_ik0
        T_ik0 = max(T_ik0, T_ik1 + price)
        T_ik1 = max(T_ik1, T_ik0_old - price - fee)
    return T_ik0`,
      timeComplexity: 'O(n) for k=1,2,∞. O(nk) for arbitrary k',
      spaceComplexity: 'O(1) for k=1,2,∞. O(k) for arbitrary k',
      testCase: {
        input: 'k=2, prices = [3,3,5,0,0,3,1,4]',
        output: '6',
        explanation: 'Buy 3, sell 5, buy 0, sell 4. Max profit with 2 transactions'
      }
    }
  ],

  problems: [
    { name: 'Climbing Stairs', difficulty: 'Easy', tags: ['distinct ways'] },
    { name: 'Min Cost Climbing Stairs', difficulty: 'Easy', tags: ['min path'] },
    { name: 'House Robber', difficulty: 'Medium', tags: ['decision making'] },
    { name: 'House Robber II', difficulty: 'Medium', tags: ['circular', 'decision making'] },
    { name: 'Coin Change', difficulty: 'Medium', tags: ['min path', 'unbounded'] },
    { name: 'Coin Change II', difficulty: 'Medium', tags: ['distinct ways', 'unbounded'] },
    { name: 'Perfect Squares', difficulty: 'Medium', tags: ['min path'] },
    { name: 'Unique Paths', difficulty: 'Medium', tags: ['distinct ways', 'grid'] },
    { name: 'Unique Paths II', difficulty: 'Medium', tags: ['distinct ways', 'obstacles'] },
    { name: 'Minimum Path Sum', difficulty: 'Medium', tags: ['min path', 'grid'] },
    { name: 'Triangle', difficulty: 'Medium', tags: ['min path'] },
    { name: 'Longest Common Subsequence', difficulty: 'Medium', tags: ['DP on strings'] },
    { name: 'Longest Palindromic Subsequence', difficulty: 'Medium', tags: ['DP on strings'] },
    { name: 'Palindromic Substrings', difficulty: 'Medium', tags: ['DP on strings'] },
    { name: 'Edit Distance', difficulty: 'Hard', tags: ['DP on strings'] },
    { name: 'Distinct Subsequences', difficulty: 'Hard', tags: ['DP on strings'] },
    { name: 'Partition Equal Subset Sum', difficulty: 'Medium', tags: ['0/1 knapsack'] },
    { name: 'Target Sum', difficulty: 'Medium', tags: ['0/1 knapsack'] },
    { name: 'Last Stone Weight II', difficulty: 'Medium', tags: ['0/1 knapsack'] },
    { name: 'Ones and Zeroes', difficulty: 'Medium', tags: ['2D knapsack'] },
    { name: 'Burst Balloons', difficulty: 'Hard', tags: ['interval DP'] },
    { name: 'Minimum Cost Tree From Leaf Values', difficulty: 'Medium', tags: ['interval DP'] },
    { name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', tags: ['decision making'] },
    { name: 'Best Time to Buy and Sell Stock II', difficulty: 'Medium', tags: ['greedy or DP'] },
    { name: 'Best Time to Buy and Sell Stock III', difficulty: 'Hard', tags: ['state machine'] },
    { name: 'Best Time to Buy and Sell Stock IV', difficulty: 'Hard', tags: ['state machine'] },
    { name: 'Best Time to Buy and Sell Stock with Cooldown', difficulty: 'Medium', tags: ['state machine'] },
    { name: 'Best Time to Buy and Sell Stock with Transaction Fee', difficulty: 'Medium', tags: ['state machine'] },
    { name: 'Longest Increasing Subsequence', difficulty: 'Medium', tags: ['1D DP', 'binary search'] },
    { name: 'Word Break', difficulty: 'Medium', tags: ['1D DP', 'string'] },
    { name: 'Decode Ways', difficulty: 'Medium', tags: ['distinct ways'] },
    { name: 'Jump Game', difficulty: 'Medium', tags: ['decision making'] },
    { name: 'Jump Game II', difficulty: 'Medium', tags: ['min path'] }
  ],

  mistakes: [
    {
      trap: 'Wrong base case initialization',
      fix: 'Think about what dp[0] or dp[0][0] means. Often it\'s 0 or 1 or first element. For min/max problems, use INF or -INF.'
    },
    {
      trap: 'Off-by-one in loop bounds or indexing',
      fix: 'Draw out small example. Does dp[i] represent first i elements or element at index i? Usually add 1 to size for cleaner indexing.'
    },
    {
      trap: 'Wrong recurrence relation',
      fix: 'Think: "What choices do I have at state i? How do they relate to previous states?" Start with brute force recursion.'
    },
    {
      trap: 'Space optimization breaks when current depends on current row',
      fix: 'Can only optimize to 1D if dp[i][j] only depends on dp[i-1][...] row. For 0/1 knapsack, iterate backwards.'
    },
    {
      trap: 'Not memoizing recursive solution, causing TLE',
      fix: 'Add @lru_cache (Python) or HashMap (Java) to cache recursive results. State params become cache keys.'
    },
    {
      trap: 'In knapsack, iterating forward when space-optimized',
      fix: 'For 0/1 knapsack with 1D array, iterate backwards: for j in range(W, weight-1, -1) to avoid using same item twice.'
    }
  ],

  variations: [
    {
      name: '5-Step DP Approach',
      description: '1) Brute force recursion 2) Identify states 3) Add memoization 4) Convert to iterative 5) Optimize space'
    },
    {
      name: 'Memoization (Top-Down)',
      description: 'Recursive with cache. More intuitive, same complexity as bottom-up. Start here, then optimize.'
    },
    {
      name: 'Space Optimization',
      description: 'If only previous row/state needed, reduce O(n²) space to O(n). Common in Fibonacci-like and grid DPs.'
    },
    {
      name: 'Stock Problems - Unified Framework',
      description: 'State: T[i][k][s] = max profit at day i, k transactions left, s stocks in hand (0 or 1). Recurrence: T[i][k][0] = max(T[i-1][k][0], T[i-1][k][1] + price) | T[i][k][1] = max(T[i-1][k][1], T[i-1][k-1][0] - price). k=1: single transaction. k=∞: unlimited. k=2: two transactions. k>=n/2: treat as k=∞. Cooldown: use T[i-2][k][0] for buy. Fee: subtract fee from buy or sell.'
    },
    {
      name: 'DP on Trees',
      description: 'DFS post-order, combine children solutions at parent. State = (node, decision).'
    },
    {
      name: 'Bitmask DP',
      description: 'When tracking subsets. State includes bitmask of selected items. Common in TSP, assignment problems.'
    },
    {
      name: 'Digit DP',
      description: 'Count numbers with certain properties. Build number digit by digit with constraints.'
    }
  ]
};

