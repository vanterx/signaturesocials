'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Speaker, Sun, Disc3, PartyPopper } from 'lucide-react'
import { SectionHeading } from '@/components/site/SectionHeading'
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

  .ss-reason-card {
    background: #1A1A1A;
    border-radius: 12px;
    padding: 28px;
    text-align: center;
    border-top: 1px solid rgba(248,250,252,0.12);
  }
  .ss-reason-icon-ring {
    width: 56px;
    height: 56px;
    border-radius: 999px;
    border: 1px solid rgba(124,58,237,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 16px;
    box-shadow: 0 0 20px rgba(124,58,237,0.15);
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

  .ss-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ss-reveal.ss-visible { opacity: 1; transform: translateY(0); }

  @media (max-width: 768px) {
    .ss-exp-row { flex-direction: column !important; }
    .ss-exp-image-wrap { aspect-ratio: 16/9 !important; }
    .ss-reasons-grid { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 769px) and (max-width: 1024px) {
    .ss-reasons-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-float-shape { animation: none !important; }
    .ss-reveal { opacity: 1 !important; transform: none !important; }
  }
`

const REASONS = [
  { icon: Speaker, label: 'Powerful Sound Systems', desc: 'Rigs tuned for clarity at full volume.' },
  { icon: Sun, label: 'Immersive Lighting', desc: 'Lasers, haze and visuals built for the room.' },
  { icon: Disc3, label: 'Carefully Curated DJs', desc: 'Selectors who understand the crowd.' },
  { icon: PartyPopper, label: 'Packed Dancefloors', desc: 'Energy that feeds back into itself all night.' },
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
      { threshold: 0.15 }
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '140px 24px 80px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.12) 50%, #0A0A0A 100%)',
        }}
      >
        <div
          className="ss-float-shape"
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            border: '2px solid rgba(124,58,237,0.4)',
            boxShadow: '0 0 30px rgba(124,58,237,0.3)',
          }}
        />
        <div
          className="ss-float-shape"
          style={{
            position: 'absolute',
            top: '60%',
            right: '12%',
            width: '60px',
            height: '60px',
            border: '2px solid rgba(0,229,255,0.4)',
            boxShadow: '0 0 30px rgba(0,229,255,0.3)',
            transform: 'rotate(45deg)',
            animationDelay: '3s',
          }}
        />
        <div
          className="ss-float-shape"
          style={{
            position: 'absolute',
            bottom: '12%',
            left: '20%',
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: '2px solid rgba(255,45,149,0.4)',
            boxShadow: '0 0 30px rgba(255,45,149,0.3)',
            animationDelay: '6s',
          }}
        />

        <h1
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.75rem, 5vw + 1.5rem, 5.5rem)',
            color: '#F8FAFC',
            margin: 0,
            lineHeight: 1,
          }}
        >
          EVERY EVENT HAS A PULSE
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '17px',
            color: '#CBD5E1',
            maxWidth: '600px',
            marginTop: '24px',
            lineHeight: 1.6,
          }}
        >
          No templates. No ordinary nights. Every Signature Socials experience is built with its own
          identity, atmosphere and story.
        </p>
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
                  <div className="ss-exp-image-overlay" />
                </div>

                <div style={{ flex: '1 1 50%' }}>
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
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <RevealSection>
          <SectionHeading label="Signature Socials" title="Why People Keep Coming Back" align="center" />
        </RevealSection>
        <div className="ss-reasons-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          {REASONS.map(({ icon: Icon, label, desc }) => (
            <RevealSection key={label}>
              <div className="ss-reason-card">
                <div className="ss-reason-icon-ring">
                  <Icon size={24} color="#7C3AED" />
                </div>
                <h3 style={{ fontFamily: 'var(--font-bebas)', fontSize: '20px', color: '#F8FAFC', margin: '0 0 8px' }}>
                  {label}
                </h3>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#CBD5E1', margin: 0, lineHeight: 1.5 }}>
                  {desc}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SECTION 4: Closing Banner */}
      <section
        style={{
          padding: '100px 24px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.15) 50%, #0A0A0A 100%)',
        }}
      >
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
