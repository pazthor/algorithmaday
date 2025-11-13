/**
 * Sorting algorithms translated from Scala to TypeScript.
 */

/**
 * Naive quicksort implementation.
 *
 * Time Complexity: O(n^2) worst case, O(n log n) average case
 * Space Complexity: O(n)
 *
 * @param list - Array to sort
 * @param compareFn - Optional comparison function
 * @returns Sorted array
 */
export function naiveQuicksort<T>(
  list: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  if (list.length === 0) {
    return [];
  }

  const compare = compareFn || ((a: T, b: T) => (a <= b ? -1 : 1));
  const [pivot, ...others] = list;

  const lower = others.filter((x) => compare(x, pivot) <= 0);
  const higher = others.filter((x) => compare(x, pivot) > 0);

  return [
    ...naiveQuicksort(lower, compareFn),
    pivot,
    ...naiveQuicksort(higher, compareFn),
  ];
}

/**
 * Merge sort implementation.
 *
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 *
 * @param list - Array to sort
 * @param compareFn - Optional comparison function
 * @returns Sorted array
 */
export function mergeSort<T>(
  list: T[],
  compareFn?: (a: T, b: T) => number
): T[] {
  /**
   * Merge two sorted arrays into one sorted array.
   */
  function merge(a: T[], b: T[]): T[] {
    const result: T[] = [];
    let i = 0;
    let j = 0;

    const compare = compareFn || ((x: T, y: T) => (x <= y ? -1 : 1));

    while (i < a.length && j < b.length) {
      if (compare(a[i], b[j]) <= 0) {
        result.push(a[i]);
        i++;
      } else {
        result.push(b[j]);
        j++;
      }
    }

    // Append remaining elements
    while (i < a.length) {
      result.push(a[i]);
      i++;
    }

    while (j < b.length) {
      result.push(b[j]);
      j++;
    }

    return result;
  }

  // Base case
  if (list.length <= 1) {
    return list;
  }

  // Split the array
  const mid = Math.floor(list.length / 2);
  const left = list.slice(0, mid);
  const right = list.slice(mid);

  // Recursively sort both halves
  const sortedLeft = left.length > 1 ? mergeSort(left, compareFn) : left;
  const sortedRight = right.length > 1 ? mergeSort(right, compareFn) : right;

  // Merge the sorted halves
  return merge(sortedLeft, sortedRight);
}

// Example usage (if running with ts-node or similar)
if (require.main === module) {
  const testList = [64, 34, 25, 12, 22, 11, 90];

  console.log("Original list:", testList);
  console.log("Merge sorted:", mergeSort([...testList]));
  console.log("Quicksort:", naiveQuicksort([...testList]));

  // Test with custom comparison
  const testTuples: [number, string][] = [
    [1, "b"],
    [2, "a"],
    [1, "a"],
    [2, "b"],
  ];
  console.log("\nOriginal tuples:", testTuples);
  console.log(
    "Sorted by second element:",
    mergeSort(testTuples, (a, b) => (a[1] <= b[1] ? -1 : 1))
  );
}
