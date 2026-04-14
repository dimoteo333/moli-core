import { z } from 'zod';
import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { HybridSearch } from '../../search/hybrid-search.js';
import { SectionRepository } from '../../db/repositories/section-repo.js';
import { estimateTokens } from '../../ingestion/chunker.js';
import type Database from 'better-sqlite3';

export function registerGetRelevantContext(server: McpServer, db: Database.Database, search: HybridSearch): void {
  const sectionRepo = new SectionRepository(db);

  server.tool(
    'get_relevant_context',
    'Get an AI-friendly context package for a coding task. Returns key docs, code examples, and best practices.',
    {
      task: z.string().describe('Description of what you are trying to implement'),
      library_id: z.string().describe('Canonical library ID'),
      version: z.string().optional().describe('Specific version'),
      max_tokens: z.number().optional().describe('Approximate max tokens for the response (default 4000)'),
    },
    async ({ task, library_id, version, max_tokens }) => {
      const budget = max_tokens ?? 4000;
      const results = await search.search({
        query: task,
        libraryId: library_id,
        version,
        limit: 20,
      });

      if (results.length === 0) {
        return {
          content: [{
            type: 'text' as const,
            text: `No relevant documentation found for "${task}" in ${library_id}`,
          }],
          isError: true,
        };
      }

      // Deduplicate by section, keeping highest-scoring chunk per section
      const sectionMap = new Map<number, typeof results[0]>();
      for (const r of results) {
        if (!sectionMap.has(r.sectionId) || r.score > sectionMap.get(r.sectionId)!.score) {
          sectionMap.set(r.sectionId, r);
        }
      }
      const uniqueSections = Array.from(sectionMap.values());

      // Build context package within token budget
      let tokensUsed = 0;
      const sections: string[] = [];

      // Header
      const header = `# Context: ${task}\n> Library: ${library_id} | Version: ${results[0].version}\n\n`;
      tokensUsed += estimateTokens(header);
      sections.push(header);

      // Top 2-3 sections: include full content
      const fullSections = uniqueSections.slice(0, 3);
      for (const r of fullSections) {
        const section = sectionRepo.getById(r.sectionId);
        if (!section) continue;

        const sectionText = `## ${section.title}\n\n${section.content}\n\n---\n`;
        const sectionTokens = estimateTokens(sectionText);

        if (tokensUsed + sectionTokens <= budget) {
          sections.push(sectionText);
          tokensUsed += sectionTokens;
        } else {
          // Include truncated version
          const truncated = `## ${section.title}\n\n${r.content}\n\n*[Section truncated. Use get_doc_section with slug "${r.sectionSlug}" for full content]*\n\n---\n`;
          sections.push(truncated);
          tokensUsed += estimateTokens(truncated);
        }
      }

      // Remaining sections: include just the matching chunk
      for (const r of uniqueSections.slice(3)) {
        const snippet = `### ${r.sectionTitle}\n\n${r.content}\n\n`;
        const snippetTokens = estimateTokens(snippet);

        if (tokensUsed + snippetTokens > budget) break;

        sections.push(snippet);
        tokensUsed += snippetTokens;
      }

      // Footer with references
      const refs = uniqueSections.map(r => `- ${r.sectionTitle} (${r.sectionSlug})`).join('\n');
      sections.push(`\n## Related Sections\n${refs}\n`);

      return {
        content: [{
          type: 'text' as const,
          text: sections.join(''),
        }],
      };
    },
  );
}
