# MoliCore MCP Server

Enterprise-ready, offline-first MCP (Model Context Protocol) server for serving framework documentation to AI coding agents.

## Features

- **Fully offline** - No external API calls at runtime
- **Hybrid search** - FTS5 keyword search + optional vector semantic search with RRF fusion
- **AI-optimized output** - Structured, concise, version-aware context packages
- **Extensible** - Add any framework via documentation bundles
- **MCP-native** - Tools, resources, and prompt templates

### Supported Frameworks (Initial)

- React
- shadcn/ui
- Tailwind CSS

## Quick Start

### 1. Install

```bash
npm install
npm run build
```

### 2. Create a Documentation Bundle

Create a directory with a `manifest.json`:

```json
{
  "library": {
    "id": "react",
    "name": "React",
    "version": "19.1",
    "description": "A JavaScript library for building user interfaces",
    "sourceUrl": "https://react.dev"
  },
  "docs": {
    "baseDir": "docs",
    "format": "markdown",
    "structure": [
      { "glob": "**/*.md", "category": "Guide" }
    ]
  }
}
```

Place your markdown documentation files in the `docs/` subdirectory.

### 3. Import Documentation

```bash
npx molicore import ./bundles/react
```

### 4. Start the MCP Server

```bash
npx molicore serve --stdio
```

### 5. Configure Your AI Client

Add to your Claude Code MCP settings:

```json
{
  "mcpServers": {
    "molicore": {
      "command": "node",
      "args": ["path/to/molicore-mcp/dist/index.js"],
      "env": {
        "MOLICORE_DB_PATH": "path/to/data/molicore.db"
      }
    }
  }
}
```

## CLI Commands

| Command | Description |
|---------|-------------|
| `molicore import <dir>` | Import a documentation bundle |
| `molicore import <dir> --no-embeddings` | Import without generating embeddings |
| `molicore list` | List all imported libraries |
| `molicore search <query> --library <id>` | Search documentation |
| `molicore serve --stdio` | Start MCP server |

## MCP Tools

| Tool | Description |
|------|-------------|
| `list_libraries` | List all available libraries |
| `resolve_library` | Resolve a name/alias to canonical library ID |
| `list_topics` | List sections for a library |
| `search_docs` | Hybrid search with filters |
| `get_doc_section` | Get full section content |
| `get_relevant_context` | AI-friendly context package for a task |

## MCP Resources

Access documentation sections via URI:

```
docs://react/19.1/hooks/use-state
docs://tailwindcss/4.0/utilities/flex
docs://shadcn-ui/0.9/components/button
```

## MCP Prompts

| Prompt | Description |
|--------|-------------|
| `find-implementation-guidance` | Step-by-step implementation help |
| `summarize-framework-topic` | Topic summary |
| `compare-two-approaches` | Compare two approaches |
| `extract-best-practices` | Extract best practices |

## Configuration

All configuration via environment variables:

| Variable | Default | Description |
|----------|---------|-------------|
| `MOLICORE_DB_PATH` | `./data/molicore.db` | Database file path |
| `MOLICORE_MODELS_DIR` | `./data/models` | Embedding models directory |
| `MOLICORE_EMBEDDINGS_ENABLED` | `true` | Enable/disable vector search |
| `MOLICORE_EMBEDDING_MODEL` | `Xenova/all-MiniLM-L6-v2` | HuggingFace model name |
| `MOLICORE_CHUNK_MAX_TOKENS` | `512` | Max tokens per chunk |
| `MOLICORE_CHUNK_OVERLAP_TOKENS` | `64` | Overlap between chunks |
| `MOLICORE_LOG_LEVEL` | `info` | Logging level |

## Adding New Frameworks

1. Create a bundle directory with `manifest.json` + docs
2. Run `molicore import ./bundles/new-framework`
3. No code changes needed

### Bundle Manifest Schema

```json
{
  "library": {
    "id": "lowercase-with-hyphens",
    "name": "Display Name",
    "version": "1.0",
    "description": "Optional description",
    "sourceUrl": "https://example.com"
  },
  "docs": {
    "baseDir": "docs",
    "format": "markdown",
    "structure": [
      { "glob": "guide/**/*.md", "category": "Guide" },
      { "glob": "api/**/*.md", "category": "API Reference" }
    ]
  }
}
```

### Supported Doc Formats

- **Markdown** (`.md`) - Primary format
- **HTML** - Planned for future

## Offline Deployment

1. Install dependencies: `npm install`
2. Build: `npm run build`
3. (Optional) Download embedding model for offline use
4. Import documentation bundles
5. Deploy the `dist/`, `node_modules/`, and `data/` directories

The server requires no internet access after setup.

## Architecture

```
┌─────────────────────────────────────────────┐
│                MCP Transport                 │
│              (stdio / HTTP)                  │
├─────────────────────────────────────────────┤
│  Tools │ Resources │ Prompts                 │
├─────────────────────────────────────────────┤
│            Hybrid Search (RRF)               │
│         FTS5 + Vector (optional)             │
├─────────────────────────────────────────────┤
│         SQLite (better-sqlite3)              │
│    FTS5 Index │ sqlite-vec │ Metadata        │
├─────────────────────────────────────────────┤
│          Ingestion Pipeline                  │
│    Parse → Chunk → Embed → Store             │
└─────────────────────────────────────────────┘
```

## Development

```bash
npm run build          # Compile TypeScript
npm run dev            # Watch mode
npm test               # Run all tests
npm run test:unit      # Unit tests only
npm run test:integration  # Integration tests
npm run typecheck      # Type checking only
```

## License

MIT
