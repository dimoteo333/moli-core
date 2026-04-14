import { describe, it, expect, beforeAll } from 'vitest';
import { join } from 'path';
import Database from 'better-sqlite3';
import { initializeSchema } from '../../src/db/schema.js';
import { ingestBundle } from '../../src/ingestion/pipeline.js';
import { loadConfig } from '../../src/shared/config.js';
import { HybridSearch } from '../../src/search/hybrid-search.js';

const FIXTURES_DIR = join(import.meta.dirname, '..', 'fixtures', 'sample-docs');

describe('Search Integration', () => {
  let db: Database.Database;
  let search: HybridSearch;

  beforeAll(async () => {
    db = new Database(':memory:');
    initializeSchema(db, false);

    const config = loadConfig({ embeddingsEnabled: false });
    await ingestBundle(FIXTURES_DIR, db, config);

    search = new HybridSearch(db, null, {
      rrfK: 60,
      ftsWeight: 1.0,
      vecWeight: 1.0,
      defaultLimit: 10,
      maxLimit: 50,
    });
  });

  it('should find results for "useState"', async () => {
    const results = await search.search({
      query: 'useState',
      libraryId: 'react',
      version: '19.1',
    });

    expect(results.length).toBeGreaterThan(0);
    // Should find hooks-related content
    const hasHooksResult = results.some(r =>
      r.content.includes('useState') || r.sectionSlug.includes('hook')
    );
    expect(hasHooksResult).toBe(true);
  });

  it('should find results for "component"', async () => {
    const results = await search.search({
      query: 'component props children',
      libraryId: 'react',
      version: '19.1',
    });

    expect(results.length).toBeGreaterThan(0);
  });

  it('should return empty for non-existent library', async () => {
    const results = await search.search({
      query: 'anything',
      libraryId: 'nonexistent',
      version: '1.0',
    });

    expect(results).toHaveLength(0);
  });

  it('should respect limit', async () => {
    const results = await search.search({
      query: 'react',
      libraryId: 'react',
      version: '19.1',
      limit: 2,
    });

    expect(results.length).toBeLessThanOrEqual(2);
  });

  it('should include section metadata', async () => {
    const results = await search.search({
      query: 'useState hook',
      libraryId: 'react',
      version: '19.1',
      limit: 1,
    });

    if (results.length > 0) {
      expect(results[0].sectionSlug).toBeDefined();
      expect(results[0].sectionTitle).toBeDefined();
      expect(results[0].score).toBeGreaterThan(0);
    }
  });
});
