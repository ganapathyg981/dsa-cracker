export const heaps = {
  id: 'heaps',
  title: 'Heaps',
  icon: '⛰️',
  difficulty: 'Medium',
  
  theory: {
    overview: `Heaps (Priority Queues) efficiently maintain min or max element. Operations: insert O(log n), extract-min/max O(log n), peek O(1).

Key pattern: For "K largest" use min-heap of size K. For "K smallest" use max-heap of size K. This keeps only the K elements we care about.

Two heaps pattern maintains median by splitting data into smaller half (max-heap) and larger half (min-heap).`,
    
    keyInsight: 'K largest? Use MIN heap size K (smallest of the large ones floats to top). Two heaps = running median.',
    
    whenToUse: [
      'Find K largest/smallest elements',
      'Maintain running median',
      'Merge K sorted lists',
      'Task scheduling with priorities',
      'Dijkstra\'s algorithm'
    ],
    
    complexity: {
      time: 'O(log n) insert/extract, O(1) peek',
      space: 'O(n) or O(k) for top-k'
    }
  },

  decisionTree: {
    question: "What heap operation do you need?",
    options: [
      { label: "Top K largest/smallest", result: "top-k" },
      { label: "Running median", result: "two-heaps" },
      { label: "Merge K sorted lists", result: "merge-k" }
    ]
  },

  templates: [
    {
      id: 'top-k',
      name: 'Top K Elements',
      description: 'K largest: min-heap size K. K smallest: max-heap size K.',
      java: `// Kth Largest Element
public int findKthLargest(int[] nums, int k) {
    PriorityQueue<Integer> minHeap = new PriorityQueue<>();
    
    for (int num : nums) {
        minHeap.offer(num);
        if (minHeap.size() > k) {
            minHeap.poll();  // Remove smallest
        }
    }
    
    return minHeap.peek();  // Kth largest
}

// Top K Frequent Elements
public int[] topKFrequent(int[] nums, int k) {
    Map<Integer, Integer> freq = new HashMap<>();
    for (int num : nums) freq.put(num, freq.getOrDefault(num, 0) + 1);
    
    PriorityQueue<Integer> minHeap = new PriorityQueue<>(
        (a, b) -> freq.get(a) - freq.get(b)
    );
    
    for (int num : freq.keySet()) {
        minHeap.offer(num);
        if (minHeap.size() > k) minHeap.poll();
    }
    
    int[] result = new int[k];
    for (int i = 0; i < k; i++) result[i] = minHeap.poll();
    return result;
}`,
      python: `# Kth Largest Element
def find_kth_largest(nums: List[int], k: int) -> int:
    import heapq
    
    min_heap = []
    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)  # Remove smallest
    
    return min_heap[0]  # Kth largest

# Top K Frequent Elements
def top_k_frequent(nums: List[int], k: int) -> List[int]:
    from collections import Counter
    import heapq
    
    freq = Counter(nums)
    return heapq.nlargest(k, freq.keys(), key=freq.get)`,
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      testCase: {
        input: 'nums = [3,2,1,5,6,4], k = 2',
        output: '5',
        explanation: '2nd largest element is 5'
      }
    },
    {
      id: 'two-heaps',
      name: 'Two Heaps (Running Median)',
      description: 'Max-heap for smaller half, min-heap for larger half.',
      java: `class MedianFinder {
    PriorityQueue<Integer> maxHeap; // smaller half
    PriorityQueue<Integer> minHeap; // larger half
    
    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder());
        minHeap = new PriorityQueue<>();
    }
    
    public void addNum(int num) {
        maxHeap.offer(num);
        minHeap.offer(maxHeap.poll());
        
        if (maxHeap.size() < minHeap.size()) {
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
        if (maxHeap.size() > minHeap.size()) {
            return maxHeap.peek();
        }
        return (maxHeap.peek() + minHeap.peek()) / 2.0;
    }
}`,
      python: `class MedianFinder:
    def __init__(self):
        import heapq
        self.max_heap = []  # smaller half (negated)
        self.min_heap = []  # larger half
    
    def add_num(self, num: int) -> None:
        import heapq
        heapq.heappush(self.max_heap, -num)
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        
        if len(self.max_heap) < len(self.min_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))
    
    def find_median(self) -> float:
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        return (-self.max_heap[0] + self.min_heap[0]) / 2`,
      timeComplexity: 'O(log n) add, O(1) median',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'addNum(1), addNum(2), findMedian(), addNum(3), findMedian()',
        output: '1.5, 2.0',
        explanation: 'Median of [1,2] is 1.5, median of [1,2,3] is 2'
      }
    },
    {
      id: 'merge-k',
      name: 'Merge K Sorted Lists',
      description: 'Min-heap with one element from each list.',
      java: `public ListNode mergeKLists(ListNode[] lists) {
    PriorityQueue<ListNode> heap = new PriorityQueue<>(
        (a, b) -> a.val - b.val
    );
    
    for (ListNode list : lists) {
        if (list != null) heap.offer(list);
    }
    
    ListNode dummy = new ListNode(0);
    ListNode curr = dummy;
    
    while (!heap.isEmpty()) {
        ListNode node = heap.poll();
        curr.next = node;
        curr = curr.next;
        
        if (node.next != null) {
            heap.offer(node.next);
        }
    }
    
    return dummy.next;
}`,
      python: `def merge_k_lists(lists: List[ListNode]) -> ListNode:
    import heapq
    
    heap = []
    for i, node in enumerate(lists):
        if node:
            heapq.heappush(heap, (node.val, i, node))
    
    dummy = ListNode(0)
    curr = dummy
    
    while heap:
        val, i, node = heapq.heappop(heap)
        curr.next = node
        curr = curr.next
        
        if node.next:
            heapq.heappush(heap, (node.next.val, i, node.next))
    
    return dummy.next`,
      timeComplexity: 'O(n log k)',
      spaceComplexity: 'O(k)',
      testCase: {
        input: 'lists = [[1,4,5],[1,3,4],[2,6]]',
        output: '[1,1,2,3,4,4,5,6]',
        explanation: 'Merged all sorted lists'
      }
    }
  ],

  problems: [
    { name: 'Kth Largest Element in Array', difficulty: 'Medium', tags: ['top-k'] },
    { name: 'Top K Frequent Elements', difficulty: 'Medium', tags: ['frequency', 'top-k'] },
    { name: 'Find Median from Data Stream', difficulty: 'Hard', tags: ['two heaps'] },
    { name: 'Merge K Sorted Lists', difficulty: 'Hard', tags: ['merge'] },
    { name: 'K Closest Points to Origin', difficulty: 'Medium', tags: ['top-k', 'distance'] },
    { name: 'Task Scheduler', difficulty: 'Medium', tags: ['scheduling'] },
    { name: 'Reorganize String', difficulty: 'Medium', tags: ['frequency'] }
  ],

  mistakes: [
    {
      trap: 'Using max-heap for K largest (should use min-heap)',
      fix: 'Min-heap kicks out smallest, leaving K largest. Max-heap would keep K smallest.'
    },
    {
      trap: 'Python heapq is min-heap only',
      fix: 'For max-heap in Python, negate values: heappush(heap, -val)'
    },
    {
      trap: 'Comparing custom objects without comparator',
      fix: 'Provide Comparator in Java, or tuple (priority, tiebreaker, object) in Python.'
    }
  ],

  variations: [
    {
      name: 'QuickSelect',
      description: 'O(n) average for Kth element. Use when you only need the answer, not all K.'
    },
    {
      name: 'Bucket Sort for Top-K Frequent',
      description: 'O(n) using buckets indexed by frequency. Works when max frequency is bounded.'
    }
  ]
};

