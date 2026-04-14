import type { EmbeddingService } from '../shared/types.js';

export class NoopEmbeddingService implements EmbeddingService {
  readonly dimensions = 384;

  async embed(_text: string): Promise<Float32Array> {
    return new Float32Array(this.dimensions);
  }

  async embedBatch(texts: string[]): Promise<Float32Array[]> {
    return texts.map(() => new Float32Array(this.dimensions));
  }
}
