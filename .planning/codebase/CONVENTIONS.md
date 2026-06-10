# Conventions

**Mapped:** 2026-06-10
**Project:** AI-Aides

## Code Style

### TypeScript

- **Strict mode** enabled (`"strict": true` in `tsconfig.json`)
- Type annotations on all function parameters and return types
- Interfaces preferred over type aliases for object shapes
- `ReactNode` used as return type for page components
- One `export default` per page file (Docusaurus convention)
- Named exports for reusable components

### React Patterns

- **Functional components only** — no class components
- **Hooks:** `useState`, `useEffect`, `useCallback`, `useRef` from React
- **Ref pattern for callbacks:** `onNodeClickRef` to avoid re-triggering effects
  ```typescript
  const onNodeClickRef = useRef(onNodeClick);
  useEffect(() => { onNodeClickRef.current = onNodeClick; }, [onNodeClick]);
  ```
- **Debounced state:** Search uses 200ms debounce via `setTimeout`/`clearTimeout`
- **No state management library** — all state is local (`useState`)

### Styling

- **CSS Modules** (`.module.css`) — one per component
- No CSS-in-JS, no Tailwind, no preprocessors
- BEM-like class names within modules (e.g., `styles.relatedLink`, `styles.newsRow`)
- Inline styles used sparingly for dynamic values (category colors, CSS custom properties)
- CSS custom properties (`--cat-color`) for dynamic theming on filter buttons

### Data Management

- **Single Source of Truth pattern:** `allConcepts.ts` is the canonical data source
- Data files export typed constants (not classes or factories)
- No data fetching at runtime — all data is build-time
- Concept IDs are lowercase strings (e.g., `'llm'`, `'prompt-engineering'`)

## Component Structure

Standard component directory:
```
ComponentName/
  ├── index.tsx         # Component implementation
  └── styles.module.css # Scoped styles
```

Page structure:
```
pages/
  ├── pageName.tsx            # Page component
  ├── pageName.module.css     # Page styles
  └── pageName/               # Sometimes styles in subfolder
      └── pageName.module.css
```

## Error Handling

- **Graceful degradation:** X6 loading has 15s timeout fallback
- **No error boundaries** — React errors would crash the page
- **No global error handling** — `console.error` for X6 load failures
- **Null checks** on data lookups (concept detail page handles missing concepts)

## Comment Style

- Chinese comments for complex logic explanations
- English comments for standard code documentation
- Section dividers using `// ============` pattern for long files
- JSDoc-style comments on type definitions

## Import Conventions

```typescript
// React & framework imports first
import {useState, useEffect} from 'react';
import {useHistory} from '@docusaurus/router';
import Layout from '@theme/Layout';

// Local imports (using @site alias)
import {GraphCanvas} from '@site/src/components/Graph';
import styles from './styles.module.css';

// Type imports
import type {ConceptData} from './types';
```

## URL / Routing Conventions

- Home page: `/`
- Concept detail: `/concept?id=<conceptId>` (query parameter)
- Docs: `/docs/*` (Docusaurus standard)
- SPA navigation via `useHistory().push()` (no full page reload)

## Data Structures

### Category System
Categories are defined as string literal unions:
```typescript
category: 'basic' | 'tech' | 'methodology' | 'architecture' | 'tool'
```

### Difficulty Scale
1–5 star rating (integer), rendered as filled/unfilled stars.

### Resource Types
```typescript
type: 'article' | 'video' | 'paper' | 'documentation'
language: 'zh' | 'en'
difficulty: 'beginner' | 'intermediate' | 'advanced'
```
