import type { EmbeddingService } from '../shared/types.js';
import { logger } from '../shared/logger.js';

export class HuggingFaceEmbeddingService implements EmbeddingService {
  readonly dimensions: number;
  private pipeline: any = null;
  private modelName: string;
  private modelsDir: string;

  constructor(modelName: string, dimensions: number, modelsDir: string) {
    this.modelName = modelName;
    this.dimensions = dimensions;
    this.modelsDir = modelsDir;
  }

  private async getPipeline(): Promise<any> {
    if (this.pipeline) return this.pipeline;

    try {
      // Dynamic import to avoid failing when package isn't installed
      const { pipeline, env } = await import('@huggingface/transformers');

      // Configure for offline use
      env.allowRemoteModels = false;
      env.allowLocalModels = true;
      (env as any).localModelPath = this.modelsDir;

      this.pipeline = await pipeline('feature-extraction', this.modelName);
      logger.info('Embedding model loaded', { model: this.modelName });
      return this.pipeline;
    } catch (err) {
      logger.error('Failed to load embedding model', {
        model: this.modelName,
        error: String(err),
      });
      throw err;
    }
  }

  async embed(text: string): Promise<Float32Array> {
    const extractor = await this.getPipeline();
    const output = await extractor(text.slice(0, 1024), {
      pooling: 'mean',
      normalize: true,
    });
    return new Float32Array(output.data);
  }

  async embedBatch(texts: string[]): Promise<Float32Array[]> {
    const results: Float32Array[] = [];
    // Process one at a time to avoid memory issues
    for (const text of texts) {
      const embedding = await this.embed(text);
      results.push(embedding);
    }
    return results;
  }
}

export async function createEmbeddingService(
  modelName: string,
  dimensions: number,
  modelsDir: string,
): Promise<EmbeddingService | null> {
  try {
    const service = new HuggingFaceEmbeddingService(modelName, dimensions, modelsDir);
    // Test loading
    await service.embed('test');
    return service;
  } catch {
    logger.warn('Embedding service unavailable, falling back to FTS-only search');
    return null;
  }
}
