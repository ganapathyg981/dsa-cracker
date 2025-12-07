export const slidingWindow = {
  id: 'sliding-window',
  title: 'Sliding Window',
  icon: '🪟',
  difficulty: 'Medium',
  
  theory: {
    overview: `The Sliding Window technique maintains a "window" of elements that slides through an array or string. Instead of recalculating from scratch for each position, we efficiently update by adding new elements and removing old ones as the window moves.

This pattern is incredibly powerful for substring/subarray problems where we need to find optimal contiguous sequences. The window can be fixed-size (always k elements) or variable-size (expand/shrink based on conditions).

The key optimization comes from the fact that consecutive windows share most elements - we only need to handle what's added and removed, reducing O(n*k) nested loops to O(n).`,
    
    keyInsight: 'Maintain a window state and update incrementally as you slide, rather than recalculating from scratch.',
    
    whenToUse: [
      'Finding max/min/average of contiguous subarrays of size k',
      'Longest/shortest substring with certain constraints',
      'String permutation or anagram problems',
      'Subarray with given sum or at most k distinct elements',
      'Any problem asking for contiguous sequence optimization'
    ],
    
    complexity: {
      time: 'O(n) - each element visited at most twice',
      space: 'O(1) to O(k) depending on what we track'
    }
  },

  decisionTree: {
    question: "Is the window size fixed or variable?",
    options: [
      {
        label: "Fixed window size K",
        result: "fixed-window"
      },
      {
        label: "Variable window (expand/shrink)",
        next: {
          question: "What constraint defines window validity?",
          options: [
            {
              label: "At most K distinct elements",
              result: "at-most-k-distinct"
            },
            {
              label: "All elements must be unique",
              result: "all-unique"
            },
            {
              label: "Must contain all required characters",
              result: "minimum-window"
            },
            {
              label: "Sum equals or at most K",
              result: "subarray-sum"
            }
          ]
        }
      }
    ]
  },

  templates: [
    {
      id: 'fixed-window',
      name: 'Fixed Size Window',
      description: 'Window maintains exactly k elements. Slide by adding one element and removing one.',
      java: `public int maxSumSubarray(int[] nums, int k) {
    int n = nums.length;
    if (n < k) return -1;
    
    // Build first window
    int windowSum = 0;
    for (int i = 0; i < k; i++) {
        windowSum += nums[i];
    }
    
    int maxSum = windowSum;
    
    // Slide the window
    for (int i = k; i < n; i++) {
        windowSum += nums[i];      // Add new element
        windowSum -= nums[i - k];  // Remove old element
        maxSum = Math.max(maxSum, windowSum);
    }
    
    return maxSum;
}`,
      python: `def max_sum_subarray(nums: List[int], k: int) -> int:
    n = len(nums)
    if n < k:
        return -1
    
    # Build first window
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, n):
        window_sum += nums[i]      # Add new element
        window_sum -= nums[i - k]  # Remove old element
        max_sum = max(max_sum, window_sum)
    
    return max_sum`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [2, 1, 5, 1, 3, 2], k = 3',
        output: '9',
        explanation: 'Subarray [5, 1, 3] has maximum sum of 9'
      }
    },
    {
      id: 'at-most-k-distinct',
      name: 'At Most K Distinct Elements',
      description: 'Expand window until constraint violated, then shrink from left until valid again.',
      java: `public int lengthOfLongestSubstringKDistinct(String s, int k) {
    if (k == 0 || s.isEmpty()) return 0;
    
    Map<Character, Integer> charCount = new HashMap<>();
    int left = 0;
    int maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        // Expand: add right character
        char rightChar = s.charAt(right);
        charCount.put(rightChar, charCount.getOrDefault(rightChar, 0) + 1);
        
        // Shrink: while we have more than k distinct
        while (charCount.size() > k) {
            char leftChar = s.charAt(left);
            charCount.put(leftChar, charCount.get(leftChar) - 1);
            if (charCount.get(leftChar) == 0) {
                charCount.remove(leftChar);
            }
            left++;
        }
        
        // Update result
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}`,
      python: `def length_of_longest_substring_k_distinct(s: str, k: int) -> int:
    if k == 0 or not s:
        return 0
    
    char_count = {}
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        # Expand: add right character
        right_char = s[right]
        char_count[right_char] = char_count.get(right_char, 0) + 1
        
        # Shrink: while we have more than k distinct
        while len(char_count) > k:
            left_char = s[left]
            char_count[left_char] -= 1
            if char_count[left_char] == 0:
                del char_count[left_char]
            left += 1
        
        # Update result
        max_len = max(max_len, right - left + 1)
    
    return max_len`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      testCase: {
        input: 's = "eceba", k = 2',
        output: '3',
        explanation: 'Longest substring with at most 2 distinct: "ece"'
      }
    },
    {
      id: 'all-unique',
      name: 'All Unique Characters (No Repeats)',
      description: 'Use HashSet to track characters in window. Shrink when duplicate found.',
      java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> seen = new HashSet<>();
    int left = 0;
    int maxLen = 0;
    
    for (int right = 0; right < s.length(); right++) {
        char rightChar = s.charAt(right);
        
        // Shrink window until no duplicate
        while (seen.contains(rightChar)) {
            seen.remove(s.charAt(left));
            left++;
        }
        
        // Add current character
        seen.add(rightChar);
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
}`,
      python: `def length_of_longest_substring(s: str) -> int:
    seen = set()
    left = 0
    max_len = 0
    
    for right in range(len(s)):
        right_char = s[right]
        
        # Shrink window until no duplicate
        while right_char in seen:
            seen.remove(s[left])
            left += 1
        
        # Add current character
        seen.add(right_char)
        max_len = max(max_len, right - left + 1)
    
    return max_len`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(min(n, alphabet_size))',
      testCase: {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'Longest substring without repeating: "abc"'
      }
    },
    {
      id: 'minimum-window',
      name: 'Minimum Window Containing All',
      description: 'Expand until all required chars found, then shrink to find minimum.',
      java: `public String minWindow(String s, String t) {
    if (s.isEmpty() || t.isEmpty()) return "";
    
    // Count required characters
    Map<Character, Integer> required = new HashMap<>();
    for (char c : t.toCharArray()) {
        required.put(c, required.getOrDefault(c, 0) + 1);
    }
    
    Map<Character, Integer> window = new HashMap<>();
    int left = 0;
    int formed = 0;  // How many unique chars have required count
    int minLen = Integer.MAX_VALUE;
    int minLeft = 0;
    
    for (int right = 0; right < s.length(); right++) {
        // Add right character
        char c = s.charAt(right);
        window.put(c, window.getOrDefault(c, 0) + 1);
        
        // Check if this char's count matches required
        if (required.containsKey(c) && 
            window.get(c).intValue() == required.get(c).intValue()) {
            formed++;
        }
        
        // Shrink while window is valid
        while (formed == required.size()) {
            // Update result
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minLeft = left;
            }
            
            // Remove left character
            char leftChar = s.charAt(left);
            window.put(leftChar, window.get(leftChar) - 1);
            if (required.containsKey(leftChar) && 
                window.get(leftChar) < required.get(leftChar)) {
                formed--;
            }
            left++;
        }
    }
    
    return minLen == Integer.MAX_VALUE ? "" : s.substring(minLeft, minLeft + minLen);
}`,
      python: `def min_window(s: str, t: str) -> str:
    if not s or not t:
        return ""
    
    from collections import Counter
    
    # Count required characters
    required = Counter(t)
    window = {}
    
    left = 0
    formed = 0  # How many unique chars have required count
    min_len = float('inf')
    result = ""
    
    for right in range(len(s)):
        # Add right character
        c = s[right]
        window[c] = window.get(c, 0) + 1
        
        # Check if this char's count matches required
        if c in required and window[c] == required[c]:
            formed += 1
        
        # Shrink while window is valid
        while formed == len(required):
            # Update result
            if right - left + 1 < min_len:
                min_len = right - left + 1
                result = s[left:right + 1]
            
            # Remove left character
            left_char = s[left]
            window[left_char] -= 1
            if left_char in required and window[left_char] < required[left_char]:
                formed -= 1
            left += 1
    
    return result`,
      timeComplexity: 'O(s + t)',
      spaceComplexity: 'O(s + t)',
      testCase: {
        input: 's = "ADOBECODEBANC", t = "ABC"',
        output: '"BANC"',
        explanation: 'Minimum window containing A, B, C is "BANC"'
      }
    },
    {
      id: 'subarray-sum',
      name: 'Subarray Sum (Positive Numbers)',
      description: 'For positive numbers, expand to increase sum, shrink to decrease sum.',
      java: `public int minSubArrayLen(int target, int[] nums) {
    int left = 0;
    int sum = 0;
    int minLen = Integer.MAX_VALUE;
    
    for (int right = 0; right < nums.length; right++) {
        sum += nums[right];  // Expand
        
        // Shrink while sum >= target
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left];
            left++;
        }
    }
    
    return minLen == Integer.MAX_VALUE ? 0 : minLen;
}`,
      python: `def min_sub_array_len(target: int, nums: List[int]) -> int:
    left = 0
    current_sum = 0
    min_len = float('inf')
    
    for right in range(len(nums)):
        current_sum += nums[right]  # Expand
        
        # Shrink while sum >= target
        while current_sum >= target:
            min_len = min(min_len, right - left + 1)
            current_sum -= nums[left]
            left += 1
    
    return min_len if min_len != float('inf') else 0`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'target = 7, nums = [2,3,1,2,4,3]',
        output: '2',
        explanation: 'Subarray [4,3] has sum >= 7 with length 2'
      }
    },
    {
      id: 'string-anagram',
      name: 'Find All Anagrams',
      description: 'Fixed window of pattern length, use char count comparison.',
      java: `public List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    if (s.length() < p.length()) return result;
    
    int[] pCount = new int[26];
    int[] sCount = new int[26];
    
    // Initialize pattern count
    for (char c : p.toCharArray()) {
        pCount[c - 'a']++;
    }
    
    int windowSize = p.length();
    
    for (int i = 0; i < s.length(); i++) {
        // Add current character
        sCount[s.charAt(i) - 'a']++;
        
        // Remove character outside window
        if (i >= windowSize) {
            sCount[s.charAt(i - windowSize) - 'a']--;
        }
        
        // Compare counts
        if (i >= windowSize - 1 && Arrays.equals(pCount, sCount)) {
            result.add(i - windowSize + 1);
        }
    }
    
    return result;
}`,
      python: `def find_anagrams(s: str, p: str) -> List[int]:
    if len(s) < len(p):
        return []
    
    from collections import Counter
    
    p_count = Counter(p)
    s_count = Counter()
    result = []
    window_size = len(p)
    
    for i in range(len(s)):
        # Add current character
        s_count[s[i]] += 1
        
        # Remove character outside window
        if i >= window_size:
            left_char = s[i - window_size]
            s_count[left_char] -= 1
            if s_count[left_char] == 0:
                del s_count[left_char]
        
        # Compare counts
        if i >= window_size - 1 and s_count == p_count:
            result.append(i - window_size + 1)
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1) - fixed alphabet size',
      testCase: {
        input: 's = "cbaebabacd", p = "abc"',
        output: '[0, 6]',
        explanation: 'Anagrams of "abc" start at index 0 ("cba") and 6 ("bac")'
      }
    }
  ],

  problems: [
    { name: 'Maximum Average Subarray I', difficulty: 'Easy', tags: ['fixed window'] },
    { name: 'Longest Substring Without Repeating Characters', difficulty: 'Medium', tags: ['variable window', 'unique chars'] },
    { name: 'Minimum Size Subarray Sum', difficulty: 'Medium', tags: ['variable window', 'sum'] },
    { name: 'Longest Repeating Character Replacement', difficulty: 'Medium', tags: ['variable window', 'at most k'] },
    { name: 'Fruit Into Baskets', difficulty: 'Medium', tags: ['at most k distinct'] },
    { name: 'Find All Anagrams in a String', difficulty: 'Medium', tags: ['fixed window', 'anagram'] },
    { name: 'Permutation in String', difficulty: 'Medium', tags: ['fixed window', 'permutation'] },
    { name: 'Minimum Window Substring', difficulty: 'Hard', tags: ['variable window', 'contains all'] },
    { name: 'Sliding Window Maximum', difficulty: 'Hard', tags: ['fixed window', 'monotonic deque'] },
    { name: 'Substring with Concatenation of All Words', difficulty: 'Hard', tags: ['fixed window', 'hash map'] }
  ],

  mistakes: [
    {
      trap: 'Using nested loops instead of maintaining window state',
      fix: 'Track window state (sum, count map, set) and update incrementally. Never recalculate from scratch.'
    },
    {
      trap: 'Off-by-one error in window size calculation',
      fix: 'Window size is right - left + 1, not right - left. Draw out indices to verify.'
    },
    {
      trap: 'Forgetting to update result before shrinking in minimum window problems',
      fix: 'Update result inside the shrinking while loop, before removing the left element.'
    },
    {
      trap: 'Not handling empty string or k=0 edge cases',
      fix: 'Add early returns: if (s.isEmpty() || k == 0) return 0;'
    },
    {
      trap: 'In anagram/permutation problems, comparing entire maps every iteration',
      fix: 'Use a "formed" counter that tracks how many unique chars have exact required count.'
    }
  ],

  variations: [
    {
      name: 'Monotonic Deque Window',
      description: 'For sliding window maximum/minimum, use a deque to maintain candidates in sorted order.'
    },
    {
      name: 'Two Sliding Windows',
      description: 'Some problems need two windows (e.g., "at most K" minus "at most K-1" = "exactly K").'
    },
    {
      name: 'Caterpillar Method',
      description: 'Alternative name for variable-size sliding window, visualized as a caterpillar stretching and contracting.'
    }
  ]
};

