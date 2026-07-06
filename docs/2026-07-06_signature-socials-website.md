# Signature Socials — Website Implementation Plan

> **For Hermes:** Hand off to user as structured Claude Code prompts.
>
> **For User:** Run each section's `claude -p "...prompt..."` in sequence. Each prompt is self-contained — point it at `C:\GitHub\signaturesocials.co.nz\` once scaffolded. Iterate in rounds: scaffold → build pages → review → refine.

**Goal:** Build a 3-page brand website for Signature Socials, New Zealand's electronic nightlife collective. Dark, immersive, club-vibe aesthetic. Clean multi-page architecture.

**Tech Stack:** Next.js 14 App Router, TypeScript, inline styles + injected `<style>` blocks (NOT Tailwind utility classes), `next/font/google`, `lucide-react` icons, `next/image`.

**Brand Palette:**
| Role        | Hex       | Usage                          |
|-------------|-----------|--------------------------------|
| Midnight    | `#0A0A0A` | Backgrounds (70% of page)      |
| Purple      | `#7C3AED` | Signature brand colour          |
| White       | `#F8FAFC` | Body text                       |
| Neon Cyan   | `#00E5FF` | Highlights, buttons, accents    |
| Hot Magenta | `#FF2D95` | Energy accents, hover states    |

**Ratio:** 70% Black · 20% White · 10% Purple/Cyan/Magenta

**Visual Direction:** Club lights, lasers, smoke, packed dancefloors, hands in the air, DJs in action, friends laughing — high-quality photography.

---

## Phase 0: Project Scaffold

### Prompt 0.1 — Create Next.js project

```bash
cd /c/GitHub
npx create-next-app@14 signaturesocials.co.nz --typescript --app --src-dir=false --import-alias="@/*" --eslint --no-tailwind --use-npm
cd signaturesocials.co.nz
```

### Prompt 0.2 — Install dependencies

```bash
npm install lucide-react clsx
```

### Prompt 0.3 — Set up fonts (`lib/fonts.ts`)

Create file `lib/fonts.ts`:

```typescript
import { Bebas_Neue, Inter } from 'next/font/google'

export const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-bebas',
  display: 'swap',
})

export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})
```

### Prompt 0.4 — Set up color tokens (`lib/colors.ts`)

Create file `lib/colors.ts`:

```typescript
export const COLORS = {
  midnight: '#0A0A0A',
  midnightLight: '#1A1A1A',
  midnightLighter: '#2A2A2A',
  purple: '#7C3AED',
  purpleLight: '#9D5CFF',
  purpleDark: '#5B21B6',
  white: '#F8FAFC',
  whiteMuted: '#CBD5E1',
  cyan: '#00E5FF',
  cyanGlow: '#00E5FF',
  magenta: '#FF2D95',
  magentaGlow: '#FF2D95',
  gradient: 'linear-gradient(135deg, #7C3AED 0%, #FF2D95 50%, #00E5FF 100%)',
} as const
```

### Prompt 0.5 — Set up constants (`lib/constants.ts`)

Create file `lib/constants.ts`:

```typescript
export const SITE_NAME = 'Signature Socials'
export const SITE_TAGLINE = "New Zealand's Electronic Nightlife Collective"
export const SITE_DESCRIPTION = 'Premium electronic music events and nightlife experiences across New Zealand. Underground club nights, international artists, house, techno, trance.'
export const LEGAL_ENTITY = '3333 Events and Productions Limited'
export const COPYRIGHT_YEAR = 2026

export const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'EXPERIENCES', href: '/experiences' },
  { label: 'ABOUT', href: '/about' },
] as const

export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/signaturesocials',
  facebook: 'https://facebook.com/signaturesocials',
  // Add actual links when available
} as const
```

### Prompt 0.6 — Set up experiences data (`lib/experiences-data.ts`)

Create file `lib/experiences-data.ts`:

```typescript
export interface Experience {
  id: string
  name: string
  tagline: string
  description: string
  vibe: string
  image?: string
}

export const experiences: Experience[] = [
  {
    id: 'spellbound',
    name: 'Spellbound',
    tagline: 'Where music, art and imagination collide.',
    description: 'Step into an immersive world where music, visual art and imagination collide. Expect hypnotic production, unforgettable performances and a dancefloor unlike any other.',
    vibe: 'Immersive · Hypnotic · Otherworldly',
  },
  {
    id: 'anti-social',
    name: 'Anti Social',
    tagline: 'Raw. Underground. Unfiltered.',
    description: 'A celebration of darker electronic music, intimate venues and late-night energy.',
    vibe: 'Dark · Underground · Raw',
  },
  {
    id: 'bass-ritual',
    name: 'Bass Ritual',
    tagline: 'Felt, not just heard.',
    description: 'Rolling basslines. Driving rhythms. Deep underground culture. A gathering for those who believe the best music is felt, not just heard.',
    vibe: 'Deep · Driving · Heavy',
  },
  {
    id: 'back-in-the-day',
    name: 'Back In The Day',
    tagline: 'The soundtrack of generations.',
    description: 'A celebration of timeless dance music that still fills dancefloors today.',
    vibe: 'Nostalgic · Timeless · Euphoric',
  },
]
```

---

## Phase 1: Layout & Shared Components

> Run these as a single `claude -p "..."` with the working set constrained to `signaturesocials.co.nz/`.

### Prompt 1.1 — Root Layout + Global CSS + Nav + Footer

```bash
claude -p "
Build the root layout, nav, and footer for a nightlife brand website at C:\\GitHub\\signaturesocials.co.nz.

This is a Next.js 14 App Router project with TypeScript. Do NOT use Tailwind CSS utility classes — use inline styles + a single injected <style dangerouslySetInnerHTML> block in each client component, matching the existing pattern in the Electric Affair site at C:\\GitHub\\electricaffair.co.nz\\components\\site\\ElectricAffairExperience.tsx (review that file first for the pattern).

## Files to create/modify:

### 1) app/globals.css — Minimal global reset
Keep it minimal:
- body { background:#0A0A0A; color:#F8FAFC; margin:0; padding:0; font-family:var(--font-inter); }
- *,*::before,*::after { box-sizing:border-box; }
- html { scroll-behavior:smooth; }
- ::-webkit-scrollbar { display:none; }
- * { -ms-overflow-style:none; scrollbar-width:none; }
- a { color:inherit; text-decoration:none; }
- img { max-width:100%; display:block; }

### 2) app/layout.tsx — Root layout
Import { bebasNeue, inter } from '@/lib/fonts' (already created).
Import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'.
Title: 'Signature Socials | New Zealand's Electronic Nightlife Collective'
Description from constants.
Metadata: openGraph with title/description, twitter card.
Viewport: device-width, initial-scale=1.
Renders: <html> with font variables, <body>, then Nav, {children}, Footer, all wrapped in a flex column min-h-screen.

### 3) components/site/Nav.tsx — 'use client'
Imports { NAV_LINKS } from '@/lib/constants'.
Uses useState for mobile menu toggle.
Uses usePathname from 'next/navigation' to highlight active link.
Desktop: horizontal nav with brand logo text 'SIGNATURE SOCIALS' on left, links on right, purple underline on active page.
Mobile: hamburger (Menu/X from lucide-react) that opens a full-screen overlay menu with links stacked vertically.
Nav bar is fixed at top, z-50, background rgba(10,10,10,0.95) with backdrop-filter:blur(12px), bottom border 1px solid rgba(124,58,237,0.2).
Injected <style> block: @keyframes slide-down { from { transform:translateY(-100%) } to { transform:translateY(0) } } for the mobile menu.
Link hover: color changes to #7C3AED (purple) with a subtle glow transition.

### 4) components/site/Footer.tsx — 'use client'
Imports { SITE_NAME, LEGAL_ENTITY, COPYRIGHT_YEAR, SOCIAL_LINKS } from '@/lib/constants'.
Imports { Instagram, Facebook, Music } from 'lucide-react'.
Three sections:
- LEFT: Brand name 'SIGNATURE SOCIALS' in bebas-neue (large), tagline 'New Zealand's Electronic Nightlife Collective' in smaller muted text.
- CENTER: Nav links (same as NAV_LINKS) as a column of links using Link from 'next/link'.
- RIGHT: 'Produced by 3333 Events & Productions' text, social icons (Instagram, Facebook) with purple glow hover.
Bottom bar: copyright line with a subtle top border.
Background #0A0A0A, text #F8FAFC, muted text #CBD5E1.
Injected <style> block with hover animations for social icons.

### 5) components/site/SectionHeading.tsx — 'use client'
A reusable heading component:
Props: { label?: string, title: string, subtitle?: string, align?: 'left'|'center', light?: boolean }
- label is a small uppercase tag above the title in #7C3AED with letter-spacing 0.2em
- title uses bebas-neue font variable (--font-bebas), large size
- subtitle is smaller muted text below
- If align='center', everything is text-align center
- light prop makes title #F8FAFC, otherwise uses default
- Optional decorative line below title: 60px wide, 2px tall, gradient from #7C3AED to #00E5FF

### 6) app/icon.tsx — Dynamic favicon
Generate a simple 'SS' monogram favicon using next/og (ImageResponse) matching Electric Affair's pattern at C:\\GitHub\\electricaffair.co.nz\\app\\icon.tsx.
Background: #7C3AED (purple). Text: 'SS' in white, bold.

## Styling rules:
- ALL CSS animations, pseudo-classes, responsive rules go in a single injected <style dangerouslySetInnerHTML> block per component (name it GLOBAL_CSS or COMPONENT_STYLES).
- Colors: midnight #0A0A0A, purple #7C3AED, white #F8FAFC, cyan #00E5FF, magenta #FF2D95.
- Responsive: Mobile-first. At 768px breakpoint, the layout shifts.
- Font sizes use clamp() where appropriate for fluid scaling.
- All interactive elements have transition:all 0.2s ease.

## Verification:
Run 'npm run build' and confirm it compiles without errors.
Run 'npm run dev' and confirm all 3 routes (/, /experiences, /about) render the layout shell (Nav + Footer + empty page content area).
"
```

---

## Phase 2: Home Page

### Prompt 2.1 — Home Page Component

```bash
claude -p "
Build the Home page for Signature Socials — a nightlife brand at C:\\GitHub\\signaturesocials.co.nz.

Review the existing pattern at C:\\GitHub\\electricaffair.co.nz\\components\\site\\ElectricAffairExperience.tsx for inline style approach. Do NOT use Tailwind utility classes.

## File to create:
### components/site/HomePage.tsx — 'use client'
Full page content for the home route. This is a vertically scrolling single-page experience with the following sections:

### SECTION 1: Hero
- Full viewport height (100vh) hero with:
  - Dark gradient background (from #0A0A0A at top, through rgba(124,58,237,0.15) in middle, back to #0A0A0A)
  - Large animated text: 'WELCOME TO' (small above, muted) then 'SIGNATURE SOCIALS' (huge, bebas-neue font, 7rem+ on desktop)
  - Below: tagline 'New Zealand's Electronic Nightlife Collective' in white/cyan
  - Below: a short pull-quote: 'Some nights are forgotten. Others become stories you'll tell for years.'
  - A cyan button: 'EXPLORE EXPERIENCES' that links to /experiences via Link from next/link
  - A scroll-down indicator (ChevronDown icon from lucide-react) that bounces, hinting to scroll
  - Injected CSS: @keyframes fade-in-up for entrance animation, @keyframes bounce-y for scroll indicator
  - CSS: add a subtle animated gradient overlay on the hero — a pseudo-element that shifts hue slowly (10s cycle)

### SECTION 2: Intro / Values
- Section with heading 'Built for People Who Live for the Night'
- Body text (copy from the brief — the long paragraph about creating experiences)
- A 2x2 grid of value cards (on mobile stacked, on desktop 2x2):
  - 'The Music' — Music icon from lucide-react, purple glow border
  - 'The Energy' — Zap icon, cyan glow
  - 'The Production' — Sparkles icon, magenta glow
  - 'The People' — Users icon, purple glow
  Each card: dark bg (#1A1A1A), 1px border colored to match its glow, rounded corners, icon + label + short description, hover lift effect (transform:translateY(-4px))

### SECTION 3: Our World (the bullet-point list)
- Heading: 'Our World'
- A 3-column grid (1 on mobile, 2 on tablet, 3 on desktop) of the world items:
  - Underground Club Nights
  - International & New Zealand Artists
  - House · Techno · Trance · Progressive · Psytrance (single card with genre tags)
  - Premium Sound & Lighting
  - Immersive Visual Experiences
  - Creative Themes
  - Inclusive Dancefloors
  - Unforgettable Memories
- Each item is a card with an icon from lucide-react, dark bg (#1A1A1A), subtle border, and a hover effect with purple glow

### SECTION 4: More Than an Event (closing statement)
- Full-width section with centered text
- 'More Than an Event. It's a feeling.' in large bebas-neue
- The series of short lines: 'It's anticipation before the first drop. It's losing yourself in the music. It's finding your people.'
- Each line fades in one after another with stagger animation (use IntersectionObserver or CSS animation-delay)
- Background: gradient that goes dark to slightly purple-tinted and back
- Final CTA: 'Welcome to Signature Socials. Where the night begins.' with a Link button to /experiences

### SECTION 5: Wait... a footer teaser
- Small section above the actual footer (which is in layout.tsx)
- Just a purple gradient horizontal rule and the text 'Where Every Beat Brings People Together'

## Styling rules:
- Section padding: 100px 24px (desktop), 60px 16px (mobile). Max-width 1200px centered for content, full-bleed backgrounds.
- All animations in injected <style> block.
- Responsive breakpoints: 768px (tablet), 480px (mobile).
- Font family: headings use var(--font-bebas) (Bebas Neue), body uses var(--font-inter) (Inter).
- Colors: midnight #0A0A0A, purple #7C3AED, white #F8FAFC, cyan #00E5FF, magenta #FF2D95.
- Use framer-motion? No. Pure CSS animations + IntersectionObserver (via useEffect/useRef) for scroll-triggered reveals.

## Verification:
Update app/page.tsx to import and render <HomePage /> instead of the default Next.js page.
Run 'npm run build' — must compile cleanly.
Navigate to http://localhost:3000 — hero fills viewport, sections scroll smoothly, animations play.
"
```

---

## Phase 3: Experiences Page

### Prompt 3.1 — Experiences Page Component

```bash
claude -p "
Build the Experiences page for Signature Socials at C:\\GitHub\\signaturesocials.co.nz.

Review the inline-style pattern at C:\\GitHub\\electricaffair.co.nz\\components\\site\\ElectricAffairExperience.tsx. Do NOT use Tailwind utility classes.

## Files to use:
- lib/experiences-data.ts (already created with Spellbound, Anti Social, Bass Ritual, Back In The Day)
- lib/colors.ts (color tokens)
- components/site/SectionHeading.tsx (reusable heading component)

## File to create:
### components/site/ExperiencesPage.tsx — 'use client'

### SECTION 1: Hero Banner
- Full-width (60vh min-height) hero with dark gradient background
- Large heading: 'EVERY EVENT HAS A PULSE' in bebas-neue, huge size
- Subtitle: 'No templates. No ordinary nights. Every Signature Socials experience is built with its own identity, atmosphere and story.'
- Decorative: 3 floating geometric shapes (circles/diamonds) with purple/cyan/magenta glowing borders that drift slowly (CSS animation, 20s cycle)

### SECTION 2: Experience Cards
Import experiences from '@/lib/experiences-data'.
For each experience, render a large card (full-width on mobile, side-by-side layout on desktop):
- **Layout:** Alternating left/right on desktop (image left, text right for even index; text left, image right for odd). On mobile: stacked (image full-width, text below).
- **Image placeholder:** A dark div with gradient background (purple->cyan->magenta gradient) and the experience's vibe text overlaid — since we don't have real event photos yet. The div should have aspect-ratio 4/3 on desktop, 16/9 on mobile. Add a subtle grain/scanline texture via CSS gradient.
- **Text content:**
  - Experience name in huge bebas-neue (e.g., 'SPELLBOUND')
  - Tagline in smaller text (cyan or purple accent)
  - Full description from data
  - Vibe tags as small pill badges with purple border
  - A dashed line or divider between the tagline and description
- **Hover effect:** The card lifts slightly (translateY(-4px)), the image div gets a brighter glow overlay, the name text gets a subtle text-shadow glow in purple
- **Injected CSS:**
  - @keyframes for card entrance (fade-up with stagger based on index)
  - @keyframes float (for the floating geometric shapes in hero)
  - Glow text-shadow animations

### SECTION 3: Why People Keep Coming Back
- Heading: 'Why People Keep Coming Back' using SectionHeading component
- A 4-column grid (2 on tablet, 1 on mobile) of reasons:
  - Powerful sound systems (Speaker icon)
  - Immersive lighting (Sun icon)
  - Carefully curated DJs (Disc3 icon)
  - Packed dancefloors (Heart icon / PartyPopper icon)
- Each item: icon in circle frame (purple border, glow), label, and short description
- Cards have dark bg (#1A1A1A), rounded corners, subtle white highlight on top edge

### SECTION 4: Closing Banner
- Full-width, centered
- Text: 'Every event is different. Every dancefloor feels like home.'
- Background: purple-tinged gradient
- CTA button: 'JOIN THE NEXT EVENT' with cyan glow styling

## File to update:
### app/experiences/page.tsx
Create this file to render <ExperiencesPage />:
```tsx
import { ExperiencesPage } from '@/components/site/ExperiencesPage'

export default function Experiences() {
  return <ExperiencesPage />
}
```

## Verification:
Run 'npm run build' — must compile without errors.
Visit /experiences — all 4 experience cards render with alternating layout, hover effects work, scroll reveals play.
"
```

---

## Phase 4: About Page

### Prompt 4.1 — About Page Component

```bash
claude -p "
Build the About page for Signature Socials at C:\\GitHub\\signaturesocials.co.nz.

Review the inline-style pattern at C:\\GitHub\\electricaffair.co.nz\\components\\site\\ElectricAffairExperience.tsx. Do NOT use Tailwind utility classes.

## File to create:
### components/site/AboutPage.tsx — 'use client'

### SECTION 1: Hero
- 50vh min-height, dark gradient background
- Large heading: 'CREATED BY PASSION. DRIVEN BY COMMUNITY.' in bebas-neue
- Subtitle: 'Signature Socials was founded with a simple belief. Great music deserves unforgettable experiences.'
- A purple accent line below (2px, 80px wide, gradient purple to cyan)

### SECTION 2: The Story
- Two-column layout on desktop (text left, visual right), stacked on mobile
- Left column:
  - Heading: 'Our Story' (using SectionHeading component)
  - The full about text: 'Since day one, our mission has been to create events that go beyond entertainment...'
  - All the paragraphs from the brief about 3333 Events & Productions, NZ talent, authenticity, connection
- Right column: A visual placeholder — large square div with a gradient background (purple->magenta) and a Music or Sparkles icon centered, with a subtle pulsing glow animation
- Injected CSS: @keyframes pulse-icon for the pulsing glow

### SECTION 3: The Promise
- Full-width banner with dark bg (#1A1A1A) and 1px purple top border
- Large centered quote: 'To create nights worth remembering.' in large italic or bebas-neue
- Below: 'Whether we're welcoming internationally recognised artists or showcasing New Zealand's incredible local talent, every event is built around one promise.'
- Background: subtle diagonal stripe pattern via CSS gradient (very faint, barely visible)

### SECTION 4: Join the Community
- Heading: 'Join the Community' using SectionHeading
- Subtitle: 'The next chapter starts on the dancefloor.'
- A grid of community benefit items (3 columns desktop, 1 mobile):
  - Upcoming Events (Calendar icon)
  - Artist Announcements (Megaphone icon)
  - Ticket Releases (Ticket icon)
  - Exclusive Experiences (Star icon)
  - Behind-the-Scenes Content (Camera icon)
  - Community Stories (Users icon)
- Each item: icon in a circle (#7C3AED background at 20% opacity), title, with hover lift effect

### SECTION 5: Closing Statement
- Full-width centered section
- Background: gradient from #0A0A0A -> rgba(124,58,237,0.1) -> #0A0A0A
- Text: 'You're not just attending an event. You're becoming part of something bigger.'
- Final brand statement: 'Signature Socials — Where Every Night Becomes a Story. Where Every Beat Brings People Together. Welcome Home.'
- Decorative: ///// separator line with purple and cyan dashes

## File to update:
### app/about/page.tsx
Create to render <AboutPage />:
```tsx
import { AboutPage } from '@/components/site/AboutPage'

export default function About() {
  return <AboutPage />
}
```

## Verification:
Run 'npm run build' — clean compile.
Visit /about — story section, promise banner, community grid render correctly.
All 3 routes (/, /experiences, /about) navigable via the nav bar.
"
```

---

## Phase 5: Polish & Production Readiness

### Prompt 5.1 — Global Page Transition Animations

```bash
claude -p "
Add page transition animations to the Signature Socials site at C:\\GitHub\\signaturesocials.co.nz.

## Modify app/layout.tsx:
- Wrap {children} in a div with a CSS fade-in animation applied via a 'use client' wrapper component (or add the animation class to the main content div)
- The animation: page fades in and slides up slightly (translateY(10px) -> translateY(0)) over 0.4s

## Modify Nav.tsx:
- Add a subtle active indicator — when on a page, the nav link gets a small glowing dot below it (in #7C3AED)
- Smooth transition when switching between active links

## Add to global CSS:
- A loading state: when navigating between pages (client-side transitions), show a thin progress bar at the top of the page. Use Next.js router events (add an app directory compatible approach using a small wrapper that listens to route changes).
- Create components/site/RouteProgress.tsx — a thin (2px) bar at the very top of the page that animates from 0% to 100% width during route transitions. Use useEffect with window.addEventListener for popstate and the Next.js router events pattern.

## Verification:
Navigate between pages — see the progress bar animate and the page content fade in.
"
```

### Prompt 5.2 — Responsive Polish & Dark Mode

```bash
claude -p "
Polish the Signature Socials site at C:\\GitHub\\signaturesocials.co.nz for all screen sizes.

## Tasks:

1. Add a hidden 'Skip to content' accessibility link as the first focusable element in the layout.

2. Check ALL three pages at 320px, 768px, 1024px, 1440px widths:
   - Font sizes must not overflow containers
   - Cards stack properly on mobile
   - Nav hamburger works on small screens
   - Footer columns stack on mobile

3. Add a subtle noise/grain texture overlay to the hero sections:
   - A CSS pseudo-element with a repeating noise gradient (data URI SVG or CSS gradient trick)
   - Opacity 0.03-0.05 so it's barely visible but adds texture to the black

4. Add hover states for ALL interactive elements:
   - Buttons: brighter glow + slight lift
   - Links: color change + underline
   - Cards: lift + glow border
   - Social icons: color shift to brand color + scale

5. Ensure page title metadata is set correctly:
   - Home: 'Signature Socials | New Zealand's Electronic Nightlife Collective'
   - Experiences: 'Experiences | Signature Socials'
   - About: 'About | Signature Socials'

## Verification:
View each page at 375px iPhone width — everything readable, no horizontal scroll.
Run 'npm run build' — clean.
"
```

### Prompt 5.3 — CLAUDE.md Documentation

```bash
claude -p "
Create a CLAUDE.md file at C:\\GitHub\\signaturesocials.co.nz\\CLAUDE.md documenting the project architecture, following the same format as C:\\GitHub\\electricaffair.co.nz\\CLAUDE.md.

Include:
- Commands: dev, build, start, lint
- Architecture: multi-page Next.js 14 App Router, 3 routes, client components
- Styling approach: inline styles + injected <style> blocks (not Tailwind)
- Color system: reference lib/colors.ts and the brand palette
- Data files: lib/constants.ts, lib/experiences-data.ts, lib/colors.ts, lib/fonts.ts
- Brand: Signature Socials by 3333 Events & Productions
- Images: placeholders in public/images/ — replace with real event photos when available
- Git workflow: feature branches, PRs, no direct commits to main
"
```

---

## Image Asset Plan

The site needs placeholder images for these sections until real event photography is available:

| Section            | Usage                         | Recommendation                 |
|--------------------|-------------------------------|--------------------------------|
| Home Hero          | Hero background               | Midjourney: club dancefloor, purple/pink lighting, silhouette crowd |
| Experiences Cards  | 4 card backgrounds            | Midjourney: abstract club scenes per vibe (dark/immersive/bass/nostalgic) |
| About Visual       | Story section                 | Midjourney: DJ booth, decks, smoke, purple laser |
| About Community    | Background accent              | Midjourney: crowd cheering, hands up |

Create placeholder gradient divs (as implemented above) and swap in real images when available. Images go in `public/images/{hero,experiences,about}/`.

---

## Implementation Order Summary

```
Phase 0 — Scaffold
  0.1  Create Next.js project
  0.2  Install deps
  0.3  lib/fonts.ts
  0.4  lib/colors.ts
  0.5  lib/constants.ts
  0.6  lib/experiences-data.ts

Phase 1 — Layout
  1.1  globals.css, layout.tsx, Nav, Footer, SectionHeading, icon.tsx

Phase 2 — Home Page
  2.1  HomePage.tsx (hero, intro, our world, closing statement)

Phase 3 — Experiences
  3.1  ExperiencesPage.tsx (hero, 4 cards, why people come back)

Phase 4 — About
  4.1  AboutPage.tsx (story, promise, community, closing)

Phase 5 — Polish
  5.1  Route transitions & progress bar
  5.2  Responsive polish, accessibility, grain texture
  5.3  CLAUDE.md documentation
```

---

## Verification Checklist

After each prompt completes:
- [ ] `npm run build` succeeds with no errors
- [ ] `npm run dev` starts without warnings
- [ ] Page renders correctly at desktop width (1440px)
- [ ] Page is usable at mobile width (375px)
- [ ] Nav links work and highlight active page
- [ ] All animations play (entrance, hover, scroll reveals)
- [ ] Footer renders with nav links and social icons
- [ ] No console errors in browser dev tools
