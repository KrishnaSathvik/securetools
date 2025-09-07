export const removeExtraBlankLines = (text: string): string => 
  text.replace(/\n{3,}/g, "\n\n");

export const trimTrailingSpaces = (text: string): string => 
  text.replace(/[ \t]+$/gm, "");

export const joinLines = (text: string): string => 
  text.replace(/\s*\n\s*/g, " ").replace(/\s+/g, " ");

export const smartToAsciiQuotes = (text: string): string =>
  text.replace(/[""]/g, '"').replace(/['']/g, "'");

export const removeExtraSpaces = (text: string): string =>
  text.replace(/[ \t]+/g, " ");

export const normalizeLineBreaks = (text: string): string =>
  text.replace(/\r\n/g, "\n").replace(/\r/g, "\n");

export const removeAllLineBreaks = (text: string): string =>
  text.replace(/\n/g, " ").replace(/\s+/g, " ");

export interface CleanupOptions {
  removeExtraBlankLines: boolean;
  trimTrailingSpaces: boolean;
  joinLines: boolean;
  smartToAsciiQuotes: boolean;
  removeExtraSpaces: boolean;
  normalizeLineBreaks: boolean;
}

export const cleanupText = (text: string, options: CleanupOptions): string => {
  let result = text;

  if (options.normalizeLineBreaks) {
    result = normalizeLineBreaks(result);
  }

  if (options.removeExtraSpaces) {
    result = removeExtraSpaces(result);
  }

  if (options.trimTrailingSpaces) {
    result = trimTrailingSpaces(result);
  }

  if (options.removeExtraBlankLines) {
    result = removeExtraBlankLines(result);
  }

  if (options.joinLines) {
    result = joinLines(result);
  }

  if (options.smartToAsciiQuotes) {
    result = smartToAsciiQuotes(result);
  }

  return result.trim();
};