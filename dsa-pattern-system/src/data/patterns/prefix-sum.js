export const prefixSum = {
  id: 'prefix-sum',
  title: 'Prefix Sum',
  icon: '➕',
  difficulty: 'Easy-Medium',
  
  theory: {
    overview: `Prefix Sum (also called Cumulative Sum) is a preprocessing technique that allows O(1) range sum queries after O(n) preprocessing. Instead of summing elements each time, we precompute running totals.

The key insight is: sum(i, j) = prefix[j+1] - prefix[i]. By storing cumulative sums, any range query becomes a simple subtraction. This transforms O(n) per query to O(1) per query.

This pattern extends to 2D arrays (prefix rectangles), products (prefix products), and even XOR operations. Combined with HashMap, it solves "subarray with sum K" problems elegantly.`,
    
    keyInsight: 'Precompute cumulative values so range queries become O(1) subtractions: sum(i,j) = prefix[j+1] - prefix[i]',
    
    whenToUse: [
      'Multiple range sum queries on static array',
      'Finding subarrays with given sum',
      'Counting subarrays with sum divisible by K',
      'Product of array except self',
      '2D matrix region sum queries'
    ],
    
    complexity: {
      time: 'O(n) preprocessing, O(1) per query',
      space: 'O(n) for prefix array'
    }
  },

  decisionTree: {
    question: "What's the dimension and operation?",
    options: [
      {
        label: "1D array, sum queries",
        result: "basic-prefix-sum"
      },
      {
        label: "Find subarray with exact sum K",
        result: "subarray-sum-k"
      },
      {
        label: "2D matrix region sum",
        result: "2d-prefix-sum"
      },
      {
        label: "Product instead of sum",
        result: "prefix-product"
      }
    ]
  },

  templates: [
    {
      id: 'basic-prefix-sum',
      name: 'Basic Prefix Sum',
      description: 'Build prefix array for O(1) range sum queries.',
      java: `public class PrefixSum {
    private int[] prefix;
    
    public PrefixSum(int[] nums) {
        int n = nums.length;
        prefix = new int[n + 1];  // prefix[0] = 0 for easier math
        
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    // Sum of nums[left..right] inclusive
    public int rangeSum(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`,
      python: `class PrefixSum:
    def __init__(self, nums: List[int]):
        n = len(nums)
        self.prefix = [0] * (n + 1)  # prefix[0] = 0 for easier math
        
        for i in range(n):
            self.prefix[i + 1] = self.prefix[i] + nums[i]
    
    def range_sum(self, left: int, right: int) -> int:
        # Sum of nums[left..right] inclusive
        return self.prefix[right + 1] - self.prefix[left]`,
      timeComplexity: 'O(n) build, O(1) query',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [1, 2, 3, 4, 5], query(1, 3)',
        output: '9',
        explanation: 'sum(2, 3, 4) = 9, computed as prefix[4] - prefix[1] = 10 - 1'
      }
    },
    {
      id: 'subarray-sum-k',
      name: 'Subarray Sum Equals K',
      description: 'Use HashMap to count prefix sums. If current - K exists, found subarray!',
      java: `public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCount = new HashMap<>();
    prefixCount.put(0, 1);  // Empty subarray has sum 0
    
    int count = 0;
    int currentSum = 0;
    
    for (int num : nums) {
        currentSum += num;
        
        // If (currentSum - k) was seen, those subarrays end here
        count += prefixCount.getOrDefault(currentSum - k, 0);
        
        // Record this prefix sum
        prefixCount.put(currentSum, prefixCount.getOrDefault(currentSum, 0) + 1);
    }
    
    return count;
}`,
      python: `def subarray_sum(nums: List[int], k: int) -> int:
    from collections import defaultdict
    
    prefix_count = defaultdict(int)
    prefix_count[0] = 1  # Empty subarray has sum 0
    
    count = 0
    current_sum = 0
    
    for num in nums:
        current_sum += num
        
        # If (current_sum - k) was seen, those subarrays end here
        count += prefix_count[current_sum - k]
        
        # Record this prefix sum
        prefix_count[current_sum] += 1
    
    return count`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [1, 1, 1], k = 2',
        output: '2',
        explanation: 'Subarrays [1,1] at index (0,1) and (1,2) sum to 2'
      }
    },
    {
      id: '2d-prefix-sum',
      name: '2D Prefix Sum (Matrix Region)',
      description: 'Extend to 2D for O(1) rectangle sum queries.',
      java: `public class NumMatrix {
    private int[][] prefix;
    
    public NumMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        prefix = new int[m + 1][n + 1];
        
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                prefix[i][j] = matrix[i-1][j-1] 
                    + prefix[i-1][j] 
                    + prefix[i][j-1] 
                    - prefix[i-1][j-1];
            }
        }
    }
    
    public int sumRegion(int r1, int c1, int r2, int c2) {
        return prefix[r2+1][c2+1] 
            - prefix[r1][c2+1] 
            - prefix[r2+1][c1] 
            + prefix[r1][c1];
    }
}`,
      python: `class NumMatrix:
    def __init__(self, matrix: List[List[int]]):
        m, n = len(matrix), len(matrix[0])
        self.prefix = [[0] * (n + 1) for _ in range(m + 1)]
        
        for i in range(1, m + 1):
            for j in range(1, n + 1):
                self.prefix[i][j] = (matrix[i-1][j-1] 
                    + self.prefix[i-1][j] 
                    + self.prefix[i][j-1] 
                    - self.prefix[i-1][j-1])
    
    def sum_region(self, r1: int, c1: int, r2: int, c2: int) -> int:
        return (self.prefix[r2+1][c2+1] 
            - self.prefix[r1][c2+1] 
            - self.prefix[r2+1][c1] 
            + self.prefix[r1][c1])`,
      timeComplexity: 'O(m*n) build, O(1) query',
      spaceComplexity: 'O(m*n)',
      testCase: {
        input: 'matrix = [[3,0,1],[5,6,3],[1,2,0]], region(1,1,2,2)',
        output: '11',
        explanation: 'Sum of 6+3+2+0 = 11'
      }
    },
    {
      id: 'prefix-product',
      name: 'Product Except Self',
      description: 'Use prefix and suffix products, avoiding division.',
      java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    
    // First pass: prefix products (left to right)
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    
    // Second pass: multiply by suffix products (right to left)
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    
    return result;
}`,
      python: `def product_except_self(nums: List[int]) -> List[int]:
    n = len(nums)
    result = [1] * n
    
    # First pass: prefix products (left to right)
    for i in range(1, n):
        result[i] = result[i - 1] * nums[i - 1]
    
    # Second pass: multiply by suffix products (right to left)
    suffix = 1
    for i in range(n - 1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) excluding output',
      testCase: {
        input: 'nums = [1, 2, 3, 4]',
        output: '[24, 12, 8, 6]',
        explanation: 'Each element is product of all others'
      }
    }
  ],

  problems: [
    { name: 'Range Sum Query - Immutable', difficulty: 'Easy', tags: ['basic prefix sum'] },
    { name: 'Running Sum of 1d Array', difficulty: 'Easy', tags: ['basic prefix sum'] },
    { name: 'Subarray Sum Equals K', difficulty: 'Medium', tags: ['prefix sum + hashmap'] },
    { name: 'Continuous Subarray Sum', difficulty: 'Medium', tags: ['prefix sum + modulo'] },
    { name: 'Product of Array Except Self', difficulty: 'Medium', tags: ['prefix/suffix product'] },
    { name: 'Range Sum Query 2D - Immutable', difficulty: 'Medium', tags: ['2D prefix sum'] },
    { name: 'Subarray Sums Divisible by K', difficulty: 'Medium', tags: ['prefix sum + modulo'] },
    { name: 'Maximum Size Subarray Sum Equals k', difficulty: 'Medium', tags: ['prefix sum + hashmap'] }
  ],

  mistakes: [
    {
      trap: 'Off-by-one error in prefix array indexing',
      fix: 'Use prefix[n+1] with prefix[0] = 0. Range sum is prefix[right+1] - prefix[left].'
    },
    {
      trap: 'Forgetting to initialize prefix_count[0] = 1 in subarray sum problems',
      fix: 'The empty prefix (sum = 0) must be counted to find subarrays starting at index 0.'
    },
    {
      trap: 'Integer overflow with large sums',
      fix: 'Use long in Java or be aware of Python\'s arbitrary precision.'
    },
    {
      trap: 'In 2D prefix sum, wrong inclusion-exclusion formula',
      fix: 'Draw the rectangle. Include (r2,c2), exclude (r1-1,c2) and (r2,c1-1), add back (r1-1,c1-1).'
    }
  ],

  variations: [
    {
      name: 'Difference Array',
      description: 'For range updates: add val to diff[l], subtract from diff[r+1], then compute prefix sum.'
    },
    {
      name: 'Prefix XOR',
      description: 'XOR has same property: xor(i,j) = prefix[j+1] ^ prefix[i]. Used in subarray XOR problems.'
    },
    {
      name: 'Prefix Max/Min',
      description: 'Track running max/min from left and right for problems like Trapping Rain Water.'
    }
  ]
};

