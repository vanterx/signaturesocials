'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { Calendar, Megaphone, Ticket, Star, Camera, Users } from 'lucide-react'
import { SectionHeading } from '@/components/site/SectionHeading'

const ABOUT_CSS = `
  .ss-reveal {
    opacity: 0;
    transform: translateY(24px);
    transition: opacity 0.7s ease, transform 0.7s ease;
  }
  .ss-reveal.ss-visible { opacity: 1; transform: translateY(0); }

  .ss-community-card {
    background: #1A1A1A;
    border-radius: 12px;
    padding: 28px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .ss-community-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 32px rgba(124,58,237,0.18);
  }
  .ss-community-icon-circle {
    width: 48px;
    height: 48px;
    border-radius: 999px;
    background: rgba(124,58,237,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 16px;
  }

  @media (max-width: 900px) {
    .ss-story-row { flex-direction: column !important; }
    .ss-community-grid { grid-template-columns: 1fr !important; }
  }
  @media (min-width: 901px) and (max-width: 1100px) {
    .ss-community-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-reveal { opacity: 1 !important; transform: none !important; }
  }
`

const STORY_PARAGRAPHS = [
  'Since day one, our mission has been to create events that go beyond entertainment. Signature Socials was founded with a simple belief: great music deserves unforgettable experiences.',
  "We're proudly produced by 3333 Events and Productions, a team dedicated to building nights that showcase both internationally recognised artists and New Zealand's incredible local talent.",
  'Every event is built around authenticity and connection — real music, real production, and a real community that shows up for each other on the dancefloor.',
]

const COMMUNITY_ITEMS = [
  { icon: Calendar, label: 'Upcoming Events' },
  { icon: Megaphone, label: 'Artist Announcements' },
  { icon: Ticket, label: 'Ticket Releases' },
  { icon: Star, label: 'Exclusive Experiences' },
  { icon: Camera, label: 'Behind-the-Scenes Content' },
  { icon: Users, label: 'Community Stories' },
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

export function AboutPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ABOUT_CSS }} />

      {/* SECTION 1: Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '50vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '140px 24px 60px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.1) 50%, #0A0A0A 100%)',
        }}
      >
        <div className="ss-grain-overlay" />
        <h1
          style={{
            fontFamily: 'var(--font-bebas)',
            fontSize: 'clamp(2.5rem, 4.5vw + 1rem, 4.75rem)',
            color: '#F8FAFC',
            margin: 0,
            maxWidth: '900px',
            lineHeight: 1.05,
          }}
        >
          CREATED BY PASSION. DRIVEN BY COMMUNITY.
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: '17px',
            color: '#CBD5E1',
            maxWidth: '560px',
            marginTop: '24px',
            lineHeight: 1.6,
          }}
        >
          Signature Socials was founded with a simple belief. Great music deserves unforgettable
          experiences.
        </p>
        <div
          style={{
            width: '80px',
            height: '2px',
            marginTop: '28px',
            background: 'linear-gradient(90deg, #7C3AED 0%, #00E5FF 100%)',
          }}
        />
      </section>

      {/* SECTION 2: The Story */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <div className="ss-story-row" style={{ display: 'flex', gap: '56px', alignItems: 'center' }}>
          <RevealSection>
            <div style={{ flex: '1 1 50%' }}>
              <SectionHeading label="Since Day One" title="Our Story" />
              {STORY_PARAGRAPHS.map((paragraph) => (
                <p
                  key={paragraph}
                  style={{
                    fontFamily: 'var(--font-inter)',
                    fontSize: '15px',
                    color: '#CBD5E1',
                    lineHeight: 1.7,
                    marginBottom: '18px',
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </RevealSection>

          <RevealSection>
            <div
              style={{
                flex: '1 1 50%',
                position: 'relative',
                aspectRatio: '1/1',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 0 60px rgba(124,58,237,0.25)',
              }}
            >
              <Image
                src="/images/about/about-dj-booth.png"
                alt="DJ booth at a Signature Socials event"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </RevealSection>
        </div>
      </section>

      {/* SECTION 3: The Promise */}
      <section
        style={{
          background: '#1A1A1A',
          borderTop: '1px solid rgba(124,58,237,0.4)',
          padding: '80px 24px',
          textAlign: 'center',
        }}
      >
        <RevealSection>
          <p
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(2rem, 3.5vw + 1rem, 3.25rem)',
              color: '#F8FAFC',
              fontStyle: 'italic',
              margin: '0 auto 20px',
              maxWidth: '700px',
            }}
          >
            &ldquo;To create nights worth remembering.&rdquo;
          </p>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '15px',
              color: '#CBD5E1',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Whether we&apos;re welcoming internationally recognised artists or showcasing New
            Zealand&apos;s incredible local talent, every event is built around one promise.
          </p>
        </RevealSection>
      </section>

      {/* SECTION 4: Join the Community */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 24px' }}>
        <RevealSection>
          <SectionHeading
            label="Get Involved"
            title="Join the Community"
            subtitle="The next chapter starts on the dancefloor."
            align="center"
          />
        </RevealSection>
        <div className="ss-community-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {COMMUNITY_ITEMS.map(({ icon: Icon, label }) => (
            <RevealSection key={label}>
              <div className="ss-community-card">
                <div className="ss-community-icon-circle">
                  <Icon size={22} color="#7C3AED" />
                </div>
                <p style={{ fontFamily: 'var(--font-inter)', fontSize: '15px', fontWeight: 500, color: '#F8FAFC', margin: 0 }}>
                  {label}
                </p>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* SECTION 5: Closing Statement */}
      <section
        style={{
          position: 'relative',
          padding: '100px 24px',
          textAlign: 'center',
          overflow: 'hidden',
        }}
      >
        <Image
          src="/images/about/about-community.png"
          alt=""
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', zIndex: -2 }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(10,10,10,0.75) 50%, #0A0A0A 100%)',
            zIndex: -1,
          }}
        />
        <RevealSection>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '18px',
              color: '#F8FAFC',
              maxWidth: '600px',
              margin: '0 auto 24px',
              lineHeight: 1.6,
            }}
          >
            You&apos;re not just attending an event. You&apos;re becoming part of something bigger.
          </p>
          <p
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 2.25rem)',
              color: '#F8FAFC',
              maxWidth: '760px',
              margin: '0 auto 28px',
              lineHeight: 1.3,
            }}
          >
            Signature Socials — Where Every Night Becomes a Story. Where Every Beat Brings People
            Together. Welcome Home.
          </p>
          <div style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#7C3AED', letterSpacing: '0.3em' }}>
            {'///// ///// /////'}
          </div>
        </RevealSection>
      </section>
    </>
  )
}
