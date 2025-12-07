export const backtracking = {
  id: 'backtracking',
  title: 'Backtracking',
  icon: '↩️',
  difficulty: 'Medium-Hard',
  
  theory: {
    overview: `Backtracking explores all possibilities by building solutions incrementally, abandoning paths that can't lead to valid solutions. It's essentially DFS on a decision tree.

The template: make a choice, recurse, undo the choice (backtrack). Key optimizations: prune branches early when constraints are violated.

Perfect for generating combinations, permutations, and solving constraint satisfaction problems like N-Queens and Sudoku.

GENERAL BACKTRACKING TEMPLATE:
1. Choose: Add element to current path
2. Explore: Recursive call with updated state
3. Unchoose: Remove element (backtrack)

The key is defining when to add to result (base case) and what choices to make at each step.`,
    
    keyInsight: 'Try all options at each decision point. If stuck, undo last choice and try next option. Prune early if possible.',
    
    whenToUse: [
      'Generate all subsets/combinations',
      'Generate all permutations',
      'Constraint satisfaction (N-Queens, Sudoku)',
      'Path finding with constraints',
      'Word search in grid',
      'Palindrome partitioning',
      'Generate parentheses/strings with constraints'
    ],
    
    complexity: {
      time: 'O(2^n) for subsets, O(n!) for permutations',
      space: 'O(n) for recursion depth'
    }
  },

  decisionTree: {
    question: "What are you generating?",
    options: [
      { label: "Subsets / Combinations (order doesn't matter)", result: "subsets" },
      { label: "Permutations (order matters, use all)", result: "permutations" },
      { label: "Permutations with duplicates", result: "permutations-dup" },
      { label: "Subsets with duplicates", result: "subsets-dup" },
      { label: "String partitioning (palindrome, etc)", result: "partition" },
      { label: "Constraint satisfaction (N-Queens)", result: "constraint" }
    ]
  },

  templates: [
    {
      id: 'subsets',
      name: 'Subsets / Combinations',
      description: 'Include or exclude each element. For combinations, use start index to avoid duplicates.',
      java: `// All Subsets
public List<List<Integer>> subsets(int[] nums) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
    result.add(new ArrayList<>(curr));  // Add current subset
    
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);              // Choose
        backtrack(nums, i + 1, curr, result);  // Explore
        curr.remove(curr.size() - 1);   // Unchoose
    }
}

// Combination Sum (can reuse elements)
public List<List<Integer>> combinationSum(int[] candidates, int target) {
    List<List<Integer>> result = new ArrayList<>();
    backtrack(candidates, 0, target, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, int target, List<Integer> curr, List<List<Integer>> result) {
    if (target == 0) {
        result.add(new ArrayList<>(curr));
        return;
    }
    if (target < 0) return;
    
    for (int i = start; i < nums.length; i++) {
        curr.add(nums[i]);
        backtrack(nums, i, target - nums[i], curr, result);  // i, not i+1 (can reuse)
        curr.remove(curr.size() - 1);
    }
}`,
      python: `# All Subsets
def subsets(nums: List[int]) -> List[List[int]]:
    result = []
    
    def backtrack(start, curr):
        result.append(curr[:])  # Add current subset
        
        for i in range(start, len(nums)):
            curr.append(nums[i])     # Choose
            backtrack(i + 1, curr)   # Explore
            curr.pop()               # Unchoose
    
    backtrack(0, [])
    return result

# Combination Sum (can reuse elements)
def combination_sum(candidates: List[int], target: int) -> List[List[int]]:
    result = []
    
    def backtrack(start, target, curr):
        if target == 0:
            result.append(curr[:])
            return
        if target < 0:
            return
        
        for i in range(start, len(candidates)):
            curr.append(candidates[i])
            backtrack(i, target - candidates[i], curr)  # i, not i+1
            curr.pop()
    
    backtrack(0, target, [])
    return result`,
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [1,2,3]',
        output: '[[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]',
        explanation: 'All 2^3 = 8 subsets'
      }
    },
    {
      id: 'permutations',
      name: 'Permutations',
      description: 'Use all elements, order matters. Track used elements.',
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
      python: `def permute(nums: List[int]) -> List[List[int]]:
    result = []
    used = [False] * len(nums)
    
    def backtrack(curr):
        if len(curr) == len(nums):
            result.append(curr[:])
            return
        
        for i in range(len(nums)):
            if used[i]:
                continue
            
            used[i] = True
            curr.append(nums[i])
            backtrack(curr)
            curr.pop()
            used[i] = False
    
    backtrack([])
    return result`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [1,2,3]',
        output: '[[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]',
        explanation: 'All 3! = 6 permutations'
      }
    },
    {
      id: 'subsets-dup',
      name: 'Subsets II (With Duplicates)',
      description: 'Sort first, skip duplicates: if i > start && nums[i] == nums[i-1], continue',
      java: `public List<List<Integer>> subsetsWithDup(int[] nums) {
    Arrays.sort(nums);  // Sort to group duplicates
    List<List<Integer>> result = new ArrayList<>();
    backtrack(nums, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(int[] nums, int start, List<Integer> curr, List<List<Integer>> result) {
    result.add(new ArrayList<>(curr));
    
    for (int i = start; i < nums.length; i++) {
        // Skip duplicates
        if (i > start && nums[i] == nums[i - 1]) {
            continue;
        }
        curr.add(nums[i]);
        backtrack(nums, i + 1, curr, result);
        curr.remove(curr.size() - 1);
    }
}`,
      python: `def subsets_with_dup(nums: List[int]) -> List[List[int]]:
    nums.sort()  # Sort to group duplicates
    result = []
    
    def backtrack(start, curr):
        result.append(curr[:])
        
        for i in range(start, len(nums)):
            # Skip duplicates
            if i > start and nums[i] == nums[i - 1]:
                continue
            curr.append(nums[i])
            backtrack(i + 1, curr)
            curr.pop()
    
    backtrack(0, [])
    return result`,
      timeComplexity: 'O(2^n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [1,2,2]',
        output: '[[],[1],[1,2],[1,2,2],[2],[2,2]]',
        explanation: 'Skip duplicate 2 at same level'
      }
    },
    {
      id: 'permutations-dup',
      name: 'Permutations II (With Duplicates)',
      description: 'Sort + skip if nums[i] == nums[i-1] && !used[i-1]',
      java: `public List<List<Integer>> permuteUnique(int[] nums) {
    Arrays.sort(nums);  // Sort to group duplicates
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
        // Skip duplicates: if previous same element not used, skip
        if (i > 0 && nums[i] == nums[i - 1] && !used[i - 1]) {
            continue;
        }
        
        used[i] = true;
        curr.add(nums[i]);
        backtrack(nums, used, curr, result);
        curr.remove(curr.size() - 1);
        used[i] = false;
    }
}`,
      python: `def permute_unique(nums: List[int]) -> List[List[int]]:
    nums.sort()  # Sort to group duplicates
    result = []
    used = [False] * len(nums)
    
    def backtrack(curr):
        if len(curr) == len(nums):
            result.append(curr[:])
            return
        
        for i in range(len(nums)):
            if used[i]:
                continue
            # Skip duplicates
            if i > 0 and nums[i] == nums[i - 1] and not used[i - 1]:
                continue
            
            used[i] = True
            curr.append(nums[i])
            backtrack(curr)
            curr.pop()
            used[i] = False
    
    backtrack([])
    return result`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [1,1,2]',
        output: '[[1,1,2],[1,2,1],[2,1,1]]',
        explanation: 'Only unique permutations'
      }
    },
    {
      id: 'partition',
      name: 'Palindrome Partitioning',
      description: 'Try all possible cuts, check if substring is palindrome.',
      java: `public List<List<String>> partition(String s) {
    List<List<String>> result = new ArrayList<>();
    backtrack(s, 0, new ArrayList<>(), result);
    return result;
}

private void backtrack(String s, int start, List<String> curr, List<List<String>> result) {
    if (start == s.length()) {
        result.add(new ArrayList<>(curr));
        return;
    }
    
    for (int i = start; i < s.length(); i++) {
        String substring = s.substring(start, i + 1);
        if (isPalindrome(substring)) {
            curr.add(substring);
            backtrack(s, i + 1, curr, result);
            curr.remove(curr.size() - 1);
        }
    }
}

private boolean isPalindrome(String s) {
    int left = 0, right = s.length() - 1;
    while (left < right) {
        if (s.charAt(left++) != s.charAt(right--)) {
            return false;
        }
    }
    return true;
}`,
      python: `def partition(s: str) -> List[List[str]]:
    result = []
    
    def is_palindrome(substr):
        return substr == substr[::-1]
    
    def backtrack(start, curr):
        if start == len(s):
            result.append(curr[:])
            return
        
        for i in range(start, len(s)):
            substring = s[start:i + 1]
            if is_palindrome(substring):
                curr.append(substring)
                backtrack(i + 1, curr)
                curr.pop()
    
    backtrack(0, [])
    return result`,
      timeComplexity: 'O(n * 2^n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 's = "aab"',
        output: '[["a","a","b"],["aa","b"]]',
        explanation: 'All ways to partition into palindromes'
      }
    },
    {
      id: 'generate-parentheses',
      name: 'Generate Parentheses',
      description: 'Add "(" if open < n, add ")" if close < open.',
      java: `public List<String> generateParenthesis(int n) {
    List<String> result = new ArrayList<>();
    backtrack(n, 0, 0, new StringBuilder(), result);
    return result;
}

private void backtrack(int n, int open, int close, StringBuilder curr, List<String> result) {
    if (curr.length() == 2 * n) {
        result.add(curr.toString());
        return;
    }
    
    if (open < n) {
        curr.append('(');
        backtrack(n, open + 1, close, curr, result);
        curr.deleteCharAt(curr.length() - 1);
    }
    
    if (close < open) {
        curr.append(')');
        backtrack(n, open, close + 1, curr, result);
        curr.deleteCharAt(curr.length() - 1);
    }
}`,
      python: `def generate_parenthesis(n: int) -> List[str]:
    result = []
    
    def backtrack(open_count, close_count, curr):
        if len(curr) == 2 * n:
            result.append(curr)
            return
        
        if open_count < n:
            backtrack(open_count + 1, close_count, curr + '(')
        
        if close_count < open_count:
            backtrack(open_count, close_count + 1, curr + ')')
    
    backtrack(0, 0, '')
    return result`,
      timeComplexity: 'O(4^n / sqrt(n)) - Catalan number',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'n = 3',
        output: '["((()))","(()())","(())()","()(())","()()()"]',
        explanation: 'All valid combinations of 3 pairs'
      }
    },
    {
      id: 'constraint',
      name: 'N-Queens (Constraint Satisfaction)',
      description: 'Place queens row by row, validate constraints.',
      java: `public List<List<String>> solveNQueens(int n) {
    List<List<String>> result = new ArrayList<>();
    char[][] board = new char[n][n];
    for (char[] row : board) Arrays.fill(row, '.');
    
    backtrack(board, 0, result);
    return result;
}

private void backtrack(char[][] board, int row, List<List<String>> result) {
    if (row == board.length) {
        result.add(construct(board));
        return;
    }
    
    for (int col = 0; col < board.length; col++) {
        if (isValid(board, row, col)) {
            board[row][col] = 'Q';
            backtrack(board, row + 1, result);
            board[row][col] = '.';
        }
    }
}

private boolean isValid(char[][] board, int row, int col) {
    // Check column
    for (int i = 0; i < row; i++) {
        if (board[i][col] == 'Q') return false;
    }
    // Check upper-left diagonal
    for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {
        if (board[i][j] == 'Q') return false;
    }
    // Check upper-right diagonal
    for (int i = row - 1, j = col + 1; i >= 0 && j < board.length; i--, j++) {
        if (board[i][j] == 'Q') return false;
    }
    return true;
}`,
      python: `def solve_n_queens(n: int) -> List[List[str]]:
    result = []
    board = [['.' for _ in range(n)] for _ in range(n)]
    
    def is_valid(row, col):
        # Check column
        for i in range(row):
            if board[i][col] == 'Q':
                return False
        # Check upper-left diagonal
        i, j = row - 1, col - 1
        while i >= 0 and j >= 0:
            if board[i][j] == 'Q':
                return False
            i, j = i - 1, j - 1
        # Check upper-right diagonal
        i, j = row - 1, col + 1
        while i >= 0 and j < n:
            if board[i][j] == 'Q':
                return False
            i, j = i - 1, j + 1
        return True
    
    def backtrack(row):
        if row == n:
            result.append([''.join(r) for r in board])
            return
        
        for col in range(n):
            if is_valid(row, col):
                board[row][col] = 'Q'
                backtrack(row + 1)
                board[row][col] = '.'
    
    backtrack(0)
    return result`,
      timeComplexity: 'O(n!)',
      spaceComplexity: 'O(n²)',
      testCase: {
        input: 'n = 4',
        output: '[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]',
        explanation: 'Two valid placements for 4 queens'
      }
    }
  ],

  problems: [
    { name: 'Subsets', difficulty: 'Medium', tags: ['subsets'] },
    { name: 'Subsets II', difficulty: 'Medium', tags: ['subsets', 'duplicates'] },
    { name: 'Permutations', difficulty: 'Medium', tags: ['permutations'] },
    { name: 'Permutations II', difficulty: 'Medium', tags: ['permutations', 'duplicates'] },
    { name: 'Combinations', difficulty: 'Medium', tags: ['combinations', 'k elements'] },
    { name: 'Combination Sum', difficulty: 'Medium', tags: ['combinations', 'reuse'] },
    { name: 'Combination Sum II', difficulty: 'Medium', tags: ['combinations', 'no reuse'] },
    { name: 'Combination Sum III', difficulty: 'Medium', tags: ['combinations', 'fixed k'] },
    { name: 'Letter Combinations of a Phone Number', difficulty: 'Medium', tags: ['string', 'mapping'] },
    { name: 'Palindrome Partitioning', difficulty: 'Medium', tags: ['string', 'partition'] },
    { name: 'Palindrome Permutation II', difficulty: 'Medium', tags: ['palindrome', 'permutation'] },
    { name: 'Generate Parentheses', difficulty: 'Medium', tags: ['balanced', 'string'] },
    { name: 'Permutation Sequence', difficulty: 'Hard', tags: ['kth permutation', 'math'] },
    { name: 'Beautiful Arrangement', difficulty: 'Medium', tags: ['permutation', 'constraint'] },
    { name: 'The k-th Lexicographical String of All Happy Strings of Length n', difficulty: 'Medium', tags: ['string', 'constraint'] },
    { name: 'N-Queens', difficulty: 'Hard', tags: ['constraint'] },
    { name: 'N-Queens II', difficulty: 'Hard', tags: ['constraint', 'count'] },
    { name: 'Sudoku Solver', difficulty: 'Hard', tags: ['constraint'] },
    { name: 'Word Search', difficulty: 'Medium', tags: ['grid', 'path'] },
    { name: 'Word Search II', difficulty: 'Hard', tags: ['grid', 'trie'] }
  ],

  mistakes: [
    {
      trap: 'Forgetting to backtrack (undo the choice)',
      fix: 'Always add curr.pop() or used[i] = false after recursive call. Pattern: choose → explore → unchoose.'
    },
    {
      trap: 'Adding reference instead of copy to result',
      fix: 'Use new ArrayList<>(curr) or curr[:] in Python to add a copy. Reference will change later!'
    },
    {
      trap: 'Wrong start index causing duplicates',
      fix: 'For subsets/combinations, pass i+1. For reusable elements (Combination Sum), pass i. For permutations, start from 0 each time.'
    },
    {
      trap: 'Not sorting before skipping duplicates',
      fix: 'For Subsets II or Permutations II, MUST sort first: Arrays.sort(nums). Then check: if i > start && nums[i] == nums[i-1], continue.'
    },
    {
      trap: 'Wrong duplicate check in permutations',
      fix: 'Skip if i > 0 && nums[i] == nums[i-1] && !used[i-1]. The !used[i-1] is crucial - skip if previous duplicate not used.'
    },
    {
      trap: 'Modifying StringBuilder/String without backtracking',
      fix: 'For strings, use sb.deleteCharAt(sb.length()-1) or just pass new string curr + c instead of modifying.'
    }
  ],

  variations: [
    {
      name: 'General Backtracking Pattern',
      description: 'Three steps: 1) Choose (add to path), 2) Explore (recurse), 3) Unchoose (backtrack). Define base case and choices at each level.'
    },
    {
      name: 'Skip Duplicates in Combinations',
      description: 'Sort first. Skip if i > start && nums[i] == nums[i-1]. This ensures each duplicate only used once per level.'
    },
    {
      name: 'Skip Duplicates in Permutations',
      description: 'Sort first. Skip if i > 0 && nums[i] == nums[i-1] && !used[i-1]. Only use duplicate if previous occurrence already used.'
    },
    {
      name: 'Pruning for Optimization',
      description: 'Sort array descending + early return when target < 0 or target < nums[i]. Dramatically reduces search space.'
    },
    {
      name: 'Swap Method for Permutations',
      description: 'Alternative: swap elements instead of using visited array. Swap nums[start] with nums[i], recurse, swap back.'
    }
  ]
};

