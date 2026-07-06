'use client'

import Image from 'next/image'
import Link from 'next/link'
import { SITE_NAME, SITE_TAGLINE, LEGAL_ENTITY, COPYRIGHT_YEAR, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants'
import { SOCIAL_ICON_LINKS } from '@/components/site/SocialIcons'

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

  .ss-newsletter-input {
    background: #1A1A1A;
    border: 1px solid rgba(124,58,237,0.3);
    border-radius: 4px;
    padding: 10px 14px;
    font-family: var(--font-inter);
    font-size: 13px;
    color: #F8FAFC;
    outline: none;
    width: 180px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .ss-newsletter-input:focus {
    border-color: #7C3AED;
    box-shadow: 0 0 12px rgba(124,58,237,0.25);
  }
  .ss-newsletter-input::placeholder { color: rgba(203,213,225,0.5); }

  .ss-newsletter-btn {
    background: #7C3AED;
    color: #F8FAFC;
    border: none;
    border-radius: 4px;
    padding: 10px 18px;
    font-family: var(--font-inter);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .ss-newsletter-btn:hover {
    background: #9D5CFF;
    box-shadow: 0 0 16px rgba(124,58,237,0.5);
  }

  @media (max-width: 768px) {
    .ss-footer-row { flex-direction: column !important; text-align: center; gap: 32px !important; }
    .ss-footer-nav { align-items: center !important; }
  }
`

export function Footer() {
  return (
    <footer style={{ background: '#0A0A0A' }}>
      <style dangerouslySetInnerHTML={{ __html: FOOTER_CSS }} />
      <div
        style={{
          height: '1px',
          background:
            'linear-gradient(90deg, transparent 0%, rgba(124,58,237,0.5) 30%, rgba(0,229,255,0.4) 70%, transparent 100%)',
        }}
      />
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
          <Image
            src="/ss-monogram.svg"
            alt={SITE_NAME}
            width={56}
            height={56}
            unoptimized
            style={{ display: 'block', marginBottom: '12px' }}
          />
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
                aria-label="Email address"
                className="ss-newsletter-input"
              />
              <button type="submit" className="ss-newsletter-btn">
                Join
              </button>
            </form>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            {SOCIAL_ICON_LINKS.map(({ key, label, Icon }) => (
              <a
                key={key}
                href={SOCIAL_LINKS[key]}
                target="_blank"
                rel="noopener noreferrer"
                className="ss-social-icon"
                aria-label={label}
              >
                <Icon />
              </a>
            ))}
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
