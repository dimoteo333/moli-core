export interface MoliCoreConfig {
  dbPath: string;
  modelsDir: string;
  embeddingsEnabled: boolean;
  embeddingModel: string;
  embeddingDimensions: number;
  chunkMaxTokens: number;
  chunkOverlapTokens: number;
  searchDefaultLimit: number;
  searchMaxLimit: number;
  rrfK: number;
  ftsWeight: number;
  vecWeight: number;
  logLevel: 'debug' | 'info' | 'warn' | 'error';
}

function envStr(key: string, fallback: string): string {
  return process.env[key] ?? fallback;
}

function envInt(key: string, fallback: number): number {
  const val = process.env[key];
  if (val === undefined) return fallback;
  const parsed = parseInt(val, 10);
  return isNaN(parsed) ? fallback : parsed;
}

function envFloat(key: string, fallback: number): number {
  const val = process.env[key];
  if (val === undefined) return fallback;
  const parsed = parseFloat(val);
  return isNaN(parsed) ? fallback : parsed;
}

function envBool(key: string, fallback: boolean): boolean {
  const val = process.env[key];
  if (val === undefined) return fallback;
  return val === 'true' || val === '1';
}

export function loadConfig(overrides?: Partial<MoliCoreConfig>): MoliCoreConfig {
  return {
    dbPath: envStr('MOLICORE_DB_PATH', './data/molicore.db'),
    modelsDir: envStr('MOLICORE_MODELS_DIR', './data/models'),
    embeddingsEnabled: envBool('MOLICORE_EMBEDDINGS_ENABLED', true),
    embeddingModel: envStr('MOLICORE_EMBEDDING_MODEL', 'Xenova/all-MiniLM-L6-v2'),
    embeddingDimensions: envInt('MOLICORE_EMBEDDING_DIMENSIONS', 384),
    chunkMaxTokens: envInt('MOLICORE_CHUNK_MAX_TOKENS', 512),
    chunkOverlapTokens: envInt('MOLICORE_CHUNK_OVERLAP_TOKENS', 64),
    searchDefaultLimit: envInt('MOLICORE_SEARCH_DEFAULT_LIMIT', 10),
    searchMaxLimit: envInt('MOLICORE_SEARCH_MAX_LIMIT', 50),
    rrfK: envInt('MOLICORE_RRF_K', 60),
    ftsWeight: envFloat('MOLICORE_FTS_WEIGHT', 1.0),
    vecWeight: envFloat('MOLICORE_VEC_WEIGHT', 1.0),
    logLevel: envStr('MOLICORE_LOG_LEVEL', 'info') as MoliCoreConfig['logLevel'],
    ...overrides,
  };
}
