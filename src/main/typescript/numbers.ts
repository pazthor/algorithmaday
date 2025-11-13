/**
 * Number theory algorithms translated from Scala to TypeScript.
 * Includes prime number generation and binomial coefficients.
 */

/**
 * Generate prime numbers using a generator function.
 *
 * Time Complexity: O(n^2) to generate n primes
 * Space Complexity: O(n) to store generated primes
 *
 * @param limit - Optional limit on the number of primes to generate
 * @yields Prime numbers in ascending order
 */
export function* primesStream(limit?: number): Generator<number, void, unknown> {
  const primes: number[] = [];
  let candidate = 2;
  let count = 0;

  while (limit === undefined || count < limit) {
    // Check if candidate is prime
    let isPrime = true;
    for (const p of primes) {
      if (p * p > candidate) {
        break;
      }
      if (candidate % p === 0) {
        isPrime = false;
        break;
      }
    }

    if (isPrime) {
      primes.push(candidate);
      yield candidate;
      count++;
    }

    candidate++;
  }
}

/**
 * Get the first n prime numbers.
 *
 * Time Complexity: O(n^2)
 * Space Complexity: O(n)
 *
 * @param n - Number of primes to generate
 * @returns Array of the first n prime numbers
 */
export function getFirstNPrimes(n: number): number[] {
  const result: number[] = [];
  const generator = primesStream(n);

  for (const prime of generator) {
    result.push(prime);
  }

  return result;
}

/**
 * Calculate the binomial coefficient C(n, k).
 *
 * Also known as "n choose k" - the number of ways to choose k items from n items.
 * Uses memoization for efficiency.
 *
 * Time Complexity: O(n*k)
 * Space Complexity: O(n*k) for memoization
 *
 * @param n - Total number of items
 * @param k - Number of items to choose
 * @returns The binomial coefficient, or null if parameters are invalid
 */
export function binomialCoefficient(n: number, k: number): number | null {
  if (n < 1 || k < 1 || n < k) {
    return null;
  }

  // Use a Map for memoization
  const cache = new Map<string, number>();

  function memoizedBinomial(ni: number, ki: number): number {
    // Base cases
    if (ni === ki) {
      return 1;
    }
    if (ki === 1) {
      return ni;
    }

    // Check cache
    const key = `${ni},${ki}`;
    if (cache.has(key)) {
      return cache.get(key)!;
    }

    // Recursive calculation with memoization
    const a = memoizedBinomial(ni - 1, ki - 1);
    const b = memoizedBinomial(ni - 1, ki);

    const result = a + b;
    cache.set(key, result);

    return result;
  }

  return memoizedBinomial(n, k);
}

/**
 * Check if a number is prime.
 *
 * Time Complexity: O(√n)
 * Space Complexity: O(1)
 *
 * @param n - Number to check
 * @returns True if n is prime, false otherwise
 */
export function isPrime(n: number): boolean {
  if (n < 2) {
    return false;
  }
  if (n === 2) {
    return true;
  }
  if (n % 2 === 0) {
    return false;
  }

  // Check odd divisors up to √n
  for (let i = 3; i * i <= n; i += 2) {
    if (n % i === 0) {
      return false;
    }
  }

  return true;
}

/**
 * Generate all prime numbers up to a given limit using the Sieve of Eratosthenes.
 *
 * This is more efficient than the stream approach for generating many primes.
 *
 * Time Complexity: O(n log log n)
 * Space Complexity: O(n)
 *
 * @param limit - Upper bound for prime generation
 * @returns Array of all primes up to and including limit
 */
export function sieveOfEratosthenes(limit: number): number[] {
  if (limit < 2) {
    return [];
  }

  // Create a boolean array "isPrimeArr[0..limit]" and initialize
  // all entries as true
  const isPrimeArr = new Array(limit + 1).fill(true);
  isPrimeArr[0] = isPrimeArr[1] = false;

  let p = 2;
  while (p * p <= limit) {
    // If isPrimeArr[p] is not changed, then it is a prime
    if (isPrimeArr[p]) {
      // Mark all multiples of p as not prime
      for (let i = p * p; i <= limit; i += p) {
        isPrimeArr[i] = false;
      }
    }
    p++;
  }

  // Collect all numbers that are still marked as prime
  const primes: number[] = [];
  for (let num = 0; num <= limit; num++) {
    if (isPrimeArr[num]) {
      primes.push(num);
    }
  }

  return primes;
}

// Example usage (if running with ts-node or similar)
if (require.main === module) {
  // Test prime generation
  console.log("First 10 primes:", getFirstNPrimes(10));

  // Test sieve of Eratosthenes
  console.log("\nPrimes up to 30:", sieveOfEratosthenes(30));

  // Test isPrime
  console.log("\nIs 17 prime?", isPrime(17));
  console.log("Is 18 prime?", isPrime(18));

  // Test binomial coefficient
  console.log("\nBinomial coefficient C(5, 2):", binomialCoefficient(5, 2));
  console.log("Binomial coefficient C(10, 3):", binomialCoefficient(10, 3));
  console.log("Binomial coefficient C(20, 10):", binomialCoefficient(20, 10));

  // Test Pascal's triangle using binomial coefficients
  console.log("\nPascal's Triangle (first 6 rows):");
  for (let n = 1; n <= 6; n++) {
    const row: (number | null)[] = [];
    for (let k = 1; k <= n; k++) {
      row.push(binomialCoefficient(n, k));
    }
    console.log(`Row ${n}:`, row);
  }
}
