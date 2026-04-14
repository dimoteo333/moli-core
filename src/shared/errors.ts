export class MoliCoreError extends Error {
  constructor(message: string, public readonly code: string) {
    super(message);
    this.name = 'MoliCoreError';
  }
}

export class LibraryNotFoundError extends MoliCoreError {
  constructor(name: string) {
    super(`Library not found: "${name}"`, 'LIBRARY_NOT_FOUND');
    this.name = 'LibraryNotFoundError';
  }
}

export class SectionNotFoundError extends MoliCoreError {
  constructor(libraryId: string, slug: string) {
    super(`Section not found: "${libraryId}/${slug}"`, 'SECTION_NOT_FOUND');
    this.name = 'SectionNotFoundError';
  }
}

export class BundleValidationError extends MoliCoreError {
  constructor(message: string) {
    super(message, 'BUNDLE_VALIDATION_ERROR');
    this.name = 'BundleValidationError';
  }
}

export class IngestionError extends MoliCoreError {
  constructor(message: string) {
    super(message, 'INGESTION_ERROR');
    this.name = 'IngestionError';
  }
}
