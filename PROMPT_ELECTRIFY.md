# Signature Socials — Electrify + Lost In Sound Inspiration Prompt

> Feed to Claude Code: `claude -p "$(cat PROMPT_ELECTRIFY.md)"`
> Run from `C:\GitHub\signaturesocials\`

---

Upgrade the Signature Socials website — a Next.js 14 App Router nightlife brand (dark/purple/cyan/magenta, inline styles + injected `<style>` blocks). Two things: add club atmosphere effects, and steal smart ideas from NZ competitor lostinsound.co.nz (social nav bar, Mixcloud, newsletter, event cards).

---

## 1. `lib/constants.ts` — Add Mixcloud

```ts
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/signaturesocials',
  facebook: 'https://facebook.com/signaturesocials',
  mixcloud: 'https://mixcloud.com/signaturesocials',
} as const
```

---

## 2. `app/globals.css` — Atmosphere CSS

After the `.ss-grain-overlay` block and BEFORE the `@media (prefers-reduced-motion)` block, insert:

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

/* ─── Staggered entrance ─── */
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

Also add inside the `@media (prefers-reduced-motion)` block:
```css
.ss-particle { display: none !important; }
.ss-light-sweep { display: none !important; }
.ss-card-stagger > * { opacity: 1 !important; }
```

---

## 3. `components/site/Nav.tsx` — Social header bar + animated border

**In NAV_CSS**, add after the `@keyframes ss-slide-down` block:
```css
@keyframes ss-nav-glow {
  0%, 100% { border-color: rgba(124,58,237,0.2); }
  50%      { border-color: rgba(0,229,255,0.3); }
}

.ss-nav-border {
  animation: ss-nav-glow 6s ease-in-out infinite;
}

.ss-nav-social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 999px;
  color: #CBD5E1;
  transition: all 0.2s ease;
}
.ss-nav-social-icon:hover {
  color: #7C3AED;
  box-shadow: 0 0 12px rgba(124,58,237,0.4);
  transform: translateY(-1px);
}

@media (max-width: 768px) {
  .ss-nav-social-bar { display: none !important; }
}
```

**Update the component:**
- Import `SOCIAL_LINKS` from `@/lib/constants`
- Add `className="ss-nav-border"` to the `<header>` element
- Inside `<nav>`, AFTER the desktop links div and BEFORE the hamburger button, insert a social icon bar:
```tsx
<div className="ss-nav-social-bar" style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
  <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="ss-nav-social-icon" aria-label="Instagram">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  </a>
  <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="ss-nav-social-icon" aria-label="Facebook">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  </a>
  <a href={SOCIAL_LINKS.mixcloud} target="_blank" rel="noopener noreferrer" className="ss-nav-social-icon" aria-label="Mixcloud">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"/><path d="M8 10v4"/><path d="M10 11v2"/><path d="M14 11v2"/><path d="M16 10v4"/>
    </svg>
  </a>
</div>
```

---

## 4. `components/site/Footer.tsx` — Add Mixcloud icon + newsletter form

**Add MixcloudIcon component** after FacebookIcon:
```tsx
function MixcloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
      <path d="M8 10v4" /><path d="M10 11v2" /><path d="M14 11v2" /><path d="M16 10v4" />
    </svg>
  )
}
```

**Add Mixcloud link** next to Facebook in the social icons area:
```tsx
<a href={SOCIAL_LINKS.mixcloud} target="_blank" rel="noopener noreferrer" className="ss-social-icon" aria-label="Mixcloud">
  <MixcloudIcon />
</a>
```

**Add newsletter section** between the "Produced by 3333" section and the social icons. Change that column to:
```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
  <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#CBD5E1' }}>
    Produced by 3333 Events &amp; Productions
  </p>

  {/* Newsletter */}
  <div>
    <p style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#7C3AED', marginBottom: '8px' }}>
      Stay in the Loop
    </p>
    <form
      onSubmit={(e) => { e.preventDefault(); }}
      style={{ display: 'flex', gap: '8px' }}
    >
      <input
        type="email"
        placeholder="Your email"
        required
        style={{
          background: '#1A1A1A',
          border: '1px solid rgba(124,58,237,0.3)',
          borderRadius: '4px',
          padding: '10px 14px',
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          color: '#F8FAFC',
          outline: 'none',
          width: '180px',
        }}
        onFocus={(e) => e.target.style.borderColor = '#7C3AED'}
        onBlur={(e) => e.target.style.borderColor = 'rgba(124,58,237,0.3)'}
      />
      <button
        type="submit"
        style={{
          background: '#7C3AED',
          color: '#F8FAFC',
          border: 'none',
          borderRadius: '4px',
          padding: '10px 18px',
          fontFamily: 'var(--font-inter)',
          fontSize: '13px',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#9D5CFF'; e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.5)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#7C3AED'; e.currentTarget.style.boxShadow = 'none'; }}
      >
        Join
      </button>
    </form>
  </div>

  <div style={{ display: 'flex', gap: '12px' }}>
    <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" className="ss-social-icon" aria-label="Instagram"><InstagramIcon /></a>
    <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" className="ss-social-icon" aria-label="Facebook"><FacebookIcon /></a>
    <a href={SOCIAL_LINKS.mixcloud} target="_blank" rel="noopener noreferrer" className="ss-social-icon" aria-label="Mixcloud"><MixcloudIcon /></a>
  </div>
</div>
```

---

## 5. `components/site/HomePage.tsx` — Electrify + add Upcoming Events section

### Hero electrify:
After `<div className="ss-grain-overlay" />`, add:
```tsx
<div className="ss-scanlines" />
<div className="ss-vignette" />
<div className="ss-light-sweep" />
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

### Hero title:
Add `ss-pulse-glow` to the `<h1>` className.

### Value cards grid:
Add `ss-card-stagger` to the grid className.

### World grid:
Add `ss-card-stagger` to the grid className.

### Genre pills:
Change `<div>` to `<div className="ss-genre-pill-container">`. In HOME_CSS, enhance `.ss-genre-pill` with:
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

### "More Than an Event" section:
Add `position: 'relative', overflow: 'hidden'` to section style. Add `<div className="ss-light-sweep" />` + 8 particles inside. Add `ss-pulse-glow` to `<h2>`.

### NEW — Upcoming Events section:
Insert AFTER the "Our World" section and BEFORE the "More Than an Event" section. This is inspired by lostinsound.co.nz's event card pattern:

```tsx
{/* SECTION: Upcoming Events */}
<section className="ss-section-pad" style={{ padding: '100px 24px', background: '#1A1A1A', position: 'relative', overflow: 'hidden' }}>
  <div className="ss-light-sweep" />
  {Array.from({ length: 6 }).map((_, i) => (
    <div key={i} className="ss-particle" style={{ left: `${5 + Math.random() * 90}%`, top: `${20 + Math.random() * 60}%`, '--duration': `${8 + Math.random() * 8}s`, '--delay': `${Math.random() * 12}s`, '--drift': `${-15 + Math.random() * 30}px` } as React.CSSProperties} />
  ))}
  <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
    <RevealSection>
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: '#7C3AED' }}>Don't Miss</span>
        <h2 style={{ fontFamily: 'var(--font-bebas)', fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)', color: '#F8FAFC', margin: '12px 0 0' }}>Upcoming Events</h2>
      </div>
    </RevealSection>
    <div className="ss-card-stagger" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
      {[
        { name: 'Spellbound Vol. 2', date: 'Coming Soon', venue: 'TBC, Auckland' },
        { name: 'Anti Social — Winter Edition', date: 'Coming Soon', venue: 'TBC, Wellington' },
        { name: 'Bass Ritual: Chapter One', date: 'Coming Soon', venue: 'TBC, Christchurch' },
      ].map((event, i) => (
        <RevealSection key={event.name}>
          <div style={{
            background: '#0A0A0A',
            borderRadius: '12px',
            border: '1px solid rgba(124,58,237,0.25)',
            padding: '32px',
            transition: 'all 0.3s ease',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.7)'; e.currentTarget.style.boxShadow = '0 12px 32px rgba(124,58,237,0.2)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.25)'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', color: '#F8FAFC', marginBottom: '4px' }}>{event.name}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#00E5FF', fontWeight: 600, marginBottom: '16px' }}>{event.date}</div>
            <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#CBD5E1', marginBottom: '20px' }}>{event.venue}</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: '#F8FAFC', background: '#7C3AED', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.background = '#9D5CFF'; e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.5)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = '#7C3AED'; e.currentTarget.style.boxShadow = 'none'; }}
              >Get Tickets</span>
              <span style={{ fontFamily: 'var(--font-inter)', fontSize: '12px', fontWeight: 600, color: '#7C3AED', border: '1px solid rgba(124,58,237,0.5)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s ease' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#7C3AED'; e.currentTarget.style.background = 'rgba(124,58,237,0.1)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(124,58,237,0.5)'; e.currentTarget.style.background = 'transparent'; }}
              >FB Event</span>
            </div>
          </div>
        </RevealSection>
      ))}
    </div>
  </div>
</section>
```

---

## 6. `components/site/ExperiencesPage.tsx` — Electrify

**Hero:** After `<div className="ss-grain-overlay" />`, add `<div className="ss-light-sweep" />` + 10 particles.

**Card images:** Inside each `.ss-exp-image-wrap`, add before `<Image>`:
```tsx
<div className="ss-scanlines" style={{ zIndex: 0 }} />
<div className="ss-light-sweep" style={{ borderRadius: '16px' }} />
```

**Reasons grid:** Add `ss-card-stagger` to grid className.

**Closing banner:** Add `position: 'relative', overflow: 'hidden'` + `<div className="ss-light-sweep" />` + 6 particles.

---

## 7. `components/site/AboutPage.tsx` — Electrify

**Hero:** After `<div className="ss-grain-overlay" />`, add `<div className="ss-light-sweep" />` + 10 particles.

**Promise quote:** Add `className="ss-pulse-glow"` to the `<p>` with "To create nights worth remembering."

**Community grid:** Add `ss-card-stagger` to grid className.

**Closing section:** After the gradient overlay `<div>`, add:
```tsx
<div className="ss-grain-overlay" />
<div className="ss-scanlines" />
<div className="ss-light-sweep" />
{Array.from({ length: 10 }).map((_, i) => (
  <div key={i} className={`ss-particle ${i % 3 === 0 ? 'ss-cyan' : i % 3 === 1 ? 'ss-magenta' : ''}`}
    style={{ left: `${5 + Math.random() * 90}%`, top: `${20 + Math.random() * 60}%`, '--duration': `${7 + Math.random() * 8}s`, '--delay': `${Math.random() * 10}s`, '--drift': `${-20 + Math.random() * 40}px` } as React.CSSProperties} />
))}
```

---

## Verification

```bash
npm run build   # must compile with 0 errors
```

Then check:
- [ ] Particles float upward in all hero sections
- [ ] Light sweep beam slides across hero/section backgrounds
- [ ] "SIGNATURE SOCIALS" text pulses purple glow
- [ ] Card grids stagger in one-by-one
- [ ] Genre pills pop in with delay, hover with glow
- [ ] Nav border shifts purple→cyan→purple
- [ ] Nav has social icons (Insta, FB, Mixcloud) on desktop, hidden on mobile
- [ ] Footer has Mixcloud icon + newsletter email form
- [ ] Home page has Upcoming Events section with 3 event cards
- [ ] Event cards have hover lift + glow effect
- [ ] prefers-reduced-motion disables all animations
- [ ] No console errors on any page
