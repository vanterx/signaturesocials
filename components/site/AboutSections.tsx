'use client'

import Image from 'next/image'
import { SectionHeading } from '@/components/site/SectionHeading'
import { ParticleField } from '@/components/site/ParticleField'
import { IndexList } from '@/components/site/IndexList'
import { RevealSection } from '@/components/site/RevealSection'
import { SOCIAL_LINKS } from '@/lib/constants'

const ABOUT_CSS = `
  @media (max-width: 900px) {
    .ss-story-row { flex-direction: column !important; }
    .ss-story-text { flex: none !important; width: 100% !important; }
    .ss-story-image { flex: none !important; width: 100% !important; }
  }
`

const STORY_PARAGRAPHS = [
  'Since day one, our mission has been to create events that go beyond entertainment. Signature Socials was founded with a simple belief: great music deserves unforgettable experiences.',
  "We're proudly produced by 3333 Events and Productions, a team dedicated to building nights that showcase both internationally recognised artists and New Zealand's incredible local talent.",
  'Every event is built around authenticity and connection — real music, real production, and a real community that shows up for each other on the dancefloor.',
]

const COMMUNITY_ITEMS = [
  { label: 'Upcoming Events' },
  { label: 'Artist Announcements' },
  { label: 'Ticket Releases' },
  { label: 'Exclusive Experiences' },
  { label: 'Behind-the-Scenes Content' },
  { label: 'Community Stories' },
]

// The former /about page, folded into the single-page home as anchored sections.
export function AboutSections() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: ABOUT_CSS }} />

      {/* Our Story */}
      <section
        id="about"
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '100px 24px', scrollMarginTop: '80px' }}
      >
        <div className="ss-story-row" style={{ display: 'flex', gap: '56px', alignItems: 'center' }}>
          <RevealSection>
            <div className="ss-story-text" style={{ flex: '1 1 50%' }}>
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
              className="ss-story-image"
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

      {/* The Promise */}
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
            className="ss-pulse-glow"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              textTransform: 'uppercase',
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

      {/* Join the Community */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '100px 24px' }}>
        <RevealSection>
          <SectionHeading
            label="Get Involved"
            title="Join the Community"
            subtitle="The next chapter starts on the dancefloor."
          />
        </RevealSection>
        <IndexList items={COMMUNITY_ITEMS} accent="magenta" />
      </section>

      {/* Closing statement */}
      <section
        style={{
          position: 'relative',
          padding: '120px 24px',
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
        <div className="ss-grain-overlay" />
        <div className="ss-scanlines" />
        <div className="ss-light-sweep" />
        <ParticleField count={10} topRange={[20, 80]} />

        <RevealSection>
          <h2
            className="ss-pulse-glow"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.5rem, 4vw + 1rem, 4.5rem)',
              color: '#F8FAFC',
              margin: '0 0 24px',
            }}
          >
            More Than an Event. It&apos;s a Feeling.
          </h2>
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
              fontFamily: 'var(--font-display)',
              fontWeight: 300,
              textTransform: 'uppercase',
              fontSize: 'clamp(1.5rem, 2.5vw + 1rem, 2.25rem)',
              color: '#F8FAFC',
              maxWidth: '760px',
              margin: '0 auto 32px',
              lineHeight: 1.3,
            }}
          >
            Signature Socials — Where Every Night Becomes a Story. Where Every Beat Brings People
            Together. Welcome Home.
          </p>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="ss-cta-btn"
          >
            Follow the Journey
          </a>
        </RevealSection>
      </section>
    </>
  )
}
