# SEO Plan

## Goal
Improve organic visibility and click-through rate by fixing technical SEO, adding route-specific metadata, and enabling rich results for content pages.

## Production Domain
- Canonical production domain: `https://cyber.coding-academy.co.il/`
- Any existing references to `https://gama.coding-academy.co.il/` should be treated as stale and replaced.

## Current State Summary
- Global SEO is only defined in [index.html](../index.html), so all routes share the same metadata.
- [public/sitemap.xml](../public/sitemap.xml) includes only the homepage.
- [public/robots.txt](../public/robots.txt) is valid but minimal.
- Content pages exist for exams and blog, but route-level SEO metadata is missing.
- Actual public routes in this app are `/quiz` and `/articles`, not `/exams` and `/blog`.

## Router Decision: HashRouter vs BrowserRouter

### Current situation
- The app currently uses `HashRouter`.
- This means deep pages resolve as fragment URLs such as `/#/quiz/gama-cyber` rather than clean paths like `/quiz/gama-cyber`.

### SEO impact
- Search engines can index the root page, but hash-fragment routes are weaker as canonical public URLs.
- Social sharing, canonical consistency, sitemap accuracy, and Search Console coverage are all better with clean path routing.
- `robots.txt` does not control URL fragments, so runtime exclusion must rely on meta robots rather than crawler path rules.

### Recommended direction
- Keep the current metadata work in place immediately.
- Plan a separate migration from `HashRouter` to `BrowserRouter` once deployment rewrites are confirmed.

### Migration prerequisites
- Hosting must rewrite unknown routes to the app entry point.
- GitHub Pages does not support this natively without a workaround.
- If this project remains on GitHub Pages, we should either:
	- keep `HashRouter`, or
	- add a known SPA fallback workaround and verify it carefully.

### Approval gate
- Do not change routing yet.
- Before any router migration work, explicitly approve one of these options:
	- stay on `HashRouter` and accept limited SEO depth for route pages
	- migrate to `BrowserRouter` with hosting support or SPA fallback handling

## Priority 1: Critical (Do First)

### 1. Add dynamic meta management
- Install `react-helmet-async`.
- Wrap app root with `HelmetProvider`.
- Add route-specific `Helmet` entries in each page component.

Pages to cover:
- `/` Landing page
- `/quiz` exams listing
- `/quiz/:quizId` exam intro
- `/articles` blog listing
- `/articles/:slug` article page
- `/quiz/:quizId/test` should be noindex
- results views should be noindex

Required per route:
- Unique `<title>`
- Unique `<meta name="description">`
- Canonical URL
- Open Graph title/description/image
- Twitter card title/description/image

### 2. Fix sitemap coverage
- Expand [public/sitemap.xml](../public/sitemap.xml) with all indexable routes:
	- `/`
	- `/quiz`
	- each `/quiz/:quizId`
	- `/articles`
	- each `/articles/:slug`
- Add `lastmod`, `changefreq`, and `priority` for each entry.

### 3. Add structured data baseline
- Add `Organization` JSON-LD in [index.html](../index.html).
- Add `WebSite` JSON-LD with site URL and name.

### 4. Block user-session pages from indexing
- In route metadata for test/results pages, set:
	- `<meta name="robots" content="noindex,follow">`
- In [public/robots.txt](../public/robots.txt), disallow crawl paths if they are not intended for search discovery.

## Priority 2: High Impact

### 5. Add blog rich result schema
In [src/components/Blog/BlogPost.tsx](../src/components/Blog/BlogPost.tsx):
- Add `Article` JSON-LD using article title, description/excerpt, image, publish date, and author/publisher.

### 6. Add exams list schema
In [src/components/ExamsScreen/ExamsScreen.tsx](../src/components/ExamsScreen/ExamsScreen.tsx):
- Add `ItemList` JSON-LD describing exam entries.

### 7. Add breadcrumbs and breadcrumb schema
- UI breadcrumb trail on nested routes:
	- exam intro pages
	- blog post pages
- Add `BreadcrumbList` JSON-LD matching the visible breadcrumb path.

### 8. Add review/testimonial schema
In [src/components/LandingPage/LandingPage.tsx](../src/components/LandingPage/LandingPage.tsx):
- If testimonials are real and policy-safe, add `Review`/`AggregateRating` schema.

## Priority 3: Medium

### 9. Improve social preview quality
In [index.html](../index.html) and route-level tags:
- Add `og:image:width` and `og:image:height`.
- Ensure image size is consistent and share-safe.

### 10. Improve platform metadata
In [index.html](../index.html):
- Add `theme-color`.
- Add `apple-touch-icon`.
- Add `meta name="robots" content="index,follow"` default for indexable pages.

### 11. Prepare multilingual readiness
- Keep Hebrew as primary.
- If English pages are added, include hreflang pairs:
	- `he`
	- `en`
	- `x-default`

### 12. Automate sitemap generation
- Replace manual sitemap updates with build-time generation using route + data sources.
- Sources:
	- exam JSON files in [public/exams](../public/exams)
	- article slugs in [src/data/articles.ts](../src/data/articles.ts)

## Implementation Order (Checklist)
- [ ] Install `react-helmet-async` and wire provider
- [ ] Add route metadata for all screens
- [ ] Add noindex for `/exam` and `/results`
- [ ] Expand sitemap to all routes
- [ ] Add Organization + WebSite JSON-LD in root HTML
- [ ] Add Article JSON-LD to blog post screen
- [ ] Add ItemList JSON-LD to exams screen
- [ ] Add breadcrumb UI + BreadcrumbList JSON-LD
- [ ] Add social image dimensions and metadata polish
- [ ] Automate sitemap generation

## Validation Steps
- Google Rich Results Test (JSON-LD validity)
- Open Graph debugger checks for key pages
- Confirm canonical tags match actual route URL
- Confirm page title and description change on route navigation
- Confirm `/exam` and `/results` are noindex
- Re-submit sitemap in Search Console after deployment

## Success Criteria
- Every indexable route has unique title, description, canonical, OG/Twitter tags.
- Sitemap includes all discoverable pages.
- Structured data validates on blog and core pages.
- Session pages are excluded from indexing.
- Search snippets and social shares are accurate and route-specific.
