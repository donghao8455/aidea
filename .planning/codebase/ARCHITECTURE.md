# Architecture

**Mapped:** 2026-06-10
**Project:** AI-Aides

## Pattern

**Static Site Generation (SSG)** — Docusaurus builds a React-based static site at build time. No server-side rendering or API backend. All data is embedded at build time.

## System Overview

```
┌─────────────────────────────────────────────┐
│  Docusaurus Build (SSG)                     │
│  ┌───────────┐  ┌───────────┐  ┌─────────┐ │
│  │ Pages     │  │ Components│  │ Data    │ │
│  │ (React)   │  │ (React)   │  │ (TS)    │ │
│  └─────┬─────┘  └─────┬─────┘  └────┬────┘ │
│        │              │              │       │
│        └──────────────┴──────────────┘       │
│                       │                      │
│              Webpack 5 Bundle                 │
│              + static/x6.min.js              │
└───────────────────────┬─────────────────────┘
                        │
                   Docker Build
                   (nginx:alpine)
                        │
                   Static HTML/JS/CSS
                   served by Nginx
```

## Pages

| Page | Route | File | Purpose |
|------|-------|------|---------|
| Home (Graph) | `/` | `aides/src/pages/index.tsx` | Interactive concept graph with search/filter |
| Concept Detail | `/concept?id=<id>` | `aides/src/pages/concept.tsx` | Full concept detail with 9 sections |
| Docs | `/docs/*` | Docusaurus docs plugin | Standard documentation (default template) |

## Component Architecture

### Graph System (Core Feature)

```
index.tsx (Home Page)
  ├── Category filter buttons
  ├── Search input (debounced 200ms)
  └── <GraphCanvas>  ← Main visualization component
        ├── Layout algorithm (category-based rows)
        ├── AntV X6 Graph instance (via window.X6)
        ├── Node rendering (color-coded by category)
        ├── Edge rendering (Bézier curves, relation labels)
        ├── Tooltip system (mouseover, 200ms debounce)
        ├── Filter/search response (updates node/edge styles)
        └── Click handler → SPA navigation to detail page
```

### Data Flow

```
allConcepts.ts (Single Source of Truth)
  ├── concepts[] → GraphCanvas nodes
  ├── relations[] → GraphCanvas edges
  ├── conceptOrder[] → Concept detail page navigation
  └── allConcepts{} → Concept detail page content (full data)
```

**Key types defined in `aides/src/components/Graph/types.ts`:**
- `ConceptData` — Simplified concept for graph nodes
- `RelationData` — Source/target relation for edges

**Detailed type defined in `aides/src/data/allConcepts.ts`:**
- `ConceptDetail` — Full concept with 9 detail sections

### Concept Detail Page

```
concept.tsx
  ├── URL param parsing (?id=)
  ├── Breadcrumb navigation
  ├── Header (name, abbreviation, category badge, difficulty stars, tags)
  ├── Sections (conditionally rendered):
  │   ├── Definition + Plain Explanation
  │   ├── Analogy
  │   ├── Key Points
  │   ├── Use Cases
  │   ├── Related Concepts (links to other detail pages)
  │   └── Resources (external links with type/language/difficulty)
  └── Navigation (prev/next concept)
```

### Unused Components

| Component | Status |
|-----------|--------|
| `HomepageFeatures` | Unused — still contains Docusaurus default template content |
| `AINewsSidebar` | Built but disconnected — not rendered in any page |

## Category System

Concepts are organized into 5 categories with consistent color coding:

| Category ID | Display Name | Color | Row Position |
|-------------|-------------|-------|--------------|
| `basic` | 基础概念 | `#5B5FC7` (Indigo) | Row 1 (y=100) |
| `tech` | 技术方法 | `#00D084` (Green) | Row 2 (y=280) |
| `methodology` | 方法论 | `#E91E63` (Pink) | Row 3 (y=460) |
| `architecture` | 架构模式 | `#733EE4` (Purple) | Row 4 (y=640) |
| `tool` | 工具协议 | `#FF9800` (Orange) | Row 5 (y=820) |

## Layout Algorithm

The graph uses a custom category-row layout (not force-directed):
- Concepts grouped by category
- Each category gets a horizontal row at fixed Y position
- Within a row, concepts spaced at 220px intervals, centered on 1400px canvas
- Canvas: 1400×1000px with dot grid background
- Interactions: mousewheel zoom (0.3x–3x), drag pan, node click

## Routing

| Pattern | Implementation |
|---------|---------------|
| `/` | Docusaurus page component (`index.tsx`) |
| `/concept?id=<id>` | Query parameter routing (`useLocation` + `URLSearchParams`) |
| `/docs/*` | Docusaurus docs plugin |

**Note:** Concept detail uses query parameters (`?id=`), not path segments. This is flagged as an SEO issue in the project's issue tracker.
