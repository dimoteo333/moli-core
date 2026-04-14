import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HybridSearch } from '../../search/hybrid-search.js';

export function registerExtractBestPractices(server: McpServer, search: HybridSearch): void {
  server.prompt(
    'extract-best-practices',
    'Extract best practices for a topic from framework documentation',
    {
      topic: z.string().describe('Topic to extract best practices for'),
      library: z.string().describe('Framework/library name'),
    },
    async ({ topic, library }) => {
      const results = await search.search({ query: `best practices ${topic}`, libraryId: library, limit: 8 });
      const context = results.map(r => `### ${r.sectionTitle}\n${r.content}`).join('\n\n---\n\n');

      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Extract best practices for "${topic}" from the ${library} documentation below.

---
${context}
---
Format as a numbered list with brief explanations and code examples where relevant.`,
          },
        }],
      };
    },
  );
}
