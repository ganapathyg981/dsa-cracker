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
      'subarray sum',
      'consecutive sequence',
    ],
    problemCharacteristics: [
      'Need to check if element exists → HashSet',
      'Need to count occurrences → HashMap/Counter',
      'Need to find complement (target - current) → HashMap',
      'Compare two strings character by character → Frequency array',
      'Find max/min subarray → Kadane\'s algorithm',
    ],
    startHere: [
      'Arrays & Strings is the BEST starting point for beginners',
      'Master HashSet and HashMap before other patterns',
      'Practice frequency counting - it appears everywhere',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'two-pointers', relationship: 'Two pointers for sorted arrays or in-place modifications' },
    { id: 'sliding-window', relationship: 'Sliding window for contiguous subarray problems' },
    { id: 'prefix-sum', relationship: 'Prefix sum for range sum queries' },
    { id: 'binary-search', relationship: 'Binary search when array is sorted' },
  ],
  
  theory: {
    overview: `Arrays and strings are the most fundamental data structures. They store elements in contiguous memory, allowing O(1) random access. Most interview problems start with array/string manipulation before applying more complex patterns.

Key operations include iteration, comparison, sorting, and hashing. Understanding when to use a HashMap vs HashSet for frequency counting and existence checks is crucial. String manipulation often involves character arrays, two pointers, or building results with StringBuilder.

Master the basics: traversal, in-place modification, and common idioms like frequency maps before moving to advanced patterns.`,
    
    keyInsight: 'Use HashMaps for O(1) lookup/counting, sort when order helps reveal patterns, and consider space-time tradeoffs.',
    
    whenToUse: [
      'Counting frequencies of elements',
      'Finding duplicates or unique elements',
      'Grouping elements by some property',
      'Checking if two strings are anagrams',
      'Finding pairs or triplets with specific sum',
      'In-place array manipulation'
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
        label: "Find maximum/minimum subarray",
        result: "kadane"
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
      name: "Kadane's Algorithm (Maximum Subarray)",
      description: 'Track current sum and global max, reset when current goes negative.',
      java: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0];
    int currentSum = nums[0];
    
    for (int i = 1; i < nums.length; i++) {
        // Either extend current subarray or start fresh
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}`,
      python: `def max_sub_array(nums: List[int]) -> int:
    max_sum = nums[0]
    current_sum = nums[0]
    
    for i in range(1, len(nums)):
        # Either extend current subarray or start fresh
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    
    return max_sum`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [-2,1,-3,4,-1,2,1,-5,4]',
        output: '6',
        explanation: 'Subarray [4,-1,2,1] has the largest sum'
      }
    }
  ],

  problems: [
    { name: 'Two Sum', difficulty: 'Easy', tags: ['hash map', 'complement'] },
    { name: 'Contains Duplicate', difficulty: 'Easy', tags: ['hash set'] },
    { name: 'Valid Anagram', difficulty: 'Easy', tags: ['frequency count'] },
    { name: 'Group Anagrams', difficulty: 'Medium', tags: ['hash grouping'] },
    { name: 'Top K Frequent Elements', difficulty: 'Medium', tags: ['hash map', 'bucket sort'] },
    { name: 'Product of Array Except Self', difficulty: 'Medium', tags: ['prefix product'] },
    { name: 'Maximum Subarray', difficulty: 'Medium', tags: ['kadane'] },
    { name: 'Encode and Decode Strings', difficulty: 'Medium', tags: ['string manipulation'] },
    { name: 'Longest Consecutive Sequence', difficulty: 'Medium', tags: ['hash set', 'sequence'] },
    { name: 'First Missing Positive', difficulty: 'Hard', tags: ['index as hash'] }
  ],

  mistakes: [
    {
      trap: 'Using nested loops O(n²) when HashMap can solve in O(n)',
      fix: 'Ask: "Can I use extra space to reduce time?" HashMap trades O(n) space for O(1) lookup.'
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
      name: 'Prefix Sum',
      description: 'Precompute cumulative sums for O(1) range queries. See Prefix Sum pattern.'
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

