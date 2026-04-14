# MoliCore MCP Server

오프라인 우선 MCP(Model Context Protocol) 서버 — AI 코딩 에이전트에게 프레임워크 문서를 제공합니다.

## 특징

- **완전 오프라인** — 런타임에 외부 API 호출 없음
- **하이브리드 검색** — FTS5 키워드 검색 + 옵션 벡터 시맨틱 검색 (RRF 퓨전)
- **AI 최적화 출력** — 구조화되고 간결한, 버전 인식 컨텍스트 패키지
- **확장 가능** — 문서 번들로 임의 프레임워크 추가 가능
- **MCP 네이티브** — Tools, Resources, Prompt 템플릿 지원
- **원격 접속 지원** — stdio 및 Streamable HTTP Transport 지원

## 지원 프레임워크

| 라이브러리 | 버전 | 청크 수 |
|-----------|------|---------|
| React | 19.1 | 255 |
| shadcn/ui | 0.9 | 219 |
| Tailwind CSS | 4.0 | 275 |
| WebSquare | 5.0 | 156 |

## 설치 및 빌드

```bash
npm install
npm run build
```

## 문서 번들 가져오기

```bash
# 전체 번들 import (임베딩 제외)
npx molicore import ./bundles/react --no-embeddings
npx molicore import ./bundles/shadcn-ui --no-embeddings
npx molicore import ./bundles/tailwindcss --no-embeddings
npx molicore import ./bundles/websquare --no-embeddings

# 임베딩 포함 import (transformers 필요)
npx molicore import ./bundles/react

# 등록된 라이브러리 확인
npx molicore list

# 문서 검색
npx molicore search "useState 훅 사용법" --library react
```

## 서버 실행

### stdio 모드 (로컬 에이전트용)

```bash
npx molicore serve --stdio
```

Claude Code MCP 설정:

```json
{
  "mcpServers": {
    "molicore": {
      "command": "node",
      "args": ["path/to/moli-core/dist/cli.js", "serve", "--stdio"],
      "env": {
        "MOLICORE_DB_PATH": "path/to/moli-core/data/molicore.db"
      }
    }
  }
}
```

### HTTP 모드 (원격 팀 공유용)

```bash
npx molicore serve --http --port 3000 --host 0.0.0.0
```

MCP 클라이언트 설정:

```json
{
  "mcpServers": {
    "molicore": {
      "url": "http://서버주소:3000/mcp"
    }
  }
}
```

#### 환경변수

| 변수 | 기본값 | 설명 |
|------|--------|------|
| `MOLICORE_TRANSPORT` | `stdio` | 전송 방식 (`stdio` / `http`) |
| `MOLICORE_PORT` | `3000` | HTTP 포트 |
| `MOLICORE_HOST` | `0.0.0.0` | HTTP 바인드 호스트 |
| `MOLICORE_DB_PATH` | `./data/molicore.db` | SQLite DB 경로 |
| `MOLICORE_EMBEDDINGS_ENABLED` | `true` | 임베딩 검색 활성화 |
| `MOLICORE_LOG_LEVEL` | `info` | 로그 레벨 |

## CLI 명령어

| 명령어 | 설명 |
|--------|------|
| `molicore import <dir>` | 문서 번들 import |
| `molicore import <dir> --no-embeddings` | 임베딩 없이 import |
| `molicore list` | 등록된 라이브러리 목록 |
| `molicore search <query> --library <id>` | 문서 검색 |
| `molicore serve --stdio` | stdio MCP 서버 시작 |
| `molicore serve --http --port 3000` | HTTP MCP 서버 시작 |

## MCP 도구

| 도구 | 설명 |
|------|------|
| `list_libraries` | 사용 가능한 라이브러리 목록 |
| `resolve_library` | 이름/별칭 → 표준 라이브러리 ID 변환 |
| `list_topics` | 라이브러리의 섹션 목록 |
| `search_docs` | 필터가 있는 하이브리드 검색 |
| `get_doc_section` | 특정 섹션 내용 조회 |
| `get_relevant_context` | 컨텍스트에 맞는 관련 문서 검색 |

## 패키징 (오프라인 배포)

```bash
./package.sh
# → moli-core-v1.0.0.tar.gz 생성
```

오프라인 환경에서:

```bash
tar xzf moli-core-v1.0.0.tar.gz
cd moli-core
node dist/cli.js serve --http --port 3000
```

## 라이선스

MIT
