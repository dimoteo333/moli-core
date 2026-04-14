import { describe, it, expect } from 'vitest';
import { extractMetadata } from '../../src/ingestion/metadata-extractor.js';
import type { ParsedSection } from '../../src/shared/types.js';

describe('extractMetadata', () => {
  it('should detect hooks in content', () => {
    const section: ParsedSection = {
      title: 'useState Hook',
      slug: 'hooks/use-state',
      content: 'The useState hook lets you add state to components.',
      headings: ['useState Hook'],
      codeBlocks: [],
      parentSlug: 'hooks',
    };

    const meta = extractMetadata(section, 'API Reference');
    expect(meta.category).toBe('API Reference');
    expect(meta.tags).toContain('hooks');
    expect(meta.tags).toContain('state');
    expect(meta.hasCode).toBe(false);
  });

  it('should detect code blocks', () => {
    const section: ParsedSection = {
      title: 'Example',
      slug: 'example',
      content: 'Some component with props',
      headings: [],
      codeBlocks: ['const x = 1;'],
      parentSlug: null,
    };

    const meta = extractMetadata(section, 'Guide');
    expect(meta.hasCode).toBe(true);
  });

  it('should extract API references', () => {
    const section: ParsedSection = {
      title: 'Hooks',
      slug: 'hooks',
      content: 'Use useState and useEffect to manage state. The <Button> component accepts props.',
      headings: [],
      codeBlocks: [],
      parentSlug: null,
    };

    const meta = extractMetadata(section, 'Guide');
    expect(meta.apiRefs).toContain('useState');
    expect(meta.apiRefs).toContain('useEffect');
    expect(meta.apiRefs).toContain('Button');
  });
});
