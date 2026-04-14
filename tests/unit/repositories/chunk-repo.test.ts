import { describe, it, expect, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { initializeSchema } from '../../../src/db/schema.js';
import { ChunkRepository } from '../../../src/db/repositories/chunk-repo.js';
import { SectionRepository } from '../../../src/db/repositories/section-repo.js';
import { LibraryRepository } from '../../../src/db/repositories/library-repo.js';

describe('ChunkRepository', () => {
  let db: Database.Database;
  let chunkRepo: ChunkRepository;
  let sectionId: number;

  beforeEach(() => {
    db = new Database(':memory:');
    initializeSchema(db, false);

    const libRepo = new LibraryRepository(db);
    libRepo.upsert({ id: 'react', name: 'React', version: '19.1', description: null, sourceUrl: null });

    const sectionRepo = new SectionRepository(db);
    sectionId = sectionRepo.insert({
      libraryId: 'react', version: '19.1', slug: 'hooks', title: 'Hooks',
      content: 'hooks content', parentSlug: null, sortOrder: 0, metadata: '{}',
    });

    chunkRepo = new ChunkRepository(db);
  });

  it('should insert and retrieve chunks', () => {
    const ids = chunkRepo.insertMany([
      {
        sectionId, libraryId: 'react', version: '19.1', chunkIndex: 0,
        content: 'chunk 0 content', tokenCount: 10, heading: 'Hooks', hasCode: false, metadata: '{}',
      },
      {
        sectionId, libraryId: 'react', version: '19.1', chunkIndex: 1,
        content: 'chunk 1 with code', tokenCount: 15, heading: 'useState', hasCode: true, metadata: '{}',
      },
    ]);

    expect(ids).toHaveLength(2);

    const chunk = chunkRepo.getById(ids[0]);
    expect(chunk).toBeDefined();
    expect(chunk!.content).toBe('chunk 0 content');
    expect(chunk!.hasCode).toBe(false);

    const chunk1 = chunkRepo.getById(ids[1]);
    expect(chunk1!.hasCode).toBe(true);
  });

  it('should get chunks by section', () => {
    chunkRepo.insertMany([
      { sectionId, libraryId: 'react', version: '19.1', chunkIndex: 0, content: 'a', tokenCount: 1, heading: null, hasCode: false, metadata: '{}' },
      { sectionId, libraryId: 'react', version: '19.1', chunkIndex: 1, content: 'b', tokenCount: 1, heading: null, hasCode: false, metadata: '{}' },
    ]);

    const chunks = chunkRepo.getBySection(sectionId);
    expect(chunks).toHaveLength(2);
    expect(chunks[0].chunkIndex).toBe(0);
    expect(chunks[1].chunkIndex).toBe(1);
  });

  it('should count by library', () => {
    chunkRepo.insertMany([
      { sectionId, libraryId: 'react', version: '19.1', chunkIndex: 0, content: 'a', tokenCount: 1, heading: null, hasCode: false, metadata: '{}' },
    ]);

    expect(chunkRepo.countByLibrary('react', '19.1')).toBe(1);
    expect(chunkRepo.countByLibrary('react')).toBe(1);
    expect(chunkRepo.countByLibrary('nonexistent')).toBe(0);
  });
});
