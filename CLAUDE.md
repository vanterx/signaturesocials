# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # start dev server (next dev) — port 3000, auto-increments if occupied
npm run build   # production build (also runs type-check + lint via Next's build step)
npm run start   # serve the production build (run after npm run build)
npm run lint    # next lint
```

There is no test suite in this repo.

## Architecture

This is mostly a **single-page** Next.js 14 App Router site — the primary content lives on `/`, with anchored sections at `/#experiences` and `/#about` — plus one standalone SEO-oriented page at `/events`. `app/experiences/page.tsx` and `app/about/page.tsx` are server-side redirects to the anchors, kept so old links don't 404. Nav links (in `lib/constants.ts`) point at the anchors and at `/events`.

- **`app/layout.tsx`** is the shared shell for every route: loads the two Google Fonts (`lib/fonts.ts`) as CSS variables, sets site-wide metadata/viewport, injects the site-wide `Organization` JSON-LD schema, and renders `<Nav />` + `<RouteProgress />` + `<PageTransition>{children}</PageTransition>` + `<Footer />`. Nav and Footer are NOT duplicated per page.
- **`app/page.tsx` is a thin wrapper** around `components/site/HomePage.tsx`, which carries the hero, genre marquee ticker, values bento, the four experience brand cards (`id="experiences"`), the "why people keep coming back" list, upcoming events, and a `BreadcrumbList` JSON-LD schema, then renders `components/site/AboutSections.tsx` (`id="about"`: story, promise quote, community list, and the image-backed closing statement). The page was split into these two components only to stay under the 800-line file cap — content otherwise follows the single-big-component convention from the sibling project `electricaffair.co.nz`.
- **`app/events/page.tsx`** is a real (non-redirect) route wrapping `components/site/EventsPage.tsx` — a standalone events listing with its own metadata targeting discovery/ticket-search keywords (distinct from the brand-focused root metadata) and a per-event `Event` JSON-LD schema. This exists specifically for SEO depth: the single-page home optimizes for brand search, `/events` optimizes for "buy tickets" / "upcoming shows" search intent.
- **Styling is inline styles + one injected `<style dangerouslySetInnerHTML>` block per component** (named `*_CSS`, e.g. `HOME_CSS`, `ABOUT_CSS`; site-wide primitives like `.ss-eyebrow`, `.ss-tag` (skewed ticket-stub tag, needs an inner `<span>` for the counter-skew), `.ss-cta-btn`, `.ss-gradient-text` live in `app/globals.css`) — **not** Tailwind (Tailwind is not installed in this project at all, unlike Electric Affair where it's configured but unused). Everything that needs `:hover`, `::after`, `@keyframes`, or a media query goes in that string as a named class (`.ss-*` prefix); everything else is a plain inline `style={{}}` object using hardcoded brand hex values.
- **Shared components** live in `components/site/`: `Nav.tsx` (fixed/blurred header, mobile hamburger overlay with focus trap + body scroll lock, active-link glow dot via `usePathname`), `Footer.tsx` (brand/nav/social columns + placeholder newsletter form), `SocialIcons.tsx` (inline SVG brand icons + `SOCIAL_ICON_LINKS` list used by both Nav and Footer), `SectionHeading.tsx`, `RevealSection.tsx` (IntersectionObserver scroll reveal), `IndexList.tsx` (numbered editorial rows with accent color), `ParticleField.tsx` (client-side-generated ambient particles), `RouteProgress.tsx`, `PageTransition.tsx`.
- **Content is data-driven from `lib/`**: `lib/constants.ts` (site name/tagline, legal entity, nav links, social links), `lib/colors.ts` (brand hex token object, mostly for reference — components still hardcode hex strings inline like Electric Affair does), `lib/fonts.ts` (Bebas Neue for headings, Inter for body, exposed as `--font-bebas`/`--font-inter`), `lib/experiences-data.ts` (the four experience brands: Spellbound, Anti Social, Bass Ritual, Back In The Day, each with an `image` path), `lib/home-data.ts` (value tiles, ticker items, reasons list, upcoming events for the home page). When copy or event details change, edit these files, not the page components. **Known duplication**: `EventsPage.tsx` keeps its own separate `UPCOMING_EVENTS` array (with `schema_date` fields for the `Event` JSON-LD) instead of importing from `lib/home-data.ts` — update both lists when a real event is added or dates change.
- **Images** are self-hosted under `public/images/{hero,experiences,about}/` and rendered via `next/image` with `fill`. They're AI-generated (Midjourney) standing in for real Signature Socials event photography — raw/original generations are kept under `docs/midjourney/` for reference. Swap files in place when real photos are available; no code changes needed as long as filenames match.
- **`app/icon.tsx`** generates the favicon at request time via `next/og` (`ImageResponse`, edge runtime) — an "SS" monogram on a purple background — rather than a static image asset.
- **Brand tokens**: midnight `#0A0A0A`/`#1A1A1A`, purple `#7C3AED`, white `#F8FAFC`, cyan `#00E5FF`, magenta `#FF2D95`. See `lib/colors.ts` for the full token set.
- Accessibility: a CSS-only skip-to-content link (`.ss-skip-link` in `app/globals.css`) is the first element in `<body>`; all interactive elements have hover/focus states; motion respects `prefers-reduced-motion`.
- **SEO**: JSON-LD schema is inlined per-page via `<script type="application/ld+json">` rather than a shared helper — `Organization` in `app/layout.tsx`, `BreadcrumbList` in `HomePage.tsx`, `Event` (one script per event) in `EventsPage.tsx`. All schema URLs are hardcoded to `https://signaturesocials.nz` — update that domain across all three files if it changes before launch.

## Reference material

The original implementation brief (written for a Hermes hand-off) lives at `docs/2026-07-06_signature-socials-website.md`. It describes gradient-placeholder imagery; that approach was superseded once real Midjourney photography was generated and dropped into `public/images/` — treat the code as the source of truth over that doc.

## Git workflow

Work happens on feature branches, not directly on `master`/`main`. This repo has no remote configured yet, so branches are local-only for now — push and PR workflow applies once a remote is added.
