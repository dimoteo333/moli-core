#!/usr/bin/env node
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { loadConfig } from './shared/config.js';
import { setLogLevel, logger } from './shared/logger.js';
import { getDatabase, closeDatabase } from './db/connection.js';
import { createMcpServer } from './server/mcp-server.js';
import { mkdirSync } from 'fs';
import { dirname } from 'path';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';

export async function createApp(transportMode: 'stdio' | 'http' = 'stdio', port = 3000, host = '0.0.0.0') {
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

  if (transportMode === 'stdio') {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    logger.info('MoliCore MCP server started', { transport: 'stdio' });
  } else {
    const httpTransport = new StreamableHTTPServerTransport({
      sessionIdGenerator: () => randomUUID(),
    });
    await server.connect(httpTransport);

    const httpServer = createServer(async (req, res) => {
      // CORS headers
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, Mcp-Session-Id');

      if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
      }

      // Only handle /mcp endpoint
      if (req.url?.split('?')[0] !== '/mcp') {
        res.writeHead(404);
        res.end('Not found. Use POST /mcp for MCP requests.');
        return;
      }

      // Parse body
      let body: unknown;
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
      }
      const raw = Buffer.concat(chunks).toString('utf-8');

      try {
        body = JSON.parse(raw);
      } catch {
        body = raw;
      }

      await httpTransport.handleRequest(req, res, body);
    });

    httpServer.listen(port, host, () => {
      logger.info('MoliCore MCP server started', {
        transport: 'http',
        url: `http://${host}:${port}/mcp`,
      });
    });

    return { server: httpServer, mcpServer: server };
  }
}

async function main(): Promise<void> {
  const config = loadConfig();
  const mode = config.transport;
  const { server: httpServer } = (await createApp(mode, config.port, config.host)) ?? {};

  // Graceful shutdown
  const shutdown = async () => {
    logger.info('Shutting down...');
    if (httpServer) httpServer.close();
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
