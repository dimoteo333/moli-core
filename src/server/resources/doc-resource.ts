import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { SectionRepository } from '../../db/repositories/section-repo.js';
import type Database from 'better-sqlite3';

export function registerDocResource(server: McpServer, db: Database.Database): void {
  const sectionRepo = new SectionRepository(db);

  server.resource(
    'doc-section',
    new ResourceTemplate('docs://{library}/{version}/{section+}', {
      list: async () => {
        const allSections = sectionRepo.listAll();
        return {
          resources: allSections.map(s => ({
            uri: `docs://${s.libraryId}/${s.version}/${s.slug}`,
            name: `${s.title} (${s.libraryId} ${s.version})`,
            mimeType: 'text/markdown',
          })),
        };
      },
    }),
    { description: 'Documentation section content', mimeType: 'text/markdown' },
    async (uri, params) => {
      const library = params.library as string;
      const version = params.version as string;
      const section = params.section as string;

      const doc = sectionRepo.getBySlug(library, section, version);
      if (!doc) {
        throw new Error(`Section not found: ${uri.href}`);
      }

      return {
        contents: [{
          uri: uri.href,
          mimeType: 'text/markdown',
          text: doc.content,
        }],
      };
    },
  );
}
