export const toUpper = (text: string): string => text.toUpperCase();

export const toLower = (text: string): string => text.toLowerCase();

export const toTitleCase = (text: string): string => 
  text
    .toLowerCase()
    .replace(/(?:^|\s|-|_)\S/g, char => char.toUpperCase());

export const toSentenceCase = (text: string): string => 
  text
    .toLowerCase()
    .replace(/(^\s*[a-z])|([.!?]\s+[a-z])/g, char => char.toUpperCase());

export const capitalizeWords = (text: string): string => 
  text.replace(/\b([a-z])/g, (_, char) => char.toUpperCase());

export const toCamelCase = (text: string): string => 
  text
    .toLowerCase()
    .replace(/[-_\s]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^(.)/, char => char.toLowerCase());

export const toKebabCase = (text: string): string => 
  text
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

export const toSnakeCase = (text: string): string => 
  text
    .replace(/([a-z])([A-Z])/g, '$1_$2')
    .replace(/[\s-]+/g, '_')
    .toLowerCase();

export type CaseType = 
  | 'upper'
  | 'lower' 
  | 'title'
  | 'sentence'
  | 'capitalize'
  | 'camel'
  | 'kebab'
  | 'snake';

export const transformCase = (text: string, caseType: CaseType): string => {
  switch (caseType) {
    case 'upper':
      return toUpper(text);
    case 'lower':
      return toLower(text);
    case 'title':
      return toTitleCase(text);
    case 'sentence':
      return toSentenceCase(text);
    case 'capitalize':
      return capitalizeWords(text);
    case 'camel':
      return toCamelCase(text);
    case 'kebab':
      return toKebabCase(text);
    case 'snake':
      return toSnakeCase(text);
    default:
      return text;
  }
};

export const caseOptions: { value: CaseType; label: string; description: string }[] = [
  { value: 'upper', label: 'UPPERCASE', description: 'CONVERT ALL TEXT TO UPPERCASE' },
  { value: 'lower', label: 'lowercase', description: 'convert all text to lowercase' },
  { value: 'title', label: 'Title Case', description: 'Convert Text To Title Case' },
  { value: 'sentence', label: 'Sentence case', description: 'Convert text to sentence case' },
  { value: 'capitalize', label: 'Capitalize Words', description: 'Capitalize Each Word In The Text' },
  { value: 'camel', label: 'camelCase', description: 'convertTextToCamelCase' },
  { value: 'kebab', label: 'kebab-case', description: 'convert-text-to-kebab-case' },
  { value: 'snake', label: 'snake_case', description: 'convert_text_to_snake_case' },
];