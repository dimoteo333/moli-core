#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { loadConfig } from './shared/config.js';
import { setLogLevel, logger } from './shared/logger.js';
import { getDatabase, closeDatabase } from './db/connection.js';
import { createMcpServer } from './server/mcp-server.js';
import { mkdirSync } from 'fs';
import { dirname } from 'path';

async function main(): Promise<void> {
  const config = loadConfig();
  setLogLevel(config.logLevel);

  // Ensure data directory exists
  mkdirSync(dirname(config.dbPath), { recursive: true });

  const db = getDatabase({ dbPath: config.dbPath, enableVec: config.embeddingsEnabled });

  // Create embedding service if enabled (optional, lazy)
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
      logger.info('Embedding service not available, using FTS-only search');
    }
  }

  const server = createMcpServer(db, config, embeddingService);

  // Use stdio transport
  const transport = new StdioServerTransport();
  await server.connect(transport);

  logger.info('MoliCore MCP server started', { transport: 'stdio' });

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down...');
    await server.close();
    closeDatabase();
    process.exit(0);
  };

  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
