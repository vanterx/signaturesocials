'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ParticleField } from '@/components/site/ParticleField'
import { IndexList } from '@/components/site/IndexList'
import { RevealSection } from '@/components/site/RevealSection'
import { experiences } from '@/lib/experiences-data'

const EXPERIENCES_CSS = `
  @keyframes ss-float-shape {
    0%, 100% { transform: translateY(0) translateX(0); }
    50%      { transform: translateY(-24px) translateX(12px); }
  }

  .ss-float-shape { animation: ss-float-shape 20s ease-in-out infinite; }

  .ss-exp-card {
    transition: transform 0.3s ease;
  }
  .ss-exp-card:hover { transform: translateY(-4px); }
  .ss-exp-card:hover .ss-exp-image-overlay { opacity: 0.55; }
  .ss-exp-card:hover .ss-exp-name { text-shadow: 0 0 24px rgba(124,58,237,0.6); }

  .ss-exp-image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(124,58,237,0.35), rgba(255,45,149,0.2), rgba(0,229,255,0.25));
    opacity: 0.25;
    transition: opacity 0.3s ease;
  }

  .ss-vibe-pill {
    display: inline-block;
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
    color: #F8FAFC;
    border: 1px solid rgba(124,58,237,0.5);
    padding: 5px 14px;
    border-radius: 999px;
    margin: 4px 8px 0 0;
  }

  .ss-exp-ghost-number {
    position: absolute;
    top: 50%;
    right: -4%;
    transform: translateY(-50%);
    font-family: var(--font-bebas);
    font-size: clamp(10rem, 24vw, 22rem);
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(124,58,237,0.25);
    pointer-events: none;
    user-select: none;
    z-index: 0;
  }

  .ss-exp-index {
    font-family: var(--font-bebas);
    font-size: clamp(3rem, 4vw + 1rem, 5rem);
    color: rgba(124,58,237,0.35);
    line-height: 1;
    margin-bottom: -8px;
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

  @media (max-width: 768px) {
    .ss-exp-row { flex-direction: column !important; }
    .ss-exp-image-wrap { aspect-ratio: 16/9 !important; }
    .ss-exp-ghost-number { display: none; }
    .ss-hero-title-lg { text-align: center !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-float-shape { animation: none !important; }
  }
`

const REASONS = [
  { label: 'Powerful Sound Systems', desc: 'Rigs tuned for clarity at full volume.' },
  { label: 'Immersive Lighting', desc: 'Lasers, haze and visuals built for the room.' },
  { label: 'Carefully Curated DJs', desc: 'Selectors who understand the crowd.' },
  { label: 'Packed Dancefloors', desc: 'Energy that feeds back into itself all night.' },
]

export function ExperiencesPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: EXPERIENCES_CSS }} />

      {/* SECTION 1: Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          padding: '160px 24px 80px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.12) 50%, #0A0A0A 100%)',
        }}
      >
        <div className="ss-grain-overlay" />
        <div className="ss-light-sweep" />
        <ParticleField count={10} topRange={[15, 85]} />
        <span className="ss-exp-ghost-number">{String(experiences.length).padStart(2, '0')}</span>

        <div className="ss-hero-title-lg" style={{ position: 'relative', zIndex: 1, maxWidth: '760px' }}>
          <span
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#7C3AED',
            }}
          >
            {experiences.length} Signature Experiences
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2.75rem, 6vw + 1rem, 6rem)',
              color: '#F8FAFC',
              margin: '12px 0 0',
              lineHeight: 0.95,
            }}
          >
            EVERY EVENT
            <br />
            HAS A PULSE
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '17px',
              color: '#CBD5E1',
              maxWidth: '480px',
              marginTop: '24px',
              lineHeight: 1.6,
            }}
          >
            No templates. No ordinary nights. Every Signature Socials experience is built with its own
            identity, atmosphere and story.
          </p>
        </div>
      </section>

      {/* SECTION 2: Experience Cards */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px', display: 'flex', flexDirection: 'column', gap: '80px' }}>
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
                  <h2
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
                  </h2>
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
                      <span key={tag} className="ss-vibe-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealSection>
          )
        })}
      </section>

      {/* SECTION 3: Why People Keep Coming Back */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 24px' }}>
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

      {/* SECTION 4: Closing Banner */}
      <section
        style={{
          position: 'relative',
          overflow: 'hidden',
          padding: '100px 24px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.15) 50%, #0A0A0A 100%)',
        }}
      >
        <div className="ss-light-sweep" />
        <ParticleField count={6} topRange={[20, 80]} />

        <RevealSection>
          <h2
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2rem, 3.5vw + 1rem, 3.5rem)',
              color: '#F8FAFC',
              maxWidth: '700px',
              margin: '0 auto 32px',
            }}
          >
            Every event is different. Every dancefloor feels like home.
          </h2>
          <Link href="/about" className="ss-cta-btn">
            Join the Next Event
          </Link>
        </RevealSection>
      </section>
    </>
  )
}
