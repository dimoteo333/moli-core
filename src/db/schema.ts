import type Database from 'better-sqlite3';

const DDL = `
CREATE TABLE IF NOT EXISTS schema_meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS libraries (
  id          TEXT NOT NULL,
  name        TEXT NOT NULL,
  version     TEXT NOT NULL,
  description TEXT,
  source_url  TEXT,
  imported_at TEXT NOT NULL DEFAULT (datetime('now')),
  PRIMARY KEY (id, version)
);

CREATE TABLE IF NOT EXISTS doc_sections (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  library_id  TEXT NOT NULL,
  version     TEXT NOT NULL,
  slug        TEXT NOT NULL,
  title       TEXT NOT NULL,
  content     TEXT NOT NULL,
  parent_slug TEXT,
  sort_order  INTEGER DEFAULT 0,
  metadata    TEXT DEFAULT '{}',
  created_at  TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(library_id, version, slug)
);

CREATE INDEX IF NOT EXISTS idx_sections_library ON doc_sections(library_id, version);

CREATE TABLE IF NOT EXISTS doc_chunks (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  section_id  INTEGER NOT NULL,
  library_id  TEXT NOT NULL,
  version     TEXT NOT NULL,
  chunk_index INTEGER NOT NULL,
  content     TEXT NOT NULL,
  token_count INTEGER NOT NULL,
  heading     TEXT,
  has_code    INTEGER DEFAULT 0,
  metadata    TEXT DEFAULT '{}',
  FOREIGN KEY (section_id) REFERENCES doc_sections(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_chunks_section ON doc_chunks(section_id);
CREATE INDEX IF NOT EXISTS idx_chunks_library ON doc_chunks(library_id, version);

CREATE VIRTUAL TABLE IF NOT EXISTS doc_chunks_fts USING fts5(
  content,
  heading,
  library_id UNINDEXED,
  version UNINDEXED,
  content=doc_chunks,
  content_rowid=id,
  tokenize='porter unicode61 remove_diacritics 2'
);

CREATE TRIGGER IF NOT EXISTS doc_chunks_ai AFTER INSERT ON doc_chunks BEGIN
  INSERT INTO doc_chunks_fts(rowid, content, heading, library_id, version)
  VALUES (new.id, new.content, new.heading, new.library_id, new.version);
END;

CREATE TRIGGER IF NOT EXISTS doc_chunks_ad AFTER DELETE ON doc_chunks BEGIN
  INSERT INTO doc_chunks_fts(doc_chunks_fts, rowid, content, heading, library_id, version)
  VALUES ('delete', old.id, old.content, old.heading, old.library_id, old.version);
END;

CREATE TRIGGER IF NOT EXISTS doc_chunks_au AFTER UPDATE ON doc_chunks BEGIN
  INSERT INTO doc_chunks_fts(doc_chunks_fts, rowid, content, heading, library_id, version)
  VALUES ('delete', old.id, old.content, old.heading, old.library_id, old.version);
  INSERT INTO doc_chunks_fts(rowid, content, heading, library_id, version)
  VALUES (new.id, new.content, new.heading, new.library_id, new.version);
END;
`;

// sqlite-vec table created separately since it requires the extension
const VEC_DDL = `
CREATE VIRTUAL TABLE IF NOT EXISTS doc_chunks_vec USING vec0(
  chunk_id INTEGER PRIMARY KEY,
  embedding float[384]
);
`;

export function initializeSchema(db: Database.Database, enableVec: boolean = true): void {
  db.exec('PRAGMA journal_mode = WAL');
  db.exec('PRAGMA foreign_keys = ON');
  db.exec(DDL);

  if (enableVec) {
    try {
      db.exec(VEC_DDL);
    } catch {
      // sqlite-vec extension may not be loaded; vector search disabled
    }
  }

  // Set schema version
  db.prepare(
    "INSERT OR IGNORE INTO schema_meta (key, value) VALUES ('version', '1')"
  ).run();
}
