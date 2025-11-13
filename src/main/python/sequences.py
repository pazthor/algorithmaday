"""
Sequence algorithms translated from Scala to Python.
Includes binary search and KMP string matching.
"""

from typing import List, TypeVar, Optional, Callable

T = TypeVar('T')


def binary_search(
    vec: List[T],
    x: T,
    key: Callable[[T], any] = None,
    i: int = 0,
    j: Optional[int] = None
) -> Optional[int]:
    """
    Search for an element within a sorted list returning its position if found.

    Time Complexity: O(log n)
    Space Complexity: O(log n) due to recursion

    Args:
        vec: Sorted list to search in
        x: Element to search for
        key: Optional key function for comparison
        i: Start index (default 0)
        j: End index (default len(vec) - 1)

    Returns:
        Index of element if found, None otherwise
    """
    if j is None:
        j = len(vec) - 1

    if i > j:
        return None

    length = j - i + 1
    mid_idx = i + length // 2

    # Get comparison values
    mid_val = vec[mid_idx] if key is None else key(vec[mid_idx])
    search_val = x if key is None else key(x)

    if (vec[mid_idx] if key is None else mid_val) == (x if key is None else search_val):
        return mid_idx
    elif search_val < mid_val:
        return binary_search(vec, x, key, i, mid_idx - 1)
    else:
        return binary_search(vec, x, key, mid_idx + 1, j)


def binary_search_in_cycle(
    vec: List[T],
    x: T,
    key: Callable[[T], any] = None,
    i: int = 0,
    j: Optional[int] = None
) -> Optional[int]:
    """
    Search for an element within a cyclic-ordered (rotated) list
    returning its position if found.

    Time Complexity: O(log n)
    Space Complexity: O(log n) due to recursion

    Args:
        vec: Rotated sorted list to search in
        x: Element to search for
        key: Optional key function for comparison
        i: Start index (default 0)
        j: End index (default len(vec) - 1)

    Returns:
        Index of element if found, None otherwise
    """
    if j is None:
        j = len(vec) - 1

    if i > j:
        return None

    length = j - i + 1
    mid_idx = length // 2

    # Get values for comparison
    def get_val(idx):
        return vec[idx] if key is None else key(vec[idx])

    search_val = x if key is None else key(x)

    if (vec[mid_idx] if key is None else get_val(mid_idx)) == (x if key is None else search_val):
        return mid_idx

    # Check if left side is ordered
    if get_val(i) <= get_val(mid_idx):
        # Left side is ordered
        if get_val(i) <= search_val < get_val(mid_idx):
            # Search in ordered left side
            return binary_search(vec, x, key, i, mid_idx - 1)
        else:
            # Search in right side
            return binary_search_in_cycle(vec, x, key, mid_idx + 1, j)
    else:
        # Right side is ordered
        if get_val(mid_idx) < search_val <= get_val(j):
            # Search in ordered right side
            return binary_search(vec, x, key, mid_idx + 1, j)
        else:
            # Search in left side
            return binary_search_in_cycle(vec, x, key, i, mid_idx - 1)


def kmp_search(corpus: List[T], word: List[T]) -> List[int]:
    """
    Knuth-Morris-Pratt fast sequence matching algorithm.

    Time Complexity: O(n), where n = size of the corpus
    Space Complexity: O(m), where m = size of the word

    Args:
        corpus: The sequence to search in
        word: The sequence to search for

    Returns:
        List of starting indices where the word is found in the corpus
    """
    if not word:
        return []

    word_len = len(word)

    # Build prefix table (failure function)
    def build_prefix_table() -> List[int]:
        prefix_table = [-1] * word_len
        k = -1

        for q in range(1, word_len):
            # Find the longest proper prefix which is also a suffix
            while k > -1 and word[k + 1] != word[q]:
                k = prefix_table[k]

            if word[k + 1] == word[q]:
                k += 1

            prefix_table[q] = k

        return prefix_table

    prefix_table = build_prefix_table()

    # Search for the word in the corpus
    results = []
    q = -1  # Number of characters matched

    for idx, char in enumerate(corpus):
        # Match as many characters as possible
        while q > -1 and word[q + 1] != char:
            q = prefix_table[q]

        if word[q + 1] == char:
            q += 1

        # Check if we found a complete match
        if q == word_len - 1:
            results.append(idx - word_len + 1)
            q = prefix_table[q]

    return results


def is_subsequence(s: List[T], ss: List[T]) -> bool:
    """
    Checks whether a sequence is a subsequence of another.

    Time Complexity: O(n*m), where n = len(s), m = len(ss)
    Space Complexity: O(1)

    Args:
        s: The main sequence
        ss: The subsequence to check

    Returns:
        True if ss is a subsequence of s, False otherwise
    """
    if not ss:
        return True

    ss_idx = 0

    for element in s:
        if ss_idx < len(ss) and element == ss[ss_idx]:
            ss_idx += 1
            if ss_idx == len(ss):
                return True

    return ss_idx == len(ss)


if __name__ == "__main__":
    # Test binary search
    sorted_list = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
    print("Binary search for 7:", binary_search(sorted_list, 7))
    print("Binary search for 8:", binary_search(sorted_list, 8))

    # Test cyclic binary search
    rotated_list = [7, 9, 11, 13, 15, 17, 19, 1, 3, 5]
    print("\nCyclic binary search for 13:", binary_search_in_cycle(rotated_list, 13))
    print("Cyclic binary search for 3:", binary_search_in_cycle(rotated_list, 3))

    # Test KMP search
    text = "ABABDABACDABABCABAB"
    pattern = "ABABCABAB"
    print(f"\nKMP search for '{pattern}' in '{text}':", kmp_search(list(text), list(pattern)))

    # Test subsequence
    print("\nIs [1, 3, 5] a subsequence of [1, 2, 3, 4, 5]?",
          is_subsequence([1, 2, 3, 4, 5], [1, 3, 5]))
    print("Is [1, 5, 3] a subsequence of [1, 2, 3, 4, 5]?",
          is_subsequence([1, 2, 3, 4, 5], [1, 5, 3]))
