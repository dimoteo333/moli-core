import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LibraryRepository } from '../../db/repositories/library-repo.js';
import type Database from 'better-sqlite3';

export function registerListLibraries(server: McpServer, db: Database.Database): void {
  const repo = new LibraryRepository(db);

  server.tool(
    'list_libraries',
    'List all available documentation libraries with their versions',
    {},
    async () => {
      const libs = repo.listAll();
      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify(libs, null, 2),
        }],
      };
    },
  );
}
