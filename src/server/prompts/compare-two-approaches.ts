import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HybridSearch } from '../../search/hybrid-search.js';

export function registerCompareTwoApproaches(server: McpServer, search: HybridSearch): void {
  server.prompt(
    'compare-two-approaches',
    'Compare two implementation approaches using framework documentation',
    {
      approach_a: z.string().describe('First approach'),
      approach_b: z.string().describe('Second approach'),
      library: z.string().describe('Framework/library name'),
      use_case: z.string().optional().describe('Specific use case context'),
    },
    async ({ approach_a, approach_b, library, use_case }) => {
      const [resultsA, resultsB] = await Promise.all([
        search.search({ query: approach_a, libraryId: library, limit: 5 }),
        search.search({ query: approach_b, libraryId: library, limit: 5 }),
      ]);

      const ctxA = resultsA.map(r => `### ${r.sectionTitle}\n${r.content}`).join('\n\n');
      const ctxB = resultsB.map(r => `### ${r.sectionTitle}\n${r.content}`).join('\n\n');

      return {
        messages: [{
          role: 'user' as const,
          content: {
            type: 'text' as const,
            text: `Compare these two approaches in ${library}:

A: ${approach_a}
B: ${approach_b}
${use_case ? `Use case: ${use_case}\n` : ''}
---
Context for A:
${ctxA}
---
Context for B:
${ctxB}
---
Provide: pros/cons table, recommendation, and when to use each.`,
          },
        }],
      };
    },
  );
}
