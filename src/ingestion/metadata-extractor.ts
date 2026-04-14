import type { ParsedSection } from '../shared/types.js';

export interface ExtractedMetadata {
  category: string;
  tags: string[];
  hasCode: boolean;
  apiRefs: string[];
}

export function extractMetadata(
  section: ParsedSection,
  category: string,
): ExtractedMetadata {
  const tags = extractTags(section);
  const hasCode = section.codeBlocks.length > 0;
  const apiRefs = extractApiReferences(section.content);

  return {
    category,
    tags,
    hasCode,
    apiRefs,
  };
}

function extractTags(section: ParsedSection): string[] {
  const tags = new Set<string>();

  // Add headings as tags (lowercased, short ones)
  for (const heading of section.headings) {
    const lower = heading.toLowerCase();
    if (lower.length <= 30) {
      tags.add(lower);
    }
  }

  // Detect common patterns
  const content = section.content.toLowerCase();

  if (content.includes('hook') || /\buse[A-Z]\w+/.test(section.content)) tags.add('hooks');
  if (content.includes('component')) tags.add('components');
  if (content.includes('props') || content.includes('prop')) tags.add('props');
  if (content.includes('state')) tags.add('state');
  if (content.includes('effect')) tags.add('effects');
  if (content.includes('context')) tags.add('context');
  if (content.includes('ref')) tags.add('refs');
  if (content.includes('style') || content.includes('css') || content.includes('class')) tags.add('styling');
  if (content.includes('event')) tags.add('events');
  if (content.includes('form')) tags.add('forms');
  if (content.includes('routing') || content.includes('router')) tags.add('routing');
  if (content.includes('api') || content.includes('fetch') || content.includes('request')) tags.add('api');
  if (content.includes('test')) tags.add('testing');
  if (content.includes('typescript') || content.includes('type ') || content.includes('interface ')) tags.add('typescript');

  return Array.from(tags);
}

function extractApiReferences(content: string): string[] {
  const refs = new Set<string>();

  // Match React-style hooks: useXxx
  const hookMatches = content.matchAll(/\b(use[A-Z]\w+)\b/g);
  for (const m of hookMatches) refs.add(m[1]);

  // Match component-like references: <ComponentName
  const componentMatches = content.matchAll(/<([A-Z]\w+)/g);
  for (const m of componentMatches) refs.add(m[1]);

  // Match function calls with parentheses: functionName(
  const fnMatches = content.matchAll(/\b([a-z]\w+)\(/g);
  for (const m of fnMatches) {
    // Filter out common non-API words
    const name = m[1];
    if (name.length > 3 && !['console', 'require', 'import', 'export', 'return', 'function', 'const', 'class'].includes(name)) {
      refs.add(name);
    }
  }

  return Array.from(refs).slice(0, 20); // Cap at 20 refs
}
