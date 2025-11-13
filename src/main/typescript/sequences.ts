/**
 * Sequence algorithms translated from Scala to TypeScript.
 * Includes binary search and KMP string matching.
 */

/**
 * Search for an element within a sorted array returning its position if found.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to recursion
 *
 * @param vec - Sorted array to search in
 * @param x - Element to search for
 * @param compareFn - Optional comparison function
 * @param i - Start index (default 0)
 * @param j - End index (default vec.length - 1)
 * @returns Index of element if found, null otherwise
 */
export function binarySearch<T>(
  vec: T[],
  x: T,
  compareFn?: (a: T, b: T) => number,
  i: number = 0,
  j?: number
): number | null {
  if (j === undefined) {
    j = vec.length - 1;
  }

  if (i > j) {
    return null;
  }

  const length = j - i + 1;
  const midIdx = i + Math.floor(length / 2);

  const compare = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  const cmpResult = compare(x, vec[midIdx]);

  if (cmpResult === 0) {
    return midIdx;
  } else if (cmpResult < 0) {
    return binarySearch(vec, x, compareFn, i, midIdx - 1);
  } else {
    return binarySearch(vec, x, compareFn, midIdx + 1, j);
  }
}

/**
 * Search for an element within a cyclic-ordered (rotated) array
 * returning its position if found.
 *
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to recursion
 *
 * @param vec - Rotated sorted array to search in
 * @param x - Element to search for
 * @param compareFn - Optional comparison function
 * @param i - Start index (default 0)
 * @param j - End index (default vec.length - 1)
 * @returns Index of element if found, null otherwise
 */
export function binarySearchInCycle<T>(
  vec: T[],
  x: T,
  compareFn?: (a: T, b: T) => number,
  i: number = 0,
  j?: number
): number | null {
  if (j === undefined) {
    j = vec.length - 1;
  }

  if (i > j) {
    return null;
  }

  const length = j - i + 1;
  const midIdx = Math.floor(length / 2);

  const compare = compareFn || ((a: T, b: T) => {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  });

  if (compare(x, vec[midIdx]) === 0) {
    return midIdx;
  }

  // Check if left side is ordered
  if (compare(vec[i], vec[midIdx]) <= 0) {
    // Left side is ordered
    if (compare(vec[i], x) <= 0 && compare(x, vec[midIdx]) < 0) {
      // Search in ordered left side
      return binarySearch(vec, x, compareFn, i, midIdx - 1);
    } else {
      // Search in right side
      return binarySearchInCycle(vec, x, compareFn, midIdx + 1, j);
    }
  } else {
    // Right side is ordered
    if (compare(vec[midIdx], x) < 0 && compare(x, vec[j]) <= 0) {
      // Search in ordered right side
      return binarySearch(vec, x, compareFn, midIdx + 1, j);
    } else {
      // Search in left side
      return binarySearchInCycle(vec, x, compareFn, i, midIdx - 1);
    }
  }
}

/**
 * Knuth-Morris-Pratt fast sequence matching algorithm.
 *
 * Time Complexity: O(n), where n = size of the corpus
 * Space Complexity: O(m), where m = size of the word
 *
 * @param corpus - The sequence to search in
 * @param word - The sequence to search for
 * @returns Array of starting indices where the word is found in the corpus
 */
export function kmpSearch<T>(corpus: T[], word: T[]): number[] {
  if (word.length === 0) {
    return [];
  }

  const wordLen = word.length;

  // Build prefix table (failure function)
  function buildPrefixTable(): number[] {
    const prefixTable: number[] = new Array(wordLen).fill(-1);
    let k = -1;

    for (let q = 1; q < wordLen; q++) {
      // Find the longest proper prefix which is also a suffix
      while (k > -1 && word[k + 1] !== word[q]) {
        k = prefixTable[k];
      }

      if (word[k + 1] === word[q]) {
        k++;
      }

      prefixTable[q] = k;
    }

    return prefixTable;
  }

  const prefixTable = buildPrefixTable();

  // Search for the word in the corpus
  const results: number[] = [];
  let q = -1; // Number of characters matched

  for (let idx = 0; idx < corpus.length; idx++) {
    const char = corpus[idx];

    // Match as many characters as possible
    while (q > -1 && word[q + 1] !== char) {
      q = prefixTable[q];
    }

    if (word[q + 1] === char) {
      q++;
    }

    // Check if we found a complete match
    if (q === wordLen - 1) {
      results.push(idx - wordLen + 1);
      q = prefixTable[q];
    }
  }

  return results;
}

/**
 * Checks whether a sequence is a subsequence of another.
 *
 * Time Complexity: O(n*m), where n = s.length, m = ss.length
 * Space Complexity: O(1)
 *
 * @param s - The main sequence
 * @param ss - The subsequence to check
 * @returns True if ss is a subsequence of s, false otherwise
 */
export function isSubsequence<T>(s: T[], ss: T[]): boolean {
  if (ss.length === 0) {
    return true;
  }

  let ssIdx = 0;

  for (const element of s) {
    if (ssIdx < ss.length && element === ss[ssIdx]) {
      ssIdx++;
      if (ssIdx === ss.length) {
        return true;
      }
    }
  }

  return ssIdx === ss.length;
}

// Example usage (if running with ts-node or similar)
if (require.main === module) {
  // Test binary search
  const sortedList = [1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
  console.log("Binary search for 7:", binarySearch(sortedList, 7));
  console.log("Binary search for 8:", binarySearch(sortedList, 8));

  // Test cyclic binary search
  const rotatedList = [7, 9, 11, 13, 15, 17, 19, 1, 3, 5];
  console.log(
    "\nCyclic binary search for 13:",
    binarySearchInCycle(rotatedList, 13)
  );
  console.log(
    "Cyclic binary search for 3:",
    binarySearchInCycle(rotatedList, 3)
  );

  // Test KMP search
  const text = "ABABDABACDABABCABAB";
  const pattern = "ABABCABAB";
  console.log(
    `\nKMP search for '${pattern}' in '${text}':`,
    kmpSearch(text.split(""), pattern.split(""))
  );

  // Test subsequence
  console.log(
    "\nIs [1, 3, 5] a subsequence of [1, 2, 3, 4, 5]?",
    isSubsequence([1, 2, 3, 4, 5], [1, 3, 5])
  );
  console.log(
    "Is [1, 5, 3] a subsequence of [1, 2, 3, 4, 5]?",
    isSubsequence([1, 2, 3, 4, 5], [1, 5, 3])
  );
}
