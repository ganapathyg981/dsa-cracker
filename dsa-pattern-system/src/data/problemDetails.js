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
    hints: [
      'Use frequency map for required characters',
      'Expand window until all required chars found',
      'Shrink to find minimum while still valid',
      'Track "formed" count for efficiency',
    ],
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
    hints: [
      'Binary search on the answer (eating speed)',
      'For each speed, calculate hours needed',
      'Search for minimum valid speed',
    ],
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
  },

  'Magnetic Force Between Two Balls': {
    leetcodeUrl: 'https://leetcode.com/problems/magnetic-force-between-two-balls/',
    category: 'Practice',
    priority: 11,
  },

  'Minimized Maximum of Products Distributed to Any Store': {
    leetcodeUrl: 'https://leetcode.com/problems/minimized-maximum-of-products-distributed-to-any-store/',
    category: 'Practice',
    priority: 12,
  },

  'Kth Smallest Element in Sorted Matrix': {
    leetcodeUrl: 'https://leetcode.com/problems/kth-smallest-element-in-a-sorted-matrix/',
    category: 'Challenge',
    priority: 13,
  },

  'Median of Two Sorted Arrays': {
    leetcodeUrl: 'https://leetcode.com/problems/median-of-two-sorted-arrays/',
    category: 'Advanced',
    priority: 15,
  },

  'Split Array Largest Sum': {
    leetcodeUrl: 'https://leetcode.com/problems/split-array-largest-sum/',
    category: 'Challenge',
    priority: 14,
  },

  'Count of Smaller Numbers After Self': {
    leetcodeUrl: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
    category: 'Advanced',
    priority: 16,
  },

  'Max Sum of Rectangle No Larger Than K': {
    leetcodeUrl: 'https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/',
    category: 'Advanced',
    priority: 17,
  },

  'Shortest Subarray with Sum at Least K': {
    leetcodeUrl: 'https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/',
    category: 'Advanced',
    priority: 18,
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
  },

  'Ones and Zeroes': {
    leetcodeUrl: 'https://leetcode.com/problems/ones-and-zeroes/',
    category: 'Practice',
    priority: 11,
  },

  'Burst Balloons': {
    leetcodeUrl: 'https://leetcode.com/problems/burst-balloons/',
    category: 'Advanced',
    priority: 15,
  },

  'Minimum Cost Tree From Leaf Values': {
    leetcodeUrl: 'https://leetcode.com/problems/minimum-cost-tree-from-leaf-values/',
    category: 'Challenge',
    priority: 12,
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
  },

  'Best Time to Buy and Sell Stock IV': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/',
    category: 'Challenge',
    priority: 14,
  },

  'Best Time to Buy and Sell Stock with Cooldown': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/',
    category: 'Practice',
    priority: 12,
  },

  'Best Time to Buy and Sell Stock with Transaction Fee': {
    leetcodeUrl: 'https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee/',
    category: 'Practice',
    priority: 12,
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
  },

  'Generate Parentheses': {
    leetcodeUrl: 'https://leetcode.com/problems/generate-parentheses/',
    category: 'Core',
    priority: 4,
    description: 'Generate all combinations of well-formed parentheses.',
    hints: [
      'Track open and close counts',
      'Add ( if open < n',
      'Add ) if close < open',
    ],
  },

  'Permutation Sequence': {
    leetcodeUrl: 'https://leetcode.com/problems/permutation-sequence/',
    category: 'Challenge',
    priority: 10,
  },

  'Beautiful Arrangement': {
    leetcodeUrl: 'https://leetcode.com/problems/beautiful-arrangement/',
    category: 'Practice',
    priority: 7,
  },

  'The k-th Lexicographical String of All Happy Strings of Length n': {
    leetcodeUrl: 'https://leetcode.com/problems/the-k-th-lexicographical-string-of-all-happy-strings-of-length-n/',
    category: 'Practice',
    priority: 8,
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
  },

  'Sudoku Solver': {
    leetcodeUrl: 'https://leetcode.com/problems/sudoku-solver/',
    category: 'Advanced',
    priority: 12,
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

