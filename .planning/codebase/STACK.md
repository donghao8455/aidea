# Stack

**Mapped:** 2026-06-10
**Project:** AI-Aides

## Languages & Runtime

| Language | Version | Usage |
|----------|---------|-------|
| TypeScript | ~6.0.2 | Primary language (strict mode enabled) |
| CSS Modules | — | Component-scoped styling |
| MDX | v3 | Blog posts (template defaults, not customized) |

**Runtime:** Node.js ≥20 (Alpine for Docker)

## Framework

| Framework | Version | Purpose |
|-----------|---------|---------|
| Docusaurus | 3.10.0 (`@docusaurus/faster` preset) | Static site generator, provides React-based page framework |
| React | ^19.0.0 | UI rendering |
| React DOM | ^19.0.0 | DOM mounting |

**Docusaurus plugins active:**
- `@docusaurus/preset-classic` — docs, blog (disabled), sitemap, theme
- `@docusaurus/faster` — build performance optimization (SWC/Rspack)

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `@antv/x6` | ^3.1.7 | Graph visualization (declared but loaded via global script, not ESM) |
| `clsx` | ^2.0.0 | Conditional CSS class names |
| `prism-react-renderer` | ^2.3.0 | Code syntax highlighting |
| `@mdx-js/react` | ^3.0.0 | MDX component support |

## Build Toolchain

| Tool | Purpose |
|------|---------|
| Docusaurus CLI (`docusaurus`) | Dev server, build, deploy |
| Webpack 5 (via Docusaurus) | Module bundler |
| TypeScript (`tsc`) | Type checking (`typecheck` script) |
| `npm` | Package management (lockfile: `package-lock.json`) |

## AntV X6 Loading Strategy

**Critical architecture decision:** `@antv/x6` v3's ESM bundle is incompatible with Docusaurus's Webpack 5 config. The workaround:

1. `x6.min.js` (572KB) placed in `aides/static/` — served as a static asset
2. Loaded via `<script>` tag in `docusaurus.config.ts` (`scripts: ['/x6.min.js']`)
3. Type declarations provided by `src/types/x6.d.ts` — declares `window.X6`
4. Components access X6 via `window.X6.Graph` at runtime
5. Loading uses polling fallback (100ms intervals, 15s timeout) for SPA transitions

**Impact:** This bypasses webpack optimization, tree-shaking, and chunk splitting for X6. Every page loads the full 572KB library regardless of whether the graph is displayed.

## Deployment Stack

| Component | Technology |
|-----------|------------|
| Containerization | Docker (multi-stage: node:20-alpine → nginx:alpine) |
| Web server | Nginx (SPA fallback, gzip, security headers) |
| CI/CD | GitHub Actions (`.github/workflows/deploy.yml`) |
| Hosting | Self-hosted server via SSH deploy |
| URL | `https://aides.thend.cn` |

## Configuration Files

| File | Purpose |
|------|---------|
| `aides/docusaurus.config.ts` | Docusaurus site config (theme, navbar, footer, i18n) |
| `aides/tsconfig.json` | TypeScript config (strict mode, extends `@docusaurus/tsconfig`) |
| `aides/sidebars.ts` | Doc sidebar structure |
| `aides/package.json` | Dependencies and scripts |
| `docker/Dockerfile` | Multi-stage Docker build |
| `docker/docker-compose.yml` | Production + dev container orchestration |
| `docker/nginx.conf` | Nginx reverse proxy config |

## i18n

- Default locale: `zh-Hans` (Simplified Chinese)
- Single locale only (no multi-language support)
