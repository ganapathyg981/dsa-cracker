export const segmentTrees = {
  id: 'segment-trees',
  title: 'Segment Trees',
  icon: '🎄',
  difficulty: 'Hard',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION
  introduction: {
    realWorldAnalogy: `Imagine a sports tournament bracket 🏆:

• Leaf nodes = Individual players (original array values)
• Internal nodes = Match winners (aggregate of children)
• Root = Tournament champion (aggregate of entire array)

To find "best player in positions 3-7", you don't check all players. You look at pre-computed match results! 

**Segment Tree = Tournament bracket for range queries**`,

    simpleExplanation: `A Segment Tree is a binary tree where:
• **Leaves** = Original array elements
• **Internal nodes** = Aggregate (sum/min/max) of their range

**Why use it?**
| Operation | Prefix Sum | Segment Tree |
|-----------|------------|--------------|
| Build     | O(n)       | O(n)         |
| Query     | O(1)       | O(log n)     |
| Update    | O(n)       | O(log n)     |

Use Segment Tree when you need **both** efficient queries AND updates!

**Structure:**
\`\`\`
         [0-3]: 36 (sum)
        /            \\
   [0-1]: 11      [2-3]: 25
   /     \\        /      \\
[0]: 3  [1]: 8  [2]: 10  [3]: 15
\`\`\``,

    visualSteps: [
      { step: 1, title: 'Build Tree', description: 'Recursively build from leaves up', visual: 'tree[node] = tree[left] + tree[right]' },
      { step: 2, title: 'Query Range', description: 'Combine relevant segments', visual: 'If range fully covered: return node value' },
      { step: 3, title: 'Partial Overlap', description: 'Recursively query children', visual: 'return query(left) + query(right)' },
      { step: 4, title: 'Point Update', description: 'Update leaf, propagate up', visual: 'Update leaf, recalculate parents' },
      { step: 5, title: 'Lazy Propagation', description: 'For range updates (advanced)', visual: 'Delay updates until needed' },
    ],

    keyTakeaway: '💡 Segment Tree = O(log n) range queries + O(log n) updates. Use when prefix sum fails due to updates!',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'range sum query',
      'range minimum query',
      'update and query',
      'mutable range',
      'dynamic range queries',
    ],
    problemCharacteristics: [
      'Need range queries (sum, min, max)',
      'Array elements are updated',
      'Multiple queries and updates interleaved',
    ],
    segmentVsPrefixSum: [
      'Prefix Sum: O(1) query, O(n) update → static arrays',
      'Segment Tree: O(log n) both → dynamic arrays',
      'If no updates needed → use simpler Prefix Sum',
    ],
    notSuitableWhen: [
      'No updates (use Prefix Sum)',
      'Only need overall min/max (use simple variable)',
      'Competitive programming time constraints',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'prefix-sum', relationship: 'Prefix Sum is simpler for static arrays (no updates)' },
    { id: 'binary-search', relationship: 'Both use divide-and-conquer on ranges' },
    { id: 'trees', relationship: 'Segment Tree is a specialized binary tree' },
  ],
  
  theory: {
    overview: `Segment Trees enable O(log n) range queries AND updates. Unlike prefix sum (O(1) query but O(n) update), segment trees balance both operations.

Each node stores aggregate (sum, min, max) for a range. Root covers entire array, children split the range. Build in O(n), query/update in O(log n).

Use when you need both efficient range queries AND point/range updates. For static arrays, prefix sum is simpler.`,
    
    keyInsight: 'Each node = aggregate of a range. Query merges O(log n) nodes. Updates propagate up O(log n) levels.',
    
    whenToUse: [
      'Range sum/min/max with updates',
      'Count of elements in range',
      'Dynamic range queries',
      'When prefix sum fails due to updates',
      'Competitive programming'
    ],
    
    complexity: {
      time: 'O(n) build, O(log n) query/update',
      space: 'O(n)'
    }
  },

  decisionTree: {
    question: "What operation do you need?",
    options: [
      { label: "Range sum query with point updates", result: "sum-segment-tree" },
      { label: "Range minimum/maximum query", result: "min-max-segment-tree" }
    ]
  },

  templates: [
    {
      id: 'sum-segment-tree',
      name: 'Segment Tree for Range Sum',
      description: 'Point update, range sum query.',
      java: `class SegmentTree {
    private int[] tree;
    private int n;
    
    public SegmentTree(int[] nums) {
        n = nums.length;
        tree = new int[4 * n];
        build(nums, 0, 0, n - 1);
    }
    
    private void build(int[] nums, int node, int start, int end) {
        if (start == end) {
            tree[node] = nums[start];
        } else {
            int mid = (start + end) / 2;
            build(nums, 2*node+1, start, mid);
            build(nums, 2*node+2, mid+1, end);
            tree[node] = tree[2*node+1] + tree[2*node+2];
        }
    }
    
    public void update(int idx, int val) {
        update(0, 0, n - 1, idx, val);
    }
    
    private void update(int node, int start, int end, int idx, int val) {
        if (start == end) {
            tree[node] = val;
        } else {
            int mid = (start + end) / 2;
            if (idx <= mid) {
                update(2*node+1, start, mid, idx, val);
            } else {
                update(2*node+2, mid+1, end, idx, val);
            }
            tree[node] = tree[2*node+1] + tree[2*node+2];
        }
    }
    
    public int query(int L, int R) {
        return query(0, 0, n - 1, L, R);
    }
    
    private int query(int node, int start, int end, int L, int R) {
        if (R < start || end < L) return 0;  // Out of range
        if (L <= start && end <= R) return tree[node];  // Fully in range
        
        int mid = (start + end) / 2;
        return query(2*node+1, start, mid, L, R) + 
               query(2*node+2, mid+1, end, L, R);
    }
}`,
      python: `class SegmentTree:
    def __init__(self, nums: List[int]):
        self.n = len(nums)
        self.tree = [0] * (4 * self.n)
        self._build(nums, 0, 0, self.n - 1)
    
    def _build(self, nums, node, start, end):
        if start == end:
            self.tree[node] = nums[start]
        else:
            mid = (start + end) // 2
            self._build(nums, 2*node+1, start, mid)
            self._build(nums, 2*node+2, mid+1, end)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def update(self, idx: int, val: int) -> None:
        self._update(0, 0, self.n - 1, idx, val)
    
    def _update(self, node, start, end, idx, val):
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self._update(2*node+1, start, mid, idx, val)
            else:
                self._update(2*node+2, mid+1, end, idx, val)
            self.tree[node] = self.tree[2*node+1] + self.tree[2*node+2]
    
    def query(self, L: int, R: int) -> int:
        return self._query(0, 0, self.n - 1, L, R)
    
    def _query(self, node, start, end, L, R):
        if R < start or end < L:
            return 0  # Out of range
        if L <= start and end <= R:
            return self.tree[node]  # Fully in range
        
        mid = (start + end) // 2
        return (self._query(2*node+1, start, mid, L, R) + 
                self._query(2*node+2, mid+1, end, L, R))`,
      timeComplexity: 'O(log n) query/update',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [1,3,5], query(0,2), update(1,2), query(0,2)',
        output: '9, 8',
        explanation: 'Sum [0,2] = 9, after update sum = 1+2+5 = 8'
      }
    },
    {
      id: 'min-max-segment-tree',
      name: 'Range Minimum Query (RMQ)',
      description: 'Same structure, change merge operation to min/max.',
      java: `// Change the merge operation for min/max
private void build(int[] nums, int node, int start, int end) {
    if (start == end) {
        tree[node] = nums[start];
    } else {
        int mid = (start + end) / 2;
        build(nums, 2*node+1, start, mid);
        build(nums, 2*node+2, mid+1, end);
        tree[node] = Math.min(tree[2*node+1], tree[2*node+2]);  // Min
    }
}

private int query(int node, int start, int end, int L, int R) {
    if (R < start || end < L) return Integer.MAX_VALUE;  // Identity for min
    if (L <= start && end <= R) return tree[node];
    
    int mid = (start + end) / 2;
    return Math.min(
        query(2*node+1, start, mid, L, R),
        query(2*node+2, mid+1, end, L, R)
    );
}`,
      python: `# Change the merge operation for min/max
def _build(self, nums, node, start, end):
    if start == end:
        self.tree[node] = nums[start]
    else:
        mid = (start + end) // 2
        self._build(nums, 2*node+1, start, mid)
        self._build(nums, 2*node+2, mid+1, end)
        self.tree[node] = min(self.tree[2*node+1], self.tree[2*node+2])

def _query(self, node, start, end, L, R):
    if R < start or end < L:
        return float('inf')  # Identity for min
    if L <= start and end <= R:
        return self.tree[node]
    
    mid = (start + end) // 2
    return min(
        self._query(2*node+1, start, mid, L, R),
        self._query(2*node+2, mid+1, end, L, R)
    )`,
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'nums = [2,5,1,4,9,3], query(1,4)',
        output: '1',
        explanation: 'Minimum in range [1,4] is 1'
      }
    }
  ],

  problems: [
    { name: 'Range Sum Query - Mutable', difficulty: 'Medium', tags: ['segment tree', 'BIT'] },
    { name: 'Count of Smaller Numbers After Self', difficulty: 'Hard', tags: ['segment tree'] },
    { name: 'Range Module', difficulty: 'Hard', tags: ['segment tree', 'intervals'] },
    { name: 'Falling Squares', difficulty: 'Hard', tags: ['segment tree', 'coordinates'] }
  ],

  mistakes: [
    {
      trap: 'Wrong array size (need 4n not 2n)',
      fix: 'Segment tree can have up to 4n nodes due to tree structure. Allocate int[4*n].'
    },
    {
      trap: 'Wrong identity element in query',
      fix: 'For sum: return 0. For min: return INF. For max: return -INF.'
    },
    {
      trap: 'Confusing 0-indexed vs 1-indexed implementations',
      fix: 'Stick with one. 0-indexed: children are 2*i+1, 2*i+2. 1-indexed: 2*i, 2*i+1.'
    }
  ],

  variations: [
    {
      name: 'Binary Indexed Tree (Fenwick Tree)',
      description: 'Simpler, less code. Only supports prefix operations (not arbitrary range).'
    },
    {
      name: 'Lazy Propagation',
      description: 'For range updates (not just point updates). Defer updates until needed.'
    }
  ]
};

