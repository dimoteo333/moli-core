import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HybridSearch } from '../../search/hybrid-search.js';

export function registerSummarizeFrameworkTopic(server: McpServer, search: HybridSearch): void {
  server.prompt(
    'summarize-framework-topic',
    'Summarize a framework topic at a chosen detail level',
    {
      topic: z.string().describe('Topic to summarize'),
      library: z.string().describe('Framework/library name'),
      detail_level: z.enum(['brief', 'detailed']).optional().describe('Level of detail'),
    },
    async ({ topic, library, detail_level }) => {
      const limit = detail_level === 'detailed' ? 10 : 5;
      const results = await search.search({ query: topic, libraryId: library, limit });
      const context = results.map(r => `### ${r.sectionTitle}\n${r.content}`).join('\n\n---\n\n');

      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Summarize the following topic from ${library} documentation: "${topic}"

Detail level: ${detail_level ?? 'brief'}

---
${context}`,
          },
        }],
      };
    },
  );
}
