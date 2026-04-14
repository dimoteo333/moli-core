import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SectionRepository } from '../../db/repositories/section-repo.js';
import { LibraryRepository } from '../../db/repositories/library-repo.js';
import type Database from 'better-sqlite3';

export function registerListTopics(server: McpServer, db: Database.Database): void {
  const sectionRepo = new SectionRepository(db);
  const libraryRepo = new LibraryRepository(db);

  server.tool(
    'list_topics',
    'List all documentation topics/sections for a specific library',
    {
      library_id: z.string().describe('Canonical library ID from resolve_library'),
      version: z.string().optional().describe('Specific version, defaults to latest'),
    },
    async ({ library_id, version }) => {
      const v = version ?? libraryRepo.getLatestVersion(library_id);
      if (!v) {
        return {
          content: [{ type: 'text' as const, text: `Library "${library_id}" not found` }],
          isError: true,
        };
      }

      const sections = sectionRepo.listByLibrary(library_id, v);
      const tree = sections.map(s => {
        const meta = JSON.parse(s.metadata);
        return {
          slug: s.slug,
          title: s.title,
          category: meta.category,
          hasCode: meta.hasCode,
        };
      });

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify(tree, null, 2),
        }],
      };
    },
  );
}
