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

This is a **multi-page** Next.js 14 App Router site with three routes: `/` (home), `/experiences`, `/about`.

- **`app/layout.tsx`** is the shared shell for every route: loads the two Google Fonts (`lib/fonts.ts`) as CSS variables, sets site-wide metadata/viewport, and renders `<Nav />` + `<RouteProgress />` + `<PageTransition>{children}</PageTransition>` + `<Footer />`. Nav and Footer are NOT duplicated per page.
- **Each route is a thin wrapper** (`app/page.tsx`, `app/experiences/page.tsx`, `app/about/page.tsx`) that renders a single top-level client component from `components/site/` (`HomePage.tsx`, `ExperiencesPage.tsx`, `AboutPage.tsx`). All page content, section markup, and section-local CSS lives inside these components — not spread across smaller subcomponents — matching the single-big-component convention from the sibling project `electricaffair.co.nz`.
- **Styling is inline styles + one injected `<style dangerouslySetInnerHTML>` block per component** (named `*_CSS`, e.g. `HOME_CSS`, `EXPERIENCES_CSS`) — **not** Tailwind (Tailwind is not installed in this project at all, unlike Electric Affair where it's configured but unused). Everything that needs `:hover`, `::after`, `@keyframes`, or a media query goes in that string as a named class (`.ss-*` prefix); everything else is a plain inline `style={{}}` object using hardcoded brand hex values.
- **Shared components** live in `components/site/`: `Nav.tsx` (fixed/blurred header, mobile hamburger overlay, active-link glow dot via `usePathname`), `Footer.tsx` (brand/nav/social columns), `SectionHeading.tsx` (reusable label/title/subtitle/decorative-line heading used across all three pages), `RouteProgress.tsx` (thin top progress bar that animates on `usePathname` change), `PageTransition.tsx` (fade/slide-in wrapper keyed on `pathname` to retrigger on navigation).
- **Content is data-driven from `lib/`**: `lib/constants.ts` (site name/tagline, legal entity, nav links, social links), `lib/colors.ts` (brand hex token object, mostly for reference — components still hardcode hex strings inline like Electric Affair does), `lib/fonts.ts` (Bebas Neue for headings, Inter for body, exposed as `--font-bebas`/`--font-inter`), `lib/experiences-data.ts` (the four experience brands: Spellbound, Anti Social, Bass Ritual, Back In The Day, each with an `image` path). When copy or experience details change, edit these files, not the page components.
- **Images** are self-hosted under `public/images/{hero,experiences,about}/` and rendered via `next/image` with `fill`. They're AI-generated (Midjourney) standing in for real Signature Socials event photography — raw/original generations are kept under `docs/midjourney/` for reference. Swap files in place when real photos are available; no code changes needed as long as filenames match.
- **`app/icon.tsx`** generates the favicon at request time via `next/og` (`ImageResponse`, edge runtime) — an "SS" monogram on a purple background — rather than a static image asset.
- **Brand tokens**: midnight `#0A0A0A`/`#1A1A1A`, purple `#7C3AED`, white `#F8FAFC`, cyan `#00E5FF`, magenta `#FF2D95`. See `lib/colors.ts` for the full token set.
- Accessibility: a CSS-only skip-to-content link (`.ss-skip-link` in `app/globals.css`) is the first element in `<body>`; all interactive elements have hover/focus states; motion respects `prefers-reduced-motion`.

## Reference material

The original implementation brief (written for a Hermes hand-off) lives at `docs/2026-07-06_signature-socials-website.md`. It describes gradient-placeholder imagery; that approach was superseded once real Midjourney photography was generated and dropped into `public/images/` — treat the code as the source of truth over that doc.

## Git workflow

Work happens on feature branches, not directly on `master`/`main`. This repo has no remote configured yet, so branches are local-only for now — push and PR workflow applies once a remote is added.
