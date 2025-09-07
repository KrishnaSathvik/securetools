export interface TextStats {
  words: number;
  chars: number;
  charsNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTimeMin: number;
  speakingTimeMin: number;
  lines: number;
}

export const countStats = (text: string): TextStats => {
  if (!text) {
    return {
      words: 0,
      chars: 0,
      charsNoSpaces: 0,
      sentences: 0,
      paragraphs: 0,
      readingTimeMin: 0,
      speakingTimeMin: 0,
      lines: 0,
    };
  }

  const normalized = text.replace(/\r\n/g, "\n");
  const chars = normalized.length;
  const charsNoSpaces = normalized.replace(/\s/g, "").length;
  
  // Word count: match sequences of non-whitespace characters
  const words = (normalized.trim().match(/\b\S+\b/g) || []).length;
  
  // Sentence count: look for sentence endings (.!?) followed by space/quotes or end of string
  const sentences = (normalized.match(/([.!?]+[""')]*(\s|$))/g) || []).length || (words ? 1 : 0);
  
  // Paragraph count: split by double line breaks
  const paragraphs = normalized.split(/\n\s*\n/).filter(p => p.trim()).length || (words ? 1 : 0);
  
  // Line count
  const lines = normalized.split('\n').length;
  
  // Reading time (average 225 words per minute)
  const readingTimeMin = Math.max(1, Math.round(words / 225));
  
  // Speaking time (average 130 words per minute)
  const speakingTimeMin = Math.max(1, Math.round(words / 130));

  return {
    words,
    chars,
    charsNoSpaces,
    sentences,
    paragraphs,
    readingTimeMin,
    speakingTimeMin,
    lines,
  };
};

export const formatReadingTime = (minutes: number): string => {
  if (minutes < 1) return "< 1 min";
  if (minutes === 1) return "1 min";
  if (minutes < 60) return `${minutes} min`;
  
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};