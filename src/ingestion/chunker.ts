import type { Chunk } from '../shared/types.js';

export interface ChunkerOptions {
  maxTokens: number;
  overlapTokens: number;
  minTokens: number;
  respectHeadings: boolean;
}

const DEFAULT_OPTIONS: ChunkerOptions = {
  maxTokens: 512,
  overlapTokens: 64,
  minTokens: 50,
  respectHeadings: true,
};

export function chunkContent(content: string, options?: Partial<ChunkerOptions>): Chunk[] {
  const opts = { ...DEFAULT_OPTIONS, ...options };
  const sections = splitByHeadings(content);
  const chunks: Chunk[] = [];
  let chunkIndex = 0;

  for (const section of sections) {
    const sectionTokens = estimateTokens(section.content);

    if (sectionTokens <= opts.maxTokens) {
      // Section fits in one chunk
      if (sectionTokens >= opts.minTokens || chunks.length === 0) {
        chunks.push({
          content: section.content,
          chunkIndex: chunkIndex++,
          tokenCount: sectionTokens,
          heading: section.heading,
          hasCode: hasCodeBlock(section.content),
        });
      } else {
        // Too small — merge with previous chunk
        const prev = chunks[chunks.length - 1];
        if (prev) {
          prev.content += '\n\n' + section.content;
          prev.tokenCount = estimateTokens(prev.content);
          prev.hasCode = prev.hasCode || hasCodeBlock(section.content);
        }
      }
    } else {
      // Section too large — split by paragraphs with overlap
      const subChunks = splitLargeSection(section.content, section.heading, opts);
      for (const sub of subChunks) {
        sub.chunkIndex = chunkIndex++;
        chunks.push(sub);
      }
    }
  }

  return chunks;
}

interface HeadingSection {
  heading: string | null;
  content: string;
}

function splitByHeadings(content: string): HeadingSection[] {
  const lines = content.split('\n');
  const sections: HeadingSection[] = [];
  let currentHeading: string | null = null;
  let currentLines: string[] = [];

  for (const line of lines) {
    const headingMatch = line.match(/^(#{2,6})\s+(.+)$/);
    if (headingMatch) {
      // Save previous section
      if (currentLines.length > 0) {
        sections.push({
          heading: currentHeading,
          content: currentLines.join('\n').trim(),
        });
      }
      currentHeading = headingMatch[2].trim();
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }

  // Don't forget the last section
  if (currentLines.length > 0) {
    sections.push({
      heading: currentHeading,
      content: currentLines.join('\n').trim(),
    });
  }

  return sections.filter(s => s.content.length > 0);
}

function splitLargeSection(content: string, heading: string | null, opts: ChunkerOptions): Chunk[] {
  const paragraphs = content.split(/\n\n+/);
  const chunks: Chunk[] = [];
  let currentChunk = '';
  let currentTokens = 0;

  for (const para of paragraphs) {
    const paraTokens = estimateTokens(para);

    if (paraTokens > opts.maxTokens) {
      // Single paragraph too large (e.g., big code block) — keep intact
      if (currentChunk) {
        chunks.push(makeChunk(currentChunk, heading));
        currentChunk = '';
        currentTokens = 0;
      }
      chunks.push(makeChunk(para, heading));
      continue;
    }

    if (currentTokens + paraTokens > opts.maxTokens) {
      // Current chunk is full — save it and start new one with overlap
      chunks.push(makeChunk(currentChunk, heading));

      // Build overlap from end of current chunk
      const overlapText = getOverlapText(currentChunk, opts.overlapTokens);
      currentChunk = overlapText ? overlapText + '\n\n' + para : para;
      currentTokens = estimateTokens(currentChunk);
    } else {
      currentChunk = currentChunk ? currentChunk + '\n\n' + para : para;
      currentTokens += paraTokens;
    }
  }

  if (currentChunk && estimateTokens(currentChunk) >= opts.minTokens) {
    chunks.push(makeChunk(currentChunk, heading));
  } else if (currentChunk && chunks.length > 0) {
    // Merge small trailing content with previous chunk
    const prev = chunks[chunks.length - 1];
    prev.content += '\n\n' + currentChunk;
    prev.tokenCount = estimateTokens(prev.content);
    prev.hasCode = prev.hasCode || hasCodeBlock(currentChunk);
  } else if (currentChunk) {
    chunks.push(makeChunk(currentChunk, heading));
  }

  return chunks;
}

function makeChunk(content: string, heading: string | null): Chunk {
  return {
    content: content.trim(),
    chunkIndex: 0, // Will be set by caller
    tokenCount: estimateTokens(content),
    heading,
    hasCode: hasCodeBlock(content),
  };
}

function getOverlapText(text: string, overlapTokens: number): string {
  const words = text.split(/\s+/);
  const overlapWordCount = Math.ceil(overlapTokens / 1.3);
  if (words.length <= overlapWordCount) return text;
  return words.slice(-overlapWordCount).join(' ');
}

export function estimateTokens(text: string): number {
  // Rough approximation: 1 token ≈ 0.75 words
  const words = text.split(/\s+/).filter(w => w.length > 0).length;
  return Math.ceil(words * 1.3);
}

function hasCodeBlock(text: string): boolean {
  return /```[\s\S]*?```/.test(text);
}
