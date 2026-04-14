import type Database from 'better-sqlite3';
import type { DocChunk } from '../../shared/types.js';

export class ChunkRepository {
  constructor(private db: Database.Database) {}

  insertMany(chunks: Omit<DocChunk, 'id'>[]): number[] {
    const stmt = this.db.prepare(`
      INSERT INTO doc_chunks (section_id, library_id, version, chunk_index, content, token_count, heading, has_code, metadata)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const ids: number[] = [];
    const tx = this.db.transaction((items: Omit<DocChunk, 'id'>[]) => {
      for (const c of items) {
        const result = stmt.run(
          c.sectionId, c.libraryId, c.version, c.chunkIndex,
          c.content, c.tokenCount, c.heading, c.hasCode ? 1 : 0, c.metadata
        );
        ids.push(result.lastInsertRowid as number);
      }
    });

    tx(chunks);
    return ids;
  }

  getById(id: number): DocChunk | undefined {
    const row = this.db.prepare(`
      SELECT id, section_id AS sectionId, library_id AS libraryId, version, chunk_index AS chunkIndex,
             content, token_count AS tokenCount, heading, has_code AS hasCode, metadata
      FROM doc_chunks WHERE id = ?
    `).get(id) as Record<string, unknown> | undefined;
    if (!row) return undefined;
    return { ...row, hasCode: Boolean(row.hasCode) } as DocChunk;
  }

  getBySection(sectionId: number): DocChunk[] {
    const rows = this.db.prepare(`
      SELECT id, section_id AS sectionId, library_id AS libraryId, version, chunk_index AS chunkIndex,
             content, token_count AS tokenCount, heading, has_code AS hasCode, metadata
      FROM doc_chunks WHERE section_id = ? ORDER BY chunk_index
    `).all(sectionId) as Record<string, unknown>[];
    return rows.map(r => ({ ...r, hasCode: Boolean(r.hasCode) }) as DocChunk);
  }

  insertEmbedding(chunkId: number, embedding: Float32Array): void {
    try {
      this.db.prepare(
        'INSERT INTO doc_chunks_vec (chunk_id, embedding) VALUES (?, ?)'
      ).run(chunkId, Buffer.from(embedding.buffer));
    } catch {
      // sqlite-vec may not be available
    }
  }

  insertEmbeddingsBatch(entries: Array<{ chunkId: number; embedding: Float32Array }>): void {
    try {
      const stmt = this.db.prepare(
        'INSERT INTO doc_chunks_vec (chunk_id, embedding) VALUES (?, ?)'
      );
      const tx = this.db.transaction((items: typeof entries) => {
        for (const { chunkId, embedding } of items) {
          stmt.run(chunkId, Buffer.from(embedding.buffer));
        }
      });
      tx(entries);
    } catch {
      // sqlite-vec may not be available
    }
  }

  deleteByLibrary(libraryId: string, version: string): void {
    // Delete embeddings first (referencing chunks that will be deleted)
    try {
      this.db.prepare(`
        DELETE FROM doc_chunks_vec WHERE chunk_id IN (
          SELECT id FROM doc_chunks WHERE library_id = ? AND version = ?
        )
      `).run(libraryId, version);
    } catch {
      // sqlite-vec may not be available
    }

    this.db.prepare('DELETE FROM doc_chunks WHERE library_id = ? AND version = ?').run(libraryId, version);
  }

  countByLibrary(libraryId: string, version?: string): number {
    if (version) {
      const row = this.db.prepare(
        'SELECT COUNT(*) AS count FROM doc_chunks WHERE library_id = ? AND version = ?'
      ).get(libraryId, version) as { count: number };
      return row.count;
    }
    const row = this.db.prepare(
      'SELECT COUNT(*) AS count FROM doc_chunks WHERE library_id = ?'
    ).get(libraryId) as { count: number };
    return row.count;
  }
}
