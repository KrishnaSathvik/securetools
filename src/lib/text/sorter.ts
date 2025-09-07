/**
 * Text sorting utilities for SecureTools
 * 
 * Provides various text sorting and organization functions:
 * - Alphabetical sorting (A-Z, Z-A)
 * - Length-based sorting
 * - Duplicate removal
 * - Line reversal
 * - Number sorting
 */

export type SortOption = 
  | 'alphabetical-asc'
  | 'alphabetical-desc'
  | 'length-asc'
  | 'length-desc'
  | 'remove-duplicates'
  | 'reverse-lines'
  | 'numbers-asc'
  | 'numbers-desc';

export interface SortResult {
  sortedText: string;
  originalLineCount: number;
  processedLineCount: number;
  duplicatesRemoved: number;
}

/**
 * Sort text based on the specified option
 * 
 * @param text - Input text to sort
 * @param option - Sorting option to apply
 * @returns SortResult with sorted text and statistics
 */
export function sortText(text: string, option: SortOption): SortResult {
  if (!text.trim()) {
    return {
      sortedText: '',
      originalLineCount: 0,
      processedLineCount: 0,
      duplicatesRemoved: 0
    };
  }

  const lines = text.split('\n');
  const originalLineCount = lines.length;
  let processedLines = [...lines];
  let duplicatesRemoved = 0;

  switch (option) {
    case 'alphabetical-asc':
      processedLines = lines.sort((a, b) => a.localeCompare(b));
      break;

    case 'alphabetical-desc':
      processedLines = lines.sort((a, b) => b.localeCompare(a));
      break;

    case 'length-asc':
      processedLines = lines.sort((a, b) => a.length - b.length);
      break;

    case 'length-desc':
      processedLines = lines.sort((a, b) => b.length - a.length);
      break;

    case 'remove-duplicates': {
      const uniqueLines = new Set(lines);
      processedLines = Array.from(uniqueLines);
      duplicatesRemoved = originalLineCount - processedLines.length;
      break;
    }

    case 'reverse-lines':
      processedLines = lines.reverse();
      break;

    case 'numbers-asc':
      processedLines = lines.sort((a, b) => {
        const numA = parseFloat(a.trim());
        const numB = parseFloat(b.trim());
        if (isNaN(numA) && isNaN(numB)) return a.localeCompare(b);
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numA - numB;
      });
      break;

    case 'numbers-desc':
      processedLines = lines.sort((a, b) => {
        const numA = parseFloat(a.trim());
        const numB = parseFloat(b.trim());
        if (isNaN(numA) && isNaN(numB)) return b.localeCompare(a);
        if (isNaN(numA)) return 1;
        if (isNaN(numB)) return -1;
        return numB - numA;
      });
      break;

    default:
      processedLines = lines;
  }

  return {
    sortedText: processedLines.join('\n'),
    originalLineCount,
    processedLineCount: processedLines.length,
    duplicatesRemoved
  };
}

/**
 * Get available sort options with descriptions
 */
export const sortOptions = [
  {
    value: 'alphabetical-asc' as SortOption,
    label: 'Alphabetical (A-Z)',
    description: 'Sort lines alphabetically from A to Z'
  },
  {
    value: 'alphabetical-desc' as SortOption,
    label: 'Alphabetical (Z-A)',
    description: 'Sort lines alphabetically from Z to A'
  },
  {
    value: 'length-asc' as SortOption,
    label: 'Length (Shortest First)',
    description: 'Sort lines by length, shortest first'
  },
  {
    value: 'length-desc' as SortOption,
    label: 'Length (Longest First)',
    description: 'Sort lines by length, longest first'
  },
  {
    value: 'remove-duplicates' as SortOption,
    label: 'Remove Duplicates',
    description: 'Remove duplicate lines, keeping only unique ones'
  },
  {
    value: 'reverse-lines' as SortOption,
    label: 'Reverse Lines',
    description: 'Reverse the order of all lines'
  },
  {
    value: 'numbers-asc' as SortOption,
    label: 'Numbers (Ascending)',
    description: 'Sort lines numerically, smallest to largest'
  },
  {
    value: 'numbers-desc' as SortOption,
    label: 'Numbers (Descending)',
    description: 'Sort lines numerically, largest to smallest'
  }
];

/**
 * Get statistics about the text
 */
export function getTextStats(text: string) {
  if (!text.trim()) {
    return {
      totalLines: 0,
      uniqueLines: 0,
      duplicates: 0,
      averageLength: 0,
      shortestLine: 0,
      longestLine: 0
    };
  }

  const lines = text.split('\n');
  const uniqueLines = new Set(lines);
  
  const lengths = lines.map(line => line.length);
  const averageLength = lengths.reduce((sum, len) => sum + len, 0) / lengths.length;

  return {
    totalLines: lines.length,
    uniqueLines: uniqueLines.size,
    duplicates: lines.length - uniqueLines.size,
    averageLength: Math.round(averageLength),
    shortestLine: Math.min(...lengths),
    longestLine: Math.max(...lengths)
  };
}
