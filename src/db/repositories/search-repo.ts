import type Database from 'better-sqlite3';

export interface FtsResult {
  chunkId: number;
  sectionId: number;
  content: string;
  heading: string | null;
  libraryId: string;
  version: string;
  hasCode: boolean;
  ftsRank: number;
}

export interface VecResult {
  chunkId: number;
  distance: number;
}

export class SearchRepository {
  constructor(private db: Database.Database) {}

  ftsSearch(query: string, libraryId: string, version: string, limit: number): FtsResult[] {
    const ftsQuery = this.preprocessFtsQuery(query);
    if (!ftsQuery) return [];

    const rows = this.db.prepare(`
      SELECT
        c.id AS chunkId,
        c.section_id AS sectionId,
        c.content,
        c.heading,
        c.library_id AS libraryId,
        c.version,
        c.has_code AS hasCode,
        fts.rank AS ftsRank
      FROM doc_chunks_fts fts
      JOIN doc_chunks c ON c.id = fts.rowid
      WHERE doc_chunks_fts MATCH ?
        AND c.library_id = ?
        AND c.version = ?
      ORDER BY fts.rank
      LIMIT ?
    `).all(ftsQuery, libraryId, version, limit) as Record<string, unknown>[];

    return rows.map(r => ({ ...r, hasCode: Boolean(r.hasCode) }) as FtsResult);
  }

  vectorSearch(queryEmbedding: Float32Array, libraryId: string, version: string, limit: number): VecResult[] {
    try {
      // Get chunk IDs for this library/version, then do KNN
      const rows = this.db.prepare(`
        SELECT
          v.chunk_id AS chunkId,
          v.distance
        FROM doc_chunks_vec v
        WHERE v.embedding MATCH ?
          AND v.chunk_id IN (
            SELECT id FROM doc_chunks WHERE library_id = ? AND version = ?
          )
        ORDER BY v.distance
        LIMIT ?
      `).all(Buffer.from(queryEmbedding.buffer), libraryId, version, limit) as VecResult[];

      return rows;
    } catch {
      return [];
    }
  }

  getChunkWithSection(chunkId: number): {
    chunkId: number;
    sectionId: number;
    content: string;
    heading: string | null;
    libraryId: string;
    version: string;
    hasCode: boolean;
    sectionSlug: string;
    sectionTitle: string;
  } | undefined {
    const row = this.db.prepare(`
      SELECT
        c.id AS chunkId,
        c.section_id AS sectionId,
        c.content,
        c.heading,
        c.library_id AS libraryId,
        c.version,
        c.has_code AS hasCode,
        s.slug AS sectionSlug,
        s.title AS sectionTitle
      FROM doc_chunks c
      JOIN doc_sections s ON s.id = c.section_id
      WHERE c.id = ?
    `).get(chunkId) as any;

    if (!row) return undefined;
    return { ...row, hasCode: Boolean(row.hasCode) };
  }

  private preprocessFtsQuery(query: string): string {
    // Strip special characters that break FTS5 syntax, keep quoted phrases
    const cleaned = query
      .replace(/[^\w\s"'-]/g, ' ')
      .trim();

    if (!cleaned) return '';

    // Split into tokens and join with implicit AND (space = AND in FTS5)
    const tokens = cleaned
      .split(/\s+/)
      .filter(t => t.length > 0);

    return tokens.join(' ');
  }
}
