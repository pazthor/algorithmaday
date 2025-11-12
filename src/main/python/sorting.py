"""
Sorting algorithms translated from Scala to Python.
"""

from typing import List, TypeVar, Callable
from functools import cmp_to_key

T = TypeVar('T')


def naive_quicksort(lst: List[T], key: Callable[[T], any] = None) -> List[T]:
    """
    Naive quicksort implementation.

    Time Complexity: O(n^2) worst case, O(n log n) average case
    Space Complexity: O(n)

    Args:
        lst: List to sort
        key: Optional key function for comparison

    Returns:
        Sorted list
    """
    if not lst:
        return []

    pivot = lst[0]
    others = lst[1:]

    if key is None:
        lower = [x for x in others if x <= pivot]
        higher = [x for x in others if x > pivot]
    else:
        pivot_key = key(pivot)
        lower = [x for x in others if key(x) <= pivot_key]
        higher = [x for x in others if key(x) > pivot_key]

    return naive_quicksort(lower, key) + [pivot] + naive_quicksort(higher, key)


def merge_sort(lst: List[T], key: Callable[[T], any] = None) -> List[T]:
    """
    Merge sort implementation.

    Time Complexity: O(n log n)
    Space Complexity: O(n)

    Args:
        lst: List to sort
        key: Optional key function for comparison

    Returns:
        Sorted list
    """
    def merge(a: List[T], b: List[T]) -> List[T]:
        """
        Merge two sorted lists into one sorted list.
        """
        result = []
        i, j = 0, 0

        while i < len(a) and j < len(b):
            if key is None:
                if a[i] <= b[j]:
                    result.append(a[i])
                    i += 1
                else:
                    result.append(b[j])
                    j += 1
            else:
                if key(a[i]) <= key(b[j]):
                    result.append(a[i])
                    i += 1
                else:
                    result.append(b[j])
                    j += 1

        # Append remaining elements
        result.extend(a[i:])
        result.extend(b[j:])

        return result

    # Base case
    if len(lst) <= 1:
        return lst

    # Split the list
    mid = len(lst) // 2
    left = lst[:mid]
    right = lst[mid:]

    # Recursively sort both halves
    sorted_left = merge_sort(left, key) if len(left) > 1 else left
    sorted_right = merge_sort(right, key) if len(right) > 1 else right

    # Merge the sorted halves
    return merge(sorted_left, sorted_right)


if __name__ == "__main__":
    # Example usage
    test_list = [64, 34, 25, 12, 22, 11, 90]

    print("Original list:", test_list)
    print("Merge sorted:", merge_sort(test_list.copy()))
    print("Quicksort:", naive_quicksort(test_list.copy()))

    # Test with key function
    test_tuples = [(1, 'b'), (2, 'a'), (1, 'a'), (2, 'b')]
    print("\nOriginal tuples:", test_tuples)
    print("Sorted by second element:", merge_sort(test_tuples, key=lambda x: x[1]))
