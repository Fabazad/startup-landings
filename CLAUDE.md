# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

Node 20.x. Yarn is the package manager (`packageManager: yarn@1.22.22`).

```sh
yarn dev          # Next.js dev server on port 8082
yarn build        # production build
yarn start        # production server on port 8082
yarn ts           # type-check only (tsc --noEmit --incremental)
yarn ts:watch     # type-check in watch mode
yarn dev:ts       # dev + ts:watch in parallel
yarn lint         # eslint src/**/*.{js,jsx,ts,tsx}
yarn lint:fix
yarn fm:check     # prettier check
yarn fm:fix
yarn analyze      # bundle analyzer (ANALYZE=true next build)
```

There is no test runner configured.

## Architecture

This is a **Next.js 14 App Router** project that serves **multiple product landing pages from a single codebase**, switched by subdomain at request time. The codebase is based on the Minimals MUI kit (`@minimal-kit/next-ts`), so a lot of `src/components/`, `src/sections/` (outside `landing/`), `src/_mock/`, `src/theme/`, etc. is template scaffolding that the active app does not use — focus on the landing/product-idea path.

### Multi-tenant: one app, many landings

Each product (Envy, Insight Feed, Triply, Train Back, Viby) is a fully-declared `RawProductIdea` object under `src/ProductIdeas/<Name>/json.ts`, registered in `src/ProductIdeas/index.ts`. A `RawProductIdea` (see `src/types/ProductIdea.ts`) declares everything that varies between landings: hero copy, features, flow, benefits, reviews, plans, FAQ pages, privacy policy, theme color, logo, keywords, extra links, etc. All user-facing strings are `Translated = { en: string; fr: string }`.

`src/app/getProductIdea.ts` resolves the current product from the request host:

- `envynest.fr` → Envy (special-cased custom domain)
- otherwise the leftmost subdomain is matched against `RawProductIdea.id` (so `triply.onama.io` → Triply)
- no match → returns `null`, and the home page renders `ProjectsDirectoryView` (a directory of all landings) instead of `LandingView`

`getRawProductIdea()` and `getProductIdea()` are `cache()`-wrapped — call them freely from layouts/pages/metadata; they de-dupe per request. Use `getLandingProductIdea()` (throws if none) only in routes guaranteed to be on a product subdomain.

When adding metadata, structured data, or canonical URLs: Envy uses `https://envynest.fr`; every other product uses `https://<id>.onama.io`. See the `isEnvy` branch in `src/app/(landing)/page.tsx` and `getProductIdea.ts`.

`translateProductIdea(raw, lang)` flattens the `Translated` fields down to plain strings for a chosen language — use the `Raw*` types on the server when you still need both languages (e.g. structured data, sitemap), and the resolved types (`ProductIdea`, `Feature`, …) once you've picked a language.

### i18n

Two languages: `en`, `fr` (`fallbackLng = 'fr'`). See `src/locales/config-locales.ts`. Language is resolved in `src/middleware.ts` with this priority: `?lang=` query → `i18next` cookie → `Accept-Language` → fallback. A `?lang=` param triggers a redirect to the clean URL and persists the cookie. The middleware sets `x-lang` on the request headers; server code reads it via `detectLanguage()` from `src/locales/server`. The middleware matcher excludes `api`, `_next/static`, `_next/image`, `favicon.ico`, `logo`, `assets`.

Localized URL slugs: FAQ pages declare `slug: { en, fr }` (e.g. `birthday-wishlist` vs `liste-anniversaire`). The sitemap emits both and links them as alternates.

### Routing layout

- `src/app/(landing)/` — the actual customer-facing app: `page.tsx` (landing/directory), `blog/`, `blog/[slug]/`, `faq/[slug]/`, `privacy-policy/`.
- `src/app/api/` — `scrap/` (URL scraping), `blog/list|publish|unpublish`, `contact/`, `subscriptions/`. `blog/publish` is an upsert keyed by `product_idea_id`+`language`+`slug` (input validated by `blogUpsertSchema`): `title`/`content` are required only when creating a post — an existing one can be patched with any subset of fields. Include `content_refreshed_at` (ISO timestamp) to resurface a post to the top of the list, `null` to un-resurface, or omit it to leave ordering untouched (a normal edit must not resurface a post).
- `src/sections/landing/` — the landing page sections (`LandingHero`, `LandingFeatures`, `LandingFlow`, `LandingBenefits`, `LandingTestimonials`, `LandingPricing`, `LandingFAQ`) and the directory view. `LandingView` and `ProjectsDirectoryView` are imported via `next/dynamic` from `page.tsx`.
- `src/routes/paths.ts` — most of `paths.*` is template boilerplate; `paths.envy.*` is the live one used as `auth.redirectPath`.

`src/sections/` and `src/components/` outside the `landing/` subtrees are inherited from the Minimals template — prefer reusing what's already imported by the landing pages over reaching into untouched template code.

### Data + integrations

- **Supabase** (`@supabase/ssr`, `@supabase/supabase-js`) — blog content lives in a `blogs` table keyed by `product_idea_id` (the product `name`, e.g. `Envy`) + `language` + `published`. See `src/app/api/blog/list/route.ts` and `src/app/sitemap.ts`. Server-only admin client uses `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`.
- **Scrapers** (`src/lib/scrappers/`) — `all/`, `amazon/`, `cheerio/`, `listy/`, `openai/`. Imported dynamically inside `src/app/api/scrap/route.ts` to keep them out of the main bundle.
- **PostHog** analytics + **Vercel Analytics/Speed Insights**, **Resend** for email, **Crisp** chat — all wired through `src/app/providers/` and `client-app-shell.tsx`.
- **Auth** is Supabase but `auth.skip: false` and the redirect target is `paths.envy.root`; the actual product app lives at `https://envy2.onama.io` and `/envy/*` is rewritten there (see `next.config.mjs` `rewrites()` and `vercel.json`).

### Config

`src/config-global.ts` (`CONFIG`) is the single source for env-backed config (Supabase, PostHog, Resend, OpenAI, Amazon affiliate, Mapbox, blog AI secret). Always read env via `CONFIG.*` rather than `process.env.*` directly.

### Next config notes (`next.config.mjs`)

- `trailingSlash: true` — every internal URL ends with `/`. Match this when constructing links/sitemap entries.
- `serverComponentsExternalPackages: ['re2', 'url-regex-safe']` — needed by the scrapers.
- SVG imports are handled by `@svgr/webpack`; `.md` imports come through as `asset/source` (raw strings) — used for privacy policies (`privacyPolicyEn.md` / `privacyPolicyFr.md`).
- `optimizePackageImports` + `modularizeImports` aggressively tree-shake MUI/Framer/Iconify — don't add barrel re-exports for these packages.
- `/envy` and `/envy/:path*` are rewritten to `envy2.onama.io` (the real product app), so don't add app routes under `/envy/*`.

## Conventions

- TypeScript strict mode is on; absolute imports use `src/` (baseUrl is repo root). Prefer `import { … } from 'src/…'` over relative paths that climb the tree.
- ESLint: airbnb + airbnb-typescript + prettier; `react/require-default-props` is `defaultArguments`-only; `unused-imports` rule is active (prefix unused with `_`).
- Prettier: single quotes, semicolons, trailing commas `es5`, printWidth 100, LF.
- Icons in product-idea JSON use Material Design Icons names (`mdi:...`); for SEO/UI duotone icons the codebase uses Solar (`solar:...-bold-duotone`). See JSDoc on `RawFeature.icon` / `RawFAQPage.icon` in `src/types/ProductIdea.ts`.
- Reviews convention (documented in `src/types/ProductIdea.ts`): non-gendered first names with last initial, ratings of 4 or 5 with ~80% being 5s, content ≤120 chars.
