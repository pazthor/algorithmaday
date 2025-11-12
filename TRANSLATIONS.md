# Algorithm Translations: Scala → Python & TypeScript

This document describes the multi-language translations of algorithms from the original Scala implementations.

## Overview

The Algorithm-a-day repository originally contained algorithms implemented in Scala using functional programming paradigms. This PR adds Python and TypeScript translations of fundamental algorithms, making them accessible to a broader developer audience.

## Translation Scope

### Algorithms Translated

#### 1. **Sorting Algorithms** (`sorting.*`)
- Naive Quicksort - O(n²) worst case, O(n log n) average
- Merge Sort - O(n log n) guaranteed

#### 2. **Sequence Algorithms** (`sequences.*`)
- Binary Search - O(log n) on sorted arrays
- Cyclic Binary Search - O(log n) on rotated sorted arrays
- KMP String Matching - O(n) pattern matching
- Subsequence Check - O(n*m) validation

#### 3. **Number Theory** (`numbers.*`)
- Prime Number Generation - Stream-based approach
- Sieve of Eratosthenes - O(n log log n) prime generation
- Binomial Coefficients - O(n*k) with memoization
- Prime Testing - O(√n) primality check

## Directory Structure

```
src/main/
├── scala/               # Original Scala implementations
│   └── org/pfcoperez/dailyalgorithm/
│       ├── Sorting.scala
│       ├── Sequences.scala
│       └── Numbers.scala
│
├── python/              # NEW: Python translations
│   ├── README.md
│   ├── sorting.py
│   ├── sequences.py
│   └── numbers.py
│
└── typescript/          # NEW: TypeScript translations
    ├── README.md
    ├── sorting.ts
    ├── sequences.ts
    └── numbers.ts
```

## Language Comparison

| Feature | Scala | Python | TypeScript |
|---------|-------|--------|------------|
| **Type System** | Static, nominal | Dynamic, duck-typed | Static, structural |
| **Paradigm** | Functional-first | Multi-paradigm | Multi-paradigm |
| **Immutability** | Default | Optional | Optional |
| **Pattern Matching** | Native | Limited (match statement) | Limited (switch) |
| **Generics** | Advanced | Runtime (TypeVar) | Compile-time |
| **Performance** | Fast (JVM) | Moderate (CPython) | Fast (V8/Node) |

## Translation Philosophy

### Preserved Aspects
1. **Algorithm Logic** - Core algorithmic approach unchanged
2. **Complexity** - Same time and space complexity guarantees
3. **Functionality** - Equivalent input/output behavior
4. **Documentation** - Maintained complexity annotations and explanations

### Language-Specific Adaptations

#### Python
- Used **type hints** for clarity while maintaining Python's dynamic nature
- Employed **generators** for lazy evaluation (primes stream)
- Utilized **@lru_cache** decorator for memoization
- Followed **PEP 8** style guidelines
- Used **list comprehensions** for functional patterns

#### TypeScript
- Leveraged **generic types** (`<T>`) for type safety
- Used **Generator functions** for stream-like behavior
- Implemented **Map** for memoization caches
- Applied **strict null checks** (`number | null`)
- Followed **functional programming** patterns where appropriate

## Quick Start

### Python
```bash
cd src/main/python

# Run examples
python sorting.py
python sequences.py
python numbers.py

# Use in your code
from sorting import merge_sort
from sequences import kmp_search
from numbers import get_first_n_primes

numbers = [64, 34, 25, 12, 22, 11, 90]
sorted_numbers = merge_sort(numbers)
```

### TypeScript
```bash
cd src/main/typescript

# Install TypeScript if needed
npm install -g typescript ts-node

# Run examples
ts-node sorting.ts
ts-node sequences.ts
ts-node numbers.ts

# Or compile and run
tsc sorting.ts && node sorting.js
```

## Testing

### Python
```python
# sorting.py
assert merge_sort([3, 1, 4, 1, 5]) == [1, 1, 3, 4, 5]

# sequences.py
assert binary_search([1, 3, 5, 7, 9], 5) == 2
assert kmp_search("ABABCABAB", "ABAB") == [0, 5]

# numbers.py
assert is_prime(17) == True
assert binomial_coefficient(5, 2) == 10
```

### TypeScript
```typescript
// Use assertions or testing frameworks
console.assert(binarySearch([1, 3, 5, 7, 9], 5) === 2);
console.assert(isPrime(17) === true);
```

## Performance Notes

All implementations maintain the original algorithmic complexity:

| Algorithm | Complexity | Notes |
|-----------|-----------|-------|
| Merge Sort | O(n log n) | Stable, guaranteed performance |
| Binary Search | O(log n) | Requires sorted input |
| KMP Search | O(n + m) | Linear time pattern matching |
| Sieve of Eratosthenes | O(n log log n) | Most efficient for multiple primes |
| Binomial Coefficient | O(n*k) | With memoization |

## Future Enhancements

Potential additions for future PRs:
- Additional algorithms (graph algorithms, dynamic programming)
- Unit test suites (pytest, Jest)
- Performance benchmarks
- Additional languages (Rust, Go, Java)
- CI/CD integration for automated testing

## Original Source

All algorithms translated from:
- Repository: Algorithm-a-day
- Language: Scala 2.11.8
- Author: Pablo Francisco Pérez Hidalgo (@pfcoperez)
- License: (Same as original repository)

## Contribution Guidelines

When adding new translations:
1. Maintain original algorithm complexity
2. Follow language-specific best practices
3. Include comprehensive documentation
4. Add usage examples
5. Preserve functional programming principles where applicable

## Credits

- **Original Scala Implementations**: Pablo Francisco Pérez Hidalgo
- **Python Translations**: Translated from Scala implementations
- **TypeScript Translations**: Translated from Scala implementations

---

For detailed usage and API documentation, see:
- [Python README](src/main/python/README.md)
- [TypeScript README](src/main/typescript/README.md)
