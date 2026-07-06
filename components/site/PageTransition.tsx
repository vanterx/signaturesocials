'use client'

import { usePathname } from 'next/navigation'

const PAGE_TRANSITION_CSS = `
  @keyframes ss-page-fade-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .ss-page-transition {
    animation: ss-page-fade-in 0.4s ease both;
  }
  @media (prefers-reduced-motion: reduce) {
    .ss-page-transition { animation: none !important; }
  }
`

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: PAGE_TRANSITION_CSS }} />
      <div key={pathname} className="ss-page-transition">
        {children}
      </div>
    </>
  )
}
