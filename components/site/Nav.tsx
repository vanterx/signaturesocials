'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { NAV_LINKS, SITE_NAME, SOCIAL_LINKS } from '@/lib/constants'

const NAV_CSS = `
  @keyframes ss-slide-down {
    from { opacity: 0; transform: translateY(-16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes ss-nav-glow {
    0%, 100% { border-color: rgba(124,58,237,0.2); }
    50%      { border-color: rgba(0,229,255,0.3); }
  }

  .ss-nav-border {
    animation: ss-nav-glow 6s ease-in-out infinite;
  }

  .ss-nav-social-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 999px;
    color: #CBD5E1;
    transition: all 0.2s ease;
  }
  .ss-nav-social-icon:hover {
    color: #7C3AED;
    box-shadow: 0 0 12px rgba(124,58,237,0.4);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    .ss-nav-social-bar { display: none !important; }
  }

  .ss-nav-link {
    position: relative;
    font-family: var(--font-inter);
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #F8FAFC;
    padding: 6px 0;
    transition: color 0.2s ease;
  }
  .ss-nav-link:hover { color: #7C3AED; text-shadow: 0 0 12px rgba(124,58,237,0.6); }
  .ss-nav-link.ss-active { color: #7C3AED; }
  .ss-nav-link::after {
    content: '';
    position: absolute;
    left: 50%;
    bottom: -8px;
    width: 4px;
    height: 4px;
    border-radius: 999px;
    background: #7C3AED;
    box-shadow: 0 0 8px rgba(124,58,237,0.9);
    transform: translateX(-50%) scale(0);
    transition: transform 0.25s ease;
  }
  .ss-nav-link.ss-active::after { transform: translateX(-50%) scale(1); }

  .ss-hamburger-btn {
    background: none;
    border: none;
    color: #F8FAFC;
    cursor: pointer;
    display: none;
    padding: 4px;
    transition: color 0.2s ease;
  }
  .ss-hamburger-btn:hover { color: #7C3AED; }

  .ss-mobile-overlay {
    animation: ss-slide-down 0.25s ease forwards;
  }

  .ss-mobile-link {
    font-family: var(--font-bebas);
    font-size: 42px;
    letter-spacing: 0.05em;
    color: #F8FAFC;
    transition: color 0.2s ease;
  }
  .ss-mobile-link:hover,
  .ss-mobile-link.ss-active { color: #7C3AED; }

  @media (max-width: 768px) {
    .ss-desktop-links { display: none !important; }
    .ss-hamburger-btn { display: flex !important; }
  }
`

export function Nav() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: NAV_CSS }} />
      <header
        className="ss-nav-border"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(10,10,10,0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottomWidth: '1px',
          borderBottomStyle: 'solid',
        }}
      >
        <nav
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '18px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link
            href="/"
            style={{
              fontFamily: 'var(--font-bebas)',
              fontSize: '24px',
              letterSpacing: '0.08em',
              color: '#F8FAFC',
            }}
          >
            {SITE_NAME.toUpperCase()}
          </Link>

          <div
            className="ss-desktop-links"
            style={{ display: 'flex', alignItems: 'center', gap: '40px' }}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`ss-nav-link ${pathname === link.href ? 'ss-active' : ''}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div
            className="ss-nav-social-bar"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}
          >
            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ss-nav-social-icon"
              aria-label="Instagram"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="ss-nav-social-icon"
              aria-label="Facebook"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href={SOCIAL_LINKS.mixcloud}
              target="_blank"
              rel="noopener noreferrer"
              className="ss-nav-social-icon"
              aria-label="Mixcloud"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 4a8 8 0 1 0 0 16 8 8 0 0 0 0-16z" />
                <path d="M8 10v4" />
                <path d="M10 11v2" />
                <path d="M14 11v2" />
                <path d="M16 10v4" />
              </svg>
            </a>
          </div>

          <button
            type="button"
            className="ss-hamburger-btn"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </nav>
      </header>

      {isMenuOpen && (
        <div
          className="ss-mobile-overlay"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 49,
            background: '#0A0A0A',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '36px',
          }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`ss-mobile-link ${pathname === link.href ? 'ss-active' : ''}`}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </>
  )
}
