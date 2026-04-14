import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import type Database from 'better-sqlite3';
import type { EmbeddingService } from '../shared/types.js';
import type { MoliCoreConfig } from '../shared/config.js';
import { HybridSearch } from '../search/hybrid-search.js';

// Tools
import { registerListLibraries } from './tools/list-libraries.js';
import { registerResolveLibrary } from './tools/resolve-library.js';
import { registerListTopics } from './tools/list-topics.js';
import { registerSearchDocs } from './tools/search-docs.js';
import { registerGetDocSection } from './tools/get-doc-section.js';
import { registerGetRelevantContext } from './tools/get-relevant-context.js';

// Resources
import { registerDocResource } from './resources/doc-resource.js';

// Prompts
import { registerFindImplementationGuidance } from './prompts/find-implementation-guidance.js';
import { registerSummarizeFrameworkTopic } from './prompts/summarize-framework-topic.js';
import { registerCompareTwoApproaches } from './prompts/compare-two-approaches.js';
import { registerExtractBestPractices } from './prompts/extract-best-practices.js';

export function createMcpServer(
  db: Database.Database,
  config: MoliCoreConfig,
  embeddingService: EmbeddingService | null,
): McpServer {
  const server = new McpServer({
    name: 'molicore-mcp',
    version: '1.0.0',
  });

  const search = new HybridSearch(db, embeddingService, {
    rrfK: config.rrfK,
    ftsWeight: config.ftsWeight,
    vecWeight: config.vecWeight,
    defaultLimit: config.searchDefaultLimit,
    maxLimit: config.searchMaxLimit,
  });

  // Register tools
  registerListLibraries(server, db);
  registerResolveLibrary(server, db);
  registerListTopics(server, db);
  registerSearchDocs(server, search);
  registerGetDocSection(server, db);
  registerGetRelevantContext(server, db, search);

  // Register resources
  registerDocResource(server, db);

  // Register prompts
  registerFindImplementationGuidance(server, search);
  registerSummarizeFrameworkTopic(server, search);
  registerCompareTwoApproaches(server, search);
  registerExtractBestPractices(server, search);

  return server;
}
