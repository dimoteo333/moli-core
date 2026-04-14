export interface Library {
  id: string;
  name: string;
  version: string;
  description: string | null;
  sourceUrl: string | null;
  importedAt: string;
}

export interface DocSection {
  id: number;
  libraryId: string;
  version: string;
  slug: string;
  title: string;
  content: string;
  parentSlug: string | null;
  sortOrder: number;
  metadata: string;
}

export interface DocChunk {
  id: number;
  sectionId: number;
  libraryId: string;
  version: string;
  chunkIndex: number;
  content: string;
  tokenCount: number;
  heading: string | null;
  hasCode: boolean;
  metadata: string;
}

export interface SearchResult {
  chunkId: number;
  sectionId: number;
  content: string;
  heading: string | null;
  score: number;
  libraryId: string;
  version: string;
  sectionSlug: string;
  sectionTitle: string;
  hasCode: boolean;
}

export interface SearchOptions {
  query: string;
  libraryId: string;
  version?: string;
  limit?: number;
  category?: string;
  hasCode?: boolean;
  searchMode?: 'hybrid' | 'fts' | 'vector';
}

export interface BundleManifest {
  library: {
    id: string;
    name: string;
    version: string;
    description?: string;
    sourceUrl?: string;
  };
  docs: {
    baseDir: string;
    format: 'markdown' | 'html';
    structure: Array<{
      glob: string;
      category: string;
    }>;
  };
}

export interface Chunk {
  content: string;
  chunkIndex: number;
  tokenCount: number;
  heading: string | null;
  hasCode: boolean;
}

export interface ParsedSection {
  title: string;
  slug: string;
  content: string;
  headings: string[];
  codeBlocks: string[];
  parentSlug: string | null;
}

export interface EmbeddingService {
  readonly dimensions: number;
  embed(text: string): Promise<Float32Array>;
  embedBatch(texts: string[]): Promise<Float32Array[]>;
}
