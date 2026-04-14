import { describe, it, expect, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { initializeSchema } from '../../../src/db/schema.js';
import { SectionRepository } from '../../../src/db/repositories/section-repo.js';
import { LibraryRepository } from '../../../src/db/repositories/library-repo.js';

describe('SectionRepository', () => {
  let db: Database.Database;
  let repo: SectionRepository;

  beforeEach(() => {
    db = new Database(':memory:');
    initializeSchema(db, false);
    const libRepo = new LibraryRepository(db);
    libRepo.upsert({ id: 'react', name: 'React', version: '19.1', description: null, sourceUrl: null });
    repo = new SectionRepository(db);
  });

  it('should insert and retrieve a section', () => {
    const id = repo.insert({
      libraryId: 'react',
      version: '19.1',
      slug: 'hooks/use-state',
      title: 'useState',
      content: '# useState\n\nHook for state.',
      parentSlug: 'hooks',
      sortOrder: 0,
      metadata: '{"category": "API"}',
    });

    expect(id).toBeGreaterThan(0);

    const section = repo.getBySlug('react', 'hooks/use-state', '19.1');
    expect(section).toBeDefined();
    expect(section!.title).toBe('useState');
    expect(section!.parentSlug).toBe('hooks');
  });

  it('should list sections by library', () => {
    repo.insert({
      libraryId: 'react', version: '19.1', slug: 'intro', title: 'Intro',
      content: 'intro', parentSlug: null, sortOrder: 0, metadata: '{}',
    });
    repo.insert({
      libraryId: 'react', version: '19.1', slug: 'hooks', title: 'Hooks',
      content: 'hooks', parentSlug: null, sortOrder: 1, metadata: '{}',
    });

    const sections = repo.listByLibrary('react', '19.1');
    expect(sections).toHaveLength(2);
  });

  it('should delete by library', () => {
    repo.insert({
      libraryId: 'react', version: '19.1', slug: 'intro', title: 'Intro',
      content: 'intro', parentSlug: null, sortOrder: 0, metadata: '{}',
    });

    repo.deleteByLibrary('react', '19.1');
    const sections = repo.listByLibrary('react', '19.1');
    expect(sections).toHaveLength(0);
  });
});
