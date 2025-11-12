# TypeScript Algorithm Translations

This directory contains TypeScript translations of algorithms originally implemented in Scala from the Algorithm-a-day repository.

## Modules

### 1. `sorting.ts` - Sorting Algorithms

Implementations of fundamental sorting algorithms with full type safety.

#### Functions:
- **`naiveQuicksort<T>(list: T[], compareFn?: (a: T, b: T) => number): T[]`**
  - Naive quicksort implementation
  - Time Complexity: O(n²) worst case, O(n log n) average case
  - Space Complexity: O(n)

- **`mergeSort<T>(list: T[], compareFn?: (a: T, b: T) => number): T[]`**
  - Merge sort implementation
  - Time Complexity: O(n log n)
  - Space Complexity: O(n)

#### Usage Example:
```typescript
import { mergeSort, naiveQuicksort } from './sorting';

const numbers = [64, 34, 25, 12, 22, 11, 90];
const sortedNumbers = mergeSort(numbers);
console.log(sortedNumbers);  // [11, 12, 22, 25, 34, 64, 90]

// Sort with custom comparator
const tuples: [number, string][] = [[1, 'b'], [2, 'a'], [1, 'a']];
const sortedTuples = mergeSort(tuples, (a, b) => a[1] <= b[1] ? -1 : 1);
console.log(sortedTuples);  // [[1, 'a'], [2, 'a'], [1, 'b']]
```

---

### 2. `sequences.ts` - Sequence Algorithms

Advanced sequence and string matching algorithms with generic types.

#### Functions:
- **`binarySearch<T>(vec: T[], x: T, compareFn?: (a: T, b: T) => number, i?: number, j?: number): number | null`**
  - Binary search in a sorted array
  - Time Complexity: O(log n)
  - Returns index if found, null otherwise

- **`binarySearchInCycle<T>(vec: T[], x: T, compareFn?: (a: T, b: T) => number, i?: number, j?: number): number | null`**
  - Binary search in a rotated sorted array
  - Time Complexity: O(log n)
  - Handles cyclically rotated arrays

- **`kmpSearch<T>(corpus: T[], word: T[]): number[]`**
  - Knuth-Morris-Pratt pattern matching algorithm
  - Time Complexity: O(n) where n = corpus length
  - Returns array of starting indices where pattern is found

- **`isSubsequence<T>(s: T[], ss: T[]): boolean`**
  - Checks if ss is a subsequence of s
  - Time Complexity: O(n*m)

#### Usage Example:
```typescript
import { binarySearch, kmpSearch } from './sequences';

// Binary search
const sortedList = [1, 3, 5, 7, 9, 11, 13, 15];
const index = binarySearch(sortedList, 7);
console.log(index);  // 3

// KMP pattern matching
const text = "ABABDABACDABABCABAB";
const pattern = "ABABCABAB";
const matches = kmpSearch(text.split(''), pattern.split(''));
console.log(matches);  // [10] (starting position)
```

---

### 3. `numbers.ts` - Number Theory Algorithms

Prime number generation and combinatorics with type safety.

#### Functions:
- **`primesStream(limit?: number): Generator<number, void, unknown>`**
  - Generator function for prime numbers
  - Time Complexity: O(n²) for n primes
  - Yields primes indefinitely or up to limit

- **`getFirstNPrimes(n: number): number[]`**
  - Get first n prime numbers
  - Returns array of primes

- **`binomialCoefficient(n: number, k: number): number | null`**
  - Calculate C(n, k) - "n choose k"
  - Time Complexity: O(n*k) with memoization
  - Returns number of ways to choose k items from n

- **`isPrime(n: number): boolean`**
  - Check if a number is prime
  - Time Complexity: O(√n)

- **`sieveOfEratosthenes(limit: number): number[]`**
  - Generate all primes up to limit
  - Time Complexity: O(n log log n)
  - More efficient for generating many primes

#### Usage Example:
```typescript
import { getFirstNPrimes, binomialCoefficient, sieveOfEratosthenes } from './numbers';

// Get first 10 primes
const primes = getFirstNPrimes(10);
console.log(primes);  // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

// Calculate binomial coefficient
const combinations = binomialCoefficient(5, 2);
console.log(combinations);  // 10

// Sieve of Eratosthenes
const primesUpTo30 = sieveOfEratosthenes(30);
console.log(primesUpTo30);  // [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
```

---

## Setup and Installation

### Prerequisites
```bash
npm install -g typescript ts-node
```

### Compilation
```bash
# Compile all TypeScript files
tsc sorting.ts
tsc sequences.ts
tsc numbers.ts

# Or use a tsconfig.json
tsc
```

### Running Examples

Each module includes example usage that can be run with `ts-node`:

```bash
ts-node sorting.ts
ts-node sequences.ts
ts-node numbers.ts
```

Or compile and run:
```bash
tsc sorting.ts && node sorting.js
```

---

## TypeScript Configuration

Recommended `tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "declaration": true,
    "outDir": "./dist"
  },
  "include": ["*.ts"],
  "exclude": ["node_modules"]
}
```

---

## Original Scala Implementations

These algorithms were translated from the Scala implementations in:
- `src/main/scala/org/pfcoperez/dailyalgorithm/Sorting.scala`
- `src/main/scala/org/pfcoperez/dailyalgorithm/Sequences.scala`
- `src/main/scala/org/pfcoperez/dailyalgorithm/Numbers.scala`

---

## Key Differences from Scala

1. **Type System**:
   - TypeScript uses structural typing vs Scala's nominal typing
   - TypeScript has `null` and `undefined`, Scala uses `Option`

2. **Generics**:
   - Both support generic types
   - TypeScript uses `<T>`, Scala uses `[T]`

3. **Functional Features**:
   - Scala has more advanced functional features (pattern matching, for-comprehensions)
   - TypeScript adapted these using standard control flow

4. **Immutability**:
   - Scala emphasizes immutability
   - TypeScript implementations use standard arrays for compatibility

---

## Type Safety Features

All implementations use TypeScript's type system for:
- Generic type parameters (`<T>`)
- Strict null checks (`number | null`)
- Function type signatures
- Optional parameters with default values

Example:
```typescript
function binarySearch<T>(
  vec: T[],
  x: T,
  compareFn?: (a: T, b: T) => number,
  i: number = 0,
  j?: number
): number | null {
  // Implementation with full type safety
}
```

---

## Testing

Basic tests can be written using any testing framework. Example with assertions:

```typescript
import { mergeSort } from './sorting';
import { binarySearch } from './sequences';
import { isPrime } from './numbers';

// Test sorting
console.assert(
  JSON.stringify(mergeSort([3, 1, 4, 1, 5, 9, 2, 6])) ===
  JSON.stringify([1, 1, 2, 3, 4, 5, 6, 9])
);

// Test binary search
console.assert(binarySearch([1, 3, 5, 7, 9], 5) === 2);

// Test primes
console.assert(isPrime(17) === true);
console.assert(isPrime(18) === false);
```

For production use, consider:
- **Jest** - Popular testing framework
- **Mocha + Chai** - Flexible testing setup
- **Vitest** - Fast modern testing

---

## License

These translations maintain the same license as the original Scala implementations.
