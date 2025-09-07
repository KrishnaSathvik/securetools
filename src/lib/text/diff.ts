export interface DiffChunk {
  type: 'equal' | 'insert' | 'delete';
  content: string;
  lineNumber?: number;
}

export interface DiffResult {
  chunks: DiffChunk[];
  additions: number;
  deletions: number;
  changes: number;
}

// Simple Myers diff algorithm implementation
export const diffLines = (text1: string, text2: string): DiffResult => {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  const chunks: DiffChunk[] = [];
  let additions = 0;
  let deletions = 0;
  let changes = 0;

  // Simple line-by-line diff
  const maxLines = Math.max(lines1.length, lines2.length);
  
  for (let i = 0; i < maxLines; i++) {
    const line1 = lines1[i];
    const line2 = lines2[i];
    
    if (line1 === undefined) {
      chunks.push({ type: 'insert', content: line2, lineNumber: i + 1 });
      additions++;
    } else if (line2 === undefined) {
      chunks.push({ type: 'delete', content: line1, lineNumber: i + 1 });
      deletions++;
    } else if (line1 === line2) {
      chunks.push({ type: 'equal', content: line1, lineNumber: i + 1 });
    } else {
      chunks.push({ type: 'delete', content: line1, lineNumber: i + 1 });
      chunks.push({ type: 'insert', content: line2, lineNumber: i + 1 });
      changes++;
    }
  }

  return { chunks, additions, deletions, changes };
};

export const diffWords = (text1: string, text2: string): DiffResult => {
  const words1 = text1.split(/(\s+)/);
  const words2 = text2.split(/(\s+)/);
  
  const chunks: DiffChunk[] = [];
  let additions = 0;
  let deletions = 0;
  let changes = 0;

  // Simple word-by-word diff
  const maxWords = Math.max(words1.length, words2.length);
  
  for (let i = 0; i < maxWords; i++) {
    const word1 = words1[i];
    const word2 = words2[i];
    
    if (word1 === undefined) {
      chunks.push({ type: 'insert', content: word2 });
      if (word2 && word2.trim()) additions++;
    } else if (word2 === undefined) {
      chunks.push({ type: 'delete', content: word1 });
      if (word1 && word1.trim()) deletions++;
    } else if (word1 === word2) {
      chunks.push({ type: 'equal', content: word1 });
    } else {
      chunks.push({ type: 'delete', content: word1 });
      chunks.push({ type: 'insert', content: word2 });
      if (word1 && word1.trim() && word2 && word2.trim()) changes++;
    }
  }

  return { chunks, additions, deletions, changes };
};

export const generateUnifiedDiff = (text1: string, text2: string, filename1: string = 'original', filename2: string = 'modified'): string => {
  const lines1 = text1.split('\n');
  const lines2 = text2.split('\n');
  
  let result = `--- ${filename1}\n+++ ${filename2}\n`;
  
  // Simple unified diff format
  const diff = diffLines(text1, text2);
  let lineNum1 = 1;
  let lineNum2 = 1;
  
  result += `@@ -1,${lines1.length} +1,${lines2.length} @@\n`;
  
  for (const chunk of diff.chunks) {
    switch (chunk.type) {
      case 'equal':
        result += ` ${chunk.content}\n`;
        lineNum1++;
        lineNum2++;
        break;
      case 'delete':
        result += `-${chunk.content}\n`;
        lineNum1++;
        break;
      case 'insert':
        result += `+${chunk.content}\n`;
        lineNum2++;
        break;
    }
  }
  
  return result;
};