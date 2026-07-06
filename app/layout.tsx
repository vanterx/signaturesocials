import type { Metadata, Viewport } from 'next'
import { bebasNeue, inter } from '@/lib/fonts'
import { SITE_NAME, SITE_DESCRIPTION } from '@/lib/constants'
import { Nav } from '@/components/site/Nav'
import { Footer } from '@/components/site/Footer'
import { RouteProgress } from '@/components/site/RouteProgress'
import { PageTransition } from '@/components/site/PageTransition'
import './globals.css'

export const metadata: Metadata = {
  title: `${SITE_NAME} | New Zealand's Electronic Nightlife Collective`,
  description: SITE_DESCRIPTION,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${inter.variable}`}>
      <body
        style={{
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
        }}
      >
        <a href="#main-content" className="ss-skip-link">
          Skip to content
        </a>
        <RouteProgress />
        <Nav />
        <main id="main-content" style={{ flex: 1 }}>
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  )
}
