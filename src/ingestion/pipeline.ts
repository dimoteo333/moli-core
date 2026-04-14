import { readFileSync } from 'fs';
import { join, relative } from 'path';
import { glob } from 'glob';
import type Database from 'better-sqlite3';
import type { EmbeddingService, DocSection, DocChunk } from '../shared/types.js';
import { loadManifest } from './bundle-manifest.js';
import { parseMarkdownFile } from './parsers/markdown-parser.js';
import { extractMetadata } from './metadata-extractor.js';
import { chunkContent } from './chunker.js';
import { LibraryRepository } from '../db/repositories/library-repo.js';
import { SectionRepository } from '../db/repositories/section-repo.js';
import { ChunkRepository } from '../db/repositories/chunk-repo.js';
import { logger } from '../shared/logger.js';
import type { MoliCoreConfig } from '../shared/config.js';

export interface IngestionResult {
  libraryId: string;
  version: string;
  sectionsImported: number;
  chunksCreated: number;
  embeddingsGenerated: number;
}

export async function ingestBundle(
  bundleDir: string,
  db: Database.Database,
  config: MoliCoreConfig,
  embeddingService?: EmbeddingService,
): Promise<IngestionResult> {
  const manifest = loadManifest(bundleDir);
  const { library, docs } = manifest;

  logger.info('Starting ingestion', { library: library.id, version: library.version });

  const libraryRepo = new LibraryRepository(db);
  const sectionRepo = new SectionRepository(db);
  const chunkRepo = new ChunkRepository(db);

  // Clear existing data for this library/version
  chunkRepo.deleteByLibrary(library.id, library.version);
  sectionRepo.deleteByLibrary(library.id, library.version);

  // Upsert library record
  libraryRepo.upsert({
    id: library.id,
    name: library.name,
    version: library.version,
    description: library.description ?? null,
    sourceUrl: library.sourceUrl ?? null,
  });

  // Collect all doc files
  const docsBaseDir = join(bundleDir, docs.baseDir);
  let totalSections = 0;
  let totalChunks = 0;
  let totalEmbeddings = 0;

  for (const structure of docs.structure) {
    const files = glob.sync(structure.glob, { cwd: docsBaseDir });
    logger.info('Found doc files', { pattern: structure.glob, count: files.length, category: structure.category });

    let sortOrder = 0;
    for (const file of files) {
      const fullPath = join(docsBaseDir, file);
      const content = readFileSync(fullPath, 'utf-8');

      if (!content.trim()) continue;

      // Parse markdown
      const relativePath = relative(docsBaseDir, fullPath);
      const parsed = parseMarkdownFile(content, relativePath, library.id);

      // Extract metadata
      const metadata = extractMetadata(parsed, structure.category);

      // Store section
      const sectionId = sectionRepo.insert({
        libraryId: library.id,
        version: library.version,
        slug: parsed.slug,
        title: parsed.title,
        content: parsed.content,
        parentSlug: parsed.parentSlug,
        sortOrder: sortOrder++,
        metadata: JSON.stringify(metadata),
      });
      totalSections++;

      // Chunk the content
      const chunks = chunkContent(parsed.content, {
        maxTokens: config.chunkMaxTokens,
        overlapTokens: config.chunkOverlapTokens,
      });

      // Store chunks
      const chunkRecords: Omit<DocChunk, 'id'>[] = chunks.map(c => ({
        sectionId,
        libraryId: library.id,
        version: library.version,
        chunkIndex: c.chunkIndex,
        content: c.content,
        tokenCount: c.tokenCount,
        heading: c.heading,
        hasCode: c.hasCode,
        metadata: JSON.stringify({ category: structure.category }),
      }));

      const chunkIds = chunkRepo.insertMany(chunkRecords);
      totalChunks += chunkIds.length;

      // Generate embeddings if service is available
      if (embeddingService) {
        const texts = chunks.map(c => c.content);
        try {
          const embeddings = await embeddingService.embedBatch(texts);
          const entries = chunkIds.map((id, i) => ({
            chunkId: id,
            embedding: embeddings[i],
          }));
          chunkRepo.insertEmbeddingsBatch(entries);
          totalEmbeddings += entries.length;
        } catch (err) {
          logger.warn('Embedding generation failed for section', {
            section: parsed.slug,
            error: String(err),
          });
        }
      }
    }
  }

  logger.info('Ingestion complete', {
    library: library.id,
    version: library.version,
    sections: totalSections,
    chunks: totalChunks,
    embeddings: totalEmbeddings,
  });

  return {
    libraryId: library.id,
    version: library.version,
    sectionsImported: totalSections,
    chunksCreated: totalChunks,
    embeddingsGenerated: totalEmbeddings,
  };
}
