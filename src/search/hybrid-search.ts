import type Database from 'better-sqlite3';
import type { SearchResult, SearchOptions, EmbeddingService } from '../shared/types.js';
import { SearchRepository } from '../db/repositories/search-repo.js';
import { LibraryRepository } from '../db/repositories/library-repo.js';
import { logger } from '../shared/logger.js';

export interface HybridSearchConfig {
  rrfK: number;
  ftsWeight: number;
  vecWeight: number;
  defaultLimit: number;
  maxLimit: number;
}

export class HybridSearch {
  private searchRepo: SearchRepository;
  private libraryRepo: LibraryRepository;
  private embeddingService: EmbeddingService | null;
  private config: HybridSearchConfig;

  constructor(
    db: Database.Database,
    embeddingService: EmbeddingService | null,
    config: HybridSearchConfig,
  ) {
    this.searchRepo = new SearchRepository(db);
    this.libraryRepo = new LibraryRepository(db);
    this.embeddingService = embeddingService;
    this.config = config;
  }

  async search(options: SearchOptions): Promise<SearchResult[]> {
    const { query, libraryId } = options;
    const limit = Math.min(options.limit ?? this.config.defaultLimit, this.config.maxLimit);
    const version = options.version ?? this.libraryRepo.getLatestVersion(libraryId);

    if (!version) {
      logger.warn('No version found for library', { libraryId });
      return [];
    }

    const searchMode = options.searchMode ?? (this.embeddingService ? 'hybrid' : 'fts');
    const fetchLimit = limit * 3; // Fetch more for fusion

    let results: SearchResult[];

    if (searchMode === 'fts' || !this.embeddingService) {
      results = this.ftsOnly(query, libraryId, version, fetchLimit);
    } else if (searchMode === 'vector' && this.embeddingService) {
      results = await this.vectorOnly(query, libraryId, version, fetchLimit);
    } else {
      results = await this.hybridFusion(query, libraryId, version, fetchLimit);
    }

    // Apply filters
    if (options.hasCode !== undefined) {
      results = results.filter(r => r.hasCode === options.hasCode);
    }

    return results.slice(0, limit);
  }

  private ftsOnly(query: string, libraryId: string, version: string, limit: number): SearchResult[] {
    const ftsResults = this.searchRepo.ftsSearch(query, libraryId, version, limit);
    return this.enrichResults(ftsResults.map((r, i) => ({
      chunkId: r.chunkId,
      rank: i,
    })));
  }

  private async vectorOnly(query: string, libraryId: string, version: string, limit: number): Promise<SearchResult[]> {
    if (!this.embeddingService) return [];
    const queryEmbedding = await this.embeddingService.embed(query);
    const vecResults = this.searchRepo.vectorSearch(queryEmbedding, libraryId, version, limit);
    return this.enrichResults(vecResults.map((r, i) => ({
      chunkId: r.chunkId,
      rank: i,
    })));
  }

  private async hybridFusion(query: string, libraryId: string, version: string, limit: number): Promise<SearchResult[]> {
    // Run FTS search
    const ftsResults = this.searchRepo.ftsSearch(query, libraryId, version, limit);

    // Run vector search
    let vecResults: Array<{ chunkId: number; rank: number }> = [];
    if (this.embeddingService) {
      try {
        const queryEmbedding = await this.embeddingService.embed(query);
        const vr = this.searchRepo.vectorSearch(queryEmbedding, libraryId, version, limit);
        vecResults = vr.map((r, i) => ({ chunkId: r.chunkId, rank: i }));
      } catch (err) {
        logger.warn('Vector search failed, using FTS only', { error: String(err) });
      }
    }

    // Reciprocal Rank Fusion
    const scores = new Map<number, number>();
    const { rrfK, ftsWeight, vecWeight } = this.config;

    for (let i = 0; i < ftsResults.length; i++) {
      const chunkId = ftsResults[i].chunkId;
      scores.set(chunkId, (scores.get(chunkId) ?? 0) + ftsWeight / (rrfK + i));
    }

    for (const { chunkId, rank } of vecResults) {
      scores.set(chunkId, (scores.get(chunkId) ?? 0) + vecWeight / (rrfK + rank));
    }

    // Sort by fused score
    const sorted = Array.from(scores.entries())
      .sort((a, b) => b[1] - a[1]);

    return this.enrichResults(sorted.map(([chunkId], i) => ({ chunkId, rank: i })));
  }

  private enrichResults(ranked: Array<{ chunkId: number; rank: number }>): SearchResult[] {
    const results: SearchResult[] = [];
    for (const { chunkId, rank } of ranked) {
      const detail = this.searchRepo.getChunkWithSection(chunkId);
      if (!detail) continue;

      results.push({
        chunkId: detail.chunkId,
        sectionId: detail.sectionId,
        content: detail.content,
        heading: detail.heading,
        score: 1 / (this.config.rrfK + rank),
        libraryId: detail.libraryId,
        version: detail.version,
        sectionSlug: detail.sectionSlug,
        sectionTitle: detail.sectionTitle,
        hasCode: detail.hasCode,
      });
    }
    return results;
  }
}
