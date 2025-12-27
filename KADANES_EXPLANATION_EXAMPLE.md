# Kadane's Algorithm - Enhanced Explanation Preview

## What You'll See in the Pattern System

---

### 🎯 Main Template Description

**Before (Old):**
> Track current sum and global max, reset when current goes negative.

**After (New):**
> At each position, decide: "Should I extend my current subarray or start fresh from here?"
> 
> **KEY INSIGHT:** If current_sum becomes negative, it will only HURT future subarrays, so abandon it and start over.
>
> ### WHY KADANE'S vs SLIDING WINDOW?
> 
> **WHEN TO USE KADANE'S:**
> ✓ Finding MAXIMUM/MINIMUM sum of ANY contiguous subarray (variable size)
> ✓ Array can contain NEGATIVE numbers
> ✓ Don't know the optimal window size in advance
> ✓ Need to track "best so far" across ALL possible windows
> 
> Example: `[-2, 1, -3, 4, -1, 2, 1, -5, 4]`
> → Best subarray: `[4, -1, 2, 1] = 6`
> 
> **WHEN TO USE SLIDING WINDOW:**
> ✓ FIXED window size (e.g., "max sum of exactly K elements")
> ✓ Specific constraints (e.g., "at most K distinct", "all unique")
> ✓ Array has only POSITIVE numbers and you know target sum
> ✓ Can incrementally update window state
> 
> Example: Find max sum of any 3 consecutive elements
> `[2, 1, 5, 1, 3, 2]` → `[5, 1, 3] = 9`
> 
> **CRITICAL DIFFERENCE:**
> - Kadane's: Window size changes dynamically, can "reset" and start fresh
> - Sliding Window: Window size is fixed or has specific constraints

---

### 📊 Visual Step-by-Step Trace

```
For array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]

Step-by-step execution:

i=0: nums=-2  → current_sum=-2,  max_sum=-2
     [start at -2]

i=1: nums=1   → current_sum=1,   max_sum=1
     [start fresh at 1, drop -2 because it's baggage]

i=2: nums=-3  → current_sum=-2,  max_sum=1
     [extend: 1 + (-3) = -2]

i=3: nums=4   → current_sum=4,   max_sum=4
     [start fresh at 4, drop -2] ← NEW SUBARRAY BEGINS

i=4: nums=-1  → current_sum=3,   max_sum=4
     [extend: 4 + (-1) = 3]

i=5: nums=2   → current_sum=5,   max_sum=5
     [extend: 3 + 2 = 5]

i=6: nums=1   → current_sum=6,   max_sum=6
     [extend: 5 + 1 = 6] ← MAXIMUM FOUND! ✨

i=7: nums=-5  → current_sum=1,   max_sum=6
     [extend: 6 + (-5) = 1]

i=8: nums=4   → current_sum=5,   max_sum=6
     [extend: 1 + 4 = 5]

FINAL ANSWER: 6
WINNING SUBARRAY: [4, -1, 2, 1] (indices 3 to 6)
```

---

### 💻 Code with Full Comments

**Python Implementation:**

```python
def max_sub_array(nums: List[int]) -> int:
    """
    Kadane's Algorithm: Find maximum sum contiguous subarray
    
    Intuition: At each position, decide whether to:
    1. Extend the current subarray (add current element)
    2. Start a new subarray from current element
    
    If current_sum is negative, it will hurt future sums, so reset!
    """
    if not nums:
        return 0
    
    max_sum = nums[0]      # Best sum found globally
    current_sum = nums[0]  # Sum of current subarray
    
    for i in range(1, len(nums)):
        # KEY DECISION: Should I add to current or start fresh?
        current_sum = max(nums[i], current_sum + nums[i])
        
        # Update global maximum
        max_sum = max(max_sum, current_sum)
    
    return max_sum
```

---

### 🎓 Understanding "Why Start Fresh?"

**Question:** Why do we drop the current_sum when it's negative?

**Answer with Example:**

```
Current situation:
- current_sum = -5
- next element = 3

Option 1: Extend current subarray
  result = -5 + 3 = -2  ❌ Bad!

Option 2: Start fresh from 3
  result = 3  ✅ Better!

Conclusion: If current_sum < 0, it's BAGGAGE. 
           It will only make future sums worse.
           Better to start fresh!
```

---

### 🔄 Variations Included

#### 1. Return Subarray Indices (not just sum)
```python
def max_sub_array_with_indices(nums: List[int]) -> tuple:
    """Return (start_idx, end_idx, max_sum)"""
    max_sum = nums[0]
    current_sum = nums[0]
    start = end = 0
    temp_start = 0
    
    for i in range(1, len(nums)):
        if nums[i] > current_sum + nums[i]:
            current_sum = nums[i]
            temp_start = i  # Potential new start
        else:
            current_sum = current_sum + nums[i]
        
        if current_sum > max_sum:
            max_sum = current_sum
            start = temp_start
            end = i
    
    return (start, end, max_sum)
```

#### 2. Maximum Circular Subarray
```python
def max_circular_subarray(nums: List[int]) -> int:
    """
    Two cases:
    1. Max subarray is in middle (regular Kadane's)
    2. Max subarray wraps around = total_sum - min_subarray
    """
    # Case 1: Regular maximum
    max_kadane = kadane(nums)
    
    # Case 2: Circular = total - minimum subarray
    total_sum = sum(nums)
    max_wrap = total_sum - kadane([-x for x in nums])
    
    # Edge: All negatives
    return max_kadane if max_wrap == 0 else max(max_kadane, max_wrap)
```

---

### 🚨 Common Mistakes & Fixes

#### Mistake 1: Using Sliding Window for max sum with negatives
```
❌ WRONG:
   "Find maximum subarray sum" → Use sliding window
   
✅ CORRECT:
   "Find maximum subarray sum" + array has negatives → Use Kadane's!
   
Why? Sliding window assumes monotonicity.
     With negatives, removing an element might INCREASE the sum!
     Example: [-5, 10, -3]
```

#### Mistake 2: Initializing to 0
```
❌ WRONG:
   max_sum = 0
   current_sum = 0
   
✅ CORRECT:
   max_sum = nums[0]
   current_sum = nums[0]
   
Why? What if all numbers are negative?
     Array: [-5, -2, -9, -1]
     Answer should be -1, not 0!
```

#### Mistake 3: Not understanding when Kadane's applies
```
❌ WRONG:
   "Find subarray with exact sum K" → Use Kadane's
   
✅ CORRECT:
   "Find subarray with exact sum K" → Use Prefix Sum + HashMap
   
Kadane's finds MAX/MIN, not exact values!
```

---

### 📋 Quick Decision Chart

```
┌──────────────────────────────────────────────────────────────┐
│                    SUBARRAY PROBLEM?                         │
└──────────────────────────────────────────────────────────────┘
                           │
                           ▼
        ┌──────────────────────────────────────┐
        │   What are you looking for?          │
        └──────────────────────────────────────┘
                │                    │                    │
                │                    │                    │
                ▼                    ▼                    ▼
        ┌─────────────┐      ┌──────────────┐    ┌─────────────┐
        │  MAX/MIN    │      │  EXACT sum K │    │ Fixed size K│
        │  sum        │      │              │    │             │
        └─────────────┘      └──────────────┘    └─────────────┘
                │                    │                    │
                ▼                    ▼                    ▼
        Has negatives?       Has negatives?       Always works!
           ↓                      ↓                      ↓
         YES: Kadane's        YES: Prefix Sum      Sliding Window
         NO: Sliding Window         + HashMap          (fixed)
             or Kadane's
```

---

### 🎯 Key Takeaways

1. **Kadane's = Dynamic window that can reset**
   - Optimal substructure: best ending here = max(extend, start fresh)
   - Works with negatives!

2. **Sliding Window = Fixed or constrained window**
   - Requires monotonic property
   - Best for: fixed K, at most K, all unique

3. **When in doubt:**
   - "Maximum/minimum sum" + negatives → **Kadane's**
   - "Exactly K elements" → **Sliding Window**
   - "Exact sum K" + negatives → **Prefix Sum + HashMap**

---

### 🔗 Related Problems Now Listed

- ✅ Maximum Subarray (LC 53) - Classic Kadane's
- ✅ Maximum Product Subarray (LC 152) - Track min & max
- ✅ Maximum Sum Circular Subarray (LC 918) - Kadane's variation
- ✅ Best Time to Buy/Sell Stock (LC 121) - Kadane's variation

---

## Result: Students Now Understand

✅ **WHAT** Kadane's Algorithm does  
✅ **WHY** it works (intuition)  
✅ **WHEN** to use it vs other patterns  
✅ **HOW** to implement it (with variations)  
✅ **Common mistakes** to avoid  

---

**Status:** Live in your DSA Pattern System! 🎉



