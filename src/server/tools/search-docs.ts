import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HybridSearch } from '../../search/hybrid-search.js';

export function registerSearchDocs(server: McpServer, search: HybridSearch): void {
  server.tool(
    'search_docs',
    'Search documentation using hybrid keyword + semantic search. Returns ranked chunks with snippets and metadata.',
    {
      query: z.string().describe('Search query'),
      library_id: z.string().describe('Library to search within'),
      version: z.string().optional().describe('Specific version'),
      limit: z.number().min(1).max(50).optional().describe('Max results (default 10)'),
      has_code: z.boolean().optional().describe('Filter: only chunks with code examples'),
      search_mode: z.enum(['hybrid', 'fts', 'vector']).optional().describe('Search mode (default hybrid)'),
    },
    async ({ query, library_id, version, limit, has_code, search_mode }) => {
      const results = await search.search({
        query,
        libraryId: library_id,
        version,
        limit,
        hasCode: has_code,
        searchMode: search_mode,
      });

      const output = results.map(r => ({
        title: r.sectionTitle,
        section: r.sectionSlug,
        heading: r.heading,
        snippet: r.content.slice(0, 300),
        hasCode: r.hasCode,
        version: r.version,
        score: r.score,
      }));

      return {
        content: [{
          type: 'text' as const,
          text: JSON.stringify(output, null, 2),
        }],
      };
    },
  );
}
