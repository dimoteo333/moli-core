import { describe, it, expect } from 'vitest';
import { chunkContent, estimateTokens } from '../../src/ingestion/chunker.js';

describe('estimateTokens', () => {
  it('should estimate tokens from word count', () => {
    const text = 'hello world foo bar';
    const tokens = estimateTokens(text);
    expect(tokens).toBe(Math.ceil(4 * 1.3)); // 6
  });

  it('should handle empty string', () => {
    expect(estimateTokens('')).toBe(0);
  });
});

describe('chunkContent', () => {
  it('should return a single chunk for short content', () => {
    const content = '## Hello\n\nThis is a short section.';
    const chunks = chunkContent(content);
    expect(chunks).toHaveLength(1);
    expect(chunks[0].chunkIndex).toBe(0);
    expect(chunks[0].hasCode).toBe(false);
  });

  it('should split by headings', () => {
    const content = `## Section One

Content for section one with enough words to pass the minimum token threshold for chunking to work correctly.

## Section Two

Content for section two also with enough words to pass the minimum token threshold for the chunking system.`;

    const chunks = chunkContent(content, { minTokens: 10 });
    expect(chunks.length).toBeGreaterThanOrEqual(2);
  });

  it('should detect code blocks', () => {
    const content = '## Code Example\n\n```javascript\nconst x = 1;\n```\n\nSome text after the code block.';
    const chunks = chunkContent(content);
    expect(chunks[0].hasCode).toBe(true);
  });

  it('should preserve heading info', () => {
    const content = `## My Heading

Some content under my heading with enough words.

## Another Heading

More content under another heading with enough words.`;

    const chunks = chunkContent(content, { minTokens: 5 });
    const headings = chunks.map(c => c.heading).filter(Boolean);
    expect(headings).toContain('My Heading');
  });

  it('should split large sections with overlap', () => {
    // Generate a section with many paragraphs
    const paragraphs = Array.from({ length: 20 }, (_, i) =>
      `Paragraph ${i}: This is a longer paragraph with sufficient content to test the chunking behavior and ensure it works correctly with overlapping text.`
    );
    const content = `## Large Section\n\n${paragraphs.join('\n\n')}`;

    const chunks = chunkContent(content, { maxTokens: 100, overlapTokens: 20, minTokens: 10 });
    expect(chunks.length).toBeGreaterThan(1);

    // Verify chunk indices are sequential
    for (let i = 0; i < chunks.length; i++) {
      expect(chunks[i].chunkIndex).toBe(i);
    }
  });
});
