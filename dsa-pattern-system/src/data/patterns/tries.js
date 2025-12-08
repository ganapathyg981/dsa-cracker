export const tries = {
  id: 'tries',
  title: 'Tries',
  icon: '🌲',
  difficulty: 'Medium',

  // 🌟 BEGINNER-FRIENDLY INTRODUCTION
  introduction: {
    realWorldAnalogy: `Think of a phone's autocomplete 📱:

As you type "hel", it suggests:
- hello
- help  
- helicopter

How does it instantly find all words starting with "hel"? It uses a **Trie**!

Each letter you type moves down a branch of the tree. All words sharing that prefix are in the same subtree. O(L) lookup regardless of dictionary size!`,

    simpleExplanation: `A Trie (prefix tree) stores strings character by character. Each node represents a character, and paths from root represent words/prefixes.

**Structure:**
\`\`\`
        root
       /    \\
      h      b
     /        \\
    e          a
   / \\          \\
  l   y          t
 / \\
l   p
o   
\`\`\`
Words: "hello", "help", "hey", "bat"

**Key operations:**
• **Insert**: Walk/create path for each character
• **Search**: Walk path, check isEnd flag
• **StartsWith**: Walk path, return if path exists`,

    visualSteps: [
      { step: 1, title: 'Create Node Class', description: 'Each node has children and isEnd flag', visual: 'TrieNode: children[26], isEnd=false' },
      { step: 2, title: 'Insert Word', description: 'Walk/create path for each character', visual: 'for char in word: node = node.children[char]' },
      { step: 3, title: 'Mark Word End', description: 'Set isEnd=true at last character', visual: 'node.isEnd = true' },
      { step: 4, title: 'Search Exact', description: 'Walk path, return node.isEnd', visual: 'search("app") → walk a->p->p, return isEnd' },
      { step: 5, title: 'Search Prefix', description: 'Walk path, return if path exists', visual: 'startsWith("app") → path exists? true!' },
    ],

    keyTakeaway: '💡 Tries enable O(L) string operations regardless of dictionary size. Perfect for autocomplete and prefix matching!',
  },

  // 🎯 PATTERN RECOGNITION SIGNALS
  recognitionSignals: {
    keyPhrases: [
      'prefix',
      'autocomplete',
      'word dictionary',
      'starts with',
      'word search',
      'spell checker',
      'search suggestions',
    ],
    problemCharacteristics: [
      'Multiple words to store/search',
      'Prefix-based queries',
      'Need efficient string lookup',
      'Building autocomplete or spell checker',
    ],
    notSuitableWhen: [
      'Only need exact match (use HashSet)',
      'Single string search (use built-in methods)',
      'Space is very limited (Tries can use more memory)',
    ],
  },

  // 🔗 RELATED PATTERNS
  relatedPatterns: [
    { id: 'bfs-dfs', relationship: 'Trie + DFS for Word Search II (grid word search)' },
    { id: 'trees', relationship: 'Trie is a specialized tree structure' },
    { id: 'arrays-strings', relationship: 'Trie is an efficient string data structure' },
  ],
  
  theory: {
    overview: `A Trie (prefix tree) stores strings character by character. Each node represents a prefix, and paths from root represent words. This enables O(L) lookup where L is word length, regardless of dictionary size.

Perfect for prefix matching, autocomplete, and word validation. Each node has children (usually array[26] or HashMap) and an isEnd flag.

Space can be optimized with techniques like compressed tries, but basic implementation is usually sufficient for interviews.`,
    
    keyInsight: 'Path from root = prefix. isEnd marks complete words. O(L) operations independent of dictionary size.',
    
    whenToUse: [
      'Prefix matching / autocomplete',
      'Word dictionary with search/insert',
      'Word search in grid (combined with DFS)',
      'Finding words with common prefix',
      'Spell checker / word suggestions'
    ],
    
    complexity: {
      time: 'O(L) per operation (L = word length)',
      space: 'O(total characters in all words)'
    }
  },

  decisionTree: {
    question: "What Trie operation do you need?",
    options: [
      { label: "Basic Trie (insert/search/startsWith)", result: "basic-trie" },
      { label: "Word Search II (grid + Trie)", result: "word-search" }
    ]
  },

  templates: [
    {
      id: 'basic-trie',
      name: 'Basic Trie Implementation',
      description: 'Insert words, search exact match, check prefix.',
      java: `class TrieNode {
    TrieNode[] children = new TrieNode[26];
    boolean isEnd = false;
}

class Trie {
    private TrieNode root;
    
    public Trie() {
        root = new TrieNode();
    }
    
    public void insert(String word) {
        TrieNode node = root;
        for (char c : word.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) {
                node.children[idx] = new TrieNode();
            }
            node = node.children[idx];
        }
        node.isEnd = true;
    }
    
    public boolean search(String word) {
        TrieNode node = find(word);
        return node != null && node.isEnd;
    }
    
    public boolean startsWith(String prefix) {
        return find(prefix) != null;
    }
    
    private TrieNode find(String s) {
        TrieNode node = root;
        for (char c : s.toCharArray()) {
            int idx = c - 'a';
            if (node.children[idx] == null) return null;
            node = node.children[idx];
        }
        return node;
    }
}`,
      python: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word: str) -> None:
        node = self.root
        for c in word:
            if c not in node.children:
                node.children[c] = TrieNode()
            node = node.children[c]
        node.is_end = True
    
    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end
    
    def starts_with(self, prefix: str) -> bool:
        return self._find(prefix) is not None
    
    def _find(self, s: str) -> TrieNode:
        node = self.root
        for c in s:
            if c not in node.children:
                return None
            node = node.children[c]
        return node`,
      timeComplexity: 'O(L) per operation',
      spaceComplexity: 'O(total chars)',
      testCase: {
        input: 'insert("apple"), search("apple"), search("app"), startsWith("app")',
        output: 'true, false, true',
        explanation: '"apple" exists, "app" not complete word but valid prefix'
      }
    },
    {
      id: 'word-search',
      name: 'Word Search II (Trie + DFS)',
      description: 'Build Trie from words, DFS grid with Trie guidance.',
      java: `public List<String> findWords(char[][] board, String[] words) {
    TrieNode root = buildTrie(words);
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
    if (node.word != null) {
        result.add(node.word);
        node.word = null;  // Avoid duplicates
    }
    
    board[i][j] = '#';  // Mark visited
    dfs(board, i + 1, j, node, result);
    dfs(board, i - 1, j, node, result);
    dfs(board, i, j + 1, node, result);
    dfs(board, i, j - 1, node, result);
    board[i][j] = c;    // Restore
}`,
      python: `def find_words(board: List[List[str]], words: List[str]) -> List[str]:
    root = build_trie(words)
    result = []
    
    def dfs(i, j, node):
        if i < 0 or i >= len(board) or j < 0 or j >= len(board[0]):
            return
        
        c = board[i][j]
        if c == '#' or c not in node.children:
            return
        
        node = node.children[c]
        if node.word:
            result.append(node.word)
            node.word = None  # Avoid duplicates
        
        board[i][j] = '#'  # Mark visited
        for di, dj in [(0,1),(1,0),(0,-1),(-1,0)]:
            dfs(i + di, j + dj, node)
        board[i][j] = c    # Restore
    
    for i in range(len(board)):
        for j in range(len(board[0])):
            dfs(i, j, root)
    
    return result`,
      timeComplexity: 'O(m*n*4^L)',
      spaceComplexity: 'O(total word chars)',
      testCase: {
        input: 'board = [["o","a","a","n"],["e","t","a","e"]], words = ["oath","eat"]',
        output: '["oath","eat"]',
        explanation: 'Both words can be formed in the grid'
      }
    }
  ],

  problems: [
    { name: 'Implement Trie (Prefix Tree)', difficulty: 'Medium', tags: ['basic'] },
    { name: 'Word Search II', difficulty: 'Hard', tags: ['trie + dfs'] },
    { name: 'Design Add and Search Words', difficulty: 'Medium', tags: ['wildcard'] },
    { name: 'Replace Words', difficulty: 'Medium', tags: ['prefix'] },
    { name: 'Maximum XOR of Two Numbers', difficulty: 'Medium', tags: ['bit trie'] }
  ],

  mistakes: [
    {
      trap: 'Forgetting isEnd flag (treating all prefixes as valid words)',
      fix: 'Always check node.isEnd for exact word match. startsWith doesn\'t need it.'
    },
    {
      trap: 'Memory overhead with array[26] for sparse tries',
      fix: 'Use HashMap for children if alphabet is large or sparse.'
    },
    {
      trap: 'Not marking found words to avoid duplicates in Word Search II',
      fix: 'Set node.word = null after finding to avoid adding same word twice.'
    }
  ],

  variations: [
    {
      name: 'Bit Trie',
      description: 'Store integers bit by bit. Used for Maximum XOR problems.'
    },
    {
      name: 'Compressed Trie (Radix Tree)',
      description: 'Merge single-child chains. Better space efficiency.'
    }
  ]
};

