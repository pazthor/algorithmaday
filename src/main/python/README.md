# Python Algorithm Translations

This directory contains Python translations of algorithms originally implemented in Scala from the Algorithm-a-day repository.

## Modules

### 1. `sorting.py` - Sorting Algorithms

Implementations of fundamental sorting algorithms.

#### Functions:
- **`naive_quicksort(lst, key=None)`**
  - Naive quicksort implementation
  - Time Complexity: O(n²) worst case, O(n log n) average case
  - Space Complexity: O(n)

- **`merge_sort(lst, key=None)`**
  - Merge sort implementation
  - Time Complexity: O(n log n)
  - Space Complexity: O(n)

#### Usage Example:
```python
from sorting import merge_sort, naive_quicksort

numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = merge_sort(numbers)
print(sorted_numbers)  # [11, 12, 22, 25, 34, 64, 90]

# Sort with custom key
tuples = [(1, 'b'), (2, 'a'), (1, 'a')]
sorted_tuples = merge_sort(tuples, key=lambda x: x[1])
print(sorted_tuples)  # [(1, 'a'), (2, 'a'), (1, 'b')]
```

---

### 2. `sequences.py` - Sequence Algorithms

Advanced sequence and string matching algorithms.

#### Functions:
- **`binary_search(vec, x, key=None, i=0, j=None)`**
  - Binary search in a sorted list
  - Time Complexity: O(log n)
  - Returns index if found, None otherwise

- **`binary_search_in_cycle(vec, x, key=None, i=0, j=None)`**
  - Binary search in a rotated sorted list
  - Time Complexity: O(log n)
  - Handles cyclically rotated arrays

- **`kmp_search(corpus, word)`**
  - Knuth-Morris-Pratt string matching algorithm
  - Time Complexity: O(n) where n = corpus length
  - Returns list of starting indices where pattern is found

- **`is_subsequence(s, ss)`**
  - Checks if ss is a subsequence of s
  - Time Complexity: O(n*m)

#### Usage Example:
```python
from sequences import binary_search, kmp_search

# Binary search
sorted_list = [1, 3, 5, 7, 9, 11, 13, 15]
index = binary_search(sorted_list, 7)
print(index)  # 3

# KMP pattern matching
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"
matches = kmp_search(list(text), list(pattern))
print(matches)  # [10] (starting position)
```

---

### 3. `numbers.py` - Number Theory Algorithms

Prime number generation and combinatorics.

#### Functions:
- **`primes_stream(limit=None)`**
  - Generator for prime numbers
  - Time Complexity: O(n²) for n primes
  - Yields primes indefinitely or up to limit

- **`get_first_n_primes(n)`**
  - Get first n prime numbers
  - Returns list of primes

- **`binomial_coefficient(n, k)`**
  - Calculate C(n, k) - "n choose k"
  - Time Complexity: O(n*k) with memoization
  - Returns number of ways to choose k items from n

- **`is_prime(n)`**
  - Check if a number is prime
  - Time Complexity: O(√n)

- **`sieve_of_eratosthenes(limit)`**
  - Generate all primes up to limit
  - Time Complexity: O(n log log n)
  - More efficient for generating many primes

#### Usage Example:
```python
from numbers import get_first_n_primes, binomial_coefficient, sieve_of_eratosthenes

# Get first 10 primes
primes = get_first_n_primes(10)
print(primes)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

# Calculate binomial coefficient
combinations = binomial_coefficient(5, 2)
print(combinations)  # 10

# Sieve of Eratosthenes
primes_up_to_30 = sieve_of_eratosthenes(30)
print(primes_up_to_30)  # [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

---

## Running Examples

Each module includes example usage in its `if __name__ == "__main__"` block. Run them directly:

```bash
python sorting.py
python sequences.py
python numbers.py
```

## Requirements

- Python 3.9+
- No external dependencies required (uses only standard library)

## Original Scala Implementations

These algorithms were translated from the Scala implementations in:
- `src/main/scala/org/pfcoperez/dailyalgorithm/Sorting.scala`
- `src/main/scala/org/pfcoperez/dailyalgorithm/Sequences.scala`
- `src/main/scala/org/pfcoperez/dailyalgorithm/Numbers.scala`

## Key Differences from Scala

1. **Type System**: Python uses dynamic typing with type hints, while Scala has static typing
2. **Immutability**: Scala emphasizes immutability; Python implementations use mutable lists for efficiency
3. **Recursion**: Both implementations use recursion, but Python has a recursion limit (default 1000)
4. **Functional Features**: Scala's advanced functional features (pattern matching, for-comprehensions) are adapted to Python idioms

## Testing

To test the implementations:

```python
# Test sorting
from sorting import merge_sort
assert merge_sort([3, 1, 4, 1, 5, 9, 2, 6]) == [1, 1, 2, 3, 4, 5, 6, 9]

# Test binary search
from sequences import binary_search
assert binary_search([1, 3, 5, 7, 9], 5) == 2

# Test primes
from numbers import is_prime
assert is_prime(17) == True
assert is_prime(18) == False
```
