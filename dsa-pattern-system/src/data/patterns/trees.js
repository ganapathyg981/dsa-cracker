export const trees = {
  id: 'trees',
  title: 'Trees',
  icon: '🌳',
  difficulty: 'Medium',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION
  introduction: {
    realWorldAnalogy: `Think of a family tree 👨‍👩‍👧‍👦:
    
• **Root**: The oldest ancestor at the top
• **Children**: Each person can have children below them
• **Leaves**: People with no children (youngest generation)
• **Height**: How many generations from root to the furthest leaf

In coding, we use trees for hierarchical data: file systems (folders contain files/folders), organization charts (CEO → managers → employees), and HTML (document → body → divs → elements).`,

    simpleExplanation: `Trees are hierarchical data structures. The most common type is the **Binary Tree** where each node has at most 2 children (left and right).

**Key Concepts:**
• **Root**: The topmost node (no parent)
• **Leaf**: A node with no children
• **Height**: Longest path from root to a leaf
• **BST (Binary Search Tree)**: Left < Root < Right

**The Secret to Tree Problems:**
Most tree problems follow this pattern:
1. Handle base case (node is null)
2. Process left subtree recursively
3. Process right subtree recursively  
4. Combine results

*"How would I solve this for a single node if I already knew the answer for its children?"*`,

    visualSteps: [
      { step: 1, title: 'Base Case', description: 'Always handle null first', visual: 'if (root == null) return default;' },
      { step: 2, title: 'Recurse on Children', description: 'Trust recursion to solve subproblems', visual: 'left = solve(root.left); right = solve(root.right);' },
      { step: 3, title: 'Combine Results', description: 'How do children results give parent answer?', visual: 'return 1 + max(left, right);  // height' },
      { step: 4, title: 'Choose Traversal', description: 'Pre (root first), In (root middle), Post (root last)', visual: '🌲 Which order processes your data correctly?' },
      { step: 5, title: 'BFS for Levels', description: 'Use Queue for level-by-level traversal', visual: 'Queue → process level by level' },
    ],

    keyTakeaway: '💡 Tree problems are recursive by nature. Ask: "If I knew the answer for left and right subtrees, how would I compute the answer for the current node?"',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'binary tree',
      'BST / binary search tree',
      'level order traversal',
      'height / depth',
      'lowest common ancestor',
      'validate BST',
      'serialize / deserialize',
      'path sum',
    ],
    traversalGuide: [
      { order: 'Preorder', when: 'Need to process root BEFORE children (copying, serialization)', pattern: 'Root → Left → Right' },
      { order: 'Inorder', when: 'Need sorted order from BST', pattern: 'Left → Root → Right' },
      { order: 'Postorder', when: 'Need children results BEFORE processing root (height, deletion)', pattern: 'Left → Right → Root' },
      { order: 'Level-order (BFS)', when: 'Process level by level, shortest path in tree', pattern: 'Queue-based' },
    ],
    problemTypes: [
      'Calculate something (height, diameter) → Postorder (need children first)',
      'Validate BST → Inorder (should be sorted) or pass range down',
      'Find path/sum → Preorder with accumulator',
      'Level-by-level operations → BFS with queue',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'bfs-dfs', relationship: 'BFS/DFS are the core traversal methods for trees' },
    { id: 'binary-search', relationship: 'BST operations use binary search principle' },
    { id: 'dynamic-programming', relationship: 'DP on trees: solve for children, combine at parent' },
  ],
  
  theory: {
    overview: `Trees are hierarchical data structures with a root node and subtrees. Binary trees have at most two children per node. BSTs (Binary Search Trees) maintain ordering: left subtree < root < right subtree.

Tree problems typically use recursion, leveraging the recursive structure of trees. Key insight: most tree problems can be solved by combining results from left and right subtrees.

Traversal orders determine processing sequence: Preorder (root first) for cloning/serialization, Inorder (left-root-right) for BST sorted access, Postorder (children first) for bottom-up calculations like height.`,
    
    keyInsight: 'Think recursively: combine results from left and right subtrees. Choose traversal order based on when you need to process root.',
    
    whenToUse: [
      'Hierarchical data with parent-child relationships',
      'BST for sorted data with O(log n) operations',
      'Inorder traversal for sorted sequence from BST',
      'Postorder for height/size calculations (need children first)',
      'Preorder for serialization/copying (need root first)'
    ],
    
    complexity: {
      time: 'O(n) for traversal, O(h) for BST operations',
      space: 'O(h) for recursion stack, O(n) for BFS queue'
    }
  },

  decisionTree: {
    question: "What type of tree operation?",
    options: [
      { label: "Traverse in specific order", result: "traversal" },
      { label: "Calculate height/depth/diameter", result: "height-calculation" },
      { label: "Validate BST properties", result: "validate-bst" },
      { label: "Find LCA (Lowest Common Ancestor)", result: "lca" },
      { label: "Construct tree from traversals", result: "construct-tree" }
    ]
  },

  templates: [
    {
      id: 'traversal',
      name: 'Tree Traversals (Pre/In/Post)',
      description: 'Three traversal orders for different use cases.',
      java: `// Preorder: Root -> Left -> Right (Cloning, Serialization)
void preorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    result.add(root.val);         // Process root FIRST
    preorder(root.left, result);
    preorder(root.right, result);
}

// Inorder: Left -> Root -> Right (BST gives sorted order)
void inorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    inorder(root.left, result);
    result.add(root.val);         // Process root in MIDDLE
    inorder(root.right, result);
}

// Postorder: Left -> Right -> Root (Height, Deletion)
void postorder(TreeNode root, List<Integer> result) {
    if (root == null) return;
    postorder(root.left, result);
    postorder(root.right, result);
    result.add(root.val);         // Process root LAST
}`,
      python: `# Preorder: Root -> Left -> Right (Cloning, Serialization)
def preorder(root, result):
    if not root:
        return
    result.append(root.val)       # Process root FIRST
    preorder(root.left, result)
    preorder(root.right, result)

# Inorder: Left -> Root -> Right (BST gives sorted order)
def inorder(root, result):
    if not root:
        return
    inorder(root.left, result)
    result.append(root.val)       # Process root in MIDDLE
    inorder(root.right, result)

# Postorder: Left -> Right -> Root (Height, Deletion)
def postorder(root, result):
    if not root:
        return
    postorder(root.left, result)
    postorder(root.right, result)
    result.append(root.val)       # Process root LAST`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h) recursion stack',
      testCase: {
        input: 'root = [1, 2, 3, 4, 5]',
        output: 'Pre: [1,2,4,5,3], In: [4,2,5,1,3], Post: [4,5,2,3,1]',
        explanation: 'Different orders based on when root is processed'
      }
    },
    {
      id: 'height-calculation',
      name: 'Height / Depth / Diameter',
      description: 'Postorder pattern - need children info before parent.',
      java: `// Maximum Depth
public int maxDepth(TreeNode root) {
    if (root == null) return 0;
    int leftDepth = maxDepth(root.left);
    int rightDepth = maxDepth(root.right);
    return 1 + Math.max(leftDepth, rightDepth);
}

// Diameter (longest path between any two nodes)
int diameter = 0;
public int diameterOfBinaryTree(TreeNode root) {
    depth(root);
    return diameter;
}

private int depth(TreeNode node) {
    if (node == null) return 0;
    int left = depth(node.left);
    int right = depth(node.right);
    diameter = Math.max(diameter, left + right);  // Update diameter
    return 1 + Math.max(left, right);             // Return depth
}`,
      python: `# Maximum Depth
def max_depth(root: TreeNode) -> int:
    if not root:
        return 0
    left_depth = max_depth(root.left)
    right_depth = max_depth(root.right)
    return 1 + max(left_depth, right_depth)

# Diameter (longest path between any two nodes)
class Solution:
    def diameter_of_binary_tree(self, root: TreeNode) -> int:
        self.diameter = 0
        
        def depth(node):
            if not node:
                return 0
            left = depth(node.left)
            right = depth(node.right)
            self.diameter = max(self.diameter, left + right)  # Update diameter
            return 1 + max(left, right)                       # Return depth
        
        depth(root)
        return self.diameter`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      testCase: {
        input: 'root = [1,2,3,4,5]',
        output: 'depth: 3, diameter: 3',
        explanation: 'Diameter path: 4-2-1-3 or 5-2-1-3'
      }
    },
    {
      id: 'validate-bst',
      name: 'Validate BST',
      description: 'Pass valid range down, or use inorder to check sorted order.',
      java: `// Method 1: Pass range down
public boolean isValidBST(TreeNode root) {
    return validate(root, Long.MIN_VALUE, Long.MAX_VALUE);
}

private boolean validate(TreeNode node, long min, long max) {
    if (node == null) return true;
    if (node.val <= min || node.val >= max) return false;
    
    return validate(node.left, min, node.val) && 
           validate(node.right, node.val, max);
}

// Method 2: Inorder should be strictly increasing
TreeNode prev = null;
public boolean isValidBSTInorder(TreeNode root) {
    if (root == null) return true;
    
    if (!isValidBSTInorder(root.left)) return false;
    
    if (prev != null && root.val <= prev.val) return false;
    prev = root;
    
    return isValidBSTInorder(root.right);
}`,
      python: `# Method 1: Pass range down
def is_valid_bst(root: TreeNode) -> bool:
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and 
                validate(node.right, node.val, max_val))
    
    return validate(root, float('-inf'), float('inf'))

# Method 2: Inorder should be strictly increasing
def is_valid_bst_inorder(root: TreeNode) -> bool:
    prev = [None]  # Use list to allow modification in nested function
    
    def inorder(node):
        if not node:
            return True
        if not inorder(node.left):
            return False
        if prev[0] is not None and node.val <= prev[0]:
            return False
        prev[0] = node.val
        return inorder(node.right)
    
    return inorder(root)`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(h)',
      testCase: {
        input: 'root = [5,1,4,null,null,3,6]',
        output: 'false',
        explanation: 'Node 4 is in right subtree of 5 but has value < 5'
      }
    },
    {
      id: 'lca',
      name: 'Lowest Common Ancestor',
      description: 'If p and q are in different subtrees, current node is LCA.',
      java: `// LCA of Binary Tree (general)
public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
    if (root == null || root == p || root == q) {
        return root;
    }
    
    TreeNode left = lowestCommonAncestor(root.left, p, q);
    TreeNode right = lowestCommonAncestor(root.right, p, q);
    
    if (left != null && right != null) {
        return root;  // p and q in different subtrees
    }
    
    return left != null ? left : right;
}

// LCA of BST (use BST property)
public TreeNode lcaBST(TreeNode root, TreeNode p, TreeNode q) {
    while (root != null) {
        if (p.val < root.val && q.val < root.val) {
            root = root.left;   // Both in left subtree
        } else if (p.val > root.val && q.val > root.val) {
            root = root.right;  // Both in right subtree
        } else {
            return root;        // Split point is LCA
        }
    }
    return null;
}`,
      python: `# LCA of Binary Tree (general)
def lowest_common_ancestor(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    if not root or root == p or root == q:
        return root
    
    left = lowest_common_ancestor(root.left, p, q)
    right = lowest_common_ancestor(root.right, p, q)
    
    if left and right:
        return root  # p and q in different subtrees
    
    return left if left else right

# LCA of BST (use BST property)
def lca_bst(root: TreeNode, p: TreeNode, q: TreeNode) -> TreeNode:
    while root:
        if p.val < root.val and q.val < root.val:
            root = root.left   # Both in left subtree
        elif p.val > root.val and q.val > root.val:
            root = root.right  # Both in right subtree
        else:
            return root        # Split point is LCA
    return None`,
      timeComplexity: 'O(n) general, O(h) BST',
      spaceComplexity: 'O(h)',
      testCase: {
        input: 'root = [3,5,1,6,2,0,8], p = 5, q = 1',
        output: '3',
        explanation: 'Node 3 is the lowest ancestor of both 5 and 1'
      }
    },
    {
      id: 'construct-tree',
      name: 'Construct Tree from Traversals',
      description: 'Use preorder for root, inorder to split left/right.',
      java: `public TreeNode buildTree(int[] preorder, int[] inorder) {
    Map<Integer, Integer> inorderMap = new HashMap<>();
    for (int i = 0; i < inorder.length; i++) {
        inorderMap.put(inorder[i], i);
    }
    return build(preorder, 0, preorder.length - 1, 
                 inorder, 0, inorder.length - 1, inorderMap);
}

private TreeNode build(int[] pre, int preStart, int preEnd,
                       int[] in, int inStart, int inEnd,
                       Map<Integer, Integer> map) {
    if (preStart > preEnd) return null;
    
    int rootVal = pre[preStart];
    TreeNode root = new TreeNode(rootVal);
    
    int rootIdx = map.get(rootVal);
    int leftSize = rootIdx - inStart;
    
    root.left = build(pre, preStart + 1, preStart + leftSize,
                      in, inStart, rootIdx - 1, map);
    root.right = build(pre, preStart + leftSize + 1, preEnd,
                       in, rootIdx + 1, inEnd, map);
    
    return root;
}`,
      python: `def build_tree(preorder: List[int], inorder: List[int]) -> TreeNode:
    inorder_map = {val: idx for idx, val in enumerate(inorder)}
    
    def build(pre_start, pre_end, in_start, in_end):
        if pre_start > pre_end:
            return None
        
        root_val = preorder[pre_start]
        root = TreeNode(root_val)
        
        root_idx = inorder_map[root_val]
        left_size = root_idx - in_start
        
        root.left = build(pre_start + 1, pre_start + left_size,
                         in_start, root_idx - 1)
        root.right = build(pre_start + left_size + 1, pre_end,
                          root_idx + 1, in_end)
        
        return root
    
    return build(0, len(preorder) - 1, 0, len(inorder) - 1)`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]',
        output: '[3,9,20,null,null,15,7]',
        explanation: 'Reconstructed tree from traversals'
      }
    }
  ],

  problems: [
    { name: 'Maximum Depth of Binary Tree', difficulty: 'Easy', tags: ['recursion', 'depth'] },
    { name: 'Invert Binary Tree', difficulty: 'Easy', tags: ['recursion', 'swap'] },
    { name: 'Same Tree', difficulty: 'Easy', tags: ['recursion', 'compare'] },
    { name: 'Binary Tree Level Order Traversal', difficulty: 'Medium', tags: ['BFS'] },
    { name: 'Validate Binary Search Tree', difficulty: 'Medium', tags: ['BST', 'range'] },
    { name: 'Lowest Common Ancestor', difficulty: 'Medium', tags: ['recursion', 'LCA'] },
    { name: 'Construct Binary Tree from Traversals', difficulty: 'Medium', tags: ['construction'] },
    { name: 'Diameter of Binary Tree', difficulty: 'Easy', tags: ['height', 'path'] },
    { name: 'Binary Tree Maximum Path Sum', difficulty: 'Hard', tags: ['path', 'recursion'] },
    { name: 'Serialize and Deserialize Binary Tree', difficulty: 'Hard', tags: ['serialization'] }
  ],

  mistakes: [
    {
      trap: 'Forgetting base case: if (root == null)',
      fix: 'Always handle null first. It\'s the natural termination of tree recursion.'
    },
    {
      trap: 'Confusing height vs depth (height is bottom-up, depth is top-down)',
      fix: 'Height: max distance to leaf. Depth: distance from root. They\'re complements.'
    },
    {
      trap: 'Using wrong traversal order for the problem',
      fix: 'Need root first? Preorder. Need children first? Postorder. Need sorted BST? Inorder.'
    },
    {
      trap: 'Not using Long.MIN/MAX for BST validation (Integer limits can be valid values)',
      fix: 'Use long or null to represent unbounded range in BST validation.'
    }
  ],

  variations: [
    {
      name: 'Morris Traversal',
      description: 'O(1) space traversal using threaded binary trees (temporarily modify tree).'
    },
    {
      name: 'Iterative Traversal with Stack',
      description: 'Convert recursion to iteration for better stack control.'
    },
    {
      name: 'N-ary Trees',
      description: 'Trees with more than 2 children. Similar patterns, loop over children array.'
    }
  ]
};

