export const arraysStrings = {
  id: 'arrays-strings',
  title: 'Arrays & Strings',
  icon: '🔢',
  difficulty: 'Easy-Medium',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION
  introduction: {
    realWorldAnalogy: `Think of an array like a row of lockers 🗄️ in a school hallway:
    
• Each locker has a number (index) and can hold one item (value)
• You can instantly go to locker #5 without checking lockers 1-4
• Finding a specific item? You might need to check every locker (O(n))

Now imagine you have a **sign-up sheet** (HashMap) at reception:
• Look up any name instantly - no searching required!
• That's the power of hashing - O(1) lookup

Most array problems boil down to: "Should I use extra space (HashMap) to speed things up?"`,

    simpleExplanation: `Arrays and Strings are the foundation of DSA. Before learning fancy patterns, master these basics:

**Core Operations:**
• **Traversal**: Loop through elements one by one
• **HashMap/HashSet**: Trade O(n) space for O(1) lookup
• **Frequency Counting**: Track how many times each element appears
• **Two Pointers**: Compare elements from different positions
• **Sorting**: Sometimes sorting first makes the problem easier

**When to use what:**
• Need to find pairs/duplicates → HashMap
• Need sorted order → Sort first (O(n log n))
• Need in-place modification → Two Pointers`,

    visualSteps: [
      { step: 1, title: 'Understand the Data', description: 'What type? Numbers, strings, characters?', visual: '[2, 7, 11, 15] or "anagram"' },
      { step: 2, title: 'Identify Pattern', description: 'Duplicates? Pairs? Frequency? Subarray?', visual: '🔍 What are you looking for?' },
      { step: 3, title: 'Choose Data Structure', description: 'HashSet (exists?), HashMap (count?), Sort?', visual: 'HashMap: {"a":3, "n":1, "g":1}' },
      { step: 4, title: 'Single Pass', description: 'Often one loop is enough with right structure', visual: 'for num in nums: check(num)' },
      { step: 5, title: 'Edge Cases', description: 'Empty array? Single element? Duplicates?', visual: '[], [1], [1,1,1]' },
    ],

    keyTakeaway: '💡 Most array problems: "Can I trade O(n) space for O(1) lookup time?" HashMap is your best friend for turning O(n²) brute force into O(n).',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'find duplicates',
      'two sum / pair with target',
      'anagram',
      'frequency count',
      'group by property',
      'product except self',
      'maximum/minimum subarray sum',
      'largest/smallest contiguous sum',
      'consecutive sequence',
      'best subarray',
    ],
    problemCharacteristics: [
      'Need to check if element exists → HashSet',
      'Need to count occurrences → HashMap/Counter',
      'Need to find complement (target - current) → HashMap',
      'Compare two strings character by character → Frequency array',
      'Find max/min sum of ANY contiguous subarray (with negatives) → Kadane\'s algorithm',
      'Find max/min sum of EXACTLY K elements → Sliding Window',
      'Subarray with exact sum K (with negatives) → Prefix Sum + HashMap',
    ],
    startHere: [
      'Arrays & Strings is the BEST starting point for beginners',
      'Master HashSet and HashMap before other patterns',
      'Practice frequency counting - it appears everywhere',
      'Understand when to use Kadane\'s vs Sliding Window vs Prefix Sum',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'two-pointers', relationship: 'Two pointers for sorted arrays or in-place modifications' },
    { id: 'sliding-window', relationship: 'Sliding window for FIXED-size or specific constraint subarray problems (works best with positives). For MAX/MIN sum with negatives, use Kadane\'s instead.' },
    { id: 'prefix-sum', relationship: 'Prefix sum + HashMap for EXACT subarray sum with negative numbers. Kadane\'s finds MAX/MIN, prefix sum finds EXACT.' },
    { id: 'binary-search', relationship: 'Binary search when array is sorted' },
    { id: 'dynamic-programming', relationship: 'Kadane\'s is a specialized DP algorithm (optimal substructure: max ending here = max(current, max_so_far + current))' },
  ],
  
  theory: {
    overview: `Arrays and strings are the most fundamental data structures. They store elements in contiguous memory, allowing O(1) random access. Most interview problems start with array/string manipulation before applying more complex patterns.

Key operations include iteration, comparison, sorting, and hashing. Understanding when to use a HashMap vs HashSet for frequency counting and existence checks is crucial. String manipulation often involves character arrays, two pointers, or building results with StringBuilder.

Master the basics: traversal, in-place modification, and common idioms like frequency maps before moving to advanced patterns.`,
    
    keyInsight: 'Use HashMaps for O(1) lookup/counting, sort when order helps reveal patterns, and consider space-time tradeoffs.',
    
    subarrayPatternsComparison: {
      title: '🎯 CRITICAL: When to use what for Subarray Problems',
      patterns: [
        {
          name: "Kadane's Algorithm",
          useWhen: [
            "Find MAX/MIN sum of ANY contiguous subarray",
            "Array contains NEGATIVE numbers",
            "Window size is VARIABLE and unknown",
            "Don't care about exact size, just optimal sum"
          ],
          doesNotWorkWhen: [
            "Need EXACT sum (not max/min)",
            "Window size is FIXED (use Sliding Window)",
            "Need to count subarrays (use Prefix Sum + HashMap)"
          ],
          example: "Maximum Subarray: [-2,1,-3,4,-1,2,1,-5,4] → [4,-1,2,1] = 6",
          complexity: "O(n) time, O(1) space"
        },
        {
          name: "Sliding Window",
          useWhen: [
            "Window has FIXED size K",
            "Specific constraints (at most K distinct, all unique)",
            "Array has POSITIVE numbers and sum constraint",
            "Can incrementally update state"
          ],
          doesNotWorkWhen: [
            "Array has negatives AND need exact sum",
            "Window size is completely variable",
            "Can't maintain validity incrementally"
          ],
          example: "Max sum of any 3 consecutive: [2,1,5,1,3,2] → [5,1,3] = 9",
          complexity: "O(n) time, O(1) to O(k) space"
        },
        {
          name: "Prefix Sum + HashMap",
          useWhen: [
            "Need EXACT sum K (not max/min)",
            "Array has NEGATIVE numbers",
            "Count how many subarrays have sum K",
            "Find if subarray with sum K exists"
          ],
          doesNotWorkWhen: [
            "Just need max/min (use Kadane's)",
            "Window size is fixed (use Sliding Window)"
          ],
          example: "Count subarrays with sum K=7: [3,4,7,2,-3,1,4] → 4 subarrays",
          complexity: "O(n) time, O(n) space"
        }
      ],
      quickDecision: `
┌─────────────────────────────────────────────────────────────┐
│ QUICK DECISION GUIDE                                        │
├─────────────────────────────────────────────────────────────┤
│ "Maximum/minimum sum of subarray"                           │
│ + Array has negatives → KADANE'S ✓                         │
│                                                             │
│ "Subarray with exact sum K"                                │
│ + Array has negatives → PREFIX SUM + HASHMAP ✓             │
│                                                             │
│ "Max sum of exactly K elements"                            │
│ → SLIDING WINDOW (fixed) ✓                                 │
│                                                             │
│ "Longest subarray with at most K distinct"                 │
│ → SLIDING WINDOW (variable) ✓                              │
│                                                             │
│ "Minimum length subarray with sum >= K"                    │
│ + All positive numbers → SLIDING WINDOW ✓                  │
│ + Has negatives → can't use window, try other approaches   │
└─────────────────────────────────────────────────────────────┘`
    },
    
    whenToUse: [
      'Counting frequencies of elements',
      'Finding duplicates or unique elements',
      'Grouping elements by some property',
      'Checking if two strings are anagrams',
      'Finding pairs or triplets with specific sum',
      'In-place array manipulation',
      'Finding maximum/minimum subarray sum (Kadane\'s)'
    ],
    
    complexity: {
      time: 'O(n) for single pass, O(n log n) with sorting',
      space: 'O(n) with HashMap, O(1) for in-place'
    }
  },

  decisionTree: {
    question: "What are you trying to do?",
    options: [
      {
        label: "Find if element(s) exist or count frequency",
        next: {
          question: "What's the constraint?",
          options: [
            { label: "Need O(1) lookup time", result: "hash-set-map" },
            { label: "Array is sorted", result: "binary-search" }
          ]
        }
      },
      {
        label: "Check if two strings are anagrams/permutations",
        result: "frequency-count"
      },
      {
        label: "Group elements by some property",
        result: "hash-grouping"
      },
      {
        label: "Find optimal contiguous subarray (sum/product)",
        next: {
          question: "What's the specific requirement?",
          options: [
            { 
              label: "Maximum/minimum sum of ANY subarray (array has negatives)", 
              result: "kadane",
              explanation: "Kadane's handles variable-size windows and negative numbers"
            },
            { 
              label: "Maximum/minimum sum of EXACTLY K consecutive elements", 
              result: "sliding-window",
              explanation: "Fixed-size sliding window - see Sliding Window pattern"
            },
            { 
              label: "Count subarrays with EXACT sum K (array has negatives)", 
              result: "prefix-sum-hash",
              explanation: "Prefix Sum + HashMap - see Prefix Sum pattern"
            },
            { 
              label: "Minimum length subarray with sum >= K (all positive)", 
              result: "sliding-window",
              explanation: "Variable sliding window - see Sliding Window pattern"
            }
          ]
        }
      }
    ]
  },

  templates: [
    {
      id: 'hash-set-map',
      name: 'Hash Set / Hash Map for Lookup',
      description: 'O(1) lookup for existence check or frequency counting.',
      java: `// Check existence with HashSet
Set<Integer> seen = new HashSet<>();
for (int num : nums) {
    if (seen.contains(target - num)) {
        return true; // Found pair!
    }
    seen.add(num);
}

// Count frequency with HashMap
Map<Integer, Integer> freq = new HashMap<>();
for (int num : nums) {
    freq.put(num, freq.getOrDefault(num, 0) + 1);
}`,
      python: `# Check existence with set
seen = set()
for num in nums:
    if target - num in seen:
        return True  # Found pair!
    seen.add(num)

# Count frequency with Counter
from collections import Counter
freq = Counter(nums)
# or manually:
freq = {}
for num in nums:
    freq[num] = freq.get(num, 0) + 1`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [2, 7, 11, 15], target = 9',
        output: 'true (indices [0, 1])',
        explanation: '2 + 7 = 9, found using hash set'
      }
    },
    {
      id: 'frequency-count',
      name: 'Frequency Count for Anagrams',
      description: 'Compare character frequencies to check anagrams.',
      java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    
    int[] count = new int[26];
    
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    
    for (int c : count) {
        if (c != 0) return false;
    }
    return true;
}`,
      python: `def is_anagram(s: str, t: str) -> bool:
    if len(s) != len(t):
        return False
    
    # Using Counter
    from collections import Counter
    return Counter(s) == Counter(t)
    
    # Or using array for lowercase letters only
    count = [0] * 26
    for i in range(len(s)):
        count[ord(s[i]) - ord('a')] += 1
        count[ord(t[i]) - ord('a')] -= 1
    
    return all(c == 0 for c in count)`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) for fixed alphabet',
      testCase: {
        input: 's = "anagram", t = "nagaram"',
        output: 'true',
        explanation: 'Both have same character frequencies'
      }
    },
    {
      id: 'hash-grouping',
      name: 'Group by Property (Group Anagrams)',
      description: 'Use sorted string or frequency tuple as key to group.',
      java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> groups = new HashMap<>();
    
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        
        groups.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    
    return new ArrayList<>(groups.values());
}`,
      python: `def group_anagrams(strs: List[str]) -> List[List[str]]:
    from collections import defaultdict
    
    groups = defaultdict(list)
    
    for s in strs:
        # Use sorted string as key
        key = ''.join(sorted(s))
        # Or use tuple of counts: tuple(Counter(s).items())
        groups[key].append(s)
    
    return list(groups.values())`,
      timeComplexity: 'O(n * k log k) where k is max string length',
      spaceComplexity: 'O(n * k)',
      testCase: {
        input: 'strs = ["eat","tea","tan","ate","nat","bat"]',
        output: '[["eat","tea","ate"],["tan","nat"],["bat"]]',
        explanation: 'Grouped by sorted characters'
      }
    },
    {
      id: 'kadane',
      name: "Kadane's Algorithm (Maximum Subarray Sum)",
      description: `At each position, decide: "Should I extend my current subarray or start fresh from here?"
      
KEY INSIGHT: If current_sum becomes negative, it will only HURT future subarrays, so abandon it and start over.

WHY KADANE'S vs SLIDING WINDOW?
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
WHEN TO USE KADANE'S:
✓ Finding MAXIMUM/MINIMUM sum of ANY contiguous subarray (variable size)
✓ Array can contain NEGATIVE numbers
✓ Don't know the optimal window size in advance
✓ Need to track "best so far" across ALL possible windows

Example: [-2, 1, -3, 4, -1, 2, 1, -5, 4]
→ Best subarray: [4, -1, 2, 1] = 6

WHEN TO USE SLIDING WINDOW:
✓ FIXED window size (e.g., "max sum of exactly K elements")
✓ Specific constraints (e.g., "at most K distinct", "all unique")
✓ Array has only POSITIVE numbers and you know target sum
✓ Can incrementally update window state

Example: Find max sum of any 3 consecutive elements
[2, 1, 5, 1, 3, 2] → [5, 1, 3] = 9

CRITICAL DIFFERENCE:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Kadane's: Window size changes dynamically, can "reset" and start fresh
Sliding Window: Window size is fixed or has specific constraints

WHEN BOTH FAIL:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
If you need subarray with EXACT sum K and array has NEGATIVES
→ Use Prefix Sum + HashMap (neither Kadane's nor Sliding Window works!)

HOW KADANE'S WORKS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
At each element, ask: "Is it better to ADD this to my current subarray, 
or START FRESH from this element?"

current_sum = max(nums[i], current_sum + nums[i])
              ↑            ↑
         start fresh   extend current

If current_sum < 0, it's baggage - drop it!
Keep track of the maximum sum seen at any point.`,
      
      java: `public int maxSubArray(int[] nums) {
    // Edge case: empty array
    if (nums.length == 0) return 0;
    
    int maxSum = nums[0];      // Best sum found so far
    int currentSum = nums[0];  // Sum of current subarray
    
    for (int i = 1; i < nums.length; i++) {
        // KEY DECISION: Extend current subarray OR start fresh?
        // If currentSum is negative, starting fresh is always better
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        
        // Update global maximum
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// VARIATION 1: Return the actual subarray indices
public int[] maxSubArrayIndices(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    int start = 0, end = 0, tempStart = 0;
    
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] > currentSum + nums[i]) {
            currentSum = nums[i];
            tempStart = i;  // Potential new start
        } else {
            currentSum = currentSum + nums[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return new int[]{start, end, maxSum};
}

// VARIATION 2: Maximum circular subarray (Kadane's + twist)
public int maxCircularSubarray(int[] nums) {
    // Case 1: Maximum is in middle (regular Kadane's)
    int maxKadane = kadane(nums);
    
    // Case 2: Maximum wraps around (total - minimum subarray)
    int totalSum = 0;
    for (int i = 0; i < nums.length; i++) {
        totalSum += nums[i];
        nums[i] = -nums[i];  // Invert for min subarray
    }
    
    int maxWrap = totalSum + kadane(nums);  // total - min
    
    // Edge case: All negative numbers
    return maxWrap == 0 ? maxKadane : Math.max(maxKadane, maxWrap);
}

private int kadane(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`,
      
      python: `def max_sub_array(nums: List[int]) -> int:
    """
    Kadane's Algorithm: Find maximum sum contiguous subarray
    
    Intuition: At each position, decide whether to:
    1. Extend the current subarray (add current element)
    2. Start a new subarray from current element
    
    If current_sum is negative, it will hurt future sums, so reset!
    """
    if not nums:
        return 0
    
    max_sum = nums[0]      # Best sum found globally
    current_sum = nums[0]  # Sum of current subarray
    
    for i in range(1, len(nums)):
        # KEY DECISION: Should I add to current or start fresh?
        current_sum = max(nums[i], current_sum + nums[i])
        
        # Update global maximum
        max_sum = max(max_sum, current_sum)
    
    return max_sum


def max_sub_array_with_indices(nums: List[int]) -> tuple:
    """Return (start_idx, end_idx, max_sum)"""
    max_sum = nums[0]
    current_sum = nums[0]
    start = end = 0
    temp_start = 0
    
    for i in range(1, len(nums)):
        if nums[i] > current_sum + nums[i]:
            current_sum = nums[i]
            temp_start = i  # Potential new start
        else:
            current_sum = current_sum + nums[i]
        
        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i
    
    return (start, end, max_sum)


def max_circular_subarray(nums: List[int]) -> int:
    """
    Maximum subarray sum in circular array
    Two cases:
    1. Max subarray is in middle (regular Kadane's)
    2. Max subarray wraps around = total_sum - min_subarray
    """
    def kadane(arr):
        max_sum = curr = arr[0]
        for i in range(1, len(arr)):
            curr = max(arr[i], curr + arr[i])
            max_sum = max(max_sum, curr)
        return max_sum
    
    # Case 1: Regular maximum subarray
    max_kadane = kadane(nums)
    
    # Case 2: Circular maximum = total - minimum subarray
    total_sum = sum(nums)
    max_wrap = total_sum - kadane([-x for x in nums])
    
    # Edge case: All numbers are negative
    return max_kadane if max_wrap == 0 else max(max_kadane, max_wrap)


# STEP-BY-STEP TRACE for [-2, 1, -3, 4, -1, 2, 1, -5, 4]:
# i=0: current=-2,  max=-2   [start at -2]
# i=1: current=1,   max=1    [start fresh at 1, drop -2]
# i=2: current=-2,  max=1    [extend: 1+-3=-2]
# i=3: current=4,   max=4    [start fresh at 4, drop -2]
# i=4: current=3,   max=4    [extend: 4+-1=3]
# i=5: current=5,   max=5    [extend: 3+2=5]
# i=6: current=6,   max=6    [extend: 5+1=6] ← WINNER
# i=7: current=1,   max=6    [extend: 6+-5=1]
# i=8: current=5,   max=6    [extend: 1+4=5]
# Answer: 6, subarray = [4,-1,2,1]`,
      
      timeComplexity: 'O(n) - single pass through array',
      spaceComplexity: 'O(1) - only two variables',
      
      testCase: {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: `Subarray [4,-1,2,1] has maximum sum = 6

Step-by-step:
- At -2: current_sum = -2 (start)
- At 1: current_sum = 1 (drop -2, start fresh)
- At -3: current_sum = -2 (extend 1 + -3)
- At 4: current_sum = 4 (drop -2, start fresh) ← new subarray begins
- At -1: current_sum = 3 (extend 4 + -1)
- At 2: current_sum = 5 (extend 3 + 2)
- At 1: current_sum = 6 (extend 5 + 1) ← maximum!
- At -5: current_sum = 1 (extend 6 + -5)
- At 4: current_sum = 5 (extend 1 + 4)`
      }
    }
  ],

  problems: [
    { name: 'Two Sum', difficulty: 'Easy', tags: ['hash map', 'complement'] },
    { name: 'Contains Duplicate', difficulty: 'Easy', tags: ['hash set'] },
    { name: 'Valid Anagram', difficulty: 'Easy', tags: ['frequency count'] },
    { name: 'Group Anagrams', difficulty: 'Medium', tags: ['hash grouping'] },
    { name: 'Top K Frequent Elements', difficulty: 'Medium', tags: ['hash map', 'bucket sort'] },
    { name: 'Maximum Subarray', difficulty: 'Medium', tags: ['kadane', 'must-know'] },
    { name: 'Maximum Product Subarray', difficulty: 'Medium', tags: ['kadane variation', 'track min/max'] },
    { name: 'Maximum Sum Circular Subarray', difficulty: 'Medium', tags: ['kadane variation'] },
    { name: 'Encode and Decode Strings', difficulty: 'Medium', tags: ['string manipulation'] },
    { name: 'Longest Consecutive Sequence', difficulty: 'Medium', tags: ['hash set', 'sequence'] },
    { name: 'Best Time to Buy and Sell Stock', difficulty: 'Easy', tags: ['kadane variation', 'min tracking'] },
    { name: 'First Missing Positive', difficulty: 'Hard', tags: ['index as hash'] }
  ],

  mistakes: [
    {
      trap: 'Using nested loops O(n²) when HashMap can solve in O(n)',
      fix: 'Ask: "Can I use extra space to reduce time?" HashMap trades O(n) space for O(1) lookup.'
    },
    {
      trap: 'Using Sliding Window for "maximum subarray sum" with negative numbers',
      fix: 'Sliding Window FAILS with negatives for max sum problems. Use Kadane\'s Algorithm instead! Sliding Window only works when you can safely shrink/expand (positives only or fixed size).'
    },
    {
      trap: 'Using Kadane\'s for "subarray with exact sum K"',
      fix: 'Kadane\'s finds MAX/MIN sum, not exact sum. For exact sum with negatives, use Prefix Sum + HashMap.'
    },
    {
      trap: 'In Kadane\'s, forgetting to handle all-negative arrays',
      fix: 'Initialize both maxSum and currentSum to nums[0], not to 0. This ensures negative values are handled correctly.'
    },
    {
      trap: 'Not understanding WHY Kadane\'s resets: "Why drop negative sum?"',
      fix: 'Key insight: If current_sum < 0, it will only HURT future sums. Better to start fresh. Example: if current=-5 and next=3, taking just 3 is better than -5+3=-2.'
    },
    {
      trap: 'Modifying array while iterating over it',
      fix: 'Either iterate backwards, use separate output array, or use two-pointer in-place techniques.'
    },
    {
      trap: 'Not handling empty strings or arrays',
      fix: 'Add early return: if (arr.length == 0) return defaultValue;'
    },
    {
      trap: 'String concatenation in loop creating O(n²) complexity',
      fix: 'Use StringBuilder in Java or join list at end in Python.'
    }
  ],

  variations: [
    {
      name: "Kadane's for Maximum Product Subarray",
      description: 'Track both max and min (negatives can flip to max when multiplied by negative). maxProduct = max(nums[i], maxSoFar * nums[i], minSoFar * nums[i])'
    },
    {
      name: "Kadane's for Circular Arrays",
      description: 'Maximum can wrap around. Answer = max(normal Kadane\'s, totalSum - minSubarray). See template for details.'
    },
    {
      name: 'Prefix Sum + HashMap',
      description: 'For exact subarray sum with negatives. Store cumulative sums in HashMap. If (currentSum - target) exists, found subarray. See Prefix Sum pattern.'
    },
    {
      name: 'Two Pointers',
      description: 'When array is sorted, two pointers can replace HashMap. See Two Pointers pattern.'
    },
    {
      name: 'Bucket Sort',
      description: 'When values are bounded, use array indices as implicit hash for O(n) sorting.'
    }
  ]
};

