import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { LibraryRepository } from '../../db/repositories/library-repo.js';
import type Database from 'better-sqlite3';

export function registerResolveLibrary(server: McpServer, db: Database.Database): void {
  const repo = new LibraryRepository(db);

  server.tool(
    'resolve_library',
    'Resolve a library name or alias to its canonical ID. Use this before other tools to get the correct library_id.',
    {
      name: z.string().describe('Library name, e.g. "react", "shadcn", "tailwind"'),
    },
    async ({ name }) => {
      const lib = repo.resolve(name);
      if (!lib) {
        return {
          content: [{ type: 'text' as const, text: `No library found matching "${name}"` }],
          isError: true,
        };
      }

      const versions = repo.getVersions(lib.id);
      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify({
            id: lib.id,
            name: lib.name,
            currentVersion: lib.version,
            availableVersions: versions,
            description: lib.description,
          }, null, 2),
        }],
      };
    },
  );
}
