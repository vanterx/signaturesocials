'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Music, Zap, Sparkles, Users } from 'lucide-react'
import { ParticleField } from '@/components/site/ParticleField'
import { IndexList } from '@/components/site/IndexList'
import { RevealSection } from '@/components/site/RevealSection'

const HOME_CSS = `
  @keyframes ss-fade-in-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ss-scroll-tick {
    0%   { transform: scaleY(0); opacity: 0; }
    30%  { opacity: 1; }
    100% { transform: scaleY(1); opacity: 0; }
  }
  @keyframes ss-hue-shift {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 0.9; }
  }

  @keyframes ss-panel-in {
    from { opacity: 0; transform: rotate(-2deg) translateY(24px); }
    to   { opacity: 1; transform: rotate(-2deg) translateY(0); }
  }

  .ss-hero-eyebrow { animation: ss-fade-in-up 0.8s ease 0.1s both; }
  .ss-hero-title   { animation: ss-fade-in-up 0.8s ease 0.3s both, ss-pulse-glow 4s ease-in-out infinite 1.1s; }
  .ss-hero-tagline { animation: ss-fade-in-up 0.8s ease 0.5s both; }
  .ss-hero-quote   { animation: ss-fade-in-up 0.8s ease 0.7s both; }
  .ss-hero-cta     { animation: ss-fade-in-up 0.8s ease 0.9s both; }
  .ss-hero-panel   { animation: ss-panel-in 1s ease 0.4s both; }

  .ss-hero-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.3), transparent 60%);
    animation: ss-hue-shift 10s ease-in-out infinite;
    pointer-events: none;
  }

  .ss-hero-grid {
    position: relative;
    z-index: 1;
    max-width: 1280px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    gap: 56px;
    align-items: center;
  }

  .ss-hero-panel-wrap { display: flex; justify-content: center; }
  .ss-hero-panel {
    position: relative;
    width: 100%;
    max-width: 420px;
    aspect-ratio: 3/4;
    border-radius: 6px;
    overflow: hidden;
    transform: rotate(-2deg);
    border: 1px solid rgba(124,58,237,0.45);
    box-shadow: 0 24px 64px rgba(124,58,237,0.25), 0 0 0 8px rgba(10,10,10,1);
    transition: transform 0.5s ease, box-shadow 0.5s ease;
  }
  .ss-hero-panel:hover {
    animation: none;
    transform: rotate(0deg);
    box-shadow: 0 24px 72px rgba(124,58,237,0.4), 0 0 0 8px rgba(10,10,10,1);
  }
  .ss-hero-panel-frame {
    position: absolute;
    inset: -8px;
    border: 1px solid rgba(0,229,255,0.25);
    border-radius: 6px;
    transform: rotate(2deg);
    transition: transform 0.5s ease;
    pointer-events: none;
  }
  .ss-hero-panel:hover .ss-hero-panel-frame { transform: rotate(0deg); }

  .ss-scroll-cue {
    position: absolute;
    left: 24px;
    bottom: 40px;
    display: flex;
    align-items: center;
    gap: 10px;
    z-index: 1;
  }
  .ss-scroll-cue-line {
    width: 1px;
    height: 32px;
    background: #7C3AED;
    transform-origin: top;
    animation: ss-scroll-tick 2.2s ease-in-out infinite;
  }
  .ss-scroll-cue-text {
    writing-mode: vertical-rl;
    font-family: var(--font-inter);
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: #CBD5E1;
  }

  .ss-event-card {
    position: relative;
    overflow: hidden;
    background: #0A0A0A;
    border-radius: 12px;
    border: 1px solid rgba(124,58,237,0.25);
    padding: 32px;
    transition: all 0.3s ease;
  }
  .ss-event-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #7C3AED, #00E5FF, #FF2D95);
    opacity: 0.45;
    transition: opacity 0.3s ease;
  }
  .ss-event-card:hover::before { opacity: 1; }
  .ss-event-card:hover {
    border-color: rgba(124,58,237,0.7);
    box-shadow: 0 12px 32px rgba(124,58,237,0.2);
    transform: translateY(-4px);
  }

  .ss-event-btn-primary {
    display: inline-block;
    border: none;
    cursor: pointer;
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
    color: #F8FAFC;
    background: #7C3AED;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  .ss-event-btn-primary:hover {
    background: #9D5CFF;
    box-shadow: 0 0 16px rgba(124,58,237,0.5);
  }

  .ss-event-btn-secondary {
    display: inline-block;
    background: none;
    cursor: pointer;
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
    color: #7C3AED;
    border: 1px solid rgba(124,58,237,0.5);
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease;
  }
  .ss-event-btn-secondary:hover {
    border-color: #7C3AED;
    background: rgba(124,58,237,0.1);
  }

  .ss-value-tile {
    background: #1A1A1A;
    border-radius: 12px;
    padding: 32px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid transparent;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
  .ss-value-tile:hover { transform: translateY(-4px); }
  .ss-value-tile.ss-glow-purple:hover { border-color: rgba(124,58,237,0.6); box-shadow: 0 12px 32px rgba(124,58,237,0.2); }
  .ss-value-tile.ss-glow-cyan:hover { border-color: rgba(0,229,255,0.6); box-shadow: 0 12px 32px rgba(0,229,255,0.2); }
  .ss-value-tile.ss-glow-magenta:hover { border-color: rgba(255,45,149,0.6); box-shadow: 0 12px 32px rgba(255,45,149,0.2); }
  .ss-value-feature {
    background: linear-gradient(155deg, rgba(124,58,237,0.18), rgba(10,10,10,0.4));
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

  @media (max-width: 900px) {
    .ss-hero-grid { grid-template-columns: 1fr !important; }
    .ss-hero-panel-wrap { order: -1; }
    .ss-hero-panel { max-width: 320px; margin: 0 auto; }
    .ss-hero-title { text-align: center !important; }
    .ss-hero-copy { align-items: center !important; text-align: center !important; }
    .ss-scroll-cue { display: none; }
  }
  @media (max-width: 768px) {
    .ss-values-grid { grid-template-columns: 1fr !important; grid-template-areas: none !important; }
    .ss-values-grid > * { grid-area: auto !important; }
    .ss-section-pad { padding: 60px 16px !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-hero-eyebrow, .ss-hero-title, .ss-hero-tagline, .ss-hero-quote, .ss-hero-cta, .ss-hero-panel, .ss-scroll-cue-line {
      animation: none !important;
    }
  }
`

const VALUE_TILES = [
  {
    icon: Music,
    label: 'The Music',
    glow: 'ss-glow-purple',
    accent: '#7C3AED',
    desc: 'Curated sets from underground selectors and international headliners.',
    area: 'a',
    feature: true,
  },
  {
    icon: Zap,
    label: 'The Energy',
    glow: 'ss-glow-cyan',
    accent: '#00E5FF',
    desc: 'A dancefloor charged from the first drop to the last encore.',
    area: 'b',
    feature: false,
  },
  {
    icon: Sparkles,
    label: 'The Production',
    glow: 'ss-glow-magenta',
    accent: '#FF2D95',
    desc: 'Immersive lighting, sound and staging built for the moment.',
    area: 'c',
    feature: false,
  },
  {
    icon: Users,
    label: 'The People',
    glow: 'ss-glow-purple',
    accent: '#7C3AED',
    desc: 'A community that shows up for each other, every single time.',
    area: 'd',
    feature: false,
  },
]

const WORLD_ITEMS = [
  { label: 'Underground Club Nights' },
  { label: 'International & New Zealand Artists' },
  { label: 'Premium Sound & Lighting' },
  { label: 'Immersive Visual Experiences' },
  { label: 'Creative Themes' },
  { label: 'Inclusive Dancefloors' },
  { label: 'Unforgettable Memories' },
]

const CLOSING_LINES = [
  "It's anticipation before the first drop.",
  "It's losing yourself in the music.",
  "It's finding your people.",
]

const UPCOMING_EVENTS = [
  { name: 'Spellbound Vol. 2', date: 'Coming Soon', venue: 'TBC, Auckland' },
  { name: 'Anti Social — Winter Edition', date: 'Coming Soon', venue: 'TBC, Wellington' },
  { name: 'Bass Ritual: Chapter One', date: 'Coming Soon', venue: 'TBC, Christchurch' },
]

export function HomePage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: HOME_CSS }} />

      {/* SECTION 1: Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '160px 24px 100px',
          overflow: 'hidden',
        }}
      >
        <div className="ss-hero-glow" />
        <div className="ss-grain-overlay" />
        <div className="ss-light-sweep" />
        <ParticleField count={10} topRange={[10, 90]} />

        <div className="ss-hero-grid">
          <div className="ss-hero-copy" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span
              className="ss-hero-eyebrow"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '14px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#CBD5E1',
                marginBottom: '16px',
              }}
            >
              Welcome To
            </span>

            <h1
              className="ss-hero-title"
              style={{
                fontFamily: 'var(--font-bebas)',
                fontSize: 'clamp(3.5rem, 4vw + 3rem, 8.5rem)',
                lineHeight: 0.88,
                letterSpacing: '0.01em',
                color: '#F8FAFC',
                margin: 0,
                textAlign: 'left',
              }}
            >
              SIGNATURE
              <br />
              <span className="ss-gradient-text">SOCIALS</span>
            </h1>

            <p
              className="ss-hero-tagline"
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: 'clamp(1rem, 1vw + 0.75rem, 1.375rem)',
                color: '#00E5FF',
                marginTop: '24px',
                fontWeight: 500,
              }}
            >
              New Zealand&apos;s Electronic Nightlife Collective
            </p>

            <p
              className="ss-hero-quote"
              style={{
                fontFamily: 'var(--font-inter)',
                fontStyle: 'italic',
                fontSize: '17px',
                color: '#CBD5E1',
                maxWidth: '440px',
                marginTop: '20px',
                lineHeight: 1.6,
              }}
            >
              Some nights are forgotten. Others become stories you&apos;ll tell for years.
            </p>

            <Link href="/experiences" className="ss-cta-btn ss-hero-cta" style={{ marginTop: '36px' }}>
              Explore Experiences
            </Link>
          </div>

          <div className="ss-hero-panel-wrap">
            <div className="ss-hero-panel">
              <Image
                src="/images/hero/hero-dancefloor.png"
                alt="A packed Signature Socials dancefloor under purple and cyan lasers"
                fill
                priority
                sizes="(max-width: 900px) 320px, 420px"
                style={{ objectFit: 'cover' }}
              />
              <div className="ss-scanlines" />
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(180deg, transparent 50%, rgba(10,10,10,0.85) 100%)',
                }}
              />
              <div className="ss-hero-panel-frame" />
            </div>
          </div>
        </div>

        <div className="ss-scroll-cue">
          <div className="ss-scroll-cue-line" />
          <span className="ss-scroll-cue-text">Scroll</span>
        </div>
      </section>

      {/* SECTION 2: Intro / Values */}
      <section className="ss-section-pad" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <RevealSection>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
              color: '#F8FAFC',
              marginBottom: '20px',
              maxWidth: '760px',
            }}
          >
            Built for People Who Live for the Night
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              color: '#CBD5E1',
              lineHeight: 1.7,
              maxWidth: '720px',
              marginBottom: '56px',
            }}
          >
            We create events that go beyond entertainment — nights built around music, atmosphere and
            the people who show up to lose themselves in it. Every detail, from the sound to the
            lighting to the lineup, exists to make the dancefloor feel like exactly where you&apos;re
            supposed to be.
          </p>
        </RevealSection>

        <div
          className="ss-values-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(2, minmax(160px, auto))',
            gridTemplateAreas: `"a a b b" "a a c d"`,
            gap: '20px',
          }}
        >
          {VALUE_TILES.map(({ icon: Icon, label, glow, accent, desc, area, feature }) => (
            <div key={label} style={{ gridArea: area }}>
              <RevealSection>
                <div className={`ss-value-tile ${glow} ${feature ? 'ss-value-feature' : ''}`} style={{ height: '100%' }}>
                  <Icon size={feature ? 40 : 26} color={accent} style={{ marginBottom: '16px' }} />
                  <h3
                    style={{
                      fontFamily: 'var(--font-bebas)',
                      fontSize: feature ? '34px' : '22px',
                      color: '#F8FAFC',
                      margin: '0 0 8px',
                    }}
                  >
                    {label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-inter)',
                      fontSize: feature ? '15px' : '13px',
                      color: '#CBD5E1',
                      lineHeight: 1.6,
                      margin: 0,
                      maxWidth: feature ? '360px' : 'none',
                    }}
                  >
                    {desc}
                  </p>
                </div>
              </RevealSection>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: Our World */}
      <section className="ss-section-pad" style={{ padding: '100px 24px', maxWidth: '900px', margin: '0 auto' }}>
        <RevealSection>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
              color: '#F8FAFC',
              marginBottom: '32px',
            }}
          >
            Our World
          </h2>
        </RevealSection>

        <IndexList items={WORLD_ITEMS} accent="purple" />

        <RevealSection>
          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'baseline', gap: '20px', flexWrap: 'wrap' }}>
            <span className="ss-eyebrow">The Sound</span>
            <div className="ss-genre-pill-container">
              {['House', 'Techno', 'Trance', 'Progressive', 'Psytrance'].map((genre) => (
                <span key={genre} className="ss-pill">
                  {genre}
                </span>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* SECTION: Upcoming Events */}
      <section className="ss-section-pad" style={{ padding: '100px 24px', background: '#1A1A1A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <RevealSection>
            <div style={{ textAlign: 'center', marginBottom: '48px' }}>
              <span className="ss-eyebrow">Don&apos;t Miss</span>
              <h2
                style={{
                  fontFamily: 'var(--font-bebas)',
                  fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
                  color: '#F8FAFC',
                  margin: '12px 0 0',
                }}
              >
                Upcoming Events
              </h2>
            </div>
          </RevealSection>

          <div
            className="ss-card-stagger"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}
          >
            {UPCOMING_EVENTS.map((event) => (
              <RevealSection key={event.name}>
                <div className="ss-event-card">
                  <div style={{ fontFamily: 'var(--font-bebas)', fontSize: '24px', color: '#F8FAFC', marginBottom: '4px' }}>
                    {event.name}
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#00E5FF', fontWeight: 600, marginBottom: '16px' }}>
                    {event.date}
                  </div>
                  <div style={{ fontFamily: 'var(--font-inter)', fontSize: '13px', color: '#CBD5E1', marginBottom: '20px' }}>
                    {event.venue}
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button type="button" className="ss-event-btn-primary">
                      Get Tickets
                    </button>
                    <button type="button" className="ss-event-btn-secondary">
                      FB Event
                    </button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: More Than an Event */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '120px 24px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.08) 50%, #0A0A0A 100%)',
        }}
      >
        <div className="ss-light-sweep" />
        <ParticleField count={8} topRange={[20, 80]} />

        <RevealSection>
          <h2
            className="ss-pulse-glow"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)',
              color: '#F8FAFC',
              marginBottom: '32px',
            }}
          >
            More Than an Event. It&apos;s a Feeling.
          </h2>
        </RevealSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center', marginBottom: '48px' }}>
          {CLOSING_LINES.map((line, i) => (
            <RevealSection key={line}>
              <p
                style={{
                  fontFamily: 'var(--font-inter)',
                  fontSize: '18px',
                  color: '#CBD5E1',
                  margin: 0,
                  transitionDelay: `${i * 0.15}s`,
                }}
              >
                {line}
              </p>
            </RevealSection>
          ))}
        </div>

        <RevealSection>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '16px', color: '#F8FAFC', marginBottom: '28px' }}>
            Welcome to Signature Socials. Where the night begins.
          </p>
          <Link href="/experiences" className="ss-cta-btn">
            Explore Experiences
          </Link>
        </RevealSection>
      </section>

      {/* SECTION 5: Footer teaser */}
      <section style={{ padding: '48px 24px', textAlign: 'center' }}>
        <div
          style={{
            width: '120px',
            height: '2px',
            margin: '0 auto 20px',
            background: 'linear-gradient(90deg, #7C3AED 0%, #00E5FF 100%)',
          }}
        />
        <p
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: '22px',
            letterSpacing: '0.08em',
            color: '#CBD5E1',
            margin: 0,
          }}
        >
          Where Every Beat Brings People Together
        </p>
      </section>
    </>
  )
}
