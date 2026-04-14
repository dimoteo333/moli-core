import { marked } from 'marked';
import type { ParsedSection } from '../../shared/types.js';

export function parseMarkdownFile(
  content: string,
  filePath: string,
  libraryId: string,
): ParsedSection {
  const title = extractTitle(content, filePath);
  const slug = filePathToSlug(filePath);
  const parentSlug = extractParentSlug(slug);
  const headings = extractHeadings(content);
  const codeBlocks = extractCodeBlocks(content);

  return {
    title,
    slug,
    content,
    headings,
    codeBlocks,
    parentSlug,
  };
}

function extractTitle(content: string, filePath: string): string {
  // Try to find first h1
  const h1Match = content.match(/^#\s+(.+)$/m);
  if (h1Match) return h1Match[1].trim();

  // Try frontmatter title
  const fmMatch = content.match(/^---[\s\S]*?title:\s*["']?(.+?)["']?\s*$/m);
  if (fmMatch) return fmMatch[1].trim();

  // Fall back to filename
  const name = filePath.split('/').pop()?.replace(/\.md$/, '') ?? 'Untitled';
  return name.replace(/[-_]/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function filePathToSlug(filePath: string): string {
  return filePath
    .replace(/\.md$/, '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function extractParentSlug(slug: string): string | null {
  const parts = slug.split('/');
  if (parts.length <= 1) return null;
  return parts.slice(0, -1).join('/');
}

function extractHeadings(content: string): string[] {
  const headings: string[] = [];
  const lines = content.split('\n');
  for (const line of lines) {
    const match = line.match(/^#{1,6}\s+(.+)$/);
    if (match) {
      headings.push(match[1].trim());
    }
  }
  return headings;
}

function extractCodeBlocks(content: string): string[] {
  const blocks: string[] = [];
  const regex = /```[\w]*\n([\s\S]*?)```/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    blocks.push(match[1].trim());
  }
  return blocks;
}
