export const bitManipulation = {
  id: 'bit-manipulation',
  title: 'Bit Manipulation',
  icon: '⚡',
  difficulty: 'Medium',
  
  theory: {
    overview: `Bit manipulation operates directly on binary representations. Key operations: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>).

XOR is especially powerful: a^a=0, a^0=a. This enables finding single numbers, swapping without temp, and detecting differences.

Common tricks: n&(n-1) removes lowest set bit, n&(-n) isolates lowest set bit, check if power of 2 with n&(n-1)==0.`,
    
    keyInsight: 'XOR: same bits cancel (a^a=0). AND with n-1 removes lowest bit. Shift for multiply/divide by 2.',
    
    whenToUse: [
      'Finding single/missing numbers (XOR)',
      'Counting set bits',
      'Power of 2 checks',
      'Subset generation with bitmasks',
      'Optimization in competitive programming'
    ],
    
    complexity: {
      time: 'O(1) for basic operations, O(log n) for counting bits',
      space: 'O(1)'
    }
  },

  decisionTree: {
    question: "What bit operation do you need?",
    options: [
      { label: "Find single/missing number", result: "xor-single" },
      { label: "Count set bits", result: "count-bits" },
      { label: "Power of 2 check", result: "power-of-2" },
      { label: "Subset enumeration with bitmask", result: "bitmask" }
    ]
  },

  templates: [
    {
      id: 'xor-single',
      name: 'XOR to Find Single Number',
      description: 'XOR all elements. Duplicates cancel, single remains.',
      java: `// Single Number (every element appears twice except one)
public int singleNumber(int[] nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;  // Duplicates cancel out
    }
    return result;
}

// Missing Number (0 to n, one missing)
public int missingNumber(int[] nums) {
    int n = nums.length;
    int result = n;  // Include n in XOR
    for (int i = 0; i < n; i++) {
        result ^= i ^ nums[i];
    }
    return result;
}

// Two numbers appear once, others twice
public int[] singleNumberIII(int[] nums) {
    int xor = 0;
    for (int num : nums) xor ^= num;
    
    // Find rightmost set bit (differs between two singles)
    int diff = xor & (-xor);
    
    int[] result = new int[2];
    for (int num : nums) {
        if ((num & diff) == 0) {
            result[0] ^= num;
        } else {
            result[1] ^= num;
        }
    }
    return result;
}`,
      python: `# Single Number (every element appears twice except one)
def single_number(nums: List[int]) -> int:
    result = 0
    for num in nums:
        result ^= num  # Duplicates cancel out
    return result

# Missing Number (0 to n, one missing)
def missing_number(nums: List[int]) -> int:
    n = len(nums)
    result = n  # Include n in XOR
    for i in range(n):
        result ^= i ^ nums[i]
    return result

# Two numbers appear once, others twice
def single_number_iii(nums: List[int]) -> List[int]:
    xor = 0
    for num in nums:
        xor ^= num
    
    # Find rightmost set bit
    diff = xor & (-xor)
    
    result = [0, 0]
    for num in nums:
        if num & diff:
            result[1] ^= num
        else:
            result[0] ^= num
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'nums = [4,1,2,1,2]',
        output: '4',
        explanation: '4 appears once, others twice. XOR: 1^1^2^2^4 = 4'
      }
    },
    {
      id: 'count-bits',
      name: 'Count Set Bits (Hamming Weight)',
      description: 'Remove lowest set bit repeatedly with n & (n-1).',
      java: `// Count 1 bits in a number
public int hammingWeight(int n) {
    int count = 0;
    while (n != 0) {
        n &= (n - 1);  // Remove lowest set bit
        count++;
    }
    return count;
}

// Hamming Distance (differing bits between two numbers)
public int hammingDistance(int x, int y) {
    return hammingWeight(x ^ y);
}

// Count bits for all numbers 0 to n
public int[] countBits(int n) {
    int[] dp = new int[n + 1];
    for (int i = 1; i <= n; i++) {
        dp[i] = dp[i & (i - 1)] + 1;  // DP using bit trick
    }
    return dp;
}`,
      python: `# Count 1 bits in a number
def hamming_weight(n: int) -> int:
    count = 0
    while n:
        n &= (n - 1)  # Remove lowest set bit
        count += 1
    return count

# Or use built-in
def hamming_weight_builtin(n: int) -> int:
    return bin(n).count('1')

# Hamming Distance (differing bits)
def hamming_distance(x: int, y: int) -> int:
    return bin(x ^ y).count('1')

# Count bits for all numbers 0 to n
def count_bits(n: int) -> List[int]:
    dp = [0] * (n + 1)
    for i in range(1, n + 1):
        dp[i] = dp[i & (i - 1)] + 1  # DP using bit trick
    return dp`,
      timeComplexity: 'O(log n) or O(set bits)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'n = 11 (binary: 1011)',
        output: '3',
        explanation: '11 in binary is 1011, has 3 set bits'
      }
    },
    {
      id: 'power-of-2',
      name: 'Power of 2 Check',
      description: 'Power of 2 has exactly one set bit. n & (n-1) == 0.',
      java: `public boolean isPowerOfTwo(int n) {
    return n > 0 && (n & (n - 1)) == 0;
}

// Check if power of 4
public boolean isPowerOfFour(int n) {
    // Power of 2 AND bit in odd position (0x55555555 = 0101...0101)
    return n > 0 && (n & (n - 1)) == 0 && (n & 0x55555555) != 0;
}`,
      python: `def is_power_of_two(n: int) -> bool:
    return n > 0 and (n & (n - 1)) == 0

# Check if power of 4
def is_power_of_four(n: int) -> bool:
    # Power of 2 AND bit in odd position
    return n > 0 and (n & (n - 1)) == 0 and (n & 0x55555555) != 0`,
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'n = 16',
        output: 'true',
        explanation: '16 = 10000 in binary, one set bit'
      }
    },
    {
      id: 'bitmask',
      name: 'Bitmask for Subsets',
      description: 'Enumerate all 2^n subsets using numbers 0 to 2^n - 1.',
      java: `// Generate all subsets using bitmask
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    int n = nums.length;
    
    for (int mask = 0; mask < (1 << n); mask++) {
        List<Integer> subset = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) {
                subset.add(nums[i]);
            }
        }
        result.add(subset);
    }
    
    return result;
}`,
      python: `# Generate all subsets using bitmask
def subsets(nums: List[int]) -> List[List[int]]:
    result = []
    n = len(nums)
    
    for mask in range(1 << n):  # 0 to 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(nums[i])
        result.append(subset)
    
    return result`,
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(n * 2^n)',
      testCase: {
        input: 'nums = [1, 2]',
        output: '[[], [1], [2], [1,2]]',
        explanation: 'mask 00=[], 01=[1], 10=[2], 11=[1,2]'
      }
    }
  ],

  problems: [
    { name: 'Single Number', difficulty: 'Easy', tags: ['XOR'] },
    { name: 'Single Number II', difficulty: 'Medium', tags: ['bit count'] },
    { name: 'Single Number III', difficulty: 'Medium', tags: ['XOR', 'divide'] },
    { name: 'Missing Number', difficulty: 'Easy', tags: ['XOR'] },
    { name: 'Number of 1 Bits', difficulty: 'Easy', tags: ['count bits'] },
    { name: 'Counting Bits', difficulty: 'Easy', tags: ['DP', 'bits'] },
    { name: 'Power of Two', difficulty: 'Easy', tags: ['bit trick'] },
    { name: 'Reverse Bits', difficulty: 'Easy', tags: ['bit by bit'] },
    { name: 'Sum of Two Integers', difficulty: 'Medium', tags: ['add without +'] }
  ],

  mistakes: [
    {
      trap: 'Integer overflow with left shift',
      fix: 'Use 1L << n for shifts beyond 32 bits in Java. Python handles big integers.'
    },
    {
      trap: 'Signed vs unsigned right shift',
      fix: 'Java: >> is signed (fills with sign bit), >>> is unsigned. Python only has >>.'
    },
    {
      trap: 'Forgetting n > 0 check in power of 2',
      fix: '0 & (0-1) = 0, which passes the bit test. Explicitly check n > 0.'
    }
  ],

  variations: [
    {
      name: 'Gray Code',
      description: 'Adjacent numbers differ by one bit. n ^ (n >> 1) converts to gray code.'
    },
    {
      name: 'Bit DP',
      description: 'Use bitmask as DP state for subset problems (Traveling Salesman).'
    }
  ]
};

