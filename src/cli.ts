#!/usr/bin/env node
import { Command } from 'commander';
import { mkdirSync } from 'fs';
import { dirname, resolve } from 'path';
import { loadConfig } from './shared/config.js';
import { setLogLevel, logger } from './shared/logger.js';
import { createDatabase } from './db/connection.js';
import { ingestBundle } from './ingestion/pipeline.js';
import { LibraryRepository } from './db/repositories/library-repo.js';
import { ChunkRepository } from './db/repositories/chunk-repo.js';
import { HybridSearch } from './search/hybrid-search.js';

const program = new Command();

program
  .name('molicore')
  .description('MoliCore - Offline MCP documentation server')
  .version('1.0.0');

program
  .command('import')
  .description('Import a documentation bundle')
  .argument('<bundle-dir>', 'Path to the bundle directory containing manifest.json')
  .option('--no-embeddings', 'Skip embedding generation')
  .action(async (bundleDir: string, opts: { embeddings: boolean }) => {
    const config = loadConfig({ embeddingsEnabled: opts.embeddings });
    setLogLevel(config.logLevel);
    mkdirSync(dirname(config.dbPath), { recursive: true });

    const db = createDatabase(config.dbPath, config.embeddingsEnabled);

    let embeddingService = null;
    if (config.embeddingsEnabled) {
      try {
        const { createEmbeddingService } = await import('./embeddings/embedding-service.js');
        embeddingService = await createEmbeddingService(
          config.embeddingModel,
          config.embeddingDimensions,
          config.modelsDir,
        );
      } catch {
        console.log('Embedding service not available, proceeding without embeddings');
      }
    }

    const result = await ingestBundle(resolve(bundleDir), db, config, embeddingService ?? undefined);

    console.log(`\nImport complete:`);
    console.log(`  Library: ${result.libraryId} v${result.version}`);
    console.log(`  Sections: ${result.sectionsImported}`);
    console.log(`  Chunks: ${result.chunksCreated}`);
    console.log(`  Embeddings: ${result.embeddingsGenerated}`);

    db.close();
  });

program
  .command('list')
  .description('List all imported libraries')
  .action(() => {
    const config = loadConfig();
    const db = createDatabase(config.dbPath, false);
    const repo = new LibraryRepository(db);
    const chunkRepo = new ChunkRepository(db);
    const libs = repo.listAll();

    if (libs.length === 0) {
      console.log('No libraries imported. Use "molicore import <bundle-dir>" to add documentation.');
      db.close();
      return;
    }

    console.log('Imported libraries:\n');
    for (const lib of libs) {
      const chunkCount = chunkRepo.countByLibrary(lib.id, lib.version);
      console.log(`  ${lib.id} v${lib.version} - ${lib.name}`);
      console.log(`    ${chunkCount} chunks | Imported: ${lib.importedAt}`);
      if (lib.description) console.log(`    ${lib.description}`);
      console.log();
    }

    db.close();
  });

program
  .command('search')
  .description('Search documentation')
  .argument('<query>', 'Search query')
  .requiredOption('--library <id>', 'Library ID to search')
  .option('--version <v>', 'Specific version')
  .option('--limit <n>', 'Max results', '5')
  .action(async (query: string, opts: { library: string; version?: string; limit: string }) => {
    const config = loadConfig({ embeddingsEnabled: false });
    const db = createDatabase(config.dbPath, false);

    const search = new HybridSearch(db, null, {
      rrfK: config.rrfK,
      ftsWeight: config.ftsWeight,
      vecWeight: config.vecWeight,
      defaultLimit: config.searchDefaultLimit,
      maxLimit: config.searchMaxLimit,
    });

    const results = await search.search({
      query,
      libraryId: opts.library,
      version: opts.version,
      limit: parseInt(opts.limit),
      searchMode: 'fts',
    });

    if (results.length === 0) {
      console.log('No results found.');
      db.close();
      return;
    }

    console.log(`Found ${results.length} results:\n`);
    for (const r of results) {
      console.log(`  [${r.sectionSlug}] ${r.sectionTitle}`);
      if (r.heading) console.log(`    Heading: ${r.heading}`);
      console.log(`    ${r.content.slice(0, 150).replace(/\n/g, ' ')}...`);
      console.log(`    Score: ${r.score.toFixed(6)} | Code: ${r.hasCode ? 'yes' : 'no'}`);
      console.log();
    }

    db.close();
  });

program
  .command('serve')
  .description('Start the MCP server')
  .option('--stdio', 'Use stdio transport')
  .option('--http', 'Use HTTP transport')
  .option('--port <port>', 'HTTP port (default: 3000)', '3000')
  .option('--host <host>', 'HTTP host (default: 0.0.0.0)', '0.0.0.0')
  .action(async (opts: { stdio?: boolean; http?: boolean; port: string; host: string }) => {
    if (opts.http) {
      process.env.MOLICORE_TRANSPORT = 'http';
      process.env.MOLICORE_PORT = opts.port;
      process.env.MOLICORE_HOST = opts.host;
    }
    await import('./index.js');
  });

program.parse();
