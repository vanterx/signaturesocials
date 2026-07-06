'use client'

import Link from 'next/link'
import { SITE_NAME, SITE_TAGLINE, LEGAL_ENTITY, COPYRIGHT_YEAR, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}

function MixcloudIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
      <path d="M8 10v4" />
      <path d="M10 11v2" />
      <path d="M14 11v2" />
      <path d="M16 10v4" />
    </svg>
  )
}

const FOOTER_CSS = `
  .ss-footer-link {
    font-family: var(--font-inter);
    font-size: 14px;
    color: #CBD5E1;
    transition: color 0.2s ease;
  }
  .ss-footer-link:hover { color: #7C3AED; }

  .ss-social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 999px;
    border: 1px solid rgba(124,58,237,0.35);
    color: #F8FAFC;
    transition: all 0.25s ease;
  }
  .ss-social-icon:hover {
    color: #7C3AED;
    border-color: #7C3AED;
    box-shadow: 0 0 16px rgba(124,58,237,0.5);
    transform: translateY(-2px) scale(1.05);
  }

  @media (max-width: 768px) {
    .ss-footer-row { flex-direction: column !important; text-align: center; gap: 32px !important; }
    .ss-footer-nav { align-items: center !important; }
  }
`

export function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(124,58,237,0.15)' }}>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />
      <div
        className="ss-footer-row"
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 24px 32px',
          display: 'flex',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div style={{ maxWidth: '320px' }}>
          <div
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '28px',
              letterSpacing: '0.06em',
              color: '#F8FAFC',
              marginBottom: '12px',
            }}
          >
            {SITE_NAME.toUpperCase()}
          </div>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#CBD5E1', lineHeight: 1.6 }}>
            {SITE_TAGLINE}
          </p>
        </div>

        <nav className="ss-footer-nav" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="ss-footer-link">
              {link.label}
            </Link>
          ))}
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start' }}>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: '14px', color: '#CBD5E1' }}>
            Produced by 3333 Events &amp; Productions
          </p>

          <div>
            <p
              style={{
                fontFamily: 'var(--font-inter)',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#7C3AED',
                marginBottom: '8px',
              }}
            >
              Stay in the Loop
            </p>
            {/* Placeholder form: not yet wired to an email provider or API route */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
              }}
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
                onFocus={(e) => (e.target.style.borderColor = '#7C3AED')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(124,58,237,0.3)')}
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#9D5CFF'
                  e.currentTarget.style.boxShadow = '0 0 16px rgba(124,58,237,0.5)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#7C3AED'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                Join
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ss-social-icon"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="ss-social-icon"
              aria-label="Facebook"
            >
              <FacebookIcon />
            </a>
            <a
              href={SOCIAL_LINKS.mixcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="ss-social-icon"
              aria-label="Mixcloud"
            >
              <MixcloudIcon />
            </a>
          </div>
        </div>
      </div>

      <div
        style={{
          borderTop: '1px solid rgba(248,250,252,0.08)',
          padding: '20px 24px',
          textAlign: 'center',
          fontFamily: 'var(--font-inter)',
          fontSize: '12px',
          color: '#CBD5E1',
        }}
      >
        © {COPYRIGHT_YEAR} {LEGAL_ENTITY}. All rights reserved.
      </div>
    </footer>
  )
}
