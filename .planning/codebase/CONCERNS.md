# Codebase Concerns

**Analysis Date:** 2026-06-10

## Tech Debt

**CI/CD Pipeline is Non-functional (Issue #07):**
- Issue: Docker image transfer mechanism is broken -- `docker save` output stays on the GitHub Actions runner but the SSH deploy step reads from `secrets.DOCKER_IMAGE` which is never populated. Deployment will always fail.
- Files: `.github/workflows/deploy.yml`, `docker/docker-compose.yml`, `docker/Dockerfile`
- Impact: Cannot deploy to production. The entire CI/CD pipeline is dead code.
- Fix approach: Rewrite `deploy.yml` to use Docker Hub push/pull or `scp-action` for artifact transfer. Add `needs: lint` dependency between jobs. Fix docker-compose healthcheck to use `wget` instead of `curl` (absent in `nginx:alpine`).
- Estimated effort: ~2.5h

**Detail Page Uses Query Parameters Instead of RESTful Paths (Issue #04):**
- Issue: Concept detail pages use `/concept?id=rag` instead of PRD-specified `/concepts/rag`. This prevents Docusaurus SSG from generating per-concept static HTML, harms SEO, and prevents per-page meta tags.
- Files: `aides/src/pages/concept.tsx` (line 46-52), `aides/src/pages/index.tsx` (line 25)
- Impact: Poor SEO; all concepts share one HTML shell that is empty before JS execution. Search engines see a blank page.
- Fix approach: Use Docusaurus `createRoutes()` to generate static pages per concept at build time, or use a Docusaurus plugin for dynamic route registration.
- Estimated effort: ~6.5h (full solution) or ~2h (minimum: SPA routing fix + meta tags)

**Route Import Source and Unnecessary State (Issue #05):**
- Issue: `concept.tsx` imports `useLocation` from `react-router-dom` instead of `@docusaurus/router`, risking breakage on Docusaurus React Router upgrades. Also uses `useState + useEffect` where a synchronous `useMemo` computation suffices.
- Files: `aides/src/pages/concept.tsx` (line 2, 46-52)
- Impact: Fragile coupling to Docusaurus internals; unnecessary re-renders from async state updates.
- Fix approach: Change import to `@docusaurus/router`; replace `useState + useEffect` with `useMemo(() => new URLSearchParams(location.search).get('id') || '', [location.search])`.
- Estimated effort: ~0.5h

**Legacy Data Files Still Present in Repository:**
- Issue: `aides/data/concepts/*.json` (22 files) and `aides/data/relations.json` are dead data from the pre-unification era. No source file imports them. They were superseded by `aides/src/data/allConcepts.ts` as the single source of truth but never deleted.
- Files: `aides/data/concepts/*.json`, `aides/data/relations.json`
- Impact: Confusion for developers about which data source is canonical; wasted disk space in the repo.
- Fix approach: Delete `aides/data/concepts/` directory and `aides/data/relations.json`.
- Estimated effort: ~5min

**Docusaurus Tutorial Files Not Customized:**
- Issue: `aides/docs/` still contains the default Docusaurus tutorial content (`tutorial-basics/`, `tutorial-extras/`, `intro.mdx`). The navbar links to these generic docs, not project-specific content.
- Files: `aides/docs/intro.mdx`, `aides/docs/tutorial-basics/*`, `aides/docs/tutorial-extras/*`
- Impact: Unprofessional appearance; users see boilerplate Docusaurus tutorials instead of AI-Aides documentation.
- Fix approach: Replace with project-specific documentation or remove the docs sidebar from navbar if not needed.
- Estimated effort: ~1-2h

**HomepageFeatures Component is Default Docusaurus Boilerplate:**
- Issue: `aides/src/components/HomepageFeatures/index.tsx` contains the default Docusaurus "Easy to Use / Focus on What Matters / Powered by React" feature list with placeholder SVGs. It is not imported by any page and is dead code.
- Files: `aides/src/components/HomepageFeatures/index.tsx`, `aides/src/components/HomepageFeatures/styles.module.css`
- Impact: Misleading boilerplate code in the codebase; unused bundle code if inadvertently imported.
- Fix approach: Delete the component and its CSS module, or replace with project-specific feature content.
- Estimated effort: ~5min

**AINewsSidebar Component is Disconnected:**
- Issue: `aides/src/components/AINewsSidebar/index.tsx` and `aides/src/data/aiNews.ts` exist but the sidebar is not imported by any page. The news data is hardcoded mock data (noted as "模拟数据 - 后续可替换为真实 API"). All news links are `href="#"` with `e.preventDefault()`, making the sidebar non-functional.
- Files: `aides/src/components/AINewsSidebar/index.tsx`, `aides/src/data/aiNews.ts`
- Impact: Dead code; if used, would display fake news links that go nowhere. The "refresh" button does nothing.
- Fix approach: Either integrate into the homepage layout and connect to a real API, or remove.
- Estimated effort: ~4h (integration) or ~5min (removal)

**GraphCanvas Tooltip Uses innerHTML (XSS Risk):**
- Issue: Tooltip content is built via string interpolation into `innerHTML` at `aides/src/components/Graph/GraphCanvas.tsx` (line 215-228). While concept data is currently controlled, this pattern is fragile and would be a XSS vector if data ever came from user input or an API.
- Files: `aides/src/components/Graph/GraphCanvas.tsx` (lines 215-228)
- Impact: Potential XSS if data source changes; poor React practice (bypasses virtual DOM).
- Fix approach: Create a proper React portal-based tooltip component using JSX, or at minimum sanitize data before insertion.
- Estimated effort: ~1h

**AntV X6 Loaded via Global Script (Issue #02, partially resolved):**
- Issue: `@antv/x6` v3's ESM package is incompatible with Docusaurus webpack 5, so a 572KB global script (`aides/static/x6.min.js`) is loaded via `<script>` tag. The npm package is listed in `package.json` dependencies but only used for type definitions. The `X6Graph` type is aliased to `any` (`aides/src/components/Graph/GraphCanvas.tsx` line 18), losing type safety for all graph operations.
- Files: `aides/src/components/Graph/GraphCanvas.tsx`, `aides/static/x6.min.js`, `aides/docusaurus.config.ts` (line 11), `aides/src/types/x6.d.ts`
- Impact: No IDE autocomplete for X6 APIs; manual version management of the static file; cannot tree-shake unused X6 features; global namespace pollution.
- Fix approach: Blocked on upstream `@antv/x6` v3 fixing ESM compatibility with webpack 5. Monitor for future releases. If stable, switch to `import('@antv/x6')` dynamic import.
- Estimated effort: ~4h (when upstream fix available)

## Known Bugs

**Graph Canvas Fixed Dimensions Cause Overflow on Mobile (Issue #10):**
- Symptoms: The graph canvas is hardcoded to 1400x1000 pixels (`aides/src/components/Graph/GraphCanvas.tsx` line 58-59). On any viewport narrower than 1400px (tablets, phones), horizontal overflow occurs.
- Files: `aides/src/components/Graph/GraphCanvas.tsx` (lines 58-59)
- Trigger: Open the site on any device with viewport < 1400px wide.
- Workaround: User can pan/scroll, but initial view is clipped and confusing.
- Fix approach: Use `containerRef.current.clientWidth` for dynamic width; add resize listener; adjust layout algorithm for smaller screens.

**Concept Detail Page Previous/Next Navigation Skips Unresolved Related Concepts:**
- Symptoms: In `aides/src/pages/concept.tsx` (line 220-222), when rendering related concepts, if a `conceptId` in `relatedConcepts` does not exist in `allConcepts`, `relatedDetail` is `null` and `return null` is rendered. This produces no visible error but silently drops related concept links.
- Files: `aides/src/pages/concept.tsx` (line 222)
- Trigger: Add a `relatedConcepts` entry pointing to a concept ID that does not exist in `conceptMap`.
- Workaround: None needed currently -- all references are valid. But this is a latent defect.
- Fix approach: Add a warning log when a related concept ID is not found, or validate concept IDs at build time.

**Docker Compose Healthcheck Will Always Fail:**
- Symptoms: `docker-compose.yml` uses `curl -f http://localhost/health` for health checks, but `nginx:alpine` does not include `curl`.
- Files: `docker/docker-compose.yml` (line 12)
- Trigger: Run `docker-compose up` and observe health check failures in `docker ps`.
- Workaround: Docker runs fine, health check just reports "unhealthy".
- Fix approach: Change to `wget --spider -q http://localhost/health` or add `RUN apk add --no-cache curl` to the Dockerfile.

## Security Considerations

**innerHTML Usage in Tooltip Rendering:**
- Risk: XSS if concept data ever includes malicious content (e.g., from user submissions or external API).
- Files: `aides/src/components/Graph/GraphCanvas.tsx` (lines 215-228)
- Current mitigation: All data is hardcoded in `aides/src/data/allConcepts.ts` -- no user input flows into the tooltip.
- Recommendations: Migrate to React JSX rendering for tooltips. At minimum, add a sanitization step if data sources change.

**CI/CD Secrets Handling:**
- Risk: The deploy workflow references `secrets.DOCKER_IMAGE` (a base64-encoded Docker image tar) and `secrets.SERVER_PASSWORD`. Storing large binary blobs as GitHub secrets is fragile and may leak via logs.
- Files: `.github/workflows/deploy.yml` (lines 49, 57)
- Current mitigation: The workflow has never successfully deployed, so no secrets are actively exposed.
- Recommendations: Redesign to use Docker Hub push/pull or SSH key-based authentication instead of password-based.

**Nginx Security Headers are Well Configured:**
- The `docker/nginx.conf` includes `X-Frame-Options`, `X-Content-Type-Options`, `X-XSS-Protection`, `Referrer-Policy`, and hidden file deny rules. This is a positive -- no action needed.

## Performance Bottlenecks

**allConcepts.ts Bundle Size -- 953 Lines of Inlined Data:**
- Problem: `aides/src/data/allConcepts.ts` is 953 lines and contains full detail content for all 22 concepts. This entire file is bundled into the main chunk and loaded on every page, even though users only view one concept at a time.
- Files: `aides/src/data/allConcepts.ts`
- Cause: Static data imports are bundled wholesale by webpack.
- Impact: The concept detail data (~30KB+ of Chinese text content) is loaded even on the homepage where only `concepts` (simplified data) and `relations` are needed.
- Improvement path: Split into separate files -- one for graph data (imported by homepage) and one for detail data (lazy-loaded per concept). Or use Docusaurus `swizzle` / dynamic import for detail content.

**Graph Layout Recalculated on Every Page Load:**
- Problem: `layoutConcepts()` in `aides/src/components/Graph/GraphCanvas.tsx` (lines 395-429) computes node positions via a simple category-row algorithm every time the component mounts. For 22 nodes this is trivial, but as concept count grows this could be optimized.
- Files: `aides/src/components/Graph/GraphCanvas.tsx` (lines 395-429)
- Cause: Layout positions are computed at runtime, not cached.
- Improvement path: Pre-compute positions in `allConcepts.ts` or use a web worker for larger graphs. Low priority for current scale.

**X6 Global Script Bypasses Webpack Optimization:**
- Problem: `aides/static/x6.min.js` (572KB) is loaded as a global script, bypassing webpack's code splitting, tree shaking, and compression pipeline.
- Files: `aides/static/x6.min.js`, `aides/docusaurus.config.ts` (line 11)
- Cause: `@antv/x6` v3 ESM incompatibility with webpack 5 (upstream issue).
- Improvement path: Blocked on upstream fix. When available, switch to npm dynamic import for proper bundling.

## Fragile Areas

**Graph Initialization Timing (X6 Script Loading):**
- Files: `aides/src/components/Graph/GraphCanvas.tsx` (lines 258-313)
- Why fragile: The component uses a combination of script load event listening and a 100ms polling fallback (up to 15 seconds) to wait for the global X6 script. If the script fails to load or is delayed, the graph silently shows nothing (loading spinner is dismissed after timeout). The cleanup logic has two separate return paths (lines 287-298 and 302-311) that could theoretically cause double-dispose if race conditions occur.
- Safe modification: Any changes to the initialization sequence should carefully test: (1) cold page load, (2) SPA navigation away and back, (3) slow network conditions.
- Test coverage: No automated tests exist for this component.

**Single Data File for All Concepts:**
- Files: `aides/src/data/allConcepts.ts`
- Why fragile: This file is the single source of truth for concepts, relations, graph data, and detail content. It mixes type definitions, data declarations, and derived exports. A typo or deletion in this file breaks the entire site (homepage graph + all detail pages).
- Safe modification: Always validate that new concept entries include all required fields. Consider adding a build-time validation script to check data integrity.
- Test coverage: No automated tests exist for data integrity.

**Tooltip DOM Manipulation Outside React:**
- Files: `aides/src/components/Graph/GraphCanvas.tsx` (lines 86-103, 192-249)
- Why fragile: Tooltip is created via `document.createElement`, appended directly to the DOM, and manipulated with `innerHTML` and inline styles. This completely bypasses React's rendering lifecycle. If the component unmounts during a tooltip show/hide animation, the tooltip DOM node may leak or cause errors.
- Safe modification: When modifying tooltip behavior, always test mount/unmount cycles and ensure the cleanup function in `useEffect` removes the tooltip element.
- Test coverage: No automated tests.

## Scaling Limits

**Concept Count:**
- Current capacity: 22 concepts with 31 relations
- Limit: The hardcoded layout algorithm in `layoutConcepts()` uses fixed row heights and column spacing. Beyond ~10 concepts per category, nodes will overflow the 1400x1000 canvas and overlap.
- Scaling path: Switch to a proper graph layout algorithm (e.g., dagre, elkjs) or implement zoom-to-fit with dynamic canvas sizing. Split data into lazy-loaded chunks.

**Bundle Size with Growing Content:**
- Current capacity: ~30KB of Chinese text content
- Limit: All concept detail is bundled in one file. At 50+ concepts with rich content, the initial page load could exceed 100KB of unused data.
- Scaling path: Split detail content into per-concept files and use dynamic imports. Implement code splitting per concept page.

**Static Site Generation:**
- Current capacity: Single `/concept` page handles all concepts client-side
- Limit: Only one HTML file is generated. Search engines cannot index individual concepts. Sitemap cannot list per-concept URLs.
- Scaling path: Implement `createRoutes()` to generate static HTML per concept at build time.

## Dependencies at Risk

**@antv/x6 v3 ESM Incompatibility:**
- Risk: The package is installed as an npm dependency but cannot be imported as an ESM module in the Docusaurus webpack 5 build. A global script workaround is in place.
- Impact: If the static `x6.min.js` file becomes outdated or the upstream fixes ESM, the project needs manual migration.
- Migration plan: Monitor `@antv/x6` releases for webpack 5 compatibility. When available, remove `static/x6.min.js`, remove `scripts` from `docusaurus.config.ts`, and use dynamic `import('@antv/x6')` in `GraphCanvas.tsx`.

**No Test Framework Configured:**
- Risk: Zero test files exist in the project source. No Jest, Vitest, or other test runner is configured.
- Impact: Any code change risks regressions with no automated safety net. The `package.json` has no `test` script.
- Migration plan: Add Vitest (aligns with Vite-based Docusaurus 3). Start with data integrity tests for `allConcepts.ts` and unit tests for `layoutConcepts()`.

## Missing Critical Features

**Mobile Responsiveness for Graph (Issue #10):**
- Problem: The graph canvas is 1400px wide with no responsive adaptation. On mobile, the experience is broken.
- Blocks: Mobile users cannot effectively use the core feature.

**No Automated Tests:**
- Problem: Zero test coverage. No test runner configured in `package.json`. No test scripts in CI pipeline.
- Blocks: Cannot safely refactor or add features without manual regression testing.

**No Sitemap for Concept Pages:**
- Problem: Docusaurus sitemap config in `aides/docusaurus.config.ts` (lines 43-48) generates a sitemap, but it only includes `/concept` (one URL), not individual concept pages.
- Blocks: Search engines cannot discover individual concept content.

## Test Coverage Gaps

**Entire Application Has Zero Tests:**
- What's not tested: All components (`GraphCanvas`, `concept.tsx`, `index.tsx`), all data (`allConcepts.ts`, `aiNews.ts`), all configuration (`docusaurus.config.ts`, `sidebars.ts`).
- Files: All files under `aides/src/`
- Risk: Any change to data structure, component logic, or routing can introduce bugs that are only caught by manual testing.
- Priority: High

**Specific Untested Areas:**
- **Data integrity in `aides/src/data/allConcepts.ts`:** No validation that all `conceptOrder` entries have matching entries in `conceptMap`, that all `relations` reference valid concept IDs, or that all `relatedConcepts` within concepts point to existing IDs. A typo in a concept ID silently breaks a link.
- **Graph initialization in `aides/src/components/Graph/GraphCanvas.tsx`:** The X6 loading timeout, polling fallback, and cleanup logic are complex and fragile but untested.
- **Routing in `aides/src/pages/concept.tsx`:** The URL parameter parsing and state management are untested. Edge cases: missing ID, invalid ID, direct URL access.
- **Layout algorithm in `aides/src/components/Graph/GraphCanvas.tsx` (lines 395-429):** The category-based layout function handles categories in a fixed order and centers nodes. Adding a new category or changing node count could cause overlaps.

---

*Concerns audit: 2026-06-10*
