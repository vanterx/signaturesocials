'use client'

import Link from 'next/link'
import { RevealSection } from '@/components/site/RevealSection'
import { UPCOMING_EVENTS } from '@/lib/home-data'

const EVENTS_CSS = `
  .ss-event-list-row {
    position: relative;
    display: grid;
    grid-template-columns: 120px 1fr auto;
    gap: 24px;
    align-items: center;
    padding: 28px 20px;
    border-bottom: 1px solid rgba(248,250,252,0.12);
    transition: background 0.3s ease;
  }
  .ss-event-list-row:hover {
    background: rgba(124,58,237,0.06);
  }
  .ss-event-list-row::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 3px;
    background: #7C3AED;
    transform: scaleY(0);
    transform-origin: top;
    transition: transform 0.3s ease;
  }
  .ss-event-list-row:hover::before {
    transform: scaleY(1);
  }
  .ss-event-date-block {
    text-align: center;
  }
  .ss-event-date-label {
    font-family: var(--font-inter);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: #00E5FF;
    display: block;
    margin-bottom: 6px;
  }
  .ss-event-date-text {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(1.8rem, 1vw + 1.4rem, 2.4rem);
    line-height: 1;
    color: transparent;
    -webkit-text-stroke: 1px rgba(248,250,252,0.5);
  }
  .ss-event-info h3 {
    font-family: var(--font-display);
    font-size: clamp(1.7rem, 1.2vw + 1.2rem, 2.2rem);
    color: #F8FAFC;
    margin: 0 0 6px;
    line-height: 1.1;
  }
  .ss-event-venue {
    font-family: var(--font-inter);
    font-size: 13px;
    color: #CBD5E1;
    margin: 0;
  }
  .ss-event-cta {
    display: flex;
    gap: 8px;
  }
  .ss-event-cta button {
    font-family: var(--font-inter);
    font-size: 12px;
    font-weight: 600;
    padding: 8px 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .ss-event-btn-primary {
    background: #7C3AED;
    color: #F8FAFC;
    border: none;
  }
  .ss-event-btn-primary:hover {
    background: #9D5CFF;
    box-shadow: 0 0 16px rgba(124,58,237,0.5);
  }
  .ss-event-btn-secondary {
    background: none;
    color: #7C3AED;
    border: 1px solid rgba(124,58,237,0.5);
  }
  .ss-event-btn-secondary:hover {
    border-color: #7C3AED;
    background: rgba(124,58,237,0.1);
  }

  @media (max-width: 768px) {
    .ss-event-list-row {
      grid-template-columns: 1fr;
      gap: 12px;
    }
    .ss-event-cta {
      width: 100%;
    }
    .ss-event-cta button {
      flex: 1;
    }
  }
`

export function EventsPage() {
  const eventSchemas = UPCOMING_EVENTS.map((event) => ({
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: event.name,
    startDate: `${event.schemaDate}T20:00:00Z`,
    url: `https://signaturesocials.nz/events#${event.name.toLowerCase().replace(/ /g, '-')}`,
    location: {
      '@type': 'Place',
      name: event.venue,
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'NZ',
      },
    },
    organizer: {
      '@type': 'Organization',
      name: 'Signature Socials',
      url: 'https://signaturesocials.nz',
    },
  }))

  return (
    <>
      {eventSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <style dangerouslySetInnerHTML={{ __html: EVENTS_CSS }} />

      {/* Hero */}
      <section
        style={{
          position: 'relative',
          minHeight: '60vh',
          display: 'flex',
          alignItems: 'center',
          padding: '160px 24px 80px',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0A0A0A 0%, rgba(124,58,237,0.08) 50%, #0A0A0A 100%)',
        }}
      >
        <div className="ss-grain-overlay" />
        <div className="ss-light-sweep" />

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            maxWidth: '900px',
          }}
        >
          <span className="ss-eyebrow" style={{ marginBottom: '16px', display: 'block' }}>
            What&apos;s Coming
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2.75rem, 6vw + 1rem, 6rem)',
              color: '#F8FAFC',
              margin: '0 0 24px',
              lineHeight: 0.95,
            }}
          >
            Upcoming Events
          </h1>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '17px',
              color: '#CBD5E1',
              maxWidth: '480px',
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            Get tickets to Signature Socials experiences. Real dates coming soon.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 24px' }}>
        <RevealSection>
          <div style={{ borderTop: '1px solid rgba(248,250,252,0.12)' }}>
            {UPCOMING_EVENTS.map((event) => {
              const [dateFirstWord, ...dateRest] = event.date.split(' ')
              return (
              <div key={event.name} className="ss-event-list-row">
                <div className="ss-event-date-block">
                  <span className="ss-event-date-label">{dateFirstWord}</span>
                  <span className="ss-event-date-text">
                    {dateRest.length > 0 ? dateRest.join(' ').toUpperCase() : dateFirstWord.toUpperCase()}
                  </span>
                </div>

                <div className="ss-event-info">
                  <h3>{event.name}</h3>
                  <p className="ss-event-venue">{event.venue}</p>
                </div>

                <div className="ss-event-cta">
                  <button type="button" className="ss-event-btn-primary">
                    Get Tickets
                  </button>
                  <button type="button" className="ss-event-btn-secondary">
                    Details
                  </button>
                </div>
              </div>
              )
            })}
          </div>
        </RevealSection>
      </section>

      {/* CTA */}
      <section style={{ padding: '100px 24px', textAlign: 'center', background: '#1A1A1A' }}>
        <RevealSection>
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 3vw + 1rem, 3.25rem)',
              color: '#F8FAFC',
              marginBottom: '24px',
            }}
          >
            Want to stay updated?
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-inter)',
              fontSize: '16px',
              color: '#CBD5E1',
              maxWidth: '560px',
              margin: '0 auto 28px',
            }}
          >
            Follow us on Instagram or sign up for our newsletter to get real dates and ticket drops first.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="https://instagram.com/signaturesocials" target="_blank" rel="noopener noreferrer" className="ss-cta-btn">
              Follow on Instagram
            </Link>
            <Link href="/#" className="ss-cta-btn" style={{ background: '#7C3AED', color: '#F8FAFC' }}>
              Back to Home
            </Link>
          </div>
        </RevealSection>
      </section>
    </>
  )
}
