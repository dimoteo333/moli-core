import type { EmbeddingService, SearchResult } from '../shared/types.js';
import { SearchRepository } from '../db/repositories/search-repo.js';

export class VectorSearch {
  constructor(
    private searchRepo: SearchRepository,
    private embeddingService: EmbeddingService,
  ) {}

  async search(query: string, libraryId: string, version: string, limit: number): Promise<SearchResult[]> {
    const queryEmbedding = await this.embeddingService.embed(query);
    const vecResults = this.searchRepo.vectorSearch(queryEmbedding, libraryId, version, limit * 3);

    const results: SearchResult[] = [];
    for (let i = 0; i < vecResults.length; i++) {
      const r = vecResults[i];
      const detail = this.searchRepo.getChunkWithSection(r.chunkId);
      if (!detail) continue;

      results.push({
        chunkId: r.chunkId,
        sectionId: detail.sectionId,
        content: detail.content,
        heading: detail.heading,
        score: 1 / (60 + i), // RRF-style score
        libraryId: detail.libraryId,
        version: detail.version,
        sectionSlug: detail.sectionSlug,
        sectionTitle: detail.sectionTitle,
        hasCode: detail.hasCode,
      });
    }

    return results.slice(0, limit);
  }
}
