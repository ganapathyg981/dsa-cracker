export const monotonicStack = {
  id: 'monotonic-stack',
  title: 'Monotonic Stack/Queue',
  icon: '📚',
  difficulty: 'Medium-Hard',
  
  theory: {
    overview: `A monotonic stack maintains elements in sorted order (all increasing or all decreasing). When adding a new element, we pop elements that break the monotonic property.

This efficiently finds "next greater/smaller element" in O(n) - each element is pushed and popped at most once.

Monotonic queue (using deque) extends this for sliding window max/min problems and DP optimization.

KEY APPLICATIONS:
- Next/Previous Greater/Smaller: Record when pushing (previous) or popping (next)
- Subarray contribution: Count how many subarrays have element as min/max
- DP optimization: A[i] = min(A[j:k]) + C can use monotonic queue`,
    
    keyInsight: 'When you push, pop all elements that violate monotonicity. Each element enters/exits once = O(n) total.',
    
    whenToUse: [
      'Next/previous greater/smaller element',
      'Sliding window maximum/minimum',
      'Histogram problems (largest rectangle)',
      'Count subarrays where element is min/max',
      'DP with min/max over sliding range',
      'Stock span problems'
    ],
    
    complexity: {
      time: 'O(n) - each element pushed/popped once',
      space: 'O(n)'
    }
  },

  decisionTree: {
    question: "What do you need to find?",
    options: [
      { label: "Next/previous greater/smaller element", result: "next-greater" },
      { label: "Sliding window maximum/minimum", result: "sliding-max" },
      { label: "Largest rectangle in histogram", result: "histogram" },
      { label: "Count subarrays with element as min/max", result: "subarray-contribution" }
    ]
  },

  templates: [
    {
      id: 'next-greater',
      name: 'Next Greater Element',
      description: 'Decreasing stack: pop when current > top.',
      java: `public int[] nextGreaterElement(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    
    Deque<Integer> stack = new ArrayDeque<>();  // Store indices
    
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && nums[i] > nums[stack.peek()]) {
            result[stack.pop()] = nums[i];
        }
        stack.push(i);
    }
    
    return result;
}

// Daily Temperatures (days until warmer day)
public int[] dailyTemperatures(int[] temps) {
    int n = temps.length;
    int[] result = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();
    
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && temps[i] > temps[stack.peek()]) {
            int j = stack.pop();
            result[j] = i - j;
        }
        stack.push(i);
    }
    
    return result;
}`,
      python: `def next_greater_element(nums: List[int]) -> List[int]:
    n = len(nums)
    result = [-1] * n
    stack = []  # Store indices
    
    for i in range(n):
        while stack and nums[i] > nums[stack[-1]]:
            result[stack.pop()] = nums[i]
        stack.append(i)
    
    return result

# Daily Temperatures (days until warmer day)
def daily_temperatures(temps: List[int]) -> List[int]:
    n = len(temps)
    result = [0] * n
    stack = []
    
    for i in range(n):
        while stack and temps[i] > temps[stack[-1]]:
            j = stack.pop()
            result[j] = i - j
        stack.append(i)
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'temps = [73,74,75,71,69,72,76,73]',
        output: '[1,1,4,2,1,1,0,0]',
        explanation: 'Days until next warmer temperature'
      }
    },
    {
      id: 'sliding-max',
      name: 'Sliding Window Maximum (Monotonic Deque)',
      description: 'Deque stores indices. Front is max. Remove from back if smaller than new.',
      java: `public int[] maxSlidingWindow(int[] nums, int k) {
    int n = nums.length;
    int[] result = new int[n - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();  // Store indices
    
    for (int i = 0; i < n; i++) {
        // Remove indices outside window
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {
            deque.pollFirst();
        }
        
        // Remove smaller elements (they can't be max)
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {
            deque.pollLast();
        }
        
        deque.offerLast(i);
        
        // Record max for this window
        if (i >= k - 1) {
            result[i - k + 1] = nums[deque.peekFirst()];
        }
    }
    
    return result;
}`,
      python: `def max_sliding_window(nums: List[int], k: int) -> List[int]:
    from collections import deque
    
    result = []
    dq = deque()  # Store indices
    
    for i in range(len(nums)):
        # Remove indices outside window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < nums[i]:
            dq.pop()
        
        dq.append(i)
        
        # Record max for this window
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      testCase: {
        input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3',
        output: '[3,3,5,5,6,7]',
        explanation: 'Max of each window of size 3'
      }
    },
    {
      id: 'histogram',
      name: 'Largest Rectangle in Histogram',
      description: 'For each bar, find how far left/right it extends. Stack finds boundaries.',
      java: `public int largestRectangleArea(int[] heights) {
    int n = heights.length;
    Deque<Integer> stack = new ArrayDeque<>();
    int maxArea = 0;
    
    for (int i = 0; i <= n; i++) {
        int h = (i == n) ? 0 : heights[i];
        
        while (!stack.isEmpty() && h < heights[stack.peek()]) {
            int height = heights[stack.pop()];
            int width = stack.isEmpty() ? i : i - stack.peek() - 1;
            maxArea = Math.max(maxArea, height * width);
        }
        
        stack.push(i);
    }
    
    return maxArea;
}`,
      python: `def largest_rectangle_area(heights: List[int]) -> int:
    stack = []
    max_area = 0
    heights = heights + [0]  # Sentinel to flush stack
    
    for i, h in enumerate(heights):
        while stack and h < heights[stack[-1]]:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)
    
    return max_area`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'heights = [2,1,5,6,2,3]',
        output: '10',
        explanation: 'Rectangle with heights 5,6 has area 10'
      }
    },
    {
      id: 'subarray-contribution',
      name: 'Sum of Subarray Minimums',
      description: 'Find left/right boundaries where each element is min. Contribution = value × left_count × right_count.',
      java: `public int sumSubarrayMins(int[] arr) {
    int MOD = 1_000_000_007;
    int n = arr.length;
    
    // left[i] = distance to previous less element
    // right[i] = distance to next less element
    int[] left = new int[n];
    int[] right = new int[n];
    
    Deque<Integer> stack = new ArrayDeque<>();
    
    // Find previous less (increasing stack)
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
            stack.pop();
        }
        left[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
        stack.push(i);
    }
    
    stack.clear();
    
    // Find next less (increasing stack)
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
            int j = stack.pop();
            right[j] = i - j;
        }
        stack.push(i);
    }
    while (!stack.isEmpty()) {
        int j = stack.pop();
        right[j] = n - j;
    }
    
    long result = 0;
    for (int i = 0; i < n; i++) {
        result = (result + (long) arr[i] * left[i] * right[i]) % MOD;
    }
    
    return (int) result;
}`,
      python: `def sum_subarray_mins(arr: List[int]) -> int:
    MOD = 10**9 + 7
    n = len(arr)
    
    # left[i] = distance to previous less element
    # right[i] = distance to next less element
    left = [0] * n
    right = [0] * n
    stack = []
    
    # Find previous less (increasing stack)
    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            stack.pop()
        left[i] = i + 1 if not stack else i - stack[-1]
        stack.append(i)
    
    stack.clear()
    
    # Find next less (increasing stack)
    for i in range(n):
        while stack and arr[stack[-1]] > arr[i]:
            j = stack.pop()
            right[j] = i - j
        stack.append(i)
    
    while stack:
        j = stack.pop()
        right[j] = n - j
    
    result = 0
    for i in range(n):
        result = (result + arr[i] * left[i] * right[i]) % MOD
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'arr = [3,1,2,4]',
        output: '17',
        explanation: 'Sum of minimums: [3]=3, [1]=1, [2]=2, [4]=4, [3,1]=1, [1,2]=1, [2,4]=2, [3,1,2]=1, [1,2,4]=1, [3,1,2,4]=1'
      }
    }
  ],

  problems: [
    { name: 'Daily Temperatures', difficulty: 'Medium', tags: ['next greater'] },
    { name: 'Next Greater Element I/II', difficulty: 'Easy-Medium', tags: ['next greater'] },
    { name: 'Sliding Window Maximum', difficulty: 'Hard', tags: ['monotonic deque'] },
    { name: 'Largest Rectangle in Histogram', difficulty: 'Hard', tags: ['histogram'] },
    { name: 'Maximal Rectangle', difficulty: 'Hard', tags: ['histogram', '2D'] },
    { name: 'Online Stock Span', difficulty: 'Medium', tags: ['previous greater'] },
    { name: 'Sum of Subarray Minimums', difficulty: 'Medium', tags: ['contribution'] },
    { name: 'Shortest Subarray with Sum at Least K', difficulty: 'Hard', tags: ['monotonic deque', 'prefix sum'] },
    { name: 'Trapping Rain Water', difficulty: 'Hard', tags: ['two approaches'] }
  ],

  mistakes: [
    {
      trap: 'Storing values instead of indices in stack',
      fix: 'Store indices to compute distances (days, widths). Values can be accessed via nums[idx].'
    },
    {
      trap: 'Forgetting to process remaining elements in stack',
      fix: 'Add sentinel (0 or -1) at end, or process stack after main loop.'
    },
    {
      trap: 'Wrong monotonicity direction',
      fix: 'Next greater: decreasing stack. Next smaller: increasing stack.'
    },
    {
      trap: 'In contribution problems, counting duplicates incorrectly',
      fix: 'Use strict less (<) for one direction, non-strict (<=) for other to avoid double counting.'
    }
  ],

  variations: [
    {
      name: 'Circular Array',
      description: 'Loop twice (or use modulo) to handle wrap-around.'
    },
    {
      name: 'Previous Greater/Smaller',
      description: 'Process left to right, answer is stack top when pushing.'
    },
    {
      name: 'Monotonic Queue for DP',
      description: 'DP where A[i] = min/max(A[j:k]) + C. Use monotonic deque to maintain window min/max in O(1).'
    }
  ]
};

