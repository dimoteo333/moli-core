import { z } from 'zod';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { BundleManifest } from '../shared/types.js';
import { BundleValidationError } from '../shared/errors.js';

const BundleManifestSchema = z.object({
  library: z.object({
    id: z.string().min(1).regex(/^[a-z0-9-]+$/, 'Library ID must be lowercase alphanumeric with hyphens'),
    name: z.string().min(1),
    version: z.string().min(1),
    description: z.string().optional(),
    sourceUrl: z.string().optional(),
  }),
  docs: z.object({
    baseDir: z.string().min(1),
    format: z.enum(['markdown', 'html']),
    structure: z.array(z.object({
      glob: z.string().min(1),
      category: z.string().min(1),
    })).min(1),
  }),
});

export function loadManifest(bundleDir: string): BundleManifest {
  const manifestPath = join(bundleDir, 'manifest.json');

  let rawContent: string;
  try {
    rawContent = readFileSync(manifestPath, 'utf-8');
  } catch {
    throw new BundleValidationError(`Cannot read manifest at ${manifestPath}`);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(rawContent);
  } catch {
    throw new BundleValidationError(`Invalid JSON in manifest at ${manifestPath}`);
  }

  const result = BundleManifestSchema.safeParse(parsed);
  if (!result.success) {
    const issues = result.error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ');
    throw new BundleValidationError(`Invalid manifest: ${issues}`);
  }

  return result.data;
}
