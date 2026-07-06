'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, Music, Zap, Sparkles, Users, Disc3, Sun, Speaker, Heart, PartyPopper } from 'lucide-react'

const HOME_CSS = `
  @keyframes ss-fade-in-up {
    from { opacity: 0; transform: translateY(24px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes ss-bounce-y {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50%      { transform: translateX(-50%) translateY(10px); }
  }
  @keyframes ss-hue-shift {
    0%, 100% { opacity: 0.5; }
    50%      { opacity: 0.9; }
  }

  .ss-hero-eyebrow { animation: ss-fade-in-up 0.8s ease 0.1s both; }
  .ss-hero-title   { animation: ss-fade-in-up 0.8s ease 0.3s both; }
  .ss-hero-tagline { animation: ss-fade-in-up 0.8s ease 0.5s both; }
  .ss-hero-quote   { animation: ss-fade-in-up 0.8s ease 0.7s both; }
  .ss-hero-cta     { animation: ss-fade-in-up 0.8s ease 0.9s both; }
  .ss-hero-scroll  { animation: ss-bounce-y 2s ease-in-out infinite; }

  .ss-hero-glow {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.35), transparent 60%);
    animation: ss-hue-shift 10s ease-in-out infinite;
    pointer-events: none;
  }

  .ss-cta-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: #00E5FF;
    color: #0A0A0A;
    font-family: var(--font-inter);
    font-size: 14px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    padding: 16px 36px;
    border-radius: 4px;
    transition: all 0.25s ease;
  }
  .ss-cta-btn:hover {
    box-shadow: 0 0 32px rgba(0,229,255,0.55);
    transform: translateY(-2px);
  }

  .ss-value-card {
    background: #1A1A1A;
    border-radius: 12px;
    padding: 32px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border: 1px solid transparent;
  }
  .ss-value-card:hover { transform: translateY(-4px); }
  .ss-value-card.ss-glow-purple:hover { border-color: rgba(124,58,237,0.6); box-shadow: 0 12px 32px rgba(124,58,237,0.2); }
  .ss-value-card.ss-glow-cyan:hover { border-color: rgba(0,229,255,0.6); box-shadow: 0 12px 32px rgba(0,229,255,0.2); }
  .ss-value-card.ss-glow-magenta:hover { border-color: rgba(255,45,149,0.6); box-shadow: 0 12px 32px rgba(255,45,149,0.2); }

  .ss-world-card {
    background: #1A1A1A;
    border: 1px solid rgba(248,250,252,0.08);
    border-radius: 12px;
    padding: 28px;
    transition: all 0.3s ease;
  }
  .ss-world-card:hover {
    border-color: rgba(124,58,237,0.6);
    box-shadow: 0 12px 32px rgba(124,58,237,0.18);
    transform: translateY(-4px);
  }

  .ss-genre-pill {
    display: inline-block;
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: #F8FAFC;
    background: rgba(124,58,237,0.15);
    border: 1px solid rgba(124,58,237,0.4);
    padding: 4px 12px;
    border-radius: 999px;
    margin: 4px 6px 0 0;
  }

  .ss-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ss-reveal.ss-visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 768px) {
    .ss-values-grid { grid-template-columns: 1fr !important; }
    .ss-world-grid { grid-template-columns: 1fr !important; }
    .ss-section-pad { padding: 60px 16px !important; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .ss-world-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-hero-eyebrow, .ss-hero-title, .ss-hero-tagline, .ss-hero-quote, .ss-hero-cta, .ss-hero-scroll {
      animation: none !important;
    }
    .ss-reveal { opacity: 1 !important; transform: none !important; }
  }
`

const VALUE_CARDS = [
  { icon: Music, label: 'The Music', glow: 'ss-glow-purple', desc: 'Curated sets from underground selectors and international headliners.' },
  { icon: Zap, label: 'The Energy', glow: 'ss-glow-cyan', desc: 'A dancefloor charged from the first drop to the last encore.' },
  { icon: Sparkles, label: 'The Production', glow: 'ss-glow-magenta', desc: 'Immersive lighting, sound and staging built for the moment.' },
  { icon: Users, label: 'The People', glow: 'ss-glow-purple', desc: 'A community that shows up for each other, every single time.' },
]

const WORLD_ITEMS = [
  { icon: Disc3, label: 'Underground Club Nights' },
  { icon: Users, label: 'International & New Zealand Artists' },
  { icon: Sparkles, label: 'Premium Sound & Lighting' },
  { icon: Sun, label: 'Immersive Visual Experiences' },
  { icon: PartyPopper, label: 'Creative Themes' },
  { icon: Heart, label: 'Inclusive Dancefloors' },
  { icon: Speaker, label: 'Unforgettable Memories' },
]

const CLOSING_LINES = [
  "It's anticipation before the first drop.",
  "It's losing yourself in the music.",
  "It's finding your people.",
]

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

function RevealSection({ children }: { children: React.ReactNode }) {
  const { ref, isVisible } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className={`ss-reveal ${isVisible ? 'ss-visible' : ''}`}>
      {children}
    </div>
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 24px 60px',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/hero/hero-dancefloor.png"
          alt=""
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'cover', zIndex: -2 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(10,10,10,0.55) 40%, #0A0A0A 100%)',
            zIndex: -1,
          }}
        />
        <div className="ss-hero-glow" />

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
            fontSize: 'clamp(3rem, 5vw + 2rem, 7.5rem)',
            lineHeight: 0.95,
            letterSpacing: '0.02em',
            color: '#F8FAFC',
            margin: 0,
            textShadow: '0 0 60px rgba(124,58,237,0.4)',
          }}
        >
          SIGNATURE SOCIALS
        </h1>

        <p
          className="ss-hero-tagline"
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 'clamp(1rem, 1vw + 0.75rem, 1.375rem)',
            color: '#00E5FF',
            marginTop: '20px',
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
            maxWidth: '560px',
            marginTop: '24px',
            lineHeight: 1.6,
          }}
        >
          Some nights are forgotten. Others become stories you&apos;ll tell for years.
        </p>

        <Link href="/experiences" className="ss-cta-btn ss-hero-cta" style={{ marginTop: '40px' }}>
          Explore Experiences
        </Link>

        <div
          className="ss-hero-scroll"
          style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            color: '#CBD5E1',
          }}
        >
          <ChevronDown size={28} />
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
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}
        >
          {VALUE_CARDS.map(({ icon: Icon, label, glow, desc }) => (
            <RevealSection key={label}>
              <div className={`ss-value-card ${glow}`}>
                <Icon size={28} color="#F8FAFC" style={{ marginBottom: '16px' }} />
                <h3
                  style={{
                    fontFamily: 'var(--font-bebas)',
                    fontSize: '24px',
                    color: '#F8FAFC',
                    margin: '0 0 8px',
                  }}
                >
                  {label}
                </h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6, margin: 0 }}>
                  {desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SECTION 3: Our World */}
      <section className="ss-section-pad" style={{ padding: '100px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <RevealSection>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
              color: '#F8FAFC',
              marginBottom: '40px',
            }}
          >
            Our World
          </h2>
        </RevealSection>

        <div
          className="ss-world-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}
        >
          {WORLD_ITEMS.map(({ icon: Icon, label }) => (
            <RevealSection key={label}>
              <div className="ss-world-card">
                <Icon size={24} color="#7C3AED" style={{ marginBottom: '12px' }} />
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 500, color: '#F8FAFC', margin: 0 }}>
                  {label}
                </p>
              </div>
            </RevealSection>
          ))}
          <RevealSection>
            <div className="ss-world-card">
              <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 500, color: '#F8FAFC', margin: '0 0 4px' }}>
                Genres
              </p>
              <div>
                {['House', 'Techno', 'Trance', 'Progressive', 'Psytrance'].map((genre) => (
                  <span key={genre} className="ss-genre-pill">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SECTION 4: More Than an Event */}
      <section
        style={{
          padding: '120px 24px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.08) 50%, #0A0A0A 100%)',
        }}
      >
        <RevealSection>
          <h2
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
