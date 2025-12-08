export const bitManipulation = {
  id: 'bit-manipulation',
  title: 'Bit Manipulation',
  icon: '⚡',
  difficulty: 'Medium',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION
  introduction: {
    realWorldAnalogy: `Think of a row of light switches 💡:

Each switch is either ON (1) or OFF (0). That's binary!

**Number 13 in binary:** 1101 (8+4+0+1)
• 4 switches, positions 3,2,1,0
• Switches at positions 3,2,0 are ON

**Bit operations = Manipulating switches:**
• AND (&): Both ON → ON
• OR (|): Either ON → ON  
• XOR (^): Different → ON (same → OFF)`,

    simpleExplanation: `Bit Manipulation operates directly on binary representations. It's fast (O(1)) and memory-efficient.

**Key Operations:**
• **AND (&)**: 1 & 1 = 1, else 0  — "Both must be 1"
• **OR (|)**: 0 | 0 = 0, else 1  — "At least one is 1"
• **XOR (^)**: Same = 0, Different = 1 — "Toggle/cancel"
• **NOT (~)**: Flip all bits
• **Shift (<<, >>)**: Multiply/divide by 2

**Magic XOR Properties:**
• a ^ a = 0 (same values cancel!)
• a ^ 0 = a (identity)
• XOR is commutative and associative`,

    visualSteps: [
      { step: 1, title: 'Single Number (XOR)', description: 'XOR all elements, duplicates cancel', visual: '[4,1,2,1,2] → 4^1^2^1^2 = 4' },
      { step: 2, title: 'Check Bit Set', description: 'AND with mask', visual: '(n & (1 << i)) != 0 → bit i is set' },
      { step: 3, title: 'Set Bit', description: 'OR with mask', visual: 'n | (1 << i) → set bit i to 1' },
      { step: 4, title: 'Clear Bit', description: 'AND with inverted mask', visual: 'n & ~(1 << i) → clear bit i' },
      { step: 5, title: 'Count Bits', description: 'Remove lowest bit until 0', visual: 'while(n): count++; n &= (n-1)' },
    ],

    keyTakeaway: '💡 XOR is magical: a^a=0 cancels duplicates. n&(n-1) removes lowest set bit. Bit ops are O(1) and super fast!',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'single number',
      'missing number',
      'power of two',
      'count bits',
      'hamming distance',
      'subsets using bitmask',
      'XOR',
    ],
    problemCharacteristics: [
      'Finding single/missing element among pairs',
      'Checking power of 2, 4, etc.',
      'Counting set bits',
      'Generating subsets efficiently',
      'Space optimization needed',
    ],
    commonTricks: [
      { trick: 'n & (n-1)', effect: 'Removes lowest set bit' },
      { trick: 'n & (-n)', effect: 'Isolates lowest set bit' },
      { trick: 'n & (n-1) == 0', effect: 'Check if power of 2' },
      { trick: 'a ^ b ^ a == b', effect: 'XOR cancels duplicates' },
    ],
    notSuitableWhen: [
      'Need more than 32/64 items (bitmask limit)',
      'Non-integer operations',
      'Readability is priority over performance',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'backtracking', relationship: 'Bitmask can represent subsets for DP/backtracking' },
    { id: 'dynamic-programming', relationship: 'Bitmask DP for subset problems (TSP, assignment)' },
    { id: 'arrays-strings', relationship: 'Bit manipulation for efficient array operations' },
  ],
  
  theory: {
    overview: `Bit manipulation operates directly on binary representations. Key operations: AND (&), OR (|), XOR (^), NOT (~), left shift (<<), right shift (>>).

XOR is especially powerful: a^a=0, a^0=a, commutative and associative. This enables finding single numbers, swapping without temp, and detecting differences.

Common tricks: n&(n-1) removes lowest set bit, n&(-n) isolates lowest set bit, check if power of 2 with n&(n-1)==0.

IMPORTANT RELATIONS:
• (a|b) = (a+b) - (a&b)
• (a+b) = (a^b) + 2*(a&b)
• Left shift (<<) multiplies by 2, right shift (>>) divides by 2
• Bitwise ops are O(1) and faster than arithmetic ops

XOR PROPERTIES:
• a^0 = a
• a^a = 0
• x^y = y^x (commutative)
• (x^y)^z = x^(y^z) (associative)`,
    
    keyInsight: 'XOR: same bits cancel (a^a=0). AND with n-1 removes lowest bit. Shift for multiply/divide by 2.',
    
    whenToUse: [
      'Finding single/missing numbers (XOR)',
      'Counting set bits',
      'Power of 2 checks',
      'Subset generation with bitmasks',
      'Optimization in competitive programming',
      'Space optimization (bitset uses 8x less than boolean array)'
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
      { label: "Power of 2/4 check", result: "power-of-2" },
      { label: "Subset enumeration with bitmask", result: "bitmask" },
      { label: "XOR range queries", result: "xor-queries" },
      { label: "Add without + operator", result: "add-xor" }
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
    },
    {
      id: 'xor-queries',
      name: 'XOR Range Queries',
      description: 'Use prefix XOR array. query[l,r] = prefix[r] ^ prefix[l-1]',
      java: `public int[] xorQueries(int[] arr, int[][] queries) {
    int n = arr.length;
    int[] prefix = new int[n];
    prefix[0] = arr[0];
    
    // Build prefix XOR array
    for (int i = 1; i < n; i++) {
        prefix[i] = prefix[i - 1] ^ arr[i];
    }
    
    int[] result = new int[queries.length];
    for (int i = 0; i < queries.length; i++) {
        int l = queries[i][0];
        int r = queries[i][1];
        
        if (l == 0) {
            result[i] = prefix[r];
        } else {
            result[i] = prefix[r] ^ prefix[l - 1];
        }
    }
    
    return result;
}`,
      python: `def xor_queries(arr: List[int], queries: List[List[int]]) -> List[int]:
    n = len(arr)
    prefix = [0] * n
    prefix[0] = arr[0]
    
    # Build prefix XOR array
    for i in range(1, n):
        prefix[i] = prefix[i - 1] ^ arr[i]
    
    result = []
    for l, r in queries:
        if l == 0:
            result.append(prefix[r])
        else:
            result.append(prefix[r] ^ prefix[l - 1])
    
    return result`,
      timeComplexity: 'O(n + q)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'arr = [1,3,4,8], queries = [[0,1],[1,2],[0,3]]',
        output: '[2,7,4]',
        explanation: '[0,1]: 1^3=2, [1,2]: 3^4=7, [0,3]: 1^3^4^8=4'
      }
    },
    {
      id: 'add-xor',
      name: 'Add Two Integers without + Operator',
      description: 'Use XOR for sum without carry, AND<<1 for carry. Repeat until carry is 0.',
      java: `public int getSum(int a, int b) {
    while (b != 0) {
        int sum = a ^ b;        // XOR for sum without carry
        int carry = (a & b) << 1;  // AND<<1 for carry
        a = sum;
        b = carry;
    }
    return a;
}`,
      python: `def get_sum(a: int, b: int) -> int:
    # Python requires handling for negative numbers (32-bit mask)
    mask = 0xFFFFFFFF
    
    while b != 0:
        sum_without_carry = (a ^ b) & mask
        carry = ((a & b) << 1) & mask
        a = sum_without_carry
        b = carry
    
    # Handle negative result
    return a if a <= 0x7FFFFFFF else ~(a ^ mask)`,
      timeComplexity: 'O(1) - limited to 32 bits',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'a = 1, b = 2',
        output: '3',
        explanation: 'sum=1^2=3, carry=(1&2)<<1=0. Result=3'
      }
    },
    {
      id: 'reverse-bits',
      name: 'Reverse Bits',
      description: 'Extract bits from right, build result from left.',
      java: `public int reverseBits(int n) {
    int result = 0;
    for (int i = 0; i < 32; i++) {
        result <<= 1;           // Shift result left
        result |= (n & 1);      // Add rightmost bit of n
        n >>= 1;                // Shift n right
    }
    return result;
}`,
      python: `def reverse_bits(n: int) -> int:
    result = 0
    for _ in range(32):
        result <<= 1           # Shift result left
        result |= (n & 1)      # Add rightmost bit of n
        n >>= 1                # Shift n right
    return result`,
      timeComplexity: 'O(1) - always 32 bits',
      spaceComplexity: 'O(1)',
      testCase: {
        input: 'n = 43261596 (00000010100101000001111010011100)',
        output: '964176192 (00111001011110000010100101000000)',
        explanation: 'Bits reversed'
      }
    }
  ],

  problems: [
    { name: 'Single Number', difficulty: 'Easy', tags: ['XOR'] },
    { name: 'Single Number II', difficulty: 'Medium', tags: ['bit count', 'state machine'] },
    { name: 'Single Number III', difficulty: 'Medium', tags: ['XOR', 'divide'] },
    { name: 'Missing Number', difficulty: 'Easy', tags: ['XOR'] },
    { name: 'Number of 1 Bits', difficulty: 'Easy', tags: ['count bits'] },
    { name: 'Counting Bits', difficulty: 'Easy', tags: ['DP', 'bits'] },
    { name: 'Hamming Distance', difficulty: 'Easy', tags: ['XOR', 'count'] },
    { name: 'Power of Two', difficulty: 'Easy', tags: ['bit trick'] },
    { name: 'Power of Four', difficulty: 'Easy', tags: ['bit trick', 'mask'] },
    { name: 'Reverse Bits', difficulty: 'Easy', tags: ['bit by bit'] },
    { name: 'Sum of Two Integers', difficulty: 'Medium', tags: ['add without +'] },
    { name: 'XOR Queries of a Subarray', difficulty: 'Medium', tags: ['prefix XOR'] },
    { name: 'Bitwise ORs of Subarrays', difficulty: 'Medium', tags: ['OR', 'set'] },
    { name: 'Bitwise AND of Numbers Range', difficulty: 'Medium', tags: ['AND', 'common prefix'] },
    { name: 'Minimum Flips to Make a OR b Equal to c', difficulty: 'Medium', tags: ['bit manipulation'] },
    { name: 'Count Triplets That Can Form Two Arrays of Equal XOR', difficulty: 'Medium', tags: ['prefix XOR'] },
    { name: 'Maximum Product of Word Lengths', difficulty: 'Medium', tags: ['bitmask', 'optimization'] },
    { name: 'Repeated DNA Sequences', difficulty: 'Medium', tags: ['bitmask', 'hashing'] },
    { name: 'Subsets', difficulty: 'Medium', tags: ['bitmask', 'enumeration'] },
    { name: 'Decode XORed Permutation', difficulty: 'Medium', tags: ['XOR', 'permutation'] },
    { name: 'Find the Duplicate Number', difficulty: 'Medium', tags: ['cycle detection', 'bit'] }
  ],

  mistakes: [
    {
      trap: 'Integer overflow with left shift',
      fix: 'Use 1L << n for shifts beyond 32 bits in Java. Python handles big integers. Avoid shifting left by 32 or more on 32-bit int.'
    },
    {
      trap: 'Signed vs unsigned right shift',
      fix: 'Java: >> is signed (fills with sign bit), >>> is unsigned. Python only has >>. For unsigned behavior in Java, use >>> or convert to long.'
    },
    {
      trap: 'Forgetting n > 0 check in power of 2',
      fix: '0 & (0-1) = 0, which passes the bit test. Explicitly check n > 0 first.'
    },
    {
      trap: 'Confusing bitwise (&, |, ^) with logical (&&, ||)',
      fix: 'Bitwise: bit-by-bit, returns int. Logical: returns boolean. Use bitwise for bit manipulation, logical for conditions.'
    },
    {
      trap: 'Not handling negative numbers in Python for add without +',
      fix: 'Python has unlimited precision. Mask with 0xFFFFFFFF and handle negative results specially.'
    },
    {
      trap: 'Wrong operator precedence: & and | have lower precedence than ==',
      fix: 'Always use parentheses: (a & b) == 0, not a & b == 0 (which is a & (b == 0)).'
    },
    {
      trap: 'Right shift on negative numbers is undefined in some languages',
      fix: 'For predictable behavior, convert to unsigned or use unsigned right shift (>>>) in Java.'
    }
  ],

  variations: [
    {
      name: 'XOR Swap Algorithm',
      description: 'Swap without temp variable: a=a^b; b=a^b; a=a^b. Now a and b are swapped. Uses XOR properties.'
    },
    {
      name: 'Parity Check in O(1)',
      description: 'Find if number of 1 bits is even/odd. Repeatedly XOR halves: y=x^(x>>16); y=y^(y>>8); y=y^(y>>4); y=y^(y>>2); y=y^(y>>1); return y&1.'
    },
    {
      name: 'Gray Code',
      description: 'Adjacent numbers differ by one bit. n ^ (n >> 1) converts to gray code.'
    },
    {
      name: 'Bit DP / Bitmask DP',
      description: 'Use bitmask as DP state for subset problems (Traveling Salesman, Assignment). State space: O(2^n).'
    },
    {
      name: 'Bitset for Space Optimization',
      description: 'Use bitset instead of bool array. 8x less space. bitset<1000> uses 128 bytes vs 1000 bytes for bool[1000].'
    },
    {
      name: 'Set Operations with Bits',
      description: 'Union: A|B, Intersection: A&B, Difference: A&~B, Complement: ~A, Set bit: A|=(1<<i), Clear: A&=~(1<<i), Test: (A&(1<<i))!=0'
    }
  ]
};

