import type Database from 'better-sqlite3';
import type { Library } from '../../shared/types.js';

export class LibraryRepository {
  constructor(private db: Database.Database) {}

  upsert(lib: Omit<Library, 'importedAt'>): void {
    this.db.prepare(`
      INSERT INTO libraries (id, name, version, description, source_url)
      VALUES (?, ?, ?, ?, ?)
      ON CONFLICT(id, version) DO UPDATE SET
        name = excluded.name,
        description = excluded.description,
        source_url = excluded.source_url,
        imported_at = datetime('now')
    `).run(lib.id, lib.name, lib.version, lib.description, lib.sourceUrl);
  }

  getById(id: string, version?: string): Library | undefined {
    if (version) {
      return this.db.prepare(
        'SELECT id, name, version, description, source_url AS sourceUrl, imported_at AS importedAt FROM libraries WHERE id = ? AND version = ?'
      ).get(id, version) as Library | undefined;
    }
    // Return latest version
    return this.db.prepare(
      'SELECT id, name, version, description, source_url AS sourceUrl, imported_at AS importedAt FROM libraries WHERE id = ? ORDER BY imported_at DESC LIMIT 1'
    ).get(id) as Library | undefined;
  }

  resolve(nameOrAlias: string): Library | undefined {
    const normalized = nameOrAlias.toLowerCase().trim();
    // Exact match on id
    const exact = this.db.prepare(
      'SELECT id, name, version, description, source_url AS sourceUrl, imported_at AS importedAt FROM libraries WHERE LOWER(id) = ? ORDER BY imported_at DESC LIMIT 1'
    ).get(normalized) as Library | undefined;
    if (exact) return exact;

    // Fuzzy match on name
    return this.db.prepare(
      'SELECT id, name, version, description, source_url AS sourceUrl, imported_at AS importedAt FROM libraries WHERE LOWER(name) LIKE ? ORDER BY imported_at DESC LIMIT 1'
    ).get(`%${normalized}%`) as Library | undefined;
  }

  listAll(): Library[] {
    return this.db.prepare(
      'SELECT id, name, version, description, source_url AS sourceUrl, imported_at AS importedAt FROM libraries ORDER BY id, version'
    ).all() as Library[];
  }

  getVersions(id: string): string[] {
    const rows = this.db.prepare(
      'SELECT version FROM libraries WHERE id = ? ORDER BY imported_at DESC'
    ).all(id) as { version: string }[];
    return rows.map(r => r.version);
  }

  getLatestVersion(id: string): string | undefined {
    const row = this.db.prepare(
      'SELECT version FROM libraries WHERE id = ? ORDER BY imported_at DESC LIMIT 1'
    ).get(id) as { version: string } | undefined;
    return row?.version;
  }

  delete(id: string, version: string): void {
    this.db.prepare('DELETE FROM libraries WHERE id = ? AND version = ?').run(id, version);
  }
}
