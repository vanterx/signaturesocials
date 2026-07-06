# Signature Socials

New Zealand's electronic nightlife collective — brand website built with Next.js 14 (App Router).

Live at: `https://signaturesocials.nz` _(pending domain launch)_

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev     # start dev server (port 3000, auto-increments if occupied)
npm run build   # production build (also runs type-check + lint)
npm run start   # serve the production build (run after npm run build)
npm run lint    # next lint
```

There is no test suite in this repo.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Inline styles + injected `<style>` blocks** for CSS — no Tailwind
- **Oswald Light** (display/headings, matching the logo wordmark) + **Inter** (body) via `next/font/google`
- Self-hosted images (`public/images/`), AI-generated (Midjourney) placeholders for real event photography

## Structure

Mostly a single-page site: primary content lives on `/`, with anchored sections at `/#experiences` and `/#about`, plus a standalone `/events` page for SEO. See [CLAUDE.md](CLAUDE.md) for the full architecture breakdown, styling conventions, and data file locations.
