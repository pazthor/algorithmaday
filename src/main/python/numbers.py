"""
Number theory algorithms translated from Scala to Python.
Includes prime number generation and binomial coefficients.
"""

from typing import Optional, Iterator, Dict, Tuple
from functools import lru_cache


def primes_stream(limit: Optional[int] = None) -> Iterator[int]:
    """
    Generate prime numbers using a stream-based approach.

    Time Complexity: O(n^2) to generate n primes
    Space Complexity: O(n) to store generated primes

    Args:
        limit: Optional limit on the number of primes to generate

    Yields:
        Prime numbers in ascending order
    """
    primes = []
    candidate = 2
    count = 0

    while limit is None or count < limit:
        # Check if candidate is prime
        is_prime = True
        for p in primes:
            if p * p > candidate:
                break
            if candidate % p == 0:
                is_prime = False
                break

        if is_prime:
            primes.append(candidate)
            yield candidate
            count += 1

        candidate += 1


def get_first_n_primes(n: int) -> list[int]:
    """
    Get the first n prime numbers.

    Time Complexity: O(n^2)
    Space Complexity: O(n)

    Args:
        n: Number of primes to generate

    Returns:
        List of the first n prime numbers
    """
    return list(primes_stream(n))


def binomial_coefficient(n: int, k: int) -> Optional[int]:
    """
    Calculate the binomial coefficient C(n, k).

    Also known as "n choose k" - the number of ways to choose k items from n items.
    Uses memoization for efficiency.

    Time Complexity: O(n*k)
    Space Complexity: O(n*k) for memoization

    Args:
        n: Total number of items
        k: Number of items to choose

    Returns:
        The binomial coefficient, or None if parameters are invalid
    """
    if n < 1 or k < 1 or n < k:
        return None

    # Use a cache dictionary for memoization
    cache: Dict[Tuple[int, int], int] = {}

    def memoized_binomial(ni: int, ki: int) -> int:
        # Base cases
        if ni == ki:
            return 1
        if ki == 1:
            return ni

        # Check cache
        if (ni, ki) in cache:
            return cache[(ni, ki)]

        # Recursive calculation with memoization
        a = memoized_binomial(ni - 1, ki - 1)
        b = memoized_binomial(ni - 1, ki)

        result = a + b
        cache[(ni, ki)] = result

        return result

    return memoized_binomial(n, k)


@lru_cache(maxsize=None)
def binomial_coefficient_cached(n: int, k: int) -> Optional[int]:
    """
    Calculate the binomial coefficient C(n, k) using Python's built-in LRU cache.

    This is an alternative implementation using functools.lru_cache.

    Time Complexity: O(n*k)
    Space Complexity: O(n*k) for memoization

    Args:
        n: Total number of items
        k: Number of items to choose

    Returns:
        The binomial coefficient, or None if parameters are invalid
    """
    if n < 1 or k < 1 or n < k:
        return None

    if n == k or k == 0:
        return 1
    if k == 1:
        return n

    return binomial_coefficient_cached(n - 1, k - 1) + binomial_coefficient_cached(n - 1, k)


def is_prime(n: int) -> bool:
    """
    Check if a number is prime.

    Time Complexity: O(√n)
    Space Complexity: O(1)

    Args:
        n: Number to check

    Returns:
        True if n is prime, False otherwise
    """
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False

    # Check odd divisors up to √n
    i = 3
    while i * i <= n:
        if n % i == 0:
            return False
        i += 2

    return True


def sieve_of_eratosthenes(limit: int) -> list[int]:
    """
    Generate all prime numbers up to a given limit using the Sieve of Eratosthenes.

    This is more efficient than the stream approach for generating many primes.

    Time Complexity: O(n log log n)
    Space Complexity: O(n)

    Args:
        limit: Upper bound for prime generation

    Returns:
        List of all primes up to and including limit
    """
    if limit < 2:
        return []

    # Create a boolean array "is_prime[0..limit]" and initialize
    # all entries as true
    is_prime_arr = [True] * (limit + 1)
    is_prime_arr[0] = is_prime_arr[1] = False

    p = 2
    while p * p <= limit:
        # If is_prime[p] is not changed, then it is a prime
        if is_prime_arr[p]:
            # Mark all multiples of p as not prime
            for i in range(p * p, limit + 1, p):
                is_prime_arr[i] = False
        p += 1

    # Collect all numbers that are still marked as prime
    return [num for num in range(limit + 1) if is_prime_arr[num]]


if __name__ == "__main__":
    # Test prime generation
    print("First 10 primes:", get_first_n_primes(10))

    # Test sieve of Eratosthenes
    print("\nPrimes up to 30:", sieve_of_eratosthenes(30))

    # Test is_prime
    print("\nIs 17 prime?", is_prime(17))
    print("Is 18 prime?", is_prime(18))

    # Test binomial coefficient
    print("\nBinomial coefficient C(5, 2):", binomial_coefficient(5, 2))
    print("Binomial coefficient C(10, 3):", binomial_coefficient(10, 3))
    print("Binomial coefficient C(20, 10):", binomial_coefficient(20, 10))

    # Test Pascal's triangle using binomial coefficients
    print("\nPascal's Triangle (first 6 rows):")
    for n in range(1, 7):
        row = [binomial_coefficient(n, k) for k in range(1, n + 1)]
        print(f"Row {n}: {row}")
