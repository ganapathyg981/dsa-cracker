export const twoPointers = {
  id: 'two-pointers',
  title: 'Two Pointers',
  icon: '👉',
  difficulty: 'Easy-Medium',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION (inspired by Grokking the Coding Interview)
  introduction: {
    realWorldAnalogy: `Imagine you're at a library 📚 looking for two books that together cost exactly $20. Instead of picking up every possible pair (which could take forever!), you use a smarter approach:
    
You sort the books by price, then have one friend start at the cheapest book (left) and another at the most expensive (right). If their total is too high, the friend on the right moves to a cheaper book. If too low, the friend on the left moves to a more expensive one. They'll find the pair in just one pass!

This is exactly how Two Pointers works - by moving pointers strategically, we avoid checking all pairs.`,

    simpleExplanation: `The Two Pointers technique uses two variables (pointers) that traverse through a data structure. Instead of using nested loops (checking every pair), we move two pointers intelligently to find what we need in a single pass.

There are two main variations:
• **Opposite Direction**: Pointers start at both ends and move toward each other (great for sorted arrays)
• **Same Direction (Fast/Slow)**: Both start at the beginning, moving at different speeds (great for linked lists, in-place operations)`,

    visualSteps: [
      { step: 1, title: 'Sort (if needed)', description: 'Two pointers often needs sorted input to work', visual: '[1, 2, 3, 7, 11, 15] ✓ sorted' },
      { step: 2, title: 'Place Pointers', description: 'Left at start, right at end', visual: 'L→[1, 2, 3, 7, 11, 15]←R' },
      { step: 3, title: 'Check Condition', description: 'Compare sum/product to target', visual: '1 + 15 = 16 (target: 9)' },
      { step: 4, title: 'Move Pointers', description: 'Too big? Move right. Too small? Move left.', visual: '16 > 9, so move R left' },
      { step: 5, title: 'Repeat', description: 'Continue until pointers meet or solution found', visual: '[1,2]→target found!' },
    ],

    keyTakeaway: '💡 By sorting first and using two pointers, we convert O(n²) brute force into O(n) by eliminating unnecessary comparisons!',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'pair with target sum',
      'triplet sum',
      'sorted array',
      'palindrome',
      'remove duplicates in-place',
      'partition array',
      'compare from both ends',
      'find middle of linked list',
      'detect cycle in linked list',
      'merge two sorted arrays',
    ],
    problemCharacteristics: [
      'Array is sorted (or can be sorted without affecting answer)',
      'Need to find pairs/triplets satisfying a condition',
      'Need to modify array in-place',
      'Linked list traversal (finding middle, detecting cycles)',
      'Comparing elements from opposite ends (palindrome)',
    ],
    notSuitableWhen: [
      'Need to preserve original order and can\'t sort',
      'Elements can\'t be compared in a meaningful way',
      'Need all pairs/combinations (not just count or one solution)',
      'Array has negative numbers AND looking for exact sum (use hash map)',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'sliding-window', relationship: 'Sliding window is a special case where both pointers move in the same direction' },
    { id: 'binary-search', relationship: 'Binary search is two pointers where we always eliminate half' },
    { id: 'arrays-strings', relationship: 'Many array manipulation problems use two pointers' },
  ],
  
  theory: {
    overview: `The Two Pointers technique uses two pointers to iterate through a data structure (usually an array or string) in a way that reduces time complexity from O(n²) to O(n). Instead of using nested loops, we strategically move two pointers based on certain conditions.

The key insight is that by maintaining two pointers that move intelligently based on the problem constraints, we can eliminate the need to check all possible pairs. This works especially well with sorted arrays or when we need to find pairs/triplets that satisfy certain conditions.`,
    
    keyInsight: 'Use two pointers moving in the same or opposite directions to avoid nested loops and achieve O(n) time complexity.',
    
    whenToUse: [
      'Array/string is sorted or can be sorted without affecting the answer',
      'Need to find pairs, triplets, or subarrays satisfying a condition',
      'Need to compare elements from both ends',
      'In-place array modification (remove duplicates, partition)',
      'Linked list cycle detection or finding middle element'
    ],

    whenNotToUse: [
      'Two pointers works by eliminating cases that don\'t need checking. For this to work, two rules must hold:',
      '1. If a wider scope is valid, then any narrower scope within it must also be valid',
      '2. If a narrower scope is invalid, then any wider scope containing it must also be invalid',
      '',
      'Example where it FAILS: Subarray sum with negative numbers. If K=3, [1,1,1] sums to 3 (valid) but [1,1] sums to 2 (invalid) - breaks rule 1. Also, [1,1,1] sums to 3 (invalid if K=2), but [1,1,1,-1] sums to 2 (valid) - breaks rule 2.'
    ],
    
    complexity: {
      time: 'O(n) typically, O(n²) for triplet problems',
      space: 'O(1) - only pointer variables needed'
    }
  },

  decisionTree: {
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
                    result: "opposite-direction"
                  },
                  {
                    label: "Palindrome validation",
                    result: "palindrome"
                  },
                  {
                    label: "Merge two sorted arrays",
                    result: "merge-sorted"
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
                    result: "fast-slow"
                  },
                  {
                    label: "Partition by value (2-3 categories)",
                    result: "dutch-flag"
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
              result: "floyd-cycle"
            },
            {
              label: "Middle element",
              result: "find-middle"
            },
            {
              label: "Nth node from end",
              result: "nth-from-end"
            }
          ]
        }
      }
    ]
  },

  templates: [
    {
      id: 'opposite-direction',
      name: 'Opposite Direction (Converging)',
      description: 'Two pointers start at opposite ends and move toward each other. Best for sorted arrays when finding pairs.',
      java: `public int[] twoSum(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    
    while (left < right) {
        int sum = nums[left] + nums[right];
        
        if (sum == target) {
            return new int[]{left, right};
        } else if (sum < target) {
            left++;  // Need larger sum
        } else {
            right--; // Need smaller sum
        }
    }
    
    return new int[]{-1, -1}; // No pair found
}`,
      python: `def two_sum(nums: List[int], target: int) -> List[int]:
    left, right = 0, len(nums) - 1
    
    while left < right:
        current_sum = nums[left] + nums[right]
        
        if current_sum == target:
            return [left, right]
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return [-1, -1]  # No pair found`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: '[0, 1]',
        explanation: 'nums[0] + nums[1] = 2 + 7 = 9'
      }
    },
    {
      id: 'fast-slow',
      name: 'Same Direction (Fast/Slow)',
      description: 'Both pointers start at the beginning. Fast pointer explores while slow pointer tracks valid position. Best for in-place modifications.',
      java: `public int removeElement(int[] nums, int val) {
    int slow = 0;
    
    for (int fast = 0; fast < nums.length; fast++) {
        if (nums[fast] != val) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    
    return slow; // New length of array
}`,
      python: `def remove_element(nums: List[int], val: int) -> int:
    slow = 0
    
    for fast in range(len(nums)):
        if nums[fast] != val:
            nums[slow] = nums[fast]
            slow += 1
    
    return slow  # New length of array`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [3, 2, 2, 3], val = 3',
        output: '2, nums = [2, 2, _, _]',
        explanation: 'Function returns 2, first two elements are 2'
      }
    },
    {
      id: 'dutch-flag',
      name: 'Dutch National Flag (3-way partition)',
      description: 'Three pointers to partition array into three sections. Perfect for sorting 0s, 1s, 2s or similar categorization.',
      java: `public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums, low, mid);
            low++;
            mid++;
        } else if (nums[mid] == 1) {
            mid++;
        } else { // nums[mid] == 2
            swap(nums, mid, high);
            high--;
            // Don't increment mid - need to check swapped element
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}`,
      python: `def sort_colors(nums: List[int]) -> None:
    low, mid, high = 0, 0, len(nums) - 1
    
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
            # Don't increment mid - need to check swapped element`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [2, 0, 2, 1, 1, 0]',
        output: '[0, 0, 1, 1, 2, 2]',
        explanation: 'Array sorted with 0s first, then 1s, then 2s'
      }
    },
    {
      id: 'palindrome',
      name: 'Palindrome Check',
      description: 'Compare characters from both ends moving inward. Useful for string validation.',
      java: `public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    
    while (left < right) {
        // Skip non-alphanumeric characters
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) {
            left++;
        }
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) {
            right--;
        }
        
        if (Character.toLowerCase(s.charAt(left)) != 
            Character.toLowerCase(s.charAt(right))) {
            return false;
        }
        
        left++;
        right--;
    }
    
    return true;
}`,
      python: `def is_palindrome(s: str) -> bool:
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric characters
        while left < right and not s[left].isalnum():
            left += 1
        while left < right and not s[right].isalnum():
            right -= 1
        
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 's = "A man, a plan, a canal: Panama"',
        output: 'true',
        explanation: 'Ignoring non-alphanumeric, reads same forwards and backwards'
      }
    },
    {
      id: 'floyd-cycle',
      name: "Floyd's Cycle Detection (Linked List)",
      description: 'Fast pointer moves 2 steps, slow moves 1 step. If they meet, cycle exists.',
      java: `public boolean hasCycle(ListNode head) {
    if (head == null || head.next == null) return false;
    
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;        // Move 1 step
        fast = fast.next.next;   // Move 2 steps
        
        if (slow == fast) {
            return true; // Cycle detected
        }
    }
    
    return false; // No cycle
}`,
      python: `def has_cycle(head: ListNode) -> bool:
    if not head or not head.next:
        return False
    
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next        # Move 1 step
        fast = fast.next.next   # Move 2 steps
        
        if slow == fast:
            return True  # Cycle detected
    
    return False  # No cycle`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'head = [3,2,0,-4], pos = 1 (cycle at index 1)',
        output: 'true',
        explanation: 'Tail connects to node at index 1'
      }
    },
    {
      id: 'find-middle',
      name: 'Find Middle of Linked List',
      description: 'When fast reaches end, slow is at middle.',
      java: `public ListNode middleNode(ListNode head) {
    ListNode slow = head;
    ListNode fast = head;
    
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    
    return slow; // Slow is at middle
}`,
      python: `def middle_node(head: ListNode) -> ListNode:
    slow = head
    fast = head
    
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
    
    return slow  # Slow is at middle`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'head = [1, 2, 3, 4, 5]',
        output: 'Node with value 3',
        explanation: 'Middle of 5 nodes is the 3rd node'
      }
    },
    {
      id: 'nth-from-end',
      name: 'Nth Node From End',
      description: 'Create gap of n nodes between pointers, then move together.',
      java: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode fast = dummy;
    ListNode slow = dummy;
    
    // Move fast n+1 steps ahead
    for (int i = 0; i <= n; i++) {
        fast = fast.next;
    }
    
    // Move both until fast reaches end
    while (fast != null) {
        slow = slow.next;
        fast = fast.next;
    }
    
    // Skip the nth node
    slow.next = slow.next.next;
    
    return dummy.next;
}`,
      python: `def remove_nth_from_end(head: ListNode, n: int) -> ListNode:
    dummy = ListNode(0, head)
    fast = dummy
    slow = dummy
    
    # Move fast n+1 steps ahead
    for _ in range(n + 1):
        fast = fast.next
    
    # Move both until fast reaches end
    while fast:
        slow = slow.next
        fast = fast.next
    
    # Skip the nth node
    slow.next = slow.next.next
    
    return dummy.next`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'head = [1,2,3,4,5], n = 2',
        output: '[1,2,3,5]',
        explanation: 'Remove 2nd node from end (value 4)'
      }
    },
    {
      id: 'merge-sorted',
      name: 'Merge Two Sorted Arrays',
      description: 'Compare elements from both arrays and build result.',
      java: `public void merge(int[] nums1, int m, int[] nums2, int n) {
    int p1 = m - 1;    // Pointer for nums1
    int p2 = n - 1;    // Pointer for nums2
    int p = m + n - 1; // Pointer for merged position
    
    while (p2 >= 0) {
        if (p1 >= 0 && nums1[p1] > nums2[p2]) {
            nums1[p] = nums1[p1];
            p1--;
        } else {
            nums1[p] = nums2[p2];
            p2--;
        }
        p--;
    }
}`,
      python: `def merge(nums1: List[int], m: int, nums2: List[int], n: int) -> None:
    p1 = m - 1    # Pointer for nums1
    p2 = n - 1    # Pointer for nums2
    p = m + n - 1 # Pointer for merged position
    
    while p2 >= 0:
        if p1 >= 0 and nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3',
        output: '[1,2,2,3,5,6]',
        explanation: 'Merge in-place from the end'
      }
    }
  ],

  problems: [
    { name: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', tags: ['opposite direction', 'sorted array'] },
    { name: 'Valid Palindrome', difficulty: 'Easy', tags: ['string', 'opposite direction'] },
    { name: '3Sum', difficulty: 'Medium', tags: ['opposite direction', 'triplet'] },
    { name: '3Sum Closest', difficulty: 'Medium', tags: ['opposite direction', 'triplet'] },
    { name: 'Container With Most Water', difficulty: 'Medium', tags: ['opposite direction', 'greedy'] },
    { name: 'Remove Duplicates from Sorted Array', difficulty: 'Easy', tags: ['fast-slow', 'in-place'] },
    { name: 'Move Zeroes', difficulty: 'Easy', tags: ['fast-slow', 'partition'] },
    { name: 'Sort Colors', difficulty: 'Medium', tags: ['dutch flag', 'partition'] },
    { name: 'Linked List Cycle', difficulty: 'Easy', tags: ['floyd cycle', 'linked list'] },
    { name: 'Linked List Cycle II', difficulty: 'Medium', tags: ['floyd cycle', 'find cycle start'] },
    { name: 'Middle of the Linked List', difficulty: 'Easy', tags: ['fast-slow', 'linked list'] },
    { name: 'Remove Nth Node From End of List', difficulty: 'Medium', tags: ['gap technique', 'linked list'] },
    { name: 'Trapping Rain Water', difficulty: 'Hard', tags: ['opposite direction', 'optimization'] }
  ],

  mistakes: [
    {
      trap: 'Forgetting to handle edge cases (empty array, single element)',
      fix: 'Always check array length before using pointers. Add guards like: if (nums.length < 2) return result;'
    },
    {
      trap: 'Off-by-one errors with pointer boundaries',
      fix: 'Use "left < right" for opposite direction (not <=). Draw out small examples to verify bounds.'
    },
    {
      trap: 'Not skipping duplicates in 3Sum, causing duplicate triplets',
      fix: 'After finding a valid pair, skip duplicates: while (left < right && nums[left] == nums[left-1]) left++;'
    },
    {
      trap: 'In Dutch Flag, incrementing mid after swapping with high',
      fix: 'After swapping with high, do NOT increment mid - the swapped element needs to be checked.'
    },
    {
      trap: 'In linked list problems, not handling null checks',
      fix: 'Always check fast != null AND fast.next != null before accessing fast.next.next'
    }
  ],

  variations: [
    {
      name: 'Three Pointers',
      description: 'Extension for 3Sum problems. Fix one pointer, use two pointers on remaining array.'
    },
    {
      name: 'Sliding Window',
      description: 'Related technique where both pointers move in same direction with variable gap (see Sliding Window pattern).'
    },
    {
      name: 'Binary Search',
      description: 'Special case of two pointers where we always go to one half (see Binary Search pattern).'
    }
  ]
};

