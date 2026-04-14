import type Database from 'better-sqlite3';
import type { DocSection } from '../../shared/types.js';

export class SectionRepository {
  constructor(private db: Database.Database) {}

  insert(section: Omit<DocSection, 'id'>): number {
    const result = this.db.prepare(`
      INSERT INTO doc_sections (library_id, version, slug, title, content, parent_slug, sort_order, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      section.libraryId,
      section.version,
      section.slug,
      section.title,
      section.content,
      section.parentSlug,
      section.sortOrder,
      section.metadata
    );
    return result.lastInsertRowid as number;
  }

  insertMany(sections: Omit<DocSection, 'id'>[]): number[] {
    const stmt = this.db.prepare(`
      INSERT INTO doc_sections (library_id, version, slug, title, content, parent_slug, sort_order, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const ids: number[] = [];
    const tx = this.db.transaction((items: Omit<DocSection, 'id'>[]) => {
      for (const s of items) {
        const result = stmt.run(s.libraryId, s.version, s.slug, s.title, s.content, s.parentSlug, s.sortOrder, s.metadata);
        ids.push(result.lastInsertRowid as number);
      }
    });

    tx(sections);
    return ids;
  }

  getBySlug(libraryId: string, slug: string, version?: string): DocSection | undefined {
    if (version) {
      return this.db.prepare(`
        SELECT id, library_id AS libraryId, version, slug, title, content, parent_slug AS parentSlug,
               sort_order AS sortOrder, metadata
        FROM doc_sections WHERE library_id = ? AND slug = ? AND version = ?
      `).get(libraryId, slug, version) as DocSection | undefined;
    }
    return this.db.prepare(`
      SELECT id, library_id AS libraryId, version, slug, title, content, parent_slug AS parentSlug,
             sort_order AS sortOrder, metadata
      FROM doc_sections WHERE library_id = ? AND slug = ?
      ORDER BY created_at DESC LIMIT 1
    `).get(libraryId, slug) as DocSection | undefined;
  }

  getById(id: number): DocSection | undefined {
    return this.db.prepare(`
      SELECT id, library_id AS libraryId, version, slug, title, content, parent_slug AS parentSlug,
             sort_order AS sortOrder, metadata
      FROM doc_sections WHERE id = ?
    `).get(id) as DocSection | undefined;
  }

  listByLibrary(libraryId: string, version?: string): DocSection[] {
    if (version) {
      return this.db.prepare(`
        SELECT id, library_id AS libraryId, version, slug, title, content, parent_slug AS parentSlug,
               sort_order AS sortOrder, metadata
        FROM doc_sections WHERE library_id = ? AND version = ?
        ORDER BY sort_order, slug
      `).all(libraryId, version) as DocSection[];
    }
    return this.db.prepare(`
      SELECT id, library_id AS libraryId, version, slug, title, content, parent_slug AS parentSlug,
             sort_order AS sortOrder, metadata
      FROM doc_sections WHERE library_id = ?
      ORDER BY sort_order, slug
    `).all(libraryId) as DocSection[];
  }

  listAll(): DocSection[] {
    return this.db.prepare(`
      SELECT id, library_id AS libraryId, version, slug, title, content, parent_slug AS parentSlug,
             sort_order AS sortOrder, metadata
      FROM doc_sections ORDER BY library_id, version, sort_order, slug
    `).all() as DocSection[];
  }

  deleteByLibrary(libraryId: string, version: string): void {
    this.db.prepare('DELETE FROM doc_sections WHERE library_id = ? AND version = ?').run(libraryId, version);
  }
}
