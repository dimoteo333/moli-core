import type { SearchResult, SearchOptions } from '../shared/types.js';
import { SearchRepository } from '../db/repositories/search-repo.js';

export class FtsSearch {
  constructor(private searchRepo: SearchRepository) {}

  search(options: SearchOptions): SearchResult[] {
    const { query, libraryId, version, limit = 10 } = options;
    if (!version) return [];

    const ftsResults = this.searchRepo.ftsSearch(query, libraryId, version, limit * 3);

    let results: SearchResult[] = [];
    for (let i = 0; i < ftsResults.length; i++) {
      const r = ftsResults[i];
      const detail = this.searchRepo.getChunkWithSection(r.chunkId);
      if (!detail) continue;

      results.push({
        chunkId: r.chunkId,
        sectionId: r.sectionId,
        content: r.content,
        heading: r.heading,
        score: 1 / (60 + i), // RRF-style score for consistency
        libraryId: r.libraryId,
        version: r.version,
        sectionSlug: detail.sectionSlug,
        sectionTitle: detail.sectionTitle,
        hasCode: r.hasCode,
      });
    }

    // Apply filters
    if (options.hasCode !== undefined) {
      results = results.filter(r => r.hasCode === options.hasCode);
    }

    return results.slice(0, limit);
  }
}
