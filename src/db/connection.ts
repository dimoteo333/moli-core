import Database from 'better-sqlite3';
import * as sqliteVec from 'sqlite-vec';
import { initializeSchema } from './schema.js';
import { logger } from '../shared/logger.js';

let db: Database.Database | null = null;

export interface ConnectionOptions {
  dbPath: string;
  enableVec?: boolean;
}

export function getDatabase(options?: ConnectionOptions): Database.Database {
  if (db) return db;

  const dbPath = options?.dbPath ?? ':memory:';
  const enableVec = options?.enableVec ?? true;

  db = new Database(dbPath);
  logger.info('Database opened', { path: dbPath });

  if (enableVec) {
    try {
      sqliteVec.load(db);
      logger.info('sqlite-vec extension loaded');
    } catch (err) {
      logger.warn('sqlite-vec extension failed to load, vector search disabled', {
        error: String(err),
      });
    }
  }

  initializeSchema(db, enableVec);
  logger.info('Schema initialized');

  return db;
}

export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
    logger.info('Database closed');
  }
}

export function createDatabase(dbPath: string, enableVec: boolean = true): Database.Database {
  const instance = new Database(dbPath);

  if (enableVec) {
    try {
      sqliteVec.load(instance);
    } catch {
      // Vector search disabled
    }
  }

  initializeSchema(instance, enableVec);
  return instance;
}
