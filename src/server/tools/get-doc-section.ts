import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SectionRepository } from '../../db/repositories/section-repo.js';
import { LibraryRepository } from '../../db/repositories/library-repo.js';
import type Database from 'better-sqlite3';

export function registerGetDocSection(server: McpServer, db: Database.Database): void {
  const sectionRepo = new SectionRepository(db);
  const libraryRepo = new LibraryRepository(db);

  server.tool(
    'get_doc_section',
    'Retrieve the full content of a specific documentation section by its slug',
    {
      library_id: z.string().describe('Canonical library ID'),
      section_slug: z.string().describe('Section slug, e.g. "hooks/use-state"'),
      version: z.string().optional().describe('Specific version'),
    },
    async ({ library_id, section_slug, version }) => {
      const v = version ?? libraryRepo.getLatestVersion(library_id);
      const section = v
        ? sectionRepo.getBySlug(library_id, section_slug, v)
        : sectionRepo.getBySlug(library_id, section_slug);

      if (!section) {
        return {
          content: [{ type: 'text' as const, text: `Section not found: ${library_id}/${section_slug}` }],
          isError: true,
        };
      }

      const meta = JSON.parse(section.metadata);
      const header = `# ${section.title}\n> Library: ${library_id} | Version: ${section.version} | Category: ${meta.category ?? 'N/A'}\n\n`;

      return {
        content: [{
          type: 'text' as const,
          text: header + section.content,
        }],
      };
    },
  );
}
