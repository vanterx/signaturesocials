import type { Metadata } from 'next'
import { EventsPage } from '@/components/site/EventsPage'

export const metadata: Metadata = {
  title: 'Upcoming Events | Signature Socials',
  description:
    'Get tickets to upcoming Signature Socials events in New Zealand. Underground electronic music, house, techno, trance. Spellbound, Anti Social, Bass Ritual, and more.',
  openGraph: {
    title: 'Upcoming Events | Signature Socials',
    description: 'Electronic music events in Auckland, Wellington, Christchurch. House, Techno, Trance.',
    type: 'website',
    url: 'https://signaturesocials.nz/events',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Upcoming Events | Signature Socials',
    description: 'Get tickets to Signature Socials electronic music events.',
  },
}

export default function Events() {
  return <EventsPage />
}
