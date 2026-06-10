# Structure

**Mapped:** 2026-06-10
**Project:** AI-Aides

## Directory Layout

```
aidea/                              # Repository root
├── .github/
│   └── workflows/
│       └── deploy.yml              # CI/CD: build + Docker + SSH deploy
├── .trae/
│   └── documents/                  # Trae IDE documents
├── aides/                          # Main application (Docusaurus site)
│   ├── .docusaurus/                # Build cache (gitignored)
│   ├── blog/                       # Blog posts (Docusaurus defaults, not used)
│   │   ├── *.mdx                   # Template blog posts
│   │   ├── authors.yml
│   │   └── tags.yml
│   ├── data/                       # JSON data files (legacy?)
│   ├── docs/                       # Docusaurus documentation pages
│   ├── node_modules/               # Dependencies (gitignored)
│   ├── src/                        # Application source code
│   │   ├── components/
│   │   │   ├── AINewsSidebar/      # AI news sidebar (built but unused)
│   │   │   │   ├── index.tsx
│   │   │   │   └── styles.module.css
│   │   │   ├── Graph/              # Core graph visualization
│   │   │   │   ├── GraphCanvas.tsx  # Main graph component (~300 lines)
│   │   │   │   ├── GraphCanvas.module.css
│   │   │   │   ├── index.ts        # Re-exports GraphCanvas
│   │   │   │   └── types.ts        # ConceptData, RelationData interfaces
│   │   │   └── HomepageFeatures/   # Default Docusaurus template (unused)
│   │   │       ├── index.tsx
│   │   │       └── styles.module.css
│   │   ├── css/
│   │   │   └── custom.css          # Global custom styles
│   │   ├── data/
│   │   │   ├── allConcepts.ts      # Single source of truth: all concept data (~62KB)
│   │   │   └── aiNews.ts           # Mock AI news data (12 items)
│   │   ├── pages/
│   │   │   ├── index.tsx           # Home page (graph + search + filter)
│   │   │   ├── index.module.css
│   │   │   ├── concept.tsx         # Concept detail page
│   │   │   ├── concepts/
│   │   │   │   └── concept.module.css
│   │   │   └── markdown-page.mdx   # Default template (unused)
│   │   └── types/
│   │       └── x6.d.ts             # Window.X6 type declarations
│   ├── static/
│   │   ├── img/                    # Images (logo, favicon, social card)
│   │   ├── x6.min.js               # AntV X6 library (572KB, loaded globally)
│   │   └── robots.txt
│   ├── docusaurus.config.ts        # Site configuration
│   ├── package.json                # Dependencies and scripts
│   ├── sidebars.ts                 # Doc sidebar config
│   └── tsconfig.json               # TypeScript config
├── docker/
│   ├── Dockerfile                  # Multi-stage Docker build
│   ├── docker-compose.yml          # Production + dev containers
│   └── nginx.conf                  # Nginx config (SPA, gzip, security headers)
├── docs/                           # Project documentation (NOT Docusaurus docs)
│   ├── AI-Aides-PRD-v1.1.md       # Original PRD
│   ├── AI-Aides-Optimization-PRD-v1.0.md  # Optimization PRD
│   ├── AI-Aides-RD-Plan-v1.0.md   # R&D plan
│   └── Phase*.md                  # Phase-specific docs
└── .planning/                      # GSD planning artifacts
    └── codebase/                   # Codebase map documents
```

## Key File Locations

| Concern | File(s) |
|---------|---------|
| Site config | `aides/docusaurus.config.ts` |
| Home page | `aides/src/pages/index.tsx` |
| Concept detail | `aides/src/pages/concept.tsx` |
| Graph visualization | `aides/src/components/Graph/GraphCanvas.tsx` |
| Concept data (SSOT) | `aides/src/data/allConcepts.ts` |
| Graph types | `aides/src/components/Graph/types.ts` |
| AI News mock data | `aides/src/data/aiNews.ts` |
| X6 type declarations | `aides/src/types/x6.d.ts` |
| Global styles | `aides/src/css/custom.css` |
| Docker config | `docker/Dockerfile`, `docker/docker-compose.yml` |
| Nginx config | `docker/nginx.conf` |
| CI/CD pipeline | `.github/workflows/deploy.yml` |
| Project PRDs | `docs/AI-Aides-*.md` |

## Naming Conventions

| Pattern | Convention |
|---------|-----------|
| Page components | `aides/src/pages/<name>.tsx` (lowercase) |
| Page styles | `aides/src/pages/<name>.module.css` or subfolder |
| Components | PascalCase directories: `aides/src/components/<Name>/` |
| Component entry | `index.tsx` within component directory |
| Component styles | `styles.module.css` within component directory |
| Data files | `aides/src/data/<name>.ts` (camelCase) |
| Type declarations | `aides/src/types/<name>.d.ts` |

## Dead Code / Unused Files

| File | Status |
|------|--------|
| `aides/src/components/HomepageFeatures/` | Docusaurus default template, never used |
| `aides/src/components/AINewsSidebar/` | Built component, not rendered in any page |
| `aides/blog/*.mdx` | Docusaurus default blog posts, blog disabled in config |
| `aides/src/pages/markdown-page.mdx` | Docusaurus default template |
| `aides/data/` | Legacy JSON data directory (may contain old concept files) |
