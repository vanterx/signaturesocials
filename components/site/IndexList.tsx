'use client'

import { useEffect, useRef, useState } from 'react'

interface IndexListItem {
  label: string
  desc?: string
}

interface IndexListProps {
  items: IndexListItem[]
  accent?: 'purple' | 'cyan' | 'magenta'
}

const ACCENT_COLORS: Record<NonNullable<IndexListProps['accent']>, string> = {
  purple: '#7C3AED',
  cyan: '#00E5FF',
  magenta: '#FF2D95',
}

const INDEX_LIST_CSS = `
  .ss-index-row {
    position: relative;
    display: flex;
    align-items: baseline;
    gap: 28px;
    padding: 22px 4px;
    border-bottom: 1px solid rgba(248,250,252,0.1);
    overflow: hidden;
    opacity: 0;
    transform: translateX(-24px);
    transition: opacity 0.6s ease, transform 0.6s ease, border-color 0.3s ease, padding-left 0.3s ease;
  }
  .ss-index-row.ss-visible { opacity: 1; transform: translateX(0); }

  .ss-index-row::before {
    content: '';
    position: absolute;
    inset: 0;
    background: var(--ss-index-accent, #7C3AED);
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .ss-index-row:hover::before { opacity: 0.06; }
  .ss-index-row:hover { border-color: var(--ss-index-accent, #7C3AED); padding-left: 16px; }
  .ss-index-row:hover .ss-index-number { color: var(--ss-index-accent, #7C3AED); }
  .ss-index-row:hover .ss-index-arrow { opacity: 1; transform: translateX(0); }

  .ss-index-number {
    font-family: var(--font-display);
    font-weight: 300;
    font-size: clamp(1.5rem, 1vw + 1.25rem, 2rem);
    color: rgba(248,250,252,0.3);
    min-width: 48px;
    transition: color 0.3s ease;
  }
  .ss-index-label {
    font-family: var(--font-display);
    font-weight: 300;
    text-transform: uppercase;
    font-size: clamp(1.5rem, 1.5vw + 1rem, 2.25rem);
    letter-spacing: 0.01em;
    color: #F8FAFC;
    flex: 1;
  }
  .ss-index-desc {
    font-family: var(--font-inter);
    font-size: 14px;
    color: #CBD5E1;
    max-width: 320px;
    text-align: right;
  }
  .ss-index-arrow {
    font-family: var(--font-inter);
    font-size: 18px;
    color: var(--ss-index-accent, #7C3AED);
    opacity: 0;
    transform: translateX(-8px);
    transition: opacity 0.3s ease, transform 0.3s ease;
  }

  @media (max-width: 768px) {
    .ss-index-desc { display: none; }
    .ss-index-row { gap: 16px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .ss-index-row { opacity: 1 !important; transform: none !important; }
  }
`

export function IndexList({ items, accent = 'purple' }: IndexListProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef} style={{ '--ss-index-accent': ACCENT_COLORS[accent] } as React.CSSProperties}>
      <style dangerouslySetInnerHTML={{ __html: INDEX_LIST_CSS }} />
      {items.map((item, i) => (
        <div
          key={item.label}
          className={`ss-index-row ${isVisible ? 'ss-visible' : ''}`}
          style={{ transitionDelay: isVisible ? `${i * 0.06}s` : '0s' }}
        >
          <span className="ss-index-number">{String(i + 1).padStart(2, '0')}</span>
          <span className="ss-index-label">{item.label}</span>
          {item.desc && <span className="ss-index-desc">{item.desc}</span>}
          <span className="ss-index-arrow">→</span>
        </div>
      ))}
    </div>
  )
}
