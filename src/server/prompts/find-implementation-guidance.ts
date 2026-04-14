import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HybridSearch } from '../../search/hybrid-search.js';

export function registerFindImplementationGuidance(server: McpServer, search: HybridSearch): void {
  server.prompt(
    'find-implementation-guidance',
    'Get step-by-step implementation guidance for a coding task using framework documentation',
    {
      task: z.string().describe('What you want to implement'),
      library: z.string().describe('Framework/library name'),
      constraints: z.string().optional().describe('Any constraints or preferences'),
    },
    async ({ task, library, constraints }) => {
      const results = await search.search({ query: task, libraryId: library, limit: 5 });
      const context = results.map(r => `### ${r.sectionTitle}\n${r.content}`).join('\n\n---\n\n');

      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Using the following ${library} documentation context, provide step-by-step implementation guidance for: ${task}

${constraints ? `Constraints: ${constraints}\n` : ''}
---
DOCUMENTATION CONTEXT:
${context}
---
Provide: 1) recommended approach, 2) code example, 3) common pitfalls to avoid.`,
          },
        }],
      };
    },
  );
}
