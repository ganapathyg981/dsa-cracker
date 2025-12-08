// Comprehensive problem details with LeetCode URLs, descriptions, hints, and solutions
// This file enhances the basic problem data from pattern files

export const problemDetails = {
  // ==================== TWO POINTERS ====================
  'Two Sum II - Input Array Is Sorted': {
    leetcodeUrl: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
    category: 'Foundation',
    priority: 1,
    description: 'Given a 1-indexed array of integers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number.',
    examples: [
      { input: 'numbers = [2,7,11,15], target = 9', output: '[1,2]', explanation: 'The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.' },
    ],
    hints: [
      'The array is sorted - this is key information!',
      'Use two pointers at opposite ends',
      'If sum is too small, move left pointer right. If too big, move right pointer left.',
    ],
    solution: {
      approach: 'Two pointers converging from both ends. If sum < target, increase left. If sum > target, decrease right.',
      java: `public int[] twoSum(int[] numbers, int target) {
    int left = 0, right = numbers.length - 1;
    while (left < right) {
        int sum = numbers[left] + numbers[right];
        if (sum == target) return new int[]{left + 1, right + 1};
        else if (sum < target) left++;
        else right--;
    }
    return new int[]{-1, -1};
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Valid Palindrome': {
    leetcodeUrl: 'https://leetcode.com/problems/valid-palindrome/',
    category: 'Foundation',
    priority: 2,
    description: 'Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.',
    examples: [
      { input: 's = "A man, a plan, a canal: Panama"', output: 'true', explanation: '"amanaplanacanalpanama" is a palindrome.' },
      { input: 's = "race a car"', output: 'false', explanation: '"raceacar" is not a palindrome.' },
    ],
    hints: [
      'Two pointers from both ends',
      'Skip non-alphanumeric characters',
      'Compare characters case-insensitively',
    ],
    solution: {
      approach: 'Use two pointers from both ends, skip non-alphanumeric chars, compare lowercase.',
      java: `public boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        while (left < right && !Character.isLetterOrDigit(s.charAt(left))) left++;
        while (left < right && !Character.isLetterOrDigit(s.charAt(right))) right--;
        if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right)))
            return false;
        left++;
        right--;
    }
    return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  '3Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/3sum/',
    category: 'Core',
    priority: 3,
    description: 'Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.',
    examples: [
      { input: 'nums = [-1,0,1,2,-1,-4]', output: '[[-1,-1,2],[-1,0,1]]', explanation: 'Two unique triplets sum to zero.' },
    ],
    hints: [
      'Sort the array first',
      'Fix one element, then use two pointers for the remaining sum',
      'Skip duplicates to avoid duplicate triplets',
    ],
    solution: {
      approach: 'Sort array. Fix one element i, use two pointers for remaining two. Skip duplicates.',
      java: `public List<List<Integer>> threeSum(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < nums.length - 2; i++) {
        if (i > 0 && nums[i] == nums[i-1]) continue; // skip duplicates
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.add(Arrays.asList(nums[i], nums[left], nums[right]));
                while (left < right && nums[left] == nums[left+1]) left++;
                while (left < right && nums[right] == nums[right-1]) right--;
                left++; right--;
            } else if (sum < 0) left++;
            else right--;
        }
    }
    return result;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
    },
  },

  '3Sum Closest': {
    leetcodeUrl: 'https://leetcode.com/problems/3sum-closest/',
    category: 'Core',
    priority: 4,
    description: 'Given an integer array nums and an integer target, find three integers in nums such that the sum is closest to target.',
    examples: [
      { input: 'nums = [-1,2,1,-4], target = 1', output: '2', explanation: 'The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).' },
    ],
    hints: [
      'Sort the array first',
      'Fix one element, use two pointers for the rest',
      'Track the closest sum seen so far',
    ],
    solution: {
      approach: 'Sort array. Fix one element, use two pointers. Track minimum difference from target.',
      java: `public int threeSumClosest(int[] nums, int target) {
    Arrays.sort(nums);
    int closest = nums[0] + nums[1] + nums[2];
    for (int i = 0; i < nums.length - 2; i++) {
        int left = i + 1, right = nums.length - 1;
        while (left < right) {
            int sum = nums[i] + nums[left] + nums[right];
            if (Math.abs(sum - target) < Math.abs(closest - target)) {
                closest = sum;
            }
            if (sum < target) left++;
            else if (sum > target) right--;
            else return sum;
        }
    }
    return closest;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
    },
  },

  'Container With Most Water': {
    leetcodeUrl: 'https://leetcode.com/problems/container-with-most-water/',
    category: 'Core',
    priority: 5,
    description: 'Find two lines that together with the x-axis forms a container, such that the container contains the most water.',
    examples: [
      { input: 'height = [1,8,6,2,5,4,8,3,7]', output: '49', explanation: 'Max area between index 1 (height 8) and index 8 (height 7): min(8,7) × 7 = 49' },
    ],
    hints: [
      'Area = min(height[left], height[right]) × (right - left)',
      'Start with widest container (both ends)',
      'Move the pointer with smaller height inward',
    ],
    solution: {
      approach: 'Two pointers at both ends. Always move the shorter line inward since that limits area.',
      java: `public int maxArea(int[] height) {
    int left = 0, right = height.length - 1, maxArea = 0;
    while (left < right) {
        int area = Math.min(height[left], height[right]) * (right - left);
        maxArea = Math.max(maxArea, area);
        if (height[left] < height[right]) left++;
        else right--;
    }
    return maxArea;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Remove Duplicates from Sorted Array': {
    leetcodeUrl: 'https://leetcode.com/problems/remove-duplicates-from-sorted-array/',
    category: 'Foundation',
    priority: 1,
    description: 'Remove duplicates in-place such that each unique element appears only once. Return the new length.',
    examples: [
      { input: 'nums = [1,1,2]', output: '2, nums = [1,2,_]', explanation: 'Return 2, with first two elements being 1 and 2.' },
    ],
    hints: [
      'Use slow/fast pointer technique',
      'Slow pointer marks position for next unique element',
      'Fast pointer scans through array',
    ],
    solution: {
      approach: 'Slow pointer tracks unique position, fast pointer finds next unique element.',
      java: `public int removeDuplicates(int[] nums) {
    if (nums.length == 0) return 0;
    int slow = 1;
    for (int fast = 1; fast < nums.length; fast++) {
        if (nums[fast] != nums[fast - 1]) {
            nums[slow] = nums[fast];
            slow++;
        }
    }
    return slow;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Move Zeroes': {
    leetcodeUrl: 'https://leetcode.com/problems/move-zeroes/',
    category: 'Foundation',
    priority: 2,
    description: 'Move all 0s to the end of array while maintaining the relative order of the non-zero elements.',
    examples: [
      { input: 'nums = [0,1,0,3,12]', output: '[1,3,12,0,0]', explanation: 'Non-zero elements maintain order.' },
    ],
    hints: [
      'Use slow/fast pointer technique',
      'Slow pointer tracks position for next non-zero',
      'Fast pointer finds non-zero elements',
    ],
    solution: {
      java: `public void moveZeroes(int[] nums) {
    int slow = 0;
    for (int fast = 0; fast < nums.length; fast++) {
        if (nums[fast] != 0) {
            int temp = nums[slow];
            nums[slow] = nums[fast];
            nums[fast] = temp;
            slow++;
        }
    }
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Sort Colors': {
    leetcodeUrl: 'https://leetcode.com/problems/sort-colors/',
    category: 'Core',
    priority: 4,
    description: 'Sort array with 0s, 1s, and 2s in-place without using library sort function.',
    examples: [
      { input: 'nums = [2,0,2,1,1,0]', output: '[0,0,1,1,2,2]', explanation: 'Dutch National Flag algorithm.' },
    ],
    hints: [
      'Use Dutch National Flag algorithm with 3 pointers',
      'low pointer: boundary for 0s',
      'high pointer: boundary for 2s',
      'mid pointer: current element being examined',
    ],
    solution: {
      approach: 'Three pointers: low (0s boundary), mid (current), high (2s boundary). Swap to partition.',
      java: `public void sortColors(int[] nums) {
    int low = 0, mid = 0, high = nums.length - 1;
    while (mid <= high) {
        if (nums[mid] == 0) {
            swap(nums, low++, mid++);
        } else if (nums[mid] == 1) {
            mid++;
        } else {
            swap(nums, mid, high--);
        }
    }
}

private void swap(int[] nums, int i, int j) {
    int temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Linked List Cycle': {
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle/',
    category: 'Foundation',
    priority: 3,
    description: 'Given head, determine if the linked list has a cycle in it.',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'true', explanation: 'There is a cycle where tail connects to the 1st node (0-indexed).' },
    ],
    hints: [
      'Floyd\'s cycle detection: fast and slow pointers',
      'Fast moves 2 steps, slow moves 1 step',
      'If they meet, there\'s a cycle',
    ],
    solution: {
      java: `public boolean hasCycle(ListNode head) {
    if (head == null) return false;
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) return true;
    }
    return false;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Linked List Cycle II': {
    leetcodeUrl: 'https://leetcode.com/problems/linked-list-cycle-ii/',
    category: 'Core',
    priority: 5,
    description: 'Given a linked list, return the node where the cycle begins. If no cycle, return null.',
    examples: [
      { input: 'head = [3,2,0,-4], pos = 1', output: 'Node at index 1', explanation: 'Tail connects to node at index 1.' },
    ],
    hints: [
      'First detect if cycle exists using Floyd\'s algorithm',
      'Once detected, reset one pointer to head',
      'Move both pointers one step at a time - they meet at cycle start',
    ],
    solution: {
      approach: 'Floyd\'s algorithm: detect cycle, then reset one pointer to head. They meet at cycle start.',
      java: `public ListNode detectCycle(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
        if (slow == fast) {
            slow = head;
            while (slow != fast) {
                slow = slow.next;
                fast = fast.next;
            }
            return slow;
        }
    }
    return null;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Middle of the Linked List': {
    leetcodeUrl: 'https://leetcode.com/problems/middle-of-the-linked-list/',
    category: 'Foundation',
    priority: 2,
    description: 'Given the head of a singly linked list, return the middle node. If two middle nodes, return the second.',
    examples: [
      { input: 'head = [1,2,3,4,5]', output: 'Node with value 3', explanation: 'Middle of list with 5 nodes.' },
    ],
    hints: [
      'Use slow and fast pointer technique',
      'Fast moves 2 steps, slow moves 1 step',
      'When fast reaches end, slow is at middle',
    ],
    solution: {
      approach: 'Fast pointer moves twice as fast as slow. When fast reaches end, slow is at middle.',
      java: `public ListNode middleNode(ListNode head) {
    ListNode slow = head, fast = head;
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;
    }
    return slow;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Remove Nth Node From End of List': {
    leetcodeUrl: 'https://leetcode.com/problems/remove-nth-node-from-end-of-list/',
    category: 'Core',
    priority: 4,
    description: 'Remove the nth node from the end of the list and return its head.',
    examples: [
      { input: 'head = [1,2,3,4,5], n = 2', output: '[1,2,3,5]', explanation: 'Remove 4 (2nd from end).' },
    ],
    hints: [
      'Use two pointers with n nodes gap between them',
      'When fast reaches end, slow is just before target',
      'Use dummy node to handle edge case of removing head',
    ],
    solution: {
      approach: 'Create gap of n nodes between fast and slow. When fast reaches end, slow.next is the target.',
      java: `public ListNode removeNthFromEnd(ListNode head, int n) {
    ListNode dummy = new ListNode(0, head);
    ListNode fast = dummy, slow = dummy;
    for (int i = 0; i <= n; i++) {
        fast = fast.next;
    }
    while (fast != null) {
        slow = slow.next;
        fast = fast.next;
    }
    slow.next = slow.next.next;
    return dummy.next;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Trapping Rain Water': {
    leetcodeUrl: 'https://leetcode.com/problems/trapping-rain-water/',
    category: 'Challenge',
    priority: 10,
    description: 'Given n non-negative integers representing an elevation map, compute how much water it can trap after raining.',
    examples: [
      { input: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', output: '6', explanation: 'Water trapped between buildings.' },
    ],
    hints: [
      'Water at any position = min(maxLeft, maxRight) - height[i]',
      'Use two pointers to track maxLeft and maxRight',
      'Process from the side with smaller max',
    ],
    solution: {
      java: `public int trap(int[] height) {
    int left = 0, right = height.length - 1;
    int leftMax = 0, rightMax = 0, water = 0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= leftMax) leftMax = height[left];
            else water += leftMax - height[left];
            left++;
        } else {
            if (height[right] >= rightMax) rightMax = height[right];
            else water += rightMax - height[right];
            right--;
        }
    }
    return water;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  // ==================== SLIDING WINDOW ====================
  'Maximum Average Subarray I': {
    leetcodeUrl: 'https://leetcode.com/problems/maximum-average-subarray-i/',
    category: 'Foundation',
    priority: 1,
    description: 'Find contiguous subarray of length k with maximum average value.',
    examples: [
      { input: 'nums = [1,12,-5,-6,50,3], k = 4', output: '12.75', explanation: 'Max average is (12-5-6+50)/4 = 12.75' },
    ],
    hints: [
      'Use fixed-size sliding window',
      'Calculate initial sum of first k elements',
      'Slide window: add new element, remove old element',
    ],
    solution: {
      approach: 'Fixed sliding window of size k. Track sum and update as window slides.',
      java: `public double findMaxAverage(int[] nums, int k) {
    double sum = 0;
    for (int i = 0; i < k; i++) sum += nums[i];
    double maxSum = sum;
    for (int i = k; i < nums.length; i++) {
        sum += nums[i] - nums[i - k];
        maxSum = Math.max(maxSum, sum);
    }
    return maxSum / k;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Longest Substring Without Repeating Characters': {
    leetcodeUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    category: 'Core',
    priority: 2,
    description: 'Given a string s, find the length of the longest substring without repeating characters.',
    examples: [
      { input: 's = "abcabcbb"', output: '3', explanation: 'The answer is "abc", with the length of 3.' },
    ],
    hints: [
      'Use a HashSet to track characters in current window',
      'Expand right, shrink left when duplicate found',
      'Track max length seen',
    ],
    solution: {
      java: `public int lengthOfLongestSubstring(String s) {
    Set<Character> set = new HashSet<>();
    int left = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        while (set.contains(s.charAt(right))) {
            set.remove(s.charAt(left++));
        }
        set.add(s.charAt(right));
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(min(n, alphabet))',
    },
  },

  'Minimum Size Subarray Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-size-subarray-sum/',
    category: 'Core',
    priority: 3,
    description: 'Find the minimal length subarray with sum >= target. Return 0 if no such subarray.',
    examples: [
      { input: 'target = 7, nums = [2,3,1,2,4,3]', output: '2', explanation: '[4,3] has minimal length under constraint.' },
    ],
    hints: [
      'Use variable-size sliding window',
      'Expand window by adding elements until sum >= target',
      'Shrink window from left while maintaining sum >= target',
    ],
    solution: {
      approach: 'Expand window until sum >= target, then shrink from left to find minimum length.',
      java: `public int minSubArrayLen(int target, int[] nums) {
    int left = 0, sum = 0, minLen = Integer.MAX_VALUE;
    for (int right = 0; right < nums.length; right++) {
        sum += nums[right];
        while (sum >= target) {
            minLen = Math.min(minLen, right - left + 1);
            sum -= nums[left++];
        }
    }
    return minLen == Integer.MAX_VALUE ? 0 : minLen;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Longest Repeating Character Replacement': {
    leetcodeUrl: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
    category: 'Core',
    priority: 4,
    description: 'You can replace at most k characters. Find the longest substring with same letter after replacements.',
    examples: [
      { input: 's = "AABABBA", k = 1', output: '4', explanation: 'Replace one B with A to get "AAAA".' },
    ],
    hints: [
      'Track count of most frequent character in window',
      'Window is valid if: windowSize - maxFreq <= k',
      'If invalid, shrink window from left',
    ],
    solution: {
      approach: 'Track max frequency in window. Valid window: size - maxFreq <= k (replacements needed).',
      java: `public int characterReplacement(String s, int k) {
    int[] count = new int[26];
    int left = 0, maxFreq = 0, maxLen = 0;
    for (int right = 0; right < s.length(); right++) {
        count[s.charAt(right) - 'A']++;
        maxFreq = Math.max(maxFreq, count[s.charAt(right) - 'A']);
        while (right - left + 1 - maxFreq > k) {
            count[s.charAt(left) - 'A']--;
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Fruit Into Baskets': {
    leetcodeUrl: 'https://leetcode.com/problems/fruit-into-baskets/',
    category: 'Practice',
    priority: 5,
    description: 'Collect maximum fruits with only 2 baskets (2 types of fruits allowed).',
    examples: [
      { input: 'fruits = [1,2,1]', output: '3', explanation: 'All fruits can be collected (2 types).' },
    ],
    hints: [
      'This is "longest subarray with at most 2 distinct elements"',
      'Use HashMap to track fruit types and counts',
      'Shrink window when more than 2 types',
    ],
    solution: {
      approach: 'Sliding window with at most 2 distinct elements. Use HashMap to track counts.',
      java: `public int totalFruit(int[] fruits) {
    Map<Integer, Integer> count = new HashMap<>();
    int left = 0, maxLen = 0;
    for (int right = 0; right < fruits.length; right++) {
        count.merge(fruits[right], 1, Integer::sum);
        while (count.size() > 2) {
            int leftFruit = fruits[left];
            count.put(leftFruit, count.get(leftFruit) - 1);
            if (count.get(leftFruit) == 0) count.remove(leftFruit);
            left++;
        }
        maxLen = Math.max(maxLen, right - left + 1);
    }
    return maxLen;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Find All Anagrams in a String': {
    leetcodeUrl: 'https://leetcode.com/problems/find-all-anagrams-in-a-string/',
    category: 'Core',
    priority: 4,
    description: 'Find all start indices of p\'s anagrams in s.',
    examples: [
      { input: 's = "cbaebabacd", p = "abc"', output: '[0, 6]', explanation: 'Anagrams at index 0 ("cba") and 6 ("bac").' },
    ],
    hints: [
      'Use fixed-size sliding window of length p.length()',
      'Track character frequencies using array or HashMap',
      'Compare window frequency with target frequency',
    ],
    solution: {
      approach: 'Fixed window size = p.length. Track char frequencies, compare with target.',
      java: `public List<Integer> findAnagrams(String s, String p) {
    List<Integer> result = new ArrayList<>();
    if (s.length() < p.length()) return result;
    int[] pCount = new int[26], sCount = new int[26];
    for (char c : p.toCharArray()) pCount[c - 'a']++;
    for (int i = 0; i < s.length(); i++) {
        sCount[s.charAt(i) - 'a']++;
        if (i >= p.length()) sCount[s.charAt(i - p.length()) - 'a']--;
        if (Arrays.equals(pCount, sCount)) result.add(i - p.length() + 1);
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Permutation in String': {
    leetcodeUrl: 'https://leetcode.com/problems/permutation-in-string/',
    category: 'Core',
    priority: 5,
    description: 'Check if s2 contains any permutation of s1.',
    examples: [
      { input: 's1 = "ab", s2 = "eidbaooo"', output: 'true', explanation: 's2 contains "ba" which is a permutation of s1.' },
    ],
    hints: [
      'Similar to Find All Anagrams',
      'Use fixed-size sliding window',
      'Compare character frequencies',
    ],
    solution: {
      approach: 'Fixed window of s1.length. Compare character frequencies with target.',
      java: `public boolean checkInclusion(String s1, String s2) {
    if (s1.length() > s2.length()) return false;
    int[] s1Count = new int[26], s2Count = new int[26];
    for (char c : s1.toCharArray()) s1Count[c - 'a']++;
    for (int i = 0; i < s2.length(); i++) {
        s2Count[s2.charAt(i) - 'a']++;
        if (i >= s1.length()) s2Count[s2.charAt(i - s1.length()) - 'a']--;
        if (Arrays.equals(s1Count, s2Count)) return true;
    }
    return false;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Minimum Window Substring': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-window-substring/',
    category: 'Challenge',
    priority: 8,
    description: 'Find the minimum window substring of s such that every character in t (including duplicates) is included in the window.',
    examples: [
      { input: 's = "ADOBECODEBANC", t = "ABC"', output: '"BANC"', explanation: 'Minimum window containing A, B, C.' },
    ],
    hints: [
      'Use frequency map for required characters',
      'Expand window until all required chars found',
      'Shrink to find minimum while still valid',
      'Track "formed" count for efficiency',
    ],
    solution: {
      approach: 'Sliding window with character count. Expand to satisfy, shrink to minimize.',
      java: `public String minWindow(String s, String t) {
    if (s.length() < t.length()) return "";
    Map<Character, Integer> need = new HashMap<>();
    for (char c : t.toCharArray()) need.merge(c, 1, Integer::sum);
    int required = need.size(), formed = 0;
    int left = 0, minLen = Integer.MAX_VALUE, minStart = 0;
    Map<Character, Integer> window = new HashMap<>();
    for (int right = 0; right < s.length(); right++) {
        char c = s.charAt(right);
        window.merge(c, 1, Integer::sum);
        if (need.containsKey(c) && window.get(c).equals(need.get(c))) formed++;
        while (formed == required) {
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            char leftChar = s.charAt(left);
            window.put(leftChar, window.get(leftChar) - 1);
            if (need.containsKey(leftChar) && window.get(leftChar) < need.get(leftChar)) formed--;
            left++;
        }
    }
    return minLen == Integer.MAX_VALUE ? "" : s.substring(minStart, minStart + minLen);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Sliding Window Maximum': {
    leetcodeUrl: 'https://leetcode.com/problems/sliding-window-maximum/',
    category: 'Challenge',
    priority: 9,
    description: 'Return the max value in each sliding window of size k.',
    examples: [
      { input: 'nums = [1,3,-1,-3,5,3,6,7], k = 3', output: '[3,3,5,5,6,7]', explanation: 'Max values for each window of size 3.' },
    ],
    hints: [
      'Use monotonic decreasing deque',
      'Deque stores indices, not values',
      'Remove elements outside window and smaller elements',
    ],
    solution: {
      approach: 'Monotonic deque (decreasing). Front is always max. Remove outdated and smaller elements.',
      java: `public int[] maxSlidingWindow(int[] nums, int k) {
    int[] result = new int[nums.length - k + 1];
    Deque<Integer> deque = new ArrayDeque<>();
    for (int i = 0; i < nums.length; i++) {
        while (!deque.isEmpty() && deque.peekFirst() < i - k + 1)
            deque.pollFirst();
        while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i])
            deque.pollLast();
        deque.offerLast(i);
        if (i >= k - 1) result[i - k + 1] = nums[deque.peekFirst()];
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
    },
  },

  'Substring with Concatenation of All Words': {
    leetcodeUrl: 'https://leetcode.com/problems/substring-with-concatenation-of-all-words/',
    category: 'Advanced',
    priority: 10,
    description: 'Find all starting indices of substrings that are concatenation of all words (exact once each).',
    examples: [
      { input: 's = "barfoothefoobarman", words = ["foo","bar"]', output: '[0,9]', explanation: '"barfoo" at 0 and "foobar" at 9.' },
    ],
    hints: [
      'All words have the same length',
      'Use sliding window with word-level steps',
      'Use HashMap to track word frequencies',
    ],
    solution: {
      approach: 'Fixed window of total words length. Compare word frequencies in window vs target.',
      java: `public List<Integer> findSubstring(String s, String[] words) {
    List<Integer> result = new ArrayList<>();
    int wordLen = words[0].length(), totalLen = wordLen * words.length;
    Map<String, Integer> wordCount = new HashMap<>();
    for (String w : words) wordCount.merge(w, 1, Integer::sum);
    for (int i = 0; i <= s.length() - totalLen; i++) {
        Map<String, Integer> seen = new HashMap<>();
        int j = 0;
        while (j < words.length) {
            String word = s.substring(i + j * wordLen, i + (j + 1) * wordLen);
            if (!wordCount.containsKey(word)) break;
            seen.merge(word, 1, Integer::sum);
            if (seen.get(word) > wordCount.get(word)) break;
            j++;
        }
        if (j == words.length) result.add(i);
    }
    return result;
}`,
      timeComplexity: 'O(n × m × wordLen)',
      spaceComplexity: 'O(m)',
    },
  },

  // ==================== BINARY SEARCH ====================
  'Binary Search': {
    leetcodeUrl: 'https://leetcode.com/problems/binary-search/',
    category: 'Foundation',
    priority: 1,
    description: 'Given a sorted array of integers and a target, return the index of target if found, else -1.',
    hints: [
      'Classic binary search template',
      'Calculate mid without overflow: left + (right - left) / 2',
      'Use left <= right for exact search',
    ],
    solution: {
      java: `public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Sqrt(x)': {
    leetcodeUrl: 'https://leetcode.com/problems/sqrtx/',
    category: 'Foundation',
    priority: 2,
    description: 'Compute and return the square root of x, rounded down to the nearest integer.',
    examples: [
      { input: 'x = 8', output: '2', explanation: 'sqrt(8) = 2.82... rounded down is 2.' },
    ],
    hints: [
      'Binary search on answer space [0, x]',
      'Find largest mid where mid*mid <= x',
      'Use long to avoid overflow',
    ],
    solution: {
      approach: 'Binary search for largest integer whose square is <= x.',
      java: `public int mySqrt(int x) {
    if (x < 2) return x;
    long left = 1, right = x / 2;
    while (left <= right) {
        long mid = left + (right - left) / 2;
        if (mid * mid == x) return (int) mid;
        else if (mid * mid < x) left = mid + 1;
        else right = mid - 1;
    }
    return (int) right;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Search Insert Position': {
    leetcodeUrl: 'https://leetcode.com/problems/search-insert-position/',
    category: 'Foundation',
    priority: 2,
    description: 'Find index of target in sorted array, or where it would be inserted.',
    examples: [
      { input: 'nums = [1,3,5,6], target = 5', output: '2', explanation: 'Target found at index 2.' },
      { input: 'nums = [1,3,5,6], target = 2', output: '1', explanation: 'Would be inserted at index 1.' },
    ],
    hints: [
      'Standard binary search',
      'If not found, left pointer will be at insertion position',
      'Return left at the end',
    ],
    solution: {
      approach: 'Binary search. When loop ends, left is the insert position.',
      java: `public int searchInsert(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return left;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'First Bad Version': {
    leetcodeUrl: 'https://leetcode.com/problems/first-bad-version/',
    category: 'Foundation',
    priority: 3,
    description: 'Find the first bad version given n versions where bad versions come after good ones.',
    examples: [
      { input: 'n = 5, bad = 4', output: '4', explanation: 'Versions [1,2,3] are good, [4,5] are bad.' },
    ],
    hints: [
      'Binary search to find boundary',
      'If current is bad, answer is at mid or left',
      'If current is good, answer is to the right',
    ],
    solution: {
      approach: 'Binary search for leftmost bad version.',
      java: `public int firstBadVersion(int n) {
    int left = 1, right = n;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (isBadVersion(mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Peak Index in a Mountain Array': {
    leetcodeUrl: 'https://leetcode.com/problems/peak-index-in-a-mountain-array/',
    category: 'Foundation',
    priority: 3,
    description: 'Find the peak index in a mountain array (strictly increasing then strictly decreasing).',
    examples: [
      { input: 'arr = [0,2,1,0]', output: '1', explanation: 'Peak is at index 1 with value 2.' },
    ],
    hints: [
      'Binary search on the slope',
      'If arr[mid] < arr[mid+1], peak is to the right',
      'Otherwise, peak is at mid or to the left',
    ],
    solution: {
      approach: 'Binary search: if ascending (mid < mid+1), go right; else go left.',
      java: `public int peakIndexInMountainArray(int[] arr) {
    int left = 0, right = arr.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (arr[mid] < arr[mid + 1]) left = mid + 1;
        else right = mid;
    }
    return left;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Count Negative Numbers in a Sorted Matrix': {
    leetcodeUrl: 'https://leetcode.com/problems/count-negative-numbers-in-a-sorted-matrix/',
    category: 'Foundation',
    priority: 4,
    description: 'Count negative numbers in a matrix where rows and columns are sorted in non-increasing order.',
    examples: [
      { input: 'grid = [[4,3,2,-1],[3,2,1,-1],[1,1,-1,-2],[-1,-1,-2,-3]]', output: '8', explanation: '8 negative numbers in the matrix.' },
    ],
    hints: [
      'Start from top-right or bottom-left corner',
      'Use the sorted property to skip rows/columns',
      'Binary search each row for first negative',
    ],
    solution: {
      approach: 'Start from top-right. If negative, count rest of row and move down. Else move left.',
      java: `public int countNegatives(int[][] grid) {
    int count = 0, cols = grid[0].length, j = cols - 1;
    for (int[] row : grid) {
        while (j >= 0 && row[j] < 0) j--;
        count += cols - 1 - j;
    }
    return count;
}`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Find First and Last Position of Element': {
    leetcodeUrl: 'https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/',
    category: 'Core',
    priority: 5,
    description: 'Find starting and ending position of target in sorted array. Return [-1,-1] if not found.',
    examples: [
      { input: 'nums = [5,7,7,8,8,10], target = 8', output: '[3,4]', explanation: 'Target 8 appears at indices 3 and 4.' },
    ],
    hints: [
      'Two binary searches: one for leftmost, one for rightmost',
      'For leftmost: if found, continue searching left',
      'For rightmost: if found, continue searching right',
    ],
    solution: {
      approach: 'Binary search twice: find leftmost occurrence, then find rightmost occurrence.',
      java: `public int[] searchRange(int[] nums, int target) {
    return new int[]{findFirst(nums, target), findLast(nums, target)};
}

private int findFirst(int[] nums, int target) {
    int left = 0, right = nums.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) { result = mid; right = mid - 1; }
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}

private int findLast(int[] nums, int target) {
    int left = 0, right = nums.length - 1, result = -1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) { result = mid; left = mid + 1; }
        else if (nums[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return result;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Search in Rotated Sorted Array': {
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
    category: 'Core',
    priority: 6,
    description: 'Search for target in a rotated sorted array. Return index or -1.',
    hints: [
      'One half is always sorted',
      'Determine which half is sorted',
      'Check if target is in the sorted half',
    ],
    solution: {
      java: `public int search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return mid;
        if (nums[left] <= nums[mid]) { // Left half sorted
            if (target >= nums[left] && target < nums[mid])
                right = mid - 1;
            else left = mid + 1;
        } else { // Right half sorted
            if (target > nums[mid] && target <= nums[right])
                left = mid + 1;
            else right = mid - 1;
        }
    }
    return -1;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Search in Rotated Sorted Array II': {
    leetcodeUrl: 'https://leetcode.com/problems/search-in-rotated-sorted-array-ii/',
    category: 'Core',
    priority: 7,
    description: 'Search target in rotated sorted array that may contain duplicates.',
    examples: [
      { input: 'nums = [2,5,6,0,0,1,2], target = 0', output: 'true', explanation: 'Target found in array.' },
    ],
    hints: [
      'Similar to Search in Rotated Sorted Array',
      'Handle duplicates: when nums[left] == nums[mid], shrink left',
      'This degrades worst case to O(n)',
    ],
    solution: {
      approach: 'Binary search with duplicate handling. When nums[left] == nums[mid], increment left.',
      java: `public boolean search(int[] nums, int target) {
    int left = 0, right = nums.length - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] == target) return true;
        if (nums[left] == nums[mid]) { left++; continue; }
        if (nums[left] <= nums[mid]) {
            if (target >= nums[left] && target < nums[mid]) right = mid - 1;
            else left = mid + 1;
        } else {
            if (target > nums[mid] && target <= nums[right]) left = mid + 1;
            else right = mid - 1;
        }
    }
    return false;
}`,
      timeComplexity: 'O(log n) average, O(n) worst',
      spaceComplexity: 'O(1)',
    },
  },

  'Find Minimum in Rotated Sorted Array': {
    leetcodeUrl: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
    category: 'Core',
    priority: 6,
    description: 'Find minimum element in a rotated sorted array with unique elements.',
    examples: [
      { input: 'nums = [3,4,5,1,2]', output: '1', explanation: 'Minimum is 1.' },
    ],
    hints: [
      'Binary search to find rotation point',
      'Compare mid with right to determine which half has minimum',
      'If nums[mid] > nums[right], min is in right half',
    ],
    solution: {
      approach: 'Binary search: if mid > right, minimum is in right half; otherwise in left half.',
      java: `public int findMin(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] > nums[right]) left = mid + 1;
        else right = mid;
    }
    return nums[left];
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Find Peak Element': {
    leetcodeUrl: 'https://leetcode.com/problems/find-peak-element/',
    category: 'Core',
    priority: 5,
    description: 'Find a peak element (greater than neighbors). Return any peak index.',
    examples: [
      { input: 'nums = [1,2,1,3,5,6,4]', output: '5', explanation: 'Index 5 (value 6) is a peak.' },
    ],
    hints: [
      'Binary search on slope direction',
      'If nums[mid] < nums[mid+1], peak is to the right',
      'Otherwise peak is at mid or to the left',
    ],
    solution: {
      approach: 'Binary search: follow the ascending slope to find a peak.',
      java: `public int findPeakElement(int[] nums) {
    int left = 0, right = nums.length - 1;
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (nums[mid] < nums[mid + 1]) left = mid + 1;
        else right = mid;
    }
    return left;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Search a 2D Matrix': {
    leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix/',
    category: 'Core',
    priority: 6,
    description: 'Search for target in m×n matrix where each row is sorted and first element of each row > last of previous.',
    examples: [
      { input: 'matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3', output: 'true', explanation: 'Target found.' },
    ],
    hints: [
      'Treat matrix as a flattened sorted array',
      'Use single binary search with index conversion',
      'index i → row = i/cols, col = i%cols',
    ],
    solution: {
      approach: 'Binary search treating matrix as 1D array. Convert index to (row, col).',
      java: `public boolean searchMatrix(int[][] matrix, int target) {
    int m = matrix.length, n = matrix[0].length;
    int left = 0, right = m * n - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        int val = matrix[mid / n][mid % n];
        if (val == target) return true;
        else if (val < target) left = mid + 1;
        else right = mid - 1;
    }
    return false;
}`,
      timeComplexity: 'O(log(m×n))',
      spaceComplexity: 'O(1)',
    },
  },

  'Search a 2D Matrix II': {
    leetcodeUrl: 'https://leetcode.com/problems/search-a-2d-matrix-ii/',
    category: 'Core',
    priority: 7,
    description: 'Search target in matrix where rows and columns are sorted in ascending order.',
    examples: [
      { input: 'matrix = [[1,4,7],[2,5,8],[3,6,9]], target = 5', output: 'true', explanation: 'Target found at (1,1).' },
    ],
    hints: [
      'Start from top-right or bottom-left corner',
      'If current > target, move left',
      'If current < target, move down',
    ],
    solution: {
      approach: 'Start from top-right. If > target go left, if < target go down.',
      java: `public boolean searchMatrix(int[][] matrix, int target) {
    int row = 0, col = matrix[0].length - 1;
    while (row < matrix.length && col >= 0) {
        if (matrix[row][col] == target) return true;
        else if (matrix[row][col] > target) col--;
        else row++;
    }
    return false;
}`,
      timeComplexity: 'O(m + n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Time Based Key-Value Store': {
    leetcodeUrl: 'https://leetcode.com/problems/time-based-key-value-store/',
    category: 'Practice',
    priority: 8,
    description: 'Design a key-value store that stores multiple values with timestamps and retrieves values at specific timestamps.',
    hints: [
      'Store values in a list per key with timestamps',
      'Binary search to find value at or before given timestamp',
      'TreeMap or binary search on sorted timestamp list',
    ],
    solution: {
      approach: 'HashMap with TreeMap for each key. Binary search on timestamps.',
      java: `class TimeMap {
    Map<String, TreeMap<Integer, String>> map = new HashMap<>();
    
    public void set(String key, String value, int timestamp) {
        map.computeIfAbsent(key, k -> new TreeMap<>()).put(timestamp, value);
    }
    
    public String get(String key, int timestamp) {
        if (!map.containsKey(key)) return "";
        Integer t = map.get(key).floorKey(timestamp);
        return t == null ? "" : map.get(key).get(t);
    }
}`,
      timeComplexity: 'O(log n) per operation',
      spaceComplexity: 'O(n)',
    },
  },

  'Pow(x, n)': {
    leetcodeUrl: 'https://leetcode.com/problems/powx-n/',
    category: 'Practice',
    priority: 6,
    description: 'Implement pow(x, n) which calculates x raised to the power n.',
    hints: [
      'Use binary exponentiation (fast power)',
      'x^n = (x^(n/2))^2 for even n',
      'Handle negative exponents by using 1/x',
    ],
    solution: {
      approach: 'Binary exponentiation: x^n = (x^2)^(n/2) for even n, x * x^(n-1) for odd n.',
      java: `public double myPow(double x, int n) {
    long N = n;
    if (N < 0) { x = 1 / x; N = -N; }
    double result = 1;
    while (N > 0) {
        if (N % 2 == 1) result *= x;
        x *= x;
        N /= 2;
    }
    return result;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Divide Two Integers': {
    leetcodeUrl: 'https://leetcode.com/problems/divide-two-integers/',
    category: 'Practice',
    priority: 7,
    description: 'Divide two integers without multiplication, division, and mod operator.',
    hints: [
      'Use bit shifting (doubling) to speed up subtraction',
      'Find largest 2^k × divisor that fits',
      'Handle edge cases for INT_MIN',
    ],
    solution: {
      approach: 'Repeatedly subtract largest possible multiple of divisor using bit shifting.',
      java: `public int divide(int dividend, int divisor) {
    if (dividend == Integer.MIN_VALUE && divisor == -1) return Integer.MAX_VALUE;
    int sign = (dividend > 0) ^ (divisor > 0) ? -1 : 1;
    long dvd = Math.abs((long) dividend), dvs = Math.abs((long) divisor);
    int result = 0;
    while (dvd >= dvs) {
        long temp = dvs, multiple = 1;
        while (dvd >= (temp << 1)) { temp <<= 1; multiple <<= 1; }
        dvd -= temp;
        result += multiple;
    }
    return sign * result;
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Koko Eating Bananas': {
    leetcodeUrl: 'https://leetcode.com/problems/koko-eating-bananas/',
    category: 'Core',
    priority: 8,
    description: 'Koko eats bananas at speed K. Return minimum K to eat all piles in H hours.',
    examples: [
      { input: 'piles = [3,6,7,11], h = 8', output: '4', explanation: 'At speed 4, Koko can eat all piles in 8 hours.' },
    ],
    hints: [
      'Binary search on the answer (eating speed)',
      'For each speed, calculate hours needed',
      'Search for minimum valid speed',
    ],
    solution: {
      approach: 'Binary search on speed. For each speed, calculate total hours needed.',
      java: `public int minEatingSpeed(int[] piles, int h) {
    int left = 1, right = 1;
    for (int pile : piles) right = Math.max(right, pile);
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canFinish(piles, h, mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

private boolean canFinish(int[] piles, int h, int speed) {
    int hours = 0;
    for (int pile : piles) {
        hours += (pile + speed - 1) / speed;
    }
    return hours <= h;
}`,
      timeComplexity: 'O(n log max)',
      spaceComplexity: 'O(1)',
    },
  },

  'Capacity To Ship Packages Within D Days': {
    leetcodeUrl: 'https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/',
    category: 'Core',
    priority: 9,
    description: 'Find minimum ship capacity to ship all packages within d days.',
    hints: [
      'Binary search on capacity (answer space)',
      'Min capacity = max(weights), max = sum(weights)',
      'For each capacity, check if feasible in d days',
    ],
    solution: {
      approach: 'Binary search on capacity. For each capacity, greedily count days needed.',
      java: `public int shipWithinDays(int[] weights, int days) {
    int left = 0, right = 0;
    for (int w : weights) { left = Math.max(left, w); right += w; }
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canShip(weights, days, mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

private boolean canShip(int[] weights, int days, int capacity) {
    int daysNeeded = 1, currentLoad = 0;
    for (int w : weights) {
        if (currentLoad + w > capacity) { daysNeeded++; currentLoad = 0; }
        currentLoad += w;
    }
    return daysNeeded <= days;
}`,
      timeComplexity: 'O(n log sum)',
      spaceComplexity: 'O(1)',
    },
  },

  'Minimum Limit of Balls in a Bag': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-limit-of-balls-in-a-bag/',
    category: 'Practice',
    priority: 10,
    description: 'Minimize the maximum balls in a bag after performing at most maxOperations splits.',
    examples: [
      { input: 'nums = [9], maxOperations = 2', output: '3', explanation: 'Split 9 into [6,3], then [3,3,3]. Max is 3.' },
    ],
    hints: [
      'Binary search on the answer (maximum balls)',
      'For each max, calculate operations needed',
      'Operations to split pile p into max m: (p-1)/m',
    ],
    solution: {
      approach: 'Binary search on max balls. Count operations needed to achieve that max.',
      java: `public int minimumSize(int[] nums, int maxOperations) {
    int left = 1, right = 0;
    for (int num : nums) right = Math.max(right, num);
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canAchieve(nums, maxOperations, mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

private boolean canAchieve(int[] nums, int maxOps, int maxBalls) {
    int ops = 0;
    for (int num : nums) {
        ops += (num - 1) / maxBalls;
    }
    return ops <= maxOps;
}`,
      timeComplexity: 'O(n log max)',
      spaceComplexity: 'O(1)',
    },
  },

  'Magnetic Force Between Two Balls': {
    leetcodeUrl: 'https://leetcode.com/problems/magnetic-force-between-two-balls/',
    category: 'Practice',
    priority: 11,
    description: 'Place m balls in baskets to maximize the minimum magnetic force (distance) between any two balls.',
    examples: [
      { input: 'position = [1,2,3,4,7], m = 3', output: '3', explanation: 'Place at positions 1, 4, 7. Min distance is 3.' },
    ],
    hints: [
      'Binary search on the answer (minimum force)',
      'Sort positions first',
      'Greedily place balls with at least mid distance apart',
    ],
    solution: {
      approach: 'Binary search on min force. Greedy placement to check feasibility.',
      java: `public int maxDistance(int[] position, int m) {
    Arrays.sort(position);
    int left = 1, right = position[position.length - 1] - position[0];
    while (left < right) {
        int mid = left + (right - left + 1) / 2;
        if (canPlace(position, m, mid)) left = mid;
        else right = mid - 1;
    }
    return left;
}

private boolean canPlace(int[] position, int m, int minForce) {
    int count = 1, lastPos = position[0];
    for (int i = 1; i < position.length; i++) {
        if (position[i] - lastPos >= minForce) {
            count++;
            lastPos = position[i];
        }
    }
    return count >= m;
}`,
      timeComplexity: 'O(n log(max-min))',
      spaceComplexity: 'O(1)',
    },
  },

  'Minimized Maximum of Products Distributed to Any Store': {
    leetcodeUrl: 'https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/',
    category: 'Practice',
    priority: 12,
    description: 'Distribute products to n stores minimizing the maximum products any store receives.',
    examples: [
      { input: 'n = 6, quantities = [11,6]', output: '3', explanation: 'Distribute 11 to 4 stores (3,3,3,2), 6 to 2 stores (3,3).' },
    ],
    hints: [
      'Binary search on the answer (max products per store)',
      'For each max, calculate stores needed',
      'Stores needed for quantity q with max m: ceil(q/m)',
    ],
    solution: {
      approach: 'Binary search on max products. Count stores needed for each candidate.',
      java: `public int minimizedMaximum(int n, int[] quantities) {
    int left = 1, right = 0;
    for (int q : quantities) right = Math.max(right, q);
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canDistribute(n, quantities, mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

private boolean canDistribute(int n, int[] quantities, int maxPerStore) {
    int storesNeeded = 0;
    for (int q : quantities) {
        storesNeeded += (q + maxPerStore - 1) / maxPerStore;
    }
    return storesNeeded <= n;
}`,
      timeComplexity: 'O(m log max)',
      spaceComplexity: 'O(1)',
    },
  },

  'Kth Smallest Element in Sorted Matrix': {
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
    category: 'Challenge',
    priority: 13,
    description: 'Find the kth smallest element in a matrix where rows and columns are sorted.',
    examples: [
      { input: 'matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8', output: '13', explanation: '8th smallest is 13.' },
    ],
    hints: [
      'Binary search on value range',
      'Count elements <= mid in each row',
      'Use sorted property to count efficiently',
    ],
    solution: {
      approach: 'Binary search on value. Count elements <= mid using row-wise binary search.',
      java: `public int kthSmallest(int[][] matrix, int k) {
    int n = matrix.length;
    int left = matrix[0][0], right = matrix[n-1][n-1];
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (countLessOrEqual(matrix, mid) >= k) right = mid;
        else left = mid + 1;
    }
    return left;
}

private int countLessOrEqual(int[][] matrix, int target) {
    int n = matrix.length, count = 0, row = n - 1, col = 0;
    while (row >= 0 && col < n) {
        if (matrix[row][col] <= target) {
            count += row + 1;
            col++;
        } else {
            row--;
        }
    }
    return count;
}`,
      timeComplexity: 'O(n log(max-min))',
      spaceComplexity: 'O(1)',
    },
  },

  'Median of Two Sorted Arrays': {
    leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    category: 'Advanced',
    priority: 15,
    description: 'Find the median of two sorted arrays in O(log(m+n)) time.',
    examples: [
      { input: 'nums1 = [1,3], nums2 = [2]', output: '2.0', explanation: 'Merged = [1,2,3], median = 2.' },
    ],
    hints: [
      'Binary search on partition point in smaller array',
      'Partition both arrays so left side has (m+n+1)/2 elements',
      'Valid partition: maxLeft1 <= minRight2 && maxLeft2 <= minRight1',
    ],
    solution: {
      approach: 'Binary search partition in smaller array. Find valid partition point.',
      java: `public double findMedianSortedArrays(int[] nums1, int[] nums2) {
    if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
    int m = nums1.length, n = nums2.length;
    int left = 0, right = m;
    while (left <= right) {
        int i = (left + right) / 2;
        int j = (m + n + 1) / 2 - i;
        int maxLeft1 = (i == 0) ? Integer.MIN_VALUE : nums1[i - 1];
        int minRight1 = (i == m) ? Integer.MAX_VALUE : nums1[i];
        int maxLeft2 = (j == 0) ? Integer.MIN_VALUE : nums2[j - 1];
        int minRight2 = (j == n) ? Integer.MAX_VALUE : nums2[j];
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if ((m + n) % 2 == 0)
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;
            return Math.max(maxLeft1, maxLeft2);
        } else if (maxLeft1 > minRight2) right = i - 1;
        else left = i + 1;
    }
    return 0.0;
}`,
      timeComplexity: 'O(log min(m,n))',
      spaceComplexity: 'O(1)',
    },
  },

  'Split Array Largest Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/split-array-largest-sum/',
    category: 'Challenge',
    priority: 14,
    description: 'Split array into k subarrays minimizing the largest sum among them.',
    examples: [
      { input: 'nums = [7,2,5,10,8], k = 2', output: '18', explanation: 'Split [7,2,5] and [10,8]. Max sum is 18.' },
    ],
    hints: [
      'Binary search on the answer (max subarray sum)',
      'Min possible = max element, Max possible = total sum',
      'Greedily count subarrays needed for given max sum',
    ],
    solution: {
      approach: 'Binary search on max sum. Greedily count splits needed.',
      java: `public int splitArray(int[] nums, int k) {
    int left = 0, right = 0;
    for (int num : nums) {
        left = Math.max(left, num);
        right += num;
    }
    while (left < right) {
        int mid = left + (right - left) / 2;
        if (canSplit(nums, k, mid)) right = mid;
        else left = mid + 1;
    }
    return left;
}

private boolean canSplit(int[] nums, int k, int maxSum) {
    int splits = 1, currentSum = 0;
    for (int num : nums) {
        if (currentSum + num > maxSum) {
            splits++;
            currentSum = num;
        } else {
            currentSum += num;
        }
    }
    return splits <= k;
}`,
      timeComplexity: 'O(n log sum)',
      spaceComplexity: 'O(1)',
    },
  },

  'Count of Smaller Numbers After Self': {
    leetcodeUrl: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
    category: 'Advanced',
    priority: 16,
    description: 'For each element, count elements to its right that are smaller.',
    examples: [
      { input: 'nums = [5,2,6,1]', output: '[2,1,1,0]', explanation: 'For 5: [2,1] smaller. For 2: [1] smaller.' },
    ],
    hints: [
      'Merge sort with index tracking',
      'Or Binary Indexed Tree / Segment Tree',
      'Count inversions during merge',
    ],
    solution: {
      approach: 'Modified merge sort. Count smaller elements during merge.',
      java: `public List<Integer> countSmaller(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    int[][] indexed = new int[n][2]; // [value, original index]
    for (int i = 0; i < n; i++) indexed[i] = new int[]{nums[i], i};
    mergeSort(indexed, 0, n - 1, result);
    List<Integer> ans = new ArrayList<>();
    for (int r : result) ans.add(r);
    return ans;
}

private void mergeSort(int[][] arr, int left, int right, int[] result) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid, result);
    mergeSort(arr, mid + 1, right, result);
    merge(arr, left, mid, right, result);
}

private void merge(int[][] arr, int left, int mid, int right, int[] result) {
    int[][] temp = new int[right - left + 1][2];
    int i = left, j = mid + 1, k = 0, rightCount = 0;
    while (i <= mid && j <= right) {
        if (arr[j][0] < arr[i][0]) {
            rightCount++;
            temp[k++] = arr[j++];
        } else {
            result[arr[i][1]] += rightCount;
            temp[k++] = arr[i++];
        }
    }
    while (i <= mid) { result[arr[i][1]] += rightCount; temp[k++] = arr[i++]; }
    while (j <= right) { temp[k++] = arr[j++]; }
    System.arraycopy(temp, 0, arr, left, temp.length);
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Max Sum of Rectangle No Larger Than K': {
    leetcodeUrl: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/',
    category: 'Advanced',
    priority: 17,
    description: 'Find max sum of rectangle in matrix with sum <= k.',
    examples: [
      { input: 'matrix = [[1,0,1],[0,-2,3]], k = 2', output: '2', explanation: 'Rectangle [[0,1],[-2,3]] has sum 2.' },
    ],
    hints: [
      'Fix left and right columns, reduce to 1D problem',
      'Use prefix sums for each row range',
      'TreeSet to find best previous prefix sum',
    ],
    solution: {
      approach: 'Fix column range, compress to 1D. Use TreeSet for max subarray sum <= k.',
      java: `public int maxSumSubmatrix(int[][] matrix, int k) {
    int m = matrix.length, n = matrix[0].length, result = Integer.MIN_VALUE;
    for (int left = 0; left < n; left++) {
        int[] rowSum = new int[m];
        for (int right = left; right < n; right++) {
            for (int i = 0; i < m; i++) rowSum[i] += matrix[i][right];
            result = Math.max(result, maxSumNoMoreThanK(rowSum, k));
        }
    }
    return result;
}

private int maxSumNoMoreThanK(int[] arr, int k) {
    TreeSet<Integer> set = new TreeSet<>();
    set.add(0);
    int maxSum = Integer.MIN_VALUE, prefixSum = 0;
    for (int num : arr) {
        prefixSum += num;
        Integer ceiling = set.ceiling(prefixSum - k);
        if (ceiling != null) maxSum = Math.max(maxSum, prefixSum - ceiling);
        set.add(prefixSum);
    }
    return maxSum;
}`,
      timeComplexity: 'O(n² × m log m)',
      spaceComplexity: 'O(m)',
    },
  },

  'Shortest Subarray with Sum at Least K': {
    leetcodeUrl: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/',
    category: 'Advanced',
    priority: 18,
    description: 'Find shortest subarray with sum at least k. Array may have negatives.',
    examples: [
      { input: 'nums = [2,-1,2], k = 3', output: '3', explanation: 'Entire array sums to 3.' },
    ],
    hints: [
      'Prefix sums + monotonic deque',
      'Can\'t use simple sliding window due to negatives',
      'Deque maintains increasing prefix sums',
    ],
    solution: {
      approach: 'Monotonic deque with prefix sums. Remove smaller prefixes from back.',
      java: `public int shortestSubarray(int[] nums, int k) {
    int n = nums.length, result = n + 1;
    long[] prefix = new long[n + 1];
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];
    Deque<Integer> deque = new ArrayDeque<>();
    for (int i = 0; i <= n; i++) {
        while (!deque.isEmpty() && prefix[i] - prefix[deque.peekFirst()] >= k) {
            result = Math.min(result, i - deque.pollFirst());
        }
        while (!deque.isEmpty() && prefix[i] <= prefix[deque.peekLast()]) {
            deque.pollLast();
        }
        deque.offerLast(i);
    }
    return result <= n ? result : -1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== ARRAYS & STRINGS ====================
  'Two Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/two-sum/',
    category: 'Foundation',
    priority: 1,
    description: 'Given an array of integers and a target, return indices of two numbers that add up to target.',
    examples: [
      { input: 'nums = [2,7,11,15], target = 9', output: '[0,1]', explanation: 'nums[0] + nums[1] = 2 + 7 = 9' },
    ],
    hints: [
      'Use a HashMap to store complement',
      'Check if complement exists as you iterate',
      'Store index as value in map',
    ],
    solution: {
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int complement = target - nums[i];
        if (map.containsKey(complement)) {
            return new int[]{map.get(complement), i};
        }
        map.put(nums[i], i);
    }
    return new int[]{};
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Contains Duplicate': {
    leetcodeUrl: 'https://leetcode.com/problems/contains-duplicate/',
    category: 'Foundation',
    priority: 1,
    description: 'Return true if any value appears at least twice in the array.',
    hints: [
      'Use HashSet to track seen elements',
      'If element already in set, return true',
      'Alternative: sort and check adjacent elements',
    ],
    solution: {
      approach: 'Add elements to HashSet. If already present, duplicate exists.',
      java: `public boolean containsDuplicate(int[] nums) {
    Set<Integer> seen = new HashSet<>();
    for (int num : nums) {
        if (!seen.add(num)) return true;
    }
    return false;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Valid Anagram': {
    leetcodeUrl: 'https://leetcode.com/problems/valid-anagram/',
    category: 'Foundation',
    priority: 2,
    description: 'Return true if t is an anagram of s.',
    hints: [
      'Compare character frequencies',
      'Use array of size 26 for lowercase letters',
      'Or sort both strings and compare',
    ],
    solution: {
      approach: 'Count characters in s, decrement for t. All counts should be 0.',
      java: `public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) return false;
    int[] count = new int[26];
    for (int i = 0; i < s.length(); i++) {
        count[s.charAt(i) - 'a']++;
        count[t.charAt(i) - 'a']--;
    }
    for (int c : count) if (c != 0) return false;
    return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Group Anagrams': {
    leetcodeUrl: 'https://leetcode.com/problems/group-anagrams/',
    category: 'Core',
    priority: 4,
    description: 'Group strings that are anagrams of each other.',
    hints: [
      'Anagrams have same sorted characters',
      'Use sorted string as key in HashMap',
      'Or use character frequency as key',
    ],
    solution: {
      approach: 'Use sorted string as HashMap key. Group all strings with same key.',
      java: `public List<List<String>> groupAnagrams(String[] strs) {
    Map<String, List<String>> map = new HashMap<>();
    for (String s : strs) {
        char[] chars = s.toCharArray();
        Arrays.sort(chars);
        String key = new String(chars);
        map.computeIfAbsent(key, k -> new ArrayList<>()).add(s);
    }
    return new ArrayList<>(map.values());
}`,
      timeComplexity: 'O(n × k log k)',
      spaceComplexity: 'O(n × k)',
    },
  },

  'Top K Frequent Elements': {
    leetcodeUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    category: 'Core',
    priority: 5,
    description: 'Return the k most frequent elements in the array.',
    hints: [
      'Count frequencies with HashMap',
      'Use bucket sort or min heap',
      'Bucket index = frequency',
    ],
    solution: {
      approach: 'Bucket sort: index by frequency. Collect from highest frequency bucket.',
      java: `public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> count = new HashMap<>();
    for (int n : nums) count.merge(n, 1, Integer::sum);
    List<Integer>[] bucket = new List[nums.length + 1];
    for (int key : count.keySet()) {
        int freq = count.get(key);
        if (bucket[freq] == null) bucket[freq] = new ArrayList<>();
        bucket[freq].add(key);
    }
    int[] result = new int[k];
    int idx = 0;
    for (int i = bucket.length - 1; i >= 0 && idx < k; i--) {
        if (bucket[i] != null) {
            for (int n : bucket[i]) if (idx < k) result[idx++] = n;
        }
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Product of Array Except Self': {
    leetcodeUrl: 'https://leetcode.com/problems/product-of-array-except-self/',
    category: 'Core',
    priority: 6,
    description: 'Return array where each element is product of all elements except itself, without division.',
    hints: [
      'Use prefix and suffix products',
      'First pass: calculate prefix products',
      'Second pass: multiply by suffix products',
    ],
    solution: {
      approach: 'Calculate prefix products, then multiply by suffix products in reverse pass.',
      java: `public int[] productExceptSelf(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    result[0] = 1;
    for (int i = 1; i < n; i++) {
        result[i] = result[i - 1] * nums[i - 1];
    }
    int suffix = 1;
    for (int i = n - 1; i >= 0; i--) {
        result[i] *= suffix;
        suffix *= nums[i];
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Maximum Subarray': {
    leetcodeUrl: 'https://leetcode.com/problems/maximum-subarray/',
    category: 'Core',
    priority: 3,
    description: 'Find the contiguous subarray with the largest sum.',
    hints: [
      'Kadane\'s algorithm',
      'Track current sum and max sum',
      'Reset current sum if it goes negative',
    ],
    solution: {
      java: `public int maxSubArray(int[] nums) {
    int maxSum = nums[0], currentSum = nums[0];
    for (int i = 1; i < nums.length; i++) {
        currentSum = Math.max(nums[i], currentSum + nums[i]);
        maxSum = Math.max(maxSum, currentSum);
    }
    return maxSum;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Encode and Decode Strings': {
    leetcodeUrl: 'https://leetcode.com/problems/encode-and-decode-strings/',
    category: 'Practice',
    priority: 7,
    description: 'Design algorithm to encode list of strings to single string and decode back.',
    hints: [
      'Use length prefix encoding',
      'Format: length + delimiter + string',
      'Example: "4#test3#abc" for ["test", "abc"]',
    ],
    solution: {
      approach: 'Encode as length#string. Decode by reading length, then extracting string.',
      java: `public String encode(List<String> strs) {
    StringBuilder sb = new StringBuilder();
    for (String s : strs) {
        sb.append(s.length()).append('#').append(s);
    }
    return sb.toString();
}

public List<String> decode(String s) {
    List<String> result = new ArrayList<>();
    int i = 0;
    while (i < s.length()) {
        int j = i;
        while (s.charAt(j) != '#') j++;
        int len = Integer.parseInt(s.substring(i, j));
        result.add(s.substring(j + 1, j + 1 + len));
        i = j + 1 + len;
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Longest Consecutive Sequence': {
    leetcodeUrl: 'https://leetcode.com/problems/longest-consecutive-sequence/',
    category: 'Core',
    priority: 8,
    description: 'Find length of longest consecutive elements sequence in O(n) time.',
    hints: [
      'Use HashSet for O(1) lookups',
      'Only start counting from sequence beginning (no n-1 exists)',
      'Count consecutive elements from each start',
    ],
    solution: {
      approach: 'Add to set. For each element without predecessor, count consecutive sequence.',
      java: `public int longestConsecutive(int[] nums) {
    Set<Integer> set = new HashSet<>();
    for (int n : nums) set.add(n);
    int maxLen = 0;
    for (int n : set) {
        if (!set.contains(n - 1)) {
            int len = 1;
            while (set.contains(n + len)) len++;
            maxLen = Math.max(maxLen, len);
        }
    }
    return maxLen;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'First Missing Positive': {
    leetcodeUrl: 'https://leetcode.com/problems/first-missing-positive/',
    category: 'Challenge',
    priority: 10,
    description: 'Find smallest missing positive integer in O(n) time and O(1) space.',
    hints: [
      'Use array itself as hash map',
      'Place each number at index (num-1)',
      'First position where nums[i] != i+1 is answer',
    ],
    solution: {
      approach: 'Cyclic sort: place each num at index num-1. Scan for first mismatch.',
      java: `public int firstMissingPositive(int[] nums) {
    int n = nums.length;
    for (int i = 0; i < n; i++) {
        while (nums[i] > 0 && nums[i] <= n && nums[nums[i] - 1] != nums[i]) {
            int temp = nums[nums[i] - 1];
            nums[nums[i] - 1] = nums[i];
            nums[i] = temp;
        }
    }
    for (int i = 0; i < n; i++) {
        if (nums[i] != i + 1) return i + 1;
    }
    return n + 1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  // ==================== DYNAMIC PROGRAMMING ====================
  'Climbing Stairs': {
    leetcodeUrl: 'https://leetcode.com/problems/climbing-stairs/',
    category: 'Foundation',
    priority: 1,
    description: 'Each time you can climb 1 or 2 steps. How many distinct ways to climb to the top?',
    hints: [
      'This is Fibonacci sequence',
      'dp[i] = dp[i-1] + dp[i-2]',
      'Can optimize to O(1) space',
    ],
    solution: {
      java: `public int climbStairs(int n) {
    if (n <= 2) return n;
    int prev2 = 1, prev1 = 2;
    for (int i = 3; i <= n; i++) {
        int curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Min Cost Climbing Stairs': {
    leetcodeUrl: 'https://leetcode.com/problems/min-cost-climbing-stairs/',
    category: 'Foundation',
    priority: 2,
    description: 'Find minimum cost to reach top of stairs. You can climb 1 or 2 steps.',
    hints: [
      'dp[i] = min cost to reach step i',
      'dp[i] = min(dp[i-1], dp[i-2]) + cost[i]',
      'Can start from step 0 or step 1',
    ],
    solution: {
      approach: 'Bottom-up DP. At each step, choose cheaper path from previous two steps.',
      java: `public int minCostClimbingStairs(int[] cost) {
    int n = cost.length;
    int prev2 = cost[0], prev1 = cost[1];
    for (int i = 2; i < n; i++) {
        int curr = cost[i] + Math.min(prev1, prev2);
        prev2 = prev1;
        prev1 = curr;
    }
    return Math.min(prev1, prev2);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'House Robber': {
    leetcodeUrl: 'https://leetcode.com/problems/house-robber/',
    category: 'Core',
    priority: 3,
    description: 'Rob houses without alerting adjacent houses. Return maximum money.',
    hints: [
      'At each house, decide: rob or skip',
      'dp[i] = max(dp[i-1], dp[i-2] + nums[i])',
      'Can optimize to O(1) space',
    ],
    solution: {
      java: `public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    int prev2 = 0, prev1 = 0;
    for (int num : nums) {
        int curr = Math.max(prev1, prev2 + num);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'House Robber II': {
    leetcodeUrl: 'https://leetcode.com/problems/house-robber-ii/',
    category: 'Core',
    priority: 4,
    description: 'Houses are arranged in a circle. Rob maximum without alerting adjacent houses.',
    hints: [
      'Circular array: first and last are adjacent',
      'Solve twice: exclude first house, exclude last house',
      'Take maximum of both solutions',
    ],
    solution: {
      approach: 'Run House Robber twice: [0, n-2] and [1, n-1]. Take max.',
      java: `public int rob(int[] nums) {
    if (nums.length == 1) return nums[0];
    return Math.max(robRange(nums, 0, nums.length - 2),
                    robRange(nums, 1, nums.length - 1));
}

private int robRange(int[] nums, int start, int end) {
    int prev2 = 0, prev1 = 0;
    for (int i = start; i <= end; i++) {
        int curr = Math.max(prev1, prev2 + nums[i]);
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Coin Change': {
    leetcodeUrl: 'https://leetcode.com/problems/coin-change/',
    category: 'Core',
    priority: 5,
    description: 'Return fewest number of coins needed to make up amount. -1 if impossible.',
    hints: [
      'This is unbounded knapsack variant',
      'dp[i] = min coins to make amount i',
      'For each coin, dp[i] = min(dp[i], dp[i-coin] + 1)',
    ],
    solution: {
      java: `public int coinChange(int[] coins, int amount) {
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
      timeComplexity: 'O(amount × coins)',
      spaceComplexity: 'O(amount)',
    },
  },

  'Coin Change II': {
    leetcodeUrl: 'https://leetcode.com/problems/coin-change-2/',
    category: 'Core',
    priority: 6,
    description: 'Count number of combinations to make up amount using given coins.',
    hints: [
      'This is unbounded knapsack - count combinations',
      'dp[i] = number of ways to make amount i',
      'Iterate coins first to avoid counting permutations',
    ],
    solution: {
      approach: 'For each coin, update dp[amount]. Coin-first loop counts combinations.',
      java: `public int change(int amount, int[] coins) {
    int[] dp = new int[amount + 1];
    dp[0] = 1;
    for (int coin : coins) {
        for (int i = coin; i <= amount; i++) {
            dp[i] += dp[i - coin];
        }
    }
    return dp[amount];
}`,
      timeComplexity: 'O(amount × coins)',
      spaceComplexity: 'O(amount)',
    },
  },

  'Perfect Squares': {
    leetcodeUrl: 'https://leetcode.com/problems/perfect-squares/',
    category: 'Practice',
    priority: 7,
    description: 'Find least number of perfect square numbers that sum to n.',
    hints: [
      'Similar to Coin Change with coins = perfect squares',
      'dp[i] = min squares to sum to i',
      'Try all squares <= i',
    ],
    solution: {
      approach: 'DP like Coin Change. For each i, try all perfect squares <= i.',
      java: `public int numSquares(int n) {
    int[] dp = new int[n + 1];
    Arrays.fill(dp, n + 1);
    dp[0] = 0;
    for (int i = 1; i <= n; i++) {
        for (int j = 1; j * j <= i; j++) {
            dp[i] = Math.min(dp[i], dp[i - j * j] + 1);
        }
    }
    return dp[n];
}`,
      timeComplexity: 'O(n × √n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Unique Paths': {
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths/',
    category: 'Foundation',
    priority: 2,
    description: 'Count unique paths from top-left to bottom-right in m×n grid (only move right or down).',
    hints: [
      'dp[i][j] = paths to reach (i, j)',
      'dp[i][j] = dp[i-1][j] + dp[i][j-1]',
      'Can optimize to 1D array',
    ],
    solution: {
      approach: 'DP: each cell = sum of paths from top and left. Use 1D array.',
      java: `public int uniquePaths(int m, int n) {
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int i = 1; i < m; i++) {
        for (int j = 1; j < n; j++) {
            dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Unique Paths II': {
    leetcodeUrl: 'https://leetcode.com/problems/unique-paths-ii/',
    category: 'Core',
    priority: 3,
    description: 'Count unique paths with obstacles. Obstacles are marked as 1.',
    hints: [
      'Same as Unique Paths but skip obstacles',
      'If cell is obstacle, dp[i][j] = 0',
      'Initialize first row/column carefully',
    ],
    solution: {
      approach: 'DP with obstacle check. Set dp = 0 for obstacles.',
      java: `public int uniquePathsWithObstacles(int[][] grid) {
    int n = grid[0].length;
    int[] dp = new int[n];
    dp[0] = 1;
    for (int[] row : grid) {
        for (int j = 0; j < n; j++) {
            if (row[j] == 1) dp[j] = 0;
            else if (j > 0) dp[j] += dp[j - 1];
        }
    }
    return dp[n - 1];
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Minimum Path Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-path-sum/',
    category: 'Core',
    priority: 4,
    description: 'Find path from top-left to bottom-right with minimum sum.',
    hints: [
      'dp[i][j] = min sum to reach (i, j)',
      'dp[i][j] = grid[i][j] + min(dp[i-1][j], dp[i][j-1])',
      'Initialize first row and column cumulatively',
    ],
    solution: {
      approach: 'DP: each cell = current value + min(top, left).',
      java: `public int minPathSum(int[][] grid) {
    int m = grid.length, n = grid[0].length;
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (i == 0 && j == 0) continue;
            else if (i == 0) grid[i][j] += grid[i][j - 1];
            else if (j == 0) grid[i][j] += grid[i - 1][j];
            else grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
        }
    }
    return grid[m - 1][n - 1];
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Triangle': {
    leetcodeUrl: 'https://leetcode.com/problems/triangle/',
    category: 'Practice',
    priority: 5,
    description: 'Find minimum path sum from top to bottom of triangle. Move to adjacent on row below.',
    hints: [
      'Bottom-up DP is easier',
      'Start from second-to-last row',
      'dp[j] += min(dp[j], dp[j+1])',
    ],
    solution: {
      approach: 'Bottom-up DP. Each cell adds min of two cells below.',
      java: `public int minimumTotal(List<List<Integer>> triangle) {
    int n = triangle.size();
    int[] dp = new int[n + 1];
    for (int i = n - 1; i >= 0; i--) {
        for (int j = 0; j <= i; j++) {
            dp[j] = triangle.get(i).get(j) + Math.min(dp[j], dp[j + 1]);
        }
    }
    return dp[0];
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
    },
  },

  'Longest Common Subsequence': {
    leetcodeUrl: 'https://leetcode.com/problems/longest-common-subsequence/',
    category: 'Core',
    priority: 7,
    description: 'Return length of longest common subsequence of two strings.',
    hints: [
      'Classic 2D DP problem',
      'If chars match: dp[i][j] = dp[i-1][j-1] + 1',
      'Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])',
    ],
    solution: {
      java: `public int longestCommonSubsequence(String s1, String s2) {
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
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  'Longest Palindromic Subsequence': {
    leetcodeUrl: 'https://leetcode.com/problems/longest-palindromic-subsequence/',
    category: 'Practice',
    priority: 8,
    description: 'Find length of longest palindromic subsequence in string.',
    hints: [
      'This is LCS of string and its reverse',
      'Or use interval DP: dp[i][j] = longest in s[i..j]',
      'If s[i] == s[j], dp[i][j] = dp[i+1][j-1] + 2',
    ],
    solution: {
      approach: 'LCS of string and its reverse. Or interval DP.',
      java: `public int longestPalindromeSubseq(String s) {
    int n = s.length();
    int[] dp = new int[n];
    Arrays.fill(dp, 1);
    for (int i = n - 2; i >= 0; i--) {
        int prev = 0;
        for (int j = i + 1; j < n; j++) {
            int temp = dp[j];
            if (s.charAt(i) == s.charAt(j)) dp[j] = prev + 2;
            else dp[j] = Math.max(dp[j], dp[j - 1]);
            prev = temp;
        }
    }
    return dp[n - 1];
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
    },
  },

  'Palindromic Substrings': {
    leetcodeUrl: 'https://leetcode.com/problems/palindromic-substrings/',
    category: 'Practice',
    priority: 8,
    description: 'Count palindromic substrings in the given string.',
    hints: [
      'Expand around center technique',
      'Each char is a center (odd length)',
      'Each pair of adjacent chars is a center (even length)',
    ],
    solution: {
      approach: 'Expand from each center (single char and pair of chars).',
      java: `public int countSubstrings(String s) {
    int count = 0;
    for (int i = 0; i < s.length(); i++) {
        count += expand(s, i, i);     // odd length
        count += expand(s, i, i + 1); // even length
    }
    return count;
}

private int expand(String s, int left, int right) {
    int count = 0;
    while (left >= 0 && right < s.length() && s.charAt(left) == s.charAt(right)) {
        count++;
        left--;
        right++;
    }
    return count;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
    },
  },

  'Edit Distance': {
    leetcodeUrl: 'https://leetcode.com/problems/edit-distance/',
    category: 'Challenge',
    priority: 10,
    description: 'Find minimum operations (insert, delete, replace) to convert word1 to word2.',
    hints: [
      'dp[i][j] = min ops to convert word1[0..i) to word2[0..j)',
      'If chars equal: dp[i][j] = dp[i-1][j-1]',
      'Else: 1 + min(insert, delete, replace)',
    ],
    solution: {
      approach: '2D DP. If chars match, no op. Else min of three operations.',
      java: `public int minDistance(String word1, String word2) {
    int m = word1.length(), n = word2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = i;
    for (int j = 0; j <= n; j++) dp[0][j] = j;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            if (word1.charAt(i - 1) == word2.charAt(j - 1)) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j - 1], Math.min(dp[i - 1][j], dp[i][j - 1]));
            }
        }
    }
    return dp[m][n];
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  'Distinct Subsequences': {
    leetcodeUrl: 'https://leetcode.com/problems/distinct-subsequences/',
    category: 'Challenge',
    priority: 11,
    description: 'Count distinct subsequences of s that equal t.',
    examples: [
      { input: 's = "rabbbit", t = "rabbit"', output: '3', explanation: 'Three ways to form "rabbit" from s.' },
    ],
    hints: [
      'dp[i][j] = ways to form t[0..j) from s[0..i)',
      'If chars match: dp[i][j] = dp[i-1][j-1] + dp[i-1][j]',
      'If not: dp[i][j] = dp[i-1][j]',
    ],
    solution: {
      approach: '2D DP. If chars match, add both taking and skipping current char.',
      java: `public int numDistinct(String s, String t) {
    int m = s.length(), n = t.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 0; i <= m; i++) dp[i][0] = 1;
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = dp[i - 1][j];
            if (s.charAt(i - 1) == t.charAt(j - 1)) {
                dp[i][j] += dp[i - 1][j - 1];
            }
        }
    }
    return dp[m][n];
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  'Partition Equal Subset Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/partition-equal-subset-sum/',
    category: 'Core',
    priority: 9,
    description: 'Check if array can be partitioned into two subsets with equal sum.',
    hints: [
      'Total sum must be even',
      'Find subset with sum = totalSum / 2',
      'This is 0/1 Knapsack problem',
    ],
    solution: {
      approach: '0/1 Knapsack: can we achieve sum = total/2?',
      java: `public boolean canPartition(int[] nums) {
    int sum = 0;
    for (int n : nums) sum += n;
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
      timeComplexity: 'O(n × sum)',
      spaceComplexity: 'O(sum)',
    },
  },

  'Target Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/target-sum/',
    category: 'Core',
    priority: 9,
    description: 'Count ways to assign + or - to each number to reach target sum.',
    hints: [
      'Transform to subset sum: P - N = target, P + N = sum',
      'Find subsets with sum = (sum + target) / 2',
      'Use 0/1 Knapsack to count combinations',
    ],
    solution: {
      approach: 'Transform to: find subsets summing to (sum + target) / 2.',
      java: `public int findTargetSumWays(int[] nums, int target) {
    int sum = 0;
    for (int n : nums) sum += n;
    if ((sum + target) % 2 != 0 || sum < Math.abs(target)) return 0;
    int s = (sum + target) / 2;
    int[] dp = new int[s + 1];
    dp[0] = 1;
    for (int num : nums) {
        for (int j = s; j >= num; j--) {
            dp[j] += dp[j - num];
        }
    }
    return dp[s];
}`,
      timeComplexity: 'O(n × sum)',
      spaceComplexity: 'O(sum)',
    },
  },

  'Last Stone Weight II': {
    leetcodeUrl: 'https://leetcode.com/problems/last-stone-weight-ii/',
    category: 'Practice',
    priority: 10,
    description: 'Smash stones optimally to minimize remaining weight.',
    examples: [
      { input: 'stones = [2,7,4,1,8,1]', output: '1', explanation: 'Optimal smashing leaves weight 1.' },
    ],
    hints: [
      'Equivalent to partitioning into two groups',
      'Minimize |sum(group1) - sum(group2)|',
      'Find largest sum <= total/2 using 0/1 knapsack',
    ],
    solution: {
      approach: '0/1 Knapsack to find closest partition to half. Result = total - 2*closest.',
      java: `public int lastStoneWeightII(int[] stones) {
    int total = 0;
    for (int s : stones) total += s;
    int target = total / 2;
    boolean[] dp = new boolean[target + 1];
    dp[0] = true;
    for (int stone : stones) {
        for (int j = target; j >= stone; j--) {
            dp[j] = dp[j] || dp[j - stone];
        }
    }
    for (int j = target; j >= 0; j--) {
        if (dp[j]) return total - 2 * j;
    }
    return 0;
}`,
      timeComplexity: 'O(n × sum)',
      spaceComplexity: 'O(sum)',
    },
  },

  'Ones and Zeroes': {
    leetcodeUrl: 'https://leetcode.com/problems/ones-and-zeroes/',
    category: 'Practice',
    priority: 11,
    description: 'Find max subset size with at most m zeros and n ones.',
    examples: [
      { input: 'strs = ["10","0001","111001","1","0"], m = 5, n = 3', output: '4', explanation: 'Max subset: ["10","0001","1","0"].' },
    ],
    hints: [
      '2D knapsack problem',
      'dp[i][j] = max strings using i zeros and j ones',
      'For each string, update dp in reverse',
    ],
    solution: {
      approach: '2D knapsack. dp[i][j] = max strings with i zeros, j ones.',
      java: `public int findMaxForm(String[] strs, int m, int n) {
    int[][] dp = new int[m + 1][n + 1];
    for (String s : strs) {
        int zeros = 0, ones = 0;
        for (char c : s.toCharArray()) {
            if (c == '0') zeros++; else ones++;
        }
        for (int i = m; i >= zeros; i--) {
            for (int j = n; j >= ones; j--) {
                dp[i][j] = Math.max(dp[i][j], dp[i - zeros][j - ones] + 1);
            }
        }
    }
    return dp[m][n];
}`,
      timeComplexity: 'O(l × m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  'Burst Balloons': {
    leetcodeUrl: 'https://leetcode.com/problems/burst-balloons/',
    category: 'Advanced',
    priority: 15,
    description: 'Burst balloons to maximize coins. Get nums[i-1]*nums[i]*nums[i+1] coins.',
    examples: [
      { input: 'nums = [3,1,5,8]', output: '167', explanation: 'Burst order: 1,5,3,8 gives 167 coins.' },
    ],
    hints: [
      'Think reverse: which balloon to burst LAST',
      'Interval DP: dp[i][j] = max coins for bursting balloons in (i,j)',
      'Last balloon k: dp[i][j] = dp[i][k] + dp[k][j] + nums[i]*nums[k]*nums[j]',
    ],
    solution: {
      approach: 'Interval DP. Think which balloon to burst last in each interval.',
      java: `public int maxCoins(int[] nums) {
    int n = nums.length;
    int[] arr = new int[n + 2];
    arr[0] = arr[n + 1] = 1;
    for (int i = 0; i < n; i++) arr[i + 1] = nums[i];
    int[][] dp = new int[n + 2][n + 2];
    for (int len = 1; len <= n; len++) {
        for (int left = 1; left <= n - len + 1; left++) {
            int right = left + len - 1;
            for (int k = left; k <= right; k++) {
                dp[left][right] = Math.max(dp[left][right],
                    dp[left][k - 1] + arr[left - 1] * arr[k] * arr[right + 1] + dp[k + 1][right]);
            }
        }
    }
    return dp[1][n];
}`,
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
    },
  },

  'Minimum Cost Tree From Leaf Values': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/',
    category: 'Challenge',
    priority: 12,
    description: 'Build tree where each non-leaf is product of max of left and right subtree leaves.',
    examples: [
      { input: 'arr = [6,2,4]', output: '32', explanation: 'One optimal tree has cost 32.' },
    ],
    hints: [
      'Monotonic stack approach is optimal',
      'Or interval DP like Burst Balloons',
      'Greedy: always multiply smallest with its smaller neighbor',
    ],
    solution: {
      approach: 'Monotonic decreasing stack. Pop when smaller element found.',
      java: `public int mctFromLeafValues(int[] arr) {
    Deque<Integer> stack = new ArrayDeque<>();
    stack.push(Integer.MAX_VALUE);
    int result = 0;
    for (int num : arr) {
        while (stack.peek() <= num) {
            int mid = stack.pop();
            result += mid * Math.min(stack.peek(), num);
        }
        stack.push(num);
    }
    while (stack.size() > 2) {
        result += stack.pop() * stack.peek();
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Best Time to Buy and Sell Stock': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock/',
    category: 'Foundation',
    priority: 1,
    solution: {
      java: `public int maxProfit(int[] prices) {
    int minPrice = Integer.MAX_VALUE, maxProfit = 0;
    for (int price : prices) {
        minPrice = Math.min(minPrice, price);
        maxProfit = Math.max(maxProfit, price - minPrice);
    }
    return maxProfit;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Best Time to Buy and Sell Stock II': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/',
    category: 'Foundation',
    priority: 2,
    description: 'Find maximum profit with unlimited transactions.',
    hints: [
      'Buy and sell on same day allowed',
      'Capture all upward movements',
      'If tomorrow > today, buy today sell tomorrow',
    ],
    solution: {
      approach: 'Greedy: collect all positive price differences.',
      java: `public int maxProfit(int[] prices) {
    int profit = 0;
    for (int i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            profit += prices[i] - prices[i - 1];
        }
    }
    return profit;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Best Time to Buy and Sell Stock III': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/',
    category: 'Challenge',
    priority: 13,
    description: 'Find maximum profit with at most 2 transactions.',
    examples: [
      { input: 'prices = [3,3,5,0,0,3,1,4]', output: '6', explanation: 'Buy at 0, sell at 3, buy at 1, sell at 4.' },
    ],
    hints: [
      'Track states: buy1, sell1, buy2, sell2',
      'Update in order: buy1 → sell1 → buy2 → sell2',
      'Or use DP with transaction count',
    ],
    solution: {
      approach: 'State machine: track max profit at each state (buy1, sell1, buy2, sell2).',
      java: `public int maxProfit(int[] prices) {
    int buy1 = Integer.MIN_VALUE, sell1 = 0;
    int buy2 = Integer.MIN_VALUE, sell2 = 0;
    for (int price : prices) {
        buy1 = Math.max(buy1, -price);
        sell1 = Math.max(sell1, buy1 + price);
        buy2 = Math.max(buy2, sell1 - price);
        sell2 = Math.max(sell2, buy2 + price);
    }
    return sell2;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Best Time to Buy and Sell Stock IV': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/',
    category: 'Challenge',
    priority: 14,
    description: 'Find maximum profit with at most k transactions.',
    examples: [
      { input: 'k = 2, prices = [3,2,6,5,0,3]', output: '7', explanation: 'Buy at 2, sell at 6, buy at 0, sell at 3.' },
    ],
    hints: [
      'Generalization of Stock III',
      'dp[i][j] = max profit with i transactions up to day j',
      'If k >= n/2, unlimited transactions',
    ],
    solution: {
      approach: 'DP with k transactions. Optimize to O(k) space with buy/sell arrays.',
      java: `public int maxProfit(int k, int[] prices) {
    if (prices.length == 0) return 0;
    if (k >= prices.length / 2) {
        int profit = 0;
        for (int i = 1; i < prices.length; i++)
            profit += Math.max(0, prices[i] - prices[i - 1]);
        return profit;
    }
    int[] buy = new int[k + 1], sell = new int[k + 1];
    Arrays.fill(buy, Integer.MIN_VALUE);
    for (int price : prices) {
        for (int i = 1; i <= k; i++) {
            buy[i] = Math.max(buy[i], sell[i - 1] - price);
            sell[i] = Math.max(sell[i], buy[i] + price);
        }
    }
    return sell[k];
}`,
      timeComplexity: 'O(n × k)',
      spaceComplexity: 'O(k)',
    },
  },

  'Best Time to Buy and Sell Stock with Cooldown': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
    category: 'Practice',
    priority: 12,
    description: 'Max profit with unlimited transactions but 1 day cooldown after selling.',
    examples: [
      { input: 'prices = [1,2,3,0,2]', output: '3', explanation: 'Buy, sell, cooldown, buy, sell.' },
    ],
    hints: [
      'State machine: hold, sold, rest',
      'hold[i] = max(hold[i-1], rest[i-1] - price)',
      'sold[i] = hold[i-1] + price, rest[i] = max(rest[i-1], sold[i-1])',
    ],
    solution: {
      approach: 'State machine DP. Track hold, sold, and rest states.',
      java: `public int maxProfit(int[] prices) {
    if (prices.length <= 1) return 0;
    int hold = -prices[0], sold = 0, rest = 0;
    for (int i = 1; i < prices.length; i++) {
        int prevSold = sold;
        sold = hold + prices[i];
        hold = Math.max(hold, rest - prices[i]);
        rest = Math.max(rest, prevSold);
    }
    return Math.max(sold, rest);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Best Time to Buy and Sell Stock with Transaction Fee': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/',
    category: 'Practice',
    priority: 12,
    description: 'Max profit with unlimited transactions. Pay fee for each transaction.',
    examples: [
      { input: 'prices = [1,3,2,8,4,9], fee = 2', output: '8', explanation: 'Buy at 1, sell at 8, buy at 4, sell at 9.' },
    ],
    hints: [
      'Two states: holding stock or not',
      'hold[i] = max(hold[i-1], cash[i-1] - price)',
      'cash[i] = max(cash[i-1], hold[i-1] + price - fee)',
    ],
    solution: {
      approach: 'DP with two states: cash (not holding) and hold (holding stock).',
      java: `public int maxProfit(int[] prices, int fee) {
    int cash = 0, hold = -prices[0];
    for (int i = 1; i < prices.length; i++) {
        cash = Math.max(cash, hold + prices[i] - fee);
        hold = Math.max(hold, cash - prices[i]);
    }
    return cash;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Longest Increasing Subsequence': {
    leetcodeUrl: 'https://leetcode.com/problems/longest-increasing-subsequence/',
    category: 'Core',
    priority: 6,
    description: 'Find length of longest strictly increasing subsequence.',
    hints: [
      'O(n²) DP: dp[i] = LIS ending at i',
      'O(n log n): maintain sorted array of smallest tail for each length',
      'Binary search to find position to replace',
    ],
    solution: {
      approach: 'Patience sorting with binary search. Track smallest tail for each length.',
      java: `public int lengthOfLIS(int[] nums) {
    List<Integer> tails = new ArrayList<>();
    for (int num : nums) {
        int pos = Collections.binarySearch(tails, num);
        if (pos < 0) pos = -(pos + 1);
        if (pos == tails.size()) tails.add(num);
        else tails.set(pos, num);
    }
    return tails.size();
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Word Break': {
    leetcodeUrl: 'https://leetcode.com/problems/word-break/',
    category: 'Core',
    priority: 7,
    description: 'Check if string can be segmented into space-separated dictionary words.',
    hints: [
      'dp[i] = can we segment s[0..i-1]?',
      'For each i, check all j < i where dp[j] && s[j..i-1] in dict',
      'Use HashSet for O(1) word lookup',
    ],
    solution: {
      approach: 'DP: dp[i] = true if s[0..i) can be segmented.',
      java: `public boolean wordBreak(String s, List<String> wordDict) {
    Set<String> dict = new HashSet<>(wordDict);
    boolean[] dp = new boolean[s.length() + 1];
    dp[0] = true;
    for (int i = 1; i <= s.length(); i++) {
        for (int j = 0; j < i; j++) {
            if (dp[j] && dict.contains(s.substring(j, i))) {
                dp[i] = true;
                break;
            }
        }
    }
    return dp[s.length()];
}`,
      timeComplexity: 'O(n² × k)',
      spaceComplexity: 'O(n)',
    },
  },

  'Decode Ways': {
    leetcodeUrl: 'https://leetcode.com/problems/decode-ways/',
    category: 'Practice',
    priority: 8,
    description: 'Count ways to decode a digit string where A=1, B=2, ..., Z=26.',
    hints: [
      'Similar to climbing stairs',
      'Single digit: 1-9 valid',
      'Two digits: 10-26 valid',
    ],
    solution: {
      approach: 'DP like Fibonacci. Check if single and double digits are valid.',
      java: `public int numDecodings(String s) {
    if (s.charAt(0) == '0') return 0;
    int prev2 = 1, prev1 = 1;
    for (int i = 1; i < s.length(); i++) {
        int curr = 0;
        if (s.charAt(i) != '0') curr = prev1;
        int twoDigit = Integer.parseInt(s.substring(i - 1, i + 1));
        if (twoDigit >= 10 && twoDigit <= 26) curr += prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Jump Game': {
    leetcodeUrl: 'https://leetcode.com/problems/jump-game/',
    category: 'Core',
    priority: 5,
    description: 'Determine if you can reach the last index starting from index 0.',
    hints: [
      'Greedy: track maximum reachable index',
      'If current index > max reachable, return false',
      'Update max reachable at each step',
    ],
    solution: {
      approach: 'Greedy: track farthest reachable. If i > farthest, stuck.',
      java: `public boolean canJump(int[] nums) {
    int maxReach = 0;
    for (int i = 0; i < nums.length; i++) {
        if (i > maxReach) return false;
        maxReach = Math.max(maxReach, i + nums[i]);
    }
    return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Jump Game II': {
    leetcodeUrl: 'https://leetcode.com/problems/jump-game-ii/',
    category: 'Practice',
    priority: 8,
    description: 'Find minimum number of jumps to reach the last index.',
    hints: [
      'Greedy: BFS-like approach',
      'Track current range end and farthest reachable',
      'When reaching current end, increment jumps',
    ],
    solution: {
      approach: 'Greedy BFS: track range boundaries, count level transitions.',
      java: `public int jump(int[] nums) {
    int jumps = 0, currentEnd = 0, farthest = 0;
    for (int i = 0; i < nums.length - 1; i++) {
        farthest = Math.max(farthest, i + nums[i]);
        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  // ==================== BACKTRACKING ====================
  'Subsets': {
    leetcodeUrl: 'https://leetcode.com/problems/subsets/',
    category: 'Foundation',
    priority: 1,
    description: 'Given an integer array of unique elements, return all possible subsets (the power set).',
    hints: [
      'Classic backtracking template',
      'At each step: include or exclude current element',
      'Add current subset to result at every step',
    ],
    solution: {
      java: `public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
    result.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(nums, i + 1, curr, result);
        curr.remove(curr.size() - 1);
    }
}`,
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Subsets II': {
    leetcodeUrl: 'https://leetcode.com/problems/subsets-ii/',
    category: 'Core',
    priority: 2,
    description: 'Return all subsets of array with duplicates (no duplicate subsets).',
    hints: [
      'Sort array first',
      'Skip duplicates at same recursion level',
      'If nums[i] == nums[i-1] and i > start, skip',
    ],
    solution: {
      approach: 'Sort and skip consecutive duplicates at same level.',
      java: `public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
    result.add(new ArrayList<>(curr));
    for (int i = start; i < nums.length; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        curr.add(nums[i]);
        backtrack(nums, i + 1, curr, result);
        curr.remove(curr.size() - 1);
    }
}`,
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Permutations': {
    leetcodeUrl: 'https://leetcode.com/problems/permutations/',
    category: 'Core',
    priority: 2,
    description: 'Given an array of distinct integers, return all the possible permutations.',
    hints: [
      'Use a visited/used array',
      'Add element when visited, remove when backtracking',
      'Result when length equals input length',
    ],
    solution: {
      java: `public List<List<Integer>> permute(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[nums.length];
    backtrack(nums, used, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, boolean[] used, List<Integer> curr, List<List<Integer>> result) {
    if (curr.size() == nums.length) {
        result.add(new ArrayList<>(curr));
        return;
    }
    for (int i = 0; i < nums.length; i++) {
        if (used[i]) continue;
        used[i] = true;
        curr.add(nums[i]);
        backtrack(nums, used, curr, result);
        curr.remove(curr.size() - 1);
        used[i] = false;
    }
}`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
    },
  },

  'Permutations II': {
    leetcodeUrl: 'https://leetcode.com/problems/permutations-ii/',
    category: 'Core',
    priority: 3,
    description: 'Return all unique permutations of array with duplicates.',
    hints: [
      'Sort array first',
      'Skip if same as previous AND previous not used',
      'This ensures duplicates used in order',
    ],
    solution: {
      approach: 'Sort array. Skip duplicate if previous same element not used.',
      java: `public List<List<Integer>> permuteUnique(int[] nums) {
    Arrays.sort(nums);
    List<List<Integer>> result = new ArrayList<>();
    boolean[] used = new boolean[nums.length];
    backtrack(nums, used, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, boolean[] used, List<Integer> curr, List<List<Integer>> result) {
    if (curr.size() == nums.length) { result.add(new ArrayList<>(curr)); return; }
    for (int i = 0; i < nums.length; i++) {
        if (used[i] || (i > 0 && nums[i] == nums[i - 1] && !used[i - 1])) continue;
        used[i] = true;
        curr.add(nums[i]);
        backtrack(nums, used, curr, result);
        curr.remove(curr.size() - 1);
        used[i] = false;
    }
}`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
    },
  },

  'Combinations': {
    leetcodeUrl: 'https://leetcode.com/problems/combinations/',
    category: 'Foundation',
    priority: 1,
    description: 'Return all combinations of k numbers from [1, n].',
    hints: [
      'Standard backtracking with fixed size',
      'Add to result when size == k',
      'Prune: if remaining < needed, stop',
    ],
    solution: {
      approach: 'Backtrack with start index. Add to result when size == k.',
      java: `public List<List<Integer>> combine(int n, int k) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(n, k, 1, new ArrayList<>(), result);
    return result;
}

private void backtrack(int n, int k, int start, List<Integer> curr, List<List<Integer>> result) {
    if (curr.size() == k) { result.add(new ArrayList<>(curr)); return; }
    for (int i = start; i <= n - (k - curr.size()) + 1; i++) {
        curr.add(i);
        backtrack(n, k, i + 1, curr, result);
        curr.remove(curr.size() - 1);
    }
}`,
      timeComplexity: 'O(C(n,k))',
      spaceComplexity: 'O(k)',
    },
  },

  'Combination Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum/',
    category: 'Core',
    priority: 3,
    description: 'Find combinations that sum to target. Same number can be used unlimited times.',
    hints: [
      'Unbounded: can reuse same element',
      'Pass same index i (not i+1) for reuse',
      'Stop when remaining < 0',
    ],
    solution: {
      approach: 'Backtrack allowing reuse by passing same index.',
      java: `public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int remain, int start, List<Integer> curr, List<List<Integer>> result) {
    if (remain == 0) { result.add(new ArrayList<>(curr)); return; }
    if (remain < 0) return;
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(nums, remain - nums[i], i, curr, result); // same i for reuse
        curr.remove(curr.size() - 1);
    }
}`,
      timeComplexity: 'O(n^(target/min))',
      spaceComplexity: 'O(target/min)',
    },
  },

  'Combination Sum II': {
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum-ii/',
    category: 'Core',
    priority: 4,
    description: 'Find combinations summing to target. Each number used once. No duplicate combinations.',
    hints: [
      'Sort array to handle duplicates',
      'Use i+1 (each element once)',
      'Skip duplicates at same level',
    ],
    solution: {
      approach: 'Sort, skip duplicates, use each element at most once.',
      java: `public List<List<Integer>> combinationSum2(int[] candidates, int target) {
    Arrays.sort(candidates);
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, target, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int remain, int start, List<Integer> curr, List<List<Integer>> result) {
    if (remain == 0) { result.add(new ArrayList<>(curr)); return; }
    for (int i = start; i < nums.length && nums[i] <= remain; i++) {
        if (i > start && nums[i] == nums[i - 1]) continue;
        curr.add(nums[i]);
        backtrack(nums, remain - nums[i], i + 1, curr, result);
        curr.remove(curr.size() - 1);
    }
}`,
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Combination Sum III': {
    leetcodeUrl: 'https://leetcode.com/problems/combination-sum-iii/',
    category: 'Practice',
    priority: 5,
    description: 'Find all combinations of k numbers (1-9) that sum to n. Each number used once.',
    examples: [
      { input: 'k = 3, n = 7', output: '[[1,2,4]]', explanation: 'Only [1,2,4] sums to 7 with 3 numbers.' },
    ],
    hints: [
      'Backtrack with fixed size k',
      'Use numbers 1-9 only once each',
      'Prune when sum exceeds n or not enough numbers left',
    ],
    solution: {
      approach: 'Backtrack choosing from 1-9, ensuring exactly k numbers sum to n.',
      java: `public List<List<Integer>> combinationSum3(int k, int n) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(k, n, 1, new ArrayList<>(), result);
    return result;
}

private void backtrack(int k, int remain, int start, List<Integer> curr, List<List<Integer>> result) {
    if (curr.size() == k) {
        if (remain == 0) result.add(new ArrayList<>(curr));
        return;
    }
    for (int i = start; i <= 9 && remain >= i; i++) {
        curr.add(i);
        backtrack(k, remain - i, i + 1, curr, result);
        curr.remove(curr.size() - 1);
    }
}`,
      timeComplexity: 'O(C(9,k))',
      spaceComplexity: 'O(k)',
    },
  },

  'Letter Combinations of a Phone Number': {
    leetcodeUrl: 'https://leetcode.com/problems/letter-combinations-of-a-phone-number/',
    category: 'Core',
    priority: 3,
    description: 'Return all letter combinations that phone number could represent.',
    hints: [
      'Map each digit to its letters',
      'Backtrack through each digit',
      'For each digit, try all corresponding letters',
    ],
    solution: {
      approach: 'Backtrack: for each digit, append each possible letter.',
      java: `private static final String[] MAPPING = {"", "", "abc", "def", "ghi", "jkl", "mno", "pqrs", "tuv", "wxyz"};

public List<String> letterCombinations(String digits) {
    List<String> result = new ArrayList<>();
    if (digits.isEmpty()) return result;
    backtrack(digits, 0, new StringBuilder(), result);
    return result;
}

private void backtrack(String digits, int idx, StringBuilder curr, List<String> result) {
    if (idx == digits.length()) { result.add(curr.toString()); return; }
    for (char c : MAPPING[digits.charAt(idx) - '0'].toCharArray()) {
        curr.append(c);
        backtrack(digits, idx + 1, curr, result);
        curr.deleteCharAt(curr.length() - 1);
    }
}`,
      timeComplexity: 'O(4^n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Palindrome Partitioning': {
    leetcodeUrl: 'https://leetcode.com/problems/palindrome-partitioning/',
    category: 'Core',
    priority: 5,
    description: 'Return all possible palindrome partitionings of string.',
    hints: [
      'Backtrack with isPalindrome check',
      'For each position, try all valid palindrome prefixes',
      'Add partition when reaching end of string',
    ],
    solution: {
      approach: 'Backtrack: at each position, try all palindrome prefixes.',
      java: `public List<List<String>> partition(String s) {
    List<List<String>> result = new ArrayList<>();
    backtrack(s, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(String s, int start, List<String> curr, List<List<String>> result) {
    if (start == s.length()) { result.add(new ArrayList<>(curr)); return; }
    for (int end = start; end < s.length(); end++) {
        if (isPalindrome(s, start, end)) {
            curr.add(s.substring(start, end + 1));
            backtrack(s, end + 1, curr, result);
            curr.remove(curr.size() - 1);
        }
    }
}

private boolean isPalindrome(String s, int l, int r) {
    while (l < r) if (s.charAt(l++) != s.charAt(r--)) return false;
    return true;
}`,
      timeComplexity: 'O(n × 2^n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Palindrome Permutation II': {
    leetcodeUrl: 'https://leetcode.com/problems/palindrome-permutation-ii/',
    category: 'Practice',
    priority: 6,
    description: 'Return all palindromic permutations of a string.',
    examples: [
      { input: 's = "aabb"', output: '["abba","baab"]', explanation: 'Two palindrome permutations.' },
    ],
    hints: [
      'First check if palindrome is possible (at most 1 odd count)',
      'Only permute half the characters',
      'Mirror the first half to create palindrome',
    ],
    solution: {
      approach: 'Count chars, permute half (handling duplicates), mirror to form palindrome.',
      java: `public List<String> generatePalindromes(String s) {
    List<String> result = new ArrayList<>();
    int[] count = new int[128];
    for (char c : s.toCharArray()) count[c]++;
    String mid = "";
    List<Character> half = new ArrayList<>();
    for (int i = 0; i < 128; i++) {
        if (count[i] % 2 == 1) {
            if (!mid.isEmpty()) return result;
            mid = String.valueOf((char) i);
        }
        for (int j = 0; j < count[i] / 2; j++) half.add((char) i);
    }
    permute(half, new boolean[half.size()], new StringBuilder(), mid, result);
    return result;
}

private void permute(List<Character> half, boolean[] used, StringBuilder sb, String mid, List<String> result) {
    if (sb.length() == half.size()) {
        result.add(sb.toString() + mid + sb.reverse().toString());
        sb.reverse();
        return;
    }
    for (int i = 0; i < half.size(); i++) {
        if (used[i] || (i > 0 && half.get(i) == half.get(i-1) && !used[i-1])) continue;
        used[i] = true;
        sb.append(half.get(i));
        permute(half, used, sb, mid, result);
        sb.deleteCharAt(sb.length() - 1);
        used[i] = false;
    }
}`,
      timeComplexity: 'O((n/2)!)',
      spaceComplexity: 'O(n)',
    },
  },

  'Generate Parentheses': {
    leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
    category: 'Core',
    priority: 4,
    description: 'Generate all combinations of well-formed parentheses.',
    examples: [
      { input: 'n = 3', output: '["((()))","(()())","(())()","()(())","()()()"]', explanation: 'All valid combinations of 3 pairs.' },
    ],
    hints: [
      'Track open and close counts',
      'Add ( if open < n',
      'Add ) if close < open',
    ],
    solution: {
      approach: 'Backtrack with constraints: open <= n and close <= open.',
      java: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(n, 0, 0, new StringBuilder(), result);
    return result;
}

private void backtrack(int n, int open, int close, StringBuilder sb, List<String> result) {
    if (sb.length() == 2 * n) {
        result.add(sb.toString());
        return;
    }
    if (open < n) {
        sb.append('(');
        backtrack(n, open + 1, close, sb, result);
        sb.deleteCharAt(sb.length() - 1);
    }
    if (close < open) {
        sb.append(')');
        backtrack(n, open, close + 1, sb, result);
        sb.deleteCharAt(sb.length() - 1);
    }
}`,
      timeComplexity: 'O(4^n / √n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Permutation Sequence': {
    leetcodeUrl: 'https://leetcode.com/problems/permutation-sequence/',
    category: 'Challenge',
    priority: 10,
    description: 'Return the kth permutation sequence of [1,2,...,n].',
    examples: [
      { input: 'n = 3, k = 3', output: '"213"', explanation: '3rd permutation of [1,2,3] is "213".' },
    ],
    hints: [
      'Use factorial to determine each digit',
      'k-1 index, then k / (n-1)! gives first digit index',
      'Remove used digit and repeat',
    ],
    solution: {
      approach: 'Math: compute each position using factorials and k.',
      java: `public String getPermutation(int n, int k) {
    List<Integer> nums = new ArrayList<>();
    int[] factorial = new int[n + 1];
    factorial[0] = 1;
    for (int i = 1; i <= n; i++) {
        factorial[i] = factorial[i - 1] * i;
        nums.add(i);
    }
    k--;
    StringBuilder sb = new StringBuilder();
    for (int i = n; i > 0; i--) {
        int idx = k / factorial[i - 1];
        sb.append(nums.get(idx));
        nums.remove(idx);
        k %= factorial[i - 1];
    }
    return sb.toString();
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
    },
  },

  'Beautiful Arrangement': {
    leetcodeUrl: 'https://leetcode.com/problems/beautiful-arrangement/',
    category: 'Practice',
    priority: 7,
    description: 'Count permutations where perm[i] divisible by i or i divisible by perm[i].',
    examples: [
      { input: 'n = 2', output: '2', explanation: '[1,2] and [2,1] are both beautiful.' },
    ],
    hints: [
      'Backtrack with position-by-position placement',
      'At position i, try all unvisited numbers that satisfy divisibility',
      'Count complete permutations',
    ],
    solution: {
      approach: 'Backtrack placing numbers at valid positions only.',
      java: `public int countArrangement(int n) {
    return backtrack(n, 1, new boolean[n + 1]);
}

private int backtrack(int n, int pos, boolean[] used) {
    if (pos > n) return 1;
    int count = 0;
    for (int num = 1; num <= n; num++) {
        if (!used[num] && (num % pos == 0 || pos % num == 0)) {
            used[num] = true;
            count += backtrack(n, pos + 1, used);
            used[num] = false;
        }
    }
    return count;
}`,
      timeComplexity: 'O(k) where k is valid permutations',
      spaceComplexity: 'O(n)',
    },
  },

  'The k-th Lexicographical String of All Happy Strings of Length n': {
    leetcodeUrl: 'https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/',
    category: 'Practice',
    priority: 8,
    description: 'Return kth happy string of length n (no adjacent same chars, using a,b,c).',
    examples: [
      { input: 'n = 3, k = 9', output: '"cab"', explanation: '9th happy string of length 3.' },
    ],
    hints: [
      'Backtrack generating strings in lexicographic order',
      'Stop when kth string found',
      'At each position, try a, b, c if different from previous',
    ],
    solution: {
      approach: 'Backtrack in lexicographic order, return kth valid string.',
      java: `private int count = 0;
private String result = "";

public String getHappyString(int n, int k) {
    count = k;
    backtrack(n, new StringBuilder());
    return result;
}

private void backtrack(int n, StringBuilder sb) {
    if (!result.isEmpty()) return;
    if (sb.length() == n) {
        if (--count == 0) result = sb.toString();
        return;
    }
    for (char c = 'a'; c <= 'c'; c++) {
        if (sb.length() > 0 && sb.charAt(sb.length() - 1) == c) continue;
        sb.append(c);
        backtrack(n, sb);
        sb.deleteCharAt(sb.length() - 1);
    }
}`,
      timeComplexity: 'O(k)',
      spaceComplexity: 'O(n)',
    },
  },

  'N-Queens': {
    leetcodeUrl: 'https://leetcode.com/problems/n-queens/',
    category: 'Challenge',
    priority: 11,
    description: 'Place n queens on n×n board so no two queens attack each other.',
    hints: [
      'Place one queen per row',
      'Track columns and diagonals used',
      'Backtrack when conflict detected',
    ],
    solution: {
      approach: 'Backtrack row by row. Track used columns and diagonals with sets.',
      java: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    Set<Integer> cols = new HashSet<>(), diag1 = new HashSet<>(), diag2 = new HashSet<>();
    backtrack(n, 0, new int[n], cols, diag1, diag2, result);
    return result;
}

private void backtrack(int n, int row, int[] queens, Set<Integer> cols, Set<Integer> d1, Set<Integer> d2, List<List<String>> result) {
    if (row == n) { result.add(build(queens)); return; }
    for (int col = 0; col < n; col++) {
        if (cols.contains(col) || d1.contains(row - col) || d2.contains(row + col)) continue;
        queens[row] = col;
        cols.add(col); d1.add(row - col); d2.add(row + col);
        backtrack(n, row + 1, queens, cols, d1, d2, result);
        cols.remove(col); d1.remove(row - col); d2.remove(row + col);
    }
}`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
    },
  },

  'N-Queens II': {
    leetcodeUrl: 'https://leetcode.com/problems/n-queens-ii/',
    category: 'Challenge',
    priority: 11,
    description: 'Count distinct solutions to N-Queens problem.',
    examples: [
      { input: 'n = 4', output: '2', explanation: 'Two distinct solutions exist for 4-queens.' },
    ],
    hints: [
      'Same as N-Queens but only count solutions',
      'Track columns and diagonals with sets or arrays',
      'Increment count when valid placement found',
    ],
    solution: {
      approach: 'Backtrack row by row counting valid placements.',
      java: `public int totalNQueens(int n) {
    return backtrack(n, 0, new boolean[n], new boolean[2 * n], new boolean[2 * n]);
}

private int backtrack(int n, int row, boolean[] cols, boolean[] diag1, boolean[] diag2) {
    if (row == n) return 1;
    int count = 0;
    for (int col = 0; col < n; col++) {
        int d1 = row - col + n, d2 = row + col;
        if (cols[col] || diag1[d1] || diag2[d2]) continue;
        cols[col] = diag1[d1] = diag2[d2] = true;
        count += backtrack(n, row + 1, cols, diag1, diag2);
        cols[col] = diag1[d1] = diag2[d2] = false;
    }
    return count;
}`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
    },
  },

  'Sudoku Solver': {
    leetcodeUrl: 'https://leetcode.com/problems/sudoku-solver/',
    category: 'Advanced',
    priority: 12,
    description: 'Fill the 9×9 board such that each row, column, and 3×3 box contains digits 1-9.',
    examples: [
      { input: 'board with some cells filled', output: 'completed valid sudoku', explanation: 'One valid solution.' },
    ],
    hints: [
      'Backtrack cell by cell',
      'For each empty cell, try 1-9',
      'Check row, column, and box constraints',
    ],
    solution: {
      approach: 'Backtrack trying digits 1-9 in empty cells, validating constraints.',
      java: `public void solveSudoku(char[][] board) {
    solve(board);
}

private boolean solve(char[][] board) {
    for (int i = 0; i < 9; i++) {
        for (int j = 0; j < 9; j++) {
            if (board[i][j] == '.') {
                for (char c = '1'; c <= '9'; c++) {
                    if (isValid(board, i, j, c)) {
                        board[i][j] = c;
                        if (solve(board)) return true;
                        board[i][j] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}

private boolean isValid(char[][] board, int row, int col, char c) {
    int boxRow = 3 * (row / 3), boxCol = 3 * (col / 3);
    for (int i = 0; i < 9; i++) {
        if (board[row][i] == c || board[i][col] == c) return false;
        if (board[boxRow + i / 3][boxCol + i % 3] == c) return false;
    }
    return true;
}`,
      timeComplexity: 'O(9^(empty cells))',
      spaceComplexity: 'O(1)',
    },
  },

  'Word Search': {
    leetcodeUrl: 'https://leetcode.com/problems/word-search/',
    category: 'Core',
    priority: 6,
    description: 'Check if word exists in grid. Path uses adjacent cells, each used once.',
    hints: [
      'DFS/backtrack from each cell',
      'Mark visited during search, unmark when backtracking',
      'Check bounds and character match',
    ],
    solution: {
      approach: 'DFS with backtracking. Mark cells visited during search.',
      java: `public boolean exist(char[][] board, String word) {
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            if (dfs(board, word, i, j, 0)) return true;
        }
    }
    return false;
}

private boolean dfs(char[][] board, String word, int i, int j, int k) {
    if (k == word.length()) return true;
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length 
        || board[i][j] != word.charAt(k)) return false;
    char temp = board[i][j];
    board[i][j] = '#';
    boolean found = dfs(board, word, i + 1, j, k + 1) || dfs(board, word, i - 1, j, k + 1)
                 || dfs(board, word, i, j + 1, k + 1) || dfs(board, word, i, j - 1, k + 1);
    board[i][j] = temp;
    return found;
}`,
      timeComplexity: 'O(m×n×4^L)',
      spaceComplexity: 'O(L)',
    },
  },

  'Word Search II': {
    leetcodeUrl: 'https://leetcode.com/problems/word-search-ii/',
    category: 'Advanced',
    priority: 13,
    description: 'Find all words from dictionary that can be formed in the grid.',
    examples: [
      { input: 'board, words = ["oath","pea","eat","rain"]', output: '["eat","oath"]', explanation: 'Found words in grid.' },
    ],
    hints: [
      'Build Trie from words for efficient prefix lookup',
      'DFS from each cell, following Trie structure',
      'Remove words from Trie once found to avoid duplicates',
    ],
    solution: {
      approach: 'Trie + DFS. Build Trie from words, search grid following Trie paths.',
      java: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    String word = null;
}

public List<String> findWords(char[][] board, String[] words) {
    TrieNode root = new TrieNode();
    for (String word : words) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new TrieNode();
            node = node.children[c - 'a'];
        }
        node.word = word;
    }
    List<String> result = new ArrayList<>();
    for (int i = 0; i < board.length; i++) {
        for (int j = 0; j < board[0].length; j++) {
            dfs(board, i, j, root, result);
        }
    }
    return result;
}

private void dfs(char[][] board, int i, int j, TrieNode node, List<String> result) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length) return;
    char c = board[i][j];
    if (c == '#' || node.children[c - 'a'] == null) return;
    node = node.children[c - 'a'];
    if (node.word != null) { result.add(node.word); node.word = null; }
    board[i][j] = '#';
    dfs(board, i + 1, j, node, result); dfs(board, i - 1, j, node, result);
    dfs(board, i, j + 1, node, result); dfs(board, i, j - 1, node, result);
    board[i][j] = c;
}`,
      timeComplexity: 'O(m × n × 4^L)',
      spaceComplexity: 'O(sum of word lengths)',
    },
  },

  // ==================== GRAPHS ====================
  'Clone Graph': {
    leetcodeUrl: 'https://leetcode.com/problems/clone-graph/',
    category: 'Core',
    priority: 2,
    description: 'Return a deep copy of the graph.',
    hints: [
      'Use HashMap to map old node to cloned node',
      'DFS or BFS to traverse all nodes',
      'Clone neighbors recursively',
    ],
    solution: {
      approach: 'DFS with HashMap to track cloned nodes.',
      java: `private Map<Node, Node> visited = new HashMap<>();

public Node cloneGraph(Node node) {
    if (node == null) return null;
    if (visited.containsKey(node)) return visited.get(node);
    Node clone = new Node(node.val);
    visited.put(node, clone);
    for (Node neighbor : node.neighbors) {
        clone.neighbors.add(cloneGraph(neighbor));
    }
    return clone;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
    },
  },

  'Course Schedule': {
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule/',
    category: 'Core',
    priority: 3,
    description: 'Check if all courses can be finished given prerequisites.',
    hints: [
      'This is cycle detection in directed graph',
      'Use topological sort (Kahn\'s algorithm)',
      'Or DFS with three states: unvisited, visiting, visited',
    ],
    solution: {
      approach: 'Topological sort with Kahn\'s algorithm. If sorted count != n, cycle exists.',
      java: `public boolean canFinish(int numCourses, int[][] prerequisites) {
    int[] indegree = new int[numCourses];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] pre : prerequisites) {
        adj.get(pre[1]).add(pre[0]);
        indegree[pre[0]]++;
    }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) queue.offer(i);
    int count = 0;
    while (!queue.isEmpty()) {
        int course = queue.poll();
        count++;
        for (int next : adj.get(course)) {
            if (--indegree[next] == 0) queue.offer(next);
        }
    }
    return count == numCourses;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
    },
  },

  'Number of Connected Components': {
    leetcodeUrl: 'https://leetcode.com/problems/number-of-connected-components-in-an-undirected-graph/',
    category: 'Core',
    priority: 2,
    description: 'Count connected components in undirected graph.',
    hints: [
      'Union-Find or DFS/BFS',
      'For each unvisited node, do DFS and count as new component',
      'Union-Find: count unique parents',
    ],
    solution: {
      approach: 'Union-Find: union all edges, count unique roots.',
      java: `public int countComponents(int n, int[][] edges) {
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    int components = n;
    for (int[] edge : edges) {
        int p1 = find(parent, edge[0]), p2 = find(parent, edge[1]);
        if (p1 != p2) { parent[p1] = p2; components--; }
    }
    return components;
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
      timeComplexity: 'O(E × α(n))',
      spaceComplexity: 'O(n)',
    },
  },

  'Graph Valid Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/graph-valid-tree/',
    category: 'Core',
    priority: 3,
    description: 'Check if given undirected graph is a valid tree.',
    hints: [
      'Tree has n-1 edges and is connected',
      'Or: tree has no cycles and all nodes reachable',
      'Use Union-Find to detect cycles',
    ],
    solution: {
      approach: 'Check edges == n-1 and no cycle using Union-Find.',
      java: `public boolean validTree(int n, int[][] edges) {
    if (edges.length != n - 1) return false;
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (int[] edge : edges) {
        int p1 = find(parent, edge[0]), p2 = find(parent, edge[1]);
        if (p1 == p2) return false; // cycle
        parent[p1] = p2;
    }
    return true;
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
      timeComplexity: 'O(n × α(n))',
      spaceComplexity: 'O(n)',
    },
  },

  'Network Delay Time': {
    leetcodeUrl: 'https://leetcode.com/problems/network-delay-time/',
    category: 'Core',
    priority: 5,
    description: 'Find time for signal to reach all nodes from source. Return -1 if impossible.',
    hints: [
      'Dijkstra\'s shortest path algorithm',
      'Use priority queue for efficiency',
      'Return max of all shortest distances',
    ],
    solution: {
      approach: 'Dijkstra\'s algorithm. Return max distance or -1 if not all reachable.',
      java: `public int networkDelayTime(int[][] times, int n, int k) {
    Map<Integer, List<int[]>> graph = new HashMap<>();
    for (int[] t : times) graph.computeIfAbsent(t[0], x -> new ArrayList<>()).add(new int[]{t[1], t[2]});
    int[] dist = new int[n + 1];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[k] = 0;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> a[1] - b[1]);
    pq.offer(new int[]{k, 0});
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        if (curr[1] > dist[curr[0]]) continue;
        for (int[] next : graph.getOrDefault(curr[0], List.of())) {
            int newDist = dist[curr[0]] + next[1];
            if (newDist < dist[next[0]]) {
                dist[next[0]] = newDist;
                pq.offer(new int[]{next[0], newDist});
            }
        }
    }
    int max = 0;
    for (int i = 1; i <= n; i++) if (dist[i] == Integer.MAX_VALUE) return -1; else max = Math.max(max, dist[i]);
    return max;
}`,
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V + E)',
    },
  },

  'Cheapest Flights Within K Stops': {
    leetcodeUrl: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
    category: 'Challenge',
    priority: 7,
    description: 'Find cheapest price from src to dst with at most k stops.',
    examples: [
      { input: 'n=4, flights, src=0, dst=3, k=1', output: '200', explanation: 'Cheapest route with at most 1 stop.' },
    ],
    hints: [
      'Bellman-Ford with k+1 iterations',
      'Or BFS with level-by-level processing',
      'Modified Dijkstra tracking stops',
    ],
    solution: {
      approach: 'Bellman-Ford style: relax edges k+1 times.',
      java: `public int findCheapestPrice(int n, int[][] flights, int src, int dst, int k) {
    int[] dist = new int[n];
    Arrays.fill(dist, Integer.MAX_VALUE);
    dist[src] = 0;
    for (int i = 0; i <= k; i++) {
        int[] temp = dist.clone();
        for (int[] flight : flights) {
            int from = flight[0], to = flight[1], price = flight[2];
            if (dist[from] != Integer.MAX_VALUE) {
                temp[to] = Math.min(temp[to], dist[from] + price);
            }
        }
        dist = temp;
    }
    return dist[dst] == Integer.MAX_VALUE ? -1 : dist[dst];
}`,
      timeComplexity: 'O(k × E)',
      spaceComplexity: 'O(n)',
    },
  },

  'Is Graph Bipartite': {
    leetcodeUrl: 'https://leetcode.com/problems/is-graph-bipartite/',
    category: 'Core',
    priority: 4,
    description: 'Check if graph can be colored with 2 colors such that no adjacent nodes have same color.',
    hints: [
      'BFS/DFS with 2-coloring',
      'Alternate colors for neighbors',
      'If neighbor has same color, not bipartite',
    ],
    solution: {
      approach: 'BFS coloring. If neighbor has same color as current, return false.',
      java: `public boolean isBipartite(int[][] graph) {
    int n = graph.length;
    int[] color = new int[n];
    for (int i = 0; i < n; i++) {
        if (color[i] == 0 && !bfs(graph, color, i)) return false;
    }
    return true;
}

private boolean bfs(int[][] graph, int[] color, int start) {
    Queue<Integer> queue = new LinkedList<>();
    queue.offer(start);
    color[start] = 1;
    while (!queue.isEmpty()) {
        int node = queue.poll();
        for (int neighbor : graph[node]) {
            if (color[neighbor] == color[node]) return false;
            if (color[neighbor] == 0) { color[neighbor] = -color[node]; queue.offer(neighbor); }
        }
    }
    return true;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
    },
  },

  'Reconstruct Itinerary': {
    leetcodeUrl: 'https://leetcode.com/problems/reconstruct-itinerary/',
    category: 'Challenge',
    priority: 8,
    description: 'Find itinerary in lexical order that uses all tickets starting from JFK.',
    examples: [
      { input: 'tickets = [["JFK","SFO"],["JFK","ATL"],["SFO","ATL"],["ATL","JFK"],["ATL","SFO"]]', output: '["JFK","ATL","JFK","SFO","ATL","SFO"]', explanation: 'Lexicographically smallest route.' },
    ],
    hints: [
      'Hierholzer\'s algorithm for Eulerian path',
      'Use PriorityQueue for lexical ordering',
      'Post-order traversal: add to front when stuck',
    ],
    solution: {
      approach: 'Hierholzer\'s algorithm. DFS with post-order insertion for Eulerian path.',
      java: `public List<String> findItinerary(List<List<String>> tickets) {
    Map<String, PriorityQueue<String>> graph = new HashMap<>();
    for (List<String> ticket : tickets) {
        graph.computeIfAbsent(ticket.get(0), k -> new PriorityQueue<>()).add(ticket.get(1));
    }
    LinkedList<String> result = new LinkedList<>();
    dfs(graph, "JFK", result);
    return result;
}

private void dfs(Map<String, PriorityQueue<String>> graph, String airport, LinkedList<String> result) {
    PriorityQueue<String> destinations = graph.get(airport);
    while (destinations != null && !destinations.isEmpty()) {
        dfs(graph, destinations.poll(), result);
    }
    result.addFirst(airport);
}`,
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(E)',
    },
  },

  // ==================== PREFIX SUM ====================
  'Range Sum Query - Immutable': {
    leetcodeUrl: 'https://leetcode.com/problems/range-sum-query-immutable/',
    category: 'Foundation',
    priority: 1,
    description: 'Given an integer array nums, calculate the sum of elements between indices left and right inclusive.',
    examples: [
      { input: 'nums = [-2,0,3,-5,2,-1], sumRange(0,2)', output: '1', explanation: '(-2) + 0 + 3 = 1' },
      { input: 'sumRange(2,5)', output: '-1', explanation: '3 + (-5) + 2 + (-1) = -1' },
    ],
    hints: [
      'Build prefix sum array where prefix[i] = sum of nums[0..i-1]',
      'Range sum = prefix[right+1] - prefix[left]',
      'Use prefix[0] = 0 for easier indexing',
    ],
    solution: {
      approach: 'Build prefix sum array. Range sum = prefix[right+1] - prefix[left].',
      java: `class NumArray {
    private int[] prefix;
    
    public NumArray(int[] nums) {
        prefix = new int[nums.length + 1];
        for (int i = 0; i < nums.length; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }
    }
    
    public int sumRange(int left, int right) {
        return prefix[right + 1] - prefix[left];
    }
}`,
      timeComplexity: 'O(1) query, O(n) build',
      spaceComplexity: 'O(n)',
    },
  },

  'Running Sum of 1d Array': {
    leetcodeUrl: 'https://leetcode.com/problems/running-sum-of-1d-array/',
    category: 'Foundation',
    priority: 1,
    description: 'Return the running sum of nums where runningSum[i] = sum(nums[0]…nums[i]).',
    examples: [
      { input: 'nums = [1,2,3,4]', output: '[1,3,6,10]', explanation: 'Running sum: [1, 1+2, 1+2+3, 1+2+3+4].' },
    ],
    hints: [
      'Simplest prefix sum problem',
      'Modify array in place or create new array',
      'Each element = previous running sum + current element',
    ],
    solution: {
      approach: 'Accumulate sum as you traverse the array.',
      java: `public int[] runningSum(int[] nums) {
    for (int i = 1; i < nums.length; i++) {
        nums[i] += nums[i - 1];
    }
    return nums;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Subarray Sum Equals K': {
    leetcodeUrl: 'https://leetcode.com/problems/subarray-sum-equals-k/',
    category: 'Core',
    priority: 2,
    description: 'Given an array of integers and an integer k, return the total number of subarrays whose sum equals k.',
    examples: [
      { input: 'nums = [1,1,1], k = 2', output: '2', explanation: 'Subarrays [1,1] starting at index 0 and 1.' },
      { input: 'nums = [1,2,3], k = 3', output: '2', explanation: '[1,2] and [3] both sum to 3.' },
    ],
    hints: [
      'Use prefix sum + HashMap',
      'If prefix[j] - prefix[i] = k, then sum(i+1..j) = k',
      'Store count of each prefix sum seen so far',
      'Initialize map with {0: 1} for subarrays starting at index 0',
    ],
    solution: {
      approach: 'Prefix sum with HashMap. Count how many times (currentSum - k) appeared before.',
      java: `public int subarraySum(int[] nums, int k) {
    Map<Integer, Integer> prefixCount = new HashMap<>();
    prefixCount.put(0, 1);
    int sum = 0, count = 0;
    for (int num : nums) {
        sum += num;
        count += prefixCount.getOrDefault(sum - k, 0);
        prefixCount.merge(sum, 1, Integer::sum);
    }
    return count;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Continuous Subarray Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/continuous-subarray-sum/',
    category: 'Core',
    priority: 3,
    description: 'Check if array has a continuous subarray of size at least 2 whose sum is a multiple of k.',
    examples: [
      { input: 'nums = [23,2,4,6,7], k = 6', output: 'true', explanation: '[2,4] is size 2 and sums to 6.' },
      { input: 'nums = [23,2,6,4,7], k = 6', output: 'true', explanation: '[23,2,6,4,7] sums to 42 = 6*7.' },
    ],
    hints: [
      'If prefix[j] % k == prefix[i] % k, then sum(i+1..j) is multiple of k',
      'Store first index of each remainder',
      'Need at least 2 elements, so check j - i >= 2',
    ],
    solution: {
      approach: 'Store first index of each prefix sum mod k. Same remainder at distance >= 2 means found.',
      java: `public boolean checkSubarraySum(int[] nums, int k) {
    Map<Integer, Integer> remainderIndex = new HashMap<>();
    remainderIndex.put(0, -1);
    int sum = 0;
    for (int i = 0; i < nums.length; i++) {
        sum += nums[i];
        int remainder = sum % k;
        if (remainderIndex.containsKey(remainder)) {
            if (i - remainderIndex.get(remainder) >= 2) return true;
        } else {
            remainderIndex.put(remainder, i);
        }
    }
    return false;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(min(n, k))',
    },
  },

  'Range Sum Query 2D - Immutable': {
    leetcodeUrl: 'https://leetcode.com/problems/range-sum-query-2d-immutable/',
    category: 'Core',
    priority: 4,
    description: 'Calculate sum of elements inside rectangle defined by upper left (row1, col1) and lower right (row2, col2).',
    examples: [
      { input: 'matrix = [[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]], sumRegion(2,1,4,3)', output: '8', explanation: 'Sum of the blue rectangle.' },
    ],
    hints: [
      '2D prefix sum: prefix[i][j] = sum of rectangle (0,0) to (i-1,j-1)',
      'Use inclusion-exclusion principle',
      'Region sum = prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]',
    ],
    solution: {
      approach: '2D prefix sum with inclusion-exclusion.',
      java: `class NumMatrix {
    private int[][] prefix;
    
    public NumMatrix(int[][] matrix) {
        int m = matrix.length, n = matrix[0].length;
        prefix = new int[m + 1][n + 1];
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
            }
        }
    }
    
    public int sumRegion(int r1, int c1, int r2, int c2) {
        return prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1];
    }
}`,
      timeComplexity: 'O(1) query, O(mn) build',
      spaceComplexity: 'O(mn)',
    },
  },

  'Subarray Sums Divisible by K': {
    leetcodeUrl: 'https://leetcode.com/problems/subarray-sums-divisible-by-k/',
    category: 'Core',
    priority: 4,
    description: 'Return the number of subarrays that have a sum divisible by k.',
    examples: [
      { input: 'nums = [4,5,0,-2,-3,1], k = 5', output: '7', explanation: '7 subarrays have sum divisible by 5.' },
    ],
    hints: [
      'Similar to Continuous Subarray Sum but count all pairs',
      'Count subarrays with same remainder',
      'Handle negative remainders: (sum % k + k) % k',
    ],
    solution: {
      approach: 'Count prefix sums by remainder. For each remainder r with count c, add c*(c-1)/2 pairs.',
      java: `public int subarraysDivByK(int[] nums, int k) {
    int[] count = new int[k];
    count[0] = 1;
    int sum = 0, result = 0;
    for (int num : nums) {
        sum += num;
        int remainder = ((sum % k) + k) % k;
        result += count[remainder];
        count[remainder]++;
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
    },
  },

  'Maximum Size Subarray Sum Equals k': {
    leetcodeUrl: 'https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/',
    category: 'Practice',
    priority: 5,
    description: 'Find the maximum length of a subarray that sums to k.',
    examples: [
      { input: 'nums = [1,-1,5,-2,3], k = 3', output: '4', explanation: 'Subarray [1,-1,5,-2] sums to 3 with length 4.' },
    ],
    hints: [
      'Use prefix sum + HashMap storing first index',
      'If sum - k exists, length = current index - stored index',
      'Store first occurrence to maximize length',
    ],
    solution: {
      approach: 'Prefix sum with HashMap storing first index of each sum.',
      java: `public int maxSubArrayLen(int[] nums, int k) {
    Map<Integer, Integer> sumIndex = new HashMap<>();
    sumIndex.put(0, -1);
    int sum = 0, maxLen = 0;
    for (int i = 0; i < nums.length; i++) {
        sum += nums[i];
        if (sumIndex.containsKey(sum - k)) {
            maxLen = Math.max(maxLen, i - sumIndex.get(sum - k));
        }
        sumIndex.putIfAbsent(sum, i);
    }
    return maxLen;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== INTERVALS ====================
  'Merge Intervals': {
    leetcodeUrl: 'https://leetcode.com/problems/merge-intervals/',
    category: 'Core',
    priority: 1,
    description: 'Given an array of intervals, merge all overlapping intervals.',
    examples: [
      { input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]', output: '[[1,6],[8,10],[15,18]]', explanation: '[1,3] and [2,6] overlap, merge to [1,6].' },
    ],
    hints: [
      'Sort intervals by start time',
      'Compare current interval with last merged',
      'If overlapping, extend end time; else add new interval',
    ],
    solution: {
      approach: 'Sort by start. For each interval, merge with last if overlapping.',
      java: `public int[][] merge(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    List<int[]> result = new ArrayList<>();
    for (int[] interval : intervals) {
        if (result.isEmpty() || result.get(result.size() - 1)[1] < interval[0]) {
            result.add(interval);
        } else {
            result.get(result.size() - 1)[1] = Math.max(result.get(result.size() - 1)[1], interval[1]);
        }
    }
    return result.toArray(new int[result.size()][]);
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Insert Interval': {
    leetcodeUrl: 'https://leetcode.com/problems/insert-interval/',
    category: 'Core',
    priority: 2,
    description: 'Insert a new interval into a sorted list of non-overlapping intervals, merging if necessary.',
    examples: [
      { input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]', output: '[[1,5],[6,9]]', explanation: 'New interval overlaps with [1,3].' },
    ],
    hints: [
      'Add all intervals that end before new interval starts',
      'Merge all overlapping intervals',
      'Add all intervals that start after new interval ends',
    ],
    solution: {
      approach: 'Three passes: before, merge overlapping, after.',
      java: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0, n = intervals.length;
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i++]);
    }
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);
    while (i < n) {
        result.add(intervals[i++]);
    }
    return result.toArray(new int[result.size()][]);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Meeting Rooms': {
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms/',
    category: 'Foundation',
    priority: 1,
    description: 'Determine if a person could attend all meetings (no overlapping intervals).',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: 'false', explanation: '[0,30] overlaps with both other meetings.' },
      { input: 'intervals = [[7,10],[2,4]]', output: 'true', explanation: 'No overlapping meetings.' },
    ],
    hints: [
      'Sort intervals by start time',
      'Check if any adjacent intervals overlap',
      'Overlap if current.start < previous.end',
    ],
    solution: {
      approach: 'Sort by start time, check for any overlap between adjacent meetings.',
      java: `public boolean canAttendMeetings(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < intervals[i - 1][1]) return false;
    }
    return true;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Meeting Rooms II': {
    leetcodeUrl: 'https://leetcode.com/problems/meeting-rooms-ii/',
    category: 'Core',
    priority: 2,
    description: 'Find the minimum number of conference rooms required.',
    examples: [
      { input: 'intervals = [[0,30],[5,10],[15,20]]', output: '2', explanation: 'Need 2 rooms: one for [0,30], one for [5,10] and [15,20].' },
    ],
    hints: [
      'Track concurrent meetings at any point',
      'Use min-heap to track earliest ending meeting',
      'Or use sweep line: +1 at start, -1 at end',
    ],
    solution: {
      approach: 'Min-heap of end times. If new meeting starts after earliest end, reuse room.',
      java: `public int minMeetingRooms(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int[] interval : intervals) {
        if (!pq.isEmpty() && pq.peek() <= interval[0]) {
            pq.poll();
        }
        pq.offer(interval[1]);
    }
    return pq.size();
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Non-overlapping Intervals': {
    leetcodeUrl: 'https://leetcode.com/problems/non-overlapping-intervals/',
    category: 'Core',
    priority: 3,
    description: 'Return minimum number of intervals to remove to make rest non-overlapping.',
    examples: [
      { input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]', output: '1', explanation: 'Remove [1,3] to make rest non-overlapping.' },
    ],
    hints: [
      'Sort by end time (greedy activity selection)',
      'Keep interval that ends earliest',
      'Count intervals that overlap with previous kept',
    ],
    solution: {
      approach: 'Greedy: sort by end time, keep earliest ending, count overlaps.',
      java: `public int eraseOverlapIntervals(int[][] intervals) {
    Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
    int count = 0, prevEnd = Integer.MIN_VALUE;
    for (int[] interval : intervals) {
        if (interval[0] >= prevEnd) {
            prevEnd = interval[1];
        } else {
            count++;
        }
    }
    return count;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Minimum Number of Arrows to Burst Balloons': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons/',
    category: 'Core',
    priority: 3,
    description: 'Find minimum number of arrows to burst all balloons (intervals on x-axis).',
    examples: [
      { input: 'points = [[10,16],[2,8],[1,6],[7,12]]', output: '2', explanation: 'Shoot at x=6 (bursts [2,8],[1,6]) and x=11 (bursts [10,16],[7,12]).' },
    ],
    hints: [
      'Sort by end point',
      'Shoot at end of current balloon',
      'Skip all balloons hit by this arrow',
    ],
    solution: {
      approach: 'Greedy: sort by end, shoot at end of each non-burst balloon.',
      java: `public int findMinArrowPoints(int[][] points) {
    Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
    int arrows = 1, arrowPos = points[0][1];
    for (int i = 1; i < points.length; i++) {
        if (points[i][0] > arrowPos) {
            arrows++;
            arrowPos = points[i][1];
        }
    }
    return arrows;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Employee Free Time': {
    leetcodeUrl: 'https://leetcode.com/problems/employee-free-time/',
    category: 'Challenge',
    priority: 5,
    description: 'Find common free time intervals for all employees given their schedules.',
    examples: [
      { input: 'schedule = [[[1,2],[5,6]],[[1,3]],[[4,10]]]', output: '[[3,4]]', explanation: 'All employees free between 3 and 4.' },
    ],
    hints: [
      'Merge all intervals from all employees',
      'Gaps between merged intervals are free time',
      'Use min-heap or flatten and sort',
    ],
    solution: {
      approach: 'Flatten all intervals, sort, merge, find gaps.',
      java: `public List<Interval> employeeFreeTime(List<List<Interval>> schedule) {
    List<Interval> all = new ArrayList<>();
    for (List<Interval> emp : schedule) all.addAll(emp);
    all.sort((a, b) -> a.start - b.start);
    List<Interval> result = new ArrayList<>();
    int end = all.get(0).end;
    for (Interval interval : all) {
        if (interval.start > end) {
            result.add(new Interval(end, interval.start));
        }
        end = Math.max(end, interval.end);
    }
    return result;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },

  'My Calendar I': {
    leetcodeUrl: 'https://leetcode.com/problems/my-calendar-i/',
    category: 'Core',
    priority: 4,
    description: 'Implement calendar that returns true if event can be added without overlap.',
    examples: [
      { input: 'book(10,20), book(15,25), book(20,30)', output: 'true, false, true', explanation: '15-25 overlaps with 10-20.' },
    ],
    hints: [
      'Store booked intervals',
      'Check for overlap before adding',
      'TreeMap for efficient floor/ceiling lookups',
    ],
    solution: {
      approach: 'TreeMap: key = start, value = end. Check overlap with floor and ceiling.',
      java: `class MyCalendar {
    TreeMap<Integer, Integer> calendar = new TreeMap<>();
    
    public boolean book(int start, int end) {
        Integer prev = calendar.floorKey(start);
        Integer next = calendar.ceilingKey(start);
        if ((prev == null || calendar.get(prev) <= start) &&
            (next == null || end <= next)) {
            calendar.put(start, end);
            return true;
        }
        return false;
    }
}`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)',
    },
  },

  'My Calendar II': {
    leetcodeUrl: 'https://leetcode.com/problems/my-calendar-ii/',
    category: 'Challenge',
    priority: 5,
    description: 'Allow double booking but not triple booking.',
    examples: [
      { input: 'book(10,20), book(50,60), book(10,40), book(5,15)', output: 'true,true,true,false', explanation: '5-15 would cause triple booking.' },
    ],
    hints: [
      'Track all bookings and overlaps separately',
      'If new event overlaps with an overlap, reject',
      'Add new overlaps when event intersects existing booking',
    ],
    solution: {
      approach: 'Track overlaps separately. New booking fails if it overlaps with any overlap.',
      java: `class MyCalendarTwo {
    List<int[]> bookings = new ArrayList<>();
    List<int[]> overlaps = new ArrayList<>();
    
    public boolean book(int start, int end) {
        for (int[] o : overlaps) {
            if (start < o[1] && end > o[0]) return false;
        }
        for (int[] b : bookings) {
            if (start < b[1] && end > b[0]) {
                overlaps.add(new int[]{Math.max(start, b[0]), Math.min(end, b[1])});
            }
        }
        bookings.add(new int[]{start, end});
        return true;
    }
}`,
      timeComplexity: 'O(n) per booking',
      spaceComplexity: 'O(n)',
    },
  },

  'My Calendar III': {
    leetcodeUrl: 'https://leetcode.com/problems/my-calendar-iii/',
    category: 'Challenge',
    priority: 6,
    description: 'Return maximum k-booking (max concurrent events) after each addition.',
    examples: [
      { input: 'book(10,20), book(50,60), book(10,40)', output: '1, 1, 2', explanation: 'Max overlap increases to 2 with third booking.' },
    ],
    hints: [
      'Sweep line algorithm',
      '+1 at start, -1 at end',
      'Track running sum and max',
    ],
    solution: {
      approach: 'TreeMap sweep line: +1 at start, -1 at end. Max running sum is answer.',
      java: `class MyCalendarThree {
    TreeMap<Integer, Integer> delta = new TreeMap<>();
    
    public int book(int start, int end) {
        delta.merge(start, 1, Integer::sum);
        delta.merge(end, -1, Integer::sum);
        int max = 0, ongoing = 0;
        for (int d : delta.values()) {
            ongoing += d;
            max = Math.max(max, ongoing);
        }
        return max;
    }
}`,
      timeComplexity: 'O(n) per booking',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== TREES ====================
  'Maximum Depth of Binary Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/maximum-depth-of-binary-tree/',
    category: 'Foundation',
    priority: 1,
    description: 'Find the maximum depth of a binary tree (longest path from root to leaf).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '3', explanation: 'Longest path is 3→20→15 or 3→20→7.' },
    ],
    hints: [
      'Recursive solution is most natural',
      'Base case: null node has depth 0',
      'Depth = 1 + max(leftDepth, rightDepth)',
    ],
    solution: {
      approach: 'Recursive: depth = 1 + max(left depth, right depth).',
      java: `public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
  },

  'Invert Binary Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/invert-binary-tree/',
    category: 'Foundation',
    priority: 1,
    description: 'Invert a binary tree (swap left and right children for all nodes).',
    examples: [
      { input: 'root = [4,2,7,1,3,6,9]', output: '[4,7,2,9,6,3,1]', explanation: 'All left and right children are swapped.' },
    ],
    hints: [
      'Swap left and right children',
      'Recursively invert subtrees',
      'Can use preorder or postorder',
    ],
    solution: {
      approach: 'Recursively swap left and right children.',
      java: `public TreeNode invertTree(TreeNode root) {
    if (root == null) return null;
    TreeNode temp = root.left;
    root.left = invertTree(root.right);
    root.right = invertTree(temp);
    return root;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
  },

  'Same Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/same-tree/',
    category: 'Foundation',
    priority: 1,
    description: 'Check if two binary trees are structurally identical with same values.',
    examples: [
      { input: 'p = [1,2,3], q = [1,2,3]', output: 'true', explanation: 'Both trees are identical.' },
    ],
    hints: [
      'Both null → true',
      'One null → false',
      'Compare values and recurse on children',
    ],
    solution: {
      approach: 'Recursive comparison of values and structure.',
      java: `public boolean isSameTree(TreeNode p, TreeNode q) {
    if (p == null && q == null) return true;
    if (p == null || q == null) return false;
    return p.val == q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
  },

  'Binary Tree Level Order Traversal': {
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
    category: 'Core',
    priority: 2,
    description: 'Return level order traversal of tree values (level by level, left to right).',
    examples: [
      { input: 'root = [3,9,20,null,null,15,7]', output: '[[3],[9,20],[15,7]]', explanation: 'Each inner list is one level.' },
    ],
    hints: [
      'Use BFS with queue',
      'Process one level at a time',
      'Track level size before processing',
    ],
    solution: {
      approach: 'BFS: process nodes level by level using queue.',
      java: `public List<List<Integer>> levelOrder(TreeNode root) {
    List<List<Integer>> result = new ArrayList<>();
    if (root == null) return result;
    Queue<TreeNode> queue = new LinkedList<>();
    queue.offer(root);
    while (!queue.isEmpty()) {
        int size = queue.size();
        List<Integer> level = new ArrayList<>();
        for (int i = 0; i < size; i++) {
            TreeNode node = queue.poll();
            level.add(node.val);
            if (node.left != null) queue.offer(node.left);
            if (node.right != null) queue.offer(node.right);
        }
        result.add(level);
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Validate Binary Search Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/validate-binary-search-tree/',
    category: 'Core',
    priority: 2,
    description: 'Determine if a binary tree is a valid binary search tree.',
    examples: [
      { input: 'root = [2,1,3]', output: 'true', explanation: '1 < 2 < 3, valid BST.' },
      { input: 'root = [5,1,4,null,null,3,6]', output: 'false', explanation: 'Node 4 is in right subtree but < 5.' },
    ],
    hints: [
      'Each node has a valid range (min, max)',
      'Pass range down during recursion',
      'Or use inorder traversal (should be sorted)',
    ],
    solution: {
      approach: 'Pass valid range down. Each node must be within its range.',
      java: `public boolean isValidBST(TreeNode root) {
    return isValid(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean isValid(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    return isValid(node.left, min, node.val) && isValid(node.right, node.val, max);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
  },

  'Lowest Common Ancestor of a Binary Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/',
    category: 'Core',
    priority: 3,
    description: 'Find the lowest common ancestor of two nodes in a binary tree.',
    examples: [
      { input: 'root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1', output: '3', explanation: 'Node 3 is LCA of 5 and 1.' },
    ],
    hints: [
      'If current node is p or q, it could be the LCA',
      'Recurse left and right',
      'If both return non-null, current is LCA',
    ],
    solution: {
      approach: 'Recursive: if both subtrees return non-null, current node is LCA.',
      java: `public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) return root;
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    if (left != null && right != null) return root;
    return left != null ? left : right;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
  },

  'Diameter of Binary Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/diameter-of-binary-tree/',
    category: 'Core',
    priority: 2,
    description: 'Find the length of the longest path between any two nodes in a tree.',
    examples: [
      { input: 'root = [1,2,3,4,5]', output: '3', explanation: 'Path 4→2→1→3 or 5→2→1→3 has length 3.' },
    ],
    hints: [
      'Diameter through a node = left height + right height',
      'Track max diameter seen while computing heights',
      'Use postorder to compute heights bottom-up',
    ],
    solution: {
      approach: 'Compute height recursively, track max(leftHeight + rightHeight).',
      java: `private int diameter = 0;

public int diameterOfBinaryTree(TreeNode root) {
    height(root);
    return diameter;
}

private int height(TreeNode node) {
    if (node == null) return 0;
    int left = height(node.left);
    int right = height(node.right);
    diameter = Math.max(diameter, left + right);
    return 1 + Math.max(left, right);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
  },

  'Binary Tree Maximum Path Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/binary-tree-maximum-path-sum/',
    category: 'Challenge',
    priority: 5,
    description: 'Find the maximum path sum in a binary tree. Path can start and end at any node.',
    examples: [
      { input: 'root = [-10,9,20,null,null,15,7]', output: '42', explanation: 'Path 15→20→7 has sum 42.' },
    ],
    hints: [
      'At each node, path can go through it or not',
      'Max path through node = node.val + max(0, left) + max(0, right)',
      'Return max single-side path for parent calculation',
    ],
    solution: {
      approach: 'Track global max. At each node, compute best path through it.',
      java: `private int maxSum = Integer.MIN_VALUE;

public int maxPathSum(TreeNode root) {
    maxGain(root);
    return maxSum;
}

private int maxGain(TreeNode node) {
    if (node == null) return 0;
    int left = Math.max(0, maxGain(node.left));
    int right = Math.max(0, maxGain(node.right));
    maxSum = Math.max(maxSum, node.val + left + right);
    return node.val + Math.max(left, right);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
    },
  },

  'Construct Binary Tree from Preorder and Inorder Traversal': {
    leetcodeUrl: 'https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/',
    category: 'Core',
    priority: 4,
    description: 'Build tree from preorder and inorder traversal arrays.',
    examples: [
      { input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]', output: '[3,9,20,null,null,15,7]', explanation: 'Reconstructed tree.' },
    ],
    hints: [
      'Preorder first element is always root',
      'Find root in inorder to split left/right subtrees',
      'Use HashMap for O(1) index lookup in inorder',
    ],
    solution: {
      approach: 'Preorder gives root, inorder splits left/right. Recurse on subtrees.',
      java: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) map.put(inorder[i], i);
    return build(preorder, 0, preorder.length - 1, 0, map);
}

private TreeNode build(int[] pre, int preStart, int preEnd, int inStart, Map<Integer, Integer> map) {
    if (preStart > preEnd) return null;
    TreeNode root = new TreeNode(pre[preStart]);
    int inRoot = map.get(pre[preStart]);
    int leftSize = inRoot - inStart;
    root.left = build(pre, preStart + 1, preStart + leftSize, inStart, map);
    root.right = build(pre, preStart + leftSize + 1, preEnd, inRoot + 1, map);
    return root;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Serialize and Deserialize Binary Tree': {
    leetcodeUrl: 'https://leetcode.com/problems/serialize-and-deserialize-binary-tree/',
    category: 'Challenge',
    priority: 5,
    description: 'Design algorithm to serialize and deserialize a binary tree.',
    examples: [
      { input: 'root = [1,2,3,null,null,4,5]', output: '[1,2,3,null,null,4,5]', explanation: 'Serialize and deserialize should reconstruct same tree.' },
    ],
    hints: [
      'Use preorder traversal with null markers',
      'Serialize: "1,2,null,null,3,4,null,null,5,null,null"',
      'Deserialize: read values in order, build recursively',
    ],
    solution: {
      approach: 'Preorder with null markers. Use queue for deserialization.',
      java: `public String serialize(TreeNode root) {
    if (root == null) return "null";
    return root.val + "," + serialize(root.left) + "," + serialize(root.right);
}

public TreeNode deserialize(String data) {
    Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));
    return buildTree(queue);
}

private TreeNode buildTree(Queue<String> queue) {
    String val = queue.poll();
    if (val.equals("null")) return null;
    TreeNode node = new TreeNode(Integer.parseInt(val));
    node.left = buildTree(queue);
    node.right = buildTree(queue);
    return node;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== BFS / DFS ====================
  'Number of Islands': {
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands/',
    category: 'Core',
    priority: 1,
    description: 'Count the number of islands in a 2D grid (1 = land, 0 = water).',
    examples: [
      { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', output: '2', explanation: 'Two separate land masses.' },
    ],
    hints: [
      'DFS/BFS from each unvisited land cell',
      'Mark visited cells to avoid counting twice',
      'Each DFS explores one complete island',
    ],
    solution: {
      approach: 'For each land cell, DFS to mark entire island, increment count.',
      java: `public int numIslands(char[][] grid) {
    int count = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == '1') {
                dfs(grid, i, j);
                count++;
            }
        }
    }
    return count;
}

private void dfs(char[][] grid, int i, int j) {
    if (i < 0 || i >= grid.length || j < 0 || j >= grid[0].length || grid[i][j] != '1') return;
    grid[i][j] = '0';
    dfs(grid, i + 1, j);
    dfs(grid, i - 1, j);
    dfs(grid, i, j + 1);
    dfs(grid, i, j - 1);
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  'Shortest Path in Binary Matrix': {
    leetcodeUrl: 'https://leetcode.com/problems/shortest-path-in-binary-matrix/',
    category: 'Core',
    priority: 2,
    description: 'Find shortest path from top-left to bottom-right in a binary matrix (8-directional).',
    examples: [
      { input: 'grid = [[0,1],[1,0]]', output: '2', explanation: 'Path: (0,0) → (1,1).' },
    ],
    hints: [
      'BFS for shortest path in unweighted graph',
      '8-directional movement',
      'Return -1 if no path exists',
    ],
    solution: {
      approach: 'BFS from (0,0) to (n-1,n-1) with 8 directions.',
      java: `public int shortestPathBinaryMatrix(int[][] grid) {
    int n = grid.length;
    if (grid[0][0] == 1 || grid[n-1][n-1] == 1) return -1;
    int[][] dirs = {{-1,-1},{-1,0},{-1,1},{0,-1},{0,1},{1,-1},{1,0},{1,1}};
    Queue<int[]> queue = new LinkedList<>();
    queue.offer(new int[]{0, 0, 1});
    grid[0][0] = 1;
    while (!queue.isEmpty()) {
        int[] curr = queue.poll();
        if (curr[0] == n-1 && curr[1] == n-1) return curr[2];
        for (int[] dir : dirs) {
            int x = curr[0] + dir[0], y = curr[1] + dir[1];
            if (x >= 0 && x < n && y >= 0 && y < n && grid[x][y] == 0) {
                grid[x][y] = 1;
                queue.offer(new int[]{x, y, curr[2] + 1});
            }
        }
    }
    return -1;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n²)',
    },
  },

  'Pacific Atlantic Water Flow': {
    leetcodeUrl: 'https://leetcode.com/problems/pacific-atlantic-water-flow/',
    category: 'Core',
    priority: 3,
    description: 'Find all cells where water can flow to both Pacific and Atlantic oceans.',
    examples: [
      { input: 'heights = [[1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]]', output: '[[0,4],[1,3],[1,4],[2,2],[3,0],[3,1],[4,0]]', explanation: 'These cells can reach both oceans.' },
    ],
    hints: [
      'DFS/BFS from ocean borders going uphill',
      'Find cells reachable from Pacific, then from Atlantic',
      'Return intersection of both sets',
    ],
    solution: {
      approach: 'DFS from each ocean border inward. Return cells in both sets.',
      java: `public List<List<Integer>> pacificAtlantic(int[][] heights) {
    int m = heights.length, n = heights[0].length;
    boolean[][] pacific = new boolean[m][n], atlantic = new boolean[m][n];
    for (int i = 0; i < m; i++) {
        dfs(heights, pacific, i, 0);
        dfs(heights, atlantic, i, n - 1);
    }
    for (int j = 0; j < n; j++) {
        dfs(heights, pacific, 0, j);
        dfs(heights, atlantic, m - 1, j);
    }
    List<List<Integer>> result = new ArrayList<>();
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (pacific[i][j] && atlantic[i][j]) result.add(Arrays.asList(i, j));
        }
    }
    return result;
}

private void dfs(int[][] heights, boolean[][] visited, int i, int j) {
    visited[i][j] = true;
    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
    for (int[] d : dirs) {
        int x = i + d[0], y = j + d[1];
        if (x >= 0 && x < heights.length && y >= 0 && y < heights[0].length 
            && !visited[x][y] && heights[x][y] >= heights[i][j]) {
            dfs(heights, visited, x, y);
        }
    }
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  'Word Ladder': {
    leetcodeUrl: 'https://leetcode.com/problems/word-ladder/',
    category: 'Challenge',
    priority: 5,
    description: 'Find shortest transformation sequence from beginWord to endWord, changing one letter at a time.',
    examples: [
      { input: 'beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]', output: '5', explanation: 'hit → hot → dot → dog → cog.' },
    ],
    hints: [
      'BFS for shortest path',
      'Each word is a node, edge exists if differ by one letter',
      'Use wildcard pattern for efficient neighbor finding',
    ],
    solution: {
      approach: 'BFS from beginWord. Use wildcard patterns *ot, h*t, ho* for neighbor lookup.',
      java: `public int ladderLength(String beginWord, String endWord, List<String> wordList) {
    Set<String> wordSet = new HashSet<>(wordList);
    if (!wordSet.contains(endWord)) return 0;
    Queue<String> queue = new LinkedList<>();
    queue.offer(beginWord);
    int level = 1;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            String word = queue.poll();
            char[] chars = word.toCharArray();
            for (int j = 0; j < chars.length; j++) {
                char original = chars[j];
                for (char c = 'a'; c <= 'z'; c++) {
                    chars[j] = c;
                    String newWord = new String(chars);
                    if (newWord.equals(endWord)) return level + 1;
                    if (wordSet.contains(newWord)) {
                        queue.offer(newWord);
                        wordSet.remove(newWord);
                    }
                }
                chars[j] = original;
            }
        }
        level++;
    }
    return 0;
}`,
      timeComplexity: 'O(M² × N)',
      spaceComplexity: 'O(M × N)',
    },
  },

  'Rotting Oranges': {
    leetcodeUrl: 'https://leetcode.com/problems/rotting-oranges/',
    category: 'Core',
    priority: 2,
    description: 'Find minimum time for all oranges to rot. Rotten oranges spread to adjacent fresh oranges each minute.',
    examples: [
      { input: 'grid = [[2,1,1],[1,1,0],[0,1,1]]', output: '4', explanation: 'Takes 4 minutes for all oranges to rot.' },
    ],
    hints: [
      'Multi-source BFS: start from all rotten oranges',
      'Track fresh orange count',
      'Each BFS level = 1 minute',
    ],
    solution: {
      approach: 'Multi-source BFS from all rotten oranges. Count levels until all fresh rot.',
      java: `public int orangesRotting(int[][] grid) {
    Queue<int[]> queue = new LinkedList<>();
    int fresh = 0;
    for (int i = 0; i < grid.length; i++) {
        for (int j = 0; j < grid[0].length; j++) {
            if (grid[i][j] == 2) queue.offer(new int[]{i, j});
            else if (grid[i][j] == 1) fresh++;
        }
    }
    if (fresh == 0) return 0;
    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
    int minutes = 0;
    while (!queue.isEmpty()) {
        int size = queue.size();
        for (int i = 0; i < size; i++) {
            int[] curr = queue.poll();
            for (int[] d : dirs) {
                int x = curr[0] + d[0], y = curr[1] + d[1];
                if (x >= 0 && x < grid.length && y >= 0 && y < grid[0].length && grid[x][y] == 1) {
                    grid[x][y] = 2;
                    fresh--;
                    queue.offer(new int[]{x, y});
                }
            }
        }
        if (!queue.isEmpty()) minutes++;
    }
    return fresh == 0 ? minutes : -1;
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  'Surrounded Regions': {
    leetcodeUrl: 'https://leetcode.com/problems/surrounded-regions/',
    category: 'Core',
    priority: 3,
    description: 'Capture all regions surrounded by X (flip O to X). Border-connected O regions are not captured.',
    examples: [
      { input: 'board = [["X","X","X","X"],["X","O","O","X"],["X","X","O","X"],["X","O","X","X"]]', output: '[["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]', explanation: 'Inner O region flipped, border-connected O stays.' },
    ],
    hints: [
      'DFS from border O cells to mark safe cells',
      'Flip all unmarked O to X',
      'Restore marked cells back to O',
    ],
    solution: {
      approach: 'Mark border-connected Os as safe. Flip remaining Os to X.',
      java: `public void solve(char[][] board) {
    int m = board.length, n = board[0].length;
    for (int i = 0; i < m; i++) {
        dfs(board, i, 0);
        dfs(board, i, n - 1);
    }
    for (int j = 0; j < n; j++) {
        dfs(board, 0, j);
        dfs(board, m - 1, j);
    }
    for (int i = 0; i < m; i++) {
        for (int j = 0; j < n; j++) {
            if (board[i][j] == 'O') board[i][j] = 'X';
            else if (board[i][j] == 'S') board[i][j] = 'O';
        }
    }
}

private void dfs(char[][] board, int i, int j) {
    if (i < 0 || i >= board.length || j < 0 || j >= board[0].length || board[i][j] != 'O') return;
    board[i][j] = 'S';
    dfs(board, i + 1, j);
    dfs(board, i - 1, j);
    dfs(board, i, j + 1);
    dfs(board, i, j - 1);
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(m × n)',
    },
  },

  // ==================== HEAPS ====================
  'Kth Largest Element in an Array': {
    leetcodeUrl: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
    category: 'Core',
    priority: 1,
    description: 'Find the kth largest element in an unsorted array.',
    examples: [
      { input: 'nums = [3,2,1,5,6,4], k = 2', output: '5', explanation: '2nd largest is 5.' },
    ],
    hints: [
      'Use min-heap of size k',
      'Or QuickSelect for O(n) average',
      'Heap maintains k largest elements',
    ],
    solution: {
      approach: 'Min-heap of size k. After processing all, top is kth largest.',
      java: `public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> pq = new PriorityQueue<>();
    for (int num : nums) {
        pq.offer(num);
        if (pq.size() > k) pq.poll();
    }
    return pq.peek();
}`,
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
    },
  },

  'Find Median from Data Stream': {
    leetcodeUrl: 'https://leetcode.com/problems/find-median-from-data-stream/',
    category: 'Challenge',
    priority: 3,
    description: 'Design a data structure that supports adding numbers and finding median.',
    examples: [
      { input: 'addNum(1), addNum(2), findMedian() → 1.5, addNum(3), findMedian() → 2', output: '1.5, 2.0', explanation: 'Median after [1,2] is 1.5, after [1,2,3] is 2.' },
    ],
    hints: [
      'Use two heaps: max-heap for lower half, min-heap for upper half',
      'Balance heaps so sizes differ by at most 1',
      'Median from top(s) of heap(s)',
    ],
    solution: {
      approach: 'Two heaps: maxHeap (lower half), minHeap (upper half). Balance on insert.',
      java: `class MedianFinder {
    private PriorityQueue<Integer> maxHeap = new PriorityQueue<>(Collections.reverseOrder());
    private PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    
    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        if (minHeap.size() > maxHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) return maxHeap.peek();
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
      timeComplexity: 'O(log n) add, O(1) median',
      spaceComplexity: 'O(n)',
    },
  },

  'Merge K Sorted Lists': {
    leetcodeUrl: 'https://leetcode.com/problems/merge-k-sorted-lists/',
    category: 'Challenge',
    priority: 3,
    description: 'Merge k sorted linked lists into one sorted list.',
    examples: [
      { input: 'lists = [[1,4,5],[1,3,4],[2,6]]', output: '[1,1,2,3,4,4,5,6]', explanation: 'All lists merged and sorted.' },
    ],
    hints: [
      'Use min-heap to always get smallest head',
      'Add head of each list to heap',
      'Extract min, add its next if exists',
    ],
    solution: {
      approach: 'Min-heap of list heads. Extract min, add next node to heap.',
      java: `public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> pq = new PriorityQueue<>((a, b) -> a.val - b.val);
    for (ListNode list : lists) {
        if (list != null) pq.offer(list);
    }
    ListNode dummy = new ListNode(0), curr = dummy;
    while (!pq.isEmpty()) {
        ListNode node = pq.poll();
        curr.next = node;
        curr = curr.next;
        if (node.next != null) pq.offer(node.next);
    }
    return dummy.next;
}`,
      timeComplexity: 'O(N log k)',
      spaceComplexity: 'O(k)',
    },
  },

  'K Closest Points to Origin': {
    leetcodeUrl: 'https://leetcode.com/problems/k-closest-points-to-origin/',
    category: 'Core',
    priority: 2,
    description: 'Find k closest points to origin (0, 0).',
    examples: [
      { input: 'points = [[1,3],[-2,2]], k = 1', output: '[[-2,2]]', explanation: 'Distance: sqrt(10) vs sqrt(8). [-2,2] is closer.' },
    ],
    hints: [
      'Use max-heap of size k (compare by distance)',
      'Or QuickSelect for O(n) average',
      'Distance = x² + y² (no need for sqrt)',
    ],
    solution: {
      approach: 'Max-heap of size k. Keep k smallest distances.',
      java: `public int[][] kClosest(int[][] points, int k) {
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> 
        (b[0]*b[0] + b[1]*b[1]) - (a[0]*a[0] + a[1]*a[1]));
    for (int[] p : points) {
        pq.offer(p);
        if (pq.size() > k) pq.poll();
    }
    return pq.toArray(new int[k][]);
}`,
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
    },
  },

  'Task Scheduler': {
    leetcodeUrl: 'https://leetcode.com/problems/task-scheduler/',
    category: 'Core',
    priority: 3,
    description: 'Find minimum time to complete all tasks with cooldown between same tasks.',
    examples: [
      { input: 'tasks = ["A","A","A","B","B","B"], n = 2', output: '8', explanation: 'A→B→idle→A→B→idle→A→B' },
    ],
    hints: [
      'Most frequent task determines minimum time',
      'Formula: (maxFreq - 1) * (n + 1) + countMaxFreq',
      'Or use heap for simulation',
    ],
    solution: {
      approach: 'Math formula based on most frequent task, or heap simulation.',
      java: `public int leastInterval(char[] tasks, int n) {
    int[] count = new int[26];
    for (char c : tasks) count[c - 'A']++;
    int maxFreq = 0, maxCount = 0;
    for (int c : count) {
        if (c > maxFreq) {
            maxFreq = c;
            maxCount = 1;
        } else if (c == maxFreq) {
            maxCount++;
        }
    }
    int minTime = (maxFreq - 1) * (n + 1) + maxCount;
    return Math.max(minTime, tasks.length);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Reorganize String': {
    leetcodeUrl: 'https://leetcode.com/problems/reorganize-string/',
    category: 'Core',
    priority: 3,
    description: 'Rearrange string so no two adjacent characters are the same.',
    examples: [
      { input: 's = "aab"', output: '"aba"', explanation: 'No two adjacent characters are the same.' },
    ],
    hints: [
      'Most frequent char count must be <= (n+1)/2',
      'Use max-heap to always pick most frequent available',
      'Alternate between different characters',
    ],
    solution: {
      approach: 'Max-heap by frequency. Pick most frequent, wait before reusing.',
      java: `public String reorganizeString(String s) {
    int[] count = new int[26];
    for (char c : s.toCharArray()) count[c - 'a']++;
    PriorityQueue<int[]> pq = new PriorityQueue<>((a, b) -> b[1] - a[1]);
    for (int i = 0; i < 26; i++) {
        if (count[i] > 0) pq.offer(new int[]{i, count[i]});
    }
    StringBuilder sb = new StringBuilder();
    int[] prev = null;
    while (!pq.isEmpty()) {
        int[] curr = pq.poll();
        sb.append((char) (curr[0] + 'a'));
        curr[1]--;
        if (prev != null && prev[1] > 0) pq.offer(prev);
        prev = curr;
    }
    return sb.length() == s.length() ? sb.toString() : "";
}`,
      timeComplexity: 'O(n log 26)',
      spaceComplexity: 'O(26)',
    },
  },

  // ==================== MONOTONIC STACK ====================
  'Daily Temperatures': {
    leetcodeUrl: 'https://leetcode.com/problems/daily-temperatures/',
    category: 'Core',
    priority: 1,
    description: 'For each day, find how many days until a warmer temperature.',
    examples: [
      { input: 'temperatures = [73,74,75,71,69,72,76,73]', output: '[1,1,4,2,1,1,0,0]', explanation: 'Days until warmer temperature.' },
    ],
    hints: [
      'Classic next greater element problem',
      'Use monotonic decreasing stack of indices',
      'When you find greater, pop and calculate difference',
    ],
    solution: {
      approach: 'Monotonic decreasing stack. Pop when current > stack top.',
      java: `public int[] dailyTemperatures(int[] temperatures) {
    int n = temperatures.length;
    int[] result = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && temperatures[i] > temperatures[stack.peek()]) {
            int idx = stack.pop();
            result[idx] = i - idx;
        }
        stack.push(i);
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Next Greater Element I': {
    leetcodeUrl: 'https://leetcode.com/problems/next-greater-element-i/',
    category: 'Foundation',
    priority: 1,
    description: 'For each element in nums1, find next greater element in nums2.',
    examples: [
      { input: 'nums1 = [4,1,2], nums2 = [1,3,4,2]', output: '[-1,3,-1]', explanation: 'Next greater: 4→-1, 1→3, 2→-1.' },
    ],
    hints: [
      'Build next greater map for nums2',
      'Use monotonic stack on nums2',
      'Query map for each element in nums1',
    ],
    solution: {
      approach: 'Build next greater map using monotonic stack on nums2.',
      java: `public int[] nextGreaterElement(int[] nums1, int[] nums2) {
    Map<Integer, Integer> nextGreater = new HashMap<>();
    Deque<Integer> stack = new ArrayDeque<>();
    for (int num : nums2) {
        while (!stack.isEmpty() && num > stack.peek()) {
            nextGreater.put(stack.pop(), num);
        }
        stack.push(num);
    }
    int[] result = new int[nums1.length];
    for (int i = 0; i < nums1.length; i++) {
        result[i] = nextGreater.getOrDefault(nums1[i], -1);
    }
    return result;
}`,
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n)',
    },
  },

  'Next Greater Element II': {
    leetcodeUrl: 'https://leetcode.com/problems/next-greater-element-ii/',
    category: 'Core',
    priority: 2,
    description: 'Find next greater element for each element in circular array.',
    examples: [
      { input: 'nums = [1,2,1]', output: '[2,-1,2]', explanation: 'Circular: last 1 wraps to find 2 at index 0.' },
    ],
    hints: [
      'Traverse array twice to simulate circular',
      'Use modulo for circular indexing',
      'Store indices in stack, not values',
    ],
    solution: {
      approach: 'Traverse 2n elements with modulo. Monotonic stack with indices.',
      java: `public int[] nextGreaterElements(int[] nums) {
    int n = nums.length;
    int[] result = new int[n];
    Arrays.fill(result, -1);
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < 2 * n; i++) {
        while (!stack.isEmpty() && nums[i % n] > nums[stack.peek()]) {
            result[stack.pop()] = nums[i % n];
        }
        if (i < n) stack.push(i);
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Largest Rectangle in Histogram': {
    leetcodeUrl: 'https://leetcode.com/problems/largest-rectangle-in-histogram/',
    category: 'Challenge',
    priority: 4,
    description: 'Find the largest rectangle area in a histogram.',
    examples: [
      { input: 'heights = [2,1,5,6,2,3]', output: '10', explanation: 'Rectangle of height 5, width 2 at indices 2-3.' },
    ],
    hints: [
      'For each bar, find how far it extends left and right',
      'Use monotonic increasing stack',
      'Calculate area when popping (bar becomes limiting height)',
    ],
    solution: {
      approach: 'Monotonic increasing stack. When popping, calculate area with that height.',
      java: `public int largestRectangleArea(int[] heights) {
    Deque<Integer> stack = new ArrayDeque<>();
    int maxArea = 0, n = heights.length;
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
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Maximal Rectangle': {
    leetcodeUrl: 'https://leetcode.com/problems/maximal-rectangle/',
    category: 'Challenge',
    priority: 5,
    description: 'Find the largest rectangle containing only 1s in a binary matrix.',
    examples: [
      { input: 'matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]', output: '6', explanation: 'Largest rectangle has area 6.' },
    ],
    hints: [
      'Build histogram for each row',
      'Apply Largest Rectangle in Histogram for each row',
      'Heights[j] = heights[j] + 1 if cell is 1, else 0',
    ],
    solution: {
      approach: 'Build histogram row by row, apply largest rectangle algorithm.',
      java: `public int maximalRectangle(char[][] matrix) {
    if (matrix.length == 0) return 0;
    int n = matrix[0].length;
    int[] heights = new int[n];
    int maxArea = 0;
    for (char[] row : matrix) {
        for (int j = 0; j < n; j++) {
            heights[j] = row[j] == '1' ? heights[j] + 1 : 0;
        }
        maxArea = Math.max(maxArea, largestRectangleArea(heights));
    }
    return maxArea;
}`,
      timeComplexity: 'O(m × n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Online Stock Span': {
    leetcodeUrl: 'https://leetcode.com/problems/online-stock-span/',
    category: 'Core',
    priority: 2,
    description: 'For each price, return span (consecutive days price was <= current).',
    examples: [
      { input: 'prices = [100, 80, 60, 70, 60, 75, 85]', output: '[1,1,1,2,1,4,6]', explanation: 'Span counts consecutive smaller or equal prices.' },
    ],
    hints: [
      'Previous greater element problem',
      'Stack stores (price, span) pairs',
      'Accumulate spans when popping smaller prices',
    ],
    solution: {
      approach: 'Stack of (price, span). Pop and accumulate spans for smaller prices.',
      java: `class StockSpanner {
    Deque<int[]> stack = new ArrayDeque<>();
    
    public int next(int price) {
        int span = 1;
        while (!stack.isEmpty() && stack.peek()[0] <= price) {
            span += stack.pop()[1];
        }
        stack.push(new int[]{price, span});
        return span;
    }
}`,
      timeComplexity: 'O(1) amortized',
      spaceComplexity: 'O(n)',
    },
  },

  'Sum of Subarray Minimums': {
    leetcodeUrl: 'https://leetcode.com/problems/sum-of-subarray-minimums/',
    category: 'Core',
    priority: 3,
    description: 'Return sum of minimum elements of all subarrays.',
    examples: [
      { input: 'arr = [3,1,2,4]', output: '17', explanation: 'Sum of mins: 3+1+2+4+1+1+2+1+1+1=17.' },
    ],
    hints: [
      'Each element contributes to multiple subarrays',
      'Count subarrays where arr[i] is minimum',
      'Use monotonic stack to find left/right bounds',
    ],
    solution: {
      approach: 'For each element, count subarrays where it is minimum using bounds.',
      java: `public int sumSubarrayMins(int[] arr) {
    int n = arr.length, MOD = 1000000007;
    int[] left = new int[n], right = new int[n];
    Deque<Integer> stack = new ArrayDeque<>();
    for (int i = 0; i < n; i++) {
        while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) stack.pop();
        left[i] = stack.isEmpty() ? i + 1 : i - stack.peek();
        stack.push(i);
    }
    stack.clear();
    for (int i = n - 1; i >= 0; i--) {
        while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) stack.pop();
        right[i] = stack.isEmpty() ? n - i : stack.peek() - i;
        stack.push(i);
    }
    long sum = 0;
    for (int i = 0; i < n; i++) {
        sum = (sum + (long) arr[i] * left[i] * right[i]) % MOD;
    }
    return (int) sum;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== GREEDY ====================
  'Gas Station': {
    leetcodeUrl: 'https://leetcode.com/problems/gas-station/',
    category: 'Core',
    priority: 2,
    description: 'Find starting gas station index to complete a circular tour.',
    examples: [
      { input: 'gas = [1,2,3,4,5], cost = [3,4,5,1,2]', output: '3', explanation: 'Start at index 3, complete circuit.' },
    ],
    hints: [
      'If total gas >= total cost, solution exists',
      'Track running surplus, reset start when negative',
      'Answer is last reset point',
    ],
    solution: {
      approach: 'Greedy: reset start when running sum goes negative. If total >= 0, answer exists.',
      java: `public int canCompleteCircuit(int[] gas, int[] cost) {
    int total = 0, tank = 0, start = 0;
    for (int i = 0; i < gas.length; i++) {
        int diff = gas[i] - cost[i];
        total += diff;
        tank += diff;
        if (tank < 0) {
            start = i + 1;
            tank = 0;
        }
    }
    return total >= 0 ? start : -1;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Partition Labels': {
    leetcodeUrl: 'https://leetcode.com/problems/partition-labels/',
    category: 'Core',
    priority: 2,
    description: 'Partition string so each letter appears in at most one part. Maximize number of parts.',
    examples: [
      { input: 's = "ababcbacadefegdehijhklij"', output: '[9,7,8]', explanation: 'Partitions: "ababcbaca", "defegde", "hijhklij".' },
    ],
    hints: [
      'Record last occurrence of each character',
      'Expand partition end to include all occurrences',
      'Close partition when current index = end',
    ],
    solution: {
      approach: 'Track last index of each char. Extend partition to include all occurrences.',
      java: `public List<Integer> partitionLabels(String s) {
    int[] last = new int[26];
    for (int i = 0; i < s.length(); i++) {
        last[s.charAt(i) - 'a'] = i;
    }
    List<Integer> result = new ArrayList<>();
    int start = 0, end = 0;
    for (int i = 0; i < s.length(); i++) {
        end = Math.max(end, last[s.charAt(i) - 'a']);
        if (i == end) {
            result.add(end - start + 1);
            start = i + 1;
        }
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Assign Cookies': {
    leetcodeUrl: 'https://leetcode.com/problems/assign-cookies/',
    category: 'Foundation',
    priority: 1,
    description: 'Maximize number of children who get a cookie. Cookie j satisfies child i if s[j] >= g[i].',
    examples: [
      { input: 'g = [1,2,3], s = [1,1]', output: '1', explanation: 'Only child with greed 1 can be satisfied.' },
    ],
    hints: [
      'Sort both arrays',
      'Give smallest sufficient cookie to least greedy child',
      'Two pointer approach',
    ],
    solution: {
      approach: 'Sort both. Match smallest sufficient cookie to least greedy unsatisfied child.',
      java: `public int findContentChildren(int[] g, int[] s) {
    Arrays.sort(g);
    Arrays.sort(s);
    int child = 0, cookie = 0;
    while (child < g.length && cookie < s.length) {
        if (s[cookie] >= g[child]) child++;
        cookie++;
    }
    return child;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Lemonade Change': {
    leetcodeUrl: 'https://leetcode.com/problems/lemonade-change/',
    category: 'Foundation',
    priority: 1,
    description: 'Give correct change for lemonade that costs $5. Bills are $5, $10, $20.',
    examples: [
      { input: 'bills = [5,5,5,10,20]', output: 'true', explanation: 'Can give change for all customers.' },
    ],
    hints: [
      'Track count of $5 and $10 bills',
      'For $20, prefer giving $10+$5 over 3×$5',
      'Return false if cannot make change',
    ],
    solution: {
      approach: 'Greedy: for $20 prefer $10+$5 to preserve $5 bills.',
      java: `public boolean lemonadeChange(int[] bills) {
    int five = 0, ten = 0;
    for (int bill : bills) {
        if (bill == 5) five++;
        else if (bill == 10) {
            if (five == 0) return false;
            five--;
            ten++;
        } else {
            if (ten > 0 && five > 0) {
                ten--;
                five--;
            } else if (five >= 3) {
                five -= 3;
            } else {
                return false;
            }
        }
    }
    return true;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Candy': {
    leetcodeUrl: 'https://leetcode.com/problems/candy/',
    category: 'Challenge',
    priority: 5,
    description: 'Minimum candies to give children with ratings so higher rated gets more than neighbors.',
    examples: [
      { input: 'ratings = [1,0,2]', output: '5', explanation: 'Candies = [2,1,2]. Total = 5.' },
    ],
    hints: [
      'Two passes: left-to-right, right-to-left',
      'First pass: handle increasing sequences',
      'Second pass: handle decreasing sequences, take max',
    ],
    solution: {
      approach: 'Two passes. First satisfy left neighbor, then right neighbor (take max).',
      java: `public int candy(int[] ratings) {
    int n = ratings.length;
    int[] candies = new int[n];
    Arrays.fill(candies, 1);
    for (int i = 1; i < n; i++) {
        if (ratings[i] > ratings[i - 1]) candies[i] = candies[i - 1] + 1;
    }
    for (int i = n - 2; i >= 0; i--) {
        if (ratings[i] > ratings[i + 1]) candies[i] = Math.max(candies[i], candies[i + 1] + 1);
    }
    int sum = 0;
    for (int c : candies) sum += c;
    return sum;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Remove K Digits': {
    leetcodeUrl: 'https://leetcode.com/problems/remove-k-digits/',
    category: 'Core',
    priority: 3,
    description: 'Remove k digits from number to get smallest possible result.',
    examples: [
      { input: 'num = "1432219", k = 3', output: '"1219"', explanation: 'Remove 4, 3, 2 to get 1219.' },
    ],
    hints: [
      'Use monotonic increasing stack',
      'Remove larger digits that come before smaller digits',
      'Handle leading zeros and edge cases',
    ],
    solution: {
      approach: 'Monotonic stack: remove peak digits (larger followed by smaller).',
      java: `public String removeKdigits(String num, int k) {
    Deque<Character> stack = new ArrayDeque<>();
    for (char c : num.toCharArray()) {
        while (!stack.isEmpty() && k > 0 && stack.peek() > c) {
            stack.pop();
            k--;
        }
        stack.push(c);
    }
    while (k > 0) { stack.pop(); k--; }
    StringBuilder sb = new StringBuilder();
    while (!stack.isEmpty()) sb.append(stack.pollLast());
    while (sb.length() > 1 && sb.charAt(0) == '0') sb.deleteCharAt(0);
    return sb.length() == 0 ? "0" : sb.toString();
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Boats to Save People': {
    leetcodeUrl: 'https://leetcode.com/problems/boats-to-save-people/',
    category: 'Core',
    priority: 2,
    description: 'Minimum boats to carry all people. Each boat holds at most 2 people with total weight <= limit.',
    examples: [
      { input: 'people = [3,2,2,1], limit = 3', output: '3', explanation: 'Boats: (1,2), (2), (3).' },
    ],
    hints: [
      'Sort by weight',
      'Two pointers: try to pair lightest with heaviest',
      'If pair fits, move both pointers; else send heavy alone',
    ],
    solution: {
      approach: 'Sort and use two pointers. Pair lightest with heaviest if possible.',
      java: `public int numRescueBoats(int[] people, int limit) {
    Arrays.sort(people);
    int left = 0, right = people.length - 1, boats = 0;
    while (left <= right) {
        if (people[left] + people[right] <= limit) left++;
        right--;
        boats++;
    }
    return boats;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Queue Reconstruction by Height': {
    leetcodeUrl: 'https://leetcode.com/problems/queue-reconstruction-by-height/',
    category: 'Core',
    priority: 3,
    description: 'Reconstruct queue where people[i] = [h, k] means k people in front with height >= h.',
    examples: [
      { input: 'people = [[7,0],[4,4],[7,1],[5,0],[6,1],[5,2]]', output: '[[5,0],[7,0],[5,2],[6,1],[4,4],[7,1]]', explanation: 'Reconstructed queue.' },
    ],
    hints: [
      'Sort by height descending, then by k ascending',
      'Insert each person at index k',
      'Taller people placed first dont affect shorter peoples k value',
    ],
    solution: {
      approach: 'Sort by height desc, k asc. Insert at index k (taller already placed).',
      java: `public int[][] reconstructQueue(int[][] people) {
    Arrays.sort(people, (a, b) -> a[0] != b[0] ? b[0] - a[0] : a[1] - b[1]);
    List<int[]> result = new ArrayList<>();
    for (int[] p : people) {
        result.add(p[1], p);
    }
    return result.toArray(new int[people.length][]);
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
    },
  },

  'Car Pooling': {
    leetcodeUrl: 'https://leetcode.com/problems/car-pooling/',
    category: 'Core',
    priority: 2,
    description: 'Check if car with capacity can complete all trips (pick up and drop off passengers).',
    examples: [
      { input: 'trips = [[2,1,5],[3,3,7]], capacity = 4', output: 'false', explanation: 'At point 3, need 5 seats but only have 4.' },
    ],
    hints: [
      'Track passenger changes at each point',
      'Difference array: +passengers at pickup, -passengers at dropoff',
      'Verify capacity never exceeded',
    ],
    solution: {
      approach: 'Difference array: track passenger delta at each location.',
      java: `public boolean carPooling(int[][] trips, int capacity) {
    int[] delta = new int[1001];
    for (int[] trip : trips) {
        delta[trip[1]] += trip[0];
        delta[trip[2]] -= trip[0];
    }
    int passengers = 0;
    for (int d : delta) {
        passengers += d;
        if (passengers > capacity) return false;
    }
    return true;
}`,
      timeComplexity: 'O(n + max_location)',
      spaceComplexity: 'O(max_location)',
    },
  },

  'Minimum Add to Make Parentheses Valid': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-add-to-make-parentheses-valid/',
    category: 'Foundation',
    priority: 1,
    description: 'Return minimum parentheses to add to make string valid.',
    examples: [
      { input: 's = "())"', output: '1', explanation: 'Add one ( at start.' },
    ],
    hints: [
      'Track unmatched open and close parentheses',
      'Increment open for (, decrement if close has match',
      'Increment close for ) when no open to match',
    ],
    solution: {
      approach: 'Count unmatched open and close parentheses.',
      java: `public int minAddToMakeValid(String s) {
    int open = 0, close = 0;
    for (char c : s.toCharArray()) {
        if (c == '(') open++;
        else if (open > 0) open--;
        else close++;
    }
    return open + close;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Remove Duplicate Letters': {
    leetcodeUrl: 'https://leetcode.com/problems/remove-duplicate-letters/',
    category: 'Challenge',
    priority: 4,
    description: 'Remove duplicates so every letter appears once, smallest lexicographic result.',
    examples: [
      { input: 's = "bcabc"', output: '"abc"', explanation: 'Lexicographically smallest with each letter once.' },
    ],
    hints: [
      'Monotonic stack for lexicographic order',
      'Track last occurrence of each character',
      'Only remove if character appears later',
    ],
    solution: {
      approach: 'Monotonic stack. Remove larger chars if they appear later.',
      java: `public String removeDuplicateLetters(String s) {
    int[] lastIdx = new int[26];
    boolean[] inStack = new boolean[26];
    for (int i = 0; i < s.length(); i++) lastIdx[s.charAt(i) - 'a'] = i;
    Deque<Character> stack = new ArrayDeque<>();
    for (int i = 0; i < s.length(); i++) {
        char c = s.charAt(i);
        if (inStack[c - 'a']) continue;
        while (!stack.isEmpty() && c < stack.peek() && lastIdx[stack.peek() - 'a'] > i) {
            inStack[stack.pop() - 'a'] = false;
        }
        stack.push(c);
        inStack[c - 'a'] = true;
    }
    StringBuilder sb = new StringBuilder();
    while (!stack.isEmpty()) sb.append(stack.pollLast());
    return sb.toString();
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Wiggle Subsequence': {
    leetcodeUrl: 'https://leetcode.com/problems/wiggle-subsequence/',
    category: 'Core',
    priority: 3,
    description: 'Find length of longest wiggle subsequence (alternating up and down).',
    examples: [
      { input: 'nums = [1,7,4,9,2,5]', output: '6', explanation: 'Entire array is a wiggle sequence.' },
    ],
    hints: [
      'Track length ending in up/down',
      'When going up, extend previous down',
      'When going down, extend previous up',
    ],
    solution: {
      approach: 'Greedy: track up/down lengths. Extend opposite on direction change.',
      java: `public int wiggleMaxLength(int[] nums) {
    if (nums.length < 2) return nums.length;
    int up = 1, down = 1;
    for (int i = 1; i < nums.length; i++) {
        if (nums[i] > nums[i - 1]) up = down + 1;
        else if (nums[i] < nums[i - 1]) down = up + 1;
    }
    return Math.max(up, down);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Divide Array in Sets of K Consecutive Numbers': {
    leetcodeUrl: 'https://leetcode.com/problems/divide-array-in-sets-of-k-consecutive-numbers/',
    category: 'Core',
    priority: 4,
    description: 'Check if array can be divided into sets of k consecutive numbers.',
    examples: [
      { input: 'nums = [1,2,3,3,4,4,5,6], k = 4', output: 'true', explanation: '[1,2,3,4] and [3,4,5,6].' },
    ],
    hints: [
      'Count frequency of each number',
      'Start from smallest, form groups greedily',
      'Use TreeMap for ordered access',
    ],
    solution: {
      approach: 'TreeMap for counts. Greedily form groups from smallest available.',
      java: `public boolean isPossibleDivide(int[] nums, int k) {
    if (nums.length % k != 0) return false;
    TreeMap<Integer, Integer> count = new TreeMap<>();
    for (int n : nums) count.merge(n, 1, Integer::sum);
    while (!count.isEmpty()) {
        int first = count.firstKey();
        for (int i = first; i < first + k; i++) {
            if (!count.containsKey(i)) return false;
            if (count.get(i) == 1) count.remove(i);
            else count.put(i, count.get(i) - 1);
        }
    }
    return true;
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== TOPOLOGICAL SORT ====================
  'Course Schedule II': {
    leetcodeUrl: 'https://leetcode.com/problems/course-schedule-ii/',
    category: 'Core',
    priority: 2,
    description: 'Return ordering of courses to finish all courses, or empty if impossible.',
    examples: [
      { input: 'numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]', output: '[0,2,1,3] or [0,1,2,3]', explanation: 'Valid topological orders.' },
    ],
    hints: [
      'Topological sort with cycle detection',
      'Use Kahns algorithm (BFS) or DFS',
      'Return empty array if cycle exists',
    ],
    solution: {
      approach: 'Kahns algorithm: process nodes with indegree 0, add to result.',
      java: `public int[] findOrder(int numCourses, int[][] prerequisites) {
    int[] indegree = new int[numCourses];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < numCourses; i++) adj.add(new ArrayList<>());
    for (int[] pre : prerequisites) {
        adj.get(pre[1]).add(pre[0]);
        indegree[pre[0]]++;
    }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 0; i < numCourses; i++) if (indegree[i] == 0) queue.offer(i);
    int[] result = new int[numCourses];
    int idx = 0;
    while (!queue.isEmpty()) {
        int course = queue.poll();
        result[idx++] = course;
        for (int next : adj.get(course)) {
            if (--indegree[next] == 0) queue.offer(next);
        }
    }
    return idx == numCourses ? result : new int[0];
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
    },
  },

  'Alien Dictionary': {
    leetcodeUrl: 'https://leetcode.com/problems/alien-dictionary/',
    category: 'Challenge',
    priority: 4,
    description: 'Determine order of characters in alien language from sorted dictionary.',
    examples: [
      { input: 'words = ["wrt","wrf","er","ett","rftt"]', output: '"wertf"', explanation: 'Derived order from word comparisons.' },
    ],
    hints: [
      'Build graph from adjacent word pairs',
      'Compare adjacent words to find one edge',
      'Topological sort the graph',
    ],
    solution: {
      approach: 'Build graph from word pairs, then topological sort.',
      java: `public String alienOrder(String[] words) {
    Map<Character, Set<Character>> graph = new HashMap<>();
    Map<Character, Integer> indegree = new HashMap<>();
    for (String word : words) {
        for (char c : word.toCharArray()) {
            graph.putIfAbsent(c, new HashSet<>());
            indegree.putIfAbsent(c, 0);
        }
    }
    for (int i = 0; i < words.length - 1; i++) {
        String w1 = words[i], w2 = words[i + 1];
        if (w1.length() > w2.length() && w1.startsWith(w2)) return "";
        for (int j = 0; j < Math.min(w1.length(), w2.length()); j++) {
            if (w1.charAt(j) != w2.charAt(j)) {
                if (graph.get(w1.charAt(j)).add(w2.charAt(j))) {
                    indegree.merge(w2.charAt(j), 1, Integer::sum);
                }
                break;
            }
        }
    }
    Queue<Character> queue = new LinkedList<>();
    for (char c : indegree.keySet()) if (indegree.get(c) == 0) queue.offer(c);
    StringBuilder sb = new StringBuilder();
    while (!queue.isEmpty()) {
        char c = queue.poll();
        sb.append(c);
        for (char next : graph.get(c)) {
            indegree.put(next, indegree.get(next) - 1);
            if (indegree.get(next) == 0) queue.offer(next);
        }
    }
    return sb.length() == indegree.size() ? sb.toString() : "";
}`,
      timeComplexity: 'O(C)',
      spaceComplexity: 'O(1)',
    },
  },

  'Parallel Courses': {
    leetcodeUrl: 'https://leetcode.com/problems/parallel-courses/',
    category: 'Core',
    priority: 3,
    description: 'Find minimum number of semesters to take all courses with prerequisites.',
    examples: [
      { input: 'n = 3, relations = [[1,3],[2,3]]', output: '2', explanation: 'Semester 1: courses 1,2. Semester 2: course 3.' },
    ],
    hints: [
      'Topological sort with level tracking',
      'Each level is one semester',
      'Return number of levels or -1 if cycle',
    ],
    solution: {
      approach: 'BFS topological sort, count levels (semesters).',
      java: `public int minimumSemesters(int n, int[][] relations) {
    int[] indegree = new int[n + 1];
    List<List<Integer>> adj = new ArrayList<>();
    for (int i = 0; i <= n; i++) adj.add(new ArrayList<>());
    for (int[] rel : relations) {
        adj.get(rel[0]).add(rel[1]);
        indegree[rel[1]]++;
    }
    Queue<Integer> queue = new LinkedList<>();
    for (int i = 1; i <= n; i++) if (indegree[i] == 0) queue.offer(i);
    int semesters = 0, count = 0;
    while (!queue.isEmpty()) {
        int size = queue.size();
        semesters++;
        for (int i = 0; i < size; i++) {
            int course = queue.poll();
            count++;
            for (int next : adj.get(course)) {
                if (--indegree[next] == 0) queue.offer(next);
            }
        }
    }
    return count == n ? semesters : -1;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
    },
  },

  'Minimum Height Trees': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-height-trees/',
    category: 'Core',
    priority: 3,
    description: 'Find all roots that form minimum height trees.',
    examples: [
      { input: 'n = 4, edges = [[1,0],[1,2],[1,3]]', output: '[1]', explanation: 'Node 1 gives minimum height tree.' },
    ],
    hints: [
      'Peel leaves layer by layer (reverse topological sort)',
      'MHT roots are in center of tree',
      'At most 2 MHT roots exist',
    ],
    solution: {
      approach: 'Remove leaves repeatedly until 1-2 nodes remain. These are MHT roots.',
      java: `public List<Integer> findMinHeightTrees(int n, int[][] edges) {
    if (n == 1) return Arrays.asList(0);
    List<Set<Integer>> adj = new ArrayList<>();
    for (int i = 0; i < n; i++) adj.add(new HashSet<>());
    for (int[] e : edges) {
        adj.get(e[0]).add(e[1]);
        adj.get(e[1]).add(e[0]);
    }
    Queue<Integer> leaves = new LinkedList<>();
    for (int i = 0; i < n; i++) if (adj.get(i).size() == 1) leaves.offer(i);
    int remaining = n;
    while (remaining > 2) {
        int size = leaves.size();
        remaining -= size;
        for (int i = 0; i < size; i++) {
            int leaf = leaves.poll();
            int neighbor = adj.get(leaf).iterator().next();
            adj.get(neighbor).remove(leaf);
            if (adj.get(neighbor).size() == 1) leaves.offer(neighbor);
        }
    }
    return new ArrayList<>(leaves);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Sequence Reconstruction': {
    leetcodeUrl: 'https://leetcode.com/problems/sequence-reconstruction/',
    category: 'Core',
    priority: 3,
    description: 'Check if original sequence can be uniquely reconstructed from subsequences.',
    examples: [
      { input: 'org = [1,2,3], seqs = [[1,2],[1,3],[2,3]]', output: 'true', explanation: 'Only [1,2,3] satisfies all constraints.' },
    ],
    hints: [
      'Build graph from subsequences',
      'Topological sort must produce unique order',
      'Unique if exactly one node has indegree 0 at each step',
    ],
    solution: {
      approach: 'Topological sort. Unique if queue always has exactly one element.',
      java: `public boolean sequenceReconstruction(int[] org, List<List<Integer>> seqs) {
    Map<Integer, Set<Integer>> graph = new HashMap<>();
    Map<Integer, Integer> indegree = new HashMap<>();
    for (List<Integer> seq : seqs) {
        for (int num : seq) {
            graph.putIfAbsent(num, new HashSet<>());
            indegree.putIfAbsent(num, 0);
        }
        for (int i = 0; i < seq.size() - 1; i++) {
            if (graph.get(seq.get(i)).add(seq.get(i + 1))) {
                indegree.merge(seq.get(i + 1), 1, Integer::sum);
            }
        }
    }
    if (indegree.size() != org.length) return false;
    Queue<Integer> queue = new LinkedList<>();
    for (int key : indegree.keySet()) if (indegree.get(key) == 0) queue.offer(key);
    int idx = 0;
    while (queue.size() == 1) {
        int curr = queue.poll();
        if (idx >= org.length || curr != org[idx++]) return false;
        for (int next : graph.get(curr)) {
            indegree.put(next, indegree.get(next) - 1);
            if (indegree.get(next) == 0) queue.offer(next);
        }
    }
    return idx == org.length;
}`,
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
    },
  },

  // ==================== UNION-FIND ====================
  'Redundant Connection': {
    leetcodeUrl: 'https://leetcode.com/problems/redundant-connection/',
    category: 'Core',
    priority: 2,
    description: 'Find edge that can be removed to make tree (graph with n-1 edges, no cycle).',
    examples: [
      { input: 'edges = [[1,2],[1,3],[2,3]]', output: '[2,3]', explanation: 'Removing [2,3] makes it a tree.' },
    ],
    hints: [
      'Union-Find: edge causing cycle is redundant',
      'If both nodes already connected, thats the answer',
      'Return last such edge',
    ],
    solution: {
      approach: 'Union-Find. Edge connecting already-connected nodes is redundant.',
      java: `public int[] findRedundantConnection(int[][] edges) {
    int[] parent = new int[edges.length + 1];
    for (int i = 0; i < parent.length; i++) parent[i] = i;
    for (int[] edge : edges) {
        int p1 = find(parent, edge[0]), p2 = find(parent, edge[1]);
        if (p1 == p2) return edge;
        parent[p1] = p2;
    }
    return new int[0];
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
      timeComplexity: 'O(n × α(n))',
      spaceComplexity: 'O(n)',
    },
  },

  'Accounts Merge': {
    leetcodeUrl: 'https://leetcode.com/problems/accounts-merge/',
    category: 'Core',
    priority: 3,
    description: 'Merge accounts that share common emails.',
    examples: [
      { input: 'accounts = [["John","a@m","b@m"],["John","c@m"],["John","a@m","d@m"]]', output: '[["John","a@m","b@m","d@m"],["John","c@m"]]', explanation: 'First and third share email a@m.' },
    ],
    hints: [
      'Union-Find with email as nodes',
      'Map each email to first email of account',
      'Group emails by root, add name',
    ],
    solution: {
      approach: 'Union-Find emails. Group by root, sort, add name.',
      java: `public List<List<String>> accountsMerge(List<List<String>> accounts) {
    Map<String, String> parent = new HashMap<>();
    Map<String, String> owner = new HashMap<>();
    for (List<String> account : accounts) {
        String name = account.get(0);
        for (int i = 1; i < account.size(); i++) {
            parent.putIfAbsent(account.get(i), account.get(i));
            owner.put(account.get(i), name);
            if (i > 1) union(parent, account.get(1), account.get(i));
        }
    }
    Map<String, TreeSet<String>> merged = new HashMap<>();
    for (String email : parent.keySet()) {
        String root = find(parent, email);
        merged.computeIfAbsent(root, k -> new TreeSet<>()).add(email);
    }
    List<List<String>> result = new ArrayList<>();
    for (String root : merged.keySet()) {
        List<String> list = new ArrayList<>(merged.get(root));
        list.add(0, owner.get(root));
        result.add(list);
    }
    return result;
}

private String find(Map<String, String> parent, String x) {
    if (!parent.get(x).equals(x)) parent.put(x, find(parent, parent.get(x)));
    return parent.get(x);
}

private void union(Map<String, String> parent, String a, String b) {
    parent.put(find(parent, a), find(parent, b));
}`,
      timeComplexity: 'O(n × α(n))',
      spaceComplexity: 'O(n)',
    },
  },

  'Number of Islands II': {
    leetcodeUrl: 'https://leetcode.com/problems/number-of-islands-ii/',
    category: 'Challenge',
    priority: 4,
    description: 'Count islands after each addLand operation.',
    examples: [
      { input: 'm=3, n=3, positions=[[0,0],[0,1],[1,2],[2,1]]', output: '[1,1,2,3]', explanation: 'Islands after each operation.' },
    ],
    hints: [
      'Union-Find for dynamic connectivity',
      'Add land, then try to union with 4 neighbors',
      'Track component count',
    ],
    solution: {
      approach: 'Union-Find. Add land, union with neighbors, track count.',
      java: `public List<Integer> numIslands2(int m, int n, int[][] positions) {
    int[] parent = new int[m * n];
    Arrays.fill(parent, -1);
    int[][] dirs = {{0,1},{1,0},{0,-1},{-1,0}};
    List<Integer> result = new ArrayList<>();
    int count = 0;
    for (int[] pos : positions) {
        int idx = pos[0] * n + pos[1];
        if (parent[idx] != -1) { result.add(count); continue; }
        parent[idx] = idx;
        count++;
        for (int[] d : dirs) {
            int x = pos[0] + d[0], y = pos[1] + d[1];
            int nIdx = x * n + y;
            if (x >= 0 && x < m && y >= 0 && y < n && parent[nIdx] != -1) {
                int p1 = find(parent, idx), p2 = find(parent, nIdx);
                if (p1 != p2) { parent[p1] = p2; count--; }
            }
        }
        result.add(count);
    }
    return result;
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}`,
      timeComplexity: 'O(k × α(mn))',
      spaceComplexity: 'O(mn)',
    },
  },

  'Smallest String With Swaps': {
    leetcodeUrl: 'https://leetcode.com/problems/smallest-string-with-swaps/',
    category: 'Core',
    priority: 3,
    description: 'Return lexicographically smallest string after swapping indices in pairs (unlimited times).',
    examples: [
      { input: 's = "dcab", pairs = [[0,3],[1,2]]', output: '"bacd"', explanation: 'Swap indices 0,3 and 1,2 to get smallest.' },
    ],
    hints: [
      'Union-Find to group connected indices',
      'Within each group, sort characters',
      'Assign sorted characters to sorted indices',
    ],
    solution: {
      approach: 'Union-Find groups. Sort chars within each group, assign to indices.',
      java: `public String smallestStringWithSwaps(String s, List<List<Integer>> pairs) {
    int n = s.length();
    int[] parent = new int[n];
    for (int i = 0; i < n; i++) parent[i] = i;
    for (List<Integer> p : pairs) union(parent, p.get(0), p.get(1));
    Map<Integer, PriorityQueue<Character>> groups = new HashMap<>();
    for (int i = 0; i < n; i++) {
        int root = find(parent, i);
        groups.computeIfAbsent(root, k -> new PriorityQueue<>()).offer(s.charAt(i));
    }
    char[] result = new char[n];
    for (int i = 0; i < n; i++) {
        result[i] = groups.get(find(parent, i)).poll();
    }
    return new String(result);
}

private int find(int[] parent, int x) {
    if (parent[x] != x) parent[x] = find(parent, parent[x]);
    return parent[x];
}

private void union(int[] parent, int a, int b) {
    parent[find(parent, a)] = find(parent, b);
}`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== TRIES ====================
  'Implement Trie (Prefix Tree)': {
    leetcodeUrl: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
    category: 'Core',
    priority: 1,
    description: 'Implement a trie with insert, search, and startsWith methods.',
    examples: [
      { input: 'insert("apple"), search("apple") → true, search("app") → false, startsWith("app") → true', output: 'true, false, true', explanation: 'Basic trie operations.' },
    ],
    hints: [
      'Each node has array/map of children',
      'Mark end of word with boolean flag',
      'Traverse character by character',
    ],
    solution: {
      approach: 'TrieNode with children array and isEnd flag.',
      java: `class Trie {
    private Trie[] children = new Trie[26];
    private boolean isEnd = false;
    
    public void insert(String word) {
        Trie node = this;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new Trie();
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    
    public boolean search(String word) {
        Trie node = searchPrefix(word);
        return node != null && node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        return searchPrefix(prefix) != null;
    }
    
    private Trie searchPrefix(String s) {
        Trie node = this;
        for (char c : s.toCharArray()) {
            if (node.children[c - 'a'] == null) return null;
            node = node.children[c - 'a'];
        }
        return node;
    }
}`,
      timeComplexity: 'O(m) per operation',
      spaceComplexity: 'O(n × m)',
    },
  },

  'Design Add and Search Words Data Structure': {
    leetcodeUrl: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
    category: 'Core',
    priority: 2,
    description: 'Design data structure supporting addWord and search with . wildcard.',
    examples: [
      { input: 'addWord("bad"), search("b.d") → true', output: 'true', explanation: '. matches any character.' },
    ],
    hints: [
      'Trie with DFS for wildcard search',
      'On ., try all 26 children',
      'Backtrack if no match',
    ],
    solution: {
      approach: 'Trie with DFS search. On dot, explore all children.',
      java: `class WordDictionary {
    private WordDictionary[] children = new WordDictionary[26];
    private boolean isEnd = false;
    
    public void addWord(String word) {
        WordDictionary node = this;
        for (char c : word.toCharArray()) {
            if (node.children[c - 'a'] == null) node.children[c - 'a'] = new WordDictionary();
            node = node.children[c - 'a'];
        }
        node.isEnd = true;
    }
    
    public boolean search(String word) {
        return search(word, 0, this);
    }
    
    private boolean search(String word, int idx, WordDictionary node) {
        if (idx == word.length()) return node.isEnd;
        char c = word.charAt(idx);
        if (c == '.') {
            for (WordDictionary child : node.children) {
                if (child != null && search(word, idx + 1, child)) return true;
            }
            return false;
        }
        return node.children[c - 'a'] != null && search(word, idx + 1, node.children[c - 'a']);
    }
}`,
      timeComplexity: 'O(m) add, O(26^m) search worst case',
      spaceComplexity: 'O(n × m)',
    },
  },

  'Replace Words': {
    leetcodeUrl: 'https://leetcode.com/problems/replace-words/',
    category: 'Core',
    priority: 2,
    description: 'Replace words in sentence with their shortest root from dictionary.',
    examples: [
      { input: 'dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"', output: '"the cat was rat by the bat"', explanation: 'Replace derivatives with roots.' },
    ],
    hints: [
      'Build trie from dictionary roots',
      'For each word, find shortest prefix in trie',
      'Replace word with root if found',
    ],
    solution: {
      approach: 'Build trie from roots. Search each word for shortest prefix match.',
      java: `public String replaceWords(List<String> dictionary, String sentence) {
    Trie trie = new Trie();
    for (String root : dictionary) trie.insert(root);
    String[] words = sentence.split(" ");
    StringBuilder sb = new StringBuilder();
    for (String word : words) {
        if (sb.length() > 0) sb.append(" ");
        sb.append(trie.getRoot(word));
    }
    return sb.toString();
}

class Trie {
    Trie[] children = new Trie[26];
    String word = null;
    void insert(String w) {
        Trie node = this;
        for (char c : w.toCharArray()) {
            if (node.children[c-'a'] == null) node.children[c-'a'] = new Trie();
            node = node.children[c-'a'];
        }
        node.word = w;
    }
    String getRoot(String w) {
        Trie node = this;
        for (char c : w.toCharArray()) {
            if (node.word != null) return node.word;
            if (node.children[c-'a'] == null) return w;
            node = node.children[c-'a'];
        }
        return node.word != null ? node.word : w;
    }
}`,
      timeComplexity: 'O(n × m)',
      spaceComplexity: 'O(dictionary size)',
    },
  },

  'Maximum XOR of Two Numbers in an Array': {
    leetcodeUrl: 'https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array/',
    category: 'Challenge',
    priority: 4,
    description: 'Find maximum XOR of any two numbers in array.',
    examples: [
      { input: 'nums = [3,10,5,25,2,8]', output: '28', explanation: '5 XOR 25 = 28.' },
    ],
    hints: [
      'Build bit trie from MSB to LSB',
      'For each number, try to take opposite bit path',
      'Greedy: prefer opposite bit for larger XOR',
    ],
    solution: {
      approach: 'Bit trie: for each num, find number with opposite bits for max XOR.',
      java: `public int findMaximumXOR(int[] nums) {
    Trie root = new Trie();
    for (int num : nums) root.insert(num);
    int max = 0;
    for (int num : nums) max = Math.max(max, root.getMaxXor(num));
    return max;
}

class Trie {
    Trie[] children = new Trie[2];
    void insert(int num) {
        Trie node = this;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            if (node.children[bit] == null) node.children[bit] = new Trie();
            node = node.children[bit];
        }
    }
    int getMaxXor(int num) {
        Trie node = this;
        int xor = 0;
        for (int i = 31; i >= 0; i--) {
            int bit = (num >> i) & 1;
            int oppBit = 1 - bit;
            if (node.children[oppBit] != null) {
                xor |= (1 << i);
                node = node.children[oppBit];
            } else {
                node = node.children[bit];
            }
        }
        return xor;
    }
}`,
      timeComplexity: 'O(n × 32)',
      spaceComplexity: 'O(n × 32)',
    },
  },

  // ==================== BIT MANIPULATION ====================
  'Single Number': {
    leetcodeUrl: 'https://leetcode.com/problems/single-number/',
    category: 'Foundation',
    priority: 1,
    description: 'Every element appears twice except one. Find that single one.',
    examples: [
      { input: 'nums = [4,1,2,1,2]', output: '4', explanation: '4 appears once, others appear twice.' },
    ],
    hints: [
      'XOR of same number is 0',
      'XOR of number with 0 is the number',
      'XOR all numbers together',
    ],
    solution: {
      approach: 'XOR all numbers. Pairs cancel out, single remains.',
      java: `public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) result ^= num;
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Missing Number': {
    leetcodeUrl: 'https://leetcode.com/problems/missing-number/',
    category: 'Foundation',
    priority: 1,
    description: 'Find missing number in array containing n distinct numbers from [0, n].',
    examples: [
      { input: 'nums = [3,0,1]', output: '2', explanation: 'Range is [0,3], missing 2.' },
    ],
    hints: [
      'XOR numbers with indices',
      'Or use sum formula: n(n+1)/2 - sum',
      'Missing number remains after XOR',
    ],
    solution: {
      approach: 'XOR all numbers and indices 0 to n. Missing remains.',
      java: `public int missingNumber(int[] nums) {
    int xor = nums.length;
    for (int i = 0; i < nums.length; i++) {
        xor ^= i ^ nums[i];
    }
    return xor;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Number of 1 Bits': {
    leetcodeUrl: 'https://leetcode.com/problems/number-of-1-bits/',
    category: 'Foundation',
    priority: 1,
    description: 'Return number of 1 bits in binary representation (Hamming weight).',
    examples: [
      { input: 'n = 11 (binary: 1011)', output: '3', explanation: 'Three 1 bits.' },
    ],
    hints: [
      'n & (n-1) removes lowest set bit',
      'Count iterations until n becomes 0',
      'Or use built-in popcount',
    ],
    solution: {
      approach: 'Remove lowest set bit repeatedly and count.',
      java: `public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1);
        count++;
    }
    return count;
}`,
      timeComplexity: 'O(number of 1 bits)',
      spaceComplexity: 'O(1)',
    },
  },

  'Counting Bits': {
    leetcodeUrl: 'https://leetcode.com/problems/counting-bits/',
    category: 'Core',
    priority: 2,
    description: 'Return array where result[i] is number of 1 bits in i, for i from 0 to n.',
    examples: [
      { input: 'n = 5', output: '[0,1,1,2,1,2]', explanation: 'Bit counts for 0,1,2,3,4,5.' },
    ],
    hints: [
      'DP: bits[i] = bits[i >> 1] + (i & 1)',
      'Or bits[i] = bits[i & (i-1)] + 1',
      'Build on previously computed values',
    ],
    solution: {
      approach: 'DP: count[i] = count[i/2] + (i mod 2).',
      java: `public int[] countBits(int n) {
    int[] result = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        result[i] = result[i >> 1] + (i & 1);
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Hamming Distance': {
    leetcodeUrl: 'https://leetcode.com/problems/hamming-distance/',
    category: 'Foundation',
    priority: 1,
    description: 'Return number of positions where corresponding bits differ.',
    examples: [
      { input: 'x = 1, y = 4', output: '2', explanation: '1 (001) vs 4 (100): differ at 2 positions.' },
    ],
    hints: [
      'XOR gives 1 where bits differ',
      'Count 1s in XOR result',
      'Use popcount or n & (n-1) trick',
    ],
    solution: {
      approach: 'XOR then count 1 bits.',
      java: `public int hammingDistance(int x, int y) {
    int xor = x ^ y, count = 0;
    while (xor != 0) {
        xor &= (xor - 1);
        count++;
    }
    return count;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
    },
  },

  'Power of Two': {
    leetcodeUrl: 'https://leetcode.com/problems/power-of-two/',
    category: 'Foundation',
    priority: 1,
    description: 'Check if n is a power of two.',
    examples: [
      { input: 'n = 16', output: 'true', explanation: '16 = 2^4.' },
    ],
    hints: [
      'Power of 2 has exactly one 1 bit',
      'n & (n-1) removes lowest 1 bit',
      'If result is 0 and n > 0, its power of 2',
    ],
    solution: {
      approach: 'Power of 2 has one bit set: n & (n-1) == 0.',
      java: `public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
    },
  },

  'Reverse Bits': {
    leetcodeUrl: 'https://leetcode.com/problems/reverse-bits/',
    category: 'Core',
    priority: 2,
    description: 'Reverse bits of a 32-bit unsigned integer.',
    examples: [
      { input: 'n = 43261596', output: '964176192', explanation: 'Binary reversed.' },
    ],
    hints: [
      'Extract LSB, add to result, shift result left',
      'Shift n right, repeat 32 times',
      'Or use divide and conquer',
    ],
    solution: {
      approach: 'Extract and append bits one by one.',
      java: `public int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        result = (result << 1) | (n & 1);
        n >>= 1;
    }
    return result;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
    },
  },

  'Sum of Two Integers': {
    leetcodeUrl: 'https://leetcode.com/problems/sum-of-two-integers/',
    category: 'Core',
    priority: 2,
    description: 'Calculate sum of two integers without using + or - operators.',
    examples: [
      { input: 'a = 1, b = 2', output: '3', explanation: '1 + 2 = 3.' },
    ],
    hints: [
      'XOR gives sum without carry',
      'AND then left shift gives carry',
      'Repeat until no carry',
    ],
    solution: {
      approach: 'XOR for sum without carry, AND+shift for carry. Repeat.',
      java: `public int getSum(int a, int b) {
    while (b != 0) {
        int carry = (a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
    },
  },

  'Bitwise AND of Numbers Range': {
    leetcodeUrl: 'https://leetcode.com/problems/bitwise-and-of-numbers-range/',
    category: 'Core',
    priority: 3,
    description: 'Return bitwise AND of all numbers in range [left, right].',
    examples: [
      { input: 'left = 5, right = 7', output: '4', explanation: '5 & 6 & 7 = 4.' },
    ],
    hints: [
      'Result is common prefix of left and right',
      'Right shift both until equal',
      'Left shift back same amount',
    ],
    solution: {
      approach: 'Find common prefix: shift until equal, then shift back.',
      java: `public int rangeBitwiseAnd(int left, int right) {
    int shift = 0;
    while (left < right) {
        left >>= 1;
        right >>= 1;
        shift++;
    }
    return left << shift;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
    },
  },

  'Single Number II': {
    leetcodeUrl: 'https://leetcode.com/problems/single-number-ii/',
    category: 'Core',
    priority: 2,
    description: 'Every element appears three times except one. Find that single one.',
    examples: [
      { input: 'nums = [2,2,3,2]', output: '3', explanation: '3 appears once, 2 appears three times.' },
    ],
    hints: [
      'Count bits at each position',
      'If count % 3 != 0, single number has that bit',
      'Or use state machine with two variables',
    ],
    solution: {
      approach: 'Count bits at each position. If count % 3 != 0, result has that bit.',
      java: `public int singleNumber(int[] nums) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        int bitSum = 0;
        for (int num : nums) {
            bitSum += (num >> i) & 1;
        }
        if (bitSum % 3 != 0) {
            result |= (1 << i);
        }
    }
    return result;
}`,
      timeComplexity: 'O(32n) = O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Single Number III': {
    leetcodeUrl: 'https://leetcode.com/problems/single-number-iii/',
    category: 'Core',
    priority: 3,
    description: 'Two elements appear once, all others twice. Find those two.',
    examples: [
      { input: 'nums = [1,2,1,3,2,5]', output: '[3,5]', explanation: '3 and 5 appear once.' },
    ],
    hints: [
      'XOR all → get XOR of two singles',
      'Find any set bit (they differ there)',
      'Divide into two groups by that bit, XOR each group',
    ],
    solution: {
      approach: 'XOR all, find differing bit, partition and XOR each group.',
      java: `public int[] singleNumber(int[] nums) {
    int xor = 0;
    for (int num : nums) xor ^= num;
    int diffBit = xor & (-xor);
    int[] result = new int[2];
    for (int num : nums) {
        if ((num & diffBit) == 0) result[0] ^= num;
        else result[1] ^= num;
    }
    return result;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Power of Four': {
    leetcodeUrl: 'https://leetcode.com/problems/power-of-four/',
    category: 'Foundation',
    priority: 2,
    description: 'Check if n is a power of four.',
    examples: [
      { input: 'n = 16', output: 'true', explanation: '16 = 4^2.' },
    ],
    hints: [
      'Must be power of 2 first',
      'Power of 4 has single bit at even position',
      'Use mask 0x55555555 (bits at positions 0,2,4,...)',
    ],
    solution: {
      approach: 'Power of 2 check + bit at even position (0x55555555 mask).',
      java: `public boolean isPowerOfFour(int n) {
    return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
    },
  },

  'XOR Queries of a Subarray': {
    leetcodeUrl: 'https://leetcode.com/problems/xor-queries-of-a-subarray/',
    category: 'Core',
    priority: 3,
    description: 'Answer queries for XOR of elements from index left to right.',
    examples: [
      { input: 'arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3],[3,3]]', output: '[2,7,14,8]', explanation: 'XOR for each range.' },
    ],
    hints: [
      'Prefix XOR similar to prefix sum',
      'XOR(left, right) = prefix[right+1] ^ prefix[left]',
      'XOR is its own inverse',
    ],
    solution: {
      approach: 'Build prefix XOR array. Range XOR = prefix[r+1] ^ prefix[l].',
      java: `public int[] xorQueries(int[] arr, int[][] queries) {
    int[] prefix = new int[arr.length + 1];
    for (int i = 0; i < arr.length; i++) {
        prefix[i + 1] = prefix[i] ^ arr[i];
    }
    int[] result = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        result[i] = prefix[queries[i][1] + 1] ^ prefix[queries[i][0]];
    }
    return result;
}`,
      timeComplexity: 'O(n + q)',
      spaceComplexity: 'O(n)',
    },
  },

  'Find the Duplicate Number': {
    leetcodeUrl: 'https://leetcode.com/problems/find-the-duplicate-number/',
    category: 'Core',
    priority: 3,
    description: 'Array of n+1 integers in range [1,n]. Find the duplicate without modifying array.',
    examples: [
      { input: 'nums = [1,3,4,2,2]', output: '2', explanation: '2 appears twice.' },
    ],
    hints: [
      'Floyds cycle detection',
      'Treat array as linked list: index → value is next pointer',
      'Duplicate creates a cycle',
    ],
    solution: {
      approach: 'Floyd cycle detection: fast/slow pointers, then find cycle start.',
      java: `public int findDuplicate(int[] nums) {
    int slow = nums[0], fast = nums[0];
    do {
        slow = nums[slow];
        fast = nums[nums[fast]];
    } while (slow != fast);
    slow = nums[0];
    while (slow != fast) {
        slow = nums[slow];
        fast = nums[fast];
    }
    return slow;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
    },
  },

  'Repeated DNA Sequences': {
    leetcodeUrl: 'https://leetcode.com/problems/repeated-dna-sequences/',
    category: 'Core',
    priority: 3,
    description: 'Find all 10-letter sequences that occur more than once.',
    examples: [
      { input: 's = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"', output: '["AAAAACCCCC","CCCCCAAAAA"]', explanation: 'These sequences appear twice.' },
    ],
    hints: [
      'Use HashSet to track seen sequences',
      'Sliding window of size 10',
      'Can use rolling hash or bitmask for optimization',
    ],
    solution: {
      approach: 'Sliding window with two HashSets: seen and result.',
      java: `public List<String> findRepeatedDnaSequences(String s) {
    Set<String> seen = new HashSet<>(), result = new HashSet<>();
    for (int i = 0; i + 10 <= s.length(); i++) {
        String seq = s.substring(i, i + 10);
        if (!seen.add(seq)) result.add(seq);
    }
    return new ArrayList<>(result);
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  'Maximum Product of Word Lengths': {
    leetcodeUrl: 'https://leetcode.com/problems/maximum-product-of-word-lengths/',
    category: 'Core',
    priority: 4,
    description: 'Find max product of lengths of two words with no common letters.',
    examples: [
      { input: 'words = ["abcw","baz","foo","bar","xtfn","abcdef"]', output: '16', explanation: '"abcw" and "xtfn" have no common letters, 4 × 4 = 16.' },
    ],
    hints: [
      'Represent each word as 26-bit bitmask',
      'No common letters if mask1 & mask2 == 0',
      'Compare all pairs',
    ],
    solution: {
      approach: 'Bitmask each word. If masks AND == 0, no common letters.',
      java: `public int maxProduct(String[] words) {
    int[] masks = new int[words.length];
    for (int i = 0; i < words.length; i++) {
        for (char c : words[i].toCharArray()) {
            masks[i] |= 1 << (c - 'a');
        }
    }
    int max = 0;
    for (int i = 0; i < words.length; i++) {
        for (int j = i + 1; j < words.length; j++) {
            if ((masks[i] & masks[j]) == 0) {
                max = Math.max(max, words[i].length() * words[j].length());
            }
        }
    }
    return max;
}`,
      timeComplexity: 'O(n² + L)',
      spaceComplexity: 'O(n)',
    },
  },

  'Bitwise ORs of Subarrays': {
    leetcodeUrl: 'https://leetcode.com/problems/bitwise-ors-of-subarrays/',
    category: 'Challenge',
    priority: 5,
    description: 'Return number of distinct bitwise ORs of all subarrays.',
    examples: [
      { input: 'arr = [1,1,2]', output: '3', explanation: 'Distinct ORs: 1, 2, 3.' },
    ],
    hints: [
      'OR only adds bits, never removes',
      'Track set of ORs ending at each position',
      'Set size is bounded by 32 (bit positions)',
    ],
    solution: {
      approach: 'Track ORs ending at each index. Each set has at most 32 values.',
      java: `public int subarrayBitwiseORs(int[] arr) {
    Set<Integer> result = new HashSet<>();
    Set<Integer> prev = new HashSet<>();
    for (int num : arr) {
        Set<Integer> curr = new HashSet<>();
        curr.add(num);
        for (int p : prev) {
            curr.add(p | num);
        }
        result.addAll(curr);
        prev = curr;
    }
    return result.size();
}`,
      timeComplexity: 'O(32n)',
      spaceComplexity: 'O(32n)',
    },
  },

  'Minimum Flips to Make a OR b Equal to c': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-flips-to-make-a-or-b-equal-to-c/',
    category: 'Core',
    priority: 4,
    description: 'Find minimum bit flips to make (a OR b) == c.',
    examples: [
      { input: 'a = 2, b = 6, c = 5', output: '3', explanation: 'Flip bits to get 2|6=5.' },
    ],
    hints: [
      'Check each bit position independently',
      'If c bit is 0, both a and b bits must be 0',
      'If c bit is 1, at least one of a or b must be 1',
    ],
    solution: {
      approach: 'Check each bit. If c=0, flip both 1s in a,b. If c=1, flip if both are 0.',
      java: `public int minFlips(int a, int b, int c) {
    int flips = 0;
    for (int i = 0; i < 32; i++) {
        int bitA = (a >> i) & 1;
        int bitB = (b >> i) & 1;
        int bitC = (c >> i) & 1;
        if (bitC == 0) {
            flips += bitA + bitB;
        } else {
            if (bitA == 0 && bitB == 0) flips++;
        }
    }
    return flips;
}`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
    },
  },

  'Count Triplets That Can Form Two Arrays of Equal XOR': {
    leetcodeUrl: 'https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/',
    category: 'Core',
    priority: 4,
    description: 'Count triplets (i,j,k) where XOR(arr[i..j-1]) == XOR(arr[j..k]).',
    examples: [
      { input: 'arr = [2,3,1,6,7]', output: '4', explanation: '4 valid triplets exist.' },
    ],
    hints: [
      'XOR(i..j-1) == XOR(j..k) means XOR(i..k) == 0',
      'If XOR(i..k) == 0, any j in (i,k] works',
      'Count pairs where prefix XORs are equal',
    ],
    solution: {
      approach: 'If prefix[i] == prefix[k+1], all j in (i,k] valid. Count = k - i.',
      java: `public int countTriplets(int[] arr) {
    int n = arr.length, count = 0;
    int[] prefix = new int[n + 1];
    for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] ^ arr[i];
    for (int i = 0; i < n; i++) {
        for (int k = i + 1; k < n; k++) {
            if (prefix[i] == prefix[k + 1]) {
                count += k - i;
            }
        }
    }
    return count;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
    },
  },

  'Decode XORed Permutation': {
    leetcodeUrl: 'https://leetcode.com/problems/decode-xored-permutation/',
    category: 'Challenge',
    priority: 5,
    description: 'Decode an encoded array where encoded[i] = perm[i] XOR perm[i+1].',
    examples: [
      { input: 'encoded = [3,1]', output: '[1,2,3]', explanation: 'perm such that encoded[i] = perm[i] ^ perm[i+1].' },
    ],
    hints: [
      'XOR of 1 to n is known',
      'XOR of odd indices of encoded gives XOR of perm[1], perm[3], ...',
      'Can derive perm[0] from total XOR',
    ],
    solution: {
      approach: 'Find perm[0] using properties of XOR. Then derive rest from encoded.',
      java: `public int[] decode(int[] encoded) {
    int n = encoded.length + 1;
    int totalXor = 0;
    for (int i = 1; i <= n; i++) totalXor ^= i;
    int oddXor = 0;
    for (int i = 1; i < encoded.length; i += 2) oddXor ^= encoded[i];
    int[] perm = new int[n];
    perm[0] = totalXor ^ oddXor;
    for (int i = 0; i < encoded.length; i++) {
        perm[i + 1] = perm[i] ^ encoded[i];
    }
    return perm;
}`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
    },
  },

  // ==================== SEGMENT TREES ====================
  'Range Sum Query - Mutable': {
    leetcodeUrl: 'https://leetcode.com/problems/range-sum-query-mutable/',
    category: 'Core',
    priority: 1,
    description: 'Support update(index, val) and sumRange(left, right) efficiently.',
    examples: [
      { input: 'nums = [1,3,5], sumRange(0,2) → 9, update(1,2), sumRange(0,2) → 8', output: '9, 8', explanation: 'After update, sum changes.' },
    ],
    hints: [
      'Segment tree or Binary Indexed Tree (BIT)',
      'Both support O(log n) update and query',
      'BIT is simpler for sum queries',
    ],
    solution: {
      approach: 'Binary Indexed Tree (Fenwick Tree) for efficient updates and queries.',
      java: `class NumArray {
    int[] tree, nums;
    int n;
    
    public NumArray(int[] nums) {
        this.n = nums.length;
        this.nums = nums;
        this.tree = new int[n + 1];
        for (int i = 0; i < n; i++) add(i + 1, nums[i]);
    }
    
    private void add(int i, int delta) {
        for (; i <= n; i += i & (-i)) tree[i] += delta;
    }
    
    private int sum(int i) {
        int s = 0;
        for (; i > 0; i -= i & (-i)) s += tree[i];
        return s;
    }
    
    public void update(int index, int val) {
        add(index + 1, val - nums[index]);
        nums[index] = val;
    }
    
    public int sumRange(int left, int right) {
        return sum(right + 1) - sum(left);
    }
}`,
      timeComplexity: 'O(log n) per operation',
      spaceComplexity: 'O(n)',
    },
  },

  'Range Module': {
    leetcodeUrl: 'https://leetcode.com/problems/range-module/',
    category: 'Challenge',
    priority: 3,
    description: 'Design data structure to add, remove, and query ranges.',
    examples: [
      { input: 'addRange(10,20), removeRange(14,16), queryRange(10,14) → true', output: 'true', explanation: '[10,14) is fully tracked after removal.' },
    ],
    hints: [
      'TreeMap with start → end mapping',
      'Merge overlapping ranges on add',
      'Split ranges on remove',
    ],
    solution: {
      approach: 'TreeMap of intervals. Merge on add, split on remove.',
      java: `class RangeModule {
    TreeMap<Integer, Integer> map = new TreeMap<>();
    
    public void addRange(int left, int right) {
        Integer start = map.floorKey(left);
        Integer end = map.floorKey(right);
        if (start != null && map.get(start) >= left) left = start;
        if (end != null && map.get(end) > right) right = map.get(end);
        map.subMap(left, right).clear();
        map.put(left, right);
    }
    
    public boolean queryRange(int left, int right) {
        Integer start = map.floorKey(left);
        return start != null && map.get(start) >= right;
    }
    
    public void removeRange(int left, int right) {
        Integer start = map.floorKey(left);
        Integer end = map.floorKey(right);
        if (end != null && map.get(end) > right) map.put(right, map.get(end));
        if (start != null && map.get(start) > left) map.put(start, left);
        map.subMap(left, right).clear();
    }
}`,
      timeComplexity: 'O(log n) per operation',
      spaceComplexity: 'O(n)',
    },
  },

  'Falling Squares': {
    leetcodeUrl: 'https://leetcode.com/problems/falling-squares/',
    category: 'Challenge',
    priority: 4,
    description: 'Return heights after each square falls. Squares stack on top of previous.',
    examples: [
      { input: 'positions = [[1,2],[2,3],[6,1]]', output: '[2,5,5]', explanation: 'Heights after each square falls.' },
    ],
    hints: [
      'Coordinate compression + segment tree',
      'Or simulate with interval tracking',
      'Query max height in range, update range',
    ],
    solution: {
      approach: 'Track intervals with heights. Query max in range before placing.',
      java: `public List<Integer> fallingSquares(int[][] positions) {
    List<int[]> intervals = new ArrayList<>();
    List<Integer> result = new ArrayList<>();
    int maxHeight = 0;
    for (int[] pos : positions) {
        int left = pos[0], side = pos[1], right = left + side;
        int baseHeight = 0;
        for (int[] iv : intervals) {
            if (iv[1] > left && iv[0] < right) {
                baseHeight = Math.max(baseHeight, iv[2]);
            }
        }
        int height = baseHeight + side;
        intervals.add(new int[]{left, right, height});
        maxHeight = Math.max(maxHeight, height);
        result.add(maxHeight);
    }
    return result;
}`,
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(n)',
    },
  },
};

// Helper function to get enhanced problem data
export function getEnhancedProblem(problem) {
  const details = problemDetails[problem.name];
  if (!details) return problem;
  
  return {
    ...problem,
    ...details,
    // Keep original values if not overridden
    tags: problem.tags,
    difficulty: problem.difficulty,
  };
}

// Get all enhanced problems for a pattern
export function getEnhancedProblems(problems) {
  return problems.map(getEnhancedProblem);
}

