import { describe, it, expect, beforeEach } from 'vitest';
import Database from 'better-sqlite3';
import { initializeSchema } from '../../../src/db/schema.js';
import { LibraryRepository } from '../../../src/db/repositories/library-repo.js';

describe('LibraryRepository', () => {
  let db: Database.Database;
  let repo: LibraryRepository;

  beforeEach(() => {
    db = new Database(':memory:');
    initializeSchema(db, false);
    repo = new LibraryRepository(db);
  });

  it('should upsert and retrieve a library', () => {
    repo.upsert({
      id: 'react',
      name: 'React',
      version: '19.1',
      description: 'UI library',
      sourceUrl: 'https://react.dev',
    });

    const lib = repo.getById('react');
    expect(lib).toBeDefined();
    expect(lib!.name).toBe('React');
    expect(lib!.version).toBe('19.1');
  });

  it('should list all libraries', () => {
    repo.upsert({ id: 'react', name: 'React', version: '19.1', description: null, sourceUrl: null });
    repo.upsert({ id: 'tailwindcss', name: 'Tailwind CSS', version: '4.0', description: null, sourceUrl: null });

    const libs = repo.listAll();
    expect(libs).toHaveLength(2);
  });

  it('should resolve by name', () => {
    repo.upsert({ id: 'shadcn-ui', name: 'shadcn/ui', version: '0.9', description: null, sourceUrl: null });

    const resolved = repo.resolve('shadcn');
    expect(resolved).toBeDefined();
    expect(resolved!.id).toBe('shadcn-ui');
  });

  it('should resolve by exact id', () => {
    repo.upsert({ id: 'react', name: 'React', version: '19.1', description: null, sourceUrl: null });

    const resolved = repo.resolve('react');
    expect(resolved).toBeDefined();
    expect(resolved!.id).toBe('react');
  });

  it('should get versions', () => {
    repo.upsert({ id: 'react', name: 'React', version: '18.0', description: null, sourceUrl: null });
    repo.upsert({ id: 'react', name: 'React', version: '19.1', description: null, sourceUrl: null });

    const versions = repo.getVersions('react');
    expect(versions).toContain('18.0');
    expect(versions).toContain('19.1');
  });

  it('should update on conflict', () => {
    repo.upsert({ id: 'react', name: 'React', version: '19.1', description: 'old', sourceUrl: null });
    repo.upsert({ id: 'react', name: 'React', version: '19.1', description: 'new', sourceUrl: null });

    const lib = repo.getById('react', '19.1');
    expect(lib!.description).toBe('new');
  });
});
