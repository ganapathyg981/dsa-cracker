import React, { useState } from 'react';
import { ChevronRight, CheckCircle, Home, ArrowLeft, Sparkles } from 'lucide-react';

const DSAPatternDecisionSystem = () => {
  const [activeSection, setActiveSection] = useState('menu');
  const [selectedPath, setSelectedPath] = useState([]);
  const [result, setResult] = useState(null);

  const decisionTrees = {
    'arrays-hashing': {
      title: 'Arrays & Hashing',
      question: "What are you trying to do?",
      options: [
        {
          label: "Find if element(s) exist or count frequency",
          next: {
            question: "What's the constraint?",
            options: [
              {
                label: "Need O(1) lookup time",
                result: {
                  pattern: "Hash Set / Hash Map",
                  code: `Set<Integer> set = new HashSet<>();
Map<Integer, Integer> map = new HashMap<>();

// Check existence
if (set.contains(num)) { }

// Count frequency
map.put(num, map.getOrDefault(num, 0) + 1);`,
                  problems: ["Two Sum", "Contains Duplicate", "Valid Anagram", "Group Anagrams"],
                  whenToUse: "• Need fast lookup/existence check\n• Counting frequencies\n• Finding duplicates\n• Grouping elements"
                }
              },
              {
                label: "Array is sorted",
                result: {
                  pattern: "Binary Search",
                  code: `int left = 0, right = arr.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}`,
                  problems: ["Binary Search", "Search in Rotated Array", "Find Peak Element"],
                  whenToUse: "• Array is sorted\n• Need O(log n) search\n• Finding boundaries/ranges"
                }
              }
            ]
          }
        },
        {
          label: "Calculate range sums or products",
          result: {
            pattern: "Prefix Sum / Prefix Product",
            code: `// Prefix Sum
int[] prefix = new int[n + 1];
for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
}
// Sum of range [L, R] = prefix[R+1] - prefix[L]`,
            problems: ["Range Sum Query", "Subarray Sum Equals K", "Product of Array Except Self"],
            whenToUse: "• Multiple range queries\n• Subarray sum problems\n• Need O(1) range access"
          }
        },
        {
          label: "Find maximum/minimum subarray",
          next: {
            question: "What type of operation?",
            options: [
              {
                label: "Sum of elements",
                result: {
                  pattern: "Kadane's Algorithm",
                  code: `int maxSum = arr[0], currSum = arr[0];
for (int i = 1; i < n; i++) {
    currSum = Math.max(arr[i], currSum + arr[i]);
    maxSum = Math.max(maxSum, currSum);
}`,
                  problems: ["Maximum Subarray", "Maximum Product Subarray", "Best Time to Buy/Sell Stock"],
                  whenToUse: "• Find max/min subarray sum\n• Contiguous elements\n• Can't skip elements"
                }
              },
              {
                label: "Product of elements",
                result: {
                  pattern: "Modified Kadane's (Track Min & Max)",
                  code: `int maxProd = arr[0], minProd = arr[0], result = arr[0];
for (int i = 1; i < n; i++) {
    int temp = maxProd;
    maxProd = Math.max(arr[i], Math.max(maxProd * arr[i], minProd * arr[i]));
    minProd = Math.min(arr[i], Math.min(temp * arr[i], minProd * arr[i]));
    result = Math.max(result, maxProd);
}`,
                  problems: ["Maximum Product Subarray"],
                  whenToUse: "• Product can be negative (track min too)\n• Need both max and min values"
                }
              }
            ]
          }
        }
      ]
    },

    'two-pointers': {
      title: 'Two Pointers',
      question: "What's the input structure?",
      options: [
        {
          label: "Array or String",
          next: {
            question: "Is it sorted (or can you sort it)?",
            options: [
              {
                label: "Yes, it's sorted",
                next: {
                  question: "What are you looking for?",
                  options: [
                    {
                      label: "Pair/Triplet with target sum",
                      result: {
                        pattern: "Opposite Direction (Converging)",
                        code: `int left = 0, right = arr.length - 1;
while (left < right) {
    int sum = arr[left] + arr[right];
    if (sum == target) return new int[]{left, right};
    if (sum < target) left++;
    else right--;
}`,
                        problems: ["Two Sum II", "3Sum", "4Sum", "3Sum Closest"],
                        whenToUse: "• Array is sorted\n• Looking for pairs/triplets\n• Target sum/difference"
                      }
                    },
                    {
                      label: "Palindrome validation",
                      result: {
                        pattern: "Opposite Direction",
                        code: `int left = 0, right = s.length() - 1;
while (left < right) {
    if (s.charAt(left) != s.charAt(right)) return false;
    left++;
    right--;
}
return true;`,
                        problems: ["Valid Palindrome", "Valid Palindrome II"],
                        whenToUse: "• Check symmetry\n• Compare from both ends"
                      }
                    }
                  ]
                }
              },
              {
                label: "No, unsorted",
                next: {
                  question: "What's your goal?",
                  options: [
                    {
                      label: "Remove/filter elements in-place",
                      result: {
                        pattern: "Same Direction (Fast/Slow)",
                        code: `int slow = 0;
for (int fast = 0; fast < arr.length; fast++) {
    if (arr[fast] != target) {
        arr[slow++] = arr[fast];
    }
}
return slow; // new length`,
                        problems: ["Remove Duplicates", "Move Zeroes", "Remove Element"],
                        whenToUse: "• Modify array in-place\n• Filter/partition elements\n• Maintain relative order"
                      }
                    },
                    {
                      label: "Partition by value",
                      result: {
                        pattern: "Dutch National Flag (3-way partition)",
                        code: `int low = 0, mid = 0, high = arr.length - 1;
while (mid <= high) {
    if (arr[mid] == 0) swap(arr, low++, mid++);
    else if (arr[mid] == 1) mid++;
    else swap(arr, mid, high--);
}`,
                        problems: ["Sort Colors", "Sort Array by Parity"],
                        whenToUse: "• 3 categories to partition\n• Move elements to start/end\n• One-pass sorting"
                      }
                    }
                  ]
                }
              }
            ]
          }
        },
        {
          label: "Linked List",
          next: {
            question: "What do you need to find?",
            options: [
              {
                label: "Cycle detection or cycle start",
                result: {
                  pattern: "Fast & Slow (Floyd's Cycle)",
                  code: `ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow == fast) return true; // cycle exists
}
return false;`,
                  problems: ["Linked List Cycle", "Linked List Cycle II", "Happy Number"],
                  whenToUse: "• Detect cycles\n• Find cycle start point\n• Linked list only"
                }
              },
              {
                label: "Middle element",
                result: {
                  pattern: "Fast & Slow",
                  code: `ListNode slow = head, fast = head;
while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
}
return slow; // middle node`,
                  problems: ["Middle of Linked List", "Palindrome Linked List"],
                  whenToUse: "• Find middle in one pass\n• Don't know length beforehand"
                }
              },
              {
                label: "Nth node from end",
                result: {
                  pattern: "Fast & Slow with Gap",
                  code: `ListNode fast = head, slow = head;
// Move fast n steps ahead
for (int i = 0; i < n; i++) fast = fast.next;
while (fast != null) {
    fast = fast.next;
    slow = slow.next;
}
return slow; // nth from end`,
                  problems: ["Remove Nth Node From End", "Rotate List"],
                  whenToUse: "• Find nth from end in one pass\n• Remove specific node from end"
                }
              }
            ]
          }
        }
      ]
    },

    'sliding-window': {
      title: 'Sliding Window',
      question: "Is the window size fixed or variable?",
      options: [
        {
          label: "Fixed window size K",
          result: {
            pattern: "Fixed Sliding Window",
            code: `int windowSum = 0, maxSum = Integer.MIN_VALUE;
// Build first window
for (int i = 0; i < k; i++) windowSum += arr[i];
maxSum = windowSum;
// Slide window
for (int i = k; i < arr.length; i++) {
    windowSum = windowSum + arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
}`,
            problems: ["Max Sum Subarray Size K", "Max Average Subarray", "Contains Duplicate II"],
            whenToUse: "• Window size is constant\n• Calculate for every k-size window\n• Simple add/remove at boundaries"
          }
        },
        {
          label: "Variable window (expand/shrink)",
          next: {
            question: "What constraint defines window validity?",
            options: [
              {
                label: "At most K distinct elements",
                result: {
                  pattern: "Shrinking Window (At Most K)",
                  code: `int left = 0, maxLen = 0;
Map<Character, Integer> map = new HashMap<>();
for (int right = 0; right < s.length(); right++) {
    map.put(s.charAt(right), map.getOrDefault(s.charAt(right), 0) + 1);
    while (map.size() > k) {
        char leftChar = s.charAt(left);
        map.put(leftChar, map.get(leftChar) - 1);
        if (map.get(leftChar) == 0) map.remove(leftChar);
        left++;
    }
    maxLen = Math.max(maxLen, right - left + 1);
}`,
                  problems: ["Longest Substring with At Most K Distinct", "Fruit Into Baskets", "Max Consecutive Ones III"],
                  whenToUse: "• At most K constraint\n• Expand right, shrink left when invalid\n• Track distinct elements"
                }
              },
              {
                label: "All elements must be unique",
                result: {
                  pattern: "Shrinking Window (Unique)",
                  code: `int left = 0, maxLen = 0;
Set<Character> set = new HashSet<>();
for (int right = 0; right < s.length(); right++) {
    while (set.contains(s.charAt(right))) {
        set.remove(s.charAt(left));
        left++;
    }
    set.add(s.charAt(right));
    maxLen = Math.max(maxLen, right - left + 1);
}`,
                  problems: ["Longest Substring Without Repeating Characters", "Longest Subarray with Unique Elements"],
                  whenToUse: "• All elements must be unique\n• No duplicates allowed\n• Set for O(1) lookup"
                }
              },
              {
                label: "Must contain all characters",
                result: {
                  pattern: "Minimum Window (Contains All)",
                  code: `Map<Character, Integer> need = new HashMap<>();
Map<Character, Integer> window = new HashMap<>();
int left = 0, minLen = Integer.MAX_VALUE, formed = 0;
for (int right = 0; right < s.length(); right++) {
    char c = s.charAt(right);
    window.put(c, window.getOrDefault(c, 0) + 1);
    if (need.containsKey(c) && window.get(c).equals(need.get(c)))
        formed++;
    while (formed == need.size()) {
        // Update result, shrink window
        char leftChar = s.charAt(left);
        window.put(leftChar, window.get(leftChar) - 1);
        if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar))
            formed--;
        left++;
    }
}`,
                  problems: ["Minimum Window Substring", "Find All Anagrams", "Permutation in String"],
                  whenToUse: "• Find minimum window containing all\n• Substring permutation\n• Must satisfy all conditions"
                }
              }
            ]
          }
        }
      ]
    },

    'binary-search': {
      title: 'Binary Search',
      question: "What are you searching in?",
      options: [
        {
          label: "Regular sorted array",
          result: {
            pattern: "Classic Binary Search",
            code: `int left = 0, right = arr.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
}
return -1;`,
            problems: ["Binary Search", "Search Insert Position", "First Bad Version"],
            whenToUse: "• Array is sorted\n• Find exact element\n• O(log n) required"
          }
        },
        {
          label: "Rotated sorted array",
          result: {
            pattern: "Modified Binary Search",
            code: `int left = 0, right = arr.length - 1;
while (left <= right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] == target) return mid;
    // Check which half is sorted
    if (arr[left] <= arr[mid]) {
        if (target >= arr[left] && target < arr[mid])
            right = mid - 1;
        else left = mid + 1;
    } else {
        if (target > arr[mid] && target <= arr[right])
            left = mid + 1;
        else right = mid - 1;
    }
}`,
            problems: ["Search in Rotated Sorted Array", "Find Minimum in Rotated Array"],
            whenToUse: "• Array rotated at pivot\n• Still maintains sorted property\n• Need to identify sorted half"
          }
        },
        {
          label: "Search space of possible answers",
          result: {
            pattern: "Binary Search on Answer",
            code: `int left = minPossible, right = maxPossible;
while (left < right) {
    int mid = left + (right - left) / 2;
    if (canAchieve(mid)) {
        right = mid; // Try smaller
    } else {
        left = mid + 1; // Need larger
    }
}
return left;`,
            problems: ["Koko Eating Bananas", "Minimum Days to Make Bouquets", "Capacity to Ship Packages"],
            whenToUse: "• Minimize/maximize a value\n• Can check if answer works in O(n)\n• Answer space is monotonic"
          }
        }
      ]
    },

    'trees': {
      title: 'Trees & Binary Search Trees',
      question: "What type of traversal do you need?",
      options: [
        {
          label: "Process in sorted order (BST)",
          result: {
            pattern: "Inorder DFS (Left → Root → Right)",
            code: `void inorder(TreeNode root) {
    if (root == null) return;
    inorder(root.left);
    process(root.val); // Sorted order for BST
    inorder(root.right);
}`,
            problems: ["Validate BST", "Kth Smallest in BST", "Inorder Successor"],
            whenToUse: "• BST problems requiring sorted order\n• Validate BST properties\n• Find kth element in BST"
          }
        },
        {
          label: "Process level by level",
          result: {
            pattern: "BFS (Level Order)",
            code: `Queue<TreeNode> queue = new LinkedList<>();
queue.offer(root);
while (!queue.isEmpty()) {
    int size = queue.size();
    for (int i = 0; i < size; i++) {
        TreeNode node = queue.poll();
        process(node.val);
        if (node.left != null) queue.offer(node.left);
        if (node.right != null) queue.offer(node.right);
    }
}`,
            problems: ["Level Order Traversal", "Right Side View", "Zigzag Level Order"],
            whenToUse: "• Need level-by-level processing\n• Find minimum depth\n• Level-based calculations"
          }
        },
        {
          label: "Clone or serialize tree",
          result: {
            pattern: "Preorder DFS (Root → Left → Right)",
            code: `void preorder(TreeNode root) {
    if (root == null) return;
    process(root.val); // Process root first
    preorder(root.left);
    preorder(root.right);
}`,
            problems: ["Clone Tree", "Serialize/Deserialize Tree", "Path Sum"],
            whenToUse: "• Create copy of tree\n• Serialize tree structure\n• Need parent before children"
          }
        },
        {
          label: "Calculate heights or postprocess",
          result: {
            pattern: "Postorder DFS (Left → Right → Root)",
            code: `int postorder(TreeNode root) {
    if (root == null) return 0;
    int left = postorder(root.left);
    int right = postorder(root.right);
    return process(left, right, root.val); // Process after children
}`,
            problems: ["Maximum Depth", "Diameter of Tree", "Balanced Binary Tree"],
            whenToUse: "• Calculate heights\n• Need children info before parent\n• Bottom-up calculations"
          }
        }
      ]
    },

    'graphs': {
      title: 'Graph Algorithms',
      question: "What are you trying to do?",
      options: [
        {
          label: "Find shortest path (unweighted)",
          result: {
            pattern: "BFS",
            code: `Queue<Integer> queue = new LinkedList<>();
boolean[] visited = new boolean[n];
int[] distance = new int[n];
queue.offer(start);
visited[start] = true;
while (!queue.isEmpty()) {
    int node = queue.poll();
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            visited[neighbor] = true;
            distance[neighbor] = distance[node] + 1;
            queue.offer(neighbor);
        }
    }
}`,
            problems: ["Word Ladder", "Shortest Path in Binary Matrix", "Rotting Oranges"],
            whenToUse: "• Unweighted graph\n• Shortest path needed\n• Level-by-level exploration"
          }
        },
        {
          label: "Explore all paths or connected components",
          result: {
            pattern: "DFS",
            code: `void dfs(int node, boolean[] visited) {
    visited[node] = true;
    for (int neighbor : graph[node]) {
        if (!visited[neighbor]) {
            dfs(neighbor, visited);
        }
    }
}`,
            problems: ["Number of Islands", "Clone Graph", "Pacific Atlantic Water Flow"],
            whenToUse: "• Explore all reachable nodes\n• Find connected components\n• Path finding (not shortest)"
          }
        },
        {
          label: "Detect cycle or find connected components",
          result: {
            pattern: "Union-Find (Disjoint Set)",
            code: `class UnionFind {
    int[] parent, rank;
    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]);
        return parent[x];
    }
    void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px == py) return;
        if (rank[px] > rank[py]) parent[py] = px;
        else if (rank[px] < rank[py]) parent[px] = py;
        else { parent[py] = px; rank[px]++; }
    }
}`,
            problems: ["Number of Connected Components", "Redundant Connection", "Accounts Merge"],
            whenToUse: "• Dynamic connectivity\n• Cycle detection in undirected graph\n• Grouping/merging sets"
          }
        },
        {
          label: "Find order/dependency resolution",
          result: {
            pattern: "Topological Sort (Kahn's Algorithm)",
            code: `Queue<Integer> queue = new LinkedList<>();
int[] indegree = new int[n];
// Calculate indegrees
for (int[] edge : edges) indegree[edge[1]]++;
// Add nodes with 0 indegree
for (int i = 0; i < n; i++)
    if (indegree[i] == 0) queue.offer(i);
List<Integer> result = new ArrayList<>();
while (!queue.isEmpty()) {
    int node = queue.poll();
    result.add(node);
    for (int neighbor : graph[node])
        if (--indegree[neighbor] == 0)
            queue.offer(neighbor);
}`,
            problems: ["Course Schedule", "Course Schedule II", "Alien Dictionary"],
            whenToUse: "• Directed acyclic graph (DAG)\n• Find valid ordering\n• Dependency resolution"
          }
        }
      ]
    },

    'dp': {
      title: 'Dynamic Programming',
      question: "What's the problem structure?",
      options: [
        {
          label: "Linear sequence (1D array)",
          next: {
            question: "What's the decision pattern?",
            options: [
              {
                label: "Take or skip current element",
                result: {
                  pattern: "1D DP (House Robber Pattern)",
                  code: `int[] dp = new int[n];
dp[0] = arr[0];
dp[1] = Math.max(arr[0], arr[1]);
for (int i = 2; i < n; i++) {
    dp[i] = Math.max(
        dp[i-1],           // skip current
        dp[i-2] + arr[i]   // take current
    );
}`,
                  problems: ["House Robber", "Delete and Earn", "Maximum Alternating Sum"],
                  whenToUse: "• Can't take adjacent elements\n• Maximize/minimize value\n• Each element has take/skip decision"
                }
              },
              {
                label: "Count ways to reach end",
                result: {
                  pattern: "1D DP (Climbing Stairs Pattern)",
                  code: `int[] dp = new int[n + 1];
dp[0] = 1;
dp[1] = 1;
for (int i = 2; i <= n; i++) {
    dp[i] = dp[i-1] + dp[i-2];
}`,
                  problems: ["Climbing Stairs", "Decode Ways", "Fibonacci"],
                  whenToUse: "• Count number of ways\n• Can reach from multiple previous states\n• Combination counting"
                }
              }
            ]
          }
        },
        {
          label: "Two sequences (strings/arrays)",
          result: {
            pattern: "2D DP (LCS Pattern)",
            code: `int[][] dp = new int[m + 1][n + 1];
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        if (s1.charAt(i-1) == s2.charAt(j-1))
            dp[i][j] = dp[i-1][j-1] + 1;
        else
            dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]);
    }
}`,
            problems: ["Longest Common Subsequence", "Edit Distance", "Distinct Subsequences"],
            whenToUse: "• Compare two sequences\n• Match/mismatch decisions\n• Alignment problems"
          }
        },
        {
          label: "Include/exclude with capacity/weight constraint",
          result: {
            pattern: "0/1 Knapsack",
            code: `int[][] dp = new int[n + 1][W + 1];
for (int i = 1; i <= n; i++) {
    for (int w = 1; w <= W; w++) {
        if (weight[i-1] <= w)
            dp[i][w] = Math.max(
                dp[i-1][w],  // don't take
                val[i-1] + dp[i-1][w - weight[i-1]]  // take
            );
        else dp[i][w] = dp[i-1][w];
    }
}`,
            problems: ["0/1 Knapsack", "Partition Equal Subset Sum", "Target Sum"],
            whenToUse: "• Items have weight/cost\n• Maximize/minimize value\n• Can take each item at most once"
          }
        },
        {
          label: "Unlimited use of elements",
          result: {
            pattern: "Unbounded Knapsack / Coin Change",
            code: `int[] dp = new int[amount + 1];
Arrays.fill(dp, Integer.MAX_VALUE);
dp[0] = 0;
for (int i = 1; i <= amount; i++) {
    for (int coin : coins) {
        if (i >= coin && dp[i - coin] != Integer.MAX_VALUE)
            dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
}`,
            problems: ["Coin Change", "Coin Change II", "Perfect Squares"],
            whenToUse: "• Can use elements unlimited times\n• Minimize number of items\n• Count combinations"
          }
        }
      ]
    },

    'intervals': {
      title: 'Intervals',
      question: "What do you need to do with intervals?",
      options: [
        {
          label: "Merge overlapping intervals",
          result: {
            pattern: "Sort + Merge",
            code: `Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
List<int[]> result = new ArrayList<>();
int[] current = intervals[0];
for (int i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= current[1]) {
        // Merge
        current[1] = Math.max(current[1], intervals[i][1]);
    } else {
        result.add(current);
        current = intervals[i];
    }
}
result.add(current);`,
            problems: ["Merge Intervals", "Insert Interval", "Summary Ranges"],
            whenToUse: "• Overlapping intervals\n• Sort by start time\n• Combine ranges"
          }
        },
        {
          label: "Find minimum meeting rooms",
          result: {
            pattern: "Min Heap (Priority Queue)",
            code: `Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
PriorityQueue<Integer> heap = new PriorityQueue<>();
for (int[] interval : intervals) {
    if (!heap.isEmpty() && heap.peek() <= interval[0])
        heap.poll();
    heap.offer(interval[1]);
}
return heap.size(); // min rooms needed`,
            problems: ["Meeting Rooms II", "Car Pooling", "Maximum CPU Load"],
            whenToUse: "• Count concurrent intervals\n• Schedule optimization\n• Track end times"
          }
        },
        {
          label: "Check if person can attend all",
          result: {
            pattern: "Sort + Check Overlap",
            code: `Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
for (int i = 1; i < intervals.length; i++) {
    if (intervals[i][0] < intervals[i-1][1])
        return false; // Overlap found
}
return true;`,
            problems: ["Meeting Rooms", "Non-overlapping Intervals"],
            whenToUse: "• Check for any overlap\n• Validate schedule\n• Simple conflict detection"
          }
        }
      ]
    },

    'greedy': {
      title: 'Greedy Algorithms',
      question: "What type of optimization?",
      options: [
        {
          label: "Maximize/minimize with local choices",
          result: {
            pattern: "Sort + Greedy Selection",
            code: `Arrays.sort(arr, (a, b) -> a[1] - b[1]); // Sort by end time
int count = 0, lastEnd = Integer.MIN_VALUE;
for (int[] interval : arr) {
    if (interval[0] >= lastEnd) {
        count++;
        lastEnd = interval[1];
    }
}`,
            problems: ["Jump Game", "Jump Game II", "Non-overlapping Intervals"],
            whenToUse: "• Local optimal = global optimal\n• No need to reconsider choices\n• Interval scheduling"
          }
        },
        {
          label: "Partition or gas station problems",
          result: {
            pattern: "Running Sum with Reset",
            code: `int total = 0, current = 0, start = 0;
for (int i = 0; i < n; i++) {
    total += gas[i] - cost[i];
    current += gas[i] - cost[i];
    if (current < 0) {
        start = i + 1;
        current = 0;
    }
}
return total >= 0 ? start : -1;`,
            problems: ["Gas Station", "Partition Labels", "Hand of Straights"],
            whenToUse: "• Find starting point\n• Running balance approach\n• Reset when invalid"
          }
        }
      ]
    },

    'backtracking': {
      title: 'Backtracking',
      question: "What are you generating?",
      options: [
        {
          label: "All subsets/combinations",
          result: {
            pattern: "Subset Backtracking",
            code: `void backtrack(int start, List<Integer> curr) {
    result.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(i + 1, curr);
        curr.remove(curr.size() - 1);
    }
}`,
            problems: ["Subsets", "Subsets II", "Combination Sum", "Combinations"],
            whenToUse: "• Generate all subsets\n• Order doesn't matter (combinations)\n• Can include/exclude each element"
          }
        },
        {
          label: "All permutations/arrangements",
          result: {
            pattern: "Permutation Backtracking",
            code: `void backtrack(List<Integer> curr, boolean[] used) {
    if (curr.size() == nums.length) {
        result.add(new ArrayList<>(curr));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        curr.add(nums[i]);
        backtrack(curr, used);
        curr.remove(curr.size() - 1);
        used[i] = false;
    }
}`,
            problems: ["Permutations", "Permutations II", "Letter Case Permutation"],
            whenToUse: "• Order matters\n• All arrangements needed\n• Each element used exactly once"
          }
        },
        {
          label: "Valid configurations (N-Queens, Sudoku)",
          result: {
            pattern: "Constraint Backtracking",
            code: `boolean backtrack(int row) {
    if (row == n) return true; // Found solution
    for (int col = 0; col < n; col++) {
        if (isValid(row, col)) {
            place(row, col);
            if (backtrack(row + 1)) return true;
            remove(row, col);
        }
    }
    return false;
}`,
            problems: ["N-Queens", "Sudoku Solver", "Word Search"],
            whenToUse: "• Must satisfy constraints\n• Check validity at each step\n• Prune invalid branches early"
          }
        }
      ]
    },

    'heaps': {
      title: 'Heaps & Priority Queue',
      question: "What do you need?",
      options: [
        {
          label: "Top K elements (largest/smallest)",
          result: {
            pattern: "Min/Max Heap of Size K",
            code: `// For K largest, use min heap
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
for (int num : nums) {
    minHeap.offer(num);
    if (minHeap.size() > k) {
        minHeap.poll(); // Remove smallest
    }
}
return minHeap.peek(); // Kth largest`,
            problems: ["Kth Largest Element", "Top K Frequent Elements", "K Closest Points"],
            whenToUse: "• Find K largest: use min heap size K\n• Find K smallest: use max heap size K\n• Streaming data"
          }
        },
        {
          label: "Median or split data into halves",
          result: {
            pattern: "Two Heaps",
            code: `PriorityQueue<Integer> maxHeap = 
    new PriorityQueue<>(Collections.reverseOrder());
PriorityQueue<Integer> minHeap = new PriorityQueue<>();

void add(int num) {
    maxHeap.offer(num);
    minHeap.offer(maxHeap.poll());
    if (maxHeap.size() < minHeap.size())
        maxHeap.offer(minHeap.poll());
}
double findMedian() {
    return maxHeap.size() > minHeap.size() 
        ? maxHeap.peek() 
        : (maxHeap.peek() + minHeap.peek()) / 2.0;
}`,
            problems: ["Find Median from Data Stream", "Sliding Window Median", "IPO"],
            whenToUse: "• Maintain running median\n• Split into two halves\n• Balance two heaps"
          }
        },
        {
          label: "Merge K sorted lists/arrays",
          result: {
            pattern: "Min Heap with Iterators",
            code: `PriorityQueue<int[]> heap = new PriorityQueue<>(
    (a, b) -> a[0] - b[0]
);
// Add first element from each list
for (int[] list : lists) {
    if (list.length > 0)
        heap.offer(new int[]{list[0], listIndex, 0});
}
while (!heap.isEmpty()) {
    int[] curr = heap.poll();
    result.add(curr[0]);
    // Add next from same list
    if (curr[2] + 1 < lists[curr[1]].length)
        heap.offer(new int[]{
            lists[curr[1]][curr[2] + 1], 
            curr[1], 
            curr[2] + 1
        });
}`,
            problems: ["Merge K Sorted Lists", "Smallest Range in K Lists", "Kth Smallest in Sorted Matrix"],
            whenToUse: "• Merge multiple sorted sources\n• Always need minimum/maximum\n• K-way merge"
          }
        }
      ]
    }
  };

  const topics = [
    { id: 'arrays-hashing', label: 'Arrays & Hashing', icon: '🔢' },
    { id: 'two-pointers', label: 'Two Pointers', icon: '👉' },
    { id: 'sliding-window', label: 'Sliding Window', icon: '🪟' },
    { id: 'binary-search', label: 'Binary Search', icon: '🔍' },
    { id: 'trees', label: 'Trees & BST', icon: '🌳' },
    { id: 'graphs', label: 'Graphs', icon: '🕸️' },
    { id: 'dp', label: 'Dynamic Programming', icon: '💎' },
    { id: 'intervals', label: 'Intervals', icon: '📊' },
    { id: 'greedy', label: 'Greedy', icon: '🎯' },
    { id: 'backtracking', label: 'Backtracking', icon: '↩️' },
    { id: 'heaps', label: 'Heaps & PQ', icon: '⛰️' }
  ];

  const navigate = (option) => {
    const newPath = [...selectedPath, option.label];
    setSelectedPath(newPath);
    
    if (option.result) {
      setResult(option.result);
    } else if (option.next) {
      setResult(null);
    }
  };

  const reset = () => {
    setSelectedPath([]);
    setResult(null);
  };

  const getCurrentNode = () => {
    if (!activeSection || activeSection === 'menu') return null;
    let current = decisionTrees[activeSection];
    for (let path of selectedPath) {
      const option = current.options?.find(opt => opt.label === path);
      if (option?.next) {
        current = option.next;
      }
    }
    return current;
  };

  const currentNode = result ? null : getCurrentNode();

  if (activeSection === 'menu') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Sparkles className="text-yellow-500" size={40} />
              <h1 className="text-5xl font-bold text-gray-800">DSA Pattern Decision System</h1>
            </div>
            <p className="text-xl text-gray-600">Answer questions to find the exact pattern you need</p>
            <p className="text-lg text-gray-500 mt-2">Based on NeetCode roadmap • 100% FAANG coverage</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topics.map((topic) => (
              <button
                key={topic.id}
                onClick={() => {
                  setActiveSection(topic.id);
                  reset();
                }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border-2 border-transparent hover:border-blue-400"
              >
                <div className="text-5xl mb-4">{topic.icon}</div>
                <h3 className="text-xl font-bold text-gray-800">{topic.label}</h3>
              </button>
            ))}
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">📚 How to Use This System</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl mb-2">1️⃣</div>
                <h3 className="font-semibold mb-1">Pick a Topic</h3>
                <p className="text-sm text-gray-600">Choose the data structure you're working with</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">2️⃣</div>
                <h3 className="font-semibold mb-1">Answer Questions</h3>
                <p className="text-sm text-gray-600">Follow the decision tree based on your problem</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">3️⃣</div>
                <h3 className="font-semibold mb-1">Get Pattern + Code</h3>
                <p className="text-sm text-gray-600">Receive template and practice problems</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <button 
              onClick={() => {
                setActiveSection('menu');
                reset();
              }}
              className="text-blue-600 hover:text-blue-800 flex items-center gap-2 font-semibold"
            >
              <Home size={20} /> Menu
            </button>
            <ChevronRight size={20} className="text-gray-400" />
            <span className="text-gray-700 font-semibold">
              {decisionTrees[activeSection]?.title}
            </span>
          </div>

          {/* Breadcrumb */}
          {selectedPath.length > 0 && (
            <div className="mb-6 flex items-center flex-wrap gap-2 text-sm bg-blue-50 p-3 rounded-lg">
              <button onClick={reset} className="text-blue-600 hover:underline font-medium">
                Start Over
              </button>
              {selectedPath.map((path, idx) => (
                <React.Fragment key={idx}>
                  <ChevronRight size={16} className="text-blue-400" />
                  <span className="text-gray-700">{path}</span>
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Question or Result */}
          {!result ? (
            currentNode && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  {currentNode.question}
                </h2>
                <div className="space-y-3">
                  {currentNode.options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => navigate(option)}
                      className="w-full text-left p-5 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-all group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-800 text-lg group-hover:text-blue-700">
                          {option.label}
                        </span>
                        <ChevronRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )
          ) : (
            <div>
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle className="text-green-500" size={40} />
                <div>
                  <h2 className="text-3xl font-bold text-gray-800">{result.pattern}</h2>
                  <p className="text-gray-600">Perfect match found!</p>
                </div>
              </div>

              {result.whenToUse && (
                <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded">
                  <h3 className="font-bold text-green-800 mb-2">✅ Use this pattern when:</h3>
                  <pre className="text-sm text-green-700 whitespace-pre-wrap font-medium">
                    {result.whenToUse}
                  </pre>
                </div>
              )}

              <div className="bg-gray-900 rounded-xl p-5 mb-6 overflow-x-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-bold text-green-400">Code Template:</h3>
                  <span className="text-xs text-gray-400">Java</span>
                </div>
                <pre className="text-green-400 text-sm leading-relaxed">
                  <code>{result.code}</code>
                </pre>
              </div>

              <div className="mb-6">
                <h3 className="font-bold text-gray-700 mb-3 text-lg">📝 Practice with these problems:</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {result.problems.map((problem, idx) => (
                    <div key={idx} className="bg-purple-50 border border-purple-200 px-4 py-3 rounded-lg">
                      <span className="text-purple-800 font-medium">{problem}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={reset}
                  className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
                >
                  Try Another Problem
                </button>
                <button
                  onClick={() => {
                    setActiveSection('menu');
                    reset();
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  Back to Menu
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Sparkles className="text-yellow-500" size={20} />
            Pro Tips
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Master one pattern before moving to the next</li>
            <li>• Practice 5-10 problems per pattern for muscle memory</li>
            <li>• Focus on recognizing patterns, not memorizing solutions</li>
            <li>• Time yourself: aim for 15-20 min per medium problem</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DSAPatternDecisionSystem;