# Integrations

**Mapped:** 2026-06-10
**Project:** AI-Aides

## External Services

**None currently active.** The application is entirely static — no backend, no database, no external API calls at runtime.

| Service | Status | Notes |
|---------|--------|-------|
| AI News API | ❌ Mock data | `aides/src/data/aiNews.ts` contains hardcoded mock entries |
| Analytics | ❌ Not configured | No Google Analytics, Plausible, or other tracking |
| Search backend | ❌ None | Search is client-side string matching on concept names/tags |
| CMS / Content API | ❌ None | All content is hardcoded in `allConcepts.ts` |

## Static Content Sources

| Source | Format | Location |
|--------|--------|----------|
| Concept data | TypeScript data file | `aides/src/data/allConcepts.ts` (~62KB) |
| AI News feed | TypeScript data file | `aides/src/data/aiNews.ts` (12 mock items) |
| Documentation | MDX files | `aides/docs/` (Docusaurus docs plugin) |
| Blog posts | MDX files | `aides/blog/` (template defaults, not customized) |

## Third-Party Libraries (Runtime)

| Library | Integration Method |
|---------|-------------------|
| AntV X6 | Global `<script>` tag from `/x6.min.js` — NOT imported as ES module |
| React | Bundled by Docusaurus/Webpack |
| Docusaurus theme | Bundled by Docusaurus/Webpack |

## Build & Deploy Integrations

| Integration | Details |
|-------------|---------|
| GitHub Actions | Build + Docker + SSH deploy on push to `main` |
| Docker Hub (local) | Image built and transferred via SSH (`docker save` → base64 → `docker load`) |
| npm registry | Dependencies installed via `npm ci` |

## Planned Integrations (per PRD)

The Optimization PRD (`docs/AI-Aides-Optimization-PRD-v1.0.md`) mentions:
- Real AI news data source (RSS/API) — currently mock
- Google Analytics or similar — currently absent
- Possible search backend for enhanced search — currently client-side only
