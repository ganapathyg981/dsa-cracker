export const decisionTrees = {
  'arrays-strings': {
    title: 'Arrays & Strings',
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

  'prefix-sum': {
    title: 'Prefix Sum',
    question: "What do you need to compute?",
    options: [
      {
        label: "Range sum queries (multiple queries)",
        result: {
          pattern: "Basic Prefix Sum",
          code: `// Build prefix array
int[] prefix = new int[n + 1];
for (int i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + arr[i];
}

// Query sum of range [L, R] in O(1)
int rangeSum = prefix[R + 1] - prefix[L];`,
          problems: ["Range Sum Query - Immutable", "Running Sum of 1D Array"],
          whenToUse: "• Multiple range sum queries\n• Array doesn't change\n• Need O(1) per query"
        }
      },
      {
        label: "Find subarray with target sum",
        result: {
          pattern: "Prefix Sum + HashMap",
          code: `Map<Integer, Integer> prefixCount = new HashMap<>();
prefixCount.put(0, 1);
int sum = 0, count = 0;

for (int num : arr) {
    sum += num;
    // If (sum - target) exists, found subarrays ending here
    count += prefixCount.getOrDefault(sum - target, 0);
    prefixCount.put(sum, prefixCount.getOrDefault(sum, 0) + 1);
}`,
          problems: ["Subarray Sum Equals K", "Contiguous Array", "Path Sum III"],
          whenToUse: "• Find subarrays with exact sum\n• Count subarrays matching condition\n• Works with negative numbers"
        }
      },
      {
        label: "Product operations on array",
        result: {
          pattern: "Prefix & Suffix Products",
          code: `int[] result = new int[n];
// Forward pass: prefix products
int prefix = 1;
for (int i = 0; i < n; i++) {
    result[i] = prefix;
    prefix *= arr[i];
}
// Backward pass: multiply by suffix products
int suffix = 1;
for (int i = n - 1; i >= 0; i--) {
    result[i] *= suffix;
    suffix *= arr[i];
}`,
          problems: ["Product of Array Except Self"],
          whenToUse: "• Product of all elements except self\n• Avoid division (handle zeros)\n• O(n) time, O(1) extra space"
        }
      },
      {
        label: "2D range queries (matrix)",
        result: {
          pattern: "2D Prefix Sum",
          code: `// Build 2D prefix sum
int[][] prefix = new int[m + 1][n + 1];
for (int i = 1; i <= m; i++) {
    for (int j = 1; j <= n; j++) {
        prefix[i][j] = matrix[i-1][j-1] 
            + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
    }
}

// Query sum of rectangle (r1,c1) to (r2,c2)
int sum = prefix[r2+1][c2+1] - prefix[r1][c2+1] 
        - prefix[r2+1][c1] + prefix[r1][c1];`,
          problems: ["Range Sum Query 2D", "Matrix Block Sum"],
          whenToUse: "• 2D range sum queries\n• Matrix rectangle sums\n• O(1) per query after O(mn) precompute"
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
      },
      {
        label: "Find first/last occurrence or boundary",
        result: {
          pattern: "Boundary Binary Search",
          code: `// Find first occurrence
int left = 0, right = arr.length;
while (left < right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] >= target) right = mid;
    else left = mid + 1;
}
// left is first index where arr[i] >= target

// Find last occurrence
left = 0; right = arr.length;
while (left < right) {
    int mid = left + (right - left) / 2;
    if (arr[mid] > target) right = mid;
    else left = mid + 1;
}
// left - 1 is last index where arr[i] <= target`,
          problems: ["Find First and Last Position", "Search Insert Position", "Count of Smaller Numbers After Self"],
          whenToUse: "• Find leftmost/rightmost match\n• Count elements in range\n• Lower bound / upper bound"
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

  'bfs-dfs': {
    title: 'BFS / DFS',
    question: "What's your search goal?",
    options: [
      {
        label: "Find shortest path (unweighted)",
        result: {
          pattern: "BFS (Breadth-First Search)",
          code: `Queue<int[]> queue = new LinkedList<>();
boolean[][] visited = new boolean[m][n];
queue.offer(new int[]{startRow, startCol, 0});
visited[startRow][startCol] = true;

int[][] dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
while (!queue.isEmpty()) {
    int[] curr = queue.poll();
    if (isTarget(curr[0], curr[1])) return curr[2];
    
    for (int[] d : dirs) {
        int nr = curr[0] + d[0], nc = curr[1] + d[1];
        if (isValid(nr, nc) && !visited[nr][nc]) {
            visited[nr][nc] = true;
            queue.offer(new int[]{nr, nc, curr[2] + 1});
        }
    }
}`,
          problems: ["Shortest Path in Binary Matrix", "Rotting Oranges", "Word Ladder", "01 Matrix"],
          whenToUse: "• Unweighted graph/grid\n• Shortest path/distance needed\n• Level-by-level exploration"
        }
      },
      {
        label: "Explore all connected cells (flood fill)",
        result: {
          pattern: "DFS (Depth-First Search)",
          code: `void dfs(int[][] grid, int r, int c) {
    if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length)
        return;
    if (grid[r][c] != target) return; // Already visited or invalid
    
    grid[r][c] = visited; // Mark as visited
    
    dfs(grid, r + 1, c);
    dfs(grid, r - 1, c);
    dfs(grid, r, c + 1);
    dfs(grid, r, c - 1);
}`,
          problems: ["Number of Islands", "Flood Fill", "Max Area of Island", "Surrounded Regions"],
          whenToUse: "• Count connected components\n• Flood fill problems\n• Explore all reachable cells"
        }
      },
      {
        label: "Find if path exists with conditions",
        result: {
          pattern: "DFS with State",
          code: `boolean dfs(int[][] grid, int r, int c, boolean[][] visited) {
    if (isTarget(r, c)) return true;
    if (!isValid(r, c) || visited[r][c]) return false;
    
    visited[r][c] = true;
    
    int[][] dirs = {{0,1}, {0,-1}, {1,0}, {-1,0}};
    for (int[] d : dirs) {
        if (dfs(grid, r + d[0], c + d[1], visited))
            return true;
    }
    
    // visited[r][c] = false; // Uncomment for all paths
    return false;
}`,
          problems: ["Path with Maximum Gold", "Word Search", "Unique Paths III"],
          whenToUse: "• Check if path exists\n• Find path with specific conditions\n• May need backtracking"
        }
      },
      {
        label: "Multi-source BFS (multiple starting points)",
        result: {
          pattern: "Multi-source BFS",
          code: `Queue<int[]> queue = new LinkedList<>();
// Add ALL sources to queue initially
for (int i = 0; i < m; i++) {
    for (int j = 0; j < n; j++) {
        if (isSource(grid[i][j])) {
            queue.offer(new int[]{i, j});
            visited[i][j] = true;
        }
    }
}

// Standard BFS from multiple sources
while (!queue.isEmpty()) {
    // process level by level
}`,
          problems: ["Rotting Oranges", "01 Matrix", "Walls and Gates"],
          whenToUse: "• Multiple starting points\n• Propagation from all sources\n• Distance from nearest source"
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
      },
      {
        label: "Assign tasks or schedule optimally",
        result: {
          pattern: "Sort by Priority + Greedy Assign",
          code: `// Sort by deadline/priority
Arrays.sort(tasks, (a, b) -> a[0] - b[0]);

PriorityQueue<Integer> pq = new PriorityQueue<>();
int time = 0;
for (int[] task : tasks) {
    pq.offer(task[1]); // add task duration
    time += task[1];
    // If exceeded deadline, remove longest task
    if (time > task[0]) {
        time -= pq.poll();
    }
}`,
          problems: ["Task Scheduler", "Maximum Units on a Truck", "Reorganize String"],
          whenToUse: "• Scheduling with constraints\n• Assign by priority\n• Use heap for dynamic selection"
        }
      }
    ]
  },

  'dynamic-programming': {
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
  },

  'monotonic-stack': {
    title: 'Monotonic Stack/Queue',
    question: "What do you need to find?",
    options: [
      {
        label: "Next/previous greater or smaller element",
        result: {
          pattern: "Monotonic Stack",
          code: `// Next Greater Element (use decreasing stack)
int[] result = new int[n];
Arrays.fill(result, -1);
Deque<Integer> stack = new ArrayDeque<>();

for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && arr[i] > arr[stack.peek()]) {
        result[stack.pop()] = arr[i];
    }
    stack.push(i);
}`,
          problems: ["Next Greater Element I/II", "Daily Temperatures", "Online Stock Span"],
          whenToUse: "• Find next/previous greater/smaller\n• O(n) time complexity\n• Stack stores indices"
        }
      },
      {
        label: "Sliding window maximum/minimum",
        result: {
          pattern: "Monotonic Deque",
          code: `Deque<Integer> deque = new ArrayDeque<>();
int[] result = new int[n - k + 1];

for (int i = 0; i < n; i++) {
    // Remove indices outside window
    while (!deque.isEmpty() && deque.peekFirst() < i - k + 1)
        deque.pollFirst();
    
    // Remove smaller elements (they can't be max)
    while (!deque.isEmpty() && arr[deque.peekLast()] < arr[i])
        deque.pollLast();
    
    deque.offerLast(i);
    
    if (i >= k - 1)
        result[i - k + 1] = arr[deque.peekFirst()];
}`,
          problems: ["Sliding Window Maximum", "Shortest Subarray with Sum at Least K"],
          whenToUse: "• Sliding window max/min\n• Deque maintains candidates\n• O(n) time"
        }
      },
      {
        label: "Largest rectangle or histogram",
        result: {
          pattern: "Stack for Boundaries",
          code: `Deque<Integer> stack = new ArrayDeque<>();
int maxArea = 0;

for (int i = 0; i <= n; i++) {
    int h = (i == n) ? 0 : heights[i];
    while (!stack.isEmpty() && h < heights[stack.peek()]) {
        int height = heights[stack.pop()];
        int width = stack.isEmpty() ? i : i - stack.peek() - 1;
        maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
}`,
          problems: ["Largest Rectangle in Histogram", "Maximal Rectangle", "Trapping Rain Water"],
          whenToUse: "• Find area with height constraint\n• Histogram problems\n• Find span/boundary"
        }
      },
      {
        label: "Sum of subarray mins/maxs",
        result: {
          pattern: "Contribution Counting",
          code: `// For each element, count subarrays where it's min
// Contribution = value × left_count × right_count
int[] left = new int[n];  // distance to prev smaller
int[] right = new int[n]; // distance to next smaller

Deque<Integer> stack = new ArrayDeque<>();
for (int i = 0; i < n; i++) {
    while (!stack.isEmpty() && arr[stack.peek()] > arr[i])
        stack.pop();
    left[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
    stack.push(i);
}`,
          problems: ["Sum of Subarray Minimums", "Sum of Subarray Ranges"],
          whenToUse: "• Count subarrays where element is min/max\n• Contribution = val × left × right\n• Avoid double counting with strict/non-strict"
        }
      }
    ]
  },

  'union-find': {
    title: 'Union-Find (Disjoint Set)',
    question: "What's your connectivity problem?",
    options: [
      {
        label: "Count connected components",
        result: {
          pattern: "Basic Union-Find",
          code: `class UnionFind {
    int[] parent;
    int count;
    
    UnionFind(int n) {
        parent = new int[n];
        count = n;
        for (int i = 0; i < n; i++) parent[i] = i;
    }
    
    int find(int x) {
        if (parent[x] != x)
            parent[x] = find(parent[x]); // Path compression
        return parent[x];
    }
    
    void union(int x, int y) {
        int px = find(x), py = find(y);
        if (px != py) {
            parent[px] = py;
            count--;
        }
    }
}`,
          problems: ["Number of Connected Components", "Number of Provinces", "Friend Circles"],
          whenToUse: "• Count disjoint groups\n• Dynamic connectivity\n• Merge sets as edges added"
        }
      },
      {
        label: "Detect cycle in undirected graph",
        result: {
          pattern: "Union-Find Cycle Detection",
          code: `UnionFind uf = new UnionFind(n);

for (int[] edge : edges) {
    int px = uf.find(edge[0]);
    int py = uf.find(edge[1]);
    
    if (px == py) {
        // Cycle detected! Both nodes already connected
        return true;
    }
    uf.union(edge[0], edge[1]);
}
return false;`,
          problems: ["Redundant Connection", "Graph Valid Tree"],
          whenToUse: "• Cycle in undirected graph\n• If union of same component = cycle\n• Find redundant edge"
        }
      },
      {
        label: "Dynamic grouping with constraints",
        result: {
          pattern: "Union-Find with Rank",
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
        // Union by rank
        if (rank[px] > rank[py]) parent[py] = px;
        else if (rank[px] < rank[py]) parent[px] = py;
        else { parent[py] = px; rank[px]++; }
    }
}`,
          problems: ["Accounts Merge", "Satisfiability of Equality Equations", "Smallest String With Swaps"],
          whenToUse: "• Merge accounts/items\n• Equivalence relations\n• Optimize with rank for balanced trees"
        }
      }
    ]
  },

  'topological-sort': {
    title: 'Topological Sort',
    question: "What's your ordering problem?",
    options: [
      {
        label: "Find valid ordering of dependencies",
        result: {
          pattern: "Kahn's Algorithm (BFS)",
          code: `int[] indegree = new int[n];
List<List<Integer>> graph = new ArrayList<>();
// Build graph and calculate indegrees

Queue<Integer> queue = new LinkedList<>();
for (int i = 0; i < n; i++)
    if (indegree[i] == 0) queue.offer(i);

List<Integer> result = new ArrayList<>();
while (!queue.isEmpty()) {
    int node = queue.poll();
    result.add(node);
    for (int neighbor : graph.get(node)) {
        if (--indegree[neighbor] == 0)
            queue.offer(neighbor);
    }
}

// If result.size() != n, cycle exists`,
          problems: ["Course Schedule", "Course Schedule II", "Parallel Courses"],
          whenToUse: "• Find valid ordering\n• Detect cycles in DAG\n• Process nodes with no dependencies first"
        }
      },
      {
        label: "Check if ordering is possible (cycle detection)",
        result: {
          pattern: "DFS Cycle Detection",
          code: `int[] state = new int[n]; // 0=unvisited, 1=visiting, 2=visited
List<List<Integer>> graph = new ArrayList<>();

boolean hasCycle(int node) {
    if (state[node] == 1) return true;  // Back edge = cycle
    if (state[node] == 2) return false; // Already processed
    
    state[node] = 1; // Mark as visiting
    for (int neighbor : graph.get(node)) {
        if (hasCycle(neighbor)) return true;
    }
    state[node] = 2; // Mark as visited
    return false;
}`,
          problems: ["Course Schedule", "Detect Cycles in 2D Grid"],
          whenToUse: "• Just check if valid ordering exists\n• Cycle = no valid topological order\n• Use 3-state DFS"
        }
      },
      {
        label: "Find lexicographically smallest order",
        result: {
          pattern: "BFS with Min-Heap",
          code: `PriorityQueue<Integer> pq = new PriorityQueue<>();
for (int i = 0; i < n; i++)
    if (indegree[i] == 0) pq.offer(i);

StringBuilder result = new StringBuilder();
while (!pq.isEmpty()) {
    int node = pq.poll();
    result.append((char)(node + 'a'));
    for (int neighbor : graph.get(node)) {
        if (--indegree[neighbor] == 0)
            pq.offer(neighbor);
    }
}`,
          problems: ["Alien Dictionary", "Sequence Reconstruction"],
          whenToUse: "• Need lexicographically smallest result\n• Replace queue with priority queue\n• Process smallest available first"
        }
      }
    ]
  },

  'tries': {
    title: 'Tries (Prefix Trees)',
    question: "What string operation do you need?",
    options: [
      {
        label: "Prefix search or autocomplete",
        result: {
          pattern: "Basic Trie",
          code: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    TrieNode root = new TrieNode();
    
    void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null)
                node.children[idx] = new TrieNode();
            node = node.children[idx];
        }
        node.isEnd = true;
    }
    
    boolean startsWith(String prefix) {
        TrieNode node = root;
        for (char c : prefix.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return false;
            node = node.children[idx];
        }
        return true;
    }
}`,
          problems: ["Implement Trie", "Search Suggestions System", "Longest Common Prefix"],
          whenToUse: "• Prefix-based search\n• Autocomplete suggestions\n• O(m) search where m = word length"
        }
      },
      {
        label: "Word search with wildcards",
        result: {
          pattern: "Trie with DFS",
          code: `boolean search(String word) {
    return searchHelper(word, 0, root);
}

boolean searchHelper(String word, int idx, TrieNode node) {
    if (idx == word.length()) return node.isEnd;
    
    char c = word.charAt(idx);
    if (c == '.') {
        // Wildcard: try all children
        for (TrieNode child : node.children) {
            if (child != null && searchHelper(word, idx + 1, child))
                return true;
        }
        return false;
    } else {
        TrieNode child = node.children[c - 'a'];
        return child != null && searchHelper(word, idx + 1, child);
    }
}`,
          problems: ["Design Add and Search Words", "Word Search II"],
          whenToUse: "• Search with wildcards (.)\n• Multiple word search\n• Combine trie with DFS/backtracking"
        }
      },
      {
        label: "Find words in board (multi-word search)",
        result: {
          pattern: "Trie + Backtracking",
          code: `List<String> findWords(char[][] board, String[] words) {
    // Build trie from words
    for (String word : words) trie.insert(word);
    
    Set<String> result = new HashSet<>();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            dfs(board, i, j, root, "", result);
        }
    }
    return new ArrayList<>(result);
}

void dfs(char[][] board, int r, int c, TrieNode node, String word, Set<String> result) {
    if (r < 0 || r >= m || c < 0 || c >= n) return;
    char ch = board[r][c];
    if (ch == '#' || node.children[ch - 'a'] == null) return;
    
    node = node.children[ch - 'a'];
    word += ch;
    if (node.isEnd) result.add(word);
    
    board[r][c] = '#'; // Mark visited
    // DFS in 4 directions
    board[r][c] = ch;  // Restore
}`,
          problems: ["Word Search II", "Boggle"],
          whenToUse: "• Search multiple words efficiently\n• Prune paths not in trie\n• Avoid TLE vs searching each word"
        }
      }
    ]
  },

  'segment-trees': {
    title: 'Segment Trees',
    question: "What range operation do you need?",
    options: [
      {
        label: "Range sum/min/max with point updates",
        result: {
          pattern: "Basic Segment Tree",
          code: `class SegmentTree {
    int[] tree;
    int n;
    
    void build(int[] arr) {
        n = arr.length;
        tree = new int[4 * n];
        build(arr, 0, 0, n - 1);
    }
    
    void build(int[] arr, int node, int start, int end) {
        if (start == end) {
            tree[node] = arr[start];
            return;
        }
        int mid = (start + end) / 2;
        build(arr, 2*node+1, start, mid);
        build(arr, 2*node+2, mid+1, end);
        tree[node] = tree[2*node+1] + tree[2*node+2]; // Sum
    }
    
    int query(int node, int start, int end, int l, int r) {
        if (r < start || l > end) return 0;
        if (l <= start && end <= r) return tree[node];
        int mid = (start + end) / 2;
        return query(2*node+1, start, mid, l, r) 
             + query(2*node+2, mid+1, end, l, r);
    }
}`,
          problems: ["Range Sum Query - Mutable", "Count of Smaller Numbers After Self"],
          whenToUse: "• Range queries + point updates\n• O(log n) per operation\n• Sum, min, max, GCD queries"
        }
      },
      {
        label: "Range updates (lazy propagation)",
        result: {
          pattern: "Segment Tree with Lazy Propagation",
          code: `class LazySegmentTree {
    int[] tree, lazy;
    
    void pushDown(int node) {
        if (lazy[node] != 0) {
            tree[2*node+1] += lazy[node];
            tree[2*node+2] += lazy[node];
            lazy[2*node+1] += lazy[node];
            lazy[2*node+2] += lazy[node];
            lazy[node] = 0;
        }
    }
    
    void rangeUpdate(int node, int start, int end, int l, int r, int val) {
        if (r < start || l > end) return;
        if (l <= start && end <= r) {
            tree[node] += val;
            lazy[node] += val;
            return;
        }
        pushDown(node);
        int mid = (start + end) / 2;
        rangeUpdate(2*node+1, start, mid, l, r, val);
        rangeUpdate(2*node+2, mid+1, end, l, r, val);
        tree[node] = Math.max(tree[2*node+1], tree[2*node+2]);
    }
}`,
          problems: ["Range Addition", "My Calendar III"],
          whenToUse: "• Range updates needed\n• Lazy propagation for efficiency\n• Avoid updating each element"
        }
      },
      {
        label: "Count elements in range (order statistics)",
        result: {
          pattern: "Merge Sort Tree / BIT",
          code: `// Binary Indexed Tree (simpler for count/sum)
class BIT {
    int[] tree;
    
    void update(int i, int delta) {
        for (; i < tree.length; i += i & (-i))
            tree[i] += delta;
    }
    
    int query(int i) {
        int sum = 0;
        for (; i > 0; i -= i & (-i))
            sum += tree[i];
        return sum;
    }
    
    // Range query [l, r]
    int rangeQuery(int l, int r) {
        return query(r) - query(l - 1);
    }
}`,
          problems: ["Count of Smaller Numbers After Self", "Reverse Pairs", "Count of Range Sum"],
          whenToUse: "• Count inversions\n• Count elements less than X\n• BIT simpler than segment tree for this"
        }
      }
    ]
  },

  'bit-manipulation': {
    title: 'Bit Manipulation',
    question: "What bit operation do you need?",
    options: [
      {
        label: "Check/set/clear specific bits",
        result: {
          pattern: "Basic Bit Operations",
          code: `// Check if ith bit is set
boolean isSet = (n & (1 << i)) != 0;

// Set ith bit
n = n | (1 << i);

// Clear ith bit
n = n & ~(1 << i);

// Toggle ith bit
n = n ^ (1 << i);

// Count set bits
int count = Integer.bitCount(n);

// Check if power of 2
boolean isPow2 = n > 0 && (n & (n-1)) == 0;`,
          problems: ["Number of 1 Bits", "Power of Two", "Counting Bits"],
          whenToUse: "• Manipulate individual bits\n• Check properties like power of 2\n• O(1) bit operations"
        }
      },
      {
        label: "Find single/missing/duplicate number",
        result: {
          pattern: "XOR Properties",
          code: `// XOR Properties:
// a ^ a = 0 (same numbers cancel)
// a ^ 0 = a (XOR with 0 keeps value)
// a ^ b ^ a = b (order doesn't matter)

// Single Number (all others appear twice)
int single = 0;
for (int num : nums) single ^= num;

// Missing Number (0 to n, one missing)
int missing = n;
for (int i = 0; i < n; i++) {
    missing ^= i ^ nums[i];
}`,
          problems: ["Single Number", "Single Number II/III", "Missing Number", "Find the Duplicate"],
          whenToUse: "• Find unique element\n• All others appear twice\n• XOR cancels pairs"
        }
      },
      {
        label: "Generate all subsets using bits",
        result: {
          pattern: "Bitmask Iteration",
          code: `// Each number from 0 to 2^n-1 represents a subset
List<List<Integer>> subsets = new ArrayList<>();
int n = nums.length;

for (int mask = 0; mask < (1 << n); mask++) {
    List<Integer> subset = new ArrayList<>();
    for (int i = 0; i < n; i++) {
        if ((mask & (1 << i)) != 0) {
            subset.add(nums[i]);
        }
    }
    subsets.add(subset);
}`,
          problems: ["Subsets", "Partition to K Equal Sum Subsets"],
          whenToUse: "• Generate all 2^n subsets\n• Bitmask represents inclusion\n• Each bit = include/exclude decision"
        }
      },
      {
        label: "Bitwise operations on pairs",
        result: {
          pattern: "Bit-by-Bit Analysis",
          code: `// Maximum XOR of Two Numbers
// Build trie of binary representations
// For each number, find max XOR partner

// Count pairs with AND/OR condition
// Analyze each bit position independently
int countBits(int[] nums, int bit) {
    int ones = 0;
    for (int num : nums) {
        if ((num & (1 << bit)) != 0) ones++;
    }
    int zeros = nums.length - ones;
    return ones * zeros; // Pairs with different bits
}`,
          problems: ["Maximum XOR of Two Numbers", "Total Hamming Distance", "Bitwise AND of Numbers Range"],
          whenToUse: "• Operations on pairs of numbers\n• Analyze each bit independently\n• Use trie for XOR optimization"
        }
      }
    ]
  }
};
