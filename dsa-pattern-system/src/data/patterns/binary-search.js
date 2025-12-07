export const binarySearch = {
  id: 'binary-search',
  title: 'Binary Search',
  icon: '🔍',
  difficulty: 'Easy-Hard',
  
  theory: {
    overview: `Binary Search is a divide-and-conquer algorithm that repeatedly divides the search space in half. At each step, we eliminate half of the remaining elements by comparing with the middle element. This reduces O(n) linear search to O(log n).

The classic application is searching in a sorted array, but the real power comes from "Binary Search on Answer" - when we can frame a problem as "find the minimum/maximum value that satisfies a condition." If we can write a function that checks if an answer works, and the answer space is monotonic (all values below threshold fail, all above pass or vice versa), we can binary search.

Key requirement: The search space must have a monotonic property - once a condition becomes true/false, it stays that way.`,
    
    keyInsight: 'If you can determine which half contains the answer, eliminate the other half. Works on any monotonic search space, not just arrays.',
    
    whenToUse: [
      'Searching in a sorted array',
      'Finding boundaries (first/last occurrence)',
      'Minimizing/maximizing a value where you can check feasibility',
      'Rotated sorted arrays',
      'Peak finding in bitonic arrays',
      'Square root, Kth element, or any "search space" problems'
    ],
    
    complexity: {
      time: 'O(log n) for search, O(n log n) if checking feasibility is O(n)',
      space: 'O(1) iterative, O(log n) recursive'
    }
  },

  decisionTree: {
    question: "What are you searching for?",
    options: [
      {
        label: "Exact element in sorted array",
        result: "classic-binary-search"
      },
      {
        label: "First or last occurrence (boundaries)",
        result: "boundary-search"
      },
      {
        label: "Element in rotated sorted array",
        result: "rotated-array"
      },
      {
        label: "Peak element or local maximum",
        result: "peak-finding"
      },
      {
        label: "Minimum/maximum answer satisfying condition",
        result: "binary-search-answer"
      },
      {
        label: "Kth smallest/largest element",
        result: "kth-element"
      }
    ]
  },

  templates: [
    {
      id: 'classic-binary-search',
      name: 'Classic Binary Search',
      description: 'Find exact element. Use left <= right, and return when found.',
      java: `public int binarySearch(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;  // Avoid overflow
        
        if (nums[mid] == target) {
            return mid;  // Found!
        } else if (nums[mid] < target) {
            left = mid + 1;  // Search right half
        } else {
            right = mid - 1;  // Search left half
        }
    }
    
    return -1;  // Not found
}`,
      python: `def binary_search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2  # Avoid overflow
        
        if nums[mid] == target:
            return mid  # Found!
        elif nums[mid] < target:
            left = mid + 1  # Search right half
        else:
            right = mid - 1  # Search left half
    
    return -1  # Not found`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [-1, 0, 3, 5, 9, 12], target = 9',
        output: '4',
        explanation: '9 is found at index 4'
      }
    },
    {
      id: 'boundary-search',
      name: 'Find First/Last Occurrence (Boundary)',
      description: 'Don\'t return early - continue searching to find boundary. Two variants for lower/upper bound.',
      java: `// Find FIRST occurrence (lower bound)
public int findFirst(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            result = mid;      // Record potential answer
            right = mid - 1;   // Keep searching left for earlier occurrence
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

// Find LAST occurrence (upper bound)
public int findLast(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    int result = -1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            result = mid;      // Record potential answer
            left = mid + 1;    // Keep searching right for later occurrence
        } else if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}`,
      python: `# Find FIRST occurrence (lower bound)
def find_first(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            result = mid      # Record potential answer
            right = mid - 1   # Keep searching left
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result

# Find LAST occurrence (upper bound)
def find_last(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    result = -1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            result = mid      # Record potential answer
            left = mid + 1    # Keep searching right
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    
    return result`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [5, 7, 7, 8, 8, 10], target = 8',
        output: 'findFirst: 3, findLast: 4',
        explanation: '8 appears at indices 3 and 4'
      }
    },
    {
      id: 'rotated-array',
      name: 'Search in Rotated Sorted Array',
      description: 'One half is always sorted. Determine which half, then decide where to search.',
      java: `public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    
    while (left <= right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] == target) {
            return mid;
        }
        
        // Check which half is sorted
        if (nums[left] <= nums[mid]) {
            // Left half is sorted
            if (target >= nums[left] && target < nums[mid]) {
                right = mid - 1;  // Target in left sorted half
            } else {
                left = mid + 1;   // Target in right half
            }
        } else {
            // Right half is sorted
            if (target > nums[mid] && target <= nums[right]) {
                left = mid + 1;   // Target in right sorted half
            } else {
                right = mid - 1;  // Target in left half
            }
        }
    }
    
    return -1;
}`,
      python: `def search(nums: List[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    
    while left <= right:
        mid = left + (right - left) // 2
        
        if nums[mid] == target:
            return mid
        
        # Check which half is sorted
        if nums[left] <= nums[mid]:
            # Left half is sorted
            if nums[left] <= target < nums[mid]:
                right = mid - 1  # Target in left sorted half
            else:
                left = mid + 1   # Target in right half
        else:
            # Right half is sorted
            if nums[mid] < target <= nums[right]:
                left = mid + 1   # Target in right sorted half
            else:
                right = mid - 1  # Target in left half
    
    return -1`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [4, 5, 6, 7, 0, 1, 2], target = 0',
        output: '4',
        explanation: 'Array rotated at index 4, target 0 is at index 4'
      }
    },
    {
      id: 'peak-finding',
      name: 'Find Peak Element',
      description: 'Move toward the higher neighbor - guaranteed to find a peak.',
      java: `public int findPeakElement(int[] nums) {
    int left = 0, right = nums.length - 1;
    
    while (left < right) {  // Note: left < right, not <=
        int mid = left + (right - left) / 2;
        
        if (nums[mid] > nums[mid + 1]) {
            // Descending - peak is at mid or left
            right = mid;
        } else {
            // Ascending - peak is to the right
            left = mid + 1;
        }
    }
    
    return left;  // left == right, found peak
}`,
      python: `def find_peak_element(nums: List[int]) -> int:
    left, right = 0, len(nums) - 1
    
    while left < right:  # Note: left < right, not <=
        mid = left + (right - left) // 2
        
        if nums[mid] > nums[mid + 1]:
            # Descending - peak is at mid or left
            right = mid
        else:
            # Ascending - peak is to the right
            left = mid + 1
    
    return left  # left == right, found peak`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [1, 2, 3, 1]',
        output: '2',
        explanation: '3 at index 2 is greater than its neighbors'
      }
    },
    {
      id: 'binary-search-answer',
      name: 'Binary Search on Answer Space',
      description: 'Search for minimum/maximum feasible answer. Define canAchieve(value) that checks if answer works.',
      java: `// Example: Koko Eating Bananas
// Find minimum eating speed to finish in H hours
public int minEatingSpeed(int[] piles, int h) {
    int left = 1;  // Minimum possible speed
    int right = Arrays.stream(piles).max().getAsInt();  // Maximum possible
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (canFinish(piles, mid, h)) {
            right = mid;  // Try smaller speed
        } else {
            left = mid + 1;  // Need faster speed
        }
    }
    
    return left;
}

private boolean canFinish(int[] piles, int speed, int h) {
    int hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed;  // Ceiling division
    }
    return hours <= h;
}`,
      python: `# Example: Koko Eating Bananas
# Find minimum eating speed to finish in H hours
def min_eating_speed(piles: List[int], h: int) -> int:
    
    def can_finish(speed: int) -> bool:
        hours = sum((pile + speed - 1) // speed for pile in piles)
        return hours <= h
    
    left = 1  # Minimum possible speed
    right = max(piles)  # Maximum possible speed
    
    while left < right:
        mid = left + (right - left) // 2
        
        if can_finish(mid):
            right = mid  # Try smaller speed
        else:
            left = mid + 1  # Need faster speed
    
    return left`,
      timeComplexity: 'O(n log(max_value))',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'piles = [3, 6, 7, 11], h = 8',
        output: '4',
        explanation: 'Speed 4: ceil(3/4)+ceil(6/4)+ceil(7/4)+ceil(11/4) = 1+2+2+3 = 8 hours'
      }
    },
    {
      id: 'kth-element',
      name: 'Kth Smallest Element (Matrix/Merged Arrays)',
      description: 'Binary search on value, count elements less than mid.',
      java: `// Kth smallest in sorted matrix
public int kthSmallest(int[][] matrix, int k) {
    int n = matrix.length;
    int left = matrix[0][0];
    int right = matrix[n-1][n-1];
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        int count = countLessOrEqual(matrix, mid);
        
        if (count < k) {
            left = mid + 1;  // Need larger value
        } else {
            right = mid;     // This or smaller could be answer
        }
    }
    
    return left;
}

private int countLessOrEqual(int[][] matrix, int target) {
    int count = 0;
    int n = matrix.length;
    int row = n - 1, col = 0;
    
    // Start from bottom-left
    while (row >= 0 && col < n) {
        if (matrix[row][col] <= target) {
            count += row + 1;  // All elements in this column up to row
            col++;
        } else {
            row--;
        }
    }
    
    return count;
}`,
      python: `# Kth smallest in sorted matrix
def kth_smallest(matrix: List[List[int]], k: int) -> int:
    
    def count_less_or_equal(target: int) -> int:
        count = 0
        n = len(matrix)
        row, col = n - 1, 0
        
        # Start from bottom-left
        while row >= 0 and col < n:
            if matrix[row][col] <= target:
                count += row + 1  # All elements in this column up to row
                col += 1
            else:
                row -= 1
        
        return count
    
    n = len(matrix)
    left, right = matrix[0][0], matrix[n-1][n-1]
    
    while left < right:
        mid = left + (right - left) // 2
        count = count_less_or_equal(mid)
        
        if count < k:
            left = mid + 1  # Need larger value
        else:
            right = mid     # This or smaller could be answer
    
    return left`,
      timeComplexity: 'O(n log(max-min))',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8',
        output: '13',
        explanation: 'Sorted: [1,5,9,10,11,12,13,13,15], 8th element is 13'
      }
    },
    {
      id: 'search-insert',
      name: 'Search Insert Position',
      description: 'Find position where target would be inserted to maintain sorted order.',
      java: `public int searchInsert(int[] nums, int target) {
    int left = 0, right = nums.length;  // Note: right = length, not length-1
    
    while (left < right) {
        int mid = left + (right - left) / 2;
        
        if (nums[mid] < target) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;  // Insert position
}`,
      python: `def search_insert(nums: List[int], target: int) -> int:
    left, right = 0, len(nums)  # Note: right = length, not length-1
    
    while left < right:
        mid = left + (right - left) // 2
        
        if nums[mid] < target:
            left = mid + 1
        else:
            right = mid
    
    return left  # Insert position`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [1, 3, 5, 6], target = 2',
        output: '1',
        explanation: '2 would be inserted at index 1 (between 1 and 3)'
      }
    }
  ],

  problems: [
    { name: 'Binary Search', difficulty: 'Easy', tags: ['classic'] },
    { name: 'Search Insert Position', difficulty: 'Easy', tags: ['boundary', 'insert position'] },
    { name: 'First Bad Version', difficulty: 'Easy', tags: ['binary search on answer'] },
    { name: 'Find First and Last Position of Element', difficulty: 'Medium', tags: ['boundary search'] },
    { name: 'Search in Rotated Sorted Array', difficulty: 'Medium', tags: ['rotated array'] },
    { name: 'Find Minimum in Rotated Sorted Array', difficulty: 'Medium', tags: ['rotated array'] },
    { name: 'Find Peak Element', difficulty: 'Medium', tags: ['peak finding'] },
    { name: 'Koko Eating Bananas', difficulty: 'Medium', tags: ['binary search on answer'] },
    { name: 'Capacity To Ship Packages', difficulty: 'Medium', tags: ['binary search on answer'] },
    { name: 'Kth Smallest Element in Sorted Matrix', difficulty: 'Medium', tags: ['kth element', 'matrix'] },
    { name: 'Median of Two Sorted Arrays', difficulty: 'Hard', tags: ['binary search', 'divide conquer'] },
    { name: 'Split Array Largest Sum', difficulty: 'Hard', tags: ['binary search on answer'] }
  ],

  mistakes: [
    {
      trap: 'Integer overflow when calculating mid: (left + right) / 2',
      fix: 'Use mid = left + (right - left) / 2 to avoid overflow.'
    },
    {
      trap: 'Infinite loop due to wrong boundary update (mid vs mid+1/mid-1)',
      fix: 'For left < right: use right = mid when condition true, left = mid + 1 when false. For left <= right: use mid-1 and mid+1.'
    },
    {
      trap: 'Off-by-one error: should condition be left <= right or left < right?',
      fix: 'Use left <= right when searching for exact value. Use left < right when searching for boundary/minimum.'
    },
    {
      trap: 'In rotated array, not handling duplicates correctly',
      fix: 'When nums[left] == nums[mid] == nums[right], skip duplicates: left++; right--;'
    },
    {
      trap: 'Binary search on answer: wrong search space bounds',
      fix: 'Carefully determine minimum and maximum possible answers. For rates: min=1. For sums: min=max(arr).'
    }
  ],

  variations: [
    {
      name: 'Ternary Search',
      description: 'Divide into three parts - useful for unimodal functions (one peak/valley). Rarely needed.'
    },
    {
      name: 'Exponential Search',
      description: 'Find range by doubling, then binary search. Good for unbounded/infinite arrays.'
    },
    {
      name: 'Interpolation Search',
      description: 'Estimate position based on value distribution. O(log log n) for uniform data, but O(n) worst case.'
    }
  ]
};

