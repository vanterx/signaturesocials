# Signature Socials — Electrifying Atmosphere Prompt

> Feed this to Claude Code with `claude -p "$(cat PROMPT_ELECTRIFY.md)"`
> Run from `C:\GitHub\signaturesocials\`

---

Electrify the Signature Socials website. It's a Next.js 14 App Router nightlife brand site with 3 pages (Home, Experiences, About) using inline styles + injected `<style>` blocks. The brand is dark/purple/cyan/magenta nightlife. The site works but looks too static — it needs club atmosphere.

## What to do

### 1. `app/globals.css` — Add these shared CSS classes and keyframes AFTER the existing `.ss-grain-overlay` block and BEFORE the `@media (prefers-reduced-motion)` block:

```css
/* ─── Ambient floating particles ─── */
@keyframes ss-float-particle {
  0%   { transform: translateY(0) translateX(0); opacity: 0; }
  10%  { opacity: 0.6; }
  90%  { opacity: 0.3; }
  100% { transform: translateY(-120px) translateX(var(--drift, 15px)); opacity: 0; }
}

.ss-particle {
  position: absolute;
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #7C3AED;
  pointer-events: none;
  animation: ss-float-particle var(--duration, 8s) ease-in-out infinite;
  animation-delay: var(--delay, 0s);
}
.ss-particle.ss-cyan { background: #00E5FF; }
.ss-particle.ss-magenta { background: #FF2D95; }

/* ─── Light sweep beam ─── */
@keyframes ss-light-sweep {
  0%   { transform: translateX(-100%) skewX(-15deg); opacity: 0; }
  10%  { opacity: 0.15; }
  90%  { opacity: 0.08; }
  100% { transform: translateX(300%) skewX(-15deg); opacity: 0; }
}

.ss-light-sweep {
  position: absolute;
  top: 0;
  left: 0;
  width: 60%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(124,58,237,0.15), rgba(0,229,255,0.08), transparent);
  pointer-events: none;
  animation: ss-light-sweep 8s ease-in-out infinite;
}

/* ─── Pulsing text glow ─── */
@keyframes ss-pulse-glow {
  0%, 100% { text-shadow: 0 0 40px rgba(124,58,237,0.3), 0 0 80px rgba(124,58,237,0.1); }
  50%      { text-shadow: 0 0 60px rgba(124,58,237,0.6), 0 0 120px rgba(124,58,237,0.25), 0 0 180px rgba(124,58,237,0.1); }
}

.ss-pulse-glow {
  animation: ss-pulse-glow 4s ease-in-out infinite;
}

/* ─── Scanline overlay ─── */
.ss-scanlines {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(0, 0, 0, 0.03) 2px,
    rgba(0, 0, 0, 0.03) 4px
  );
  z-index: 1;
}

/* ─── Vignette ─── */
.ss-vignette {
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.6) 100%);
  z-index: 1;
}

/* ─── Staggered entrance for card grids ─── */
@keyframes ss-card-pop {
  from { opacity: 0; transform: scale(0.92) translateY(16px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
}

.ss-card-stagger > * {
  opacity: 0;
  animation: ss-card-pop 0.5s ease forwards;
}
.ss-card-stagger > *:nth-child(1) { animation-delay: 0.05s; }
.ss-card-stagger > *:nth-child(2) { animation-delay: 0.1s; }
.ss-card-stagger > *:nth-child(3) { animation-delay: 0.15s; }
.ss-card-stagger > *:nth-child(4) { animation-delay: 0.2s; }
.ss-card-stagger > *:nth-child(5) { animation-delay: 0.25s; }
.ss-card-stagger > *:nth-child(6) { animation-delay: 0.3s; }
.ss-card-stagger > *:nth-child(7) { animation-delay: 0.35s; }
.ss-card-stagger > *:nth-child(8) { animation-delay: 0.4s; }
```

Also add these lines inside the `@media (prefers-reduced-motion)` block at the bottom:
```css
.ss-particle { display: none !important; }
.ss-light-sweep { display: none !important; }
.ss-card-stagger > * { opacity: 1 !important; }
```

### 2. `components/site/Nav.tsx` — Add animated nav border

In the NAV_CSS string, add AFTER the `@keyframes ss-slide-down` block:

```css
@keyframes ss-nav-glow {
  0%, 100% { border-color: rgba(124,58,237,0.2); }
  50%      { border-color: rgba(0,229,255,0.3); }
}

.ss-nav-border {
  animation: ss-nav-glow 6s ease-in-out infinite;
}
```

Then add `className="ss-nav-border"` to the `<header>` element.

### 3. `components/site/HomePage.tsx` — Electrify the hero and sections

**Hero section:** After `<div className="ss-grain-overlay" />` add:
- `<div className="ss-scanlines" />`
- `<div className="ss-vignette" />`
- `<div className="ss-light-sweep" />`
- Then add 14 floating particle divs using Array.from({ length: 14 }).map(...):
  ```tsx
  {Array.from({ length: 14 }).map((_, i) => (
    <div
      key={i}
      className={`ss-particle ${i % 3 === 0 ? 'ss-cyan' : i % 3 === 1 ? 'ss-magenta' : ''}`}
      style={{
        left: `${5 + Math.random() * 90}%`,
        top: `${40 + Math.random() * 50}%`,
        width: `${2 + Math.random() * 3}px`,
        height: `${2 + Math.random() * 3}px`,
        '--duration': `${6 + Math.random() * 8}s`,
        '--delay': `${Math.random() * 10}s`,
        '--drift': `${-15 + Math.random() * 30}px`,
      } as React.CSSProperties}
    />
  ))}
  ```

**Hero title:** Add `ss-pulse-glow` to the className of the `<h1>SIGNATURE SOCIALS</h1>` element.

**Value cards grid:** Add `ss-card-stagger` to the className of the values grid div alongside `ss-values-grid`.

**World grid:** Add `ss-card-stagger` to the className of the world grid div alongside `ss-world-grid`.

**Genre pills:** Change the wrapping div from `<div>` to `<div className="ss-genre-pill-container">`. Add hover styles and entrance animation to `.ss-genre-pill` in HOME_CSS:
```css
.ss-genre-pill {
  /* existing styles plus: */
  transition: all 0.3s ease;
}
.ss-genre-pill:hover {
  background: rgba(124,58,237,0.35);
  border-color: rgba(0,229,255,0.6);
  box-shadow: 0 0 16px rgba(124,58,237,0.3);
  transform: translateY(-2px);
}

@keyframes ss-pill-pop {
  0%   { transform: scale(0.8); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}

.ss-genre-pill-container > * {
  display: inline-block;
  animation: ss-pill-pop 0.3s ease forwards;
  opacity: 0;
}
.ss-genre-pill-container > *:nth-child(1) { animation-delay: 0.05s; }
.ss-genre-pill-container > *:nth-child(2) { animation-delay: 0.1s; }
.ss-genre-pill-container > *:nth-child(3) { animation-delay: 0.15s; }
.ss-genre-pill-container > *:nth-child(4) { animation-delay: 0.2s; }
.ss-genre-pill-container > *:nth-child(5) { animation-delay: 0.25s; }
```

**"More Than an Event" section:** Add `position: 'relative', overflow: 'hidden'` to the section style. Add `<div className="ss-light-sweep" />` and 8 particles inside. Add `className="ss-pulse-glow"` to the `<h2>` heading.

### 4. `components/site/ExperiencesPage.tsx` — Electrify

**Hero section:** After `<div className="ss-grain-overlay" />` add `<div className="ss-light-sweep" />` and 10 particles.

**Experience card images:** Inside each `.ss-exp-image-wrap` div, add before the `<Image>`:
```tsx
<div className="ss-scanlines" style={{ zIndex: 0 }} />
<div className="ss-light-sweep" style={{ borderRadius: '16px' }} />
```

**Reasons grid:** Add `ss-card-stagger` to the className of the reasons grid div.

**Closing banner:** Add `position: 'relative', overflow: 'hidden'` to the section style. Add `<div className="ss-light-sweep" />` and 6 particles inside.

### 5. `components/site/AboutPage.tsx` — Electrify

**Hero section:** After `<div className="ss-grain-overlay" />` add `<div className="ss-light-sweep" />` and 10 particles.

**Promise quote:** Add `className="ss-pulse-glow"` to the `<p>` that contains "To create nights worth remembering."

**Community grid:** Add `ss-card-stagger` to the className of the community grid div.

**Closing section:** After the gradient overlay `<div>`, add:
```tsx
<div className="ss-grain-overlay" />
<div className="ss-scanlines" />
<div className="ss-light-sweep" />
{Array.from({ length: 10 }).map((_, i) => (
  <div
    key={i}
    className={`ss-particle ${i % 3 === 0 ? 'ss-cyan' : i % 3 === 1 ? 'ss-magenta' : ''}`}
    style={{
      left: `${5 + Math.random() * 90}%`,
      top: `${20 + Math.random() * 60}%`,
      '--duration': `${7 + Math.random() * 8}s`,
      '--delay': `${Math.random() * 10}s`,
      '--drift': `${-20 + Math.random() * 40}px`,
    } as React.CSSProperties}
  />
))}
```

## Verification

After all changes:
1. `npm run build` — must compile cleanly (0 errors)
2. Check all 3 pages render without console errors
3. Particles float upward in hero sections
4. Light sweep beam slides across hero sections
5. "SIGNATURE SOCIALS" text pulses with purple glow
6. Card grids stagger in on scroll
7. Genre pills pop in with staggered entrance
8. Nav border shifts between purple and cyan
9. Scanlines visible on hero images
10. `prefers-reduced-motion: reduce` disables all animations
