import { describe, it, expect, beforeEach } from 'vitest';
import { join } from 'path';
import Database from 'better-sqlite3';
import { initializeSchema } from '../../src/db/schema.js';
import { ingestBundle } from '../../src/ingestion/pipeline.js';
import { loadConfig } from '../../src/shared/config.js';
import { LibraryRepository } from '../../src/db/repositories/library-repo.js';
import { SectionRepository } from '../../src/db/repositories/section-repo.js';
import { ChunkRepository } from '../../src/db/repositories/chunk-repo.js';

const FIXTURES_DIR = join(import.meta.dirname, '..', 'fixtures', 'sample-docs');

describe('Ingestion Pipeline', () => {
  let db: Database.Database;

  beforeEach(() => {
    db = new Database(':memory:');
    initializeSchema(db, false);
  });

  it('should ingest a documentation bundle', async () => {
    const config = loadConfig({ embeddingsEnabled: false });
    const result = await ingestBundle(FIXTURES_DIR, db, config);

    expect(result.libraryId).toBe('react');
    expect(result.version).toBe('19.1');
    expect(result.sectionsImported).toBe(3); // getting-started, hooks, components
    expect(result.chunksCreated).toBeGreaterThan(0);
    expect(result.embeddingsGenerated).toBe(0);
  });

  it('should populate library table', async () => {
    const config = loadConfig({ embeddingsEnabled: false });
    await ingestBundle(FIXTURES_DIR, db, config);

    const libRepo = new LibraryRepository(db);
    const lib = libRepo.getById('react');
    expect(lib).toBeDefined();
    expect(lib!.name).toBe('React');
  });

  it('should populate sections table', async () => {
    const config = loadConfig({ embeddingsEnabled: false });
    await ingestBundle(FIXTURES_DIR, db, config);

    const sectionRepo = new SectionRepository(db);
    const sections = sectionRepo.listByLibrary('react', '19.1');
    expect(sections).toHaveLength(3);

    const slugs = sections.map(s => s.slug);
    expect(slugs).toContain('getting-started');
    expect(slugs).toContain('hooks');
    expect(slugs).toContain('components');
  });

  it('should create searchable chunks', async () => {
    const config = loadConfig({ embeddingsEnabled: false });
    await ingestBundle(FIXTURES_DIR, db, config);

    const chunkRepo = new ChunkRepository(db);
    const count = chunkRepo.countByLibrary('react', '19.1');
    expect(count).toBeGreaterThan(0);
  });

  it('should support re-import (replace existing data)', async () => {
    const config = loadConfig({ embeddingsEnabled: false });

    // Import twice
    await ingestBundle(FIXTURES_DIR, db, config);
    const result2 = await ingestBundle(FIXTURES_DIR, db, config);

    // Should have same counts (replaced, not duplicated)
    const sectionRepo = new SectionRepository(db);
    const sections = sectionRepo.listByLibrary('react', '19.1');
    expect(sections).toHaveLength(result2.sectionsImported);
  });
});
