'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ParticleField } from '@/components/site/ParticleField'
import { IndexList } from '@/components/site/IndexList'
import { RevealSection } from '@/components/site/RevealSection'
import { AboutSections } from '@/components/site/AboutSections'
import { experiences } from '@/lib/experiences-data'
import { VALUES, TICKER_ITEMS, REASONS, UPCOMING_EVENTS } from '@/lib/home-data'

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
  @keyframes ss-laser-pulse {
    0%, 100% { opacity: 0.12; }
    50%      { opacity: 0.7; }
  }
  @keyframes ss-marquee {
    to { transform: translateX(-50%); }
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
    background:
      radial-gradient(ellipse at 30% 40%, rgba(124,58,237,0.3), transparent 60%),
      radial-gradient(ellipse at 80% 75%, rgba(255,45,149,0.14), transparent 55%);
    animation: ss-hue-shift 10s ease-in-out infinite;
    pointer-events: none;
  }

  .ss-laser {
    position: absolute;
    left: -20%;
    width: 140%;
    height: 1px;
    pointer-events: none;
    animation: ss-laser-pulse 5s ease-in-out infinite;
  }
  .ss-laser-1 { top: 20%; transform: rotate(-14deg); background: linear-gradient(90deg, transparent, rgba(0,229,255,0.55), transparent); }
  .ss-laser-2 { top: 56%; transform: rotate(9deg); background: linear-gradient(90deg, transparent, rgba(255,45,149,0.45), transparent); animation-delay: 1.6s; }
  .ss-laser-3 { top: 80%; transform: rotate(-5deg); background: linear-gradient(90deg, transparent, rgba(124,58,237,0.55), transparent); animation-delay: 3.1s; }

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

  .ss-ticker {
    position: relative;
    overflow: hidden;
    white-space: nowrap;
    padding: 18px 0;
    background: #111111;
    border-top: 1px solid rgba(124,58,237,0.3);
    border-bottom: 1px solid rgba(0,229,255,0.2);
    transform: skewY(-1.2deg);
    margin: -12px 0;
  }
  .ss-ticker-track {
    display: inline-flex;
    align-items: baseline;
    animation: ss-marquee 30s linear infinite;
    will-change: transform;
  }
  .ss-ticker:hover .ss-ticker-track { animation-play-state: paused; }
  .ss-ticker-item {
    font-family: var(--font-bebas);
    font-size: clamp(1.75rem, 2vw + 1rem, 2.5rem);
    letter-spacing: 0.06em;
    padding: 0 28px;
  }
  .ss-ticker-solid-purple  { color: #7C3AED; text-shadow: 0 0 24px rgba(124,58,237,0.6); }
  .ss-ticker-solid-cyan    { color: #00E5FF; text-shadow: 0 0 24px rgba(0,229,255,0.5); }
  .ss-ticker-solid-magenta { color: #FF2D95; text-shadow: 0 0 24px rgba(255,45,149,0.5); }
  .ss-ticker-outline {
    color: transparent;
    -webkit-text-stroke: 1px rgba(248,250,252,0.45);
  }
  .ss-ticker-dot { color: rgba(248,250,252,0.35); font-size: 0.6em; }

  .ss-value-item {
    position: relative;
    padding-top: 40px;
  }
  .ss-value-num {
    position: absolute;
    top: -12px;
    left: -6px;
    font-family: var(--font-bebas);
    font-size: clamp(4.5rem, 4vw + 3rem, 7rem);
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(248,250,252,0.14);
    pointer-events: none;
    user-select: none;
    z-index: 0;
    transition: -webkit-text-stroke-color 0.3s ease;
  }
  .ss-value-item:hover .ss-value-num { -webkit-text-stroke-color: var(--ss-accent, #7C3AED); }
  .ss-value-label {
    position: relative;
    z-index: 1;
    font-family: var(--font-bebas);
    font-size: clamp(2rem, 1.5vw + 1.5rem, 2.75rem);
    color: #F8FAFC;
    margin: 0 0 12px;
    line-height: 1;
    transition: text-shadow 0.3s ease;
  }
  .ss-value-item:hover .ss-value-label { text-shadow: 0 0 28px var(--ss-accent, #7C3AED); }
  .ss-value-line {
    width: 44px;
    height: 2px;
    background: var(--ss-accent, #7C3AED);
    margin-bottom: 16px;
    transition: width 0.4s ease;
  }
  .ss-value-item:hover .ss-value-line { width: 100%; }
  .ss-value-desc {
    position: relative;
    z-index: 1;
    font-family: var(--font-inter);
    font-size: 14px;
    color: #CBD5E1;
    line-height: 1.7;
    margin: 0;
    max-width: 380px;
  }

  .ss-exp-card {
    transition: transform 0.3s ease;
  }
  .ss-exp-card:hover { transform: translateY(-4px); }
  .ss-exp-card:hover .ss-exp-image-overlay { opacity: 0.55; }
  .ss-exp-card:hover .ss-exp-name { text-shadow: 0 0 24px rgba(124,58,237,0.6); }

  .ss-exp-image-wrap img { transition: transform 0.6s ease; }
  .ss-exp-card:hover .ss-exp-image-wrap img { transform: scale(1.05); }

  .ss-exp-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(255,45,149,0.2), rgba(0,229,255,0.25));
    opacity: 0.25;
    transition: opacity 0.3s ease;
  }

  .ss-exp-index {
    font-family: var(--font-bebas);
    font-size: clamp(3rem, 4vw + 1rem, 5rem);
    color: rgba(124,58,237,0.35);
    line-height: 1;
    margin-bottom: -8px;
  }

  .ss-event-row {
    position: relative;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px 32px;
    padding: 26px 20px;
    border-bottom: 1px solid rgba(248,250,252,0.12);
    transition: background 0.3s ease, padding-left 0.3s ease;
  }
  .ss-event-row::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(180deg, #7C3AED, #00E5FF);
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s ease;
  }
  .ss-event-row:hover::before { transform: scaleY(1); }
  .ss-event-row:hover {
    background: rgba(124,58,237,0.07);
    padding-left: 34px;
  }
  .ss-event-row:hover .ss-event-name { text-shadow: 0 0 20px rgba(124,58,237,0.6); }
  .ss-event-date {
    display: flex;
    flex-direction: column;
    min-width: 104px;
  }
  .ss-event-date-label {
    font-family: var(--font-inter);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #00E5FF;
    margin-bottom: 4px;
  }
  .ss-event-date-main {
    font-family: var(--font-bebas);
    font-size: clamp(1.6rem, 1vw + 1.25rem, 2.2rem);
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(248,250,252,0.5);
  }
  .ss-event-name {
    font-family: var(--font-bebas);
    font-size: clamp(1.6rem, 1.5vw + 1rem, 2.4rem);
    line-height: 1.05;
    color: #F8FAFC;
    transition: text-shadow 0.3s ease;
  }
  .ss-event-venue {
    font-family: var(--font-inter);
    font-size: 13px;
    color: #CBD5E1;
    margin-top: 4px;
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

  @media (max-width: 900px) {
    .ss-hero-grid { grid-template-columns: 1fr !important; }
    .ss-hero-panel-wrap { order: -1; }
    .ss-hero-panel { max-width: 320px; margin: 0 auto; }
    .ss-hero-title { text-align: center !important; }
    .ss-hero-copy { align-items: center !important; text-align: center !important; }
    .ss-scroll-cue { display: none; }
  }
  @media (max-width: 768px) {
    .ss-values-grid { grid-template-columns: 1fr !important; }
    .ss-values-grid .ss-value-offset { margin-top: 0 !important; }
    .ss-section-pad { padding: 60px 16px !important; }
    .ss-exp-row { flex-direction: column !important; }
    .ss-exp-image-wrap { aspect-ratio: 16/9 !important; }
    .ss-event-row { padding: 22px 12px; }
    .ss-event-actions { width: 100%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-hero-eyebrow, .ss-hero-title, .ss-hero-tagline, .ss-hero-quote, .ss-hero-cta, .ss-hero-panel, .ss-scroll-cue-line, .ss-laser {
      animation: none !important;
    }
    .ss-ticker-track { animation: none !important; }
    .ss-exp-image-wrap img { transition: none !important; }
  }
`

function TickerRow({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <span aria-hidden={ariaHidden}>
      {TICKER_ITEMS.map((item) => (
        <span key={item.text}>
          <span className={`ss-ticker-item ${item.style}`}>{item.text.toUpperCase()}</span>
          <span className="ss-ticker-dot">◆</span>
        </span>
      ))}
    </span>
  )
}

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
        <div className="ss-laser ss-laser-1" />
        <div className="ss-laser ss-laser-2" />
        <div className="ss-laser ss-laser-3" />
        <div className="ss-grain-overlay" />
        <div className="ss-light-sweep" />
        <ParticleField count={12} topRange={[10, 90]} />

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

            <Link href="#experiences" className="ss-cta-btn ss-hero-cta" style={{ marginTop: '36px' }}>
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

      {/* SECTION 2: Genre ticker */}
      <div className="ss-ticker" aria-label="Genres: House, Techno, Trance, Progressive, Psytrance">
        <div className="ss-ticker-track">
          <TickerRow />
          <TickerRow ariaHidden />
        </div>
      </div>

      {/* SECTION 3: Intro / Values */}
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
            gridTemplateColumns: '1fr 1fr',
            columnGap: '72px',
            rowGap: '64px',
            alignItems: 'start',
          }}
        >
          {VALUES.map(({ label, accent, desc }, i) => (
            <RevealSection key={label} style={{ transitionDelay: `${(i % 2) * 0.12}s` }}>
              <div
                className={`ss-value-item ${i % 2 === 1 ? 'ss-value-offset' : ''}`}
                style={{ '--ss-accent': accent, marginTop: i % 2 === 1 ? '56px' : 0 } as React.CSSProperties}
              >
                <span className="ss-value-num" aria-hidden="true">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="ss-value-label">{label.toUpperCase()}</h3>
                <div className="ss-value-line" />
                <p className="ss-value-desc">{desc}</p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SECTION 4: Experiences */}
      <section
        id="experiences"
        className="ss-section-pad"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '100px 24px',
          scrollMarginTop: '80px',
        }}
      >
        <RevealSection>
          <span className="ss-eyebrow">{experiences.length} Signature Experiences</span>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)',
              color: '#F8FAFC',
              margin: '12px 0 16px',
              lineHeight: 0.95,
            }}
          >
            EVERY EVENT HAS A <span className="ss-gradient-text">PULSE</span>
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              color: '#CBD5E1',
              maxWidth: '560px',
              lineHeight: 1.6,
              marginBottom: '72px',
            }}
          >
            No templates. No ordinary nights. Every Signature Socials experience is built with its own
            identity, atmosphere and story.
          </p>
        </RevealSection>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          {experiences.map((experience, index) => {
            const isEven = index % 2 === 0
            return (
              <RevealSection key={experience.id}>
                <div
                  className="ss-exp-card ss-exp-row"
                  style={{
                    display: 'flex',
                    flexDirection: isEven ? 'row' : 'row-reverse',
                    gap: '48px',
                    alignItems: 'center',
                  }}
                >
                  <div
                    className="ss-exp-image-wrap"
                    style={{
                      position: 'relative',
                      flex: '1 1 50%',
                      aspectRatio: '4/3',
                      borderRadius: '16px',
                      overflow: 'hidden',
                    }}
                  >
                    {experience.image && (
                      <Image
                        src={experience.image}
                        alt={experience.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ objectFit: 'cover' }}
                      />
                    )}
                    <div className="ss-scanlines" style={{ zIndex: 0 }} />
                    <div className="ss-light-sweep" style={{ borderRadius: '16px' }} />
                    <div className="ss-exp-image-overlay" />
                  </div>

                  <div style={{ flex: '1 1 50%' }}>
                    <div className="ss-exp-index">{String(index + 1).padStart(2, '0')}</div>
                    <h3
                      className="ss-exp-name"
                      style={{
                        fontFamily: 'var(--font-bebas)',
                        fontSize: 'clamp(2.5rem, 4vw + 1rem, 4rem)',
                        color: '#F8FAFC',
                        margin: 0,
                        transition: 'text-shadow 0.3s ease',
                      }}
                    >
                      {experience.name.toUpperCase()}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '16px',
                        color: '#00E5FF',
                        fontWeight: 500,
                        marginTop: '8px',
                      }}
                    >
                      {experience.tagline}
                    </p>
                    <div
                      style={{
                        borderTop: '1px dashed rgba(248,250,252,0.2)',
                        margin: '20px 0',
                      }}
                    />
                    <p
                      style={{
                        fontFamily: 'var(--font-inter)',
                        fontSize: '15px',
                        color: '#CBD5E1',
                        lineHeight: 1.7,
                        marginBottom: '20px',
                      }}
                    >
                      {experience.description}
                    </p>
                    <div>
                      {experience.vibe.split(' · ').map((tag) => (
                        <span key={tag} className="ss-tag">
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </RevealSection>
            )
          })}
        </div>
      </section>

      {/* SECTION 5: Why People Keep Coming Back */}
      <section className="ss-section-pad" style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 24px' }}>
        <RevealSection>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
              color: '#F8FAFC',
              marginBottom: '32px',
            }}
          >
            Why People Keep Coming Back
          </h2>
        </RevealSection>
        <IndexList items={REASONS} accent="cyan" />
      </section>

      {/* SECTION 6: Upcoming Events */}
      <section
        className="ss-section-pad"
        style={{ position: 'relative', overflow: 'hidden', padding: '100px 24px' }}
      >
        <Image
          src="/images/hero/bg-texture.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', zIndex: -2 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(10,10,10,0.88) 50%, #0A0A0A 100%)',
            zIndex: -1,
          }}
        />
        <div className="ss-scanlines" />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto' }}>
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

          <div style={{ maxWidth: '1000px', margin: '0 auto', borderTop: '1px solid rgba(248,250,252,0.12)' }}>
            {UPCOMING_EVENTS.map((event, i) => {
              const [dateFirstWord, ...dateRest] = event.date.split(' ')
              return (
                <RevealSection key={event.name} style={{ transitionDelay: `${i * 0.08}s` }}>
                  <div className="ss-event-row">
                    <div className="ss-event-date">
                      <span className="ss-event-date-label">{dateFirstWord}</span>
                      <span className="ss-event-date-main">
                        {dateRest.length > 0 ? dateRest.join(' ').toUpperCase() : dateFirstWord.toUpperCase()}
                      </span>
                    </div>
                    <div style={{ flex: '1 1 260px' }}>
                      <div className="ss-event-name">{event.name.toUpperCase()}</div>
                      <div className="ss-event-venue">{event.venue}</div>
                    </div>
                    <div className="ss-event-actions" style={{ display: 'flex', gap: '8px' }}>
                      <button type="button" className="ss-event-btn-primary">
                        Get Tickets
                      </button>
                      <button type="button" className="ss-event-btn-secondary">
                        FB Event
                      </button>
                    </div>
                  </div>
                </RevealSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* SECTION 7: About / Our Story / community closing (former /about page) */}
      <AboutSections />

      {/* SECTION 8: Footer teaser */}
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
