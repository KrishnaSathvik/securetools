const loremWords = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum"
];

const techWords = [
  "algorithm", "api", "application", "array", "backend", "boolean", "buffer",
  "cache", "callback", "class", "client", "compiler", "component", "config",
  "database", "debug", "deploy", "development", "docker", "element", "endpoint",
  "error", "event", "exception", "framework", "frontend", "function", "git",
  "handler", "http", "instance", "interface", "javascript", "json", "library",
  "method", "module", "node", "object", "parameter", "process", "protocol",
  "query", "request", "response", "router", "schema", "server", "service",
  "stack", "string", "syntax", "system", "template", "thread", "token",
  "typescript", "variable", "version", "webhook"
];

const corporateWords = [
  "synergy", "leverage", "optimize", "streamline", "innovative", "strategic",
  "dynamic", "scalable", "robust", "agile", "enterprise", "solution", "platform",
  "ecosystem", "paradigm", "framework", "methodology", "best", "practices",
  "cutting", "edge", "state", "art", "next", "generation", "world", "class",
  "mission", "critical", "value", "added", "cross", "functional", "holistic",
  "integrated", "comprehensive", "seamless", "efficient", "effective", "proactive",
  "deliverable", "stakeholder", "bandwidth", "mindshare", "actionable", "insight",
  "metrics", "kpi", "roi", "synergistic", "paradigmatic", "disruptive"
];

export type LoremType = 'classic' | 'tech' | 'corporate';

export const genWords = (count: number, type: LoremType = 'classic'): string => {
  const words = type === 'tech' ? techWords : type === 'corporate' ? corporateWords : loremWords;
  return Array.from({ length: count }, () => 
    words[Math.floor(Math.random() * words.length)]
  ).join(" ");
};

export const genSentences = (count: number, type: LoremType = 'classic'): string => {
  return Array.from({ length: count }, () => {
    const wordCount = 8 + Math.floor(Math.random() * 12);
    const sentence = genWords(wordCount, type);
    return sentence.charAt(0).toUpperCase() + sentence.slice(1) + ".";
  }).join(" ");
};

export const genParagraphs = (count: number, type: LoremType = 'classic'): string => {
  return Array.from({ length: count }, () => {
    const sentenceCount = 3 + Math.floor(Math.random() * 4);
    return genSentences(sentenceCount, type);
  }).join("\n\n");
};

export const loremTypes = [
  { value: 'classic' as const, label: 'Classic Lorem', description: 'Traditional Lorem Ipsum text' },
  { value: 'tech' as const, label: 'Tech Ipsum', description: 'Technology and programming terms' },
  { value: 'corporate' as const, label: 'Corporate Ipsum', description: 'Business and corporate buzzwords' }
];

export interface LoremOptions {
  type: LoremType;
  format: 'words' | 'sentences' | 'paragraphs';
  count: number;
  startWithLorem: boolean;
}