export const intervals = {
  id: 'intervals',
  title: 'Intervals',
  icon: '📊',
  difficulty: 'Medium',
  
  theory: {
    overview: `Interval problems involve ranges defined by [start, end] pairs. The key insight is that sorting intervals (usually by start time) reveals overlapping structure. After sorting, you only need to check adjacent intervals for overlaps.

Two intervals [a, b] and [c, d] overlap if: a <= d AND c <= b. Or simpler: they DON'T overlap if b < c OR d < a.

Common patterns: merge overlapping intervals, find minimum meeting rooms (max concurrent intervals), insert interval, or remove minimum intervals to eliminate overlaps.`,
    
    keyInsight: 'Sort by start time, then process sequentially. Overlapping intervals have: current.start <= previous.end',
    
    whenToUse: [
      'Merging overlapping time ranges',
      'Finding minimum resources for concurrent events',
      'Checking if schedule has conflicts',
      'Inserting new interval into sorted list',
      'Finding free time slots'
    ],
    
    complexity: {
      time: 'O(n log n) due to sorting',
      space: 'O(n) for result or O(log n) for sorting'
    }
  },

  decisionTree: {
    question: "What do you need to do with intervals?",
    options: [
      { label: "Merge overlapping intervals", result: "merge-intervals" },
      { label: "Find minimum meeting rooms (max overlap)", result: "meeting-rooms" },
      { label: "Check if can attend all (any overlap?)", result: "check-overlap" },
      { label: "Insert new interval into sorted list", result: "insert-interval" },
      { label: "Remove minimum to eliminate overlap", result: "non-overlapping" }
    ]
  },

  templates: [
    {
      id: 'merge-intervals',
      name: 'Merge Overlapping Intervals',
      description: 'Sort by start, merge if current overlaps with last merged.',
      java: `public int[][] merge(int[][] intervals) {
    if (intervals.length <= 1) return intervals;
    
    // Sort by start time
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    
    List<int[]> merged = new ArrayList<>();
    int[] current = intervals[0];
    
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] <= current[1]) {
            // Overlapping - extend end
            current[1] = Math.max(current[1], intervals[i][1]);
        } else {
            // Not overlapping - add current and start new
            merged.add(current);
            current = intervals[i];
        }
    }
    merged.add(current);
    
    return merged.toArray(new int[merged.size()][]);
}`,
      python: `def merge(intervals: List[List[int]]) -> List[List[int]]:
    if len(intervals) <= 1:
        return intervals
    
    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    
    merged = [intervals[0]]
    
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            # Overlapping - extend end
            merged[-1][1] = max(merged[-1][1], end)
        else:
            # Not overlapping - add new interval
            merged.append([start, end])
    
    return merged`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'intervals = [[1,3],[2,6],[8,10],[15,18]]',
        output: '[[1,6],[8,10],[15,18]]',
        explanation: '[1,3] and [2,6] merge into [1,6]'
      }
    },
    {
      id: 'meeting-rooms',
      name: 'Meeting Rooms II (Min Rooms = Max Concurrent)',
      description: 'Use min heap to track end times of ongoing meetings.',
      java: `public int minMeetingRooms(int[][] intervals) {
    if (intervals.length == 0) return 0;
    
    // Sort by start time
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    
    // Min heap of end times
    PriorityQueue<Integer> heap = new PriorityQueue<>();
    
    for (int[] interval : intervals) {
        // If earliest ending meeting ends before this one starts
        if (!heap.isEmpty() && heap.peek() <= interval[0]) {
            heap.poll();  // Reuse that room
        }
        heap.offer(interval[1]);  // Add this meeting's end time
    }
    
    return heap.size();  // Number of rooms needed
}`,
      python: `def min_meeting_rooms(intervals: List[List[int]]) -> int:
    if not intervals:
        return 0
    
    import heapq
    
    # Sort by start time
    intervals.sort(key=lambda x: x[0])
    
    # Min heap of end times
    heap = []
    
    for start, end in intervals:
        # If earliest ending meeting ends before this one starts
        if heap and heap[0] <= start:
            heapq.heappop(heap)  # Reuse that room
        heapq.heappush(heap, end)  # Add this meeting's end time
    
    return len(heap)  # Number of rooms needed`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'intervals = [[0,30],[5,10],[15,20]]',
        output: '2',
        explanation: '[0,30] overlaps with both others, need 2 rooms'
      }
    },
    {
      id: 'check-overlap',
      name: 'Meeting Rooms I (Check Any Overlap)',
      description: 'Sort and check if any consecutive intervals overlap.',
      java: `public boolean canAttendMeetings(int[][] intervals) {
    if (intervals.length <= 1) return true;
    
    Arrays.sort(intervals, (a, b) -> a[0] - b[0]);
    
    for (int i = 1; i < intervals.length; i++) {
        // If start time is before previous end time
        if (intervals[i][0] < intervals[i-1][1]) {
            return false;  // Overlap found
        }
    }
    
    return true;
}`,
      python: `def can_attend_meetings(intervals: List[List[int]]) -> bool:
    if len(intervals) <= 1:
        return True
    
    intervals.sort(key=lambda x: x[0])
    
    for i in range(1, len(intervals)):
        # If start time is before previous end time
        if intervals[i][0] < intervals[i-1][1]:
            return False  # Overlap found
    
    return True`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1) or O(n) for sort',
      testCase: {
        input: 'intervals = [[0,30],[5,10],[15,20]]',
        output: 'false',
        explanation: '[0,30] overlaps with [5,10]'
      }
    },
    {
      id: 'insert-interval',
      name: 'Insert Interval',
      description: 'Add intervals before, merge with overlapping, add intervals after.',
      java: `public int[][] insert(int[][] intervals, int[] newInterval) {
    List<int[]> result = new ArrayList<>();
    int i = 0;
    int n = intervals.length;
    
    // Add all intervals ending before newInterval starts
    while (i < n && intervals[i][1] < newInterval[0]) {
        result.add(intervals[i]);
        i++;
    }
    
    // Merge all overlapping intervals
    while (i < n && intervals[i][0] <= newInterval[1]) {
        newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
        newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
        i++;
    }
    result.add(newInterval);
    
    // Add remaining intervals
    while (i < n) {
        result.add(intervals[i]);
        i++;
    }
    
    return result.toArray(new int[result.size()][]);
}`,
      python: `def insert(intervals: List[List[int]], new_interval: List[int]) -> List[List[int]]:
    result = []
    i = 0
    n = len(intervals)
    
    # Add all intervals ending before new_interval starts
    while i < n and intervals[i][1] < new_interval[0]:
        result.append(intervals[i])
        i += 1
    
    # Merge all overlapping intervals
    while i < n and intervals[i][0] <= new_interval[1]:
        new_interval[0] = min(new_interval[0], intervals[i][0])
        new_interval[1] = max(new_interval[1], intervals[i][1])
        i += 1
    result.append(new_interval)
    
    # Add remaining intervals
    while i < n:
        result.append(intervals[i])
        i += 1
    
    return result`,
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      testCase: {
        input: 'intervals = [[1,3],[6,9]], newInterval = [2,5]',
        output: '[[1,5],[6,9]]',
        explanation: '[1,3] and [2,5] merge into [1,5]'
      }
    },
    {
      id: 'non-overlapping',
      name: 'Non-overlapping Intervals (Remove Minimum)',
      description: 'Greedy: sort by end time, always keep interval that ends earliest.',
      java: `public int eraseOverlapIntervals(int[][] intervals) {
    if (intervals.length <= 1) return 0;
    
    // Sort by END time (greedy - keep earliest ending)
    Arrays.sort(intervals, (a, b) -> a[1] - b[1]);
    
    int count = 0;
    int lastEnd = intervals[0][1];
    
    for (int i = 1; i < intervals.length; i++) {
        if (intervals[i][0] < lastEnd) {
            // Overlap - remove this one (keep the one ending earlier)
            count++;
        } else {
            // No overlap - update lastEnd
            lastEnd = intervals[i][1];
        }
    }
    
    return count;
}`,
      python: `def erase_overlap_intervals(intervals: List[List[int]]) -> int:
    if len(intervals) <= 1:
        return 0
    
    # Sort by END time (greedy - keep earliest ending)
    intervals.sort(key=lambda x: x[1])
    
    count = 0
    last_end = intervals[0][1]
    
    for start, end in intervals[1:]:
        if start < last_end:
            # Overlap - remove this one
            count += 1
        else:
            # No overlap - update last_end
            last_end = end
    
    return count`,
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(1) or O(n) for sort',
      testCase: {
        input: 'intervals = [[1,2],[2,3],[3,4],[1,3]]',
        output: '1',
        explanation: 'Remove [1,3] to make all non-overlapping'
      }
    }
  ],

  problems: [
    { name: 'Merge Intervals', difficulty: 'Medium', tags: ['merge'] },
    { name: 'Insert Interval', difficulty: 'Medium', tags: ['insert'] },
    { name: 'Meeting Rooms', difficulty: 'Easy', tags: ['overlap check'] },
    { name: 'Meeting Rooms II', difficulty: 'Medium', tags: ['min heap', 'concurrent'] },
    { name: 'Non-overlapping Intervals', difficulty: 'Medium', tags: ['greedy', 'remove minimum'] },
    { name: 'Minimum Number of Arrows to Burst Balloons', difficulty: 'Medium', tags: ['greedy', 'overlap'] },
    { name: 'Employee Free Time', difficulty: 'Hard', tags: ['merge', 'multi-list'] },
    { name: 'My Calendar I/II/III', difficulty: 'Medium-Hard', tags: ['overlap', 'booking'] }
  ],

  mistakes: [
    {
      trap: 'Sorting by start when should sort by end (or vice versa)',
      fix: 'For merging: sort by start. For "remove minimum overlaps": sort by end.'
    },
    {
      trap: 'Using < instead of <= when checking overlap',
      fix: '[1,5] and [5,10] do NOT overlap (they touch). Overlap requires start < end.'
    },
    {
      trap: 'Not handling edge case when new interval goes at beginning or end',
      fix: 'The 3-phase approach (before, merge, after) handles all cases cleanly.'
    },
    {
      trap: 'Modifying input array while iterating',
      fix: 'Build result in new list, or be careful with index management.'
    }
  ],

  variations: [
    {
      name: 'Sweep Line Algorithm',
      description: 'Track +1 at starts, -1 at ends. Running sum gives concurrent count at each point.'
    },
    {
      name: 'Interval Scheduling Maximization',
      description: 'Find maximum non-overlapping intervals (activity selection). Always pick earliest ending.'
    },
    {
      name: 'Calendar Booking',
      description: 'Use TreeMap or segment tree for dynamic interval insertion and overlap detection.'
    }
  ]
};

