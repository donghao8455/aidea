# Testing

**Mapped:** 2026-06-10
**Project:** AI-Aides

## Current State

**Zero test coverage.** No test files exist in the project source (`aides/src/`).

| Dimension | Status |
|-----------|--------|
| Unit tests | ❌ None |
| Integration tests | ❌ None |
| E2E tests | ❌ None |
| Component tests | ❌ None |
| Visual regression | ❌ None |
| Accessibility tests | ❌ None |

## Test Infrastructure

| Tool | Status |
|------|--------|
| Test runner | Not configured |
| Assertion library | Not configured |
| Testing library | Not installed |
| Mock utilities | Not installed |
| Coverage tool | Not configured |

## CI Test Steps

The GitHub Actions workflow (`.github/workflows/deploy.yml`) includes:

```yaml
- name: Check TypeScript
  run: npx tsc --noEmit

- name: ESLint
  run: npm run lint || true   # Note: allowed to fail (|| true)
```

**Observations:**
- TypeScript type checking runs but is not a test suite
- ESLint is configured to pass even on failure (`|| true`)
- No test step in the CI pipeline

## What Should Be Tested (Recommendations)

### High Priority

1. **Data integrity** — Validate `allConcepts.ts` structure:
   - Every concept has all required fields
   - Every `relatedConcepts` reference points to an existing concept
   - Every `relations[]` source/target maps to an existing concept
   - No duplicate IDs
   - Category values are valid

2. **Concept detail page** — Rendering logic:
   - Renders correctly with valid concept ID
   - Shows "not found" for invalid concept ID
   - Shows concept list when no ID provided
   - Prev/next navigation works at boundaries

3. **Graph component** — Core interaction:
   - Nodes render for all concepts
   - Edges render for all relations
   - Category filter updates node/edge styles
   - Search filter matches by name, abbreviation, and tags

### Medium Priority

4. **Layout algorithm** — `layoutConcepts()` function:
   - Correct positions for each category
   - Centering within canvas width

5. **URL routing** — SPA navigation:
   - Query parameter parsing
   - History navigation (back/forward)

6. **X6 loading** — Graceful degradation:
   - Loading state shown while X6 loads
   - Error handling when X6 fails to load
